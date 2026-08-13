---
title: "Apache Hive : Oracle PL/SQL Compatibility"
date: 2026-08-12
---

# Apache Hive : Oracle PL/SQL Compatibility

HPL/SQL compatibility with Oracle PL/SQL and SQL.

## Language Elements

Oracle PL/SQL language elements supported by HPL/SQL:

| Feature | Description | Supported | Since |
| --- | --- | --- | --- |
| TRUE and FALSE | Boolean literals | Yes | 0.3.13 |
| -- comment | Single line comment | Yes | 0.1 |
| /* comment */ | Multi line comment | Yes | 0.1 |
| NOT NULL | Variable constraint | Parser only | 0.3.13 |
| CONSTANT | Constant variable | Yes | 0.3.13 |
| := or DEFAULT | Default clause | Yes | 0.1 |
| [%TYPE]({{< ref "type-attribute" >}}) | Data type attribute | Yes | 0.3.13 |
| SUBTYPE *subtype* IS *type* | Subtype | No | |

## Data Types and Declarations

Oracle PL/SQL data types supported by HPL/SQL:

| Data Type | Description | Supported | Since |
| --- | --- | --- | --- |
| BIGINT | 64-bit integer | Yes | 0.3.13 |
| BINARY_DOUBLE | Double precision floating-point number | Yes | 0.3.13 |
| BINARY_FLOAT | Single precision floating-point number | Yes | 0.3.13 |
| BINARY_INTEGER | 32-bit integer | Yes | 0.3.13 |
| BLOB | Binary long data | No | |
| BOOLEAN | True or false | Yes | 0.3.13 |
| CHAR(*n*) | Fixed-length string | Yes | 0.1 |
| CHARACTER(*n*) | Fixed-length string | Yes | 0.1 |
| CLOB | Character long data | No | |
| DECIMAL(*p,s*) | Fixed-point number | Yes | 0.1 |
| DATE | Date (year, month, day and time) | Yes | 0.1 |
| INT | 32-bit integer | Yes | 0.1 |
| INTEGER | 32-bit integer | Yes | 0.1 |
| LONG | Long string | No | |
| LONG RAW | Long binary string | No | |
| NATURAL | Nonnegative 32-bit integer | No | |
| NATURALN | Nonnegative non-null 32-bit integer | No | |
| NCHAR(*n*) | Fixed-length string | Yes | 0.1 |
| NCLOB | Character long data | No | |
| NVARCHAR(*n*) | Variable-length string | Yes | 0.1 |
| NUMBER(*p,s*) | Fixed-point number | Yes | 0.1 |
| PLS_INTEGER | 32-bit integer | Yes | 0.3.13 |
| POSITIVE | Positive 32-bit integer | No | |
| POSITIVEN | Positive non-null 32-bit integer | No | |
| RAW | Binary data | No | |
| ROWID | Row address | No | |
| SIGNTYPE | -1, 0 or 1 | No | |
| SIMPLE_DOUBLE | Double precision floating-point number | Yes | 0.3.13 |
| SIMPLE_FLOAT | Single precision floating-point number | Yes | 0.3.13 |
| SIMPLE_INTEGER | 32-bit integer | Yes | 0.3.13 |
| SMALLINT | 16-bit integer | Yes | 0.1 |
| SYS_REFCURSOR | Cursor variable | Yes | 0.3.11 |
| TIMESTAMP | Date and time | Yes | 0.3.7 |
| VARCHAR(*n*) | Variable-length string | Yes | 0.1 |
| VARCHAR2(*n*) | Variable-length string | Yes | 0.1 |
| UROWID | Row address | No | |
| UTL_FILE.FILE_TYPE | File handle | Yes | 0.1 |

## Operators and Expressions

Oracle PL/SQL operators and expressions supported by HPL/SQL:

| Operator | Description | Supported | Since |
| --- | --- | --- | --- |
| [&#124;&#124; Operator]({{< ref "twopipes" >}}) | String concatenation | Yes | 0.1 |

## Statements

Oracle PL/SQL statements supported by HPL/SQL:

| Statement | Description | Supported | Since |
| --- | --- | --- | --- |
| [:=]({{< ref "assign" >}}) | Assignment statement | Yes | 0.1 |
| [CREATE FUNCTION]({{< ref "create-function" >}}) | Create a user-defined function | Yes | 0.3.1 |
| [CREATE PACKAGE]({{< ref "create-package" >}}) | Create a package | Yes | 0.3.13 |
| [CREATE PROCEDURE]({{< ref "create-procedure" >}}) | Create a stored procedure | Yes | 0.3.1 |
| [NULL]({{< ref "null" >}}) | No operation | Yes | 0.3.13 |
| [SELECT INTO]({{< ref "select-into" >}}) | Assign values from query | Yes | 0.1 |
