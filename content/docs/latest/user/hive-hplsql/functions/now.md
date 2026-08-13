---
title: "Apache Hive : NOW Function"
date: 2026-08-12
---

# Apache Hive : NOW Function

NOW function returns the current date and time (year, month, day, hour, minute, seconds and fractional seconds).

**Syntax**:

```
NOW()
```

**Return Type:**

TIMESTAMP

**Example**:

Get the current and date and time:

```
NOW()
--
2015-11-02 07:59:25.833
```

**Compatibility**: PostgreSQL and MySQL.

**Version:** HPL/SQL 0.3.17

See also:

- [CURRENT_DATE]({{< ref "current-date" >}})
- [CURRENT_TIMESTAMP]({{< ref "current-timestamp" >}})
- [FROM_UNIXTIME]({{< ref "from-unixtime" >}})
- [UNIX_TIMESTAMP]({{< ref "unix-timestamp" >}})
- [SYSDATE]({{< ref "sysdate" >}})
