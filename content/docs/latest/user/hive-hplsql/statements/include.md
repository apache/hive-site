---
title: "Apache Hive : INCLUDE Statement"
date: 2026-08-12
---

# Apache Hive : INCLUDE Statement

INCLUDE statement allows you to include statements from another HPL/SQL script.

You can define user-defined functions and stored procedures in separate HPL/SQL scripts and then use INCLUDE statements to make them available in the current script. 

Additionally you can put INCLUDE statements to [.hplsqlrc]({{< ref "configuration##hplsqlrc-file" >}}) configuration file, so these functions and procedures are always available to users similar to persistent objects in the database.  

**Syntax**:

```
INLCUDE file_name; 
```

Notes:
- *file_name* is the path to the file (quoted or unquoted) or an expression

**Example**:

Create a separate file *set_message.sql* containing:

```
CREATE PROCEDURE set_message(IN name STRING, OUT result STRING)
BEGIN
 SET result = 'Hello, ' || name || '!';
END;
```

The call the procedure from another script as follows: 

```
INCLUDE set_message.sql

DECLARE str STRING;
CALL set_message('world', str);
PRINT str;

Result:
--
Hello, world!
```

**Compatibility:** HPL/SQL extension

**Version**: PL/HQL 0.3.1

See also:
- [CALL]({{< ref "call" >}})
- [CREATE FUNCTION]({{< ref "create-function" >}})
- [CREATE PROCEDURE]({{< ref "create-procedure" >}})
