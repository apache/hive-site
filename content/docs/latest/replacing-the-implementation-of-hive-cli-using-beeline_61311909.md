---
title: "Apache Hive : Replacing the Implementation of Hive CLI Using Beeline"
date: 2024-12-12
---

# Apache Hive : Replacing the Implementation of Hive CLI Using Beeline

## 
* 
* [Why Replace the Existing Hive CLI?]({{< ref "#why-replace-the-existing-hive-cli?" >}})
* [Hive CLI Functionality Support]({{< ref "#hive-cli-functionality-support" >}})
	+ [Hive CLI Options Support]({{< ref "#hive-cli-options-support" >}})
	+ [Examples]({{< ref "#examples" >}})
	+ [Hive CLI Interactive Shell Commands Support]({{< ref "#hive-cli-interactive-shell-commands-support" >}})
	+ [Hive CLI Configuration Support]({{< ref "#hive-cli-configuration-support" >}})
* [Performance Impacts]({{< ref "#performance-impacts" >}})

## Why Replace the Existing Hive CLI?

[Hive CLI]({{< ref "#hive-cli" >}}) is a legacy tool which had two main use cases. The first is that it served as a thick client for SQL on Hadoop and the second is that it served as a command line tool for Hive Server (the original Hive server, now often referred to as "HiveServer1"). Hive Server has been deprecated and removed from the Hive code base as of Hive 1.0.0 ([HIVE-6977](https://issues.apache.org/jira/browse/HIVE-6977)) and replaced with HiveServer2 ([HIVE-2935](https://issues.apache.org/jira/browse/HIVE-2935)), so the second use case no longer applies. For the first use case, [Beeline]({{< ref "#beeline" >}}) provides or is supposed to provide equal functionality, yet is implemented differently from Hive CLI.

Ideally, Hive CLI should be deprecated as the Hive community has long recommended using the Beeline plus HiveServer2 configuration; however, because of the wide use of Hive CLI, we instead are replacing Hive CLI's implementation with a new Hive CLI on top of Beeline plus embedded HiveServer2 ([HIVE-10511](https://issues.apache.org/jira/browse/HIVE-10511)) so that the Hive community only needs to maintain a single code path. In this way, the new Hive CLI is just an alias to Beeline at both the shell script level and the high code level. The goal is that no or minimal changes are required from existing user scripts using Hive CLI.

## Hive CLI Functionality Support

We use a new Hive CLI on top of Beeline to implement the Hive CLI functionality. Since some existing Hive CLI features are not supported in the new Hive CLI, we are using the old Hive client implementation by default. Use the following command to specify the new Beeline-based Hive CLI tool:

```
export USE\_DEPRECATED\_CLI=false
```

Note that the log4j configuration file has been changed to "beeline-log4j.properties". 

### Hive CLI Options Support

To get help, run "`hive -H`" or "`hive --help`".

```
usage: hive
 -d,--define <key=value>          Variable subsitution to apply to hive
                                  commands. e.g. -d A=B or --define A=B
    --database <databasename>     Specify the database to use
 -e <quoted-query-string>         SQL from command line
 -f <filename>                    SQL from files
 -H,--help                        Print help information
    --hiveconf <property=value>   Use value for given property
    --hivevar <key=value>         Variable subsitution to apply to hive
                                  commands. e.g. --hivevar A=B
 -i <filename>                    Initialization SQL file
 -S,--silent                      Silent mode in interactive shell
 -v,--verbose                     Verbose mode (echo executed SQL to the
                                  console)
```

### Examples

* Example of running a query from the command line

```
$HIVE\_HOME/bin/hive -e 'select a.foo from pokes a'
```
* Example of setting Hive configuration variables

```
$HIVE\_HOME/bin/hive -e 'select a.foo from pokes a' --hiveconf hive.exec.scratchdir=/opt/my/hive\_scratch --hiveconf mapred.reduce.tasks=1
```
* Example of dumping data out from a query into a file using silent mode

```
$HIVE\_HOME/bin/hive -S -e 'select a.foo from pokes a' > a.txt
```
* Example of running a script non-interactively from local disk

```
$HIVE\_HOME/bin/hive -f /home/my/hive-script.sql
```
* Example of running a script non-interactively from a Hadoop supported filesystem (starting in [Hive 0.14](https://issues.apache.org/jira/browse/HIVE-7136))

```
$HIVE\_HOME/bin/hive -f hdfs://<namenode>:<port>/hive-script.sql
```

### Hive CLI Interactive Shell Commands Support

When `$HIVE_HOME/bin/hive` is run without either the `-e` or `-f` option, it enters interactive shell mode.

Use ";" (semicolon) to terminate commands. Comments in scripts can be specified using the "--" prefix.

| Command | Description |
| --- | --- |
| quit exit | Use quit or exit to leave the interactive shell. |
| reset | Resets the configuration to the default values (as of Hive 0.10: see [HIVE-3202](https://issues.apache.org/jira/browse/HIVE-3202)). |
| set <key>=<value> | Sets the value of a particular configuration variable (key).  **Note:** If you misspell the variable name, the CLI will not show an error. |
| set | Prints a list of configuration variables that are overridden by the user or Hive. |
| set -v | Prints all Hadoop and Hive configuration variables. |
| add FILE[S] <filepath> <filepath>*  add JAR[S] <filepath> <filepath>*  add ARCHIVE[S] <filepath> <filepath>* | Adds one or more files, jars, or archives to the list of resources in the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| add FILE[S] <ivyurl> <ivyurl>*  add JAR[S] <ivyurl> <ivyurl>*  add ARCHIVE[S] <ivyurl> <ivyurl>* | As of [Hive 1.2.0](https://issues.apache.org/jira/browse/HIVE-9664), adds one or more files, jars or archives to the list of resources in the distributed cache using an [Ivy](http://ant.apache.org/ivy/) URL of the form [ivy://group:module:version?query\_string]({{< ref "ivy://groupmoduleversion?query_string" >}}). See [Hive Resources]({{< ref "#hive-resources" >}})  for more information. |
| list FILE[S]  list JAR[S]  list ARCHIVE[S] | Lists the resources already added to the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}})  for more information. |
| list FILE[S] <filepath>*  list JAR[S] <filepath>*  list ARCHIVE[S] <filepath>* | Checks whether the given resources are already added to the distributed cache or not. See [Hive Resources]({{< ref "#hive-resources" >}})  for more information. |
| delete FILE[S] <filepath>*  delete JAR[S] <filepath>*  delete ARCHIVE[S] <filepath>* | Removes the resource(s) from the distributed cache. |
| delete FILE[S] <ivyurl> <ivyurl>*  delete JAR[S] <ivyurl> <ivyurl>*  delete ARCHIVE[S] <ivyurl> <ivyurl>* | As of [Hive 1.2.0](https://issues.apache.org/jira/browse/HIVE-9664), removes the resource(s) which were added using the <ivyurl> from the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| ! <command> | Executes a shell command from the Hive shell. |
| dfs <dfs command> | Executes a dfs command from the Hive shell. |
| <query string> | Executes a Hive query and prints results to standard output. |
| source FILE <filepath> | Executes a script file inside the CLI. |

Examples of shell commands:

```
hive> source /root/test.sql;
hive> show tables;
test1
test2
hive> exit;
hive> quit;
hive> set;
hive> set hive.cli.print.header=true;
hive> set -v;
hive> reset;
hive> add file /opt/a.txt;
Added resources: [/opt/a.txt]
hive> list files;
/opt/a.txt
hive> delete file /opt/a.txt;
hive> add jar /usr/share/vnc/classes/vncviewer.jar;
Added [/usr/share/vnc/classes/vncviewer.jar]to class path
Added resources:[/usr/share/vnc/classes/vncviewer.jar]
hive> list jars;
/usr/share/vnc/classes/vncviewer.jar
hive> delete jar /usr/share/vnc/classes/vncviewer.jar;
hive> !ls;
bin
conf
hive> dfs -ls / ;
Found 2 items
drwx-wx-wx  - root supergroup  0   2015-08-12 19:06 /tmp
drwxr-xr-x  - root supergroup  0   2015-08-12 19:43 /user
hive> select * from pokes; 
OK
pokes.foo   pokes.bar
238         val\_238
86          val\_86
311         val\_311
hive>source /opt/s.sql;
```

### Hive CLI Configuration Support

| Configuration Name | Supported in New Hive CLI | Description |
| --- | --- | --- |
| hive.cli.print.header | Yes | Whether to print the names of the columns in query output. [HIVE-11624](https://issues.apache.org/jira/browse/HIVE-11624) |
| hive.cli.errors.ignore | Yes | Whether to force execution of a script when errors occurred. [HIVE-11191](https://issues.apache.org/jira/browse/HIVE-11191) |
| hive.cli.prompt | Yes | Command line prompt configuration value. Other hiveconf can be used in this configuration value. [HIVE-11226](https://issues.apache.org/jira/browse/HIVE-11226) |
| hive.cli.pretty.output.num.cols | Yes | The number of columns to use when formatting output generated by the DESCRIBE PRETTY *table\_name* command. [HIVE-11779](https://issues.apache.org/jira/browse/HIVE-11779) |
| hive.cli.print.current.db | Yes | Whether to include the current database in the Hive prompt. [HIVE-11637](https://issues.apache.org/jira/browse/HIVE-11637) |

## Performance Impacts

Using the JMH to measure the average time cost when retrieving a data set, we have the following results.

```
Benchmark                                                       Mode  Samples           Score   Error  Units
o.a.h.b.c.CliBench.BeeLineDriverBench.testSQLWithInitialFile    avgt        1  1713326099.000 ?  NaN  ns/op
o.a.h.b.c.CliBench.CliDriverBench.testSQLWithInitialFile        avgt        1  1852995786.000 ?  NaN  ns/op
```

The lower the score the better since we are evaluating the time cost. There is no clear performance gap in terms of retrieving data.

 

 

 

 

