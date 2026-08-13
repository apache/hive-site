---
title: "Apache Hive : Execute OS Command or External Process"
date: 2026-08-12
---

# Apache Hive : Execute OS Command or External Process

PL/HQL allows you to execute an OS command or external process from a PL/HQL script:

**Syntax**:

! command:

```
!cmd [arguments];
```

HOST statement:

```
HOST string_expr
```

**Parameters:**

| **Parameter** | **Description** |
| --- | --- |
| cmd | Any OS command or process |
| arguments | Optional argument list | 
| string_expr | Command line for HOST statement |

**Notes**:

- Blank characters are allowed between ! and cmd
- The ! command must be terminated by a semicolon (;)

**Example:**

Using ! command:

```
!echo Hello, world;
```

Using HOST statement:

```
HOST 'echo Hello, world';
```

**Compatibility**: Apache Hive (! command), Oracle (HOST statement).

**Version**: PL/HQL 0.01
