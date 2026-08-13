---
title: "Apache Hive : VALUES INTO Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : VALUES INTO Statement - PL/HQL Reference

You can use the VALUES INTO statement to assign values to variables in PL/HQL. 

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

**Version**: PL/HQL 0.03

See also:
- [SET Statement]({{< ref "assign" >}})
