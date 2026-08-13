---
title: "Apache Hive : LOOP Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : LOOP Statement - PL/HQL Reference

LOOP statement executes one or more statements until you exit the loop using EXIT, LEAVE or BREAK statements, or raising an exception. 

Syntax:

```
[<<label>> | label:]
LOOP
  statements
END LOOP;
```

**Examples:**

```
-- Oracle, PostgreSQL, Netezza
LOOP
  count := count - 1;
  EXIT WHEN count = 0;
END LOOP;
```

```
-- DB2, Teradata, MySQL
lbl:
LOOP
  SET count = count - 1;
  IF count = 0 THEN
    LEAVE lbl;
  END IF;
END LOOP;
```

**Compatibility:** Oracle, Teradata, IBM DB2, MySQL, PostgreSQL and Netezza.
