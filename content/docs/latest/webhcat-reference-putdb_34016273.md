---
title: "Apache Hive : WebHCat Reference PutDB"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference PutDB






# Create Database — PUT ddl/database/:db


* [Create Database — PUT ddl/database/:db]({{< ref "#create-database-—-put-ddl/database/:db" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})




## Description

Create a database.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use | Optional | None |
| **location** | The database location | Optional | None |
| **comment** | A comment for the database, like a description | Optional | None |
| **properties** | The database properties | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **database** | The database name |

## Example

### Curl Command



```
% curl -s -X PUT -HContent-type:application/json \
       -d '{ "comment":"Hello there",
             "location":"hdfs://localhost:9000/user/hive/my\_warehouse",
             "properties":{"a":"b"}}' \
       'http://localhost:50111/templeton/v1/ddl/database/newdb?user.name=rachel'

```

### JSON Output



```
{
 "database":"newdb"
}

```

  


**Navigation Links**
Previous: [GET ddl/database/:db]({{< ref "webhcat-reference-getdb_34016250" >}}) Next: [DELETE ddl/database/:db]({{< ref "webhcat-reference-deletedb_34016281" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

