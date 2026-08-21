
Like any good programming language, Chiwi supports various types.

# Built-ins
Most of the built-in types have lower-case names. Some of them have upper case names, usually because there is no reason to use them, or because they have static methods that are more useful than the constructor.

For example:
* `Function` is capitalized because its lower-case version is used to declare keyword functions
* `Object` is capitalized because its constructor is not needed in type declarations and it has a lot of static methods
* `Type` is capitalized because its lower-case version is a built-in function that does gives the type of an object

Here is the full list of built-in types:
* `Function`
* `Object`
* `Type`
* `number`
* `float` and its variants
* `int` and its variants
* `bigint`
* `complex`
* `boolean`
* `string`
* `array`
* `tuple`
* `Function_Tuple`
* `map`
* `set`
* `regexp`
* `Date`
* `Promise`
* and various other types from web APIs provided by JavaScript


# Type
Please do not confuse `type` with `Type`.

`type` is a built-in function than gives the type of the input. So:
* `type(0) = number`
* `type(0 i) = int`
* `type([]) = array`
* `type((0,)) = tuple`
* `type() = Object`
* `type({}) = Object`
* `type(nil) = Object`
* `type(type) = Function`
* `type(type + type) = Function_Tuple`
* `type(Function) = Type`
* `type(Type) = Type`

`type` ignores all values after the first parameter.

The type of every type is `Type` (see below).

## Captial Type
`Type` is the type for all types, including itself. `Type` is also the only type that is not a subtype of `Object`, which covers all other types.

`Type` accepts 1 parameter: an object specifying all of the properties and methods for a class.

So, the following 2 code blocks are the same:
```js
My_P = new Type({
    constructor(){
        this.x = 2;
    },
    y: 0,
    prod(){
        return this.x * this.y;
    },
});
```

```js
class My_P{
    constructor(){
        this.x = 2;
    }
    y = 0,
    prod(){
        return this.x * this.y;
    }
}
```

Calling `Type` on a type creates a copy of that type (if it is copyable).
* `My_P_2 = new Type(My_P);`
* or `Type My_P_2 = My_P;`

Use `Type` at your own discretion.

### Null type
`Type.null` is also a thing. Calling it returns an empty object that cannot be modified.
* `Type.null.null` is that same empty object.

Null types don't exist, and this type is pretty useless. Read [null.md](./null.md) for more information.

