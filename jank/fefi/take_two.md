
Some general features for the language.
* Null values. Every type has a null value. Main types `{boolean: maybe, string: undefined, number: NaN, array: none, object: nil, function: pass, symbol: #--;, regex: #!}`. I like how this also means that I have all of the keywords from other languages. That won't cause confusion, right? Symbol is  `#--;` to act as a comment in Python, Lua, and assembly. Regex is `#!` bang for a similar reason.
  * Each defined class also has its own specific null value, at ClassName.null.
* Control-flow keywords. Like Python, this language has extra interesting keywords for control flow.
  * `fail`, `succeed` -> like `break`, but for general failure and success;
  * `on break` -> opposite of Python's `for-else`;
  * `on no break` -> equivalent of Python's `for-else`;
  * `on fail`, `on succeed` -> similar, but for `fail` and `succeed`;
  * `on error` -> equivalent of Python's `except` or JavaScript's `catch`;
  * `finally` -> same as other languages, but can be used in extra places, like in Python; `throw`, `fail`, and `succeed` within `on ...` blocks will cause `finally` blocks to not run;
  * `then` -> can be used after an if statement`; required in a full `if-else` statement; the `else` and `then` components can also be swapped;
* Read / Write trickery:
  * `const` -> works like JavaScript's `const`;
  * `cref` -> makes a *reference* have a constant location but allows easy read/write of its value;
  * `ref` -> defines something as a reference, or reassigns the location of its reference; normal assignments automatically dereference, since this is an interpreted language;
  * `open` -> opens a variable so it is writeable; opening a function makes it callable;
  * `close` -> closes a variable so it is temporarily readonly; closing a function makes it uncallable;
  * `door` -> allows `open` / `close` on a variable; they are actually not allowed by default;
  * `unlock` / `lock` -> class version of `open` / `close`, where only members in the class can open or close the member;
  * `readonly` -> works like Java's `final` and TypeScript's `final`;
  * `roref` -> `readonly` version of `cref`;
  * `await`, `if`, and `while` can all be combined with `open`, `close`, `unlock`, `lock`, checking for their status. `await` waits for the status to change, like React's `useEffect`.
  * `static` only allowed on class members; if you want your function to be clever, setup the closure yourself!
* Operators. I have added new operators, which can all be overloaded of course:
  * `...` spread operator from JavaScript;
  * `~~` used like the `for`-list syntax seen in Python and desmos, simplifying list operations; `~#` does automatic list vectorization;
  * `~>` shifts an element into the start of a list; `list ~> new_element`;
  * `<~` shifts an element into the end of a list; `list <~ new_element`;
  * `~<` unshifts the first element out of a list (this is an assignment); `removed_element ~< list`;
  * `>~` pops the last element out of a list (this is an assignment); `removed_element >~ list`;
  * `=~>` reduces a list to an accumulated value; `list =~> accumulator_name ~~> {accumulator expression using accumulator_name}`
  * `<~=` same as before but iterates the list in reverse order; syntax is same order; `list <~- acc <~~ expr`
  * `#~` transposes a matrix;
  * `<~>` zips two lists together; `a <~> b` is the same as `#~[...a, ...b]`

So many fun ideas!
