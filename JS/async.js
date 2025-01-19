

/* ===
Math and data types
=== */

/**
  * Use the nullish coalescing operator to check is a value is nullish.
  * @param {any} value the value of object to check;
  * @returns whether the value is nullish (i.e. `null` or `undefined`);
**/
const is_nullish = function(value){
    let b = false;
    value ?? (b = true);
    return b;
};

/** Calculate the number of bits needed for an unsigned integer. */
const get_bit_count = function(max_value){
    return 2**Math.max(Math.floor(Math.log2(
        Math.max(Math.floor(Math.log2(
            max_value
        )), 1)
    ) + 1), 3)
};

/**
  * Format an integer into a string, with neat thousands separators.
  * @param {number} i the integer to format
  * @returns the formatted string
**/
const print_i = function(i){
    if(!isFinite(i)){
        return i + "";
    }
    i = Math.floor(i);
    
    let text = "";
    let log = Math.floor(Math.log10(i));
    log -= log % 3;
    i /= 10**log;
    text += Math.floor(i);
    i %= 1;
    while(log > 0){
        text += ",";
        i *= 1000;
        text += (
            (1000 + Math.floor(i)) + ""
        ).slice(1);
        i %= 1;
        log -= 3;
    }
    return text;
};

/**
  * Format a length of time, converting the number of milliseconds to a neat string.
  * @param {number} t the length of the time interval, in milliseconds
  * @returns the length of the time interval, in seconds, formatted to a string
**/
const print_t = function(t){
    if(!isFinite(t)){
        return t + " seconds";
    }
    
    let sign = "";
    if(t < 0) sign = "-", t = -t;
    let ms = t % 1000;
    let whole = (t - ms) / 1000;
    return (
        sign +
        whole +
        "." +
        (
            (1000 + ms) + ""
        ).slice(1) +
        " seconds"
    );
};

/* ===
Promises
=== */

/**
  * Simply make a promise, and extract its resolve and reject functions.
  * @returns {[Promise, (value: any) => void, (reason?: any) => void]}
**/
const q_promise = function(){
    const p = [];
    p[0] = new Promise((a_res, a_rej) => {
        p[1] = a_res;
        p[2] = a_rej;
    });
    return p;
};

/**
  * Wait a fixed amount of time.
  * Promise will resolve with the value `setTimeout` passes into its handler.
  * @param {number} t the number of milliseconds to wait.
**/
const wait = function(t){
    const p = q_promise();
    setTimeout(p[1], t);
    return p[0];
};

/**
  * Wait until a condition is true, checking every `mspf` ms.
  * Promise will resolve with the total amount of time it took in ms.
  * @param {Function} condition the condition to check; called as `condition(t: number)`, where `t` is the number of milliseconds that have passed so far; this function resolves when `condition(t)` is `true` or truthy;
  * @returns {Promise<number>}
**/
const wait_until = function(condition, mspf){
    const p = q_promise();
    let f;
    let fid = -1;
    let ready = true;
    const t0 = new Date;
    
    f = function(){
        if(!ready) return;
        ready = false;
        
        const t1 = new Date;
        if(condition(t1 - t0)){
            clearInterval(fid);
            p[1](t1 - t0);
            return;
        }
        
        ready = true;
    };
    
    fid = setInterval(f, mspf);
    
    return p[0];
};

/**
  * Wait for an event to trigger on an element.
  * @param {EventTarget} element the element of DOM node to listen to an event on
  * @param {string} event what type of event to listen for; i.e. `"click"`, `"keydown"`, etc.;
  * @param {(Event: e, p: [Promise, (value: any) => void, (reason?: any) => void]) => void} callback (optional) callback to handle the event and the promise; the promise passed to `callback` is the same promise that is returned by `wait_for`;
  * @returns {Promise<Event>} promise reolving to the `Event` object given when the event triggered on the element
**/
const wait_for = function(element, event, callback){
    const p = q_promise();
    
    let ready = true;
    const f = function(e){
        if(ready == false) return;
        ready = false;
        
        if(is_nullish(callback))
            p[1](e);
        else
            callback(e, p);
        
        ready = true;
    };
    
    p[0].finally(function(){
        element.removeEventListener(event, f)
    });
    element.addEventListener(event, f);
    
    return p[0];
};

HTMLInputElement.prototype.disable = function(){
    this.disabled = true;
};
HTMLInputElement.prototype.enable = function(){
    this.disabled = false;
};

/*
useful snippet:
    addEventListener("keydown", (e)=>console.log(e.key))
*/

/**
  * Pass a promise only when the event key is triggered.
  * @param {KeyboardEvent} e event describing the way the keyboard was used
  * @param {[Promise, (value: any) => void, (reason?: any) => void]} p promise data
 */
const enter_key = function(e, p){
    if(e.key === "Enter")
        p[1](e);
};

/**
  * Set of keyboard-based input types.
**/
const KBIT = {
    "text": true,
    "number": true,
};

/**
  * Wait for an input, just like with Python's `input` function, except better because it uses an HTML element!
  * @param {HTMLInputElement} input where the input is coming from
**/
const wait_for_input = async function(input){
    /* only works on a disabled input */
    if(!input.disabled) throw new Error("input was not disabled");
    
    input.enable();
    await wait_for(
        input,
        KBIT[input.type] ?"keydown" :"input",
        KBIT[input.type] ?enter_key :undefined
    );
    input.disable();
    
    return input.value;
};

const print = function(text = ""){
    const p = document.createElement("p");
    document.body.appendChild(p);
    p.innerHTML = text;
};

class Signal{
    _value = undefined;
    /** @type Signal[] */
    children = [];
    /** @type Signal[] */
    parents = [];
    get value(){
        return this._value;
    }
    #updating = false;
    set value(arg){
        if(this.#updating){
            throw new Error(
                "Signal Error: tried to update signal"+
                "while already updating (causing an update loop);"
            );
        }
        if(this._value !== arg){
            this._value = arg;
            for(let i = 0; i < this.children.length; i++){
                this.children[i].ontick();
            }
        }
        return this._value;
    }
    ontick(){}
    /**
      * Check if this signal has the given child.
      * @param {Signal} child child to check for;
      * @returns {bool} whether this signal has the child;
    **/
    hasChild(child){
        for(let i = 0; i < this.children.length; i++){
            if(child === this.children[i]) return true;
        }
        return false;
    }
    /**
      * Check if this signal has the given parent.
      * @param {Signal} parent parent to check for;
      * @returns {bool} whether this signal has the parent;
    **/
    hasParent(parent){
        for(let i = 0; i < this.parents.length; i++){
            if(parent === this.parents[i]) return true;
        }
        return false;
    }
    /**
      * Add another signal as a child of this signal.
      * - This does not update the child or automatically make the relationship symmetric.
      * @param {Signal} child child to add;
      * @returns {bool} whether this signal already had the child;
    **/
    addChild(child){
        for(let i = 0; i < this.children.length; i++){
            if(child === this.children[i]) return true;
        }
        this.children.push(child);
        return false;
    }
    /**
      * Add another signal as a parent of this signal.
      * - This does not update the parent or automatically make the relationship symmetric.
      * @param {Signal} parent parent to add;
      * @returns {bool} whether this signal already had the parent;
    **/
    addParent(parent){
        for(let i = 0; i < this.parents.length; i++){
            if(parent === this.parents[i]) return true;
        }
        this.parents.push(parent);
        return false;
    }
    /**
      * Remove another signal as a child of this signal.
      * - This does not update the child or automatically make the relationship symmetric.
      * @param {Signal} child child to remove;
      * @returns {bool} whether this signal already had the child;
    **/
    removeChild(child){
        for(let i = 0; i < this.children.length; i++){
            if(child === this.children[i]){
                this.children.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /**
      * Remove another signal as a parent of this signal.
      * - This does not update the parent or automatically make the relationship symmetric.
      * @param {Signal} parent parent to remove;
      * @returns {bool} whether this signal already had the parent;
    **/
    removeParent(parent){
        for(let i = 0; i < this.parents.length; i++){
            if(parent === this.parents[i]){
                this.parents.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /** 
      * Remove both sides of each relationship between this object and its parents and children.
      * - i.e. call `removeChild` on each parent and call `removeParent` on each child;
      * - useful for deleting a signal;
      * - is not recursive, since signals don't have a strict hierarchy;
    **/
    remove(){
        for(let i = 0; i < this.parents.length; i++)
            this.parents[i].removeChild(this);
        for(let i = 0; i < this.children.length; i++)
            this.children[i].removeParent(this);
    }
    /**
      * A signal. It works just like the "signals" in other libraries. You can add children, which depend on the signal, and parents, which the signal depends on.
      * @param  {...Signal} parents a list of signals that this signal depends on; you can also configure parents and children by using `addChild`, `addParent`, and the other methods; make sure to call both the parent and child methods in order to ensure symmetric relationships, unless you don't care;
    **/
    constructor(...parents){
        this.parents = parents ?? [];
        this.children = [];
        for(let i = 0; i < this.parents.length; i++){
            parents[i].addChild(this);
        }
    }
}

/* ===
Demo
=== */

const main = async function(){
    my_text.disable();
    
    print("please input a number");
    const n = Number(
        await wait_for_input(my_text)
    );
    print("2 * that = " + (2 * n));
    
    const x = new Signal();
    x.value = 2;
    const y = new Signal(x);
    y.ontick = function(){
        this.value = this.parents[0].value * 2;
    };
    x.value = 3;
    
    console.log("signal: y = 2 x;");
    console.log("x = " + x.value);
    console.log("y = " + y.value);
};

main();

/* ===
Section
=== */

/**
  * Description
  * @param {t_0} p_0 description;
  * @param {t_1} p_1 description;
**/
let example_fn = function(p_0, p_1){
    
};


