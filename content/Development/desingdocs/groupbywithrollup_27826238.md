---
title: "Apache Hive : GroupByWithRollup"
date: 2024-12-12
---

# Apache Hive : Group By With Rollup

{{< toc >}}

## Terminology

* (No) Map Aggr: Shorthand for whether the configuration variable hive.map.aggr is set to true or false, meaning mapside aggregation is allowed or not respectively.
* (No) Skew: Shorthand for whether the configuration variable hive.groupby.skewindata is set to true or false, meaning some columns have a disproportionate number of distinct values.

## Design

Before the rollup option was added to the group by operator, there were 4 different plans based on the 4 possible combinations of (No) Map Aggr and (No) Skew. These were built on and expanded to 6 plans as described below:

### Map Aggr & No Skew:

This plan remains the same, only the implementation of the map-side hash-based aggregation operator was modified to handle the extra rows needed for rollup. The plan is as follows:

Mapper:  

*Hash-based group by operator to perform partial aggregations  

*Reduce sink operator, performs some partial aggregations

Reducer:  

*MergePartial (list-based) group by operator to perform final aggregations

### Map Aggr & Skew

Again, this plan remains the same, only the implementation of the map-side hash-based aggregation operator was modified to handle the extra rows needed for rollup. The plan is as follows:

Mapper 1:  

*Hash-based group by operator to perform partial aggregations  

*Reduce sink operator to spray by the group by and distinct keys (if there is a distinct key) or a random number otherwise

Reducer 1:  

*Partials (list-based) group by operator to perform further partial aggregations

Mapper 2:  

*Reduce sink operator, performs some partial aggregations

Reducer 2:  

*Final (list-based) group by operator to perform final aggregations

Note that if there are no group by keys or distinct keys, Reducer 1 and Mapper 2 are removed from the plan and the reduce sink operator in Mapper 1 does not spray

### No Map Aggr & No Skew & No Rollup

This plan is the case from pre-rollup version of group by where there is no Map Aggr and No Skew, I included it for completeness as it remains an option if rollup is not used. The plan is as follows:

Mapper:  

*Reduce sink operator, performs some partial aggregations

Reducer:  

*Complete (list-based) group by operator to perform all aggregations

### No Map Aggr & No Skew & With Rollup

The plan is as follows:

Mapper 1:  

*Reduce sink operator, does not perform any partial aggregations

Reducer 1:  

*Hash-based group by operator, much like the one used in the mappers of previous cases 

Mapper 2:  

*Reduce sink operator, performs some partial aggregations

Reducer 2:  

*MergePartial (list-based) group by operator to perform remaining aggregations

### No Map Aggr & Skew & (No Distinct or No Rollup)

This plan is the same as was used for the case of No Map Aggr and Skew in the pre-rollup version of group by, for this cads when rollup is not used, or none of the aggregations make use of a distinct key. The implementation of the list-based group by operator was modified to handle the extra rows required for rollup if rollup is being used. The plan is as follows:

Mapper 1:  

*Reduce sink operator to spray by the group by and distinct keys (if there is a distinct key) or a random number otherwise

Reducer 1:  

*Partial1 (list-based) group by operator to perform partial aggregations, it makes use of the new list-based group by operator implementation for rollup if necessary

Mapper 2:  

*Reduce sink operator, performs some partial aggregations

Reducer 2:  

*Final (list-based) group by operator to perform remaining aggregations

### No Map Aggr & Skew & Distinct & Rollup

This plan is used when there is No Map Aggr and Skew and there is an aggregation that involves a distinct key and rollup is being used. The plan is as follows:

Mapper 1:  

*Reduce sink operator to spray by the group by and distinct keys (if there is a distinct key) or a random number otherwise

Reducer 1:  

*Hash-based group by operator, much like the one used in the mappers of previous cases 

Mapper 2:  

*Reduce sink operator to spray by the group by and distinct keys (if there is a distinct key) or a random number otherwise

Reducer 2:  

*Partials (list-based) group by operator to perform further partial aggregations

Mapper 3:  

*Reduce sink operator, performs some partial aggregations

Reducer 3:  

*Final (list-based) group by operator to perform final aggregations

Note that if there are no group by keys or distinct keys, Reducer 2 and Mapper 3 are removed from the plan and the reduce sink operator in Mapper 2 does not spray. Also, note that the reason for Mapper 2 spraying is that if the skew in the data existed in a column that is not immediately nulled by the rollup (e.g. if we the group by keys are columns g1, g2, g3 in that order, we are concerned with the case where the skew exists in column g1 or g2) the skew may continue to exist after the hash aggregation, so we spray.

## References

* [Original design doc](https://issues.apache.org/jira/secure/attachment/12437909/dp_design.txt)
* [HIVE-2397](https://issues.apache.org/jira/browse/HIVE-2397)
