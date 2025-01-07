---

title: "Apache Hive : Development ContributorsMeetings HiveContributorsMinutes101025"
date: 2024-12-12
----------------

# Apache Hive : Development ContributorsMeetings HiveContributorsMinutes101025

Meeting date: October 25, 2010

Location: Facebook Palo Alto

Attendees: <http://www.meetup.com/Hive-Contributors-Group/calendar/14875663> plus Paul, Ning, Yongqiang, Liyin, Basab

The [TLP](http://hive.apache.org) and [bylaws](https://cwiki.apache.org/HIVE/bylaws.html) votes passed, so Hive is now officially an Apache top level project! We are going ahead with moving the following resources:

* website (now at hive.apache.org)
* svn (new trunk location is <http://svn.apache.org/repos/asf/hive/trunk>); git will follow soon
* irc: we are making #hive the official channel on freenode.net (deprecating ##hive)
* review board: we will start using the new ASF facility soon
* wiki: we are going to move to <http://cwiki.apache.org/HIVE>, but we still need to work out the migration plan from MoinMoin

The 0.6 release vote passed, so we will wrap up the release and publish it!

Carl Steinbach proposed making 0.7.0 a time-based release (rather than a feature-based release), and that we should start on it soon since a lot of features have already buffered up on trunk since we branched 0.6.0. Ning mentioned some features for Microstrategy ODBC integration that we might want to try to get in. We have a lot of in-progress features such as indexing (currently being worked on by a team of students at Harvey Mudd College as well as some other contributors), so we'll need to mark some of those as experimental.

Yongqiang gave a presentation on Facebook's proposal for adding authorization support to Hive ([Powerpoint](http://files.meetup.com/1658206/Hive%20Security.pptx)). This took place in the context of a general discussion on how to make Hadoop-level permissions work with Hive-level permissions. We discussed three different approaches:

1. Disable Hadoop security and use Hive authorization only. This provides "advisory" authorization only; in other words, users are prevented from accidentally accessing information which they aren't supposed to see, but nothing prevents a malicious user from circumventing these protections.
2. Disable Hive authorization and use Hadoop security only (with Hive support for setting the permissions on new files). In this configuration, Hadoop jobs run with the privileges of the invoking user. This is the mode being developed by the Howl team. It is fundamentally incompatible with Hive-enforced features such as column-level authorization and view-level authorization.
3. Enable Hadoop security and run Hive in server mode only (with authorization enabled), with all Hive files owned by a system user. In this configuration, Hadoop jobs run with the privileges of a system user. This matches the traditional DBMS model where the DBMS owns its files, and anything else requires import/export into user-owned directories. This mode may be incompatible with some existing Hive usages (e.g. pointing EXTERNAL tables at system-owned files).

It was generally agreed that #3 is the ideal configuration, but we'll be dealing with configurations #1 and #2 for some time while waiting for various pieces to fall into place.

Shyam mentioned some ongoing work on real-time Hadoop that might be an interesting project for Hive collaboration.

Next meeting will be at Cloudera.

