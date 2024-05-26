
# Main Idea
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

So then, how do we do that? Well, we just use `Promise`.

# How Promises Word
Fun fact, you can await any Promise:

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

# Connection Class
`Connection` takes in a function, `f`, and creates a sender (*a wrapper function*) around `f`. This sender acts as a new version of `f` which can trigger recipients via a promise.

`Connection` returns a `Connection` object. This object has a `.sender`, which is the sender function I just described, and a `.receive` function, which allows you to make a new recipient for the sender.

Example:
```js
const co = new Connection(f);
const fn = co.sender;
const key_press = co.receive;

addEventListener("keydown", fn);

do_stuff = async function(){
    await key_press();
    print("cool message");
};

do_stuff();
```

# What It Is Doing
This means that `co.receive` actually creates and returns a promise. The promise it returns is only actually resolved when `co.sender` is called. So, `co.sender` resolves a promise, which will trigger anything that awaits `co.receive`. Cool.

Now, one last thing: `co.receive` create a new promise each time, and multiple promises can be waiting for `co.sender` at a time. `co.sender` will trigger (*resolve*) all of the promises that `co.receive` has created, and will trigger each only once. Keep in mind, a promise can only be resolved once. This is why you have to call `co.receive` again each time you want to wait for `co.sender`.

This `Connection` class that I've created is actually a lot like how event listeners work. You can repeatedly wait for event listeners, but the same event is not supposed to trigger mutliple times, even though it might be sent to multiple functions due to event propogation. The `Connection` doesn't have built in promise propogation, but I don't think that's really necessary. If you want that, you can code up a `Propogating_Connection` class of your own for that purpose.

# Performance?
If you're worried about the performance of creating new promises like this, then don't use promises or async to begin with, and maybe even consider swapping to a different language. The slow down you get from using the `Connection` class is miniscule. If you do end up having performance issues, I sugges that you try to remove any promises that are not necessary. JavaScript has to do a lot of extra work under the hood to handle promises, using its own event loop. This event loop stores each promise and extra data about whether it's finished and how important it is. All of the memory handling required to create and modify the parts of this structure can easily create a huge performance hit.

# Promise Splitting
As I said, the `Connection` class works a lot like an event handler. You can have multiple event listeners attached to the same event:

```ts
let a1_boi :KeyboardEvent;
let a2_boi :KeyboardEvent;

check_same = function(){
    const same = (a1_boi == a2_boi);
    console.log("Events are the same? " + (same ?"Yes" :"No"));
};

addEventListener("keydown", function a1(e: KeyboardEvent){
    console.log("a1 heard that!");
    a1_boi = e;
});
addEventListener("keydown", function a2(e: KeyboardEvent){
    console.log("a2 heard that!");
    a2_boi = e;
    
    // wait and then check if the event objects are equal
    setTimeout(check_same, 100);
});
```

I ran this code and got `Events are the same? Yes`. This means that:
* one "keydown" event triggers both listeners,
* and both listeners do in fact see the same event object.

You can do the same thing with `co.receive`. Here's an example:

```ts
const co = new Connection(f);
const fn = co.sender;
const key_press = co.receive;

addEventListener("keydown", fn);

const a_promise: Promise = key_press();

let a1_stuff = async function(){
    await a_promise;
    print("cool message (a1)");
};
let a2_stuff = async function(){
    await a_promise;
    print("cool message (a2)");
};

a1_stuff();
a2_stuff();
```

Pressing down the key will trigger both events. Keep in mind: if you create the promise inside the async function, by calling `key_press()` each time, you will be able to have the async function be called again later. If you create the promise **outside** the async function, an error will be thrown inside the async function when you try to await the promise a 2nd time, because the promise already resolved at an earlier point in time. What I'm saying is that the following code does not work:

```ts
const a_promise: Promise = key_press();

let a3_stuff;
a3_stuff = async function(){
    // this works once (the 1st time), but throws an error the 2nd time around;
    await a_promise;
    print("cool message (a3)");
    
    setTimeout(a3_stuff());
};

a3_stuff();
```

This code however, **does** work, because it creates a new promise each time:

```ts
let a4_stuff;
a4_stuff = async function(){
    await key_press();
    print("cool message (a4)");
    
    setTimeout(a4_stuff());
};

a4_stuff();
```

# Side Comment
I really hope that there aren't too many code examples in this documentation file or anything. And I hope I didn't waste my time explaining how promises (and async functions) *actually* work. You'll notice that I don't actually use the promise API's built-in `.then` and `.catch` methods. That's because those are recursive (you have to recurse / nest another function inside of the `.then` call), and I wanted to have a non-recursive way to use promises.


