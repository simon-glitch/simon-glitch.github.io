# Updated ideas for Jank programming language
Jank is built on the ideas of many other languages, but some of its most notable features provide a lot of jankiness:
* The craziest tech stack ever:
    * No technical debt
        * All files must start with the version of Jank, Janktron, or the language compiler that they are using
        * Each version of Jank / Janktron supports files written in previous versions, but it might implement things differently, resulting in better or worse performance; or sometimes, features not working due to obscure bugs
        * Specifications and anything else will be similarly flexible and lenient
        * Technical debt is the bane of all engineers
    * Interpreted language
    * The parser, JIT compiler, and runtime are all written in Jank bytecode and run in Janktron
        * User code is also run in the same space, and this doesn't cause security issues unless there is a serious bug in the runtime or Janktron
    * The VM (Janktron) is feature rich, with a lot of builtins for important things, to allow the prior point to act as a plus
        * For example there are no pointers since Jantron handles references for you
    * Janktron is technically an independent executable with its own programming language, and could thus be used completely separately from "Jank"
    * The Jank parser and runtime are actually compiled from a language definition, which is written in JSON
        * The language builder that does this is another independent application written in Jank
        * Other programming languages that are completely different could be defined using this same system and then run on Janktron
* A large variety of builtin number types
    * Complex numbers, `BigInt`
    * `EternalF`, which implements the numbers from eternity.js
    * `PrecisionF`, which has custom precision like decimal.js but is base 2
    * `DecimalF`, which is like decimal.js's `Decimal`
* Builtin mutex trickery
    * As well as other features like singleton classes and singleton functions
    * There are no awkward methods or weird stuff since all of the actual mutex logic is abstracted away
* Janktron is multithreaded
    * The bytecode has many low level options to handle this
* Regular expressions have some fancy parser-like features added but are kept pretty simple
    * The parser itself uses no such expressions internally, and instead uses proper parsing techniques
* "maybe", which is the Boolean version of null
    * This throws an error when used in if statements, and null, undefined, and NaN coerce to this value
    * This is intended to make code more clear
    * Other types can also define "null values", which all coerce similarly; it goes without saying that coercing and handling these values is easy
* More types are considered "primitive", like `Date`, `RegExp`, etc.
* Builtin types for common data structures, like multiple types of hash tables, linked lists, deques, black-red binary trees, and those hash set things that are really cool
* All of your favorite features from other languages
    * Java's final
    * Clojure's weird functions
    * Python's decorators
    * Interfaces
    * Generators
        * Multidimensional generators
    * JavaScript's object properties
    * Abstraction on every aspect of types
        * i.e. custom isInstanceOf, isConstructorOf, isPrototypeOf
        * classes that construct other classes, i.e. class factories
    * Function composition trickery
    * Easily chain methods on types and then store those chains as special objects / functions
    * Types can be defined based on values and conditions, much like the advanced types that other languages have
        * Except ny syntax for this is more straight-forward
* `-`, `+`, `*`, `/`, `<`, and `>` are not dedicated to math
    * Use `add`, `sub`, `mul`, `lt`, and `gt` instead
    * Operators require spaces between them, so putting symbols next to each other makes distinct operators. `/-` is not the same as as `/ -`. The language takes advantage of this and implements many new operators
    * Operators for vectorization that are designed to be flexible. i.e. handling some things being treated as vectors and other things not being treated as vectors; handling multiple dimensions; creating and reducing lists; etc., all with interesting operators
    * Word versions exist for all operators, since words are often easier to read and understand, and should therefore be encouraged
    * `+` and `-` can be used in variable names; `+` must be in the middle, and `-` can be in the middle or at the start; that means the valid variables names should match this regular expression: `/-*[\w_]([\w_\d\-+]*[\w_\d]|[\w_\d]*)/`; `+` and `-` on number literals indicate the sign, however there are no unary `+` or `-` operators; notice that just `-`, `--`, `-+`, and `-+hi`, do not work as variable names; while `-a`, `--a`, and `-a+++++b` do work; this is intentional; the string `0-0` would be interpreted as `0 - 0`, which throws an error due to there being no overload for the `-` operator on numbers. The specific error message is `TypeError: No overload for ({-}, Number, Number).`; you must use `add(Number, Number)`;
* Easier ways to handle scopes and variables
    * You can directly check if a variable exists in a scope, or if the parent function has certain variables. This is intended to simplify programs, not make unreadable code. But it's up to the programmer how this is used and whether it is good or bad
* `goto` exists but it only works within the same scope
* `for-on-break` and `for-on-no-break` which work like Python's for-else and an inverted version of it
* "Policy" features for debugging
    * All kinds of fun stuff included in this, like messing with the time on Date, and hiding elements in the DOM
    * Also includes tons of features to increase or decrease security based on your needs
    * Can also turn off various features, like making it so properties cannot be defined on an object
    * All policies apply to a scope or object, meaning they are local, even the more advanced policies
    * There is a `CleanProgrammingPolicy`, which disables most other policies as well as controlling a lot of other features. This is intended to be applied to your script or project to prevent you from writing code that is too janky.
    * All policies use constructors that give `PolicyManager` instances. The settings of a policy can be managed through the instance. You can also create `PolicyKey` instances. There are two types of policy keys: restrictive and overriding. Restrictive keys apply restrictions when used on things. Overriding keys take restrictions away when using things. When taking restrictions away, those can be restrictions added by the policy manager, or they could be builtin restrictions. For example, you can create a policy to be able to set `Event.prototype.isTrusted` to `true`.
    * Policies naturally "claim" objects and scopes, meaning they prevent other policies from being used on those objects and scopes. You can create keys or change settings to allow those other policies to be applied. Most policies allow certain other policies to be added by default, since it is normal to want to add multiple policies at once.
    * In conclusion, policies let you do more of the things you want to do, make less of the things you don't want to happen happen, and allow you to debug various things more easily
    * What more could you ask for?


# Example
Example code:
```
// Time is builtin

func calculate_chaos(val1, val2) -> Int | Bool {
    # Using word-based operators for clarity
    let total = add(val1, val2);
    
    # /- tells indicates that the list should be vectorized
    # /> runs a vectorized function
    let vec_result = mul /> (val1, /- [1, 2, 3]);
    
    if (gt(total, 100)) {
        return maybe;
    }
    
    for x in range(0, 10) {
        if (x == 5) break;
    }
    on-break {
        print("We broke out early!");
    }
    
    return total;
}
```

# Tech stack
I think the tech stack will make it significantly easier for me to build the language and also for me to optimize it. Note the language builder is also written in Janktron bytecode. I also love this whole idea because I can focus on Janktron first. And the VM is the hard part, right?

And there is no recursion. So you cannot:
* Compile Janktron. It is written in Rust.
* Modify the way Janktron functions. Janktron has a lot of flexibility, and many instructions change (or select) how they function based on recent instructions, available data, and the type of data. But each instruction still effectively has a fixed set of rules that will not change.
* Change the syntax of Jank using Jank (Jank refers to a high level language, not bytecode).

It is also not intended for you to be able to change the parser's bytecode or the runtime's bytecode using Jank. This makes sense since Jank is technically independent of Janktron, even though the two things are designed for each other. Much like how C+, LLVM, and x64 are all different things with independent specs.

However, if there is a bug in Janktron or in Jank's language definition JSON, then there might be a way to modify part of the bytecode of the parser, runtime, your own program, or other programs running in the same Janktron instance.

Janktron being a Rust program is also why it gets a unique name.

The language builder is written in Janktron bytecode.

All in all, this system involves 6 different programs and 5 different languages:
* Janktron: written in Rust, runs Janktron bytecode (file extension: bytejank).
* Jank language builder: written in Janktron bytecode, compiles a Jank language JSON into a Jank parser and a Jank runtime.
* Jank language JSON: written in JSON, defines a Jank language. This could be any language, like JavaScript, Python, etc. "Jank" is a language that is part of this project and is defined using a Jank language JSON, which would refer to as the "Jank Jank language JSON", or "Jank language JSON for Jank".
* Jank parser: Written in Jank bytecode, compiles a Jank script into a Jank AST. This is generated automatically, but you could theoretically write one yourself if you wanted to.
* Jank script: Written in the language that the Jank language JSON defines. i.e. Jank, JavaScript, Python, etc. Has to be fed through the tech stack to run.
* Jank runtime: Written in Jank bytecode, compiles a Jank AST to bytecode. Can also use the Jank parser for various JIT compiling and optimization.

For simplification, the Jank language builder has a feature where you can build and bundle the Janktron, Jank parser, and Jank runtime into one simple executable. And then just use on the terminal just like `python` / `py`.
