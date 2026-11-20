---
title: "Apache Hive : HPL/SQL - TIMESTAMP Literal"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - TIMESTAMP Literal

TIMESTAMP literal allows you to specify a timestamp constant using a string in 'YYYY-MM-DD HH:MI:SS.FFF' or 'YYYY-MM-DD-HH.MI.SS.FFF' format. 

You can use this timestamp value in any expression that expects a TIMESTAMP data type.

**Examples**:

```
TIMESTAMP '2015-03-03 11:39:31.123'

TIMESTAMP '2015-03-03-11.39.31.123'   -- DB2 syntax
```

**Notes:**

- Fractional part is optional

**Compatibility:** Oracle, IBM DB2.

<!-- **Version**: HPL/SQL 0.03 -->

See also:

- [DATE Literal]({{% ref "date-literal" %}})
- [INTERVAL Expressions]({{% ref "interval" %}})
- [TIMESTAMP_ISO Function]({{% ref "timestamp-iso" %}})
- [TO_TIMESTAMP Function]({{% ref "to-timestamp" %}})
