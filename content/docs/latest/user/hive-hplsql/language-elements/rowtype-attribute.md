---
title: "Apache Hive : %ROWTYPE Attribute"
date: 2026-08-12
---

# Apache Hive : %ROWTYPE Attribute

%ROWTYPE attribute lets you declare a record variable that has the same columns and data types as the specified database table.

**Syntax**:

```
var_name [schema.]table_name%ROWTYPE
```

**Examples:**

```
DECLARE 
  v orders%ROWTYPE;
BEGIN
  SELECT * INTO v FROM orders LIMIT 1;
  DBMS_OUTPUT.PUT_LINE('Item: ' || v.name || ' - ' || v.description);
END;
```

```
DECLARE 
  v orders%ROWTYPE;
  CURSOR c IS SELECT * FROM orders;
BEGIN
  OPEN c1;
  FETCH c1 INTO v1;
  DBMS_OUTPUT.PUT_LINE('Item: ' || v.name || ' - ' || v.description);
  CLOSE c1;
END;
```

```
BEGIN
  FOR v IN (SELECT * FROM orders)
  LOOP
    DBMS_OUTPUT.PUT_LINE('Item: ' || v.name || ' - ' || v.description);
  END LOOP;
END;
```

```
DECLARE
  v orders%ROWTYPE;
BEGIN
  EXECUTE IMMEDIATE 'SELECT * FROM orders LIMIT 1' INTO v;
  DBMS_OUTPUT.PUT_LINE('Item: ' || v.name || ' - ' || v.description);
END;
```

**Compatibility:** Oracle

**Version:** HPL/SQL 0.3.13
