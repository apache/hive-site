---

title: "Apache Hive : DesignDocs"
date: 2024-12-12
----------------

# Apache Hive : DesignDocs

# Hive Design Documents

Proposals that appear in the "Completed" and "In Progress" sections should include a link to a JIRA ticket

## Completed

* [Views]({{< ref "viewdev_27362067" >}}) ([HIVE-1143](https://issues.apache.org/jira/browse/HIVE-1143))
* [Partitioned Views]({{< ref "partitionedviews_27362053" >}}) ([HIVE-1941](https://issues.apache.org/jira/browse/HIVE-1941))
* [Storage Handlers]({{< ref "storagehandlers_27362063" >}}) ([HIVE-705](https://issues.apache.org/jira/browse/HIVE-705))
* [HBase Integration]({{< ref "hbaseintegration_27362089" >}})
* [HBase Bulk Load]({{< ref "hbasebulkload_27362088" >}})
* [Locking]({{< ref "locking_27362050" >}}) ([HIVE-1293](https://issues.apache.org/jira/browse/HIVE-1293))
* [Indexes]({{< ref "indexdev_27362104" >}}) ([HIVE-417](https://issues.apache.org/jira/browse/HIVE-417))
* [Bitmap Indexes]({{< ref "indexdev-bitmap_27362028" >}}) ([HIVE-1803](https://issues.apache.org/jira/browse/HIVE-1803))
* [Filter Pushdown]({{< ref "filterpushdowndev_27362092" >}}) ([HIVE-279](https://issues.apache.org/jira/browse/HIVE-279))
* [Table-level Statistics]({{< ref "statsdev_27362062" >}}) ([HIVE-1361](https://issues.apache.org/jira/browse/HIVE-1361))
* [Dynamic Partitions]({{< ref "dynamicpartitions_27823715" >}})
* [Binary Data Type]({{< ref "binary-datatype-proposal_27826614" >}}) ([HIVE-2380](https://issues.apache.org/jira/browse/HIVE-2380))
* [Decimal Precision and Scale Support](https://cwiki.apache.org/confluence/download/attachments/27362075/Hive_Decimal_Precision_Scale_Support.pdf)
* [HCatalog]({{< ref "hcatalog_33299065" >}}) (formerly [Howl]({{< ref "howl_27362109" >}}))
* [HiveServer2]({{< ref "hiveserver2-thrift-api_27843687" >}}) ([HIVE-2935](https://issues.apache.org/jira/browse/HIVE-2935))
* [Column Statistics in Hive]({{< ref "column-statistics-in-hive_29131019" >}}) ([HIVE-1362](https://issues.apache.org/jira/browse/HIVE-1362))
* [List Bucketing]({{< ref "listbucketing_27846854" >}}) ([HIVE-3026](https://issues.apache.org/jira/browse/HIVE-3026))
* [Group By With Rollup]({{< ref "groupbywithrollup_27826238" >}}) ([HIVE-2397](https://issues.apache.org/jira/browse/HIVE-2397))
* [Enhanced Aggregation, Cube, Grouping and Rollup](https://cwiki.apache.org/confluence/display/Hive/Enhanced+Aggregation,+Cube,+Grouping+and+Rollup) ([HIVE-3433](https://issues.apache.org/jira/browse/HIVE-3433))
* [Optimizing Skewed Joins]({{< ref "skewed-join-optimization_27847852" >}}) ([HIVE-3086](https://issues.apache.org/jira/browse/HIVE-3086))
* [Correlation Optimizer]({{< ref "correlation-optimizer_34019487" >}}) ([HIVE-2206](https://issues.apache.org/jira/browse/HIVE-2206))
* [Hive on Tez]({{< ref "hive-on-tez_33296197" >}}) ([HIVE-4660](https://issues.apache.org/jira/browse/HIVE-4660))
  + [Hive-Tez Compatibility]({{< ref "hive-tez-compatibility_59689974" >}})
* [Vectorized Query Execution]({{< ref "vectorized-query-execution_34838326" >}}) ([HIVE-4160](https://issues.apache.org/jira/browse/HIVE-4160))
* [Cost Based Optimizer in Hive](https://cwiki.apache.org/confluence/display/Hive/Cost-based+optimization+in+Hive) ([HIVE-5775](https://issues.apache.org/jira/browse/HIVE-5775))
* [Atomic Insert/Update/Delete](https://issues.apache.org/jira/browse/HIVE-5317) ([HIVE-5317](https://issues.apache.org/jira/browse/HIVE-5317))
* [Transaction Manager](https://issues.apache.org/jira/browse/HIVE-5843) ([HIVE-5843](https://issues.apache.org/jira/browse/HIVE-5843))
* [SQL Standard based secure authorization](https://cwiki.apache.org/confluence/download/attachments/27362075/SQL+standard+authorization+hive.pdf) ([HIVE-5837](https://issues.apache.org/jira/browse/HIVE-5837))
* [Hybrid Hybrid Grace Hash Join]({{< ref "50860526" >}}) ([HIVE-9277](https://issues.apache.org/jira/browse/HIVE-9277))
* [LLAP Daemons]({{< ref "llap_62689557" >}}) ([HIVE-7926](https://issues.apache.org/jira/browse/HIVE-7926))
* [Support for Hive Replication]({{< ref "hivereplicationdevelopment_55155632" >}}) ([HIVE-7973](https://issues.apache.org/jira/browse/HIVE-7973))

## In Progress

* [Column Level Top K Statistics]({{< ref "top-k-stats_30150275" >}}) ([HIVE-3421](https://issues.apache.org/jira/browse/HIVE-3421))
* [Hive on Spark](https://cwiki.apache.org/confluence/display/Hive/Hive+on+Spark) ([HIVE-7292](https://issues.apache.org/jira/browse/HIVE-7292))
* [Hive on Spark: Join Design (HIVE-7613)]({{< ref "50858744" >}})
* [Improve ACID Performance](https://issues.apache.org/jira/secure/attachment/12823582/Design.Document.Improving%20ACID%20performance%20in%20Hive.02.docx) – download docx file ([HIVE-14035](https://issues.apache.org/jira/browse/HIVE-14035), [HIVE-14199](https://issues.apache.org/jira/browse/HIVE-14199), [HIVE-14233](https://issues.apache.org/jira/browse/HIVE-14233))
* [Query Results Caching]({{< ref "75963441" >}}) ([HIVE-18513](https://issues.apache.org/jira/browse/HIVE-18513))
* [Default Constraint]({{< ref "75969407" >}}) [(HIVE-18726)](https://issues.apache.org/jira/browse/HIVE-18726)
* [Different TIMESTAMP types]({{< ref "different-timestamp-types_103091503" >}}) ([HIVE-21348](https://issues.apache.org/jira/browse/HIVE-21348))
* [Support SAML 2.0 authentication]({{< ref "170266662" >}}) ([HIVE-24543](https://issues.apache.org/jira/browse/HIVE-24543))

## Proposed

* [Spatial Queries]({{< ref "spatial-queries_34022710" >}})
* [Theta Join]({{< ref "theta-join_33293991" >}}) ([HIVE-556](https://issues.apache.org/jira/browse/HIVE-556))
* [attachments/27362075/55476344.pdf](/attachments/27362075/55476344.pdf)
* [JDBC Storage Handler](https://issues.apache.org/jira/secure/attachment/12474978/JDBCStorageHandler+Design+Doc.pdf)
* [MapJoin Optimization]({{< ref "mapjoinoptimization_27362029" >}})
* [Proposal to standardize and expand Authorization in Hive](https://issues.apache.org/jira/secure/attachment/12554109/Hive_Authorization_Functionality.pdf)
* [Dependent Tables]({{< ref "dependent-tables_30151205" >}}) ([HIVE-3466](https://issues.apache.org/jira/browse/HIVE-3466))
* [AccessServer]({{< ref "accessserver-design-proposal_31823045" >}})
* [Type Qualifiers in Hive]({{< ref "type-qualifiers-in-hive_33298524" >}})
* [MapJoin & Partition Pruning]({{< ref "mapjoin-and-partition-pruning_34015666" >}}) ([HIVE-5119](https://issues.apache.org/jira/browse/HIVE-5119))
* [Updatable Views]({{< ref "updatableviews_27824044" >}}) ([HIVE-1143](https://issues.apache.org/jira/browse/HIVE-1143))
* [Phase 2 of Replication Development]({{< ref "hivereplicationv2development_66850051" >}}) ([HIVE-14841](https://issues.apache.org/jira/browse/HIVE-14841))
* [Subqueries in SELECT]({{< ref "subqueries-in-select_68717850" >}}) ([HIVE-16091](https://issues.apache.org/jira/browse/HIVE-16091))
* [DEFAULT keyword](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=75977362) [(HIVE-19059)](https://issues.apache.org/jira/browse/HIVE-19059)
* [Hive remote databases/tables]({{< ref "80452092" >}})

## Incomplete

* [Authorization]({{< ref "authdev_27362078" >}}) (Committed but not secure/deployable – see [Disclaimer]({{< ref "#disclaimer" >}}))

## Abandoned

* [Hive across Multiple Data Centers (Physical Clusters)]({{< ref "27837073" >}})
* [Metastore on HBase]({{< ref "hbasemetastoredevelopmentguide_55151960" >}}) ([HIVE-9452](https://issues.apache.org/jira/browse/HIVE-9452))

## Other

* [Security Notes]({{< ref "security_27362056" >}})
* [Hive Outer Join Behavior]({{< ref "outerjoinbehavior_35749927" >}})
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

