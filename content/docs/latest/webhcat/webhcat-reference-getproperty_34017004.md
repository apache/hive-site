---
title: "Apache Hive : WebHCat Reference GetProperty"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetProperty

{{< toc >}}

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
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table/property/fruit?user.name=ctdean'

```

### JSON Output

```
{
 "property": {
   "fruit": "apple"
 },
 "table": "test_table",
 "database": "default"
}

```

### JSON Output (error)

```
{
  "error": "Table test_table does not exist",
  "errorCode": 404,
  "database": "default",
  "table": "test_table"
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table/property]({{< ref "webhcat-reference-getproperties_34016995" >}}) Next: [PUT ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-putproperty_34017012" >}})



 

 

