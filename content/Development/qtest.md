---
title: "Query File Test(qtest)"
date: 2025-03-28
draft: false
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
| test | The class name of the test driver | `-Dtest=TestMiniLlapLocalCliDriver` |
| qfile | The name(s) of Query Files | `-Dqfile=alter1.q`, `-Dqfile=alter1.q,alter2.q` |
| qfile_regex | The pattern to list Query Files | `-Dqfile_regex=alter[0-9]` |
| test.output.overwrite | Whether you want to (re)generate result files or not | `-Dtest.output.overwrite=true` |
| test.metastore.db | Which RDBMS to be used as a metastore backend | See [How to use PostgreSQL/MySQL/Oracle as a backend database for Hive Metastore](#how-to-use-postgresqlmysqloracle-as-a-backend-database-for-hive-metastore) |

### Test Iceberg, Accumulo, or Kudu

Most test drivers are available in the `itest/qtest` project. However, there are some exceptional ones.

| Driver | Project |
|-|-|
| TestAccumuloCliDriver | itest/qtest-accumulo |
| TestIcebergCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCliDriver | itest/qtest-iceberg |
| TestIcebergLlapLocalCompactorCliDriver | itest/qtest-iceberg |
| TestIcebergNegativeCliDriver | itest/qtest-iceberg |
| TestKuduCliDriver | itest/qtest-kudu |
| TestKuduNegativeCliDriver | itest/qtest-kudu |

When you use `TestIcebergLlapLocalCliDriver`, you have to specify `-pl itest/qtest-iceberg`.

```sh
$ mvn test -Pitests -pl itests/qtest-iceberg -Dtest=TestIcebergLlapLocalCliDriver -Dqfile_regex=iceberg_bucket_map_join_8
```

## QTestOptionHandler: pre/post-processor

We extend JUnit by implementing [QTestOptionHandlers](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/ql/qoption/QTestOptionHandler.java), which are custom pre-processors and post-processors. This section explains a couple of typical processors.

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

### Negative tests

Negative drivers allow us to make sure that a test case fails expectedly. For example, the query in [strict_timestamp_to_numeric.q](https://github.com/apache/hive/blob/master/ql/src/test/queries/clientnegative/strict_timestamp_to_numeric.q) must fail based on Hive’s specifications. We can use `TestNegativeLlapLocalCliDriver`, `TestIcebergNegativeCliDriver`, and so on.

```sh
$ mvn -Pitests -pl itests/qtest test -Dtest=TestNegativeLlapLocalCliDriver -Dqfile=strict_timestamp_to_numeric.q
```

### How to specify drivers

We define the default mapping of Query Files and test drivers using [testconfiguration.properties](https://github.com/apache/hive/blob/master/itests/src/test/resources/testconfiguration.properties) and [CliConfigs](https://github.com/apache/hive/blob/master/itests/util/src/main/java/org/apache/hadoop/hive/cli/control/CliConfigs.java). For example, `TestMiniLlapLocalCliDriver` is the default driver for query files stored in `ql/src/test/queries/clientpositive`. [The hive-precommit Jenkins job](https://ci.hive.apache.org/blue/organizations/jenkins/hive-precommit/activity) also follows the mapping.

You can override the mapping through [testconfiguration.properties](https://github.com/apache/hive/blob/master/itests/src/test/resources/testconfiguration.properties). For example, if you want to test `ql/src/test/queries/clientpositive/aaa.q` not by LLAP but by Tez, you must include the file name in `minitez.query.files` and generate the result file with `-Dtest=TestMiniTezCliDriver`.

In most cases, we should use `TestMiniLlapLocalCliDriver` for positive tests and `TestNegativeLlapLocalCliDriver` for negative tests.

### How to use PostgreSQL/MySQL/Oracle as a backend database for Hive Metastore

To run a test with a specified DB, it is possible by adding the "-Dtest.metastore.db" parameter like in the following commands:

```sh
$ mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=postgres
$ mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=mssql
$ mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=mysql
$ mvn test -Pitests -pl itests/qtest -Dtest=TestCliDriver -Dqfile=partition_params_postgres.q -Dtest.metastore.db=oracle -Ditest.jdbc.jars=/path/to/your/god/damn/oracle/jdbc/driver/ojdbc6.jar
```

### Remote debug

Remote debugging with Query File Test is a potent tool for debugging Hive. With the following command, Query File Test listens to port 5005 and waits for a debugger to be attached.

```sh
$ mvn -Pitests -pl itests/qtest -Dmaven.surefire.debug test -Dtest=TestMiniLlapLocalCliDriver -Dqfile=alter1.q
```

## Tips for Adding New Tests in Hive

Following are a few rules of thumb that should be followed when adding new test cases in Hive that require the introduction of new query file(s). Of course, these rules should not be applied if they invalidate the purpose of your test to begin with. These are generally helpful in keeping the test queries concise, minimizing the redundancies where possible, and ensuring that cascading failures due to a single test failure do not occur.

* Instead of creating your own data file for loading into a new table, use existing data from staged tables like `src`.
* If your test requires a `SELECT` query, keep it as simple as possible, and minimize the number of queries to keep overall test time down; avoid repeating scenarios which are already covered by existing tests.
* When you do need to use a `SELECT` statement, make sure you use the `ORDER BY` clause to minimize the chances of spurious diffs due to output order differences leading to test failures.
* Limit your test to one table unless you require multiple tables specifically.
* Make sure that you name your query file appropriately with a descriptive name.
