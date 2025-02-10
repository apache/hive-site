---
title: "Apache Hive : WebHCat Reference PutColumn"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference PutColumn

# Create Column — PUT ddl/database/:db/table/:table/column/:column

* [Create Column — PUT ddl/database/:db/table/:table/column/:column]({{< ref "#create-column--put-ddldatabasedbtabletablecolumncolumn" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Create a column in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/column/`*:column*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:column** | The column name | Required | None |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use | Optional | None |
| **type** | The type of column to add, like "string" or "int" | Required | None |
| **comment** | The column comment, like a description | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **column** | The column name |
| **table** | The table name |
| **database** | The database name |

## Example

### Curl Command

```
% curl -s -X PUT -HContent-type:application/json \
       -d '{"type": "string", "comment": "The brand name"}' \
       'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table/column/brand?user.name=ctdean'

```

### JSON Output

```
{
 "column": "brand",
 "table": "test_table",
 "database": "default"
 }
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-getcolumn_34016979" >}}) Next: [GET ddl/database/:db/table/:table/property]({{< ref "webhcat-reference-getproperties_34016995" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

