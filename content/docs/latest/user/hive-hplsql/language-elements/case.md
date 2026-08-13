---
title: "Apache Hive : CASE Expression - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : CASE Expression - PL/HQL Reference

CASE expression allows you to implement IF-THEN-ELSE logic in expressions.

**Syntax:**

Simple CASE expression:

```
CASE expr
  WHEN expr THEN expr
  ...
  [ELSE expr] 
END
```

Searched CASE expression:

```
CASE 
  WHEN boolean_expr THEN expr
  ...
  [ELSE expr] 
END
```

**Notes**:

- NULL is returned if none of the WHEN expressions is matched and ELSE clause is not specified

**Examples**:

Simple CASE expression:

```
 CASE state
   WHEN 'AZ' THEN 'Arizona'
   WHEN 'CA' THEN 'California'
   ELSE 'N/A'
 END 
```

Searched CASE expression:

```
 CASE 
   WHEN state = 'AZ' THEN 'Arizona'
   WHEN state = 'CA' THEN 'California'
   ELSE 'N/A'
 END 
```

**Compatibility:** Oracle, IBM DB2, SQL Server, Teradata, MySQL, PostgreSQL and Netezza.

**Version**: PL/HQL 0.01

See also:
- [DECODE Function]({{< ref "decode" >}})
