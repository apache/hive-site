---
title: "Apache Hive : Committed jiras for 1.2.1"
date: 2024-12-12
---

# Apache Hive : Committed jiras for 1.2.1

# List of JIRAs committed in branch-1.2 for 1.2.1

This is a list of jiras that were initially intended for 1.2.1, but were not finished in time for 1.2.1. They might be included in 1.2.2 if they satisfy rules for inclusion into 1.2.2 (See parent page on Hive 1.2 Release Status), but otherwise, should be tracked for 1.3 onwards.

 

| Category | JIRA | Current Status in branch-1.2 | Committerrequesting inclusion |
| --- | --- | --- | --- |
| Tez | 
[HIVE-10551](https://issues.apache.org/jira/browse/HIVE-10551?src=confmacro)
 -
 OOM when running query\_89 with vectorization on & hybridgrace=false
Resolved
 | open | sseth |
| QL | 
[HIVE-10566](https://issues.apache.org/jira/browse/HIVE-10566?src=confmacro)
 -
 LLAP: Vector row extraction allocates new extractors per process method call instead of just once
Resolved
 | open | mmccline |
| Hive with TDE | 
[HIVE-10978](https://issues.apache.org/jira/browse/HIVE-10978?src=confmacro)
 -
 Document fs.trash.interval wrt Hive and HDFS Encryption
Open
 | No source code changes butshould be in rel notes |  |
| QL | 
[HIVE-11028](https://issues.apache.org/jira/browse/HIVE-11028?src=confmacro)
 -
 Tez: table self join and join with another table fails with IndexOutOfBoundsException
Closed
 | committed in 1.2.2/1.3 | jdere |

# List of JIRAs committed in branch-1.2 for 1.2.1

This is to be a list of jiras that were initially intended for 1.2, but cannot be finished in time for 1.2.0, and are not blockers/outages but desired in 1.2 nonetheless. They are currently being considered for 1.2.1.

In general, now that 1.2.0 has been voted on and in the process of releasing, committers may add more jiras to this list and commit patches to branch-1.2 again, pursuant to the following rules:

1. Restriction : No commits that introduce any major features, any public API changes or metastore table changes on branch-1.2.
2. To commit to branch-1.2, the patch must have already been committed to master, and passed tests there, unless the jira is specific to branch-1.2, in which case, please cc the release manager as a watcher on the jira, and make a comment there tagging them.
3. It should have been added to this list

 

| Category | JIRA | Current Status in branch-1.2 | Committerrequesting inclusion |
| --- | --- | --- | --- |
| Tez | 
[HIVE-10559](https://issues.apache.org/jira/browse/HIVE-10559?src=confmacro)
 -
 IndexOutOfBoundsException with RemoveDynamicPruningBySize
Closed
 | committed | hagleitn |
| QL | 
[HIVE-10565](https://issues.apache.org/jira/browse/HIVE-10565?src=confmacro)
 -
 LLAP: Native Vector Map Join doesn't handle filtering and matching on LEFT OUTER JOIN repeated key correctly
Closed
 | committed | hagleitn |
| Vectorization | 
[HIVE-10628](https://issues.apache.org/jira/browse/HIVE-10628?src=confmacro)
 -
 Incorrect result when vectorized native mapjoin is enabled using null safe operators <=>
Resolved
 | committed | hagleitn |
| Unit Tests | 

[HIVE-10563](https://issues.apache.org/jira/browse/HIVE-10563?src=confmacro)
 -
 MiniTezCliDriver tests ordering issues
Resolved

 | committed | hsubramaniyan |
| Optimizer | 
[HIVE-10107](https://issues.apache.org/jira/browse/HIVE-10107?src=confmacro)
 -
 Union All : Vertex missing stats resulting in OOM and in-efficient plans
Resolved
 | committed | mmokhtar |
| Build | 
[HIVE-10675](https://issues.apache.org/jira/browse/HIVE-10675?src=confmacro)
 -
 Provide option to skip Accumulo related Hive tests in itests directory
Resolved
 | committed | hsubramaniyan |
| Schematool | 
[HIVE-10659](https://issues.apache.org/jira/browse/HIVE-10659?src=confmacro)
 -
 Beeline command which contains semi-colon as a non-command terminator will fail
Resolved
 | committed | hsubramaniyan |
| Unit Tests | 
[HIVE-10664](https://issues.apache.org/jira/browse/HIVE-10664?src=confmacro)
 -
 Unit tests run fail in windows because of illegal escape character in file path
Resolved
 | committed | hsubramaniyan |
| Metastore | 
[HIVE-10690](https://issues.apache.org/jira/browse/HIVE-10690?src=confmacro)
 -
 ArrayIndexOutOfBounds exception in MetaStoreDirectSql.aggrColStatsForPartitions()
Resolved
 | committed | vgumashta |
| SerDe | 
[HIVE-10672](https://issues.apache.org/jira/browse/HIVE-10672?src=confmacro)
 -
 Analyze command on a table using row format serde JsonSerDe fails with NoClassDefFoundError
Resolved
 | committed | jdere |
| UnitTests | 
[HIVE-10696](https://issues.apache.org/jira/browse/HIVE-10696?src=confmacro)
 -
 TestAddResource tests are non-portable
Resolved
 | committed | hsubramaniyan |
| ACID | 
[HIVE-11006](https://issues.apache.org/jira/browse/HIVE-11006?src=confmacro)
 -
 improve logging wrt ACID module
Closed
 | Committed to master, branch-1.2,branch-1 | ekoifman |
| SQL | 
[HIVE-10776](https://issues.apache.org/jira/browse/HIVE-10776?src=confmacro)
 -
 Schema on insert for bucketed tables throwing NullPointerException
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| SQL | 
[HIVE-10828](https://issues.apache.org/jira/browse/HIVE-10828?src=confmacro)
 -
 Insert with schema and dynamic partitions NullPointerException
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| SQL | 
[HIVE-10934](https://issues.apache.org/jira/browse/HIVE-10934?src=confmacro)
 -
 Restore support for DROP PARTITION PURGE
Resolved
 | Committed | ekoifman |
| Hive with TDE | 
[HIVE-10910](https://issues.apache.org/jira/browse/HIVE-10910?src=confmacro)
 -
 Alter table drop partition queries in encrypted zone failing to remove data from HDFS
Resolved
 | Committed | ekoifman |
| Hive with TDE | 
[HIVE-10630](https://issues.apache.org/jira/browse/HIVE-10630?src=confmacro)
 -
 Renaming tables across encryption zones renames table even though the operation throws error
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| Hive with TDE | 
[HIVE-10629](https://issues.apache.org/jira/browse/HIVE-10629?src=confmacro)
 -
 Dropping table in an encrypted zone does not drop warehouse directory
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| Hive with TDE | 
[HIVE-10658](https://issues.apache.org/jira/browse/HIVE-10658?src=confmacro)
 -
 Insert with values clause may expose data that should be encrypted
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| Hive with TDE | 
[HIVE-10747](https://issues.apache.org/jira/browse/HIVE-10747?src=confmacro)
 -
 Enable the cleanup of side effect for the Encryption related qfile test
Resolved
 | Committed to 1.3.0,1.2.1 | fred |
| WebHCat | 
[HIVE-10858](https://issues.apache.org/jira/browse/HIVE-10858?src=confmacro)
 -
 WebHCat specific resources should be added to HADOOP\_CLASSPATH first
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| WebHCat | 
[HIVE-10605](https://issues.apache.org/jira/browse/HIVE-10605?src=confmacro)
 -
 Make hive version number update automatically in webhcat-default.xml during hive tar generation
Resolved
 | Committed to 1.3.0,1.2.1 | ekoifman |
| WebHCat | 
[HIVE-10992](https://issues.apache.org/jira/browse/HIVE-10992?src=confmacro)
 -
 WebHCat should not create delegation tokens when Kerberos is not enabled
Resolved
 | Committed 1.2.1,master,branch-1 | ekoifman |
| QL | 
[HIVE-10704](https://issues.apache.org/jira/browse/HIVE-10704?src=confmacro)
 -
 Errors in Tez HashTableLoader when estimated table size is 0
Resolved
 | committed | jdere |
| QL | 
[HIVE-10711](https://issues.apache.org/jira/browse/HIVE-10711?src=confmacro)
 -
 Tez HashTableLoader attempts to allocate more memory than available when HIVECONVERTJOINNOCONDITIONALTASKTHRESHOLD exceeds process max mem
Resolved
 | committed | jdere |
| Query Planning | 
[HIVE-10327](https://issues.apache.org/jira/browse/HIVE-10327?src=confmacro)
 -
 Remove ExprNodeNullDesc
Closed
 | committed | ashutoshc |
| Query Planning | 
[HIVE-10636](https://issues.apache.org/jira/browse/HIVE-10636?src=confmacro)
 -
 CASE comparison operator rotation optimization
Closed
 | committed | ashutoshc |
| QL | 
[HIVE-10606](https://issues.apache.org/jira/browse/HIVE-10606?src=confmacro)
 -
 Divide by zero error in HybridHashTableContainer
Resolved
 | committed | jdere |
| SerDe | 
[HIVE-10679](https://issues.apache.org/jira/browse/HIVE-10679?src=confmacro)
 -
 JsonSerde ignores varchar and char size limit specified during table creation
Resolved
 | committed | jdere |
| Export/Import | 
[HIVE-10727](https://issues.apache.org/jira/browse/HIVE-10727?src=confmacro)
 -
 Import throws error message "org.apache.thrift.protocol.TProtocolException: Required field 'filesAdded' is unset!"
Resolved
 | committed | sushanth |
| HS2 | 
[HIVE-10528](https://issues.apache.org/jira/browse/HIVE-10528?src=confmacro)
 -
 Hiveserver2 in HTTP mode is not applying auth\_to\_local rules
Resolved
 | committed | vgumashta |
| Query Planning | 

[HIVE-10627](https://issues.apache.org/jira/browse/HIVE-10627?src=confmacro)
 -
 Queries fail with Failed to breakup Windowing invocations into Groups
Resolved

 | committed | jpullokk |
| Query Planning | 
[HIVE-10686](https://issues.apache.org/jira/browse/HIVE-10686?src=confmacro)
 -
 java.lang.IndexOutOfBoundsException for query with rank() over(partition ...)
Resolved
 | committed | jpullokk |
| Tests | 
[HIVE-10724](https://issues.apache.org/jira/browse/HIVE-10724?src=confmacro)
 -
 WebHCat e2e test TestStreaming\_5 fails on Windows
Resolved
 | committed | sushanth |
| WebHCat | 
[HIVE-10760](https://issues.apache.org/jira/browse/HIVE-10760?src=confmacro)
 -
 Templeton: HCatalog Get Column for Non-existent column returns Server Error (500) rather than Not Found(404)
Resolved
 | committed | sushanth |
| QL | 
[HIVE-10829](https://issues.apache.org/jira/browse/HIVE-10829?src=confmacro)
 -
 ATS hook fails for explainTask
Resolved
 | committed | hagleitn |
| HiveServer2 | 
[HIVE-9842](https://issues.apache.org/jira/browse/HIVE-9842?src=confmacro)
 -
 Enable session/operation timeout by default in HiveServer2
Resolved
 | committed | vgumashta |
| ATS | 
[HIVE-10829](https://issues.apache.org/jira/browse/HIVE-10829?src=confmacro)
 -
 ATS hook fails for explainTask
Resolved
 | committed | hagleitn |
| Stats | 
[HIVE-10840](https://issues.apache.org/jira/browse/HIVE-10840?src=confmacro)
 -
 NumberFormatException while running analyze table partition compute statics query
Resolved
 | committed | hagleitn |
| Tests | 
[HIVE-10839](https://issues.apache.org/jira/browse/HIVE-10839?src=confmacro)
 -
 TestHCatLoaderEncryption.* tests fail in windows because of path related issues
Resolved
 | committed | hsubramaniyan |
| Beeline | 
[HIVE-10753](https://issues.apache.org/jira/browse/HIVE-10753?src=confmacro)
 -
 hs2 jdbc url - wrong connection string cause error on beeline/jdbc/odbc client, misleading message
Resolved
 | committed | hsubramaniyan |
| Test Framework | 
[HIVE-10768](https://issues.apache.org/jira/browse/HIVE-10768?src=confmacro)
 -
 In QTestGenTask.execute() we should not throw an exception right away if we are unable to clean any old files
Resolved
 | committed | hsubramaniyan |
| Metastore | 
[HIVE-10801](https://issues.apache.org/jira/browse/HIVE-10801?src=confmacro)
 -
 'drop view' fails throwing java.lang.NullPointerException
Resolved
 | committed | hsubramaniyan |
| Authorization | 
[HIVE-10678](https://issues.apache.org/jira/browse/HIVE-10678?src=confmacro)
 -
 update sql standard authorization configuration whitelist - more optimization flags
Resolved
 | committed | thejas |
| Authorization | 
[HIVE-10843](https://issues.apache.org/jira/browse/HIVE-10843?src=confmacro)
 -
 desc database and show tables commands don't pass db to HiveAuthorizer check
Resolved
 | committed | thejas |
| Authorization | 
[HIVE-10689](https://issues.apache.org/jira/browse/HIVE-10689?src=confmacro)
 -
 HS2 metadata api calls should use HiveAuthorizer interface for authorization
Resolved
 | committed | thejas |
| Vectorization | 
[HIVE-10244](https://issues.apache.org/jira/browse/HIVE-10244?src=confmacro)
 -
 Vectorization : TPC-DS Q80 fails with java.lang.ClassCastException when hive.vectorized.execution.reduce.enabled is enabled
Resolved
 | committed | hagleitn |
| Test | 
[HIVE-10862](https://issues.apache.org/jira/browse/HIVE-10862?src=confmacro)
 -
 TestHiveAuthorizerShowFilters tests fail when run in sequence
Resolved
 | committed | thejas |
| Authorization | 
[HIVE-9828](https://issues.apache.org/jira/browse/HIVE-9828?src=confmacro)
 -
 Semantic analyzer does not capture view parent entity for tables referred in view with union all 
Resolved
 | committed | thejas |
| Authorization | 
[HIVE-10875](https://issues.apache.org/jira/browse/HIVE-10875?src=confmacro)
 -
 Select query with view in subquery adds underlying table as direct input
Resolved
 | committed | thejas |
| Tests | 
[HIVE-10892](https://issues.apache.org/jira/browse/HIVE-10892?src=confmacro)
 -
 TestHCatClient should not accept external metastore param from -Dhive.metastore.uris
Resolved
 | committed | sushanth |
| Tests | 
[HIVE-10919](https://issues.apache.org/jira/browse/HIVE-10919?src=confmacro)
 -
 Windows: create table with JsonSerDe failed via beeline unless you add hcatalog core jar to classpath
Closed
 | committed | hsubramaniyan |
| Tests | 
[HIVE-10887](https://issues.apache.org/jira/browse/HIVE-10887?src=confmacro)
 -
 TestCliDriver tests ordering issues with Mac and CentOS
Closed
 | committed | hsubramaniyan |
| Tests | 
[HIVE-10705](https://issues.apache.org/jira/browse/HIVE-10705?src=confmacro)
 -
 Update tests for HIVE-9302 after removing binaries
Closed
 | committed | hsubramaniyan |
| Metastore | 
[HIVE-10925](https://issues.apache.org/jira/browse/HIVE-10925?src=confmacro)
 -
 Non-static threadlocals in metastore code can potentially cause memory leak
Resolved
 | committed | vgumashta |
| Hiveserver2 | 
[HIVE-10922](https://issues.apache.org/jira/browse/HIVE-10922?src=confmacro)
 -
 In HS2 doAs=false mode, file system related errors in one query causes other failures
Resolved
 | committed | thejas |
| Tests | 
[HIVE-10877](https://issues.apache.org/jira/browse/HIVE-10877?src=confmacro)
 -
 TestUtil class name confuses ptest2
Resolved
 | committed | hsubramaniyan |
| Tez/HiveServer2 | 
[HIVE-10736](https://issues.apache.org/jira/browse/HIVE-10736?src=confmacro)
 -
 HiveServer2 shutdown of cached tez app-masters is not clean
Closed
 | committed | Vikram |
| UDF/HiveServer2 | 
[HIVE-10453](https://issues.apache.org/jira/browse/HIVE-10453?src=confmacro)
 -
 HS2 leaking open file descriptors when using UDFs
Closed
 | committed | vgumashta |
| Tez | 
[HIVE-10929](https://issues.apache.org/jira/browse/HIVE-10929?src=confmacro)
 -
 In Tez mode,dynamic partitioning query with union all fails at moveTask,Invalid partition key & values
Closed
 | committed | vgumashta |
| Accumulo | 
[HIVE-10857](https://issues.apache.org/jira/browse/HIVE-10857?src=confmacro)
 -
 Accumulo storage handler fail throwing java.lang.IllegalArgumentException: Cannot determine SASL mechanism for token class: class org.apache.accumulo.core.client.security.tokens.PasswordToken
Resolved
 | committed | sushanth |
| QueryPlan | 
[HIVE-10957](https://issues.apache.org/jira/browse/HIVE-10957?src=confmacro)
 -
 QueryPlan's start time is incorrect in certain cases
Resolved
 | committed | thejas |
| Authorization | 
[HIVE-10967](https://issues.apache.org/jira/browse/HIVE-10967?src=confmacro)
 -
 add mapreduce.job.tags to sql std authorization config whitelist
Resolved
 | committed | thejas |
| encryption | 
[HIVE-10910](https://issues.apache.org/jira/browse/HIVE-10910?src=confmacro)
 -
 Alter table drop partition queries in encrypted zone failing to remove data from HDFS
Resolved
 | committed | eugene/thejas |
| Tests | 
[HIVE-10949](https://issues.apache.org/jira/browse/HIVE-10949?src=confmacro)
 -
 Disable hive-minikdc tests in Windows
Closed
 | committed | hsubramaniyan |
| Hiveserver2 | 
[HIVE-10968](https://issues.apache.org/jira/browse/HIVE-10968?src=confmacro)
 -
 Windows: analyze json table via beeline failed throwing Class org.apache.hive.hcatalog.data.JsonSerDe not found
Closed
 | committed | hsubramaniyan |
| Query Planning | 
[HIVE-10874](https://issues.apache.org/jira/browse/HIVE-10874?src=confmacro)
 -
 Fail in TestMinimrCliDriver.testCliDriver\_ql\_rewrite\_gbtoidx\_cbo\_2.q due to duplicate column name
Resolved
 | committed | jpullokk |
| Query Planning | 

[HIVE-10811](https://issues.apache.org/jira/browse/HIVE-10811?src=confmacro)
 -
 RelFieldTrimmer throws NoSuchElementException in some cases
Resolved

 | committed | jpullokk |
| HS2 HTTP mode | 
[HIVE-11001](https://issues.apache.org/jira/browse/HIVE-11001?src=confmacro)
 -
 HS2 http cookie mode does not honor doAs url parameter
Resolved
 | committed | thejas |
| ORC | 
[HIVE-10685](https://issues.apache.org/jira/browse/HIVE-10685?src=confmacro)
 -
 Alter table concatenate oparetor will cause duplicate data
Resolved
 | committed | prasanthj |
| Release | 
[HIVE-10684](https://issues.apache.org/jira/browse/HIVE-10684?src=confmacro)
 -
 Fix the unit test failures for HIVE-7553 after HIVE-10674 removed the binary jar files
Resolved
 | committed | sushanth |
| Metastore | 
[HIVE-11023](https://issues.apache.org/jira/browse/HIVE-11023?src=confmacro)
 -
 Disable directSQL if datanucleus.identifierFactory = datanucleus2
Resolved
 | committed | sushanth |
| Release | 
[HIVE-10674](https://issues.apache.org/jira/browse/HIVE-10674?src=confmacro)
 -
 jars should not be checked in to the source control repo
Resolved
 | resolved | sushanth |
| Release | 
[HIVE-11047](https://issues.apache.org/jira/browse/HIVE-11047?src=confmacro)
 -
 Update versions of branch-1.2 to 1.2.1
Resolved
 | committed | sushanth |
| Tests | 
[HIVE-11041](https://issues.apache.org/jira/browse/HIVE-11041?src=confmacro)
 -
 Update tests for HIVE-9302 after removing binaries
Resolved
 | committed | hsubramaniyan |
| Tez | 
[HIVE-10746](https://issues.apache.org/jira/browse/HIVE-10746?src=confmacro)
 -
  Hive 1.2.0+Tez produces 1-byte FileSplits from mapred.TextInputFormat
Closed
 | committed | hagleitn |
| Tests | 
[HIVE-11050](https://issues.apache.org/jira/browse/HIVE-11050?src=confmacro)
 -
 testCliDriver\_vector\_outer\_join.* failures in Unit tests due to unstable data creation queries
Resolved
 | committed | mmccline |
| Test | 
[HIVE-11066](https://issues.apache.org/jira/browse/HIVE-11066?src=confmacro)
 -
 Ensure tests don't share directories on FS
Resolved
 | committed | ekoifman |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

 

 

 

 

