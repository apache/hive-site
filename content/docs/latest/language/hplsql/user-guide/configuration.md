---
title: "Apache Hive : HPL/SQL - Configurations"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - Configurations

You can set all options dynamically using the [SET]({{% ref "assign" %}}) statement in a HPL/SQL script: `SET option=value;` 

<!-- Version: HPL/SQL 0.3 -->

## hplsql.onerror

The *hplsql.onerror* option defines how HPL/SQL handles errors. 

Values:

- **exception** - HPL/SQL raises an exception when an error occurs. This is the default.
- **seterror** - HPL/SQL sets the error code to SQLCODE variables and continues execution
- **stop** - HPL/SQL stops executing the script and exits. 

For more information, see [Error Handling]({{% ref "error-handling" %}}).

<!-- Version: HPL/SQL 0.1 -->

## hplsql.temp.tables

The *hplsql.temp.tables* option defines how HPL/SQL handles temporary tables. 

Values:

- **native** - HPL/SQL relies on the underlying database that must natively support temporary tables. This is the default.

Note that Hive supports temporary tables since version 0.14 only.

- **managed** - HPL/SQL emulates temporary tables. Set this option if the underlying database does not support temporary tables.

For more information, see [DECLARE TEMPORARY TABLE]({{% ref "declare-temporary-table" %}})

<!-- Version: HPL/SQL 0.3 -->

## hplsql.temp.tables.schema

The *hplsql.temp.tables.schema* option specifies in which schema HPL/SQL creates temporary tables. This option is only applied if *hplsql.temp.tables* is set to **managed**.

By the default, the current schema is used.

For more information, see [DECLARE TEMPORARY TABLE]({{% ref "declare-temporary-table" %}})

<!-- Version: HPL/SQL 0.3 -->

## hplsql.temp.tables.location

The *hplsql.temp.tables.location* option specifies the HDFS directory which is used for store temporary tables data by HPL/SQL. This option is only applied if *hplsql.temp.tables* is set to **managed**.

By the default, */tmp/hplsql* directory is used.

For more information, see [DECLARE TEMPORARY TABLE]({{% ref "declare-temporary-table" %}})

<!-- Version: HPL/SQL 0.3 -->
