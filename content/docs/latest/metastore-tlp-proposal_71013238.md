---

title: "Apache Hive : Metastore TLP Proposal"
date: 2024-12-12
----------------

# Apache Hive : Metastore TLP Proposal

## Summary of the Proposal from the Email

Hive’s metastore has long been used by other projects in the Hadoop ecosystem to store and access metadata.  Apache Impala, Apache Spark, Apache Drill, Presto, and other systems all use Hive’s metastore.  Some, like Impala and Presto, can use it as their own metadata system with the rest of Hive not present.

This sharing is excellent for the ecosystem.  Together with HDFS it allows users to use the tool of their choice while still accessing the same shared data.  But having this shared metadata inside the Hive project limits the ability of other projects to contribute to the metastore.  It also makes it harder for new systems that have similar but not identical metadata requirements (for example, stream processing systems on top of Apache Kafka) to use Hive’s metastore.  This difficulty for other systems comes out in two ways.  One, it is hard for non-Hive community members to participate in the project.  Second, it adds operational cost since users are forced to deploy all of the Hive jars just to get the metastore to work.

Therefore we propose to split Hive’s metastore out into a separate Apache project.  This new project will continue to support the same Thrift API as the current metastore.  It will continue to focus on being a high performance, fault tolerant, large scale, operational metastore for SQL engines and other systems that want to store schema information about their data.  

By making it a separate project we will enable other projects to join us in innovating on the metastore.  It will simplify operations for non-Hive users that want to use the metastore as they will no longer need to install Hive just to get the metastore.  And it will attract new projects that might otherwise feel the need to solve their metadata problems on their own.

Any Hive PMC member or committer will be welcome to join the new project at the same level.  We propose this project go straight to a top level project.  Given that the initial PMC will be formed from experienced Hive PMC members we do not believe incubation will be necessary.  (Note that the Apache board will need to approve this.)

## More Details

### Use Cases

As noted above, the metastore will continue to focus on being a metadata system for SQL systems like Hive and Impala.  This system should also be able to store metadata for streaming systems such as data stored in Kafka.  Additionally it should easily allow use by machine learning systems and others that need to access the data stored in SQL engines, streams, etc.

A use case that we are not initially targeting is the larger area of a full data catalog, storing information such as lineage, user tags, etc. with support for end user discoverability and interaction.

Supporting these uses cases will drive requirements such as:

1. The ability to support various big data engines and frameworks, including relational, batch, and streaming
2. The ability to scale to support a system with petabytes of data and thousands of users and their jobs
3. High reliability and/or fault tolerance
4. The ability to support multiple co-located systems (e.g. multiple Hive instances in one cloud or Impala and a streaming system in the same on-premise facility)
5. Low response time (< 200ms) to support interactive and high throughput systems
6. Support for transactional SQL systems
7. Support for versioned schemas
8. Ability to work on premise and in the cloud
9. Maintaining backwards compatibility (including specifying public versus private APIs).  This will be very important as the metastore already has a significant user community.

### Details of Moving the Code

Moving the code from Hive into a new project is not straightforward and will take some time.  The following steps are proposed:

1. A new TLP is established.  As mentioned above, any existing Hive PMC members will be welcome to join the PMC, and any existing Hive committers will be granted committership in the new project.
2. Hive begins the process of detangling the metastore code inside the Hive project.  This will be done inside Hive to avoid a time where the code is in both Hive and the new project that would require double patching of any new features or bugs.  
   In order to enable the new project to begin adding layers around the core metastore and make releases, Hive can make source-only releases of only the metastore code during this interim period, similar to how the storage-api is released now.  The new project can then depend on those releases.
3. Once the detangling is complete and Hive is satisfied that the result works, the code will be moved from Hive to the new project.

There are many technical questions of how to separate out the code.  These mainly center around which pieces of code should be moved into the new project, and whether the new project continues to depend on Hive’s storage-api (as ORC does today) or whether it copies any code that both it and Hive require (such as parts of the shim layer) in order to avoid any Hive dependencies.  Also there are places where metastore "calls back" into QL via reflection (e.g. partition expression evaluation).  We will need to determine how to continue this without pulling a dependency on all of Hive into the new project.  Discussions and decisions on this will happen throughout the process via the normal methods.

### Backwards Compatibility

There are already many users of Hive metastore outside of Hive.  We do not want to break backwards compatibility for those users.  Our goal will be to make sure there is a binary compatible metastore client available for these users that will support interoperation across versions of the metastore in Hive and as a stand alone system.  Another possible approach is to assure that the Thrift interface continues to accept old clients (e.g. Hive 1.x and 2.x), rather than focusing on binary or source compatibility of the Hive client itself.## Project Name

The following have been suggested as a name for this project:

* Flora
* Honeycomb
* Metastore (NOTE:  there are concerns that this would be too generic for Apache to defend the trademark and that it would not be clear enough to users that this was no longer just the Hive metastore)
* Omegastore
* Riven
* ZCatalog

 

