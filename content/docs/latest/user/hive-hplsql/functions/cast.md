---
title: "Apache Hive : CAST Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : CAST Function - PL/HQL Reference

CAST function converts an expression to the specified data type.

**Syntax**:

```
CAST(expression AS datatype[(length)]); 
```

Notes:

- If *length* is specified for CAST as CHAR or VARCHAR function, the resulting string is truncated to this length.

**Example 1:**

Convert to a string with the specified length:

```
CAST('Abc' AS CHAR(1)); 
--
A
```

**Example 2:**

Truncate a timestamp string:

```
CAST(TIMESTAMP '2015-03-12 10:58:34.111' AS CHAR(10));
--
2015-03-12
```

**Compatibility**: Oracle, Microsoft SQL Server, IBM DB2, Teradata, PostgreSQL, MySQL and Netezza

**Version**: PL/HQL 0.03
