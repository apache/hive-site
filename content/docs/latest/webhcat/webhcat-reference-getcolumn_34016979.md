---
title: "Apache Hive : WebHCat Reference GetColumn"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetColumn

{{< toc >}}

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
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table/column/price?user.name=ctdean'

```

### JSON Output

```
{
 "database": "default",
 "table": "test_table",
 "column": {
   "name": "price",
   "comment": "The unit price",
   "type": "float"
 }
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/column]({{< ref "webhcat-reference-getcolumns_34016970" >}}) Next: [PUT ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-putcolumn_34016987" >}})



 

 

