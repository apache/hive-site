---
title: "Apache Hive : NVL2 Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : NVL2 Function - PL/HQL Reference

If the first expression is NOT NULL, NVL2 function returns the result of the second expression, otherwise it returns the result of the third expression.

**Syntax**:

```
NVL2(expr1, expr2, expr3); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** | 
| --- | --- | --- |
| exprN | Any | Variable or expression | 

**Notes**:

- If expr1 is not NULL, expr2 is only evaluated; and if expr1 is NULL, expr3 is only evaluated

**Return Type:**

The data type of the returned expression by expr2 or expr3 depending whether expr1 is NULL or not.

**Example 1:**

```
NVL2(NULL, 1, 2); 
```

Result: 2

**Compatibility**: Oracle and IBM DB2.

**Version**: PL/HQL 0.01
