---
title: "Apache Hive : CREATE PACKAGE Statement"
date: 2026-08-12
---

# Apache Hive : CREATE PACKAGE Statement

CREATE PACKAGE statement allows you to define a collection of related variables, procedures and functions.

**Syntax**

Package specification:

```
[CREATE [OR REPLACE] | REPLACE] PACKAGE package_name AS | IS package_spec END

package_spec:
  variable declaration |
  function declaration |
  procedure declaration
```

Package body:

```
[CREATE [OR REPLACE] | REPLACE] PACKAGE BODY package_name AS | IS package_body END

package_body:
  private variable declaration |
  function definition |
  procedure definition
```

**Example**:

Define a package and then call its members.

Package specification:

```
create or replace package users as
  session_count int := 0;
  function get_count() return int; 
  procedure add(name varchar(100));
end;
```

Package body:

```
create or replace package body users as
  function get_count() return int
  is
  begin
    return session_count;
  end; 
  procedure add(name varchar(100))
  is 
  begin
    -- ...
    session_count = session_count + 1;
  end;
end;
```

Using the package:

```
users.add('John');
users.add('Sarah');
users.add('Paul');
print 'Number of users: ' || users.get_count();
```

**Compatibility:** Oracle

**Version**: HPL/SQL 0.3.13

See also:
- [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}})
- [CALL]({{< ref "call" >}})
- [CREATE FUNCTION]({{< ref "create-function" >}})
- [CREATE PROCEDURE]({{< ref "create-procedure" >}})
- [INCLUDE]({{< ref "include" >}})
