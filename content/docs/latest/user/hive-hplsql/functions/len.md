---
title: "Apache Hive : LEN Function - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : LEN Function - PL/HQL Reference

LEN function returns the length of the specified string expression in characters, **excluding** the trailing blanks.

**Syntax**:

```
LEN(string_expression); 
```

**Return Data Type:**

STRING

**Example:**

```
LEN('Abc ');
---
3
```

**Compatibility**: Microsoft SQL Server

**Version**: PL/HQL 0.03

See also:
- [LENGTH]({{< ref "length" >}})
