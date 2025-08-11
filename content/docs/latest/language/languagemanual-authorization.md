---
title: "Apache Hive : LanguageManual Authorization"
date: 2024-12-12
---

# Apache Hive : LanguageManual Authorization

{{< toc >}}

## Introduction

Note that this documentation is referring to Authorization which is verifying if a user has permission to perform a certain action, and not about Authentication (verifying the identity of the user). Strong authentication for tools like the [Hive command line]({{< ref "languagemanual-cli" >}}) is provided through the use of Kerberos. There are additional authentication options for users of [HiveServer2]({{< ref "setting-up-hiveserver2" >}}).

## Hive Authorization Options

Three modes of Hive authorization are available to satisfy different use cases.

### Use Cases

It is useful to think of authorization in terms of two primary use cases of Hive. 

1. Hive as a table storage layer. This is the use case for Hive's [HCatalog]({{< ref "hcatalog-base" >}}) API users such as Apache Pig, MapReduce and some Massively Parallel Processing databases (Cloudera Impala, Facebook Presto, Spark SQL etc). In this case, Hive provides a table abstraction and metadata for files on storage (typically HDFS). These users have direct access to HDFS and the metastore server (which provides an API for metadata access). HDFS access is authorized through the use of [HDFS permissions](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsPermissionsGuide.html). Metadata access needs to be authorized using Hive configuration.
2. Hive as a SQL query engine. This is one of the most common use cases of Hive. This is the 'Hive view' of SQL users and BI tools. This use case has the following two subcategories:
	1. [Hive command line]({{< ref "#hive-command-line" >}}) users. These users have direct access to HDFS and the Hive metastore, which makes this use case similar to use case 1. *Note, that usage of Hive CLI will be officially [deprecated](https://issues.apache.org/jira/browse/HIVE-10304) soon in favor of Beeline.*
	2. ODBC/JDBC and other HiveServer2 API users (Beeline CLI is an example). These users have all data/metadata access happening through HiveServer2. They don't have direct access to HDFS or the metastore.

### Overview of Authorization Modes

#### 1 Storage Based Authorization in the Metastore Server

In use cases 1 and 2a, the users have direct access to the data. Hive configurations don't control the data access. The HDFS permissions act as one source of truth for the table storage access. By enabling [Storage Based Authorization in the Metastore Server]({{< ref "storage-based-authorization-in-the-metastore-server" >}}), you can use this single source for truth and have a consistent data and metadata authorization policy. To control metadata access on the metadata objects such as Databases, Tables and Partitions, it checks if you have permission on corresponding directories on the file system. You can also protect access through HiveServer2 (use case 2b above) by ensuring that the queries run as the end user ([hive.server2.enable.doAs]({{< ref "#hive-server2-enable-doas" >}}) option should be "true" in HiveServer2 configuration – this is a default value).

Note, that through the use of [HDFS ACL](http://hadoop.apache.org/docs/r2.4.0/hadoop-project-dist/hadoop-hdfs/HdfsPermissionsGuide.html#ACLs_Access_Control_Lists) (available in Hadoop 2.4 onwards) you have a lot of flexibility in controlling access to the file system, which in turn provides more flexibility with Storage Based Authorization. This functionality is available as of Hive 0.14 ([HIVE-7583](https://issues.apache.org/jira/browse/HIVE-7583)).

**While relying on Storage based authorization for restricting access, you still need to enable one of the security options 2 or 3 listed below or use FallbackHiveAuthorizer to protect actions within the HiveServer2 instance.**

##### Fall Back Authorizer

You need to use Hive 2.3.4 or 3.1.1 or later to use Fall Back Authorizer.

```
Admin needs to specify the following entries in
hiveserver2-site.xml:

<property>
  <name>hive.security.authorization.enabled</name>
  <value>true</value>
</property>
<property>
  <name>hive.security.authorization.manager</name>
  <value>org.apache.hadoop.hive.ql.security.authorization.plugin.fallback.FallbackHiveAuthorizerFactory</value>
</property>

```
FallbackHiveAuthorizerFactory will do the following to mitigate above mentioned threat:

1. Disallow local file location in sql statements except for admin
2. Allow "set" only selected whitelist parameters
3. Disallow dfs commands except for admin
4. Disallow "ADD JAR" statement
5. Disallow "COMPILE" statement
6. Disallow "TRANSFORM" statement

  

#### 2 SQL Standards Based Authorization in HiveServer2

Although Storage Based Authorization can provide access control at the level of Databases, Tables and Partitions, it can not control authorization at finer levels such as columns and views because the access control provided by the file system is at the level of directory and files. A prerequisite for fine grained access control is a data server that is able to provide just the columns and rows that a user needs (or has) access to. In the case of file system access, the whole file is served to the user. HiveServer2 satisfies this condition, as it has an API that understands rows and columns (through the use of SQL), and is able to serve just the columns and rows that your SQL query asked for.

[SQL Standards Based Authorization]({{< ref "sql-standard-based-hive-authorization" >}}) (introduced in Hive 0.13.0, [HIVE-5837](https://issues.apache.org/jira/browse/HIVE-5837)) can be used to enable fine grained access control. It is based on the SQL standard for authorization, and uses the familiar grant/revoke statements to control access. It needs to be enabled through HiveServer2 configuration. 

Note that for use case 2a (Hive command line) SQL Standards Based Authorization is disabled. This is because secure access control is not possible for the Hive command line using an access control policy in Hive, because users have direct access to HDFS and so they can easily bypass the SQL standards based authorization checks or even disable it altogether. Disabling this avoids giving a false sense of security to users.

#### 3 Authorization using Apache Ranger & Sentry

[Apache Ranger](http://ranger.apache.org) and [Apache Sentry](https://sentry.apache.org/) are apache projects that use plugins provided by hive to do authorization.

The policies are maintained under repositories under those projects.

You also get many advanced features using them. For example, with Ranger you can view and manage policies through web interface, view auditing information, have dynamic row and column level access control (including column masking) based on runtime attributes.

#### 4 Old default Hive Authorization (Legacy Mode)

[Hive Old Default Authorization]({{< ref "45876173" >}}) (was default before Hive 2.0.0) is the authorization mode that has been available in earlier versions of Hive. However, this mode does not have a complete access control model, leaving many security gaps unaddressed. For example, the permissions needed to grant privileges for a user are not defined, and any user can grant themselves access to a table or database.

This model is similar to the SQL standards based authorization mode, in that it provides grant/revoke statement-based access control. However, the access control policy is different from SQL standards based authorization, and they are not compatible. Use of this mode is also supported for Hive command line users. However, for reasons mentioned under the discussion of SQL standards based authorization (above), it is not a secure mode of authorization for the Hive command line.

### Addressing Authorization Needs of Multiple Use Cases

Storage based authorization provides a simple way to address all the use cases described above. However, if you need finer grained access control for SQL users, you can also enable SQL standards based authorization mode in HiveServer2.

That is, you can have storage based authorization enabled for metastore API calls (in the Hive metastore) and have SQL standards based authorization enabled in HiveServer2 at the same time.

## Explain Authorization

Version 0.14 — EXPLAIN AUTHORIZATION

Starting in [Hive 0.14.0](https://issues.apache.org/jira/browse/HIVE-5961), the HiveQL command [EXPLAIN AUTHORIZATION]({{< ref "languagemanual-explain" >}}) shows all entities that need to be authorized to execute a query, as well as any authorization failures.

## More Information

For detailed information about the Hive authorization modes, see:

* [Storage Based Authorization in the Metastore Server]({{< ref "storage-based-authorization-in-the-metastore-server" >}}) 
	+ also see [HCatalog Authorization]({{< ref "hcatalog-authorization" >}})
* [SQL Standard Based Hive Authorization]({{< ref "sql-standard-based-hive-authorization" >}})
* [Hive deprecated authorization mode / Legacy Mode]({{< ref "45876173" >}})
	+ also see the [design document]({{< ref "authdev" >}}) and [Security]({{< ref "security" >}})

 

 

