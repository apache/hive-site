---
title: "Apache Hive : CREATE DATABASE Statement"
date: 2026-08-12
---

# Apache Hive : CREATE DATABASE Statement

CREATE DATABASE statement allows you to create a database.

**Syntax**:

```
CREATE DATABASE | SCHEMA [IF NOT EXISTS] dbname_expr
  [COMMENT comment_expr]
  [LOCATION path_expr]
```

**Example**:

Create a database named *testYYYYMMDD* (current date):

```
create database 'test' || replace(current_date, '-', '');
```

**Compatibility:** MySQL, MariaDB, Hive

**Version:** HPL/SQL 0.3.17

See also:
- [DROP DATABASE]({{< ref "drop-database" >}})
- [USE]({{< ref "use" >}})
