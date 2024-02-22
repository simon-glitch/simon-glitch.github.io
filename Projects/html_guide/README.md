Goal:
* define features of the HTML language
  * define HTML element
    * list `p`, `b`, and `i`
  * describe tag syntax
    * example: `a` (hyperlink element)
    * example: `img` (image element)
  * describe specific tags:
    * we just saw how `href` and `src` can be used in hyperlinks and images
    * there is also:
      * `id`, used for section links and for convenient variables in JavaScript
      * `class`, which does nothing on its own, and is used by CSS selectors
      * `width` and `height`, which set the size of special elements, like `img`, `svg`, `cavnas`, and `iframe`.
* display types:
    `block` always makes a new line
    `inline-block` wraps its contentswithin its own borders
    `inline` wraps its contents within its parent borders
  * can't have vertical margin because it's not able to control its own line flow
  * parent element controls the height and width, but the element's line height can still affect the parent.
* CSS is used to customize things
  * all elements are the same, except for *special* elements
  * special body elements:
    * `input`
    * `select` and `option`
    * `img`
    * `svg`
    * `canvas`
    * `iframe`
    * `a`
    * `script`
      * used for JavaScript.
      * defaults to not being displayed.
  * special 
    * `style` and `link`
      * defaults to not being displayed.
