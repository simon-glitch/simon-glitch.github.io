
The idea behind `promise_fn.js` is to allow for a more intuitive, non-recursive await syntax. Here is a quick example:

```js
menu_handler = function(){
    let x = 200;
    button.text = "Submit";
    
    await click(button);
    
    button.text = "Success!";
    send_response(x, user.data);
```

The code above is not meant to serve as a perfect example; it's just supposed to convey a general idea. Typically, calling `click(button)` would actually click the button. But we actually want this to wait for another function (an event handler) to be called, and then resume our function when that happens. This probably sounds counterintuitive to you, because promises and `async` code are often done in a backwards manner. I think it's quite intuitive for `await click(button)` to mean "what for the user to click the button.

So then, how do we do that? Well, we just use `Promise`. Fun fact, you can await any Promise:

```js
// example 1
const p = new Promise(on_construction_1);
anim_stuff = function(){
    do_stuff_a();
    res = await p;
    do_stuff_b(res);
}

// example 2
const alt_async = function(){
    do_stuff_1();
    return new Promise(on_construction_2);
};
const file_stuff = async function(){
    do_stuff_2();
    const res = await alt_sync();
    do_stuff_3(res);
    return res;
}

// example 3
const server_stuff = async function(){
    do_stuff_4();
    const res = await new Promise(on_construction_3);
    return do_stuff_5(res);
};
```

**Explanation:**
* In the 1st example, I establish that you can make a promise outside an asnyc function and then use `await` on it. This means that `await` doesn't only work on async function calls (note 1).
* In the 2nd example, I establish that a normal function which returns a `Promise` can be awaited just like an async function can.
* In the 3rd example, I establish that an async function can create a promise and then await its own promise.
* Note 1: Actually, `await` only works on `Promises`. Calling an async function actually returns a promise. This is why you can (and often should) await async calls.

**Conclusion:**
* By using the global scope, closures, and shared objects, you can pass promises around to lots of different async functions from all kinds of places. This means that you can use promises to design the control flow of your program. However, I would not recommend that, **unless** you're using it the way I am in this project.

# promise_fn
`promise_fn` takes in a function, `f`, and creates a sender (*a wrapper function*) around `f`. This sender acts as a new version of `f` which can trigger recipients via a promise.

`promise_fn` returns a `Connection` object. This object has a `.sender`, which is the sender function I just described, and a `.receive` function, which allows you to make a new recipient for the sender.

Example:
```ts
const co: Connection = promise_fn(f);
const fn = co.sender;
const click = co.receive;

addEventListener("keyup", fn);

do_stuff = async function(){
    await click();
    print("cool message");
};
```




