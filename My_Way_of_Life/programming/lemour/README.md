
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
* types
* type variables in classes
* currying
* class initialization currying
* pointers
    * *actual* pointers in compiled mode
    * and *virtual* pointers in interpreted mode

