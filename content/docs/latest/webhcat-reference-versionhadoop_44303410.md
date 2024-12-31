---
title: "Apache Hive : WebHCat Reference VersionHadoop"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference VersionHadoop

# Hadoop Version — GET version/hadoop

* [Hadoop Version — GET version/hadoop]({{< ref "#hadoop-version--get-versionhadoop" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Return the version of Hadoop being run when WebHCat creates a MapReduce job ([POST mapreduce/jar]({{< ref "webhcat-reference-mapreducejar_34017030" >}}) or [mapreduce/streaming]({{< ref "webhcat-reference-mapreducestream_34017023" >}})).

Version: Hive 0.13.0 and later

`GET version/hadoop` is introduced in Hive release 0.13.0 ([HIVE-6226](https://issues.apache.org/jira/browse/HIVE-6226)).

## URL

`http://`*[www.myserver.com](http://www.myserver.com)*`/templeton/v1/version/hadoop`

## Parameters

Only the [standard parameters]({{< ref "#standard-parameters" >}}) are accepted.

## Results

Returns the Hadoop version.

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/version/hadoop?user.name=ekoifman'

```

### JSON Output

```
[
{"module":"hadoop","version":"2.4.1-SNAPSHOT}
]

```

 

 

 

**Navigation Links**
Previous: [GET version/hive]({{< ref "webhcat-reference-versionhive_44303406" >}})  
Next: [POST ddl]({{< ref "webhcat-reference-ddl_34015990" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

Replaces deprecated resource: [GET queue]({{< ref "webhcat-reference-jobids_34017187" >}})

 

 

