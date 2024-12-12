---
title: "Apache Hive : Hbase execution plans for RawStore partition filter condition"
date: 2024-12-12
---









# Apache Hive : Hbase execution plans for RawStore partition filter condition






(Apologies for this doc being organized properly, I thought something is better than nothing - Thejas)

  
This is part of metastore on hbase work - 

[![](https://issues.apache.org/jira/secure/viewavatar?size=xsmall&avatarId=21140&avatarType=issuetype)HIVE-9452](https://issues.apache.org/jira/browse/HIVE-9452?src=confmacro)
 -
 Use HBase to store Hive metadata
Open

Functionality needed

  


RawStore functions that support partition filtering are the following - 

* getPartitionsByExpr
* getPartitionsByFilter (takes filter string as argument, used from hcatalog)

  


We need to generate a query execution plan in terms of Hbase scan api calls for a given filter condition.

  


## Notes about the api to be supported

  


getPartitionsByExpr - Current partition expression evaluation path ExprNodeGenericFuncDesc represents the partition filter expression in the plan

1. It is serialized into byte[] and Metastore api is invoked with the byte[].
2. ObjectStore processing of expression -
1. deserializes the byte[], prints it to convert it to Filter string
2. Converts Filter string to ExpressionTree using parser (Filter.g)
3. Walk ExpressionTree to create sql query (in direct sql)

  


getPartitionsByFilter - Evaluation of it is similar, it just skips the steps required to create the filter string. We certainly need the ability to work with filter string to support this function.

  


Why do we convert from ExprNodeGenericFuncDesc to kryo serialized byte[] and not to the filter string ?

  


Filter expressions supported currently

 Leaf Operators : =, >, <, <=, >=, LIKE, !=

 Logical Operators : AND, OR

  


Partition table in hbase

Partition information is stored in with the key as a delimited string consisting of - db name, table name, partition values

The value contains rest of the partition information. (side note: do we need the partition values in the value part?)

  
  
  
  
  
  
  
  
  


# Implementation

  


Serialization format of partition table key in hbase

  


Desirable properties for key serialization format -

1. It should be possible to perform filter operations on the keys without deserializing the fields (LIKE operator is not common, so its ok if we have to deserialize for that one)
2. The real order for the partition keys and the byte order for the keys should match
3. It should be possible to efficiently extract the relevant portion of the key for filters. ie, It should be possible to find the begin and end of bytes representing a partition value without checking every preceding byte.

BinarySortableSerDe satisfies these requirements except for number 3. Meeting requirement 3 might need some index information to be stored in end of the serialized key.

  


Limitations with current storage format (no secondary keys)

If there are multiple partition keys for a table, and partition filter condition does not have a condition on the first partition key, we would end up scanning all partitions for the table to find the matches. For this case, we need support for secondary indexes on the table. While we could implement this using a second table, the lack of support for atomic operations across rows/tables is a problem. We would need some level of transaction support in hbase to be able to create secondary indexes reliably. 

  
  


Filtering the partitions

The hbase api’s used will depend on the filtering condition -

1. For simple partition filtering conditions on initial partition column, that check for a particular partition or a range of partition, we can convert them into a simple Hbase Scan operation without any Filter  (new Scan(byte[] startRow, byte[] stopRow))
2. In case of more complex queries involving additional partition columns, we need to use a scan filter with conditions on remaining columns as well. ie, new Scan(byte[] startRow, byte[] stopRow) + Scan.setFilter(..)
3. If there are no conditions on the first partition column, then all partitions on the table would need to be scanned. In that case, start and end rows will be based only on the db+table prefix of the key.

  


Filters with top level “OR” conditions - Each of the conditions under OR should be evaluated to see which of the above api call pattern suits them. If any one of the conditions requires no 3 call pattern, it makes sense to represent the entire filter condition using api call pattern 3.

  
  


Examples of conversion of query plan to hbase api calls

* merge function below does a set-union
* p1 represents the first partition column
* The scan(startRow, endRow) scans from startRow to row before endRow. ie, it represents rows where (r >= startRow and r < endRow). But it can be made to represent (r > startRow) by adding a zero byte to startRow, and made to represent (r <= endRow) by adding zero byte to endRow. ie, the plans for >= and > are similar, <= and = are similar.
* All keys corresponding to a partitions of a table have a common prefix of “db + tablename”. That is referred to as “X” in following examples.

  
  


 



| Filter expression | HBase calls |
| p1 > 10 and p1 < 20  | Scan(X10+, X20) |
| p1 = 10 (if single partition column) | Scan(X10, X10+). Optimized? : Get(X10) |
| Similar case as above, if all partition columns are specified |  |
| p1 = 10 (multiple partition column) | Scan(X10, X+) |
| p1 = 9 or p1 = 10 | merge( get(X9), get(X10)) |
| p1 > 10 or p1 < 20 | merge(scan(X10, X+), scan(X  ,X20)) |
| (condition on columns other than first partition column) : condition1 | Scan(X, X+).setFilter(genFilter(condition1)) |
| p1 > 10 and condition1 | scan(X10, X+).setFilter(genFilter(condition1)) |
| p1 < 20 and condition1 | Scan(X , X20).setFilter(genFilter(condition1)) |
| p1 > 10 and p1 > 20 and p1 < 30 and p1 < 40 | Scan(X20+, X30) |
| p1 > 10 and (p1 > 20 or c1 = 5) =>(p1 > 10 and p1 > 20) or (p1 > 10 and c1 =5) | merge(Scan(X20+, X+), Scan(X10+,X+).setFilter(genFilter(c1 = 5))) |
| (special case with OR condition, if one of the conditions results in full table scan): condition1 or condition2 | Scan(X).filter(getCombinedFilter(condition1, condition2) (ie, convert to a full table scan with filter) |
| (general case with OR condition): condition1 or condition2 | merge( getResult(condition1), getResult(condition2)) |
| c1 and (c2 or c3) | (c1 and c2) or (c1 and c3) |
| (c1 or c2) and (c3 or c4) | (c1 and c3) or (c2 and c3) or (c1 and c4) or (c2 and c4) |

 

  
  


Relevant classes :

  


Input:

ExpressionTree (existing) - TreeNodes for AND/OR expressions. Leaf Node for leaf expressions with  =,< ...

  


Output:

  public static abstract class FilterPlan {

    abstract FilterPlan and(FilterPlan other);

    abstract FilterPlan or(FilterPlan other);

    abstract List<ScanPlan> getPlans();

  }

  


// represents a union of multiple ScanPlan

MultiScanPlan extends FilterPlan

  
  


ScanPlan extends FilterPlan

    // represent Scan start

    private ScanMarker startMarker ;

    // represent Scan end

    private ScanMarker endMarker ;

    private ScanFilter filter;

  


public FilterPlan and(FilterPlan other) {

 // calls this.and(otherScanPlan) on each scan plan in other

}

private ScanPlan and(ScanPlan other) {

   // combines start marker and end marker and filters of this and other

}

public FilterPlan or(FilterPlan other) {

   // just create a new FilterPlan from other, with this additional plan

}

  
  


PartitionFilterGenerator -

  /**

   * Visitor for ExpressionTree.

   * It first generates the ScanPlan for the leaf nodes. The higher level nodes are

   * either AND or OR operations. It then calls FilterPlan.and and FilterPlan.or with

   * the child nodes to generate the plans for higher level nodes.

   */

  
  
  


Initial implementation: Convert from from ExpressionTree to Hbase filter, thereby implementing both getPartitionsByFilter and getPartitionsByExpr

  


A new custom Filter class implementation needs to be created. Filter class implements Writable, and the hbase expression to be evaluated is serialized 

  


We can potentially create the filter directly from ExprNodeGenericFuncDesc in case of the new fastpath config is set.

  




 

 

