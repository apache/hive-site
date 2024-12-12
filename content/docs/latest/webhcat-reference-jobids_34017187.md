---
title: "Apache Hive : WebHCat Reference JobIDs"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference JobIDs

# List JobIDs — GET queue

* [List JobIDs — GET queue]({{< ref "#list-jobids-—-get-queue" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Return a list of all job IDs.

Version: Deprecated in 0.12.0

`GET queue` is deprecated starting in Hive release 0.12.0. (See [HIVE-4443](https://issues.apache.org/jira/browse/HIVE-4443).) Users are encouraged to use `[GET jobs]({{< ref "webhcat-reference-jobs_34835057" >}})` instead.

Version: Obsolete in 0.14.0

`GET queue` will be removed in Hive release 0.14.0. (See [HIVE-6432](https://issues.apache.org/jira/browse/HIVE-6432).)  
Use `[GET jobs]({{< ref "webhcat-reference-jobs_34835057" >}})` instead.

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
 "job\_201111111311\_0008",
 "job\_201111111311\_0012"
}

```

**Navigation Links**
Previous: [POST hive]({{< ref "webhcat-reference-hive_34017180" >}})  
 Next: [GET queue/:jobid]({{< ref "webhcat-reference-jobinfo_34017194" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

Replaced in Hive 0.12.0 by: [GET jobs]({{< ref "webhcat-reference-jobs_34835057" >}})

 

 

