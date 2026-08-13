---
title: "Apache Hive : %TYPE Attribute"
date: 2026-08-12
---

# Apache Hive : %TYPE Attribute

%TYPE attribute lets you declare a variable that has the same data type as the specified referenced column.

**Syntax**:

```
var_name [schema.]table.column_name%TYPE
```

- If *table.column_name* cannot be found, the data type is derived from the first assignment expression.

**Example:**

```
DECLARE 
  i orders.item%TYPE;
BEGIN
  SELECT item INTO i FROM orders LIMIT 1;
  DBMS_OUTPUT.PUT_LINE('Item: ' || i);
END;
```

**Compatibility:** Oracle

**Version:** HPL/SQL 0.3.13
