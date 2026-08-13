---
title: "Apache Hive : SUBSTRING Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : SUBSTRING Function - PL/HQL Reference

SUBSTRING function returns a substring from string. 

**Syntax**:

```
SUBSTRING(string, start_pos [, substring_len])
|
SUBSTRING(string FROM start_pos [FOR substring_len])
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| string | String | Variable or expression | Original string |
| start_pos | Integer | Variable or expression | Start position of substring (starts from 1) |
| substring_len | Integer | Variable or expression | Length of substring |

**Notes**:

- If start_pos is 0 then it is treated as 1
- SUBSTRING and [SUBSTR]({{< ref "substr" >}}) functions are synonyms

**Return Type:**

String.

**Example:**

```
SUBSTRING('Remark', 3); 
```

Result: 'mark'

**Example:**

```
SUBSTRING('Remark', 3, 3); 
```

Result: 'mar'

**Compatibility**: IBM DB2, Teradata and Microsoft SQL Server.

**See also**:
- [SUBSTR]({{< ref "substr" >}})

**Version**: 
- PL/HQL 0.3.11 SUBSTRING FROM FOR syntax added
- PL/HQL 0.01 introduced
