---
title: "Apache Hive : FROM_UNIXTIME Function"
date: 2026-08-12
---

# Apache Hive : FROM_UNIXTIME Function

FROM_UNIXTIME function converts the specified number of seconds since 1970-01-01 00:00:00 to timestamp value.

**Syntax**:

```
FROM_UNIXTIME(epoch, [format])
```

**Parameters**:
- *epoch* is the number of seconds since 1970-01-01 00:00:00
- *format* is the timestamp format, optional. The default format is yyyy-MM-dd HH:mm:ss

**Return Type:**

STRING

**Example**:

Convert the number of seconds to timestamp value:

```
from_unixtime(1447141681);
---
2015-11-10 04:48:01

from_unixtime(1447141681, 'yyyy-MM-dd');
---
2015-11-10
```

**Compatibility**: Hive.

**Version:** HPL/SQL 0.3.17

See also:

- [CURRENT_DATE]({{< ref "current-date" >}})
- [CURRENT_TIMESTAMP]({{< ref "current-timestamp" >}})
- [NOW]({{< ref "now" >}})
- [SYSDATE]({{< ref "sysdate" >}})
- [UNIX_TIMESTAMP]({{< ref "unix-timestamp" >}})
