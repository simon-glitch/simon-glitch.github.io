# Mutations

## Clarifications
In programming, the idea of mutations is very important. Now, I know I am talking about "mutations" here, but mutations are only relevant because they are applied to variables. So, technically, I am just talking about variables.

I will be using code examples throughout this document. All of them are written in Python. If you have a hard time understanding any of them, you will just have to learn the basics of Python. I won't require you to have any particularly advanced knowledge of Python or programming, just basic stuff. I know some people might get offended because I will almost exclusively write this essay from a Python-based viewpoint. I apologize for that; I am just trying to make this essay easy to understand.

## Intro
Each programming "language" has different built-in rules for how variables are allowed to mutate. For example:
* Rust has an ownership system that almost forces developers to make sure they can't accidentally mutate variables in unintuitive ways.
* Java has `public` and `private` labels that can be attached to class methods and variables.
* Python has no privacy and no ownership rules - any piece of code can modify any value in scope and any value in any object in scope; class variables are simply default values, and class instances can be modified just like `dict`s.
* JavaScript (ECMAScript) has almost the same implementation as Python, except it actually allows for constants (using `const`), private class variables (using `#[name]`), and private values in objects (using symbols).

## Functions
In mathematics, a function is a black box that takes in an input and spews out an output. Why am I calling it a black box? Well, sometimes we are only concerned with the inputs and outputs of a function - not necessarily how the function achieves the output from the input. The decision to only focus on the input and output, and ignore the underlying functionality is called abstraction. The idea of abstraction is that we can simplify our thought process by only concerning our selves with the outputs, or by using an analogy to the function rather than actually understanding the function. Take, for example, the `floor` function. If you open up your graphing calculator (e.g: [desmos](https://desmos.com/calculator)) and graph `y = floor(x)`, you will see a staircase. Depending on how you are using the floor function, the stair case might be the exact analogy you need in order to use it. In which case, we can ignore whichever underlying method the computer uses to actually compute the function.

* **If you know calculus**, then you probably know how difficult integrals and derivatives are to work with. Computers use lots of tricks in order to compute these. For example, [desmos](https://desmos.com/calculator) can compute double and tripple integrals by force (without actually using a CAS). How it actually achieves this, doesn't matter to you though, since you just want it to find value of the integral (or whatever).

Anyways, let's get back to the topic of **programming**.

In programming, we use functions. Arguably, your entire computer is "made of" functions. Someone who likes "functional programming" would argue this; and if you questioned them, they would probably go off on a long tangent about mutability of pipelines or some other nonsense. I'm not here to do that. I'm here to give you a complete and thourough exaplanation of what functions **really** can be, and how you can use them.

### Definition
Let's define a function as a program that has an input and a output. Like a program, a function can be executed. Traditionally, this process of execution has the following steps:
* create a section on the call stack for this function
    * this section is sometimes called a "scope"
* copy every parameter's value, and put those values on the new section of the call stack
* run the code inside the function
    * all variables created inside the function are created in the new section of the call stack
    * variables outside the function are considered inputs to the function if they are actually used by it
* stop the function (i.e. end its execution) by using a return statement
    * typically a value can be attached to this return statement
        * we call this "returning a value"
* if we get to the end of the code inside the function, the behavior will depend on the language:
    * typically, we just return some default value
    * maybe an error is thrown, depending on the language
* when the function stops (or returns), make sure to destroy the section of the stack that we made for the function
    * sometimes we have to create a **closure** before doing this; I will explain closures later in this document

When a value is returned by a function, it is stored in a variable outside the function. This is considered an output of the function.

```py
def f(x)
    x2 = 2 + x
    return x2

y = 5
z = f(y)

print(z)
```

In the example, `f` is a function. It's input is `x`, and it's output is `z`. Notice that the output is named **outside** the function, and assigned outside the function. `x` is a parameter, so it's created in the section of the stack for `f`. `x2` is also placed in this same section of the stack, because `x2` is created **inside** the code block of `f`. However, `x2` is neither an input nor an output, because it is created inside the function, *and destroyed when the function finishes*.

### How are a function and a program the same?
If you especially versed in computer terminology, you probably know that programs are extremely complex. If you have any programming experience, you probably know that functions are simple (at least in comparison to programs). If you have any common sense, you know that a function is simply a part of a program. Obviously, a wheel and a car are not the same; the wheel is part of the car, not the same as the car. This is so obvious that you probably think I am an idiot for calling a program and a function the same.

Well, before I can justify myself in a way that you will understand, I need to ensure that you and me have the same understanding of how functions work. First, I am going to claim that a function can contain a function. Here's an example:

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    return g(3)

print(f(5)) # 21
```

As you can clearly see, `g` is inside of `f`. The implications of this are that `g` can use `x` because it is inside of `f`. The inputs of `g` are `y` and `x`. `g` would not *(necessarily)* work if it was not inside `f`, since it uses `x` from `f`. You'll also notice that `f` can use the output of `g`. If I wrote another function, let's say `h` that was not inside `f`, it would not be able to use `g`:

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    o = g(3)
    return x

mx = f(3)

def h(x):
    return o - x

mo = h(2) # Error
```

This causes an error because `h` can't use the `o` from `f`. `o` was created **inside** `f`. Therefore, it is destroyed after `return x` is executed. In general, a variable **inside** `f` stays inside `f`, and can not be an output of `f`. We could return `o` and then use it that way; but it won't be outputted by `f` by default. We have to explicitly write the code to make that happen.

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    o = g(3)
    return o

o = f(3) # o = 15

def h(x):
    return o - x

mo = h(2) # mo = 13
```

In this example, we return `o` and then create a new variable for it **outside** of `f`. This allows `h` to use `o` as input to `h`.

In summary, a function looks like this:
```
| <inputs>                                |                          | <outputs>                        |
|-----------------------------------------|--------------------------|----------------------------------|
| (parameters, after the function's name) +                          | (return value of the function) + |
| (variables outside the functions)       => [execute the function] => (other tricks)                   |
```

What are these **"other tricks"**? Well, they are the kinds of things that many programmers (especially fans of "functional programming") dislike. These tricks are:
* global variables
* object mutations
* closures

### Global Variables





