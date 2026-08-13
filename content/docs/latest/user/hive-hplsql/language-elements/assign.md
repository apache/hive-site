---
title: "Apache Hive : Assignment"
date: 2026-08-12
---

# Apache Hive : Assignment

You can use the assignment operator or statement to set a new value to variable in HPL/SQL. 

If the variable was not explicitly declared before the assignment, a new variable is created and its data type is derived from the assignment expression.

## Assignment Operator

Values can be set using the assignment operator := or =

Syntax:

```
var [:= | = ] expression;
```

Example:

```
code := 'A';
status := 1;
count = 0;
```

**Compatibility:** Oracle PL/SQL, PostgreSQL PL/pgSQL and Netezza NZPLSQL.

**Version**: PL/HQL 0.01

## Assignment Statement

You can also use the SET statement to assign value to variables.

Syntax:

```
SET var = expression [, ...];
|
SET (var [, var2, ...]) = (expression [, expression2, ...])
```

Example:

```
SET code = 'A';
SET status = 1, count = 0;
SET (count, limit) = (0, 100);
```

**Compatibility:** IBM DB2, Teradata, Microsoft SQL Server and MySQL.

**Version**: PL/HQL 0.01

## Assignment From a SELECT Statement

You can also use the SET statement to assign value from the first row of a query result:

Syntax:

```
SET var = (SELECT col FROM ...);
|
SET (var [, var2, ...]) = (SELECT col [, col2, ... ] FROM ...);
|
SELECT var = col [, var2 = col2, ...] FROM ...  -- since HPL/SQL 0.3.11
```

Example:

```
SET code = (SELECT code FROM conf WHERE name = 'A');
SET (count, limit) = (SELECT count, limit FROM conf WHERE name = 'A');
SELECT @count = count, @limit = limit FROM conf WHERE name = 'A';
```

**Compatibility:** IBM DB2, Teradata, Microsoft SQL Server and MySQL.

**Version**: PL/HQL 0.3.7

See also:
- [SELECT INTO]({{< ref "select-into" >}})
- [VALUES INTO]({{< ref "values-into" >}})
