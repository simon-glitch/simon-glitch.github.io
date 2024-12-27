
/** In-place insertion sort. */
let insertion_sort = function(items, n){
    n ??= items.length;
    for(let i = 1; i < items.length; i++){
        const swap = items[GET](i);
        let j = i;
        // shift the items
        while(j > 0 && items.compare(i, j - 1)){
            items.move(j - 1, j);
            j--;
        }
        // did we shift anythigng?
        if(j != i){
            // insert swap if we did
            items[SET](j, swap);
        }
    }
}

let threads = 10_000;

/**
  * Generate the indices for `linked_insertion_sort`.
  * Does not modify `data`.
  * @param {Vitem} data
  * @return {Promise<[number, TypedArray]>}
**/
let linked_insertion_sort_i = async function(data){
    const L = data.length;
    const links = AutoIndexArray(L, L);
    const links_set = AutoIndexArray(L, 2);
    
    const find = function(ii){
        let j_set = false;
        let j = L;
        for(let i = 0; i < L; i++){
            // the code is simpler when j has not been set yet
            if(!j_set){
                // first off, I want to find an item greater than d[ii]
                // or equal to d[ii], but only when i > ii
                
                const gt = data.compare(ii, i);
                if(gt){
                    // nice! we don't need to overcomplicate this;
                    j = i;
                    j_set = true;
                }
                else{
                    // check if they are equal
                    // this was backwards before
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
            const gt = data.compare(j, i);
            if(gt) continue;
            
            // lt = d[i] < d[j]
            const lt = data.compare(i, j);
            // gt == false and lt == false
            // so d[i] == d[j]
            // find the closest equal item to the right of d[ii]
            if(!lt){
                // we can REMOVE this case bc it reads LTR so i < j is always false
                if(i > ii && i < j){
                    j = i;
                }
            }
            // lt == true
            // so d[i] < d[j]
            // find the smallest item greater than d[ii]
            else{
                // make sure d[i] >= d[ii];
                // i.e. !(d[i] < d[ii]);
                // this was ALSO backwards
                if(data.compare(i, ii)) continue;
                
                if(
                    // check if d[ii] < d[i]
                    data.compare(ii, i) ||
                    // if it's not, then d[ii] == d[i]
                    // so, i need to make sure i > ii
                    i > ii
                ) j = i;
            }
        }
        
        if(j != L){
            links[ii] = j;
            links_set[ii] = 1;
        }
    };
    
    const done = Array(threads).fill(false);
    for(let i = 0; i < L; i += threads){
        let j;
        for(
            j = i;
            j < i + threads && j < L;
            j++
        ){
            const ii = j;
            (async function() {
                find(ii);
                done[ii] = true;
            })();
        }
        // default excess threads to being done
        for(j; j < i + threads; j++){
            done[j] = true;
        }
        
        // simply wait for all threads to be done
        // check every 16 ms
        await wait_until(
            t => (done.indexOf(false) == -1),
            16,
        );
    }
    
    // find the left-most minimum item
    let min = 0;
    for(let i = 0; i < L; i++) if(data.compare(i, min)) min = i;
    
    // make links_set[ii] == false map to 0
    // this is inefficient on multiple levels, but what do you expect from insertion sort?
    for(let i = 0; i < L; i++) if(!links_set[i]) links[i] = min;
    
    return [min, links];
};

/** Sort `data`, in-place, with linked insertion sort. */
let linked_insertion_sort = async function(data){
    const [min, links] = await (
        linked_insertion_sort_i(data)
    );
    return linked_sort(
        data,
        links,
        min,
    );
};

(async function(){
    if(0) await main(
        linked_insertion_sort,
        [
            100
        ],
        [
            10,
            100,
            1_000,
            10_000,
        ],
        [
            false,
        ],
    );

    await main(
        insertion_sort,
        [
            100
        ],
        [
            10,
            100,
            1_000,
            10_000,
            100_000,
            1_000_000,
            10_000_000,
        ],
        [
            false,
        ],
    );
})();

/*
linked insertion test 1:

10_000 ->  1.4 s
20_000 ->  3.7 s
30_000 ->  6.3 s
40_000 -> 11.4 s
50_000 -> 17.7 s


linked insertion test 2:

10_000 ->  1.2 s
20_000 ->  3.6 s
30_000 ->  6.9 s
40_000 -> 11.3 s
50_000 -> 18.0 s
60_000 -> 24.9 s
70_000 -> 34.1 s
80_000 -> 46.5 s

insertion test 1:

*/


