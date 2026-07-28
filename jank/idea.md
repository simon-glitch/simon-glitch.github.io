Jank parser works in these steps:
1. Find all escaped characters, i.e. "\\'", '\\"', '\\+', and so on. This step creates a new string for the code text, and also an array of booleans, where each item indicates whether the corresponding character is escaped. So `hi\\ya` would become `hiya` and `[false, false, true, false]`. This makes checking for escaped characters very easy at later steps.
2. Checks for `{% language name; code %}`, which is the syntax for embedding another language inside jank. This is called a language block.
    * If you escape `%`, `{`, or `}`, the language block will not be created.
2. Checks for comments and strings. And also handles `${ code }`, which is the format for string templates inside backtick strings.
    * All strings can be multiline in Jank without issues.
3. Checks for bracket balance. It ignores brackets in strings and language blocks. Brackets in regular expressions must be balanced.
    * Regular expressions themselves are creates with `(% expression %)`.
    * New lines are allowed in regular expressions, and are ignored, meaning they do not try to match anything. If there are multiple lines, whitespace is trimmed from every line, but untrimmed whitespace in the middle of lines still matches for characters like it normally would.
    * Any `%` that is not preceding a bracket does not need to be escaped.
    * `[%` and `%]` are also different than normal square brackets, allowing the language to be more flexible.
4. Split lines by `;` and `\n`.
5. Handle keywords that implement their own custom syntax.
6. Handle everything else with standard expression rules. For example, resolving whether curly brackets are a scope or an object requires a full parse. The only exception to this is that template iterals are always a scope.

Notes about escaped characters:
* Escaped characters in strings and regular expressions do what they do in other languages expect them to.
    * Regular expressions must have all brackets be balanced, and if you want to use `{%` or `%}` in them, you must escape escape the `%`, `{`, or `}`. When you escape these, it will prevent them from creating a language block, and the regular expression parser will also see them as escaped.
* Escaped characters in another language's code section will get converted back to their unescaped form, and then that language will parse them using its own rules. The containing brackets, `{%` and `%}`, are treated differently. They can be escaped and will be treated as part of the code. `\\{%`, `{\\%`, and `\\{\\%` all become `{%` in the inner language's code. And `%\\}`, `\\%}`, and `\\%\\}` all become `%}`.
* Escaped characters in comments will be reverted back to unescaped characters after the comment is converted in the AST. The exception to this is `[[ comment section ]]`, which creates a comment section within a comment, and is useful in code editors. Escaping the square brackets will cause no section to be created, and thus your code editor might not see it as a section.
* Escaping operators or other characters causes them to be treated like letters. So you can do `let \\;\\"\\= = 5`, and that will declare a variable named `;"=`. Emojis and characters outside the ASCII range do not to be escaped and are always treated like letters because they aren't recognized by the parser as anything specific.
* Escaping `\n` causes it to be treated like with a space.

