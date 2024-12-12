---
title: "Apache Hive : HiveWebInterface"
date: 2024-12-12
---









# Apache Hive : HiveWebInterface






# Hive Web Interface (component removed as of Hive [2.2.0](https://issues.apache.org/jira/browse/HIVE-15622))


* [Hive Web Interface (component removed as of Hive 2.2.0)]({{< ref "#hive-web-interface--component-removed-as-of-hive-2-2-0-" >}})
	+ [What Is the Hive Web Interface]({{< ref "#what-is-the-hive-web-interface" >}})
		- [WebHCat API]({{< ref "#webhcat-api" >}})
	+ [Features of HWI]({{< ref "#features-of-hwi" >}})
		- [Schema Browsing]({{< ref "#schema-browsing" >}})
		- [Detached Query Execution]({{< ref "#detached-query-execution" >}})
		- [No Local Installation]({{< ref "#no-local-installation" >}})
	+ [Configuration]({{< ref "#configuration" >}})
		- [Start Up]({{< ref "#start-up" >}})
		- [Authentication]({{< ref "#authentication" >}})
	+ [Accessing HWI]({{< ref "#accessing-hwi" >}})
	+ [Tips and Tricks]({{< ref "#tips-and-tricks" >}})
		- [Result File]({{< ref "#result-file" >}})
		- [Debug Mode]({{< ref "#debug-mode" >}})
		- [Set Processor]({{< ref "#set-processor" >}})
	+ [Walk Through]({{< ref "#walk-through" >}})
		- [Authorize]({{< ref "#authorize" >}})
		- [Schema Browser]({{< ref "#schema-browser" >}})
		- [Diagnostics]({{< ref "#diagnostics" >}})
		- [Running a Query]({{< ref "#running-a-query" >}})




## What Is the Hive Web Interface

The Hive Web Interface is an alternative to using the Hive [command line interface]({{< ref "languagemanual-cli_27362033" >}}). Using the web interface is a great way to get started with Hive.

The Hive Web Interface, abbreviated as HWI, is a simple graphical user interface (GUI).

Version

HWI is only available in Hive releases prior to 2.2.0. It was removed by [HIVE-15622](https://issues.apache.org/jira/browse/HIVE-15622).

#### WebHCat API

Another web interface that can be used for Hive commands is WebHCat, a REST API (not a GUI). With WebHCat, applications can make HTTP requests to access the Hive metastore ([HCatalog DDL]({{< ref "webhcat-reference-allddl_34016001" >}})) or to create and queue Hive [queries and commands]({{< ref "webhcat-reference-hive_34017180" >}}), Pig [jobs]({{< ref "webhcat-reference-pig_34017169" >}}), and MapReduce or YARN jobs (either [standard]({{< ref "webhcat-reference-mapreducejar_34017030" >}}) or [streaming]({{< ref "webhcat-reference-mapreducestream_34017023" >}})). WebHCat was formerly named Templeton. See these documents for more information:

* [Using WebHCat]({{< ref "webhcat-usingwebhcat_34015492" >}}) in the [WebHCat manual]({{< ref "webhcat_33299069" >}})
* [Using HCatalog]({{< ref "hcatalog-usinghcat_34013260" >}}) in the [HCatalog manual]({{< ref "hcatalog_33299065" >}})

## Features of HWI

### Schema Browsing

An alternative to running 'show tables' or 'show extended tables' from the CLI is to use the web-based schema browser. The Hive metadata is presented in a hierarchical manner allowing you to start at the database level and click to get information about tables including the SerDe, column names, and column types.

### Detached Query Execution

A power user issuing multiple Hive queries simultaneously would have multiple CLI windows open. The Hive Web Interface manages the session on the web server, not from inside the CLI window. This allows a user to start multiple queries and return to the web interface later to check the status.

### No Local Installation

Any user with a web browser can work with Hive. This has the usual web interface benefits. In particular, a user wishing to interact with Hadoop or Hive requires access to many ports. A remote or VPN user would only require access to the Hive Web Interface running by default on 0.0.0.0 tcp/9999.

## Configuration

Hive Web Interface made its first appearance in the 0.2 branch. If you have Hive release 0.2 or later, or the SVN trunk, then you already have it.

You should not need to edit the defaults for the Hive Web Interface. HWI uses:



```
<property>
  <name>hive.hwi.listen.host</name>
  <value>0.0.0.0</value>
  <description>This is the host address the Hive Web Interface will listen on</description>
</property>

<property>
  <name>hive.hwi.listen.port</name>
  <value>9999</value>
  <description>This is the port the Hive Web Interface will listen on</description>
</property>

<property>
  <name>hive.hwi.war.file</name>
  <value>${HIVE\_HOME}/lib/hive-hwi-<version>.war</value>
  <description>This is the WAR file with the jsp content for Hive Web Interface</description>
</property>

```

You probably want to set up [HiveDerbyServerMode]({{< ref "hivederbyservermode_27362068" >}}) to allow multiple sessions at the same time.

### Start Up

When initializing `hive` with no arguments, the CLI is invoked. Hive has an extension architecture used to start other `hive` demons.  
 Jetty requires [Apache Ant](http://ant.apache.org/) to start HWI. You should define ANT\_LIB as an environment variable or add that to the `hive` invocation.



```
export ANT\_LIB=/opt/ant/lib
bin/hive --service hwi

```

Java has no direct way of demonizing. In a production environment you should create a wrapper script.



```
nohup bin/hive --service hwi > /dev/null 2> /dev/null &

```

If you want help on the service invocation or list of parameters you can add



```
bin/hive --service hwi --help

```

### Authentication

Hadoop currently uses environmental properties to determine user name and group vector. Thus Hive and Hive Web Interface cannot enforce more stringent security then Hadoop can. When you first connect to the Hive Web Interface you are prompted for a user name and groups. This feature was added to support installations using different schedulers.

If you want to tighten up security you are going to need to patch the source Hive Session Manager or you may be able to tweak the JSP to accomplish this.

## Accessing HWI

In order to access the Hive Web Interface, go to <Hive Server Address>:9999/hwi on your web browser.

## Tips and Tricks

### Result File

The result file is local to the web server. A query that produces massive output should set the result file to /dev/null.

### Debug Mode

Debug mode is used when the user is interested in having the result file contain not only the result of the Hive query but also the other messages.

### Set Processor

In the CLI a command like 'SET x=5' is not processed by the the Query Processor, it is processed by  
 the Set Processor. Use the form 'x=5', not 'set x=5'.

## Walk Through

### Authorize

![](plugins/servlet/confluence/placeholder/unknown-attachment "1_hwi_authorize.png")  
 ![](plugins/servlet/confluence/placeholder/unknown-attachment "2_hwi_authorize.png")

### Schema Browser

![](plugins/servlet/confluence/placeholder/unknown-attachment "3_schema_table.png")  
 ![](plugins/servlet/confluence/placeholder/unknown-attachment "4_schema_browser.png")

### Diagnostics

![](plugins/servlet/confluence/placeholder/unknown-attachment "5_diagnostic.png")

### Running a Query

![](plugins/servlet/confluence/placeholder/unknown-attachment "6_newsession.png")  
 ![](plugins/servlet/confluence/placeholder/unknown-attachment "7_session_runquery.png")  
 ![](plugins/servlet/confluence/placeholder/unknown-attachment "8_session_query_1.png")  
 ![](plugins/servlet/confluence/placeholder/unknown-attachment "9_file_view.png")



 

 

