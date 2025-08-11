---
title: "Apache Hive : WebHCat Reference PutTable"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference PutTable

{{< toc >}}

## Description

Create a new HCatalog table. For more information, please refer to the Hive documentation for [CREATE TABLE]({{< ref "#create-table" >}}).

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table/`*:table*

## Parameters

| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name. | Required | None |
| **:table** | The new table name. | Required | None |
| **group** | The user group to use when creating a table. | Optional | None |
| **permissions** | The permissions string to use when creating a table. | Optional | None |
| **external** | Allows you to specify a location so that Hive does not use the default location for this table. | Optional | false |
| **ifNotExists** | If true, you will not receive an error if the table already exists. | Optional | false |
| **comment** | Comment for the table. | Optional | None |
| **columns** | A list of column descriptions, including name, type, and an optional comment. | Optional | None |
| **partitionedBy** | A list of column descriptions used to partition the table. Like the **columns** parameter this is a list of name, type, and comment fields. | Optional | None |
| **clusteredBy** | An object describing how to cluster the table including the parameters columnNames, sortedBy, and numberOfBuckets. The sortedBy parameter includes the parameters columnName and order (ASC for ascending or DESC for descending). For further information please refer to the examples below or to the [Hive documentation]({{< ref "#hive-documentation" >}}). | Optional | None |
| **format** | Storage format description including parameters for rowFormat, storedAs, and storedBy. For further information please refer to the examples below or to the [Hive documentation]({{< ref "#hive-documentation" >}}). | Optional | None |
| **location** | The HDFS path. | Optional | None |
| **tableProperties** | A list of table property names and values (key/value pairs). | Optional | None |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

| Name | Description |
| --- | --- |
| **table** | The new table name. |
| **database** | The database name. |

## Example

### Curl Command

```
% curl -s -X PUT -HContent-type:application/json -d '{
 "comment": "Best table made today",
 "columns": [
   { "name": "id", "type": "bigint" },
   { "name": "price", "type": "float", "comment": "The unit price" } ],
 "partitionedBy": [
   { "name": "country", "type": "string" } ],
 "format": { "storedAs": "rcfile" } }' \
 'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table?user.name=ctdean'

```

### Curl Command (using clusteredBy)

```
% curl -s -X PUT -HContent-type:application/json -d '{
  "comment": "Best table made today",
  "columns": [
    { "name": "id", "type": "bigint"},
    { "name": "price", "type": "float", "comment": "The unit price" } ],
  "partitionedBy": [
    { "name": "country", "type": "string" } ],
  "clusteredBy": {
    "columnNames": ["id"],
    "sortedBy": [
      { "columnName": "id", "order": "ASC" } ],
    "numberOfBuckets": 10 },
  "format": {
    "storedAs": "rcfile",
    "rowFormat": {
      "fieldsTerminatedBy": "\u0001",
      "serde": {
        "name": "org.apache.hadoop.hive.serde2.columnar.ColumnarSerDe",
        "properties": {
          "key": "value" } } } }
  } ' \
  'http://localhost:50111/templeton/v1/ddl/database/default/table/test_table_c?user.name=ctdean'

```

### JSON Output

```
{
 "table": "test_table",
 "database": "default"
}

```

### JSON Output (error)

```
{
  "statement": "use default; create table test_table_c(id bigint, price float comment ...",
  "error": "unable to create table: test_table_c",
  "exec": {
    "stdout": "",
    "stderr": "WARNING: org.apache.hadoop.metrics.jvm.EventCounter is deprecated...
        Hive history file=/tmp/ctdean/hive_job_log_ctdean_201204051335_2016086186.txt
        SLF4J: Class path contains multiple SLF4J bindings.
        SLF4J: Found binding in ...
        SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
        OK
        Time taken: 0.448 seconds
        FAILED: Error in semantic analysis: Operation not supported. HCatalog doesn't allow Clustered By in create table.
        ",
    "exitcode": 10
  }
}

```

  

**Navigation Links**
Previous: [GET ddl/database/:db/table/:table]({{< ref "webhcat-reference-gettable" >}}) Next: [POST ddl/database/:db/table/:table]({{< ref "webhcat-reference-posttable" >}})



 

 

