---
title: "Apache Hive : DESCRIBE Statement"
date: 2026-08-12
---

# Apache Hive : DESCRIBE Statement

DESCRIBE statement allows you to print a metadata information for the specified database object.

**Syntax**:

```
DESCRIBE | DESC [TABLE] table_name
```

**Example**:

Describe *src* table in Hive:

```
desc src;
--
key                     string                  default
value                   string                  default
```

**Compatibility:** Oracle, IBM DB2, Hive, MySQL, MariaDB.

**Version:** HPL/SQL 0.3.17
