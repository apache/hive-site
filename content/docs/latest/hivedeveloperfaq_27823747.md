---
title: "Apache Hive : HiveDeveloperFAQ"
date: 2024-12-12
---

# Apache Hive : HiveDeveloperFAQ

{{< toc >}}

## Developing

### How do I move some files?

Post a patch for testing purposes which simply does add and deletes. SVN will not understand these patches are actually moves, therefore you should actually upload the following, **in order** so the last upload is the patch for testing purposes:

1. A patch which has only the non-move changes for commit e.g. HIVE-XXX-for-commit.patch
2. A script of of commands required to make the moves HIVE-XXX-moves.sh
3. A patch for testing purposes HIVE-XXX.patch

The script should be a set of `svn mv` commands along with any `perl` commands required for find/replace. For example:

```
$ svn mv MyCLass.java MyClass.java
$ perl -i -pe 's<at:var at:name="MyCLass" />MyClass@g' MyClass.java

```

### How do I add a new MiniDriver test?

See [MiniDriver Tests]({{< ref "minidriver-tests_38571221" >}}) for information about MiniDriver and Beeline tests.

For FAQ about how to run tests, see [Testing]({{< ref "#testing" >}}) below.

## Building

* See [Getting Started: Building Hive from Source](https://cwiki.apache.org/confluence/display/Hive/GettingStarted#GettingStarted-BuildingHivefromSource) for detailed information about building Hive releases 0.13 and later with [Maven](http://maven.apache.org/).
* See [Installing from Source Code (Hive 0.12.0 and Earlier)](https://cwiki.apache.org/confluence/display/Hive/AdminManual+Installation#AdminManualInstallation-InstallingfromSourceCode(Hive0.12.0andEarlier)) for detailed information about building Hive 0.12 and earlier with [Ant](http://ant.apache.org/).

### Maven settings

You might have to set the following Maven options on certain systems to get build working: Set MAVEN_OPTS to "-Xmx2g -XX:MaxPermSize=256M".

### How to build all source?

The way Maven is set up differs between the master branch and branch-1.  In branch-1, since both Hadoop 1.x and 2.x are supported, you need to specify whether you want to build Hive against Hadoop 1.x or 2.x.  This is done via Maven profiles.  There is a profile for each version of Hadoop, `hadoop-1` and `hadoop-2`.  For most Maven operations one of these profiles needs to be specified or the build will fail.

In master, only Hadoop 2.x is supported, thus there is no need to specify a Maven profile for most build operations.

In master:

```
mvn clean install -DskipTests
cd itests 
mvn clean install -DskipTests
```

In branch-1, MVN:

```
mvn clean install -DskipTests -Phadoop-2
cd itests 
mvn clean install -DskipTests -Phadoop-2

```

To build against Hadoop 1.x, switch the above to `-Phadoop-1`.

For the remainder of this page we will assume master and not show the profiles.  However, if you are working on branch-1 remember that you will need to add in the appropriate profile.

### How do I import into Eclipse?

Build and generate [Eclipse](https://www.eclipse.org/users/) files (the conservative method).

For master – without using a local Maven repository: 

```
$ mkdir workspace
$ cd workspace
$ git clone https://github.com/apache/hive.git
$ cd hive
$ mvn clean package eclipse:clean eclipse:eclipse -Pitests -DskipTests -DdownloadSources -DdownloadJavadocs

```

NOTE: The presence of the **package** target is crucial in successfully generating the project files.

NOTE: It is recommended to wipe out or rename the *org/apache/hive* subtree of the local m2 repository prior to generating the project files; and you may want to check after its execution that it does not contain any files – if it does contain something, then your project files may not be fully independent of downloaded Maven artifacts.

This will work on all branches; but keep in mind that in this case you are installing the Hive artifacts into your local repository.

```
$ mkdir workspace
$ cd workspace
$ git clone https://github.com/apache/hive.git
$ cd hive
$ mvn clean install -DskipTests
$ mvn eclipse:clean
$ mvn eclipse:eclipse -DdownloadSources -DdownloadJavadocs
$ cd itests
$ mvn clean install -DskipTests
$ mvn eclipse:clean
$ mvn eclipse:eclipse -DdownloadSources -DdownloadJavadocs

```

In Eclipse define M2_REPO in Preferences -> Java -> Build Path -> Classpath Variables to either:

**Mac Example**

```
/Users/$USER/.m2/repository

```

**Linux Example**

```
/home/$USER/.m2/repository

```

**Windows Example**

```
C:/users/$USER/.m2/repository

```

Then import the workspaces. If you get an error about "restricted use of Signal" for Beeline and CLI, follow [these instructions](http://stackoverflow.com/questions/860187/access-restriction-on-class-due-to-restriction-on-required-library-rt-jar).

Note that if you use the Hive git base directory as the Eclipse workspace, then it does not pick the right project names (for example, picks 'ant' instead of 'hive-ant'). Therefore it's recommended to have the workspace directory one up from the git directory. For example workspaces/*hive-workspace*/*hive* where *hive-workspace* is the Eclipse workspace and *hive* is the git base directory.

### How to generate tarball?

```
mvn clean package -DskipTests -Pdist

```

It will then be located in the packaging/target/ directory.

### How to generate protobuf code?

```
cd ql
mvn clean install -DskipTests -Pprotobuf

```

### How to generate Thrift code?

```
mvn clean install -Pthriftif -DskipTests -Dthrift.home=/usr/local
```

  

Don’t forget to update `hive_metastore.proto` when changing  `hive_metastore.thrift 

[![](https://issues.apache.org/jira/secure/viewavatar?size=xsmall&avatarId=21141&avatarType=issuetype)HIVE-26769](https://issues.apache.org/jira/browse/HIVE-26769?src=confmacro)
 -
 [TRACKING] gRPC support for Hive metastore
Open`### How to run findbugs after a change?

```
mvn site -Pfindbugs 
```

Note:  Available in Hive 1.1.0 onward (see [HIVE-8327](https://issues.apache.org/jira/browse/HIVE-8327)).

### How to compile ODBC?

```
cd odbc
mvn compile -Podbc -Dthrift.home=/usr/local -Dboost.home=/usr/local

```

### How do I publish Hive artifacts to my local Maven repository?

```
mvn clean install -DskipTests
cd itests 
mvn clean install -DskipTests

```

## Testing

For general information, see [Unit Tests and Debugging]({{< ref "#unit-tests-and-debugging" >}}) in the Developer Guide.

### How do I run precommit tests on a patch?

A Jenkins job will start when you create a pull request on GitHub.

### How do I rerun precommit tests over the same patch?

You can ask a committer to rerun it, or do `git commit --amend` and push it.

### How do I run a single test?

ITests

Note that any test in the itests directory needs to be executed from within the itests directory. The pom is disconnected from the parent project for technical reasons.Single test class:

```
mvn test -Dtest=ClassName

```

Single test method:

```
mvn test -Dtest=ClassName#methodName

```

Note that a pattern can also be supplied to -Dtests to run multiple tests matching the pattern:

```
mvn test -Dtest='org.apache.hive.beeline.*' 
```

For more usage see the documentation for the [Maven Surefire Plugin](http://maven.apache.org/surefire/maven-surefire-plugin/).

### How do I run all of the unit tests?

```
mvn test 
cd itests 
mvn test 
```

Note that you need to have previously built and installed the jars:

```
mvn clean install -DskipTests 
cd itests 
mvn clean install -DskipTests 
```

### How do I run all of the unit tests except for a certain few tests?

Similar to running all tests, but define test.excludes.additional to specify a test/pattern to exclude from the test run. For example the following will run all tests except for the CliDriver tests:

```
cd itests 
mvn test -Dtest.excludes.additional='**/Test*CliDriver.java' 
```

### How do I run the clientpositive/clientnegative unit tests?

[See this page](/development/qtest/).

### Why isn't the itests pom connected to the root pom?

It would be great to have it connected, but it would make it harder to use **mvn test** locally. The best option would be to utilize the failsafe plugin for integration testing; but it needs a bit different setup, and it's harder to use for now.... If you'd like to give that a try, by all means, go ahead.

There is an option to attach all the itest subprojects to the main project by enabling this with **-Pitests** ([HIVE-13490](https://issues.apache.org/jira/browse/HIVE-13490)).

There are some good and bad sides using this, it's introduced as a profile to clearly communicate that the integration tests are attached to the main project.

The good side is that you may freely use **-Pitests** to run integration tests from the root project without the need of **mvn install**.

```
mvn test -q -Pitests -Dtest=TestCliDriver -Dqtest=sample2.q
```

The bad side is that a simple **mvn test -Pitests**will start executing all integration tests.

### Why does a test fail with a NullPointerException in MiniDFSCluster?

If any test fails with the error below it means you have an inappropriate umask setting. It should be set to 0022.

```
java.lang.NullPointerException: null
    at org.apache.hadoop.hdfs.MiniDFSCluster.startDataNodes(MiniDFSCluster.java:426)
    at org.apache.hadoop.hdfs.MiniDFSCluster.<init>(MiniDFSCluster.java:284)
    at org.apache.hadoop.hdfs.MiniDFSCluster.<init>(MiniDFSCluster.java:124)

```

## Debugging

### How do I debug into a single test in Eclipse?

You can debug into a single JUnit test in [Eclipse](https://www.eclipse.org/users/) by first making sure you've built the Eclipse files and imported the project into Eclipse as described [here]({{< ref "#here" >}}). Then set one or more breakpoints, highlight the method name of the JUnit test method you want to debug into, and do `Run->Debug`.

Another useful method to debug these tests is to attach a remote debugger. When you run the test, enable the debug mode for surefire by passing in "`-Dmaven.surefire.debug`". Additional details on how to turning on debugging for surefire can be found [here](http://maven.apache.org/surefire/maven-surefire-plugin/examples/debugging.html). Now when you run the tests, it will wait with a message similar to

```
Listening for transport dt_socket at address: 5005
```

Note that this assumes that you are still using the default port 5005 for surefire. Otherwise you might see a different port. Once you see this message, in Eclipse right click on the project you want to debug, go to "Debug As -> Debug Configurations -> Remote Java Application" and hit the "+" sign on far left top. This should bring up a dialog box. Make sure that the host is "localhost" and the port is "5005". Before you start debugging, make sure that you have set appropriate debug breakpoints in the code. Once ready, hit "Debug". Now if you go back to the terminal, you should see the tests running and they will stop at the breakpoints that you set for debugging.

### How do I debug my queries in Hive?

You can also interactively debug your queries in Hive by attaching a remote debugger. To do so, start [Beeline]({{< ref "#beeline" >}}) with the "`--debug`" option.

```
$ beeline --debug
Listening for transport dt_socket at address: 8000
```

Once you see this message, in Eclipse right click on the project you want to debug, go to "Debug As -> Debug Configurations -> Remote Java Application" and hit the "+" sign on far left top. This should bring up a dialog box. Make sure that the host is the host on which the Beeline CLI is running and the port is "8000". Before you start debugging, make sure that you have set appropriate debug breakpoints in the code. Once ready, hit "Debug". The remote debugger should attach to Beeline and proceed.

```
$ beeline --debug
Listening for transport dt_socket at address: 8000
Beeline version 1.2.0 by Apache Hive
beeline>
```

At this point, run your queries as normal and it should stop at the breakpoints that you set so that you can start debugging.

This method should work great if your queries are simple fetch queries that do not kick off MapReduce jobs. If a query runs in a distributed mode, it becomes very hard to debug. Therefore, it is advisable to run in a "local" mode for debugging. In order to run Hive in local mode, do the following:

**MRv1:**

```
SET mapred.job.tracker=local
```

**MRv2 (YARN):**

```
SET mapreduce.framework.name=local
```

At this point, attach the remote debugger as mentioned before to start debugging your queries.
