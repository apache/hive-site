---
title: "Apache Hive : WebHCat Reference GetPartitions"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetPartitions

{{< toc >}}

## Description

List all the partitions in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/partition`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **partitions** | A list of partition values and of partition names |
| **database** | The database name |
| **table** | The table name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/my_table/partition?user.name=ctdean'

```

### JSON Output

```
{
  "partitions": [
    {
      "values": [
        {
          "columnName": "dt",
          "columnValue": "20120101"
        },
        {
          "columnName": "country",
          "columnValue": "US"
        }
      ],
      "name": "dt='20120101',country='US'"
    }
  ],
  "database": "default",
  "table": "my_table"
}

```

  

**Navigation Links**
Previous: [PUT ddl/database/:db/table/:existingtable/like/:newtable]({{< ref "webhcat-reference-puttablelike_34016572" >}}) Next: [GET ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-getpartition_34016592" >}})



 

 

