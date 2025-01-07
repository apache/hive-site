---

title: "Apache Hive : Building Hive from Source"
date: 2024-12-12
----------------

# Apache Hive : Building Hive from Source

* **Fetching the source code**
  + Using the source tar: Download the source tar from [TODO: Put link post release] and untar
  + From Git tag: Checkout the release tag using git clone --branch rel/release-4.0.0 <https://github.com/apache/hive.git>
* **Building Distribution**
  + Run: mvn clean install -DskipTests -Pdist -Piceberg -Pitests
  + Find the built tar under packaging/target/apache-hive-*
* **Running Unit Tests**
  + Run: mvn clean install -Piceberg
* **Running Integration Tests**
  + GoTo itests directory
  + Run: mvn clean test -pl itest -Piceberg

