---
title: "Apache Hive : HPL/SQL - VALUES INTO Statement"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - VALUES INTO Statement

You can use the VALUES INTO statement to assign values to variables in HPL/SQL. 

If the variable was not explicitly declared before the assignment, a new variable is created and its data type is derived from the assignment expression.

**Syntax:**

```
VALUES expression INTO var;
|
VALUES (expression [, expression2, ...]) INTO (var [, var2, ...]); 
```

Example:

```
VALUES 'A' INTO code;
VALUES (0, 100) INTO (count, limit); 
```

**Compatibility:** IBM DB2

<!-- **Version**: HPL/SQL 0.03 -->

See also:
- [SET Statement]({{% ref "assign" %}})
