---
title: "Apache Hive : HowToCommit"
date: 2024-12-12
---

# Apache Hive : HowToCommit

# Guide for Hive Committers

* [Guide for Hive Committers]({{< ref "#guide-for-hive-committers" >}})
	+ [New committers]({{< ref "#new-committers" >}})
	+ [Review]({{< ref "#review" >}})
	+ [Reject]({{< ref "#reject" >}})
	+ [PreCommit runs, and committing patches]({{< ref "#precommit-runs-and-committing-patches" >}})
	+ [Commit]({{< ref "#commit" >}})
		- [Committing Documentation]({{< ref "#committing-documentation" >}})
	+ [Backporting commits to previous branches]({{< ref "#backporting-commits-to-previous-branches" >}})
	+ [Dialog]({{< ref "#dialog" >}})

This page contains guidelines for committers of the Apache Hive project. (If you're currently a contributor, and are interested in how we add new committers, read [BecomingACommitter]({{< ref "/community/becomingcommitter" >}}))

## New committers

New committers are encouraged to first read Apache's generic committer documentation:

* [Apache New Committer Guide](http://www.apache.org/dev/new-committers-guide.html)
* [ASF Project Security for committers](https://www.apache.org/security/committers.html#asf-project-security-for-committers)
* [Apache Committer FAQ](http://www.apache.org/dev/committers.html)

The first act of a new core committer is typically to add their name to the [credits](https://hive.apache.org/community/people/) page. This requires changing the source in <https://github.com/apache/hive-site/blob/main/content/community/people.md>

Committers are strongly encouraged to subscribe to the [security@hive.apache.org]({{< ref "mailto:security-subscribe@hive-apache-org" >}}) list with their Apache email and help addressing security vulnerability reports.

## Review

Hive committers should, as often as possible, attempt to review Pull Requests submitted by others. Ideally every submitted PR will get reviewed by a committer within a few days. If a committer reviews a PR they've not authored, and believe it to be of sufficient quality, then they can merge the PR, otherwise the PR should be cancelled with a clear explanation for why it was rejected.

The list of open Pull Requests can be found here: [Hive Open Pull Requests](https://github.com/apache/hive/pulls). This is ordered by time of creating. Committers should scan the list from bottom-to-top, looking for Pull Requests that they feel qualified to review and possibly merge.

Hive committers can not +1/Approve their own Pull Requests, i.e. you are allowed to commit/merge your own changes only if the Pull Request first receives a +1 vote from **another committer**. In the past this rule has typically been ignored when making small changes to the website (e.g. adding a new committer to the credits page), but you should follow the standard process for anything else.

## Reject

Pull Requests should be rejected which do not adhere to the guidelines in [HowToContribute]({{< ref "howtocontribute_27362107" >}}). Committers should always be polite to contributors and try to instruct and encourage them to contribute better Pull Requests. If a committer wishes to improve an unacceptable change, then he/she drop review comments and ask the contributor to update.

## PreCommit runs, and committing patches

1. Run Pre-Commit tests on a Pull Request before committing.
2. If the test run is clean (and there's a +1 from a committer), the Pull Request can be merged/committed.
3. Test runs may not be clean due to issues in the PR itself, or due to flaky tests. These issues must be fixed and **PR should not be committed until the run is clean.**

If a commit introduces new test failures, the preferred process is to revert the patch, rather than opening a new JIRA to fix the new failures.

## Commit

When you commit/merge a Pull Request, please:

1. Ensure that the Pull Request has a +1 vote, and that **24 hours have elapsed since the first +1 vote was cast** on the Pull Request. Note that this rule appears in the Hive Bylaws. Do not ignore it.
2. Include the Jira issue id in the commit message, along with a short description of the change. Be sure to get the issue id right, in order to have proper links between Jira and GitHub.
3. Append the Pull Request id, in the commit subject to track the relation between the commit and the respective Pull Request.
4. Add `Co-authored-by: Ayush Saxena <ayushsaxena@apache.org>` in the body of the message if multiple people contributed to the Pull Request.
5. Resolve the JIRA issue as fixed, and **set the "Fix Version"** to the release in which the change will appear. If a patch is backported to a point release (such as 1.0.2) then multiple fix versions should be set so that the automated release notes can list the Jira issue for the point release as well as the primary release.
6. Thank the contributor(s), the reviewers, and the reporter of the issue (if different from the contributor). It is easier to thank the people in GitHub by mentioning their GitHub ids under the respective Pull Request.

Below you can find a sample commit message that adheres to the guidelines outlined here.
```
HIVE-27424: Display dependency:tree in GitHub actions (#5756)
```

#### Committing Documentation

Hive's official documentation is hosted at [Github-Hive-Site](https://github.com/apache/hive). To commit major documentation changes you must raise a Pull Request to the hive-site repo.

Changes committed to the hive site repo will automatically get published on: <https://hive.apache.org/>

## Backporting commits to previous branches

If a patch needs to be backported to previous branches, follow these steps.

1. Raise a Pull Request directed toward the target branch with the actual Jira Id/message & commit id.
2. If the build is green, the PR can be merged to the desired branch

## Dialog

Committers/Contributors can hang out in the #hive channel in Apache Slack workspace for real-time discussions. However any substantive discussion (as with any off-list project-related discussion) should be re-iterated in Jira or on the developer list.

Note: Committers or individuals with Apache Id can directly join the #hive slack channel on Apache Workspace, any other individual if interested should drop a mail to hive dev mailing list with his email id and any existing member of the #hive apache channel should be able to send him the invite to join the group.

Instructions to add folks to ASF hive channel: <https://infra.apache.org/slack.html>

 

 

