---
title: "Apache Hive : Hive UDF to Run PL/HQL Scripts from Hive CLI"
date: 2026-08-12
---

# Apache Hive : Hive UDF to Run PL/HQL Scripts from Hive CLI

PL/HQL includes a Hive UDF function that allows you to execute PL/HQL scripts (user-defined functions written in PL/HQL language) in Hive queries.

For example, let's call the following function from a Hive query:

```
CREATE FUNCTION hello(text STRING)
 RETURNS STRING
BEGIN
 RETURN 'Hello, ' || text || '!';
END;
```

## Running PL/HQL from Hive CLI

Put this script to *plhqlrc* file, then register PL/HQL UDF in Hive as follows (set your path for jars and configuration files):

```
ADD JAR /home/pl/plhql.jar;
ADD JAR /home/pl/antlr-runtime-4.4.jar;

ADD FILE /home/pl/plhql-site.xml;
ADD FILE /home/pl/plhqlrc;

CREATE TEMPORARY FUNCTION plhql AS 'org.plhql.Udf';
```

Now let's use *hello* function written in PL/HQL language in Hive:

```
SELECT plhql('hello(:1)', name) FROM users;
```

## Running PL/HQL from PL/HQL CLI

When you run PL/HQL scripts using PL/HQL CLI tool you can just use user-defined functions the same way as you use built-in functions:

```
SELECT hello(name) FROM users;
```

PL/HQL CLI tool automatically puts referenced PL/HQL user-defined functions and stored procedures to Distributed Cache, registers the Hive UDF and modifies the function call in the SQL statements. 

For more information, see [User-Defined Functions and Stored Procedures]({{< ref "udf-sproc" >}}).

**Version**: PL/HQL 0.3.1
