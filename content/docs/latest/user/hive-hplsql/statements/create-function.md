---
title: "Apache Hive : CREATE FUNCTION Statement"
date: 2026-08-12
---

# Apache Hive : CREATE FUNCTION Statement

CREATE FUNCTION statement allows you to create a user-defined SQL function.

**Syntax**:

```
ALTER | CREATE [OR REPLACE] | REPLACE FUNCTION function_name ( [parameters] )
 RETURNS | RETURN data_type
 [AS | IS] 
 body

parameters:
  [IN] name data_type, ...
  |
  name [IN] data_type, ...

body:
  statement | expression | BEGIN statements END
```

**Example 1**:

Create a function without parameters:

```
CREATE FUNCTION hello()
 RETURNS STRING
BEGIN
 RETURN 'Hello, world';
END;

-- Call the function
PRINT hello();
```

**Example 2**:

Create a function with a parameter:

```
CREATE FUNCTION hello2(text STRING)
 RETURNS STRING
BEGIN
 RETURN 'Hello, ' || text || '!';
END;

-- Call the function
PRINT hello2('world');
```

**Compatibility:** Oracle, Teradata, IBM DB2, Microsoft SQL Server, PostgreSQL, MySQL and Netezza

**Version**: HPL/HQL 0.3.1

See also:
- [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}})
- [CALL]({{< ref "call" >}})
- [CREATE PACKAGE]({{< ref "create-package" >}})
- [CREATE PROCEDURE]({{< ref "create-procedure" >}})
- [INCLUDE]({{< ref "include" >}})
