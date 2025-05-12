



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

/** Calculate the number of bits needed for an unsigned integer. */
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

/*
# Function factory Busy
Make a function that is resistant to asnychronous execution. Busy works by making a wrapper around f, named busy_f. Only one instance of the function can be called at a time. This means the function can safely modify variables without having to worry about memory collisions from separate threads. This is very similar to a mutex lock and is much simpler than event throttling.
- "busy_f" is an instance of Busy;
- returns {function} busy_f
    - calling busy_f will return immediately return Busy.busy if busy_f is being run on a separate thread;
    - otherwise, busy_f will call f on this thread;
    - this means that, assuming f is privately stored in the scope of busy_f, there can only ever be 1 instance of f running at a given time;
    - essentially, busy_f "protects" f from parallel execution;
    - busy_f will return whatever f returns if it actually runs f;
    - property {bool} busy_f.busy - whether busy_f is busy;
- usage: Busy(f)
- parameters:
    - {function} f: the function that busy_f will call;
    - {boolean} is_async: whether busy_f should be async; f will be awaited if it is;
- members:
    - {boolean} busy [readonly]: whether busy_f is busy;
    - {boolean} Busy.m_busy [private]: internal variable for busy_f.busy;
    - {string} name: the name of busy_f; defaults to f.name;
*/
const Busy = (function _s_Busy(){
    const m_busy = Symbol("Busy.m_busy");
    return function Busy(f, is_async = false){
        if(!(f instanceof Function)){
            throw TypeError("parameter f in Busy(f) must be a function;");
        }
        
        // the primary function
        const busy_f_b = function busy_f(){
            if(busy_f[m_busy].length > 0){
                return Busy.busy;
            }
            const o = {};
            busy_f[m_busy].push(o);
            if(busy_f[m_busy][0] !== o){
                return Busy.busy;
            }
            
            let res;
            try{
                res = f.apply(this, arguments);
            }
            // catch any errors f throws, since otherwise we would be perpetually busy doing nothing as soon as f throws an error;
            catch(e){
                busy_f[m_busy] = [];
                // make sure to rethrow since this wrapper is supposed to be non-invasive
                throw e;
            }
            busy_f[m_busy] = [];
            return res;
        };
        // apply async wrapper if necessary
        const busy_f = (
            is_async ?
            async function(){
                res = busy_f();
                if(res !== Busy.busy){
                    res = await res;
                }
                return res;
            } :
            busy_f_b
        );
        
        /** @type {object[]} */
        busy_f[m_busy] = [];
        /** @type {string} */
        busy_f.name = f.name;
        Object.defineProperty(busy_f, "busy", {
            get: (() => busy_f[m_busy].length > 0),
            enumerable: true,
            configurable: false,
        });
        return busy_f;
    };
})();
Busy.busy = Symbol("Busy.m_busy");
fast_const_prop(Busy, "busy");

/* ===
HTML Inputs
=== */

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
Frame handler
=== */

/*
# Class Frame
A frame handler. This can be used to handle animations, or to gradually do computations that take a long time. frame.start starts the frame handler, causing it to tick every frame. frame.stop stops it.
- "frame" is an instance of Frame;
- parameters:
    - {object} options: overrides the default values for each of the public member variables of frame that are specified in option;
    - {number} options: if a number for options is passed in, it overrides the default value for mspf;
- members:
    - {number} mspf: the number of milliseconds to wait between frames; this number is used to set the tick speed in window.setInterval; defaults to 16;
    - {number} on_tick: list of functions to run when frame.tick is called; i.e. these functions are run every tick or frame; defaults to [];
    - {Frame.stop | Frame.break | Frame.continue} on_error: what frame.tick should do when an error occurs in one of the on_tick functions;
    - {Error} error: the last error returned by any call to frame.tick;
# Methods
- {() => Symbol | Error} tick:
    Ticks the function, and runs every function in frame.on_tick, in order.
    If an error occurs in one of the functions, it will be saved in frame.error, and handled differently depending on the value of frame.on_error:
    - case Frame.stop: the frame handler stops ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.break: the frame handler continues ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.continue: the frame handler continues ticking, the error is saved in tick.error, and frame.tick continues to the next function in frame.on_tick; since multiple errors can occur, all errors thrown by all functions frame.on_tick will be aggegated together into an AggregateError which will then be saved in frame.error;
- {() => bool} start:
    Makes the frame handler start ticking, by running window.setInterval on frame.tick.
    returns:
    - {bool} succeeded: whether start successfully started ticking or not;
- {() => bool} stop:
    Makes the frame handler stop ticking, by running window.clearInterval on the approriate interval ID.
    returns:
    - {bool} succeeded: whether stop successfully stopped ticking or not;
*/
const Frame = (function _s_Frame(){
    const m_id = Symbol("Frame.m_id");
    const m_running = Symbol("Frame.m_running");
    const m_on_error = Symbol("Frame.m_on_error");
    
    // all valid options;
    const options_v = [
        "mspf",
        "on_tick",
        "on_error",
    ];
    // map of all valid options;
    const options_m = {};
    
    for(let i of options_v){
        options_m[options_v] = true;
    }
    const Frame = function Frame(options){
        // members need to be explicitly constructed
        this.on_tick = [];
        
        // # Options
        // mspf short-hand
        if(options instanceof Number && isFinite(options)){
            this.mspf = options;
            return;
        }
        // ignore null
        if(!options) return;
        // ignore non-objects
        if(typeof options != "object") return;
        // the rest
        for(let i in options){
            if(options_m[i]){
                this[i] = options[i];
            }
        }
    };
    
    // all symbol values for on_error;
    const on_error_v = [
        Symbol("Frame.stop"),
        Symbol("Frame.break"),
        Symbol("Frame.continue"),
    ];
    // this map is used to check for valid values;
    const on_error_m = {};
    const on_error_d = on_error_v[0];
    // generate the map and also make sure the symbols are accessible as static constant public members of the class;
    for(let i of on_error_v){
        const_prop(
            Frame,
            i.toString().replace(
                /^Symbol\(Frame\.|\)$/g,
                ""
            ),
            i,
        );
        on_error_m[i] = i;
    }
    
    Frame.success = Symbol("Frame.success");
    fast_const_prop(Frame, "success");
    
    // set up Frame.prototype;
    // public members
    const _ = Frame.prototype;
    _.mspf = 16;
    _.on_tick = [];
    // sanitize on_error
    Object.defineProperty(_, "on_error", {
        get: function(){
            return this[m_on_error];
        },
        set: function(oe){
            this[m_on_error] = on_error_m[oe] ?? on_error_d;
        },
        enumerable: true,
        configurable: false,
    });
    _.on_error = on_error_d;
    _.error = new Error("No errors have occured.");
    
    // private members
    _[m_id] = -1;
    _[m_running] = false;
    
    // public methods
    _.tick = Busy(function tick(){
        switch(this[m_on_error]){
            case Frame.stop: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        f?.();
                    }
                }
            }
            catch(e){
                frame.stop();
                this.error = e;
                return e;
            }
            break;
            case Frame.break: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        f?.();
                    }
                }
            }
            catch(e){
                this.error = e;
                return e;
            }
            break;
            case Frame.continue: {
                const errors = [];
                // the outer try-catch handles any errors with the iterator for on_tick array;
                try{
                    if(this.on_tick[Symbol.iterator]){
                        for(let f of this.on_tick){
                            try{
                                f?.();
                            }
                            catch(e){
                                errors.push(e);
                            }
                        }
                    }
                }
                catch(e){
                    errors.push(e);
                }
                if(errors.length > 0){
                    const e = new AggregateError(e, "Tick Errors");
                    this.error = e;
                    return e;
                }
                break;
           }
        }
        return Frame.success;
    });
    _.start = function(){
        if(this[m_running]) return false;
        this[m_id] = window.setInterval(this.tick.bind(this), this.mspf);
        this[m_running] = true;
        return true;
    };
    _.stop = function(){
        if(!this[m_running]) return false;
        window.clearInterval(this[m_id]);
        this[m_id] = -1;
        this[m_running] = false;
        return true;
    };
    
    // prevent methods from being modified, since that would be silly;
    fast_const_prop(_, "tick");
    fast_const_prop(_, "start");
    fast_const_prop(_, "stop");
    
    return Frame;
})();


const f = new Frame();


let clicks = 0;
let clicks_this_tick = 0;
let reset_clicks = false;
let ticks = 0;
let time_0 = new Date;
let time_1 = new Date;
let dt = 0;
let dt_smooth = 0;
const dt_smooth_m = 1/8;

f.on_tick.push(function handle_clicks(){
    const ctt = clicks_this_tick;
    clicks_this_tick = 0;
    if(reset_clicks){
        clicks = 0;
        reset_clicks = false;
    }
    else{
        clicks += ctt;
    }
});

f.on_tick.push(function track_time(){
    const now = new Date;
    dt = (now - time_1);
    dt_smooth = (
        dt_smooth * (1 - dt_smooth_m) +
        dt * dt_smooth_m
    );
    time_1 = now;
    if(clicks){
        ticks++;
    }
    else{
        ticks = 0;
        time_0 = new Date;
    }
});

f.on_tick.push(function update(){
    let t = "";
    let te = (time_1 - time_0) / 1000;
    t += "Clicks: " + clicks + "<br>";
    t += "Ticks: " + ticks + "<br>";
    t += "dt: " + dt + "<br>";
    t += "dt smooth: " + (dt_smooth).toFixed(1) + "<br>";
    t += "Time elapsed: " + (te).toFixed(3) + " seconds<br>";
    t += "tps: " + (ticks / te).toFixed(1) + "<br>";
    t += "cps: " + (clicks / te).toFixed(1) + "<br>";
    stats.innerHTML = t;
});

btn.addEventListener("click", function my_click(){
    clicks_this_tick++;
});
reset.addEventListener("click", function my_reset_clicks(){
    reset_clicks = true;
});

f.start();


/* ===
Example section
=== */

/**
  * Description
  * @param {t_0} p_0 description;
  * @param {t_1} p_1 description;
**/
let example_fn = function(p_0, p_1){
    
};



