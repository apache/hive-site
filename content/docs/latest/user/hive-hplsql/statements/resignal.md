---
title: "Apache Hive : RESIGNAL Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : RESIGNAL Statement - PL/HQL Reference

RESIGNAL statement in used in a condition or exception handler to re-raise an error so it can be processed at a higher level.

**Syntax**:

```
RESIGNAL
|
RESIGNAL SQLSTATE [VALUE] sqlstate [SET MESSAGE_TEXT = message_text]
```

**Example 1:**

Re-raise the same error:

```
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    PRINT 'Error raised';
    RESIGNAL;
  END;
  PRINT 'Before executing SQL';
  SELECT * FROM abc.abc;      -- Table does not exist, error will be raised
  PRINT 'After executing SQL - will not be printed in case of error';
END;
```

Result:

```
Before executing SQL
Error raised
```

**Example 2:**

Catch the re-raised condition in the outer condition handler:

```
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
    PRINT 'Error raised, outer handler';

  BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
      PRINT 'Error raised, resignal';
      RESIGNAL;
    END;
    PRINT 'Before executing SQL';
    SELECT * FROM abc.abc;       -- Table does not exist, error will be raised
    PRINT 'After executing SQL - must not be printed';
  END;
  PRINT 'Continue outer block after exiting inner';
END;
```

Result:

```
Before executing SQL
Error raised, resignal
Error raised, outer handler
Continue outer block after exiting inner
```

**Example 3:**

Re-raise a condition with the specified SQLSTATE and message text:

```
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS EXCEPTION 1 text = MESSAGE_TEXT;
    PRINT 'SQLSTATE: ' || SQLSTATE;
    PRINT 'Text: ' || text;
  END; 

  BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
      RESIGNAL SQLSTATE '02031' SET MESSAGE_TEXT = 'Some error';

    SELECT * FROM abc.abc;    -- Table does not exist, raise an exception
  END;
END;
```

Result:

```
SQLSTATE: 02031
Text: Some error
```

**Compatibility**: IBM DB2, Teradata and MySQL

**Version**: PL/HQL 0.03

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [DECLARE CONDITION]({{< ref "declare-condition" >}})
- [DECLARE HANDLER]({{< ref "declare-handler" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [SIGNAL]({{< ref "signal" >}})
