---
title: "Apache Hive : DECODE Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : DECODE Function - PL/HQL Reference

DECODE function allows you to implement IF-THEN-ELSE logic.

**Syntax:**

```
DECODE(expr, when_exp1, then_expr1 [, ...n] [, else_expr]) 
```

**Notes**:

- If *expr* is NULL it will match the first *when_exprN* that is NULL
- If *when_exprN* is not matched *then_exprN* is not evaluated

**Examples**:

```
DECLARE var1 INT DEFAULT 3;

PRINT DECODE (var1, 1, 'A', 2, 'B', 3, 'C');       -- Result: C
PRINT DECODE (var1, 1, 'A', 2, 'B', 'C');          -- Result: C

SET var1 = NULL;
PRINT DECODE (var1, 1, 'A', 2, 'B', NULL, 'C');    -- Result: C  
```

**Compatibility:** Oracle, IBM DB2 and Teradata

**Version**: PL/HQL 0.3.1

See also:
- [CASE Expression]({{< ref "case" >}})
