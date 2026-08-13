---
title: "Apache Hive : TIMESTAMP_ISO Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : TIMESTAMP_ISO Function - PL/HQL Reference

TIMESTAMP_ISO function converts a string or date expression to TIMESTAMP data type. 

The string must be in 'YYYY-MM-DD HH24:MI:SS.FF' or 'YYYY-MM-DD' format.

**Syntax**:

```
TIMESTAMP_ISO(expression); 
```

**Return Data Type:**

TIMESTAMP

**Example 1:**

Convert a string to TIMESTAMP:

```
TIMESTAMP_ISO('2015-03-12');
--
2015-03-12 00:00:00
```

**Example 2:**

Convert a date to TIMESTAMP:

```
TIMESTAMP_ISO(DATE '2015-03-12');
--
2015-03-12 00:00:00
```

**Compatibility**: IBM DB2

**Version**: PL/HQL 0.03

See also:
- [DATE Literal]({{< ref "date-literal" >}})
- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
- [DATE Function]({{< ref "date" >}})
- [TO_TIMESTAMP Function]({{< ref "to-timestamp" >}})
