---

title: "Apache Hive : Query ReExecution"
date: 2024-12-12
----------------

# Apache Hive : Query ReExecution

Query reexecution provides a facility to re-run the query multiple times in case of an unfortunate event happens.

* [ReExecition strategies]({{< ref "#reexecition-strategies" >}})
  + [Overlay]({{< ref "#overlay" >}})
  + [Reoptimize]({{< ref "#reoptimize" >}})
  + [Operator Matching]({{< ref "#operator-matching" >}})
* [Configuration]({{< ref "#configuration" >}})

Introduced in Hive 3.0 ([HIVE-17626](https://issues.apache.org/jira/browse/HIVE-17626))

# ReExecition strategies

## Overlay

Enables to change the hive settings for all reexecutions which will be happening. It works by adding a configuration subtree as an overlay to the actual hive settings(reexec.overlay.*)

**Example**

```
set zzz=1;
set reexec.overlay.zzz=2;

set hive.query.reexecution.enabled=true;
set hive.query.reexecution.strategies=overlay;

create table t(a int);
insert into t values (1);
select assert\_true(${hiveconf:zzz} > a) from t group by a;
```

Every hive setting which has a prefix of "reexec.overlay" will be set for all reexecutions.

A more real life example would be to disable join auto conversion for all reexecutions:

```
set reexec.overlay.hive.auto.convert.join=false;
```

## Reoptimize

During query execution; the actual number passing rows in every operator is tracked. This information is reused during re-planning which could result in a better plan.

Situation in which this would be needed:

* missing statististics
* incorrect statistics
* many joins

It's not that easy to craft queries which will lead to OOM situations; but to enable it:

```
set hive.query.reexecution.strategies=overlay,reoptimize;
```

## Operator Matching

Operator level statistics are matched to the new plan using operator subtree matching this also enables to match the information to a query which have "similar" parts.

# Configuration

|               Configuration                |      default       |                                                                                     |
|--------------------------------------------|--------------------|-------------------------------------------------------------------------------------|
| hive.query.reexecution.enabled             | true               | Feature enabler                                                                     |
| hive.query.reexecution.strategies          | overlay,reoptimize | reexecution plugins; currently overlay and reoptimize is supported                  |
| hive.query.reexecution.stats.persist.scope | query              | runtime statistics can be persisted:* **query:** - only used during the reexecution |

* **hiveserver:** persisted during the lifetime of the hiveserver
* **metastore**: persisted in the metastore; and loaded on hiveserver startu[
  |
  | hive.query.reexecution.max.count | 1 | number of reexecution that may happen |
  | hive.query.reexecution.always.collect.operator.stats | false | Enable to gather runtime statistics on all queries. |
  | hive.query.reexecution.stats.cache.batch.size | -1 | If runtime stats are stored in metastore; the maximal batch size per round during load. |
  | hive.query.reexecution.stats.cache.size | 100 000 | Size of the runtime statistics cache. Unit is: OperatorStat entry; a query plan consist ~100. |
  | runtime.stats.clean.frequency | 3600s | Frequency at which timer task runs to remove outdated runtime stat entries. |
  | runtime.stats.max.age | 3days | Stat entries which are older than this are removed. |

