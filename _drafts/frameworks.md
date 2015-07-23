---
layout: post
title: "Frameworks"
---

In the last year I've attempted to build the same application in Zend 1, Laravel, Node, Silex and Symfony.
It's a basic CRUD application with user sign in.

<h2>Zend 1</h2>
I with <a href="http://framework.zend.com/manual/1.12/en/manual.html">Zend 1</a> because it's what I was
used to. I found it quite easy to get started as it only prescribes how to use Routing and Controllers.
There are model helpers for anything you need to do, but you're not bound to using them.
However Zend 1 is horribly out of date and so I started investigating alternatives.

<h2>Zend 2</h2>
First thing I looked into was Zend 2. However its event based system was a bit alien to my MVC lifestyle.
I gave up on it quite quickly, so to be fair I didn't gain much of an informed opinion about it.

<h2>Laravel</h2>
Laravel is incredibly quick to get set up. I had basic CRUD through the Eloquent models almost immediately.
However as time goes on I needed to do some transactions off the beaten track of Eloquent.
At this point I was at a loss. Extending / Replacing logic in Eloquent models was borderline impossible.
I don't think I ever solved it.

<h2>Node</h2>
At this point I moved onto Node.js with Express. It's all the rage, and I was hoping to prepare the
application to be ready to build isomorphic javascript. Node is great in that somebody has already built
practically everything you need. I found a handy ORM named Sequelize which certainly sped up the process.
I did manage to get quite far, but the Asynchronous nature of Node became quite tedious for an MVC
application. It became Promise hell. Having to restart the server for every change certainly used up a
lot of time too. Nodemon helps, but on a virtual machine (my preferred working environment) it was slow
from code change to working page refresh. It was again quite difficult separating the ORM from the business
logic, in order to be ready to also be used client side.

Eventually the foibles of node left me longing for PHP. It truly is possible to build grown up PHP and I
came crawling back with the intention of proving that.

<h2>Silex</h2>
Silex is a microlibrary. It practically only does routing, which sounded perfect for what I want.
I was able to craft my business logic as a set of services and domain models. With a fair bit of coercing
I was able to attach the Doctrine DBAL. I was avoided the ORM at first because I didn't want my domain models
to be populated with knowledge of where they are stored. Also Doctrine ORM tries very hard to make you use
annotations, which I find an evil concept in PHP, a language that doesn't natively support them.
However session and user management was a serious pain. Silex is good in that it is compatible with Symfony
components so you can pull in providers as you need. I was getting very pleased with my Silex app in that it
was fully unit tested with code coverage and code sniffer reports being generated, as well as proper database
migration scripts.
However the further I went into request management (and profiling) the more I was using from Symfony.
It was never straightforward, and in the end I started to question why not use Symfony.

<h2>Symfony</h2>
I started to write the application in Symfony. I could have easily grabbed a ready made application for
user management, and used the built in Doctrine ORM for an easy life. However I still maintain that my
Services and Domain Models should be framework agnostic. I thought this would be done really as Symfony
bundles could put my business logic into Appbundle and my database querying into DatabaseBundle. In reality
that's not really how bundles should work.
The Symfony dependency injection construct is handy as you can handle chains of dependencies via Yaml
configuration. Although Yaml is ick. Outside of the view layer I am not a fan of executable code that isn't
in PHP. It makes it difficult to follow the trail of execution and is a little too much magic. The dependency
injection also involves a lot of classes that are just copy pasted with having any idea what they do,
which then just happen to hey executed somehow. Symfony can handle sessions by default but the user
management is tough to get working if you've separated domain models from data retrival.
I think the answer may be a Visitor provider that can hold a User object but not merge with it.
It is definitely possible to over-yaml with Symfony and have no hope of anyone following your code ever
again.
The Symfony profiler is great. I did try to get that into Silex, but it didn't work and after hours
wrestling with it decided to just use Symfony instead.

<h2>In conclusion.</h2>
I want a framework that handles the request. That being: Routing, Controllers and Sessions. I don't
want it to tell me how to write my business logic. Libraries like Doctrine are helpful for the data
retrival side, but I want it to work alongside my domain models and mappers, rather than defining them.
I should be able to swap the data retrival layer out without touching my Domain Models.
Laravel and Symfony reach too far into your models for me to be completely comfortable with them.
I want to be able to transfer my pure PHP business logic to any other framework easily.


Request and Controllers (framework) - Service (my data api) - Data retrival (DBAL/feed client) - mapper (my link) - domain models

I'll probably stick with Symfony, as it provides so much usefulness for the request, but with a more flexible data retrival layer than Laravel.
However I will work harder on trying to architect my application to have clear boundaries between the layers, keeping the framework and my logic separate. Then through the clever use of adapters I should be able use the request handling of any framework. Who knows, maybe keeping my logic separate and simple means I can convert it to Javascript on the fly and have Isomorphic PHP.