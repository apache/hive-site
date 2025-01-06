---
title: "Apache Hive : HiveDerbyServerMode"
date: 2024-12-12
---

# Apache Hive : HiveDerbyServerMode

# Hive Using Derby in Server Mode

* [Hive Using Derby in Server Mode]({{< ref "#hive-using-derby-in-server-mode" >}})
	+ [Download Derby]({{< ref "#download-derby" >}})
	+ [Set Environment]({{< ref "#set-environment" >}})
	+ [Starting Derby]({{< ref "#starting-derby" >}})
	+ [Configure Hive to Use Network Derby]({{< ref "#configure-hive-to-use-network-derby" >}})
	+ [Copy Derby Jar Files]({{< ref "#copy-derby-jar-files" >}})
	+ [Start Up Hive]({{< ref "#start-up-hive" >}})
	+ [The Result]({{< ref "#the-result" >}})

Hive in embedded mode has a limitation of one active user at a time. You may want to run [Derby](http://db.apache.org/derby/) as a Network Server, this way multiple users can access it simultaneously from different systems.

See [Metadata Store]({{< ref "#metadata-store" >}}) and [Embedded Metastore]({{< ref "#embedded-metastore" >}}) for more information.

### Download Derby

It is suggested you download the version of Derby that ships with Hive. If you have already run Hive in embedded mode, the first line of `derby.log` contains the version.

My structure looks like this:

```
/opt/hadoop/hadoop-0.17.2.1
/opt/hadoop/db-derby-10.4.1.3-bin
/opt/hadoop/hive

```

```
cd /opt/hadoop
<download>
tar -xzf db-derby-10.4.1.3-bin.tar.gz
mkdir db-derby-10.4.1.3-bin/data

```

### Set Environment

The variable to set has changed over the years. DERBY_HOME is now the proper name. I set this and the legacy name.

`/etc/profile.d/derby.sh`

```
DERBY_INSTALL=/opt/hadoop/db-derby-10.4.1.3-bin
DERBY_HOME=/opt/hadoop/db-derby-10.4.1.3-bin
export DERBY_INSTALL
export DERBY_HOME

```

Hive also likes to know where Hadoop is installed:

`/etc/profile.d/hive.sh`

```
HADOOP=/opt/hadoop/hadoop-0.17.2.1/bin/hadoop
export HADOOP

```

### Starting Derby

Likely you are going to want to run Derby when Hadoop starts up. An interesting place for this other than as an `lsb-init-script` might be alongside Hadoop scripts like `start-dfs`. By default Derby will create databases in the directory it was started from.

```
cd /opt/hadoop/db-derby-10.4.1.3-bin/data
 
# If you are using JDK 1.7u51+, you'll need to either specify an ephemeral port (typically between 49152 and 65535)
# or add a grant to your JDK version's java.policy file.
# See http://stackoverflow.com/questions/21154400/unable-to-start-derby-database-from-netbeans-7-4 for details.
nohup /opt/hadoop/db-derby-10.4.1.3-bin/startNetworkServer -h 0.0.0.0 &

```

### Configure Hive to Use Network Derby

Edit `/opt/hadoop/hive/conf/hive-site.xml` as follows. Note that "hadoop1" should be replaced with the hostname or IP address where the Derby network server can be found.

`/opt/hadoop/hive/conf/hive-site.xml`

```
<property>
  <name>javax.jdo.option.ConnectionURL</name>
  <value>jdbc:derby://hadoop1:1527/metastore_db;create=true</value>
  <description>JDBC connect string for a JDBC metastore</description>
</property>

<property>
  <name>javax.jdo.option.ConnectionDriverName</name>
  <value>org.apache.derby.jdbc.ClientDriver</value>
  <description>Driver class name for a JDBC metastore</description>
</property>

```

`/opt/hadoop/hive/conf/jpox.properties`

      **Version:** JPOX properties are *NOT* used in Hive 5.0 or later.  
       JPOX properties can be specified in `hive-site.xml`. Normally `jpox.properties` changes are not required.

```
javax.jdo.PersistenceManagerFactoryClass=org.jpox.PersistenceManagerFactoryImpl
org.jpox.autoCreateSchema=false
org.jpox.validateTables=false
org.jpox.validateColumns=false
org.jpox.validateConstraints=false
org.jpox.storeManagerType=rdbms
org.jpox.autoCreateSchema=true
org.jpox.autoStartMechanismMode=checked
org.jpox.transactionIsolation=read_committed
javax.jdo.option.DetachAllOnCommit=true
javax.jdo.option.NontransactionalRead=true
javax.jdo.option.ConnectionDriverName=org.apache.derby.jdbc.ClientDriver
javax.jdo.option.ConnectionURL=jdbc:derby://hadoop1:1527/metastore_db;create=true
javax.jdo.option.ConnectionUserName=APP
javax.jdo.option.ConnectionPassword=mine

```

### Copy Derby Jar Files

Now since there is a new client you *MUST* make sure Hive has these `jar` files in the `lib` directory or in the classpath. The same would be true if you used MySQL or some other DB.

```
cp /opt/hadoop/db-derby-10.4.1.3-bin/lib/derbyclient.jar /opt/hadoop/hive/lib
cp /opt/hadoop/db-derby-10.4.1.3-bin/lib/derbytools.jar /opt/hadoop/hive/lib

```

If you receive the error "`javax.jdo.JDOFatalInternalException: Error creating transactional connection factory`" where the stack trace originates at "`org.datanucleus.exceptions.ClassNotResolvedException: Class 'org.apache.derby.jdbc.ClientDriver' was not found in the CLASSPATH. Please check your specification and your CLASSPATH`", you may benefit from putting the Derby `jar` files directly in the Hadoop `lib` directory:

```
cp /opt/hadoop/db-derby-10.4.1.3-bin/lib/derbyclient.jar /opt/hadoop/hadoop-0.17.2.1/lib
cp /opt/hadoop/db-derby-10.4.1.3-bin/lib/derbytools.jar /opt/hadoop/hadoop-0.17.2.1/lib

```

### Start Up Hive

The metastore will not be created until the first query hits it.

```
cd /opt/hadoop/hive
bin/hive
hive> show tables;

```

A directory should be created: `/opt/hadoop/db-derby-10.4.1.3-bin/data/metastore_db` .

### The Result

Now you can run multiple Hive instances working on the same data simultaneously and remotely.

 

 

