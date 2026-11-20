---
title: "Apache Hive : HPL/SQL - Native and Managed Temporary Tables"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - Native and Managed Temporary Tables

HPL/SQL provides you with two options to work with temporary tables: native and managed. 

Use the [hplsql.temp.tables]({{% ref "configuration#hplsqltemptables" %}}) option to define how to handle temporary tables, the default value is **native**.

## Native Temporary Tables

When native temporary tables are used HPL/SQL relies on the underlying HiveServer to manage temporary tables. 

HPL/SQL converts DECLARE TEMPORARY TABLE statement to CREATE TEMPORARY TABLE in Hive.

## Managed Temporary Tables

When [hplsql.temp.tables]({{% ref "configuration#hplsqltemptables" %}}) is set to **managed**, HPL/SQL creates a regular table in the HiveServer and automatically drops it at the end of the session. 

Note that the schema name and location are defined by [hplsql.temp.tables.schema]({{% ref "configuration#hplsqltemptablesschema" %}}) and [hplsql.temp.tables.location]({{% ref "configuration#hplsqltemptableslocation" %}}) options, respectively.

Also UUID is added to the table name to prevent name conflicts between multiple sessions. 

For example, if you declare temporary table *temp1*, HPL/SQL will actually create something like *temp1_3fc162e0590f4e17ae141385cc0e8447*.

**Example**:

Create a managed temporary table and use it in other SQL statements:

```
SET hplsql.temp.tables = managed;

DECLARE TEMPORARY TABLE temp1
(
   c1 INT,
   c2 STRING
);

INSERT INTO temp1 SELECT 1, 'A';

SELECT * FROM temp1;
```

See also:
- [CREATE LOCAL TEMPORARY TABLE]({{% ref "create-local-temporary-table" %}})
- [CREATE VOLATILE TABLE]({{% ref "create-volatile-table" %}})
- [DECLARE TEMPORARY TABLE]({{% ref "declare-temporary-table" %}})
