---
title: "Apache Hive : PRINT Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : PRINT Statement - PL/HQL Reference

PRINT statement prints a line and can be helpful to debug programs. The statement appends a line terminator. 

**Syntax:**

```
PRINT exp
or
PRINT(exp)
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| exp | VARCHAR | Text string or expression | 

**Return Value:**

No.

**Examples:**

```
PRINT 'Hello, world!';
PRINT 'Hello, ' || 'world!';
PRINT('Hello, world!');
```

**Compatibility**: Microsoft SQL Server
