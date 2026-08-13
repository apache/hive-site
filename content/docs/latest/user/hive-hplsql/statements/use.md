---
title: "Apache Hive : USE Statement"
date: 2026-08-12
---

# Apache Hive : USE Statement

USE statement allows you to change the default database used in SQL statements for the current connection. 

**Syntax:**

```
USE database_expr;
```

Note: HPL/SQL allows you to use an expression to specify the database name

**Example**:

```
USE sales;

USE SUBSTR(var, 1, 3);
```

**Compatibility**: Hive, MySQL, MariaDB

**Version**: HPL/SQL 0.1

See also:
- [CREATE DATABASE]({{< ref "create-database" >}})
- [DROP DATABASE]({{< ref "drop-database" >}})
