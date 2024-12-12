---
title: "Apache Hive : WebHCat Reference GetDBs"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference GetDBs






# List Databases — GET ddl/database


* [List Databases — GET ddl/database]({{< ref "#list-databases-—-get-ddl/database" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

List the databases in HCatalog.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database`

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **like** | List only databases whose names match the specified pattern. | Optional | "*" (List all) |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **databases** | A list of database names. |

## Example

### Curl Command



```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database?user.name=ctdean&like=n*'

```

### JSON Output



```
{
 "databases": [
   "newdb",
   "newdb2"
 ]
}

```

  


**Navigation Links**
Previous: [POST ddl]({{< ref "webhcat-reference-ddl_34015990" >}})   
 Next: [GET ddl/database/:db]({{< ref "webhcat-reference-getdb_34016250" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

