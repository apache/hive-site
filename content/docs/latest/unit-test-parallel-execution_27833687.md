---

title: "Apache Hive : Unit Test Parallel Execution"
date: 2024-12-12
----------------

# Apache Hive : Unit Test Parallel Execution

It's likely you are looking for [Hive PreCommit Patch Testing]({{< ref "hive-precommit-patch-testing_33295252" >}}).

This page explains how to use parallel testing in Hive (<https://issues.apache.org/jira/browse/HIVE-1487>).

* [Installation]({{< ref "#installation" >}})
  + [Python modules]({{< ref "#python-modules" >}})
    - [Global installation]({{< ref "#global-installation" >}})
    - [Local installation]({{< ref "#local-installation" >}})
  + [SSH keys]({{< ref "#ssh-keys" >}})
  + [Configuration]({{< ref "#configuration" >}})
    - [Configuration file]({{< ref "#configuration-file" >}})
    - [Configuration parameter for speeding up unit tests]({{< ref "#configuration-parameter-for-speeding-up-unit-tests" >}})
* [Usage]({{< ref "#usage" >}})
  + [Testing a Differential revision]({{< ref "#testing-a-differential-revision" >}})
  + [Testing a patch from file system]({{< ref "#testing-a-patch-from-file-system" >}})
  + [Multiple test runs]({{< ref "#multiple-test-runs" >}})
  + [Testing report]({{< ref "#testing-report" >}})
  + [Tests output]({{< ref "#tests-output" >}})
  + [Hive logs]({{< ref "#hive-logs" >}})
* [Possible issues]({{< ref "#possible-issues" >}})

## Installation

### Python modules

To use parallel tests you have to install Python with "argparse" and "mako"  
modules. You can do that using your package manager or you can install the  
modules by hand. If you're using Python 2.7 or newer, "argparse" module is  
already included and you don't have to install it.

#### Global installation

You can install the modules globally for all users with "easy\_install":

```
sudo easy\_install argparse
sudo easy\_install mako

```

#### Local installation

If you don't have root acces on the machine, or you don't want to pollute your  
system directories, you can install the modules in your home directory.

```
easy\_install --prefix "~/.python\_modules" argparse
easy\_install --prefix "~/.python\_modules" mako

```

You'll have to update "PYTHONPATH" environmental variable to include  
"~/.python\_modules". You can do that by adding this line to your ".bashrc" or  
".zshrc":

```
export PYTHONPATH="${PYTHONPATH}:${HOME}/.python\_modules/lib/pythonVERSION/site-packages"

```

Where "VERSION" is Python version you're using, like "2.6" or "2.7", for example  
if you're using Python 2.6:

```
export PYTHONPATH="${PYTHONPATH}:${HOME}/.python\_modules/lib/python2.6/site-packages"

```

### SSH keys

You will have to setup SSH so you can access all test nodes without a password.

### Configuration

#### Configuration file

You'll need to configure which hosts the test should run on. You should put  
your configuration file in "~/.hive\_ptest.conf". Configuration file format is  
documented in the [README](https://github.com/apache/hive/blob/trunk/testutils/ptest/README) file distributed with the test script.

#### Configuration parameter for speeding up unit tests

Unit tests will run faster if the Hive configuration parameter  
[hive.exec.submit.local.task.via.child]({{< ref "#hive-exec-submit-local-task-via-child" >}}) is set to true. See [HIVE-7271](https://issues.apache.org/jira/browse/HIVE-7271) for details.

## Usage

You can see all possible options by running:

```
hive\_repo/testutils/ptest/hivetest.py --help

```

### Testing a Differential revision

If you want to test a patch from [Phabricator](https://reviews.facebook.net), you  
can use this command:

```
hive\_repo/testutils/ptest/hivetest.py --test --revision D123

```

### Testing a patch from file system

You can also test a patch from local file system.

```
hive\_repo/testutils/ptest/hivetest.py --test --patch /path/to/my.patch

```

You can provide multiple patches if you want to. They will be applied in the  
same order they appear on the command line.

```
hive\_repo/testutils/ptest/hivetest.py --test --patch first.patch second.patch

```

### Multiple test runs

Multiple users can run parallel tests using the same configuration file without  
problems. If you want to run different test instances simultaneously as one user you'll  
have to export "HIVE\_PTEST\_SUFFIX" environmental variable and set it to some  
unique string for each instance.

The [README](https://github.com/apache/hive/blob/trunk/testutils/ptest/README) file  
distributed with the test script explains how this variable affects the paths  
defined in your configuration file.

```
HIVE\_PTEST\_SUFFIX=first\_run hive\_repo/testutils/ptest/hivetest.py --test &
HIVE\_PTEST\_SUFFIX=second\_run hive\_repo/testutils/ptest/hivetest.py --test &

```

### Testing report

The paths here assume you're using "~/hivetests" as your "master\_base\_path"; if  
you are using some other path, update the paths accordingly.

After the test run ends, a test report will be generated in  
"~/hivetests/report/TIMESTAMP"; the main file is named "report.html". Since  
JUnit properties lists take up a lot of space, by default they are generated in  
separate ".html" files and linked from "report.html". If you want to generate  
just one file (for easy copying for example) you can use "--one-file-report"  
switch and the properties will be embedded in "report.html". Keep in mind that  
instead of getting a ~300k file, you'll get one that might be more than 10MB.

If you want to use a fixed report name instead of a timestamp, you can use  
"--report-name" switch, for example:

```
hive\_repo/testuitls/ptest/hivetest.py --test --revision D123 --report-name D123

```

This will generate report in "~/hivetests/report/D123". If there was already a  
report with that name it will be removed.

### Tests output

".q.out" files from TestCliDriver and TestNegativeCliDriver runs will be copied  
to "~/hivetests/report/TIMESTAMP/out" so they are available in one place.

### Hive logs

"hive.log" files from all test runs will be copied to  
"~/hivetests/report/TIMESTAMP/logs" and will be renamed to  
"hive-HOST-TESTCASE.log".

## Possible issues

Minimr tests (TestMinimrCliDriver, TestNegativeMinimrCliDriver and  
TestHBaseMinimrCliDriver) can't run simultaneously on one machine. The script  
makes sure they are not scheduled to run simultaneously on the same host during  
one test run, but multiple script runs (multiple users or one user testing  
multiple patches at the same time) might collide and cause failures in that test  
cases.

