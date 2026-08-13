---
title: "Apache Hive : MAX_PART_INT Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : MAX_PART_INT Function - PL/HQL

MAX_PART_INT function finds the maximum value for the specified partition column of type INT.

**Syntax**:

```
MAX_PART_INT([db_name.]table_name [, column_name [, part_col=filter, ...]]); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| [dbname.]table_name | VARCHAR | Identifier, variable or expression | Table name |
| column_name | VARCHAR | Identifier, variable or expression | Partition column name | 
| part_col=filter | | | Partition filter |

**Notes**:

- If column name is not specified, the first partition column is used
- Partition filter applied before finding the maximum value
- If the partition contains non-integer values they are ignored

**Return Value:**

- The maximum INT value for the specified partition
- NULL if the table or partition do not exist, or the table is empty

**Return Type:**

INT.

**Example 1:**

Table *db.orders* is partitioned by *country*, *local_dt* and *hour* and has the following partitions:

| country=US/local_dt=2014-12-05/hour=1 |
| --- |
| country=US/local_dt=2014-12-05/hour=2 |
| country=US/local_dt=2014-12-05/hour=3 |
| country=US/local_dt=2014-12-05/hour=UNKNOWN |

Find the maximum value of the partition *hour*:

```
MAX_PART_INT(db.orders, hour); 
```

Result: 3

**Example 2:**

Table *db.sales* is partitioned by *country*, *local_date* and *hour* has the following partitions:

| country=US/local_dt=2014-12-06/hour=1 |
| --- |
| country=US/local_dt=2014-12-07/hour=2 |
| country=US/local_dt=2014-12-07/hour=UNKNOWN |
| country=US/local_dt=2014-12-08/hour=3 |

Find the maximum value for *hour* partition for local_date '2014-12-07':

```
MAX_PART_INT(db.sales, hour, local_date='2014-12-07'); 
```

Result: 2

**Compatibility**: PL/HQL extension.

**Version:** PL/HQL 0.01

See also:

- [MIN_PART_INT(table, colname, partition_spec)]({{< ref "min-part-int" >}})
- [MAX_PART_STRING(table, colname, partition_spec)]({{< ref "max-part-string" >}})
- [MIN_PART_STRING(table, colname, partition_spec)]({{< ref "min-part-string" >}})
- [MAX_PART_DATE(table, colname, partition_spec)]({{< ref "max-part-date" >}})
- [MIN_PART_DATE(table, colname, partition_spec)]({{< ref "min-part-date" >}})
