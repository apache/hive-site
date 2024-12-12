---
title: "Apache Hive : WebHCat Reference Version"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference Version






# List Versions — GET version


* [List Versions — GET version]({{< ref "#list-versions-—-get-version" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Returns a list of supported versions and the current version.

## URL

`http://`*www.myserver.com*`/templeton/v1/version`

## Parameters

Only the [standard parameters]({{< ref "#standard-parameters" >}}) are accepted.

## Results



| Name | Description |
| --- | --- |
| **supportedVersions** | A list of all supported versions. |
| **version** | The current version. |

## Example

### Curl Command



```
% curl -s 'http://localhost:50111/templeton/v1/version'

```

### JSON Output



```
{
 "supportedVersions": [
   "v1"
 ],
 "version": "v1"
}


```

**Navigation Links**
Previous: [GET status]({{< ref "webhcat-reference-status_34015941" >}})  
 Next: [GET version/hive]({{< ref "webhcat-reference-versionhive_44303406" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

