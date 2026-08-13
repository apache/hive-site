---
title: "Apache Hive : DECLARE CURSOR Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : DECLARE CURSOR Statement - PL/HQL Reference

You can use DECLARE CURSOR statement to declare a cursor using a dynamic SQL.

**Syntax**:

```
DECLARE name CURSOR FOR | AS | IS dynamic_sql_string | select_statement;
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| dynamic_sql_string | VARCHAR | Variable or expression | Dynamic SQL to define the cursor |
| select_statement | | | SQL SELECT statement to define the cursor |

**Notes:**

- *dynamic_sql_string* expression is evaluated at cursor open time, not declare time.

**Example 1:**

Using a dynamic SQL string:

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

**Example 2:**

Using a SQL SELECT statement:

```
DECLARE id INT;
DECLARE cur CURSOR FOR SELECT id FROM db.orders;
OPEN cur;
FETCH cur INTO id;
WHILE SQLCODE=0 THEN
  PRINT id;
  FETCH cur INTO id;
END WHILE;
CLOSE cur;
```

**Compatibility:** IBM DB2, MySQL, Teradata.

**Version:** PL/HQL 0.01

**See also:**
- [OPEN]({{< ref "open" >}})
- [FETCH]({{< ref "fetch" >}})
- [CLOSE]({{< ref "close" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
