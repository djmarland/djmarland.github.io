djmarland.github.io
===================

Website (yep)


Running via vagrant
---------------------
```
vagrant ssh
```

The Vagrant vm is configured to forward port 8124 by default. So you can start a Jekyll server like so:

```
jekyll server --watch --force_polling -P 8124
```

And then navigate to localhost:8124 on your host box.