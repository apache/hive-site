---
title: "Apache Hive : WebHCat Reference GetDB"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetDB

{{< toc >}}

## Description

Describe a database. (Note: This resource has a "format=extended" parameter however the output structure does not change if it is used.)

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **location** | The database location |
| **params** | The database parameters |
| **comment** | The database comment |
| **database** | The database name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/newdb?user.name=ctdean'

```

### JSON Output

```
{
 "location":"hdfs://localhost:9000/warehouse/newdb.db",
 "params":"{a=b}",
 "comment":"Hello there",
 "database":"newdb"
}

```

### JSON Output (error)

```
{
  "error": "No such database: newdb",
  "errorCode": 404
}

```

  

**Navigation Links**
Previous: [GET ddl/database]({{< ref "webhcat-reference-getdbs_34016238" >}}) Next: [PUT ddl/database/:db]({{< ref "webhcat-reference-putdb_34016273" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

