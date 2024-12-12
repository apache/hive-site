---
title: "Apache Hive : Binary DataType Proposal"
date: 2024-12-12
---









# Apache Hive : Binary DataType Proposal






# Binary Type in Hive


### Motivation:


Hive is designed to work with big data. Often in such cases, a row in a data might be very wide with hundreds of columns. Sometimes, user is just interested in few of those columns and doesn't want to bother about exact type information for rest of columns. In such cases, he may just declare the types of those columns as binary and Hive will not try to interpret those columns. One important thing to note is this binary type is not modeled after blob type as it exists in other systems.


### Syntax:




```

create table binary\_table (a string, b binary);

```


### How is 'binary' represented internally in Hive


Binary type in Hive will map to 'binary' data type in thrift.   

Primitive java object for 'binary' type is ByteArrayRef  

PrimitiveWritableObject for 'binary' type is BytesWritable


### Casting:


Binary type will not be coerced into any other type implicitly. Even explicit casting will not be supported. 


### Serialization:


String in Hive is serialized by first extracting the underlying bytes of string and then serializing them. Binary type will just piggyback on it and will reuse the same code.


### Transform Scripts:


As with other types, binary data will be sent to transform script in String form. byte[] will be first encoded in Base64 format and then a String will be created and sent to the script.     


### Supported Serde:


ColumnarSerde  

BinarySortableSerde  

LazyBinaryColumnarSerde    

LazyBinarySerde  

LazySimpleSerde


Group-by and unions will be supported on columns with 'binary' type


### JIRA:


<https://issues.apache.org/jira/browse/HIVE-2380>



 

 

