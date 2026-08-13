---
title: "Apache Hive : Invoke Hive CLI - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : Invoke Hive CLI - PL/HQL Reference

*hive* allows you to invoke Hive CLI (command line tool) to execute a SQL statement or HQL script.

**Syntax**:

```
hive -e 'query' | -f file [-hiveconf var=expr ...]
```

**Parameters:**

| **Parameter** | **Description** |
| --- | --- |
| -e 'query' | SQL statements to execute |
| -f file | Execute SQL statements from *file* | 
| -hiveconf var=expr | Hive variables |

**Notes**:

- -e and -f cannot be specified together
- Using -hiveconf you can specify a value from an expression

**Example 1:**

```
hive -f script.hql -hiveconf cr_date=NVL(var, '1970-01-01')
```

**Example 2:**

```
hive -e 'SELECT ' || cols || ' FROM ' || table || ' LIMIT 3' 
```

**Compatibility**: Apache Hive.
