---

title: "Apache Hive : Hive Schema Tool"
date: 2025-10-14
---

# Apache Hive : Hive Schema Tool

{{< toc >}}

## About

Schema tool helps to initialise and upgrade metastore database and hive sys schema.

## Metastore Schema Verification

Introduced in Hive 0.12.0. See [HIVE-3764](https://issues.apache.org/jira/browse/HIVE-3764).

Hive records the schema version in the metastore database and verifies that the metastore schema version is compatible with Hive binaries that are going to access the metastore. Note that the Hive properties to implicitly create or alter the existing schema are disabled by default. Hive will not attempt to change the metastore schema implicitly. When you execute a Hive query against an old schema, it will fail to access the metastore:

```
$ build/dist/bin/hive -e "show tables"
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.DDLTask. java.lang.RuntimeException: Unable to instantiate org.apache.hadoop.hive.metastore.HiveMetaStoreClient
```

The log will contain an error about version information not found:

```
...
Caused by: MetaException(message:Version information not found in metastore. )
...
```

By default the configuration property **metastore.schema.verification** is true. If we set it false, metastore implicitly writes the schema version if it's not matching. To disable the strict schema verification, you need to set this property to false in `hive-site.xml`.

See [Hive Metastore Administration]({{< ref "adminmanual-metastore-administration" >}}) for general information about the metastore.

## The Hive Schema Tool

Introduced in Hive 0.12.0. See [HIVE-5301](https://issues.apache.org/jira/browse/HIVE-5301). (Also see [HIVE-5449](https://issues.apache.org/jira/browse/HIVE-5449) for a bug fix.)

The Hive distribution now includes an offline tool for Hive metastore schema manipulation. This tool can be used to initialize the metastore schema for the current Hive version. It can also handle upgrading the schema from an older version to current. It tries to find the current schema from the metastore if it is available. This will be applicable to future upgrades like 0.12.0 to 0.13.0. In case of upgrades from older releases like 0.7.0 or 0.10.0, you can specify the schema version of the existing metastore as a command line option to the tool.

The `schematool` figures out the SQL scripts required to initialize or upgrade the schema and then executes those scripts against the backend database. The metastore DB connection information like JDBC URL, JDBC driver and DB credentials are extracted from the Hive configuration. You can provide alternate DB credentials if needed.

**Warning**: You should always initialize the metastore schema first and the Hive schema second. The Hive schema initialization checks the metastore database schema and if it is not initialized, it puts some objects into the metastore database as well to make sure hive schema is running. That also means if you want to run the metastore schema initialization after the hive one, it will fail as it finds a database that already contains some objects. 

### The `schematool` Command

The `schematool` command invokes the Hive schema tool with these options:

```
usage: schemaTool
 -alterCatalog <arg>                Alter a catalog, requires
                                    --catalogLocation and/or
                                    --catalogDescription parameter as well
 -catalogDescription <arg>          Description of new catalog
 -catalogLocation <arg>             Location of new catalog, required when
                                    adding a catalog
 -createCatalog <arg>               Create a catalog, requires
                                    --catalogLocation parameter as well
 -createLogsTable <arg>             Create table for Hive
                                    warehouse/compute logs
 -createUser                        Create the Hive user, set hiveUser to
                                    the db admin user and the hive
                                    password to the db admin password with
                                    this
 -dbOpts <databaseOpts>             Backend DB specific options
 -dbType <databaseType>             Metastore database type
 -driver <driver>                   driver name for connection
 -dropAllDatabases                  Drop all Hive databases (with
                                    CASCADE). This will remove all managed
                                    data!
 -dryRun                            list SQL scripts (no execute)
 -fromCatalog <arg>                 Catalog a moving database or table is
                                    coming from.  This is required if you
                                    are moving a database or table.
 -fromDatabase <arg>                Database a moving table is coming
                                    from.  This is required if you are
                                    moving a table.
 -help                              print this message
 -hiveDb <arg>                      Hive database (for use with
                                    createUser)
 -hivePassword <arg>                Hive password (for use with
                                    createUser)
 -hiveUser <arg>                    Hive user (for use with createUser)
 -ifNotExists                       If passed then it is not an error to
                                    create an existing catalog
 -info                              Show config and schema details
 -initOrUpgradeSchema               Initialize or upgrade schema to latest
                                    version
 -initSchema                        Schema initialization
 -initSchemaTo <initTo>             Schema initialization to a version
 -mergeCatalog <arg>                Merge databases from a catalog into
                                    other, Argument is the source catalog
                                    name Requires --toCatalog to indicate
                                    the destination catalog
 -metaDbType <metaDatabaseType>     Used only if upgrading the system
                                    catalog for hive
 -moveDatabase <arg>                Move a database between catalogs.
                                    Argument is the database name.
                                    Requires --fromCatalog and --toCatalog
                                    parameters as well
 -moveTable <arg>                   Move a table to a different database.
                                    Argument is the table name. Requires
                                    --fromCatalog, --toCatalog,
                                    --fromDatabase, and --toDatabase
                                    parameters as well.
 -passWord <password>               Override config file password
 -retentionPeriod <arg>             Specify logs table retention period
 -servers <serverList>              a comma-separated list of servers used
                                    in location validation in the format
                                    of scheme://authority (e.g.
                                    hdfs://localhost:8000)
 -toCatalog <arg>                   Catalog a moving database or table is
                                    going to.  This is required if you are
                                    moving a database or table.
 -toDatabase <arg>                  Database a moving table is going to.
                                    This is required if you are moving a
                                    table.
 -upgradeSchema                     Schema upgrade
 -upgradeSchemaFrom <upgradeFrom>   Schema upgrade from a version
 -url <url>                         connection url to the database
 -userName <user>                   Override config file user name
 -validate                          Validate the database
 -verbose                           only print SQL statements
 -yes                               Don't ask for confirmation when using
                                    -dropAllDatabases.
```

The **dbType** is required and can be one of:

```
derby|mysql|postgres|oracle|mssql|hive
```

The dbType "`mssql`" was added in Hive 0.13.1 with [HIVE-6862](https://issues.apache.org/jira/browse/HIVE-6862).

Note: dbType=hive only can be used on Hive sys schema. The others are metastore db types and in case of dbType=hive, it is mandatory to set metaDbType as well i.e.

```
schematool -dbType derby -initSchema
schematool -dbType hive -initSchema -metaDbType derby
```

### Usage Examples

* Initialize to current schema for a new Hive setup:

```
$ schematool -dbType derby -initSchema

Initializing the schema to: 4.2.0
2025-10-14 16:21:20,427 INFO schematool.HiveSchemaHelper: Metastore connection URL:	 jdbc:derby:metastore_db;create=true
Metastore connection URL:	 jdbc:derby:metastore_db;create=true
2025-10-14 16:21:20,427 INFO schematool.HiveSchemaHelper: Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
2025-10-14 16:21:20,427 INFO schematool.HiveSchemaHelper: Metastore connection User:	 APP
Metastore connection User:	 APP
Starting metastore schema initialization to 4.2.0
Initialization script hive-schema-4.2.0.derby.sql
...
Initialization script completed
```

* Get schema information:

```
$ schematool -dbType derby -info

2025-10-14 16:29:13,116 INFO schematool.HiveSchemaHelper: Metastore connection URL:	 jdbc:derby:metastore_db;create=true
Metastore connection URL:	 jdbc:derby:metastore_db;create=true
2025-10-14 16:29:13,116 INFO schematool.HiveSchemaHelper: Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
2025-10-14 16:29:13,116 INFO schematool.HiveSchemaHelper: Metastore connection User:	 APP
Metastore connection User:	 APP
Hive distribution version:	 4.2.0
Metastore schema version:	 4.2.0
```

* Init schema to for a given version:

```
$ schematool -dbType derby -initSchemaTo 3.1.0

2025-10-14 16:37:11,089 INFO schematool.HiveSchemaHelper: Metastore connection URL:	 jdbc:derby:metastore_db;create=true
Metastore connection URL:	 jdbc:derby:metastore_db;create=true
2025-10-14 16:37:11,089 INFO schematool.HiveSchemaHelper: Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
2025-10-14 16:37:11,089 INFO schematool.HiveSchemaHelper: Metastore connection User:	 APP
Metastore connection User:	 APP
Starting metastore schema initialization to 3.1.0
Initialization script hive-schema-3.1.0.derby.sql
...
Initialization script completed
```

* Upgrade schema from an 3.1.0 release by specifying the 'from' version:

```
$ schematool -dbType derby -upgradeSchemaFrom 3.1.0

Upgrading from the user input version 3.1.0
2025-10-14 16:41:04,018 INFO schematool.HiveSchemaHelper: Metastore connection URL:	 jdbc:derby:metastore_db;create=true
Metastore connection URL:	 jdbc:derby:metastore_db;create=true
2025-10-14 16:41:04,018 INFO schematool.HiveSchemaHelper: Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
2025-10-14 16:41:04,018 INFO schematool.HiveSchemaHelper: Metastore connection User:	 APP
Metastore connection User:	 APP
Starting upgrade metastore schema from version 3.1.0 to 4.2.0
Upgrade script upgrade-3.1.0-to-3.2.0.derby.sql
2025-10-14 16:41:04,142 INFO conf.HiveConf: Found configuration file file:/Users/raghav/Desktop/setup/hive/conf/hive-site.xml
2025-10-14 16:41:04,143 INFO conf.HiveConf: Found configuration file null
2025-10-14 16:41:04,143 INFO conf.HiveConf: Found configuration file null
2025-10-14 16:41:04,143 INFO conf.HiveConf: Found configuration file null
2025-10-14 16:41:04,173 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
Completed upgrade-3.1.0-to-3.2.0.derby.sql
Upgrade script upgrade-3.2.0-to-4.0.0-alpha-1.derby.sql
Completed upgrade-3.2.0-to-4.0.0-alpha-1.derby.sql
Upgrade script upgrade-4.0.0-alpha-1-to-4.0.0-alpha-2.derby.sql
Completed upgrade-4.0.0-alpha-1-to-4.0.0-alpha-2.derby.sql
Upgrade script upgrade-4.0.0-alpha-2-to-4.0.0-beta-1.derby.sql
Completed upgrade-4.0.0-alpha-2-to-4.0.0-beta-1.derby.sql
Upgrade script upgrade-4.0.0-beta-1-to-4.0.0.derby.sql
Completed upgrade-4.0.0-beta-1-to-4.0.0.derby.sql
Upgrade script upgrade-4.0.0-to-4.1.0.derby.sql
Completed upgrade-4.0.0-to-4.1.0.derby.sql
Upgrade script upgrade-4.1.0-to-4.2.0.derby.sql
Completed upgrade-4.1.0-to-4.2.0.derby.sql
```

* Upgrade dry run can be used to list the required scripts for the given upgrade.

```
$ schematool -dbType derby -upgradeSchemaFrom 3.1.0 -dryRun

Upgrading from the user input version 3.1.0
2025-10-14 16:43:16,211 INFO schematool.HiveSchemaHelper: Metastore connection URL:	 jdbc:derby:metastore_db;create=true
Metastore connection URL:	 jdbc:derby:metastore_db;create=true
2025-10-14 16:43:16,211 INFO schematool.HiveSchemaHelper: Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
Metastore connection Driver :	 org.apache.derby.iapi.jdbc.AutoloadedDriver
2025-10-14 16:43:16,211 INFO schematool.HiveSchemaHelper: Metastore connection User:	 APP
Metastore connection User:	 APP
Starting upgrade metastore schema from version 3.1.0 to 4.2.0
Upgrade script upgrade-3.1.0-to-3.2.0.derby.sql
Upgrade script upgrade-3.2.0-to-4.0.0-alpha-1.derby.sql
Upgrade script upgrade-4.0.0-alpha-1-to-4.0.0-alpha-2.derby.sql
Upgrade script upgrade-4.0.0-alpha-2-to-4.0.0-beta-1.derby.sql
Upgrade script upgrade-4.0.0-beta-1-to-4.0.0.derby.sql
Upgrade script upgrade-4.0.0-to-4.1.0.derby.sql
Upgrade script upgrade-4.1.0-to-4.2.0.derby.sql
```

This is useful if you just want to find out all the required scripts for the schema upgrade.

* Moving a database and tables under it from default Hive catalog to a custom spark catalog

```
build/dist/bin/schematool -moveDatabase db1 -fromCatalog hive -toCatalog spark
```

* Moving a table from Hive catalog to Spark Catalog

```
# Create the desired target database in spark catalog if it doesn't already exist.
beeline ... -e "create database if not exists newdb";
schematool -moveDatabase newdb -fromCatalog hive -toCatalog spark

# Now move the table to target db under the spark catalog.
schematool -moveTable table1 -fromCatalog hive -toCatalog spark  -fromDatabase db1 -toDatabase newdb
```

