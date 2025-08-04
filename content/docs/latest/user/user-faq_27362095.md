---
title: "Apache Hive : User FAQ"
date: 2024-12-12
---

# Apache Hive : User FAQ

{{< toc >}}

## General

### I see errors like: Server access Error: Connection timed out url=<http://archive.apache.org/dist/hadoop/core/hadoop-0.20.1/hadoop-0.20.1.tar.gz>

Run the following commands:  
 `cd ~/.ant/cache/hadoop/core/sources`  
 `wget <http://archive.apache.org/dist/hadoop/core/hadoop-0.20.1/hadoop-0.20.1.tar.gz>`

### How to change the warehouse.dir location for older tables?

To change the base location of the Hive tables, edit the hive.metastore.warehouse.dir param. This will not affect the older tables. Metadata needs to be changed in the database (MySQL or Derby). The location of Hive tables is in table SDS and column LOCATION.

### When running a JOIN query, I see out-of-memory errors.

This is usually caused by the order of JOIN tables. Instead of "FROM tableA a JOIN tableB b ON ...", try "FROM tableB b JOIN tableA a ON ...". NOTE that if you are using LEFT OUTER JOIN, you might want to change to RIGHT OUTER JOIN. This trick usually solve the problem - the rule of thumb is, always put the table with a lot of rows having the same value in the join key on the rightmost side of the JOIN.

### I am using MySQL as metastore and I see errors: "com.mysql.jdbc.exceptions.jdbc4.!CommunicationsException: Communications link failure" {#mysql-excpeption}

This is usually caused by MySQL servers closing connections after the connection is idling for some time. Run the following command on the MySQL server will solve the problem "set global wait_status=120;"

1. When using MySQL as a metastore I see the error "com.mysql.jdbc.exceptions.MySQLSyntaxErrorException: Specified key was too long; max key length is 767 bytes".  
 This is a known limitation of MySQL 5.0 and UTF8 databases. One option is to use another character set, such as 'latin1', which is known to work.

### Does Hive support Unicode?

You can use Unicode string on data/comments, but cannot use for database/table/column name.

You can use UTF-8 encoding for Hive data. However, other encodings are not supported (HIVE-7142 introduce encoding for LazySimpleSerDe, however, the implementation is not complete and not address all cases).

## Hive SQL

### Are Hive SQL identifiers (e.g. table names, column names, etc) case sensitive?

No. Hive is case insensitive.

Executing:

> `SELECT * FROM MyTable WHERE myColumn = 3`
> 
> 

is strictly equivalent to

> `select * from mytable where mycolumn = 3`
> 
> 

### What are the maximum allowed lengths for Hive SQL identifiers?

## Importing Data into Hive

### How do I import XML data into Hive?

### How do I import CSV data into Hive?

### How do I import JSON data into Hive?

### How do I import Thrift data into Hive?

### How do I import Avro data into Hive?

### How do I import delimited text data into Hive?

### How do I import fixed-width data into Hive?

### How do I import ASCII logfiles (HTTP, etc) into Hive?

## Exporting Data from Hive

## Hive Data Model

### What is the difference between a native table and an external table?

### What are dynamic partitions?

### Can a Hive table contain data in more than one format?

### Is it possible to set the data format on a per-partition basis?

## JDBC Driver

### Does Hive have a JDBC Driver?

Yes. Look out to the hive-jdbc jar. The driver is 'org.apache.hadoop.hive.jdbc.HiveDriver'.

It supports two modes: a local mode and a remote one.

In the remote mode it connects to the hive server through its Thrift API. The JDBC url to use should be of the form: 'jdbc:hive://hostname:port/databasename'

In the local mode Hive is embedded. The JDBC url to use should be 'jdbc:hive://'.

## ODBC Driver

### Does Hive have an ODBC driver?

Yes.  Many third-party vendors provide ODBC drivers.

Simba provides both ODBC and JDBC drivers, and developed many of the drivers for other companies.

<http://www.simba.com/drivers/hive-odbc-jdbc/>

Microsoft provides an ODBC driver for Hive in HDInsight and local clusters.

<https://azure.microsoft.com/en-us/documentation/articles/hdinsight-connect-excel-hive-odbc-driver/>  
<https://www.microsoft.com/en-ca/download/details.aspx?id=40886> 

Hortonworks provides an ODBC driver for HDP

<http://hortonworks.com/hdp/addons/>

Cloudera provides an ODBC driver for Cloudera Enterprise

<http://www.cloudera.com/downloads/connectors/hive/odbc/2-5-12.html>

MapR provides ODBC drivers

<http://doc.mapr.com/display/MapR/Hive+ODBC+Connector>

Progress offers a DataDirect ODBC driver

<https://www.progress.com/odbc/apache-hadoop-hive>

Amazon provides ODBC/JDBC drivers for Amazon EMR

<https://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/emr-bi-tools.html>

 

 

 

