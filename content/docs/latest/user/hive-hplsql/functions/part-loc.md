---
title: "Apache Hive : PART_LOC Function"
date: 2026-08-12
---

# Apache Hive : PART_LOC Function

PART_LOC function returns the location of the specified table partition in HDFS or other storage.

**Syntax**:

```
PART_LOC([db_name.]table_name, part_col=filter, ... [, with_hostname]); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| [dbname.]table_name | VARCHAR | Identifier, variable or expression | Table name |
| part_col=filter | | | One or more partition filters |
| with_hostname | INT | Variable or expression | 1 - return path with host name \\ 0 - without host name (default) |

**Notes**:

- HPL/SQL uses the following Hive statement to get the partition information:

```
DESCRIBE EXTENDED db_name.tab_name PARTITION (part_col=filter, ...)
```

**Return Value:**

- The partition directory
- NULL if the table or partition do not exist

**Return Type:**

STRING (VARCHAR/CHAR).

**Example:**

Table *db.orders* is partitioned by *country* and has the following partitions:

| **Partition** | **Directory** |
| --- | --- |
| country='US' | /data/db/orders/country=US |
| country='UK' | /data/db/orders/country=UK |
| country='DE' | /data/db/orders/country=DE |
| country='BY' | /data/db/orders/country=BY |

Get the location of country=US partition:

```
PART_LOC(db.orders, country='US', 1); 

Result:
hdfs://hostname:8020/data/db/orders/country=US
```

Return the path without host name:

```
PART_LOC(db.orders, country='US'); 

Result:
/data/db/orders/country=US
```

**Compatibility**: HPL/SQL extension.

**Version:** HPL/SQL 0.1
