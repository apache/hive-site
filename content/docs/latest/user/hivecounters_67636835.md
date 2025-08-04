---
title: "Apache Hive : HiveCounters"
date: 2024-12-12
---

# Apache Hive : HiveCounters

Task counters created by Hive during query execution

 

For Tez execution, %context is set to the mapper/reducer name. For other execution engines it is not included in the counter name.

| Counter Name | Description |
| --- | --- |
| RECORDS_IN[_%context] | Input records read |
| RECORDS_OUT[_%context] | Output records written |
| RECORDS_OUT_INTERMEDIATE[_%context] | Records written as intermediate records to ReduceSink (which become input records to other tasks) |
| CREATED_FILES | Number of files created |
| DESERIALIZE_ERRORS | Deserialization errors encountered while reading data |

 

 

