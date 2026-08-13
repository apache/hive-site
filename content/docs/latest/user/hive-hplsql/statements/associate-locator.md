---
title: "Apache Hive : ASSOCIATE LOCATOR Statement"
date: 2026-08-12
---

# Apache Hive : ASSOCIATE LOCATOR Statement

ASSOCIATE LOCATOR statement allows you to associate locator variable with a result set returned from a stored procedure. 

Then you can use [ALLOCATE CURSOR]({{< ref "allocate-cursor" >}}) statement to assign a cursor for the locator and fetch data.

**Syntax**:

```
ASSOCIATE [RESULT SET] LOCATOR | LOCATORS (loc [, locN, ...]) 
  WITH PROCEDURE procedure_name
```

For examples, see [ALLOCATE CURSOR]({{< ref "allocate-cursor" >}}) statement.

**Compatibility:** IBM DB2

**Version:** HPL/SQL 0.3.11
