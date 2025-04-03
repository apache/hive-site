---
title: "Apache Hive : HowToContribute"
date: 2024-12-12
---

# Apache Hive : HowToContribute

# How to Contribute to Apache Hive

This page describes the mechanics of *how* to contribute software to Apache Hive. For ideas about *what* you might contribute, please see open tickets in [Jira](https://issues.apache.org/jira/browse/HIVE).

{{< toc >}}

## Getting the Source Code

First of all, you need the Hive source code.

Get the source code on your local drive using git. See [Understanding Hive Branches]({{< ref "#understanding-hive-branches" >}}) below to understand which branch you should be using.

```
git clone https://github.com/apache/hive

```

Setting Up Eclipse Development Environment (Optional)

This is an optional step. Eclipse has a lot of advanced features for Java development, and it makes the life much easier for Hive developers as well.

[How do I import into eclipse?]({{< ref "#how-do-i-import-into-eclipse?" >}})

## Becoming a Contributor

This checklist tells you how to create accounts and obtain permissions needed by Hive contributors. See the [Hive website](http://hive.apache.org/) for additional information.

* Request an Apache Software Foundation [JIRA account](https://cwiki.apache.org/confluence/display/Hive/HowToContribute#HowToContribute-RequestAccount), if you do not already have one.
	+ The ASF JIRA system dashboard is [here](https://issues.apache.org/jira/secure/Dashboard.jspa).
	+ The Hive JIRA is [here](https://issues.apache.org/jira/browse/HIVE).
* To review patches check the open [pull requests on GitHub](https://github.com/apache/hive/pulls)
* To contribute to the Hive wiki, follow the instructions in [About This Wiki]({{< ref "#about-this-wiki" >}}).
* To edit the Hive website, follow the instructions in [How to edit the website](https://cwiki.apache.org/confluence/display/Hive/How+to+edit+the+website).
* Join the [Hive mailing lists](http://hive.apache.org/mailing_lists.html) to receive email about issues and discussions.

## Making Changes

If you're a newcomer, feel free to contribute by working on a [newbie](https://issues.apache.org/jira/issues?jql=project%20%3D%20HIVE%20AND%20resolution%20%3D%20Unresolved%20%20AND%20labels%20%3D%20newbie%20ORDER%20BY%20priority%20DESC%2C%20updated%20DESC) task.

Before you start, send a message to the [Hive developer mailing list](http://hadoop.apache.org/hive/mailing_lists.html#Developers), or file a bug report in [JIRA](https://issues.apache.org/jira/browse/HIVE). Describe your proposed changes and check that they fit in with what others are doing and have planned for the project. Be patient, it may take folks a while to understand your requirements.

Modify the source code and add some features using your favorite IDE.

### Coding Conventions

Please take care about the following points.

* All public classes and methods should have informative [Javadoc comments](http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html).
	+ Do not use @author tags.
* Code should be formatted according to [Sun's conventions](http://web.archive.org/web/20140228225807/http://www.oracle.com/technetwork/java/codeconventions-150003.pdf), with two exceptions:
	+ Indent two (2) spaces per level, not four (4).
	+ Line length limit is 120 chars, instead of 80 chars.

An Eclipse [formatter](https://github.com/apache/hive/blob/master/dev-support/eclipse-styles.xml) is provided in the dev-support folder – this can be used with both Eclipse and Intellij. Please consider importing this before editing the source code.

* + For Eclipse:
		- Go to Preferences -> Java -> Code Style -> Formatter; Import eclipse-styles.xml; Apply.
		- In addition update save actions: Java -> Editor -> Save Actions; Check the following: Perform the following actions on save; Format Source Code; Format edited lines.
	+ For Intellij:
		- Go to Settings -> Editor -> Code Style -> Java -> Scheme; Click manage; Import eclipse-styles.xml; Apply.
* Contributions should not introduce new Checkstyle violations.
	+ Check for new [Checkstyle](http://checkstyle.sourceforge.net/) violations by running `mvn checkstyle:checkstyle-aggregate`, and then inspect the results in the `target/site` directory. It is possible to run the checks for a specific module, if the  `mvn` command is issued in the root directory of the module.
	+ If you use Eclipse you should install the [eclipse-cs Checkstyle plugin](http://eclipse-cs.sourceforge.net/). This plugin highlights violations in your code and is also able to automatically correct some types of violations.
* Contributions should pass existing unit tests.
* New unit tests should be provided to demonstrate bugs and fixes. [JUnit](http://www.junit.org) is our test framework:
	+ You should create test classes for junit4, whose class name must start with a 'Test' prefix.
	+ You can run all the unit tests with the command `mvn test`, or you can run a specific unit test with the command `mvn test -Dtest=<class name without package prefix>` (for example: `mvn test -Dtest=TestFileSystem`).
	+ After uploading your patch, it might worthwhile to check if your new test has been executed in the precommit job.

### Understanding Maven

Hive is a **multi-module** Maven project. If you are new to [Maven](http://maven.apache.org), the articles below may be of interest:

* [Maven in Five Minutes](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
* [Maven getting started](http://maven.apache.org/guides/getting-started)
* [Maven by example - a multi-module project](http://books.sonatype.com/mvnex-book/reference/multimodule.html)

Additionally, Hive actually has two projects, "core" and "itests". The reason that itests is not connected to the core reactor is that itests requires the packages to be built.

The actual Maven commands you will need are discussed on the [HiveDeveloperFAQ]({{< ref "hivedeveloperfaq_27823747" >}}) page.

### Understanding Hive Branches

Hive has a few "main lines", master and branch-X.

All new feature work and bug fixes in Hive are contributed to the master branch. Releases are done from branch-X. Major versions like 2.x versions are not necessarily backwards compatible with 1.x versions.backwards compatibility will be accepted on branch-1.

In addition to these main lines Hive has two types of branches, release branches and feature branches.

Release branches are made from branch-1 (for 1.x) or master (for 2.x) when the community is preparing a Hive release. Release branches match the number of the release (e.g., branch-1.2 for Hive 1.2). For patch releases the branch is made from the existing release branch (to avoid picking up new features from the main line). For example, if a 1.2.1 release was being made branch-1.2.1 would be made from the tip of branch-1.2. Once a release branch has been made, inclusion of additional patches on that branch is at the discretion of the release manager. After a release has been made from a branch, additional bug fixes can still be applied to that branch in anticipation of the next patch release. Any bug fix applied to a release branch must first be applied to master (and branch-1 if applicable).

Feature branches are used to develop new features without destabilizing the rest of Hive. The intent of a feature branch is that it will be merged back into master once the feature has stabilized.

For general information about Hive branches, see [Hive Versions and Branches]({{< ref "#hive-versions-and-branches" >}}).

### Hadoop Dependencies

Hadoop dependencies are handled differently in master and branch-1.

#### branch-1

In branch-1 both Hadoop 1.x and 2.x are supported. The Hive build downloads a number of different Hadoop versions via Maven in order to compile "shims" which allow for compatibility with these Hadoop versions. However, the rest of Hive is only built and tested against a single Hadoop version.

The Maven build has two profiles, `hadoop-1` for Hadoop 1.x and `hadoop-2` for Hadoop 2.x. When building, you must specify which profile you wish to use via Maven's `-P` command line option (see [How to build all source]({{< ref "#how-to-build-all-source" >}})).

#### branch-2

Hadoop 1.x is no longer supported in Hive's master branch. There is no need to specify a profile for most Maven commands, as Hadoop 2.x will always be chosen.

Hadoop Version Information

On this page we assume you are building from the master branch and do not include the profile in the example Maven commands. If you are building on branch-1 you will need to select the appropriate profile for the version of Hadoop you are building against.

### Unit Tests

When submitting a patch it's highly recommended you execute tests locally which you believe will be impacted in addition to any new tests. The full test suite can be executed by [Hive PreCommit Patch Testing]({{< ref "hive-precommit-patch-testing_33295252" >}}). [Hive Developer FAQ]({{< ref "hivedeveloperfaq_27823747" >}}) describes how to execute a specific set of tests.

```
mvn clean install -DskipTests
mvn test -Dtest=SomeTest

```

Unit tests take a long time (several hours) to run sequentially even on a very fast machine.

### Add a Unit Test

There are two kinds of unit tests that can be added: those that test an entire component of Hive, and those that run a query to test a feature.

#### Java Unit Test

To test a particular component of Hive:

* Add a new class (name must start with `Test`) in the component's `*/src/test/java` directory.
* To test only the new testcase, run `mvn test -Dtest=TestAbc` (where `TestAbc` is the name of the new class), which will be faster than `mvn test` which tests all testcases.

#### Query File Test(qtest)

[You can run end-to-end integration tests using LLAP, Tez, Iceberg, etc.](/development/qtest/)

### Submitting a PR

There are many excellent howtos about how to submit pullrequests for github projects. The following is one way to approach it:

Setting up a repo with 2 remotes; I would recommend to use the github user as the remote name - as it may make things easier if you need to add someone else's repo as well.

```
# clone the apache/hive repo from github
git clone --origin apache https://github.com/apache/hive
cd hive
# add your own fork as a remote
git remote add GITHUB_USER git@github.com:GITHUB_USER/hive
```

You will need a separate branch to make your changes; you need to this for every PR you are doing.

```
# fetch all changes - so you will create your feature branch on top of the current master
git fetch --all
# create a feature branch This branch name can be anything - including the ticket id may help later on identifying the branch.
git branch HIVE-9999-something apache/master
git checkout HIVE-9999-something
# push your feature branch to your github fork - and set that branch as upstream to this branch
git push GITHUB_USER -u HEAD
```

Make your change

```
# make your changes; you should include the ticketid + message in the first commit message
git commit -m 'HIVE-9999: Something' -a
# a simple push will deliver your changes to the github branch
git push
```

If you think your changes are ready to be tested and reviewed - you could open a PR request on the <https://github.com/apache/hive> page.

If you need to make changes you just need to push further changes to the branch.

Please do not:

* reformat code unrelated to the issue being fixed: formatting changes should be separate patches/commits;
* comment out code that is now obsolete: just remove it;
* insert comments around each change, marking the change: folks can use git to figure out what's changed and by whom;
* make things public that are not required by end-users.

Please do:

* try to adhere to the coding style of files you edit;
* comment code whose function or rationale is not obvious;
* add one or more unit tests (see [Add a Unit Test]({{< ref "#add-a-unit-test" >}}) above);
* update documentation (such as Javadocs including *package.html* files and this wiki).

### Fetching a PR from Github

you could do that using:

```
git fetch origin pull/ID/head:BRANCHNAME
```

Suppose you want to pull the changes of PR-1234 into a local branch named "radiator"

```
git fetch origin pull/1234/head:radiator
```

## Contributing Your Work

You should open a JIRA ticket about the issue you are about to fix.

Upload your changes to your github fork and open a PR against the hive repo.

If your patch creates an incompatibility with the latest major release, then you must set the **Incompatible change** flag on the issue's JIRA *and* fill in the **Release Note** field with an explanation of the impact of the incompatibility and the necessary steps users must take.

If your patch implements a major feature or improvement, then you must fill in the **Release Note** field on the issue's JIRA with an explanation of the feature that will be comprehensible by the end user.

The **Release Note** field can also document changes in the user interface (such as new HiveQL syntax or configuration parameters) prior to inclusion in the wiki documentation.

A committer should evaluate the patch within a few days and either: commit it; or reject it with an explanation.

Please be patient. Committers are busy people too. If no one responds to your patch after a few days, please make friendly reminders. Please incorporate others' suggestions into your patch if you think they're reasonable. Finally, remember that even a patch that is not committed is useful to the community.

Should your patch receive a "-1" select **Resume Progress** on the issue's JIRA, upload a new patch with necessary fixes, and then select the **Submit Patch** link again.

Committers: for non-trivial changes, it is best to get another committer to review your patches before commit. Use the **Submit Patch** link like other contributors, and then wait for a "+1" from another committer before committing. Please also try to frequently review things in the patch queue.

## JIRA

Hive uses [JIRA](https://issues.apache.org/jira/browse/HIVE) for issues/case management. You must have a JIRA account in order to log cases and issues. 

Requests for the creation of new accounts can be submitted via the following form: <https://selfserve.apache.org/jira-account.html>

### Guidelines

Please comment on issues in [JIRA](https://issues.apache.org/jira/browse/HIVE-10000), making your concerns known. Please also vote for issues that are a high priority for you.

Please refrain from editing descriptions and comments if possible, as edits spam the mailing list and clutter JIRA's "All" display, which is otherwise very useful. Instead, preview descriptions and comments using the preview button (icon below the comment box) before posting them.

Keep descriptions brief and save more elaborate proposals for comments, since descriptions are included in JIRA's automatically sent messages. If you change your mind, note this in a new comment, rather than editing an older comment. The issue should preserve this history of the discussion.

To open a JIRA issue, click the Create button on the top line of the [Hive summary page](https://issues.apache.org/jira/browse/HIVE/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or any Hive JIRA issue.

Please leave Fix Version/s empty when creating the issue – it should not be tagged until an issue is closed, and then, it is tagged by the committer closing it to indicate the earliest version(s) the fix went into. Instead of Fix Version/s, use Target Version/s to request which versions the new issue's patch should go into. (Target Version/s was added to the Create Issue form in November 2015. You can add target versions to issues created before that with the Edit button, which is in the upper left corner.)

Consider using bi-directional links when referring to other tickets. It is very common and convenient to refer to other tickets by adding the HIVE-XXXXX pattern in summary, description, and comments. The pattern allows someone to navigate quickly to an older JIRA from the current one but not the other way around. Ideally, along with the mention (HIVE-XXXXX) pattern, it helps to add an explicit link (relates to, causes, depends upon, etc.) so that the relationship between tickets is visible from both ends.

Add the "backward-incompatible" label to tickets changing the behavior of some component or introduce modifications to public APIs. There are various other labels available for similar purposes but this is the most widely used across projects so it is better to stick to it to keep things uniform.

When in doubt about how to fill in the Create Issue form, take a look at what was done for other issues. Here are several Hive JIRA issues that you can use as examples:

* bug:  [HIVE-8485](https://issues.apache.org/jira/browse/HIVE-8485), [HIVE-8600](https://issues.apache.org/jira/browse/HIVE-8600), [HIVE-9438](https://issues.apache.org/jira/browse/HIVE-9438), [HIVE-11174](https://issues.apache.org/jira/browse/HIVE-11174)
* new feature:  [HIVE-6806,](https://issues.apache.org/jira/browse/HIVE-6806)[HIVE-7088](https://issues.apache.org/jira/browse/HIVE-7088)[,](https://issues.apache.org/jira/browse/HIVE-6806)[HIVE-11103](https://issues.apache.org/jira/browse/HIVE-11103)
* improvement:  [HIVE-7685](https://issues.apache.org/jira/browse/HIVE-7685),[HIVE-9858](https://issues.apache.org/jira/browse/HIVE-9858)[,](https://issues.apache.org/jira/browse/HIVE-7685) [HIVE-10165](https://issues.apache.org/jira/browse/HIVE-10165)
* test:  [HIVE-8601](https://issues.apache.org/jira/browse/HIVE-8601), [HIVE-10637](https://issues.apache.org/jira/browse/HIVE-10637)
* wish:  [HIVE-4563](https://issues.apache.org/jira/browse/HIVE-4563), [HIVE-10427](https://issues.apache.org/jira/browse/HIVE-10427)
* task:  [HIVE-7111](https://issues.apache.org/jira/browse/HIVE-7111), [HIVE-7789](https://issues.apache.org/jira/browse/HIVE-7789)

Many examples of uncommitted issues are available in the "Added recently" list on the [issues panel](https://issues.apache.org/jira/browse/HIVE/?selectedTab=com.atlassian.jira.jira-projects-plugin:issues-panel).

## Generating Thrift Code

Some portions of the Hive code are generated by [Thrift](http://incubator.apache.org/thrift/). For most Hive changes, you don't need to worry about this, but if you modify any of the Thrift IDL files (e.g., **standalone-metastore/metastore-common/src/main/thrift/hive_metastore.thrift** and **service-rpc/if/TCLIService.thrift**), then you'll also need to regenerate these files and submit their updated versions as part of your patch.

Here are the steps relevant to `hive_metastore.thrift`:

1. Don't make any changes to `hive_metastore.thrift` until instructed below.
2. Use the approved version of Thrift. This is currently `thrift-0.14.1`, which you can obtain from <http://thrift.apache.org/>.
	1. For Mac via Homebrew (since the version we need is not available by default):
	
	
	
	```
	brew tap-new $USER/local-tap
	brew extract --version='0.14.1' thrift $USER/local-tap
	brew install thrift@0.14.1
	mkdir -p /usr/local/share/fb303/if
	cp /usr/local/Cellar/thrift@0.14.1/0.14.1/share/fb303/if/fb303.thrift /usr/local/share/fb303/if
	```
	2. For Mac, building from sources:
	
	
	
	```
	wget http://archive.apache.org/dist/thrift/0.14.1/thrift-0.14.1.tar.gz
	
	tar xzf thrift-0.14.1.tar.gz
	
	
	brew install libtool
	brew install automake
	
	#If configure fails with "syntax error near unexpected token `QT5", then run "brew install pkg-config"
	
	./bootstrap.sh
	
	sudo ./configure --with-openssl=/usr/local/Cellar/openssl@1.1/1.1.1j --without-erlang --without-nodejs --without-python --without-py3 --without-perl --without-php --without-php_extension --without-ruby --without-haskell --without-go --without-swift --without-dotnetcore --without-qt5
	
	brew install openssl
	
	sudo ln -s /usr/local/opt/openssl/include/openssl/ /usr/local/include/
	
	sudo make
	
	sudo make install
	
	mkdir -p /usr/local/share/fb303/if
	
	cp path/to/thrift-0.14.1/contrib/fb303/if/fb303.thrift /usr/local/share/fb303/if/fb303.thrift
	# or alternatively the following command
	curl -o /usr/local/share/fb303/if/fb303.thrift https://raw.githubusercontent.com/apache/thrift/master/contrib/fb303/if/fb303.thrift
	```
	3. For Linux:
	
	
	
	```
	cd /path/to/thrift-0.14.1
	/configure -without-erlang --without-nodejs --without-python --without-py3 --without-perl --without-php --without-php_extension --without-ruby --without-haskell --without-go --without-swift --without-dotnetcore --without-qt5
	sudo make
	sudo make install 
	sudo mkdir -p /usr/local/share/fb303/if
	sudo cp /path/to/thrift-0.14.1/contrib/fb303/if/fb303.thrift /usr/local/share/fb303/if/fb303.thrift
	```
3. Before proceeding, verify that `which thrift` returns the build of Thrift you just installed (typically `/usr/local/bin` on Linux); if not, edit your PATH and repeat the verification. Also verify that the command 'thrift -version' returns the expected version number of Thrift.
4. Now you can run the Maven 'thriftif' profile to generate the Thrift code:
	1. `cd /path/to/hive/`
	2. ```
	mvn clean install -Pthriftif -DskipTests -Dthrift.home=/usr/local
	```
5. Verify that the code generation was a no-op, which should be the case if you have the correct Thrift version and everyone has been following these instructions. You may use `git status` for the same. If you can't figure out what is going wrong, ask for help from a committer.
6. Now make your changes to `hive_metastore.thrift`, and then run the compiler again, from /path/to/hive/<hive_metastore.thrift's module>:
	1. ```
	mvn clean install -Pthriftif -DskipTests -Dthrift.home=/usr/local
	```
7. Now use `git status and git diff` to verify that the regenerated code corresponds only to the changes you made to `hive_metastore.thrift`. You may also need `git add` if new files were generated (and or `git rm` if some files are now obsoleted).
8. `cd /path/to/hive`
9. `mvn clean package -DskiptTests (at the time of writing also "-Dmaven.javadoc.skip" is needed)`
10. Verify that Hive is still working correctly with both embedded and remote metastore configurations.

Stay Involved

Contributors should join the [Hive mailing lists](https://hive.apache.org/community/mailinglists/). In particular the dev list (to join discussions of changes) and the user list (to help others).

## See Also

* [Apache contributor documentation](http://www.apache.org/dev/contributors.html)
* [Apache voting documentation](http://www.apache.org/foundation/voting.html)
* [How to edit the website]({{< ref "how-to-edit-the-website_33294834" >}})

  

  

 

 

