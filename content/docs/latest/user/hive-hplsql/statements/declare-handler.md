---
title: "Apache Hive : DECLARE HANDLER Statement - PL/HQL"
date: 2026-08-12
---

# Apache Hive : DECLARE HANDLER Statement - PL/HQL

You can use DECLARE HANDLER statement to define one or more PL/HQL statements to execute when a condition occurs.

**Syntax**:

```
DECLARE [CONTINUE | EXIT] HANDLER FOR 
  [SQLEXCEPTION | NOT FOUND | user_condition] code_block;
```

**Description:**

| CONTINUE | When the handler completes, control is returned to PL/HQL statement following the statement that raised the condition |
| --- | --- |
| EXIT | After the handler completes, control is returned to the end of the block that declared the handler |
| *code_block* | PL/HQL statement(s) to execute when the specified condition occurs |

**Examples:**

```
DECLARE name VARCHAR(100);
DECLARE no_rows INT DEFAULT 0; 

DECLARE CONTINUE HANDLER FOR NOT FOUND
  SET no_rows = 1;    

OPEN cur FOR 'SELECT name FROM db.orders';

FETCH cur INTO name;
WHILE no_rows = 0 THEN  
  PRINT id;
  FETCH cur INTO name;
END WHILE;
CLOSE cur;
```

**Compatibility:** IBM DB2, Teradata and MySQL.

**Version**: 
- PL/HQL 0.3.1 - User-defined condition supported
- PL/HQL 0.01 - Introduced

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [DECLARE CONDITION]({{< ref "declare-condition" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [SIGNAL]({{< ref "signal" >}})
- [RESIGNAL]({{< ref "resignal" >}})
