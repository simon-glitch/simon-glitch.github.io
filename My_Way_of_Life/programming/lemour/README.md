
# Lemour
## What's That?
I've been wanting to make my own programming language for a while. I don't think I'll actually do that anytime soon, but I will write down ideas for how I want it to work. Besides, I love just describing things anyways. Describing things has always been my past-time.

## The Language
Lemour is a programming language. It's an interpreted language (meanning it runs in a VM), with both functional and object-oriented paradigms. For simplicity, the JIT-compiler compiles everything into mostly functional functions and closures, and only uses actual classes if forced too.

## Features
Since I don't like how many OOP and FP languages work, I will be not including any of their weirdness. For example, we do not have a ownership system (like what Rust has) and we do not have operator overloads.

### Functions
The language has functions. A function is a block of code, which is given a named collection of parameters before being operated on. Parameters can be modified and manipulated just like any other variable.

A function is formatted like this:
* lambda function:
    * one line function that returns the value from the 1st and only line:
    * `name .(parameters) = body`
* scoped function:
    * multi line function that supports `return` statements
    * `name .(parameters) = {mult-line body}`

#### Currying
Function parameters can be curried. Example:

```
f .(a, b) = a + b
curried_f = f .(2)
print(curried_f.(5)) // [7]
print(curried_f.(9)) // [11]
print(f.(3,3)) // [6]
print(f.(8).(20)) // [28]
```

But curring is optional:
```
print(f.(5, 9)) // [14]
```

You'll also notice that calling a function requires the use of `.`. That's because this language uses `.`s for function calls.

### Type Signatures
Variables can be given a type signature, using `:+`.

These signatures are optional, but allow the JIT compiler to optimize the program better. The interpreter throws an Error is an assignment of the wrong type is made. If you don't like these errors, then use `:~` instead. `:~` declares the expected type loosely (without actually enforcing any particular type).

Type signatures are written like this:
* strict left-hand with initial assignment:
    * `int:+ varies = value`
* strict left-hand without assignment:
    * `int:+ varies`
* strict right-hand with initial assignment:
    * `varies+: int = value`
* strict right-hand without assignment:
    * `varies+: int`
* loose left-hand with initial assignment:
    * `int:~ varies = value`
* loose left-hand without assignment:
    * `int:~ varies`
* loose right-hand with initial assignment:
    * `varies~: int = value`
* loose right-hand without assignment:
    * `varies~: int`

Yup. I got 8 type signatures! What are you gonna do about it? Cry?! Go ahead! I don't care. XD!

A type signature can also be put on a function. A left-handed signature goes before the function's name, and a right-handed signature goes after the parameter list.







