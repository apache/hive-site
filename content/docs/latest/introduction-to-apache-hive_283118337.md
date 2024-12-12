---
title: "Apache Hive : Introduction to Apache Hive"
date: 2024-12-12
---









# Apache Hive : Introduction to Apache Hive






The **[Apache Hive™](http://hive.apache.org/)** data warehouse software facilitates reading, writing, and managing large datasets residing in distributed storage and queried using SQL syntax.  
  
Built on top of **[Apache Hadoop™](http://hadoop.apache.org/)**, Hive provides the following features:

* Tools to enable easy access to data via SQL, thus enabling data warehousing tasks such as extract/transform/load (ETL), reporting, and data analysis.
* A mechanism to impose structure on a variety of data formats
* Access to files stored either directly in **[Apache HDFS](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsUserGuide.html)[™](http://hadoop.apache.org/)** or in other data storage systems such as **[Apache HBase](http://hbase.apache.org/)[™](http://hadoop.apache.org/)**
* Query execution via [Apache Tez](http://tez.apache.org/)**[™](http://hadoop.apache.org/)** or [MapReduce](http://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html)
* Procedural language with HPL-SQL
* Sub-second query retrieval via [Hive LLAP](https://cwiki.apache.org/confluence/display/Hive/LLAP), [Apache YARN](https://hadoop.apache.org/docs/r2.7.2/hadoop-yarn/hadoop-yarn-site/YARN.html) and [Apache Slider](https://slider.incubator.apache.org/).

[Hive provides standard SQL functionality](https://cwiki.apache.org/confluence/display/Hive/Apache+Hive+SQL+Conformance), including many of the later [SQL:2003](https://en.wikipedia.org/wiki/SQL:2003), [SQL:2011](https://en.wikipedia.org/wiki/SQL:2011), and [SQL:2016](https://en.wikipedia.org/wiki/SQL:2016) features for analytics.  
Hive's SQL can also be extended with user code via user defined functions (UDFs), user defined aggregates (UDAFs), and user defined table functions (UDTFs).

There is not a single "Hive format" in which data must be stored. Hive comes with built in connectors for comma and tab-separated values (CSV/TSV) text files, [Apache Parquet](http://parquet.apache.org/)**[™](http://hadoop.apache.org/)**, [Apache ORC](http://orc.apache.org/)**[™](http://hadoop.apache.org/)**, and other formats. Users can extend Hive with connectors for other formats. Please see [File Formats](https://cwiki.apache.org/confluence/display/Hive/DeveloperGuide#DeveloperGuide-FileFormats) and [Hive SerDe](https://cwiki.apache.org/confluence/display/Hive/DeveloperGuide#DeveloperGuide-HiveSerDe) in the [Developer Guide](https://cwiki.apache.org/confluence/display/Hive/DeveloperGuide) for details.

Hive is not designed for online transaction processing (OLTP) workloads. It is best used for traditional data warehousing tasks.

Hive is designed to maximize scalability (scale out with more machines added dynamically to the Hadoop cluster), performance, extensibility, fault-tolerance, and loose-coupling with its input formats.

Components of Hive include HCatalog and WebHCat.

* **[HCatalog](https://cwiki.apache.org/confluence/display/Hive/HCatalog)** is a table and storage management layer for Hadoop that enables users with different data processing tools — including Pig and MapReduce — to more easily read and write data on the grid.
* **[WebHCat](https://cwiki.apache.org/confluence/display/Hive/WebHCat)** provides a service that you can use to run Hadoop MapReduce (or YARN), Pig, Hive jobs. You can also perform Hive metadata operations using an HTTP (REST style) interface.



 

 

