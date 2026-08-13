---
title: "Apache Hive : MIN_PART_STRING Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : MIN_PART_STRING Function - PL/HQL

MIN_PART_STRING function finds the minimum value (first in alphabetical order) for the specified partition column of type STRING (VARCHAR/CHAR).

**Syntax**:

```
MIN_PART_STRING([db_name.]table_name [, column_name [, part_col=filter, ...]]); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| [dbname.]table_name | VARCHAR | Identifier, variable or expression | Table name |
| column_name | VARCHAR | Identifier, variable or expression | Partition column name | 
| part_col=filter | | | Partition filter |

**Notes**:

- If column name is not specified, the first partition column is used
- Partition filter applied before finding the minimum value

**Return Value:**

- The minimum string for the specified partition
- NULL if the table or partition do not exist, or the table is empty

**Return Type:**

STRING (VARCHAR/CHAR).

**Example 1:**

Table *db.orders* is partitioned by *country* and has the following partitions:

| country=US |
| --- |
| country=UK |
| country=DE |

Find the minimum value of the partition:

```
MIN_PART_STRING(db.orders); 
```

Result: DE

**Example 2:**

Table *db.sales* is partitioned by *country* and *local_date* and has the following partitions:

| country=US/local_date=2014-12-02 |
| --- |
| country=DE/local_date=2014-12-04 |
| country=UK/local_date=2014-12-04 | 

Find the minimum value for *country* partition column for local_date '2014-12-04':

```
MIN_PARTITION_STRING(db.sales, country, local_date='2014-12-04'); 
```

Result: DE

**Compatibility**: PL/HQL extension.

**Version:** PL/HQL 0.01

See also:

- [MAX_PART_STRING(table, colname, partition_spec)]({{< ref "max-part-string" >}})
- [MAX_PART_INT(table, colname, partition_spec)]({{< ref "max-part-int" >}})
- [MIN_PART_INT(table, colname, partition_spec)]({{< ref "min-part-int" >}})
- [MAX_PART_DATE(table, colname, partition_spec)]({{< ref "max-part-date" >}})
- [MIN_PART_DATE(table, colname, partition_spec)]({{< ref "min-part-date" >}})
