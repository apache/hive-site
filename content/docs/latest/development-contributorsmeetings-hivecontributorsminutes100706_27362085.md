---
title: "Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100706"
date: 2024-12-12
---









# Apache Hive : Development ContributorsMeetings HiveContributorsMinutes100706






Attendees: Amr Awadallah, John Sichi, Paul Yang, Olga Natkovich, Ajay Kidave, Yongqiang He, Basab Malik, Vinithra Varadharajan, bc Wong, Arvind Prabhakar, Carl Steinbach


* bc Wong gave a live demo of Cloudera's Hue framework and the Beeswax Hive web interface.
	+ Slides from this talk are available here: <http://www.slideshare.net/cwsteinbach/cloudera-huebeeswax>
	+ Hue was recently released as open source. The code is available on Github here: <http://github.com/cloudera/hue>
* Olga Natkovich gave a whiteboard talk on HOwl.
	+ HOwl = Hive !MetaStore + Owl = shared metadata system between Pig, Hive, and Map Reduce
	+ HOwl will likely leverage the !MetaStore schema and ORM layer.
	+ A somewhat outdated Owl design document is available here: <http://wiki.apache.org/pig/owl>
* Carl gave an update on progress with the 0.6.0 release.
	+ There was a discussion about the plan to move the documentation off of the wiki and into version control.
	+ Several people voiced concerns that developers/users are less likely to update the documentation if doing so requires them to submit a patch.
	+ The new proposal for documentation reached at the meeting is as follows:
		- The trunk version of the documentation will be maintained on the wiki.
		- As part of the release process the documentation will be copied off of the wiki and converted to xdoc, and then checked into svn.
		- HTML documentation generated from the xdoc will be posted to the Hive webpage when the new release is posted.
	+ Carl is going to investigate the feasibility of writing a tool that converts documentation directly from !MoinMoin wiki markup to xdoc.
* John agreed to host the next contributors meeting at Facebook.



 

 

