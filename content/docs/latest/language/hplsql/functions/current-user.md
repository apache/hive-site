---
title: "Apache Hive : HPL/SQL - CURRENT_USER Function"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - CURRENT_USER Function

CURRENT_USER function returns the name of the user executing the current HPL/SQL script.

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

<!-- **Version:** HPL/SQL 0.3.11 -->

See also:

- [USER]({{% ref "user" %}})
