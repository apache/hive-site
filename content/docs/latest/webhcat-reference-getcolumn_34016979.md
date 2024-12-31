---
title: "Apache Hive : WebHCat Reference GetColumn"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetColumn

# Describe Column — GET ddl/database/:db/table/:table/column/:column

* [Describe Column — GET ddl/database/:db/table/:table/column/:column]({{< ref "#describe-column--get-ddldatabasedbtabletablecolumncolumn" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Describe a single column in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/column/`*:column*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:column** | The column name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **database** | The database name |
| **table** | The table name |
| **column** | A JSON object containing the column name, type, and comment (if any) |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/column/price?user.name=ctdean'

```

### JSON Output

```
{
 "database": "default",
 "table": "test\_table",
 "column": {
   "name": "price",
   "comment": "The unit price",
   "type": "float"
 }
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/column]({{< ref "webhcat-reference-getcolumns_34016970" >}}) Next: [PUT ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-putcolumn_34016987" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

