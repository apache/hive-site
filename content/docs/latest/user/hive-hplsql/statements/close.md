---
title: "Apache Hive : CLOSE Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : CLOSE Statement - PL/HQL Reference

CLOSE statement closes a cursor.

**Syntax**:

```
CLOSE cursor_name;
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| cursor_name | | Identifier | The name of the previously opened cursor |

**Examples:**

```
DECLARE id INT;
DECLARE cur CURSOR FOR 'SELECT id FROM db.orders';
OPEN cur;
FETCH cur INTO id;
CLOSE cur;
```

**Compatibility:** Oracle, IBM DB2, Teradata, SQL Server, PostgreSQL, MySQL.

**See also:**
- [DECLARE CURSOR]({{< ref "declare-cursor" >}})
- [OPEN]({{< ref "open" >}})
- [FETCH]({{< ref "fetch" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
