---
title: "Apache Hive : WebHCat Reference DeleteJob"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference DeleteJob

{{< toc >}}

## Description

Kill a job given its job ID. Substitute ":jobid" with the job ID received when the job was created.

Version: Deprecated in 0.12.0

`DELETE queue/:jobid` is deprecated starting in Hive release 0.12.0. Users are encouraged to use `DELETE jobs/:jobid` instead. (See [HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443).)  
`DELETE queue/:jobid` is equivalent to `DELETE jobs/:jobid` – check `[DELETE jobs/:jobid]({{< ref "webhcat-reference-deletejobid_34835045" >}})` for documentation.

Version: Obsolete in 0.14.0

`DELETE queue/:jobid` will be removed in Hive release 0.14.0. (See [HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432).)  
Use `[DELETE jobs/:jobid]({{< ref "webhcat-reference-deletejobid_34835045" >}})` instead.

## URL

`http://`*www.myserver.com*`/templeton/v1/queue/`*:jobid*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:jobid** | The job ID to delete. This is the ID received when the job was created. | Required | None |

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
| **completed** | A string representing completed status, for example "done". |

## Example

### Curl Command

```
% curl -s -X DELETE 'http://localhost:50111/templeton/v1/queue/job_201111111311_0009?user.name=ctdean'

```

### JSON Output

```
{
 "status": {
            "startTime": 1321047216471,
            "username": "ctdean",
            "jobID": {
                      "jtIdentifier": "201111111311",
                      "id": 9
                     },
            "jobACLs": {
                       },
            "schedulingInfo": "NA",
            "failureInfo": "NA",
            "jobId": "job_201111111311_0009",
            "jobPriority": "NORMAL",
            "runState": 1,
            "jobComplete": false
           },
 "profile": {
             "url": "http://localhost:50030/jobdetails.jsp?jobid=job_201111111311_0009",
             "user": "ctdean",
             "jobID": {
                       "jtIdentifier": "201111111311",
                       "id": 9
                      },
             "queueName": "default",
             "jobFile": "hdfs://localhost:9000/tmp/hadoop-ctdean/mapred/staging/ctdean/.staging/job_201111111311_0009/job.xml",
             "jobName": "streamjob3322518350676530377.jar",
             "jobId": "job_201111111311_0009"
            }
 "id": "job_201111111311_0009",
 "parentId": "job_201111111311_0008",
 "percentComplete": "10% complete",
 "exitValue": 0,
 "user": "ctdean",
 "callback": null,
 "completed": "false"
}

```

Note

The job is not immediately deleted, therefore the information returned may not reflect deletion, as in our example. Use [GET queue/:jobid]({{< ref "webhcat-reference-jobinfo_34017194" >}}) to monitor the job and confirm that it is eventually deleted.

**Navigation Links**
Previous: [GET queue/:jobid]({{< ref "webhcat-reference-jobinfo_34017194" >}})  
 Next: [GET jobs]({{< ref "webhcat-reference-jobs_34835057" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

Replaced in Hive 0.12.0 by: [DELETE jobs/:jobid]({{< ref "webhcat-reference-deletejobid_34835045" >}})

 

 

