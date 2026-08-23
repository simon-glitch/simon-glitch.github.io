
# Parsing
Some notes on brackets:
* `{%` and `%}` are different than normal curly brackets.
* `[%` and `%]` are different than normal square brackets.
* `(%` and `%)` are different than normal parenthesis.
* These all allow the language to be more flexible.

Jank parser works in these steps:
1. Find all escaped characters, i.e. "\\'", '\\"', '\\+', and so on. This step creates a new string for the code text, and also an array of booleans, where each item indicates whether the corresponding character is escaped. So `hi\\ya` would become `hiya` and `[false, false, true, false]`. This makes checking for escaped characters very easy at later steps.
2. Checks for `{% language name; code %}`, which is the syntax for embedding another language inside jank. This is called a language block.
    * If you escape `%`, `{`, or `}`, the language block will not be created.
2. Checks for comments and strings. And also handles `${ code }`, which is the format for string templates inside backtick strings.
    * All strings can be multiline in Jank without issues.
3. Checks for bracket balance. It ignores brackets in strings and language blocks. Brackets in regular expressions must be balanced.
    * Regular expressions themselves are creates with `(% expression %)`.
    * New lines are allowed in regular expressions, and are ignored, meaning they do not try to match anything. If there are multiple lines, whitespace is trimmed from every line, but untrimmed whitespace in the middle of lines still matches for characters like it normally would.
    * Any `%` that is not on the inside of a bracket does not need to be escaped.
4. Split lines by `;` and `\n`.
5. Handle keywords that implement their own custom syntax.
6. Handle everything else with standard expression rules.

Some notes on curly brackets:
* A template literal is always a scope.
* Object destructuring assignments must have an assignment-related keyword on the left of them. If they don't, the parser assumes the curly brackets are a scope. Array and tuple destructuring assignments have the same requirement, just for consistency.
* The parser always treats curlies as a scope if possible. This means any curlies that can be treated as an expression on their own will become a scope, and any curlies that must be an rvalue are treated as an object literal.
* Like in JavaScript, in `({curly_content})`, the curlies will be treated as an object literal.
    * However, you can use `#` to make them be treated as a scope instead. A scope will automatically return the value on its last line, regardless of the number of semicolons following it. So in `(#{curly_content})`, the curlies are a scope.

Notes about escaped characters:
* Escaped characters in strings and regular expressions do what they do in other languages expect them to.
    * Regular expressions must have all brackets be balanced, and if you want to use `{%` or `%}` in them, you must escape escape the `%`, `{`, or `}`. When you escape these, it will prevent them from creating a language block, and the regular expression parser will also see them as escaped.
* Escaped characters in another language's code section will get converted back to their unescaped form, and then that language will parse them using its own rules. The containing brackets, `{%` and `%}`, are treated differently. They can be escaped and will be treated as part of the code. `\\{%`, `{\\%`, and `\\{\\%` all become `{%` in the inner language's code. And `%\\}`, `\\%}`, and `\\%\\}` all become `%}`.
* Escaped characters in comments will be reverted back to unescaped characters after the comment is converted in the AST. The exception to this is `[[ comment section ]]`, which creates a comment section within a comment, and is useful in code editors. Escaping the square brackets will cause no section to be created, and thus your code editor might not see it as a section.
* Escaping operators or other characters causes them to be treated like letters. So you can do `let \\;\\"\\= = 5`, and that will declare a variable named `;"=`. Emojis and characters outside the ASCII range do not to be escaped and are always treated like letters because they aren't recognized by the parser as anything specific.
* Escaping `\n` causes it to be treated like with a space.

Notes about lvalues:
* Expressions with operators and non-square brackets become lvalues by default.
* As stated earlier, destructuring assignments require an assignment keyword. This can be `assign`, `locked`, `let`, `const`, `static`, or `global`.
    * `assign` requires an assignment to come after it. As stated, its useful for using destructuring to assign to existing variables. Another use it has is it can be put inside a function call to prevent arguments from being passed as named arguments. So `f(assign x = 2)` will pass `2` as the first positional argument. `assign` makes it so no named argument `x` is passed, and instead the variable `x` (in the caller scope) is assigned to.
* With all types of assignments, every variable name or property can be followed by a type. The type itself must be a valid variable name.
* Normally, variable names must match this regex: `([A-Za-z0-9_]|\\[.\n])+`. This means you can escape any character you want (including spaces and new lines) for variable names, though that can result in your code being obtuse. However, you can also create variable names using `#`.
* `#` has a precedence directly before `##`. And `##` has a precedence directly before `:`.
* Any expression after `#` gets treated as an lvalue. This is only useful when working with functions that return references. `#x = 2` will return a `TypeError`, because `x` will returns it value rather than its reference. See Example 1 below.
* Any expression after `##` gets treated as a variable name. Whitespace is ignored. You need to wrap brackets around `##` if you're using it outside of an assignment. So for example, you could write `function (## 1 + 2)(x){do_stuff}`, to define a function named "1+2". Then to call it, you could do `(## 1 + 2)(73);`. You could also assign to the variable "1+2", regardless of whether it's a function or not. So you could write `##1+2 = "Hiya";`. `##` can also be used as an object property, since object properties must be variable names.

# Example 1
```
// here ref[string] is the return type
function myRef(idx) ref[string] {
    static x string = "Hi";
    static y string = "Hello";
    return (idx == 0) ? &x : &y;
}
```

# Features
Jank combines the features of several other languages.
* Jank generally copies a lot of the interfacts, property names, and APIs from JavaScript, especially the web APIs;
* functions can have position arguments and named arguments (feature from Python);
* arrow functions, each of which has its `this` bound to the `this` from its scope (feature from JavaScript);
* values can be referenced with `&` and dereferenced with `*` (feature from C); however, this feature has some restrictions in interpreted mode; for example, only variables in the current scope can be referenced;
* operators can be overloaded (a feature in many languages); `.`, `[ ... ]`, `[% ... %]`, assignments, and unary `&` are required to return references, while all other operators are not allowed to return references; `?`, `:`, `( ... )`, `{ ... }`, `(% ... %)`, `{% ... %}`, and unary `*` can not be overloaded; operators of most basic builtins cannot be overloaded, even though other properties can;
* binary `@@` exists as operators can be overloaded (feature from Python); `@` is used for keywords, is not an operator, and cannot be overloaded;
* `#!` at the start of a file is treated as a comment (feature from JavaScript);
* `x -> y` is a shorthand for `(*x).y` (feature from C); `->` on its own cannot be overloaded, but it will use the overloaded version of `.` when relevant;
* `async` and `Promise` (feature from JavaScript);
* template literals (feature from JavaScript), and string formatting (feature from Python); this also includes the more recent custom formatting from Python;
* `??` and `?.` operators from JavaScript; `??` can be overloaded, but `?.` cannot; `x?.y` will check for `x.isNullish` (an overloadable property), and then it will check for `x.\.` (the overload for the `.` operator); `??` will check for `x.\?\?` (the overload for the `??` operator) and if it not found, it will use `x.isNullish`;
* `expression for var_name in data` (list comprehension) from Python; there is no `of` keyword;
* iterators, generators, and generator functions; Jank uses JavaScript's property names;
* `Symbol` from JavaScript;
* `__proto__`, `Object.prototype.isPrototypeOf`, `Symbol.hasInstance`, and other prototype nonsense from JavaScript; though Jank requires certain keywords to enable these features on custom types;
* `==` does strict equality by reference unless an overload is defined; `===` can be used to check if `x` and `y` have the same reference (feature from JavaScript); `is` is not an operator or keyword;
* `Object` and `Map` from JavaScript; and `dict` (see Basic types section); `==` on objects will compare by reference, while `==` on Maps and dicts will compare by value;
* comparison by value for tuple, Arrays, Maps, and dicts also works on recursive structures; as long as the effective graph has the same shape and all of the values are the same;
* `...` (spread operator) from JavaScript;
* range indexing from Python; i.e. `my_array[start:end:increment]`, or `my_array[::]` to copy the array;
* Equalities and inequalities can be chained. With `==`, `<`, `>`, `<=`, and `>=`, it will compare every pair of values left to right, and then and them using `&&`, while will use the overload for `&&` if needed; with `!=`, it will check each value `!=` to each value that comes after it, and use overloadable `&&`; with `!==` it will do the same thing, but without overidable `&&`; with `===` it compare every value to the reference it gets from the first value, and without overidable `&&`;
* methods and functions can have multiple definitions with differen parameter and return types, and the correct one will be selected based on context;
* functions can be bound (feature from JavaScript); see Binding section;
* `const` from JavaScript, which only affects the outer reference; there is also const[] which affects the entire structure; and individual members and properties can be made const; doing this causes them to also be non-configurable (Jank copies JavaScript's entire `Object` interface);

Jank also has some unique features:
* `boolean` has a null value, which is `maybe`;
* the current version of Jank must be stated at the top of the file, as `jank [version]`; e.g. `jank 1.0` or `jank d0.2.3.11`;
    * `jank compile [version]` indicates a file should be compiled to LLVM, rather than be run in the interpreter;
    * invalid version header results in `FileError`; trying to use version header in the console also results in a `FileError`;
* `locked`, which forces syncing across threads; see Locking section;
* Jank has actual multithreading (in the interpreter), meaning it can use multiple CPU cores;
    * Jank does not have run to completion, since that would not work with multithreading;
* `@backward` can be used to create backwards variables, as an alternative to using references; these variables can only be read using `@get`; see Example 2; a backward variable cannot be referenced (with unary `&`) or dereferenced;
* as I alluded to before, some keywords start with `@`; this is to avoid filling the variable namespace with niche keywords; `@[something_invalid]` will result in `SyntaxError: @[something_invalid] is not a valid keyword`; every keyword that does not normally require `@` can also be used with `@`, which might be useful in some very specific context;
* `@import` and `@export` are required for importing and exporting; the version without `@` does not work;
* `[% ... %]` denotes **vectorized** list operations; so `[% 1,2,3 %] + 2 == [3,4,5]`; this is also useful with list comprehension;
    * `[do_stuff(x,y) for [x,y] in [[2,4,1,13,5], [0,2,1,2,84]]]` gives `[do_stuff(2,4), do_stuff(0,2)]`;
    * `[do_stuff(x,y) for [% x,y %] in [[2,4,1,13,5], [0,2,1,2,84]]]` gives `[do_stuff(2,0), do_stuff(4,2), do_stuff(1,1), do_stuff(13,2), do_stuff(5,84)]`;
    * `[do_stuff(x,y) for [x,y] in [[% 2,4,1,13,5 %], [% 0,2,1,2,84 %]]]` gives `[do_stuff(2,0), do_stuff(4,2), do_stuff(1,1), do_stuff(13,2), do_stuff(5,84)]`, because `[[% 2,4,1,13,5 %], [% 0,2,1,2,84 %]] == [[2,0], [4,2], [1,1], [13,2], [5,84]]`;
    * `[do_stuff(x,y) for [% x,y %] in [% [2,4,1,13,5], [0,2,1,2,84] %]]` gives `[do_stuff([2,4,1,13,5], [0,2,1,2,84])]`;
    * `[do_stuff(x,y) for [x,y] in [% [2,4,1,13,5], [0,2,1,2,84] %]]` gives `[[do_stuff(2,4)], [do_stuff(0,2)]]`; so the `%` does nothing;
    * `[do_stuff(x,y) for [x,y] in [% [[2,4],[1,13]], [[0,2],[1,2]] %]]` gives `[[do_stuff(2,4), do_stuff(1,13)], [do_stuff(0,2), do_stuff(1,2)]]`;
    * `[do_stuff(x,y) for [x,y] in [% 2,3 %]]` gives `[do_stuff(2,3)]`;
    * unfortunately, tuples cannot the vectorized directly in the same way, since `(% ... %)` is the syntax for a regex literal; however, if tuple is called on a vectorized list, it will return a vectorized tuple object; so `tuple([% 1,2 %]) + 10 == (11,12)`;
    * `[%%]` is the same as `new VectorizedArray()`; vectorized arrays actually keep their vectorization, even when put in other arrays; though they can change the way indexing works, which is intended, as shown in `[[% 2,4,1,13,5 %], [% 0,2,1,2,84 %]] == [[2,0], [4,2], [1,1], [13,2], [5,84]]`; `[%[% 2,4,1,13,5 %], [% 0,2,1,2,84 %]%] == [[2,4,1,13,5 %], [% 0,2,1,2,84]]`, but operations like `+` work differently on the former;
    * by default, a vectorized array passed into a function just looks like an instance of `VectorizedArray`; however, `@vectorize` can be attached to the function definition, or to the function when it is called; see Example 3;
* `@@` can be used to get the cross product of arrays or tuples; so `[a,b,c] @@ [d,e,f] == [[a,d], [a,e], [a,f], [b,d], [b,e], [b,f], [c,d], [c,e], [c,f]]`; `[a,b,c] @@ [a,b,c] @@ [a,b,c]` would give an array of 27 arrays, each of which having 3 items;
* arrays, tuple, and objects can be indexed like this as well: `my_array[1, 2, 3] == my_array[1][2][3]`; `.at` can also be used like this, so: `my_array.at(1, 2, 3) == my_array.at(1).at(2).at(3)`;
* indexing can also be vectorized: `my_array[% 3,1,10 %] == [my_array[3], my_array[1], my_array[10]]`;
* positional arguments of functions can be referenced with numbers; so `f(1 = 23, 0 = 100) == f(100, 23)`; this works because numbers are valid variable names; furthermore, `let 1 = 2;` would define a variable named "1"; accessing it requires `@n`; because numbers are numbers, you can also do math for them; so `@n(2 - 1)` would get the value for the variable naemd "1"; and `@n(f(x))`, would call `f`, and then look at its value and give you the variable whose name corresponds to that number; which is not jank at all, right? also, `my_stuff.@n(f(x)) == my_stuff[f(x)]`;
* a class can extend from multiple parent classes at once;
* a class can have multiple stages and then define members or methods as only existing during certain stages; by default, classes have the `constructing` stage during construction, and then enters the `final` stage after the constructor is done; the syntax `stage = name` sets the stage; the stage can also be seen as part of the type information, so other functions outside the class can require a certain stage; stages are usually 1 way, but you can make a stage 2 way with the `@2way` keyword; if a class extends multiple classes at once, and each of those have stages, it naively inherits the stages of both classes, which can result in some truly janky Jank code;
* modular functions (see section);

# Example 2
```
function cool_stuff(@backard your_res){
    do_stuff;
    your_res = local_res;
    do_stuff_with(@get your_res); // throws NotAllowedError, because your_res cannot be accessed inside this function, because it was not declared in this scope;
    do_stuff_with(your_res); // throws AggregateError containing a NotAllowedError and a UsageError; 
}

@backward res;
cool_stuff(res);
console.log(res); // throws UsageError: backward variables must be accessed with @get;
console.log(@get res); // works correctly;
```

# Example 3
```
@vectorize function func_a(x){
    do_stuff(x);
}
function func_b(x){
    do_stuff(x);
}
let data = [% 4,3,6 %];

// the following four are the same
func_b(d) for d in data;
func_a(data)
@vectorize func_b(data);
```

Also, `@vectorize func_b` gives a function whose string is
```
@vectorize function func_b(x){
    do_stuff(x);
}
```
and it is technically a separate function from `func_b`.

# Basic types
Jank has a reasonable number of basic types:
* Immutable:
    * `tuple`;
    * `boolean`;
    * `string`;
    * `number`;
    * `Symbol`;
* Mutable:
    * `Object`
    * `Array`
    * `Function`
    * `Set`
    * `Map`
    * `dict`
    * `list`
    * `RegExp`
    * `Date`

Notes:
* All of the type names only exist with the capitalization shown above.
* `Map` uses `get` and `set`, while `dict` stores all of its properties on it directly; this means that trying to get properties that would normally be special properties just returns the corresponding entry; so `my_dict.constructor`, will look up the entry named "constructor", rather than giving the actual constructor; to get the special property, do `my_dict.@at("constructor")`; interally, this is just syntactic sugar.
* `list` is implemented as a simple vector internally; `Array` is implemented as a deque, so inserting and removing from both ends is O(1);
* All basic types give the string name of their constructor when you use `typeof` on them; an object of any other type will give the `typeof` for whichever basic type the other type was extended from.
* It is not possible to extend from multiple basic types at once. Trying to do so gives a `ClassError`.
* It is not possible to extend immutable basic types.

`number` has a reasonable number of variants:
* `int`   and `uint`,   each of which is 32 bits;
* `long`  and `ulong`,  each of which is 64 bits;
* `int16` and `uint16`, each of which is 16 bits;
* `int8`  and `uint8`,  each of which is  8 bits;
* `int4`  and `uint4`,  each of which is  4 bits;
* `int1`, which is 1 bit; because it is only 1 bit, it is unsigned and there is no `uint1`;
* `bigint`, which is arbitrary precision; it is also signed and has no unsigned form;
* `float`, which is 64 bits;
* `float32`, which is 32 bits;
* `complex`, which uses 2 floats internally, in cartesian, making it 128 bits;
* `bigfloat`, which is an arbitrary precision float; `bigfloat.standard` can be used to generate a subtype of `bigfloat`, with specific settings; this is useful for applications where you want to use a specific settings repeatedly; it is recommended to do `bs = bigfloat.standard(your_settings)`, because BS is reflective of the difficulties of arbitrary precision;

# Binding
Keyword functions are rebindable, but arrow functions are not. Arrow functions in classes and object literals bind permanently to the object instance. Attempting to rebind an arrow function throws a `BindingError`. So arrow functions are unrebindable.

There is also the `@unrebindable` keyword, which does a similar thing. Interestingly, this can be put on a function that has not been bound yet. `this` default to `undefined`, rather than `window`, and if an unrebindable function has not been bound yet, then logically, it can be bound.

A bound function does not have the same reference as the original, unless it was defined as unrebindable to begin with. So `f == f.bind(whatever) && f !== f.bind(whatever)`. This also applies to vectorized functions, so `f == @vectorize f && f !== @vectorize f`.

Argument values can also be bound onto a function, unless it is unrebindable. This can be done with `f.bind(x = 2)`. If `x` is position, it binds the corresponding positional argument. Otherwise `x` is bound as a named argument. You can also do `f.bind(1 = 2)`, which will bind the second positional argument.

# Locking
The following four types of things can be locked:
* Variable: `locked my_var = important_data;`
* Property: `my_obj = {normal_prop: whatever, locked something: important_data};`
* Function: `locked function function_name(...){...}`, `locked (...) => {...}`, `locked async function function_name(...){...}`, or , `locked async (...) => {...}`
* Class: `locked class Class_Name{...}`

A locked variable, property, function, or class can only be used inside an async function.

A locked variable, property, function, or class cannot be referenced (with unary `&`).

When a variable is locked, only one function scope can use it at a time. Additionally, the interpreter will make other functions wait for the variable to be freed. The variable is freed as soon as the last reference to it within the scope is used. Even a no-op expression in the scope, like `my_var;` can keep `my_var` locked until the execution gets to that expression.

When a property is locked, the individual property simply behaves like a locked variable. Other properties are not affected, and the rest of the object is not affected.

When a function is locked, only one calling instance of it can exist. This prevents recursion, though that is not the primary purpose. The primary purpose is to avoid race conditions with whatever data the function modifies. Logically, only functions with side effects should be locked, but the interpreter and JIT compiler do not care and don't check for side effects.

When a class is locked, only one instance of that class can exist. Making it effectively a singleton. But like with functions, it also prevents race conditions related to that class having side effects. Classes without side effects should therefore not be locked, but again, the interpreter and JIT compiler do not care.

`@singleton` can be used on a function or class to make it a singleton function or class. When this is done, the function or class can be used outside async functions, but the singleton behavior will not be threadsafe, and the function of class will not be safe from race conditions;

# Modular functions
A modular function is a function with methods that rebind it (see binding). `@modular` can be used to make a function modular with ease. Here is an example:
```
function cool(main_arg, opt_1, opt_2, opt_3){
    do_stuff_with_all_those_args;
}
const my_cool = cool.opt_2(" | ").opt_1(3);
console.log(my_cool == cool && my_cool !== cool); // true;
my_cool("whatever");
my_cool(["a","b"]);
my_cool("x", opt_2 = "hi"); // overrides opt_2 = " | ";
cool("x", opt_1 = 3, opt_2 = " | "); // the same as my_cool("whatever");
```

Methods can also be configured to do this, and simply use this as their argument.
```
class My_Data{
    @modular toString(opt_1, opt_2){
        convert_your_data_to_a_string(obviously);
    }
}
const my_d = new My_Data();
const my_s = my_d.toString.opt_1(["+","-",".."]);
my_d.some_mutating_method();
my_d.inner_member = some_value;
// my_s still points to my_data;
console.log(my_s() == my_d.toString(opt_1 = ["+","-",".."])); //true;
```

All such methods also automatically have a static counterpart.
```
const my_ss = My_Data.toString.opt_1(["+","-",".."]);
console.log(my_s() == my_ss(my_d)); //true;
```

Many of the methods of builtins are modular methods. Most notably, `Number.toString` and `Number.fromString`. There is no `Number.toFixed`, `Number.toExponential`, `Number.toPrecision`, or , `Number.toLocale`.
* `Number.toString.locale` sets `locale` to `true` without needing to pass an argument.
* `Number.toString.notLocale` sets `locale` to `false`.
* `Number.toString.exponential` sets `exponential` to `true`, which forces scientific notation to be used.
* `Number.toString.notExponential` sets `exponential` to `false`, which prevents scientific notation from being used.
* `Number.toString.autoExponential` sets `exponential` to `maybe`, which causes scientific notation to be used based on an automatic condition (which is the default behavior).

You can replicate this behavior on your own method like so:
```
class My_Data{
    @modular toString(locale boolean, exponential boolean){
        convert_your_data_to_a_string(obviously);
    }
    @arg locale(){locale = true;}
    @arg notLocale(){locale = false;}
    @arg exponential(){exponential = true;}
    @arg notExponential(){exponential = false;}
    @arg autoExponential(){exponential = maybe;}
}
```

@arg defines a method on toString. `locale` and `exponential` are scoped in a closure of `ModularArgumentHandler`, however builtins like that are not directly accessible.

# End
