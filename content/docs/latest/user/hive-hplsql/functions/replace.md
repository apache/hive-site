---
title: "Apache Hive : REPLACE Function - HPL/SQL Reference"
date: 2026-08-12
---

# Apache Hive : REPLACE Function - HPL/SQL Reference

REPLACE function replaces all occurrences of the specified substring with another substring. 

**Syntax**:

```
REPLACE(string, what, with)
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| *string* | String | Variable or expression | Original string |
| *what* | String | Variable or expression | Which substring to replace |
| *with* | String | Variable or expression | Replacement |

**Return Type:**

String.

**Example:**

```
replace('2016-03-03', '-', '');
--
20160303 
```

**Compatibility**: Oracle, Microsoft SQL Server, IBM DB2 and MySQL.

**Version**: HPL/SQL 0.3.17
