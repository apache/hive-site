---
title: "Apache Hive : HPL/SQL - CONCAT Function"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - CONCAT Function

CONCAT function concatenates two or more strings.

**Syntax**:

```
CONCAT(expr, expr2 [, expr3, ...]); 
```

**Notes**:

- If an expression evaluates to NULL it is treated as an empty string 
- CONCAT returns NULL only if all expressions evaluate to NULL

**Return Type:**

STRING

**Example:**

```
CONCAT('a', 'b', NULL, 'c'); 
```

Result: abc

**Compatibility**: Oracle, IBM DB2, Teradata, Microsoft SQL Server, PostgreSQL, MySQL and Netezza

<!-- **Version**: HPL/SQL 0.3.1 -->

See also:
- [|| Operator]({{% ref "twopipes" %}})
