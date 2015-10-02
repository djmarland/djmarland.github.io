<h2>Progressive Enhancement</h2>
When building documents on the web progressive enhancement is a crucial aspect. There are many, many
systems that make use of the content placed on the web. For example:
<ul>
    <li>Desktop web browsers</li>
    <li>Mobile web browsers</li>
    <li>Text only browsers</li>
    <li>Screen readers</li>
    <li>Search Engines</li>
    <li>Smart Watches</li>
    <li>Digital assistants (Siri/Google Now/Cortana)</li>
    <li>More...</li>
</ul>
These can only work by accessing the web, which means following URLs and reading HTML. Yes, some of them
are also capable of running advanced scripts but they may have difficultly parsing meaning out of them.
The web is full of data, and in order to be most useful it has to be structured. The simplest way to achieve
this is by sending standard HTML when a URL is requested. This is the basics of progressive enhancement.
By sending a clear semantic document in the initial request, many needs have already achieved. This
also has the benefit of being accessible and search engine friendly with no extra work.

JavaScript (and even CSS) are considered an enhancement. The meaning of the page at the URL should be
established when either of them are switched off or fail to load (slow connections). It is also good
to keep the URLs atomic, by only sending exactly what was required at the URL in the first request,
which should be fast. JavaScript can then lazily load in extras or deeper content. All of the content
MUST be reachable via links if the JavaScript fails to load.
