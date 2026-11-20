---
title: "Apache Hive : HPL/SQL - USER Function"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - USER Function

USER function returns the name of the user executing the current HPL/SQL script.

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

<!-- **Version:** HPL/SQL 0.3.11 -->

See also:

- [CURRENT_USER]({{% ref "current-user" %}})
