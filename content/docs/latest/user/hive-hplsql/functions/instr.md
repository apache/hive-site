---
title: "Apache Hive : INSTR Function - PL/HQL"
date: 2026-08-12
---

# Apache Hive : INSTR Function - PL/HQL

INSTR function returns the starting position of a substring within a string.

**Syntax**:

```
INSTR(string, substring [, position [, occurrence]]) 
```

**Notes**:

- *position* specifies the staring position for search, the default is 1 (the beginning of *string*)
- If *position* is negative INSTR counts and searches backward from the end of string
- *occurrence* specifies which occurrence of *substring* to search, the default is 1 (finds the first occurrence)
- If *string* is NULL the return value is NULL
- if *string* is not NULL and *substring* not found the return value is 0

**Return Type:**

INT

**Example 1**:

Find the first occurrence starting from the beginning:

```
INSTR('abc', 'b')                      -- Result 2
```

**Example 2**:

Find the first occurrence starting from the 3rd position:

```
INSTR('abcabc', 'b', 3)                -- Result 5
```

**Example 3**:

Find the second occurrence starting from the 3rd position:

```
INSTR('abcabcabc', 'b', 3, 2)          -- Result 8
```

**Example 4**:

Find the first occurrence starting from the 3rd position from the end:

```
INSTR('abcabcabc', 'b', -3)            -- Result 5
```

**Example 5**:

Find the second occurrence starting from the 3rd position from the end:

```
INSTR('abcabcabc', 'b', -3, 2)         -- Result 2
```

**Compatibility**: Oracle, IBM DB2 and Teradata.

**Version:** PL/HQL 0.3.11
