---
title: "Apache Hive : HCatalog CLI"
date: 2024-12-12
---

# Apache Hive : HCatalog CLI

# Command Line Interface

* [Command Line Interface]({{< ref "#command-line-interface" >}})
	+ [Set Up]({{< ref "#set-up" >}})
	+ [HCatalog CLI]({{< ref "#hcatalog-cli" >}})
		- [Owner Permissions]({{< ref "#owner-permissions" >}})
		- [Hive CLI]({{< ref "#hive-cli" >}})
	+ [HCatalog DDL]({{< ref "#hcatalog-ddl" >}})
		- [Create/Drop/Alter Table]({{< ref "#create/drop/alter-table" >}})
		- [Create/Drop/Alter View]({{< ref "#create/drop/alter-view" >}})
		- [Show/Describe]({{< ref "#show/describe" >}})
		- [Create/Drop Index]({{< ref "#create/drop-index" >}})
		- [Create/Drop Function]({{< ref "#create/drop-function" >}})
		- ["dfs" Command and "set" Command]({{< ref "#dfs-set-cmd" >}})
		- [Other Commands]({{< ref "#other-commands" >}})
	+ [CLI Errors]({{< ref "#cli-errors" >}})
		- [Authentication]({{< ref "#authentication" >}})
		- [Error Log]({{< ref "#error-log" >}})

## Set Up

The HCatalog command line interface (CLI) can be invoked as `HIVE_HOME=`*hive\_home hcat\_home*`/bin/hcat` where *hive\_home* is the directory where Hive has been installed and *hcat\_home* is the directory where HCatalog has been installed.

If you are using BigTop's rpms or debs you can invoke the CLI by doing `/usr/bin/hcat`.

## HCatalog CLI

The HCatalog CLI supports these command line options:

| Option | Usage | Description |
| --- | --- | --- |
| **-g** | `hcat -g mygroup ...` | Tells HCatalog that the table which needs to be created must have group "mygroup". |
| **-p** | `hcat -p rwxr-xr-x ...` | Tells HCatalog that the table which needs to be created must have permissions "rwxr-xr-x". |
| **-f** | `hcat -f myscript.hcatalog ...` | Tells HCatalog that myscript.hcatalog is a file containing DDL commands to execute. |
| **-e** | `hcat -e 'create table mytable(a int);' ...` | Tells HCatalog to treat the following string as a DDL command and execute it. |
| **-D** | `hcat -D`*key*`=`*value* `...` | Passes the key-value pair to HCatalog as a Java System Property. |
|   | `hcat` | Prints a usage message. |

Note the following:

* The **-g** and **-p** options are not mandatory.
* Only one **-e** or **-f** option can be provided, not both.
* The order of options is immaterial; you can specify the options in any order.

If no option is provided, then a usage message is printed:

```
Usage:  hcat  { -e "<query>" | -f <filepath> }  [-g <group>] [-p <perms>] [-D<name>=<value>]

```

### Owner Permissions

When using the HCatalog CLI, you cannot specify a permission string without read permissions for owner, such as `-wxrwxr-x`, because the string begins with "`-`". If such a permission setting is desired, you can use the octal version instead, which in this case would be 375. Also, any other kind of permission string where the owner has read permissions (for example `r-x-----` or `r--r--r--`) will work fine.

### Hive CLI

Many `hcat` commands can be issued as `hive` commands, including all HCatalog DDL commands. The Hive CLI includes some commands that are not available in the HCatalog CLI. Note these differences:

* "`hcat -g`" and "`hcat -p`" for table group and permission settings are only available in the HCatalog CLI.
* `hcat` uses the `-p` flag for permissions but `hive` uses it to specify a port number.
* `hcat` uses the `-D` flag *without a space* to define key=value pairs but `hive` uses `-d` or `--define` with a space (also `--hivevar`).  
 For example, "`hcat -DA=B`" versus "`hive -d A=B`".
* `hcat` without any flags prints a help message but `hive` uses the `-H` flag or `--help`.

The Hive CLI is documented [here]({{< ref "languagemanual-cli_27362033" >}}).

## HCatalog DDL

HCatalog supports all [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}}) except those operations that require running a MapReduce job. For commands that are supported, any variances are noted below.

HCatalog does not support the following Hive DDL and other HiveQL commands:

* ALTER INDEX ... REBUILD
* CREATE TABLE ... AS SELECT
* ALTER TABLE ... CONCATENATE
* ALTER TABLE ARCHIVE/UNARCHIVE PARTITION
* ANALYZE TABLE ... COMPUTE STATISTICS
* IMPORT FROM ...
* EXPORT TABLE

For information about using WebHCat for DDL commands, see [URL Format]({{< ref "#url-format" >}}) and [WebHCat Reference: DDL Resources]({{< ref "webhcat-reference-allddl_34016001" >}}).

### Create/Drop/Alter Table

#### CREATE TABLE

If you create a table with a CLUSTERED BY clause you will not be able to write to it with Pig or MapReduce. This is because they do not understand how to partition the table, so attempting to write to it would cause data corruption.

#### CREATE TABLE AS SELECT

Not supported. Throws an exception with the message "Operation Not Supported".

#### DROP TABLE

Supported. Behavior the same as Hive.

#### ALTER TABLE

Supported except for the REBUILD and CONCATENATE options. Behavior the same as Hive.

### Create/Drop/Alter View

**Note:** Pig and MapReduce cannot read from or write to views.

#### CREATE VIEW

Supported. Behavior same as Hive.

#### DROP VIEW

Supported. Behavior same as Hive.

#### ALTER VIEW

Supported. Behavior same as Hive.

### Show/Describe

#### SHOW TABLES

Supported. Behavior same as Hive.

#### SHOW PARTITIONS

Not supported. Throws an exception with message "Operation Not Supported".

#### SHOW FUNCTIONS

Supported. Behavior same as Hive.

#### DESCRIBE

Supported. Behavior same as Hive.

### Create/Drop Index

CREATE and DROP INDEX operations are supported.

**Note:** Pig and MapReduce cannot write to a table that has auto rebuild on, because Pig and MapReduce do not know how to rebuild the index.

### Create/Drop Function

CREATE and DROP FUNCTION operations are supported, but created functions must still be registered in Pig and placed in CLASSPATH for MapReduce.

### "dfs" Command and "set" Command {#dfs-set-cmd}

Supported. Behavior same as Hive.

### Other Commands

Any command not listed above is NOT supported and throws an exception with the message "Operation Not Supported".

## CLI Errors

### Authentication

If a failure results in a message like "2010-11-03 16:17:28,225 WARN hive.metastore ... - Unable to connect metastore with URI thrift://..." in `/tmp/`*<username>*`/hive.log`, then make sure you have run "`kinit` *<username>*`@FOO.COM`" to get a Kerberos ticket and to be able to authenticate to the HCatalog server.

### Error Log

If other errors occur while using the HCatalog CLI, more detailed messages are written to /tmp/*<username>*/hive.log.

  

**Navigation Links**
Previous: [Reader and Writer Interfaces]({{< ref "hcatalog-readerwriter_34013921" >}})  
 Next: [Storage Formats]({{< ref "hcatalog-storageformats_34013997" >}})

Hive command line interface: [Hive CLI]({{< ref "languagemanual-cli_27362033" >}})  
 Hive DDL commands: [Hive Data Definition Language]({{< ref "languagemanual-ddl_27362034" >}})  
 WebHCat DDL resources: [WebHCat Reference: DDL]({{< ref "webhcat-reference-allddl_34016001" >}})

General: [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

