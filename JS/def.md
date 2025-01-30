
Let's define the syntax rules for JavaScript. I just came up with a cool language to describe the rules.

The following characters are special.

```
\
>
<
!
.
;
,
(
)
```

Explanation:
* `\` escapes characters.
* `>` defines the beginning of a block.
* `<` defines the end of a block.
* `!` negates a property or defines a rule that prevents a `>` or `<` rule.
* `.` gets a property.
* `;` makes a comment.
* `,` separates the arguments used by keywords.
* `(` and `)` grouping / operator precedence.
* `=` define a BNF-rule.

Identifiers need to be escaped in order to be used as literls, like so: `\for`.
* `\n`, `\t`, etc. match their respective characters.

There are also some keywords:
* `stage`
* `to`
* `or`
* `optional`
* `multiple`
* `before`
* `any`
* `extract`

JS

```
stage 1 ; strings and comments

; define the 3 string types
    ; starts
    " > str."
    ' > str.'
    ` > str.`
    ; ends
    " < str."
    ' < str.'
    ` < str.`
; strings of a given quote type cannot be ended with a different quote type
    str." !< str.!"
    str.' !< str.!'
    str.` !< str.!`
; cannot start a string within a string
    str !> str
    str !> str
    str !> str

; define comments
    ; starts
    /* > cmt.multiline
    // > cmt.singleline
    ; ends
    */ < cmt.multiline
    \n < cmt.singleline

; strings and comments are incompatible
    ; strings disable ending comments
    str !> cmt
    ; strings disable starting comments
    str !< cmt
    ; comments disable ending strings
    str !> cmt
    ; comments disable starting strings
    str !< cmt

stage 2 ; identifiers

; identifiers start with a letter or _
(\a to \z) or (\A to \Z) or _ > identifier
; itentifiers can contain letters, numbers, and _s after they start
; therefore, they end before any character that is not one of those
before !((\a to \z) or (\A to \Z) or _ or (\0 to \9)) < identifier

stage 3 ; brackets

; define the 3 bracket types
    ; starts
    \( > brackets.parens
    \[ > brackets.squares
    \{ > brackets.curlies
    ; end
    \) < brackets.parens
    \] < brackets.squares
    \} < brackets.curlies
; brackets of a given quote type cannot be ended with a different bracket type
    str.parens !< str.!parens
    str.squares !< str.!squares
    str.curlies !< str.!curlies

stage 4 ; operators
; simply define them all in one go
; binaries
    ; first, binary math
        math =
        % or **
        + or - or * or / or
        & or | or ^
        && or || or ??
    ; second, the rest
        op =
        ?. or . or
        ; yes, I know this is ternary
        ? or : or
        \=\> or
        \=\=\= or \=\= or
        \!\=\= or \!\= or
        \<\=   or \>\= or
        \<     or \>   or
        math \= or \= or
        math or
        \,
; unaries
    unary =
        ++ or -- or
        + or - or
        ! or ~ or
        #

; those definitions will suffice

stage 5 ; statements and expressions

; automatically makes anything inside parenthesis or square brackets have to be an expression
expression =
    extract brackets.parens 1 or
    extract brackets.squares 1

; if - else statements
    ; look at how easy it is
    statement.if =
        \if brackets.parens statement
        optional (\else statement)
; for loops
    statement.for =
        \for brackets.parens statement
    ; the parens after `for` are called a "for statement"
    expression.for_statements =
        extract statement.for 1
    ; require every for statement to have exactly 3 statements in it
    expression.for_statements =
        statement.plain statement.plain statement.plain

; while loops
    statement.while =
        \while brackets.parens statement

; do while loops
    statement.do_while =
        \do statement while brackets.parens

; switch statements
    statement.switch =
        \switch brackets.parens statement

; with statements
    statement.with =
        \with brackets.parens statement

; types of plain statements
    statement.plain.declaration =
        declarator multiple(identifier) or
        declarator expression.destructuring_declaration or
        declarator statement.plain.assignment
        declarator =
            \var or \let or \const
    statement.plain.assignment =
        identifier op.assignment expression
    ; functions and classes can be used as expressions
    ; the interpreter automatically adds them to a scope if the scope is direct parent of the expression
    statement.plain.expression =
        expression

; destructuring declarations
    ; fun fact: you can use these as function parameters!
    expression.destructuring_declaration =
        expression.destructuring \= expression
    ; fun fact: you can use these as function parameters too!
    expression.destructuring =
        brackets.squares or
        brackets.curlies
    ; make it so a destructuring can only contain other destructurings, and not just any gosh darn expression
    extract expression.destructuring (or.any, 1) =
        expression.destructuring or
        identifier multiple (\, (expression.destructuring or
        identifier))

```




