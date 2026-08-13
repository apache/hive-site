---
title: "Apache Hive : UPDATE Statement"
date: 2026-08-12
---

# Apache Hive : UPDATE Statement

UPDATE statement allows you to update columns of existing rows in the specified table. 

**Syntax**:

```
UPDATE table_name
  SET col = expr [, coln = exprn] ...
  [WHERE condition]

UPDATE table_name
  SET (col [, coln] ...) = (expr [, exprn] ... | select_statement)
  [WHERE condition]
```
