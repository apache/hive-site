---
title: "Apache Hive : HPL/SQL Configuration File"
date: 2026-08-12
---

# Apache Hive : HPL/SQL Configuration File

HPL/SQL configuration is stored in *hplsql-site.xml* file. This file stores options in the following format:

```
<configuration>
<property>
  <name></name>
  <value></value>
  <description></description>
</property>
</configuration>
```

Note that you can set all options dynamically using the [SET]({{< ref "assign" >}}) statement in a HPL/SQL script: `SET option=value;` 

## .hplsqlrc File

*.hplsqlrc* file is automatically executed when you launch *hplsql* tool. In this file you can define user-defined SQL functions and stored procedures that can be later used in your HPL/SQL scripts.

.hplsqlrc file is loaded from a CLASSPATH directory. Note that you can also run statements per each connection, see [splsql.conn.init.default]({{< ref "configuration#hplsqlconninitdefault" >}}) for details.

If *.hplsqlrc* does not exist, HPL/SQL also tries to execute *hplsqlrc* file.

Version: HPL/SQL 0.3.1

## hplsql.conn.default

The *hplsql.conn.default* option specifies the default connection profile. The default value is *hiveconn*. You can use the [SET]({{< ref "assign" >}}) statement in a HPL/SQL script to change the default profile at runtime:

```
SET hplsql.conn.default = <new_connection_profile>;
```

For information about connection profiles, see [Connections]({{< ref "connections" >}}) and [Working with Multiple Databases]({{< ref "multiple-databases" >}}).

Version: HPL/SQL 0.1

## hplsql.conn.hiveconn

The *hplsql.conn.hiveconn* option specifies the connection profile for Hive embedded JDBC connection (not requiring a HiveServer):

```
<property>
  <name>hplsql.conn.hiveconn</name>
  <value>org.apache.hadoop.hive.jdbc.HiveDriver;jdbc:hive://</value>
</property> 
```

You can use this profile when you run HPL/SQL tool on a host containing the Hive client (typically, a node of the Hadoop cluster).

Version: HPL/SQL 0.3.1

## hplsql.conn.init.hiveconn

The *hplsql.conn.init.hiveconn* option defines SQL statements to execute after establishing a connection to the [hiveconn]({{< ref "configuration#hplsqlconnhiveconn" >}}) profile. You can use this option to specify job queue, execution engines in Hive etc.

For example:

```
<property>
  <name>hplsql.conn.init.hiveconn</name>
  <value>
     set mapred.job.queue.name=dev;
     set hive.execution.engine=mr; 
     use sales_db;
  </value>
</property>
```

Version: HPL/SQL 0.3.1

## hplsql.conn.convert.hiveconn

The *hplsql.conn.convert.hiveconn* option defines whether on-the-fly SQL conversion is enabled for the [hiveconn]({{< ref "configuration#hplsqlconnhiveconn" >}}) profile. The default value is *true*.

For example:

```
<property>
  <name>hplsql.conn.convert.hiveconn</name>
  <value>true</value>
</property>
```

Version: HPL/SQL 0.3.1

## hplsql.conn.hive2conn

The *hplsql.conn.hive2conn* option specifies the connection profile for HiveServer2 JDBC:

```
<property>
  <name>hplsql.conn.hive2conn</name>
  <value>org.apache.hive.jdbc.HiveDriver;jdbc:hive2://localhost:10000;user;pwd</value>
</property> 
```

You can use this profile when you run HPL/SQL tool on a remote host.

Version: HPL/SQL 0.3.1

## hplsql.conn.init.hive2conn

The *hplsql.conn.init.hive2conn* option defines SQL statements to execute after establishing a connection to the [hive2conn]({{< ref "configuration#hplsqlconnhive2conn" >}}) profile. You can use this option to specify job queue, execution engines in Hive etc.

For example:

```
<property>
  <name>hplsql.conn.init.hiveconn2</name>
  <value>
     set mapred.job.queue.name=dev;
     set hive.execution.engine=mr; 
     use sales_db;
  </value>
</property>
```

Version: HPL/SQL 0.3.1

## hplsql.conn.convert.hive2conn

The *hplsql.conn.convert.hive2conn* option defines whether on-the-fly SQL conversion is enabled for the [hive2conn]({{< ref "configuration#hplsqlconnhiveconn" >}}) profile. The default value is *true*.

For example:

```
<property>
  <name>hplsql.conn.convert.hive2conn</name>
  <value>true</value>
</property>
```

Version: HPL/SQL 0.3.1

## hplsql.conn.db2conn

The *hplsql.conn.db2conn* option specifies the connection profile for a IBM DB2 database:

```
<property>
  <name>hplsql.conn.db2conn</name>
  <value>com.ibm.db2.jcc.DB2Driver;jdbc:db2://localhost:50001/dbname;user;pwd</value>
  <description>IBM DB2 connection</description>
</property> 
```

When using DB2 JDBC driver make sure *db2jcc4.jar* is specified in CLASSPATH.

Set appropriate login information and use this profile if you need to work with a DB2 database from a HPL/SQL script.

Version: HPL/SQL 0.3.7

## hplsql.conn.tdconn

The *hplsql.conn.tdconn* option specifies the connection profile for a Teradata database:

```
<property>
 <name>hplsql.conn.tdconn</name>
 <value>
 com.teradata.jdbc.TeraDriver;jdbc:teradata://host/database=name,logmech=ldap;usr;pwd
 </value>
 <description>Teradata connection</description>
</property> 
```

When using Teradata JDBC driver make sure *teradata-jdbc4-xx.xx.xx.jar* and *tdgssconfig.jar* (both .jars required) are specified in CLASSPATH.

Set appropriate login information and use this profile if you need to work with a Teradata database from a HPL/SQL script.

Version: HPL/SQL 0.3.7

## hplsql.conn.mysqlconn

The *hplsql.conn.mysqlconn* option specifies the connection profile for a MySQL database:

```
<property>
  <name>hplsql.conn.mysqlconn</name>
  <value>com.mysql.jdbc.Driver;jdbc:mysql://localhost/test;user;pwd</value>
  <description>MySQL connection</description>
</property> 
```

When using MySQL JDBC driver make sure *mysql-connector-java-x.x.xx-bin.jar* is specified in CLASSPATH.

Set appropriate login information and use this profile if you need to work with a MySQL database from a HPL/SQL script.

Version: HPL/SQL 0.3.1

## hplsql.conn.<connection_profile>

The *hplsql.conn.<connection_profile>* option defines the connection profile *<connection_profile>*. 

The *value* tag contains information about JDBC driver, connection string, user and password separated by semicolon (;)

```
<value>JDBC Driver;JDBC Connection String;User;Password</value>
```

For example:

```
<property>
  <name>hplsql.conn.sales_conn</name>
  <value>com.mysql.jdbc.Driver;jdbc:mysql://localhost/sales_db;paul;pwd</value>
</property>
```

For information about connection profiles, see [Connections]({{< ref "connections" >}}) and [Working with Multiple Databases]({{< ref "multiple-databases" >}}).

Version: HPL/SQL 0.3.1

## hplsql.conn.init.<connection_profile>

The *hplsql.conn.init.<connection_profile>* option defines SQL statements to execute after establishing a connection to the *<connection_profile>*. You can use this option to specify the current database, schema or set session options.

For example:

```
<property>
  <name>hplsql.conn.init.sales_conn</name>
  <value>
     use sales_db;
  </value>
</property>
```

If you need to execute multiple SQL statements use semicolon (;) to separate them.

Version: HPL/SQL 0.3.1

## hplsql.dual.table

The *hplhql.dual.table* option defines a single row, single column table that HPL/SQL can use for internal operations. 

Note that Hive allows you to execute SELECT statement without FROM clause since version 0.14 only. Using this option and Hive 0.13 and earlier, you can force HPL/SQL to automatically add FROM *hplhql.dual.table* to any SELECT statement that does not have FROM. 

The default value is **default.dual** for HPL/SQL 0.3.13 and earlier, and empty since HPL/SQL 0.3.17. So now HPL/SQL does not add FROM *hplhql.dual.table*, by default.

Note that the table must exist in the database, HPL/SQL can only use an existing table. 

Version: HPL/SQL 0.3 introduced, HPL/SQL 0.3.17 default value changed.

## hplsql.insert.values

The *hplsql.insert.values* option defines how HPL/SQL executes INSERT VALUES statement in Hive.

If *hplsql.insert.values* is set to **native** HPL/SQL relies on the database that must support INSERT VALUES syntax. Note that INSERT VALUES is available in Hive since version 0.14 only and can only be performed on tables that support ACID.

If *hplsql.insert.values* is set to **select** HPL/SQL transforms VALUES clause to the list of SELECT FROM dual UNION ALL ... clauses.

The default value is **native**. For more information, see [INSERT Statement]({{< ref "insert" >}}).

Version: HPL/SQL 0.3
## hplsql.onerror

The *hplsql.onerror* option defines how HPL/SQL handles errors. 

Values:

- **exception** - HPL/SQL raises an exception when an error occurs. This is the default.
- **seterror** - HPL/SQL sets the error code to SQLCODE or HOSTCODE variables and continues execution
- **stop** - HPL/SQL stops executing the script and exits. 

For more information, see [Error Handling]({{< ref "error-handling" >}}).

Version: HPL/SQL 0.1

## hplsql.temp.tables

The *hplsql.temp.tables* option defines how HPL/SQL handles temporary tables. 

Values:

- **native** - HPL/SQL relies on the underlying database that must natively support temporary tables. This is the default.

Note that Hive supports temporary tables since version 0.14 only.

- **managed** - HPL/SQL emulates temporary tables. Set this option if the underlying database does not support temporary tables.

For more information, see [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}})

Version: HPL/SQL 0.3

## hplsql.temp.tables.schema

The *hplsql.temp.tables.schema* option specifies in which schema HPL/SQL creates temporary tables. This option is only applied if *hplsql.temp.tables* is set to **managed**.

By the default, the current schema is used.

For more information, see [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}})

Version: HPL/SQL 0.3

## hplsql.temp.tables.location

The *hplsql.temp.tables.location* option specifies the HDFS directory which is used for store temporary tables data by HPL/SQL. This option is only applied if *hplsql.temp.tables* is set to **managed**.

By the default, */tmp/hplsql* directory is used.

For more information, see [DECLARE TEMPORARY TABLE]({{< ref "declare-temporary-table" >}})

Version: HPL/SQL 0.3
