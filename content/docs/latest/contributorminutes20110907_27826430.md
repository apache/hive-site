---

title: "Apache Hive : ContributorMinutes20110907"
date: 2024-12-12
----------------

# Apache Hive : ContributorMinutes20110907

Notes from the Hive Meetup at Hortonworks, 9/7/11

Attendees: <http://www.meetup.com/Hive-Contributors-Group/events/30620561/>

The Binary type proposed by Ashutosh Chauhan, [HIVE-2380](https://issues.apache.org/jira/browse/HIVE-2380) was discussed. There was agreement that a design document is needed to explain the proposed changes for this feature. The design document should cover:

* Can columns of binary type be used as a key in group by or join?
* What native functions exist to manipulate binary types?
* How does casting between binary and other types work? Are there implicit casts? (There seemed to be general agreement that implicit casting for binary types was a bad idea.)
* How is binary data encoded when being passed as part of a TRANSFORM?
* A discussion of what uses the designer envisions for binary fields. This should clarify that this binary type is not a blob (stored out of row) and is not intended for very large objects.

Alan Gates, as an HCatalog developer, asked if the Hive community would be open to moving some authorization related checks into the Thrift metastore server instead of all being done in the client. John Sichi was of the opinion that not all authorization checks can be moved to the server because some need to be done in the client. But DDL ones, which is what HCatalog is interested in, should be movable. The next step is for the HCatalog team to produce a design document clarifying what this change would look like.

Carl Steinbach led a discussion on the release of Hive 0.8. The release branch was cut last week, and it should be possible to produce an initial release candidate next week. The following blockers remain:

* Publishing Maven artifacts for released versions of Hive
* Metastore upgrade scripts for changes from 0.7.x
* Issue with starting the Thrift metastore server when Hadoop is running in secure mode: [HIVE-2411](https://issues.apache.org/jira/browse/HIVE-2411)

As part of releasing 0.8, the Hive community should publish a proposed date for the next release.

A question was posted to the meetup page by Amareshwari. She wanted to know if anyone was planning on porting Hive to Hadoop 0.23, once that version was out. Alan said that Hortonworks would like to contribute to this, and is interested in collaborating with others on it.

Amareshwari posted a second question on moving Hive from the old mapred interface to MapReduce to the newer mapreduce. There was consensus amongst the committers present that it was better to stay on mapred for now since it was guaranteed to be stable even in 0.23, while mapreduce is evolving.

