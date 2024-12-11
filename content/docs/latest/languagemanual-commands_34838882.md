---
title: "Apache Hive : LanguageManual Commands"
date: 2024-12-12
---

# Apache Hive : LanguageManual Commands

Commands are non-SQL statements such as setting a property or adding a resource. They can be used in HiveQL scripts or directly in the [CLI]({{< ref "languagemanual-cli_27362033" >}}) or [Beeline]({{< ref "#beeline" >}}).

| Command | Description |
| --- | --- |
| quit  exit | Use quit or exit to leave the interactive shell. |
| reset | Resets the configuration to the default values (as of Hive 0.10: see [HIVE-3202](https://issues.apache.org/jira/browse/HIVE-3202)). Any configuration parameters that were set using the set command or -hiveconf parameter in hive commandline will get reset to default value.Note that this does not apply to configuration parameters that were set in set command using the "hiveconf:" prefix for the key name (for historic reasons). |
| set <key>=<value> | Sets the value of a particular configuration variable (key).  **Note:** If you misspell the variable name, the CLI will not show an error. |
| set | Prints a list of configuration variables that are overridden by the user or Hive. |
| set -v | Prints all Hadoop and Hive configuration variables. |
| add FILE[S] <filepath> <filepath>*  add JAR[S] <filepath> <filepath>*  add ARCHIVE[S] <filepath> <filepath>* | Adds one or more files, jars, or archives to the list of resources in the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| add FILE[S] <ivyurl> <ivyurl>* add JAR[S] <ivyurl> <ivyurl>* add ARCHIVE[S]<ivyurl> <ivyurl>* | As of [Hive 1.2.0](https://issues.apache.org/jira/browse/HIVE-9664), adds one or more files, jars or archives to the list of resources in the distributed cache using an [Ivy](http://ant.apache.org/ivy/) URL of the form ivy://group:module:version?query\_string. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| list FILE[S]  list JAR[S]  list ARCHIVE[S] | Lists the resources already added to the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| list FILE[S] <filepath>*  list JAR[S] <filepath>*  list ARCHIVE[S] <filepath>* | Checks whether the given resources are already added to the distributed cache or not. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| delete FILE[S] <filepath>*  delete JAR[S] <filepath>*  delete ARCHIVE[S] <filepath>* | Removes the resource(s) from the distributed cache. |
| delete FILE[S] <ivyurl> <ivyurl>* delete JAR[S] <ivyurl> <ivyurl>* delete ARCHIVE[S] <ivyurl> <ivyurl>* | As of [Hive 1.2.0](https://issues.apache.org/jira/browse/HIVE-9664), removes the resource(s) which were added using the <ivyurl> from the distributed cache. See [Hive Resources]({{< ref "#hive-resources" >}}) for more information. |
| ! <command> | Executes a shell command from the Hive shell. |
| dfs <dfs command> | Executes a dfs command from the Hive shell. |
| <query string> | Executes a Hive query and prints results to standard output. |
| source FILE <filepath> | Executes a script file inside the CLI. |
| compile `<groovy string>` AS GROOVY NAMED <name> | This allows inline Groovy code to be compiled and be used as a UDF (as of Hive [0.13.0](https://issues.apache.org/jira/browse/HIVE-5252)). For a usage example, see [Nov. 2013 Hive Contributors Meetup Presentations – Using Dynamic Compilation with Hive](https://cwiki.apache.org/confluence/download/attachments/27362054/HiveContrib-Nov13-groovy_plus_hive.pptx?version=1&modificationDate=1385171856000&api=v2). |

Sample Usage:

```
  hive> set mapred.reduce.tasks=32;
  hive> set;
  hive> select a.* from tab1;
  hive> !ls;
  hive> dfs -ls;

```

 

 

