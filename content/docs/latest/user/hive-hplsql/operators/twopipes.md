---
title: "Apache Hive : String Concatenation ||"
date: 2026-08-12
---

# Apache Hive : String Concatenation ||

You can use || operator to concatenate two or more strings.

**Syntax:**

```
expr || expr [|| expr ...]
```

The result of the operation is always a string. If an operand is a number, it is implicitly converted to string before concatenation.

If an operand is NULL, it is treated as an empty string '' in the concatenation. If all operands are NULL, the result is NULL.

**Examples:**

| **Concatenation** | **Result** | **Result Type** |
| --- | --- | --- |
| 'a' `\|\|` 'b' `\|\|` 'c' | 'abc' | String |    
| 'a' `\|\|` 1 `\|\|` 'c' | 'a1c' | String |     
| 'a' `\|\|` NULL `\|\|` 'c' | 'ac' | String |     
| NULL `\|\|` NULL | NULL | String |     

**On-the-fly SQL Conversion**

Hive does not support || operator, so PL/HQL automatically converts in to [CONCAT]({{< ref "concat" >}}) function in SQL SELECT statements.

**Compatibility:** Oracle, IBM DB2, Teradata, PostgreSQL and Netezza

**Version:** HPL/SQL 0.1

See also:
- [CONCAT Function]({{< ref "concat" >}})
