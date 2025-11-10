---
title: "Apache Hive : Setting up Metastore backed by MariaDB"
date: 2025-11-05
---

# Apache Hive : Setting up Metastore backed by MariaDB

{{< toc >}}

## Note

**Starting from mysql-connector-java 8.0.12, using the default MySQL driver the Metastore cannot be up to service.**

## Introduction

From mysql-connector-java 8.0.12, MySQL driver issues a getSQLKeywords call for retrieving this database's keywords, triggered by MySQLAdapter(DataNucleus) on Metastore initialization.
However, the back table `KEYWORDS` in MariaDB diverged from that in MySQL, which makes the Metastore fail to start, an exception thrown like:

```
Caused by: java.sql.SQLSyntaxErrorException: Unknown column 'RESERVED' in 'where clause'
    at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:120) ~[mysql-connector-java.jar:8.0.22]
    at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:97) ~[mysql-connector-java.jar:8.0.22]
    at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122) ~[mysql-connector-java.jar:8.0.22]
    at com.mysql.cj.jdbc.StatementImpl.executeQuery(StatementImpl.java:1200) ~[mysql-connector-java.jar:8.0.22]
    at com.mysql.cj.jdbc.DatabaseMetaDataUsingInfoSchema.getSQLKeywords(DatabaseMetaDataUsingInfoSchema.java:1178) ~[mysql-connector-java.jar:8.0.22]
    at org.datanucleus.store.rdbms.adapter.BaseDatastoreAdapter.<init>(BaseDatastoreAdapter.java:288) ~[datanucleus-rdbms-5.2.10.jar:?]
```
We suggest switching the MySQL driver to the MariaDB if you have seen the same issue.

## Configuration

Before start, make sure MariaDB is accessible, and create a dedicated database and a secure user account that the Hive Metastore will use to connect.
Download the MariaDB JDBC Connector JAR (e.g., mariadb-java-client-x.x.x.jar) and place it in the Hive `$HIVE_HOME/lib` directory.

For the first time to start the Hive Metastore service, the database must be initialized with the Hive schema. You can use the `schematool` utility provided with the Hive installation.
Run this command from the Hive installation directory (`$HIVE_HOME/bin`):

```Bash

schematool  -driver org.mariadb.jdbc.Driver -dbType mysql -initOrUpgradeSchema -url "jdbc:mariadb://<MariaDB_Host>:<Port>/${db}" -userName hive_user -passWord your_strong_password
```

The main configuration file for Metastore is `$HIVE_HOME/conf/hive-site.xml`, this is where you tell the Metastore service (HMS) how to connect to your MariaDB database.
The following XML properties must be added or updated in `hive-site.xml`:

```xml
<configuration>
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mariadb://<MariaDB_Host>:<Port>/${db}?createDatabaseIfNotExist=false&amp;useSSL=false</value>
        <description>JDBC connection URL for the Metastore database.</description>
    </property>

    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>org.mariadb.jdbc.Driver</value>
        <description>The JDBC driver class name for MariaDB.</description>
    </property>

    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>hive_user</value>
        <description>Username for the Metastore database connection.</description>
    </property>

    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>your_strong_password</value>
        <description>Password for the Metastore database connection.</description>
    </property>
</configuration>
```

**Important:**
- Replace `<MariaDB_Host>:<Port>` with the correct hostname/IP addresses.
- The JDBC URL, `&` must be escaped as `&amp;` in XML.

After all configurations are complete, you can start the Hive Metastore service.
```bash
hive --service metastore
```

Want a quick play on the new driver? try our [Docker image](../setting-up-hive-with-docker):

 

 
