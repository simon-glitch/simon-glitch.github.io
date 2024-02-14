
# Functions
The language has functions. A function is a block of code, which is given a named collection of parameters before being operated on. Parameters can be modified and manipulated just like any other variable.

A function is formatted like this:
* lambda function:
    * one line function that returns the value from the 1st and only line:
    * `name ( {{parameters}} ) => {{body}}`
* scoped function:
    * multi line function that supports `return` statements
    * `name ( {{parameters}} ) => { {{mult-line body}} }`

## Lambda Functions
Much like how JavaScript has 2 anonymous function syntaxes, this language also uses that syntax, in both senses.

`function` is not a keyword, but is a built-in. As a built-in, it allows JavaScript function syntax:
* `function {{name}} ( {{params}} ){ {{body}} }`
* `{{name}} = function ( {{params}} ){ {{body}} }`

As was implied, arrow functions can be used anonymously:
* `( {{params}} ) => {{return type}} { {{body}} }` can be used on it's own
* and the named syntax can be used as an expression instead of a statement:
    * `function$ {{name}} = {{other name}} ( {{params}} ) => {{return type}} { {{body}} }`
    * in this case, you can swap which function `name` uses at a given point in time, you just need to make sure it has the write type signature

`function$` is a built-in type with no custom syntax, while `function` is a built-in module with custom syntax.

### Overriding the built-in
The `function` built-in custom syntax. So, for example, if set `function = 2`, and you want the compiler to update it's syntax rules in response you need to use `%reparse function{ {{affected code}} }` and then put your code in the `affected code`.

## Currying
*Also in [features/functions](../features/functions.md#Currying).*

Function parameters can be curried. Example:

```
f(a, b) = a + b
curried_f = f(2)
print(curried_f(5)) // [7]
print(curried_f(9)) // [11]
print(f(3,3)) // [6]
print(f(8)(20)) // [28]
```

But curring is optional:
```
print(f(5, 9)) // [14]
```

## Calling Shorthand
You can also call a function with a shorthand using `:`, like this:
* `f:.x` instead of `f(x)`
* `g :.x :.y` instead of `g(x, y)` or `g(x)(y)`

This also allows you to make your code more "clear":
* `f:.(x,y)` instead of `f(x,y)`
