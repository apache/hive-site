---
title: "Apache Hive : WebHCat Reference AllDDL"
date: 2024-12-12
---

# Apache Hive : WebHCat Reference AllDDL

# WebHCat Reference: DDL Resources

This is an overview page for the WebHCat DDL resources. The full list of WebHCat resources is on [this overview page]({{< ref "webhcat-reference" >}}).

* For information about HCatalog DDL commands, see [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}).
* For information about Hive DDL commands, see [Hive Data Definition Language]({{< ref "languagemanual-ddl" >}}).

  

| Object | Resource (Type) | Description |
| --- | --- | --- |
| DDL Command | [ddl (POST)]({{< ref "webhcat-reference-ddl" >}}) | Perform an HCatalog DDL command. |
| Database | [ddl/database (GET)]({{< ref "webhcat-reference-getdbs" >}}) | List HCatalog databases. |
|   | [ddl/database/:db (GET)]({{< ref "webhcat-reference-getdb" >}}) | Describe an HCatalog database. |
|   | [ddl/database/:db (PUT)]({{< ref "webhcat-reference-putdb" >}}) | Create an HCatalog database. |
|   | [ddl/database/:db (DELETE)]({{< ref "webhcat-reference-deletedb" >}}) | Delete (drop) an HCatalog database. |
| Table | [ddl/database/:db/table (GET)]({{< ref "webhcat-reference-gettables" >}}) | List the tables in an HCatalog database. |
|   | [ddl/database/:db/table/:table (GET)]({{< ref "webhcat-reference-gettable" >}}) | Describe an HCatalog table. |
|   | [ddl/database/:db/table/:table (PUT)]({{< ref "webhcat-reference-puttable" >}}) | Create a new HCatalog table. |
|   | [ddl/database/:db/table/:table (POST)]({{< ref "webhcat-reference-posttable" >}}) | Rename an HCatalog table. |
|   | [ddl/database/:db/table/:table (DELETE)]({{< ref "webhcat-reference-deletetable" >}}) | Delete (drop) an HCatalog table. |
|   | [ddl/database/:db/table/:existingtable/like/:newtable (PUT)]({{< ref "webhcat-reference-puttablelike" >}}) | Create a new HCatalog table like an existing one. |
| Partition | [ddl/database/:db/table/:table/partition (GET)]({{< ref "webhcat-reference-getpartitions" >}}) | List all partitions in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (GET)]({{< ref "webhcat-reference-getpartition" >}}) | Describe a single partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (PUT)]({{< ref "webhcat-reference-putpartition" >}}) | Create a partition in an HCatalog table. |
|   | [ddl/database/:db/table/:table/partition/:partition (DELETE)]({{< ref "webhcat-reference-deletepartition" >}}) | Delete (drop) a partition in an HCatalog table. |
| Column | [ddl/database/:db/table/:table/column (GET)]({{< ref "webhcat-reference-getcolumns" >}}) | List the columns in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (GET)]({{< ref "webhcat-reference-getcolumn" >}}) | Describe a single column in an HCatalog table. |
|   | [ddl/database/:db/table/:table/column/:column (PUT)]({{< ref "webhcat-reference-putcolumn" >}}) | Create a column in an HCatalog table. |
| Property | [ddl/database/:db/table/:table/property (GET)]({{< ref "webhcat-reference-getproperties" >}}) | List table properties. |
|   | [ddl/database/:db/table/:table/property/:property (GET)]({{< ref "webhcat-reference-getproperty" >}}) | Return the value of a single table property. |
|   | [ddl/database/:db/table/:table/property/:property (PUT)]({{< ref "webhcat-reference-putproperty" >}}) | Set a table property. |

  

**Navigation Links**
Previous: [GET version]({{< ref "webhcat-reference-version" >}}) Next: [POST ddl]({{< ref "webhcat-reference-ddl" >}})

HCatalog DDL commands: [HCatalog DDL]({{< ref "#hcatalog-ddl" >}}) Hive DDL commands: [Hive Data Definition Language]({{< ref "languagemanual-ddl" >}})

