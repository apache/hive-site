---

title: "Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100913"
date: 2024-12-12
----------------

# Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100913

Meeting date: Sept 13, 2010

Location: Cloudera Palo Alto office

Attendees: <http://www.meetup.com/Hive-Contributors-Group/calendar/14689507/>

Carl Steinbach gave a status update on the 0.6 release. Since plans for documentation migration have been deferred to the next release, the only remaining issues are completion of the CREATE DATABASE feature ([HIVE-675](https://issues.apache.org/jira/browse/HIVE-675)), metastore VARCHAR precision widening ([HIVE-1364](https://issues.apache.org/jira/browse/HIVE-1364)), and metastore upgrade scripts ([HIVE-1427](https://issues.apache.org/jira/browse/HIVE-1427)). [HIVE-675](https://issues.apache.org/jira/browse/HIVE-675) has already been committed to trunk and the backport for 0.6 is underway. Carl is still working on companion feature [HIVE-1517](https://issues.apache.org/jira/browse/HIVE-1517), but unless it is done by Sept 17, we'll drop it from the 0.6 release. Once a build containing the remaining features passes all unit tests, we'll post a release candidate and vote on it (no additional acceptance testing is planned for this release).

Next, [HIVE-1546](https://issues.apache.org/jira/browse/HIVE-1546) (making semantic analysis pluggable) was discussed. The Howl team gave an overview of their use case for reusing Hive DDL processing within Howl's CLI, together with a description of the roadmap for Howl/Hive project relationship. Carl raised concerns about potential dependency creep preventing future Hive refactoring, and Namit Jain proposed reworking the approach to restrict it to pre/post-analysis hooks (limiting the dependencies exposed) rather than full-blown analyzer pluggability+subclassing. It was agreed that the hooks approach was the best course for balancing all of the concerns and allowing us to achieve the desired project collaboration benefits. The Howl team also committed to getting their Howl checkins going into a public repository as soon as possible, together with setting up continuous integration to track the health of the combination of Hive+Howl trunks.

Next, [HIVE-1609](https://issues.apache.org/jira/browse/HIVE-1609) (partition filtering metastore API) was briefly discussed, and it was agreed that the Howl team would move the predicate parser from JavaCC to ANTLR and resubmit the patch.

Finally, [HIVE-1476](https://issues.apache.org/jira/browse/HIVE-1476) (metastore creating files as service user) was discussed. It was agreed that the approach in the proposed patch (performing HDFS operations on the metastore client side) was a stopgap that we don't really want to include in Hive. Instead, the correct long-term solution being developed by Todd Lipcon is to upgrade the Thrift version used by Hive to a recent one containing his SASL support, and then add impersonation support to the metastore server. Since the Howl team's schedule does not allow them to wait for that work to complete and get tested, they will keep the [HIVE-1476](https://issues.apache.org/jira/browse/HIVE-1476) patch privately applied within their own branch of Hive; it will not be committed on Hive trunk. Once they are able to move over to the long-term solution, the stopgap can be discarded. (In the meantime, we need to work together to minimize the merge-to-branch impact as the metastore code continues to change on trunk.)

The October meetup will be at Facebook HQ in Palo Alto.

