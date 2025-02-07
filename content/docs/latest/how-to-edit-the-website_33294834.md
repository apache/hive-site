---
title: "Apache Hive : How to edit the website"
date: 2024-12-12
---

# Apache Hive : How to edit the website

* [Process]({{< ref "#process" >}})
* [Posting generated content]({{< ref "#posting-generated-content" >}})
* [Style]({{< ref "#style" >}})

The [Hive website](http://hive.apache.org/) provides a central portal to all relevant websites and information about the Apache Hive project. Hive documentation is provided by this wiki, which you can edit by following the instructions found on the [AboutThisWiki]({{< ref "aboutthiswiki_27820116" >}}) page. To edit the Hive website, follow the instructions on this page, which are based on [Apache MRUnit's instructions](http://mrunit.apache.org/development/edit_website.html). The website uses the Apache CMS. More detailed documentation is available on the Apache Infrastructure pages including a quickstart guide on the [Apache bookmarklet](http://apache.org/dev/cms.html#usage) and a [reference manual](http://apache.org/dev/cmsref.html). It is also useful to look at [other Apache CMS sites](http://apache.org/dev/cmsadoption.html) for examples.

Website Changes Require Review

Apache Hive requires a review for changes to the website.

## Process

1. Commit a change to the website's source [Markdown](http://daringfireball.net/projects/markdown/syntax) files located in <https://svn.apache.org/repos/asf/hive/cms/trunk>. Before committing test that the site still builds locally by installing the [CMS build scripts](http://apache.org/dev/cmsref.html#local-build) and running:

```
buildsite/build_site.pl --source-base hive-site --target-base hive-website

```
If deleting a file or changing the name of a file make a trivial edit to lib/path.pm or lib/view.pm to force a full site rebuild. If making a simple edit it is easier to just use the Apache bookmarklet.
2. Wait a few minutes to get the email on the commits list that buildbot has rebuilt the [staging website](http://hive.staging.apache.org/).
3. If the change looks ok, commit the change to the production website by one of the following:

	* Using the Apache bookmarklet and selecting [Publish site](https://cms.apache.org/hive/publish)
	* curl -sL <http://s.apache.org/cms-cli> | perl on your local machine
	* ssh -t <user>@people.apache.org publish.pl mrunit <your Apache ID>

## Posting generated content

1. Add the path to content/extpaths.txt relative to the extpaths.txt file to prevent the content getting deleted when the staging site is published
2. Commit the generated content directly to the [production site svn](https://svn.apache.org/repos/infra/websites/production/hive)

## Style

* Try to limit line length to 80 columns, fold -s <filename> on Linux is helpful for limiting line length
* Use links in the [link name][] style rather than [link name][1] because it is more difficult to match up the numbers and removing links causes all the numbers to have to get updated
* Indent with spaces not tabs
* Use * for lists and indent lists by 2 spaces

Save

Save

Save

Save

Save

 

 

