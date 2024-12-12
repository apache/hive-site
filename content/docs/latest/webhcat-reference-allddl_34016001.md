---
title: "Apache Hive : WebHCat Reference AllDDL"
date: 2024-12-12
---









# Apache Hive : WebHCat Reference AllDDL






# WebHCat Reference: DDL Resources

This is an overview page for the WebHCat DDL resources. The full list of WebHCat resources is on [this overview page]({{< ref "webhcat-reference_34015762" >}}).

* For information about HCatalog DDL commands, see [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}).
* For information about Hive DDL commands, see [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}}).

  




| Object | Resource (Type) | Description |
| --- | --- | --- |
| DDL Command | [ddl (POST)]({{< ref "webhcat-reference-ddl_34015990" >}}) | Perform an HCatalog DDL command. |
| Database | [ddl/database (GET)]({{< ref "webhcat-reference-getdbs_34016238" >}}) | List HCatalog databases. |
|   | [ddl/database/:db (GET)]({{< ref "webhcat-reference-getdb_34016250" >}}) | Describe an HCatalog database. |
|   | [ddl/database/:db (PUT)]({{< ref "webhcat-reference-putdb_34016273" >}}) | Create an HCatalog database. |
|   | [ddl/database/:db (DELETE)]({{< ref "webhcat-reference-deletedb_34016281" >}}) | Delete (drop) an HCatalog database. |
| Table | [ddl/database/:db/table (GET)]({{< ref "webhcat-reference-gettables_34016290" >}}) | List the tables in an HCatalog database. |
|   | [ddl/database/:db/table/:table (GET)]({{< ref "webhcat-reference-gettable_34016519" >}}) | Describe an HCatalog table. |
|   | [ddl/database/:db/table/:table (PUT)]({{< ref "webhcat-reference-puttable_34016540" >}}) | Create a new HCatalog table. |
|   | [ddl/database/:db/table/:table (POST)]({{< ref "webhcat-reference-posttable_34016548" >}}) | Rename an HCatalog table. |
|   | [ddl/database/:db/table/:table (DELETE)]({{< ref "webhcat-reference-deletetable_34016561" >}}) | Delete (drop) an HCatalog table. |
|   | [ddl/database/:db/table/:existingtable/like/:newtable (PUT)]({{< ref "webhcat-reference-puttablelike_34016572" >}}) | Create a new HCatalog table like an existing one. |
| Partition | [ddl/database/:db/table/:table/partition (GET)]({{< ref "webhcat-reference-getpartitions_34016583" >}}) | List all partitions in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (GET)]({{< ref "webhcat-reference-getpartition_34016592" >}}) | Describe a single partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (PUT)]({{< ref "webhcat-reference-putpartition_34016600" >}}) | Create a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (DELETE)]({{< ref "webhcat-reference-deletepartition_34016611" >}}) | Delete (drop) a partition in an HCatalog table. |
| Column | [ddl/database/:db/table/:table/column (GET)]({{< ref "webhcat-reference-getcolumns_34016970" >}}) | List the columns in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (GET)]({{< ref "webhcat-reference-getcolumn_34016979" >}}) | Describe a single column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (PUT)]({{< ref "webhcat-reference-putcolumn_34016987" >}}) | Create a column in an HCatalog table. |
| Property | [ddl/database/:db/table/:table/property (GET)]({{< ref "webhcat-reference-getproperties_34016995" >}}) | List table properties. |
|   | [ddl/database/:db/table/:table/property/:property (GET)]({{< ref "webhcat-reference-getproperty_34017004" >}}) | Return the value of a single table property. |
|   | [ddl/database/:db/table/:table/property/:property (PUT)]({{< ref "webhcat-reference-putproperty_34017012" >}}) | Set a table property. |

  


**Navigation Links**
Previous: [GET version]({{< ref "webhcat-reference-version_34015986" >}}) Next: [POST ddl]({{< ref "webhcat-reference-ddl_34015990" >}})

HCatalog DDL commands: [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}) Hive DDL commands: [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}})

General: [WebHCat Reference]({{< ref "webhcat-reference_34015762" >}}) – [WebHCat (Templeton) Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Home]({{< ref "home_27362069" >}})




 

 

