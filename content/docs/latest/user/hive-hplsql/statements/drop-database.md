---
title: "Apache Hive : DROP DATABASE Statement"
date: 2026-08-12
---

# Apache Hive : DROP DATABASE Statement

DROP DATABASE statement allows you to drop a database.

**Syntax**:

```
DROP DATABASE | SCHEMA [IF EXISTS] dbname_expr
```

**Example**:

Drop a database named *testYYYYMMDD* (current date):

```
drop database if exists 'test' || replace(current_date, '-', '');
```

**Compatibility:** Hive

**Version:** HPL/SQL 0.3.17

See also:
- [CREATE DATABASE]({{< ref "create-database" >}})
- [USE]({{< ref "use" >}})
