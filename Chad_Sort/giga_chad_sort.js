


// these are all in-place

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

// TODO: I came up with a better way to do the final step of the SRS

/**
 * Ultra fast SRS, with ultra bad results. I suggest you call `SRS_cleanup` on the result. It's good enough for `gigachad_sort`, but it might be completely useless for your program.
 * @param {Number} data_size the size of the data to take the sample from
 * @param {Number} sample_size the size of the sample
 * @returns {Number[]} the indices for which items to take out the data as a sample
 */
const SRS = function(data_size, sample_size){
    if(data_size > 2**53){
        throw new TyperError("JavaScript does not easily support integers larger than 2**53");
    }
    
    // random numbers between 0 and 1
    // actual possible values are all x = n / 2**52, where n is uniform from 1 to 2**52-1;
    const rr = new Float64Array(sample_size);
    // generate a bunch of independent random numbers
    // halve this, to help reduce the bias against the first item
    rr[0] = Math.random() / 2;
    // take the total as we do
    let rt = rr[0];
    for(let i = 1; i < sample_size; i++){
       rt += Math.random();
       // store the partial sums instead of the 
       rr[i] = rt;
    }
    // add 1 extra random number, to help keep the last index within the list
    // halve this, to help reduce the bias against the last item
    rt += Math.random() / 2;
    
    const ri = AutoIndexArray(sample_size, data_size);
    
    // convert the random numbers to random indices
    // exc allows us to immediately skip duplicate values
    // optimization?
    rt = data_size / rt;
    for(let i = 0; i < sample_size; i++){
        ri[i] = rr[i] * rt;
    }
    // handle floating point problem with numbers on the end
    for(let i = sample_size - 1; i > -1; i--){
        if(ri[i] >= data_size)
            ri[i] %= data_size;
        else break;
    }
    // increment adjacent duplicates
    // this helps split *some* duplicates while keeping the output list sorted
    for(let i = 0; i < sample_size; i++){
        if(r[i] === r[i + 1]){
            r[i]++;
            r[i] %= data_size;
            // skip the next item, 
            i++;
        }
    }
    // this function can and often will return duplicates
    // but there are few enough of them that it's good for `gigachad_sort`
    
    return ri;
};

// cleanup the output from the SRS function above specifically to give a sorted list of indices with no duplicates
// why a sorted list of indices? it is to make it easier to make `gigachad_sort` stable
const SRS_cleanup = function(ri){
    const l = ri.length;
    // check if the last item is greater than the first
    if(ri[l - 1] > ri[0]) return ri;
    
    // if it is less than or equal to the first, we need to rebuild ri accordingly
    // all we actually have to do is rotate the entire list some number of places
    // first, we need to figure out where the new list will be starting from
    let i = l - 1;
    while(ri[i] <= ri[i - 1]) i--;
    // now, just move all of the items over by that much
    // ill just make a new array
    const ro = IndexArray(
        l,
        2**2**Math.max(Math.floor(Math.log2(
            Math.floor(Math.log2(
                ri[i - 1]
            ) || 1)
        )), 3)
    );
    for(let j = i, k = 0; j != i; j++, j %= l, k++){
        ro[k] = ri[j];
    }
    return ro;
};




