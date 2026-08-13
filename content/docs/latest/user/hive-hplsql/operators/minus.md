---
title: "Apache Hive : Subtraction Operator (-) PL/HQL"
date: 2026-08-12
---

# Apache Hive : Subtraction Operator (-) PL/HQL

You can use (-) arithmetic operator to subtract two numbers, or subtract the number of days from a DATE value.

**Syntax:**

```
expr - expr
```

## Subtract Two Integers

When you subtract two integer values the result of the operation also has an integer value.

**Example:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| 3 - 1 | 2 | Integer |

## Subtract Integer from Date

When you subtract an integer from a DATE value, PL/HQL subtracts the number of days from the DATE and the result of the operation is a DATE value.

**Example:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| DATE '2015-01-01' - 1 | DATE '2014-12-31' | DATE |
