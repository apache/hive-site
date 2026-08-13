---
title: "Apache Hive : NVL Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : NVL Function - PL/HQL Reference

NVL function returns first non-NULL expression.

**Syntax**:

```
NVL(expr1, expr2 [, expr3, ...]); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** |
| --- | --- | --- |
| exprN | Any | Variable or expression |

**Notes**:

- When first non-NULL expression is found the following expressions are not evaluated
- NVL and [COALESCE]({{< ref "coalesce" >}}) functions are synonyms

**Return Value:**

- First non-NULL expression
- NULL if all expressions evaluate to NULL

**Return Type:**

The data type of first non-NULL expression.

**Example 1:**

```
NVL(NULL, 1); 
```

Result: 1

**Compatibility**: Oracle, IBM DB2 and Netezza.

**Version**: PL/HQL 0.01

See also:
- [COALESCE]({{< ref "coalesce" >}})
