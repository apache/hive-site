---
title: "Apache Hive : SIGNAL Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : SIGNAL Statement - PL/HQL Reference

SIGNAL statement raises a user-defined condition (exception).

**Syntax**:

```
SIGNAL condition_name;
```

**Example:**

Raise a condition if the number of rows is not equal to the specified number:

```
DECLARE cnt INT DEFAULT 0; 
DECLARE wrong_cnt_condition CONDITION;

DECLARE EXIT HANDLER FOR wrong_cnt_condition
  PRINT 'Wrong number of rows';  

SELECT COUNT(*) INTO cnt FROM TABLE (VALUES (1,2));

IF cnt <> 1 THEN
  SIGNAL wrong_cnt_condition;
END IF;
```

**Compatibility**: IBM DB2, Teradata and MySQL

**Version**: PL/HQL 0.3.1

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [DECLARE CONDITION]({{< ref "declare-condition" >}})
- [DECLARE HANDLER]({{< ref "declare-handler" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [RESIGNAL]({{< ref "resignal" >}})
