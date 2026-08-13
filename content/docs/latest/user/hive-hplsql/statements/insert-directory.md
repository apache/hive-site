---
title: "Apache Hive : INSERT DIRECTORY Statement"
date: 2026-08-12
---

# Apache Hive : INSERT DIRECTORY Statement

INSERT DIRECTORY statement allows you to write the query results to a local or HDFS-compatible file system.

**Syntax**:

```
INSERT OVERWRITE [LOCAL] DIRECTORY directory select_statement
```

Notes:
- *directory* specifies the target directory (path, variable or expression)
- *select_statement* specifies the query (you can also use dynamic SQL string)

**Examples:**

Export sales data:

```
insert overwrite directory '/data/sales_daily' select * from sales_daily;
```

Export sales data from the specified table and put to the directory for the current date:

```
declare tabname string = 'sales_daily';

insert overwrite directory '/data/sales_' || current_date 
  'select * from ' || tabname;
```

**Compatibility:** Hive

**Version**: HPL/SQL 0.3.17

See also:
- [COPY]({{< ref "copy" >}})
- [COPY FROM LOCAL]({{< ref "copy-from-local" >}})
