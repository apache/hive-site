---
title: "Apache Hive : Working with Multiple Databases in HPL/SQL"
date: 2026-08-12
---

# Apache Hive : Working with Multiple Databases in HPL/SQL

HPL/SQL allows you to access multiple databases simultaneously from a single HPL/SQL script.  

## Why Multiple Databases?

Hadoop extends, not replaces a traditional data warehouse, so you have to work with different systems for different type of workloads. 

Most SQL-on-Hadoop solutions are good for querying large volumes of data rather than transaction processing. Note that even Hive stores its own metadata is a separate database (MySQL, PostgreSQL, Oracle etc.). 

When you use Hive or other SQL-on-Hadoop tool to query your data, you can use a RDBMS or NoSQL to:

- Write log and audit records
- Access look-up or dimension tables
- Read and write configuration parameters
- Save query results and so on. 

## Configuring and Using Connections

Before you can work with multiple databases, you have to [configure connections]({{< ref "connections" >}}). 

HPL/SQL connects to a database only when it executes the first SQL statement for this database, the tool does not connect to any database in advance.

Once connected, HPL/SQL holds and re-uses the connection until the script completes.

## Default Connection

By default, HPL/SQL uses the connection profile defined by the [hplsql.conn.default]({{< ref "configuration#hplsqlconndefault" >}}) option.

## Map Database Objects to Use Other Connections

Once you configured multiple connection profiles you can use [MAP OBJECT]({{< ref "map-object" >}}) statement to map a table or view to the specified connection. Then when accessing in SQL statements HPL/SQL will use appropriate connection for the object:

For example, you can run SELECT in Hive, but log messages to MySQL:

```
MAP OBJECT log TO log.log_data AT mysqlconn;

DECLARE cnt INT;
SELECT count(*) INTO cnt FROM sales.users WHERE local_dt = CURRENT_DATE;

INSERT INTO log (message) VALUES ('Number of users: ' || cnt);  
```
