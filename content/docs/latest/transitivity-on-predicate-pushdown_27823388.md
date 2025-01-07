---

title: "Apache Hive : Transitivity on predicate pushdown"
date: 2024-12-12
----------------

# Apache Hive : Transitivity on predicate pushdown

Before Hive 0.8.0, the query

```

set hive.mapred.mode=strict;
create table invites (foo int, bar string) partitioned by (ds string);
create table invites2 (foo int, bar string) partitioned by (ds string);
select count(*) from invites join invites2 on invites.ds=invites2.ds where invites.ds='2011-01-01';

```

would give the error

```

Error in semantic analysis: No Partition Predicate Found for Alias "invites2" Table "invites2"

```

Here, the filter is applied to the table invites as invites.ds='2011-01-01' but not invites2.ds='2011-01-01'.  This causes Hive to reject the query in strict mode to prevent scanning all the partitions of invites2.  This can be seen by using explain plan on the query without strict mode on:

```

STAGE DEPENDENCIES:
  Stage-1 is a root stage
  Stage-2 depends on stages: Stage-1
  Stage-0 is a root stage

STAGE PLANS:
  Stage: Stage-1
    Map Reduce
      Alias -> Map Operator Tree:
        invites 
          TableScan
            alias: invites
            Filter Operator
              predicate:
                  expr: (ds = '2011-01-01')
                  type: boolean
              Reduce Output Operator
                key expressions:
                      expr: ds
                      type: string
                sort order: +
                Map-reduce partition columns:
                      expr: ds
                      type: string
                tag: 0
                value expressions:
                      expr: ds
                      type: string
        invites2 
          TableScan
            alias: invites2
            Reduce Output Operator
              key expressions:
                    expr: ds
                    type: string
              sort order: +
              Map-reduce partition columns:
                    expr: ds
                    type: string
              tag: 1
      Reduce Operator Tree:
        Join Operator
          condition map:
               Inner Join 0 to 1
          condition expressions:
            0 {VALUE.\_col2}
            1 
          handleSkewJoin: false
          outputColumnNames: \_col2
          Select Operator
            Group By Operator
              aggregations:
                    expr: count()
              bucketGroup: false
              mode: hash
              outputColumnNames: \_col0
              File Output Operator
                compressed: false
                GlobalTableId: 0
                table:
                    input format: org.apache.hadoop.mapred.SequenceFileInputFormat
                    output format: org.apache.hadoop.hive.ql.io.HiveSequenceFileOutputFormat

  Stage: Stage-2
    Map Reduce
      Alias -> Map Operator Tree:
        file:/var/folders/nt/ng21tg0n1jl4547lw0k8lg6hq\_nw87/T/charleschen/hive\_2011-08-04\_10-59-05\_697\_8934329734633337337/-mr-10002 
            Reduce Output Operator
              sort order: 
              tag: -1
              value expressions:
                    expr: \_col0
                    type: bigint
      Reduce Operator Tree:
        Group By Operator
          aggregations:
                expr: count(VALUE.\_col0)
          bucketGroup: false
          mode: mergepartial
          outputColumnNames: \_col0
          Select Operator
            expressions:
                  expr: \_col0
                  type: bigint
            outputColumnNames: \_col0
            File Output Operator
              compressed: false
              GlobalTableId: 0
              table:
                  input format: org.apache.hadoop.mapred.TextInputFormat
                  output format: org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat

  Stage: Stage-0
    Fetch Operator
      limit: -1

```

Note that there is no filter on the tablescan operation for invites2.

In Hive 0.8.0, support will be added for recognizing transitivity on join conditions during predicate pushdown with [HIVE-1989|https://issues.apache.org/jira/browse/HIVE-1989].  With the above example, Hive will now infer the filter invites2.ds='2011-01-01' from the filter invites.ds='2011-01-01' and the join condition invites.ds=invites2.ds.  The explain plan now gives:

```

 STAGE DEPENDENCIES:
  Stage-1 is a root stage
  Stage-2 depends on stages: Stage-1
  Stage-0 is a root stage

STAGE PLANS:
  Stage: Stage-1
    Map Reduce
      Alias -> Map Operator Tree:
        invites
          TableScan
            alias: invites
            Filter Operator
              predicate:
                  expr: (ds = '2011-01-01')
                  type: boolean
              Reduce Output Operator
                key expressions:
                      expr: ds
                      type: string
                sort order: +
                Map-reduce partition columns:
                      expr: ds
                      type: string
                tag: 0
                value expressions:
                      expr: ds
                      type: string
        invites2
          TableScan
            alias: invites2
            Filter Operator
              predicate:
                  expr: (ds = '2011-01-01')
                  type: boolean
              Reduce Output Operator
                key expressions:
                      expr: ds
                      type: string
                sort order: +
                Map-reduce partition columns:
                      expr: ds
                      type: string
                tag: 1
      Reduce Operator Tree:
        Join Operator
          condition map:
               Inner Join 0 to 1
          condition expressions:
            0 {VALUE.\_col2}
            1
          handleSkewJoin: false
          outputColumnNames: \_col2
          Select Operator
            Group By Operator
              aggregations:
                    expr: count()
              bucketGroup: false
              mode: hash
              outputColumnNames: \_col0
              File Output Operator
                compressed: false
                GlobalTableId: 0
                table:
                    input format: org.apache.hadoop.mapred.SequenceFileInputFormat
                    output format: org.apache.hadoop.hive.ql.io.HiveSequenceFileOutputFormat

  Stage: Stage-2
    Map Reduce
      Alias -> Map Operator Tree:
        file:/var/folders/nt/ng21tg0n1jl4547lw0k8lg6hq\_nw87/T/charleschen/hive\_2011-08-04\_10-56-09\_896\_8195257719501884918/-mr-10002
            Reduce Output Operator
              sort order:
              tag: -1
              value expressions:
                    expr: \_col0
                    type: bigint
      Reduce Operator Tree:
        Group By Operator
          aggregations:
                expr: count(VALUE.\_col0)
          bucketGroup: false
          mode: mergepartial
          outputColumnNames: \_col0
          Select Operator
            expressions:
                  expr: \_col0
                  type: bigint
            outputColumnNames: \_col0
            File Output Operator
              compressed: false
              GlobalTableId: 0
              table:
                  input format: org.apache.hadoop.mapred.TextInputFormat
                  output format: org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat

  Stage: Stage-0
    Fetch Operator
      limit: -1

```

