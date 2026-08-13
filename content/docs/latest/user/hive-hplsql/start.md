---
title: "Apache Hive : HPL/SQL - Get Started"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - Get Started

Quick guide how to start using HPL/SQL.

## Installation

You can install HPL/SQL by [Apache Hive downloads](https://hive.apache.org/general/downloads/) .tar.gz or .zip file, or build it from the [Apache Hive downloads](https://hive.apache.org/general/downloads/).

### Requirements

- Java 1.6 or higher
- Hadoop 1.x. and 2.x

### Installing HPL/SQL from Binaries =

**1. Download**

[Apache Hive downloads](https://hive.apache.org/general/downloads/) a HPL/SQL release and uncompress to the preferred location, for example ~/hplsql/ directory. The HPL/SQL program directory includes the following files:

- hplsql - Shell script to launch HPL/SQL on Linux
- hplsql.cmd - Shell script to launch the tool on Windows
- hplsql-x.x.x.jar - HPL/SQL executable (x.x.x contains the version)
- hplsql-site.xml - HPL/SQL [configuration]({{< ref "configuration" >}}) file
- antlr-runtime-4.5.jar - ANTLR parser runtime

On Linux/UNIX make sure *hplsql* is an executable file (if you uncompress the tool from .zip file):

```
chmod +x <hplsql_dir>/hplsql
```

**2. Configure CLASSPATH** (Optional)

For Cloudera distributions, you can edit *hplsql* file, remove all lines containing

```
export "HADOOP_CLASSPATH=..."
```

and add the following line

```
export "HADOOP_CLASSPATH=/opt/cloudera/parcels/CDH/jars/*"
```

For Hortonworks distributions check if Hadoop jars are located in /usr/hdp/x.x.x.x-x/ directory and change all paths in *hplsql* file accordingly.  

For other distributions check whether Hadoop jars are located in /usr/lib/, and make necessary changes in *hplsql* file. 

**3. Test installation**

Run the following command to test HPL/SQL installation:

```
<hplsql_dir>/hplsql --version
HPL/SQL x.x.x
```

Or when executed from the current directory:

```
./hplsql --version
HPL/SQL x.x.x
```

If the version number is printed the tool is installed correctly.

**4. Add to PATH variable** (Optional)

You may add HPL/SQL directory to PATH variable:

```
export PATH=$PATH:<hplsql_dir>
```

Then you can invoke HPL/SQL by running:

```
hplsql <options>
```

## Configuration

HPL/SQL uses [hplsql-site.xml]({{< ref "configuration" >}}) configuration file located in the HPL/SQL program directory where hplsql.jar is located. 

To run Hive queries from HPL/SQL you may need to specify the YARN job queue, for example:

```
<property>
  <name>hplsql.conn.init.hive2conn</name>
  <value>
     set mapred.job.queue.name=dev;
     set hive.execution.engine=mr; 
     use sales_db;
  </value>
</property>
```

Note that [hplsql-site.xml]({{< ref "configuration" >}}) located in the current directory takes precedence over the configuration file in HPL/SQL program directory.  

### Running HPL/SQL =

Now you can specify [options]({{< ref "cli" >}}) and run HPL/SQL, for example:

```
hplsql -e "CURRENT_DATE+1" 

hplsql -e "SELECT * FROM src LIMIT 1" 
```

or

```
hplsql -f script.sql
```

## Use HPL/SQL in Shell Scripts

Get a value from HPL/SQL script:

```
MDATE=$(hplsql -e "NVL(MIN_PARTITION_DATE(sales, local_dt, code='A'), '1970-01-01')")
```

```
START=$(hplsql -e 'CURRENT_DATE - 1')
```

Read [HPL/SQL Reference]({{< ref "hive-hplsql" >}}) for more information how to use the tool.
