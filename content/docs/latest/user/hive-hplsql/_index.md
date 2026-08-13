---
title: "Apache Hive : Hive HPL/SQL Reference"
date: 2026-08-12
---

# Apache Hive : Hive HPL/SQL Reference

Hive Hybrid Procedural SQL On Hadoop (HPL/SQL) is a tool that implements procedural SQL for Hive. It is available in Hive 2.0.0 ([HIVE-11055](https://issues.apache.org/jira/browse/HIVE-11055)).

HPL/SQL is an open source tool (Apache License 2.0) that implements procedural SQL language for Apache Hive, SparkSQL, Impala as well as any other SQL-on-Hadoop implementation, any NoSQL and any RDBMS.

HPL/SQL is a hybrid and heterogeneous language that understands syntaxes and semantics of almost any existing procedural SQL dialect, and you can use with any database, for example, running existing Oracle PL/SQL code on Apache Hive and Microsoft SQL Server, or running Transact-SQL on Oracle, Cloudera Impala or Amazon Redshift.

HPL/SQL language is compatible to a large extent with Oracle PL/SQL, ANSI/ISO SQL/PSM (IBM DB2, MySQL, Teradata i.e), PostgreSQL PL/pgSQL (Netezza), Transact-SQL (Microsoft SQL Server and Sybase) that allows you leveraging existing SQL/DWH skills and familiar approach to implement data warehouse solutions on Hadoop. It also facilitates migration of existing business logic to Hadoop.

HPL/SQL is an efficient way to implement ETL processes in Hadoop.

## Getting Started

- [Why HPL/SQL]({{< ref "why" >}})
- [Key Features]({{< ref "features" >}})
- [Get Started]({{< ref "start" >}})
- [What's New]({{< ref "new" >}})

## User Guide

- [Command Line]({{< ref "cli" >}})
- [Configuration]({{< ref "configuration" >}})
- [Connections]({{< ref "connections" >}})
- [Working with Multiple Databases]({{< ref "multiple-databases" >}})
- [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}})
- [On-the-Fly SQL Conversion]({{< ref "conversion" >}})
- [UDF to Run HPL/SQL Scripts from Hive Queries]({{< ref "udf" >}})
- [Error Handling]({{< ref "error-handling" >}})
- [Native and Managed Temporary Tables]({{< ref "temporary-tables" >}})

## Language Elements

- [Data Types]({{< ref "data-types" >}})
- [Declaration]({{< ref "declare" >}})
- [Assignment]({{< ref "assign" >}})
- [DATE Literal]({{< ref "date-literal" >}})
- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
- [INTERVAL Expressions]({{< ref "interval" >}})
- [CASE Expressions]({{< ref "case" >}})
- [%TYPE Attribute]({{< ref "type-attribute" >}})
- [%ROWTYPE Attribute]({{< ref "rowtype-attribute" >}})
- [%ISOPEN, %FOUND and %NOTFOUND Cursor Attributes]({{< ref "cursor-attributes" >}})
- [Exceptions]({{< ref "exceptions" >}})

## Operators

- [Addition +]({{< ref "plus" >}})
- [Subtraction -]({{< ref "minus" >}})
- [Equality and Comparison =, &lt;&gt;, !=, &lt;, &gt;, &lt;=, &gt;=]({{< ref "equal" >}})
- [String Concatenation ||]({{< ref "twopipes" >}})

## Attributes and Built-in Variables

| Name | Description |
| --- | --- |
| [ACTIVITY_COUNT]({{< ref "activity_count" >}}) | Number of rows affected by last SQL statement |
| [HOSTCODE]({{< ref "hostcode" >}}) | Return code of the last OS command |
| [SQLCODE]({{< ref "sqlcode" >}}) | Return code of the last SQL statement |
| [SQLSTATE]({{< ref "sqlstate" >}}) | Return status of the last SQL statement |

## Statements

| Statement | Description |
| --- | --- |
| [ALLOCATE CURSOR]({{< ref "allocate-cursor" >}}) | Allocate cursor for procedure result set |
| [ASSOCIATE RESULT SET LOCATOR]({{< ref "associate-locator" >}}) | Define locators for procedure result sets |
| [BREAK]({{< ref "break" >}}) | Exit a loop |
| [CALL]({{< ref "call" >}}) | Execute a stored procedure |
| [CLOSE]({{< ref "close" >}}) | Close a cursor |
| [CMP]({{< ref "cmp" >}}) | Compare data in tables |
| [COPY]({{< ref "copy" >}}) | Copy data between tables and files |
| [COPY FROM FTP]({{< ref "copy-from-ftp" >}}) | Copy FTP files to Hadoop compatible file system |
| [COPY FROM LOCAL]({{< ref "copy-from-local" >}}) | Copy local files to Hadoop compatible file system |
| [CREATE DATABASE]({{< ref "create-database" >}}) | Create a database |
| [CREATE FUNCTION]({{< ref "create-function" >}}) | Create a user-defined SQL function |
| [CREATE LOCAL TEMPORARY TABLE]({{< ref "create-local-temporary-table" >}}) | Create a session-level temporary table |
| [CREATE PACKAGE]({{< ref "create-package" >}}) | Create a program package |
| [CREATE PROCEDURE]({{< ref "create-procedure" >}}) | Create a user-defined SQL procedure |
| [CREATE TABLE]({{< ref "create-table" >}}) | Create a table |
| [CREATE VOLATILE TABLE]({{< ref "create-volatile-table" >}}) | Create a session-level temporary table |
| [DECLARE]({{< ref "declare" >}}) | Declare a variable |
| [DECLARE CONDITION]({{< ref "declare-condition" >}}) | Declare a condition |
| [DECLARE CURSOR]({{< ref "declare-cursor" >}}) | Declare a cursor |
| [DECLARE HANDLER]({{< ref "declare-handler" >}}) | Declare a condition handler |
| [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}}) | Declare a temporary table |
| [DESCRIBE]({{< ref "describe" >}}) | Describe a database object |
| [DROP DATABASE]({{< ref "drop-database" >}}) | Drop a database |
| [DROP TABLE]({{< ref "drop-table" >}}) | Drop a table |
| [EXEC]({{< ref "execute" >}}) / [EXECUTE]({{< ref "execute" >}}) / [EXECUTE IMMEDIATE]({{< ref "execute" >}}) | Execute a dynamic SQL statement or procedure |
| [EXIT WHEN]({{< ref "exit" >}}) | Exit a loop |
| [FETCH]({{< ref "fetch" >}}) | Fetch the next row from a cursor |
| [FOR cursor]({{< ref "for-cursor" >}}) | FOR statement (Cursor loop) |
| [FOR range]({{< ref "for-range" >}}) | FOR statement (Integer range) |
| [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}}) | Get execution information |
| [HOST]({{< ref "host" >}}) | Execute an OS command or run an external process |
| [IF]({{< ref "if" >}}) | IF statement |
| [INCLUDE]({{< ref "include" >}}) | Include statements from another script |
| [INSERT]({{< ref "insert" >}}) | INSERT statement |
| [INSERT DIRECTORY]({{< ref "insert-directory" >}}) | Write query results to a file |
| [LEAVE]({{< ref "leave" >}}) | Exit a loop |
| [OPEN]({{< ref "open" >}}) | Open a cursor |
| [LOOP]({{< ref "loop" >}}) | Unconditional loop |
| [MAP OBJECT]({{< ref "map-object" >}}) | Map object name to a connection profile |
| [NULL]({{< ref "null" >}}) | No operation (no-op) statement |
| [PRINT]({{< ref "print" >}}) | Print a line |
| [RESIGNAL]({{< ref "resignal" >}}) | Resignal the exception |
| [RETURN]({{< ref "return" >}}) | Return from a routine |
| [SELECT]({{< ref "select" >}}) | SELECT statement |
| [SELECT INTO]({{< ref "select-into" >}}) | Assign values from a query |
| [SIGNAL]({{< ref "signal" >}}) | Raise a condition or exception |
| [SET]({{< ref "assign" >}}) | Assign a value to a variable |
| [SET Session Option]({{< ref "set-session" >}}) | Set a session option |
| [TRUNCATE]({{< ref "truncate" >}}) | Truncate a table |
| [UPDATE]({{< ref "update" >}}) | UPDATE statement |
| [USE]({{< ref "use" >}}) | Change the default database |
| [VALUES INTO]({{< ref "values-into" >}}) | Assign a value to a variable |
| [WHILE]({{< ref "while" >}}) | While loop |

## Functions

| Function | Description |
| --- | --- |
| [CAST]({{< ref "cast" >}}) | Convert to data type |
| [CHAR]({{< ref "char" >}}) | Convert to string |
| [COALESCE]({{< ref "coalesce" >}}) | Return first non-NULL value |
| [CONCAT]({{< ref "concat" >}}) | Concatenate two or more strings |
| [CURRENT_DATE]({{< ref "current-date" >}}) | Get the current date (year, month and day) |
| [CURRENT_TIMESTAMP]({{< ref "current-timestamp" >}}) | Get the current date and time |
| [CURRENT_USER]({{< ref "current-user" >}}) | Get the current user name |
| [DATE]({{< ref "date" >}}) | Convert to date |
| [DECODE]({{< ref "decode" >}}) | Implement IF-THEN-ELSE logic |
| [DBMS_OUTPUT.PUT_LINE]({{< ref "dbms-output" >}}) | Print a line |
| [FROM_UNIXTIME]({{< ref "from-unixtime" >}}) | Convert number of seconds since 1970-01-01 to timestamp |
| [INSTR]({{< ref "instr" >}}) | Find index of substring in a string |
| [LOWER]({{< ref "lower" >}}) | Convert a string to lower case |
| [LEN]({{< ref "len" >}}) | String length excluding trailing blanks |
| [LENGTH]({{< ref "length" >}}) | String length |
| [MAX_PART_STRING]({{< ref "max-part-string" >}}) | Get max partition value (string) |
| [MIN_PART_STRING]({{< ref "min-part-string" >}}) | Get min partition value (string) |
| [MAX_PART_INT]({{< ref "max-part-int" >}}) | Get max partition value (int) |
| [MIN_PART_INT]({{< ref "min-part-int" >}}) | Get min partition value (int) |
| [MAX_PART_DATE]({{< ref "max-part-date" >}}) | Get max partition value (date) |
| [MIN_PART_DATE]({{< ref "min-part-date" >}}) | Get min partition value (date) |
| [NOW]({{< ref "now" >}}) | Get the current date and time |
| [NVL]({{< ref "nvl" >}}) | Return first non-NULL value |
| [NVL2]({{< ref "nvl2" >}}) | If 1st operand is null return 3rd otherwise 2nd operand |
| [PART_LOC]({{< ref "part-loc" >}}) | Get the location of a partition |
| [PART_COUNT]({{< ref "part-count" >}}) | Get the number of partitions |
| [PART_COUNT_BY]({{< ref "part-count-by" >}}) | Get the number of partitions (group by) |
| [REPLACE]({{< ref "replace" >}}) | Replace a string |
| [SUBSTR]({{< ref "substr" >}}) | Return a substring |
| [SUBSTRING]({{< ref "substring" >}}) | Return a substring |
| [SYSDATE]({{< ref "sysdate" >}}) | Get the current date and time |
| [TIMESTAMP_ISO]({{< ref "timestamp-iso" >}}) | Convert string to timestamp |
| [TO_CHAR]({{< ref "to-char" >}}) | Convert to string |
| [TO_TIMESTAMP]({{< ref "to-timestamp" >}}) | Convert string to timestamp |
| [TRIM]({{< ref "trim" >}}) | Remove leading and trailing characters |
| [UNIX_TIMESTAMP]({{< ref "unix-timestamp" >}}) | Get the current date and time in seconds since 1970-01-01 |
| [UPPER]({{< ref "upper" >}}) | Convert a string to upper case |
| [USER]({{< ref "functions/user.md" >}}) | Get the current user name |

## Commands

| Command | Description |
| --- | --- |
| [hive]({{< ref "hive" >}}) | Invoke Hive CLI |
| [! cmd;]({{< ref "host" >}}) | Execute an OS command or run an external process |

## File I/O Operations

- [UTL_FILE Package]({{< ref "utl-file" >}})

## Troubleshooting

- [Troubleshooting]({{< ref "troubleshooting" >}})

## Compatibility

- [Oracle PL/SQL]({{< ref "plsql" >}})
</content>
</invoke>