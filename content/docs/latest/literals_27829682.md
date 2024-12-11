---
title: "Apache Hive : Literals"
date: 2024-12-12
---

# Apache Hive : Literals

# Literals

##### Integral types

Integral literals are assumed to be INT by default, unless the number exceeds the range of INT in which case it is interpreted as a BIGINT, or if one of the following postfixes is present on the number.

| Type  | Postfix  | Example |
| --- | --- | --- |
| TINYINT  |  Y  |  100Y  |
| SMALLINT  |  S  |  100S  |
| BIGINT  |  L  |  100L  |

##### String types

String literals can be expressed with either single quotes (') or double quotes ("). Hive uses C-style escaping within the strings.

##### Floating point types

Floating point literals are assumed to be DOUBLE. Scientific notation is not yet supported.

 

 

