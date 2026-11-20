---
title: "Apache Hive : HPL/SQL - CREATE LOCAL TEMPORARY TABLE"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - CREATE LOCAL TEMPORARY TABLE

CREATE LOCAL TEMPORARY TABLE statement allows you to create a temporary table for the current session.

**Syntax**:

```
CREATE LOCAL TEMPORARY TABLE table_name
(
   column_name data_type [NULL | NOT NULL]
   [, ...]
)
[ ON COMMIT DELETE ROWS | ON COMMIT PRESERVE ROWS]
```

Notes:
- The local temporary table is automatically dropped at the end of session.

For more details how temporary table support is implemented in HPL/SQL, see [Native and Managed Temporary Tables]({{% ref "temporary-tables" %}}).

**Example**:

Create a managed temporary table and use it in other SQL statements:

```
SET hplsql.temp.tables = managed;

CREATE LOCAL TEMPORARY TABLE temp1
(
   c1 INT,
   c2 STRING
);

INSERT INTO temp1 SELECT 1, 'A' FROM dual;

SELECT * FROM temp1;
```

**Compatibility:** ANSI SQL

<!-- **Version**: HPL/SQL 0.3.1 -->

See also:
- [Native and Managed Temporary Tables]({{% ref "temporary-tables" %}})
- [CREATE VOLATILE TABLE]({{% ref "create-volatile-table" %}})
- [DECLARE TEMPORARY TABLE]({{% ref "declare-temporary-table" %}})
