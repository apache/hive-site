---
title: "Apache Hive : UserGuide"
date: 2024-12-12
---

# Apache Hive : UserGuide

NOTE: This page is deprecated and merged into [GettingStarted]({{< ref "gettingstarted_27362090" >}}).

# User Guide

The query language specification is available at [LanguageManual]({{< ref "languagemanual_27362030" >}}). Also see, [GettingStarted]({{< ref "gettingstarted_27362090" >}}) for setup instructions.

## Supported Features

## Usage Examples

### Creating tables

#### MovieLens User Ratings

```
CREATE TABLE u_data (
  userid INT,
  movieid INT,
  rating INT,
  unixtime STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
STORED AS TEXTFILE;

```

#### Apache Access Log Tables

```
add jar ../build/contrib/hive_contrib.jar;

CREATE TABLE apachelog (
  host STRING,
  identity STRING,
  user STRING,
  time STRING,
  request STRING,
  status STRING,
  size STRING,
  referer STRING,
  agent STRING)
ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.RegexSerDe'
WITH SERDEPROPERTIES (
  "input.regex" = "([^]*) ([^]*) ([^]*) (-|\\[^\\]*\\]) ([^ \"]*|\"[^\"]*\") (-|[0-9]*) (-|[0-9]*)(?: ([^ \"]*|\"[^\"]*\") ([^ \"]*|\"[^\"]*\"))?",
  "output.format.string" = "%1$s %2$s %3$s %4$s %5$s %6$s %7$s %8$s %9$s"
)
STORED AS TEXTFILE;

```

#### Control Separated Tables

```
CREATE TABLE mylog (
name STRING, language STRING, groups ARRAY<STRING>, entities MAP<INT, STRING>)
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\001'
  COLLECTION ITEMS TERMINATED BY '\002'
  MAP KEYS TERMINATED BY '\003'
STORED AS TEXTFILE;

```

### Loading tables

#### MovieLens User Ratings

Download and extract the data:

```
wget http://www.grouplens.org/system/files/ml-data.tar+0.gz
tar xvzf ml-data.tar+0.gz

```

Load it in:

```
LOAD DATA LOCAL INPATH 'ml-data/u.data'
OVERWRITE INTO TABLE u_data;

```

### Running queries

#### MovieLens User Ratings

```
SELECT COUNT(1) FROM u_data;

```

### Running custom map/reduce jobs

#### MovieLens User Ratings

Create weekday_mapper.py:

```
import sys
import datetime

for line in sys.stdin:
  line = line.strip()
  userid, movieid, rating, unixtime = line.split('\t')
  weekday = datetime.datetime.fromtimestamp(float(unixtime)).isoweekday()
  print '\t'.join([userid, movieid, rating, str(weekday)])

```

Use the mapper script:

```
CREATE TABLE u_data_new (
  userid INT,
  movieid INT,
  rating INT,
  weekday INT)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t';

INSERT OVERWRITE TABLE u_data_new
SELECT
  TRANSFORM (userid, movieid, rating, unixtime)
  USING 'python weekday_mapper.py'
  AS (userid, movieid, rating, weekday)
FROM u_data;

SELECT weekday, COUNT(1)
FROM u_data_new
GROUP BY weekday;

```

**Note: due to a bug in the parser, you must run the "INSERT OVERWRITE" query on a single line**

### Using sampling

## Known Issues/Bugs

 

 

