---
title: "Apache Hive : ALLOCATE CURSOR Statement"
date: 2026-08-12
---

# Apache Hive : ALLOCATE CURSOR Statement

ALLOCATE CURSOR statement allows you to declare a cursor and associate it with a result set returned from a stored procedure.

**Syntax**:

```
ALLOCATE cursor_name CURSOR FOR PROCEDURE procedure_name;  -- Teradata compatibility
|
ALLOCATE cursor_name CURSOR FOR RESULT SET locator_name;   -- DB2 compatibility
```

**Example 1:**

Sample stored procedure returning a single result set:

```
CREATE PROCEDURE spOpenIssues 
  DYNAMIC RESULT SETS 1
BEGIN
  DECLARE cur CURSOR WITH RETURN FOR
    SELECT id, name FROM issues;
  OPEN cur;
END;
```

Call a stored procedure and process the returned result set (Teradata compatibility):

```
DECLARE id INT;
DECLARE name VARCHAR(30);

CALL spOpenIssues;
ALLOCATE c1 CURSOR FOR PROCEDURE spOpenIssues;

FETCH c1 INTO id, name;
WHILE (SQLCODE = 0)
DO
  PRINT id || ' - ' || name;
  FETCH c1 INTO id, name;
END WHILE;
CLOSE c1;
```

Call a stored procedure and process the returned result set (IBM DB2 compatibility):

```
DECLARE id INT;
DECLARE name VARCHAR(30);
DECLARE loc RESULT_SET_LOCATOR VARYING;

CALL spOpenIssues;
ASSOCIATE RESULT SET LOCATOR (loc) WITH PROCEDURE spOpenIssues;
ALLOCATE c1 CURSOR FOR RESULT SET loc;

FETCH c1 INTO id, name;
WHILE (SQLCODE = 0)
DO
  PRINT id || ' - ' || name;
  FETCH c1 INTO id, name;
END WHILE;
CLOSE c1;
```

**Example 2:**

Sample stored procedure returning multiple result sets:

```
CREATE PROCEDURE spOpenIssues2 
  DYNAMIC RESULT SETS 2
BEGIN
  DECLARE cur CURSOR WITH RETURN FOR
    SELECT id, name FROM issues;
  DECLARE cur2 CURSOR WITH RETURN FOR
    SELECT id, name FROM issues_hold;
  OPEN cur;
  OPEN cur2;
END;
```

Call a stored procedure and process 2 result sets (Teradata compatibility):

```
DECLARE id INT;
DECLARE name VARCHAR(30);

CALL spOpenIssues2;

-- First result set
ALLOCATE c1 CURSOR FOR PROCEDURE spOpenIssues2;
FETCH c1 INTO id, name;
WHILE (SQLCODE = 0)
DO
  -- ... 
  FETCH c1 INTO id, name;
END WHILE;
CLOSE c1;

-- Second result set
ALLOCATE c2 CURSOR FOR PROCEDURE spOpenIssues2;
FETCH c2 INTO id, name;
WHILE (SQLCODE = 0)
DO
  -- ... 
  FETCH c2 INTO id, name;
END WHILE;
CLOSE c2;
```

Call a stored procedure and process 2 result sets (IBM DB2 compatibility):

```
DECLARE id INT;
DECLARE name VARCHAR(30);
DECLARE loc1 RESULT_SET_LOCATOR VARYING;
DECLARE loc2 RESULT_SET_LOCATOR VARYING;

CALL spOpenIssues2;
ASSOCIATE RESULT SET LOCATOR (loc1, loc2) WITH PROCEDURE spOpenIssues2;

-- First result set
ALLOCATE c1 CURSOR FOR RESULT SET loc1;
FETCH c1 INTO id, name;
WHILE (SQLCODE = 0)
DO
  -- ... 
  FETCH c1 INTO id, name;
END WHILE;
CLOSE c1;

-- Second result set
ALLOCATE c2 CURSOR FOR RESULT SET loc2;
FETCH c2 INTO id, name;
WHILE (SQLCODE = 0)
DO
  -- ... 
  FETCH c2 INTO id, name;
END WHILE;
CLOSE c2;
```

**Compatibility:** IBM DB2 and Teradata

**Version:** HPL/SQL 0.3.11

**See also:**
- [OPEN]({{< ref "open" >}})
- [FETCH]({{< ref "fetch" >}})
- [CLOSE]({{< ref "close" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
