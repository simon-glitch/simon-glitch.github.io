

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

/** 1.798e+308, the largest finite number in the IEEE-754 64-bit float standard. **/
const INFINTY = (2**53 - 1) * (2 ** (1023 - 52));

/**
  * Ensure a number is finite.
  * @param {number} x number to convert
**/
const toFinite = function(x){
    x = +x;
    if(isFinite(x)) return x;
    if(isNaN(x)) return 0;
    return Math.sign(x) * INFINTY;
}

/**
 * Calculate the number of bits needed for an unsigned integer.
 * @param {Number} max_value maximum value you want to be able to store;
*/
const get_bit_count = function(max_value){
    return 2**Math.max(Math.floor(Math.log2(
        Math.max(Math.floor(Math.log2(
            max_value
        )), 1)
    ) + 1), 3)
};

/* ===
Misc
=== */

/**
  * Check if an object is "array-like".
  * - i.e. does it have a `length` property, and is not a string;
  * - or does it have an `in` iterator?
  * @param {*} obj 
  * @returns {number}
  * - `0` if the object is not array-like;
  * - `1` if it can be indexed into;
  * - `2` if it can be iterated on with `for v of`;
**/
const is_array_like = function(obj){
    if(typeof object !== "object" || object === null)
        return 0;
    if(obj.length instanceof Number)
        return 1;
    // check for `in`
    if(Symbol.iterator(obj)) return 2;
}

/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_property = function(obj, prop, value, enumerable = true){
    if(is_array_like(prop) == 2) prop = [...prop];
    if(is_array_like(value) == 2) value = [...value];
    if(
        is_array_like(prop) &&
        is_nullish(value) &&
        is_array_like(prop[0])
    ){
        value = [];
        for(let i = 0; i < prop.length; i++){
            // take 2 items if it's an iterator
            if(is_array_like(prop[i]) == 2){
                // i don't want all 37000 items from your iterator
                prop = [...prop[i][Symbol.iterator].take(2)];
            };
            value[i] = prop[i][1];
            prop[i] = prop[i][0];
        }
    }
    if(is_array_like(prop) == 0){
        prop = [prop];
    }
    if(is_array_like(value) == 0){
        value = [value];
    }
    const L = Math.min(prop.length, value.length);
    for(let i = 0; i < L; i++){
        const i_prop = prop[i];
        const i_value = value[i];
        Object.defineProperty(obj, i_prop, {
            value: i_value,
            configurable: false,
            writable: false,
            enumerable,
        });
    }
}

/**
  * Infuse the properties of the 2nd object onto the 1st object.
  * - assumes `obj1` has a copy constructor and calls it;
  * @template T
  * @param {T} obj1 1st object
  * @param {object} obj2 2nd object
  * @returns {T} object created with `obj1`'s copy constructor
**/
const infuse = function(obj1, obj2){
    const o = new obj1.constructor(obj1);
    for(let i in obj2){
        o[i] = obj2[i];
    }
    return o;
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
Printing
=== */

/**
  * Generate a function to display a sequence of objects, by printing them.
  * @param {string} sep string to separate print's arguments with;
  * - this is inserted between each consecutive argument;
  * @param {string} end string to insert at the end of print's arguments;
  * @param {string} width the maximum width of lines
**/
const print_gen = function(opt){
    const sep = "" + opt.sep;
    const end = "" + opt.end;
    const width = +opt.width;
    const time_units = (
        is_array_like(opt.time_units) ?
        [...opt.time_units] :
        ["unit"]
    );
    /**
      * Display a sequence of objects, by printing them.
      * @param {...any} items the objects to be printed;
    **/
    const print = function(...items){
        let text = "";
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            
            // fancy type-printing
            if(item instanceof Number) item = print.int(item);
            if(
                is_array_like(item) == 1 &&
                ((
                    item.length == 2 &&
                    item[0] instanceof Date &&
                    item[1] instanceof Date
                ) ||
                (
                    item.length == 3 &&
                    item[0] instanceof Date &&
                    item[1] instanceof Date &&
                    item[2] instanceof Symbol &&
                    print.TIME_UNIT_SYMBOLS[item[2]]
                ))
            ) item = print.timespan(
                item[1] - item[0],
                item.length == 2 ?
                print.SHORT :
                item[2]
            );
            if(item instanceof BigInt) item += "n";
            if(item instanceof Array){
                item = item.map(t => "" + t);
                const L = 0;
                for(let i = 0; i < item.length; i++){
                    L += item[i].length;
                    if(L > width) break;
                }
                item = item.join(
                    L > width ?
                    ",\n" :
                    ", "
                );
            }
            if(item[print.USE_WIDTH]){
                item = item.toString(width);
            }
            
            if(i > 0) text += sep;
            text += item;
        }
        const s = document.createElement("section");
        document.body.appendChild(s);
        text.split("\n").foreach(line => {
            const p = document.createElement("p");
            s.appendChild(p);
            p.innerHTML = line;
        });
    };
    
    /**
      * Generate a new instance of `print` (this method can be chained).
      * @param {string} a_sep new value for `sep`;
    **/
    print.sep = function(a_sep){
        a_sep ??= sep;
        return print_gen(infuse(
            opt, {sep: a_sep}
        ));
    }
    /**
      * Generate a new instance of `print` (this method can be chained).
      * @param {string} a_end new value for `end`;
    **/
    print.end = function(a_end){
        a_end ??= end;
        return print_gen(infuse(
            opt, {end: a_end}
        ));
    }
    /**
      * Generate a new instance of `print` (this method can be chained).
      * @param {string} a_width new value for `width`;
    **/
    print.width = function(a_width){
        a_width ??= width;
        return print_gen(infuse(
            opt, {width: a_width}
        ));
    }
    /**
      * Generate a new instance of `print` (this method can be chained).
      * @param {string} a_time_units new value for `time_units`;
    **/
    print.time_units = function(a_time_units){
        a_time_units ??= {};
        a_time_units = infuse(time_units, a_time_units);
        return print_gen(infuse(
            opt, {time_units: a_time_units}
        ));
    }
    
    /**
      * Format an integer into a string, with neat thousands separators.
      * @param {number} i the integer to format
      * @returns the formatted string
    **/
    print.int = function(i){
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
    print.timespan = function(t){
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
    Printing symbols
    === */
    print.USE_WIDTH = Symbol("print.USE_WIDTH");
    print.LETTER = Symbol("print.LETTER");
    print.SHORT = Symbol("print.SHORT");
    print.LONG = Symbol("print.LONG");
    print.TIME_UNIT_SYMBOLS = {
        [print.LETTER]: true,
        [print.SHORT]: true,
        [print.LONG]: true,
    }
    const_property(print, "USE_WIDTH", print.USE_WIDTH);
    const_property(print, "LETTER", print.LETTER);
    const_property(print, "SHORT", print.SHORT);
    const_property(print, "LONG", print.LONG);
    const_property(print, "TIME_UNIT_SYMBOLS", print.TIME_UNIT_SYMBOLS);
    
    return print;
}
const print = print_gen({
    sep: " ",
    end: "\n",
    width: 40,
    time_units: [
        ["s", "sec", "second"],
        ["m", "min", "minute"],
        ["h", "hr", "hour"],
        ["d", "day", "day"],
        ["y", "yr", "year"],
    ]
});

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
    
    print("signal: y = 2 x;");
    print("x = " + x.value);
    print("y = " + y.value);
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


