

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

const p = function(items){
    return items.map(v => v[g_val]()).join(", ");
};

// these are all in-place
// left untouched
let insertion_sort = function(items, n){
    n ??= items.length;
    for(let i = 1; i < items.length; i++){
        const swap = items[i]
        let j = i;
        // shift the items
        while(j > 0 && swap.compare(items[j - 1])){
            items[j] = items[j - 1];
            j--;
        }
        // did we shift anythigng?
        if(j != i){
            // insert swap if we did
            items[j] = swap;
        }
    }
}

// left untouched
let get_radix = function(items, a_item, i_l, i_r){
    if(i_r == i_l){
        return i_r;
    }
    if(i_r == i_l + 1){
        const b_item = items[i_l];
        // if a > b, output right
        if(b_item.compare(a_item)){
            return i_r;
        }
        // if a <= b, output left
        return i_l;
    }
    const i_m = Math.floor((i_l + i_r) / 2);
    const b_item = items[i_m];
    // if a > b
    if(b_item.compare(a_item)){
        // go right, recursively
        return get_radix(items, a_item, i_m, i_r);
    }
    // if b <= a
    // go left, recursively
    return get_radix(items, a_item, i_l, i_m);
};

// left untouched
let chad_sort;
chad_sort = function(items, a_s, n){
    n ??= items.length;
    if(n <= 16){
        insertion_sort(items, n);
        return;
    }
    a_s ??= 1/8;
    // use at least 8 for radixing
    const n_s = Math.max(8, Math.ceil(items.length ** a_s));
    // divide part 1
    const sub_list = items.slice(0, n_s);
    // conquer part 1
    chad_sort(sub_list, a_s, n_s);
    const buckets = Array(n_s + 1).fill(0).map(v => []);
    // conquer part 2
    for(let i = n_s; i < items.length; i++){
        const item = items[i];
        // console.log("rad", get_radix(sub_list, item));
        buckets[get_radix(sub_list, item, 0, n_s)].push(item);
    }
    // conquer part 3
    for(let i = 0; i < n_s + 1; i++){
        chad_sort(buckets[i]);
    }
    // merge
    for(let i = 0, h = 0; i < n_s + 1; i++){
        if(i > 0){
            items[h] = sub_list[i - 1];
            h++;
        }
        const bucket = buckets[i];
        for(let j = 0; j < bucket.length; j++, h++){
            items[h] = bucket[j];
        }
    }
};

const my_s = 1/3;
const max = 2**20;
const timeit = function(size){
    const times = [];
    const t0 = new Date;
    
    const my_data = Array(size).fill(0).map(
        v => Math.floor(Math.random() * max)
    ).map(
        v => new Item(v)
    );
    const t1 = new Date;
    
    chad_sort(my_data, my_s);
    const t2 = new Date;
    
    times[0] = t1 - t0;
    times[1] = t2 - t1;
    return times;
};

const print_i = function(i){
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

const print_t = function(t){
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

const print_test = function(n){
    const times = timeit(n);
    console.log(
        "took " +
        print_t(times[0]) +
        " to construct " +
        print_i(n) +
        " items"
    );
    console.log(
        "took " +
        print_t(times[1]) +
        " to sort " +
        print_i(n) +
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

const wait = function(t){
    const p = q_promise();
    setTimeout(p[1], t);
    return p[0];
};

async function main(){
    /*
    await wait(60);
    print_test(10);
    
    await wait(60);
    print_test(100);
    
    await wait(60);
    print_test(1_000);
    
    await wait(60);
    print_test(10_000);
    
    await wait(110);
    print_test(100_000);
    
    await wait(160);
    print_test(1_000_000);
    */
    
    await wait(160);
    print_test(3_000_000);
    
    /*
    await wait(160);
    print_test(4_000_000);
    
    await wait(160);
    print_test(5_000_000);
    
    await wait(160);
    print_test(6_000_000);
    
    await wait(160);
    print_test(7_000_000);
    
    await wait(160);
    print_test(8_000_000);
    
    await wait(160);
    print_test(9_000_000);
    
    // should use around 100 MB of RAM
    await wait(160);
    print_test(10_000_000);
    
    await wait(160);
    print_test(11_000_000);
    
    await wait(160);
    print_test(12_000_000);
    
    await wait(160);
    print_test(13_000_000);
    
    await wait(160);
    print_test(14_000_000);
    
    await wait(160);
    print_test(15_000_000);
    */
}

main();

/*
"took  0.598 seconds to construct 5,000,000 items"
"took  3.273 seconds to sort 5,000,000 items"
"took  1.034 seconds to construct 10,000,000 items"
"took  7.301 seconds to sort 10,000,000 items"
"took  1.578 seconds to construct 15,000,000 items"
"took 11.725 seconds to sort 15,000,000 items"
"took  2.504 seconds to construct 20,000,000 items"
"took 19.241 seconds to sort 20,000,000 items"
"took  3.776 seconds to construct 25,000,000 items"
"took 25.672 seconds to sort 25,000,000 items"
"took  4.578 seconds to construct 30,000,000 items"
"took 40.608 seconds to sort 30,000,000 items"

 0.598,  3.273
 1.034,  7.301
 1.578, 11.725
 2.504, 19.241
 3.776, 25.672
 4.578, 40.608

*/

/*
"took  0.398 seconds to construct 3,000,000 items"
"took  1.911 seconds to sort 3,000,000 items"
"took  0.454 seconds to construct 4,000,000 items"
"took  2.708 seconds to sort 4,000,000 items"
"took  0.649 seconds to construct 5,000,000 items"
"took  3.484 seconds to sort 5,000,000 items"
"took  0.604 seconds to construct 6,000,000 items"
"took  4.577 seconds to sort 6,000,000 items"
"took  2.478 seconds to construct 7,000,000 items"
"took 12.384 seconds to sort 7,000,000 items"
"took  0.840 seconds to construct 8,000,000 items"
"took  6.013 seconds to sort 8,000,000 items"
"took  1.036 seconds to construct 9,000,000 items"
"took  6.507 seconds to sort 9,000,000 items"
"took  1.355 seconds to construct 10,000,000 items"
"took  7.251 seconds to sort 10,000,000 items"
"took  1.943 seconds to construct 11,000,000 items"
"took  9.657 seconds to sort 11,000,000 items"
"took  1.600 seconds to construct 12,000,000 items"
"took  8.881 seconds to sort 12,000,000 items"
"took  1.459 seconds to construct 13,000,000 items"
"took 14.941 seconds to sort 13,000,000 items"
"took  1.982 seconds to construct 14,000,000 items"
"took 10.845 seconds to sort 14,000,000 items"
"took  1.857 seconds to construct 15,000,000 items"
"took 14.046 seconds to sort 15,000,000 items"

 0.398,  1.911
 0.454,  2.708
 0.649,  3.484
 0.604,  4.577
 2.478, 12.384
 0.840,  6.013
 1.036,  6.507
 1.355,  7.251
 1.943,  9.657
 1.600,  8.881
 1.459, 14.941
 1.982, 10.845
 1.857, 14.046

*/

/*
"took  0.371 seconds to construct 3,000,000 items"
"took  2.189 seconds to sort 3,000,000 items"
"took  0.437 seconds to construct 4,000,000 items"
"took  2.959 seconds to sort 4,000,000 items"
"took  0.537 seconds to construct 5,000,000 items"
"took  3.658 seconds to sort 5,000,000 items"
"took  0.732 seconds to construct 6,000,000 items"
"took  5.650 seconds to sort 6,000,000 items"
"took  0.723 seconds to construct 7,000,000 items"
"took  5.678 seconds to sort 7,000,000 items"
"took  0.945 seconds to construct 8,000,000 items"
"took  6.370 seconds to sort 8,000,000 items"
"took  1.005 seconds to construct 9,000,000 items"
"took  9.966 seconds to sort 9,000,000 items"
"took  1.265 seconds to construct 10,000,000 items"
"took  8.260 seconds to sort 10,000,000 items"
"took  1.450 seconds to construct 11,000,000 items"
"took 15.002 seconds to sort 11,000,000 items"
"took  1.592 seconds to construct 12,000,000 items"
"took 17.014 seconds to sort 12,000,000 items"
"took  2.206 seconds to construct 13,000,000 items"
"took 15.277 seconds to sort 13,000,000 items"
"took  2.232 seconds to construct 14,000,000 items"
"took 16.801 seconds to sort 14,000,000 items"
"took  2.638 seconds to construct 15,000,000 items"
"took 14.542 seconds to sort 15,000,000 items"

 0.371,  2.189
 0.437,  2.959
 0.537,  3.658
 0.732,  5.650
 0.723,  5.678
 0.945,  6.370
 1.005,  9.966
 1.265,  8.260
 1.450, 15.002
 1.592, 17.014
 2.206, 15.277
 2.232, 16.801
 2.638, 14.542

*/

/*
"took  2.257 seconds to sort 3,000,000 items"
"took  0.430 seconds to construct 4,000,000 items"
"took  3.839 seconds to sort 4,000,000 items"
"took  0.953 seconds to construct 5,000,000 items"
"took  4.616 seconds to sort 5,000,000 items"
"took  0.746 seconds to construct 6,000,000 items"
"took  5.429 seconds to sort 6,000,000 items"
"took  1.244 seconds to construct 7,000,000 items"
"took  7.808 seconds to sort 7,000,000 items"
"took  2.125 seconds to construct 8,000,000 items"
"took 10.520 seconds to sort 8,000,000 items"
"took  2.110 seconds to construct 9,000,000 items"
"took 11.682 seconds to sort 9,000,000 items"
"took  2.289 seconds to construct 10,000,000 items"
"took 13.607 seconds to sort 10,000,000 items"
"took  1.619 seconds to construct 11,000,000 items"
"took 14.427 seconds to sort 11,000,000 items"
"took  2.885 seconds to construct 12,000,000 items"
"took 14.299 seconds to sort 12,000,000 items"
"took  3.027 seconds to construct 13,000,000 items"
"took 17.861 seconds to sort 13,000,000 items"
"took  4.542 seconds to construct 14,000,000 items"
"took 19.505 seconds to sort 14,000,000 items"
"took  4.814 seconds to construct 15,000,000 items"
"took 23.239 seconds to sort 15,000,000 items"

 0.333,  2.085
 0.455,  4.746
 0.513,  2.257
 0.430,  3.839
 0.953,  4.616
 0.746,  5.429
 1.244,  7.808
 2.125, 10.520
 2.110, 11.682
 2.289, 13.607
 1.619, 14.427
 2.885, 14.299
 3.027, 17.861
 4.542, 19.505
 4.814, 23.239
*/


