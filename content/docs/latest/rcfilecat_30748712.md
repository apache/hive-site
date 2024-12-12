---
title: "Apache Hive : RCFileCat"
date: 2024-12-12
---

# Apache Hive : RCFileCat

# RCFileCat

* [RCFileCat]({{< ref "#rcfilecat" >}})
	+ [Data]({{< ref "#data" >}})
	+ [Metadata]({{< ref "#metadata" >}})

$HIVE\_HOME/bin/hive --rcfilecat is a shell utility which can be used to print data or metadata from [RC files]({{< ref "rcfile_58851803" >}}).

## Data

Prints out the rows stored in an RCFile, columns are tab separated and rows are newline separated.

Usage:

```
hive --rcfilecat [--start=start\_offset] [--length=len] [--verbose] fileName

--start=start\_offset           Start offset to begin reading in the file
--length=len                   Length of data to read from the file
--verbose                      Prints periodic stats about the data read,
                               how many records, how many bytes, scan rate

```

## Metadata

New in 0.11.0

Usage:

```
hive --rcfilecat [--column-sizes | --column-sizes-pretty] fileName

```

With the --column-sizes option set, instead of printing the data in the RC file, prints rows with 3 columns.  
 <column number> <uncompressed size> <compressed size>  
 The sizes of the columns are the aggregated sizes of the column in the entire file taken from the RC file headers.

With the --column-sizes-pretty option set prints the same data as is printed with the --column-sizes option but with a more human friendly format.

 

 

