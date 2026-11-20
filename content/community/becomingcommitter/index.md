---
title: "Apache Hive : Becoming A Committer"
date: 2024-12-12
---

# Apache Hive : Becoming A Committer

The Apache Software Foundation defines [generic guidelines for what it means to be a committer](https://community.apache.org/contributors/becomingacommitter.html). However, it leaves the question of whether a particular contributor is ready to become a committer on a project up to the judgement of that project's PMC. This page attempts to explain what that means for the Apache Hive project.

## Committer Responsibilities

An Apache Hive committer has write access to Hive-related repositories and is eligible to join the security mailing list. These privileges come with the following responsibilities:

- review and merge meaningful contributions
- acknowledge security reports and help resolve the reported issues
- take initiative to move the Apache Hive project forward

## Committer Zen

Contributors often ask Apache Hive PMC members the question, "What do I need to do in order to become a committer?" The simple (though frustrating) answer to this question is, "If you want to become a committer, behave like a committer." If you follow this advice, then rest assured that the PMC will notice, and committership will seek you out rather than the other way around. So besides continuing to contribute high-quality code and tests, there are many other things that you should naturally be undertaking as part of getting deeper into the project's life:

* help out users and other developers on the [mailing lists](/community/mailinglists/) and in [JIRA](https://issues.apache.org/jira/projects/HIVE/)
* review and test the patches submitted by others; this can help to offload the burden on existing committers, who will definitely appreciate your efforts
* participate in discussions about releases, roadmaps, architecture, and long-term plans
* help improve the website
* participate in (or even initiate) real-world events such as user/developer meetups, papers/talks at conferences, etc
* write blog posts that share practical experience, introduce Apache Hive features, or help users get more out of Apache Hive
* improve project infrastructure in order to increase the efficiency of committers and other contributors
* help raise the project's quality bar (e.g. by setting up code coverage analysis)
* test release candidates and cast a non-binding vote
* as much as possible, keep your activity sustained rather than sporadic

Of course, before becoming a committer, there are certain things you can't actually do (e.g. commit a patch to source control; cast a binding vote), but the more you participate in the activities which surround these actions, the more ready you will be to eventually carry them out yourself.

## Quantitative and Qualitative Evidence

The Apache Hive PMC periodically reviews quantitative evidence, such as the number of contributions and reviews made by each contributor. We believe these metrics help identify potential committers who have demonstrated sustained engagement and are likely to remain active after becoming committers.

However, any specific number is not a conclusive metric in the Apache Hive project. This section introduces some examples to demonstrate committership qualitatively.

### Lead a well-sized initiative

Completing a substantial project is as valuable as accumulating small contributions. Apache Hive has evolved alongside the big data ecosystem through major architectural changes such as adopting the Apache Tez execution engine, adding support for object storage and open table formats, and introducing Kubernetes support. The entire ecosystem is still changing rapidly, and our journey has not ended. The Apache Hive PMC is therefore looking for contributors who can drive Apache Hive’s continued evolution.

Committers are expected to help guide Apache Hive in the right direction as technological paradigms shift. Taking ownership of a specific epic is a great opportunity to demonstrate the ability to learn a subsystem deeply, leadership to make a consensus in the community, and determination to get things done.

### Be a Reliable Reviewer

As the Apache Hive project adopts the RTC (Review then Commit) approach, any initiative would not move forward without approval from committers. So, the Apache Hive PMC highly values code review contributions as a key indicator of readiness to become a committer.

This does not mean contributors should simply maximize the number of code reviews. Once you become a committer, you will need to review and merge pull requests. Rubber-stamp approvals and merges would introduce chaos and security problems to the Apache Hive project and its users. Your -1 would raise the bar for approval under [our bylaws](/community/bylaws/#actions). Therefore, the Apache Hive PMC expects candidates to demonstrate committer-level judgment through constructive feedback and well-reasoned +1 and -1 votes.

## Process

The Apache Hive PMC invites someone as a committer via nomination, discussion, and then [lazy consensus](/community/bylaws/#approvals).

## Visualize

The graph below shows monthly patch authorship and commit activity for an actual Apache Hive committer. The blue shows all commits going into Apache Hive from all committers. The orange shows patches authored by this committer, whereas the green shows patches reviewed and committed by him after they were authored by others. (Not shown are reviews he participated in before becoming a committer.)

{{< figure src="commitactivity.png" alt="Commit activity for X from 2008 to 2011" >}}

Important points to notice:

* it took a while for him to become a committer: we'd like to make sure that all committers are truly dedicated to the role
* after becoming a committer, he began fulfilling the role by actively reviewing and committing many patches from others (even more than those he continued to author himself!), and sustained that energy over time
* we're using a narrow quantitative measure here (patch count) purely for the purpose of visualizing activity level over time; what we're really interested in are quality and value brought to the project across a wide range of activities (for example, the committer in this case also volunteered to serve as release manager for multiple releases of Apache Hive, starting even before becoming a committer)

## The Dark Side

It should go without saying, but here it is anyway: your participation in the project should be a natural part of your work with Apache Hive; if you find yourself undertaking tasks "so that you can become a committer", then you're doing it wrong, young padawan. This is particularly true if your motivations for wanting to become a committer are primarily negative or self-centered, e.g.

* you desire the power of a -1 vote (these should be used only extremely rarely in a healthy project)
* you want to push your own changes through unreviewed (Apache Hive follows a review-before-commit policy where even committers need to wait for a +1 from another committer)
* you only want to commit changes from other contributors within a particular affiliation group (e.g. coworkers in the same corporation); the committer role is about furthering a diverse project, not a narrow agenda

## Growing Together

The Apache Hive PMC is looking for people who can help build a better future for Apache Hive, and we hope the project will be a place where they can grow.
