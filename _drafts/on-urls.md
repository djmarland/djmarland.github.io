---
layout: page
title: My Gospel of Web Development
---

I believe in the web, and the web is URLs. URLs must be structured, sensible and above all, permanent.
In order to achieve permanence, changeable content should be kept out of the URL. Usually this means
the safest form of URL is simply an ID:
```
example.com/articles/12345
```
Titles should not be added to URLs if they can change. A blog post is usually frozen in time once
published so could have a title, but be careful to make it unique. On this site I use the title
in combination with the month/year. Since I am the only user of this blog, I can guarantee uniqueness
and permanence. Pages such as news stories that can evolve over time should not use titles in their URL
as it could become factually incorrect, or even libelous. There is very little value (if any) for SEO
by including the title in the URL.

Adding a slash into a URL indicates hierarchy. Whenever one is added it should be possible to remove
everything after it to retrieve the parent or an index.
```
example.com/articles
```
For this reason it is preferable to use plurals for nouns in URLs. Where hierarchy can change over time
do not use this hierarchy structure.

Inbound links from Search Engines, Social Media and other websites provide enough context. If a user
has to rely on your URL to understand where they are then your UX has failed.
URLs do not have to be human readable, unless they are being advertised specifically,
in which case a clear, short URL is best, which can redirect to the permanent location; Also redirect
common misspellings.
