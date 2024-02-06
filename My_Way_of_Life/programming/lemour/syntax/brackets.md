
# Brackets
## in other languages

I've seen lots of uses for brackets in different programming languages. The general pattern is:
* parenthesis `(this)` can be used on their own to control the order of operations
    * this allows for precise mathematical control of the program
    * and for mathematical one-liners
* square brackets `[this]` are usually used to handle lists or indexing
* curly brackers `{this}` are used for whatever fancy things the language feels like doing:
    * scopes
    * JSONs
    * lists again
    * type aliases
* angle brackets `<this>` are used for generic types and type parameters
    * unless there is HTML in the program, in which case the angle brackets might just be HTML tags

Here is a quick table of various "brackets" and quotation marks. Only the 1st 4 are available in ASCII, and since I'm an American, I will only use ASCII.

|name|symbols|unicode values|HTML names|
|-|-|-|-|
| parenthesis | () | 10216,10217 ||
| square brackets | [] | 10216,10217 ||
| curly brackets | {} | 10216,10217 ||
| angle brackets | <> | 10216,10217 ||
| double angle Q. marks | «» | 171,187 | laquo, raquo |
| bras | ⟨⟩ | 10216,10217 ||
| single Q. marks | ‘’ | 8216, 8217 | lsquo, rsquo |
| double Q. marks | “” | 8220, 8221 | ldquo, rdquo |
| single pointing angle Q. marks | ‹› | 8249, 8250 | lsaquo, rsaquo |
| H. single comma Q. mark O. | ❛❜ | 10075, 10076 ||
| H. double comma Q. mark O. | ❝❞ | 10077, 10078 ||
| H. pointing angle Q. mark O.	 | ❮❯ | 10094, 10095 ||

* "O." is short for "ornaments"
* "Q." is short for "quoation"
* "H." is short for "heavy"
* *unicode values are in decimal*
* *HTML name is the name of the character's HTML entity, if it has a shorthand*

## in my language (lemour)
Parenthesis are only used for function calls and for controlling the order of operations. Square brackets are only used for indexing. Curly brackets are used for scopes and everything else. Angle brackets are not used as brackets and are only used as parts of operators.

### Composite brackets
Curly brackets can be composed with operators to form composite brackets. This means that unary operators can not touch curly brackets.

#### Scope
`{ content, with no operators }` forms a scope.

You can also use semicolons and/or parenthesis to prevent problems with unary operators:
* `{; content ;}`
* `{( content )}`
* `{;( content );}`
* `{(; content ;)}`

#### Inline Array
`{+ content +}` forms an inline array.

#### Map
`{- content -}` forms a map.

#### Forced Sugar
The next 3 composite brackets are what I call "forced sugar". These pieces of syntax can be used to tell the interpreter or compiler how something is supposed to be handled. If the given things can **not** be handled in that way, then a syntax error is thrown. This helps you avoid running into weird syntax issues, by using very verbose and inconvenient syntax.

##### Forced Type
`{: content :}` forms a forced type. This means [`content`] will always be treated as a type, and never as a reference or value.

##### Forced Reference
`{@ content @}` forms a forced referecne. This means [`content`] will always be treated as a reference, and never as a type or value.

##### Forced Value
`{^ content ^}` forms a forced value. This means [`content`] will always be treated as a value, and never as a type or reference.

#### Language Embedding
`name {! content !}` is the official syntax to insert or embed another language into your script. However, I do **not** plan on adding specific language to this language. Additionally, this syntax assumes that the embedded language supports the same syntax. If this causes an issue, either:
* change the expressions in the embedded language
    * even adding whitespace or more operators like this will prevent further embedding:
        * `name { ! content ! }`
            * note: white space between operators is **not** allowed in this language, including when fusing operators to curlies to make composite brackets
        * `name {!! content !!}`
        * `name {{! content !}}`
* OR use dots in the original expression:
    * `name {.! content !.}`

#### String Templates
`{{ content }}` in a string literal forms a string template. This will evaluate the code inside and automatically convert it to a string using `to_string`.

#### Raw String
`{" content "}` in a string literal forms a raw string. This never evaluate the `content`, and always treat all of the `content` as a string, which can be multiline. Backslash encapsulation (aka *backslash decoding*) is still performed on the string's contents. Neither `\"}` nor `"\}` will terminate the string.

### Indexing
So, square brackets are used for indexing? That's right. Also, the meaning of `!` changes inside square brackets.
* Reason? You shouldn't be using boolean not in brackets anyways.

Indexing syntax comes in 2 forms:
* `object[index]`
* `object[mode! index]`
* `mode` can be any suquence of letters, numbers, hyphens, underscores, and whitespace. Whitespace is `mode` is ignored.

When you index into an object, using the indexing syntax, this code is run (and transpiled) under the hood:
* `object.proto.index_`{insert `mode` here}`(`{insert `index` here}`)`

This means you can define a custom `index` method if you want, and even use multiple types of indexing. For example, I could make a 3D grid that allows indexing along x, y, and z specifically to get a 2D slice of the grid:
* `myGrid[x! 23]` would be the 24th `x` layer in the grid
* `myGrid[y! 0]`  would be the  1st `y` layer in the grid
* `myGrid[z! 51]` would be the 52nd `z` layer in the grid
* `myGrid[102]`   would be the 102nd point in the grid
