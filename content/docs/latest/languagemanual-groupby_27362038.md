---

title: "Apache Hive : LanguageManual GroupBy"
date: 2024-12-12
----------------

# Apache Hive : LanguageManual GroupBy

* [Group By Syntax]({{< ref "#group-by-syntax" >}})
  + [Simple Examples]({{< ref "#simple-examples" >}})
  + [Select statement and group by clause]({{< ref "#select-statement-and-group-by-clause" >}})
* [Advanced Features]({{< ref "#advanced-features" >}})
  + [Multi-Group-By Inserts]({{< ref "#multi-group-by-inserts" >}})
  + [Map-side Aggregation for Group By]({{< ref "#map-side-aggregation-for-group-by" >}})
  + [Grouping Sets, Cubes, Rollups, and the GROUPING\_\_ID Function]({{< ref "#grouping-sets-cubes-rollups-and-the-grouping__id-function" >}})

## Group By Syntax

```
groupByClause: GROUP BY groupByExpression (, groupByExpression)*

groupByExpression: expression

groupByQuery: SELECT expression (, expression)* FROM src groupByClause?

```

In `groupByExpression` columns are specified by name, not by position number. However in [Hive 0.11.0](https://issues.apache.org/jira/browse/HIVE-581) and later, columns can be specified by position when configured as follows:

* For Hive 0.11.0 through 2.1.x, set [hive.groupby.orderby.position.alias]({{< ref "#hive-groupby-orderby-position-alias" >}}) to true (the default is false).
* For Hive 2.2.0 and later, set [hive.groupby.position.alias]({{< ref "#hive-groupby-position-alias" >}}) to true (the default is false).

### Simple Examples

In order to count the number of rows in a table:

```
  SELECT COUNT(*) FROM table2;

```

Note that for versions of Hive which don't include [HIVE-287](https://issues.apache.org/jira/browse/HIVE-287), you'll need to use COUNT(1) in place of COUNT(*).

In order to count the number of distinct users by gender one could write the following query:

```
  INSERT OVERWRITE TABLE pv\_gender\_sum
  SELECT pv\_users.gender, count (DISTINCT pv\_users.userid)
  FROM pv\_users
  GROUP BY pv\_users.gender;

```

Multiple aggregations can be done at the same time, however, no two aggregations can have different DISTINCT columns. For example, the following is possible because count(DISTINCT) and sum(DISTINCT) specify the same column:

```
  INSERT OVERWRITE TABLE pv\_gender\_agg
  SELECT pv\_users.gender, count(DISTINCT pv\_users.userid), count(*), sum(DISTINCT pv\_users.userid)
  FROM pv\_users
  GROUP BY pv\_users.gender;

```

Note that for versions of Hive which don't include [HIVE-287](https://issues.apache.org/jira/browse/HIVE-287), you'll need to use COUNT(1) in place of COUNT(*).

However, the following query is not allowed. We don't allow multiple DISTINCT expressions in the same query.

```
  INSERT OVERWRITE TABLE pv\_gender\_agg
  SELECT pv\_users.gender, count(DISTINCT pv\_users.userid), count(DISTINCT pv\_users.ip)
  FROM pv\_users
  GROUP BY pv\_users.gender;

```

### Select statement and group by clause

When using group by clause, the select statement can only include columns included in the group by clause. Of course, you can have as many aggregation functions (e.g. `count`) in the select statement as well.  
Let's take a simple example

```
CREATE TABLE t1(a INTEGER, b INTGER);

```

A group by query on the above table could look like:

```
SELECT
   a,
   sum(b)
FROM
   t1
GROUP BY
   a;

```

The above query works because the select clause contains `a` (the group by key) and an aggregation function (`sum(b)`).

However, the query below **DOES NOT** work:

```
SELECT
   a,
   b
FROM
   t1
GROUP BY
   a;

```

This is because the select clause has an additional column (`b`) that is not included in the group by clause (and it's not an aggregation function either). This is because, if the table `t1` looked like:

```
a    b
------
100  1
100  2
100  3

```

Since the grouping is only done on `a`, what value of `b` should Hive display for the group `a=100`? One can argue that it should be the first value or the lowest value but we all agree that there are multiple possible options. Hive does away with this guessing by making it invalid SQL (HQL, to be precise) to have a column in the select clause that is not included in the group by clause.

## Advanced Features

### Multi-Group-By Inserts

The output of the aggregations or simple selects can be further sent into multiple tables or even to hadoop dfs files (which can then be manipulated using hdfs utilitites). e.g. if along with the gender breakdown, one needed to find the breakdown of unique page views by age, one could accomplish that with the following query:

```
  FROM pv\_users 
  INSERT OVERWRITE TABLE pv\_gender\_sum
    SELECT pv\_users.gender, count(DISTINCT pv\_users.userid) 
    GROUP BY pv\_users.gender 
  INSERT OVERWRITE DIRECTORY '/user/facebook/tmp/pv\_age\_sum'
    SELECT pv\_users.age, count(DISTINCT pv\_users.userid) 
    GROUP BY pv\_users.age; 

```

### Map-side Aggregation for Group By

*hive.map.aggr* controls how we do aggregations. The default is false. If it is set to true, Hive will do the first-level aggregation directly in the map task.  
This usually provides better efficiency, but may require more memory to run successfully.

```
  set hive.map.aggr=true;
  SELECT COUNT(*) FROM table2;

```

Note that for versions of Hive which don't include [HIVE-287](https://issues.apache.org/jira/browse/HIVE-287), you'll need to use COUNT(1) in place of COUNT(*).

### Grouping Sets, Cubes, Rollups, and the GROUPING\_\_ID Function

Version

Grouping sets, CUBE and ROLLUP operators, and the GROUPING\_\_ID function were added in Hive release 0.10.0.

See [Enhanced Aggregation, Cube, Grouping and Rollup]({{< ref "30151323" >}}) for information about these aggregation operators.

Also see the JIRAs:

* [HIVE-2397](https://issues.apache.org/jira/browse/HIVE-2397) Support with rollup option for group by
* [HIVE-3433](https://issues.apache.org/jira/browse/HIVE-3433) Implement CUBE and ROLLUP operators in Hive
* [HIVE-3471](https://issues.apache.org/jira/browse/HIVE-3471) Implement grouping sets in Hive
* [HIVE-3613](https://issues.apache.org/jira/browse/HIVE-3613) Implement grouping\_id function

New in Hive release 0.11.0:

* [HIVE-3552](https://issues.apache.org/jira/browse/HIVE-3552) HIVE-3552 performant manner for performing cubes/rollups/grouping sets for a high number of grouping set keys

