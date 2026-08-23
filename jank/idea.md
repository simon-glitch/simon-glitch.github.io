
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
* Jank generally copies a lot of the property names and APIs from JavaScript, especially web APIs;
* functions can have position arguments and named arguments (feature from Python);
* arrow functions, each of which has its `this` bound to the `this` from its scope (feature from JavaScript);
* values can be referenced with `&` and dereferenced with `*` (feature from C); however, this feature has some restrictions in interpreted mode; for example, only variables in the current scope can be referenced;
* operators can be overloaded (a feature in many languages); `.`, `[ ... ]`, `[% ... %]`, assignments, and unary `&` are required to return references, while all other operators are not allowed to return references; `?`, `:`, `( ... )`, `{ ... }`, `(% ... %)`, `{% ... %}`, and unary `*` can not be overloaded;
* binary `@@` exists as operators can be overloaded (feature from Python); `@` is used for keywords, is not an operator, and cannot be overloaded;
* `#!` at the start of a file is treated as a comment (feature from JavaScript);
* `x -> y` is a shorthand for `(*x).y` (feature from C); `->` on its own cannot be overloaded, but it will use the overloaded version of `.` when relevant;
* `async` and `Promise` (feature from JavaScript);
* template literals (feature from JavaScript), and string formatting (feature from Python); this also includes the more recent custom formatting from Python;
* `??` and `?.` operators from JavaScript;
* `expression for var_name in data` from Python;
* iterators, generators, and generator functions; Jank uses JavaScript's property names;
* `Symbol` from JavaScript;
* `__proto__`, `Object.prototype.isPrototypeOf`, `Symbol.hasInstance`, and other prototype nonsense from JavaScript; though Jank requires certain keywords to enable these features on custom types;

Jank also has some unique features:
* `boolean` has a null value, which is `maybe`;
* the current version of Jank must be stated at the top of the file, as `jank [version]`; e.g. `jank 1.0` or `jank d0.2.3.11`;
    * `jank compile [version]` indicates a file should be compiled to LLVM, rather than be run in the interpreter;
    * invalid version header results in `FileError`; trying to use version header in the console also results in a `FileError`;
* `locked`, which forces syncing across threads; see Locking section;
* Jank has actual multithreading (in the interpreter), meaning it can use multiple CPU cores;
    * Jank does not have run to completion, since that would not work with multithreading;
* `@backward` can be used to create backwards variables, as an alternative to using references; these variables can only be read using `@get`; see Example 2; a backward variable cannot be referenced (with unary `&`) or dereferenced;

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


