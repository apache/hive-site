---
title: "Apache Hive : TipsForAddingNewTests"
date: 2024-12-12
---

# Apache Hive : TipsForAddingNewTests

# Tips for Adding New Tests in Hive

Following are a few rules of thumb that should be followed when adding new test cases in Hive that require the introduction of new query file(s). Of course, these rules should not be applied if they invalidate the purpose of your test to begin with. These are generally helpful in keeping the test queries concise, minimizing the redundancies where possible, and ensuring that cascading failures due to a single test failure do not occur.

* Instead of creating your own data file for loading into a new table, use existing data from staged tables like `src`.
* If your test requires a `SELECT` query, keep it as simple as possible, and minimize the number of queries to keep overall test time down; avoid repeating scenarios which are already covered by existing tests.
* When you do need to use a `SELECT` statement, make sure you use the `ORDER BY` clause to minimize the chances of spurious diffs due to output order differences leading to test failures.
* Limit your test to one table unless you require multiple tables specifically.
* Start the query specification with an explicit `DROP TABLE` directive to make sure that any upstream test failures that could not clean up do not cause your test to fail.
* End the query specification with explicit `DROP TABLE` directive to drop the table(s) you may have created during the course of the test.
* Make sure that you name your query file appropriately with a descriptive name.

[Adding new unit tests]({{< ref "#adding-new-unit-tests" >}}) describes how to create positive and negative client tests and their output files.

 

 

