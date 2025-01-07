---

title: "Apache Hive : PluginDeveloperKit"
date: 2024-12-12
----------------

# Apache Hive : PluginDeveloperKit

# Hive Plugin Developer Kit

This page explains Apache Hive's Plugin Developer Kit, or PDK. This allows developers to build and test Hive plugins without having to set up a Hive source build; only a Hive binary release is needed.

The PDK is planned for inclusion in the Hive 0.8.0 release; until that is available, please download a recent snapshot build from [Jenkins](http://jenkins-ci.org); make sure it includes [HIVE-2244](https://issues.apache.org/jira/browse/HIVE-2244).

Currently, the PDK is only targeted at user defined functions (including UDAF's and UDTF'S), although it may be possible to use it for building other kinds of plugins such as serdes, input/output formats, storage handlers and index handlers. The PDK's test framework currently only supports automated testing of UDF's.

## Example Plugin

To demonstrate the PDK in action, the Hive release includes an `examples/test-plugin` directory. You can build the test plugin by changing to that directory and running

```
ant -Dhive.install.dir=../..

```

This will create a `build` subdirectory containing the compiled plugin: `pdk-test-udf-0.1.jar`. There's also a `build/metadata` directory containing `add-jar.sql` (demonstrating the command to use to load the plugin jar) and `class-registration.sql` (demonstrating the commands to use for loading the UDF's from the plugin). The .sql files can be passed via the Hive CLI's `-i` command-line parameter in order to be run as initialization scripts.

You can run the tests associated with the plugin via

```
ant -Dhive.install.dir=../.. test

```

If all is well, you should see output like

```
Buildfile: /hive-0.8.0-SNAPSHOT/examples/test-plugin/build.xml

get-class-list:

test:
    [junit] Running org.apache.hive.pdk.PluginTest
    [junit] Tests run: 2, Failures: 0, Errors: 0, Time elapsed: 38.955 sec

BUILD SUCCESSFUL

```

The example plugin is also built and tested as part of the main Hive build in order to verify that the PDK is operating as expected.

## Your Own Plugin

To create your own plugin, you can follow the patterns from the example plugin. Let's take a closer look at it. First, the `build.xml`:

```
<project name="pdktest" default="package">
  <property name="plugin.libname" value="pdk-test-udf"/>
  <property name="plugin.title" value="Hive PDK Test UDF Library"/>
  <property name="plugin.version" value="0.1"/>
  <property name="plugin.vendor" value="Apache Software Foundation"/>
  <property name="function.sql.prefix" value="tp\_"/>
  <import file="${hive.install.dir}/scripts/pdk/build-plugin.xml"/>
</project>

```

All this buildfile does is define some variable settings and then import a build script from the PDK, which does the rest (including defining the package and test targets used for building and testing the plugin). So for your own plugin, change the variable settings accordingly, and set hive.install.dir to the location where you've installed the Hive release.

The imported PDK buildfile assumes a few things about the structure of your plugin source structure:

* your-plugin-root
  + build.xml
  + src
    - Java source files
  + test
    - setup.sql
    - cleanup.sql
    - any datafiles needed by your tests

For the example plugin, a datafile onerow.txt contains a single row of data; setup.sql creates a table named onerow and loads the datafile, whereas cleanup.sql drops the onerow table. The onerow table is convenient for testing UDF's.

## Annotations

Now let's take a look at the source code for a UDF.

```
package org.apache.hive.pdktest;

import org.apache.hive.pdk.HivePdkUnitTest;
import org.apache.hive.pdk.HivePdkUnitTests;

import org.apache.hadoop.hive.ql.exec.Description;
import org.apache.hadoop.hive.ql.exec.UDF;
import org.apache.hadoop.io.Text;

/**
 * Example UDF for rot13 transformation.
 */
@Description(name = "rot13",
  value = "\_FUNC\_(str) - Returns str with all characters transposed via rot13",
  extended = "Example:\n"
  + "  > SELECT \_FUNC\_('Facebook') FROM src LIMIT 1;\n" + "  'Snprobbx'")
@HivePdkUnitTests(
    setup = "create table rot13\_data(s string); "
    + "insert overwrite table rot13\_data select 'Facebook' from onerow;",
    cleanup = "drop table if exists rot13\_data;",
    cases = {
      @HivePdkUnitTest(
        query = "SELECT tp\_rot13('Mixed Up!') FROM onerow;",
        result = "Zvkrq Hc!"),
      @HivePdkUnitTest(
        query = "SELECT tp\_rot13(s) FROM rot13\_data;",
        result = "Snprobbx")
    }
  )
public class Rot13 extends UDF {
  private Text t = new Text();

  public Rot13() {
  }

  public Text evaluate(Text s) {
    StringBuilder out = new StringBuilder(s.getLength());
    char[] ca = s.toString().toCharArray();
    for (char c : ca) {
      if (c >= 'a' && c <= 'm') {
        c += 13;
      } else if (c >= 'n' && c <= 'z') {
        c -= 13;
      } else if (c >= 'A' && c <= 'M') {
        c += 13;
      } else if (c >= 'N' && c <= 'Z') {
        c -= 13;
      }
      out.append(c);
    }
    t.set(out.toString());
    return t;
  }
}

```

The annotations are interpreted by the PDK as follows:

* @Description: provides metadata to Hive about a UDF's syntax and usage. Only classes with this annotation will be included in the generated class-registration.sql
* @HivePdkUnitTests: enumerates one or more test cases, and also specifies optional setup and cleanup commands to run before and after the test cases.
* @HivePdkUnitTest: specifies one test case, consisting of the query to run and the expected result

Annotations allow the code and tests to be kept close together. This is good for small tests; if your tests are very complicated, you may want to set up your own scripting around the Hive CLI.

## Test Execution

The PDK executes tests as follows:

1. Run top-level cleanup.sql (in case a previous test failed in the middle)
2. Run top-level setup.sql
3. For each class with @HivePdkUnitTests annotation
   1. Run class cleanup (if any)
   2. Run class setup (if any)
   3. For each @HivePdkUnitTest annotation, run query and verify that actual result matches expected result
   4. Run class cleanup (if any)
4. Run top-level cleanup.sql

If you encounter problems during test execution, look in the file `TEST-org.apache.hive.pdk.PluginTest.txt` for details.

## Futures

* support annotations for other plugin types
* add more annotations for automatically validating function parameters at runtime (instead of requiring the developer to write imperative Java code for this)
* add Eclipse support
* move Hive builtins to use PDK for more convenient testing ([HIVE-2523](https://issues.apache.org/jira/browse/HIVE-2523))
* command-line option for invoking a single testcase

