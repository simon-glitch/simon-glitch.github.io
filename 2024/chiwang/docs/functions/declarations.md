
Function declarations in Chiwi are very similar to TypeScript, with some differences.

Function declarations come in too flavors:
* Arrow functions
* Keyword functions

Arrow functions can't be bound to objects. The `this` value in an arrow function depends on its scope in the code. This works exactly the same way as JavaScript's arrow functions.

# Arrow functions
Arrow functions are written like this: `(params) => {body}`

An arrow function with a single parameter (`x`) can be written like this:
* `(x) => {body}`

The `{` curly braces `}` on an arrow function can be removed. This restricts the body of the function to just a single expression, rather than a block with multiple expressions. Fortunately, this removed the need for putting a `return` statement in the function.

Arrow functions can actually be named in this language:
* a single parameter function can look like this:
    * `name x => body`
* a multiple parameter function can look like this:
    * `name (x, y) => body`

## Specifying return types
Like in typescript, the return type of an arrow function can be clarified. If the function is named, the return type can be put after the name. If the function has multiple parameters or has parenthesis around its only parameter, the return type can be put after the parenthesis. Specifying a return type after the parenthesis *and* after the name causes a syntax error (`Syntax Error: the return type of a function should only be defined once`).

If a function only has 1 parameter, and doesn't wrap that parameter in parenthesis, it needs to be named in order to have a return type specified.

Therefore, these are all the same:
* `name: int x => x * 2`
* `name (x): int => x * 2`
* `(x): int => x * 2`

These functions do the same thing, but do not specify any types at all. This could cause issues or make the code more confusing:
* `name x => x * 2`
* `x => x * 2`

`name x: int` is interpreted as `name (x: int)` rather than `name (x): int`.

Again (for clarification) this throws a syntax error:
* `name: int (x): int => x * 2`

This does not have any syntax errors and is perfectly clear:
* `name: int (x: int) => x * 2`

`name: int x: int => x * 2` is interpreted as the previous declaration and therefore does not have a syntax error either.

`name: string x: int => "$" + (x * 2)` might be confusing. Some people might read `string x` as `x` is a string. However, in Chiwi this is interpreted as:
* `name: string (x: int) => "$" + (x * 2)`
* which means `x` is an int and the function **returns** a string

Please use return types with caution.

# Keyword functions
A keyword function uses the `function` keyword, or its shorthand, `fn`. Since these are both keywords, they may not be used as variable names.

The syntax for these functions is the same as arrow functions, except:
* `=>` needs to be omitted
* the body must be a scope block (with `{` curly braces`}`)
* the `fn` or `function` keyword must be put before the name of the function
    * or before the parameter list, if the function is not named

Additionally, an unnamed keyword function can have its type specified after the function keyword. Again, specifying the type more than once is not allowed.
* `fn: int name: int (x): int {return x * 2;}`
* In this example, every `: int` is a valid place to specify, but putting it in more than one of these places causes the expression to have a syntax error.


