---
title: "Apache Hive : MiniDriver Tests"
date: 2024-12-12
---









# Apache Hive : MiniDriver Tests






Whereas the TestCliDriver tests run all tests under /clientpositive and /clientnegative respectively, the MiniDriver tests (i.e., TestMiniTezCliDriver, TestMinimrCliDriver) run only a subset of those for time reasons.  These are determined by a properties file located in ./itests/qtest/testconfiguration.properties.

Currently there are the following properties:

* minimr.query.files:  Tests run by TestMinimrCliDriver (positive)
* minimr.query.negative.files:  Tests run by TestMinimrCliDriver (negative)
* minitez.query.files.shared: Tests run by TestMinimrCliDriver and TestMiniTezCliDriver
* minitez.query.files: Tests run by TestMiniTezCliDriver
* beeline.positive.exclude: Tests excluded when running with TestBeeLineDriver, if it's enabled.

Thus, be sure to update this properties file if adding/removing a test from any of these test drivers.

As this list may change, check ./itests/qtest/pom.xml for what each driver uses.  In particular, 'includeQueryFiles' and 'excludeQueryFiles' for each driver will refer to one or more of these properties.

The [Hive PTest2 Infrastructure]({{< ref "hive-ptest2-infrastructure_33295254" >}}) running [Hive Pre Commit Tests](https://cwiki.apache.org/confluence/display/Hive/Hive+PreCommit+Patch+Testing) does not use ./itests/qtest/pom.xml but has similar logic to parse this property file, in short because it needs to create different test batches for each node.  If changing the driver definitions themselves (say modifying the property key, adding a new driver), please keep in mind Ptest2 Infra in addition to the pom.xml would need to understand the new changes as well.



 

 

