---
title: "Apache Hive : USER Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : USER Function - PL/HQL

USER function returns the name of the user executing the current PL/HQL script.

**Syntax**:

```
USER
```

**Return Type:**

STRING

**Example**:

Get the current user:

```
USER
--
paul
```

**Compatibility**: Oracle, IBM DB2 and Teradata.

**Version:** PL/HQL 0.3.11

See also:

- [CURRENT_USER]({{< ref "current-user" >}})
