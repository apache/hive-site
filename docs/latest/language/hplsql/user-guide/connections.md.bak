---
title: "Apache Hive : Connections - HPL/SQL Reference"
date: 2026-08-12
---

# Apache Hive : Connections - HPL/SQL Reference

HPL/SQL allows you to [work with multiple databases]({{< ref "multiple-databases" >}}) in a single HPL/SQL script. 

## Configuring Connections

Connection information is stored in [plhql-site.xml]({{< ref "configuration" >}}) configuration file. The default connection profile is defined by [plhql.conn.default]({{< ref "configuration#plhqlconndefault" >}}) option:

```
<property>
  <name>plhql.conn.default</name>
  <value>hiveconn</value>
</property>
```

## Predefined Connections

[plhql-site.xml]({{< ref "configuration" >}}) contains predefined connections for some databases:

- **hiveconn** - Embedded Hive JDBC Connection (not requiring a HiveServer)

```
<property>
  <name>plhql.conn.hiveconn</name>
  <value>org.apache.hadoop.hive.jdbc.HiveDriver;jdbc:hive://</value>
</property> 
```

- **hive2conn** - HiveServer2 JDBC Connection

```
<property>
  <name>plhql.conn.hive2conn</name>
  <value>org.apache.hive.jdbc.HiveDriver;jdbc:hive2://localhost:10000</value>
</property> 
```

- **db2conn** - IBM DB2 JDBC Connection

```
<property>
  <name>plhql.conn.db2conn</name>
  <value>com.ibm.db2.jcc.DB2Driver;jdbc:db2://localhost:50001/dbname;user;pwd</value>
  <description>IBM DB2 connection</description>
</property> 
```

When using DB2 JDBC driver make sure *db2jcc4.jar* is specified in CLASSPATH.

- **tdconn** - Teradata JDBC Connection

```
<property>
 <name>plhql.conn.tdconn</name>
 <value>
 com.teradata.jdbc.TeraDriver;jdbc:teradata://host/database=name,logmech=ldap;usr;pwd
 </value>
</property> 
```

When using Teradata JDBC driver make sure *teradata-jdbc4-xx.xx.xx.jar*and *tdgssconfig.jar* (both .jars required) are specified in CLASSPATH.

- **mysqlconn** - MySQL JDBC Connection

```
<property>
  <name>plhql.conn.mysqlconn</name>
  <value>com.mysql.jdbc.Driver;jdbc:mysql://localhost/test;user;password</value>
</property>
```

When using MySQL JDBC driver make sure *mysql-connector-java-x.x.xx-bin.jar* is specified in CLASSPATH.

You can modify these connection profiles and specify appropriate connection details. Set the default connection profile using the [plhql.conn.default]({{< ref "configuration#plhqlconndefault" >}}) option.
## Defining a New Connection

PL/HQL allows you to define any connection profile. Just create a new parameter named *plhql.conn.<your_connection_name>* and specify the connection details:

```
<value>JDBC Driver;JDBC Connection String;User;Password</value>
```

For example, to create a new connection *sales* that points to the *sales_db* database in MySQL add the following section to your [plhql-site.xml]({{< ref "configuration" >}}) file:

```
<property>
  <name>plhql.conn.sales</name>
  <value>com.mysql.jdbc.Driver;jdbc:mysql://localhost/sales_db;paul;pwd</value>
</property>
```

Read your JDBC driver documentation how to properly specify the connection string and available options.

Once you configured the connections, read how to [use them in PL/HQL scripts]({{< ref "multiple-databases" >}}).
