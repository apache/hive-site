---
title: "Apache Hive : Streaming Data Ingest"
date: 2024-12-12
---

# Apache Hive : Streaming Data Ingest

* [Hive 3 Streaming API]({{< ref "#hive-3-streaming-api" >}})
* [Hive HCatalog Streaming API]({{< ref "#hive-hcatalog-streaming-api" >}})
	+ [Streaming Mutation API]({{< ref "#streaming-mutation-api" >}})
* [Streaming Requirements]({{< ref "#streaming-requirements" >}})
* [Limitations]({{< ref "#limitations" >}})
* [API Usage]({{< ref "#api-usage" >}})
	+ [Transaction and Connection Management]({{< ref "#transaction-and-connection-management" >}})
		- [HiveEndPoint]({{< ref "#hiveendpoint" >}})
		- [StreamingConnection]({{< ref "#streamingconnection" >}})
		- [TransactionBatch]({{< ref "#transactionbatch" >}})
			* [Usage Guidelines]({{< ref "#usage-guidelines" >}})
		- [Notes about the HiveConf Object]({{< ref "#notes-about-the-hiveconf-object" >}})
	+ [I/O – Writing Data]({{< ref "#io--writing-data" >}})
		- [RecordWriter]({{< ref "#recordwriter" >}})
		- [DelimitedInputWriter]({{< ref "#delimitedinputwriter" >}})
		- [StrictJsonWriter]({{< ref "#strictjsonwriter" >}})
		- [StrictRegexWriter]({{< ref "#strictregexwriter" >}})
		- [AbstractRecordWriter]({{< ref "#abstractrecordwriter" >}})
	+ [Error Handling]({{< ref "#error-handling" >}})
* [Example – Non-secure Mode]({{< ref "#example-–-non-secure-mode" >}})
* [Example – Secure Streaming]({{< ref "#example-–-secure-streaming" >}})
* [Knowledge Base]({{< ref "#knowledge-base" >}})

# Hive 3 Streaming API

[Hive 3 Streaming API Documentation](https://cwiki.apache.org/confluence/display/Hive/Streaming+Data+Ingest+V2) - new API available in Hive 3

# Hive HCatalog Streaming API

Traditionally adding new data into Hive requires gathering a large amount of data onto HDFS and then periodically adding a new partition. This is essentially a “batch insertion”. Insertion of new data into an existing partition is not permitted. Hive Streaming API allows data to be pumped continuously into Hive. The incoming data can be continuously committed in small batches of records into an existing Hive partition or table. Once data is committed it becomes immediately visible to all Hive queries initiated subsequently.

This API is intended for streaming clients such as [Flume](http://flume.apache.org/) and [Storm](https://storm.incubator.apache.org/), which continuously generate data. Streaming support is built on top of ACID based insert/update support in Hive (see [Hive Transactions]({{< ref "hive-transactions_40509723" >}})).

The Classes and interfaces part of the Hive streaming API are broadly categorized into two sets. The first set provides support for connection and transaction management while the second set provides I/O support. Transactions are managed by the metastore. Writes are performed directly to HDFS.

Streaming to **unpartitioned** tables is also supported. The API supports Kerberos authentication starting in [Hive 0.14](https://issues.apache.org/jira/browse/HIVE-7508).

**Note on packaging**: The APIs are defined in the Java package org.apache.hive.hcatalog.streaming and part of the *hive-hcatalog-streaming* Maven module in Hive.

### Streaming Mutation API

Starting in release 2.0.0, Hive offers another API for mutating (insert/update/delete) records into transactional tables using Hive’s ACID feature. See [HCatalog Streaming Mutation API]({{< ref "hcatalog-streaming-mutation-api_61337025" >}}) for details and a comparison with the streaming data ingest API that is described in this document.

# Streaming Requirements

A few things are required to use streaming.

1. The following settings are required in hive-site.xml to enable ACID support for streaming:
	1. **hive.txn.manager = org.apache.hadoop.hive.ql.lockmgr.DbTxnManager**
	2. **hive.compactor.initiator.on = true**(See more important details [here](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions#HiveTransactions-NewConfigurationParametersforTransactions))
	3. **hive.compactor.cleaner.on = true** (From Hive 4.0.0 onwards. See more important details [here](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions#HiveTransactions-NewConfigurationParametersforTransactions))
	4. **hive.compactor.worker.threads** > **0**
2. *“stored as orc”* must be specified during [table creation]({{< ref "#table-creation" >}}). Only [ORC storage format]({{< ref "languagemanual-orc_31818911" >}}) is supported currently.
3. tblproperties("transactional"="true") must be set on the table during creation.
4. The Hive table must be [bucketed]({{< ref "languagemanual-ddl-bucketedtables_27362035" >}}), but not sorted. So something like “clustered by (colName) into *10* buckets” must be specified during table creation. The number of buckets is ideally the same as the number of streaming writers.
5. User of the client streaming process must have the necessary permissions to write to the table or partition and create partitions in the table.
6. (Temporary requirements) **When issuing queries** on streaming tables, the client needs to set
	1. **hive.vectorized.execution.enabled**  to  **false** (for Hive version < 0.14.0)
	2. **hive.input.format**  to  **org.apache.hadoop.hive.ql.io.HiveInputFormat**

# Limitations

Out of the box, currently, the streaming API only provides support for streaming delimited input data (such as CSV, tab separated, etc.) and JSON (strict syntax) formatted data. Support for other input formats can be provided by additional implementations of the *RecordWriter* interface.

Currently only ORC is supported for the format of the destination table.

# API Usage

## Transaction and Connection Management

### HiveEndPoint

The class HiveEndPoint describes a Hive End Point to connect to. This describes the database, table and partition names. Invoking the newConnection method on it establishes a connection to the Hive MetaStore for streaming purposes. It returns a StreamingConnection object. Multiple connections can be established on the same endpoint. StreamingConnection can then be used to initiate new transactions for performing I/O.

It is very likely that in a setup where data is being streamed continuously the data is added into new partitions periodically. Either the Hive admin can pre-create the necessary partitions or the streaming clients can create them as needed. HiveEndPoint.newConnection() accepts a boolean argument to indicate whether the partition should be auto created. Partition creation being an atomic action, multiple clients can race to create the partition, but only one will succeed, so streaming clients do not have to synchronize when creating a partition.

Transactions are implemented slightly differently than traditional database systems. Each transaction has an id and multiple transactions are grouped into a “Transaction Batch”. This helps grouping records from multiple transactions into fewer files (rather than 1 file per transaction). After connection, a streaming client first requests a new batch of transactions. In response it receives a set of Transaction Ids that are part of the transaction batch. Subsequently the client proceeds to consume one transaction id at a time by initiating new Transactions. The client will write() one or more records per transaction and either commits or aborts the current transaction before switching to the next one. Each TransactionBatch.write() invocation automatically associates the I/O attempt with the current Txn ID. The user of the streaming client process, needs to have write permissions to the partition or table. Kerberos based authentication is required to acquire connections as a specific user. See [secure streaming example]({{< ref "#secure-streaming-example" >}}) below.

**Concurrency Note:** I/O can be performed on multiple TransactionBatches concurrently. However the transactions within a transaction batch must be consumed sequentially.

See the [Javadoc for HiveEndPoint](http://hive.apache.org/javadocs/r1.2.1/api/org/apache/hive/hcatalog/streaming/HiveEndPoint.html) for more information.  Generally a user will establish the destination info with HiveEndPoint object and then calls *newConnection* to make a connection and get back a StreamingConnection object.

### StreamingConnection

The StreamingConnection class is used to acquire batches of transactions.  Once the connection has been provided by HiveEndPoint the application will generally enter a loop where it calls *fetchTransactionBatch* and writes a series of transactions.  When closing down, the application should call *close*.  See the [Javadoc](http://hive.apache.org/javadocs/r1.2.1/api/org/apache/hive/hcatalog/streaming/StreamingConnection.html) for more information.  

### TransactionBatch

TransactionBatch is used to write a series of transactions. There is one file created on HDFS per TxnBatch in each bucket. The API examines each record to decide which bucket it belongs to and writes it to the appropriate bucket. If the table has 5 buckets, there will be 5 files (some of them could be empty) for the TxnBatch (before compaction kicks in).  Prior to [Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-11983), a bug in the API's bucket computation logic caused incorrect distribution of records into buckets, which could lead to incorrect data returned from queries using bucket join algorithms.

For each transaction in the TxnBatch, the application calls *beginNextTransaction*, *write,* and then *commit* or *abort* as appropriate. See the [Javadoc](http://hive.apache.org/javadocs/r1.2.1/api/org/apache/hive/hcatalog/streaming/TransactionBatch.html) for details.  A Transaction cannot include data from more than one partition.

Transactions in a TransactionBatch are eventually expired by the Metastore if not committed or aborted after [hive.txn.timeout](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions#HiveTransactions-NewConfigurationParametersforTransactions) secs. TrasnactionBatch class provides a **heartbeat()** method to prolong the lifetime of unused transactions in the batch.  A good rule of thumb is to send call heartbeat() at (hive.txn.timeout/2) intervals after creating a TransactionBatch.  This is sufficient to keep an inactive transaction alive but not load the metastore unnecessarily.

#### Usage Guidelines

Generally, the more events are included in each transaction the more throughput can be achieved.  It's common commit either after a certain number of events or after a certain time interval, whichever comes first.  The later ensures that when event flow rate is variable, transactions don't stay open too long.  There is no practical limit on how much data can be included in a single transaction.  The only concern is amount of data which will need to be replayed if the transaction fails.  The concept of a TransactionBatch serves to reduce the number of files created by SteramingAPI in HDFS.  Since all transactions in a given batch write to the same physical file (per bucket), a partition can only be compacted up to the the level of the earliest transaction of any batch which contains an open transaction.  Thus TranactionBatches should not be made excessively large.  It makes sense to include a timer to close a TransactionBatch (even if it has unused transactions) after some amount of time.

**Note:** [Hive 1.3.0](https://issues.apache.org/jira/browse/HIVE-12307) onwards, invoking TxnBatch.close() will cause all unused transaction in the current TxnBatch to be aborted.

### Notes about the HiveConf Object

HiveEndPoint.newConnection() accepts a HiveConf argument. This can either be set to null, or a pre-created HiveConf object can be provided. If this is null, a HiveConf object will be created internally and used for the connection. When a HiveConf object is instantiated, if the directory containing the hive-site.xml is part of the java classpath, then the HiveConf object will be initialized with values from it. If no hive-site.xml is found, then the object will be initialized with defaults. Pre-creating this object and reusing it across multiple connections may have a noticeable impact on performance if connections are being opened very frequently (for example several times a second). Secure connection relies on '[hive.metastore.kerberos.principal]({{< ref "#hive-metastore-kerberos-principal" >}})' being set correctly in the HiveConf object.

Regardless of what values are set in hive-site.xml or custom HiveConf, the API will internally override some settings in it to ensure correct streaming behavior. The below is the list of settings that are overridden:

* **hive.txn.manager** = org.apache.hadoop.hive.ql.lockmgr.DbTxnManager
* **hive.support.concurrency** = true
* **hive.metastore.execute.setugi** = true
* **hive.execution.engine** = mr

## I/O – Writing Data

These classes and interfaces provide support for writing the data to Hive within a transaction.

### RecordWriter

RecordWriter is the base interface implemented by all Writers. A Writer is responsible for taking a record in the form of a byte[] containing data in a known format (such as CSV) and writing it out in the format supported by Hive streaming. A RecordWriter may reorder or drop fields from the incoming record if necessary to map them to the corresponding columns in the Hive Table.  A streaming client will instantiate an appropriate RecordWriter type and pass it to TransactionBatch. The streaming client does not directly interact with RecordWriter therafter. The TransactionBatch will thereafter use and manage the RecordWriter instance to perform I/O.  See the [Javadoc](http://hive.apache.org/javadocs/r1.2.1/api/index.html?org/apache/hive/hcatalog/streaming/RecordWriter.html) for details.

A RecordWriter's primary functions are:

1. Modify input record: This may involve dropping fields from input data if they don’t have corresponding table columns, adding nulls in case of missing fields for certain columns, and changing the order of incoming fields to match the order of fields in the table. This task requires understanding of incoming data format. Not all formats (for example JSON, which includes field names in the data) need this step.
2. Encode modified record: The encoding involves serialization using an appropriate [Hive SerDe]({{< ref "serde_27362059" >}}).
3. Identify the bucket to which the record belongs
4. Write encoded record to Hive using the [AcidOutputFormat](https://hive.apache.org/javadocs/r1.2.1/api/org/apache/hadoop/hive/ql/io/AcidOutputFormat.html)'s record updater for the appropriate bucket.

### DelimitedInputWriter

Class DelimitedInputWriter implements the RecordWriter interface. It accepts input records that in delimited formats (such as CSV) and writes them to Hive. It reorders the fields if needed, and converts the record into an Object using LazySimpleSerde, which is then passed on to the underlying AcidOutputFormat's record updater for the appropriate bucket.  See [Javadoc](http://hive.apache.org/javadocs/r1.2.1/api/index.html?org/apache/hive/hcatalog/streaming/DelimitedInputWriter.html).

### StrictJsonWriter

Class StrictJsonWriter  implements the RecordWriter interface. It accepts input records that in strict JSON format and writes them to Hive. It converts the JSON record directly into an Object using JsonSerde, which is then passed on to the underlying AcidOutputFormat's record updater for the appropriate bucket.  See [Javadoc](http://hive.apache.org/javadocs/r1.2.1/api/index.html?org/apache/hive/hcatalog/streaming/StrictJsonWriter.html).

### StrictRegexWriter

Class StrictRegexWriter implements the RecordWriter interface. It accepts input records, regex that in text format and writes them to Hive. It converts the text record using proper regex directly into an Object using RegexSerDe, which is then passed on to the underlying AcidOutputFormat's record updater for the appropriate bucket. See [Javadoc](http://hive.apache.org/javadocs/r1.2.2/api/index.html?org/apache/hive/hcatalog/streaming/StrictRegexWriter.html).  Available in [Hive 1.2.2+ and 2.3.0+](https://issues.apache.org/jira/browse/HIVE-15691)[.](http://hive.apache.org/javadocs/r1.2.1/api/index.html?org/apache/hive/hcatalog/streaming/StrictRegexWriter.html)

### AbstractRecordWriter

This is a base class that contains some of the common code needed by RecordWriter objects such as schema lookup and computing the bucket into which a record should belong.

## Error Handling

It's imperative for proper functioning of the system that the client of this API handle errors correctly.  Once a `TransactionBatch` is obtained, if any exception is thrown from `TransactionBatch` (except `SerializationError`) should cause the client to call `TransactionBatch.abort()` to abort current transaction and then `TransactionBatch.close()` and start a new batch to write more data and/or redo the work of the last transaction during which the failure occurred.  Not following this may, in rare cases, cause file corruption.  Furthermore, `StreamingException` should ideally cause the client to perform exponential back off before starting new batch.  This will help the cluster stabilize since the most likely reason for these failures is HDFS overload.

`SerializationError` indicates that a given tuple could not be parsed.  The client may choose to throw away such tuples or send them to a dead letter queue.  After seeing this exception, more data can be written to the current transaction and further transactions in the same `TransactionBatch`.

# Example – Non-secure Mode

```
///// Stream five records in two transactions /////
 
// Assumed HIVE table Schema:
create table alerts ( id int , msg string )
     partitioned by (continent string, country string)
     clustered by (id) into 5 buckets
     stored as orc tblproperties("transactional"="true"); // currently ORC is required for streaming
 
 
//-------   MAIN THREAD  ------- //
String dbName = "testing";
String tblName = "alerts";
ArrayList<String> partitionVals = new ArrayList<String>(2);
partitionVals.add("Asia");
partitionVals.add("India");
String serdeClass = "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe";
 
HiveEndPoint hiveEP = new HiveEndPoint("thrift://x.y.com:9083", dbName, tblName, partitionVals);

.. spin up threads ..

//-------   Thread 1  -------//
StreamingConnection connection = hiveEP.newConnection(true);
DelimitedInputWriter writer =
                     new DelimitedInputWriter(fieldNames,",", hiveEP);
TransactionBatch txnBatch = connection.fetchTransactionBatch(10, writer);

///// Batch 1 - First TXN
txnBatch.beginNextTransaction();
txnBatch.write("1,Hello streaming".getBytes());
txnBatch.write("2,Welcome to streaming".getBytes());
txnBatch.commit();

if(txnBatch.remainingTransactions() > 0) {
///// Batch 1 - Second TXN
txnBatch.beginNextTransaction();
txnBatch.write("3,Roshan Naik".getBytes());
txnBatch.write("4,Alan Gates".getBytes());
txnBatch.write("5,Owen O’Malley".getBytes());
txnBatch.commit();

txnBatch.close();
connection.close();
}

txnBatch = connection.fetchTransactionBatch(10, writer);

///// Batch 2 - First TXN
txnBatch.beginNextTransaction();
txnBatch.write("6,David Schorow".getBytes());
txnBatch.write("7,Sushant Sowmyan".getBytes());
txnBatch.commit();

if(txnBatch.remainingTransactions() > 0) {
///// Batch 2 - Second TXN
txnBatch.beginNextTransaction();
txnBatch.write("8,Ashutosh Chauhan".getBytes());
txnBatch.write("9,Thejas Nair" getBytes());
txnBatch.commit();

txnBatch.close();
}

connection.close();

//-------   Thread 2  -------//

StreamingConnection connection2 = hiveEP.newConnection(true);
DelimitedInputWriter writer2 =
                     new DelimitedInputWriter(fieldNames,",", hiveEP);
TransactionBatch txnBatch2= connection.fetchTransactionBatch(10, writer2);

///// Batch 1 - First TXN
txnBatch2.beginNextTransaction();
txnBatch2.write("21,Venkat Ranganathan".getBytes());
txnBatch2.write("22,Bowen Zhang".getBytes());
txnBatch2.commit();

///// Batch 1 - Second TXN
txnBatch2.beginNextTransaction();
txnBatch2.write("23,Venkatesh Seetaram".getBytes());
txnBatch2.write("24,Deepesh Khandelwal".getBytes());
txnBatch2.commit();

txnBatch2.close();
connection.close();

txnBatch = connection.fetchTransactionBatch(10, writer);

///// Batch 2 - First TXN
txnBatch.beginNextTransaction();
txnBatch.write("26,David Schorow".getBytes());
txnBatch.write("27,Sushant Sowmyan".getBytes());
txnBatch.commit();

txnBatch2.close();
connection2.close();
```

# Example – Secure Streaming

To connect via Kerberos to a secure Hive metastore, a UserGroupInformation (UGI) object is required. This UGI object must be acquired externally and passed as argument to the EndPoint.newConnection. All subsequent internal operations carried out using that connection object, such as acquiring transaction batch, writes and commits, will be will be automatically wrapped internally in a ugi.doAs block as necessary.

**Important:**To connect using Kerberos, the 'authenticatedUser' argument to EndPoint.newConnection() should have been used to do a Kerberos login.  Additionally the 'hive.metastore.kerberos.principal' setting should be set correctly either in hive-site.xml or in the 'conf' argument (if not null). If using hive-site.xml, its directory should be included in the classpath.

  

```
import org.apache.hadoop.security.UserGroupInformation;

HiveEndPoint hiveEP2 = ... ;
UserGroupInformation ugi = .. authenticateWithKerberos(principal,keytab);
StreamingConnection secureConn = hiveEP2.newConnection(true, null, ugi);

DelimitedInputWriter writer3 = new DelimitedInputWriter(fieldNames, ",", hiveEP2);

TransactionBatch txnBatch3= secureConn.fetchTransactionBatch(10, writer3);

///// Batch 1 - First TXN – over secure connection
txnBatch3.beginNextTransaction();
txnBatch3.write("28,Eric Baldeschwieler".getBytes());
txnBatch3.write("29,Ari Zilka".getBytes());
txnBatch3.commit();

txnBatch3.close();
secureConn.close();
```

# Knowledge Base

* [Talks and Presentations](https://cwiki.apache.org/confluence/display/Hive/Hive+Transactions#HiveTransactions-TalksandPresentations)
* [Lessons learnt from NiFi streaming data to Hive transactional tables](https://community.hortonworks.com/articles/139876/lessons-learnt-from-nifi-streaming-data-to-hive-tr.html)

  

 

 

