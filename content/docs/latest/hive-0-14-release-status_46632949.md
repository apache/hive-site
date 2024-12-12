---
title: "Apache Hive : Hive 0.14 release status"
date: 2024-12-12
---

# Apache Hive : Hive 0.14 release status

This page tracks the jiras requested for the release hive-0.14.

 

The query I am using for tracking:

 

project = Hive AND (affectedVersion = 0.14.0 OR fixVersion = 0.14.0) AND (priority = Critical OR priority = Blocker) AND (status = "Patch Available" OR status = "In Progress" OR status = Open OR status = "Documentation/Testcases Required" or status = "Documentation Required")
 

![](plugins/servlet/confluence/placeholder/unknown-macro)

 

I have removed the table that was used for tracking earlier. I have shared the query above that I am using to find jiras that need to be part of 0.14. I am also sharing below the instructions for getting jiras into 0.14 that I sent in an earlier email on the mailing list:

 

1. I am going to monitor all issues marked as blockers/criticals on a nightly basis. ~~The list on the wiki is going to go away once I triage it for things like exceptions, failures etc. and feature requests that were already accepted.~~  
  
2. If a developer feels that an issue marked as blocker is not really one, we can chat on the jira. Alternatively, please set the priority to blocker if you want a jira to be fixed in 0.14 so that I can check on it and decide the priority. If I think it is not a blocker, I will lower the priority after discussing on the jira.  
  
3. Jira is going to be a single source of truth.  
  
4. Once the blocker list goes to 0, I am going to create an RC.  
  
5. **Patches for blocker jiras are going to need to be double committed to both trunk and 0.14 by the one committing the jira.**

 

 

