---
title: "Apache Hive : COPY FROM LOCAL Statement"
date: 2026-08-12
---

# Apache Hive : COPY FROM LOCAL Statement

COPY FROM LOCAL statement allows to copy local directories and files to Hadoop compatible file system. Using this statement you can easily copy subdirectories into HDFS i.e.

**Syntax**:

```
COPY FROM LOCAL src [, src2, ...] TO tgt [options]

options:
  OVERWRITE
  DELETE
  IGNORE
```

Notes:

- *srcN* specifies a file or directory. If a directory is specified all subdirectories and their files are copied as well.
- *srcN* can be an expression, variable, quoted or unquoted string.
- If a single file is copied *tgt* must specify a path including the target file name.
- If multiple files are copied *tgt* must specify a directory.
- If the target directory does not exist it is created. 
- OVERWRITE specifies to overwrite the target files if they exist.
- DELETE specifies to delete the source file upon successfull copy.
- IGNORE specifies to ignore errors when copying a file and proceed to copy the remaining files.

**Example**:

Copy files from a directory and its subdirectories to a daily backup directory:

```
COPY FROM LOCAL '/home/data' TO '/user/backup/' || CURRENT_DATE;
```

**Compatibility:** HPL/SQL Extension

**Version:** HPL/SQL 0.3.7

See also:
- [COPY]({{< ref "copy" >}})
