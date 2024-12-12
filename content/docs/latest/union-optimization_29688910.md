---
title: "Apache Hive : Union Optimization"
date: 2024-12-12
---

# Apache Hive : Union Optimization

Consider the query

select * from   

 (subq1  

 UNION ALL  

 sub2) u;

If the parents to union were map reduce jobs, they will write the output to temporary files. The Union will then read the rows from these temporary files and write to a final directory. In effect, the results are read and written twice unnecessarily. We can avoid this by directly writing to the final directory.

### Design

The optimization will be applied if the following hold:

1. The Union is followed by a select * and then a file sink.
2. All parents of Union are file sinks.

Union may have more than 2 parents.

Let's say the output directory of the final file sink was dir\_final. We will replace the output directories of subq1 and subq2 with dir\_final/subquery\_1 and dir\_final/subquery\_2, respectively. All other properties of the final file sink like gatherStats, etc. will also be copied. After this, we remove the union and everything below it.

The optimization is important for <https://cwiki.apache.org/confluence/display/Hive/Skewed+Join+Optimization> , but should also be useful in other cases.

 

 

