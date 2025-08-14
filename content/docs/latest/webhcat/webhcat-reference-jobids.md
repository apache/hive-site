---
title: "Apache Hive : WebHCat Reference JobIDs"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference JobIDs

{{< toc >}}

## Description

Return a list of all job IDs.

Version: Deprecated in 0.12.0

`GET queue` is deprecated starting in Hive release 0.12.0. (See [HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443).) Users are encouraged to use `[GET jobs]({{< ref "webhcat-reference-jobs" >}})` instead.

Version: Obsolete in 0.14.0

`GET queue` will be removed in Hive release 0.14.0. (See [HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432).)  
Use `[GET jobs]({{< ref "webhcat-reference-jobs" >}})` instead.

## URL

`http://`*www.myserver.com*`/templeton/v1/queue`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **showall** | If **showall** is set to "true", then the request will return all jobs the user has permission to view, not only the jobs belonging to the user. This parameter is not available in releases prior to Hive 0.12.0. (See [HIVE-4442](https://issues.apache.org/jira/browse/HIVE-4442).) | Optional in Hive 0.12.0+ | false |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also accepted.

## Results

| Name | Description |
| --- | --- |
| **ids** | A list of all job IDs either belonging to the user, or (Hive 0.12.0 and later) job IDs the user has permission to view if **showall** is true. |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/queue?user.name=ctdean'

```

### JSON Output

```
{
 "job_201111111311_0008",
 "job_201111111311_0012"
}

```

**Navigation Links**
Previous: [POST hive]({{< ref "webhcat-reference-hive" >}})  
 Next: [GET queue/:jobid]({{< ref "webhcat-reference-jobinfo" >}})



Replaced in Hive 0.12.0 by: [GET jobs]({{< ref "webhcat-reference-jobs" >}})

 

 

