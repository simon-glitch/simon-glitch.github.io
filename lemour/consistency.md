
The key idea of the lemour language is consistency. Each symbol and smybolic letter should have a specific meaning.

Meanings of ASCII symbols:
* <code>`</code> means idk
* `~` means "optional"
* `-` means "blank" or "chain"
    * or in arithmetic: "subtract"
* `_` is considered a letter
    * it has no special meaning
* `=` means "assignment" or "equality"
* `+` means "extend" or "repeat"
    * or in arithmetic: "subtract"
* `!` means not; it's used for all forms of negation
* `@` means "reference"
* `#` means "use arithmetic"
* `$` can be used in variable names
* `%` means "compiler"
* `^` means "point to", "go to", or "read"
* `&` means "and" or "filter"
* `*` means "arbitrary" or "name"
    * or in arithmetic: "multiply"
* `()` means "group", "wrap", or "call function"
    * syntax like `(1,2)` does not form objects, without calling a function
* `[]` means "index" or "get"
* `{}` means "scope",
    * or *can be used for other special types of groupings*
* <code>\</code> is the escape character
* `|` means "or" or "alternate"
* `;` is a **statement terminator**
* `:` means "*structure*"
* `'` is used for quote literals, like 'this'
* `"` is used for quote literals, like "this"
* `,` is an **item separator**
* `<` means "move left" or "move out"
    * in arithmetic: it means "less than"
* `.` means "index", but as an operator
* `>` means "move right" or "move in"
    * in arithmetic: it means "greater than"
* `/` means "group", but as an operator
* `?` means "if" or "conditionally"
* <code>\n</code> is used as a separator between some things:
* ` ` is used as a separator between some things:
    * between operators, so they don't form compound operators
    * between letters, so they create a type
    * between numbers, so they form a based-value or custom value literal

Symbols that can form compound operators:
* <code>~-=+!@#%^&amp;*{}|:&lt;.&gt;/?</code>
* see [syntax/brackets](syntax/brackets.md#Composite_brackets) to learn how `{}` compound with othe operators

Symbols that are like *operators*, but can **not** form compound operators:
* <code>()[];'",</code>

Many operations have `#` based variants. For example, `string ?: s` (*) `int ?: n %= s` repreated `n` times as 1 string.

