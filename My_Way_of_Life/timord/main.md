
I've come up with a new idea for a very useful programming language.

I'll call it timord for now.

Basic features:
* `()` - denote nesting
* `(a,b)` - makes a sequence object
    * all objects are immutable, so these are too
* `[]` - escapes its contents
    * functions are defined with this
* `:` - denotes a key -> value mapping, every time
    * functions are defined with this
* `.` - triggers a key -> value mapping, every time
    * functions are run with this
* `{}` - transforms an operator by giving it additional parameters; can be used to add any number of parameters to any operator
    * `[op].(a,b,c)` does the same thing as `a op{c} b`, where `op` could be `+` or something else
* no math operators, because this language is not about math
* operators:
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

Function declaration. f(x) = 2x + 1
```
var f = [x]: [
    return 2 times x plus 1
]
```



