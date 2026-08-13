---
title: "Apache Hive : DATE Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : DATE Function - PL/HQL Reference

DATE function converts an expression to DATE data type.

**Syntax**:

```
DATE(expression); 
```

**Return Data Type:**

DATE

**Example:**

Convert a string and timestamp to DATE:

```
DATE('2015-03-12');
DATE('2015' || '-03-' || '12');
DATE(TIMESTAMP '2015-03-12 10:58:34.111');
```

**Compatibility**: IBM DB2

**Version**: PL/HQL 0.03

See also:
- [DATE Literal]({{< ref "date-literal" >}})
- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
- [TIMESTAMP_ISO Function]({{< ref "timestamp-iso" >}})
