---
title: "Apache Hive : DBMS_OUTPUT Package - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : DBMS_OUTPUT Package - PL/HQL Reference

DBMS_OUTPUT package allows you to send messages and can be helpful to debug programs

**Example:**

```
BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello, world!');
END;
```

**Compatibility**: Oracle

## PUT_LINE Function

PUT_LINE function writes a text string to the standard output (screen, by default). The function appends a line terminator. 

**Syntax:**

```
DBMS_OUTPUT.PUT_LINE(text);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| text | VARCHAR | Text string or expression | 

**Return Value:**

No.

**Example:**

```
BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello, world!');
END;
```
