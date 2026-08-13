---
title: "Apache Hive : CREATE PROCEDURE Statement"
date: 2026-08-12
---

# Apache Hive : CREATE PROCEDURE Statement

CREATE PROCEDURE statement allows you to create a user-defined SQL procedure (stored procedure).

**Syntax**:

```
[ALTER | CREATE [OR REPLACE] | REPLACE] PROCEDURE | PROC procedure_name [parameters] 
 [AS | IS] 
 body

parameters:
  ([IN | OUT | INOUT | IN OUT] name data_type, ...)
  |
  (name [IN | OUT | INOUT | IN OUT] data_type, ...)

body:
  statement | expression | BEGIN statements END
```

**Example**:

Define a procedure and then call passing a parameter:

```
CREATE PROCEDURE set_message(IN name STRING, OUT result STRING)
BEGIN
 SET result = 'Hello, ' || name || '!';
END;

-- Now call the procedure and print the results
DECLARE str STRING;
CALL set_message('world', str);
PRINT str;

Result:
--
Hello, world!
```

**Compatibility:** Oracle, Teradata, IBM DB2, Microsoft SQL Server, PostgreSQL, MySQL and Netezza

**Version**: PL/HQL 0.3.1

See also:
- [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}})
- [CALL]({{< ref "call" >}})
- [CREATE PACKAGE]({{< ref "create-package" >}})
- [CREATE FUNCTION]({{< ref "create-function" >}})
- [INCLUDE]({{< ref "include" >}})
