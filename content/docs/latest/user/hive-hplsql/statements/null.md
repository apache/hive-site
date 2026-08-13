---
title: "Apache Hive : NULL Statement"
date: 2026-08-12
---

# Apache Hive : NULL Statement

NULL statement is a no operation statement (no-op), it just passes control to the next statement.

**Syntax**:

```
NULL;
```

**Example**:

```
declare 
  code char(1) := 'a';
begin
  null;
end;
```

**Compatibility:** Oracle

**Version:** HPL/SQL 0.3.13
