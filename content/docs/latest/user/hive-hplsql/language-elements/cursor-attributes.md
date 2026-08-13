---
title: "Apache Hive : Cursor Attributes"
date: 2026-08-12
---

# Apache Hive : Cursor Attributes

Cursor attributes allow you to get information about the current cursor state.

**Syntax**:

```
cursor_name%ISOPEN

cursor_name%FOUND

cursor_name%NOTFOUND
```

- *cursor_name* is the name of a declared cursor or cursor variable.

## %ISOPEN Attribute

%ISOPEN returns *true* if the cursor is open, otherwise it returns *false*;

## %FOUND Attribute

%FOUND returns NULL before the first fetch from the cursor, *true* if the last fetch returned a row, and *false* otherwise.

## %NOTFOUND Attribute

%NOTFOUND returns NULL before the first fetch from the cursor, *false* if the last fetch returned a row, and *true* otherwise.

**Example:**

```
DECLARE 
  CURSOR c1 IS SELECT name FROM users LIMIT 1;
  v1 VARCHAR(30);
BEGIN
  OPEN c1;
  IF c1%ISOPEN THEN
    DBMS_OUTPUT.PUT_LINE('Cursor open');
  END IF; 

  FETCH c1 INTO v1;

  IF c1%FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Row found');
  END IF;  

  FETCH c1 INTO v1;

  IF c1%NOTFOUND THEN
    DBMS_OUTPUT.PUT_LINE('Row not found');
  END IF;  

  CLOSE c1; 
END;
```

**Compatibility:** Oracle

**Version:** HPL/SQL 0.3.11

**See also:**
- [OPEN]({{< ref "open" >}})
- [FETCH]({{< ref "fetch" >}})
- [CLOSE]({{< ref "close" >}})
