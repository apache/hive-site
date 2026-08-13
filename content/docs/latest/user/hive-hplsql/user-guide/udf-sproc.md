---
title: "Apache Hive : User-Defined Functions and Stored Procedures ="
date: 2026-08-12
---

# Apache Hive : User-Defined Functions and Stored Procedures =

HPL/SQL allows you to defined user-defined functions and stored procedures using [CREATE FUNCTION]({{< ref "create-function" >}}) and [CREATE PROCEDURE]({{< ref "create-procedure" >}}) statements, respectively.

## Define Functions and Procedures in the Current Script

The easiest way to use HPL/SQL functions and procedures is to define them in the current script before their actual use.

For example:

```
CREATE FUNCTION hello(text STRING)
 RETURNS STRING
BEGIN
 RETURN 'Hello, ' || text || '!';
END;

CREATE PROCEDURE set_message(IN name STRING, OUT result STRING)
BEGIN
 SET result = 'Hello, ' || name || '!';
END;

-- Invoke the function
PRINT hello('world');

-- Call the procedure and print the results
DECLARE str STRING;
CALL set_message('world', str);
PRINT str;
```

Once defined the function can be used in any HPL/SQL and HQL expression as a built-in function. You can invoke a procedure using the [CALL]({{< ref "call" >}}) statement.

## Permanent Functions and Stored Procedures

HPL/SQL allows you to share functions and procedures between HPL/SQL scripts so you do not need to put their content to every script. 

Unlike databases that typically store functions and stored procedures in the database catalog, HPL/SQL stores them in local files. There are several options how to you can include functions and procedures:

- Use *.hplsqlrc* file

You can put your functions and procedures to *.hplsqlrc* file. The content of this file is automatically executed when you start *hplsql* tool. For more information, see [.hplsqlrc]({{< ref "configuration#hplsqlrc-file" >}}) file. 

- INCLUDE statement

Using [INCLUDE]({{< ref "include" >}}) statement you can load function and procedures definitions from any file. Note that you can also use [INCLUDE]({{< ref "include" >}}) statements in [.hplsqlrc]({{< ref "configuration#hplsqlrc-file" >}}) file. 

## Using HPL/SQL User-Defined Functions in Hive Queries

HPL/SQL allows you to invoke user-defined functions written in HPL/SQL language from Hive queries the same way as you use HQL built-in functions.

HPL/SQL CLI tool automatically puts referenced HPL/SQL functions and procedures to Distributed Cache, registers the Hive UDF and modifies the function call in the SQL statements. For more information, see [Hive UDF to Run HPL/HQL Scripts]({{< ref "udf" >}}).

**Version**: HPL/SQL 0.3.1

See also:
- [CALL]({{< ref "call" >}})
- [CREATE FUNCTION]({{< ref "create-function" >}})
- [CREATE PROCEDURE]({{< ref "create-procedure" >}})
- [INCLUDE]({{< ref "include" >}})
