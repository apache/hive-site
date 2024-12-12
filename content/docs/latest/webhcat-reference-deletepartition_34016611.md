---
title: "Apache Hive : WebHCat Reference DeletePartition"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference DeletePartition






# Delete Partition — DELETE ddl/database/:db/table/:table/partition/:partition


* [Delete Partition — DELETE ddl/database/:db/table/:table/partition/:partition]({{< ref "#delete-partition-—-delete-ddl/database/:db/table/:table/partition/:partition" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Delete (drop) a partition in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/partition/`*:partition*

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:partition** | The partition name, col\_name='value' list. Be careful to properly encode the quote for http, for example, country=%27algeria%27. | Required | None |
| **ifExists** | Hive returns an error if the partition specified does not exist, unless **ifExists** is set to true. | Optional | false |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use. The format is "`rwxrw-r-x`". | Optional | None |

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
% curl -s -X DELETE \
       'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/partition/country=%27algeria%27?user.name=ctdean'

```

### JSON Output



```
{
 "partition": "country='algeria'",
 "table": "test\_table",
 "database": "default"
}

```

  


**Navigation Links**
Previous: [PUT ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-putpartition_34016600" >}}) Next: [GET ddl/database/:db/table/:table/column]({{< ref "webhcat-reference-getcolumns_34016970" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

