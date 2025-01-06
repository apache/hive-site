---
title: "Apache Hive : MapJoin and Partition Pruning"
date: 2024-12-12
---

# Apache Hive : MapJoin and Partition Pruning

* [Overview]({{< ref "#overview" >}})
	+ [Problem]({{< ref "#problem" >}})
	+ [Proposed Solution]({{< ref "#proposed-solution" >}})
	+ [Possible Extensions]({{< ref "#possible-extensions" >}})
* [Optimization Details]({{< ref "#optimization-details" >}})
	+ [Compile Time]({{< ref "#compile-time" >}})
	+ [Runtime]({{< ref "#runtime" >}})
	+ [Pseudo Code]({{< ref "#pseudo-code" >}})

# Overview

In Hive, Map-Join is a technique that materializes data for all tables involved in the join except for the largest table and then large table is streamed over the materialized data from small tables. Map-Join is often a good join approach for star-schema joins where the fact table will be streamed over materialized dimension tables.

### Problem

Map-Join predicates where the joining columns from big table (streamed table) are partition columns and corresponding columns from small table is not partitioned, the join would not prune the unnecessary partitions from big table. Since data for all small tables is materialized before big table is streamed, theoretically it would be possible to prune the unnecessary partitions from big table. 

HIVE-5119 has been created to track this feature improvement.

### Proposed Solution

Figure out the set of values from all small tables for each join column from big table (that is partition key). Using these set of values figure out the partitions from big table that should be scanned using metadata. Change the partitions to be scanned for big table before Map-Join starts streaming big table. This feature would be turned on only through an explicit configuration (name of that configuration is TBD).

### Possible Extensions

• If LHS and RHS of join predicate are partitioned then for tables from inner side, Partitions can be decided statically at compile time.  

• Even if the Big Table columns are not partitioned, the set of values generated from small tables could be pushed down as a predicate on the big table. Storage Handlers like ORC, which can handle predicate push down, could take advantage of this.

# Optimization Details

This optimization has compile time and run/execution time pieces to it. Compile time optimizations would happen as part of physical optimizer as one of the last optimizations (before inferring bucket sort). Run/Execution time optimizations would happen as part of MRLocalTask execution and before launching MapRedTask for Map-Join.

### Compile Time

1. Identify Map Join Operators that can participate in partition pruning.  

2. For each of the Map-Join operator in the task, identify columns from big table that can participate in the partition pruning.

    Columns that are identified from big table has following characteristics:  

      • They are part of join condition  

      • Big table is on the inner side of the join  

      • Columns are not involved in any functions in the join conditions  

      • Column value is not mutated (no function) before value reaches join condition from Table Scan.  

      • Column is a partition column.

3. Identify small tables and columns from small table that can participate in partition pruning.  

    Columns that are identified from small table has following characteristics:  

      • Column is the other side of predicate in the join condition and Big Table column is identified as a target for partition pruning.  

      • Column is not part of any function on the join predicate.  

      • Column is part of join in which big table is on the outer side.

4. Modify MapRedLocalTask to assemble set of values for each of the column from small tables that participate in partition pruning and to generate PartitionDesc for big table.

**NOTE:**  

• This requires adding a terminal operator to the operator DAG in the MapRedLocalTask.  

• Note that the new terminal operator would get tuples from all small tables of interest (just like HashTableSink Operator).  

• Cascading Map-Join operators (joining on different keys in the same task using same big table) would still use the same terminal operator in the MapRedLocalTask.

### Runtime

1. As tuples flow in to the new terminal operator in MapRedLocal task, it would extract columns of interest and would add it to a set of values for that column.

2. When close is called on the new terminal operator it would generate partitions of big table by consulting Meta Store (using values generated at #1).  

    **NOTE:**  

    • Meta Store would need to answer queries with in clauses. Ex: give me all partitions for Table R where column x in (1,2,3) and column y in (5,6,7).

    • In case of cascading MapJoinOperators the big table would be pruned based on multiple keys (& hence set generation needs to handle it).

3. Modify the PartitionDesc for BigTable in the MapRedTask with the list from #2.  

**NOTE:**  

    • PartitionDesc from #2 should be merged with existing PartitionDesc for the Big Table by finding the intersection.  

    • This modification of partition descriptor is designed as a prelaunch activity on each task. Task in turn would call prelaunch on associated work. Work may keep an ordered list of operators on which prelaunch needs to be called.

**Assumptions**:  

• In HIVE currently Join predicates can only include conjunctions.  

• Hive only supports Equijoin

### Pseudo Code

1. Walk through Task DAG looking for MapredTask. Perform #2 - #6 for each such MapRedTask.  

2. Skip Task if it contains backup join plan (i.e if not MAPJOIN_ONLY_NOBACKUP or if backupTask is not null).  

**NOTE:**  

    This is aggressive; in my limited exposure to the hive code, it seemed like conditional tasks are currently set only for joins.

3. With in the task Look for pattern “TS.*MAPJOIN”. Perform #4 - #6 for each MAPJOIN operator.

4. Flag a Map-Join Operator as candidate for Partition Pruning

   4.1 Collect small tables that might participate in Big Table pruning  

        a. Walk the join conditions. If Join Type is “outer” then check if big-table is on the outer side. If so then bailout.  

        b. If big-table is on inner side then add the position of small table in to the set.

  4.2 If set from #4.1 is empty then bailout. Otherwise collect join keys from big table which is not wrapped in a functions  

        a) Get the join key from “MapJoinDesc.getKeys().get(MapJoinDesc .getPosBigTable)”  

        b) Walk through list of “ExpressionNodeDesc”; if “ExprNodeDesc” is of type “ExprNodeGenericFuncDesc” then check if any of partition pruner candidate key is contained with in it (“ExprNodeDescUtils.containsPredicate”). If any candidate key is contained within the function then remove it from the partition-pruner-bigtable-candidate list.

       c) Create a pair of “ExprNodeColumnDesc position Integer within the list from #b” and “ExprNodecolumnDesc” and add to partition-pruner-bigtable-candidate list.

4.3 If partition-pruner-bigtable-candidate list is empty then bailout. Otherwise find join keys from #4.1 that is not wrapped in function using partition pruner candidate set.  

      a) Walk the set from 4.1  

      b) Get the join key for each element from 4.1  

      c) Walk the join key list from #b checking if any of it is a function  

      d) If any of the element from #c is a function then check if it contains any element from partition-pruner-bigtable-candidate list. If yes then remove that element from partition-pruner-bigtable-candidate List and set-generation-key-map.  

      e) Create a pair of table position and join key element from #d.  

      f) Add element to set-generation-key-map where key is the position of element within the partition-pruner-bigtable-candidate list and value is element from #e.

4.4 If partition-pruner-bigtable-candidate set is empty then bail out. Otherwise find BigTable Columns from partition-pruner-bigtable-candidate set that is partitioned.  

     a) Construct list of “ExprNodeDesc” from the set of #4.2  

     b) Find out the root table column descriptors for #a (“ExprNodeDescUtils.backtrack”)  

     c) From Hive get Table metadata for big table  

     d) Walk through the list from #b & check with Table meta data to see if any of those columns is partitioned (“Table.isPartitionKey”). If column is not partition key then remove it from the partition pruner candidate list.

4.5 If partition-pruner-bigtable-candidate set is empty then bail out. Otherwise Check if any of the partition pruner element could potentially mutate the value before hitting the join conditions. We will have to introduce a new method to “ExprNodeDescUtil” similar to back track but checking if value could be mutated (ex functions).

4.6 If partition-pruner-bigtable-candidate list from #4.5 is empty then bail out. Otherwise add partition-pruner-bigtable-candidate list and set-generation-key-map from #4.5 to the existing list of values in the PhysicalCtx.

    a) Create a pair of partition-pruner-bigtable-candidate list & set-generation-key-map.  

    b) Add it to the existing list in the physical context (this is to handle cascading mapjoin operators in the same MapRedTask)

5. If partition-pruner-bigtable-candidate set and set-generation-keys are non empty then Modify corresponding LocalMRTask to introduce the new PartitionPrunerSink Operator (if not already).  

   a) Add to Physical Context a map of MapJoinOperator – HashTableSink Operator. This needs to happen during HashTableSink generation time.  

   b) From physical context get the HashTableSinkOperator corresponding to the MapJoinOperator.  

   c) From all the parents of MapJoin Operator identify the ones representing small tables in the set-generation-key-map.  

   d) Create a new PartitionDescGenSinkOp (with set-generation-key-map)  

   e) Add it as child of elements from #c.

**Assumption**:

  Two different MapRedTask (that contains MapJoin Operators) would result in two different MapRedLocalTask even if they share the same set of small tables.

  Implementation of PartitionDescGenSink  

     a) A map is maintained between BigTable column and HashSet.  

     b) From each tuple extract values corresponding to each column with in set-generation-key.  

     c) Add these to a HashSet  

     d) On Close of PartitionDescGenSink consult Metadata to get partitions for the key columns corresponding. This requires potential enhancements to Hive Metadata handling to provide an api “Get all partitions where column1 has set1 of values, or column2 has set2 of values.  

     e) Write the partition info to file. The file name & location needs to be finalized.

6. In the MapRedTask corresponding to MapJoin, add TableScan for the bigTable to the prelaunch operator list. Add to the TS the location of corresponding PartitionDescGenSink output.

7. At execution time call prelaunch on each task. Task will call prelaunch on the work. Work will call prelaunch on the operators in the list in order. For TableScan, prelaunch will result in reading the PartitionDescriptor info and would find intersection of existing PartitionDesc and the new list produced by PartitionDescGenSink. Partition state info kept in MapWork would be updated with the new partitons (“MapWork.pathToAliases”, “MapWork.aliasToPartnInfo”, “MapWork.pathToPartitionInfo”). This would be then picked up by “ExecDriver.execute” to setup input paths for InputFormat.

**NOTE:**  

   • In Mapwork, we may need to maintain a map of Table alias to List. One choice is to introduce a new “addPathToPartitionInfo” method and switch current callers to use the new convenience method; this method then could maintain a Map of table alias to list of PartitionDesc.  

  • Current design assumes the partition descriptor info generated by Local Task would be communicated to MapRed Task through files. This is obviously sub optimal. As an enhancement different mechanisms can be brought in to pass this info.

 

 

