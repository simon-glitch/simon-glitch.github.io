
Every type has a null value. The null value represents a sort of "invalid" value for that type. A null value can be returned from a function that was given invalid parameters.

A null value can also be used to represent the lack of a value, especially when there is a need to make a distinction between the null value and a 0-like value. The null value should not be confused with the 0-like value. `[]` is an empty array, but `Array.null` is an invalid array. `[]` has a length of `0`, while `Array.null` has a length of `NaN`.

Here are the null values for all of the built-in types:

| Type | Null value | 0-like value (if any) |
|------------|---------------|----------|
| `Object`   | `nil`         | `{}`     |
| `Function` | `noop`        | `fn(){}` |
| `array`    | `array.null`  | `[]`     |
| `number`   | `NaN`         | `0`      |
| `int`      | `int.null`    | `0 i`    |
| `string`   | `string.null` | `""`     |
| `boolean`  | `maybe`       | `false`  |
| `regexp`   | `/?/`         | `/()/`   |

# Accessing
The null value of some time, `T`, can simply be accessed as `T.null`. `new T(nil)` also returns `T.null`, regardless of what the constructor's code does.

# Type conversion
Unlike other type conversions, which construct a new object when the result type is not primitive, converting a null value to another type just gives the null value of that type. The constructor is still called when making a null value, but any assignments to the constructor's prototype don't do anything (when constructing new instances of the null value). So, `x: My_Type = NaN;` will simply set `x` to `My_Type.null`.

Here is an example:
```ts
class My_Type{
    constructor(){
        this.a = 0;
        this.b = 0;
    }
}
```

Now,  `x: My_Type = NaN;` gives a type error, because `My_Type` does not have a constructor to convert from `Number`, and `NaN` is an instance of `Number`.

However, `x: My_Type = nil;` **does** work, since **all** types can be constructed from `Object` by default.

## Construction of the null value
Every type has a constant null value assosciated with it. This null value is set (i.e. defined) when the class is declared. Therefore, declaring a class automatically calls its conversion constructor in order to make the null value.

Therefore, this code prints "Hello, wonderful world!":
```ts
class My_Type{
    constructor(y: Object){
        console.log("Hello, wonderful world!");
    }
}
```

If you were wondering why your code was doing this, that's why.

If you don't define a conversion constructor, then `My_Type.null` will be an empty object of very little use.

If you define a different conversion constructor, you need to define the null value in order for that conversion constructor to affect it.

```ts
class My_Type{
    constructor(y: Number){
        this.a = y;
        console.log("Hello, numberless world!");
    }
    @null = NaN
}
```

The `@null` special property defines what the null value is. `My_Type.a` will be `NaN` in the previous example, since `NaN` was passed to the conversion constructor on line 6 (`@null = NaN`).

# Null
`null` is a simple built-in function:
* `null(x) = x.null`
* it only accepts types
    * `null(0)` throws a type error because `0` is not a type (instead, it is a value)

# Isnull
`isnull` is a simple built-in function that checks if an object is the null value of its type:
* `isnull(x) = x == type(x).null`




