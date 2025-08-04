---
title: "Apache Hive : Hive-Iceberg Integration"
date: 2024-12-12
---

# Apache Hive : Hive-Iceberg Integration

Apache Hive starting from 4.0 out of the box supports the Iceberg table format, the iceberg tables can be created like regular hive external or ACID tables, without adding any extra jars.


**Creating an Iceberg Table**

An iceberg table can be created using ***STORED BY ICEBERG*** keywords while creating a table.

* Creating an Iceberg table using normal create command

```
CREATE TABLE TBL_ICE (ID INT) STORED BY ICEBERG;
```

The above creates an iceberg table named 'TBL_ICE'

* Creating an Iceberg Table using CTAS

```
CREATE TABLE TABLE_CTAS AS SELECT * FROM SRCTABLE STORED BY ICEBERG;
```

The above creates an iceberg table named 'TABLE_CTAS' with schema & records as in 'SRCTABLE' 

* Creating an Iceberg Table using CTLT

```
CREATE TABLE_CTLT LIKE SRCTABLE STORED BY ICEBERG;
```

The above creates an iceberg table named 'TABLE_CTLT' with schema same as SRCTABLE

**Format Versions:**

The iceberg tables support both v1 & v2 tables, the tables by default are created as v1 table unless explicitly specified. To create a v2 table ('format-version'='2')  can be specified as table property while creating the table

Example:

```
CREATE TABLE V2_TABLE (ID INT) STORED BY ICEBERG TBLPROPERTIES ('format-version'='2');
```


**File Formats:**

The iceberg table currently supports three file formats: PARQUET, ORC & AVRO. The default file format is Parquet. The file format can be explicitily provided by using STORED AS <Format> while creating the table

Example-1:

```
CREATE TABLE ORC_TABLE (ID INT) STORED BY ICEBERG STORED AS ORC;
```

The above creates a v1 iceberg table named 'ORC_TABLE' of ORC file format.

Example-2:

```
CREATE TABLE V2_ORC_TABLE (ID INT) STORED BY ICEBERG STORED AS ORC TBLPROPERTIES ('format-version'='2');
```

The above creates a v2 iceberg table named 'V2_ORC_TABLE' of ORC file format.

Similarly we can specify any of the supported file formats while creating the table,


**Delete Modes:**

Hive for delete, update & merge queries support both Copy-on-Write and Merge-on-Read, by default the tables are created with Merge-on-Read mode. The delete mode can be configured using the following TBLPROPERTIES:
```
CREATE TABLE tbl_x (id int) STORED BY ICEBERG TBLPROPERTIES (
    'write.delete.mode'='copy-on-write',
    'write.update.mode'='copy-on-write',
    'write.merge.mode'='copy-on-write'
);
```


**Migrating existing tables to Iceberg Tables**

Any Hive external table can be converted into an iceberg tables, without actually rewriting the data files again. We can use _ALTER TABLE <TABLE NAME> CONVERT TO ICEBERG [TBLPROPERTIES]_ to convert any existing external table to an iceberg table.

```
ALTER TABLE TABLE1 CONVERT TO ICEBERG TBLPROPERTIES ('format-version'='2');
```

The above converts an existing external table 'TABLE1' into a v2 Iceberg table, specifying the TBLPROPERTIES & format-version is option, if not specified the table will be converted into a v1 iceberg table.


**Querying an Iceberg Table**

Iceberg tables support all query statements similar to any other hive table.

Example:

```
SELECT * FROM TBL_ICE WHERE ID > 5;
```


**Writing data into iceberg tables**

Iceberg tables supports all data ingestion methods supported with hive

* Insert-Into

```
INSERT INTO TBL_ICE VALUES (1),(2),(3),(4);
```


* Insert-Overwrite

```
INSERT OVERWRITE TBL_ICE SELECT * FROM TABLE1;
```


* Delete

```
DELETE FROM TBL_ICE WHERE ID=5;
```


* Update

```
UPDATE TBL_ICE WHERE ID=8 SET ID=2;
```


* LOAD DATA

```
LOAD DATA LOCAL INPATH '/data/files/doctors.avro' OVERWRITE INTO TABLE ice_avro;
```

*If the config “hive.load.data.use.native.api” is set to “false”, hive will rather than using the Append api, will launch a Tez job to do the LOAD.*

**Metadata tables:**

Hive supports the following metadata tables for Iceberg tables
The metadata tables can be queried using the syntax `<DATABASE NAME>.<TABLE NAME>.<METADATA TABLE>`

```
ENTRIES                        SELECT * from db_name.tbl_name.entries;
FILES                          SELECT * from db_name.tbl_name.files;
HISTORY                        SELECT * from db_name.tbl_name.history;
SNAPSHOTS                      SELECT * from db_name.tbl_name.snapshots;
MANIFESTS                      SELECT * from db_name.tbl_name.manifests;
PARTITIONS                     SELECT * from db_name.tbl_name.partitions;
ALL_DATA_FILES                 SELECT * from db_name.tbl_name.all_data_files;
ALL_MANIFESTS                  SELECT * from db_name.tbl_name.all_manifests;
ALL_ENTRIES                    SELECT * from db_name.tbl_name.all_entries;
DATA_FILES                     SELECT * from db_name.tbl_name.data_files;
DELETE_FILES                   SELECT * from db_name.tbl_name.delete_files;
METADATA_LOG_ENTRIES           SELECT * from db_name.tbl_name.metadata_log_entries;
REFS                           SELECT * from db_name.tbl_name.refs;
ALL_DELETE_FILES               SELECT * from db_name.tbl_name.all_delete_files;
ALL_FILES                      SELECT * from db_name.tbl_name.all_files;
```


**Branches & Tags:**

Iceberg tables supports branches & tags, the details around the feature can be read [here](https://medium.com/@ayushtkn/apache-hive-4-x-with-iceberg-branches-tags-3d52293ac0bf)

