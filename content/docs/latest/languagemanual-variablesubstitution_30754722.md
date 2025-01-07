---

title: "Apache Hive : LanguageManual VariableSubstitution"
date: 2024-12-12
----------------

# Apache Hive : LanguageManual VariableSubstitution

# 

* 
* [Introduction]({{< ref "#introduction" >}})
* [Using Variables]({{< ref "#using-variables" >}})
* [Substitution During Query Construction]({{< ref "#substitution-during-query-construction" >}})
* [Disabling Variable Substitution]({{< ref "#disabling-variable-substitution" >}})

# Introduction

Hive is used for batch and interactive queries. Variable Substitution allows for tasks such as separating environment-specific configuration variables from code.

The Hive variable substitution mechanism was designed to avoid some of the code that was getting baked into the scripting language on top of Hive.

Examples such as the following shell commands may (inefficiently) be used to set variables within a script:

```
$ a=b
$ hive -e " describe $a "

```

This is frustrating as Hive becomes closely coupled with scripting languages. The Hive startup time of a couple seconds is non-trivial when doing thousands of manipulations such as multiple `hive -e` invocations.

Hive **Variables** combine the set capability you know and love with some limited yet powerful substitution ability.

The following example:

```
$ bin/hive --hiveconf a=b -e 'set a; set hiveconf:a; \
create table if not exists b (col int); describe ${hiveconf:a}'

```

results in:

```
Hive history file=/tmp/edward/hive\_job\_log\_edward\_201011240906\_1463048967.txt
a=b
hiveconf:a=b
OK
Time taken: 5.913 seconds
OK
col	int	
Time taken: 0.754 seconds

```

For general information about Hive command line options, see [Hive CLI]({{< ref "languagemanual-cli_27362033" >}}).

Version information

The `hiveconf` option was added in version 0.7.0 (JIRA [HIVE-1096](https://issues.apache.org/jira/browse/HIVE-1096)). Version 0.8.0 added the options `define` and `hivevar` (JIRA [HIVE-2020](https://issues.apache.org/jira/browse/HIVE-2020)), which are equivalent and are not described here. They create custom variables in a namespace that is separate from the hiveconf, system, and env namespaces.

# Using Variables

There are three namespaces for variables – hiveconf, system, and env. ([Custom variables](https://issues.apache.org/jira/browse/HIVE-2020) can also be created in a separate namespace with the `define` or `hivevar` option in Hive 0.8.0 and later releases.)

The hiveconf variables are set as normal:

```
set x=myvalue

```

However they are retrieved using:

```
${hiveconf:x}

```

Annotated examples of usage from the test case ql/src/test/queries/clientpositive/set\_processor\_namespaces.q:

```
set zzz=5;
--  sets zzz=5
set zzz;

set system:xxx=5;
set system:xxx;
-- sets a system property xxx to 5

set system:yyy=${system:xxx};
set system:yyy;
-- sets yyy with value of xxx

set go=${hiveconf:zzz};
set go;
-- sets go base on value on zzz

set hive.variable.substitute=false;
set raw=${hiveconf:zzz};
set raw;
-- disable substitution set a value to the literal

set hive.variable.substitute=true;

EXPLAIN SELECT * FROM src where key=${hiveconf:zzz};
SELECT * FROM src where key=${hiveconf:zzz};
--use a variable in a query

set a=1;
set b=a;
set c=${hiveconf:${hiveconf:b}};
set c;
--uses nested variables. 

set jar=../lib/derby.jar;

add file ${hiveconf:jar};
list file;
delete file ${hiveconf:jar};
list file;

```

# Substitution During Query Construction

Hive substitutes the value for a variable when a query is constructed with the variable.

* If you run two different Hive sessions, variable values will not be mixed across sessions.
* If you set variables with the same name in the same Hive session, a query uses the last set value.

# Disabling Variable Substitution

Variable substitution is on by default ([hive.variable.substitute]({{< ref "#hive-variable-substitute" >}})=true). If this causes an issue with an already existing script, disable it using the following command:

```
set hive.variable.substitute=false;

```

