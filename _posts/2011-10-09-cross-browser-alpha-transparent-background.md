---
layout: post
title: "Cross browser alpha transparent background CSS (rgba)"
redirect_from: "/2011/10/cross-browser-alpha-transparent-background-css/"
---

<p>In building the <a href="http://www.bbc.co.uk/programmes">BBC Programmes</a> website the design called for various layers of semi-transparent coloured boxes. These colours can change depending on the programme (for example: <a href="http://www.bbc.co.uk/programmes/b006v0dz">Never Mind the Buzzcocks</a>) so an alpha transparent PNG is not a maintainable option.<br />
Obviously the simplest method is <a href="http://www.w3.org/TR/css3-color/">RGBA</a>.</p>
<pre><code>#div {
    background: rgba(0,0,255,0.7);
}
</code></pre>
<p>As elegant as that is, it is not currently an acceptable solution in it's own right. RGBA is not supported in Internet Explorer <a href="http://caniuse.com/css3-colors">below version 9</a>. Of course the BBC needs to <a href="http://www.bbc.co.uk/guidelines/futuremedia/technical/browser_support.shtml#support_table">support</a> the majority of it's visitors. The phrase &#8220;it doesn't need to look the same in every browser&#8221; could be thrown about, but in this case the semi-transparent boxes are quite essential for the look desired.</p>
<p>So, as any good web developer does, I turned to Google. I thought it would be a simple query (expected it to use IE filters) but it took unusually long to find it. Eventually I arrived at <a href="http://robertnyman.com/2010/01/11/css-background-transparency-without-affecting-child-elements-through-rgba-and-filters/">this blog post</a> which proved helpful.</p>
<p>Alpha-transparent background code (<a href="http://robertnyman.com/2010/01/11/css-background-transparency-without-affecting-child-elements-through-rgba-and-filters">quoted</a>)</p>
<pre><code>.alpha60 {
    /* Fallback for web browsers that doesn't support RGBa */
    background: rgb(0, 0, 0);
    /* RGBa with 0.6 opacity */
    background: rgba(0, 0, 0, 0.6);
    /* For IE 5.5 - 7*/
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);
    /* For IE 8*/
    -ms-filter: &quot;progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)&quot;;
}
</code></pre>
<h2>BUT</h2>
<p>There appeared to be a problem with this once we saw it in the wild. First you have to add zoom:1 to make it work in IE6-7 but this isn't unusual. Secondly IE8 didn't seem to work. As IE8 does support rgb() as a background colour the result is a solid coloured box.</p>
<p>Therefore we need to set the background back to transparent after the rgb rule (just in IE8 and below). After more Googling the answer was the <a href="http://webdood.com/?p=57">backslash 9 hack</a>.</p>
<p>Using that and tweaking (a lot) produced the following block of code. Note the -ms-filter line supported as IE8+ has been removed as it unnecessary. We have to use the non prefixed version anyway (for IE6,7) so the code is no more valid by using it in this scenario</p>
<pre><code>#div {
    background:rgb(255,0,0);
    background: transparent\9;
    background:rgba(255,0,0,0.3);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4cFF0000,endColorstr=#4cFF0000);
    zoom: 1;
}
</code></pre>
<p>This fixed the transparency problem but there was a new issue. Internet Explorer 9 is capable of displaying rgba <strong>AND</strong> the filter property. This creates a doubling up of the transparency and ruining it's effects. It appears there is no CSS attribute hack that targets only IE8 or IE9 and not both (that has been discovered yet).</p>
<p>The ideal solution here is to not use the filter in IE9. The CSS filters are memory intensive and since IE9 is fully capable of rgba, it should be rewarded as such. IE9 is <a href="http://kimblim.dk/css-tests/selectors/">capable of many CSS3 selectors</a> so we'll use one here:</p>
<pre><code>#div:nth-child(n) {
    filter:none;
}
</code></pre>
<p>This is a valid CSS selector that will match all elements in the same way as if it was not here. <a href="http://css-tricks.com/5452-how-nth-child-works/">More detail on how nth-child works</a>.</p>
<p><a href="/projects/alpha/test.html">This page shows various test scenarios</a></p>
<h2>Full code</h2>
<pre><code>#div{
    background:rgb(255,0,0);
    background: transparent\9;
    background:rgba(255,0,0,0.3);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4cFF0000,endColorstr=#4cFF0000);
    zoom: 1;
}
#div:nth-child(n) {
    filter: none;
}
</code></pre>
<p>So that's the code required. I've put it here as a complete solution to save other developers having to search and test as much as I had to. Of course it's recommended to use <a href="http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/">conditional classes</a> instead but sometimes that's just not possible.</p>
<p>The only other thing that slows down creating alpha transparent backgrounds is the conversion from hex -> rgba and opacity -> hex so below is a handy converter. Enter a hex colour and opacity value and it'll spit out the code in the form seen above.</p>


<p data-height="540" data-theme-id="9538" data-slug-hash="LhDyC" data-default-tab="result" data-user="djmarland" class='codepen'>See the Pen <a href='http://codepen.io/djmarland/pen/LhDyC/'>LhDyC</a> by David Marland (<a href='http://codepen.io/djmarland'>@djmarland</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>