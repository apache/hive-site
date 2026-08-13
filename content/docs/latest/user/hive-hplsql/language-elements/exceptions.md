---
title: "Apache Hive : Exceptions - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : Exceptions - PL/HQL Reference

PL/HQL allows you to handle exceptions in your programs. 

**Syntax:**

```
BEGIN
  -- Statements that can raise an exception
EXCEPTION
  WHEN condition THEN 
    -- Statements
  WHEN condition2 THEN
    -- Statements2
    ...
END
```

**Example**:

```
DECLARE 
  v VARCHAR(200);
BEGIN
  OPEN cur FOR 'SELECT c1 FROM t1';
  FETCH cur INTO v;
  CLOSE cur;
EXCEPTION WHEN OTHERS THEN
  DBMS_OUTPUT.PUT_LINE('Error');
END
```

**Compatibility**: Oracle, PostgreSQL and Netezza.
