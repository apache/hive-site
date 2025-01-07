---

title: "Apache Hive : Hive Aws EMR"
date: 2024-12-12
----------------

# Apache Hive : Hive Aws EMR

# Amazon Elastic MapReduce and Hive

Amazon Elastic MapReduce is a web service that makes it easy to launch managed, resizable Hadoop clusters on the web-scale infrastructure of Amazon Web Services (AWS). Elastic Map Reduce makes it easy for you to launch a Hive and Hadoop cluster, provides you with flexibility to choose different cluster sizes, and allows you to tear them down automatically when processing has completed. You pay only for the resources that you use with no minimums or long-term commitments.

Amazon Elastic MapReduce simplifies the use of Hive clusters by:

1. Handling the provisioning of Hadoop clusters of up to thousands of EC2 instances
2. Installing Hadoop across the master and slave nodes of your cluster and configuring Hadoop based on your chosen hardware
3. Installing Hive on the master node of your cluster and configuring it for communication with the Hadoop JobTracker and NameNode
4. Providing a simple API, a web UI, and purpose-built tools for managing, monitoring, and debugging Hadoop tasks throughout the life of the cluster
5. Providing deep integration, and optimized performance, with AWS services such as S3 and EC2 and AWS features such as Spot Instances, Elastic IPs, and Identity and Access Management (IAM)

Please refer to the following link to view the Amazon Elastic MapReduce Getting Started Guide:

[Getting Started](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-hive.html)

Amazon Elastic MapReduce provides you with multiple clients to run your Hive cluster. You can launch a Hive cluster using the AWS Management Console, the Amazon Elastic MapReduce Ruby Client, or the AWS Java SDK. You may also install and run multiple versions of Hive on the same cluster, allowing you to benchmark a newer Hive version alongside your previous version. You can also install a newer Hive version directly onto an existing Hive cluster.

# Supported versions:

| EMR Version | Hive Version |
| emr-7.0.0 | 3.1.3 |
| emr-6.15.0 | 3.1.3 |
| emr-5.36.1 | 2.3.9 |

# Hive Defaults

## Thrift Communication port

| Hive Version | Thrift port |
| 0.4 | 10000 |
| 0.5 | 10000 |
| 0.7 | 10001 |
| 0.7.1 | 10002 |

## Log File

| Hive Version | Log location |
| 0.4 | /mnt/var/log/apps/hive.log |
| 0.5 | /mnt/var/log/apps/hive\_05.log |
| 0.7 | /mnt/var/log/apps/hive\_07.log |
| 0.7.1 | /mnt/var/log/apps/hive\_07\_1.log |

# MetaStore

By default, Amazon Elastic MapReduce uses MySQL, preinstalled on the Master Node, for its Hive metastore. Alternatively, you can use the Amazon Relational Database Service (Amazon RDS) to ensure the metastore is persisted beyond the life of your cluster. This also allows you to share the metastore between multiple Hive clusters. Simply override the default location of the MySQL database to the external persistent storage location.

# Hive CLI

EMR configures the master node to allow SSH access. You can log onto the master node and execute Hive commands using the Hive CLI. If you have multiple versions of Hive installed on the cluster you can access each one of them via a separate command:

| Hive Version | Hive command |
| 0.4 | hive |
| 0.5 | hive-0.5 |
| 0.7 | hive-0.7 |
| 0.7.1 | hive-0.7.1 |

EMR sets up a separate Hive metastore and Hive warehouse for each installed Hive version on a given cluster. Hence, creating tables using one version does not interfere with the tables created using another version installed. Please note that if you point multiple Hive tables to same location, updates to one table become visible to other tables.

# Hive Server

EMR runs a Thrift Hive server on the master node of the Hive cluster. It can be accessed using any JDBC client (for example, squirrel SQL) via Hive JDBC drivers. The JDBC drivers for different Hive versions can be downloaded via the following links:

| Hive Version | Hive JDBC |
| 0.5 | <http://aws.amazon.com/developertools/0196055244487017> |
| 0.7 | <http://aws.amazon.com/developertools/1818074809286277> |
| 0.7.1 | <http://aws.amazon.com/developertools/8084613472207189> |

Here is the process to connect to the Hive Server using a JDBC driver:

<http://docs.amazonwebservices.com/ElasticMapReduce/latest/DeveloperGuide/UsingEMR_Hive.html#HiveJDBCDriver>

# Running Batch Queries

You can also submit queries from the command line client remotely. Please note that currently there is a limit of 256 steps on each cluster. If you have more than 256 steps to execute, it is recommended that you run the queries directly using the Hive CLI or submit queries via a JDBC driver.

# Hive S3 Tables

An Elastic MapReduce Hive cluster comes configured for communication with S3. You can create tables and point them to your S3 location and Hive and Hadoop will communicate with S3 automatically using your provided credentials.

Once you have moved data to an S3 bucket, you simply point your table to that location in S3 in order to read or process data via Hive. You can also create partitioned tables in S3. Hive on Elastic MapReduce provides support for dynamic partitioning in S3.

# Hive Logs

Hive application logs: All Hive application logs are redirected to /mnt/var/log/apps/ directory.

Hadoop daemon logs: Hadoop daemon logs are available in /mnt/var/log/hadoop/ folder.

Hadoop task attempt logs are available in /mnt/var/log/hadoop/userlogs/ folder on each slave node in the cluster.

# Tutorials

The following Hive tutorials are available for you to get started with Hive on Elastic MapReduce:

1. Finding trending topics using Google Books n-grams data and Apache Hive on Elastic MapReduce
   * <http://aws.amazon.com/articles/Elastic-MapReduce/5249664154115844>
2. Contextual Advertising using Apache Hive and Amazon Elastic MapReduce with High Performance Computing instances
   * <http://aws.amazon.com/articles/Elastic-MapReduce/2855>
3. Operating a Data Warehouse with Hive, Amazon Elastic MapReduce and Amazon SimpleDB
   * <http://aws.amazon.com/articles/Elastic-MapReduce/2854>
4. Running Hive on Amazon ElasticMap Reduce
   * <http://aws.amazon.com/articles/2857>

In addition, Amazon provides step-by-step video tutorials:

* <http://aws.amazon.com/articles/2862>

# Support

You can ask questions related to Hive on Elastic MapReduce on Elastic MapReduce forums at:

<https://forums.aws.amazon.com/forum.jspa?forumID=52>

Please also refer to the EMR developer guide for more information:

<http://docs.amazonwebservices.com/ElasticMapReduce/latest/DeveloperGuide/>

Contributed by: Vaibhav Aggarwal

