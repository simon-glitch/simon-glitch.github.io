
/** in-place */
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

let linked_insertion_sort_i = function(){};


