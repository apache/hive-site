---
title: "Apache Hive : HiveAws HivingS3nRemotely"
date: 2024-12-12
---

# Apache Hive : HiveAws HivingS3nRemotely

= Querying S3 files from your PC (using EC2, Hive and Hadoop) =

## Usage Scenario

The scenario being covered here goes as follows:

* A user has data stored in S3 - for example Apache log files archived in the cloud, or databases backed up into S3.
* The user would like to declare tables over the data sets here and issue SQL queries against them
* These SQL queries should be executed using computed resources provisioned from EC2. Ideally, the compute resources can be provisioned in proportion to the compute costs of the queries
* Results from such queries that need to be retained for the long term can be stored back in S3

This tutorial walks through the steps required to accomplish this. Please send email to the hive-users mailing list in case of any problems with this tutorial.

## Required Software

On the client side (PC), the following are required:

* Any version of Hive that incorporates [HIVE-467![](images/icons/linkext7.gif)](https://issues.apache.org/jira/browse/HIVE-467). (As of this writing - the relevant patches are not committed. For convenience sake - a Hive distribution with this patch can be downloaded from [here![](images/icons/linkext7.gif)](http://jsensarma.com/downloads/hive-s3-ec2.tar.gz).)
* A version of Hadoop ec2 scripts (src/contrib/ec2/bin) with a fix for [here![](images/icons/linkext7.gif)](https://issues.apache.org/jira/browse/HADOOP-5839)]. Again - since the relevant patches are not committed yet - a version of Hadoop-19 ec2 scripts with the relevant patches applied can be downloaded from [[http:--jsensarma.com-downloads-hadoop-0.19-ec2-remote.tar.gz]. These scripts must be used to launch hadoop clusters in EC2.

Hive requires a local directory of Hadoop to run (specified using environment variable HADOOP\_HOME). This can be a version of Hadoop compatible with the one running on the EC2 clusters. This recipe has been tried with hadoop distribution created from from branch-19.

It is assumed that the user can successfully launch Hive CLI (`bin/hive` from the Hive distribution) at this point.

## Hive Setup

A few Hadoop configuration variables are required to be specified for all Hive sessions. These can be set using the hive cli as follows:

```

hive> set hadoop.socks.server=localhost:2600; 
hive> set hadoop.rpc.socket.factory.class.default=org.apache.hadoop.net.SocksSocketFactory;
hive> set hadoop.job.ugi=root,root;
hive> set mapred.map.tasks=40;
hive> set mapred.reduce.tasks=-1;
hive> set fs.s3n.awsSecretAccessKey=2GAHKWG3+1wxcqyhpj5b1Ggqc0TIxj21DKkidjfz
hive> set fs.s3n.awsAccessKeyId=1B5JYHPQCXW13GWKHAG2

```

**The values assigned to s3n keys are just an example and need to be filled in by the user as per their account details.** Explanation for the rest of the values can be found in [Configuration Guide]({{< ref "#configuration-guide" >}}) section below.

Instead of specifying these command lines each time the CLI is bought up - we can store these persistently within `hive-site.xml` in the `conf/` directory of the Hive installation (from where they will be picked up each time the CLI is launched.

## Example Public Data Sets

Some example data files are provided in the S3 bucket `data.s3ndemo.hive`. We will use them for the sql examples in this tutorial:

* `s3n://data.s3ndemo.hive/kv` - Key Value pairs in a text file
* `s3n://data.s3ndemo.hive/pkv` - Key Value pairs in a directories that are partitioned by date
* `s3n://data.s3ndemo.hive/tpch/*` - Eight directories containing data corresponding to the eight tables used by [TPCH benchmark![](images/icons/linkext7.gif)](http://tpc.org/tpch/). The data is generated for a scale 10 (approx 10GB) database using the standard `dbgen` utility provided by TPCH.
## Setting up tables (DDL Statements)

In this example - we will use HDFS as the default table store for Hive. We will make Hive tables over the files in S3 using the `external tables` functionality in Hive. Executing DDL commands does not require a functioning Hadoop cluster (since we are just setting up metadata):

* Declare a simple table containing key-value pairs:
* ```

hive> create external table kv (key int, values string)  location 's3n://data.s3ndemo.hive/kv';

```
* Declare a partitioned table over a nested directory containing key-value pairs and associate table partitions with dirs:
* ```

hive> create external table pkv (key int, values string) partitioned by (insertdate string);
hive> alter table pkv add partition (insertdate='2008-01-01') location 's3n://data.s3ndemo.hive/pkv/2008-01-01';

```
* Declare a table over a TPCH table:
* ```

hive> create external table lineitem (
  l\_orderkey int, l\_partkey int, l\_suppkey int, l\_linenumber int, l\_quantity double,
  l\_extendedprice double, l\_discount double, l\_tax double, l\_returnflag string, 
  l\_linestatus string, l\_shipdate string, l\_commitdate string, l\_receiptdate string,
  l\_shipinstruct string, l\_shipmode string, l\_comment string) 
  row format delimited fields terminated by '|' 
  location 's3n://data.s3ndemo.hive/tpch/lineitem';

```

The TPCH DDL statements are slightly modified versions of the original TPCH statements (since Hive does not support all the data types used in TPCH). All the TPCH DDL statements for Hive can be be found ^TpchDdlForHive.sql

## Executing Queries

Hive can execute some queries without a Hadoop cluster. For example:

```

hive> select * from kv limit 10;

```

`select *` queries with limit clauses can be performed locally on the Hive CLI itself. If you are doing this - please note that:

* `fs.default.name` should be set to `[file:///![](images/icons/linkext7.gif)]({{< ref "file:///" >}})` in case CLI is not configured to use a working Hadoop cluster
* **Please Please do not select all the rows from large data sets**. This will cause large amount of data to be downloaded from S3 to outside AWS and incur charges on the host account for these data sets!

Of course - the real fun is in doing some non-trivial queries using map-reduce. For this we will need a Hadoop cluster (finally!):

1. Start a Hadoop cluster on EC2 (using directions from [Hadoop-EC2 tutorial![](images/icons/linkext7.gif)](http://wiki.apache.org/hadoop/AmazonEC2) - but making sure to use a version of ec2 scripts with HADOOP-5839 applied! User is free to allocate any number of nodes they wish - although this tutorial was tried out with 10 nodes.
2. Note down the public hostnames of the master node. For example, the public hostname maybe something like:

* `ec2-12-34-56-78.compute-1.amazonaws.com`  

 1.#3 Point the Hive CLI to use this Hadoop cluster by executing:
* ```

hive> set fs.default.name=hdfs://ec2-12-34-56-78.compute-1.amazonaws.com:50001;
hive> set mapred.job.tracker=ec2-12-34-56-78.compute-1.amazonaws.com:50002;

```

 1.#4 Set up a ssh tunnel via port 2600 to the Hadoop master. This can be done by executing the following from another terminal/window:
* `$ ssh -i <path to Hadoop private key path> -D 2600 ec2-12-34-56-78.compute-1.amazonaws.com`

Now we are all setup. The sample query from TPCH (1.sql) can be tried as follows:

```

hive> insert overwrite directory '/tmp/tpcresults-1.sql' 
  select l\_returnflag, l\_linestatus, sum ( l\_quantity ) as sum\_qty, sum ( l\_extendedprice ) as sum\_base\_price,
  sum ( l\_extendedprice * ( 1 - l\_discount )) as sub\_disc\_price, 
  sum ( l\_extendedprice * ( 1 - l\_discount ) * ( 1 + l\_tax )) as sum\_charge,
  avg ( l\_quantity ) as avg\_qty, avg ( l\_extendedprice ) as avg\_price, 
  avg ( l\_discount ) as avg\_disc, count ( 1 ) as count\_order
  from lineitem where l\_shipdate <= to\_date('1998-12-01') group by l\_returnflag, l\_linestatus; 

```

This launches one map-reduce job and on 10 nodes with default hadoop/hive settings - this took about 10 minutes. The results in this case are stored in HDFS and can be obtained by doing a `dfs -cat /tmp/tpcresults/1-2.sql/*` - either from bin/hadoop or from hive CLI. The query above differs from the TPCH query in skipping the order by clause - since it's not implemented by Hive currently.

## Storing results back in S3

The results could also have been stored as a file in S3 directly, for example, we could alter the previous insert clause to read as:

```

hive> insert overwrite directory 's3n://target-bucket/tpcresults-1.sql';

```

As another alternative, one could have created an external table over S3 and stored the results directly in it, for example:

```

hive> create external table t1 (flag string, status string, double ...)
  location 's3n://jssarma/tpcresults-1.sql';
hive> insert overwrite table t1 select ...;

```

Similarly, one could have stored the results back in a partition in an partitioned external table as well.

## Using tmp tables in HDFS

Currently, Hive does not have any explicit support tmp tables. But tables defined over HDFS in EC2 are like tmp tables since they only last for the duration of the Hadoop cluster. Since they are likely to be much faster than accessing S3 directly - they can be used to stage data that may be accessed repeatedly during a session. For example - for the TPCH dataset - one may want to do some analysis of customer attributes against order details - and it would be first beneficial to materialize the join of these data sets and then do repeated queries against it. Here's some example sql that would do the same:

```

hive> create table cust\_order (nationkey string, acctbal double, mktsegment string, orderstatus string, totalprice double);
hive> from customer c left outer join orders o on (c.c\_custkey = o.o\_custkey)
  insert overwrite table cust\_order
  select c.c\_nationkey, c.c\_acctbal, c.c\_mktsegment, o.o\_orderstatus, o.o\_totalprice;

```

## Appendix

<<Anchor(ConfigHell)>>

### Configuration Guide

The socket related options allow Hive CLI to communicate with the Hadoop cluster using a ssh tunnel (that will be established later). The job.ugi is specified to avoid issues with permissions on HDFS. `mapred.map.tasks` specification is a hack that works around [HADOOP-5861![](images/icons/linkext7.gif)](https://issues.apache.org/jira/browse/HADOOP-5861) and may need to be set higher for large clusters. `mapred.reduce.tasks` is specified to let Hive determine the number of reducers (see [HIVE-490![](images/icons/linkext7.gif)](https://issues.apache.org/jira/browse/HIVE-490)).

### Links

* Unknown macro: {link-to}  Hive and AWS

 presents general landscape and alternative on running Hive queries in AWS.
* [On issues and lessons learned during this integration effort![](images/icons/linkext7.gif)](http://jsensarma.com/blog/2009/05/14/hive-hadoop-s3-ec2-it-works/)

 

 

