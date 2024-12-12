---
title: "Apache Hive : WebHCat Reference GetProperties"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetProperties

# List Properties — GET ddl/database/:db/table/:table/property

* [List Properties — GET ddl/database/:db/table/:table/property]({{< ref "#list-properties-—-get-ddl/database/:db/table/:table/property" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

List all the properties of an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/property`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **properties** | A list of the table's properties in name: value pairs |
| **database** | The database name |
| **table** | The table name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/property?user.name=ctdean'

```

### JSON Output

```
{
 "properties": {
   "fruit": "apple",
   "last\_modified\_by": "ctdean",
   "hcat.osd": "org.apache.hcatalog.rcfile.RCFileOutputDriver",
   "color": "blue",
   "last\_modified\_time": "1331620706",
   "hcat.isd": "org.apache.hcatalog.rcfile.RCFileInputDriver",
   "transient\_lastDdlTime": "1331620706",
   "comment": "Best table made today",
   "country": "Albania"
 },
 "table": "test\_table",
 "database": "default"
}

```

  

**Navigation Links**
Previous: [PUT ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-putcolumn_34016987" >}}) Next: [GET ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-getproperty_34017004" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

