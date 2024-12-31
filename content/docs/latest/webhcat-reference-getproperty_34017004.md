---
title: "Apache Hive : WebHCat Reference GetProperty"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetProperty

# Property Value — GET ddl/database/:db/table/:table/property/:property

* [Property Value — GET ddl/database/:db/table/:table/property/:property]({{< ref "#property-value--get-ddldatabasedbtabletablepropertyproperty" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})
		- [JSON Output (error)]({{< ref "#json-output-error" >}})

## Description

Return the value of a single table property.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/property/`*:property*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:property** | The property name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **property** | The requested property's name: value pair |
| **database** | The database name |
| **table** | The table name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/property/fruit?user.name=ctdean'

```

### JSON Output

```
{
 "property": {
   "fruit": "apple"
 },
 "table": "test\_table",
 "database": "default"
}

```

### JSON Output (error)

```
{
  "error": "Table test\_table does not exist",
  "errorCode": 404,
  "database": "default",
  "table": "test\_table"
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/property]({{< ref "webhcat-reference-getproperties_34016995" >}}) Next: [PUT ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-putproperty_34017012" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

