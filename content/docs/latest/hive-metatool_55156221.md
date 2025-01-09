---
title: "Apache Hive : Hive MetaTool"
date: 2024-12-12
---

# Apache Hive : Hive MetaTool

* [Hive MetaTool]({{< ref "#hive-metatool" >}})
	+ [The metatool Command]({{< ref "#the-metatool-command" >}})
	+ [Usage Example]({{< ref "#usage-example" >}})

## Hive MetaTool

Version 0.10.0 and later

Introduced in Hive 0.10.0. See [HIVE-3056](https://issues.apache.org/jira/browse/HIVE-3056) and [HIVE-3443](https://issues.apache.org/jira/browse/HIVE-3443).

The Hive MetaTool enables administrators to do bulk updates on the location fields in database, table, and partition records in the metastore.  It provides the following functionality:

* Ability to search and replace the HDFS NN (NameNode) location in metastore records that reference the NN. One use is to transition a Hive deployment to [HDFS HA NN](https://issues.apache.org/jira/browse/HDFS-1623) (HDFS High Availability NameNode).
* A command line tool to execute [JDOQL](http://www.datanucleus.org/products/datanucleus/jdo/jdoql.html) against the metastore. The ability to execute JDOQL against the metastore can be a useful debugging tool for both users and Hive developers.

### The `metatool` Command

The `metatool` command invokes the Hive MetaTool with these options:

| Option | Description |
| --- | --- |
| ``` -listFSRoot ``` | Print the location of the current file system root (NameNode). The value is prefixed with `hdfs:// scheme`. |
| ``` -updateLocation <new-loc> <old-loc> ``` | Update records in the Hive metastore to point to a new NameNode location (file system root location). Both *new-loc* and *old-loc* should be valid URIs with valid host names and schemes. For upgrading to HDFS HA NN, *new-loc* should match the value of the `dfs.nameservices` property. The *old-loc* should match the value returned by the **listFSRoot** option.When run with the **dryRun** option, changes are displayed but are not persisted. When run with the **serdepropKey**/**tablePropKey** option, **updateLocation** looks for the *serde-prop-key*/*table-prop-key* that is specified and updates its value if found. |
| ``` -serdePropKey <serde-prop-key> ``` | Specify a SerDe property key whose value field may reference the HDFS NameNode location and hence may require an update. For example to update the Haivvero schema URL, specify schema.url for this argument.This option is valid only with the **updateLocation** option. |
| ``` -tablePropKey <table-prop-key> ``` | Specify a table property key whose value field may reference the HDFS NameNode location and hence may require an update. For example to update the Avro SerDe schema URL, specify avro.schema.url for this argument.This option is valid only with the **updateLocation** option. |
| ``` -dryRun ``` | Perform a dry run of **updateLocation** changes. The **updateLocation** changes are displayed but not persisted.This option is valid only with the **updateLocation** option. |
| ``` -executeJDOQL <query-string> ``` | Execute the given JDOQL query. |
| ``` -help ``` | Print a list of command options and their descriptions. |

If you are unsure which version of Avro SerDe is used, pass both **serdePropKey** and **tablePropKey** arguments with their respective values for the keys to **updateLocation**.

Hive Configuration Directory

Note that `metatool` is a command for Hive administrators and it needs direct access to the metastore RDBMS. In some environments, the RDBMS login information (especially password or the password key) is only stored on the metastore server host or in a metastore server specific config directory (with more restrictive file system permissions). In such cases, make sure you run on the metastore server machine, as the hive user, and also set the HIVE\_CONF\_DIR environment variable appropriately (for example, `export HIVE\_CONF\_DIR=*<path to metastore server config dir>*`).

### Usage Example

The following `metatool` command uses the **updateLocation**, **tablePropKey**, and **serdePropKey** options to update the NameNode location to hdfs://localhost:9000 from hdfs://namenode2:8020.

```
./hive --service metatool -updateLocation hdfs://localhost:9000 hdfs://namenode2:8020 -tablePropKey avro.schema.url -serdePropKey avro.schema.url
Initializing HiveMetaTool..
15/04/22 14:18:42 INFO metastore.ObjectStore: ObjectStore, initialize called
15/04/22 14:18:42 INFO DataNucleus.Persistence: Property hive.metastore.integral.jdo.pushdown unknown - will be ignored
15/04/22 14:18:42 INFO DataNucleus.Persistence: Property datanucleus.cache.level2 unknown - will be ignored
15/04/22 14:18:43 INFO metastore.ObjectStore: Setting MetaStore object pin classes with hive.metastore.cache.pinobjtypes="Table,StorageDescriptor,SerDeInfo,Partition,Database,Type,FieldSchema,Order"
15/04/22 14:18:43 INFO DataNucleus.Datastore: The class "org.apache.hadoop.hive.metastore.model.MFieldSchema" is tagged as "embedded-only" so does not have its own datastore table.
15/04/22 14:18:43 INFO DataNucleus.Datastore: The class "org.apache.hadoop.hive.metastore.model.MOrder" is tagged as "embedded-only" so does not have its own datastore table.
15/04/22 14:18:44 INFO DataNucleus.Datastore: The class "org.apache.hadoop.hive.metastore.model.MFieldSchema" is tagged as "embedded-only" so does not have its own datastore table.
15/04/22 14:18:44 INFO DataNucleus.Datastore: The class "org.apache.hadoop.hive.metastore.model.MOrder" is tagged as "embedded-only" so does not have its own datastore table.
15/04/22 14:18:44 INFO DataNucleus.Query: Reading in results for query "org.datanucleus.store.rdbms.query.SQLQuery@0" since the connection used is closing
15/04/22 14:18:44 INFO metastore.MetaStoreDirectSql: Using direct SQL, underlying DB is MYSQL
15/04/22 14:18:44 INFO metastore.ObjectStore: Initialized ObjectStore
Looking for LOCATION\_URI field in DBS table to update..
Successfully updated the following locations..
Updated 0 records in DBS table
Looking for LOCATION field in SDS table to update..
Successfully updated the following locations..
Updated 0 records in SDS table
Looking for value of avro.schema.url key in TABLE\_PARAMS table to update..
Successfully updated the following locations..
Updated 0 records in TABLE\_PARAMS table
Looking for value of avro.schema.url key in SD\_PARAMS table to update..
Successfully updated the following locations..
Updated 0 records in SD\_PARAMS table
Looking for value of avro.schema.url key in SERDE\_PARAMS table to update..
Successfully updated the following locations..
Updated 0 records in SERDE\_PARAMS table
```

 

Using metatool to read out table information (for all metastore backends).  
  

```
HIVE\_CONF\_DIR=/etc/hive/conf/conf.server/ hive --service metatool -executeJDOQL 'select dbName+"."+tableName+"::"+colName+"="+numDVs from org.apache.hadoop.hive.metastore.model.MTableColumnStatistics';
```

```
  
 HIVE\_CONF\_DIR=/etc/hive/conf/conf.server/ hive --service metatool -executeJDOQL 'select dbName+"."+tableName+"("+partitionName+")::"+colName+"="+numDVs from org.apache.hadoop.hive.metastore.model.MPartitionColumnStatistics';
```
 

 

 

