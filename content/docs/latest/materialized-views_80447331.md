---

title: "Apache Hive : Materialized views"
date: 2024-12-12
----------------

# Apache Hive : Materialized views

* [Introduction]({{< ref "#introduction" >}})
  + [Objectives]({{< ref "#objectives" >}})
* [Management of materialized views in Hive]({{< ref "#management-of-materialized-views-in-hive" >}})
  + [Materialized views creation]({{< ref "#materialized-views-creation" >}})
  + [Other operations for materialized view management]({{< ref "#other-operations-for-materialized-view-management" >}})
* [Materialized view-based query rewriting]({{< ref "#materialized-view-based-query-rewriting" >}})
  + [Example 1]({{< ref "#example-1" >}})
  + [Example 2]({{< ref "#example-2" >}})
  + [Example 3]({{< ref "#example-3" >}})
* [Materialized view maintenance]({{< ref "#materialized-view-maintenance" >}})
* [Materialized view lifecycle]({{< ref "#materialized-view-lifecycle" >}})
* [Open issues (JIRA)]({{< ref "#open-issues-jira" >}})

Version information

Materialized views support is introduced in Hive 3.0.0.

## Introduction

This page documents the work done for the supporting materialized views in Apache Hive.

### Objectives

Traditionally, one of the most powerful techniques used to accelerate query processing in data warehouses is the pre-computation of relevant summaries or materialized views.

The initial implementation introduced in Apache Hive 3.0.0 focuses on introducing materialized views and automatic query rewriting based on those materializations in the project. In particular, materialized views can be stored natively in Hive or in other systems such as Druid using custom storage handlers, and they can seamlessly exploit new exciting Hive features such as LLAP acceleration. Then the optimizer relies in Apache Calcite to automatically produce full and partial rewritings for a large set of query expressions comprising projections, filters, join, and aggregation operations.

In this document, we provide details about materialized view creation and management in Hive, describe the current coverage of the rewriting algorithm with some examples, and explain how Hive controls important aspects of the life cycle of the materialized views such as the freshness of their data.

## Management of materialized views in Hive

In this section, we present the main operations that are currently present in Hive for materialized views management.

### Materialized views creation

The syntax to create a materialized view in Hive is very similar to the [CTAS statement](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DDL#LanguageManualDDL-CreateTableAsSelect(CTAS)) syntax, supporting common features such as partition columns, custom storage handler, or passing table properties.

```
CREATE MATERIALIZED VIEW [IF NOT EXISTS] [db\_name.]materialized\_view\_name
  [DISABLE REWRITE]
  [COMMENT materialized\_view\_comment]
  [PARTITIONED ON (col\_name, ...)]
  [CLUSTERED ON (col\_name, ...) | DISTRIBUTED ON (col\_name, ...) SORTED ON (col\_name, ...)]
  [
    [ROW FORMAT row\_format]
    [STORED AS file\_format]
      | STORED BY 'storage.handler.class.name' [WITH SERDEPROPERTIES (...)]
  ]
  [LOCATION hdfs\_path]
  [TBLPROPERTIES (property\_name=property\_value, ...)]
AS
<query>;
```

When a materialized view is created, its contents will be automatically populated by the results of executing the query in the statement. The materialized view creation statement is atomic, meaning that the materialized view is not seen by other users until all query results are populated.

By default, materialized views are usable for query rewriting by the optimizer, while the `DISABLE REWRITE` option can be used to alter this behavior at materialized view creation time.

The default values for SerDe and storage format when they are not specified in the materialized view creation statement (they are optional) are specified using the configuration properties `hive.materializedview.serde` and `hive.materializedview.fileformat`, respectively.

Materialized views can be stored in external systems, e.g., [Druid](https://cwiki.apache.org/confluence/display/Hive/Druid+Integration), using custom storage handlers. For instance, the following statement creates a materialized view that is stored in Druid:

**Example:**

```
CREATE MATERIALIZED VIEW druid\_wiki\_mv
STORED AS 'org.apache.hadoop.hive.druid.DruidStorageHandler'
AS
SELECT \_\_time, page, user, c\_added, c\_removed
FROM src;
```

### Other operations for materialized view management

Currently we support the following operations that aid at managing the materialized views in Hive:

```
-- Drops a materialized view
DROP MATERIALIZED VIEW [db\_name.]materialized\_view\_name;
-- Shows materialized views (with optional filters)
SHOW MATERIALIZED VIEWS [IN database\_name] ['identifier\_with\_wildcards’];
-- Shows information about a specific materialized view
DESCRIBE [EXTENDED | FORMATTED] [db\_name.]materialized\_view\_name;

```

The functionality of these operations will be extended in the future and more operations may be added.

## Materialized view-based query rewriting

Once a materialized view has been created, the optimizer will be able to exploit its definition semantics to automatically rewrite incoming queries using materialized views, and hence, accelerate query execution. 

The rewriting algorithm can be enabled and disabled globally using the `hive.materializedview.rewriting and hive.materializedview.rewriting.sql` configuration properties (default value is `true`). In addition, users can selectively enable/disable materialized views for rewriting. Recall that, by default, materialized views are enabled for rewriting at creation time. To alter that behavior, the following statement can be used:

```
ALTER MATERIALIZED VIEW [db\_name.]materialized\_view\_name ENABLE|DISABLE REWRITE;
```

Hive supports two types of rewriting algorithms:

* Algebraic: this is part of Apache Calcite and it supports queries containing TableScan, Project, Filter, Join, and Aggregate operators. More information about this rewriting coverage can be found [here](http://calcite.apache.org/docs/materialized_views#rewriting-using-plan-structural-information). In the following, we include a few examples that briefly illustrate different rewritings.

### Example 1

Consider the database schema created by the following DDL statements:

```
CREATE TABLE emps (
  empid INT,
  deptno INT,
  name VARCHAR(256),
  salary FLOAT,
  hire\_date TIMESTAMP)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

CREATE TABLE depts (
  deptno INT,
  deptname VARCHAR(256),
  locationid INT)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');
```

Assume we want to obtain frequently information about employees that were hired in different period granularities after 2016 and their departments. We may create the following materialized view:

```
CREATE MATERIALIZED VIEW mv1
AS
SELECT empid, deptname, hire\_date
FROM emps JOIN depts
  ON (emps.deptno = depts.deptno)
WHERE hire\_date >= '2016-01-01';
```

Then, the following query extracting information about employees that were hired in Q1 2018 is issued to Hive:

```
SELECT empid, deptname
FROM emps
JOIN depts
  ON (emps.deptno = depts.deptno)
WHERE hire\_date >= '2018-01-01'
    AND hire\_date <= '2018-03-31';
```

Hive will be able to rewrite the incoming query using the materialized view, including a compensation predicate on top of the scan over the materialization. Though the rewriting happens at the algebraic level, to illustrate this example, we include the SQL statement equivalent to the rewriting using the `mv` used by Hive to answer the incoming query:

```
SELECT empid, deptname
FROM mv1
WHERE hire\_date >= '2018-01-01'
    AND hire\_date <= '2018-03-31';
```

### Example 2

For the second example, consider the star schema based on the [SSB benchmark](https://www.cs.umb.edu/~poneil/StarSchemaB.PDF) created by the following DDL statements:

```
CREATE TABLE `customer`(
  `c\_custkey` BIGINT, 
  `c\_name` STRING, 
  `c\_address` STRING, 
  `c\_city` STRING, 
  `c\_nation` STRING, 
  `c\_region` STRING, 
  `c\_phone` STRING, 
  `c\_mktsegment` STRING,
  PRIMARY KEY (`c\_custkey`) DISABLE RELY)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

CREATE TABLE `dates`(
  `d\_datekey` BIGINT, 
  `d\_date` STRING, 
  `d\_dayofweek` STRING, 
  `d\_month` STRING, 
  `d\_year` INT, 
  `d\_yearmonthnum` INT, 
  `d\_yearmonth` STRING, 
  `d\_daynuminweek` INT,
  `d\_daynuminmonth` INT,
  `d\_daynuminyear` INT,
  `d\_monthnuminyear` INT,
  `d\_weeknuminyear` INT,
  `d\_sellingseason` STRING,
  `d\_lastdayinweekfl` INT,
  `d\_lastdayinmonthfl` INT,
  `d\_holidayfl` INT,
  `d\_weekdayfl`INT,
  PRIMARY KEY (`d\_datekey`) DISABLE RELY)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

CREATE TABLE `part`(
  `p\_partkey` BIGINT, 
  `p\_name` STRING, 
  `p\_mfgr` STRING, 
  `p\_category` STRING, 
  `p\_brand1` STRING, 
  `p\_color` STRING, 
  `p\_type` STRING, 
  `p\_size` INT, 
  `p\_container` STRING,
  PRIMARY KEY (`p\_partkey`) DISABLE RELY)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

CREATE TABLE `supplier`(
  `s\_suppkey` BIGINT, 
  `s\_name` STRING, 
  `s\_address` STRING, 
  `s\_city` STRING, 
  `s\_nation` STRING, 
  `s\_region` STRING, 
  `s\_phone` STRING,
  PRIMARY KEY (`s\_suppkey`) DISABLE RELY)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

CREATE TABLE `lineorder`(
  `lo\_orderkey` BIGINT, 
  `lo\_linenumber` int, 
  `lo\_custkey` BIGINT not null DISABLE RELY,
  `lo\_partkey` BIGINT not null DISABLE RELY,
  `lo\_suppkey` BIGINT not null DISABLE RELY,
  `lo\_orderdate` BIGINT not null DISABLE RELY,
  `lo\_ordpriority` STRING, 
  `lo\_shippriority` STRING, 
  `lo\_quantity` DOUBLE, 
  `lo\_extendedprice` DOUBLE, 
  `lo\_ordtotalprice` DOUBLE, 
  `lo\_discount` DOUBLE, 
  `lo\_revenue` DOUBLE, 
  `lo\_supplycost` DOUBLE, 
  `lo\_tax` DOUBLE, 
  `lo\_commitdate` BIGINT, 
  `lo\_shipmode` STRING,
  PRIMARY KEY (`lo\_orderkey`) DISABLE RELY,
  CONSTRAINT fk1 FOREIGN KEY (`lo\_custkey`) REFERENCES `customer\_n1`(`c\_custkey`) DISABLE RELY,
  CONSTRAINT fk2 FOREIGN KEY (`lo\_orderdate`) REFERENCES `dates\_n0`(`d\_datekey`) DISABLE RELY,
  CONSTRAINT fk3 FOREIGN KEY (`lo\_partkey`) REFERENCES `ssb\_part\_n0`(`p\_partkey`) DISABLE RELY,
  CONSTRAINT fk4 FOREIGN KEY (`lo\_suppkey`) REFERENCES `supplier\_n0`(`s\_suppkey`) DISABLE RELY)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');
```

As you can observe, we declare multiple integrity constraints for the database, using the `RELY` keyword so they are visible to the optimizer. Now assume we want to create a materialization that denormalizes the database contents (consider `dims` to be the set of dimensions that we will be querying often):

```
CREATE MATERIALIZED VIEW mv2
AS
SELECT <dims>,
    lo\_revenue,
    lo\_extendedprice * lo\_discount AS d\_price,
    lo\_revenue - lo\_supplycost
FROM customer, dates, lineorder, part, supplier
WHERE lo\_orderdate = d\_datekey
    AND lo\_partkey = p\_partkey
    AND lo\_suppkey = s\_suppkey
    AND lo\_custkey = c\_custkey;
```

The materialized view above may accelerate queries that execute joins among the different tables in the database. For instance, consider the following query:

```
SELECT SUM(lo\_extendedprice * lo\_discount)
FROM lineorder, dates
WHERE lo\_orderdate = d\_datekey
  AND d\_year = 2013
  AND lo\_discount between 1 and 3;
```

Though the query does not use all tables present in the materialized view, it may be answered using the materialized view because the joins in `mv2` preserve all the rows in the `lineorder` table (we know this because of the integrity constraints). Hence, the materialized view-based rewriting produced by the algorithm would be the following:

```
SELECT SUM(d\_price)
FROM mv2
WHERE d\_year = 2013
  AND lo\_discount between 1 and 3;
```

### Example 3

For the third example, consider the database schema with a single table that stores the edit events produced by a given website:

```
CREATE TABLE `wiki` (
  `time` TIMESTAMP, 
  `page` STRING, 
  `user` STRING, 
  `characters\_added` BIGINT,
  `characters\_removed` BIGINT)
STORED AS ORC
TBLPROPERTIES ('transactional'='true');
```

For this example, we will use Druid to store the materialized view. Assume we want to execute queries over the table, however we are not interested on any information about the events at a higher time granularity level than a minute. We may create the following materialized view that rolls up the events by the minute:

```
CREATE MATERIALIZED VIEW mv3
STORED BY 'org.apache.hadoop.hive.druid.DruidStorageHandler'
AS
SELECT floor(time to minute) as `\_\_time`, page,
    SUM(characters\_added) AS c\_added,
    SUM(characters\_removed) AS c\_removed
FROM wiki
GROUP BY floor(time to minute), page;
```

Then, assume we need to answer the following query that extracts the number of characters added per month:

```
SELECT floor(time to month),
    SUM(characters\_added) AS c\_added
FROM wiki
GROUP BY floor(time to month);
```

Hive will be able to rewrite the incoming query using `mv3` by rolling up the data of the materialized view to month granularity and projecting the information needed for the query result:

```
SELECT floor(time to month),
    SUM(c\_added)
FROM mv3
GROUP BY floor(time to month);
```

* SQL text: The materialized view definition query text is compared to the incoming query text or it's subquery text. It supports all kind of operators and aggregate functions.

## Materialized view maintenance

When data in the source tables used by a materialized view changes, e.g., new data is inserted or existing data is modified, we will need to refresh the contents of the materialized view to keep it up-to-date with those changes. Currently, the rebuild operation for a materialized view needs to be triggered by the user. In particular, the user should execute the following statement:

```
ALTER MATERIALIZED VIEW [db\_name.]materialized\_view\_name REBUILD;
```

Hive supports incremental view maintenance, i.e., only refresh data that was affected by the changes in the original source tables. Incremental view maintenance will decrease the rebuild step execution time. In addition, it will preserve LLAP cache for existing data in the materialized view.

By default, Hive will attempt to rebuild a materialized view incrementally, falling back to full rebuild if it is not possible.

Current implementation only supports incremental rebuild when there were `INSERT` operations over the source tables, while `UPDATE` and `DELETE` operations will force a full rebuild of the materialized view.

To execute incremental maintenance, following conditions should be met if there were only `INSERT` operations over the source tables:

* The materialized view should only use transactional tables (the source tables must be transactional), either micromanaged or ACID or a storage format that supports snapshots (ex. Iceberg)
* If the materialized view definition contains a Group By clause, the materialized view should be stored in an ACID table or a storage format that supports snapshots (ex. Iceberg v2), since it needs to support MERGE operation. For materialized view definitions consisting of Scan-Project-Filter-Join, this restriction does not exist.
* If the materialized view definition contains a Group By clause the following aggregate functions are supported: COUNT, SUM, AVG (only if both COUNT and SUM defined for the same column), MIN, MAX

If there were `UPDATE` and `DELETE` operations over the source tables:

* The materialized view should only use transactional tables (the source tables must be transactional), either micromanaged or ACID
* The materialized view definition must contain a Group By clause and a COUNT(*) function call.
* The materialized view should be stored in an ACID table or a storage format that supports snapshots (ex. Iceberg v2), since it needs to support MERGE operation.
* The following aggregate functions are supported: COUNT, SUM, AVG (only if both COUNT and SUM defined for the same column)

A rebuild operation acquires an exclusive write lock over the materialized view, i.e., for a given materialized view, only one rebuild operation can be executed at a given time.

## Materialized view lifecycle

By default, once a materialized view contents are stale, the materialized view will not be used for automatic query rewriting.

However, in some occasions it may be fine to accept stale data, e.g., if the materialized view uses non-transactional tables and hence we cannot verify whether its contents are outdated, however we still want to use the automatic rewriting. For those occasions, we can combine a rebuild operation run periodically, e.g., every 5minutes, and define the required freshness of the materialized view data using the `hive.materializedview.rewriting.time.window` configuration parameter, for instance:

```
SET hive.materializedview.rewriting.time.window=10min;
```

The parameter value can be also overridden by a concrete materialized view just by setting it as a table property when the materialization is created.

## Open issues (JIRA)

|
|  |
| Key | Summary | T | Created | Updated | Due | Assignee | Reporter | P | Status | Resolution |
| [HIVE-14494](https://issues.apache.org/jira/browse/HIVE-14494?src=confmacro) | [Add support for BUILD DEFERRED](https://issues.apache.org/jira/browse/HIVE-14494?src=confmacro)  | [Improvement](https://issues.apache.org/jira/browse/HIVE-14494?src=confmacro) |
Aug 09, 2016
|
Feb 27, 2024
|  |
Ashish Sharma
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-14499](https://issues.apache.org/jira/browse/HIVE-14499?src=confmacro) | [Add HMS metrics for materialized views](https://issues.apache.org/jira/browse/HIVE-14499?src=confmacro)  | [Improvement](https://issues.apache.org/jira/browse/HIVE-14499?src=confmacro) |
Aug 09, 2016
|
Feb 27, 2024
|  |
John Sherman
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-18621](https://issues.apache.org/jira/browse/HIVE-18621?src=confmacro) | [Replicate materialized views creation metadata with correct database name](https://issues.apache.org/jira/browse/HIVE-18621?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-18621?src=confmacro) |
Feb 05, 2018
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Minor |

Open
|
Unresolved
|
| [HIVE-18960](https://issues.apache.org/jira/browse/HIVE-18960?src=confmacro) | [Make Materialized view invalidation cache work with catalogs](https://issues.apache.org/jira/browse/HIVE-18960?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-18960?src=confmacro) |
Mar 14, 2018
|
Mar 14, 2018
|  |
Alan Gates
|
Alan Gates
| Major |

Open
|
Unresolved
|
| [HIVE-19114](https://issues.apache.org/jira/browse/HIVE-19114?src=confmacro) | [MV rewriting not being triggered for last query in materialized\_view\_rewrite\_4.q](https://issues.apache.org/jira/browse/HIVE-19114?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-19114?src=confmacro) |
Apr 05, 2018
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Critical |

Open
|
Unresolved
|
| [HIVE-19407](https://issues.apache.org/jira/browse/HIVE-19407?src=confmacro) | [Only support materialized views stored either as ACID or in selected custom storage handlers](https://issues.apache.org/jira/browse/HIVE-19407?src=confmacro)  | [Improvement](https://issues.apache.org/jira/browse/HIVE-19407?src=confmacro) |
May 03, 2018
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-20543](https://issues.apache.org/jira/browse/HIVE-20543?src=confmacro) | [Support replication of Materialized views](https://issues.apache.org/jira/browse/HIVE-20543?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-20543?src=confmacro) |
Sep 12, 2018
|
Aug 21, 2020
|  |
Aasha Medhi
|
Sankar Hariappan
| Major |

Open
|
Unresolved
|
| [HIVE-20773](https://issues.apache.org/jira/browse/HIVE-20773?src=confmacro) | [Query result cache might contain stale MV data](https://issues.apache.org/jira/browse/HIVE-20773?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-20773?src=confmacro) |
Oct 18, 2018
|
Jun 23, 2021
|  |
Unassigned
|
Oliver Draese
| Critical |

Open
|
Unresolved
|
| [HIVE-21133](https://issues.apache.org/jira/browse/HIVE-21133?src=confmacro) | [Support views with rewriting enabled useful for debugging](https://issues.apache.org/jira/browse/HIVE-21133?src=confmacro)  | [Improvement](https://issues.apache.org/jira/browse/HIVE-21133?src=confmacro) |
Jan 18, 2019
|
Feb 27, 2024
|  |
Jesús Camacho Rodríguez
|
Jesús Camacho Rodríguez
| Major |

Patch Available
|
Unresolved
|
| [HIVE-21945](https://issues.apache.org/jira/browse/HIVE-21945?src=confmacro) | [Enable sorted dynamic partitioning optimization for materialized views with custom data organization](https://issues.apache.org/jira/browse/HIVE-21945?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-21945?src=confmacro) |
Jul 02, 2019
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-21946](https://issues.apache.org/jira/browse/HIVE-21946?src=confmacro) | [Consider data organization of a materialized view in transparent rewriting](https://issues.apache.org/jira/browse/HIVE-21946?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-21946?src=confmacro) |
Jul 02, 2019
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-21953](https://issues.apache.org/jira/browse/HIVE-21953?src=confmacro) | [Enable CLUSTERED ON/DISTRIBUTED ON+SORTED ON in incremental rebuild of materialized views](https://issues.apache.org/jira/browse/HIVE-21953?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-21953?src=confmacro) |
Jul 04, 2019
|
Feb 27, 2024
|  |
Unassigned
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-22111](https://issues.apache.org/jira/browse/HIVE-22111?src=confmacro) | [Materialized view based on replicated table might not get refreshed](https://issues.apache.org/jira/browse/HIVE-22111?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-22111?src=confmacro) |
Aug 14, 2019
|
Feb 27, 2024
|  |
Unassigned
|
Peter Vary
| Minor |

Open
|
Unresolved
|
| [HIVE-22253](https://issues.apache.org/jira/browse/HIVE-22253?src=confmacro) | [General task tracking improvements for materialized views](https://issues.apache.org/jira/browse/HIVE-22253?src=confmacro)  | [Task](https://issues.apache.org/jira/browse/HIVE-22253?src=confmacro) |
Sep 27, 2019
|
Jul 20, 2020
|  |
Unassigned
|
Steve Carlin
| Major |

Open
|
Unresolved
|
| [HIVE-22260](https://issues.apache.org/jira/browse/HIVE-22260?src=confmacro) | [Materialized view rewriting does not support `UNION` operator, exact match can work under view](https://issues.apache.org/jira/browse/HIVE-22260?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-22260?src=confmacro) |
Sep 27, 2019
|
Sep 27, 2019
|  |
Unassigned
|
Steve Carlin
| Major |

Open
|
Unresolved
|
| [HIVE-22262](https://issues.apache.org/jira/browse/HIVE-22262?src=confmacro) | [Aggregate pushdown through join may generate additional rewriting opportunities](https://issues.apache.org/jira/browse/HIVE-22262?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-22262?src=confmacro) |
Sep 27, 2019
|
Feb 27, 2024
|  |
Vineet Garg
|
Steve Carlin
| Major |

Open
|
Unresolved
|
| [HIVE-22264](https://issues.apache.org/jira/browse/HIVE-22264?src=confmacro) | [Degenerate case where mv not being used: computing aggregate on group by field](https://issues.apache.org/jira/browse/HIVE-22264?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-22264?src=confmacro) |
Sep 27, 2019
|
Sep 27, 2019
|  |
Unassigned
|
Steve Carlin
| Major |

Open
|
Unresolved
|
| [HIVE-22265](https://issues.apache.org/jira/browse/HIVE-22265?src=confmacro) | [Ordinals in view are not being picked up in materialized view](https://issues.apache.org/jira/browse/HIVE-22265?src=confmacro)  | [Sub-task](https://issues.apache.org/jira/browse/HIVE-22265?src=confmacro) |
Sep 27, 2019
|
Feb 11, 2020
|  |
Unassigned
|
Steve Carlin
| Critical |

Open
|
Unresolved
|
| [HIVE-22921](https://issues.apache.org/jira/browse/HIVE-22921?src=confmacro) | [materialized\_view\_partitioned\_3.q relies on hive.optimize.sort.dynamic.partition property](https://issues.apache.org/jira/browse/HIVE-22921?src=confmacro)  | [Test](https://issues.apache.org/jira/browse/HIVE-22921?src=confmacro) |
Feb 21, 2020
|
Feb 27, 2024
|  |
Vineet Garg
|
Jesús Camacho Rodríguez
| Major |

Open
|
Unresolved
|
| [HIVE-24335](https://issues.apache.org/jira/browse/HIVE-24335?src=confmacro) | [RelOptMaterialization creates LogicalProject on top of HiveTableScan](https://issues.apache.org/jira/browse/HIVE-24335?src=confmacro)  | [Bug](https://issues.apache.org/jira/browse/HIVE-24335?src=confmacro) |
Oct 30, 2020
|
Apr 04, 2024
|  |
Krisztian Kasa
|
Krisztian Kasa
| Major |

Open
|
Unresolved
|
|

[Authenticate](https://cwiki.apache.org/confluence/plugins/servlet/applinks/oauth/login-dance/authorize?applicationLinkID=5aa69414-a9e9-3523-82ec-879b028fb15b) to retrieve your issues

|

Showing 20 out of
[24 issues](https://issues.apache.org/jira/secure/IssueNavigator.jspa?reset=true&jqlQuery=project+%3D+Hive+AND+component+%3D+%22Materialized+views%22++and+resolution+%3D+Unresolved+ORDER+BY+key+ASC++&src=confmacro)

