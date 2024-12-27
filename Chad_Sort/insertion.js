
/** In-place insertion sort. */
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

let threads = 8;

/**
  * Generate the indices for `linked_insertion_sort`.
  * Does not modify `data`.
**/
let linked_insertion_sort_i = async function(data){
    const L = data.length;
    const links = AutoIndexArray(L, L);
    
    const find = function(ii){
        let j_set = false;
        let j = 0;
        for(let i = 0; i < L; i++){
            // the code is simpler when j has not been set yet
            if(!j_set){
                // first off, I want to find an item greater than d[ii]
                // or equal to d[ii], but only when i > ii
                
                const gt = data.compare(i, ii);
                if(gt){
                    // nice! we don't need to overcomplicate this;
                    j = i;
                    j_set = true;
                }
                else{
                    // check if they are equal
                    const lt = data.compare(i, ii);
                    if(!lt){
                        // if they are, check if i > ii
                        if(i > ii){
                            // if it is, then set j = i
                            j = i;
                            j_set = true;
                        }
                    }
                }
                
                continue;
            }
            
            // gt = d[i] > d[j]
            // or gt = d[j] < d[i]
            const gt = data.compare(i, j);
            if(gt) return;
            
            // lt = d[i] < d[j]
            // or lt = d[j] > d[i]
            const lt = data.compare(j, i);
            // gt == false and lt == false
            // so d[i] == d[j]
            // find the closest equal item to the right of d[ii]
            if(!lt){
                if(i > ii && i < j){
                    j = i;
                }
            }
            // lt == true
            // so d[i] < d[j]
            // and d[j] > d[i]
            // find the smallest item greater than d[ii]
            else{
                // make sure d[i] >= d[ii];
                // i.e. !(d[i] < d[ii]);
                // i.e. !(d[ii] > d[i]);
                if(data.compare(ii, i)) continue;
                
                // now, just override directly
                j = i;
            }
        }
        j %= L;
        links[ii] = j;
    };
    
    // im so smart
    const done = Array(threads).fill(false);
    for(let i = 0; i < L; i += threads){
        for(
            let j = i;
            j < threads && j < L;
            j++
        ){
            const ii = j;
            (async function() {
                find(ii);
                done[ii] = true;
            })();
        }
    }
    // simply wait for all threads to be done
    // check every 64 ms
    await wait_until(t => done.indexOf(false) == -1, 64);
    
    
};

/** Sort `data`, in-place, with linked insertion sort. */
let linked_insertion_sort = async function(data){
    linked_sort(
        data,
        await linked_insertion_sort_i(data)
    );
};


main(linked_insertion_sort);


