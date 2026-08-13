---
title: "Apache Hive : CREATE TABLE Statement - PL/HQL"
date: 2026-08-12
---

# Apache Hive : CREATE TABLE Statement - PL/HQL

CREATE TABLE statement create a table in the database.

**Syntax**:

```
CREATE TABLE [IF NOT EXISTS] table_name
(
   column_name data_type [NULL | NOT NULL]
   [, constraint ...]
   [, ...]
)
```

## CREATE TABLE Conversion

If the CREATE TABLE statement is defined using the syntax not supported by Hive, it is automatically converted to conform to Hive syntax. 

Currently PL/HQL converts data types, removes NOT NULL/NULL, constraints and default values. For more information, see [On-the-Fly Conversion]({{< ref "conversion" >}})

**Example**:

Convert SQL and create a table in Hive:

```
CREATE TABLE dept (
  deptno NUMBER(2,0),
  dname  NUMBER(14),
  loc    VARCHAR2(13),
  CONSTRAINT pk_dept PRIMARY KEY (deptno)
);
```

**Compatibility:** Oracle, Microsoft SQL Server, IBM DB2, Teradata, PostgreSQL, MySQL and Netezza

**Version**: PL/HQL 0.03
