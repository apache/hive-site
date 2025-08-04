---
title: "Apache Hive : MetaStore API Tests"
date: 2024-12-12
---

# Apache Hive : MetaStore API Tests

* [IMetaStoreClient Tests]({{< ref "#imetastoreclient-tests" >}})

# IMetaStoreClient Tests

One option for Java clients to access the MetaStore is to connect through the IMetaStoreClient interface implementations.

To ensure that the IMetaStoreClient implementations provide the same API we created a set of tests to validate their workings.

Currently the following implementations are tested:

* EmbeddedMetaStore – when the MetaStore is running in the same thread, and in process communication is used. Represented by the EmbeddedMetaStoreForTests.
* RemoteMetaStore – when the MetaStore is running in a separate thread but in the same JVM, and in Thrift communication is used. Represented by the RemoteMetaStoreForTests.
* ClusterMetaStore – when the MetaStore is started separately from the tests. Currently it is not used in the code, but could be used to test against previous versions of the MetaStore to ensure backward compatibility.

MetaStoreFactoryForTests provides the list of these implementations which can be used in parametrized tests in @Parameterized.Parameters. Currently the returning list contains the following implementations:

* Embedded – Uses the same configuration as TestEmbeddedHiveMetaStore.
* Remote – Uses the same configuration as TestRemoteHiveMetaStore. Later multiple configurations could be added, like the ones in TestSetUGIOnBothClientServer, TestSetUGIOnOnlyClient, TestSetUGIOnOnlyServer.
* If the -Dtest.hms.client.configs is provided then a ClusterMetaStore is returned in the list too.

The following test files will check the API functionalities:

* TestDatabases – creating, querying, dropping databases
* TestFunctions – creating, querying, dropping functions
* ...

 

 

 

 

 

