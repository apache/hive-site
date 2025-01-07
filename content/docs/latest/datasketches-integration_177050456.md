---

title: "Apache Hive : Datasketches Integration"
date: 2024-12-12
----------------

# Apache Hive : Datasketches Integration

* [Sketch functions]({{< ref "#sketch-functions" >}})
  + [Naming convention]({{< ref "#naming-convention" >}})
  + [List declared sketch functions]({{< ref "#list-declared-sketch-functions" >}})
* [Integration with materialized views]({{< ref "#integration-with-materialized-views" >}})
* [BI mode]({{< ref "#bi-mode" >}})
  + [Rewrite COUNT(DISTINCT(X))]({{< ref "#rewrite-countdistinctx" >}})
  + [Rewrite percentile\_disc(p) withing group(order by x)]({{< ref "#rewrite-percentile_discp-withing-grouporder-by-x" >}})
  + [Rewrite cume\_dist() over (order by id)]({{< ref "#rewrite-cume\_dist---over--order-by-id-" >}})
  + [Rewrite NTILE]({{< ref "#rewrite-ntile" >}})
  + [Rewrite RANK]({{< ref "#rewrite-rank" >}})
* [Examples]({{< ref "#examples" >}})
  + [Simple distinct counting examples using HLL]({{< ref "#simple-distinct-counting-examples-using-hll" >}})

Apache DataSketches (<https://datasketches.apache.org/>) is integrated into Hive via [HIVE-22939](https://issues.apache.org/jira/browse/HIVE-22939).  
This enables various kind of sketch operations thru regular sql statement.

# Sketch functions

## Naming convention

All sketch functions are registered using the following naming convention:

**ds\_{sketchType}\_{functionName}**

For example we have a function called: **ds\_hll\_estimate** which could be used to estimate the distinct values from an hll sketch.

### sketchType

For detailed info about the sketches themself please refer to the datasketches site!

* frequency
  + hll
  + cpc
  + theta
* frequent items
  + freq
* histograms
  + kll

### functionName

|     name     |                                 description                                  |
|--------------|------------------------------------------------------------------------------|
| sketch       | generates sketch data from input                                             |
| estimate     | computes the estimate for frequency related sketches                         |
| union        | aggregate function to merge multiple sketches                                |
| union\_f     | unions 2 sketches given in the arguments                                     |
| n            | number of elements                                                           |
| cdf          | cumulative distribution                                                      |
| rank         | estimates the rank of the given element; returns a value in the range of 0~1 |
| intersect    | aggregate to intersect multiple sketches                                     |
| intersect\_f | intersect 2 sketches given in the arguments                                  |
| stringify    | returns the the sketch in a more readable form                               |

## List declared sketch functions

Given that we have ~60 functions registered I would recommend to also consider listing/getting info about a single udf.

You could list all functions prefixed by ds\_ using:

**show functions like 'ds\_%';**

And you can access the description of a function like:

**desc function ds\_freq\_sketch;**

# Integration with materialized views

Sketch aggregation(s) are exposed to Calcite by some extensions - which could enable both the usage of an MV in a smaller dimension query; or could help in incremental updates.

# BI mode

Usage of sketches can give a performance boost in case we could afford to loose some accuracy. Which could come very handy in case of charts or live dashboards.  
The BI mode is about making rewrites automatically to sketch functions if possible.

The BI mode can be enabled using:

```
set hive.optimize.bi.enabled=true;
```

## Rewrite COUNT(DISTINCT(X))

This feature can be toggled using the **hive.optimize.bi.rewrite.countdistinct.enabled** conf key

The used distinct sketch family can be configured using: **hive.optimize.bi.rewrite.countdistinct.sketch** (currently only hll is available).

This feature could rewrite

```
select category, count(distinct id) from sketch\_input group by category
```

to use a distinct count sketch to answer the query by rewriting it to

```
select category, round(ds\_hll\_estimate(ds\_hll\_sketch(id))) from sketch\_input
```

## Rewrite percentile\_disc(p) withing group(order by x)

This feature can be toggled using the**hive.optimize.bi.rewrite.percentile\_disc.enabled** conf key

The used histogram sketch family can be configured using: **hive.optimize.bi.rewrite.percentile\_disc.sketch** (currently only kll is available).

This feature could rewrite

```
select percentile\_disc(0.3) within group(order by id) from sketch\_input
```

to use a histogram sketch to answer the query by rewriting to

```
select ds\_kll\_quantile(ds\_kll\_sketch(id), 0.3) from sketch\_input
```

## Rewrite cume\_dist() over (order by id)

This feature can be toggled using the**[hive.optimize.bi](http://hive.optimize.bi).rewrite.cume\_dist.enabled** conf key

The used histogram sketch family can be configured using: [hive.optimize.bi](http://hive.optimize.bi).rewrite.cume\_dist.sketch (currently only kll is available).

```
select id,cume\_dist() over (order by id) from sketch\_input
```

to use a histogram sketch to answer the query by rewriting to

```
SELECT id, CAST(DS\_KLL\_RANK(t2.sketch, idVal) AS DOUBLE) 
FROM (SELECT id, CAST(COALESCE(CAST(id AS FLOAT), 340282346638528860000000000000000000000) AS FLOAT) AS idVal FROM sketch\_input) AS t,
(SELECT DS\_KLL\_SKETCH(CAST(`id` AS FLOAT)) AS `sketch` FROM sketch\_input) AS t2
```

## Rewrite NTILE

This feature can be toggled using the **[hive.optimize.bi](http://hive.optimize.bi).rewrite.ntile.enabled** conf key

The used histogram sketch family can be configured using: [hive.optimize.bi](http://hive.optimize.bi).rewrite.ntile.sketch (currently only kll is available).

This feature can rewrite

```
select id,
       ntile(4) over (order by id
from sketch\_input
order by id
```

To use a histogram sketch to calculate the NTILE's value:

```
select id,
        case when ceil(ds\_kll\_cdf(ds, CAST(id AS FLOAT) )[0]*4) < 1 then 1 else ceil(ds\_kll\_cdf(ds, CAST(id AS FLOAT) )[0]*4) end
from sketch\_input
join ( select ds\_kll\_sketch(cast(id as float)) as ds from sketch\_input ) q
order by id

select id,
                rank() over (order by id),
                case when ds\_kll\_n(ds) < (ceil(ds\_kll\_rank(ds, CAST(id AS FLOAT) )*ds\_kll\_n(ds))+1) then ds\_kll\_n(ds) else (ceil(ds\_kll\_rank(ds, CAST(id AS FLOAT) )*ds\_kll\_n(ds))+1) end

```

## Rewrite RANK

This feature can be toggled using the **hive.optimize.bi.rewrite.rank.enabled** conf key

The used histogram sketch family can be configured using: **hive.optimize.bi.rewrite.rank.sketch** (currently only kll is available).

```
select id,
       rank() over (order by id)
from sketch\_input
order by id
```

is rewritten to

```
select id,
       case when ds\_kll\_n(ds) < (ceil(ds\_kll\_rank(ds, CAST(id AS FLOAT) )*ds\_kll\_n(ds))+1) then ds\_kll\_n(ds) else (ceil(ds\_kll\_rank(ds, CAST(id AS FLOAT) )*ds\_kll\_n(ds))+1) end
from sketch\_input
join ( select ds\_kll\_sketch(cast(id as float)) as ds from sketch\_input ) q
order by id
```

# Examples

## Simple distinct counting examples using HLL

* Prepare sample table

```
create table sketch\_input (id int, category char(1))
STORED AS ORC
TBLPROPERTIES ('transactional'='true');

insert into table sketch\_input values
  (1,'a'),(1, 'a'), (2, 'a'), (3, 'a'), (4, 'a'), (5, 'a'), (6, 'a'), (7, 'a'), (8, 'a'), (9, 'a'), (10, 'a'),
  (6,'b'),(6, 'b'), (7, 'b'), (8, 'b'), (9, 'b'), (10, 'b'), (11, 'b'), (12, 'b'), (13, 'b'), (14, 'b'), (15, 'b')
; 
```

* 

### Use HLL to compute distinct values using an intermediate table

```
-- build sketches per category
create temporary table sketch\_intermediate (category char(1), sketch binary);
insert into sketch\_intermediate select category, ds\_hll\_sketch(id) from sketch\_input group by category;

-- get unique count estimates per category
select category, ds\_hll\_estimate(sketch) from sketch\_intermediate;

-- union sketches across categories and get overall unique count estimate
select ds\_hll\_estimate(ds\_hll\_union(sketch)) from sketch\_intermediate;
```

* 

### Use HLL to compute distinct values without intermediate table

```
select category, ds\_hll\_estimate(ds\_hll\_sketch(id)) from sketch\_input group by category;
select ds\_hll\_estimate(ds\_hll\_sketch(id)) from sketch\_input;
```

* 

### Use HLL to compute distinct values transparently thru BI mode

```
set hive.optimize.bi.enabled=true;
select category,count(distinct id) from sketch\_input group by category;
select count(distinct id) from sketch\_input;
```

* 

### Use HLL to compute distinct values transparently thru BI mode - while utilizing a Materialized View to store the intermediate sketches.

```
-- create an MV to store precomputed HLL values
create  materialized view mv\_1 as
  select category, ds\_hll\_sketch(id) from sketch\_input group by category;

set hive.optimize.bi.enabled=true;
select category,count(distinct id) from sketch\_input group by category;
select count(distinct id) from sketch\_input;
```

