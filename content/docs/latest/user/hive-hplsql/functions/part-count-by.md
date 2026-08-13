---
title: "Apache Hive : PART_COUNT_BY Function"
date: 2026-08-12
---

# Apache Hive : PART_COUNT_BY Function

PART_COUNT_BY function returns the number partitions grouped by specified partition columns in the table.

**Syntax**:

```
PART_COUNT_BY([db_name.]table_name, [part_col, ...]); 
```

**Parameters:**

| [dbname.]table_name | Identifier, variable or expression |
| --- | --- |
| part_col | One or more partition columns used for aggregation |

**Return Value:**

- The number of top-level partitions if *part_col* is not specified
- Partition value and total number of existing partitions with the same value if *part_col* is not specified

**Examples:**

Table *db.orders* is partitioned by *dt* and *region* columns and has the following partitions:

| dt=2015-09-01/region=1 |
| --- |
| dt=2015-09-01/region=2 |
| dt=2015-09-02/region=1 |
| dt=2015-09-03/region=3 |
| dt=2015-09-03/region=2 |

Get the total number of distinct top-level partitions (dt=2015-09-01, dt=2015-09-02 and dt=2015-09-03):

```
part_count_by(db.orders); 
--
3
```

Get the top level partitions and the number of its sub-partitions:

```
part_count_by(db.orders, dt); 
--
dt=2015-09-01   2
dt=2015-09-02   1
dt=2015-09-03   2
```

Get the number of specified partitions:

```
part_count_by(db.orders, region); 
--
region=1    2
region=2    2
region=3    1
```

**Compatibility**: HPL/SQL extension.

**Version:** HPL/SQL 0.3.13

See also:
- [PART_COUNT]({{< ref "part-count" >}}) - Get the number of partitions
- [PART_LOC]({{< ref "part-loc" >}}) - Get the location of a partition
