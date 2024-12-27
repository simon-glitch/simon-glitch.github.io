
/* ===
Helper functions
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
Data abstraction layer
=== */

/**
  * These private symbols are needed for certain operations.
  * They are used to help maintain abstraction of the `Item` and `Vitem` types.
**/
const VALUES = Symbol("VALUES");
const GET = Symbol("GET");
const SET = Symbol("SET");

const Item = (function(){
    let Item;
    Item = class Item{
        #val = 0;
        constructor(val){
            this.#val = val;
        }
        compare(that){
            if(!(that instanceof Item))
                throw new TypeError("can only compare an item to another item");
            return (that.#val > this.#val);
        }
        [GET](that){
            return "" + this.#val;
        }
    };
    return Item;
})();

/**
  * A list of items whose values are not intended to be read externally.
  * Use `print_items` to print the list of items.
**/
class Vitem{};

/**
  * Create a space-efficient list of items (a `Vitem`).
  * @param {Number[]} values `(Integer[])` the values to store in the list of items; `values` can be any indexable list of values
  * @param {Number} item_size `(Integer: 8, 16, 32, or 64)` the number of bits the integer value of each item will have
  * @returns {Vitem}
**/
const Items = (function(){
    let Items;
    let _Vitem;
    Vitem = _Vitem = class Vitem{
        /** @type {TypedArray} */
        #values = null;
        #Type = _Vitem;
        constructor(a_values, c_values, i1 = 0, i2 = a_values.length){
            this.#values = new c_values(i2 - i1);
            this.#Type = c_values;
            for(let i = i1; i < i2; i++){
                this.#values[i] = a_values[i];
            }
        }
        /** Compare by indices. return `true` if `d[i2] > d[i1]` */
        compare(i1, i2){
            return (this.#values[i2] > this.#values[i1]);
        }
        /** Compare left by value to right by index. return `true` if `d[i2] > i1` */
        compare_l(i1, i2){
            return (this.#values[i2] > i1);
        }
        /** Compare left by index to right by value. return `true` if `i2 > d[i1]` */
        compare_r(i1, i2){
            return (i2 > this.#values[i1]);
        }
        /** Move by indices. i.e. `d[i2] = d[i1];` */
        move(i1, i2){
            return (this.#values[i2] = this.#values[i1]);
        }
        /**
          * Move by indices, between lists of data. i.e. `d[i2] = s[i1];`
          * @param {Vitem} s the list to import from
          * @param {number} i1 the index within `s` to import from
          * @param {number} i2 the index within `d` to import to
        **/
        import(s, i1, i2){
            return (this.#values[i2] = s.#values[i1]);
        }
        /** Swap by indices. i.e. `t = d[i2]; d[i2] = d[i1]; d[i1] = t;` */
        swap(i1, i2){
            let t = this.#values[i2];
            this.#values[i2] = this.#values[i1];
            this.#values[i1] = t;
            return t;
        }
        /** Works just like `Array.slice`. */
        slice(i1 = 0, i2 = this.#values.length){
            if(i2 < 0) i2 += this.#values.length;
            return new _Vitem(this.#values, this.#Type, i1, i2);
        }
        /** Gets an item directly. `i == VALUES` gives the private `this.#values` object directly; */
        [GET](i){
            if(i === VALUES) return this.#values;
            return this.#values[i];
        }
        /** Sets an item directly. `i == VALUES` fills the private `this.#values` object directly; */
        [SET](i, value){
            if(i === VALUES){
                for(let i = 0; i < value.length; i++){
                    this.#values[i] = value[i];
                }
            }
            return (this.#values[i] = value);
        }
        /** The length of the internal `TypedArray`. @returns {number} */
        get length(){
            return this.#values.length;
        }
    };
    class Vitem8 extends Vitem{
        constructor(a_values){
            super(a_values, Uint8Array);
        }
    };
    class Vitem16 extends Vitem{
        constructor(a_values){
            super(a_values, Uint16Array);
        }
    };
    class Vitem32 extends Vitem{
        constructor(a_values){
            super(a_values, Uint32Array);
        }
    };
    class Vitem64 extends Vitem{
        constructor(a_values){
            super(a_values, BigUint64Array);
        }
    };
    const Select = {
        8: Vitem8,
        16: Vitem16,
        32: Vitem32,
        64: Vitem64,
    };
    Items = function(values, item_size){
        const C = Select[item_size];
        if(!C) throw new TypeError(
            "there are no Vitem classes with a size of " +
            item_size +
            "; please use one of these sizes: " +
            (()=>{
                const a=[];
                for(s in Select) a.push(s);
                return a;
            })().join(", ") +
            ";"
        );
        
        // else
        return new C(values);
    };
    return Items;
})();

/**
  * Create a space-efficient list of items (a `Vitem`).
  * @param {Number[]} values `(Integer[])` the values to store in the list of items; `values` can be any indexable list of values
  * @param {Number} max_value the largest value that can be in `values`;
  * @returns {Vitem}
**/
const AutoItems = function(values, max_value){
    return Items(
        values,
        get_bit_count(max_value)
    );
};

/**
  * Automatically generate a `TypedArray` to store indices for another array whose length is `i_size`;
  * @param {Number} size the size of the largest index
**/
const IndexArray = (function(size, i_size){
    switch(i_size){
        case 8:
            return new Uint8Array(size);
        case 16:
            return new Uint16Array(size);
        case 32:
            return new Uint32Array(size);
        case 64:
            return new BigUint64Array(size);
        default:
            throw new TypeError("i_size of " + i_size + " is not supported");
    }
});

/**
  * Build an appropriate IndexArray (i.e. an array of non-negative integers)
  * @param {number} size the size of the array itself; i.e. the number of values in the array;
  * @param {number} max_value value of the largest value that the array can possibly contain;
**/
const AutoIndexArray = function(size, max_value){
    return IndexArray(
        size,
        get_bit_count(max_value)
    );
};

/**
  * Convert a `Vitem` object into a human-readable string, for debugging purposes.
**/
const print_items = function(items){
    if(items instanceof Vitem){
        return [...items[GET](VALUES)].join(", ");
    }
    return items.map(v => v[GET]()).join(", ");
};

/* ===
General sorting functions
=== */

/**
  * The final step of any linked sorting algorithm. Use the links to rearrange the entire list, so some slice of the list.
  * @param {Vitem} data the data; i.e. the list of items; this data will be rearranged in-place;
  * @param {TypedArray} links the index of the next item for each item in `data`;
  * @param {number} start where the data starts; i.e. the index of the minimum value, for an ascending sort;
  * @returns {Vitem} exact same `data` object, for chaining
**/
let linked_sort = function(data, links, start = 0){
    const L = data.length;
    const map = AutoIndexArray(L, L - 1);
    const done = AutoIndexArray(L, 1);
    
    let j = start;
    for(let i = 0; i < L; i++){
        if(done[j]){
            break;
        }
        done[j] = true;
        map[i] = j;
        j = links[j];
    }
    const data_c = data.slice();
    
    const d_a = data[GET](VALUES);
    const d_c = data_c[GET](VALUES);
    // directly map from data to data_c
    for(let i = 0; i < L; i++){
        d_a[i] = d_c[map[i]];
    }
    // for convenience and chaining
    return data;
};

let builtin_sort = function(data){
    const d = [...data[GET](VALUES)];
    d.sort((a, b) => a - b);
    data[SET](VALUES, d);
    return data;
};


/* ===
Testing
=== */

const max = 2**12;
const timeit = async function(sort_fn, size, do_print){
    const times = [];
    const t0 = new Date;
    
    const my_data = AutoItems(Array(size).fill(0).map(
        v => Math.floor(Math.random() * max)
    ), max);
    const t1 = new Date;
    
    if(do_print) console.log("unsorted items:", print_items(my_data));
    
    await sort_fn(my_data);
    const t2 = new Date;
    
    if(do_print) console.log("sorted items:", print_items(my_data));
    
    times[0] = t1 - t0;
    times[1] = t2 - t1;
    return times;
};

const print_test = async function(sort_fn, size, do_print){
    const times = await timeit(sort_fn, size, do_print);
    console.log(
        "took " +
        print_t(times[0]) +
        " to construct " +
        print_i(size) +
        " items"
    );
    console.log(
        "took " +
        print_t(times[1]) +
        " to sort " +
        print_i(size) +
        " items"
    );
};

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

// TODO: add a way to test if `sort_fn` is stable;

/**
  * Test a sort function with multiple different sizes.
  * @param {Function} sort_fn the sort function; it must have the simple form `(data: Vitem) => Vitem`
  * @param {number[]} waits the time to wait before each individual test
  * @param {number[]} sizes the size of the data for each individual test
  * @param {boolean[]} do_prints whether to print the lists for each individual test
**/
async function main(sort_fn, waits, sizes, do_prints){
    const L_W = waits.length;
    const L_S = sizes.length;
    const L_P = do_prints.length;
    const L = Math.max(
        L_W,
        L_S,
        L_P,
    );
    for(let i = 0; i < L; i++){
        await wait(waits[i % L_W]);
        await print_test(
            sort_fn,
            sizes[i % L_S],
            do_prints[i % L_P]
        );
    }
};

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

