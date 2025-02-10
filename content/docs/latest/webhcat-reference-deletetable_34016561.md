---
title: "Apache Hive : WebHCat Reference DeleteTable"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference DeleteTable

# Delete Table — DELETE ddl/database/:db/table/:table

* [Delete Table — DELETE ddl/database/:db/table/:table]({{< ref "#delete-table--delete-ddldatabasedbtabletable" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Delete (drop) an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **ifExists** | Hive 0.70 and later returns an error if the table specified does not exist, unless **ifExists** is set to true. | Optional | false |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use. The format is "`rwxrw-r-x`". | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **table** | The table name |
| **database** | The database name |

## Example

### Curl Command

```
% curl -s -X DELETE 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table?user.name=ctdean'

```

### JSON Output

```
{
 "table": "test_table",
 "database": "default"
}

```

  

**Navigation Links**
Previous: [POST ddl/database/:db/table/:table]({{< ref "webhcat-reference-posttable_34016548" >}}) Next: [PUT ddl/database/:db/table/:existingtable/like/:newtable]({{< ref "webhcat-reference-puttablelike_34016572" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

