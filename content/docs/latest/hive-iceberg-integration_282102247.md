---
title: "Apache Hive : Hive-Iceberg Integration"
date: 2024-12-12
---

# Apache Hive : Hive-Iceberg Integration

Apache Hive starting from 4.0 out of the box supports the Iceberg table format, the iceberg tables can be created like regular hive external or ACID tables, without the need of any need of adding any extra jars.

  

**Creating an Iceberg Table**

An iceberg table can be created using ***STORED BY ICEBERG***keywords while creating a table.

* Creating an Iceberg table using normal create command

```
CREATE TABLE TBL\_ICE (ID INT) STORED BY ICEBERG;
```

The above creates an iceberg table named 'TBL\_ICE'

* Creating an Iceberg Table using CTAS

```
CREATE TABLE TABLE\_CTAS AS SELECT * FROM SRCTABLE STORED BY ICEBERG;
```

The above creates an iceberg table named 'TABLE\_CTAS' with schema & records as in 'SRCTABLE' 

* Creating an Iceberg Table using CTLT

```
CREATE TABLE\_CTLT LIKE SRCTABLE STORED BY ICEBERG;
```

The above creates an iceberg table named 'TABLE\_CTLT' with schema same as SRCTABLE

**Format Versions:**

The iceberg tables support both v1 & v2 tables, the tables by default are created as v1 table unless explicitly specified. To create a v2 table ('format-version'='2')  can be specified as table property while creating the table

Example:

```
CREATE TABLE V2\_TABLE (ID INT) STORED BY ICEBERG TBLPROPERTIES ('format-version'='2');
```

  

**File Formats:**

The iceberg table currently supports three file formats: PARQUET, ORC & AVRO. The default file format is Parquet. The file format can be explicitily provided by using STORED AS <Format> while creating the table

Example-1:

```
CREATE TABLE ORC\_TABLE (ID INT) STORED BY ICEBERG STORED AS ORC;
```

The above creates a v1 iceberg table named 'ORC\_TABLE' of ORC file format.

Example-2:

```
CREATE TABLE V2\_ORC\_TABLE (ID INT) STORED BY ICEBERG STORED AS ORC TBLPROPERTIES ('format-version'='2');
```

The above creates a v2 iceberg table named 'V2\_ORC\_TABLE' of ORC file format.

Similarly we can specify any of the supported file formats while creating the table,

  

**Delete Modes:**

Hive for delete, update & merge queries support both Copy-on-Write and Merge-on-Read, by default the tables are created with Merge-on-Read mode. The delete mode can be configured using the following TBLPROPERTIES:

TODO: COPY ALL THREE 

  

**Migrating existing tables to Iceberg Tables**

Any Hive external table can be converted into an iceberg tables, without actually rewriting the data files again. We can use ALTER TABLE <TABLE NAME> CONVERT TO ICEBERG [TBLPROPERTIES] to convert any existing external table to an iceberg table.

```
ALTER TABLE TABLE1 CONVERT TO ICEBERG TBLPROPERTIES ('format-version'='2');
```

The above converts an existing external table 'TABLE1' into a v2 Iceberg table, specifying the TBLPROPERTIES & format-version is option, if not specified the table will be converted into a v1 iceberg table.

  

**Querying an Iceberg Table**

Iceberg tables support all query statements similar to any other hive table.

Example:

```
SELECT * FROM TBL\_ICE WHERE ID > 5;
```

  

**Writing data into iceberg tables**

Iceberg tables supports all data ingestion methods supported with hive

* Insert-Into

```
INSERT INTO TBL\_ICE VALUES (1),(2),(3),(4);
```

  

* Insert-Overwrite

```
INSERT OVERWRITE TBL\_ICE SELECT * FROM TABLE1;
```

  

* Delete

```
DELETE FROM TBL\_ICE WHERE ID=5;
```

  

* Update

```
UPDATE TBL\_ICE WHERE ID=8 SET ID=2;
```

  

* LOAD DATA

```
LOAD DATA LOCAL INPATH '/data/files/doctors.avro' OVERWRITE INTO TABLE ice\_avro;
```

*If the config “hive.load.data.use.native.api” is set to “false”, hive will rather than using the Append api, will launch a Tez job to do the LOAD.*

**Metadata tables:**

Hive supports the following metadata tables for Iceberg tables

TODO: List them

The metadata tables can be queried using the syntax <DATABASE NAME>.<TABLE NAME>.<METADATA TABLE>

  

**Branches & Tags:**

Iceberg tables supports branches & tags, the details around the feature can be read [here](https://medium.com/@ayushtkn/apache-hive-4-x-with-iceberg-branches-tags-3d52293ac0bf)

  

  

  

 

 

