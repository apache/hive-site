---
title: "Apache Hive : RETURN Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : RETURN Statement - PL/HQL Reference

RETURN statement is used to return from a routine. 

**Syntax:**

```
RETURN [expr];
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| expr | INT | Variable or expression | Return value |

**Notes**:

- If the return value is not specified, 0 is returned

**Examples:**

```
RETURN;
```

Return the result of an expression:

```
RETURN NVL(v1, 1);
```

**Compatibility:** Oracle, IBM DB2, SQL Server, Teradata, PostgreSQL, MySQL, Netezza.

**Version:** PL/HQL 0.01
