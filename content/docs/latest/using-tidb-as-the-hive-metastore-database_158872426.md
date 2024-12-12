---
title: "Apache Hive : Using TiDB as the Hive Metastore database"
date: 2024-12-12
---









# Apache Hive : Using TiDB as the Hive Metastore database






# 
* [Why use TiDB in Hive as the Metastore database?]({{< ref "#why-use-tidb-in-hive-as-the-metastore-database?" >}})
* [How to create a Hive cluster with TiDB]({{< ref "#how-to-create-a-hive-cluster-with-tidb" >}})
	+ [Components required]({{< ref "#components-required" >}})
	+ [Install a Hive cluster]({{< ref "#install-a-hive-cluster" >}})
		- [Step 1: Deploy a TiDB cluster]({{< ref "#step-1:-deploy-a-tidb-cluster" >}})
		- [Step 2: Configure Hive]({{< ref "#step-2:-configure-hive" >}})
		- [Step 3: Initialize metadata]({{< ref "#step-3:-initialize-metadata" >}})
		- [Step 4: Launch Metastore and test]({{< ref "#step-4:-launch-metastore-and-test" >}})
* [Conclusion]({{< ref "#conclusion" >}})
* [FAQ]({{< ref "#faq" >}})


Why use TiDB in Hive as the Metastore database?

[TiDB](https://github.com/pingcap/tidb) is a distributed SQL database built by [PingCAP](https://pingcap.com/) and its open-source community. **It is MySQL compatible and features horizontal scalability, strong consistency, and high availability.** It's a one-stop solution for both Online Transactional Processing (OLTP) and Online Analytical Processing (OLAP) workloads.

In scenarios with enormous amounts of data, due to TiDB's distributed architecture, query performance is not limited to the capability of a single machine. When the data volume reaches the bottleneck, you can add nodes to improve TiDB's storage capacity.

Because TiDB is compatible with the MySQL protocol, it's easy to switch Hive's Metastore database to TiDB. You can use TiDB as if you were using MySQL, with almost no changes:

* For the existing Hive cluster, you can use the `mysqldump` tool to replicate all data in MySQL to TiDB.
* You can use the metadata initialization tool that comes with Hive to create a new Hive cluster

# How to create a Hive cluster with TiDB

Creating a Hive cluster with TiDB involves the following steps:

* Meet component requirements
* Install a Hive cluster
	+ Deploy a TiDB cluster
	+ Configure Hive
	+ Initialize metadata
	+ Launch Metastore and test

## Components required



| **Component** | **Version** |
| Hive | 3.1.2 |
| Hadoop | 2.6.0-cdh-5.16.1 |
| TiDB | 4.0 |
| Java Development Kit (JDK) | 1.8.0\_221 |

There are no mandatory requirements for the component versions, as long as the components are compatible with each other. After you confirm that you have successfully installed Hadoop and JDK and can use them directly, you can move on to the next step.

## Install a Hive cluster

### Step 1: Deploy a TiDB cluster

1. To set up a TiDB cluster, refer to [this document](https://docs.pingcap.com/tidb/stable/production-deployment-using-tiup).
2. Create a Hive user in TiDB and set a password.
3. Create a database named `hive` and grant privileges to the `hive` user.  



```
-- Create a database for Hive Metastore.
create database hive;
-- Create a user and password for Hive Metastore.
create user 'hive'@'%' identified by '123456';
-- Grant privileges to the user.
grant all privileges on hive.* to 'hive'@'%' identified by '123456';
-- Flush privileges.
flush privileges;
```
4. Set the configuration item. 



```
set global tidb\_skip\_isolation\_level\_check=1;
```

If you don't set the configuration item, Metastore throws the following exception when it is running: 



```
MetaException(message:The isolation level 'SERIALIZABLE' is not supported. Set tidb\_skip\_isolation\_level\_check=1 to skip this error)
```

### Step 2: Configure Hive

1. Download and decompress Hive. In this example, the decompression directory for Hive is ${HIVE\_HOME}.
2. To edit the `hive-site.xml` configuration file, run `vim ${HIVE_HOME}/conf/hive-site.xml`. (The configuration items only use the minimum configuration.)



```
<configuration>
  <property>
    <name>javax.jdo.option.ConnectionURL</name>
    <value>jdbc:mysql://host:port/hive</value>
    <description>TiDB address</description>
  </property>

  <property>  
    <name>javax.jdo.option.ConnectionUserName</name>
    <value>hive</value>
    <description>TiDB username</description>
  </property>

  <property>  
    <name>javax.jdo.option.ConnectionPassword</name>
    <value>123456</value>
    <description>TiDB password</description>
  </property>

  <property>
    <name>javax.jdo.option.ConnectionDriverName</name>
    <value>com.mysql.jdbc.Driver</value>
  </property>

  <property>
    <name>hive.metastore.uris</name>
    <value>thrift://localhost:9083</value>
  </property>

  <property>
    <name>hive.metastore.schema.verification</name>
    <value>false</value>
  </property>
</configuration>
```
3. To edit the hive-env.sh configuration file, run vim ${HIVE\_HOME}/conf/hive-env.sh.



```
export HADOOP\_HOME=...
export JAVA\_HOME=...
```
4. Copy mysql-connector-java-${version}.jar to the lib directory in Hive.



```
cp ${MYSQL\_JDBC\_PATH}/mysql-connector-java-${version}.jar ${HIVE\_HOME}/lib
```

### Step 3: Initialize metadata

You're performing this step to create a table for Hive metadata. The SQL script is in ${HIVE\_HOME}/scripts/metastore/upgrade/mysql.

To initialize metadata, run the following command.



```
${HIVE\_HOME}/bin/schematool -dbType mysql -initSchema --verbose
```

When schemaTool completed appears in the last line, it means the metadata is successfully initialized.

### Step 4: Launch Metastore and test

1. Launch Metastore.



```
${HIVE\_HOME}/bin/hive --service metastore
```
2. Start the Hive client for testing.



```
${HIVE\_HOME}/bin/hive
```

# Conclusion

If you use MySQL as the Hive Metastore database, as data grows in Hive, MySQL might become the bottleneck for the entire system. In this case, TiDB is a good solution, because it **is compatible with the MySQL protocol and has excellent horizontal scalability.** Due to its distributed architecture, **TiDB far outperforms MySQL on large data sets and large numbers of concurrent queries**.

This post showed how to deploy a Hive cluster with TiDB as the Metastore database. We hope TiDB can help you horizontally scale your Hive Metastore to meet your growing business needs.

In addition, if you're interested in our MySQL-to-TiDB migration story, check out [this post](https://en.pingcap.com/case-studies/horizontally-scaling-hive-metastore-database-by-migrating-from-mysql-to-tidb).

# FAQ

1. Hive Compatibility Version？



| Hive Version | Status |
| --- | --- |
| 1.x | Not tested |
| 2.0.x | Tested |
| 2.1.x | Tested and verified in production |
| 2.3.x | Tested and verified in production |
| 3.x | Tested |
2. Do the schemas in the Hive metastore database need to be changed？For Hive version 2.1.x and 2.3.x，no schema change is needed.
3. Does the foreign key constraint for tables in Hive the metastore database affecting migrating to TiDB? For the versions tested, foreign key constraints do not impact using TiDB as Hive metastore.
4. How to handle `MetaException(message:The isolation level 'SERIALIZABLE' is not supported. Set tidb\_skip\_isolation\_level\_check=1 to skip this error) ` exception? In TiDB, execute the following command `set global tidb\_skip\_isolation\_level\_check=1;` to skip check.



 

 

