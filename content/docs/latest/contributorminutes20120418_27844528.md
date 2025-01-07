---

title: "Apache Hive : ContributorMinutes20120418"
date: 2024-12-12
----------------

# Apache Hive : ContributorMinutes20120418

Notes from the Hive Contributors Meetup at Cloudera, 4/18/12

Attendees: <http://www.meetup.com/Hive-Contributors-Group/events/59148562/>

Ashutosh gave a status update on the Hive 0.9.0 release work. RC0 was put up for a vote last week, but it turned out there were several problems. Ashutosh is in the process of fixing those issues, and is also trying to get several other patches resolved and backported before cutting RC1.

Carl asked for more details about the impact of [HIVE-2795](https://issues.apache.org/jira/browse/HIVE-2795) on the upgrade process for 0.9.0. Kevin responded that they have decided to implement regions in a layer above Hive, and do not plan to use the features that were added in [HIVE-2612](https://issues.apache.org/jira/browse/HIVE-2612). Since these two features are the only things requiring a metastore upgrade for 0.9.0, it was proposed that we back them out. There were no objections.

Carl said that he is organizing the Hive BoF session at this year's Hadoop Summit. The meeting will take place on June 12th from 2-5pm. An official announcement will go up on the Hive Meetup group shortly. The current plan is to structure the event like last year: 4-6 fifteen minute long talks, followed by smaller breakout sessions. Please contact Carl if you're interested in giving a talk.

The discussion next turned to problems with Arc and Phabricator. Carl expressed concern that bugs have crept in over the past couple of months, and that it's no longer clear who is responsible for making sure Hive works with Arc/Phabricator. John pointed out that the issues which were raised on the dev mailing list last week have already been resolved. There was general consensus that when it works, Arc/Phabricator is an improvement on ReviewBoard. John proposed that we continue using Arc/Phabricator, and raise any problems with it on the dev maligning list. There were no objections.

Harish gave a short [presentation](https://github.com/hbutani/SQLWindowing/wiki/MoveToHive) on the [SQL Windowing library](https://github.com/hbutani/SQLWindowing) he wrote for Hive and how it might be integrated into Hive. Everyone agreed that adding this functionality to Hive makes sense. Several people suggested adding the toolkit to the contrib module as-is and using it to generate interest with users, but concerns were raised that this might be painful to support/deprecate in the future. The discussion ended with general agreement that we should start work now to incrementally push this capability into Hive's query compiler.

Carl explained the motivations and design decisions behind the HiveServer2 API proposal. The main motivations are supporting concurrency and providing a better foundation on which to build ODBC and JDBC drivers. Work on this project has started and is being tracked in [HIVE-2935](https://issues.apache.org/jira/browse/HIVE-2935).

Namit offered to host the next contrib meeting at Facebook.

