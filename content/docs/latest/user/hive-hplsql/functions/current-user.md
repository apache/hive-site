---
title: "Apache Hive : CURRENT_USER Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : CURRENT_USER Function - PL/HQL

CURRENT_USER function returns the name of the user executing the current PL/HQL script.

**Syntax**:

```
CURRENT_USER | CURRENT USER 
```

**Return Type:**

STRING

**Example**:

Get the current user:

```
CURRENT_USER
--
paul
```

**Compatibility**: IBM DB2, Teradata.

**Version:** PL/HQL 0.3.11

See also:

- [USER]({{< ref "user" >}})
