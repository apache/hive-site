---
title: "Apache Hive : HCatalog InstallHCat"
date: 2024-12-12
---

# Apache Hive : HCatalog InstallHCat

# Installation from Tarball

* [Installation from Tarball]({{< ref "#installation-from-tarball" >}})
	+ [HCatalog Installed with Hive]({{< ref "#hcatalog-installed-with-hive" >}})
	+ [HCatalog Command Line]({{< ref "#hcatalog-command-line" >}})
	+ [HCatalog Client Jars]({{< ref "#hcatalog-client-jars" >}})
	+ [HCatalog Server]({{< ref "#hcatalog-server" >}})

## HCatalog Installed with Hive

Version

HCatalog is installed with Hive, starting with Hive release 0.11.0.  
 Hive installation is documented [here]({{< ref "adminmanual-installation_27362077" >}}).

## HCatalog Command Line

If you install Hive from the binary tarball, the `hcat` command is available in the `hcatalog/bin` directory.

The `hcat` command line is similar to the `hive` command line; the main difference is that it restricts the queries that can be run to metadata-only operations such as DDL and DML queries used to read metadata (for example, "show tables").

The HCatalog CLI is documented [here]({{< ref "hcatalog-cli_34013932" >}}) and the Hive CLI is documented [here]({{< ref "languagemanual-cli_27362033" >}}).

Most `hcat` commands can be issued as `hive` commands except for "`hcat -g`" and "`hcat -p`". Note that the `hcat` command uses the `-p` flag for permissions but `hive` uses it to specify a port number.

## HCatalog Client Jars

In the Hive tar.gz, HCatalog libraries are available under hcatalog/share/hcatalog/.

## HCatalog Server

HCatalog server is the same as Hive metastore. You can just follow the [Hive metastore documentation]({{< ref "adminmanual-metastore-administration_27362076" >}}) for setting it up.

 

**Navigation Links**
Previous: [Using HCatalog]({{< ref "hcatalog-usinghcat_34013260" >}})  
 Next: [HCatalog Configuration Properties]({{< ref "hcatalog-configuration-properties_39622369" >}})

Hive installation and configuration: [Installing Hive]({{< ref "adminmanual-installation_27362077" >}}), [Configuring Hive]({{< ref "adminmanual-configuration_27362070" >}}), [Hive Configuration Properties](https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties)  
 WebHCat installation and configuration: [WebHCat Installation]({{< ref "webhcat-installwebhcat_34015585" >}}), [WebHCat Configuration]({{< ref "webhcat-configure_34015738" >}})

General: [HCatalog Manual]({{< ref "hcatalog_33299065" >}}) – [WebHCat Manual]({{< ref "webhcat_33299069" >}}) – [Hive Wiki Home]({{< ref "home_27362069" >}}) – [Hive Project Site](http://hive.apache.org/)

 

 

