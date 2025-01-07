---

title: "Apache Hive : Subqueries in SELECT"
date: 2024-12-12
----------------

# Apache Hive : Subqueries in SELECT

# Problem

Currently Hive doesn't support subqueries in a SELECT statement, for example, the following query will not run on Hive:

```
SELECT customer.customer\_num,
	(SELECT SUM(ship\_charge) 
		FROM orders
		WHERE customer.customer\_num = orders.customer\_num
	) AS total\_ship\_chg
FROM customer 
```

Recently a lot of work has been done to extend support for subqueries ([HIVE-15456](https://issues.apache.org/jira/browse/HIVE-15456)). But this work primarily targeted extending subquery support in WHERE and HAVING clauses. We plan to continue the work done in HIVE-15456 to support subqueries in a select list (see [HIVE-16091](https://issues.apache.org/jira/browse/HIVE-16091)).

# Assumptions

We plan to limit the scope with the following assumptions and limitations.

* Subqueries could only be top-level expressions in SELECT. That is, subqueries in complex expressions, aggregates, UDFs, etc. will not be supported for now. For example the following queries will not run on Hive:

**Not Supported**

```
-- subquery in non-simple expression
SELECT 1 + (SELECT SUM(ship\_charge) FROM orders), customer.customer\_num FROM customer
 
-- subquery in CASE
SELECT CASE WHEN (select count(*) from store\_sales 
                  where ss\_quantity between 1 and 20) > 409437
            THEN (select avg(ss\_ext\_list\_price) 
                  from store\_sales 
                  where ss\_quantity between 1 and 20) 
            ELSE (select avg(ss\_net\_paid\_inc\_tax)
                  from store\_sales
                  where ss\_quantity between 1 and 20) end bucket1
FROM reason
WHERE r\_reason\_sk = 1
```

* Scalar subqueries can only return at most one row. Hive will check for this case at runtime and throw an error if not satisfied. For example the following query is invalid:

**Not Supported**

```
SELECT customer.customer\_num,
	(SELECT ship\_charge 
		FROM orders
		WHERE customer.customer\_num = orders.customer\_num
	) AS total\_ship\_chg
FROM customer 
```

* Scalar subqueries can only have one column. Hive will check for this case during compilation and throw an error. For example the following query is invalid:

**Not Supported**

```
SELECT customer.customer\_num,
	(SELECT ship\_charge, customer\_num
		FROM orders LIMIT 1
	) AS total\_ship\_chg
FROM customer
```

* Correlated variables are only permitted in a filter, that is, a WHERE or HAVING clause. For example the following query is invalid:

**Not Supported**

```
SELECT customer.customer\_num,
	(SELECT customer.customer\_num 
		FROM orders
		WHERE customer.customer\_num = orders.customer\_num
	) AS total\_ship\_chg
FROM customer 
```

* Subqueries with DISTINCT are not allowed. Since DISTINCT <expression> will be evaluated as GROUP BY <expression>, subqueries with DISTINCT are disallowed for now.

# Design

Given the assumptions above, the following kind of subqueries could be used in SELECT. 

* Scalar subqueries, for example: 

```
SELECT customer.customer\_num,
	(SELECT SUM(ship\_charge) 
		FROM orders
		WHERE customer.customer\_num = orders.customer\_num
	) AS total\_ship\_chg
FROM customer 
```

* IN subqueries, for example:

```
SELECT p\_size IN (
		SELECT MAX(p\_size) FROM part)
FROM part
```

* EXISTS subqueries, for example:

```
SELECT EXISTS(SELECT p\_size FROM part)
FROM part
```

All of the above queries could be **correlated** or **uncorrelated**.

Design for this will be similar to the work done in [HIVE-15456](https://issues.apache.org/jira/browse/HIVE-15456).

* genLogicalPlan will go over the select list to do the following:
  + If subquery is not a top-level expression, throw an error.
  + Otherwise, generate an appropriate plan by using RexSubquery to represent the subquery.
* HiveSubqueryRemoveRule will then be applied to remove the RexSubquery node and rewrite the query into a join.
* HiveRelDecorrelator::decorrelateQuery will then be used to decorrelate correlated queries.

 [HIVE-16091](https://issues.apache.org/jira/browse/HIVE-16091) covers the initial work for supporting subqueries in SELECT.

