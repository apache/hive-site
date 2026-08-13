---
title: "Apache Hive : Addition Operator (+)"
date: 2026-08-12
---

# Apache Hive : Addition Operator (+)

You can use + arithmetic operator to add two numbers, concatenate two strings, or add an interval to a DATE value.

**Syntax:**

```
expr + expr
```

## Add Two Integers

When you add two integer values the result of the operation also has an integer value.

**Example:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| 3 + 1 | 4 | Integer |

## Concatenate Two Strings

When you use + for string operand the result of the operation is the concatenated string.

**Example:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| 'Ab' + 'c' | 'Abc' | String |
## Add an Integer to Date

When you add an integer to a DATE value, PL/HQL adds the number of days to the DATE and the result of the operation is a DATE value.

**Example:**

| **Expression** | **Result** | **Result Type** |
| --- | --- | --- |
| DATE '2014-12-31' + 1 | DATE '2015-01-01' | DATE |
