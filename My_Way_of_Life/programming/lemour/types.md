
# Type Syntax and Behavior

## Type Inheritance


## Type Composition
Most languages have some kind of type composition system.

Typscript has `array<number>` for a list of numbers, and Python has `list[float]` for the same thing.

I kind of like Python's format, but it's still not expansive at all. Let's use their format, but expand on it.

First of all, let's have `:` be our containing operator. You can just do `list:float` for a list of floats. `:` works in a right to left order; so `list:set:float` is a list of sets, where each set is a set of floats.

### Parenthesis
You can use parenthesis on composed types without loss of generality.
* so `list:set:float` is actually `list:(set:(float))`

You can also create generators this way. Lets say you have some generic type `gen` which transforms an iterable type into an object that does the same thing but with pairs which remember the previous value.

```
history_pair = (any):{
    prev = any()
    curr = any()
    ...
}
gen = array + (iterable: any):{
    main = (p){
        any := p
        for(i = 0; i < p.length; i++){
            this[i] = p[i]
        }
    }
}
```

#### Dot Colon Syntax
But wait, won't that be confused with the function call shorthand `f:x`? Well, you're supposed to give all of the types to the class first, and then feed in the parameters. However, if you want to, you can use `.*:` to ignore any type composition parameters in the class.

In general, you can use `.:` to include one type parameter in the calling of the class.
* So, `gen_class.:(inner_type, co1, co2, co3, ...)` will give `(co1, co2, co3, ...)` to the constructor of the class, and use `inner_type` as the value of the 1st type parameter in the class.
* Furthermore, `gen_class..:(i_type1, i_type2, co1, co2, co3, ...)` will give `(co1, co2, co3, ...)` to the constructor of the class, and use `i_type1` and `i_type2` as the values of the 1st 2 type parameters in the class.
* `gen_class.*:(co1, co2, co3)` will give `(co1, co2, co3, ...)` to the constructor of the class, and set up no type parammeters.
* Finally, `gen_class.+:(i_type1, i_type2, ... co1, co2, co3, ...)` will give `(co1, co2, co3, ...)` to the constructor of the class, and use `(i_type1, i_type2, ...)` as **all** of the type parameters in the class.


### Calling Composed Types
You can call a composed type, like `set:float` and it will create a class instance with the proper type:
* `a = set:float.([3.4, 6.7])`
* `a.add("text")` throws an error, because `"text"` is a string, and `a` can only contain `float`s.

### Composed Type Currying
You can curry in composed type parameters, one or more at a time, just like how you can curry parameters into functions.


