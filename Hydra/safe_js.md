This is an idea for a separate project that would use Hydra, combined with static type evaluation.

This replaces `eval` and `Function` with safe versions that check a long list of policies. If a policy is violated, an `IllegalError` is thrown.

The "user" refers to the author of the code that is being called by `eval` or `Function`.

# Policies
The policies are:
* Cannot override builtins. All global variables are considered builtins.
* Cannot set global variables.
* Cannot access `window`. This and the previous should be unlikely to appear since the code gets called in a function with `this` bound to `undefined`.
* All global vars use `myWindow` instead of `window`. For example, `setInterval` will get transpiled to `myWindow.setInterval`. The developer can choose which global vars to add to `myWindow`. You could also add local variables based on the context where `eval` or `Function` is being called.
* Cannot override properties of builtins. i.e. `Array.prototype.push`, `Object.entries`, etc.
* Cannot access property of builtin because it is not whitelisted. A long default whitelist will be provided, but you can customize it.
* Cannot add properties to Arrays. This includes arrays created by the user. The user is allowed to create arrays.
* Cannot access arbitrary properties of builtins / non-Objects. i.e. no `whatever[some_string]`, unless `whatever` is an object created directly by the user. The user cannot access arbitrary properties of instances of any class other than `Object` and classes defined by user. So now arbitrary properties of `whatever` if `whatever` is an instance of `Map`, `Date`, `Array`, etc. `whatever[some_string]` does not count as arbitrary access if the string can be statically evaluated.
* Cannot extend builtin class. The user is only allowed to extend the builtin class `Object`. Other classes, like `Map`, `Date`, `Array`, etc. are not allowed for extension. Even if they are allowed for general use.
* Cannot use destructuring on builtins. I could easily just check all of the properties, but it is just a bit confusing.
* Cannot access builtins non-deterministically. Something like `let myName = Object` is allowed, while `let myName = Math.random() < 0.5 ? Object : Array`. Again because it would just be confusing.
* Cannot get `constructor` of non-Object. The user can only read the `constructor` property on their own custom classes, and on any instance they make of plain `Object`. If trying to get `constructor` of an arbitrary builtin, the user will instead usually get "Cannot access property of builtin because it is not whitelisted.". However, if the constructor property was whitelisted, which would be dumb, it would still be disallowed, since "Cannot get `constructor` of non-Object." includes all objects not defined by the user.
* Cannot access arbitrary properties of an object with an undetermined type. This is because it needs to verify the object's type for some of the earlier policies.
* Where `Function.propotype.call / apply / bind` is used, the parser will rerun static type evaluation. Therefore, the user cannot pass undetermined values of `thisArg` into them.

Fun notes:
* Allowing user code to contain more calls to `eval` and `Function` should be reasonable under this system. Since each call would run the same checks. `(function(){}).constructor` is not allowed, but referencing `Function` directly would be, if you include `Function` in `myWindow`.
* `Object.defineProperty` and similar methods will be allowed as long as the user is allowed to read and write to those properties on the sepcific object.
* Psuedo classes are allowed. Meaning the user can use generic functions as constructors. Modifying `__proto__` and `constructor` on user defined objects is also allowed.

# Infinite loops
I think checking for infinite loops is pointless. For example, loops with infinite branching or recursion are not feasible to detect. Also, regular expressions can be designed to take a stupidly long time to execute. Like `(((((((((.+)\9+)\8+)\7+)\6+)\5+)\4+)\3+)\2+)\1+`, which checks for a string whose length can be factored into the product of 9 numbers (with the first factor being 1 or more, and all other factors being 2 or more). To match a string of length n, the runtime is O(n^10), which is basically infinite.

Also, I just think infinite loop detection in general just gets in the way of the user, rather than helping them find bugs.

# Usage
I am thinking of using this for a card game engine, where cards can specify JS code for custom effects. My intention though is for this to work for all cases where you'd want to run user code with `eval` or `Function`.


