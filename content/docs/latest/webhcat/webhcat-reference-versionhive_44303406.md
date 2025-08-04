---
title: "Apache Hive : WebHCat Reference VersionHive"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference VersionHive

{{< toc >}}

## Description

Return the version of Hive being run when WebHCat issues Hive queries or commands ([POST hive]({{< ref "webhcat-reference-hive_34017180" >}})).

Version: Hive 0.13.0 and later

`GET version/hive` is introduced in Hive release 0.13.0 ([HIVE-6226](https://issues.apache.org/jira/browse/HIVE-6226)).

## URL

`http://`*[www.myserver.com](http://www.myserver.com)*`/templeton/v1/version/hive`

## Parameters

Only the [standard parameters]({{< ref "#standard-parameters" >}}) are accepted.

## Results

Returns the Hive version.

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/version/hive?user.name=ekoifman'

```

### JSON Output

```
[
{"module":"hive","version":"0.14.0-SNAPSHOT"}
]

```

 

 

 

**Navigation Links**
Previous: [GET version]({{< ref "webhcat-reference-version_34015986" >}})  
Next: [GET version/hadoop]({{< ref "webhcat-reference-versionhadoop_44303410" >}})



Replaces deprecated resource: [GET queue]({{< ref "webhcat-reference-jobids_34017187" >}})

 

 

