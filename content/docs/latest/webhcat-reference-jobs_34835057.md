---
title: "Apache Hive : WebHCat Reference Jobs"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Jobs

{{< toc >}}

## Description

Return a list of all job IDs.

Version: Hive 0.12.0 and later

`GET jobs` is introduced in Hive release 0.12.0. It is equivalent to `[GET queue]({{< ref "webhcat-reference-jobids_34017187" >}})` in prior releases.   
`GET queue` is now deprecated ([HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443)) and will be removed in Hive 0.14.0 ([HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432)).

## URL

`http://`*www.myserver.com*`/templeton/v1/jobs`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **fields** | If **fields** set to "*", the request will return full details of the job. If **fields** is missing, will only return the job ID. Currently the value can only be "*", other values are not allowed and will throw exception. | Optional | None |
| **showall** | If **showall** is set to "true", the request will return all jobs the user has permission to view, not only the jobs belonging to the user. | Optional | false |
| **jobid** | If **jobid** is present, only the records whose job ID is lexicographically greater than **jobid** are returned. For example, if **jobid** = "job_201312091733_0001", the jobs whose job ID is greater than "job_201312091733_0001" are returned. The number of records returned depends on the value of **numrecords**.This parameter is not available in releases prior to Hive 0.13.0. (See [HIVE-5519](https://issues.apache.org/jira/browse/HIVE-5519).) | Optional in Hive 0.13.0+ | None |
| **numrecords** | If the **jobid** and **numrecords** parameters are present, the top *numrecords* records appearing after **jobid** will be returned after sorting the job ID list lexicographically. If the **jobid** parameter is missing and **numrecords** is present, the top *numrecords* will be returned after lexicographically sorting the job ID list. If the **jobid** parameter is present and **numrecords** is missing, all the records whose job ID is greater than **jobid** are returned.This parameter is not available in releases prior to Hive 0.13.0. (See [HIVE-5519](https://issues.apache.org/jira/browse/HIVE-5519).) | Optional in Hive 0.13.0+ | All |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also accepted.

## Results

Returns an array of jobs either belonging to the user, or which the user has permission to view (**showall**="true"), based on the filter conditions specified by the user.

Every element inside the array includes:

| Name | Description |
| --- | --- |
| **id** | Job ID. |
| **detail** | Job details if **showall** is set to "true"; otherwise "null". For more information about what details it contains, check `[GET jobs/:jobid]({{< ref "webhcat-reference-job_34835065" >}})`. |

## Examples

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/jobs?user.name=daijy'

```

### JSON Output

```
[
{"id":"job_201304291205_0015","detail":null}
]

```

### Curl Command (showall)

```
% curl -s 'http://localhost:50111/templeton/v1/jobs?user.name=daijy&showall=true'

```

### JSON Output (showall)

```
[
{"id":"job_201304291205_0014","detail":null},
{"id":"job_201111111311_0015","detail":null},
]

```

### Curl Command (fields)

```
% curl -s 'http://localhost:50111/templeton/v1/jobs?user.name=daijy&fields=*'

```

### JSON Output (fields)

Hive 0.12.0 bug

In release 0.12.0 the first line of JSON output for the fields parameter gives the parent jobid instead of the actual jobid ([HIVE-5510](https://issues.apache.org/jira/browse/HIVE-5510)). The example below shows the correct jobid, as displayed in release 0.13.0 and later.

```
[{"id":"job_201304291205_0016",
  "detail":{
    "status":{
      "jobACLs":{
        "MODIFY_JOB":{"allAllowed":false,"aclstring":" "},
        "VIEW_JOB":{"allAllowed":false,"aclstring":" "}},
      "runState":2,
      "startTime":1367264912274,
      "schedulingInfo":"NA",
      "failureInfo":"NA",
      "jobPriority":"NORMAL",
      "username":"daijy",
      "jobID":{"id":16,"jtIdentifier":"201304291205"},
      "jobId":"job_201304291205_0016",
      "jobComplete":true},
    "profile":{
      "user":"daijy",
      "jobFile":"hdfs://localhost:8020/Users/daijy/hadoop-1.0.3/tmp/mapred/staging/
          daijy/.staging/job_201304291205_0016/job.xml",
      "url":"http://localhost:50030/jobdetails.jsp?jobid=job_201304291205_0016",
      "queueName":"default",
      "jobName":"word count",
      "jobID":{"id":16,"jtIdentifier":"201304291205"},
      "jobId":"job_201304291205_0016"},
      "id":"job_201304291205_0016",
      "parentId":"job_201304291205_0015",
      "percentComplete":"map 100% reduce 100%",
      "exitValue":0,
      "user":"daijy",
      "callback":"http://daijymacpro.local:57815/templeton/$jobId",
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
    }]
```

 

 

 

**Navigation Links**
Previous: [DELETE queue/:jobid]({{< ref "webhcat-reference-deletejob_34017204" >}})  
 Next: [GET jobs/:jobid]({{< ref "webhcat-reference-job_34835065" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

Replaces deprecated resource: [GET queue]({{< ref "webhcat-reference-jobids_34017187" >}})

 

 

