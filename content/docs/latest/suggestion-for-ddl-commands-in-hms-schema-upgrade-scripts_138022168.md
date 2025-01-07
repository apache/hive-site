---

title: "Apache Hive : Suggestion for DDL Commands in HMS schema upgrade scripts"
date: 2024-12-12
----------------

# Apache Hive : Suggestion for DDL Commands in HMS schema upgrade scripts

In this page, I would like to share the information I learned from Braintree's Blog about how they handle DB schema migration while application is up and serving requests. I think this should benefits to developer who is working on HMS's schema upgrade scripts.  As for some DDL commands, they can lock out updates to a table for a long time and database operation that locks for more than a few seconds is indistinguishable from an outage for customers. Discussion here will be focused one using PostgreSQL as HMS DB and the following are the links for those useful articles:

* Braintree: Safe Operations For High Volume PostgreSQL: <https://www.braintreepayments.com/blog/safe-operations-for-high-volume-postgresql/>
* PostgreSQL at Scale: Database Schema Changes Without Downtime: <https://medium.com/braintree-product-technology/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680>
* Understanding PostgreSQL locks: [http://shiroyasha.io/understanding-postgresql-locks.html#:~:targetText=ROW%20SHARE%20%E2%80%94%20Acquired%20by%20the,of%20the%20alter%20table%20commands](http://shiroyasha.io/understanding-postgresql-locks.html#:~:targetText=ROW%20SHARE%20%E2%80%94%20Acquired%20by%20the,of%20the%20alter%20table%20commands.)

