---
title: "Apache Hive : HCatalog Configuration Properties"
date: 2024-12-12
---









# Apache Hive : HCatalog Configuration Properties







* [Setup]({{< ref "#setup" >}})
* [Storage Directives]({{< ref "#storage-directives" >}})
* [Cache Behaviour Directives]({{< ref "#cache-behaviour-directives" >}})
* [Input Split Generation Behaviour]({{< ref "#input-split-generation-behaviour" >}})
* [Data Promotion Behaviour]({{< ref "#data-promotion-behaviour" >}})
* [HCatRecordReader Error Tolerance Behaviour]({{< ref "#hcatrecordreader-error-tolerance-behaviour" >}})




Apache HCatalog's behaviour can be modified through the use of a few configuration parameters specified in jobs submitted to it. This document details all the various knobs that users have available to them, and what they accomplish. 

## Setup

The properties described in this page are meant to be job-level properties set on HCatalog through the jobConf passed into it. This means that this page is relevant for Pig users of [HCatLoader/HCatStorer]({{< ref "hcatalog-loadstore_34013511" >}}), or MapReduce users of [HCatInputFormat/HCatOutputFormat]({{< ref "hcatalog-inputoutput_34013776" >}}). For a MapReduce user of HCatalog, these must be present as key-values in the Configuration (JobConf/Job/JobContext) used to instantiate HCatOutputFormat or HCatInputFormat. For Pig users of HCatStorer, these parameters are set using the Pig "set" command before instantiating an HCatLoader/HCatStorer.

## Storage Directives



| Property | Default | Description |
| --- | --- | --- |
|  hcat.pig.storer.external.location | not set | An override to specify where HCatStorer will write to, defined from Pig jobs, either directly by the user, or by using org.apache.hive.hcatalog.pig.HCatStorerWrapper. HCatalog will write to this specified directory, rather than writing to the table or partition directory calculated by the metadata. This will be used in lieu of the table directory if this is a table-level write (unpartitioned table write) or in lieu of the partition directory if this is a partition-level write. This parameter is used only for non-dynamic-partitioning jobs which have multiple write destinations. |
|  hcat.dynamic.partitioning.custom.pattern | not set | For a dynamic partitioning job, simply specifying a custom directory is not sufficient since the job writes to multiple destinations, and thus, instead of a directory specification, it requires a pattern specification. That is where this parameter comes in. For example, given a table partitioned by the keys country and state, with a root directory location of /apps/hive/warehouse/geo/, a dynamic partition write into this table that writes partitions (country=US,state=CA) & (country=IN,state=KA) would create two directories: /apps/hive/warehouse/geo/country=US/state=CA/ and /apps/hive/warehouse/geo/country=IN/state=KA/. However, specifying hcat.dynamic.partitioning.custom.pattern="/ext/geo/${country}-${state}" would create the following two partition directories: /ext/geo/US-CA and /ext/geo/IN-KA. Thus, it allows the user to specify a custom directory location pattern for all writes, and will interpolate each variable it sees when attempting to create a destination location for the partitions. See [Dynamic Partitioning: External Tables]({{< ref "#dynamic-partitioning:-external-tables" >}}) for another example. |
| hcat.append.limit(Hive 0.15.0 and later) | not set | hcat.append.limit allows an HCatalog user to specify a custom append limit. By default, while appending to an existing directory HCatalog will attempt to avoid naming clashes and try to append `_a_*NNN*`, where *`NNN`* is a number, to the desired filename to avoid clashes. However, by default, it only tries for *`NNN`* from 0 to 999 before giving up. This can cause an issue for some tables with an extraordinarily large number of files. Ideally, this should be fixed by the user changing their usage pattern and doing some manner of compaction; however, setting this parameter can be used as a temporary fix to increase that limit. (Added in Hive 0.15.0 with [HIVE-9381](https://issues.apache.org/jira/browse/HIVE-9381).) |
| hcat.input.ignore.invalid.path | false | hcat.input.ignore.invalid.path allows an HCatalog user to specify whether to ignore the path and return an empty result for it when trying to get a split for an invalid input path. The default is false, and user gets an InvalidInputException if the input path is invalid. (Added in Hive 2.1.0 with [HIVE-13509](https://issues.apache.org/jira/browse/HIVE-13509).) |

## Cache Behaviour Directives

HCatalog maintains a cache of HiveClients to talk to the metastore, managing a cache of 1 metastore client per thread, defaulting to an expiry of 120 seconds. For people that wish to modify the behaviour of this cache, a few parameters are provided:



| Property | Default | Description |
| --- | --- | --- |
| hcatalog.hive.client.cache.expiry.time | 120 | Allows users to override the expiry time specified – this is an int, and specifies the number of seconds until a cache entry expires. |
| hcatalog.hive.client.cache.disabled | false | Allows people to disable the cache altogether if they wish to. This is useful in highly multithreaded use cases.  |

Note: The two above properties begin with "hcatalog." rather than "hcat."

## Input Split Generation Behaviour



| Property | Default | Description |
| --- | --- | --- |
| hcat.desired.partition.num.splits | not set | This is a hint/guidance that can be provided to HCatalog to pass on to underlying InputFormats, to produce a "desired" number of splits per partition. This is useful for increasing parallelism by increasing the number of splits generated on a few large files. It is not as useful in cases where we would want to reduce the number of splits for a large number of files. It is not at all useful in cases where there are a large number of partitions that this job will read. Also note that this is merely an optimization hint, and it is not guaranteed that the underlying layer will be capable of using this optimization. Additionally, MapReduce parameters mapred.min.split.size and mapred.max.split.size can be used in conjunction with this parameter to tweak or optimize jobs. |

## Data Promotion Behaviour

In some cases (such as some older versions of Pig), users of HCatalog may not support all the datatypes supported by Hive. There are a few configuration parameters provided to handle data promotions and conversions which allow them to read data through HCatalog. On the write side, it is expected that the user pass in HCatRecords with valid datatypes that match the schema.



| Property | Default | Description |
| --- | --- | --- |
| hcat.data.convert.boolean.to.integer | false | promotes boolean to int on read from HCatalog |
| hcat.data.tiny.small.int.promotion | false | promotes tinyint or smallint to int on read from HCatalog |

## HCatRecordReader Error Tolerance Behaviour

While reading, it is understandable that data might contain errors, but we may not want to completely abort a task due to a couple of errors. These parameters configure how many errors HCatalog can accept before failing the task.



| Property | Default | Description |
| --- | --- | --- |
| hcat.input.bad.record.threshold | 0.0001f | A float parameter defaults to 0.0001f, which means it can deal with 1 error every 10,000 rows and still not error out. Any greater and it will. |
| hcat.input.bad.record.min | 2 | An int parameter defaults to 2, which is the minimum number of bad records encountered before applying the hcat.input.bad.record.threshold parameter. This is to prevent an initial or early bad record from causing a task abort because the ratio of errors was too high.  |

**Navigation Links**
Previous: [Installation from Tarball]({{< ref "hcatalog-installhcat_34013403" >}})  
Next: [Load and Store Interfaces]({{< ref "hcatalog-loadstore_34013511" >}})

General: [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

