---
layout: page
title: My Thoughts on AMP
---

So Google launched Accelerated Mobile Pages, and my initial response was one
of dismissal, or perhaps even disgust. That may have been a slight overreaction.

##So what is it?
AMP is an initiative by Google to offer their CDN for use for pages that follow
their strict standards. These standards are based on web standards, with a few
extra tweaks and many limitations. This strips your pages down to their core
content and delivers them extremely fast to the user.

##Why did we need AMP?
AMP was needed because we let web pages become too bloated. They are slow, full
of unwanted content and are overloaded with ads. All users know this, and
are frustrated by it. "Reading Mode" buttons on browsers have been born from
the need to remove clutter. Ad blockers are growing from the need to strip ads,
mostly due to performance and intrusiveness.

Facebook then launched Instant Articles. Apple launched Apple News. These are
app based, closed platforms that require content publishers to offer up their
content in a specific format. This makes them load really fast, and aggregates
them within the app ecosystem. But it takes the articles off the web and closes
the doors. AMP is an attempt to solve a similar problem on the open web.

##My issues with AMP

AMP forces best practices, which is good. But even though AMP has the best
intentions in mind I feel that actually using it directly is damaging
for the web.

###URLs
I usually have issues with most things that break URLs. URLs are the key concept
of the web; One unique, permanent address per thing. But AMP requires you to create
a new special page just for it, which is at a new URL.

Two URLs for one thing is bad. It splits traffic and makes it difficult to
maintain. AMP pages require a rel=canonical so that their crawler knows the
real page (and will only offer that in search), but that doesn't stop someone
linking to it or sharing it on Twitter. Here's a BBC News AMP page. That URL
now has to work forever, or my blog will have a broken link, even though the
main BBC website will still have that article.

It's also a duplication of effort. As developers we've just been through a
phase of reducing duplicate URLs such as mobile sites (mdot) by using
responsive design. This process recreates that world.
There is now a second page for the same content, which you know will be
neglected over time.

###Build it yourself
The Google AMP pages are like a conscience of the web. They say all the rest
is garbage; only your core content matters. A company then builds the AMP page to
make it fast. By doing so they have agreed that everything else was indeed garbage,
so why didn't they just make their main article pages follow that principle. Remove
all the non core content. Find smart ways to improve performance.
In fact, in some speed tests The Guardian website gets to core content quicker
than AMP pages. So why use AMP pages? Why couldn't Google just scrape and
aggregate the already existing data.
The masses of the web have let down the few that try hard to do it right,
creating the situation that AMP needs to exist. I hope Google could find a
way to incorporate performant pages into its aggregation views without forcing them
to build new pages.

###Non standard elements for core content
AMP pages make use of web components to lazy load bits of content. This would
be fine for aggregations or places where some content is being transcluded into
another page. However AMP pages recommend you do this for all images. This
means what would be the canonical home of the image does not actually contain
the image. Google's crawler may be able to find the image as it recognises
that specific web component syntax, but others may not, meaning they disappear. An image
in an article is core content (or at least it should be, rather than an eye
candy stock photo). The browser pre-parser is quite good at handling images,
and advancements in the <img> element to support responsive images is helping
with performance there.

###body{opacity: 0;}
AMP pages are required to set this style at the top. Once the AMP JavaScript
loads and parses it removes that, making the page visible. This is so that
the lazy parts of the page can be handled invisibly and the page doesn't
skip around while parts move into place.
However if for any reason there was an interruption in the JavaScript the
page will remain blank forever. Also if the page won't be visible until the
images (above the fold) have loaded anyway, then why bother putting them
in special tags.

###Google CDN and Ad network.
Some people might be happy to relinquish the control, but others may be
concerned with random Google code running on their branded pages.
The only adverts that are (or will be) supported, are those owned by Google.
This is because they appear to be the only ones willing to make them fast,
at least when they're in AMP pages. Can this not be made standard for all
of their adverts everywhere?
Perhaps what we really need is a standard element for handling adverts,
that is sandboxed and can be individually shut up by standard browser
controls if they violate that users terms of decency.

###Just use Reading Mode
Browser Reading Mode views do a good job of clearing away the clutter.
Perhaps Google could scan pages in reading mode and store them for use
in apps, distributing from their CDN. Sharing the URLs in that context
would still be the original article.

ADD PICTURE
I'm slightly guessing but as far as I can see this is how the Windows 10
News app operates. This one has been quiet.
I haven't heard about any special requirements for getting your content
into it so I am not exactly sure how it works.
But using it, it appears like it scrapes RSS feeds, and then generates
Reading Mode views of all of the content. No separate version of the webpage
has to be created for it, and if you share you are sharing the real pages.
Within proper metadata in the head of your page these app ecosystems can
aggregate your content (or with RSS), and then they can display as they wish.
Once the browser is in play though you are back at the real page and URL,
which I would hope is just as performant by then.

##Post AMP
Ad blockers, Instant Articles and now AMP show that it's ALL about content.
It is time to restore that web conscience and build pages the users really want.
Decision makers are agreeing what is core content when it comes to AMP pages,
so instead do it for desktop pages.
Stop bombarding users with intrusive Ads and share buttons.
Get the content to them quickly, and decide smartly if they
need any more later.
