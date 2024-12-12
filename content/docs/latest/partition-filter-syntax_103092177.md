---
title: "Apache Hive : Partition Filter Syntax"
date: 2024-12-12
---









# Apache Hive : Partition Filter Syntax






Example: for a table having partition keys `country` and `state`, one could construct the following filter:

`country = "USA" AND (state = "CA" OR state = "AZ")`

In particular notice that it is possible to nest sub-expressions within parentheses.

The following operators are supported when constructing filters for partition columns (derived from [HIVE-1862](https://jira.apache.org/jira/browse/HIVE-1862)):

* `=`
* `<`
* `<=`
* `>`
* `>=`
* `<>`
* `AND`
* `OR`
* `LIKE` (on keys of type `string` only, supports literal string template with '.`*'` wildcard)



 

 

