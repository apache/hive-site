---
title: "Apache Hive : DATE Literal - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : DATE Literal - PL/HQL Reference

DATE literal allows you to specify a date constant using a string in 'YYYY-MM-DD' format. Then you can use this date value in any expression that expects a DATE data type.

**Examples**:

```
DATE '2014-12-20'
DATE '2014-12-20' + 1    -- Result: 2014-12-21 of type DATE
DATE '2014-12-20' - 1    --         2014-12-19 
```

**Compatibility:** Oracle, IBM DB2 and Teradata

**Version**: PL/HQL 0.01

See also:

- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
- [INTERVAL Expressions]({{< ref "interval" >}})
