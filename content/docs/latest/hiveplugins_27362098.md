---
title: "Apache Hive : HivePlugins"
date: 2024-12-12
---









# Apache Hive : HivePlugins







* [Creating Custom UDFs]({{< ref "#creating-custom-udfs" >}})
* [Deploying Jars for User Defined Functions and User Defined SerDes]({{< ref "#deploying-jars-for-user-defined-functions-and-user-defined-serdes" >}})




## Creating Custom UDFs

First, you need to create a new class that extends UDF, with one or more methods named evaluate.



```
package com.example.hive.udf;

import org.apache.hadoop.hive.ql.exec.UDF;
import org.apache.hadoop.io.Text;

public final class Lower extends UDF {
  public Text evaluate(final Text s) {
    if (s == null) { return null; }
    return new Text(s.toString().toLowerCase());
  }
}

```

(Note that there's already a built-in function for this, it's just an easy example).

After compiling your code to a jar, you need to add this to the Hive classpath. See the section below on deploying jars.

Once Hive is started up with your jars in the classpath, the final step is to register your function as described in [Create Function]({{< ref "#create-function" >}}):



```
create temporary function my\_lower as 'com.example.hive.udf.Lower';

```

Now you can start using it:



```
hive> select my\_lower(title), sum(freq) from titles group by my\_lower(title);

...

Ended Job = job\_200906231019\_0006
OK
cmo	13.0
vp	7.0

```

For a more involved example, see [this page]({{< ref "genericudafcasestudy_27362093" >}}).

As of [Hive 0.13](https://issues.apache.org/jira/browse/HIVE-6047), you can register your function as a permanent UDF either in the current database or in a specified database, as described in [Permanent Functions]({{< ref "#permanent-functions" >}}). For example:



```
create function my\_db.my\_lower as 'com.example.hive.udf.Lower';
```

## Deploying Jars for User Defined Functions and User Defined SerDes

In order to start using your UDF, you first need to add the code to the classpath:



```
hive> add jar my\_jar.jar;
Added my\_jar.jar to class path

```

By default, it will look in the current directory. You can also specify a full path:



```
hive> add jar /tmp/my\_jar.jar;
Added /tmp/my\_jar.jar to class path

```

Your jar will then be on the classpath for all jobs initiated from that session. To see which jars have been added to the classpath you can use:



```
hive> list jars;
my\_jar.jar

```

See [Hive CLI]({{< ref "#hive-cli" >}}) for full syntax and more examples.

As of [Hive 0.13](https://issues.apache.org/jira/browse/HIVE-6380), UDFs also have the option of being able to specify required jars in the [CREATE FUNCTION]({{< ref "#create-function" >}}) statement:



```
CREATE FUNCTION myfunc AS 'myclass' USING JAR 'hdfs:///path/to/jar';
```

This will add the jar to the classpath as if ADD JAR had been called on that jar. 



 

 

