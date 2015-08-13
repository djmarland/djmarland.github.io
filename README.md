djmarland.github.io
===================

Website (yep)


Running via vagrant
---------------------
```
vagrant ssh
cd /vagrant
```

The Vagrant vm is configured to forward port 4000 by default. So you can start a Jekyll server like so:

```
jekyll server --watch --force_polling -P 4000
```

And then navigate to localhost:4000 on your host box.