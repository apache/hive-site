---
title: "Apache Hive : CALL Statement - PL/HQL"
date: 2026-08-12
---

# Apache Hive : CALL Statement - PL/HQL

CALL statement allows you to execute a stored procedure.

**Syntax**:

```
CALL procedure_name [(parameter, ...)]; 
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

**Compatibility:** Teradata, IBM DB2 and MySQL

**Version**: PL/HQL 0.3.1

See also:
- [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}})
- [CREATE FUNCTION]({{< ref "create-function" >}})
- [CREATE PROCEDURE]({{< ref "create-procedure" >}})
- [INCLUDE]({{< ref "include" >}})
