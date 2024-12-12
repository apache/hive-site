---
title: "Apache Hive : HiveServer"
date: 2024-12-12
---









# Apache Hive : HiveServer






# Thrift Hive Server

HiveServer is an optional service that allows a remote [client]({{< ref "hiveclient_27362101" >}}) to submit requests to Hive, using a variety of programming languages, and retrieve results. HiveServer is built on Apache ThriftTM (<http://thrift.apache.org/>), therefore it is sometimes called the *Thrift server* although this can lead to confusion because a newer service named [HiveServer2]({{< ref "#hiveserver2" >}}) is also built on Thrift. Since the introduction of HiveServer2, HiveServer has also been called *HiveServer1*.

WARNING!

HiveServer cannot handle concurrent requests from more than one client. This is actually a limitation imposed by the Thrift interface that HiveServer exports, and can't be resolved by modifying the HiveServer code.   
[HiveServer2]({{< ref "hiveserver2-clients_30758725" >}}) is a rewrite of HiveServer that addresses these problems, starting with Hive 0.11.0. Use of HiveServer2 is recommended.

**HiveServer was [removed](https://issues.apache.org/jira/browse/HIVE-6977) from Hive releases starting in Hive 1.0.0 (**[formerly called 0.14.1]({{< ref "#formerly-called-0-14-1" >}})**). ****Please switch over to HiveServer2.******

Previously its removal had been scheduled for [Hive 0.15 (now called 1.1.0)]({{< ref "#hive-0-15--now-called-1-1-0-" >}}). See [HIVE-6977](https://issues.apache.org/jira/browse/HIVE-6977).

Thrift's interface definition language (IDL) file for HiveServer is `hive_service.thrift`, which is installed in `$HIVE_HOME/service/if/`.

Once Hive has been built using steps in [Getting Started]({{< ref "gettingstarted_27362090" >}}), the Thrift server can be started by running the following:

**0.8 and Later**

```
$ build/dist/bin/hive --service hiveserver --help
usage: hiveserver
 -h,--help                        Print help information
    --hiveconf <property=value>   Use value for given property
    --maxWorkerThreads <arg>      maximum number of worker threads,
                                  default:2147483647
    --minWorkerThreads <arg>      minimum number of worker threads,
                                  default:100
 -p <port>                        Hive Server port number, default:10000
 -v,--verbose                     Verbose mode

$ bin/hive --service hiveserver

```

**0.7 and Earlier**

```
$ build/dist/bin/hive --service hiveserver --help
usage HIVE\_PORT=xxxx ./hive --service hiveserver
  HIVE\_PORT : Specify the server port

$ bin/hive --service hiveserver

```

After starting the server, to test if the server is working well, run the hiveserver and jdbc tests in 'standalone' mode. The HIVE\_PORT is assumed to be 10000 on localhost for this case.



```
$ ant test -Dtestcase=TestJdbcDriver -Dstandalone=true
$ ant test -Dtestcase=TestHiveServer -Dstandalone=true

```

The service supports clients in multiple languages. For more details see [Hive Client]({{< ref "hiveclient_27362101" >}}).

Troubleshooting: Connection Error

Hive server and clients communicate through Thrift and FB303 services. In some distributions, both the Hadoop and Hive distributions have different versions of libthrift.jar and libfb303.jar. If they are incompatible, it may cause a Thrift connection error when running the unit test on standalone mode. The solution is to remove the Hadoop's version of libthrift.jar and libfb303.jar.



 

 

