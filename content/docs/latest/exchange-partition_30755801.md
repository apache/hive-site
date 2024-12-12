---
title: "Apache Hive : Exchange Partition"
date: 2024-12-12
---

# Apache Hive : Exchange Partition

The EXCHANGE PARTITION command will move a partition from a source table to target table and alter each table's metadata.  The Exchange Partition feature is implemented as part of [HIVE-4095](https://issues.apache.org/jira/browse/HIVE-4095). Exchanging multiple partitions is supported in Hive versions 1.2.2, 1.3.0, and 2.0.0+ as part of [HIVE-11745](https://issues.apache.org/jira/browse/HIVE-11745).

When the command is executed, the source table's partition folder in HDFS will be renamed to move it to the destination table's partition folder.  The Hive metastore will be updated to change the metadata of the source and destination tables accordingly.

The partition specification can be fully or [partially specified]({{< ref "#partially-specified" >}}).

See [Language Manual DDL]({{< ref "#language-manual-ddl" >}}) for additional information on the Exchange Partition feature.

#### Constraints

* The destination table cannot contain the partition to be exchanged.

* The operation fails in the presence of an index.
* Exchange partition is not allowed with transactional tables either as source or destination. Alternatively, use [LOAD DATA]({{< ref "#load-data" >}}) or [INSERT OVERWRITE]({{< ref "#insert-overwrite" >}}) commands to move partitions across transactional tables.
* This command requires both the source and destination table names to have the same table schema.    
If the schemas are different, the following exception is thrown:

`The tables have different schemas. Their partitions cannot be exchanged`
#### Syntax

```
ALTER TABLE <dest\_table> EXCHANGE PARTITION (<[partial] partition spec>) WITH TABLE <src\_table>

```

#### Example Usage – Basic

```
--Create two tables, partitioned by ds
CREATE TABLE T1(a string, b string) PARTITIONED BY (ds string);
CREATE TABLE T2(a string, b string) PARTITIONED BY (ds string);
ALTER TABLE T1 ADD PARTITION (ds='1');

--Move partition from T1 to T2
ALTER TABLE T2 EXCHANGE PARTITION (ds='1') WITH TABLE T1;
```

#### Example Usage – Partial Partition Spec (Exchanging Multiple Partitions)

```
--Create two tables with multiple partition columns.
CREATE TABLE T1 (a string, b string) PARTITIONED BY (ds string, hr string);
CREATE TABLE T2 (a string, b string) PARTITIONED BY (ds string, hr string);
ALTER TABLE T1 ADD PARTITION (ds = '1', hr = '00');
ALTER TABLE T1 ADD PARTITION (ds = '1', hr = '01');
ALTER TABLE T1 ADD PARTITION (ds = '1', hr = '03');

--Alter the table, moving all the three partitions data where ds='1' from table T1 to table T2 (ds=1) 
ALTER TABLE T2 EXCHANGE PARTITION (ds='1') WITH TABLE T1;
```

*Note that the schema for T1 is being used for the newly created partition T2(ds=1). Either all the partitions of T1 will get created or the whole operation will fail. All partitions of T1 are dropped.*

#### Example Usage – Partition Spec With Multiple Partition Columns

```
-- Create two tables with multiple partition columns.
CREATE TABLE T1 (a int) PARTITIONED BY (d1 int, d2 int);
CREATE TABLE T2 (a int) PARTITIONED BY (d1 int, d2 int);
ALTER TABLE T1 ADD PARTITION (d1=1, d2=2);

-- Alter the table, moving partition data d1=1, d2=2 from table T1 to table T2
ALTER TABLE T2 EXCHANGE PARTITION (d1 = 1, d2 = 2) WITH TABLE T1;

```

 

 

