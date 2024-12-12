---
title: "Apache Hive : Hive 0.13.1 Release tracking"
date: 2024-12-12
---

# Apache Hive : Hive 0.13.1 Release tracking

 
* [Goal]({{< ref "#goal" >}})
* [Jiras requested after RC0]({{< ref "#jiras-requested-after-rc0" >}})
* [Jiras requested for RC0]({{< ref "#jiras-requested-for-rc0" >}})
* [Timeline]({{< ref "#timeline" >}})

 

# Goal

Given the quickly increasing scope (from a perspective of sheer number of jiras) of hive 0.13, it was important to get hive 0.13 out of the door, and stop accepting patches, and move new development off to 0.14, but we now have need of a 0.13.1 release with major bug fixes only (no feature additions, nothing like refactoring) as a stabilization of 0.13. This page has been created for the purpose of tracking a release of a 0.13.1 release of hive.

 

# Jiras requested after RC0

 

The list of jiras requested for RC0 of 0.13.1 is now closed. Any further inclusion requests must be a critical bugfix that does not have any workarounds, must have been committed into 0.14 (unless the bug does not affect 0.14) and must be supported by another 2 committers as well for inclusion. Ideally, this table will be blank.

 

| Category | JIRA | Description | Current Status | 0.13.1 inclusion requestor | 0.13.1 inclusion +1 (2 additional committers) |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

 

# Jiras requested for RC0

 The following jiras have been requested as part of this release. This list is currently (as of May 2nd 2014 6pm PDT) closed for additions. Please do not make any further edits to this table.

 

| Category | JIRA | Description | Current Status | 0.13.1 inclusion requestor |
| --- | --- | --- | --- | --- |
| Authorization | HIVE-6919 | Hive sql std auth select query fails on partitioned tables | Committed in 0.14 | thejas |
| Authorization | HIVE-6921 | Index creation fails with sql std auth turned on | Committed in 0.14 | ashutoshc |
| Authorization | HIVE-6957 | SQL authorization does not work with HS2 binary mode and Kerberos auth | Committed in 0.14 | thejas |
| Metastore | HIVE-6945 | Issues with dropping partitions on Oracle | Committed in 0.14 | sershe |
| Metastore | HIVE-6862 | add DB schema DDL and upgrade 12to13 scripts for MS SQL Server | Committed in 0.14 | ekoifman |
| QL | HIVE-6883 | Dynamic Partitioning Optimization does not honor sort order or order by | Committed in 0.14 | prasanth\_j |
| QL | HIVE-6961 | Drop partitions treats partition columns as strings | Committed in 0.14 | sershe |
| WebHCat | HIVE-4576 | WebHCat does not allow values with commas | Committed in 0.14 | ekoifman |
| FileFormats | HIVE-6952 | Hive 0.13 HiveOutputFormat breaks backwards compatibility | Committed in 0.14 | ashutoshc |
| Tez | HIVE-6826 | Hive-tez has issues when different partitions work off of different input types | Committed in 0.14 | hagleitn |
| Tez | HIVE-6828 | Hive-tez bucket map join conversion interferes with map join conversion | Committed in 0.14 | hagleitn |
| Tez | HIVE-6898 | Functions in hive are failing with java.lang.ClassNotFoundException on Tez | Committed in 0.14 | hagleitn |
| Parquet | HIVE-6783 | Incompatible schema for maps between parquet-hive and parquet-pig | Committed in 0.14 | szehon |
| QL | HIVE-6955 | ExprNodeColDesc isSame doesn't account for tabAlias: this affects trait Propagation in Joins(Tez BucketJoin broken w/o this fix) | Committed in 0.14 | rhbutani |
| Test | HIVE-6877 | TestOrcRawRecordMerger is deleting test.tmp.dir(Note: Test fix, but included because it makes validation of release difficult otherwise) | Committed in 0.14 | amareshwari |
| Authorization | HIVE-6985 | sql std auth - privileges grants to public role not being honored | Committed in 0.14 | thejas |
| QL | HIVE-7001 | fs.permissions.umask-mode is getting unset when Session is started | Committed in 0.14 | thejas |

 

# Timeline

 

2nd May 2014, 6pm PDT : List of jiras for inclusion closes for open edit, list of jiras for inclusion frozen.

5th May 2014, 6pm PDT : 0.13.1 RC0 generation process begins, all jiras from above list have been tested to cleanly apply (or have had 0.13 backports requested which then cleanly apply), and patches are ready to commit to 0.13 branch

5th May 2014, 6pm PDT : JIRA queried for open non-blockers for 0.13.1, and none were found. Filter used : project = HIVE AND priority not in (Critical, Major, Minor, Trivial) AND fixVersion = 0.13.1 AND status = Open

5th May 2014, 6pm PDT : [dev@hive.apache.org]({{< ref "mailto:dev@hive-apache-org" >}}) mailed with above information as per [HowToRelease]({{< ref "howtorelease_27362106" >}}) instructions. Ptest tests kicked off on RC0 patch.

6th May 2014 : Test failures found, analyzing which patches caused the failures. Patch form over at <http://people.apache.org/~khorgath/releases/0.13.1_RC0/>

7th May 2014 : Test results analyzed: found the following issues caused:

| Failure | Patch | Cause | Resoultion |
| --- | --- | --- | --- |
| org.apache.hadoop.hive.cli.TestCliDriver.testCliDriver\_nullformatCTAS | HIVE-6945 | Table properties map order change, golden files differ | Regenerated test golden files |
| org.apache.hadoop.hive.cli.TestCliDriver.testCliDriver\_show\_create\_table\_alter |  | " | " |
| org.apache.hadoop.hive.cli.TestCliDriver.testCliDriver\_show\_tblproperties |  | " | " |
| org.apache.hadoop.hive.cli.TestCliDriver.testCliDriver\_unset\_table\_view\_property |  | " | " |
| org.apache.hadoop.hive.cli.TestNegativeCliDriver.testNegativeCliDriver\_unset\_table\_property |  | " | " |
| org.apache.hive.service.cli.TestScratchDir.testLocalScratchDirs | HIVE-6846 | Test error, incorrect expectation, not a product problem, test fixed in trunk | Ignored |
| org.apache.hadoop.hive.cli.TestMinimrCliDriver.testCliDriver\_bucketmapjoin6 | HIVE-6826 | Flaky test, succeeds on rerunning | Ignored |

 

8th May 2014 : Patches committed to 0.13 branch

(tentative) 8th May 2014 : RC0 generation

 

 

 

 

 

 

 

  

 

 

