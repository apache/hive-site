---
title: "Apache Hive : Data Types"
date: 2026-08-12
---

# Apache Hive : Data Types

You can use the following data types in HPL/SQL programs:

| Data Type | Aliases | Description |
| --- | --- | --- |
| BIGINT | INT8 | 64-bit integer |
| BINARY_DOUBLE | | Double precision floating-point number |
| BINARY_FLOAT | | Single precision floating-point number |
| BINARY_INTEGER | | 32-bit integer |
| BIT | | 0, 1 or NULL |
| BOOL | BOOLEAN | True or false |
| CHAR(*n*) | CHARACTER(*n*) | Fixed-length string |
| DECIMAL(*p,s*) | | Fixed-point number |
| DATE | | Date (year, month and day) |
| DATETIME | | Date and time |
| DOUBLE | DOUBLE PRECISION | Double precision floating-point number |
| FLOAT | | Single precision floating-point number |
| INT | INTEGER, INT4 | 32-bit integer |
| NCHAR(*n*) | | Fixed-length string |
| NVARCHAR(*n*) | | Variable-length string |
| NUMERIC(*p,s*) | | Fixed-point number |
| NUMBER(*p,s*) | | Fixed-point number |
| PLS_INTEGER | | 32-bit integer |
| REAL | | Single precision floating-point number |
| RECORD | | Arbitrary record |
| SIMPLE_DOUBLE | | Double precision floating-point number |
| SIMPLE_FLOAT | | Single precision floating-point number |
| SIMPLE_INTEGER | | 32-bit integer |
| SMALLINT | INT2 | 16-bit integer |
| SYS_REFCURSOR | | Cursor variable |
| TIMESTAMP | | Date and time |
| TINYINT | | 8-bit integer |
| VARCHAR(*n*) | VARCHAR(max) | Variable-length string |
| VARCHAR2(*n*) | | Variable-length string |
| UTL_FILE.FILE_TYPE | | File handle |

## Data Type Conversion

If CREATE TABLE contains a data type that is not supported by Hive, it is automatically converted by HPL/SQL.

Currently HPL/SQL performs the following conversions:

| Source | Hive SQL |
| --- | --- |
| BIT | TINYINT |
| DATETIME | TIMESTAMP |
| INT(n) | INT |
| INT2 | SMALLINT |
| INT4 | INT |
| INT8 | BIGINT |
| NCHAR(n) | STRING |
| NVARCHAR(n) | STRING |
| NUMBER(p,s) | DECIMAL(p,s) |
| NUMERIC(p,s) | DECIMAL(p,s) |
| TEXT | STRING |
| VARCHAR(MAX) | STRING |
| VARCHAR2(n) | STRING |

For more information, see [On-the-Fly Conversion]({{< ref "conversion" >}})
