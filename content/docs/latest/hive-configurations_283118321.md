---
title: "Apache Hive : Hive Configurations"
date: 2024-12-12
---









# Apache Hive : Hive Configurations






Hive has more than 1600 configs around the service. The hive-site.xml contains the default configurations for the service. In this config file, you can change the configs. Every config change needs to restart the service(s).

Here you can find the most important configurations and default values.



| Config Name | Default Value | Description | Config file |
| --- | --- | --- | --- |
| 
```
hive.metastore.client.cache.v2.enabled
```
 | true | This property enabled a Caffaine Cache for Metastore client | MetastoreConf |
|  |  |  |  |

  


More configs are in [MetastoreConf.java](https://github.com/apache/hive/blob/master/standalone-metastore/metastore-common/src/main/java/org/apache/hadoop/hive/metastore/conf/MetastoreConf.java) file



 

 

