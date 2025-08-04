---
title: "Apache Hive : WebHCat Reference Status"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference Status

{{< toc >}}

## Description

Returns the current status of the WebHCat (Templeton) server. Useful for heartbeat monitoring.

## URL

`http://`*www.myserver.com*`/templeton/v1/status`

## Parameters

Only the [standard parameters]({{< ref "#standard-parameters" >}}) are accepted.

## Results

| Name | Description |
| --- | --- |
| **status** | "ok" if the WebHCat server was contacted. |
| **version** | String containing the version number similar to "v1". |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/status'

```

### JSON Output

```
{
 "status": "ok",
 "version": "v1"
}

```

  

**Navigation Links**
Previous: [Response Types (GET :version)]({{< ref "webhcat-reference-responsetypes_34015937" >}})Next: [GET version]({{< ref "webhcat-reference-version_34015986" >}})



 

 

