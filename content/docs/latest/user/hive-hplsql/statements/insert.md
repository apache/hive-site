---
title: "Apache Hive : INSERT Statement"
date: 2026-08-12
---

# Apache Hive : INSERT Statement

INSERT statement inserts rows into a table.

**Syntax**:

Insert from SELECT:

```
INSERT OVERWRITE TABLE table_name select_statement
| 
INSERT INTO [TABLE] table_name select_statement
```

Insert values:

```
INSERT INTO [TABLE] table_name VALUES (exrp, expr2, ...) [, (exrp, expr2, ...), ...] 
```

## INSERT VALUES

HPL/SQL provides you with two options to run INSERT VALUES statement: **native** and **select**.

Use the [hplsql.insert.values]({{< ref "configuration#hplsqlinsertvalues" >}}) option to define how to handle INSERT VALUES statement, the default value is **native**.

### Native INSERT VALUES

If [hplsql.insert.values]({{< ref "configuration#hplsqlinsertvalues" >}}) is set to **native** HPL/SQL relies on the database that must support INSERT VALUES syntax. Note that INSERT VALUES is available in Hive since version 0.14 only and can only be performed on tables that support ACID.

### Transform into INSERT SELECT

If [hplsql.insert.values]({{< ref "configuration#hplsqlinsertvalues" >}}) is set to **select** HPL/SQL transforms VALUES clause to the list of SELECT FROM dual UNION ALL ... clauses.

For example, if you execute the following INSERT statement:

```
INSERT INTO dept VALUES
(10, 'ACCOUNTING', 'NEW YORK'),
(20, 'RESEARCH',   'DALLAS'),
(30, 'SALES',      'CHICAGO'),
(40, 'OPERATIONS', 'BOSTON');
```

HPL/SQL transforms it to:

```
INSERT INTO dept 
SELECT 10, 'ACCOUNTING', 'NEW YORK' FROM default.dual
UNION ALL
SELECT 20, 'RESEARCH', 'DALLAS' FROM default.dual
UNION ALL
SELECT 30, 'SALES', 'CHICAGO' FROM default.dual
UNION ALL
SELECT 40, 'OPERATIONS', 'BOSTON' FROM default.dual;
```

You can specify the single row, single column dual table using [hplsql.dual.table]({{< ref "configuration#hplsqldualtable" >}}) option.

**Important Note:** Such approach leads to creating one HDFS file **per** INSERT statement, and must not be used to insert large number of rows. 

**Compatibility:** Oracle, Microsoft SQL Server, IBM DB2, Teradata, PostgreSQL and MySQL

**Version**: HPL/SQL 0.3
