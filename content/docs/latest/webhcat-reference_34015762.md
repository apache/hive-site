---
title: "Apache Hive : WebHCat Reference"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference

# Reference: WebHCat Resources

This overview page lists all of the WebHCat resources. (DDL resources are listed here and on another [overview page]({{< ref "webhcat-reference-allddl_34016001" >}}). For information about HCatalog DDL commands, see [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}). For information about Hive DDL commands, see [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}}).)

 

| Category | Resource (Type) | Description |
| --- | --- | --- |
| General | [:version (GET)]({{< ref "webhcat-reference-responsetypes_34015937" >}}) | Return a list of supported response types. |
|   | [status (GET)]({{< ref "webhcat-reference-status_34015941" >}}) | Return the WebHCat server status. |
|   | [version (GET)]({{< ref "webhcat-reference-version_34015986" >}}) | Return a list of supported versions and the current version. |
|  | [version/hive (GET)]({{< ref "webhcat-reference-versionhive_44303406" >}}) | Return the Hive version being run. (Added in Hive 0.13.0.) |
|  | [version/hadoop (GET)]({{< ref "webhcat-reference-versionhadoop_44303410" >}}) | Return the Hadoop version being run. (Added in Hive 0.13.0.) |
| [DDL]({{< ref "webhcat-reference-allddl_34016001" >}}) | [ddl (POST)]({{< ref "webhcat-reference-ddl_34015990" >}}) | Perform an HCatalog DDL command. |
|   | [ddl/database (GET)]({{< ref "webhcat-reference-getdbs_34016238" >}}) | List HCatalog databases. |
|   | [ddl/database/:db (GET)]({{< ref "webhcat-reference-getdb_34016250" >}}) | Describe an HCatalog database. |
|   | [ddl/database/:db (PUT)]({{< ref "webhcat-reference-putdb_34016273" >}}) | Create an HCatalog database. |
|   | [ddl/database/:db (DELETE)]({{< ref "webhcat-reference-deletedb_34016281" >}}) | Delete (drop) an HCatalog database. |
|   | [ddl/database/:db/table (GET)]({{< ref "webhcat-reference-gettables_34016290" >}}) | List the tables in an HCatalog database. |
|   | [ddl/database/:db/table/:table (GET)]({{< ref "webhcat-reference-gettable_34016519" >}}) | Describe an HCatalog table. |
|   | [ddl/database/:db/table/:table (PUT)]({{< ref "webhcat-reference-puttable_34016540" >}}) | Create a new HCatalog table. |
|   | [ddl/database/:db/table/:table (POST)]({{< ref "webhcat-reference-posttable_34016548" >}}) | Rename an HCatalog table. |
|   | [ddl/database/:db/table/:table (DELETE)]({{< ref "webhcat-reference-deletetable_34016561" >}}) | Delete (drop) an HCatalog table. |
|   | [ddl/database/:db/table/:existingtable/like/:newtable (PUT)]({{< ref "webhcat-reference-puttablelike_34016572" >}}) | Create a new HCatalog table like an existing one. |
|   | [ddl/database/:db/table/:table/partition (GET)]({{< ref "webhcat-reference-getpartitions_34016583" >}}) | List all partitions in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (GET)]({{< ref "webhcat-reference-getpartition_34016592" >}}) | Describe a single partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (PUT)]({{< ref "webhcat-reference-putpartition_34016600" >}}) | Create a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (DELETE)]({{< ref "webhcat-reference-deletepartition_34016611" >}}) | Delete (drop) a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column (GET)]({{< ref "webhcat-reference-getcolumns_34016970" >}}) | List the columns in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (GET)]({{< ref "webhcat-reference-getcolumn_34016979" >}}) | Describe a single column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (PUT)]({{< ref "webhcat-reference-putcolumn_34016987" >}}) | Create a column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/property (GET)]({{< ref "webhcat-reference-getproperties_34016995" >}}) | List table properties. |
|   | [ddl/database/:db/table/:table/property/:property (GET)]({{< ref "webhcat-reference-getproperty_34017004" >}}) | Return the value of a single table property. |
|   | [ddl/database/:db/table/:table/property/:property (PUT)]({{< ref "webhcat-reference-putproperty_34017012" >}}) | Set a table property. |
| MapReduce | [mapreduce/streaming (POST)]({{< ref "webhcat-reference-mapreducestream_34017023" >}}) | Create and queue Hadoop streaming MapReduce jobs. |
|   | [mapreduce/jar (POST)]({{< ref "webhcat-reference-mapreducejar_34017030" >}}) | Create and queue standard Hadoop MapReduce jobs. |
| Pig | [pig (POST)]({{< ref "webhcat-reference-pig_34017169" >}}) | Create and queue Pig jobs. |
| Hive | [hive (POST)]({{< ref "webhcat-reference-hive_34017180" >}}) | Run Hive queries and commands. |
| Queue(deprecated in Hive 0.12,removed in Hive 0.14) | [queue (GET)]({{< ref "webhcat-reference-jobids_34017187" >}}) | Return a list of all job IDs. (Removed in Hive 0.14.0.) |
|   | [queue/:jobid (GET)]({{< ref "webhcat-reference-jobinfo_34017194" >}}) | Return the status of a job given its ID. (Removed in Hive 0.14.0.) |
|   | [queue/:jobid (DELETE)]({{< ref "webhcat-reference-deletejob_34017204" >}}) | Kill a job given its ID. (Removed in Hive 0.14.0.) |
| Jobs(Hive 0.12 and later) | [jobs (GET)]({{< ref "webhcat-reference-jobs_34835057" >}}) | Return a list of all job IDs. |
|   | [jobs/:jobid (GET)]({{< ref "webhcat-reference-job_34835065" >}}) | Return the status of a job given its ID. |
|   | [jobs/:jobid (DELETE)]({{< ref "webhcat-reference-deletejobid_34835045" >}}) | Kill a job given its ID. |

**Navigation Links**
Previous: [Configuration]({{< ref "webhcat-configure_34015738" >}})  
 Next: [GET :version]({{< ref "webhcat-reference-responsetypes_34015937" >}})

Overview of DDL resources: [WebHCat Reference: DDL]({{< ref "webhcat-reference-allddl_34016001" >}})   
 HCatalog DDL commands: [HCatalog DDL]({{< ref "#hcatalog-ddl" >}})   
 Hive DDL commands: [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}})

General: [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

