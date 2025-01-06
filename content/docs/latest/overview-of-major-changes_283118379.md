---
title: "Apache Hive : Overview of Major Changes"
date: 2024-12-12
---

# Apache Hive : Overview of Major Changes

* ### **Iceberg Integration**

	+ Advanced Snapshot management
	+ [Branches & Tags support](https://medium.com/@ayushtkn/apache-hive-4-x-with-iceberg-branches-tags-3d52293ac0bf)
	+ DML (insert/update/delete/merge)
	+ COW & MOR modes
	+ Vectorised Reads & Writes
	+ Table migration command
	+ LOAD DATA statements support
	+ Partition-level operations support
	+ Improved statistics (column stats support)

  

* ### **Hive ACID**

	+ Use sequences for TXN_ID generation (performance)
	+ Read-only transactions optimization
	+ Zero-wait readers
	+ Optimistic and Pessimistic concurrency control
	+ Lockless reads

  

* ### **Compaction**

	+ [Rebalance compaction](https://cwiki.apache.org/confluence/display/Hive/Rebalance+compaction) (Hive ACID)
	+ Compaction requests prioritization ([compaction pooling](https://cwiki.apache.org/confluence/display/Hive/Compaction+pooling))
	+ Iceberg compaction (Major)

  

* ### **Hive Metastore**

	+ API optimization (performance)
	+ Dynamic leader election
	+ [External data sources support]({{< ref "data-connectors-in-hive_177049669" >}})
	+ HMS support for [Thrift over HTTP](https://issues.apache.org/jira/browse/HIVE-21456)
	+ [JWT authentication](https://issues.apache.org/jira/browse/HIVE-26071) for Thrift over HTTP
	+ [HMS metadata summary](https://issues.apache.org/jira/browse/HIVE-26435)
	+ [Use Zookeeper for service discovery](https://issues.apache.org/jira/browse/HIVE-20794)

  

* ### HiveServer2

	+ Support [SAML 2.0](https://cwiki.apache.org/confluence/display/Hive/HIVE-24543%3A+Support+SAML+2.0+authentication+mode)/JWT authentication mode
	+ Support both Kerberos and LDAP auth methods in parallel
	+ Graceful shutdown
	+ Easy access to the operation log through web UI

  

* ### **Hive Replication**

	+ Optimised Bootstrap Solution
	+ Support for Snapshot Based Replication for External Table
	+ Better Replication Tracking Metrics
	+ Support for Checkpointing during Replication

  

* ### Security

	+ Authorizations in alter table/view, UDFs, and Views created from Apache Spark.
	+ Authorizations on tables created based on storage handlers.
	+ Critical CVE fixes of transitive dependencies.

  

* ### **Compiler**

	+ Materialized view support for Iceberg tables
	+ Improvements to refresh materialized views
	+ Date/Timestamp fixes and improvements
	+ Anti join support
	+ Split update support
	+ Branch pruning
	+ Column histogram statistics support
	+ Calcite upgrade to 1.25
	+ HPL/SQL improvements
	+ Scheduled query support

  

* ### Miscl.

	+ Support for ESRI GeopSpatial UDF's
	+ Added support for Apache Ozone
	+ Support Hadoop-3.3.6
	+ Supports Tez 0.10.3
	+ Works with Aarch64 (ARM)
	+ New UDFs ([Hive UDFs]({{< ref "hive-udfs_282102277" >}}))
	+ Deprecated Hive on MR & Removed Hive on Spark
	+ Deprecated Hive CLI

  

 

 

