---
title: "Apache Hive : HPL/SQL - Hive UDF to Run HPL/SQL Scripts from Beeline in non-hplsql mode"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - Hive UDF to Run HPL/SQL Scripts from Beeline in non-hplsql mode

HPL/SQL includes a Hive UDF function(***hplsql***) that allows you to execute HPL/SQL scripts (user-defined functions written in HPL/SQL language) in Hive queries.

For example, let's call the following function from a Hive query:

```
CREATE FUNCTION hello(text STRING)
 RETURNS STRING
BEGIN
 RETURN 'Hello, ' || text || '!';
END;
```

## Running HPL/SQL scripts from Beeline in non-hplsql mode

Now let's use *hello* function written in HPL/SQL language in Hive query:

```
SELECT hplsql('hello(:1)', name) FROM users;
```

## Running HPL/SQL scripts from from Beeline in hplsql mode

When you run HPL/SQL scripts from Beeline in hplsql mode, you can just use user-defined functions the same way as you use built-in functions:

```
SELECT hello(name) FROM users;
```

For more information, see [User-Defined Functions and Stored Procedures]({{% ref "udf-sproc" %}}).

<!-- **Version**: HPL/SQL 0.3.1 -->
