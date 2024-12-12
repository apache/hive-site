---
title: "Apache Hive : Hive 0.13 release status"
date: 2024-12-12
---

# Apache Hive : Hive 0.13 release status

### JQL used to track issues

> id in () ORDER BY status ASC, assignee
> 
> 

### JQL for jiras fixed for 0.13 after branch

> 
> ```
> project = Hive AND resolutiondate >= "2014/03/04 17:09" AND resolution = Fixed AND fixVersion = 0.13.0 ORDER BY resolutiondate DESC
> ```
> 

### Jiras applied to 0.13

HIVE-6732 Update Release Notes (Harish Butani)  
HIVE-6873 DISTINCT clause in aggregates is handled incorrectly by vectorized execution (Jitendra, Remus via Ashutosh)  
HIVE-6887 Add missing params to hive-default.xml.template (Harish Butani via Lefty)

HIVE-6879: Vectorization: IsNull returns incorrect output column. (reviewed by Vikram)  
HIVE-6894 : hcatalog streaming version in 0.13 branch should be "0.13" (Thejas Nair, reviewed by Harish Butani)  
HIVE-6864 : HiveServer2 concurrency uses incorrect user information in unsecured mode (Vaibhav Gumashta via Thejas Nair)  
HIVE-6319. Add compactor for ACID tables. (Alan Gates via omalley)  
HIVE-6876 : Logging information should include thread id (Vikram Dixit K, reviewed by Jason Dere)  
HIVE-6816 : jar upload path w/o schema is not handled correctly (Sergey Shelukhin, reviewed by Vikram Dixit K)  
HIVE-6881 : Postgres Upgrade script for hive 0.13 is broken (Harish Butani via Ashutosh Chauhan)  
HIVE-6882 : Make upgrade script schemaTool friendly (Ashutosh Chauhan via Harish Butani)  
HIVE-5687 Streaming support in Hive (Roshan Naik via gates)  
HIVE-6878 : MetaStoreDirectSql may not handle empty filter correctly (Sergey Shelukhin, reviewed by Ashutosh Chauhan)  
HIVE-6856 : ddl commands fail with permissions issue when running using webhcat in secure Tez cluster (Eugene Koifman via Thejas Nair)  
HIVE-6604. Forgotten file from previous commit.  
HIVE-6863 : HiveServer2 binary mode throws exception with PAM (Vaibhav Gumashta via Thejas Nair)  
HIVE-6604. Fix ORC ACID format to work with vectorization. (omalley)  
HIVE-6818. I forgot to add the comment that Sergey wanted to add as part of the commit.  
HIVE-6837 : HiveServer2 thrift/http mode & binary mode proxy user check fails reporting IP null for client (Vaibhav Gumashta via Thejas Nair)  
HIVE-6818. Fix array out of bounds when ORC is used with ACID and predicate pushdown. (omalley)  
HIVE-6850. Fix fetch operator to use correct valid transaction list. (omalley)  
HIVE-4904 A little more CP crossing RS boundaries (Navis Ryu via Ashutosh Chauhan)  
HIVE-6825 : custom jars for Hive query should be uploaded to scratch dir per query; and/or versioned (Sergey Shelukhin, reviewed by Vikram Dixit K)  
HIVE-6812 : show compactions returns error when there are no compactions (Alan Gates via Ashutosh Chauhan)  
HIVE-6845 : TestJdbcDriver.testShowRoleGrant can fail if TestJdbcDriver/TestJdbcDriver2 run together (Jason Dere via Thejas Nair)  
HIVE-6759. Don't trust file lengths from HDFS when ORC files are being written.  
HIVE-6782 : HiveServer2Concurrency issue when running with tez intermittently, throwing org.apache.tez.dag.api.SessionNotRunning: Application not running error (Vikram Dixit  
 K, reviewed by Thejas Nair)  
HIVE-6846 : allow safe set commands with sql standard authorization (Thejas Nair via Ashutosh Chauhan)  
HIVE-6757 Remove deprecated parquet classes from outside of org.apache package (Owen O'Malley via Xufeu Zhang)  
HIVE-6787. Only add ACID OrcInputSplits when the partition is actually ACID  
HIVE-6830. Remove restriction that ACID base directories have to be completely  
HIVE-6855 : A couple of errors in MySQL db creation script for transaction tables (Alan Gates via Ashutosh Chauhan)  
HIVE-6860 : Issue with FS based stats collection on Tez (Ashutosh Chauhan via Vikram Dixit)  
HIVE-6821 : Fix some non-deterministic tests (Jason Dere via Ashutosh Chauhan)  
HIVE-6739 : Hive HBase query fails on Tez due to missing jars and then due to NPE in getSplits (Sergey Shelukhin, reviewed by Vikram Dixit K)  
HIVE-6841: Vectorized execution throws NPE for partitioning columns with \_\_HIVE\_DEFAULT\_PARTITION\_\_ (reviewd by Hari, Ashutosh)  
HIVE-6840: Use Unordered Output for Bucket Map Joins on Tez (Siddharth Seth via Gunther Hagleitner)

HIVE-6834 Dynamic partition optimization bails out after removing file sink operator (Prasanth J via Harish Butani)

HIVE-6848 importing into an existing table fails (Harish Butani via Ashutosh Chauhan)  
HIVE-6800 : HiveServer2 is not passing proxy user setting through hive-site (Vaibhav Gumashta, reviewed by Prasad Mujumdar, Thejas Nair)  
HIVE-6849 : Golden files update for hadoop-2 (Ashutosh Chauhan via Jason Dere)  
HIVE-6738 : HiveServer2 secure Thrift/HTTP needs to accept doAs parameter from proxying intermediary (Dilli Arumugam via Thejas Nair)  
HIVE-6829 : alter table foo compact gives an error (Alan Gates via Ashutosh Chauhan)  
HIVE-6827 : Disable insecure commands with std sql auth (Ashutosh Chauhan via Thejas Nair)  
HIVE-6743: Allow specifying the log level for Tez tasks (Siddarth Seth via Gunther Hagleitner)  
HIVE-6838 : q.out files need correction for stats properties - sample8,transform\_ppr1,transform\_ppr2,union\_ppr (Thejas Nair, reviewed by Jitendra Nath Pandey\_  
revert HIVE-6827 to fix unit test failure  
HIVE-6808 : sql std auth - describe table, show partitions are not being authorized (Thejas M Nair, reviewed by Ashutosh Chauhan)  
HIVE-6823 : adding missing files  
HIVE-6823 : sql std auth - database authorization does not check for role ownership (Thejas Nair, reviewed by Ashutosh Chauhan)  
HIVE-6749 : Turn hive.auto.convert.join.use.nonstaged off by default (Ashutosh Chauhan via Navis)  
HIVE-6827 : Disable insecure commands with std sql auth (Ashutosh Chauhan via Thejas Nair)  
HIVE-6796 : Create/drop roles is case-sensitive whereas set role is case insensitive (Ashutosh Chauhan via Thejas Nair)  
HIVE-6780 : Set tez credential file property along with MR conf property for Tez jobs (Eugene Koifman via Thejas Nair)  
HIVE-6068 : HiveServer2 client on windows does not handle the non-ascii characters properly (Vaibhav Gumashta via Thejas Nair)  
HIVE-6804 - adding files missed in earlier commit  
HIVE-6804 : sql std auth - granting existing table privilege to owner should result in error (Thejas Nair, reviewed by Ashutosh Chauhan)  
HIVE-6778 ql/src/test/queries/clientpositive/pcr.q covers the test which generate 1.0 =1 predicate in partition pruner. (Harish Butani via Hari S., Jitendra Pandey)  
HIVE-6797 Add protection against divide by zero in stats annotation (Prasanth J via Harish Butani)  
HIVE-6786 Off by one error in ORC PPD (Prasanth J via Sergey Shelukhin)  
HIVE-6789 : HiveStatement client transport lock should unlock in finally block. (Vaibhav Gumashta via Thejas Nair)  
HIVE-6766 : HCatLoader always returns Char datatype with maxlength(255) when table format is ORC (Eugene Koifman, reviewed by Sushanth Sowmyan)  
HIVE-6795 : metastore initialization should add default roles with default, SBA (Thejas Nair via Ashutosh Chauhan)  
HIVE-6802 Fix metastore.thrift: add partition\_columns.types constant(Harish Butani via Jason Dere)  
HIVE-6779 : Hive cli may get into inconsistent state when Ctrl-C is hit on hadoop2 (Ashutosh Chauhan via Jason Dere)  
HIVE-6642 Query fails to vectorize when a non string partition column is part of the query expression (Hari Subramaniyan via Harish Butani)  
HIVE-5835 Null pointer exception in DeleteDelegator in templeton code (Hari Subramaniyan via Thejas Nair)  
HIVE-6781 : Hive JDBC in http mode is using HiveConf - should be removed (Vaibhav Gumashta via Thejas Nair)  
HIVE-6721 : Streaming ingest needs to be able to send many heartbeats together (Alan Gates via Ashutosh Chauhan)  
HIVE-6763 : HiveServer2 in http mode might send same kerberos client ticket in case of concurrent requests resulting in server throwing a replay exception (Vaibhav Gumashta via Thejas Nair)  
HIVE-6662: Vector Join operations with DATE columns fail. (Gopal V via jitendra)  
HIVE-6744: Permanent UDF lookup fails when current DB has uppercase letters (jdere, reviewed by thejas)  
HIVE-6643 Add a check for cross products in plans and output a warning(Harish Butani reviewed by Gunther Hagleitner)  
HIVE-6752: Vectorized Between and IN expressions don't work with decimal, date types. (reviewed by Eric Hanson, Sergey)  
HIVE-6547 : normalize struct Role in metastore thrift interface (Thejas M Nair, reviewed by Ashutosh Chauhan)  
HIVE-6728 : Missing file override-container-log4j.properties in Hcatalog (Eugene Koifman via Thejas Nair)  
HIVE-6676 : hcat cli fails to run when running with hive on tez (Eugene Koifman via Thejas Nair)  
HIVE-6597 : WebHCat E2E tests doAsTests\_6 and doAsTests\_7 need to be updated (Deepesh Khandelwal via Eugene Koifman & Sushanth Sowmyan) (backport to 0.13)  
HIVE-6188 : Document hive.metastore.try.direct.sql & hive.metastore.try.direct.sql.ddl (Sergey Shelukhin, reviewed by Jitendra Nath Pandey)  
HIVE-6686 : webhcat does not honour -Dlog4j.configuration=$WEBHCAT\_LOG4J of log4j.properties file on local filesystem. (Eugene Koifman via Thejas Nair)  
HIVE-6592 : WebHCat E2E test abort when pointing to https url of webhdfs (Deepesh Khandelwal via Sushanth Sowmyan) (backport to 0.13)  
HIVE-6633 : pig -useHCatalog with embedded metastore fails to pass command line args to metastore (Eric Hanson via Sushanth Sowmyan) (backport to 0.13)

HIVE-6314 The logging (progress reporting) is too verbose (Navis Ryu via Harish Butani)  
HIVE-6697 : HiveServer2 secure thrift/http authentication needs to support SPNego (Dilli Arumugam via Thejas Nair)  
HIVE-6771 : Update WebHCat E2E tests now that comments is reported correctly in describe table output (Deepesh Khandelwal via Ashutosh Chauhan)  
HIVE-6710 : Deadlocks seen in transaction handler using mysql (Alan Gates via Ashutosh Chauhan)  
HIVE-6734 : DDL locking too course grained in new db txn manager (Alan Gates via Ashutosh Chauhan)  
HIVE-6767 : Golden file updates for hadoop-2 (Ashutosh Chauhan via Vikram Dixit)  
HIVE-4975: Reading orc file throws exception after adding new column (Kevin Wilfong via Gunther Hagleitner)  
HIVE-6447 : Bucket map joins in hive-tez (Vikram Dixit, reviewed by Harish Butani, Gunther Hagleitner)  
HIVE-6748: FileSinkOperator needs to cleanup held references for container reuse (Gopal V via Gunther Hagleitner)  
HIVE-6714: Fix getMapSize() of LazyMap (Prasanth J via Gunther Hagleitner)  
HIVE-6735: Make scalable dynamic partitioning work in vectorized mode (Prasanth J via Gunther Hagleitner)  
HIVE-6760: Scalable dynamic partitioning should bail out properly for list bucketing (Prasanth J via Gunther Hagleitner)  
HIVE-6761: Hashcode computation does not use maximum parallelism for scalable dynamic partitioning  
HIVE-6701 Analyze table compute statistics for decimal columns. (Sergey Shelukhin and Jitendra Nath Pandey, reviewed by Ashutosh Chauhan)  
HIVE-6703 Tez should store SHA of the jar when uploading to cache (Sergey Shelukhin, reviewed by Gunther Hagleitner)  
HIVE-6670 : ClassNotFound with Serde (Abin Shahab, Ashutosh Chauhan via Jason Dere)  
HIVE-6753: Unions on Tez NPE when there's a mapjoin the union work (Gunther Hagleitner, reviewed by Vikram Dixit K)  
HIVE-6546 : WebHCat job submission for pig with -useHCatalog argument fails on Windows (Eric Hanson via Thejas Nair)

HIVE-2752 Index names are case sensitive (Navis Ryu via Harish Butani)  
HIVE-6129 alter exchange is implemented in inverted manner (Navis Ryu via Harish Butani)  
HIVE-6674 : show grant on all throws NPE (Navis via Ashutosh Chauhan)  
HIVE-6750 : Hive printing debug information in stdout after the end of CLI session (Vaibhav Gumashta via Ashutosh Chauhan)  
HIVE-6492 : limit partition number involved in a table scan (Selina Zhang via Ashutosh Chauhan, Gunther Hagleitner)  
HIVE-6733: Driver context logs every query in the warn level (Gunther Hagleitner, reviewed by Thejas M Nair)  
HIVE-6708 : ConstantVectorExpression should create copies of data objects rather than referencing them. (Hari Subramaniyan via jitendra)  
HIVE-6060. Create AcidInputFormat and AcidOutputFormat and update

HIVE-5768 Beeline connection cannot be closed with not close command (Navis Ryu via Brock Noland)  
HIVE-5567. Add better protection code for SARGs. (omalley)  
HIVE-6499 Using Metastore-side Auth errors on non-resolvable IF/OF/SerDe (Sushanth Sowmyan via Thejas Nair)  
HIVE-6742: Tez Outputs need to be started before accessing the writer (Siddharth Seth via Gunther Hagleitner)

HIVE-6460 Need new 'show' functionality for transactions (Alan Gates via Harish Butani)  
HIVE-6671 WebHCat Job Submission API 'enablelog' parameter is only supported with Hadoop 1 (Eugene Koifman via gates)  
HIVE-6724 : HCatStorer throws ClassCastException while storing tinyint/smallint data (Eugene Koifman via Sushanth Sowmyan) (backport from 0.14 trunk)  
HIVE-6661 WebHCat E2E test TestPig\_10 fails (Hadoop 2) (Eugene Koifman via gates)  
HIVE-6653 WebHCat E2E test JOBS\_7 and JOBS\_9 fail as profile.url in job details is being returned as null (Eugene Koifman via gates)  
HIVE-6644 document TestStreaming\_2 e2e test case for webhcat for branch 0.13  
HIVE-6606 : Stand alone metastore fails to start if new transaction values not defined in config (Alan Gates via Ashutosh Chauhan)  
HIVE-6349 : Column name map is broken (reviewed by Remus, Sergey)  
HIVE-6646 : Error in txn handler SQL (Alan Gates via Ashutosh Chauhan)  
HIVE-6682 : nonstaged mapjoin table memory check may be broken (Sergey Shelukhin, reviewed by Navis)  
HIVE-6702: TezMergedLogicalInput needs to inform the framework when it is ready (Siddharth Seth via Gunther Hagleitner)  
HIVE-6455 : Scalable dynamic partitioning and bucketing optimization (Prasanth J via Vikram Dixit)  
HIVE-6716: ORC struct throws NPE for tables with inner structs having null values (Prasanth J via Gunther Hagleitner)  
HIVE-6706: Tez queries fail when there are no input paths (Gunther Hagleitner, reviewed by Vikram Dixit K)

HIVE-6700: In some queries inputs are closed on Tez before the operator pipeline is flushed (Gunther Hagleitner, reviewed by Vikram Dixit K and Siddharth Seth)  
HIVE-6635 : Heartbeats are not being sent when DbLockMgr is used and an operation holds locks (Alan Gates via Ashutosh Chauhan)  
HIVE-6711 : ORC maps uses getMapSize() from MapOI which is unreliable (Prasanth J via Vikram Dixit, reviewed by Gunther)  
HIVE-6707 : Lazy maps are broken (LazyMap and LazyBinaryMap) (Prasanth J via Vikram Dixit, reviewed by Gunther)  
HIVE-6687 : JDBC ResultSet fails to get value by qualified projection name (Laljo John Pullokkaran via Ashutosh Chauhan)  
HIVE-6222 Make Vector Group By operator abandon grouping if too many distinct keys (Remus Rusanu)  
HIVE-6704 : date\_add()/date\_sub()/datediff() fail with NPE with null input (Jason Dere via Ashutosh Chauhan)  
HIVE-6672 : JARs loaded by permanent functions don't work properly with HiveServer2 (Jason Dere via Ashutosh Chauhan)  
HIVE-3969 : Session state for hive server should be cleaned-up (Navis via Ashutosh Chauhan)  
HIVE-6673 : sql std auth - show grant statement for all principals throws NPE (Thejas Nair via Ashutosh Chauhan)  
HIVE-6472: JDBC cancel will not work with current HiveServer2 (Vaibhav Gumashta via Prasad Mujumdar)  
HIVE-6650 : hive.optimize.index.filter breaks non-index where with HBaseStorageHandler (Nick Dimiduk via Ashutosh Chauhan)  
HIVE-4293 : Predicates following UDTF operator are removed by PPD (Navis via Harish Butani)  
HIVE-6723 : Tez golden files need to be updated (Ashutosh Chauhan via Vikram Dixit)  
HIVE-6625: HiveServer2 running in http mode should support trusted proxy access (Vaibhav Gumashta via Prasad Mujumdar)  
HIVE-6689 : Provide an option to not display partition columns separately in describe table output (Ashutosh Chauhan via Jason Dere)  
HIVE-6580 : Refactor ThriftBinaryCLIService and ThriftHttpCLIService tests. (Vaibhav Gumashta via Ashutosh Chauhan)  
HIVE-6681 : Describe table sometimes shows from deserializer for column comments (Ashutosh Chauhan via Gunther Hagleitner)  
HIVE-6668 When auto join convert is on and noconditionaltask is off, ConditionalResolverCommonJoin fails to resolve map joins. (Navis Ryu via Harish Butani)  
HIVE-6488 : Investigate TestBeeLineWithArgs (Jason Dere via Ashutosh Chauhan)  
HIVE-6645 : to\_date()/to\_unix\_timestamp() fail with NPE if input is null (Jason Dere via Ashutosh Chauhan)

HIVE-6613: Control when spcific Inputs / Outputs are started (Siddharth Seth via Gunther Hagleitner)  
HIVE-6688 : Fix groupby\_* qfile failures in hadoop-2 (Jason Dere via Ashutosh Chauhan)  
HIVE-6690 : NPE in tez session state (Sergey Shelukhin, reviewed by Gunther Hagleitner)  
HIVE-6658 : Modify Alter\_numbuckets* test to reflect hadoop2 changes(Laljo John Pullokkaran via Jason Dere)  
HIVE-6660: HiveServer2 running in non-http mode closes server socket for an SSL connection after the 1st request (Prasad Mujumdar, reviewed by Thejas Nair and Vaibhav Gumashta)  
HIVE-6639. Vectorization: Partition column names are not picked up. (reviewed by Vikram)  
HIVE-6641 : optimized HashMap keys won't work correctly with decimals (Sergey Shelukhin, reviewed by Gunther Hagleitner)  
HIVE-6562: Protection from exceptions in ORC predicate evaluation (Prasanth J, reviewed by Sergey Shelukhin)  
HIVE-6656 : Bug in ORC Timestamp reader returns wrong nanoseconds (Prasanth J, reviewed by Owen O'Malley)  
HIVE-6666 : Metastore init scripts should always populate the version information at the end (Prasad Mujumdar via Ashutosh Chauhan)  
HIVE-6680. Decimal128#update(Decimal128 o, short scale) should adjust the unscaled value. (jitendra, reviewed by Remus Rusanu)  
HIVE-6664. Vectorized variance computation differs from row mode computation. (jitendra, reviewed by Eric Hanson)  
HIVE-6649: Vectorization: some date expressions throw exception. (jitendra, reviewed by Eric Hanson)  
HIVE-6578 : Use ORC file footer statistics through StatsProvidingRecordReader interface for analyze command (Prasanth J, reviewed by Sergey Shelukhin)

HIVE-6518: Add a GC canary to the VectorGroupByOperator to flush whenever a GC is triggered. (Gopal V via jitendra, reviewed by Remus, Gunther)  
HIVE-4764 : Support Kerberos HTTP authentication for HiveServer2 running in http mode (Vaibhav Gumashta via Thejas Nair)  
HIVE-6659 : Update log for list\_bucket\_* to add pre/post DB (Laljo John Pullokkaran via Ashutosh Chauhan)  
HIVE-6012: restore backward compatibility of arithmetic operations (reviewed by Gunther/Sergey)  
HIVE-6610 : Unit test log needs to reflect DB Name (Laljo John Pullokkaran via Ashutosh Chauhan)

HIVE-6640 Change hive.version.shortname in hive 0.13 branch to '0.13.0' (reviewd by Jason Dere)  
HIVE-6607 : describe extended on a view fails with NPE (Eugene Koifman via Ashutosh Chauhan)  
HIVE-6392 : Hive (and HCatalog) don't allow super-users to add partitions to tables. (Mithun Radhakrishnan via Thejas Nair)

HIVE-6647 : Bump the thrift api version to V7 for HiveServer2 (Prasad Mujumdar via Thejas Nair)  
HIVE-6629 : Change SET ROLE NONE to SET ROLE ALL (Brock Noland via Thejas Nair)  
HIVE-6312 : doAs with plain sasl auth should be session aware (Navis via Thejas Nair)  
HIVE-6636 : /user/hive is a bad default for HDFS jars path for Tez (Sergey Shelukhin, reviewed by Gunther Hagleitner)  
HIVE-6576 : sending user.name as a form parameter in POST doesn't work post HADOOP-10193 (Eugene Koifman via Thejas Nair)  
HIVE-6567 : "show grant ... on all" fails with NPE (Thejas Nair, reviewed by Ashutosh Chauhan)  
HIVE-6434 : Restrict function create/drop to admin roles (Jason Dere via Thejas Nair)  
HIVE-6110 : schematool errors out when HIVE\_OPTS is set (Venki Korukanti via Ashutosh Chauhan)  
HIVE-6630 : FS based stats collection have issues for list bucketing case (Ashutosh Chauhan via Gunther Hagleitner)  
HIVE-6609 : Doing Ctrl-C on hive cli doesn't kill running MR jobs on hadoop-2 (Ashutosh Chauhan via Jason Dere)

HIVE-6611: Joining multiple union all outputs fails on Tez (Gunther Hagleitner, reviewed by Vikram Dixit K)  
HIVE-6563: hdfs jar being pulled in when creating a hadoop-2 based hive tar ball (Vikram Dixit, reviewed by Harish Butani)

HIVE-6618 : assertion when getting reference key from loader with byte-array mapjoin key (Sergey Shelukhin, reviewed by Gunther Hagleitner)

HIVE-6457: Ensure Parquet integration has good error messages for data types not supported (Brock via Xuefu)  
HIVE-6575: select * fails on parquet table with map datatype (Szehon via Xuefu)  
HIVE-6514 : TestExecDriver/HCat Pig tests fails with -Phadoop-2 (Jason Dere via Ashutosh Chauhan)

HIVE-6572 : Use shimmed version of hadoop conf names for mapred.{min,max}.split.size{.*} (Sushanth Sowmyan via Ashutosh Chauhan)  
HIVE-6568: Vectorized cast of decimal to string and timestamp produces incorrect result (jitendra reviewed by Eric Hanson)  
HIVE-6495 : TableDesc.getDeserializer() should use correct classloader when calling Class.forName() (Jason Dere via Ashutosh Chauhan)  
HIVE-6507 : OrcFile table property names are specified as strings (Sushanth Sowmyan via Thejas Nair)  
HIVE-5099 : Some partition publish operation cause OOM in metastore backed by SQL Server (Daniel Dai via Thejas Nair)  
HIVE-6512 : HiveServer2 ThriftCLIServiceTest#testDoAs is an invalid test (Vaibhav Gumashta via Thejas Nair)  
HIVE-5155 : Support secure proxy user access to HiveServer2 (Prasad Mujumdar via Thejas Nair)  
HIVE-5931 : SQL std auth - add metastore get\_principals\_in\_role api, support SHOW PRINCIPALS role\_name (Thejas Nair via Ashutosh Chauhan)  
HIVE-6558 : HiveServer2 Plain SASL authentication broken after hadoop 2.3 upgrade (Prasad Mujumdar via Ashutosh Chauhan)  
HIVE-6559 : sourcing txn-script from schema script results in failure for mysql & oracle (Alan Gates via Ashutosh Chauhan)  
HIVE-6594: UnsignedInt128 addition does not increase internal int array count resulting in corrupted values during serialization (Remus Rusanu)  
HIVE-6605 : Hive does not set the environment correctly when running in Tez mode (Sergey Shelukhin, reviewed by Gunther Hagleitner and Siddharth Seth)  
HIVE-6587 : allow specifying additional Hive classpath for Hadoop (Sergey Shelukhin, reviewed by Gunther Hagleitner)  
HIVE-6608 add apache pom as parent pom (reviewed by Brock)  
HIVE-6591 : Importing a table containing hidden dirs fails (Ashutosh Chauhan via Vikram Dixit)  
HIVE-6585 : bucket map join fails in presence of \_SUCCESS file (Ashutosh Chauhan via Vikram Dixit)

HIVE-6414: ParquetInputFormat provides data values that do not match the object inspectors (Justin Coffey via Xuefu)  
HIVE-6486 : Support secure Subject.doAs() in HiveServer2 JDBC client. (Shivaraju Gowda via Thejas Nair)  
HIVE-6574: Type in ql/pom.xml prevents jobs from parquet queries from running on a cluster (reviewed by Brock)  
HIVE-6551 : group by after join with skew join optimization references invalid task sometimes (Navis via Ashutosh Chauhan)  
HIVE-6359 : beeline -f fails on scripts with tabs in them. (Navis, reviewed by Xuefu Zhang, Thejas Nair)  
HIVE-6531 : Runtime errors in vectorized execution (jitendra)  
HIVE-6511: Casting from decimal to tinyint,smallint, int and bigint generates different result when vectorization is on (jitendra)  
HIVE-6573 : Oracle metastore doesnt come up when hive.cluster.delegation.token.store.class is set to DBTokenStore (Ashutosh Chauhan via Thejas Nair)  
HIVE-6508 : Mismatched aggregation results between vector and non-vector mode with decimal field (Remus Rusanu via jitendra)  
HIVE-5901 : Query cancel should stop running MR tasks (Navis via Thejas Nair)  
HIVE-6403 uncorrelated subquery is failing with auto.convert.join=true (Navis via Harish Butani)  
HIVE-6566: Incorrect union-all plan with map-joins on Tez (Gunther Hagleitner, reviewed by Sergey Shelukhin)  
HIVE-6417 : sql std auth - new users in admin role config should get added (Ashutosh Chauhan via Thejas Nair)  
HIVE-6555 : Fix metastore version in mysql script(Ashutosh Chauhan via Prasad Mujumdar)  
HIVE-6537 NullPointerException when loading hashtable for MapJoin directly (Sergey Shelukhin and Navis, reviewed by Gunther Hagleitner)  
HIVE-6548 : Missing owner name and type fields in schema script for DBS table (Ashutosh Chauhan via Thejas Nair)  
HIVE-6325: Enable using multiple concurrent sessions in tez (Vikram Dixit, reviewed by Gunther Hagleitner)

 

 

