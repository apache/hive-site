---
title: "Apache Hive : ACTIVITY_COUNT Variable - PL/HQL"
date: 2026-08-12
---

# Apache Hive : ACTIVITY_COUNT Variable - PL/HQL

ACTIVITY_COUNT built-in variable contains the number of rows affected by the last SQL statement.

**Important Note:** Currently Hive does not support JDBC Statement.getUpdateCount(), so for INSERT statements ACTIVITY_COUNT will return 0 for Hive 0.13 and earlier and -1 for Hive 0.14 and later. See [HIVE-7680](https://issues.apache.org/jira/browse/HIVE-7680) for more details.

Currently you can use ACTIVITY_COUNT only with SELECT statements in Hive. If SELECT INTO returns a row ACTIVITY_COUNT is set to 1. Also if you use a cursor each FETCH statement increments ACTIVITY_COUNT by 1. 

**Example**:

```
DECLARE var INT;

SELECT id INTO var FROM default.dual;

IF ACTIVITY_COUNT = 1 THEN
  PRINT 'id = ' || var;
END IF; 
```

**Compatibility:** Teradata

**Version**: PL/HQL 0.3.1

**See also:**
- [GET DIAGNOSTICS ROW_COUNT]({{< ref "get-diagnostics" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
