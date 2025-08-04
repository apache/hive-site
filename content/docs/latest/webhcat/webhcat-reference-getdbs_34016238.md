---
title: "Apache Hive : WebHCat Reference GetDBs"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetDBs

{{< toc >}}

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



 

 

