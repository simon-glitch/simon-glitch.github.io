
# Functions
The language has functions. A function is a block of code, which is given a named collection of parameters before being operated on. Parameters can be modified and manipulated just like any other variable.

A function is formatted like this:
* lambda function:
    * one line function that returns the value from the 1st and only line:
    * `name .(parameters) = body`
* scoped function:
    * multi line function that supports `return` statements
    * `name .(parameters) = {mult-line body}`

## Currying
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
* `f:x` instead of `f(x)`
* `g :x :y` instead of `g(x, y)` or `g(x)(y)`

This also allows you to make your code more "clear":
* `f:(x,y)` instead of `f(x,y)`
