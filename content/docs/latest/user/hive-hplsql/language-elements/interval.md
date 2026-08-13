---
title: "Apache Hive : Interval Expressions"
date: 2026-08-12
---

# Apache Hive : Interval Expressions

Interval expressions allow you to add or subtract interval values to DATE and TIMESTAMP values.

**Syntax**:

```
[INTERVAL] expression DAYS | DAY | MICROSECONDS | MICROSECOND  
```

Notes:

- MICROSECOND expressions are converted to millisecond expressions due to Java limitations.

**Example 1**:

Add 1 day to DATE and TIMESTAMP values:

```
DATE '2015-03-12' + 1 DAY;
--
2015-03-13

TIMESTAMP '2015-03-12' + 1 DAY;
--
2015-03-13 00:00:00
```

**Example 2**:

Add the result of expression to to DATE and TIMESTAMP values:

```
DATE '2015-03-12' + NVL(NULL, 3) DAYS;
--
2015-03-15

TIMESTAMP '2015-03-12' + NVL(NULL, 3) DAYS;
--
2015-03-15 00:00:00
```

**Example 3**:

Subtract a millisecond fom TIMESTAMP value (microseconds is not supported):

```
TIMESTAMP '2015-03-12 10:10:10.000' - 1 MICROSECOND; /* Treated as millisecond */
--
2015-03-12 10:10:09.999
```

**Example 4**:

Subtract multiple interval fields:

```
TIMESTAMP '2015-03-12' - 1 DAY - 1 MICROSECOND;
--
2015-03-10 23:59:59
```

**Example 5**:

Using INTERVAL keyword:

```
date '2016-01-27' - interval '3' day;
--
2016-01-24
```

**Compatibility:** IBM DB2, Oracle, Teradata

**Version**: 
- INTERVAL keyword - HPL/SQL 0.3.17
- Introduced - HPL/HQL 0.3

See also:

- [DATE Literal]({{< ref "date-literal" >}})
- [TIMESTAMP Literal]({{< ref "timestamp-literal" >}})
