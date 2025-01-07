---

title: "Apache Hive : HCatalog StorageFormats"
date: 2024-12-12
----------------

# Apache Hive : HCatalog StorageFormats

# Storage Formats

* [Storage Formats]({{< ref "#storage-formats" >}})
  + [SerDes and Storage Formats]({{< ref "#serdes-and-storage-formats" >}})
  + [Usage from Hive]({{< ref "#usage-from-hive" >}})
  + [CTAS Issue with JSON SerDe]({{< ref "#ctas-issue-with-json-serde" >}})

### SerDes and Storage Formats

HCatalog uses Hive's SerDe class to serialize and deserialize data. SerDes are provided for RCFile, CSV text, JSON text, and SequenceFile formats. Check the [SerDe documentation]({{< ref "serde_27362059" >}}) for additional SerDes that might be included in new versions. For example, the [Avro SerDe]({{< ref "avroserde_27850707" >}}) was added in Hive 0.9.1, the [ORC]({{< ref "languagemanual-orc_31818911" >}}) file format was added in Hive 0.11.0, and [Parquet]({{< ref "parquet_38570914" >}}) was added in Hive 0.10.0 (plug-in) and Hive 0.13.0 (native).

Users can write SerDes for custom formats using these instructions:

* [How to Write Your Own SerDe]({{< ref "#how-to-write-your-own-serde" >}}) in the Developer Guide
* [Hive User Group Meeting August 2009](http://www.slideshare.net/ragho/hive-user-meeting-august-2009-facebook) pages 64-70
* also see [SerDe]({{< ref "serde_27362059" >}}) for details about input and output processing

For information about how to create a table with a custom or native SerDe, see [Row Format, Storage Format, and SerDe]({{< ref "#row-format,-storage-format,-and-serde" >}}).

### Usage from Hive

Hive and HCatalog (version 0.4 and later) share the same storage abstractions, and thus, you can read from and write to HCatalog tables from within Hive, and vice versa.

However, for HCatalog versions 0.4 and 0.5 Hive does not know where to find the HCatalog jar by default, so if you use any features that have been introduced by HCatalog, such as a table using the JSON SerDe, you might get a "class not found" exception. In this situation, before you run Hive, set environment variable `HIVE_AUX_JARS_PATH` to the directory with your HCatalog jar. (If the examples in the [Installation](http://hive.apache.org/docs/hcat_r0.5.0/install.html) document were followed, that should be `/usr/local/hcat/share/hcatalog/`.)

After version 0.5, HCatalog is part of the Hive distribution and you do not have to add the HCatalog jar to `HIVE_AUX_JARS_PATH`.

### CTAS Issue with JSON SerDe

Using the Hive CREATE TABLE ... AS SELECT command with a JSON SerDe results in a table that has column headers such as "`_col0`", which can be read by HCatalog or Hive but cannot be easily read by external users. To avoid this issue, create the table in two steps instead of using CTAS:

1. CREATE TABLE ...
2. INSERT OVERWRITE TABLE ... SELECT ...

See [HCATALOG-436](https://issues.apache.org/jira/browse/HCATALOG-436) for details.

 

**Navigation Links**
Previous: [Command Line Interface]({{< ref "hcatalog-cli_34013932" >}})  
Next: [Dynamic Partitioning]({{< ref "hcatalog-dynamicpartitions_34014006" >}})

SerDe general information: [Hive SerDe]({{< ref "#hive-serde" >}})  
SerDe details: [SerDe]({{< ref "serde_27362059" >}})  
SerDe DDL: [Row Format, Storage Format, and SerDe]({{< ref "#row-format,-storage-format,-and-serde" >}})

General: [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

