---
layout: page
title: My Gospel of Web Development
---

<h2>Last update: 22nd September 2015</h2>
This page details my personal beliefs of how to build websites. These are my rules of web development
and I believe them strongly. I will defend them with passion *but* am always open to listen and observe
new techniques and technologies. When I hear a new argument I like, I will adapt it into my beliefs and
working practices, then update this page accordingly.

<h2>URLs</h2>
I believe in the web, and the web is URLs. All design and development should start with the URL.
A URL must:
<ul>
<li>Be Structured (use plural nouns)</li>
<li>Permanent (not changeable elements)</li>
<li>Hackable</li>
</ul>

Read more about my approach to URLs

<h2>SEO</h2>
There are no "secrets" to SEO. There is no magic way you can spend lots of money and gain SEO.
There are only three key points to SEO (all documented by the search engines themselves):
<ul>
    <li>Structured, semantic, crawlable markup</li>
    <li>Relevant and up to date content</li>
    <li>Good inbound links</li>
</ul>
As a web developer I have control over the first. The majority of which can be covered with Progressive
Enhancement. But it is important to also have good document outline and good permanent URLs for this
to work. A good web developer should be very capable at handling this. Many JavaScript implementations
break this, requiring hacky or expensive workarounds to then fix it.

<h2>Progressive Enhancement</h2>
Progressive Enhancement is a crucial requirement for creating pages that are part of the web. It is
also the cheapest and most efficient way to build a web that is accessible, scalable and crawlable.

Read more about what progressive enhancement means to me

<h2>Apps</h2>
Most websites do NOT need a native app. NEVER put app upsells in the way of your website content.
Web apps are a great way of granting universal access for tools and tasks. However, sites that convey
information should NOT be built as a web app.

Read more about my thoughts on apps.

<h2>JavaScript</h2>
When it comes to websites (for information) JavaScript should be an enhancement. It should be loaded late,
and the page should be readable/navigable without it. There is a trend of using full JavaScript application
frameworks to build full websites. None of them so far appear to encourage progressive enhancement.
I believe that such frameworks (Angular specifically) are damaging to the web. They make life easy for
the developer but push the client to do more heavy rendering work. Developers should do the hard work
on the server as much as possible where the capabilities and performance are controllable.
I do not work in CoffeeScript and disagree with the need to work in a different syntax.

<h2>CSS</h2>
I prefer to write my CSS mobile first, so that the basic styles are applied globally. Media queries
can then change the layout as the viewport gets progressively larger. I always build responsive sites
and using em values as min-width media queries, and NEVER disable user scaling. I don't tend to
make use of em outside of media queries (preferring rem for fonts and px everywhere else)

I believe strongly in setting a style guide, to decide and enforce a fixed set of colours, grids and
margin/gutter sizes. Strictly adhering to using consistent values is what makes a website look
highly professional.

<h3>Sass</h3>
I like to make use of Sass (Scss syntax) to write CSS. It especially helps with consistency as variables
can be used for colours and pixel values. However, I try to use a light touch in Sass. In order
to remain readable I try to stick to variables, nesting and the odd mixin
(particularly for vendor prefixes). It can be possible to "over-sass", which I try to avoid.

<h3>BEM</h3>
I am fond of using BEM syntax in CSS, and creating many classes with atomic functions. This can make
the HTML more verbose with classes, however they compress with gzip extremely well. The class attribute
doesn't have any semantic meaning anyway, so I am happy with stacking it full of class names.
This makes building websites (especially large ones) vastly easier, and much more supportable over
a long period of time.

<h2>Design</h2>
In order to be as efficient as possible (and reduce downloads) I will strive to build any design using CSS
alone (e.g using colours, borders and gradients), rather than adding downloads for decoration.
I am a fan of using web fonts for icons, as they scale to any size and can easily change colour. They
also allow a single, very small download that includes many icons. However I am aware of certain issues
with icon fonts (particularly accessibility) so I am on the look out for an alternative that is as good.

<h2>Server side</h2>
I am fond of PHP. I have tried many others but keep coming back to PHP for building websites.
It is possible to build high quality modern PHP applications with proper dependency injection and
fully tested.
When it comes to the view I prefer a HTML based system such as Twig or Handlebars. I do not agree
with Haml or Jade as they alter pre-established syntax. I prefer to keep view logic to an absolute
minimum, ensuring that all calculations have been established before the view was rendered.

<h2>Build steps</h2>
I currently make use of Grunt to compile Sass and concatenate/uglify JavaScript. I prefer to do this
without the need to also use Ruby (by using libsass), as less language dependencies is better (grunt
already adds nodejs)
I am open to using Gulp once it is mature enough to cover my needs without requiring Ruby.

I believe any website of any significant size will need a build step. In order to be maintainable files
need to be separated, but must ALWAYS be combined into as few files as possible to send to the user.

<h2>Development checklist</h2>
<ul>
    <li>Concatenate and uglify JavaScript</li>
    <li>Minify CSS</li>
    <li>gZip</li>
</ul>
