---
layout: post
title: "Truncate at space, Zend View Helper"
---

<p>When writing web applications you may frequently find the need to <a href="http://www.thefreedictionary.com/truncate" data-mce-href="http://www.thefreedictionary.com/truncate">truncate</a> strings. In php you <strong>could</strong> just use <a href="http://php.net/manual/en/function.substr.php" data-mce-href="http://php.net/manual/en/function.substr.php">substr</a> but that could be <a href="http://picchore.com/funny/carrots-glazed-with-what/" data-mce-href="http://picchore.com/funny/carrots-glazed-with-what/">dangerous</a>.</p>
<p>Therefore the safest idea is to truncate back to the nearest space. The code below is a Zend View Helper, constructed in a way to read cleanly in the page. It’s use in a Zend View is as follows:</p>
<pre><code><?$string = 'Hello People';>
<?=$this->truncate($string)->toLength(10)
<?=$this->truncate($string)->toLength(10)->withPostfix('--')
<?=$this->truncate($string)->midword()->toLength(10)->withPostfix('--')
</code></pre>

<p>As each method returns itself they can be chained together. The above outputs;</p>
<pre><code>Hello…
Hello--
Hello peop--</code></pre>

<p>Methods</p>
<pre><code>toLength($int) - the max string length to cut to
midword() - disable the safe truncation (probably not recommended) withPostfix($string) - replace the default postfix (...) with $string</code></pre>

<h2>Full class code</h2>
<pre><code><?php
class Zend_View_Helper_Truncate extends Zend_View_Helper_Abstract {
    private $_string;
    private $_length;
    private $_postfix;
    private $_cutatspace = true;

    public function truncate($string) {
        $this->_string = trim($string);
        $this->_defaultValues();
        return $this;
    }

    private function _defaultValues() {
        $this->toLength(100);
        $this->withPostfix('&#0133;');
     }

    public function midword() {
        $this->_cutatspace = false;
        return $this;
    }

    public function toLength($int) {
        $this->_length = (int) $int;
        return $this;
    }
    public function withPostfix($str) {
        $this->_postfix = $str;
        return $this;
    }

    public function render() {
        // Return empty string if max length < 1
        if ($this->_length < 1) {
            return '';
        }

        // Return full string if max length >= string length
        if ($this->_length >= strlen($this->_string)) {
            return $this->_string;
        }

        // Return truncated string
        if ($this->_cutatspace) {
            while (strlen($this->_string) > $this->_length) {
                $cutPos = strrpos($this->_string, ' ', -1);
                if ($cutPos === false) {
                    // no spaces left, whole string truncated
                    return '';
                }
                $this->_string = trim(substr($this->_string, 0, $cutPos));
            }
        } else {
            $this->_string = trim(substr($this->_string, 0, $this->_length));
        }
        return $this->_string . $this->_postfix;
    }

    public function __toString() {
        return $this->render();
    }
}</code></pre>
<p><strong>Update 11/02/2012: </strong><a href="http://www.monkeyhybrid.com/" title="Steve">Steve</a> noted an issue with this helper. I have updated the code above based on his suggestion. Thanks Steve.</p>
