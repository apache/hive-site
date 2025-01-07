---

title: "Apache Hive : ContributorsMinutes110726"
date: 2024-12-12
----------------

# Apache Hive : ContributorsMinutes110726

Meeting date: July 26, 2011

Location: Cloudera (Palo Alto)

Attendees: <http://www.meetup.com/Hive-Contributors-Group/events/26345541/>

Carl proposed end of August as target for 0.8 release, with branch cut in a couple of weeks. Work is still underway for publishing release artifacts in Maven for 0.7.1 and 0.8 (development snapshots are already being published).

Ashutosh gave an update on HCatalog development status; no blocking issues from Hive for the 0.2 release; some ideas are being discussed for the 0.3 release which will need Hive work, but these aren't ready for design proposals yet.

Interns from Facebook gave an overview of some of the work they've been doing.

Sohan Jain: add new filtering support for metastore queries, and eliminate duplication of column descriptors across partitions. For the latter, a metastore schema change is needed which cannot be upgraded without a downtime. This is currently being tested out at Facebook; for a 30GB metastore, the downtime required is 10-15 minutes.

Franklin Hu: adding TIMESTAMP datatype (supports fractional seconds, but not timezones). There was some discussion about storing the internal representation in a canonical timezone such as GMT.

Syed Albiz: working on automatic usage of indexes for (a) bitmap indexes and (b) queries involving multiple tables; also error message improvements. Bitmap index performance test results to be added to the wiki later.

Charles Chen: working on improving view support (ALTER VIEW RENAME, CREATE OR REPLACE VIEW, CREATE table LIKE view). Will follow up with support for partitioned join views and simple updatable views.

