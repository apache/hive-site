---
title: "Apache Hive : Hive Metrics"
date: 2024-12-12
---

# Apache Hive : Hive Metrics

  

The metrics that Hive collects can be viewed in the [HiveServer2 Web UI]({{< ref "#hiveserver2-web-ui" >}}) by using the "Metrics Dump" tab.

The metrics dump will display any metric available over JMX encoded in JSON: 

![](attachments/65872987/65874398.png)

Alternatively the metrics can be written directly into HDFS, a JSON file on the local file system where the HS2 instance is running or to the console by enabling the corresponding metric reporters. By default only the JMX and the JSON file reporter are enabled.

These metrics include:

* jvm.pause.info-threshold ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-10927))
* jvm.pause.warn-threshold ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-10927))
* jvm.pause.extraSleepTime ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-10927))
* open\_connections ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-10927))
* open\_operations ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-11984))
* cumulative\_connection\_count ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12970))
* metastore\_hive\_locks ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-11903))
* zookeeper\_hive\_sharedlocks ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-11903))
* zookeeper\_hive\_exclusivelocks ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-11903))
* zookeeper\_hive\_semisharedlocks ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-11903))
* exec\_async\_queue\_size ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-12271))
* exec\_async\_pool\_size ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-12271))
* *HiveServer2 operations* ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-12271))
* *HiveServer2 operations completed* ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-12271))
* *SQL operations* ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12987))
* *SQL operations completed* ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12987))
* init\_total\_count\_dbs ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12499))
* init\_total\_count\_tables ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12499))
* init\_total\_count\_partitions ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12499))
* create\_total\_count\_dbs ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* create\_total\_count\_tables ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* create\_total\_count\_partitions ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* delete\_total\_count\_dbs ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* delete\_total\_count\_tables ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* delete\_total\_count\_partitions ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-12733))
* directsql\_errors ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-13585))
* waiting\_compile\_ops ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-13813))
* hive\_mapred\_tasks ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14358))
* hive\_spark\_tasks ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14358))
* hive\_tez\_tasks ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14358))
* acquireReadWriteLocks ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* compile ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* doAuthorization ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* Driver.execute ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* releaseLocks ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* prune-listing ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* partition-retrieving ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* PreHook ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* PostHook ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* FailureHook ([Hive 0.8.0](https://issues.apache.org/jira/browse/HIVE-2364))
* parse ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* semanticAnalyze ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* getInputSummary ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* getSplits ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* runTasks ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* serializePlan ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* deserializePlan ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* clonePlan ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* task ([Hive 0.12.0](https://issues.apache.org/jira/browse/HIVE-5182))
* optimizer ([Hive 2.0.0](https://issues.apache.org/jira/browse/HIVE-12526))
* Driver.run ([Hive 0.9.0](https://issues.apache.org/jira/browse/HIVE-2823))
* TezCompiler ([Hive 2.1.0](https://issues.apache.org/jira/browse/HIVE-13407))
* TezSubmitToRunningDag ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezBuildDag ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezSubmitDag ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezRunDag ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezCreateVertex ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezRunVertex ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezInitializeProcessor ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezRunProcessor ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* TezInitializeOperators ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* LoadHashtable ([Hive 0.13.0](https://issues.apache.org/jira/browse/HIVE-5505))
* SparkSubmitToRunning ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkBuildPlan ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkBuildRDDGraph ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkSubmitJob ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkRunJob ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkCreateTran ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkRunStage ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkInitializeOperators ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkGenerateTaskTree ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkFlushHashTable ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9136))
* SparkOptimizeOperatorTree ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9164))
* SparkOptimizeTaskTree ([Hive 1.1.0](https://issues.apache.org/jira/browse/HIVE-9164))
* hs2\_open\_sessions ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14753))
* hs2\_active\_sessions ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14753))
* hs2\_abandoned\_sessions ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14753))
* hs2\_avg\_open\_session\_time ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14753))
* hs2\_avg\_active\_session\_time ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14753))
* hs2\_submitted\_queries ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14754))
* hs2\_compiling\_queries ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14754))
* hs2\_executing\_queries ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14754))
* hs2\_failed\_queries ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14754))
* hs2\_succeeded\_queries ([Hive 2.2.0](https://issues.apache.org/jira/browse/HIVE-14754))
* GarbageCollectorMetricSet ([Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-10761)) - publishing attributes of GarbageCollectorMXBeans
* MemoryUsageGaugeSet ([Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-10761)) - publishing attributes of MemoryMXBeans
* ThreadStatesGaugeSet ([Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-10761)) - publishing attributes of ThreadMXBeans
* ClassLoadingGaugeSet ([Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-10761)) - publishing attributes of ClassLoadingMXBeans
* BufferPoolMetricSet ([Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-10761)) - publishing attributes of BufferPool JMX beans
* compaction\_num\_working ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_num\_initiated ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_num\_failed ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_num\_succeeded ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_num\_did\_not\_initiate ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_num\_ready\_for\_cleaning ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* compaction\_oldest\_enqueue\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-23702))
* api\_compaction\_initiator\_cycle ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24871))
* api\_compaction\_cleaner\_cycle\_minor ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24871))
* api\_compaction\_worker\_cycle\_minor ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24874))
* num\_aborted\_transactions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* oldest\_aborted\_txn\_id ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* oldest\_aborted\_txn\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* total\_num\_aborted\_transactions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* total\_num\_committed\_transactions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* total\_num\_timed\_out\_transactions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24955))
* num\_locks ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24985))
* oldest\_lock\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24985))
* compaction\_num\_txn\_to\_writeid ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24879))
* compaction\_num\_completed\_txn\_components ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24879))
* compaction\_num\_initiators ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24932))
* compaction\_num\_workers ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24932))
* compaction\_num\_initiator\_versions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24932))
* compaction\_num\_worker\_versions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24932))
* oldest\_open\_repl\_txn\_id ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25021))
* oldest\_open\_non\_repl\_txn\_id ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25021))
* oldest\_open\_repl\_txn\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25021))
* oldest\_open\_non\_repl\_txn\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25021))
* tables\_with\_x\_aborted\_transactions ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25037))
* num\_writes\_to\_disabled\_compaction\_table ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25079))
* oldest\_ready\_for\_cleaning\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25080))
* compaction\_num\_active\_deltas ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24974))
* compaction\_num\_small\_deltas ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24974))
* compaction\_initiator\_failure\_counter ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25390))
* compaction\_cleaner\_failure\_counter ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25390))
* compaction\_initiator\_cycle\_duration ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25737))
* compaction\_cleaner\_cycle\_duration ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25737))
* compaction\_oldest\_working\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25737))
* compaction\_oldest\_cleaning\_age\_in\_sec ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-25737))
* compaction\_num\_obsolete\_deltas ([Hive 4.0.0](https://issues.apache.org/jira/browse/HIVE-24974))

Configuration properties for metrics can be found here:  [Metrics]({{< ref "#metrics" >}}).

See [HiveServer2 Overview]({{< ref "hiveserver2-overview_65147648" >}}) for more information about HiveServer2.

## Attachments:

![](images/icons/bullet_blue.gif)

 

 

