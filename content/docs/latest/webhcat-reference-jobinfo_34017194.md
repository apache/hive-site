---
title: "Apache Hive : WebHCat Reference JobInfo"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference JobInfo

{{< toc >}}

## Description

Check the status of a job and get related job information given its job ID. Substitute ":jobid" with the job ID received when the job was created.

Version: Deprecated in 0.12.0

`GET queue/:jobid` is deprecated starting in Hive release 0.12.0. Users are encouraged to use `GET jobs/:jobid` instead. (See [HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443).)  
`GET queue/:jobid` is equivalent to `GET jobs/:jobid` – check `[GET jobs/:jobid]({{< ref "webhcat-reference-job_34835065" >}})` for documentation.

Version: Obsolete in 0.14.0

`GET queue/:jobid` will be removed in Hive release 0.14.0. (See [HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432).)  
Use `[GET jobs/:jobid]({{< ref "webhcat-reference-job_34835065" >}})` instead.

## URL

`http://`*www.myserver.com*`/templeton/v1/queue/`*:jobid*

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
| **completed** | A string representing completed status, for example "done". |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/queue/job_201112212038_0004?user.name=ctdean'

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
 "completed": "done"
}
```

### JSON Output (Hive 0.12.0 and later)

Version: Hive 0.12.0 and later

Starting in Hive release 0.12.0, `GET queue/:jobid` returns user arguments as well as status information ([HIVE-5031](https://issues.apache.org/jira/browse/HIVE-5031)).

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
                "enablelog" => "false",
                "execute"   => "select a,rand(b) from mynums",
                "file"      => null,
                "files"     => [],
                "statusdir" => null,
                "user.name" => "hadoopqa",
               },
}
```

**Navigation Links**
Previous: [GET queue]({{< ref "webhcat-reference-jobids_34017187" >}})  
 Next: [DELETE queue/:jobid]({{< ref "webhcat-reference-deletejob_34017204" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

Replaced in Hive 0.12.0 by: [GET jobs/:jobid]({{< ref "webhcat-reference-job_34835065" >}})

 

 

