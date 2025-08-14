---
title: "Apache Hive : WebHCat Reference PostTable"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference PostTable

{{< toc >}}

## Description

Rename an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The existing (old) table name | Required | None |
| **rename** | The new table name | Required | None |
| **group** | The user group to use | Optional | None |
| **permissions** | The permissions string to use. The format is "`rwxrw-r-x`". | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **table** | The new table name |
| **database** | The database name |

## Example

### Curl Command

```
% curl -s -d rename=test_table_2 \
       'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table?user.name=ekoifman'

```

Version information

Prior to Hive 0.13.0, user.name was specified in POST requests as a form parameter: `curl -d user.name=*<user>*`.

In [Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-6576) onward, user.name should be specified in the query string (as shown above): `'http://.../templeton/v1/ddl/...?user.name=*<name>*'`. Specifying user.name as a form parameter is deprecated.

### JSON Output

```
{
 "table": "test_table_2",
 "database": "default"
}

```

### JSON Output (error)

```
{
  "error": "Table test_table does not exist",
  "errorCode": 404,
  "database": "default",
  "table": "test_table_2"
}

```

**Navigation Links**
Previous: [PUT ddl/database/:db/table/:table]({{< ref "webhcat-reference-puttable" >}})  
 Next: [DELETE ddl/database/:db/table/:table]({{< ref "webhcat-reference-deletetable" >}})



 

 

