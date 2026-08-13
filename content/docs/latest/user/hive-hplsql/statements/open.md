---
title: "Apache Hive : OPEN Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : OPEN Statement - PL/HQL Reference

OPEN statement opens a cursor.

**Syntax**:

```
OPEN cursor_name [FOR expression | select_statement];
```

**Description:**
| cursor_name | The name of the previously declared cursor if FOR clause is not specified |
| --- | --- |
| FOR expression | Variable or expression that contains a dynamic SQL | 
| FOR select_statement | SELECT statement |

**Examples:**

Open the previously declared cursor:

```
DECLARE tabname VARCHAR(20) DEFAULT 'db.orders';
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

Open a cursor using a dynamic SQL:

```
DECLARE tabname VARCHAR(20) DEFAULT 'db.orders';
DECLARE id INT;
OPEN cur FOR 'SELECT id FROM ' || tabname;
FETCH cur INTO id;
WHILE SQLCODE=0 THEN  
  PRINT id;
  FETCH cur INTO id;
END WHILE;
CLOSE cur;
```

**Compatibility:** Oracle, IBM DB2, Teradata, SQL Server, PostgreSQL, MySQL and Netezza.

**See also:**
- [DECLARE CURSOR]({{< ref "declare-cursor" >}})
- [FETCH]({{< ref "fetch" >}})
- [CLOSE]({{< ref "close" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
