

function parse(sw){
    const w = {};
    const swl = sw.split("\n");
    for(let i = 0; i < swl.length; i++){
        const wi = swl[i];
        const wii = wi.lastIndexOf(",");
        const wil = wi.slice(0, wii);
        const wir = wi.slice(wii + 1);
        w[wil] = Number(wir);
    }
    return w;
}

/*
`sort_fn(a, b)` should return `true` when `a` is greater than `b` (i.e. when `a` comes after `b`)
*/
function sorted_insert(list, item, sort_fn){
    if(list.length == 0){
        list.push(item);
        return;
    }
    
    let i = Math.floor(list.length / 2);
    let L = i;
    let left = sort_fn(list[i], item);
    let right = (i >= (list.length - 1)) || sort_fn(list[i + 1], item);
    while(left || (!right)){
        if(i == 0){
            list.unshift(item);
            return;
        }
    
        L = Math.max(1, Math.floor(L / 2));
        if(left && right) i -= L;
        if((!left) && (!right)) i += L;
        if(left && (!right)){
            console.log("* l", list[i]);
            console.log("* m", item);
            console.log("* r", list[i + 1]);
            console.log("* l > m", left);
            console.log("* r > m", right);
            console.log("* i", i);
            console.log("* len", list.length);
            throw new Error("List is not sorted!");
        }
        left = sort_fn(list[i], item);
        right = (i >= (list.length - 1)) || sort_fn(list[i + 1], item);
    }
    if((!left) && right){
        list.splice(i + 1, 0, item);
    }
}


{
    console.log("same code");
    // dictionary
    window.words = parse(window.simons_words);
    const words = window.words;
    const MIN = 200_000;
    const MAX_F = 60;
    const found = [];
    // this indicates descending order
    const sorter = ((a,b) => (words[a] < words[b]));
    const add = ((w) => {
        sorted_insert(found, w, sorter);
        while(found.length > MAX_F) found.pop();
    });
    
    // from "hot crusts"
    // const letters = ("chorssttu").split("");
    // from "hectic state" -> "cic state"
    const letters = ("acceistt").split("");
    // from "genial halo"
    // const letters = "aeghilno";
    // const numbers = "21111211";
    
    let process;
    process = function(prev_s, prev_l){
        for(let i = 0, curr_p = ""; i < prev_l.length; i++){
            const curr_s = prev_s + prev_l[i];
            
            // avoid duplicates
            if(curr_s == curr_p) continue;
            curr_p = curr_s;
            
            if(curr_s.length >= 5){
                if(words[curr_s] > MIN) add(curr_s);
            }
            if(prev_l.length > 1){
                const curr_l = prev_l.slice();
                curr_l.splice(i, 1);
                // recursive call!
                process(curr_s, curr_l);
            }
        }
    };
    
    // super simply mapping setup
    
    const process_2 = function(){
        const l_map = {};
        for(let i = 0; i < letters.length; i++) l_map[letters[i]] = true;
        const i_map = {};
        for(let i = 0; i < letters.length; i++) i_map[letters[i]] = i;
        const n_map = [];
        for(let i = 0; i < numbers.length; i++) n_map[i] = Number(numbers[i]);
        
        for(let w in words){
            const L = w.length;
            if(L != 5) continue;
            let j = 0;
            for(let i = 0; i < L; i++){
                if(!l_map[w[i]]){
                    j = 1;
                    break;
                }
            }
            if(j) continue;
            
            const w_map = [];
            for(let i = 0; i < numbers.length; i++) w_map[i] = 0;
            // tripple indexing!
            for(let i = 0; i < L; i++) w_map[i_map[w[i]]]++;
            for(let i = 0; i < L; i++){
                if(w_map[i] > n_map[i]){
                    j = 1;
                    break;
                }
            }
            if(j) continue;
            
            add(w);
        }
    };
    
    process("", letters);
    
    console.log(found);
    
    
}

