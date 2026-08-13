---
title: "Apache Hive : SUBSTR Function - HPL/SQL Reference"
date: 2026-08-12
---

# Apache Hive : SUBSTR Function - HPL/SQL Reference

SUBSTR function returns a substring from string. 

**Syntax**:

```
SUBSTR(string, start_pos [, substring_len])
```

**Parameters:**

| **Parameter** | **Type** | **Value** | **Description** |
| --- | --- | --- | --- |
| string | String | Variable or expression | Original string |
| start_pos | Integer | Variable or expression | Start position of substring (starts from 1) |
| substring_len | Integer | Variable or expression | Length of substring |

**Notes**:

- If start_pos is 0 then it is treated as 1
- SUBSTR and [SUBSTRING]({{< ref "substring" >}}) functions are synonyms

**Return Type:**

String.

**Example:**

```
SUBSTR('Remark', 3); 
```

Result: 'mark'

**Example:**

```
SUBSTR('Remark', 3, 3); 
```

Result: 'mar'

**Compatibility**: Oracle, IBM DB2 and MySQL.

**See also**:
- [SUBSTRING]({{< ref "substring" >}})

**Version**: HPL/SQL 0.1
