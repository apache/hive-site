---
title: "Apache Hive : HCatalog LoadStore"
date: 2024-12-12
---

# Apache Hive : HCatalog LoadStore

# Load and Store Interfaces

* [Load and Store Interfaces]({{< ref "#load-and-store-interfaces" >}})
	+ [Set Up]({{< ref "#set-up" >}})
	+ [Running Pig]({{< ref "#running-pig" >}})
	+ [HCatLoader]({{< ref "#hcatloader" >}})
		- [Usage]({{< ref "#usage" >}})
			* [Assumptions]({{< ref "#assumptions" >}})
		- [HCatLoader Data Types]({{< ref "#hcatloader-data-types" >}})
			* [Types in Hive 0.12.0 and Earlier]({{< ref "#types-in-hive-0120-and-earlier" >}})
			* [Types in Hive 0.13.0 and Later]({{< ref "#types-in-hive-0130-and-later" >}})
		- [Running Pig with HCatalog]({{< ref "#running-pig-with-hcatalog" >}})
			* [The -useHCatalog Flag]({{< ref "#the--usehcatalog-flag" >}})
			* [Jars and Configuration Files]({{< ref "#jars-and-configuration-files" >}})
			* [Authentication]({{< ref "#authentication" >}})
		- [Load Examples]({{< ref "#load-examples" >}})
			* [Filter Operators]({{< ref "#filter-operators" >}})
	+ [HCatStorer]({{< ref "#hcatstorer" >}})
		- [Usage]({{< ref "#usage" >}})
			* [Assumptions]({{< ref "#assumptions" >}})
		- [Store Examples]({{< ref "#store-examples" >}})
		- [HCatStorer Data Types]({{< ref "#hcatstorer-data-types" >}})
			* [Types in Hive 0.12.0 and Earlier]({{< ref "#types-in-hive-0120-and-earlier" >}})
			* [Types in Hive 0.13.0 and Later]({{< ref "#types-in-hive-0130-and-later" >}})
	+ [Data Type Mappings]({{< ref "#data-type-mappings" >}})
		- [Primitive Types]({{< ref "#primitive-types" >}})
		- [Complex Types]({{< ref "#complex-types" >}})

## Set Up

The HCatLoader and HCatStorer interfaces are used with Pig scripts to read and write data in HCatalog-managed tables. No HCatalog-specific setup is required for these interfaces.

**Note**: HCatalog is not thread safe.

## Running Pig

**The -useHCatalog Flag**

To bring in the appropriate jars for working with HCatalog, simply include the following flag / parameters when running Pig from the shell, Hue, or other applications:

```
pig -useHCatalog
```

See section [Running Pig with HCatalog]({{< ref "#running-pig-with-hcatalog" >}}) below for details.

Stale Content Warning

The fully qualified package name changed from *org.apache.hcatalog.pig* to *org.apache.hive.hcatalog.pig* in Pig versions 0.14+. 

In many older web site examples you may find references to the old syntax which no longer functions.

| Previous Pig Versions | 0.14+ |
| --- | --- |
| org.apache.hcatalog.pig.HCatLoader | org.apache.hive.hcatalog.pig.HCatLoader |
| org.apache.hcatalog.pig.HCatStorer | org.apache.hive.hcatalog.pig.HCatStorer |

## HCatLoader

HCatLoader is used with Pig scripts to read data from HCatalog-managed tables.

### Usage

HCatLoader is accessed via a Pig load statement.  

*Using Pig 0.14+*

```
A = LOAD 'tablename' USING org.apache.hive.hcatalog.pig.HCatLoader();
```

#### Assumptions

You must specify the table name in single quotes: LOAD 'tablename'. If you are using a non-default database you must specify your input as 'dbname.tablename'. If you are using Pig 0.9.2 or earlier, you must create your database and table prior to running the Pig script. Beginning with Pig 0.10 you can issue these create commands in Pig using the SQL command.  Details of Pig syntax can be found in [PIG-2482](https://issues.apache.org/jira/browse/PIG-2482).

The Hive metastore lets you create tables without specifying a database; if you created tables this way, then the database name is 'default' and is not required when specifying the table for HCatLoader.

If the table is partitioned, you can indicate which partitions to scan by immediately following the load statement with a partition filter statement (see [Load Examples]({{< ref "#load-examples" >}}) below).

### HCatLoader Data Types

Restrictions apply to the types of columns HCatLoader can read from HCatalog-managed tables. HCatLoader can read ***only*** the Hive data types listed below. 

The tables in [Data Type Mappings]({{< ref "#data-type-mappings" >}}) show how Pig will interpret each Hive data type.

#### Types in Hive 0.12.0 and Earlier

Hive 0.12.0 and earlier releases support reading these Hive primitive data types with HCatLoader:

* boolean
* int
* long
* float
* double
* string
* binary

and these complex data types:

* map – key type should be string
* ARRAY<*any type*>
* struct<*any type fields*>

#### Types in Hive 0.13.0 and Later

Hive 0.13.0 added support for reading these Hive data types with HCatLoader ([HIVE-5814](https://issues.apache.org/jira/browse/HIVE-5814)):

* tinyint
* smallint
* date
* timestamp
* decimal
* char(x)
* varchar(x)

See [Data Type Mappings]({{< ref "#data-type-mappings" >}}) below for details of the mappings between Hive and Pig types.

Note

Hive does not have a data type corresponding to the big integer type in Pig.

### Running Pig with HCatalog

Pig does not automatically pick up HCatalog jars. To bring in the necessary jars, you can either use a flag in the pig command or set the environment variables PIG\_CLASSPATH and PIG\_OPTS as described below.

#### The -useHCatalog Flag

To bring in the appropriate jars for working with HCatalog, simply include the following flag:

```
pig -useHCatalog

```

#### Jars and Configuration Files

For Pig commands that omit `-useHCatalog`, you need to tell Pig where to find your HCatalog jars and the Hive jars used by the HCatalog client. To do this, you must define the environment variable PIG\_CLASSPATH with the appropriate jars.

HCatalog can tell you the jars it needs. In order to do this it needs to know where Hadoop and Hive are installed. Also, you need to tell Pig the URI for your metastore, in the PIG\_OPTS variable.

In the case where you have installed Hadoop and Hive via tar, you can do this:

```
export HADOOP\_HOME=<path\_to\_hadoop\_install>

export HIVE\_HOME=<path\_to\_hive\_install>

export HCAT\_HOME=<path\_to\_hcat\_install>

export PIG\_CLASSPATH=$HCAT\_HOME/share/hcatalog/hcatalog-core*.jar:\
$HCAT\_HOME/share/hcatalog/hcatalog-pig-adapter*.jar:\
$HIVE\_HOME/lib/hive-metastore-*.jar:$HIVE\_HOME/lib/libthrift-*.jar:\
$HIVE\_HOME/lib/hive-exec-*.jar:$HIVE\_HOME/lib/libfb303-*.jar:\
$HIVE\_HOME/lib/jdo2-api-*-ec.jar:$HIVE\_HOME/conf:$HADOOP\_HOME/conf:\
$HIVE\_HOME/lib/slf4j-api-*.jar

export PIG\_OPTS=-Dhive.metastore.uris=thrift://<hostname>:<port>

```

Or you can pass the jars in your command line:

```
<path\_to\_pig\_install>/bin/pig -Dpig.additional.jars=\
$HCAT\_HOME/share/hcatalog/hcatalog-core*.jar:\
$HCAT\_HOME/share/hcatalog/hcatalog-pig-adapter*.jar:\
$HIVE\_HOME/lib/hive-metastore-*.jar:$HIVE\_HOME/lib/libthrift-*.jar:\
$HIVE\_HOME/lib/hive-exec-*.jar:$HIVE\_HOME/lib/libfb303-*.jar:\
$HIVE\_HOME/lib/jdo2-api-*-ec.jar:$HIVE\_HOME/lib/slf4j-api-*.jar  <script.pig>

```

The version number found in each filepath will be substituted for *. For example, HCatalog release 0.5.0 uses these jars and conf files:

* `$HCAT_HOME/share/hcatalog/hcatalog-core-0.5.0.jar`
* `$HCAT_HOME/share/hcatalog/hcatalog-pig-adapter-0.5.0.jar`
* `$HIVE_HOME/lib/hive-metastore-0.10.0.jar`
* `$HIVE_HOME/lib/libthrift-0.7.0.jar`
* `$HIVE_HOME/lib/hive-exec-0.10.0.jar`
* `$HIVE_HOME/lib/libfb303-0.7.0.jar`
* `$HIVE_HOME/lib/jdo2-api-2.3-ec.jar`
* `$HIVE_HOME/conf`
* `$HADOOP_HOME/conf`
* `$HIVE_HOME/lib/slf4j-api-1.6.1.jar`

#### Authentication

If you are using a secure cluster and a failure results in a message like "2010-11-03 16:17:28,225 WARN hive.metastore ... - Unable to connect metastore with URI thrift://..." in `/tmp/`*<username>*`/hive.log`, then make sure you have run "`kinit` *<username>*`@FOO.COM`" to get a Kerberos ticket and to be able to authenticate to the HCatalog server.

### Load Examples

This load statement will load all partitions of the specified table.

```
/* myscript.pig */
A = LOAD 'tablename' USING org.apache.hive.hcatalog.pig.HCatLoader();
...
...

```

If only some partitions of the specified table are needed, include a partition filter statement ***immediately*** following the load statement in the data flow. (In the script, however, a filter statement might not immediately follow its load statement.) The filter statement can include conditions on partition as well as non-partition columns.

```
/* myscript.pig */
A = LOAD 'tablename' USING  org.apache.hive.hcatalog.pig.HCatLoader();

-- date is a partition column; age is not
B = filter A by date == '20100819' and age < 30;

-- both date and country are partition columns
C = filter A by date == '20100819' and country == 'US';
...
...

```

To scan a whole table, for example:

```
a = load 'student\_data' using org.apache.hive.hcatalog.pig.HCatLoader();
b = foreach a generate name, age;

```

Notice that the schema is automatically provided to Pig; there's no need to declare name and age as fields, as if you were loading from a file.

To scan a single partition of the table web\_logs partitioned by the column datestamp, for example:

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp == '20110924';

```

Pig will push the datestamp filter shown here to HCatalog, so that HCatalog knows to just scan the partition where datestamp = '20110924'. You can combine this filter with others via 'and':

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp == '20110924' and user is not null;

```

Pig will split the above filter, pushing the datestamp portion to HCatalog and retaining the '`user is not null`' part to apply itself. You can also give a more complex filter to retrieve a set of partitions.

#### Filter Operators

A filter can contain the operators 'and', 'or', '()', '==', '!=', '<', '>', '<=' and '>='.

For example:

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp > '20110924';

```

A complex filter can have various combinations of operators, such as:

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp == '20110924' or datestamp == '20110925';

```

These two examples have the same effect:

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp >= '20110924' and datestamp <= '20110925';

```

```
a = load 'web\_logs' using org.apache.hive.hcatalog.pig.HCatLoader();
b = filter a by datestamp <= '20110925' and datestamp >= '20110924';

```

## HCatStorer

HCatStorer is used with Pig scripts to write data to HCatalog-managed tables.

### Usage

HCatStorer is accessed via a Pig store statement.

```
A = LOAD ...
B = FOREACH A ...
...
...
my\_processed\_data = ...

STORE my\_processed\_data INTO 'tablename'
   USING org.apache.hive.hcatalog.pig.HCatStorer();

```

#### Assumptions

You must specify the table name in single quotes: LOAD 'tablename'. Both the database and table must be created prior to running your Pig script. If you are using a non-default database you must specify your input as 'dbname.tablename'. If you are using Pig 0.9.2 or earlier, you must create your database and table prior to running the Pig script. Beginning with Pig 0.10 you can issue these create commands in Pig using the SQL command.

The Hive metastore lets you create tables without specifying a database; if you created tables this way, then the database name is 'default' and you do not need to specify the database name in the store statement.

For the USING clause, you can have a string argument that represents key/value pairs for partition. This is a mandatory argument when you are writing to a partitioned table and the partition column is not in the output column. The values for partition keys should *NOT* be quoted.

If partition columns are present in data they need not be specified as a STORE argument. Instead HCatalog will use these values to place records in the appropriate partition(s). It is valid to specify some partition keys in the STORE statement and have other partition keys in the data.

### Store Examples

You can write to a non-partitioned table simply by using HCatStorer. The contents of the table will be overwritten:

```
store z into 'web\_data' using org.apache.hive.hcatalog.pig.HCatStorer();

```

To add one new partition to a partitioned table, specify the partition value in the store function. Pay careful attention to the quoting, as the whole string must be single quoted and separated with an equals sign:

```
store z into 'web\_data' using org.apache.hive.hcatalog.pig.HCatStorer('datestamp=20110924');

```

To write into multiple partitions at once, make sure that the partition column is present in your data, then call HCatStorer with no argument:

```
store z into 'web\_data' using org.apache.hive.hcatalog.pig.HCatStorer();
  -- datestamp must be a field in the relation z

```

### HCatStorer Data Types

Restrictions apply to the types of columns HCatStorer can write to HCatalog-managed tables. HCatStorer can write ***only*** the data types listed below.

The tables in [Data Type Mappings]({{< ref "#data-type-mappings" >}}) show how HCatalog will interpret each Pig data type.

#### Types in Hive 0.12.0 and Earlier

Hive 0.12.0 and earlier releases support writing these Pig primitive data types with HCatStorer:

* boolean
* int
* long
* float
* double
* chararray
* bytearray

and these complex data types:

* map
* bag
* tuple

#### Types in Hive 0.13.0 and Later

Hive 0.13.0 added support for writing these Pig data types with HCatStorer ([HIVE-5814](https://issues.apache.org/jira/browse/HIVE-5814)):

* short
* datetime
* bigdecimal

and added more Hive data types that the Pig types can be written to. See [Data Type Mappings]({{< ref "#data-type-mappings" >}}) below for details of the mappings between Pig and Hive types.

Note

Hive does not have a data type corresponding to the biginteger type in Pig.

## Data Type Mappings

The tables below show the mappings between data types in HCatalog-managed Hive tables and Pig. For general information about Hive data types, see [Hive Data Types]({{< ref "languagemanual-types_27838462" >}}) and [Type System]({{< ref "#type-system" >}}).

Any type mapping not listed here is not supported and will throw an exception. The user is expected to cast the value to a compatible type first (in a Pig script, for example).

### Primitive Types

| Hive Type/Value | Pig Type/Value | Hive → Pig | Pig → Hive | Available in Hive Release |
| --- | --- | --- | --- | --- |
| BOOLEAN/boolean | BOOLEAN/boolean | direct/lossless mapping | direct/lossless mapping |  |
| TINYINT/byte | INTEGER/int | direct/lossless mapping | performs a range check1 | 0.13.0+ |
| SMALLINT/short | SMALLINT/short | direct/lossless mapping | performs a range check1 | 0.13.0+ |
| INT/int | INTEGER/int | direct/lossless mapping | direct/lossless mapping |  |
| BIGINT/long | LONG/long | direct/lossless mapping | direct/lossless mapping |  |
| FLOAT/float | FLOAT/float | direct/lossless mapping | direct/lossless mapping |  |
| DOUBLE/double | DOUBLE/double | direct/lossless mapping | direct/lossless mapping |  |
| STRING/java.lang.String | CHARARRAY/java.lang.String | direct/lossless mapping | direct/lossless mapping |  |
| BINARY/byte[] | BYTEARRAY/org.apache.pig.data.DataByteArray | direct/lossless mapping | direct/lossless mapping |  |
| DATE | DATETIME/org.joda.time.DateTime | turn to DateTime with time part set to 0 and local timezone | if time component is 0 (regardless of timezone in the DateTime value), it will be written to target; otherwise it is considered out of range1 | 0.13.0+ |
| TIMESTAMP/java.sql.Timestamp | DATETIME/org.joda.time.DateTime | will lose ‘nanos’ and set timezone to local timezone | will translate to Timestamp based on 'millis' value | 0.13.0+ |
| DECIMAL/HiveDecimal (maximum 38 digits) | BIGDECIMAL/java.math.BigDecimal | direct/lossless mapping | performs a range check1 | 0.13.0+ |
| CHAR(x)/HiveChar | CHARARRAY/java.lang.String | direct/lossless mapping | performs a range check1 | 0.13.0+ |
| VARCHAR(x)/HiveVarchar | CHARARRAY/java.lang.String | direct/lossless mapping | performs a range check1 | 0.13.0+ |
| 1 Range check: If the Pig value is out of range for the target Hive column, by default NULL will be written and one warning per target column/type will be logged. The user may specify “`onOutOfRangeValue Throw`” to HCatStorer so that an error will be raised instead. For example:`store data into 'test\_tbl' using org.apache.hive.hcatalog.pig.HCatStorer('','','-onOutOfRangeValue Throw');`The only values for `onOutOfRangeValue` are `Throw` and `Null` (default). |

Note

Hive does not have a data type corresponding to the BIGINTEGER type in Pig (java.math.BigInteger values).

### Complex Types

 

| Hive Type | Pig Type |
| --- | --- |
| map  (key type should be string) | map |
| ARRAY<*any type*> | bag |
| struct<*any type fields*> | tuple |

 

**Navigation Links**
Previous: [HCatalog Configuration Properties]({{< ref "hcatalog-configuration-properties_39622369" >}})  
 Next: [Input and Output Interfaces]({{< ref "hcatalog-inputoutput_34013776" >}})

General: [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

