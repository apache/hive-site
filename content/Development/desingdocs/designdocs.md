---
title: "Apache Hive : DesignDocs"
date: 2024-12-12
---

# Apache Hive : DesignDocs

# Hive Design Documents

Proposals that appear in the "Completed" and "In Progress" sections should include a link to a JIRA ticket

## Completed

* [Views]({{< ref "viewdev" >}}) ([HIVE-1143](https://issues.apache.org/jira/browse/HIVE-1143))
* [Partitioned Views]({{< ref "partitionedviews" >}}) ([HIVE-1941](https://issues.apache.org/jira/browse/HIVE-1941))
* [Storage Handlers]({{< ref "storagehandlers" >}}) ([HIVE-705](https://issues.apache.org/jira/browse/HIVE-705))
* [HBase Integration]({{< ref "hbaseintegration" >}})
* [HBase Bulk Load]({{< ref "hbasebulkload" >}})
* [Locking]({{< ref "locking" >}}) ([HIVE-1293](https://issues.apache.org/jira/browse/HIVE-1293))
* [Indexes]({{< ref "indexdev" >}}) ([HIVE-417](https://issues.apache.org/jira/browse/HIVE-417))
* [Bitmap Indexes]({{< ref "indexdev-bitmap" >}}) ([HIVE-1803](https://issues.apache.org/jira/browse/HIVE-1803))
* [Filter Pushdown]({{< ref "filterpushdowndev" >}}) ([HIVE-279](https://issues.apache.org/jira/browse/HIVE-279))
* [Table-level Statistics]({{< ref "statsdev" >}}) ([HIVE-1361](https://issues.apache.org/jira/browse/HIVE-1361))
* [Dynamic Partitions]({{< ref "dynamicpartitions" >}})
* [Binary Data Type]({{< ref "binary-datatype-proposal" >}}) ([HIVE-2380](https://issues.apache.org/jira/browse/HIVE-2380))
* [Decimal Precision and Scale Support](https://cwiki.apache.org/confluence/download/attachments/27362075/Hive_Decimal_Precision_Scale_Support.pdf)
* [HCatalog]({{< ref "hcatalog-base" >}}) (formerly [Howl]({{< ref "howl" >}}))
* [HiveServer2]({{< ref "hiveserver2-thrift-api" >}}) ([HIVE-2935](https://issues.apache.org/jira/browse/HIVE-2935))
* [Column Statistics in Hive]({{< ref "column-statistics-in-hive" >}}) ([HIVE-1362](https://issues.apache.org/jira/browse/HIVE-1362))
* [List Bucketing]({{< ref "listbucketing" >}}) ([HIVE-3026](https://issues.apache.org/jira/browse/HIVE-3026))
* [Group By With Rollup]({{< ref "groupbywithrollup" >}}) ([HIVE-2397](https://issues.apache.org/jira/browse/HIVE-2397))
* [Enhanced Aggregation, Cube, Grouping and Rollup](https://cwiki.apache.org/confluence/display/Hive/Enhanced+Aggregation,+Cube,+Grouping+and+Rollup) ([HIVE-3433](https://issues.apache.org/jira/browse/HIVE-3433))
* [Optimizing Skewed Joins]({{< ref "skewed-join-optimization" >}}) ([HIVE-3086](https://issues.apache.org/jira/browse/HIVE-3086))
* [Correlation Optimizer]({{< ref "correlation-optimizer" >}}) ([HIVE-2206](https://issues.apache.org/jira/browse/HIVE-2206))
* [Hive on Tez]({{< ref "hive-on-tez" >}}) ([HIVE-4660](https://issues.apache.org/jira/browse/HIVE-4660))
	+ [Hive-Tez Compatibility]({{< ref "hive-tez-compatibility" >}})
* [Vectorized Query Execution]({{< ref "vectorized-query-execution" >}}) ([HIVE-4160](https://issues.apache.org/jira/browse/HIVE-4160))
* [Cost Based Optimizer in Hive](https://cwiki.apache.org/confluence/display/Hive/Cost-based+optimization+in+Hive) ([HIVE-5775](https://issues.apache.org/jira/browse/HIVE-5775))
* [Atomic Insert/Update/Delete](https://issues.apache.org/jira/browse/HIVE-5317) ([HIVE-5317](https://issues.apache.org/jira/browse/HIVE-5317))
* [Transaction Manager](https://issues.apache.org/jira/browse/HIVE-5843) ([HIVE-5843](https://issues.apache.org/jira/browse/HIVE-5843))
* [SQL Standard based secure authorization](https://cwiki.apache.org/confluence/download/attachments/27362075/SQL+standard+authorization+hive.pdf) ([HIVE-5837](https://issues.apache.org/jira/browse/HIVE-5837))
* [Hybrid Hybrid Grace Hash Join]({{< ref "50860526" >}}) ([HIVE-9277](https://issues.apache.org/jira/browse/HIVE-9277))
* [LLAP Daemons]({{< ref "llap" >}}) ([HIVE-7926](https://issues.apache.org/jira/browse/HIVE-7926))
* [Support for Hive Replication]({{< ref "hivereplicationdevelopment" >}}) ([HIVE-7973](https://issues.apache.org/jira/browse/HIVE-7973))

## In Progress

* [Column Level Top K Statistics]({{< ref "top-k-stats" >}}) ([HIVE-3421](https://issues.apache.org/jira/browse/HIVE-3421))
* [Hive on Spark](https://cwiki.apache.org/confluence/display/Hive/Hive+on+Spark) ([HIVE-7292](https://issues.apache.org/jira/browse/HIVE-7292))
* [Hive on Spark: Join Design (HIVE-7613)]({{< ref "50858744" >}})
* [Improve ACID Performance](https://issues.apache.org/jira/secure/attachment/12823582/Design.Document.Improving%20ACID%20performance%20in%20Hive.02.docx) – download docx file ([HIVE-14035](https://issues.apache.org/jira/browse/HIVE-14035), [HIVE-14199](https://issues.apache.org/jira/browse/HIVE-14199), [HIVE-14233](https://issues.apache.org/jira/browse/HIVE-14233))
* [Query Results Caching]({{< ref "75963441" >}}) ([HIVE-18513](https://issues.apache.org/jira/browse/HIVE-18513))
* [Default Constraint]({{< ref "75969407" >}}) [(HIVE-18726)](https://issues.apache.org/jira/browse/HIVE-18726)
* [Different TIMESTAMP types]({{< ref "different-timestamp-types" >}}) ([HIVE-21348](https://issues.apache.org/jira/browse/HIVE-21348))
* [Support SAML 2.0 authentication]({{< ref "170266662" >}}) ([HIVE-24543](https://issues.apache.org/jira/browse/HIVE-24543))

## Proposed

* [Spatial Queries]({{< ref "spatial-queries" >}})
* [Theta Join]({{< ref "theta-join" >}}) ([HIVE-556](https://issues.apache.org/jira/browse/HIVE-556))
* [attachments/27362075/55476344.pdf](/attachments/27362075/55476344.pdf)
* [JDBC Storage Handler](https://issues.apache.org/jira/secure/attachment/12474978/JDBCStorageHandler+Design+Doc.pdf)
* [MapJoin Optimization]({{< ref "mapjoinoptimization" >}})
* [Proposal to standardize and expand Authorization in Hive](https://issues.apache.org/jira/secure/attachment/12554109/Hive_Authorization_Functionality.pdf)
* [Dependent Tables]({{< ref "dependent-tables" >}}) ([HIVE-3466](https://issues.apache.org/jira/browse/HIVE-3466))
* [AccessServer]({{< ref "accessserver-design-proposal" >}})
* [Type Qualifiers in Hive]({{< ref "type-qualifiers-in-hive" >}})
* [MapJoin & Partition Pruning]({{< ref "mapjoin-and-partition-pruning" >}}) ([HIVE-5119](https://issues.apache.org/jira/browse/HIVE-5119))
* [Updatable Views]({{< ref "updatableviews" >}}) ([HIVE-1143](https://issues.apache.org/jira/browse/HIVE-1143))
* [Phase 2 of Replication Development]({{< ref "hivereplicationv2development" >}}) ([HIVE-14841](https://issues.apache.org/jira/browse/HIVE-14841))
* [Subqueries in SELECT]({{< ref "subqueries-in-select" >}}) ([HIVE-16091](https://issues.apache.org/jira/browse/HIVE-16091))
* [DEFAULT keyword](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=75977362) [(HIVE-19059)](https://issues.apache.org/jira/browse/HIVE-19059)
* [Hive remote databases/tables]({{< ref "80452092" >}})

## Incomplete

* [Authorization]({{< ref "authdev" >}}) (Committed but not secure/deployable – see [Disclaimer]({{< ref "#disclaimer" >}}))

## Abandoned

* [Hive across Multiple Data Centers (Physical Clusters)]({{< ref "27837073" >}})
* [Metastore on HBase]({{< ref "hbasemetastoredevelopmentguide" >}}) ([HIVE-9452](https://issues.apache.org/jira/browse/HIVE-9452))

## Other

* [Security Notes]({{< ref "security" >}})
* [Hive Outer Join Behavior]({{< ref "outerjoinbehavior" >}})
* [Metastore ER Diagram](https://issues.apache.org/jira/secure/attachment/12471108/HiveMetaStore.pdf)

## Attachments:

![](images/icons/bullet_blue.gif)
[attachments/27362075/34177517.pdf](/attachments/27362075/34177517.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/35193010.pdf](/attachments/27362075/35193010.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/35193011.pdf](/attachments/27362075/35193011.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/36438041.pdf](/attachments/27362075/36438041.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/35193076.pdf](/attachments/27362075/35193076.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/35193122.pdf](/attachments/27362075/35193122.pdf) (application/pdf)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/35193191-html](/attachments/27362075/35193191-html) (text/html)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/34177489.pdf](/attachments/27362075/34177489.pdf) (application/download)
   

![](images/icons/bullet_blue.gif)
[attachments/27362075/55476344.pdf](/attachments/27362075/55476344.pdf) (application/download)
   

 

 

