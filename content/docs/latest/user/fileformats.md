---
title: "Apache Hive : FileFormats"
date: 2024-12-12
---

# Apache Hive : FileFormats

## File Formats and Compression

### File Formats

Hive supports several file formats:

* Text File
* SequenceFile
* [RCFile]({{< ref "rcfile" >}})
* [Avro Files]({{< ref "avroserde" >}})
* [ORC Files]({{< ref "languagemanual-orc" >}})
* [Parquet]({{< ref "parquet" >}})
* Custom INPUTFORMAT and OUTPUTFORMAT

The [hive.default.fileformat]({{< ref "#hive-default-fileformat" >}}) configuration parameter determines the format to use if it is not specified in a [CREATE TABLE]({{< ref "#create-table" >}}) or [ALTER TABLE]({{< ref "#alter-table" >}}) statement.  Text file is the parameter's default value.

For more information, see the sections [Storage Formats]({{< ref "#storage-formats" >}}) and [Row Formats & SerDe]({{< ref "#row-formats-&-serde" >}}) on the DDL page.

### File Compression

* [Compressed Data Storage]({{< ref "compressedstorage" >}})
* [LZO Compression]({{< ref "languagemanual-lzo" >}})

 

 

