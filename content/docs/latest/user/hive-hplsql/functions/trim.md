---
title: "Apache Hive : TRIM Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : TRIM Function - PL/HQL Reference

TRIM function removes leading and trailing characters from a string.

**Syntax**:

```
TRIM(string_expression); 
```

**Return Type:**

STRING

**Example 1:**

```
'#' || TRIM(' Hello ') || '#'; 
--
#Hello#
```

**Compatibility**: Oracle, IBM DB2, Teradata, Microsoft SQL Server, PostgreSQL, MySQL and Netezza

**Version**: PL/HQL 0.03
