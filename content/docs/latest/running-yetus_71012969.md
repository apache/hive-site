---
title: "Apache Hive : Running Yetus"
date: 2024-12-12
---

# Apache Hive : Running Yetus

# Overview

[Yetus](https://yetus.apache.org/) is added to Hive in release 3.0.0 to run checks on the new patches. See [HIVE-15051](https://issues.apache.org/jira/browse/HIVE-15051).

There are several rules already defined by the community, but most of them are not enforced.

Yetus helps us by checking these rules for newly introduced errors. Note that Yetus checks only the changed part of the code. If any unchanged code contains errors, then Yetus will not report them, but all of the new code should conform to the rules.

The following Yetus plugins are used in the Hive personality:

* asflicense – Rat check to validate ASF headers.
* author – Checks that there is not @author tag in the files.
* checkstyle – Runs checkstyle.
* findbugs – Runs findbugs.
* compile – Shows compile warnings.
* javadoc – Shows javadoc problems.
* whitespace – Checks for extra whitespaces.
* xml – Checks xml validity.

# Findbugs

To run findbugs checks, the findbugs binary should be installed on the computer and the FINDBUGS\_HOME environment variable should be set. The binary can be downloaded [here](http://findbugs.sourceforge.net/downloads.html).

```
export FINDBUGS\_HOME=~/dev/upstream/findbugs-3.0.1/
```

# Running Yetus

First checkout a copy of the branch you are targeting without your commits.

Then run the checks with the following command:

```
./dev-support/test-patch.sh ~/Downloads/HIVE-16345.2.patch
```

 

 

