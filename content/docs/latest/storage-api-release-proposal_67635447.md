---

title: "Apache Hive : Storage API Release Proposal"
date: 2024-12-12
----------------

# Apache Hive : Storage API Release Proposal

To enable faster and more direct integration of file formats like ORC and Parquet, Hive has separated out the Storage API as a distinct subproject and will release it independently of the rest of Hive. The storage-api source code will remain in the Hive git repository. The initial work on the pom files was done in HIVE-15419. The plan is to start the Storage API releases at 2.2.0, but number them independently of the Hive releases. I expect that Storage API will have more releases than Hive originally as we stabilize the subproject, but will eventually release less often than Hive.

Storage API will have its own release branches and tags. The branches will have names of the form "storage-branch-X.Y" and the tags will have names of the form "storage-release-X.Y.Z".

The master branch in the git repository will contain both snapshot versions for both Storage API and Hive and the Hive pom will build the Storage API automatically. Since this is pretty close to the current behavior, development on the master should be relatively unchanged.

Naturally, Hive releases can't refer to snapshot releases of Storage API and must use real releases. In the release branches of Hive, we'll change the Hive pom to refer to a specific release of Storage API and remove storage-api from the list of modules to be built.

During development of a fix for a Hive release branch that impacts both Storage API and Hive, the developer will

* Use "mvn clean install" in the storage-api directory to build and install the resulting jar into their m2 cache.
* Change the hive pom to refer to a snapshot version of Storage API.
* Build and test the rest of Hive normally

To commit the change, the developer will need to commit the Storage API change on the Storage API release branch and make a release candidate. Once the vote passes, they can commit the rest of their patch to Hive including changing the

 

