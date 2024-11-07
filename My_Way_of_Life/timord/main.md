
I've come up with a new idea for a very useful programming language.

I'll call it timord for now.

# Basic features:
* `()` - denote nesting
* `(a,b)` - makes a sequence object
    * all objects are immutable, so these are too
* `[]` - escapes its contents
    * functions are defined with this
    * strings are also made with this
* `:` - denotes a key -> value mapping, every time
    * functions are defined with this
* `.` - triggers a key -> value mapping, every time
    * functions are run with this
* `{}` - transforms an operator by giving it additional parameters; can be used to add any number of parameters to any operator
    * `[op].(a,b,c)` does the same thing as `a op{c} b`, where `op` could be `+` or something else

# Escapign characters
`\` can be used to escape any operator in any context; an escaped operator will be treated just like a letter
* `\x[a, b]`, `\u[a, b, c, d]`, and `\u{[a, b, c, ...]}` can be used to escape unicode characters
* `\h[a]` will parse an HTML entity into an escaped character; for example:
    * `\h&lt;` will become `<`
    * `\h&#46;` will become an escpaed `.`; this is equivalent to `\.`
    * `\h[a]` will simply work like `\[a]` is `[a]` is not a valid HTML entity
* `\a[a]` will unescape and escaped character, unless that character is `\` itself
    * so `\a\u002E`, `\a\x2E`, or `\a\h&#46;` will behave like the `.` operator would normally
* hopefully this will help you encode your code if you need to

# Operators
This language does not use symbols for math operators, because this language is not about math.

Symbolic operators:
* `=` - assigns a value
* `==` - defines or checks for equality
* `*` - denotes a wild-ward
* `+` - denotes a minimum on a range
* `-` - denotes a maximum on a range
* `/` - denotes multiple options
* `|` - denotes a relationship between 2 objects
* `@` - denotes the left content must match the rules of the right content
    * `| {match}` can be used as an alternative
* all other symbols can be used as parts of names so `a~b`, `a>b`, `a_b`, and `ab` are all equally valid

# Grand vs plain operators
`(`, `)`, `[`, `]`, `:`, `.`, and `,` are all grand operators and cannot be overriden. You can still run them as functions though, because all operators are secretely functions.

To run an operator as a function, escape it and wrap it in square brackets, creating a namespace with the name set to that operator:
* `[\(]` is the left-parenthesis function
    * it takes 1 argument: its contents
* `[\)]` is the right-parenthesis function
    * it takes 2 arguments: its contents, and an optional modifier
    * the modifier is applied to the contents, not the operator
* `[\[]` is the left-square bracket function
    * it takes 1 argument: its contents
* `[\]]` is the right-square bracket function
    * it takes 2 arguments: its contents, and an optional modifier
    * the modifier is applied to the contents, not the operator
* `[\{]` is the left-curly bracket function
    * it takes 1 argument: its contents
* `[\}]` is the right-curly bracket function
    * it takes 2 arguments: its contents, and an optional modifier
    * the modifier is applied to the contents, not the operator
* `[\.]` is the dot function
    * it takes 2 arguments: the left-hand side and the right-hand side
* `[\,]` is the dot function
    * it takes 2 arguments: the left-hand side and the right-hand side

Escaping the operators and then calling them as functions is not super useful, but you can do it you want to. The remember their syntax rules after being escaped. So the following 5 pieces of code are actually the same

(assume `c` and `d` are external variables with types that make sense)
Example 1:
```
var a = [\)]
var b = [\{]
a.(c, b.d)
```

Example 2:
```
var b = [\{]
(c) b.d
```

Example 3:
```
var b = [\{]
c b.d
```

Example 4:
```
(c) {d}
```

Example 5:
```
c {d}
```

Examples 3 and 5 both take advantage of implied parenthesis. These can only be used if `c` is actually assigned to some value before the example code. If `c` was replaced with some longer expression, it might require parenthesis in order to clarify the order of operations.

Function declaration. f(x) = 2x + 1
```
var f = [x]: [
    return 2 times x plus 1
]
```



