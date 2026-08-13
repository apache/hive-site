---
title: "Apache Hive : COALESCE Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : COALESCE Function - PL/HQL Reference

COALESCE function returns first non-NULL expression.

**Syntax**:

```
COALESCE(expr1, expr2 [, expr3, ...]); 
```

**Parameters:**

| **Parameter** | **Type** | **Value** |
| --- | --- | --- |
| exprN | Any | Variable or expression |

**Notes**:

- When first non-NULL expression is found the following expressions are not evaluated
- COALESCE and [NVL]({{< ref "nvl" >}}) functions are synonyms

**Return Value:**

- First non-NULL expression
- NULL if all expressions evaluate to NULL

**Return Type:**

The data type of first non-NULL expression.

**Example 1:**

```
COALESCE(NULL, 1, 2, 3); 
```

Result: 1

**Compatibility**: Oracle, IBM DB2, Teradata, Microsoft SQL Server, PostgreSQL, MySQL and Netezza

**Version**: PL/HQL 0.03

See also:
- [NVL]({{< ref "nvl" >}})
