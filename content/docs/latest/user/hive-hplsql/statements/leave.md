---
title: "Apache Hive : LEAVE Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : LEAVE Statement - PL/HQL Reference

LEAVE statement exits the loop or block marked by the given label. If the label is not specified, LEAVE exists  the innermost loop. 

**Syntax:**

```
LEAVE [label];
```

**Example:**

```
lbl:
WHILE count > 0 DO
  SET count = count - 1;
  IF count = 0 THEN
    LEAVE lbl;
  END IF;
END WHILE;
```

```
lbl:
WHILE 1=1 DO
  lbl1:
  WHILE 1=1 DO
    LEAVE lbl;
  END WHILE;
END WHILE;
```

**Compatibility:** Teradata, IBM DB2 and MySQL.
