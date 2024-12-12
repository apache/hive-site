---
title: "Apache Hive : ReflectUDF"
date: 2024-12-12
---

# Apache Hive : ReflectUDF

# Reflect (Generic) UDF

A Java class and method often exists to handle the exact function a user would like to use in Hive. Rather than having to write a wrapper UDF to call this method, the majority of these methods can be called using reflect UDF. Reflect uses Java reflection to instantiate and call methods of objects; it can also call static functions. The method must return a primitive type or a type that Hive knows how to serialize.

```
SELECT reflect("java.lang.String", "valueOf", 1),
       reflect("java.lang.String", "isEmpty"),
       reflect("java.lang.Math", "max", 2, 3),
       reflect("java.lang.Math", "min", 2, 3),
       reflect("java.lang.Math", "round", 2.5),
       reflect("java.lang.Math", "exp", 1.0),
       reflect("java.lang.Math", "floor", 1.9)
FROM src LIMIT 1;

1	true	3	2	3	2.7182818284590455	1.0

```

Version information

As of Hive 0.9.0, java\_method() is a synonym for reflect(). See [Misc. Functions]({{< ref "#misc--functions" >}}) in Hive Operators and UDFs.

Note that Reflect UDF is non-deterministic since there is no guarantee what a specific method will return given the same parameters. So be cautious when using Reflect on the WHERE clause because that may invalidate Predicate Pushdown optimization.

## Comments:

|  |
| --- |
| 
This doc comes from the Hive xdocs, with minor edits. It is included here because the xdocs are currently unavailable (Feb. 2013).

 Posted by leftyl at Feb 21, 2013 09:30
  |

 

 

