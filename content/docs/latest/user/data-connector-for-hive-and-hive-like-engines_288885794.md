---
title: "Apache Hive : Data Connector for Hive and Hive-like engines"
date: 2024-12-12
---

# Apache Hive : Data Connector for Hive and Hive-like engines

### What is a Data connector?

Data connectors (referred to as "connector" in Hive Query Language) are top level objects in Hive where users can define a set of properties required to be able to connect to an external datasource from hive. This document illustrates example of the data connector framework can be used to do SQL query federation between two distinct "hive" clusters/installations or between Hive and another hive-like compute engines (eg: EMR).

  

### HIVEJDBC type Data connector

Apache Hive now has a connector to plugin in multiple hive and hive like sources. [HIVE-27597](https://issues.apache.org/jira/browse/HIVE-27597) adds a JDBC based connector of type "***HIVEJDBC***". Similar to the other data connectors, this connector needs a URL, Driver name, credentials etc to be defined as part of the connector definition. Once defined, users can use the same connector object to map multiple databases from the remote datasource to local hive metastore.

  

HIVEJDBC connector requires the following values

* Name → local name to be able to reference the connector with. This name is shown in "show connectors" and will be used in connector DDLs like drop/alter and also in "create remote database .." statements.
* TYPE → "HIVEJDBC" so Hive Metastore knows that Connector class to use.
* URL → JDBC URL for the remote HiveServer instance.
* DCPROPERTIES → This is a freeform list that contains other info like credentials and other optional properties. These properties will be passed onto the table definitions for the databases created using this connector

**Note:** Data Connectors in Hive are currently only used to read the data from remote sources. Write operations are not supported.

### How do I use it?

1. Create a connector first.
```
    CREATE CONNECTOR hiveserver_connector TYPE 'hivejdbc' URL 'jdbc:hive2://<maskedhost>:10000'   
     WITH DCPROPERTIES ("hive.sql.dbcp.username"="hive", "hive.sql.dbcp.password"="hive");  
  

```
2. Create a database of type REMOTE in hive using the connector from Step 1. This maps a remote database named "`*default*`" to a hive database named "*`hiveserver_remote`*" in hive.

```
         CREATE REMOTE DATABASE hiveserver_remote USING hiveserver_connector   
         WITH DBPROPERTIES ("connector.remoteDbName"="default");  
     
   3. Use the tables in REMOTE database much like the JDBC-storagehandler based tables in hive. One big difference   
      is that the metadata for these tables are never persisted in hive. Currently, create/alter/drop table DDLs   
      are not supported in REMOTE databases.   
  
     0: jdbc:hive2://localhost:10000> USE hiveserver_remote;
```
`0: jdbc:hive2://localhost:10000> **describe formatted test_emr_tbl;**`

```
+-------------------------------+-------------------------------------------------+----------------------------------------------------+  
|           col_name            |                    data_type                    |                      comment                       |  
+-------------------------------+-------------------------------------------------+----------------------------------------------------+  
| tblkey                        | int                                             | from deserializer                                  |  
| descr                         | string                                          | from deserializer                                  |  
|                               | NULL                                            | NULL                                               |  
| # Detailed Table Information  | NULL                                            | NULL                                               |  
| Database:                     | emr_db                                          | NULL                                               |  
| OwnerType:                    | USER                                            | NULL                                               |  
| Owner:                        | null                                            | NULL                                               |  
| CreateTime:                   | UNKNOWN                                         | NULL                                               |  
| LastAccessTime:               | UNKNOWN                                         | NULL                                               |  
| Retention:                    | 0                                               | NULL                                               |  
| Location:                     | [file:/tmp/hive/warehouse/external/test_emr_tbl](http://file/tmp/hive/warehouse/external/test_emr_tbl)  | NULL                                               |  
| Table Type:                   | EXTERNAL_TABLE                                  | NULL                                               |  
| Table Parameters:             | NULL                                            | NULL                                               |  
|                               | EXTERNAL                                        | TRUE                                               |  
|                               | hive.sql.database.type                          | HIVE                                               |  
|                               | hive.sql.dbcp.password                          |                                                    |  
|                               | hive.sql.dbcp.username                          | hive                                               |  
|                               | hive.sql.jdbc.driver                            | org.apache.hive.jdbc.HiveDriver                    |  
|                               | hive.sql.jdbc.url                               | jdbc:hive2://<maskedIP>.compute-1.amazonaws.com:10000 |  
|                               | hive.sql.schema                                 | default                                            |  
|                               | hive.sql.table                                  | test_emr_tbl                                       |  
|                               | storage_handler                                 | org.apache.hive.storage.jdbc.JdbcStorageHandler    |  
|                               | NULL                                            | NULL                                               |  
| # Storage Information         | NULL                                            | NULL                                               |  
| SerDe Library:                | org.apache.hive.storage.jdbc.JdbcSerDe          | NULL                                               |  
| InputFormat:                  | org.apache.hive.storage.jdbc.JdbcInputFormat    | NULL                                               |  
| OutputFormat:                 | org.apache.hive.storage.jdbc.JdbcOutputFormat   | NULL                                               |  
| Compressed:                   | No                                              | NULL                                               |  
| Num Buckets:                  | 0                                               | NULL                                               |  
| Bucket Columns:               | []                                              | NULL                                               |  
| Sort Columns:                 | []                                              | NULL                                               |  
| Storage Desc Params:          | NULL                                            | NULL                                               |  
|                               | serialization.format                            | 1                                                  |  
+-------------------------------+-------------------------------------------------+----------------------------------------------------+
```
`33 rows selected (6.099 seconds)`

  

```
    4. Offload the remote table to local cluster, run CTAS (example below pulls in all the data into the local table,   
       but you can pull in select columns and rows by applying predicates)
```
`0: jdbc:hive2://localhost:10000> **create table default.emr_clone as select * from test_emr_tbl;**`

`INFO  : Completed executing command(queryId=ngangam_20240129182608_db20e2bb-1db3-473f-9564-0d81b01228bc); Time taken: 6.492 seconds`

`INFO  : OK`

`2 rows affected (14.802 seconds)`

  

**`0: jdbc:hive2://localhost:10000> select count(*) from default.emr_clone;`**

`INFO  : Completed executing command(queryId=ngangam_20240129182647_7544c9d1-c68b-4a34-b6b0-910945a1dba5); Time taken: 2.344 seconds`

`INFO  : OK`

```
     +------+  
     | _c0  |  
     +------+  
     | 2    |  
     +------+
```
`1 row selected (8.795 seconds)` 

```
  
    5. To fetch data from the remote tables, run SELECT queries using column spec and predicates as you would   
       normally with any SQL tables.
```
0: jdbc:hive2://localhost:10000> **select * from test_emr_tbl where tblkey > 1;**

INFO  : Completed executing command(queryId=ngangam_20240129191217_79b9e874-197d-4c31-8164-1ec2397bbff7); Time taken: 0.001 seconds

INFO  : OK

```
     +----------------------+---------------------+  
     | test_emr_tbl.tblkey  | test_emr_tbl.descr  |  
     +----------------------+---------------------+  
     | 2                    | test 2              |  
     +----------------------+---------------------+
```
1 row selected (8.238 seconds)

```
  
6. Join with local hive tables, run SELECT queries joining multiple tables (local or remote) as you would   
   normally with any SQL tables.
```

 

 

