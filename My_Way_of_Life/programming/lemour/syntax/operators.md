
# Operators
## Warnings on Whitespace
Whitespace is a bit janky in this language, but that allows operators to be combined together in some really cool ways.

Essentially, white space between operators is **not** ignored in this language. For example, `+ +` is not the same as `++`. The example with `++` is already the case in C++ and JavaScript, but it's more prevelant in this language, because even `< -` is not the same as `<-`.

### Example
Code 1:
```js
if(offset < - bee_count){
    auto_balance_i();
}
```
Code 2:
```js
if(offset <- bee_count){
    auto_balance_i();
}
```

Code 1 runs fine, but Code 2 crashes due to a type error:
* `[offset] is not of type [Type]!`
* this is because the `<-` operator converts the right object to the type on the left
* `<-` expects a type, like `int`, `string`, or `Animal` on the left, but it found a **value** instead

## All the operators
### Binary operators
Keep in mind, the "bin" in "binary" doesn't mean you're supposed to throw these away. In fact, "binary" is supposed to be broken up like this:
* "bi"
* "n"
* "ary"

The "bi" means "2". The "n" doesn't mean anything and is there for audio-aesthetic purposes. The "ary" means "putting stuff together and then doing things with that stuff". So, "binary" just means "take 2 things, and do something with them". Now, in this context, we are interested in an operator in particular; "operator" means "give me a value when you're done". So, "binary operator" means "put 2 things together, and give me a value".

### Addition
Whenever you read some boring coding tutorial online, they only ever explain addition, subtraction, multiplication, and division when talking about operators. Furthermore, they always seem to have this function because they aren't creative enough or smart enough to come up with anything else:
```js
Add(a,b){
    return a + b;
}
```

### Subtraction
^

### Muliplication
^

### Division
^

### Exponentiation
Some people seem to think the word "exponentially" means "quickly". It actually doesn't. The term "exponential" means in a constant proportion to itself. Some exponents are very slow, such as the exponential decay of C-14 atoms in a lump of sugar.

We use `**` notation for exponents in this language. Keep in mind, `* *` (with a space) is interpreted as 2 multiplication operations in a row and yields a syntax error.

### Modulo
Arguably the only useful non-bitwise operator on this list. If you don't know what modular arithmetic is, go get a life. We use `%` for modulo, because it looks cool and it makes our code look like a business report if we put line breaks in the right spots.

