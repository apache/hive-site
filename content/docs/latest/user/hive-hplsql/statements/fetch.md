---
title: "Apache Hive : FETCH Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : FETCH Statement - PL/HQL Reference

FETCH statement retrieve the next row from a cursor and assigns column values to local variable.

**Syntax**:

```
FETCH [FROM] cursor_name INTO var1 [, var2, ...];
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| cursor_name | | Identifier | The name of the previously opened cursor |
| varN | | Variable | A local variable |

**Examples:**

```
DECLARE tabname VARCHAR DEFAULT 'db.orders';
DECLARE id INT;
DECLARE cur CURSOR FOR 'SELECT id FROM ' || tabname;
OPEN cur;
FETCH cur INTO id;
WHILE SQLCODE=0 THEN
  PRINT id;
  FETCH cur INTO id;
END WHILE;
CLOSE cur;
```

**Compatibility:** Oracle, IBM DB2, Teradata, SQL Server, MySQL, PostgreSQL and Netezza.

**See also:**
- [DECLARE CURSOR]({{< ref "declare-cursor" >}})
- [OPEN]({{< ref "open" >}})
- [CLOSE]({{< ref "close" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
