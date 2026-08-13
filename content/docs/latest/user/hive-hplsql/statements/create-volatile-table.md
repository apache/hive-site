---
title: "Apache Hive : CREATE VOLATILE TABLE Statement - PL/HQL"
date: 2026-08-12
---

# Apache Hive : CREATE VOLATILE TABLE Statement - PL/HQL

CREATE VOLATILE TABLE statement allows you to create a temporary table for the current session.

**Syntax**:

```
CREATE [SET | MULTISET] VOLATILE TABLE table_name
(
   column_name data_type [NULL | NOT NULL]
   [, ...]
)
[ ON COMMIT DELETE ROWS | ON COMMIT PRESERVE ROWS]
```

Notes:
- The volatile table is automatically dropped at the end of session.

For more details how temporary table support is implemented in PL/HQL, see [Native and Managed Temporary Tables]({{< ref "temporary-tables" >}}).

**Example**:

Create a managed temporary table and use it in other SQL statements:

```
SET plhql.temp.tables = managed;

CREATE VOLATILE TABLE temp1
(
   c1 INT,
   c2 STRING
);

INSERT INTO temp1 SELECT 1, 'A' FROM dual;

SELECT * FROM temp1;
```

**Compatibility:** Teradata

**Version**: PL/HQL 0.3.1

See also:
- [Native and Managed Temporary Tables]({{< ref "temporary-tables" >}})
- [CREATE LOCAL TEMPORARY TABLE]({{< ref "create-local-temporary-table" >}})
- [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}})
