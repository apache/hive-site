---
title: "Apache Hive : Equality and Comparison Operators - PL/HQL"
date: 2026-08-12
---

# Apache Hive : Equality and Comparison Operators - PL/HQL

You can use equality and comparison operators `=, ==, <>, !=, <, >, >=, <=` to determine if one operand is equal, not equal, less or greater than another operand.

| = | == | Equal |
| --- | --- | --- |
| <> | != | Not equal |
| > || Greater than |
| < || Less than |
| `>=` || Greater than or equal |
| `<=` || Less than or equal |

**Syntax:**

```
expr = expr 
expr == expr
expr <> expr
expr != expr
expr > expr
expr < expr
expr >= expr
expr <= expr
```

**Examples:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| 3 = 3 | True | Boolean |
| 3 = 1 | False | Boolean |
| 'CA' = NULL | NULL | Boolean |
| 3 == 3 | True | Boolean |
| 3 <> 3 | False | Boolean |
| 3 != 3 | False | Boolean |
| 3 > 1 | True | Boolean |
| 3 < 1 | False | Boolean |
| 3 `>=` 1 | True | Boolean |
| 3 `<=` 1 | False | Boolean |
