---
title: "Apache Hive : WebHCat Configure"
date: 2024-12-12
---

# Apache Hive : WebHCat Configure

# WebHCat Configuration

* [WebHCat Configuration]({{< ref "#webhcat-configuration" >}})
	+ [Configuration Files]({{< ref "#configuration-files" >}})
	+ [Configuration Variables]({{< ref "#configuration-variables" >}})
		- [Default Values]({{< ref "#default-values" >}})

## Configuration Files

The configuration for WebHCat (Templeton) merges the normal Hadoop configuration with the WebHCat-specific variables. Because WebHCat is designed to connect services that are not normally connected, the configuration is more complex than might be desirable.

The WebHCat-specific configuration is split into two layers:

1. **webhcat-default.xml** – All the configuration variables that WebHCat needs. This file sets the defaults that ship with WebHCat and should only be changed by WebHCat developers. Do not copy this file or change it to maintain local installation settings. Because webhcat-default.xml is present in the WebHCat war file, editing a local copy of it will not change the configuration.
2. **webhcat-site.xml** – The (possibly empty) configuration file in which the system administrator can set variables for their Hadoop cluster. Create this file and maintain entries in it for configuration variables that require you to override default values based on your local installation.

Note

The WebHCat server will require restart after any change to the configuration.

The configuration files are loaded in this order with later files overriding earlier ones:

* To find the configuration files, WebHCat first attempts to load a file from the `CLASSPATH` and then looks in the directory specified in the `TEMPLETON_HOME` environment variable.

Configuration files may access the special environment variable `env` for all environment variables. For example, the Pig executable could be specified using:

```
${env.PIG_HOME}/bin/pig

```

Configuration variables that use a filesystem path try to have reasonable defaults. However, it's always safe to specify the full and complete path if there is any uncertainty.

Log File Location

The webhcat-log4j.properties file sets the location of the log files created by WebHCat and some other properties of the logging system.

## Configuration Variables

| Name | Description |
| --- | --- |
| **templeton.port** | The HTTP port for the main server. |
| **templeton.hadoop.config.dir** | The path to the Hadoop configuration. |
| *Obsolete:* **templeton.jar** | The path to the WebHCat jar file. ([Not used in recent releases, so removed in Hive 0.14.0.](https://issues.apache.org/jira/browse/HIVE-6549)) |
| **templeton.libjars** | Jars to add to the classpath. |
| **templeton.override.jars** | Jars to add to the `HADOOP_CLASSPATH` for all Map Reduce jobs. These jars must exist on HDFS. |
| **templeton.override.enabled** | Enable the override path in **templeton.override.jars**. |
| **templeton.streaming.jar** | The HDFS path to the Hadoop streaming jar file. |
| **templeton.hadoop** | The path to the Hadoop executable. |
| **templeton.pig.archive** | The path to the Pig archive. |
| **templeton.pig.path** | The path to the Pig executable. |
| **templeton.hcat** | The path to the HCatalog executable. |
| **templeton.hive.archive** | The path to the Hive archive. |
| **templeton.hive.path** | The path to the Hive executable. |
| **templeton.hive.properties** | Properties to set when running Hive (during job submission).  This is expected to be a comma-separated prop=value list. If some value is itself a comma-separated list, the escape character is '\' </description> (from [Hive 0.13.1](https://issues.apache.org/jira/browse/HIVE-4576) onward).To use it in a cluster with Kerberos security enabled, set `hive.metastore.sasl.enabled=false` and add `hive.metastore.execute.setugi=true`. Using localhost in metastore URI does not work with Kerberos security. |
| **templeton.exec.encoding** | The encoding of the stdout and stderr data. |
| **templeton.exec.timeout** | How long in milliseconds a program is allowed to run on the WebHCat box. |
| **templeton.exec.max-procs** | The maximum number of processes allowed to run at once. |
| **templeton.exec.max-output-bytes** | The maximum number of bytes from stdout or stderr stored in ram. |
| **templeton.controller.mr.child.opts** | Java options to be passed to WebHCat controller map task. |
| **templeton.exec.envs** | The environment variables passed through to exec. |
| **templeton.zookeeper.hosts** | ZooKeeper servers, as comma-separated host:port pairs. |
| **templeton.zookeeper.session-timeout** | ZooKeeper session timeout in milliseconds. |
| **templeton.callback.retry.interval** | How long to wait between callback retry attempts in milliseconds. |
| **templeton.callback.retry.attempts** | How many times to retry the callback. |
| **templeton.storage.class** | The class to use as storage. |
| **templeton.storage.root** | The path to the directory to use for storage. |
| **templeton.hdfs.cleanup.interval** | The maximum delay between a thread's cleanup checks. |
| **templeton.hdfs.cleanup.maxage** | The maximum age of a WebHCat job. |
| **templeton.zookeeper.cleanup.interval** | The maximum delay between a thread's cleanup checks. |
| **templeton.zookeeper.cleanup.maxage** | The maximum age of a WebHCat job. |
| **templeton.kerberos.secret** | The secret used to sign the HTTP cookie value. The default value is a random value. Unless multiple WebHCat instances need to share the secret the random value is adequate. |
| **templeton.kerberos.principal** | The Kerberos principal to used by the server. As stated by the Kerberos SPNEGO specification, it should be `USER/${HOSTNAME}@{REALM`}. It does not have a default value. |
| **templeton.kerberos.keytab** | The keytab file containing the credentials for the Kerberos principal. |
| **templeton.hadoop.queue.name** | MapReduce queue name where WebHCat map-only jobs will be submitted to. Can be used to avoid a deadlock where all map slots in the cluster are taken over by Templeton launcher tasks.Versions: [Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-4679) and later. |
| **templeton.mapper.memory.mb** | WebHCat controller job's Launch mapper's memory limit in megabytes. When submitting a controller job, WebHCat will overwrite `mapreduce.map.memory.mb` with this value. If empty, WebHCat will not set `mapreduce.map.memory.mb` when submitting the controller job, therefore the configuration in mapred-site.xml will be used.Versions: [Hive 0.14.0](https://issues.apache.org/jira/browse/HIVE-7155) and later. |
| **templeton.frame.options.filter** | Adds web server protection from clickjacking using X-Frame-Options header. The possible values are DENY, SAMEORIGIN, ALLOW-FROM <uri>.Versions: [Hive 3.0.0](https://issues.apache.org/jira/browse/HIVE-17679) and later. |

#### Default Values

Some of the default values for WebHCat configuration variables depend on the release number. For the default values in the Hive release you are using, see the webhcat-default.xml file. It can be found in the SVN repository at:

* http://svn.apache.org/repos/asf/hive/branches/branch-*<release_number>*/hcatalog/webhcat/svr/src/main/config/webhcat-default.xml

where *<release_number>* is 0.11, 0.12, and so on. Prior to Hive 0.11, WebHCat was in the Apache incubator.

For example:

* Hive 0.12.0:  <http://svn.apache.org/repos/asf/hive/branches/branch-0.12/hcatalog/webhcat/svr/src/main/config/webhcat-default.xml>
* Hive 0.13.0:  <http://svn.apache.org/repos/asf/hive/branches/branch-0.13/hcatalog/webhcat/svr/src/main/config/webhcat-default.xml>

Default values prior to Hive 0.11 are listed in the HCatalog 0.5.0 documentation:

* HCatalog 0.5.0:  [WebHCat Configuration Variables](http://hive.apache.org/javadocs/hcat-r0.5.0/configuration.html#Variables)

 

**Navigation Links**
Previous: [Installation]({{< ref "webhcat-installwebhcat_34015585" >}})  
 Next: [Reference]({{< ref "webhcat-reference_34015762" >}})

Hive configuration: [Configuring Hive]({{< ref "adminmanual-configuration_27362070" >}}), [Hive Configuration Properties](https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties), [Thrift Server Setup]({{< ref "#thrift-server-setup" >}})

General: [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

