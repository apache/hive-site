---

title: "Apache Hive : Hive 1.2 Release Status"
date: 2024-12-12
----------------

# Apache Hive : Hive 1.2 Release Status

# Intended Release Timeline

|             Status              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Timeline item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Past (tracking 1.2.0)           | **00:01, Saturday, 25th Apr 2015 PDT** : Deadline for call for patches for general purpose feature inclusion.(must have patch-available already to request for feature inclusion after this)**00:15, Saturday, 25th Apr 2015 PDT** : Branch creation for branch-1.2.**12:01, Monday 27th Apr 2015 PDT** : Work begins on rolling out RC0 - the purpose of RC0 will be to test out that we're able to go through the process of making a release candidate, and will likely not include all the bugfixes planned for this release.**00:01, Tuesday, 28th Apr 2015 PDT** : Deadline for call for patches for feature inclusion if the features are near end-of-development. (only bugfixes allowed after this). Non-bugfix JIRAs that have already been requested for inclusion before this time, that have not yet been resolved will not be affected, we will still treat them as blockers for the eventual release.**12:01, Wednesday, 29th Apr 2015 PDT** : Current tracking time for community availability of RC0.**13:37, Wednesday, 29th Apr 2015 PDT** : RC0 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC0/artifacts/>****00**:01, Friday, 1st May 2015 PDT****** : Deadline for call for patches for inclusion for bugfixes that have a workaround (only product outages, regressions and trivial patches allowed after this)**18:06, Thursday, 7th May 2015 PDT** : RC1 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC1/artifacts/>**10:15, Monday, 11th May 2015 PDT** : RC2 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC2/artifacts/>**19:08, Monday, 11th May 2015 PDT** : RC3 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC3/artifacts/>**11:50, Wednesday, 13th May 2015 PDT** : RC4 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC4/artifacts/>**18:22, Thursday, 14th May 2015 PDT** : RC5 made available : <http://people.apache.org/~khorgath/releases/1.2.0_RC5/artifacts/>**14:22, Friday, 15th May 2015 PDT :** Vote passes, RC5 being published as Hive 1.2.0**14:22, Friday, 15th May 2015 PDT :** branch-1.2 open for commits again, pursuant to rules below.**14:25, Monday, 18th May 2015 PDT** : 1.2.0 general availability announcement. |
| Past (tracking 1.2.1)           | **Monday, 15th June 2015** : Mail sent out proposing beginning 1.2.1 RC0 in two days, asking people to get their outstanding patches in.**00:01, Thursday, 18th June 2015 PDT :** RC0 process begins.**02:44, Friday, 19th June 2015 PDT :** RC0 made available : <http://people.apache.org/~khorgath/releases/1.2.1_RC0/artifacts/>**11:45, Tuesday, 23rd June 2015 PDT** : Vote passes, RC0 being published as Hive 1.2.1**18:30, Sunday, 28th June 2015 PDT** : 1.2.1 general availability announcement.branch-1.2 now tracks 1.2.2, only outages/data corruption/security fixes allowed henceforth.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Current(tracking 1.2.2 release) | **16:30, Tuesday, 2nd May 2016 PDT** : Mail sent out proposing beginning 1.2.2 release process, asking people to get their outstanding patches in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Future                          | **12:01, Monday, 16th June 2016 PDT :** proposed timeline for cutting 1.2.2 RC0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

# Rules for inclusion into branch-1.2 targeting 1.2.2

Now that 1.2.1 has been released, branch-1.2 now tracks an eventual 1.2.2 release. To commit any patch to branch-1.2 now, the following rules apply:

 

1. The commit must not introduce any schema or interface changes.
2. The commit must fix a bug that causes an outage/breakage (such as an NPE) in regular hive operation, or it must fix a data corruption issue or it must be a security fix with an appropriate CVE.

 

All commits that do not meet these criteria should be directed towards branch-1 (for an eventual 1.3 release). The goal of an eventual 1.2.2 update to branch-1.2 is merely to ensure that there is a stable maintenance line to use, and should not be used to simply add additional features to previously released lines.

 

 

# Committed JIRAS in branch-1.2 for potential 1.2.2

 

|   Category    |    JIRA    | Current Status in branch-1.2 | Committerrequesting inclusion |
|---------------|------------|------------------------------|-------------------------------|
| HS2/metastore | HIVE-11224 | committed                    | thejas                        |
|               |            |                              |                               |

# [Committed JIRAS in branch-1.2 for 1.2.1]({{< ref "committed-jiras-for-1-2-1_58851880" >}})

(split out into a separate wikipage to speed up loading this page)

# List of JIRAS deferred out of 1.2

The following are jiras originally intended for branch-1.2, but at this time, should not be committed to branch-1.2, and should only go to master(1.3). These jiras were moved out of the above backlog list into this after a discussion between the RM and the committer asking for inclusion.

 

| Category | JIRA | Current Status in branch-1.2 | Committerrequesting inclusion |
|----------|------|------------------------------|-------------------------------|
| HS2      |

[HIVE-6679](https://issues.apache.org/jira/browse/HIVE-6679?src=confmacro)
-
HiveServer2 should support configurable the server side socket timeout and keepalive for various transports types where applicable
Patch Available
| Deferred to 1.3, needs more testing | vgumashta |
| Metastore upgrade |
[HIVE-7018](https://issues.apache.org/jira/browse/HIVE-7018?src=confmacro)
-
Table and Partition tables have column LINK\_TARGET\_ID in Mysql scripts but not others
Closed
| Deferred to 1.3, has schema changes | hsubramaniyan |
| Security |
[HIVE-9736](https://issues.apache.org/jira/browse/HIVE-9736?src=confmacro)
-
StorageBasedAuthProvider should batch namenode-calls where possible.
Patch Available
| Deferred to 1.3, needs additional test fixes | mithun |
| Metastore |
[HIVE-10895](https://issues.apache.org/jira/browse/HIVE-10895?src=confmacro)
-
ObjectStore does not close Query objects in some calls, causing a potential leak in some metastore db resources
Closed
| Deferred to 1.3, needs updates | vgumashta |
| Webhcat |
[HIVE-11008](https://issues.apache.org/jira/browse/HIVE-11008?src=confmacro)
-
webhcat GET /jobs retries on getting job details from history server is too agressive
Open
| Deferred to 1.3, still being discussed | thejas |
| Authorization |
[HIVE-10250](https://issues.apache.org/jira/browse/HIVE-10250?src=confmacro)
-
Optimize AuthorizationPreEventListener to reuse TableWrapper objects
Open
| Deferred to 1.3, needs additional test fixes | mithun |
| ORC |
[HIVE-10556](https://issues.apache.org/jira/browse/HIVE-10556?src=confmacro)
-
ORC PPD schema on read related changes
Open
| Deferred to 1.3, still open | gopalv |
| orc |
[ORC-12](https://issues.apache.org/jira/browse/HIVE-9451?src=confmacro)
-
Add max size of column dictionaries to ORC metadata
Open
| Deferred to 1.3, needs additional updates | omalley |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

 

 

# [Committed JIRAS in branch-1.2 for 1.2.0]({{< ref "committed-jiras-for-branch-1-2-0_56068523" >}})

(split out into a separate wikipage to speed up loading this page)

 

## Comments:

|   |
|---|
|   |

It seems if you just paste the JIRA URL to the ticket, it will automatically display number, title and status

Posted by ekoifman at Apr 24, 2015 20:51
|
|
Very useful, Eugene!

Posted by khorgath@gmail.com at Apr 24, 2015 20:54
|

