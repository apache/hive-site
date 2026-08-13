---
title: "Apache Hive : SELECT Statement"
date: 2026-08-12
---

# Apache Hive : SELECT Statement

SELECT statement allows you to run queries. 

## SELECT TOP n

You can specify a SELECT statement with the TOP clause. PL/SQL automatically converts it to LIMIT clause for Hive.  

**Example**:

```
SELECT TOP 3 name FROM sales;    -- SELECT name FROM sales LIMIT 3 is executed
```

**Compatibility**: Microsoft SQL Server.

**Version**: PL/HQL 0.3.7

## SELECT Without FROM Clause

You can specify a SELECT statement without FROM. PL/SQL automatically adds the FROM clause using the table name defined by the [plhql.dual.table]({{< ref "configuration#plhqldualtable" >}}) option.  

By default, PL/HQL uses *default.dual* table name. Make sure such table exists in the database and contains exactly one row and one column only.

**Example**:

```
SELECT unix_timestamp();    -- SELECT unix_timestamp() FROM default.dual is executed
```

**Compatibility**: Microsoft SQL Server, PostgreSQL, MySQL and Netezza.

**Version**: PL/HQL 0.03

## FROM TABLE (VALUES ... ) Clause

You can generate table rows using TABLE (VALUES ...) clause (row constructor).

Syntax:

```
FROM TABLE (VALUES row, ...) AS table_alias (col, ...)
```

**Example 1**:

```
SELECT * FROM TABLE (VALUES 1, 2, 3) AS rn(rownum);

rownum
------
1
2
3
```

**Example 2**:

```
SELECT * FROM (VALUES (1,1), (2,2), (3,3)) AS rn(c1, c2);

c1     c2
---------
1      1
2      2
3      3
```

Note that PL/HQL transforms FROM (VALUES ...) clause to SELECT UNION ALL subquery before the execution in Hive:

```
SELECT * FROM
(SELECT 1 AS c1, 1 AS c2 FROM default.dual
 UNION ALL
 SELECT 2 AS c1, 2 AS c2 FROM default.dual
 UNION ALL
 SELECT 3 AS c1, 3 AS c2 FROM default.dual) rn
```

You can specify the single row, single column dual table using [plhql.dual.table]({{< ref "configuration#plhqldualtable" >}}) option.

**Compatibility**: IBM DB2, Microsoft SQL Server

**Version**: PL/HQL 0.03

See also:
- [SELECT INTO]({{< ref "select-into" >}})
