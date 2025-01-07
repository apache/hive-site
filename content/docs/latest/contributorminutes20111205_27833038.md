---

title: "Apache Hive : ContributorMinutes20111205"
date: 2024-12-12
----------------

# Apache Hive : ContributorMinutes20111205

Notes from the Hive Meetup at Facebook, 12/5/11

Attendees: <http://www.meetup.com/Hive-Contributors-Group/events/41150912/>

John gave a demo of the Phabricator instance at <http://reviews.facebook.net>, and proposed that we push through moving all code review over from Review Board to Phabricator (<https://cwiki.apache.org/confluence/display/Hive/PhabricatorCodeReview>). There were no objections.

Marek gave an overview of the new parallel test framework (<https://issues.apache.org/jira/browse/HIVE-1487>); he'll publish a wiki page explaining how to use it once it gets committed.

Carl gave an update on the 0.8 release; delays have been due to difficulties with the metastore upgrade scripts, which should now be all sorted out. Carl proposed cutting a new branch from trunk and releasing that as 0.8, with rationale (a) some backports to the old branch are difficult; (b) trunk is stable; (c) trunk contains lots of new high-value work such as the BINARY datatype. There were no objections.

Carl also proposed that in the future, developers delivering metastore changes should also be responsible for supplying metastore upgrade scripts for all supported DBMS's (currently MySQL and Derby).

A patch has been committed to make Hive build and run against Hadoop 0.23, and Carl has set up a Jenkins instance for continuous integration. Some tests are still failing, and it is uncertain whether a Hive binary built against 0.20.x will run against Hadoop 0.23. Once tests are all fixed, we'll start requiring committers to keep them working (e.g. if something gets committed which passes tests on 0.20.x, but breaks 0.23, the committer needs to either submit a timely followup to address the breakage, or else back out the original change). There was some discussion about doing the same for Hadoop 0.20.20x, but no resolution.

Ashutosh asked about a registry of available Hive storage handlers, and John referenced the Introduction section in <https://cwiki.apache.org/confluence/display/Hive/StorageHandlers>.

Code walkthroughs were carried out for HIVE-2616 and HIVE-2589.

