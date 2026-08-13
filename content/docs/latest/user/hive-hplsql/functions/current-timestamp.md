---
title: "Apache Hive : CURRENT_TIMESTAMP Function"
date: 2026-08-12
---

# Apache Hive : CURRENT_TIMESTAMP Function

CURRENT_TIMESTAMP function returns the current date and time (year, month, day, hour, minute, seconds and fractional seconds).

**Syntax**:

```
CURRENT_TIMESTAMP | CURRENT TIMESTAMP [(precision)] 
```

**Parameters:**

| **Parameter** | **Value** | **Description** ||
| --- | --- | --- | --- |
| *precision* | Variable or expression | Fractional seconds precision, from 0 to 3 | Default 3 |

**Return Type:**

TIMESTAMP

**Example**:

Get the current and date and time without fraction:

```
CURRENT_TIMESTAMP(0)
--
2015-03-02 13:04:42
```

**Compatibility**: Oracle, IBM DB2, Teradata, MySQL.

**Version:** HPL/SQL 0.1

See also:

- [CURRENT_DATE]({{< ref "current-date" >}})
- [FROM_UNIXTIME]({{< ref "from-unixtime" >}})
- [NOW]({{< ref "now" >}})
- [SYSDATE]({{< ref "sysdate" >}})
- [UNIX_TIMESTAMP]({{< ref "unix-timestamp" >}})
