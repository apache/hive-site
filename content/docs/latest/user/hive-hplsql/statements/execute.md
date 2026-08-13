---
title: "Apache Hive : EXECUTE Statement"
date: 2026-08-12
---

# Apache Hive : EXECUTE Statement

EXECUTE (EXEC or EXECUTE IMMEDIATE) statement executes a dynamic SQL statement and can return the scalar result to local variables. 

You can also use this statement to call a stored procedure.

**Syntax:**

```
EXEC | EXECUTE | EXECUTE IMMEDIATE dynamic_sql_string [INTO var1, var2, ...];
|
EXEC | EXECUTE proc_name [parm1 = val1, ... ]
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| dynamic_sql_string | VARCHAR | Variable or expression | Dynamic SQL to execute |
| INTO var1, var2, ... | Any | Variable | Variables to assign, optional |

**Notes**:

- If the query returns more than 1 row and the INTO clause is specified, only the columns from the first row are used in assignment
- If the statement returns 1 or more rows and the INTO clause is not specified, the result set data is sent to the standard output
- EXEC, EXECUTE are EXECUTE IMMEDIATE synonyms

**Example:**

Return the result into a variable:

```
DECLARE cnt INT;
EXECUTE 'SELECT COUNT(*) FROM db.orders' INTO cnt;
```

Execute a DML statement:

```
DECLARE tabname VARCHAR(100) DEFAULT 'tab1';
EXECUTE IMMEDIATE 'CREATE TABLE ' || tabname || ' (c1 INT)';
```

Print the results to standard output:

```
EXEC 'SELECT ''A'', ''B'' FROM dual';
```

Call a stored procedure:

```
ALTER PROCEDURE spOrders
  @lim INT
AS
  DECLARE @cnt INT = 0
  SELECT @cnt = COUNT(*) from src LIMIT @lim
  IF @cnt > 0
    SELECT * FROM src
GO

EXEC spOrders @lim = 3
```

**Compatibility:** Oracle, IBM DB2 and Microsoft SQL Server.

**Version:** 
- HPL/SQL 0.3.11 - Execute a stored procedure
- PL/HQL 0.01
