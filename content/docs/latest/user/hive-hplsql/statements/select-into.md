---
title: "Apache Hive : SELECT INTO Statement"
date: 2026-08-12
---

# Apache Hive : SELECT INTO Statement

SELECT INTO statement allows you to assign values to variables using a SQL SELECT query. 

**Example**:

```
DECLARE cnt INT = 0;
SELECT COUNT(*) INTO cnt FROM users;
PRINT 'Users: ' || cnt; 
```

**Compatibility**: Oracle, IBM DB2, Teradata, PostgreSQL, MySQL and Netezza.

**Version**: HPL/SQL 0.1

See also:
- [SELECT]({{< ref "select" >}})
