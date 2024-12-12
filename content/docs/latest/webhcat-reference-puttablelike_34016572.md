---
title: "Apache Hive : WebHCat Reference PutTableLike"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference PutTableLike






# Create Table Like — PUT ddl/database/:db/table/:existingtable/like/:newtable


* [Create Table Like — PUT ddl/database/:db/table/:existingtable/like/:newtable]({{< ref "#create-table-like-—-put-ddl/database/:db/table/:existingtable/like/:newtable" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Create a new HCatalog table like an existing one.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:existingtable*`/like/`*:newtable*

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:existingtable** | The existing table name | Required | None |
| **:newtable** | The new table name | Required | None |
| **group** | The user group to use when creating a table | Optional | None |
| **permissions** | The permissions string to use when creating a table | Optional | None |
| **external** | Allows you to specify a location so that Hive does not use the default location for this table. | Optional | false |
| **ifNotExists** | If true, you will not receive an error if the table already exists. | Optional | false |
| **location** | The HDFS path | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **table** | The new table name |
| **database** | The database name |

## Example

### Curl Command



```
% curl -s -X PUT -HContent-type:application/json -d {} \
 'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/like/test\_table\_2?user.name=ctdean'

```

### JSON Output



```
{
 "table": "test\_table\_2",
 "database": "default"
}

```

  


**Navigation Links**
Previous: [DELETE ddl/database/:db/table/:table]({{< ref "webhcat-reference-deletetable_34016561" >}}) Next: [GET ddl/database/:db/table/:table/partition]({{< ref "webhcat-reference-getpartitions_34016583" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

