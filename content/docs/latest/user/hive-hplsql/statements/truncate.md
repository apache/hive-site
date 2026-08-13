---
title: "Apache Hive : TRUNCATE TABLE Statement"
date: 2026-08-12
---

# Apache Hive : TRUNCATE TABLE Statement

TRUNCATE TABLE statement removes all rows in the specified table.

**Syntax**:

```
TRUNCATE [TABLE] table_name 
```

**Example:**

Remove all rows in *users2015* table:

```
truncate table users2015;
```

**Compatibility:** Oracle, Microsoft SQL Server, IBM DB2, MySQL, Hive

**Version**: HPL/SQL 0.3.17

See also:
- [DROP TABLE]({{< ref "drop-table" >}})
