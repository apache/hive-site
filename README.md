# Apache Hive Documentation Site

This repository contains the documentation for Apache Hive. 
It's built with Hugo and hosted at https://hive.apache.org.

### Build and Run Locally

* Clone this repository.
* Install [hugo]:

 ```brew install hugo```

* To verify your new install:

```hugo version```

* To build and start the Hugo server run:
```
>>> hugo server -D

                   | EN
+------------------+----+
  Pages            | 10
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  3
  Processed images |  0
  Aliases          |  1
  Sitemaps         |  1
  Cleaned          |  0

Total in 11 ms
Watching for changes in /Users/bep/quickstart/{content,data,layouts,static,themes}
Watching for config changes in /Users/bep/quickstart/config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```
* Navigate to `http://localhost:1313/` to view the site locally.


### To Add New Content 

* To add new markdown file : 
`hugo new /general/Downloads.md`

* Update `themes/hive/layouts/partials/menu.html` and `config.toml` to add navigation link to the markdown page as needed.

### Pushing to site
Commit and push the changes to the main branch. The site is automatically deployed from the site directory.


[hugo]: https://gohugo.io/getting-started/quick-start/
