---
title: "Apache Hive : HPL/SQL - DATE Literal"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - DATE Literal

DATE literal allows you to specify a date constant using a string in 'YYYY-MM-DD' format. Then you can use this date value in any expression that expects a DATE data type.

**Examples**:

```
DATE '2014-12-20'
DATE '2014-12-20' + 1    -- Result: 2014-12-21 of type DATE
DATE '2014-12-20' - 1    --         2014-12-19 
```

**Compatibility:** Oracle, IBM DB2 and Teradata

<!-- **Version**: HPL/SQL 0.01 -->

See also:

- [TIMESTAMP Literal]({{% ref "timestamp-literal" %}})
- [INTERVAL Expressions]({{% ref "interval" %}})
