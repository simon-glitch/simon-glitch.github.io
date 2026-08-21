

Like other types, the `Function` type supports multiple operations.

Let `f`, `g`, `h`, and all variables with similar names be functions.

Let `x`, `y`, `z`, and all variables with similar names be any type.

# Composition
`f * g` is `f` composed with `g`
* `(f * g)(x) = f(g(x))`

This can also be used to call a function:
* `f * x = f(x)`
* This is not the same as [currying](#Currying).

## Exponentiation
Composition of the same function can be achieved using functional exponentiation:
* `f ** 2 = f * f`
* `f ** 3 = f * f * f`
* etc...
* `f ** x = noop` if `x < 1`, or if `x` is not finite
* `f ** x = f ** floor(x)` if `x` is not an integer
    * and `x` that can not be converted to an integer is just treated as `NaN`
        * therefore `f ** x` would `= noop`

# Currying
`f *. x` is `f` with `x` curried into it
* `f *. x = (...xs) => f(x, ...xs)`
`f(x, y, z)` can be rewritten using currying

# Coupling
`f + g` is `f` coupled with `g`
* `(f + g)(x) = (f(x), g(x))`

Coupling creates a function tuple. These are different than normal tuples, because their operators stack differently.

This can be repeated, to make a longer function tuple:
* `(f + g + h)(x) = (f(x), g(x), h(x))`

Multiple parameters can be passed in, and *each* parameter will be passed to each function.
* `(f + g)(x, y) = (f(x, y), g(x, y))`
* `(f + g)(x, y, z) = (f(x, y, z), g(x, y, z))`
* `(f + g + h)(x, y) = (f(x, y), g(x, y), h(x, y))`
* `(f + g + h)(x, y, z) = (f(x, y, z), g(x, y, z)), h(x, y, z) `
* This is intended to help make code shorter. If you want

Coupling and composition can also be combined:
* `(f + g * h)(x) = (f(x), g(h(x)))`
* `(f * (g + h))(x) = f(g(x), h(x))`
* `((f + g) * h)(x) = (f(h(x)), g(h(x)))`

## Function tuples
`fntuple` is a built-in type, not a keyword. `Function_Tuple` is an alias for the same type.
* `fntuple issubtypeof Function = true`, but the 2 classes have slightly different operators

Like a function, a function tuple can be called. It returns a tuple of the values returned by the functions its composed of, as has already been described.

`fntuple` takes in any number of functions as parameters
* `fntuple(f)` has very similar behavior to `f`
    * `fntuple(f)(x) = (f(x),)`, a normal tuple whose only item is the return value of `f(x)`
* `fntuple(f, g) = f + g`
* `fntuple(f, g, h) = f + g + h`

Since function addition is assosciative, function tuples and functions can be added interchangably. That means all of these are the same:
* `f1 + g1 + f2 + g2`
* `fntuple(f1, g1) + f2 + g2`
* `f1 + fntuple(g1, f2) + g2`
* `f1 + g1 + fntuple(f2, g2)`
* `fntuple(f1, g1) + fntuple(f2, g2)`
* `fntuple(f1, g1, f2, g2)`
* `fntuple(f1, g1, f2 + g2)`
* `fntuple(f1 + g1, f2 + g2)`
* `fntuple(f1, g1, fntuple(f2, g2))`
* `fntuple(fntuple(f1, g1), fntuple(f2, g2))`

Normal tuples aren't like this, since they keep their nesting when added.
* i.e. normal tuples don't have assosciative addition by default.

### Mapping
`fntuple` also has a `map` method. This maps each function in the tuple.

`(f1 + f2).map(f => )`

