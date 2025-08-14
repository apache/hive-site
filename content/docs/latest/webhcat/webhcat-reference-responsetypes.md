---
title: "Apache Hive : WebHCat Reference ResponseTypes"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference ResponseTypes

{{< toc >}}

## Description

Returns a list of the response types supported by WebHCat (Templeton).

## URL

`http://`*www.myserver.com*`/templeton/`*:version*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:version** | The WebHCat version number. (Currently this must be "v1".) | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **responseTypes** | A list of all supported response types |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1'

```

### JSON Output

```
{
  "responseTypes": [
    "application/json"
  ]
}

```

### JSON Output (error)

```
{
  "error": "null for uri: http://localhost:50111/templeton/v2"
}

```

  

**Navigation Links**
Previous: [Reference: WebHCat Resources]({{< ref "webhcat-reference" >}})   
Next: [GET status]({{< ref "webhcat-reference-status" >}})



 

 

