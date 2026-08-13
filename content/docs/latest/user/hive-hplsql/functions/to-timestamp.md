---
title: "Apache Hive : TO_TIMESTAMP Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : TO_TIMESTAMP Function - PL/HQL Reference

TO_TIMESTAMP function converts a string to TIMESTAMP data type using the specified format. 

**Syntax**:

```
TO_TIMESTAMP(string_expression, format_expression); 
```

**Return Data Type:**

TIMESTAMP

**Format Elements**:

| YYYY | 4-digit year |
| --- | --- |
| MM | Month (1-12) |
| DD | Day (1-31) |
| HH24 | Hour of the day (0-23) |
| MI | Minute (0-59) |
| SS | Second (0-59) |

**Examples:**

```
TO_TIMESTAMP('2015-04-02', 'YYYY-MM-DD');
TO_TIMESTAMP('04/02/2015', 'mm/dd/yyyy');
TO_TIMESTAMP('2015-04-02 13:51:31', 'YYYY-MM-DD HH24:MI:SS');
```

**Compatibility**: Oracle, IBM DB2, Teradata

**Version**: PL/HQL 0.3.1

See also:
- [DATE Literal]({{< ref "date-literal" >}})
- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
- [DATE Function]({{< ref "date" >}})
- [TIMESTAMP_ISO]({{< ref "timestamp-iso" >}}) function
