

/* ===
Math and data types
=== */

/**
  * Use the nullish coalescing operator to check is a value is nullish.
  * @param {any} value the value of object to check;
  * @returns whether the value is nullish (i.e. `null` or `undefined`);
**/
const is_nullish = function(value){
    let b = true;
    value ?? (b = false);
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
  * @returns {Promise<Event>} the `Event` object given when the event triggered on the element
**/
const wait_for = function(element, event){
    const p = q_promise();
    element.addEventListener(event, p[1]);
    return p[0];
};

HTMLInputElement.prototype.disable = function(){
    this.disabled = true;
};
HTMLInputElement.prototype.enable = function(){
    this.disabled = false;
};

/**
  * Wait for an input, just like with Python's `input` function, except better because it uses an HTML element!
  * @param {HTMLInputElement} input where the input is coming from
**/
const wait_for_input = async function(input){
    /* only works on a disabled input */
    if(!input.disabled) throw new Error("input was not disabled");
    
    input.enable();
    wait_for(input, "input");
    input.disable();
    
    return input.value;
};


/* ===
Demo
=== */

const main = async function(){
    my_text.disable();
    
    document.write("please input a number");
    const n = Number(
        await wait_for_input(my_text)
    );
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


