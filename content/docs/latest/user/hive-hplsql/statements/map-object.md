---
title: "Apache Hive : MAP OBJECT Statement - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : MAP OBJECT Statement - PL/HQL Reference

MAP OBJECT statement allows you to map an object (table or view) to a connection profile. You can also use this statement to map an object name used in a PL/HQL script to the actual object name in the database. 

Depending on the connection profile linked to the object, PL/HQL can work with multiple databases to access different objects in a single PL/HQL script. 

For example, you can send queries to Hive and use a RDBMS or NoSQL database for logging.

**Syntax**:

```
MAP OBJECT source_name [TO target_name] [AT connection_profile];
```

Notes:
- *source_name* - the object name used in PL/HQL scripts
- *target_name* - the object name that actually used when accessing the database
- *connection_profile* - the connection profile used to access this object. If the profile is not specified the *default* profile is used.
- At least *target_name* or *connection_profile* must be specified
- *source_name, target_name* and *connection_profile* are expressions, so you can define them dynamically.

**Example**:

Query Hive and write log messages to a MySQL database:

```
MAP OBJECT log TO log.log_data AT mysqlconn;

DECLARE cnt INT;
SELECT count(*) INTO cnt FROM sales.users WHERE local_dt = CURRENT_DATE;

INSERT INTO log (message) VALUES ('Number of users: ' || cnt);  
```

**Compatibility:** PL/HQL extension

**Version**: PL/HQL 0.3.1
