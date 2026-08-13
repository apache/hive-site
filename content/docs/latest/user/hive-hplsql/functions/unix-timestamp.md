---
title: "Apache Hive : UNIX_TIMESTAMP Function"
date: 2026-08-12
---

# Apache Hive : UNIX_TIMESTAMP Function

UNIX_TIMESTAMP function returns the current date and time in seconds since 1970-01-01 00:00:00.

**Syntax**:

```
UNIX_TIMESTAMP()
```

**Return Type:**

INT

**Example**:

Get the current and date and time in seconds:

```
UNIX_TIMESTAMP()
--
1446631617
```

**Compatibility**: Hive.

**Version:** HPL/SQL 0.3.17

See also:

- [CURRENT_DATE]({{< ref "current-date" >}})
- [CURRENT_TIMESTAMP]({{< ref "current-timestamp" >}})
- [FROM_UNIXTIME]({{< ref "from-unixtime" >}})
- [NOW]({{< ref "now" >}})
- [SYSDATE]({{< ref "sysdate" >}})
