---
title: "Apache Hive : WebHCat Reference DDL"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference DDL

# DDL Command — POST ddl

* [DDL Command — POST ddl]({{< ref "#ddl-command-—-post-ddl" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})
		- [JSON Output (error)]({{< ref "#json-output--error-" >}})

## Description

Performs an [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}) command. The command is executed immediately upon request. Responses are limited to 1 MB. For requests which may return longer results consider using the [Hive resource]({{< ref "webhcat-reference-hive_34017180" >}}) as an alternative.

## URL

`http://`*www.myserver.com*`/templeton/ddl`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **exec** | The HCatalog ddl string to execute | Required | None |
| **group** | The user group to use when creating a table | Optional | None |
| **permissions** | The permissions string to use when creating a table. The format is "`rwxrw-r-x`". | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **stdout** | A string containing the result HCatalog sent to standard out (possibly empty). |
| **stderr** | A string containing the result HCatalog sent to standard error (possibly empty). |
| **exitcode** | The exitcode HCatalog returned. |

## Example

### Curl Command

```
% curl -s -d 'exec=show tables;' \
       'http://localhost:50111/templeton/v1/ddl?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/ddl?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output

```
{
 "stdout": "important\_table
            my\_other\_table
            my\_table
            my\_table\_2
            pokes
            ",
 "stderr": "WARNING: org.apache.hadoop.metrics.jvm.EventCounter is deprecated...
            Hive history file=/tmp/ctdean/hive\_job\_log\_ctdean\_201111111258\_2117356679.txt
            OK
            Time taken: 1.202 seconds
            ",
 "exitcode": 0
}

```

### JSON Output (error)

```
{
  "stdout": "",
  "stderr": "WARNING: org.apache.hadoop.metrics.jvm.EventCounter is deprecated...
            Hive history file=/tmp/ctdean/hive\_job\_log\_ctdean\_201204051246\_689834593.txt
            FAILED: Parse Error: line 1:5 Failed to recognize predicate 'tab'...

            ",
  "exitcode": 11
}

```

**Navigation Links**
Previous: [GET version/hadoop]({{< ref "webhcat-reference-versionhadoop_44303410" >}})  
 Next: [GET ddl/database]({{< ref "webhcat-reference-getdbs_34016238" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

