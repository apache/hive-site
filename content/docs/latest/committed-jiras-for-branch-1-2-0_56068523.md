---
title: "Apache Hive : Committed JIRAS for branch-1.2.0"
date: 2024-12-12
---

# Apache Hive : Committed JIRAS for branch-1.2.0

# Last phase of JIRAs for inclusion to 1.2 release (list open for product outages, regressions and trivial patches)

**Requirement** : Product outages (critical bugfixes without workarounds), Regressions (bugs discovered during testing - usecases that used to work with prior hive releases) or Trivial patches (requiring no re-testing) only. Release Blockers, such as running afoul of Apache release guidelines are also acceptable as related to outages.

**Deadline for inclusion** : **Till the final RC gets voted on and accepted**

**Status** : Open for inclusion, but restricted on type of issue

 

| Category | Outage/Regression/Trivial ? | JIRA | Current Statusfor 1.2 | Committerrequesting inclusion |
| --- | --- | --- | --- | --- |
| QL | Outage | HIVE-10538 | committed | prasanth\_j |
| Auth | Trivial | HIVE-10578 | committed | thejas |
| Webhcat | Outage (was Trivial, now upgraded with reopening) | HIVE-10564 | committed | thejas |
| Add Jar | Regression | HIVE-10576 | committed | thejas |
| Windows | Trivial | HIVE-10603 | committed | thejas |
| Webhcat | Trivial | HIVE-10604 | committed | ekoifman |
| hadoop-1 | Outage | HIVE-10579 | committed | sushanth |
| Tez | Outage | HIVE-10607 | committed | hashutosh |
| Authz bug/testfail | Outage | HIVE-10612 | committed | thejas |
| cli | Trivial | HIVE-10610 | committed | sushanth |
| upgrade | Outage | HIVE-10614 | committed | sushanth |
| Transactions | Outage | HIVE-10595 | committed | alangates |
| Shims | Regression | HIVE-10638 | closed-tracking in HIVE-9736 | sushanth |
| Optimization | Trivial | HIVE-9644 | committed | ashutoshc |
| Release | Release Blocker | HIVE-10676 | committed | gates |
| Release | Release Blocker | HIVE-10548 | committed | xuefuz |
| Release | Release Blocker | HIVE-10715 | committed | vikram.dixit |

 

# List of JIRAs for 1.2.1

This is to be a list of jiras that were initially intended for 1.2, but cannot be finished in time for 1.2.0, and are not blockers/outages but desired in 1.2 nonetheless. These will be accepted as part of the RC process if they get done by then, but will not be considered release blockers. If 1.2.0 releases without them, they'll be on track for 1.2.1.

 

| Category | JIRA | Current Status | Committerrequesting inclusion |
| --- | --- | --- | --- |
| Vectorization | [HIVE-10609](https://issues.apache.org/jira/browse/HIVE-10609?src=confmacro) - Vectorization : Q64 fails with ClassCastException Closed | committed | vikram.dixit |
| Optimizer | [HIVE-10568](https://issues.apache.org/jira/browse/HIVE-10568?src=confmacro) Select count(distinct()) can have more optimal execution plan Closed | committed | hashutosh |
| orc | [HIVE-10591](https://issues.apache.org/jira/browse/HIVE-10591?src=confmacro) Support limited integer type promotion in ORC Closed | committed | prasanth\_j |

 

 

# JIRAS requested to be included in 1.2 release after RC0 preparation begins (list now closed)

**Requirement** : Bugfixes only

**Deadline for inclusion** : **00**:01, Friday, 1st May 2015 PDT****

**Status** : List frozen

 

| Category | JIRA | Current Statusfor 1.2 | Committerrequesting inclusion |
| --- | --- | --- | --- |
| Testing Infrastructure | [HIVE-10514](https://issues.apache.org/jira/browse/HIVE-10514?src=confmacro) - Fix MiniCliDriver tests failure Closed | committed | sushanth |
| CBO | [HIVE-10512](https://issues.apache.org/jira/browse/HIVE-10512?src=confmacro) - CBO (Calcite Return Path): SMBJoin conversion throws ClassCastException Closed | committed | ashutoshc |
| Vectorization | [HIVE-10450](https://issues.apache.org/jira/browse/HIVE-10450?src=confmacro) - More than one TableScan in MapWork not supported in Vectorization -- causes query to fail during vectorization Closed | committed | mmccline |
| QL | [HIVE-10307](https://issues.apache.org/jira/browse/HIVE-10307?src=confmacro) - Support to use number literals in partition column Closed | committed | jxiang |
| JDBC | [HIVE-10499](https://issues.apache.org/jira/browse/HIVE-10499?src=confmacro) - Ensure Session/ZooKeeperClient instances are closed Closed | committed | jxiang |
| hadoop-1 | [HIVE-10444](https://issues.apache.org/jira/browse/HIVE-10444?src=confmacro) - HIVE-10223 breaks hadoop-1 build Closed | committed | prasanth\_j |
| serde | [HIVE-10437](https://issues.apache.org/jira/browse/HIVE-10437?src=confmacro) - NullPointerException on queries where map/reduce is not involved on tables with partitions Closed | committed | ashutoshc |
| metastore | [HIVE-10507](https://issues.apache.org/jira/browse/HIVE-10507?src=confmacro) - Expose RetryingMetastoreClient to other external users of metastore client like Flume and Storm. Closed | committed | thejas |
| auth | [HIVE-10572](https://issues.apache.org/jira/browse/HIVE-10572?src=confmacro) - Improve Hive service test to check empty string Closed | committed | thejas |
| CBO | [HIVE-10071](https://issues.apache.org/jira/browse/HIVE-10071?src=confmacro) - CBO (Calcite Return Path): Join to MultiJoin rule Closed | committed | ashutosh |
| CBO | [HIVE-10546](https://issues.apache.org/jira/browse/HIVE-10546?src=confmacro) - genFileSinkPlan should use the generated SEL's RR for the partition col of FS Closed | committed | pxiong |
| CBO | [HIVE-10549](https://issues.apache.org/jira/browse/HIVE-10549?src=confmacro) - CBO (Calcite Return Path): Enable NonBlockingOpDeDupProc Closed | committed | pxiong |
| CBO | [HIVE-10455](https://issues.apache.org/jira/browse/HIVE-10455?src=confmacro) - CBO (Calcite Return Path): Different data types at Reducer before JoinOp Closed | committed | pxiong |
| ORC | [HIVE-10286](https://issues.apache.org/jira/browse/HIVE-10286?src=confmacro) - SARGs: Type Safety via PredicateLeaf.type Closed | committed | prasanthj |
| QL | [HIVE-10456](https://issues.apache.org/jira/browse/HIVE-10456?src=confmacro) - Grace Hash Join should not load spilled partitions on abort Closed | committed | prasanthj |
| Authorization | [HIVE-10543](https://issues.apache.org/jira/browse/HIVE-10543?src=confmacro) - improve error message in MetaStoreAuthzAPIAuthorizerEmbedOnly Closed | committed | thejas |
| Tez | [HIVE-10529](https://issues.apache.org/jira/browse/HIVE-10529?src=confmacro) - Remove references to tez task context before storing operator plan in object cache Closed | committed | hagleitn |
| QL | [HIVE-10520](https://issues.apache.org/jira/browse/HIVE-10520?src=confmacro) - LLAP: Must reset small table result columns for Native Vectorization of Map Join Closed | committed | mmccline |
| jdbc | [HIVE-10544](https://issues.apache.org/jira/browse/HIVE-10544?src=confmacro) - Beeline/Hive JDBC Driver fails in HTTP mode on Windows with java.lang.NoSuchFieldError: INSTANCE Closed | committed | thejas |
| Transactions | [HIVE-8915](https://issues.apache.org/jira/browse/HIVE-8915?src=confmacro) - Log file explosion due to non-existence of COMPACTION\_QUEUE table Closed | committed | alangates |
| vectorization | [HIVE-9908](https://issues.apache.org/jira/browse/HIVE-9908?src=confmacro) - vectorization error binary type not supported, group by with binary columns Closed | committed | jdere |
| metastore | [HIVE-9456](https://issues.apache.org/jira/browse/HIVE-9456?src=confmacro) - Make Hive support unicode with MSSQL as Metastore backend Closed | committed | sushanth |
| QL | [HIVE-10446](https://issues.apache.org/jira/browse/HIVE-10446?src=confmacro) - Hybrid Hybrid Grace Hash Join : java.lang.IllegalArgumentException in Kryo while spilling big table Closed | resolved | wzheng |
| HCatalog | [HIVE-9582](https://issues.apache.org/jira/browse/HIVE-9582?src=confmacro) - HCatalog should use IMetaStoreClient interface Closed | committed | sushanth |
| conf | [HIVE-10539](https://issues.apache.org/jira/browse/HIVE-10539?src=confmacro) - set default value of hive.repl.task.factory Closed | committed | thejas |
| Transactions | [HIVE-10521](https://issues.apache.org/jira/browse/HIVE-10521?src=confmacro) - TxnHandler.timeOutTxns only times out some of the expired transactions Closed | committed | alangates |
| CBO | [HIVE-10526](https://issues.apache.org/jira/browse/HIVE-10526?src=confmacro) - CBO (Calcite Return Path): HiveCost epsilon comparison should take row count in to account Closed | committed | hashutosh |
| CBO | [HIVE-10506](https://issues.apache.org/jira/browse/HIVE-10506?src=confmacro) - CBO (Calcite Return Path): Disallow return path to be enable if CBO is off Closed | committed | jpullokkaran |
| Tez | [HIVE-10542](https://issues.apache.org/jira/browse/HIVE-10542?src=confmacro) - Full outer joins in tez produce incorrect results in certain cases Closed | committed | vikram.dixit |
| HCatalog | [HIVE-8696](https://issues.apache.org/jira/browse/HIVE-8696?src=confmacro) - HCatClientHMSImpl doesn't use a Retrying-HiveMetastoreClient. Closed | committed | sushanth |
| QL | [HIVE-9743](https://issues.apache.org/jira/browse/HIVE-9743?src=confmacro) - Incorrect result set for vectorized left outer join Closed | committed | vikram.dixit |
| QL | [HIVE-10484](https://issues.apache.org/jira/browse/HIVE-10484?src=confmacro) - Vectorization : RuntimeException "Big Table Retained Mapping duplicate column" Closed | committed | vikram.dixit |
| Metastore | [HIVE-10530](https://issues.apache.org/jira/browse/HIVE-10530?src=confmacro) - Aggregate stats cache: bug fixes for RDBMS path Closed | committed | vgumashta |

 

 

# JIRAS requested to be included in 1.2 release after 1.2 branch creation, but before RC0 roll outs (list now closed)

**Requirement** : To add a JIRA to to this list, the JIRA must be in a patch-available state or committed state for trunk (or JIRA must be a minimal port for branch-1.2 alone), and must not be a "large feature", where "large feature" is defined as something that changes api, changes db schema, or carries significant testing risk. Bugfixes are unrestricted at this time.

**Deadline for inclusion** : ****00:01, Tuesday, 28th Apr 2015 PDT****

**Status** :  List frozen, all jiras in this list will be honoured for inclusion to Hive 1.2 and are approved for commit to branch-1.2.

 

| Category | JIRA | Current Statusfor 1.2 | Committerrequesting inclusion |
| --- | --- | --- | --- |
| Transactions | [HIVE-10500](https://issues.apache.org/jira/browse/HIVE-10500?src=confmacro) - Repeated deadlocks in underlying RDBMS cause transaction or lock failure Closed | committed | alangates |
| HBase Handler | [HIVE-10490](https://issues.apache.org/jira/browse/HIVE-10490?src=confmacro) - HBase Snapshot IF fails at run time with missing dependency of MetricsRegistry Closed | committed | ashutoshc |
| CBO | [HIVE-10462](https://issues.apache.org/jira/browse/HIVE-10462?src=confmacro) - CBO (Calcite Return Path): MapJoin and SMBJoin conversion not triggered Closed | committed | ashutoshc |
| Logical Optimizer | [HIVE-10451](https://issues.apache.org/jira/browse/HIVE-10451?src=confmacro) - PTF deserializer fails if values are not used in reducer Closed | committed | ashutoshc |
| QL | [HIVE-10421](https://issues.apache.org/jira/browse/HIVE-10421?src=confmacro) - DROP TABLE with qualified table name ignores database name when checking partitions Closed | committed | jdere |
| Logging | [HIVE-10441](https://issues.apache.org/jira/browse/HIVE-10441?src=confmacro) - Fix confusing log statement in SessionState about hive.execution.engine setting Closed | committed | jdere |
| hadoop-1 | [HIVE-10370](https://issues.apache.org/jira/browse/HIVE-10370?src=confmacro) - Hive does not compile with -Phadoop-1 option Closed | committed | prasanthj |
| hadoop-1 | [HIVE-10431](https://issues.apache.org/jira/browse/HIVE-10431?src=confmacro) - HIVE-9555 broke hadoop-1 build Closed | committed | prasanthj |
| hadoop-1 | [HIVE-10442](https://issues.apache.org/jira/browse/HIVE-10442?src=confmacro) - HIVE-10098 broke hadoop-1 build Closed | committed | prasanthj |
| hadoop-1 | [HIVE-10443](https://issues.apache.org/jira/browse/HIVE-10443?src=confmacro) - HIVE-9870 broke hadoop-1 build Closed | committed | prasanthj |
| serde | [HIVE-10428](https://issues.apache.org/jira/browse/HIVE-10428?src=confmacro) - NPE in RegexSerDe using HCat Closed | committed | jdere |
| jdbc | [HIVE-10465](https://issues.apache.org/jira/browse/HIVE-10465?src=confmacro) - whitelist restrictions don't get initialized in new copy of HiveConf Closed | committed | thejas |
| metastore | [HIVE-10507](https://issues.apache.org/jira/browse/HIVE-10507?src=confmacro) - Expose RetryingMetastoreClient to other external users of metastore client like Flume and Storm. Closed | committed | thejas |
| Tez/MR configs | [HIVE-10508](https://issues.apache.org/jira/browse/HIVE-10508?src=confmacro) - Strip out password information from config passed to Tez/MR in cases where password encryption is not used Closed | committed | thejas |
| QL | [HIVE-10456](https://issues.apache.org/jira/browse/HIVE-10456?src=confmacro) - Grace Hash Join should not load spilled partitions on abort Closed | committed | prasanthj |
| build & release | [HIVE-10510](https://issues.apache.org/jira/browse/HIVE-10510?src=confmacro) - Change 1.2.0-SNAPSHOT to 1.2.0 in branch-1.2 Closed | committed | sushanth |
| metastore | [HIVE-10384](https://issues.apache.org/jira/browse/HIVE-10384?src=confmacro) - RetryingMetaStoreClient does not retry wrapped TTransportExceptions Closed | committed | sushanth |
| HCatalog | [HIVE-10517](https://issues.apache.org/jira/browse/HIVE-10517?src=confmacro) - HCatPartition should not be created with "" as location in tests Closed | committed | sushanth |
| Metastore | [HIVE-9508](https://issues.apache.org/jira/browse/HIVE-9508?src=confmacro) - MetaStore client socket connection should have a lifetime Closed | committed | vgumashta |

# JIRAS requested to be included in 1.2 release before 1.2 branch creation (list now closed)

**Requirement** : General purpose feature jiras or bugfixes. 

**Deadline for inclusion** : **00:01, Saturday, 25th Apr 2015 PDT**

**Status**: List frozen, all jiras in this list will be honoured for inclusion to Hive 1.2 and are approved for commit to branch-1.2.

 

| Category | JIRA | Current Statusfor 1.2 | Developer/Committerrequesting inclusion |
| --- | --- | --- | --- |
| Export/Import | [HIVE-10227](https://issues.apache.org/jira/browse/HIVE-10227?src=confmacro) - Concrete implementation of Export/Import based ReplicationTaskFactory Closed | committed | sushanth |
| Export/Import | [HIVE-10426](https://issues.apache.org/jira/browse/HIVE-10426?src=confmacro) - Rework/simplify ReplicationTaskFactory instantiation Closed | committed | sushanth |
| QL | [HIVE-9824](https://issues.apache.org/jira/browse/HIVE-9824?src=confmacro) - LLAP: Native Vectorization of Map Join Closed | committed | mmccline |
| Spark | [HIVE-10347](https://issues.apache.org/jira/browse/HIVE-10347?src=confmacro) - Merge spark to trunk 4/15/2015 Closed | committed | szehon |
| Types | [HIVE-9917](https://issues.apache.org/jira/browse/HIVE-9917?src=confmacro) - After HIVE-3454 is done, make int to timestamp conversion configurable Closed | committed | jdere |
| QL | [HIVE-10403](https://issues.apache.org/jira/browse/HIVE-10403?src=confmacro) - Add n-way join support for Hybrid Grace Hash Join Closed | committed | wzheng |
| QL | [HIVE-10323](https://issues.apache.org/jira/browse/HIVE-10323?src=confmacro) - Tez merge join operator does not honor hive.join.emit.interval Closed | committed | vikram.dixit |
| Metastore | [HIVE-9674](https://issues.apache.org/jira/browse/HIVE-9674?src=confmacro) - *DropPartitionEvent should handle partition-sets. Closed | committed | mithun |
| Spark | [HIVE-10477](https://issues.apache.org/jira/browse/HIVE-10477?src=confmacro) - Provide option to disable Spark tests Closed | committed | sushanth |
| JDBC | [HIVE-10447](https://issues.apache.org/jira/browse/HIVE-10447?src=confmacro) - Beeline JDBC Driver to support 2 way SSL Closed | committed | thejas |
| HiveServer2 | [HIVE-4625](https://issues.apache.org/jira/browse/HIVE-4625?src=confmacro) - HS2 should not attempt to get delegation token from metastore if using embedded metastore Closed | committed | thejas |
| Metastore | [HIVE-10382](https://issues.apache.org/jira/browse/HIVE-10382?src=confmacro) - Aggregate stats cache for RDBMS based metastore codepath Closed | committed | vaibhav |
| ACID | [HIVE-10481](https://issues.apache.org/jira/browse/HIVE-10481?src=confmacro) - ACID table update finishes but values not really updated if column names are not all lower case Closed | committed | Eugene |
| ACID | [HIVE-10483](https://issues.apache.org/jira/browse/HIVE-10483?src=confmacro) - insert overwrite partition deadlocks on itself with DbTxnManager Closed | committed | Eugene |
| ACID | [HIVE-10151](https://issues.apache.org/jira/browse/HIVE-10151?src=confmacro) - insert into A select from B is broken when both A and B are Acid tables and bucketed the same way Closed | committed | Eugene |
| Security | [HIVE-9681](https://issues.apache.org/jira/browse/HIVE-9681?src=confmacro) - Extend HiveAuthorizationProvider to support partition-sets. Closed | committed | mithun |
| Replication | [HIVE-8165](https://issues.apache.org/jira/browse/HIVE-8165?src=confmacro) - Annotation changes for replication Closed | committed | sushanth |
| QL | [HIVE-5672](https://issues.apache.org/jira/browse/HIVE-5672?src=confmacro) - Insert with custom separator not supported for non-local directory Closed | committed | sushanth |
| Parkquet | [HIVE-10372](https://issues.apache.org/jira/browse/HIVE-10372?src=confmacro) - Update parquet version to 1.6.0 Closed | committed | Ferdinand Xu |
| HCatalog | [HIVE-5545](https://issues.apache.org/jira/browse/HIVE-5545?src=confmacro) - HCatRecord getInteger method returns String when used on Partition columns of type INT Closed | committed | sushanth |
| HiveServer2 | [HIVE-8890](https://issues.apache.org/jira/browse/HIVE-8890?src=confmacro) - HiveServer2 dynamic service discovery: use persistent ephemeral nodes curator recipe Closed | committed | vaibhav |
| HCatalog | [HIVE-10213](https://issues.apache.org/jira/browse/HIVE-10213?src=confmacro) - MapReduce jobs using dynamic-partitioning fail on commit. Closed | committed | mithun |
| HCatalog | [HIVE-9845](https://issues.apache.org/jira/browse/HIVE-9845?src=confmacro) - HCatSplit repeats information making input split data size huge Closed | committed | mithun |

 

 

 

 

