---
title: "Apache Hive : WebHCat Reference MapReduceJar"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference MapReduceJar






# MapReduce Job — POST mapreduce/jar


* [MapReduce Job — POST mapreduce/jar]({{< ref "#mapreduce-job-—-post-mapreduce/jar" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Code and Data Setup]({{< ref "#code-and-data-setup" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Creates and queues a standard [Hadoop MapReduce](http://hadoop.apache.org/docs/stable/commands_manual.html) job.

Version: Hive 0.13.0 and later

As of Hive 0.13.0, [GET version/hadoop]({{< ref "webhcat-reference-versionhadoop_44303410" >}}) displays the Hadoop version used for the MapReduce job.

## URL

`http://`*www.myserver.com*`/templeton/v1/mapreduce/jar`

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **jar** | Name of the jar file for Map Reduce to use. | Required | None |
| **class** | Name of the class for Map Reduce to use. | Required | None |
| **libjars** | Comma separated jar files to include in the classpath. | Optional | None |
| **files** | Comma separated files to be copied to the map reduce cluster. | Optional | None |
| **arg** | Set a program argument. | Optional | None |
| **define** | Set a Hadoop configuration variable using the syntax `define=NAME=VALUE` | Optional | None |
| **statusdir** | A directory where WebHCat will write the status of the Map Reduce job. If provided, it is the caller's responsibility to remove this directory when done. | Optional | None |
| **enablelog** | If **statusdir** is set and **enablelog** is "true", collect Hadoop job configuration and logs into a directory named `$statusdir/logs` after the job finishes. Both completed and failed attempts are logged. The layout of subdirectories in `$statusdir/logs` is: `logs/$job_id` *(directory for $job\_id)* `logs/$job_id/job.xml.html` `logs/$job_id/$attempt_id` *(directory for $attempt\_id)* `logs/$job_id/$attempt_id/stderr` `logs/$job_id/$attempt_id/stdout` `logs/$job_id/$attempt_id/syslog` This parameter was introduced in Hive 0.12.0. (See [HIVE-4531](https://issues.apache.org/jira/browse/HIVE-4531).) | Optional in Hive 0.12.0+ | None |
| **callback** | Define a URL to be called upon job completion. You may embed a specific job ID into this URL using `$jobId`. This tag will be replaced in the callback URL with this job's job ID. | Optional | None |
| **usehcatalog** | Specify that the submitted job uses HCatalog and therefore needs to access the metastore, which requires additional steps for WebHCat to perform in a secure cluster. (See [HIVE-5133](https://issues.apache.org/jira/browse/HIVE-5133).) This parameter will be introduced in Hive 0.13.0. Also, if webhcat-site.xml defines the parameters `templeton.hive.archive`, `templeton.hive.home` and `templeton.hcat.home` then WebHCat will ship the Hive tar to the target node where the job runs. (See [HIVE-5547](https://issues.apache.org/jira/browse/HIVE-5547).) This means that Hive doesn't need to be installed on every node in the Hadoop cluster. This is independent of security, but improves manageability. The webhcat-site.xml parameters are documented in webhcat-default.xml. | Optional in Hive 0.13.0+ | false |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **id** | A string containing the job ID similar to "job\_201110132141\_0001". |
| **info** | A JSON object containing the information returned when the job was queued. See the Hadoop documentation ([`Class TaskController`](http://hadoop.apache.org/docs/r1.2.1/api/org/apache/hadoop/mapred/TaskController.html)) for more information. |

## Example

### Code and Data Setup



```
% hadoop fs -put wordcount.jar .
% hadoop fs -put transform.jar .

% hadoop fs -ls .
Found 2 items
-rw-r--r--   1 ctdean supergroup         23 2011-11-11 13:29 /user/ctdean/wordcount.jar
-rw-r--r--   1 ctdean supergroup         28 2011-11-11 13:29 /user/ctdean/transform.jar

```

### Curl Command



```
% curl -s -d jar=wordcount.jar \
       -d class=org.myorg.WordCount \
       -d libjars=transform.jar \
       -d arg=wordcount/input \
       -d arg=wordcount/output \
       'http://localhost:50111/templeton/v1/mapreduce/jar?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/mapreduce/jar?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output



```
{
 "id": "job\_201111121211\_0001",
 "info": {
          "stdout": "templeton-job-id:job\_201111121211\_0001
                    ",
          "stderr": "",
          "exitcode": 0
         }
}

```

**Navigation Links**
Previous: [POST mapreduce/streaming]({{< ref "webhcat-reference-mapreducestream_34017023" >}})  
 Next: [POST pig]({{< ref "webhcat-reference-pig_34017169" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

