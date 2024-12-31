---
title: "Apache Hive : WebHCat Reference GetPartition"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetPartition

# Describe Partition — GET ddl/database/:db/table/:table/partition/:partition

* [Describe Partition — GET ddl/database/:db/table/:table/partition/:partition]({{< ref "#describe-partition--get-ddldatabasedbtabletablepartitionpartition" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})

## Description

Describe a single partition in an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/partition/`*:partition*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |
| **:partition** | The partition name, col\_name='value' list. Be careful to properly encode the quote for http, for example, country=%27algeria%27. | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **database** | The database name |
| **table** | The table name |
| **partition** | The partition name |
| **partitioned** | True if the table is partitioned |
| **location** | Location of table |
| **outputFormat** | Output format |
| **columns** | List of column names, types, and comments |
| **owner** | The owner's user name |
| **partitionColumns** | List of the partition columns |
| **inputFormat** | Input format |

## Example

### Curl Command

```
% curl -s \
   'http://localhost:50111/templeton/v1/ddl/database/default/table/mytest/partition/country=%27US%27?user.name=ctdean'

```

### JSON Output

```
{
  "partitioned": true,
  "location": "hdfs://ip-10-77-6-151.ec2.internal:8020/apps/hive/warehouse/mytest/loc1",
  "outputFormat": "org.apache.hadoop.hive.ql.io.RCFileOutputFormat",
  "columns": [
    {
      "name": "i",
      "type": "int"
    },
    {
      "name": "j",
      "type": "bigint"
    },
    {
      "name": "ip",
      "comment": "IP Address of the User",
      "type": "string"
    }
  ],
  "owner": "rachel",
  "partitionColumns": [
    {
      "name": "country",
      "type": "string"
    }
  ],
  "inputFormat": "org.apache.hadoop.hive.ql.io.RCFileInputFormat",
  "database": "default",
  "table": "mytest",
  "partition": "country='US'"
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/partition]({{< ref "webhcat-reference-getpartitions_34016583" >}}) Next: [PUT ddl/database/:db/table/:table/partition/:partition]({{< ref "webhcat-reference-putpartition_34016600" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

