---
title: "Apache Hive : WebHCat Reference PutProperty"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference PutProperty






# Set Property — PUT ddl/database/:db/table/:table/property/:property


* [Set Property — PUT ddl/database/:db/table/:table/property/:property]({{< ref "#set-property-—-put-ddl/database/:db/table/:table/property/:property" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Add a single property on an HCatalog table. This will also reset an existing property.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/property/`*:property*

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:property** | The property name | Required | None |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use | Optional | None |
| **value** | The property value | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **database** | The database name |
| **table** | The table name |
| **property** | The property name |

## Example

### Curl Command



```
% curl -s -X PUT -HContent-type:application/json -d '{ "value": "apples" }' \
  'http://localhost:50111/templeton/v1/ddl/database/default/table/test\_table/property/fruit?user.name=ctdean'

```

### JSON Output



```
{
 "property": "fruit",
 "table": "test\_table",
 "database": "default"
}

```

  


**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-getproperty_34017004" >}}) Next: [POST mapreduce/streaming]({{< ref "webhcat-reference-mapreducestream_34017023" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

