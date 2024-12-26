
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
                throw new TypeError("can only comare an item to another item");
            return (that.#val > this.#val);
        }
        [GET](that){
            return "" + this.#val;
        }
    };
    return Item;
})();
// create a space-efficient list of items
const Items = (function(){
    let Items;
    let _Vitem;
    _Vitem = class Vitem{
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
        // compare by indices; return true if i2 > i1
        compare(i1, i2){
            return (i2 > i1);
        }
        slice(i1 = 0, i2 = this.#values.length){
            return new _Vitem(this.#values, this.#Type, i1, i2);
        }
        [GET](i){
            return this.#values[i];
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
    /**
     * Construct a list of items
     * @param {Number[]} values `(Integer[])` the values to store in the list of items
     * @param {Number} item_size `(Integer: 8, 16, 32, or 64)` the number of bits the integer value of each item will have
     * @returns {Vitem}
     */
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
 * automatically generate a `TypedArray` to store indices for another array whose length is `i_size`;
 * @param {Number} size the size of the largest index
 */
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

const p = function(items){
    return items.map(v => v[g_val]()).join(", ");
};
