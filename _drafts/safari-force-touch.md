---
layout: post
title: "Safari Force Touch Disappointment"
---

So safari 9 has introduced a new javscript event: force touch.
This is for use on the new Macbook trackpads, and rumoured to be on the new iPhone.
However, why is this a new event. The pointer events spec was highly considered and already
has support for changes in pressure. It's frustrating to see Apple throw yet another event at the web,
fragmenting rather than standardising. It's practically proprietary as it requires specific apple
hardware to fire correctly.

It feels rushed. I won't be using it directly, though a pointer events polyfill could plug into it.
Though it seems Safari users may be getting overloaded with polyfills.