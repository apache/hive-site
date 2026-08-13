---
title: "Apache Hive : SQLCODE - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : SQLCODE - PL/HQL Reference

SQLCODE built-in variable contains the return code of the last SQL statement. The code can be zero (0), negative or positive:

| **SQLCODE** | **Result** |
| --- | --- |
| 0 | Successful execution |
| Positive values | Warning  |
| Negative values | Error |

Note:

- SQLCODE 100 means row not found or end of cursor

```
DECLARE id INT;
DECLARE cur CURSOR FOR 'SELECT id FROM db.orders';
OPEN cur;
FETCH cur INTO id;
WHILE SQLCODE = 0 THEN
  FETCH cur INTO id;
END WHILE;
CLOSE cur;
```

**Compatibility:** IBM DB2.

**Version:** PL/HQL 0.01

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [RESIGNAL]({{< ref "resignal" >}})
