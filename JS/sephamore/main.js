
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
const const_property = function(obj, prop, value){
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
        Object.defineProperty(obj, i_prop, {
            value: i_value,
            configurable: false,
            writable: false,
        });
    }
}

/**
  * Simply make a promise, and extract its resolve and reject functions.
  * @returns {[Promise<T>, (resolve_value: T) => void, (reason?: any) => void]}
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
 * Creates a semaphore (the instance is named `semaphore`).
 * @param {Object} a_res values to be added to `semaphore.res`;
 */
const Semaphore = class Semaphore{
    /** @type {object} */
    res = {};
    /** @type {((resolve_value: T) => void)[]} */
    #queue = [];
    constructor(a_res){
        this.res = {};
        this.#queue = [];
        for(let i of a_res){
            this.res[i] = a_res[i];
        }
    }
    /**
     * Wait for the semaphore to be free.
     * @returns {Promise} a promise that you should await; when the promise is done, you will have `semaphore.res` all to yourself;
     */
    use(){
        const quick_start = (this.#queue.length === 0);
        const q = q_promise();
        this.#queue.push(q[1]);
        // if the queue WAS empty, then make sure to handle the first item
        if(quick_start && this.#queue[0] === q){
            // the good thing about promises is you can only resolve them once
            // if we have multiple calls like this, nothing will break
            this.#queue[0]();
        }
        return q[0];
    }
    /**
     * Indicates that you are done using `semaphore.res`, and frees the semaphore. Calling this when you should not can cause unintended behavior with any code that uses the the semaphore.
    */
    free(){
        this.#queue.shift();
        this.#queue[0]?.();
    }
}


