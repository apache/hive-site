---
title: "Apache Hive : WebHCat Reference MapReduceStream"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference MapReduceStream






# MapReduce Streaming Job — POST mapreduce/streaming


* [MapReduce Streaming Job — POST mapreduce/streaming]({{< ref "#mapreduce-streaming-job-—-post-mapreduce/streaming" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Code and Data Setup]({{< ref "#code-and-data-setup" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})
		- [Example Results]({{< ref "#example-results" >}})




## Description

Create and queue a [Hadoop streaming MapReduce](http://hadoop.apache.org/docs/stable/streaming.html) job.

Version: Hive 0.13.0 and later

As of Hive 0.13.0, [GET version/hadoop]({{< ref "webhcat-reference-versionhadoop_44303410" >}}) displays the Hadoop version used for the MapReduce job.

## URL

`http://`*www.myserver.com*`/templeton/v1/mapreduce/streaming`

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **input** | Location of the input data in Hadoop. | Required | None |
| **output** | Location in which to store the output data. If not specified, WebHCat will store the output in a location that can be discovered using the [queue]({{< ref "webhcat-reference-jobinfo_34017194" >}}) resource. | Optional | See description |
| **mapper** | Location of the mapper program in Hadoop. | Required | None |
| **reducer** | Location of the reducer program in Hadoop. | Required | None |
| **file** | Add an HDFS file to the distributed cache. | Optional | None |
| **define** | Set a Hadoop configuration variable using the syntax `define=NAME=VALUE` | Optional | None |
| **cmdenv** | Set an environment variable using the syntax `cmdenv=NAME=VALUE` | Optional | None |
| **arg** | Set a program argument. | Optional | None |
| **statusdir** | A directory where WebHCat will write the status of the Map Reduce job. If provided, it is the caller's responsibility to remove this directory when done. | Optional | None |
| **enablelog** | If **statusdir** is set and **enablelog** is "true", collect Hadoop job configuration and logs into a directory named `$statusdir/logs` after the job finishes. Both completed and failed attempts are logged. The layout of subdirectories in `$statusdir/logs` is: `logs/$job_id` *(directory for $job\_id)* `logs/$job_id/job.xml.html` `logs/$job_id/$attempt_id` *(directory for $attempt\_id)* `logs/$job_id/$attempt_id/stderr` `logs/$job_id/$attempt_id/stdout` `logs/$job_id/$attempt_id/syslog` This parameter was introduced in Hive 0.12.0. (See [HIVE-4531](https://issues.apache.org/jira/browse/HIVE-4531).) | Optional in Hive 0.12.0+ | None |
| **callback** | Define a URL to be called upon job completion. You may embed a specific job ID into this URL using `$jobId`. This tag will be replaced in the callback URL with this job's job ID. | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **id** | A string containing the job ID similar to "job\_201110132141\_0001". |
| **info** | A JSON object containing the information returned when the job was queued. See the Hadoop documentation ([`Class TaskController`](http://hadoop.apache.org/docs/r1.2.1/api/org/apache/hadoop/mapred/TaskController.html)) for more information. |

## Example

### Code and Data Setup



```
% cat mydata/file01 mydata/file02
Hello World Bye World
Hello Hadoop Goodbye Hadoop

% hadoop fs -put mydata/ .

% hadoop fs -ls mydata
Found 2 items
-rw-r--r--   1 ctdean supergroup         23 2011-11-11 13:29 /user/ctdean/mydata/file01
-rw-r--r--   1 ctdean supergroup         28 2011-11-11 13:29 /user/ctdean/mydata/file02

```

### Curl Command



```
% curl -s -d input=mydata \
       -d output=mycounts \
       -d mapper=/bin/cat \
       -d reducer="/usr/bin/wc -w" \
       'http://localhost:50111/templeton/v1/mapreduce/streaming?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/mapreduce/streaming?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output



```
{
 "id": "job\_201111111311\_0008",
 "info": {
          "stdout": "packageJobJar: [] [/Users/ctdean/var/hadoop/hadoop-0.20.205.0/share/hadoop/contrib/streaming/hadoop-streaming-0.20.205.0.jar...
                    templeton-job-id:job\_201111111311\_0008
                    ",
          "stderr": "11/11/11 13:26:43 WARN mapred.JobClient: Use GenericOptionsParser for parsing the arguments
                    11/11/11 13:26:43 INFO mapred.FileInputFormat: Total input paths to process : 2
                    ",
          "exitcode": 0
         }
}

```

### Example Results



```
% hadoop fs -ls mycounts
Found 3 items
-rw-r--r--   1 ctdean supergroup          0 2011-11-11 13:27 /user/ctdean/mycounts/\_SUCCESS
drwxr-xr-x   - ctdean supergroup          0 2011-11-11 13:26 /user/ctdean/mycounts/\_logs
-rw-r--r--   1 ctdean supergroup         10 2011-11-11 13:27 /user/ctdean/mycounts/part-00000

% hadoop fs -cat mycounts/part-00000
      8

```

**Navigation Links**
Previous: [PUT ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-putproperty_34017012" >}})  
 Next: [POST mapreduce/jar]({{< ref "webhcat-reference-mapreducejar_34017030" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

