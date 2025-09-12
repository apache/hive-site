---
title: "Apache Hive : HCatalog InstallHCat"
date: 2024-12-12
---

# Apache Hive : HCatalog Installation from Tarball

{{< toc >}}

## HCatalog Installed with Hive

Version

HCatalog is installed with Hive, starting with Hive release 0.11.0.  
 Hive installation is documented [here]({{< ref "adminmanual-installation" >}}).

## HCatalog Command Line

If you install Hive from the binary tarball, the `hcat` command is available in the `hcatalog/bin` directory.

The `hcat` command line is similar to the `hive` command line; the main difference is that it restricts the queries that can be run to metadata-only operations such as DDL and DML queries used to read metadata (for example, "show tables").

The HCatalog CLI is documented [here]({{< ref "hcatalog-cli" >}}) and the Hive CLI is documented [here]({{< ref "languagemanual-cli" >}}).

Most `hcat` commands can be issued as `hive` commands except for "`hcat -g`" and "`hcat -p`". Note that the `hcat` command uses the `-p` flag for permissions but `hive` uses it to specify a port number.

## HCatalog Client Jars

In the Hive tar.gz, HCatalog libraries are available under hcatalog/share/hcatalog/.

## HCatalog Server

HCatalog server is the same as Hive metastore. You can just follow the [Hive metastore documentation]({{< ref "adminmanual-metastore-administration" >}}) for setting it up.

 

**Navigation Links**
Previous: [Using HCatalog]({{< ref "hcatalog-usinghcat" >}})  
 Next: [HCatalog Configuration Properties]({{< ref "hcatalog-configuration-properties" >}})

Hive installation and configuration: [Installing Hive]({{< ref "adminmanual-installation" >}}), [Configuring Hive]({{< ref "adminmanual-configuration" >}}), [Hive Configuration Properties](https://hive.apache.org/docs/latest/user/configuration-properties)  
 WebHCat installation and configuration: [WebHCat Installation]({{< ref "webhcat-installwebhcat" >}}), [WebHCat Configuration]({{< ref "webhcat-configure" >}})



 

 

