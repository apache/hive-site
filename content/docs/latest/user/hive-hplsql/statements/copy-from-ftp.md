---
title: "Apache Hive : COPY FROM FTP Statement"
date: 2026-08-12
---

# Apache Hive : COPY FROM FTP Statement

COPY FROM FTP statement allows to copy files from a FTP server to local or any Hadoop compatible file system. Using this statement you can easily copy FTP subdirectories into HDFS i.e.

The NEW option helps you build a ETL process and download only new files from FTP.

**Syntax**:

```
COPY FROM FTP host [USER user [PWD password]] [DIR directory] [FILES files_wildcard] 
  [TO [LOCAL] target_directory] [options]

options:
  OVERWRITE | NEW
  SUBDIR
  SESSIONS num  
```

Notes:
- *host, user* and *pwd* specify the FTP host name, user name and password (identifier, string literal, variable or expression can be specified).
- DIR option specifies the directory to get files, optional. If skipped, the current working FTP directory is used
- FILES option specifies a wildcard (Java regular expression) to choose which files to transfer. By default, all files from the specified directory are transferred.
- LOCAL keyword means that files are copied to the local file system. By default files are copied to HDFS compatible file system.
- OVERWRITE means that the existing files will be overwritten, this is the default. 
- NEW means that only new files will be transferred, and existing files will be skipped. 
- SUBDIR option specifies to transfer files in sub-directories. The directory structure is recreated in the target. By default, the command transfers files only from the directory specified by DIR option. 
- SESSIONS specifies the number of concurrent FTP sessions to transfer the files. Each session transfers the whole file. By default, files are copied in the single session.
