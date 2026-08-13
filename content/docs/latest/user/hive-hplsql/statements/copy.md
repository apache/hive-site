---
title: "Apache Hive : COPY Statement"
date: 2026-08-12
---

# Apache Hive : COPY Statement

COPY statement allows to transfer data between tables and files. Use it to transfer relatively small volumes of data i.e. query results, look-up and dimension tables.

When you copy data between tables they can be located in different databases.

**Syntax**:

Export data to a file:

```
COPY table_name | (select_stmt) TO [HDFS] file_name [options]

options:
  DELIMITER 'char'
| SQLINSERT target_table_name
```

Copy data between existing tables:

```
COPY table_name | (select_stmt) TO target_table_name AT target_conn_name [options]

options:
  BATCHSIZE num
```

Notes:

- *table_name* is an identifier.
- *file_name* can be an expression, quoted or unquoted string.
- If *file_name* already exists it is overwritten.
- When HDFS is specified, the data is copied to a HDFS-compatible file system.
- DELIMITER specifies the delimiter between column values, '\t' (TAB character) is the default.
- SQLINSERT specifies to generate SQL INSERT statements to insert data to *target_table_name*. The statements are just stored in the file, and not executed.
- When you copy data into another table, the table must exist. 
- BATCHSIZE specifies the number of rows to transfer in a single batch when copying rows between tables, the default is 1000.

**Example 1**:

Export the query results to a file:

```
COPY (SELECT id, name FROM sales.users WHERE local_dt = CURRENT_DATE) 
  TO /data/users.txt DELIMITER '\t';
```

**Example 2**:

Generate SQL INSERT statements:

```
COPY sales.users TO /data/users2.sql SQLINSERT sales.users;
```

**Example 3**:

Copy rows from between tables in different databases:

```
COPY sales.users TO sales.users2 AT tdconn;
```

**Compatibility:** HPL/SQL Extension, PostgreSQL

**Version:** HPL/SQL 0.3.7

See also:
- [COPY FROM LOCAL]({{< ref "copy-from-local" >}})
- [INSERT DIRECTORY]({{< ref "insert-directory" >}})
