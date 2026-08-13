---
title: "Apache Hive : CMP Statement"
date: 2026-08-12
---

# Apache Hive : CMP Statement

CMP statement helps you compare data in tables that can be located in the same or different databases. 

**Syntax**:

Compare the total number of rows:

```
CMP ROW_COUNT table1 [where_clause1] | (select_stmt1) [AT conn1], 
              table2 [where_clause2] | (select_stmt2) [AT conn2]
```

Compare the column summary (COUNT, SUM, MIN and MAX applied to columns):

```
CMP SUM table1 [where_clause1] [AT conn1], table2 [where_clause2] [AT conn2]
```

Notes:
- When data are equal, the CMP statement sets SQLCODE to 0. If data are not equal, SQLCODE is set to 1. In case of any SQL error, SQLCODE is set to -1
- When the connection profile is not specified, the default connection profile is used for the specified table

**Example 1**:

Compare the number of rows:

```
CMP ROW_COUNT sales.users WHERE local_dt = CURRENT_DATE, users_daily AT mysqlconn;  
```

**Example 2**:

Compare aggregate data in two tables:

```
CMP SUM sales.users WHERE local_dt = CURRENT_DATE, users_daily AT mysqlconn;  
```

**Compatibility:** HPL/SQL Extension

**Version:** HPL/SQL 0.3.13
