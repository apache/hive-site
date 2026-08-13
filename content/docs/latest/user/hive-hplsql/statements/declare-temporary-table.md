---
title: "Apache Hive : DECLARE TEMPORARY TABLE - PL/HQL"
date: 2026-08-12
---

# Apache Hive : DECLARE TEMPORARY TABLE - PL/HQL

DECLARE TEMPORARY TABLE statement allows you to define a temporary table for the current session.

**Syntax**:

```
DECLARE [GLOBAL] TEMPORARY TABLE table_name
(
   column_name data_type [NULL | NOT NULL]
   [, ...]
)
[ ON COMMIT DELETE ROWS | ON COMMIT PRESERVE ROWS]
```

### Compatibility Options

The following options are supported for compatibility with other databases:

**IBM DB2:**

```
IN tablespace_name
WITH REPLACE
DISTRIBUTE BY HASH (col, ...) 
LOGGED | NOT LOGGED
```

For more details how temporary table support is implemented in PL/HQL, see [Native and Managed Temporary Tables]({{< ref "temporary-tables" >}}).

**Example**:

Create a managed temporary table and use it in other SQL statements:

```
SET plhql.temp.tables = managed;

DECLARE TEMPORARY TABLE temp1
(
   c1 INT,
   c2 STRING
);

INSERT INTO temp1 SELECT 1, 'A' FROM dual;

SELECT * FROM temp1;
```

**Compatibility:** IBM DB2

**Version**: PL/HQL 0.03

See also:
- [Native and Managed Temporary Tables]({{< ref "temporary-tables" >}})
- [CREATE LOCAL TEMPORARY TABLE]({{< ref "create-local-temporary-table" >}})
- [CREATE VOLATILE TABLE]({{< ref "create-volatile-table" >}})
