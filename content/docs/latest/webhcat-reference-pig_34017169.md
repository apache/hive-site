---
title: "Apache Hive : WebHCat Reference Pig"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Pig

# Pig Job — POST pig

* [Pig Job — POST pig]({{< ref "#pig-job-—-post-pig" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Code and Data Setup]({{< ref "#code-and-data-setup" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Create and queue a [Pig](http://pig.apache.org/) job.

## URL

`http://`*www.myserver.com*`/templeton/v1/pig`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **execute** | String containing an entire, short Pig program to run. | One of either "execute" or "file" is required. | None |
| **file** | HDFS file name of a Pig program to run. | One of either "execute" or "file" is required. | None |
| **arg** | Set a program argument. If `-useHCatalog` is included, then **usehcatalog** is interpreted as "true" (Hive 0.13.0 and later). | Optional | None |
| **files** | Comma separated files to be copied to the map reduce cluster. | Optional | None |
| **statusdir** | A directory where WebHCat will write the status of the Pig job. If provided, it is the caller's responsibility to remove this directory when done. | Optional | None |
| **enablelog** | If **statusdir** is set and **enablelog** is "true", collect Hadoop job configuration and logs into a directory named `$statusdir/logs` after the job finishes. Both completed and failed attempts are logged. The layout of subdirectories in `$statusdir/logs` is: `logs/$job_id` *(directory for $job\_id)* `logs/$job_id/job.xml.html` `logs/$job_id/$attempt_id` *(directory for $attempt\_id)* `logs/$job_id/$attempt_id/stderr` `logs/$job_id/$attempt_id/stdout` `logs/$job_id/$attempt_id/syslog` This parameter was introduced in Hive 0.12.0. (See [HIVE-4531](https://issues.apache.org/jira/browse/HIVE-4531).) | Optional in Hive 0.12.0+ | None |
| **callback** | Define a URL to be called upon job completion. You may embed a specific job ID into this URL using `$jobId`. This tag will be replaced in the callback URL with this job's job ID. | Optional | None |
| **usehcatalog** | Specify that the submitted job uses HCatalog and therefore needs to access the metastore, which requires additional steps for WebHCat to perform in a secure cluster. (See [HIVE-5133](https://issues.apache.org/jira/browse/HIVE-5133).) This parameter will be introduced in Hive 0.13.0. It can also be set to "true" by including `-useHCatalog` in the **arg** parameter. Also, if webhcat-site.xml defines the parameters `templeton.hive.archive`, `templeton.hive.home` and `templeton.hcat.home` then WebHCat will ship the Hive tar to the target node where the job runs. (See [HIVE-5547](https://issues.apache.org/jira/browse/HIVE-5547).) This means that Hive doesn't need to be installed on every node in the Hadoop cluster. It does not ensure that Pig is installed on the target node in the cluster. This is independent of security, but improves manageability. The webhcat-site.xml parameters are documented in webhcat-default.xml. | Optional in Hive 0.13.0+ | false |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **id** | A string containing the job ID similar to "job\_201110132141\_0001". |
| **info** | A JSON object containing the information returned when the job was queued. See the Hadoop documentation ([`Class TaskController`](http://hadoop.apache.org/docs/r1.2.1/api/org/apache/hadoop/mapred/TaskController.html)) for more information. |

## Example

### Code and Data Setup

```
% cat id.pig
A = load 'passwd' using PigStorage(':');
B = foreach A generate $0 as id;
dump B;

% cat fake-passwd
ctdean:Chris Dean:secret
pauls:Paul Stolorz:good
carmas:Carlos Armas:evil
dra:Deirdre McClure:marvelous

% hadoop fs -put id.pig .
% hadoop fs -put fake-passwd passwd

```

### Curl Command

```
% curl -s -d file=id.pig \
       -d arg=-v \
       'http://localhost:50111/templeton/v1/pig?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/pig?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output

```
{
 "id": "job\_201111101627\_0018",
 "info": {
          "stdout": "templeton-job-id:job\_201111101627\_0018
                    ",
          "stderr": "",
          "exitcode": 0
         }
}

```

**Navigation Links**
Previous: [POST mapreduce/jar]({{< ref "webhcat-reference-mapreducejar_34017030" >}})  
 Next: [POST hive]({{< ref "webhcat-reference-hive_34017180" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

