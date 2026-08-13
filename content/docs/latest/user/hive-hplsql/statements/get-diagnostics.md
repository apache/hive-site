---
title: "Apache Hive : GET DIAGNOSTICS Statement - PL/HQL"
date: 2026-08-12
---

# Apache Hive : GET DIAGNOSTICS Statement - PL/HQL

GET DIAGNOSTICS statement allows you to retrieve the error message, the number of rows about the previous SQL statement.

**Syntax**:

Get the error text:

```
GET DIAGNOSTICS EXCEPTION 1 var_name = MESSAGE_TEXT;
```

Get the number of rows associate with the previous SQL statement:

```
GET DIAGNOSTICS var_name = ROW_COUNT;
```

**Important Note:**

- Hive does not support JDBC Statement.getUpdateCount() for INSERT statements, so GET DIAGNOSTICS ROW_COUNT will return 0 for Hive 0.13 and earlier and -1 for Hive 0.14 and later. See [HIVE-7680](https://issues.apache.org/jira/browse/HIVE-7680) for more details.

**Compatibility:** IBM DB2

**Version**: PL/HQL 0.03

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [DECLARE HANDLER]({{< ref "declare-handler" >}})
- [ACTIVITY_COUNT]({{< ref "activity_count" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
