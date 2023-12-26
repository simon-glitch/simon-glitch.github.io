
So, Golang's error handling is (supposedly) superior to JavaScript's?

Imagiine we have some typical (asynchronous) Go code:
```go
func thing() (error, int) {
    err := nil;
    fooVal, fooErr := foo();
    err = fooErr;
    if err != nil {
        // special foo error handling
        return err
    }
    barVal, barErr := bar();
    err = barErr;
    if err != nil {
        // special bar error handling
        return err
    }

    return nul, barVal - fooVal;
}
```

If you are an experienced programmer, you'll notice that the number of parameters returned by the function varies. Well, in reality, the function always returns the variables declared in the second part of its header: `(error, int)` (this header is called the function "signature"). This means, that an anonymous variable of the type `int` is automatically created whenever we don't return the 2nd parameter. You can name this variable, and even initialize it in the header with a value, for more clarity.

Now, imagine how our equivalent JS code would look:
```js
const nil = new Error();

// the 1st problem is that we need to include a bunch of type nonsense
class C{
    constructor(error = nil, value = 0){
        this.error = error;
        this.value = value;
    }
    out(){
        return [this.error, this.value];
    }
}

/**
 * @returns {C}
 */
async function thing(){
    let err = nil;
    
    // and then look at all of this nasty construction and destruction!
    const [fooVal, fooErr] = (await foo()).out();
    err = fooErr;
    if(err != nil){
        // special foo error handling
        return new C(err);
    }
    
    // and then look at all of this nasty construction and destruction!
    const [barVal, barErr] = (await bar()).out();
    err = barErr;
    if(err != nil){
        // special bar error handling
        return new C(err);
    }
    
    // and then look at all of this nasty construction and destruction!
    return new C(nul, barVal - fooVal);
}
```

Ok, there must be something wrong with our JavaScript code. For example, it's the construction and destruction is janky, and it will slow down the interpreter (a bit) too! I even had to add in a tricky constant (`nil`)! We don't want that. Well, we could make things more intuitive by making a library for this, right? *I guess ... but what would our goal be with a library for this anyways? Aren't the people who made Golang just unnecessarily propogating errors*?
* Well, obviously, no. The people at Golang are very clever, and they had real reasons for making things the way they did.




