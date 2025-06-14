
/* ===
Numbers and primitive types
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

/** Size of the IEEE-754 float used in this file */
const IEEE_SIZE = 64;
/** Sign bits in float */
const IEEE_SGN = 1;
/** Exponent bits in float */
const IEEE_EXP = 11;
/** Mantissa bits in float */
const IEEE_MAN = IEEE_SIZE - IEEE_SGN - IEEE_EXP;

/** Maximum exponent a float can have */
const MAX_EXP = 2**IEEE_EXP - 1;
/** 1.798e+308, the largest positive number that you can add or subtract 1 to or from. */
const MAX_SAFE = 2**(IEEE_MAN + 1) - 1;
/** The smallest number that you can add or subtract to or from any finite number.
    Essentially, this number always makes a difference with addition and subtraction. */
const MAX_DIFF = 2 ** (MAX_EXP - IEEE_MAN);
/** 1.798e+308, the largest finite number in the IEEE-754 64-bit float standard.
    INFINTY + MAX_DIFF = actual Infinity */
const INFINTY = MAX_SAFE * MAX_DIFF;

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
Arrays
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
  * - `3` if it is an actual array;
**/
const is_array_like = function(obj){
    // check for non-objects
    if(typeof object !== "object" || object === null)
        return 0;
    if(obj instanceof Array)
        return 3;
    // check for `in`
    if(Symbol.iterator(obj)) return 2;
    // check for `length`
    if(obj.length instanceof Number)
        return 1;
}

/**
  * Convert an array-like object into a proper array.
  * - wraps the object in an array if it not array-like;
  * - makes a copy of the object without mutating it;
  * @param {*} obj object to convert;
  * @returns {Array}
**/
const auto_array = function(obj){
    const is_array = is_array_like(obj);
    if(is_array === 0) return [obj];
    // good ol fashioned for loop
    if(is_array === 1){
        const res = [], L = obj.length;
        for(let i = 0; i < L; i++) res[i] = obj[i];
        return res;
    };
    // 
    if(is_array === 2) return [...obj];
    if(is_array === 3) return obj.slice();
}

/** A simple 2D array. */
class Table{
    cols = [];
    constructor(){
        this.cols = [];
    }
}
/** Specifies table filling mode. */
Table.CYCLE = Symbol("Table.CYCLE");
/** Specifies table filling mode. */
Table.REPEAT_LAST = Symbol("Table.REPEAT_LAST");
/** Specifies table filling mode. */
Table.REPEAT_FIRST = Symbol("Table.REPEAT_FIRST");
/** Specifies table filling mode. */
Table.EMPTY = Symbol("Table.EMPTY");

const TableBase = function(){
    
};

/**
 * @
 */
class TableFactory extends Function{
    cols = MAX_SAFE;
    rows = MAX_SAFE;
    fill = Table.CYCLE;
    constructor(){
        super(TableBase);
    }
    /** Chainable method that sets `table.rows` to the specified value. */
    rows(rows){this.rows = rows; return this}
    /** Chainable method that sets `table.cols` to the specified value. */
    cols(cols){this.cols = cols; return this}
    /** Chainable method that sets `table.fill` to the specified value. */
    fill(fill){this.fill = fill; return this}
};

/* ===
Objects
=== */

/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_prop = function(obj, prop, value, enumerable = true){
    // errors might occur inside is_array_like or inside the ellipsis;
    try{
        const kvs = table.cols(2)(prop, value);
        enumerable ??= kvs.extras[0];
        
        const L = Math.min(prop.length, value.length);
        for(let i = 0; i < L; i++){
            Object.defineProperty(obj, i_prop, {
                value: i_value,
                configurable: false,
                writable: false,
                enumerable,
            });
        }
    }
    catch(e){return e;}
}

/**
  * Lock a property of an object, making the current value a constant value.
  * - essentially finalizes the value;
  * - use a list `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const fast_const_prop = function(obj, prop){
    if(!obj) return obj;
    try{
        const value = (
            is_array_like(prop) ?
            auto_array(prop).map(prop => obj[prop]) :
            obj[prop]
        );
        return const_prop(
            obj, prop, value,
            Object.getOwnPropertyDescriptor(
                obj, prop[0],
            ).enumerable,
        );
    }
    catch(e){return e;}
};

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

