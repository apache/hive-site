---

title: "Apache Hive : WebHCat Reference ResponseTypes"
date: 2024-12-12
----------------

# Apache Hive : WebHCat Reference ResponseTypes

# Response Types — GET :version

* [Response Types — GET :version]({{< ref "#response-types--get-version" >}})
  + [Description]({{< ref "#description" >}})
  + [URL]({{< ref "#url" >}})
  + [Parameters]({{< ref "#parameters" >}})
  + [Results]({{< ref "#results" >}})
  + [Example]({{< ref "#example" >}})
    - [Curl Command]({{< ref "#curl-command" >}})
    - [JSON Output]({{< ref "#json-output" >}})
    - [JSON Output (error)]({{< ref "#json-output-error" >}})

## Description

Returns a list of the response types supported by WebHCat (Templeton).

## URL

`http://`*www.myserver.com*`/templeton/`*:version*

## Parameters

|     Name     |                        Description                         | Required? | Default |
|--------------|------------------------------------------------------------|-----------|---------|
| **:version** | The WebHCat version number. (Currently this must be "v1".) | Required  | None    |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

|       Name        |              Description               |
|-------------------|----------------------------------------|
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
Previous: [Reference: WebHCat Resources]({{< ref "webhcat-reference_34015762" >}})   
Next: [GET status]({{< ref "webhcat-reference-status_34015941" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

