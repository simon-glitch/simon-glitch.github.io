
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
Objects, Part One
=== */

const symbol_prop = function(obj, prop, map, name = "Obj"){
    // make sure string form of the symbols map too
    // this means any symbol with the same name also works, but that's not a big deal
    // since you can just use the string anyways
    for(let i in map) map[map[i]] = map[i];
    const s = Symbol(name + "." + prop);
    Object.defineProperty(obj, prop, {
        get(){
            return this[s];
        },
        set(v){
            const s_v = map[v];
            if(v) this[s] = s_v;
        },
        configurable: false,
        enumerable: true,
    });
}


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
  * - `3` if it can be converted to an array using `obj.toArray`;
  * - `4` if it is an actual array;
**/
const is_array_like = function(obj){
    // check for non-objects
    if(typeof object !== "object" || object === null)
        return 0;
    if(obj instanceof Array)
        return 4;
    if(obj.toArray instanceof Function)
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
  * @param {Number} max_1D maximum length if the object is a 1D array;
  * @param {Number} max_2D maximum length if the object is a 2D array;
  * @returns {Array}
**/
const auto_array = function(obj, max_1D = MAX_SAFE, max_2D = MAX_SAFE){
    const is_array = is_array_like(obj);
    if(is_array === 0) return [obj];
    // good ol fashioned for loop
    if(is_array === 1){
        const res = [];
        const is_2D = is_array_like(obj[0]);
        const max_L = is_2D ? max_2D : max_1D;
        const L = Math.min(obj.length, max_L);
        for(let i = 0; i < L; i++) res[i] = obj[i];
        return res;
    };
    // for of, with complications
    if(is_array === 2){
        const res = [];
        let i = 0, is_2D, max_L;
        for(let v of obj){
            if(i === 0){
                is_2D = is_array_like(v);
                max_L = is_2D ? max_2D : max_1D;
            }
            if(i > max_L) break;
            res[i] = v;
            i++;
        }
    };
    // cannot limit length
    if(is_array === 3){
        return obj.toArray();
    }
    if(is_array === 4){
        const is_2D = is_array_like(obj[0]);
        const max_L = is_2D ? max_2D : max_1D;
        return obj.slice(0, max_L);
    }
}


/* ===
Table
=== */

/** A simple 2D array. */
class Table{
    /** The contents of the table. An array of columns. */
    cols = [];
    /** Extra items that could not fit or be placed in the table. */
    extras = [];
    constructor(){
        this.cols = [];
    }
    toArray(){
        return this.cols.slice();
    }
    // proxy to cols for simplicity
    get [Symbol.iterator](){
        return this.cols[Symbol.iterator];
    }
}

/** @static Specifies table filling mode as "CYCLE". */
Table.CYCLE = Symbol("Table.CYCLE");
/** @static Specifies table filling mode as "REPEAT_LAST". */
Table.REPEAT_LAST = Symbol("Table.REPEAT_LAST");
/** @static Specifies table filling mode as "REPEAT_FIRST". */
Table.REPEAT_FIRST = Symbol("Table.REPEAT_FIRST");
/** @static Specifies table filling mode as "EMPTY". */
Table.EMPTY = Symbol("Table.EMPTY");
/** @static Specifies table reading mode as "YX". */
Table.YX = Symbol("Table.YX");
/** @static Specifies table reading mode as "XY". */
Table.XY = Symbol("Table.XY");

/** @static Used to maps strings to symbols for `table.fill`; */
Table.MAP_FILL = {
    CYCLE: Table.CYCLE,
    REPEAT_LAST: Table.REPEAT_LAST,
    REPEAT_FIRST: Table.REPEAT_FIRST,
    EMPTY: Table.EMPTY,
}
/** @static Used to maps strings to symbols for `table.read`; */
Table.MAP_READ = {
    YX: Table.YX,
    XY: Table.XY,
}
symbol_prop(Table, "FILL", Table.MAP_FILL, "Table");
symbol_prop(Table, "READ", Table.MAP_READ, "Table");

/** @static The default table filling mode. */
Table.FILL = Table.CYCLE;
/** @static The default table reading mode. */
Table.READ = Table.YX;

/**
 * Combine any number of columns or tables into a single table.
 * @param {...any[]} data any number of array-like columns; any 2D array will be spread apart into multiple columns;
 * @returns {Table} the output table;
 * @property {Number} _cols the maximum number of columns that the output table can have;
 * @property {Number} _rows the maximum number of rows that the output table can have;
 * @property {Symbol} _fill how to fill empty cells of the table; filling logic is applied on a per-column basis
 * - `CYCLE`: repeat all items in the column, from the first to the last;
 * - `REPEAT_FIRST`: repeat the first item in the column;
 * - `REPEAT_LAST`: repeat the last item in the column;
 * - `EMPTY`: don't fill empty cells;
 * - defaults to `Table.FILL`;
 * @property {Symbol} _read how to read 2D arrays in `data`;
 * - `YX`: interpret each 2D array as an array of rows; i.e. index by Y and then by X;
 * - `XY`: interpret each 2D array as an array of columns; i.e. index by X and then by Y;
 * - defaults to `Table.READ`;
 */
const TableBase = function(...data){
    const taken = [];
    const cols = [];
    const extras = [];
    const is_2D = [];
    const max_cols = this._cols;
    const max_rows = this._rows;
    const fill = this._fill;
    const read = this._read;
    const max_read = (
        read === Table.YX ?
        max_cols : max_rows
    );
    let taken_cols = 0;
    let taken_rows = 0;
    
    // Normalization
    for(let i = 0; i < data.length && taken_cols < max_cols; i++){
        let d = data[i];
        // non-arrays
        if(!is_array_like(d)){
            extras.push(d);
            continue;
        }
        // auto array does smart trick if the array is 2D
        d = auto_array(d, max_rows, max_read);
        is_2D[i] = is_array_like(d[0]);
        if(is_2D[i]){
            for(let j = 0; j < data.length; j++){
                d[j] = auto_array(d[j], max_read);
            }
        }
        taken[i] = d;
    }
    
    // Build the table
    for(let i = 0; i < taken.length; i++){
        let d = taken[i];
        
        taken[i] = d;
    };

/**
 * Creates an instance of `table`;
 */
class TableFactory extends Function{
    _cols = MAX_SAFE;
    _rows = MAX_SAFE;
    _fill = Table.CYCLE;
    _read = Table.YX;
    constructor(){
        super(TableBase);
        reset();
    }
    /**
     * Sets all properties of `table` back to their default values.
     * @param {Number} rows the specified value;
     */
    reset(){
        delete this._rows;
        delete this._cols;
        delete this._fill;
        delete this._read;
    }
    /**
     * Chainable method that sets `table._rows` to the specified value.
     * @param {Number} rows the specified value;
     */
    rows(rows){this._rows = rows; return this}
    /**
     * Chainable method that sets `table._cols` to the specified value.
     * @param {Number} cols the specified value;
     */
    cols(cols){this._cols = cols; return this}
    /**
     * Chainable method that sets `table._fill` to the specified value.
     * @param {Symbol | String} fill the specified value; if `fill` is a string, it will be mapped to a symbol; invalid values of `fill` default to `Table.FILL`;
     */
    fill(fill){this._fill = fill; return this}
    /**
     * Chainable method that sets `table._read` to the specified value.
     * @param {Symbol | String} read the specified value; if `read` is a string, it will be mapped to a symbol; invalid values of `read` default to `Table.READ`;
     */
    read(read){this._read = read; return this}
};

const table = new TableFactory();

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

