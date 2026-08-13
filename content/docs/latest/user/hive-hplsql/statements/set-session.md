---
title: "Apache Hive : SET Session Option"
date: 2026-08-12
---

# Apache Hive : SET Session Option

SET statement allows you to set various session-level options. 

## CURRENT SCHEMA

Changing the current schema (database):

**Syntax**:

```
SET [CURRENT] SCHEMA [=] schema_name;
|
SET CURRENT_SCHEMA [=] schema_name;
```

Note:
- *schema_name* is an identifier, string literal or expression.
- HPL/SQL converts this statement to USE *schema_name* statement in Hive.

**Example:**

```
SET CURRENT SCHEMA = default;
SET SCHEMA = 'default';
SET SCHEMA 'def' || 'ault';
```

**Compatibility:** IBM DB2

**Version:** HPL/SQL 0.3.11

**See also:**
- [USE]({{< ref "use" >}})
