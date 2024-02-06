
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




