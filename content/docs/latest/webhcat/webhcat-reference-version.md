---
title: "Apache Hive : WebHCat Reference Version"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Version

{{< toc >}}

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
Previous: [GET status]({{< ref "webhcat-reference-status" >}})  
 Next: [GET version/hive]({{< ref "webhcat-reference-versionhive" >}})



 

 

