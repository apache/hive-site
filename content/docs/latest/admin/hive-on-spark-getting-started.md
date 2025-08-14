---
title: "Apache Hive : Hive on Spark: Getting Started"
date: 2024-12-12
---

# Apache Hive : Hive on Spark: Getting Started

Hive on Spark provides Hive with the ability to utilize [Apache Spark](http://spark.apache.org/) as its execution engine.

```
set hive.execution.engine=spark;
```
Hive on Spark was added in [HIVE-7292](https://issues.apache.org/jira/browse/HIVE-7292).

{{< toc >}}

## Version Compatibility

Hive on Spark is only tested with a specific version of Spark, so a given version of Hive is only guaranteed to work with a specific version of Spark. Other versions of Spark may work with a given version of Hive, but that is not guaranteed. Below is a list of Hive versions and their corresponding compatible Spark versions.

| Hive Version | Spark Version |
| --- | --- |
| master | 2.3.0 |
| 3.0.x | 2.3.0 |
| 2.3.x | 2.0.0 |
| 2.2.x | 1.6.0 |
| 2.1.x | 1.6.0 |
| 2.0.x | 1.5.0 |
| 1.2.x | 1.3.1 |
| 1.1.x | 1.2.0 |

## Spark Installation

Follow instructions to install Spark:  

 YARN Mode: <http://spark.apache.org/docs/latest/running-on-yarn.html>   
Standalone Mode: <https://spark.apache.org/docs/latest/spark-standalone.html>

Hive on Spark supports [Spark on YARN](http://spark.apache.org/docs/latest/running-on-yarn.html) mode as default.

For the installation perform the following tasks:

1. Install Spark (either download pre-built Spark, or build assembly from source).
	* Install/build a compatible version.  Hive root `pom.xml`'s <spark.version> defines what version of Spark it was built/tested with.
	* Install/build a compatible distribution.  Each version of Spark has several distributions, corresponding with different versions of Hadoop.
	* Once Spark is installed, find and keep note of the <spark-assembly-*.jar> location.
	* Note that you must have a version of Spark which does **not** include the Hive jars. Meaning one which was not built with the Hive profile. If you will use Parquet tables, it's recommended to also enable the "parquet-provided" profile. Otherwise there could be conflicts in Parquet dependency. To remove Hive jars from the installation, simply use the following command under your Spark repository:
	
	Prior to Spark 2.0.0:
	
	
	
	```
	./make-distribution.sh --name "hadoop2-without-hive" --tgz "-Pyarn,hadoop-provided,hadoop-2.4,parquet-provided"
	```
	
	Since Spark 2.0.0:
	
	
	
	```
	./dev/make-distribution.sh --name "hadoop2-without-hive" --tgz "-Pyarn,hadoop-provided,hadoop-2.7,parquet-provided"
	```
	
	Since Spark 2.3.0:
	
	
	
	```
	./dev/make-distribution.sh --name "hadoop2-without-hive" --tgz "-Pyarn,hadoop-provided,hadoop-2.7,parquet-provided,orc-provided"
	```
2. Start Spark cluster
	* Keep note of the <Spark Master URL>.  This can be found in Spark master WebUI.

## Configuring YARN

Instead of the [capacity scheduler](https://hadoop.apache.org/docs/r2.4.1/hadoop-yarn/hadoop-yarn-site/CapacityScheduler.html), the [fair scheduler](https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/FairScheduler.html) is required.  This fairly distributes an equal share of resources for jobs in the YARN cluster.

yarn.resourcemanager.scheduler.class=org.apache.hadoop.yarn.server.resourcemanager.scheduler.fair.FairScheduler

## Configuring Hive

1. To add the Spark dependency to Hive:

	* Prior to Hive 2.2.0, link the spark-assembly jar to `HIVE_HOME/lib`.
	* Since Hive 2.2.0, Hive on Spark runs with Spark 2.0.0 and above, which doesn't have an assembly jar.
		+ To run with YARN mode (either yarn-client or yarn-cluster), link the following jars to `HIVE_HOME/lib`.
			- scala-library
			- spark-core
			- spark-network-common
		+ To run with LOCAL mode (for debugging only), link the following jars in addition to those above to `HIVE_HOME/lib`.
			- chill-java  chill  jackson-module-paranamer  jackson-module-scala  jersey-container-servlet-core
			- jersey-server  json4s-ast  kryo-shaded  minlog  scala-xml  spark-launcher
			- spark-network-shuffle  spark-unsafe  xbean-asm5-shaded
2. Configure Hive execution engine to use Spark:

```
set hive.execution.engine=spark;
```

See the [Spark section of Hive Configuration Properties]({{< ref "#spark-section-of-hive-configuration-properties" >}}) for other properties for configuring Hive and the Remote Spark Driver.
3. Configure Spark-application configs for Hive.  See: <http://spark.apache.org/docs/latest/configuration.html>.  This can be done either by adding a file "spark-defaults.conf" with these properties to the Hive classpath, or by setting them on Hive configuration (`hive-site.xml`). For instance:

```
set spark.master=<Spark Master URL>
set spark.eventLog.enabled=true;
set spark.eventLog.dir=<Spark event log folder (must exist)>
set spark.executor.memory=512m;              
set spark.serializer=org.apache.spark.serializer.KryoSerializer;
```

### Configuration property details

	* `spark.executor.memory`: Amount of memory to use per executor process.
	* `spark.executor.cores`: Number of cores per executor.
	* `spark.yarn.executor.memoryOverhead`: The amount of off heap memory (in megabytes) to be allocated per executor, when running Spark on Yarn. This is memory that accounts for things like VM overheads, interned strings, other native overheads, etc. In addition to the executor's memory, the container in which the executor is launched needs some extra memory for system processes, and this is what this overhead is for.
	* `spark.executor.instances`: The number of executors assigned to each application.
	* `spark.driver.memory`: The amount of memory assigned to the Remote Spark Context (RSC). We recommend 4GB.
	* `spark.yarn.driver.memoryOverhead`: We recommend 400 (MB).
4. Allow Yarn to cache necessary spark dependency jars on nodes so that it does not need to be distributed each time when an application runs.

	* Prior to Hive 2.2.0, upload spark-assembly jar to hdfs file(for example: hdfs://xxxx:8020/spark-assembly.jar) and add following in hive-site.xml
	
	
	
	```
	<property>
	  <name>spark.yarn.jar</name>
	  <value>hdfs://xxxx:8020/spark-assembly.jar</value>
	</property>
	```
	* Hive 2.2.0, upload all jars in $SPARK_HOME/jars to hdfs folder(for example:hdfs:///xxxx:8020/spark-jars) and add following in hive-site.xml
	
	
	
	```
	<property>
	  <name>spark.yarn.jars</name>
	  <value>hdfs://xxxx:8020/spark-jars/*</value>
	</property>
	```

## Configuring Spark

Setting executor memory size is more complicated than simply setting it to be as large as possible. There are several things that need to be taken into consideration:

* More executor memory means it can enable mapjoin optimization for more queries.
* More executor memory, on the other hand, becomes unwieldy from GC perspective.
* Some experiments shows that HDFS client doesn’t handle concurrent writers well, so it may face race condition if executor cores are too many.

The following settings need to be tuned for the cluster, these may also apply to submission of Spark jobs outside of Hive on Spark:

| Property | Recommendation |
| --- | --- |
| spark.executor.cores | Between 5-7,  See tuning details section |
| spark.executor.memory | yarn.nodemanager.resource.memory-mb * (spark.executor.cores / yarn.nodemanager.resource.cpu-vcores)  |
| spark.yarn.executor.memoryOverhead | 15-20% of spark.executor.memory |
| spark.executor.instances | Depends on spark.executor.memory + spark.yarn.executor.memoryOverhead, see tuning details section. |

### Tuning Details

When running Spark on YARN mode, we generally recommend setting spark.executor.cores to be 5, 6 or 7, depending on what the typical node is divisible by. For instance, if yarn.nodemanager.resource.cpu-vcores is 19, then 6 is a better choice (all executors can only have the same number of cores, here if we chose 5, then every executor only gets 3 cores; if we chose 7, then only 2 executors are used, and 5 cores will be wasted). If it’s 20, then 5 is a better choice (since this way you’ll get 4 executors, and no core is wasted).

For `spark.executor.memory`, we recommend to calculate yarn.nodemanager.resource.memory-mb * (spark.executor.cores / yarn.nodemanager.resource.cpu-vcores) then split that between spark.executor.memory and `spark.yarn.executor.memoryOverhead`. According to our experiment, we recommend setting `spark.yarn.executor.memoryOverhead` to be around 15-20% of the total memory.

After you’ve decided on how much memory each executor receives, you need to decide how many executors will be allocated to queries. In the GA release Spark dynamic executor allocation will be supported. However for this beta only static resource allocation can be used. Based on the physical memory in each node and the configuration of  `spark.executor.memory` and `spark.yarn.executor.memoryOverhead`, you will need to choose the number of instances and set `spark.executor.instances`.

Now a real world example. Assuming 10 nodes with 64GB of memory per node with 12 virtual cores, e.g., `yarn.nodemanager.resource.cpu-vcores=12`. One node will be used as the master and as such the cluster will have 9 slave nodes. We’ll configure `spark.executor.cores` to 6. Given 64GB of ram `yarn.nodemanager.resource.memory-mb` will be 50GB. We’ll determine the amount of memory for each executor as follows: 50GB * (6/12) = 25GB. We’ll assign 20% to `spark.yarn.executor.memoryOverhead`, or 5120, and 80% to `spark.executor.memory`, or 20GB.

On this 9 node cluster we’ll have two executors per host. As such we can configure `spark.executor.instances` somewhere between 2 and 18. A value of 18 would utilize the entire cluster.

## Common Issues (Green are resolved, will be removed from this list)

| Issue | Cause | Resolution |
| --- | --- | --- |
| Error: Could not find or load main class org.apache.spark.deploy.SparkSubmit | Spark dependency not correctly set. | Add Spark dependency to Hive, see Step 1 [above]({{< ref "#above" >}}). |
| org.apache.spark.SparkException: Job aborted due to stage failure: Task 5.0:0 had a not serializable result: java.io.NotSerializableException: org.apache.hadoop.io.BytesWritable | Spark serializer not set to Kryo. | Set spark.serializer to be org.apache.spark.serializer.KryoSerializer, see Step 3 [above]({{< ref "#above" >}}). |
| [ERROR] Terminal initialization failed; falling back to unsupportedjava.lang.IncompatibleClassChangeError: Found class jline.Terminal, but interface was expected | Hive has upgraded to Jline2 but jline 0.94 exists in the Hadoop lib. | 1. Delete jline from the Hadoop lib directory (it's only pulled in transitively from ZooKeeper). 2. export HADOOP_USER_CLASSPATH_FIRST=true 3. If this error occurs during mvn test, perform a mvn clean install on the root project and itests directory. |
| Spark executor gets killed all the time and Spark keeps retrying the failed stage; you may find similar information in the YARN nodemanager log.WARN org.apache.hadoop.yarn.server.nodemanager.containermanager.monitor.ContainersMonitorImpl: Container [pid=217989,containerID=container_1421717252700_0716_01_50767235] is running beyond physical memory limits. Current usage: 43.1 GB of 43 GB physical memory used; 43.9 GB of 90.3 GB virtual memory used. Killing container. | For Spark on YARN, nodemanager would kill Spark executor if it used more memory than the configured size of "spark.executor.memory" + "spark.yarn.executor.memoryOverhead". | Increase "spark.yarn.executor.memoryOverhead" to make sure it covers the executor off-heap memory usage. |
| Run query and get an error like:FAILED: Execution Error, return code 3 from org.apache.hadoop.hive.ql.exec.spark.SparkTaskIn Hive logs, it shows:java.lang.NoClassDefFoundError: Could not initialize class org.xerial.snappy.Snappy  at org.xerial.snappy.SnappyOutputStream.<init>(SnappyOutputStream.java:79) | Happens on Mac (not officially supported).This is a general Snappy issue with Mac and is not unique to Hive on Spark, but workaround is noted here because it is needed for startup of Spark client. | Run this command before starting Hive or HiveServer2:export HADOOP_OPTS="-Dorg.xerial.snappy.tempdir=/tmp -Dorg.xerial.snappy.lib.name=libsnappyjava.jnilib $HADOOP_OPTS" |
| Stack trace: ExitCodeException exitCode=1: .../launch_container.sh: line 27: $PWD:$PWD/__spark__.jar:$HADOOP_CONF_DIR.../usr/hdp/${hdp.version}/hadoop/lib/hadoop-lzo-0.6.0.${hdp.version}.jar:/etc/hadoop/conf/secure:$PWD/__app__.jar:$PWD/*: bad substitution  | The key mapreduce.application.classpath in /etc/hadoop/conf/mapred-site.xml contains a variable which is invalid in bash. | From **mapreduce.application.classpath** remove ` :/usr/hdp/${hdp.version}/hadoop/lib/hadoop-lzo-0.6.0.${hdp.version}.jar ` from **/etc/hadoop/conf/mapred-site.xml** |
| Exception in thread "Driver" scala.MatchError: java.lang.NoClassDefFoundError: org/apache/hadoop/mapreduce/TaskAttemptContext (of class java.lang.NoClassDefFoundError)  at org.apache.spark.deploy.yarn.ApplicationMaster$$anon$2.run(ApplicationMaster.scala:432) | MR is not on the YARN classpath. | If on HDP change from **/hdp/apps/${hdp.version}/mapreduce/mapreduce.tar.gz#mr-framework** to **/hdp/apps/2.2.0.0-2041/mapreduce/mapreduce.tar.gz#mr-framework** |
| java.lang.OutOfMemoryError: PermGen space with spark.master=local | By default ([SPARK-1879](https://issues.apache.org/jira/browse/SPARK-1879)), Spark's own launch scripts increase PermGen to 128 MB, so we need to increase PermGen in hive launch script. | If use JDK7, append following in conf/hive-env.sh: ` export HADOOP_OPTS="$HADOOP_OPTS -XX:MaxPermSize=128m" ` If use JDK8, append following in Conf/hive-env.sh: ` export HADOOP_OPTS="$HADOOP_OPTS -XX:MaxMetaspaceSize=512m" ` |

## Recommended Configuration

See [HIVE-9153](https://issues.apache.org/jira/browse/HIVE-9153) for details on these settings.

```
mapreduce.input.fileinputformat.split.maxsize=750000000
hive.vectorized.execution.enabled=true

hive.cbo.enable=true
hive.optimize.reducededuplication.min.reducer=4
hive.optimize.reducededuplication=true
hive.orc.splits.include.file.footer=false
hive.merge.mapfiles=true
hive.merge.sparkfiles=false
hive.merge.smallfiles.avgsize=16000000
hive.merge.size.per.task=256000000
hive.merge.orcfile.stripe.level=true
hive.auto.convert.join=true
hive.auto.convert.join.noconditionaltask=true
hive.auto.convert.join.noconditionaltask.size=894435328
hive.optimize.bucketmapjoin.sortedmerge=false
hive.map.aggr.hash.percentmemory=0.5
hive.map.aggr=true
hive.optimize.sort.dynamic.partition=false
hive.stats.autogather=true
hive.stats.fetch.column.stats=true
hive.vectorized.execution.reduce.enabled=false
hive.vectorized.groupby.checkinterval=4096
hive.vectorized.groupby.flush.percent=0.1
hive.compute.query.using.stats=true
hive.limit.pushdown.memory.usage=0.4
hive.optimize.index.filter=true
hive.exec.reducers.bytes.per.reducer=67108864
hive.smbjoin.cache.rows=10000
hive.exec.orc.default.stripe.size=67108864
hive.fetch.task.conversion=more
hive.fetch.task.conversion.threshold=1073741824
hive.fetch.task.aggr=false
mapreduce.input.fileinputformat.list-status.num-threads=5
spark.kryo.referenceTracking=false
spark.kryo.classesToRegister=org.apache.hadoop.hive.ql.io.HiveKey,org.apache.hadoop.io.BytesWritable,org.apache.hadoop.hive.ql.exec.vector.VectorizedRowBatch
```

See [Spark section of configuration page](https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Spark) for additional properties.

## Design documents

* [Hive on Spark: Overall Design](https://issues.apache.org/jira/secure/attachment/12652517/Hive-on-Spark.pdf) from [HIVE-7272](https://issues.apache.org/jira/browse/HIVE-7292)
* [Hive on Spark: Join Design (HIVE-7613)](https://cwiki.apache.org/confluence/display/Hive/Hive+on+Spark%3A+Join+Design+Master)
* [Hive on Spark Configuration (HIVE-9449)](https://issues.apache.org/jira/browse/HIVE-9449)
* [attachments/44302539/53575687.pdf](/attachments/44302539/53575687.pdf)

## Attachments:

![](images/icons/bullet_blue.gif)
[attachments/44302539/53575687.pdf](/attachments/44302539/53575687.pdf) (application/pdf)

