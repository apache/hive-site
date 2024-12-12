---
title: "Apache Hive : WebHCat Reference GetTables"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference GetTables






# List Tables — GET ddl/database/:db/table


* [List Tables — GET ddl/database/:db/table]({{< ref "#list-tables-—-get-ddl/database/:db/table" >}})
	+ [Description]({{< ref "#description" >}})
	+ [URL]({{< ref "#url" >}})
	+ [Parameters]({{< ref "#parameters" >}})
	+ [Results]({{< ref "#results" >}})
	+ [Example]({{< ref "#example" >}})
		- [Curl Command]({{< ref "#curl-command" >}})
		- [JSON Output]({{< ref "#json-output" >}})
		- [JSON Output (error)]({{< ref "#json-output--error-" >}})




## Description

List the tables in an HCatalog database.

## URL

`http://`*www.myserver.com*`/templeton/v1/ddl/database/`*:db*`/table`

## Parameters



| Name | Description | Required? | Default |
| --- | --- | --- | --- |
| **:db** | The database name | Required | None |
| **like** | List only tables whose names match the specified pattern | Optional | "*" (List all tables) |

The [standard parameters]({{< ref "#standard-parameters" >}}) are also supported.

## Results



| Name | Description |
| --- | --- |
| **tables** | A list of table names |
| **database** | The database name |

## Example

### Curl Command



```
% curl -s 'http://localhost:50111/templeton/v1/ddl/database/default/table?user.name=ctdean&like=m*'

```

### JSON Output



```
{
 "tables": [
   "my\_table",
   "my\_table\_2",
   "my\_table\_3"
 ],
 "database": "default"
}

```

### JSON Output (error)



```
{
  "errorDetail": "
    org.apache.hadoop.hive.ql.metadata.HiveException: ERROR: The database defaultsd does not exist.
        at org.apache.hadoop.hive.ql.exec.DDLTask.switchDatabase(DDLTask.java:3122)
        at org.apache.hadoop.hive.ql.exec.DDLTask.execute(DDLTask.java:224)
        at org.apache.hadoop.hive.ql.exec.Task.executeTask(Task.java:134)
        at org.apache.hadoop.hive.ql.exec.TaskRunner.runSequential(TaskRunner.java:57)
        at org.apache.hadoop.hive.ql.Driver.launchTask(Driver.java:1332)
        at org.apache.hadoop.hive.ql.Driver.execute(Driver.java:1123)
        at org.apache.hadoop.hive.ql.Driver.run(Driver.java:931)
        at org.apache.hcatalog.cli.HCatDriver.run(HCatDriver.java:42)
        at org.apache.hcatalog.cli.HCatCli.processCmd(HCatCli.java:247)
        at org.apache.hcatalog.cli.HCatCli.processLine(HCatCli.java:203)
        at org.apache.hcatalog.cli.HCatCli.main(HCatCli.java:162)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
        at java.lang.reflect.Method.invoke(Method.java:597)
        at org.apache.hadoop.util.RunJar.main(RunJar.java:156)
    ",
  "error": "FAILED: Error in metadata: ERROR: The database defaultsd does not exist.",
  "errorCode": 500,
  "database": "defaultsd"
}

```

  


**Navigation Links**
Previous: [DELETE ddl/database/:db]({{< ref "webhcat-reference-deletedb_34016281" >}}) Next: [GET ddl/database/:db/table/:table]({{< ref "webhcat-reference-gettable_34016519" >}})

General: [DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}) – [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)




 

 

