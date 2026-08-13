---
title: "Apache Hive : IF Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : IF Statement - PL/HQL Reference

IF statement executes a set of statements depending on the value of a boolean expression.

PL/HQL supports multiple syntaxes for IF statement. 

## IF - THEN - ELSIF/ELSEIF - ELSE - END IF

Syntax:

```
IF boolean_expression THEN
  statements
[ELSIF | ELSEIF THEN
  statements
...]
[ELSE
  statements]
END IF;
```

**Example:**

```
IF state = 'CA' THEN
  code := 1;
ELSIF state = 'NY' THEN
  code := 2;
ELSIF state = 'MA' THEN
  code := 3;
ELSE
  code := 5;
END IF;
```

**Compatibility:** Oracle, Teradata, IBM DB2, MySQL, PostgreSQL, Netezza.

## IF - BEGIN - END - ELSE - BEGIN - END

Syntax:

```
IF boolean_expression 
  single_statement | block
[ELSE 
  single_statement | block];
```

**Example:**

```
IF state = 'CA'
  SET code = 1;
ELSE 
  SET code = 5;
```

```
IF state = 'CA'
BEGIN
  SET code = 1;
  SET type = 'A';
END
ELSE 
BEGIN
  SET code = 5;
  SET type = 'B';
END  
```

**Compatibility:** Microsoft SQL Server.
