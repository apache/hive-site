---

title: "Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100808"
date: 2024-12-12
----------------

# Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100808

August 8th, 2010

* Yongqiang He gave a presentation about his work on index support in Hive.
  + Slides are available here: <http://files.meetup.com/1658206/Hive%20Index.pptx>
* John Sichi talked about his work on filter-pushdown optimizations. This is applicable to the HBase storage handler and the new index infrastructure.
* Pradeep Kamath gave an update on progress with Howl.
  + The Howl source code is available on GitHub here: <http://github.com/yahoo/howl>
  + Starting to work on security for Howl. For the first iteration the plan is to base it on DFS permissions.
* General agreement that we should aim to desupport pre-0.20.0 versions of Hadoop in Hive 0.7.0. This will allow us to remove the shim layer and will make it easier to transition to the new mapreduce APIs. But we also want to get a better idea of how many users are stuck on pre-0.20 versions of Hadoop.
* Remove Thrift generated code from repository.
  + Pro: reduce noise in diffs during reviews.
  + Con: requires developers to install Thrift compiler.
* Discussed moving the documentation from the wiki to version control.
  + Probably not practical to maintain the trunk version of the docs on the wiki and roll over to version control at release time, so trunk version of docs will be maintained in vcs.
  + It was agreed that feature patches should include updates to the docs, but it is also acceptable to file a doc ticket if there is time pressure to commit.j
  + Will maintain an errata page on the wiki for collecting updates/corrections from users. These notes will be rolled into the documentation in vcs on a monthly basis.
* The next meeting will be held in September at Cloudera's office in Palo Alto.

