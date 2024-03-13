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
      * `width` and `height`, which set the size of special elements, like `img`, `svg`, `cavnas`, and `iframe`
      * `name`, used for `input`s
        * not to be confused with `id`
* display types:
  * `block`
    * always makes a new line
    * sets width to full width
  * `inline-block`
    * wraps its contents within its own borders
    * should be used with width and height
  * `inline` wraps its contents within its parent borders
    * can't have vertical margin because it's not able to control its own line flow
    * parent element controls the height and width, but the element's line height can still affect the parent
  * `flex` and `grid`
    * `flex`
* CSS is used to customize things
  * all elements are the same, except for *special* elements
  * special body elements:
    * `input`
      * allows inputs of almost every type imaginable: `text`, `url`, `email`, `checkbox`, `number`, `image`, `file`, `radio`, `range`, `color`, `time`, `date`, and more
      * inputs for repetitive or personal information should have a `name`, because:
        * inputs with `name` give autofill suggestions
      * the `autocomplete` tag allows multiple `input`s to be autofilled at once, as a group
        * the names for these are very specific (see [https://web.dev/learn/forms/autofill/#address] and [])
    * `label`
      * puts text on or next to an `input` element
      * requries the `input` to have a `name` and `label` to have a `for`; also the 2 attributes have to be set to same value
    * `select` and `option`
    * `table`
      * does some clever math to try to make things look nice
      * not as flexible as a CSS grid, but it usually gets the job done
      * automatically adjusts the width of each column to
        * the maximum size of
          * the widths that the cells in the column would have if they were inline
        * if there's not enough room for the table to fix
          * it will try set all inline cells back to inline
          * and try to squish them down
      * sets each row's height to the maximum height of any cell in that row
    * `img`
      * loads an image from the URL specified in `src`
      * requires no CSS
    * `svg`
      * loads vector graphics
      * this has lots of special children elements which I won't discuss today
    * `canvas`
      * draw things with JavaScript
    * `iframe`
      * loads a whole other webpage in
      * some webpages will result in "failed to connect" because iframes have a lot of limitations
    * `a`
    * `script`
      * used for JavaScript
      * defaults to not being displayed
    * `noscript`
      * used to tell the user that they don't have JavaScript enabled
  * special 
    * `style` and `link`
      * defaults to not being displayed
