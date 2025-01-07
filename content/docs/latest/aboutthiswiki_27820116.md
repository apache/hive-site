---

title: "Apache Hive : AboutThisWiki"
date: 2024-12-12
----------------

# Apache Hive : AboutThisWiki

* [How to get permission to edit]({{< ref "#how-to-get-permission-to-edit" >}})
* [How to edit the Hive wiki]({{< ref "#how-to-edit-the-hive-wiki" >}})
  + [Advanced links]({{< ref "#advanced-links" >}})
* [How to find documentation tasks]({{< ref "#how-to-find-documentation-tasks" >}})
* [How to export the Hive wiki]({{< ref "#how-to-export-the-hive-wiki" >}})
* [History]({{< ref "#history" >}})

This page provides information about the [Hive wiki]({{< ref "home_27362069" >}}), including how to edit and export as well as a brief history of the wiki. Note that the [Hive website](http://hive.apache.org/) is separate from the Hive wiki. See [How to edit the website]({{< ref "how-to-edit-the-website_33294834" >}}) for information on editing the website.

## How to get permission to edit

* Create a [Confluence account](https://cwiki.apache.org/confluence/signup.action) if you don't already have one.
* Sign up for the [user mailing list](http://hive.apache.org/mailing_lists.html) by sending a message to [user-subscribe@hive.apache.org]({{< ref "mailto:user-subscribe@hive-apache-org" >}}).
* Send a message to [user@hive.apache.org]({{< ref "mailto:user@hive-apache-org" >}}):
  + Request write access to the Hive wiki.
  + Provide your Confluence username.

## How to edit the Hive wiki

Once you have wiki edit privilege and are logged in, an **Edit button** will appear in the upper right corner of each wiki document (next to Watch and Share). That takes you to the Edit window, where you should enter a brief note about the nature of your changes in a field at the bottom ("What did you change?") and then edit the document. A bar across the top has fairly obvious GUI symbols and there's help via the "**?**" **button**, top right.

In the bottom right corner there's a **Preview** **button** (which toggles with Edit) and a **Save button**. The editor auto-saves and keeps your draft, which you can find in the drop-down list on your ID picture (upper right). When you use the **Save button**, email gets sent to everyone watching that wiki page *unless* *you've unchecked "Notify watchers"* at the bottom; but auto-save does not notify watchers. If you save something and then decide it's all wrong, you can go to the page history and revert it. Page history is in the Tools drop-down list (**"..." button**) on every wiki page, but not in the editing window.

It is good practice to put a comment on the [JIRA issue](https://issues.apache.org/jira/browse/HIVE-10000) that you're documenting, with a link to the wiki page, so people watching that issue can review your changes and future JIRA trawlers can find the documentation easily. See [How to find documentation tasks]({{< ref "#how-to-find-documentation-tasks" >}}) below for more about the JIRA. As a note, Confluence markup syntax is the same as JIRA since they come from the same company.

Version information

Please include Hive version information with your changes, because the wiki covers all releases of Hive.

You can give the version either in the text or in a Version info box like this one (click the **"+" icon**, select "Info" from the drop-down list, and enter "Version" or "Version information" as the title). To link to a JIRA issue, highlight [some text](https://issues.apache.org/jira/browse/HIVE-10000) or the issue ID such as [HIVE-10000](https://issues.apache.org/jira/browse/HIVE-10000) and click the **Insert link icon** (upper middle-right side of the page), using the "Web link" option on the left side of the "Insert link" window.

Links to other parts of the wiki should be made with the "Advanced", "Search", or "Recently viewed" option of the "Insert link" window rather than using the "Web link" option, so that Confluence can automatically adjust links to any sections that get renamed.

If you rename a section and want to preserve external links to it, you should add an anchor for the old title in a text paragraph either before or after the changed heading. (Do not put the anchor on the heading itself because that affects internal links.) Anchors can also be used for links to text or graphics within a section. To insert an anchor, use the **"+" icon** and select "Other macros" at the bottom of the drop-down list. For an example, look at [this section]({{< ref "#this-section" >}}) in Edit mode.

#### Advanced links

For "Advanced" links within the wiki, the Link field is case-sensitive. An advanced link to a Hive wiki page just uses the title as shown at the top of that page, which may or may not include spaces:

* [GettingStarted]({{< ref "gettingstarted_27362090" >}})
* [Books about Hive]({{< ref "books-about-hive_61322063" >}})
* [LanguageManual]({{< ref "languagemanual_27362030" >}})

Sections within a wiki page are marked with a "#" sign. Subheadings are treated the same as major headings:

* [GettingStarted#Installation and Configuration]({{< ref "#gettingstarted#installation-and-configuration" >}})
* [GettingStarted#Requirements]({{< ref "#gettingstarted#requirements" >}})

An advanced link to a section on the same wiki page only needs "#" and the heading text in the Link field:

* [#How to edit the Hive wiki]({{< ref "##how-to-edit-the-hive-wiki" >}})

Links to anchors work the same as sections:

* [#How to edit]({{< ref "##how-to-edit" >}})

## How to find documentation tasks

While you are reading the wiki, you are likely to find things that need to be improved. For example, if you spot a broken link within the wiki, look for the page name in [this list](https://cwiki.apache.org/confluence/pages/listpages-dirview.action?key=Hive) and fix the link.

Documentation tasks are tracked in JIRA issues using the TODOC label with version appended, such as TODOC2.0 and TODOC1.3. Versions 0.10 through 0.14 omit the leading "0.", such as TODOC12.

The following can quickly locate items potentially requiring further documentation:

1. [Browse to JIRA](https://issues.apache.org/jira/browse/HIVE/?selectedTab=com.atlassian.jira.jira-projects-plugin:issues-panel)
2. Select Issues – use Search field in upper right corner (press Enter with or without a search string)
3. Select Project – Hive
4. Select More.. Label TODOC (case sensitive)
5. Save Filter As

Another option is to search for string "Doc note:" although this selects both open and completed tasks.

When the documentation has been completed and verified, the TODOC label can be removed from the issue.

Note: TODOC labels began with TODOC10 for version 0.10. Even when Hive reaches version 10.0, TODOC10 and TODOC10.0 labels will be distinguishable by the presence or absence of a dot number.

## How to export the Hive wiki

The Hive wiki can be exported to HTML, XML, or PDF. Individual pages can be exported to PDF, [EPUB](http://en.wikipedia.org/wiki/EPUB), or Word.

* To obtain export permission, send a request to [user@hive.apache.org]({{< ref "mailto:user@hive-apache-org" >}}) requesting export access and give your Confluence username (see [How to get permission to edit]({{< ref "#how-to-get-permission-to-edit" >}}) above).
* To export the entire Hive wiki or selected pages, use Space Tools (left side of any wiki page) and select Content Tools (top bar in Space Tools) then select the Export tab. Choose an export format and click Next. Select Full Export or Custom Export, and click Export. For a custom export, you can choose which pages you want to export.
* To export the current wiki page, use the Tools drop-down list (upper right corner of any page) and select Export to PDF, Export to EPUB, or Export to Word.

## History

The Apache Hive wiki originally started out as a subspace in the Apache Hadoop MoinMoin wiki (when Hive was still a Hadoop subproject). When Hive graduated to become a top-level project, we moved its wiki out to a top-level Confluence wiki. (The MoinMoin wiki had been under attack by spammers, captchas weren't helping, and there didn't seem to be a way to use access control to defend the Hive subspace.)

Just like in a real move, sometimes stuff gets broken in transit. The MoinMoin and Confluence markup languages are somewhat different, and the migration tools we used didn't preserve everything perfectly.

To prevent further edits on the MoinMoin source, we've deleted all the pages there (replacing them with instructions for how to find their new locations), but we have a full backup of the MoinMoin data in case we notice that anything was entirely lost in the move.

Save

Save

Save

Save

