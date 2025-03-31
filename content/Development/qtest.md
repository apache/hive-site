---
title: "Query File Test"
date: 2025-03-28
draft: false
aliases: [/qtest.html]
---

<!---
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License. -->

# Query File Test

Query File Test is a JUnit-based integration test suite for Apache Hive. Developers write any SQL; the testing framework runs it and verifies the result and output.

{{< toc >}}

## Tutorial: How to add a new test case

### Preparation

You have to compile Hive's source codes ahead of time.

```sh
$ mvn clean install -Dmaven.javadoc.skip=true -DskipTests -Pitests
```

### Add a QFile

A QFile includes a set of SQL statements that you want to test. Typically, we should put a new file in `ql/src/test/queries/clientpositive`.

Let's say you created the following file.

```sh
$ cat ql/src/test/queries/clientpositive/aaa.q
SELECT 1;
```

### Generate a result file

You can generate the expected output using JUnit.

```sh
$ cd /path/to/hive/itests/qtest
$ mvn test -Dtest=TestMiniLlapLocalCliDriver -Dtest.output.overwrite=true -Dqfile=aaa.q
...
$ cat ql/src/test/results/clientpositive/llap/aaa.q.out
PREHOOK: query: SELECT 1
PREHOOK: type: QUERY
PREHOOK: Input: _dummy_database@_dummy_table
#### A masked pattern was here ####
POSTHOOK: query: SELECT 1
POSTHOOK: type: QUERY
POSTHOOK: Input: _dummy_database@_dummy_table
#### A masked pattern was here ####
1
```

### Verify the result file

You can ensure the generated result file is correct by rerunning the test case without `test.output.overwrite=true`.

```sh
$ mvn test -Dtest=TestMiniLlapLocalCliDriver -Dqfile=aaa.q
```

## Helpful magic comments

### Using test data

Adding `--! qt:dataset:{table name}`, Query File Test automatically sets up a test table. [You can find the table definitions here](https://github.com/apache/hive/tree/master/data/files/datasets).

```sql
--! qt:dataset:src
SELECT * FROM src;
```

### Mask non-deterministic outputs

Some test cases might generate non-deterministic results. You can mask the non-deterministic part using a special comment prefixed with `--! qt:replace:`.

For example, the result of `CURRENT_DATE` changes every day. Using the comment, the output will be `non-deterministic-output #Masked#` , which is stable.

```sql
--! qt:replace:/(non-deterministic-output\s)[0-9]{4}-[0-9]{2}-[0-9]{2}/$1#Masked#/
SELECT 'non-deterministic-output', CURRENT_DATE();
```

## Commandline options

### Run multiple test cases

We sometimes want to run multiple test cases in parallel. The `qfile_regex` option helps query relevant test cases using a regular expression.

For example, if you wanted to regenerate the result files of `alter1.q`, `alter2.q`, and so on, you would trigger the following command.

```sh
$ mvn test -Dtest=TestMiniLlapLocalCliDriver -Dtest.output.overwrite=true -Dqfile_regex=alter[0-9]
```

### Test Iceberg, Accumulo, or Kudu

Most test drivers are available in the `itest/qtest` directory. However, you must be in a different directory when using the following drivers.

| Driver | Directory |
|-|-|
| TestAccumuloCliDriver | itest/qtest-accumulo |
| TestIcebergCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCompactorCliDriver | itest/qtest-iceberg |
| TestIcebergNegativeCliDriver | itest/qtest-iceberg |
| TestKuduCliDriver | itest/qtest-kudu |
| TestKuduNegativeCliDriver | itest/qtest-kudu |

If you use TestIcebergLlapLocalCliDriver, you have to go to `itest/qtest-iceberg`.

```sh
$ cd itest/qtest-iceberg
$ mvn test -Dtest=TestIcebergLlapLocalCliDriver -Dqfile_regex=iceberg_bucket_map_join_8
```

### How to let Jenkins run specific drivers

[The hive-precommit Jenkins job](https://ci.hive.apache.org/blue/organizations/jenkins/hive-precommit/activity) uses the following drivers for each directory by default.

| Driver | Query File's Location |
|-|-|
| TestMiniLlapLocalCliDriver | ql/src/test/queries/clientpositive |
| TestNegativeLlapLocalCliDriver | ql/src/test/queries/clientnegative |
| TestTezTPCDS30TBPerfCliDriver | ql/src/test/queries/clientpositive/perf |
| TestParseNegativeDriver | ql/src/test/queries/negative |
| TestAccumuloCliDriver | accumulo-handler/src/test/queries/positive |
| TestContribCliDriver | contrib/src/test/queries/clientpositive |
| TestContribNegativeCliDriver | contrib/src/test/queries/clientnegative |
| TestHBaseCliDriver | hbase-handler/src/test/queries/positive |
| TestHBaseNegativeCliDriver | hbase-handler/src/test/queries/negative |
| TestIcebergCliDriver | iceberg/iceberg-handler/src/test/queries/positive |
| TestIcebergNegativeCliDriver | iceberg/iceberg-handler/src/test/queries/negative |
| TestBlobstoreCliDriver | itests/hive-blobstore/src/test/queries/clientpositive |
| TestBlobstoreNegativeCliDriver | itests/hive-blobstore/src/test/queries/clientnegative |
| TestKuduCliDriver | kudu-handler/src/test/queries/positive |
| TestKuduNegativeCliDriver | kudu-handler/src/test/queries/negative |

You can override the mapping through [itests/src/test/resources/testconfiguration.properties](https://github.com/apache/hive/blob/master/itests/src/test/resources/testconfiguration.properties). For example, if you want to test `ql/src/test/queries/clientpositive/aaa.q` not by LLAP but by Tez, you have to include the file name in `minitez.query.files` and generate the result file with `-Dtest=TestMiniLlapLocalCliDriver`.

| Driver | Query File's Location | Property |
|-|-|-|
| TestCliDriver | ql/src/test/queries/clientpositive | mr.query.files |
| TestMinimrCliDriver | ql/src/test/queries/clientpositive | minimr.query.files |
| TestMiniTezCliDriver | ql/src/test/queries/clientpositive | minitez.query.files, minitez.query.files.shared |
| TestMiniLlapCliDriver | ql/src/test/queries/clientpositive | minillap.query.files |
| TestMiniDruidCliDriver | ql/src/test/queries/clientpositive | druid.query.files |
| TestMiniDruidKafkaCliDriver | ql/src/test/queries/clientpositive | druid.kafka.query.files |
| TestMiniHiveKafkaCliDriver | ql/src/test/queries/clientpositive | hive.kafka.query.files |
| TestMiniLlapLocalCompactorCliDriver | ql/src/test/queries/clientpositive | compaction.query.files |
| TestEncryptedHDFSCliDriver | ql/src/test/queries/clientpositive | encrypted.query.files |
| TestBeeLineDriver | ql/src/test/queries/clientpositive | beeline.positive.include, beeline.query.files.shared |
| TestErasureCodingHDFSCliDriver | ql/src/test/queries/clientpositive | erasurecoding.only.query.files |
| MiniDruidLlapLocalCliDriver | ql/src/test/queries/clientpositive | druid.llap.local.query.files |
| TestNegativeLlapCliDriver | ql/src/test/queries/clientnegative | llap.query.negative.files |
| TestIcebergLlapLocalCliDriver | iceberg/iceberg-handler/src/test/queries/positive | iceberg.llap.query.files |
| IcebergLlapLocalCompactorCliConfig | iceberg/iceberg-handler/src/test/queries/positive | iceberg.llap.query.compactor.files |

## Advanced

### Locations of log files

The Query File Test framework outputs log files in the following paths.

- `itests/{qtest, qtest-accumulo, qtest-iceberg, qtest-kudu}/target/surefire-reports`
- From the root of the source tree: `find . -name hive.log`


### How do I run with Postgre/MySQL/Oracle?

To run a test with a specified DB, it is possible by adding the "-Dtest.metastore.db" parameter like in the following commands:

```sh
mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=postgres
mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=mssql
mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=mysql
mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=oracle -Ditest.jdbc.jars=/path/to/your/god/damn/oracle/jdbc/driver/ojdbc6.jar
```

### Remote debug

Remote debugging with Query File Test is a potent tool for debugging Hive. With the following command, Query File Test listens to port 5005 and waits for a debugger to be attached.

```sh
$ mvn -Dmaven.surefire.debug test -Dtest=TestMiniLlapLocalCliDriver -Dqfile=<test>.q
```
