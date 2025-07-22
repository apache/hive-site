---
title: "Apache Hive : WebHCat Reference PutPartition"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference PutPartition

{{< toc >}}

## Description

Create a partition in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/partition/`*:partition*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:partition** | The partition name, col_name='value' list. Be careful to properly encode the quote for http, for example, country=%27algeria%27. | Required | None |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use | Optional | None |
| **location** | The location for partition creation | Required | None |
| **ifNotExists** | If true, return an error if the partition already exists. | Optional | False |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **partition** | The partition name |
| **table** | The table name |
| **database** | The database name |

## Example

### Curl Command

```
% curl -s -X PUT -HContent-type:application/json -d '{"location": "loc_a"}' \
       'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table/partition/country=%27algeria%27?user.name=ctdean'

```

### JSON Output

```
{
 "partition": "country='algeria'",
 "table": "test_table",
 "database": "default"
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-getpartition_34016592" >}}) Next: [DELETE ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-deletepartition_34016611" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

