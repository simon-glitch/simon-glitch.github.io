# NOTICE
Please give me feedback on this project!

I really need it and I would really appreciate it!

# TODO
This content of the files in this folder are really disorganized and in drastic need of improvement. That means I have a lot of writing to do tomorrow!

# Lemour
## What's That?
I've been wanting to make my own programming language for a while. I don't think I'll actually do that anytime soon, but I will write down ideas for how I want it to work. Besides, I love just describing things anyways. Describing things has always been my past-time.

## The Language
Lemour is a programming language. It's an interpreted language (meanning it runs in a VM), with both functional and object-oriented paradigms. For simplicity, the JIT-compiler compiles everything into mostly functional functions and closures, and only uses actual classes if forced too.

## Features
Since I don't like how many OOP and FP languages work, I will try to not include too much of their weirdness.

Features included:
* 2 operation modes:
    * compiled mode
    * interpreted mode
    * this means the software for the language itself looks like:
        * byte code compiler: compiles to lemour byte code
        * interpreter: executes lemour byte code in a "sandbox"
        * garbage collector: assists the interpreter with memory management
        * dynamic JIT compile: runs on the intepreter
        * assembly compiler: windows and linux versions
        * built-in library: implements the many built-ins
* operator overloads
    * even on **custom operators**
* variables
    * types
        * type aliases
        * type filters
        * implicit type conversions
            * on **assignments only**
    * value filters
        * automatically throw Range error without having to write repetitive code
* custom types
    * type variables in custom types
* functions
    * parameters
        * currying
        * default values
        * value filters
            * automatically throw Range error without having to write repetitive code
    * named parameters (i.e. "keyword arguments")
        * currying of names parameters
    * custom type initialization currying
    * functional values
* pointers
    * *actual* pointers in compiled mode
    * and *virtual* pointers in interpreted mode
* item-wise assignements with lists of variables and values
    * i.e. `(x,y) = (2,3);`
* literals
    * string substitutes for variable names
