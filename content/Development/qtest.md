---
title: "Query File Test(qtest)"
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

# Query File Test(qtest)

Query File Test is a JUnit-based integration test suite for Apache Hive. Developers write any SQL; the testing framework runs it and verifies the result and output.

{{< toc >}}

## Tutorial: How to run a specific test case

### Preparation

You have to compile Hive's source codes ahead of time.

```sh
$ mvn clean install -Dmaven.javadoc.skip=true -DskipTests -Pitests
```

### Run a test case

Let's try to run [alter1.q](https://github.com/apache/hive/blob/master/ql/src/test/queries/clientpositive/alter1.q).

```sh
$ mvn test -Pitests -pl itests/qtest -Dtest=TestMiniLlapLocalCliDriver -Dqfile=alter1.q
```

The test should successfully finish.

```sh
[INFO] Results:
[INFO]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
```

## Tutorial: How to add a new test case

### Add a QFile

A QFile includes a set of SQL statements that you want to test. Typically, we should put a new file in `ql/src/test/queries/clientpositive`.

Let's say you created the following file.

```sh
$ cat ql/src/test/queries/clientpositive/aaa.q
SELECT 1;
```

### Generate a result file

You can generate the expected output with `-Dtest.output.overwrite=true`.

```sh
$ mvn test -Pitests -pl itests/qtest -Dtest=TestMiniLlapLocalCliDriver -Dtest.output.overwrite=true -Dqfile=aaa.q
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

### Verify the new result file

You can ensure the generated result file is correct by rerunning the test case without `-Dtest.output.overwrite=true`.

```sh
$ mvn test -Pitests -pl itests/qtest -Dtest=TestMiniLlapLocalCliDriver -Dqfile=aaa.q
```

## Commandline options

### Test options

| Option | Description | Example |
|-|-|-|
| qfile | The name(s) of Query Files | `-Dqfile=alter1.q`, `-Dqfile=alter1.q, alter2.q` |
| qfile_regex | The pattern to list Query Files | `-Dqfile_regex=alter[0-9]` |
| test.output.overwrite | Whether you want to (re)generate result files or not | `-Dtest.output.overwrite=true` |
| test.metastore.db | Which RDBMS to be used as a metastore backend | See the following section |

### Test Iceberg, Accumulo, or Kudu

Most test drivers are available in the `itest/qtest` project. However, there are some exceptional cases.

| Driver | Project |
|-|-|
| TestAccumuloCliDriver | itest/qtest-accumulo |
| TestIcebergCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCompactorCliDriver | itest/qtest-iceberg |
| TestIcebergNegativeCliDriver | itest/qtest-iceberg |
| TestKuduCliDriver | itest/qtest-kudu |
| TestKuduNegativeCliDriver | itest/qtest-kudu |

If you use TestIcebergLlapLocalCliDriver, you have to choose `itest/qtest-iceberg`.

```sh
$ mvn test -Pitests -pl itests/qtest-iceberg -Dtest=TestIcebergLlapLocalCliDriver -Dqfile_regex=iceberg_bucket_map_join_8
```

## QTestOptionHandler: pre/post-processor

We extend JUnit by adding [QTestOptionHandlers](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/ql/qoption/QTestOptionHandler.java), which are custom pre-processors and post-processors. This section explains a couple of typical processors.

### Using test data

Adding `--! qt:dataset:{table name}`, [QTestDatasetHandler](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/ql/dataset/QTestDatasetHandler.java) automatically sets up a test table. You can find the table definitions [here](https://github.com/apache/hive/tree/master/data/files/datasets).

```sql
--! qt:dataset:src
SELECT * FROM src;
```

### Mask non-deterministic outputs

Some test cases generate random results. [QTestReplaceHandler](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/ql/qoption/QTestReplaceHandler.java) masks such a non-deterministic part. You can use it with a special comment prefixed with `--! qt:replace:`.

For example, the result of `CURRENT_DATE` changes every day. Using the comment, the output will be `non-deterministic-output #Masked#`, which is stable across executions.

```sql
--! qt:replace:/(non-deterministic-output\s)[0-9]{4}-[0-9]{2}-[0-9]{2}/$1#Masked#/
SELECT 'non-deterministic-output', CURRENT_DATE();
```

## Advanced

### Locations of log files

The Query File Test framework outputs log files in the following paths.

- `itests/{qtest, qtest-accumulo, qtest-iceberg, qtest-kudu}/target/surefire-reports`
- From the root of the source tree: `find . -name hive.log`

### How to specify drivers

We define the default mapping of Query Files and test drivers using [testconfiguration.properties](https://github.com/apache/hive/blob/master/itests/src/test/resources/testconfiguration.properties) and [CliConfigs](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/cli/control/CliConfigs.java). For example, we use TestMiniLlapLocalCliDriver to process Query Files stored in `ql/src/test/queries/clientpositive` by default. [The hive-precommit Jenkins job](https://ci.hive.apache.org/blue/organizations/jenkins/hive-precommit/activity) also follows the definitions.

You can override the mapping through [testconfiguration.properties](https://github.com/apache/hive/blob/master/itests/src/test/resources/testconfiguration.properties). For example, if you want to test `ql/src/test/queries/clientpositive/aaa.q` not by LLAP but by Tez, you must include the file name in `minitez.query.files` and generate the result file with `-Dtest=TestMiniTezCliDriver`.

In most cases, we should use `TestMiniLlapLocalCliDriver` for positive tests and `TestNegativeLlapLocalCliDriver` for negative tests.

### How to use PostgreSQL/MySQL/Oracle as a backend database for Hive Metastore

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
$ mvn -Pitests -pl itests/qtest -Dmaven.surefire.debug test -Dtest=TestMiniLlapLocalCliDriver -Dqfile=<test>.q
```
