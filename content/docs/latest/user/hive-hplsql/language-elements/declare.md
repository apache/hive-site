---
title: "Apache Hive : Declarations - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : Declarations - PL/HQL Reference

You can declare variables using DECLARE block or statement. 

Note that you can mix both syntaxes in a single program. DECLARE blocks and statements can appear in any part of the program.

## DECLARE Block

DECLARE block has the following syntax:

```
DECLARE 
  var datatype [NOT NULL] [:= | = | DEFAULT expression];
  ...
BEGIN
  ...
END;
```

HPL/SQL also allows you to define a constant:

```
  var CONSTANT datatype := | DEFAULT expression
```

Example:

```
DECLARE
  code CHAR(10);
  status INT := 1;
  count SMALLINT = 0;
  limit INT DEFAULT 100;  
  max_limit CONSTANT INT := 1000;
BEGIN 
  ...
END;
```

**Compatibility:** Declaration block syntax is similar to Oracle PL/SQL, PostgreSQL PL/pgSQL and Netezza NZPLSQL.
## DECLARE Statement

DECLARE statement has the following syntax:

```
DECLARE var [, var2, ...] [AS] datatype [:= | = | DEFAULT expression] [, ...];
```

Example:

```
DECLARE code CHAR(10);
DECLARE status, status2 INT DEFAULT 1;
DECLARE count SMALLINT, limit INT DEFAULT 100;  
```

**Compatibility:** Declaration statement syntax is similar to IBM DB2 SQL PL, Teradata, Microsoft SQL Server Transact-SQL and MySQL.
