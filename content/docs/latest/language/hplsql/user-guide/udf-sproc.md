---
title: "Apache Hive : HPL/SQL - User-Defined Functions and Stored Procedures"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - User-Defined Functions and Stored Procedures

HPL/SQL allows you to defined user-defined functions and stored procedures using [CREATE FUNCTION]({{% ref "create-function" %}}) and [CREATE PROCEDURE]({{% ref "create-procedure" %}}) statements, respectively.

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

Once defined the function/procedure, the metadata of the function/procedure will be stored in the HMS permanently and they can be used in any HPL/SQL and HQL expression as a built-in function. You can invoke a procedure using the [CALL]({{% ref "call" %}}) statement.

Use drop procedure/function to delete them permanently.
```
DROP PROCEDURE set_message;

DROP FUNCTION hello;
```

<!-- **Version**: HPL/SQL 0.3.1 -->

See also:
- [CALL]({{% ref "call" %}})
- [CREATE FUNCTION]({{% ref "create-function" %}})
- [CREATE PROCEDURE]({{% ref "create-procedure" %}})
