---
title: "Apache Hive : Manual Installation"
date: 2024-12-12
---

# Apache Hive : Manual Installation

* [Installing, configuring and running Hive]({{< ref "#installing-configuring-and-running-hive" >}})
	+ [Prerequisites]({{< ref "#prerequisites" >}})
	+ [Install the prerequisites]({{< ref "#install-the-prerequisites" >}})
		- [Java 8]({{< ref "#java-8" >}})
		- [Maven:]({{< ref "#maven" >}})
		- [Protobuf]({{< ref "#protobuf" >}})
		- [Hadoop]({{< ref "#hadoop" >}})
		- [Tez]({{< ref "#tez" >}})
	+ [Extra hadoop configurations to make everything working]({{< ref "#extra-hadoop-configurations-to-make-everything-working" >}})
	+ [Installing Hive from a Tarball]({{< ref "#installing-hive-from-a-tarball" >}})
	+ [Installing from Source Code]({{< ref "#installing-from-source-code" >}})
    + [Installing with old version hadoop(greater than or equal 3.1.0)]({{< ref "#installing-with-old-version-hadoopgreater-than-or-equal-310" >}})
	+ [Next Steps]({{< ref "#next-steps" >}})
	+ [Beeline CLI]({{< ref "#beeline-cli" >}})
	+ [Hive Metastore]({{< ref "#hive-metastore" >}})
	+ [HCatalog and WebHCat]({{< ref "#hcatalog-and-webhcat" >}})
		- [HCatalog]({{< ref "#hcatalog" >}})
		- [WebHCat (Templeton)]({{< ref "#webhcat-templeton" >}})

# Installing, configuring and running Hive

You can install a stable release of Hive by downloading and unpacking a tarball, or you can download the source code and build Hive using Maven (release 3.6.3 and later).

## Prerequisites

* Java 8.
* Maven 3.6.3
* Protobuf 2.5
* Hadoop 3.3.6 (As a preparation, configure it in [single-node cluster, pseudo-distributed mode](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html#Pseudo-Distributed_Operation))
* [Tez](https://tez.apache.org/). The default is MapReduce but we will change the execution engine to Tez.
* Hive is commonly used in production Linux environment. Mac is a commonly used development environment. The instructions in this document are applicable to Linux and Mac.

## Install the prerequisites

### Java 8

Building Hive requires JDK 8 installed. Some notes in case you have ARM chipset (Apple M1 or later). 

You will have to build protobuf 2.5 later. And it doesn't compile with ARM JDK. So we will install intel architecture's Java with brew and configure maven with this. It will enable us to compile protobuf. 

JDK install on apple ARM: 

```
brew install homebrew/cask-versions/adoptopenjdk8 --cask
brew untap adoptopenjdk/openjdk
```

### Maven:

Just install maven and configure the JAVA_HOME properly. 

Notes for arm: after a proper configuration, you should see something like this:

```
mvn -version
Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)
Maven home: /Users/yourusername/programs/apache-maven-3.6.3
Java version: 1.8.0_292, vendor: AdoptOpenJDK, runtime: /Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home/jre
Default locale: en_HU, platform encoding: UTF-8
OS name: "mac os x", version: "10.16", arch: "x86_64", family: "mac"
```

As you can see, even if it is an arm processor, maven thinks the architecture is Intel based.

### Protobuf

You have to download and compile protobuf. And also, install it into the local maven repository. Protobuf 2.5.0 is not ready for ARM. On this chipset, you will need to do some extra steps.

```
wget https://github.com/google/protobuf/releases/download/v2.5.0/protobuf-2.5.0.tar.bz2
tar -xvf protobuf-2.5.0.tar.bz2
cd protobuf-2.5.0
./configure
```

On ARM, edit the src/google/protobuf/stubs/platform_macros.h and add arm to the part, processor architecture detection, after the last elif branch:   
 

```
#elif defined(__arm64__)
#define GOOGLE_PROTOBUF_ARCH_ARM 1
#define GOOGLE_PROTOBUF_ARCH_64_BIT 1
```

Now, you can compile and install protobuf:

```
make
make check
sudo make install
```

You can validate your install:

```
protoc --version
```

### Hadoop

Firstly, move through the instructions on the official documentation, single-node, pseudo-distributed configuration: <https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html#Pseudo-Distributed_Operation>.

After that, set up HADOOP_HOME:

```
export HADOOP_HOME=/yourpathtohadoop/hadoop-3.3.6
```

### Tez

Tez will require some additional steps. Hadoop uses a tez tarball but it expects it in other compressed directory structure than it is released. So we will extract the tarball and compress again. And also, we will put the extracted jars into hdfs. After that we set the necessary environment variables.

Download tez, extract and re-compress the tar: 

```
wget https://dlcdn.apache.org/tez/0.10.3/apache-tez-0.10.3-bin.tar.gz
tar -xzvf apache-tez-0.10.3-bin.tar.gz
cd apache-tez-0.10.3-bin
tar zcvf ../apache-tez-0.10.3-bin.tar.gz * && cd ..
```

Add the necessary tez files to hdfs

```
$HADOOP_HOME/sbin/start-dfs.sh	# start hdfs
$HADOOP_HOME/bin/hadoop fs -mkdir -p /apps/tez
$HADOOP_HOME/bin/hadoop fs -put apache-tez-0.10.3-bin.tar.gz /apps/tez # copy the tarball
$HADOOP_HOME/bin/hadoop fs -put apache-tez-0.10.3-bin /apps/tez # copy the whole folder
$HADOOP_HOME/bin/hadoop fs -ls /apps/tez # verify
$HADOOP_HOME/sbin/stop-all.sh # stop hdfs
```

Set up TEZ_HOME and HADOOP_CLASSPATH environment variables

```
export TEZ_HOME=/yourpathtotez/apache-tez-0.10.3-bin
export HADOOP_CLASSPATH=$TEZ_HOME/*:$TEZ_HOME/conf
```

Create a new config file for Tez: $TEZ_HOME/conf/tez-site.xml

```
<configuration>
    <property>
        <name>tez.lib.uris</name>
        <value>hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin.tar.gz,hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin/lib,hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin</value>
    </property>
</configuration>
```

## Extra hadoop configurations to make everything working

Modify $HADOOP_HOME/**etc/hadoop/core-site.xml**

```
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>

    <property>
      <name>hadoop.proxyuser.yourusername.groups</name>
      <value>*</value>
    </property>

    <property>
      <name>hadoop.proxyuser.yourusername.hosts</name>
      <value>*</value>
    </property>
</configuration>
```

Modify $HADOOP_HOME/**etc/hadoop/hadoop-env.sh**

```
# JAVA_HOME
export JAVA_HOME=/yourpathtojavahome/javahome
# tez
export TEZ_CONF_DIR=/yourpathtotezconf/conf
export TEZ_JARS=/yourpathtotez/apache-tez-0.10.3-bin
export HADOOP_CLASSPATH=${TEZ_CONF_DIR}:${TEZ_JARS}/*:${TEZ_JARS}/lib/*:${HADOOP_CLASSPATH}:
${JAVA_JDBC_LIBS}:${MAPREDUCE_LIBS}
```

Modify $HADOOP_HOME/**etc/hadoop/mapred-site.xml**

```
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.application.classpath</name>
        <value>$HADOOP_CLASSPATH:$HADOOP_HOME/share/hadoop/mapreduce/*:$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/lib/*</value>
    </property>
</configuration>
```

Modify $HADOOP_HOME/**etc/hadoop/yarn-site.xml**

```
<configuration>
<!-- Site specific YARN configuration properties -->
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.env-whitelist</name>
    <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_HOME,PATH,LANG,TZ,HADOOP_MAPRED_HOME</value>
  </property>
    <property>
    <name>yarn.nodemanager.resource.memory-mb</name>
  <value>4096</value>
  </property>
  <property>
    <name>yarn.scheduler.minimum-allocation-mb</name>
    <value>2048</value>
  </property>
  <property>
    <name>yarn.nodemanager.vmem-pmem-ratio</name>
    <value>2.1</value>
  </property>
</configuration>
```

Start hadoop

If you already started hadoop before, stop it. As we configured yarn and map-reduce, we have to restart it and make sure yarn is running:

```
$HADOOP_HOME/sbin/stop-all.sh
```

And start hadoop:

```
$HADOOP_HOME/sbin/start-all.sh
```

## Installing Hive from a Tarball

Start by downloading the most recent stable release of Hive from one of the Apache download mirrors (see [Hive Releases](https://hive.apache.org/downloads.html)).

Next you need to unpack the tarball. This will result in the creation of a subdirectory named `hive-x.y.z` (where `x.y.z` is the release number):

```
wget https://dlcdn.apache.org/hive/hive-4.0.0/apache-hive-4.0.0-bin.tar.gz
tar -xzvf apache-hive-4.0.0-bin.tar.gz 
```

Set the environment variable `HIVE_HOME` to point to the installation directory:

```
cd apache-hive-4.0.0-bin
export HIVE_HOME=/yourpathtohive/apache-hive-4.0.0-bin 
```

Add `$HIVE_HOME/bin` to your `PATH`:

```
export PATH=$HIVE_HOME/bin:$PATH
```

Create a directory for external tables: 

```
mkdir /yourpathtoexternaltables/warehouse
```

Create a new config file for Hive: $HIVE_HOME/conf/hive-site.xml

```
<configuration>
    <property>
        <name>hive.tez.container.size</name>
        <value>1024</value>
    </property>

    <property>
        <name>hive.metastore.warehouse.external.dir</name>
        <value>/yourpathtowarehousedirectory/warehouse</value>
    </property>

    <property>
        <name>hive.execution.engine</name>
        <value>tez</value>
    </property>

    <property>
        <name>tez.lib.uris</name>
        <value>hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin.tar.gz,hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin/lib,hdfs://localhost:9000/apps/tez/apache-tez-0.10.3-bin</value>
    </property>

    <property>
        <name>tez.configuration</name>
        <value>/yourpathtotez/apache-tez-0.10.3-bin/conf/tez-site.xml</value>
    </property>

    <property>
        <name>tez.use.cluster.hadoop-libs</name>
        <value>true</value>
    </property>
</configuration>
```

Initialize metastore schema. It will create a directore called metastore_db. It contains an embedded Derby database for metastore

```
$HIVE_HOME/bin/schematool -dbType derby -initSchema --verbose
```

Run HiveServer2

```
$HIVE_HOME/bin/hiveserver2
```

**Note**: you can check if it is running in Hive Server web ui: <http://localhost:10002/>

Run beeline:

```
$HIVE_HOME/bin/beeline -u 'jdbc:hive2://localhost:10000/' -n yourusername
```

As a test, create a table insert some value

```
create table test (message string);
insert into test values ('Hello, from Hive!');
```

## Installing from Source Code

Configuring is the same as when we do it from tarball. The only difference is that we have to build Hive for ourself and we will find the compiled binaries in a different directory.

  

Hive is available via Git at <https://github.com/apache/hive>. You can download it by running the following command.

```
git clone git@github.com:apache/hive.git
```

In case you want to get a specific release branch, like 4.0.0, you can run that command: 

```
git clone -b branch-4.0 --single-branch git@github.com:apache/hive.git
```

  

To build Hive, execute the following command on the base directory:

```
  $ mvn clean install -Pdist,iceberg -DskipTests 
```

It will create the subdirectory **packaging/target/apache-hive-*<release_string>*-bin/apache-hive-*<release_string>*-bin/. That will be your HIVE_HOME directory.** 

It has a content like:

* bin/: directory containing all the shell scripts
* lib/: directory containing all required jar files
* conf/: directory with configuration files
* examples/: directory with sample input and query files

That directory should contain all the files necessary to run Hive. You can run it from there or copy it to a different location, if you prefer.

From now, you can follow the steps described in the section Installing Hive from a Tarball


## Installing with old version hadoop(greater than or equal 3.1.0)

Although we normally require hive4 to rely on a 
hadoop 3.3.6+ cluster environment. 
However, in practice, in an ON YARN environment,
we can package all the hadoop related dependencies into 
tez&hive so that they do not need to rely on the lib 
of the original hadoop cluster environment at runtime. 
In this way, we can run HIVE4 in a lower version of hadoop, 
provided that the base APIs of the hadoop 3.x series are common to 
each other.

The steps are as follows:

1.Compile TEZ to get tez.tar.gz which contains all hadoop related dependencies(not tez minimal tarball),
run `mvn clean install -DskipTests=true -Dmaven.javadoc.skip=true -Pdist -Paws -Pazure`.
For more detail,see:`https://tez.apache.org/install.html`.
After compiling to get tez.tar.gz, users should set the following properties in tez-site.xml:

```xml
    <property>
        <name>tez.lib.uris</name><!--Example, replace with actual hdfs path-->
        <value>/apps/apache-tez-0.10.4-bin.tar.gz</value>
    </property>
    <property>
        <name>tez.lib.uris.classpath</name> <!--only use tez self lib,do not use any old version hadoop cluster's lib-->
       <value>$PWD/tezlib/*,$PWD/tezlib/lib/*</value>
    </property>
    <property>
        <name>tez.use.cluster.hadoop-libs</name><!--only use tez self lib,do not use any old version hadoop cluster's lib-->
        <value>false</value>
    </property>

    <property>
        <name>tez.am.launch.env</name><!--Example, replace with actual native-lib install path.Reuse old version hadoop cluster's native lib is ok.-->
        <value>LD_LIBRARY_PATH=/usr/hadoop/3.1.0/hadoop/lib/native</value>
        <description>Users can set up environment variables individually, including but not limited to: JAVA_HOME, LD_LIBRARY_PATH.</description>
    </property>
    
    <property>
        <name>tez.task.launch.env</name><!--Example, replace with actual native-lib install path.Reuse old version hadoop cluster's native lib is ok.-->
        <value>LD_LIBRARY_PATH=/usr/hadoop/3.1.0/hadoop/lib/native</value>
        <description>Users can set up environment variables individually, including but not limited to: JAVA_HOME, LD_LIBRARY_PATH.</description>
    </property>
```

2.Upload tez to the specified HDFS path in `tez.lib.uris`.(Please remember, do not use the minimal tarball for installation.)

```shell
## DO not upload minimal tarball !!!
[hadoop@hive opt]# hdfs dfs -put apache-tez-0.10.4-bin.tar.gz /apps/
```

3.Download the high version of the Hadoop package(Please ensure that the HADOOP version on which TEZ depends is the same as the HADOOP version you have downloaded.).Unzip HIVE, HADOOP, and TEZ all in the installation path.

```shell
## In this example, we have installed HIVE-4.0.1 and TEZ-0.10.4 on an Hadoop 3.1.0 cluster.users should install HIVE,HADOOP and TEZ into actual directories.
[hadoop@hive opt]# cd /opt
[hadoop@hive opt]# ll
drwxr-xr-x 11 hive hadoop      4096 Nov  7 13:59 apache-hive-4.0.1-bin
drwxr-xr-x  3 hive hadoop      4096 Nov  7 13:59 apache-tez-0.10.4-bin
drwxr-xr-x 10 hive hadoop      4096 Nov  7 13:59 hadoop-3.3.6
lrwxrwxrwx  1 hive hadoop        30 Nov  7 13:59 hive-4.0.1 -> apache-hive-4.0.1-bin
lrwxrwxrwx  1 hive hadoop        21 Nov  7 13:59 tez -> apache-tez-0.10.4-bin
```

edit `hive-env.sh`

```shell
# Set HADOOP_HOME to point to a specific hadoop install directory
HADOOP_HOME=${HADOOP_HOME:-/opt/hadoop-3.3.6}
export HIVE_HOME=${HIVE_HOME:-/opt/hive-4.0.1}
export TEZ_HOME=/opt/tez
```

Copy old version hadoop conf into hadoop3.3.6+:

```shell
cp /usr/hadoop/3.1.0/hadoop/conf/*  /opt/hadoop3.3.6/conf/
```

Put `tez-site.xml` into hive conf dir:

```shell
mv tez-site.xml  /opt/hive-4.0.1/conf/
```

After completing the above steps, users should be able to start the HMS service and HS2 service normally, and submit TEZ computing tasks without any issues.

Through the above steps, we can run Hive4+tez in any Hadoop3 environment. Users do not need to upgrade the cluster's original hive/hadoop/tez.


## Next Steps

You can begin using Hive as soon as it is installed, it should be work on you computer. There are some extra information in the following sections.

## Beeline CLI

HiveServer2 has a CLI called Beeline (see [Beeline – New Command Line Shell](https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Clients#HiveServer2Clients-Beeline--NewCommandLineShell)). To use Beeline, execute the following command in the Hive home directory:

```
$ bin/beeline
```

## Hive Metastore

Metadata is stored in a relational database. In our example (and as a default) it is a Derby database. By default, it's location is ./metastore_db. (See conf/hive-default.xml). You can change it by modifying the configuration variable javax.jdo.option.ConnectionURL.

Using Derby in embedded mode allows at most one user at a time. To configure Derby to run in server mode, see [Hive Using Derby in Server Mode]({{< ref "hivederbyservermode_27362068" >}}).

To configure a database other than Derby for the Hive metastore, see [Hive Metastore Administration]({{< ref "adminmanual-metastore-administration_27362076" >}}).

**Next Step:** [Configuring Hive]({{< ref "adminmanual-configuration_27362070" >}}).

## HCatalog and WebHCat

### HCatalog

If you install Hive from the binary tarball, the `hcat` command is available in the `hcatalog/bin` directory. However, most `hcat` commands can be issued as `hive` commands except for "`hcat -g`" and "`hcat -p`". Note that the `hcat` command uses the `-p` flag for permissions but `hive` uses it to specify a port number. The HCatalog CLI is documented [here]({{< ref "hcatalog-cli_34013932" >}}) and the Hive CLI is documented [here]({{< ref "languagemanual-cli_27362033" >}}).

HCatalog installation is documented [here]({{< ref "hcatalog-installhcat_34013403" >}}).

### WebHCat (Templeton)

If you install Hive from the binary tarball, the WebHCat server command `webhcat_server.sh` is in the hcatalog/webhcat/svr/src/main/bin/webhcat_server.sh directory.

WebHCat installation is documented [here]({{< ref "webhcat-installwebhcat_34015585" >}}).

 

 

