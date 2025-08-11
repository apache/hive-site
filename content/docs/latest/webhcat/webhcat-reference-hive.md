---
title: "Apache Hive : WebHCat Reference Hive"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Hive

{{< toc >}}

## Description

Runs a [Hive](http://hive.apache.org/) query or set of commands.

Version: Hive 0.13.0 and later

As of Hive 0.13.0, [GET version/hive]({{< ref "webhcat-reference-versionhive" >}}) displays the Hive version used for the query or commands.

## URL

`http://`*www.myserver.com*`/templeton/v1/hive`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **execute** | String containing an entire, short Hive program to run. | One of either "execute" or "file" is required. | None |
| **file** | HDFS file name of a Hive program to run. | One of either "execute" or "file" is required. | None |
| **define** | Set a Hive configuration variable using the syntax `define=NAME=VALUE`. See a [note](https://community.hortonworks.com/articles/104269/how-to-pass-hive-configuration-parameters-to-knox.html) CURL and "=". | Optional | None |
| **arg** | Set a program argument. This parameter was introduced in Hive 0.12.0. (See [HIVE-4444](https://issues.apache.org/jira/browse/HIVE-4444).) | Optional in Hive 0.12.0+ | None |
| **files** | Comma-separated files to be copied to the map reduce cluster. This parameter was introduced in Hive 0.12.0. (See [HIVE-4444](https://issues.apache.org/jira/browse/HIVE-4444).) | Optional in Hive 0.12.0+ | None |
| **statusdir** | A directory where WebHCat will write the status of the Hive job. If provided, it is the caller's responsibility to remove this directory when done. | Optional | None |
| **enablelog** | If **statusdir** is set and **enablelog** is "true", collect Hadoop job configuration and logs into a directory named `$statusdir/logs` after the job finishes. Both completed and failed attempts are logged. The layout of subdirectories in `$statusdir/logs` is: `logs/$job_id` *(directory for $job_id)* `logs/$job_id/job.xml.html` `logs/$job_id/$attempt_id` *(directory for $attempt_id)* `logs/$job_id/$attempt_id/stderr` `logs/$job_id/$attempt_id/stdout` `logs/$job_id/$attempt_id/syslog` This parameter was introduced in Hive 0.12.0. (See [HIVE-4531](https://issues.apache.org/jira/browse/HIVE-4531).) | Optional in Hive 0.12.0+ | None |
| **callback** | Define a URL to be called upon job completion. You may embed a specific job ID into this URL using `$jobId`. This tag will be replaced in the callback URL with this job's job ID. | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **id** | A string containing the job ID similar to "job_201110132141_0001". |
| **info** | A JSON object containing the information returned when the job was queued. See the Hadoop documentation ([`Class TaskController`](http://hadoop.apache.org/docs/r1.2.1/api/org/apache/hadoop/mapred/TaskController.html)) for more information. |

## Example

### Curl Command

```
% curl -s -d execute="select+*+from+pokes;" \
       -d statusdir="pokes.output" \
       'http://localhost:50111/templeton/v1/hive?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/hive?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output

```
{
 "id": "job_201111111311_0005",
 "info": {
          "stdout": "templeton-job-id:job_201111111311_0005
                    ",
          "stderr": "",
          "exitcode": 0
         }
}

```

### Example Results

```
% hadoop fs -ls pokes.output
Found 2 items
-rw-r--r--   1 ctdean supergroup        610 2011-11-11 13:22 /user/ctdean/pokes.output/stderr
-rw-r--r--   1 ctdean supergroup         15 2011-11-11 13:22 /user/ctdean/pokes.output/stdout

% hadoop fs -cat pokes.output/stdout
1       a
2       bb
3       ccc

```

**Navigation Links**
Previous: [POST pig]({{< ref "webhcat-reference-pig" >}})  
 Next: [GET queue]({{< ref "webhcat-reference-jobids" >}})



 

 

