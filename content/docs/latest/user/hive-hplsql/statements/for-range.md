---
title: "Apache Hive : FOR Statement (Integer Range) - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : FOR Statement (Integer Range) - PL/HQL Reference

FOR statement executes one or more statements repeatedly for the specified range of integer values. 

Syntax:

```
FOR index IN [REVERSE] lower_bound..upper_bound [BY | STEP increment] LOOP
  statements
END LOOP;
```

**Notes:**

- *index* - Implicitly declared integer variable 
- If REVERSE is specified the index is decreased  
- If specified, BY (or STEP) define the iteration step, default is 1  

**Examples:**

```
FOR i IN 1..10 LOOP
  -- i will have values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
END LOOP;
```

```
FOR i IN REVERSE 10..1 LOOP
  -- i will have values: 10, 9, 8, 7, 6, 5, 4, 3, 1, 1
END LOOP;
```

```
FOR i IN 1..10 BY 2 LOOP
  -- i will have values: 1, 3, 5, 7, 9
END LOOP;
```

**Compatibility:** Oracle, PostgreSQL and Netezza.

**Version:** PL/HQL 0.01
