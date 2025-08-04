---
title: "Apache Hive : WebHCat Reference Job"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Job

{{< toc >}}

## Description

Check the status of a job and get related job information given its job ID. Substitute ":jobid" with the job ID received when the job was created.

Version: Hive 0.12.0 and later

`GET jobs/:jobid` is introduced in Hive release 0.12.0. It is equivalent to `[GET queue/:jobid]({{< ref "webhcat-reference-jobinfo_34017194" >}})` in prior releases.  
`GET queue/:jobid` is now deprecated ([HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443)) and will be removed in Hive 0.14.0 ([HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432)).

## URL

`http://`*www.myserver.com*`/templeton/v1/jobs/`*:jobid*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:jobid** | The job ID to check. This is the ID received when the job was created. | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **status** | A JSON object containing the job status information. See the Hadoop documentation ([`Class JobStatus`](http://hadoop.apache.org/docs/stable/api/org/apache/hadoop/mapred/JobStatus.html)) for more information. |
| **profile** | A JSON object containing the job profile information. WebHCat passes along the information in the JobProfile object, which is subject to change from one Hadoop version to another. See the [Hadoop documentation](http://hadoop.apache.org/docs/) (API docs) for org.apache.hadoop.mapred.JobProfile for more information. |
| **id** | The job ID. |
| **parentId** | The parent job ID. |
| **percentComplete** | The job completion percentage, for example "75% complete". |
| **exitValue** | The job's exit value. |
| **user** | User name of the job creator. |
| **callback** | The callback URL, if any. |
| **completed** | A string representing completed status of the process launched by the Launcher task. For example when a MapReduce job is submitted via WebHCat, the Launcher invokes a "`hadoop jar`" command and then when that process exits the **completed** string is set to "done". Note that this is not the same as the job status (see **status**). |
| **userargs** | A JSON object repesenting the argument names and values for the job submission request. |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/jobs/job_201112212038_0004?user.name=ctdean'

```

### JSON Output

```
{
 "status": {
            "startTime": 1324529476131,
            "username": "ctdean",
            "jobID": {
                      "jtIdentifier": "201112212038",
                      "id": 4
                     },
            "jobACLs": {
                       },
            "schedulingInfo": "NA",
            "failureInfo": "NA",
            "jobId": "job_201112212038_0004",
            "jobPriority": "NORMAL",
            "runState": 2,
            "jobComplete": true
           },
 "profile": {
             "url": "http://localhost:50030/jobdetails.jsp?jobid=job_201112212038_0004",
             "jobID": {
                       "jtIdentifier": "201112212038",
                        "id": 4
                      },
             "user": "ctdean",
             "queueName": "default",
             "jobFile": "hdfs://localhost:9000/tmp/hadoop-ctdean/mapred/staging/ctdean/.staging/job_201112212038_0004/job.xml",
             "jobName": "PigLatin:DefaultJobName",
             "jobId": "job_201112212038_0004"
            },
 "id": "job_201112212038_0004",
 "parentId": "job_201112212038_0003",
 "percentComplete": "100% complete",
 "exitValue": 0,
 "user": "ctdean",
 "callback": null,
 "completed": "done",
 "userargs" => {
    "callback"  => null,
    "define"    => [],
    "execute"   => "select a,rand(b) from mynums",
    "file"      => null,
    "statusdir" => null,
    "user.name" => "hadoopqa",
  },

}

```

**Navigation Links**
Previous: [GET jobs]({{< ref "webhcat-reference-jobs_34835057" >}})  
 Next: [DELETE jobs/:jobid]({{< ref "webhcat-reference-deletejobid_34835045" >}})



Replaces deprecated resource: [GET queue/:jobid]({{< ref "webhcat-reference-jobinfo_34017194" >}})

 

 

