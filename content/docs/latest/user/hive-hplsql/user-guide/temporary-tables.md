---
title: "Apache Hive : Native and Managed Temporary Tables - PL/HQL"
date: 2026-08-12
---

# Apache Hive : Native and Managed Temporary Tables - PL/HQL

PL/HQL provides you with two options to work with temporary tables: native and managed. 

Use the [plhql.temp.tables]({{< ref "configuration#plhqltemptables" >}}) option to define how to handle temporary tables, the default value is **native**.

## Native Temporary Tables

When native temporary tables are used PL/HQL relies on the underlying database to manage temporary tables. 

PL/HQL converts DECLARE TEMPORARY TABLE statement to CREATE TEMPORARY TABLE in Hive. Note that Hive supports temporary tables since version 0.14 only.

## Managed Temporary Tables

When [plhql.temp.tables]({{< ref "configuration#plhqltemptables" >}}) is set to **managed**, PL/HQL creates a regular table in the database and automatically drops it at the end of the session. 

Note that the schema name and location are defined by [plhql.temp.tables.schema]({{< ref "configuration#plhqltemptablesschema" >}}) and [plhql.temp.tables.location]({{< ref "configuration#plhqltemptableslocation" >}}) options, respectively.

Also UUID is added to the table name to prevent name conflicts between multiple sessions. 

For example, if you declare temporary table *temp1*, PL/HQL will actually create something like *temp1_3fc162e0590f4e17ae141385cc0e8447*.

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

See also:
- [CREATE LOCAL TEMPORARY TABLE]({{< ref "create-local-temporary-table" >}})
- [CREATE VOLATILE TABLE]({{< ref "create-volatile-table" >}})
- [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}})
