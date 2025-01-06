---
title: "Apache Hive : Hive PreCommit Patch Testing"
date: 2024-12-12
---

# Apache Hive : Hive PreCommit Patch Testing

## Short Version

* Execute any tests you feel will be impacted by a change locally
* The full tests suite can executed by this patch testing facility by simply:
	+ Upload a patch to a JIRA in the following format HIVE-XXXX.patch, HIVE-XXXX.XX.patch, HIVE-XXXX.DXXXX.XX.patch (phabricator), or HIVE-XXXX-branch.patch (allows targeting a branch).
	+ Examples
		- HIVE-XXXX.patch (branch=trunk)
		- HIVE-XXXX-vectorization.patch (branch=vectorization)
		- HIVE-XXXX.XX-vectorization.patch (branch=vectorization)
		- HIVE-XXXX.DXXX.XX.patch (branch=trunk)
		- DXXX.XX.patch (branch=trunk)
		- HIVE-XXXX.XX.patch (branch=trunk)
	+ NOTICE; Jenkins will get the latest patch file attached on the JIRA, so submitting 2 patches, one for the branch and one for master will NOT execute both.   
	You have to submit one first, wait until HiveQA report the tests, then submit the other one to test the new branch.
* Read [MiniDriver Tests]({{< ref "minidriver-tests_38571221" >}}) before adding new MiniDriver tests (such as MiniMR or MiniTez) or Beeline driver tests
* All of the following patch formats are allowed:
	+ git diff
	+ git diff --no-prefix
	+ svn diff
* Placing any of these properties in the JIRA description will result in additional action:
	+ NO PRECOMMIT TESTS - do not run precommit tests
	+ CLEAR LIBRARY CACHE - clear the ivy and maven library before building the source
* A comment will be posted to the JIRA when the test is complete. Test results disappear after a day or two, so make sure to review them in time.
* The Jenkins job is [PreCommit-HIVE-Build](https://builds.apache.org/job/PreCommit-HIVE-Build/).

## Long Version

Hive Precommit testing is triggered via the following Jenkins job [PreCommit-Admin](https://builds.apache.org/view/H-L/view/Hive/job/PreCommit-Admin/), and executes on the [Hive PTest2 Infrastructure]({{< ref "hive-ptest2-infrastructure_33295254" >}}). It should **not** be used as a replacement for local testing. Contributors and committers should execute any tests they believe will be impacted by a change locally.

The PreCommit build requires a patch name to be in a specific format. The format is as follows:

```
HIVE-XXXX(.XX)?(-branch)?.patch(.txt)?
(HIVE-XXXX\.)?DXXXX(.XX)?.patch(.txt)?

```

All other attachments will be ignored. Branch and .txt are both optional. If branch is not specified then trunk is assumed. Before executing a PreCommit build for a particular branch, the branch must be setup on the [Hive PTest2 Infrastructure]({{< ref "hive-ptest2-infrastructure_33295254" >}}) by a committer.

To find your issue's build in the queue, navigate to [PreCommit-HIVE-Build](https://builds.apache.org/job/PreCommit-HIVE-Build/), find the Build History column on the left, and mouse over the icon on each "pending" build until you find your issue number (e.g. ISSUE_NUM=12345).

If you'd like to resubmit your patch you can either:

1. Upload the patch again (by clicking Submit Patch)
2. Click "Build with Parameters" here [PreCommit-HIVE-MASTER-Build](https://builds.apache.org/view/H-L/view/Hive/job/PreCommit-HIVE-MASTER-Build/) and put the numeric portion of the JIRA in the issue number field.

 

 

