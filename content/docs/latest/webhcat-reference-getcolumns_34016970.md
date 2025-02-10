---
title: "Apache Hive : WebHCat Reference GetColumns"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetColumns

# List Columns — GET ddl/database/:db/table/:table/column

* [List Columns — GET ddl/database/:db/table/:table/column]({{< ref "#list-columns--get-ddldatabasedbtabletablecolumn" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

List the columns in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/column`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **columns** | A list of column names and types |
| **database** | The database name |
| **table** | The table name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/my_table/column?user.name=ctdean'

```

### JSON Output

```
{
 "columns": [
   {
     "name": "id",
     "type": "bigint"
   },
   {
     "name": "user",
     "comment": "The user name",
     "type": "string"
   },
   {
     "name": "my_p",
     "type": "string"
   },
   {
     "name": "my_q",
     "type": "string"
   }
 ],
 "database": "default",
 "table": "my_table"
}

```

  

**Navigation Links**
Previous: [DELETE ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-deletepartition_34016611" >}}) Next: [GET ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-getcolumn_34016979" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

