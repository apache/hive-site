---
title: "Apache Hive : GettingStarted EclipseSetup"
date: 2024-12-12
---

# Apache Hive : GettingStarted EclipseSetup

Page does not apply to trunk

The following page only applies to branch-0.12 and earlier. For trunk see [HiveDeveloperFAQ]({{< ref "hivedeveloperfaq_27823747" >}})

After checking out the source code run the following command from the top-level directory:

```
$ ant clean package eclipse-files

```

Now open up Eclipse and do the following:

* File->Import->General->Existing Projects Into Workspace->Select root directory (point to <top-level-directory>)

Make sure that Eclipse Java Compiler is in 1.6 compatibility mode:

* Project->Properties->Java Compiler->(Check)Enable project specific settings->(Change to 1.6)Compiler compliance level

This should import the project and the launch configurations. You can run the Hive CLI from within Eclipse by right clicking on the HiveCLI launch configuration and selecting "Run". You can also look for JUnit launch configurations by checking:

* Run->Run Configurations->JUnit.

There should be several configurations including `TestCliDriver`, `TestJdbc`, and `TestHive`.

Then, you should be able to run all the unit tests by Run->Run.

 

 

