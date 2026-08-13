---
title: "Apache Hive : PART_COUNT Function"
date: 2026-08-12
---

# Apache Hive : PART_COUNT Function

PART_COUNT function returns the number partitions in the specified table.

**Syntax**:

```
PART_COUNT([db_name.]table_name, part_col=filter, ...); 
```

**Parameters:**

| [dbname.]table_name | Identifier, variable or expression |
| --- | --- |
| part_col=filter | One or more partition filters |

**Notes**:

- HPL/SQL uses the following Hive statement to get the partition information:

```
SHOW PARTITIONS db_name.tab_name [PARTITION (part_col=filter, ...)]
```

**Return Value:**

- The number of partitions
- NULL if the table does not exist or an error occurs

**Return Type:**

INT

**Examples:**

Table *db.orders* is partitioned by *dt* and *region* columns and has the following partitions:

| dt=2015-09-01/region=1 |
| --- |
| dt=2015-09-01/region=2 |
| dt=2015-09-02/region=1 |
| dt=2015-09-03/region=3 |
| dt=2015-09-03/region=2 |

Get the total number of partitions:

```
part_count(db.orders); 
--
5
```

Get the number of partitions in *region 1*:

```
part_count(db.orders, region='1'); 
--
2
```

**Compatibility**: HPL/SQL extension.

**Version:** HPL/SQL 0.3.13

See also:
- [PART_COUNT_BY]({{< ref "part-count-by" >}}) - Get the number of partitions (group by)
- [PART_LOC]({{< ref "part-loc" >}}) - Get the location of a partition
