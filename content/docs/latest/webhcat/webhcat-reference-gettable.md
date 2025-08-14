---
title: "Apache Hive : WebHCat Reference GetTable"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetTable

{{< toc >}}

## Description

Describe an HCatalog table. Normally returns a simple list of columns (using "desc table"), but the extended format will show more information (using "show table extended like").

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`?format=extended`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **format** | Set "`format=extended`" to see additional information (using "show table extended like") | Optional | Not extended |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **columns** | A list of column names and types |
| **database** | The database name |
| **table** | The table name |
| **partitioned** (extended only) | True if the table is partitioned |
| **location** (extended only) | Location of table |
| **outputFormat** (extended only) | Output format |
| **owner** (extended only) | The owner's user name |
| **partitionColumns** (extended only) | List of the partition columns |
| **inputFormat** (extended only) | Input format |

## Example

### Curl Command (simple)

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/my_table?user.name=ctdean'

```

### JSON Output (simple)

```
{
 "columns": [
   {
     "name": "id",
     "type": "bigint"
   },
   {
     "name": "user",
     "comment": "The user name",
     "type": "string"
   },
   {
     "name": "my_p",
     "type": "string"
   },
   {
     "name": "my_q",
     "type": "string"
   }
 ],
 "database": "default",
 "table": "my_table"
}

```

### Curl Command (extended)

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table?user.name=ctdean&format=extended'

```

### JSON Output (extended)

```
{
  "partitioned": true,
  "location": "hdfs://ip-10-77-6-151.ec2.internal:8020/apps/hive/warehouse/test_table",
  "outputFormat": "org.apache.hadoop.hive.ql.io.RCFileOutputFormat",
  "columns": [
    {
      "name": "id",
      "type": "bigint"
    },
    {
      "name": "price",
      "comment": "The unit price",
      "type": "float"
    }
  ],
  "owner": "ctdean",
  "partitionColumns": [
    {
      "name": "country",
      "type": "string"
    }
  ],
  "inputFormat": "org.apache.hadoop.hive.ql.io.RCFileInputFormat",
  "database": "default",
  "table": "test_table"
}

```

### JSON Output (error)

```
{
  "error": "Table xtest_table does not exist",
  "errorCode": 404,
  "database": "default",
  "table": "xtest_table"
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table]({{< ref "webhcat-reference-gettables" >}}) Next: [PUT ddl/database/:db/table/:table]({{< ref "webhcat-reference-puttable" >}})



 

 

