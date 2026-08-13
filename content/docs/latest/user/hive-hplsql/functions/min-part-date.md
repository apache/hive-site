---
title: "Apache Hive : MIN_PART_DATE Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : MIN_PART_DATE Function - PL/HQL

MIN_PART_DATE function finds the minimum value for the specified partition column of type DATE.

**Syntax**:

```
MIN_PART_DATE([db_name.]table_name [, column_name [, part_col=filter, ...]]); 
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

- The minimum date for the specified partition
- NULL if the table or partition do not exist, or the table is empty

**Return Type:**

DATE.

**Example 1:**

Table *db.orders* is partitioned by *local_date* and has the following partitions:

| local_date=2014-12-02 |
| --- |
| local_date=2014-12-03 |
| local_date=2014-12-04 |

Find the minimum value of the partition:

```
MIN_PART_DATE(db.orders); 
```

Result: 2014-12-02

**Example 2:**

Table *db.sales* is partitioned by *country* and *local_date* and has the following partitions:

| country=US/local_date=2014-12-02 |
| --- |
| country=US/local_date=2014-12-03 |
| country=UK/local_date=2014-12-04 | 

Find the minimum value for *local_date* partition column for country US:

```
MIN_PARTITION_DATE(db.sales, local_date, country='US'); 
```

Result: 2014-12-02

**Compatibility**: PL/HQL extension.

**Version:** PL/HQL 0.01

See also:

- [MAX_PART_DATE(table, colname, partition_spec)]({{< ref "max-part-date" >}})
- [MAX_PART_STRING(table, colname, partition_spec)]({{< ref "max-part-string" >}})
- [MIN_PART_STRING(table, colname, partition_spec)]({{< ref "min-part-string" >}})
- [MAX_PART_INT(table, colname, partition_spec)]({{< ref "max-part-int" >}})
- [MIN_PART_INT(table, colname, partition_spec)]({{< ref "min-part-int" >}})
