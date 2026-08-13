---
title: "Apache Hive : On-the-Fly SQL Conversion in Hive"
date: 2026-08-12
---

# Apache Hive : On-the-Fly SQL Conversion in Hive

HPL/SQL supports many procedural dialects that allows you to reuse your existing code without changes. But not all statements are executed by HPL/SQL, some of them must be executed by the database.

Consider the following example:

```
IF code = 'A' THEN
  CREATE TABLE dept 
  (
    deptno NUMBER(2,0),
    dname  NUMBER(14),
    loc    VARCHAR2(13),
    CONSTRAINT pk_dept PRIMARY KEY (deptno)
  );
END IF;
```

In this example, IF statement is executed by PL/HQL itself. It checks the value of *code* variable and if it is equal to 'A', HPL/SQL executes the CREATE TABLE statement.

HPL/SQL cannot execute CREATE TABLE, this statement must be sent to the database to create a physical persistent table accessible to other sessions.

But you can see that the syntax of CREATE TABLE does not conform to Hive, it uses NUMBER and VARCHAR2 data types as well as a constraint.

Here is where On-the-fly SQL conversion comes into play. Before sending the CREATE TABLE statement to Hive, HPL/SQL converts it to

```
CREATE TABLE dept 
(
  deptno DECIMAL(2,0),
  dname  DECIMAL(14),
  loc    STRING
);
```

On-the-fly conversion is enabled by default and set using [hplsql.conn.convert.default]({{< ref "configuration#hplsqlconnconvertdefault" >}}) option.

## Data Types

Conversions for data types in CREATE TABLE statements:

| Source | Hive SQL |
| --- | --- |
| VARCHAR2 | STRING |
| NUMBER | DECIMAL |

For more details, see [Data Type Conversion]({{< ref "data-types#data_type_conversion" >}}).

## Language Elements and Operators

Conversions for language elements and operators in SQL DDL and DML statements:

| Source | Description | Hive SQL |
| --- | --- | --- |
| "identifier", [identifier] | Identifier | `` `identifier` `` |
| dbo, [dbo] | Schema name | Removed |
| [expr &#124;&#124; expr2 &#124;&#124; ...]({{< ref "twopipes" >}}) | String concatenation | [CONCAT(expr, expr2, ...)]({{< ref "concat" >}}) |

## Built-In SQL Functions

Conversion of built-in SQL functions in executable SQL statements:

| Source | Hive SQL |
| --- | --- |
| CURRENT_DATE | TO_DATE(FROM_UNIXTIME(UNIX_TIMESTAMP())) |
| CURRENT DATE | TO_DATE(FROM_UNIXTIME(UNIX_TIMESTAMP())) |
| CURRENT_TIMESTAMP | FROM_UNIXTIME(UNIX_TIMESTAMP()) |
| CURRENT TIMESTAMP | FROM_UNIXTIME(UNIX_TIMESTAMP()) |

## SQL SELECT Statement

Conversions of SQL SELECT statements:

| Source | Description | Hive SQL |
| --- | --- | --- |
| SELECT TOP n ... FROM ... | Row limit | SELECT ... FROM ... LIMIT n |
| SELECT without FROM | | FROM [hplsql.dual.table]({{< ref "configuration#hplsqldualtable" >}}) added for Hive 0.13 and earlier |
| FROM TABLE (VALUES ... ) clause | Row constructor | SELECT UNION ALL subquery |

For more information, see [SELECT Statement]({{< ref "select" >}}).

## SQL Statements

Conversion of SQL statements:

| Source | Description | Hive SQL |
| --- | --- | --- |
| [SET CURRENT SCHEMA = name]({{< ref "set-session#current-schema" >}}) | | [USE name]({{< ref "use" >}}) |
