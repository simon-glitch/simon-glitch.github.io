
Every type has a null value. The null value represents a sort of "invalid" value for that type. A null value can be returned from a function that was given invalid parameters.

A null value can also be used to represent the lack of a value, especially when there is a need to make a distinction between the null value and a 0-like value. The null value should not be confused with the 0-like value. `[]` is an empty array, but `Array.null` is an invalid array. `[]` has a length of `0`, while `Array.null` has a length of `NaN`.

Here are the null values for all of the built-in types:

| Type | Null value | 0-like value (if any) |
|------------|---------------|----------|
| `Object`   | `nil`         | `{}`     |
| `Array`    | `Array.null`  | `[]`     |
| `Number`   | `NaN`         | `0`      |
| `Int`      | `Int.null`    | `0 i`    |
| `String`   | `String.null` | `""`     |
| `Boolean`  | `maybe`       | `false`  |
| `RegExp`   | `/?/`         | `/()/`   |
| `Function` | `noop`        | `fn(){}` |

# Accessing
The null value of some time, `T`, can simply be accessed as `T.null`. `new T(nil)` also returns `T.null`, regardless of what the constructor's code does.

