---
title: "Apache Hive : WebHCat Reference GetProperties"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference GetProperties

{{< toc >}}

## Description

List all the properties of an HCatalog table.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*`/property`

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **:table** | The table name | Required | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **properties** | A list of the table's properties in name: value pairs |
| **database** | The database name |
| **table** | The table name |

## Example

### Curl Command

```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table/property?user.name=ctdean'

```

### JSON Output

```
{
 "properties": {
   "fruit": "apple",
   "last_modified_by": "ctdean",
   "hcat.osd": "org.apache.hcatalog.rcfile.RCFileOutputDriver",
   "color": "blue",
   "last_modified_time": "1331620706",
   "hcat.isd": "org.apache.hcatalog.rcfile.RCFileInputDriver",
   "transient_lastDdlTime": "1331620706",
   "comment": "Best table made today",
   "country": "Albania"
 },
 "table": "test_table",
 "database": "default"
}

```

  

**Navigation Links**
Previous: [PUT ddl/database/:db/table/:table/column/:column]({{< ref "webhcat-reference-putcolumn_34016987" >}}) Next: [GET ddl/database/:db/table/:table/property/:property]({{< ref "webhcat-reference-getproperty_34017004" >}})



 

 

