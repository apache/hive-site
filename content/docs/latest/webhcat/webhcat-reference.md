---
title: "Apache Hive : WebHCat Reference"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference

# Reference: WebHCat Resources

This overview page lists all of the WebHCat resources. (DDL resources are listed here and on another [overview page]({{< ref "webhcat-reference-allddl" >}}). For information about HCatalog DDL commands, see [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}). For information about Hive DDL commands, see [Hive Data Definition Language]({{< ref "languagemanual-ddl" >}}).)

 

| Category | Resource (Type) | Description |
| --- | --- | --- |
| General | [:version (GET)]({{< ref "webhcat-reference-responsetypes" >}}) | Return a list of supported response types. |
|   | [status (GET)]({{< ref "webhcat-reference-status" >}}) | Return the WebHCat server status. |
|   | [version (GET)]({{< ref "webhcat-reference-version" >}}) | Return a list of supported versions and the current version. |
|  | [version/hive (GET)]({{< ref "webhcat-reference-versionhive" >}}) | Return the Hive version being run. (Added in Hive 0.13.0.) |
|  | [version/hadoop (GET)]({{< ref "webhcat-reference-versionhadoop" >}}) | Return the Hadoop version being run. (Added in Hive 0.13.0.) |
| [DDL]({{< ref "webhcat-reference-allddl" >}}) | [ddl (POST)]({{< ref "webhcat-reference-ddl" >}}) | Perform an HCatalog DDL command. |
|   | [ddl/database (GET)]({{< ref "webhcat-reference-getdbs" >}}) | List HCatalog databases. |
|   | [ddl/database/:db (GET)]({{< ref "webhcat-reference-getdb" >}}) | Describe an HCatalog database. |
|   | [ddl/database/:db (PUT)]({{< ref "webhcat-reference-putdb" >}}) | Create an HCatalog database. |
|   | [ddl/database/:db (DELETE)]({{< ref "webhcat-reference-deletedb" >}}) | Delete (drop) an HCatalog database. |
|   | [ddl/database/:db/table (GET)]({{< ref "webhcat-reference-gettables" >}}) | List the tables in an HCatalog database. |
|   | [ddl/database/:db/table/:table (GET)]({{< ref "webhcat-reference-gettable" >}}) | Describe an HCatalog table. |
|   | [ddl/database/:db/table/:table (PUT)]({{< ref "webhcat-reference-puttable" >}}) | Create a new HCatalog table. |
|   | [ddl/database/:db/table/:table (POST)]({{< ref "webhcat-reference-posttable" >}}) | Rename an HCatalog table. |
|   | [ddl/database/:db/table/:table (DELETE)]({{< ref "webhcat-reference-deletetable" >}}) | Delete (drop) an HCatalog table. |
|   | [ddl/database/:db/table/:existingtable/like/:newtable (PUT)]({{< ref "webhcat-reference-puttablelike" >}}) | Create a new HCatalog table like an existing one. |
|   | [ddl/database/:db/table/:table/partition (GET)]({{< ref "webhcat-reference-getpartitions" >}}) | List all partitions in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (GET)]({{< ref "webhcat-reference-getpartition" >}}) | Describe a single partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (PUT)]({{< ref "webhcat-reference-putpartition" >}}) | Create a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (DELETE)]({{< ref "webhcat-reference-deletepartition" >}}) | Delete (drop) a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column (GET)]({{< ref "webhcat-reference-getcolumns" >}}) | List the columns in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (GET)]({{< ref "webhcat-reference-getcolumn" >}}) | Describe a single column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (PUT)]({{< ref "webhcat-reference-putcolumn" >}}) | Create a column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/property (GET)]({{< ref "webhcat-reference-getproperties" >}}) | List table properties. |
|   | [ddl/database/:db/table/:table/property/:property (GET)]({{< ref "webhcat-reference-getproperty" >}}) | Return the value of a single table property. |
|   | [ddl/database/:db/table/:table/property/:property (PUT)]({{< ref "webhcat-reference-putproperty" >}}) | Set a table property. |
| MapReduce | [mapreduce/streaming (POST)]({{< ref "webhcat-reference-mapreducestream" >}}) | Create and queue Hadoop streaming MapReduce jobs. |
|   | [mapreduce/jar (POST)]({{< ref "webhcat-reference-mapreducejar" >}}) | Create and queue standard Hadoop MapReduce jobs. |
| Pig | [pig (POST)]({{< ref "webhcat-reference-pig" >}}) | Create and queue Pig jobs. |
| Hive | [hive (POST)]({{< ref "webhcat-reference-hive" >}}) | Run Hive queries and commands. |
| Queue(deprecated in Hive 0.12,removed in Hive 0.14) | [queue (GET)]({{< ref "webhcat-reference-jobids" >}}) | Return a list of all job IDs. (Removed in Hive 0.14.0.) |
|   | [queue/:jobid (GET)]({{< ref "webhcat-reference-jobinfo" >}}) | Return the status of a job given its ID. (Removed in Hive 0.14.0.) |
|   | [queue/:jobid (DELETE)]({{< ref "webhcat-reference-deletejob" >}}) | Kill a job given its ID. (Removed in Hive 0.14.0.) |
| Jobs(Hive 0.12 and later) | [jobs (GET)]({{< ref "webhcat-reference-jobs" >}}) | Return a list of all job IDs. |
|   | [jobs/:jobid (GET)]({{< ref "webhcat-reference-job" >}}) | Return the status of a job given its ID. |
|   | [jobs/:jobid (DELETE)]({{< ref "webhcat-reference-deletejobid" >}}) | Kill a job given its ID. |

**Navigation Links**
Previous: [Configuration]({{< ref "webhcat-configure" >}})  
 Next: [GET :version]({{< ref "webhcat-reference-responsetypes" >}})

Overview of DDL resources: [WebHCat Reference: DDL]({{< ref "webhcat-reference-allddl" >}})   
 HCatalog DDL commands: [HCatalog DDL]({{< ref "#hcatalog-ddl" >}})   
 Hive DDL commands: [Hive Data Definition Language]({{< ref "languagemanual-ddl" >}})



 

 

