---

title: "Apache Hive : WebHCat Reference DeleteDB"
date: 2024-12-12
----------------

# Apache Hive : WebHCat Reference DeleteDB

# Delete Database — DELETE ddl/database/:db

* [Delete Database — DELETE ddl/database/:db]({{< ref "#delete-database--delete-ddldatabasedb" >}})
  + [Description]({{< ref "#description" >}})
  + [URL]({{< ref "#url" >}})
  + [Parameters]({{< ref "#parameters" >}})
  + [Results]({{< ref "#results" >}})
  + [Example]({{< ref "#example" >}})
    - [Curl Command]({{< ref "#curl-command" >}})
    - [JSON Output]({{< ref "#json-output" >}})
    - [JSON Output (error)]({{< ref "#json-output-error" >}})

## Description

Delete a database.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*

## Parameters

|      Name       |                                                                               Description                                                                                | Required? | Default |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|
| **:db**         | The database name                                                                                                                                                        | Required  | None    |
| **ifExists**    | Hive returns an error if the database specified does not exist, unless ifExists is set to true.                                                                          | Optional  | false   |
| **option**      | Parameter set to either "restrict" or "cascade". Restrict will remove the schema if all the tables are empty. Cascade removes everything including data and definitions. | Optional  | None    |
| **group**       | The user group to use                                                                                                                                                    | Optional  | None    |
| **permissions** | The permissions string to use. The format is "`rwxrw-r-x`".                                                                                                              | Optional  | None    |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results

|     Name     |    Description    |
|--------------|-------------------|
| **database** | The database name |

## Example

### Curl Command

```
% curl -s -X DELETE "http://localhost:50111/templeton/v1/ddl/database/newdb?user.name=ctdean"

```

### JSON Output

```
{
 "database":"newdb"
}

```

### JSON Output (error)

```
{
  "errorDetail": "
    NoSuchObjectException(message:There is no database named my\_db)
        at org.apache.hadoop.hive.metastor...
    ",
  "error": "There is no database named newdb",
  "errorCode": 404,
  "database": "newdb"
}

```

**Navigation Links**
Previous: [PUT ddl/database/:db]({{< ref "webhcat-reference-putdb_34016273" >}}) Next: [GET ddl/database/:db/table]({{< ref "webhcat-reference-gettables_34016290" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

