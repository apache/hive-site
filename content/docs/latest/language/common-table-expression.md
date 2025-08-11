---
title: "Apache Hive : Common Table Expression"
date: 2024-12-12
---

# Apache Hive : Common Table Expression

A Common Table Expression (CTE) is a temporary result set derived from a simple query specified in a WITH clause, which immediately precedes a SELECT or INSERT keyword.  The CTE is defined only within the execution scope of a single statement.  One or more CTEs can be used in a Hive [SELECT]({{< ref "languagemanual-select" >}}), [INSERT]({{< ref "#insert" >}}), [CREATE TABLE AS SELECT]({{< ref "#create-table-as-select" >}}), or [CREATE VIEW AS SELECT]({{< ref "#create-view-as-select" >}}) statement.

Version

Common Table Expressions are added in Hive 0.13.0 with [HIVE-1180](https://issues.apache.org/jira/browse/HIVE-1180).

## Common Table Expression Syntax

```
withClause: cteClause (, cteClause)*
cteClause: cte_name AS (select statment)
```

### Additional Grammar Rules

* The WITH clause is not supported within SubQuery Blocks
* CTEs are supported in Views, CTAS and INSERT statements.
* [Recursive Queries](http://wiki.postgresql.org/wiki/CTEReadme#Parsing_recursive_queries) are not supported.

## Examples

### CTE in Select Statements

```
with q1 as ( select key from src where key = '5')
select *
from q1;

-- from style
with q1 as (select * from src where key= '5')
from q1
select *;
 
-- chaining CTEs
with q1 as ( select key from q2 where key = '5'),
q2 as ( select key from src where key = '5')
select * from (select key from q1) a;
 
-- union example
with q1 as (select * from src where key= '5'),
q2 as (select * from src s2 where key = '4')
select * from q1 union all select * from q2;
```

### CTE in Views, CTAS, and Insert Statements

```
-- insert example
create table s1 like src;
with q1 as ( select key, value from src where key = '5')
from q1
insert overwrite table s1
select *;

-- ctas example
create table s2 as
with q1 as ( select key from src where key = '4')
select * from q1;

-- view example
create view v1 as
with q1 as ( select key from src where key = '5')
select * from q1;
select * from v1;
 
-- view example, name collision
create view v1 as
with q1 as ( select key from src where key = '5')
select * from q1;
with q1 as ( select key from src where key = '4')
select * from v1;
```

In the second View example, a query's CTE is different from the CTE used when creating the view. The result will contain rows with key = '5' because in the view's query statement the CTE defined in the view definition takes effect.

Also see this JIRA:

* [HIVE-1180](https://issues.apache.org/jira/browse/HIVE-1180) Support Common Table Expressions (CTEs) in Hive

 

 

