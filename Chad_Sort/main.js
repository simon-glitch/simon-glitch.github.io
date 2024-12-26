
/**
  * These private symbols are needed for certain operations.
  * They are used to help maintain abstraction of the `Item` and `Vitem` types.
**/
const VALUES = Symbol("VALUES");
const GET = Symbol("GET");

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
  * @param {Number[]} values `(Integer[])` the values to store in the list of items
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
        /** compare by indices; return `true` if `d[i2] > d[i1]` */
        compare(i1, i2){
            return (i2 > i1);
        }
        /** move by indices; i.e. `d[i2] = d[i1];` */
        move(i1, i2){
            return (i2 > i1);
        }
        /** move by indices, between lists of data; i.e. `d[i2] = s[i1];` */
        import(i1, i2, s){
            return (i2 > i1);
        }
        /** swap by indices; i.e. `t = d[i2]; d[i2] = d[i1]; d[i1] = t;` */
        swap(i1, i2){
            return (i2 > i1);
        }
        /** works just like `Array.slice` */
        slice(i1 = 0, i2 = this.#values.length){
            i2 %= this.#values.length;
            i2 += this.#values.length;
            i2 %= this.#values.length;
            return new _Vitem(this.#values, this.#Type, i1, i2);
        }
        /** gets an item directly; `i == VALUES` gives the private `this.#values` object directly */
        [GET](i){
            if(i == VALUES) return this.#values;
            return this.#values[i];
        }
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
        2**2**Math.max(Math.floor(Math.log2(
            Math.floor(Math.log2(
                max_value
            ) || 1)
        )), 3)
    );
};

/**
  * Convert a `Vitem` object into a human-readable string, for debugging purposes.
**/
const print_items = function(items){
    return items.map(v => v[g_val]()).join(", ");
};

/**
  * The final step of any linked sorting algorithm. Use the links to rearrange the entire list, so some slice of the list.
  * @param {Vitem} data the data; i.e. the list of items; this data will be rearranged in-place;
  * @param {TypedArray} links the index of the next item for each item in `data`;
  * @returns {Vitem} exact same `data` object, for chaining
**/
let linked_sort = function(data, links){
    const L = data.length;
    const map = AutoIndexArray(L, L - 1);
    const done = AutoIndexArray(L, 1);
    
    let j = 0;
    for(let i = 0; i < L; i++){
        if(done[j]){
            break;
        }
        done[j] = true;
        map[i] = links[j];
        j = links[j];
    }
    const data_c = data.slice();
    
    const d_a = data[GET](VALUES);
    const d_c = data_c[GET](VALUES);
    // directly map from data to data_c
    for(let i = 0; i < L; i++){
        d_a[i] = d_c[i];
    }
    // for convenience and chaining
    return data;
};

/**
  * Description
  * @param {t_0} p_0 description;
  * @param {t_1} p_1 description;
**/
let example_fn = function(p_0, p_1){
    
};

