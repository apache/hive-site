---
title: "Apache Hive : EXIT WHEN Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : EXIT WHEN Statement - PL/HQL Reference

EXIT WHEN statement exits the loop or block marked by the given label. If the label is not specified, EXIT leaves the innermost loop. 

If a boolean expression is specified, and it evaluates to *true* then EXIT statement is executed, otherwise it is ignored and the execution continues from the statement following EXIT.

**Syntax:**

```
EXIT [label] [WHEN boolean_expression];
```

**Example:**

```
WHILE count > 0 LOOP
  count := count - 1;
  EXIT WHEN count = 0;
END LOOP;
```

```
<<lbl>>
WHILE 1=1 LOOP
  <<lbl1>>
  WHILE 1=1 LOOP
    EXIT lbl;
  END LOOP;
END LOOP;
```

**Compatibility:** Oracle, PostgreSQL and Netezza.
