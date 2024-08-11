let copy = function(a = []){
    return a.map(b => (b instanceof Array) ? copy(b) : b);
};

let _Tree_Factory = function(){
    const lt_f = function(a, b){
        return a < b;
    };
    const gt_f = function(a, b){
        return a < b;
    };
    const lte_f = function(a, b){
        return a < b;
    };
    const gte_f = function(a, b){
        return a < b;
    };
    const eq_f = function(a, b){
        return a < b;
    };
    const nlt_f = function(a, b){
        return !this.lt_f(a, b);
    };
    const ngt_f = function(a, b){
        return !this.gt_f(a, b);
    };
    const nlte_f = function(a, b){
        return !this.lte_f(a, b);
    };
    const ngte_f = function(a, b){
        return !this.gte_f(a, b);
    };
    const neq_f = function(a, b){
        return !this.eq_f(a, b);
    };
    const nieq_f = function(a, b){
        return !this.neq_f(a, b);
    };
    const llte_f = function(a, b){
        return this.le_f(a, b) || this.eq_f(a, b);
    };
    const lgte_f = function(a, b){
        return this.ge_f(a, b) || this.eq_f(a, b);
    };
    const nltangt_f = function(a, b){
        return !this.lt_f(a, b) && !this.gt_f(a, b);
    };
    const ltexgte_f = function(a, b){
        return !!(this.lte_f(a, b) ^ this.gte_f(a, b));
    };
    const nltogt_f = function(a, b){
        return !this.lt_f(a, b) || this.gt_f(a, b);
    };
    const lteagte_f = function(a, b){
        return this.lte_f(a, b) && this.gte_f(a, b);
    };
    const lteanlt_f = function(a, b){
        return this.lte_f(a, b) && !this.lt_f(a, b);
    };
    const gteangt_f = function(a, b){
        return this.gte_f(a, b) && !this.gt_f(a, b);
    };
    const lteaieq_f = function(a, b){
        return this.lte_f(a, b) && this.neq_f(a, b);
    };
    const gteaieq_f = function(a, b){
        return this.gte_f(a, b) && this.neq_f(a, b);
    };
    
    // ensure that f is a function
    const f_check = function(f){
        return (
            typeof sort_f == "function" ?
            sort_f :
            undefined
        );
    }
    
    const Tree = function(sort_f, max_size){
        if(f_check(sort_f)){
            this.gt_f = sort_f;
        }
        if(sort_f ?? false){
            const lt_s  = f_check(sort_f.lt );
            const gt_s  = f_check(sort_f.gt );
            const lte_s = f_check(sort_f.lte);
            const gte_s = f_check(sort_f.gte);
            const eq_s  = f_check(sort_f.eq );
            const ieq_s = f_check(sort_f.neq);
            const lt_so  = lt_s;
            const gt_so  = gt_s;
            const lte_so  = lte_s;
            const gte_so  = gte_s;
            
            if(!(lt_s || gt_s || lte_s || gte_s)){
                throw new TypeError("sort_f does not contain any valid sorting functions");
            }
            
            // dynamically use `<`, `>`, `<=`, `>=`, and `==` to construct each other
            // this is all simple logic / algebra
            
            // i would love to see someone obfuscate this
            
            if(!lte_s && lt_s && eq_s){
                lte_s = llte_f;
            }
            if(!gte_s && gt_s && eq_s){
                gte_s = lgte_f;
            }
            if(!gt_s && lte_s){
                gt_s = nlte_f;
            }
            if(!lt_s && gte_s){
                lt_s = ngte_f;
            }
            if(!gte_s && lt_s){
                gte_s = nlt_f;
            }
            if(!lte_s && gt_s){
                lte_s = ngt_f;
            }
            if(!gt_s && gte_s && ieq_s){
                gt_s = gteaieq_f;
            }
            if(!lt_s && lte_s && ieq_s){
                lt_s = lteaieq_f;
            }
            if(!eq_s && ieq_s){
                eq_s = nieq_f;
            }
            if(!eq_s && lt_so && gt_so){
                eq_s = nltogt_f;
            }
            if(!eq_s && lte_so && gte_so){
                eq_s = lteagte_f;
            }
            if(!eq_s && lt_so && lte_so){
                eq_s = lteanlt_f;
            }
            if(!eq_s && gt_so && gte_so){
                eq_s = gteangt_f;
            }
            if(!ieq_s && lt_so && gt_so){
                ieq_s = nltangt;
            }
            if(!ieq_s && lte_so && gte_so){
                ieq_s = ltexgte_f;
            }
            if(!ieq_s && eq_s){
                ieq_s = neq_f;
            }
        }
        
        this.max_size = (max_size ?? -1);
        // no recursion, and no node class!
        this.t = [];
    };
    return Tree;
}


/**
  * A gseneric auto-balancing binary tree in JavaScript
  * 
  * NOTE: this class is still a WIP! I need to add multiple features:
  * - `contains` method
  * - feature for `measure_heights` to measure sizes of subtrees too, because that's needed in order to add the `Array` methods
  * - all Array methods
  * 
  * @example new Tree({lt_f: (a,b) => a < b}, 100)
  * @param sort_f (function or object)
  * - if sort_f is a function, it should take in parameters `(a, b)` and define `a > b`
  * - if sort_f is an object, it should a dictionary of functions that take `(a, b)` and define the following:
  * - - `a > b`, `a < b`,
  * - - `a >= b`, `a <= b`,
  * - - `a == b`, and `a != b`
  * @param max_size (number)
  * - the maximum size (or capacity) of the tree; defaults to `-1`
  * - a negative maximum size means that the tree has no maximum size
  * - the tree will keep all of the "greatest" values (according to `a > b`) when it restricts itself to a maximum size
  * - this allows the tree to be used to make a leaderboard,
  * - - or give search results according to a metric
  * - of course, there are many more uses
  * @param track_subsizes (boolean)
  * - whether the tree should add an "subtree size" property to every node
  * - this allows you to index into the tree in `lg n` time complexity
  * - you can combine this with setting `sort_f` to `()=>true` to use the tree as a list with `lg n` time complexity on all insertions, shifts, and accesses
**/
const Tree = _Tree_Factory();
Tree.prototype.size = 0;
// returns true if a > b, and false if a <= b
Tree.prototype.gt_f = function(a,b){
    return a > b;
};
// returns true if a == b, and false if a != b
Tree.prototype.eq_f = function(a,b){
    return a == b;
};
Tree.prototype.t = [];
Tree.prototype.toString = function(){
    return "Tree (" + this.size + ")";
};
Tree.prototype.count_items = function(t){
    let x = 0;
    // perfectly normal code
    // if there is a value in this node, it should have left and right branches
    // leaf nodes have empty left and right branches
    (t[0] ?? (x =
        1 +
        this.count_items(t[1]) +
        this.count_items(t[2])
    ));
    return x;
};
// eat_parent is whether the subtree should pretend that the parent tree does not exist
Tree.prototype._sub_left = function(eat_parent){
    let a = new Tree(this.max_size);
    a.t = this.t[1];
    if(!eat_parent) a.insert = (b)=>{
        // it's not recursion if you only call it once on a different object
        this.size += this.insert.call(a,b);
    };
    return a;
};
// eat_parent is whether the subtree should pretend that the parent tree does not exist
Tree.prototype._sub_right = function(eat_parent){
    let a = new Tree(this.max_size);
    a.t = this.t[2];
    if(!eat_parent) a.insert = (b)=>{
        // it's not recursion if you only call it once on a different object
        this.size += this.insert.call(a,b);
    };
    return a;
};
// converts the tree into a flat array of its items
Tree.prototype.to_array = function(){
    const r = [];
    const ts = [this.t];
    const is = [1];
    while(ts.length > 0){
        const il = is.length - 1;
        const t = ts[ts.length - 1];
        const i = is[il];
        if(
            t.length > 0 &&
            i < 3
        ){
            // add item to output
            if(i == 2) r.push(t[0]);
            
            ts.push(t[i]);
            is[il]++;
            is.push(1);
        }
        else{
            is.pop();
            ts.pop();
        }
    }
    return r;
};
/*
    does what it says it does - balances the tree
    it takes ts as input; one of the nodes in ts to be imbalanced
    is is the list of indices used to travel from the start of ts to the end; it has 1 less item than ts
    this only works if there is an imbalance of a height difference of 2
    returns 1 if the tree was imbalanced (to begin with), and 0 if the tree was balanced
    
    this function WILL give you nightmares
*/
Tree.prototype.auto_balance = function(ts, is, m = false){
    
    let tp1;
    let tt = [];
    let j = 0;
    let v = 0;
    for(j = ts.length - 3; j >= 0; j--){
        // i had to draw a diagram for this one
        
        // this code could be obfuscated quite a bit, with all the indices and 1s and 2s, but I won't do that
        // that would be too bad, even for me
        
        // i swear if i have to type another "?? 0" on this file, im going to make a post on it somehow
        // for reference, see:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
        const d = (ts[j][1][3] ?? 0) - (ts[j][2][3] ?? 0);
        // left tree is taller
        if(d == 2){
            v = 1;
            
            // BIG PULL UP
            if((ts[j][1][2][3] ?? 0) > (ts[j][1][1][3] ?? 0)){
                tp1 = ts[j][1][2];
                ts[j][1][2] = tp1[1];
                tp1[1] = ts[j][1];
                ts[j][1] = tp1[2];
                tp1[2] = ts[j];
                
                tt = [tp1, tp1[1], tp1[2]];
            }
            
            // rotate clockwise
            else{
                tp1 = ts[j][1];
                ts[j][1] = tp1[2];
                tp1[2] = ts[j];
                
                tt = [tp1, tp1[2]]
            }
        }
        // right tree is taller
        if(d == -2){
            v = 1;
            
            // BIG PULL UP
            if((ts[j][2][1][3] ?? 0) > (ts[j][2][2][3] ?? 0)){
                k = 1;
                
                tp1 = ts[j][2][1];
                ts[j][2][1] = tp1[2];
                tp1[2] = ts[j][2];
                ts[j][2] = tp1[1];
                tp1[1] = ts[j];
                
                tt = [tp1, tp1[2], tp1[1]];
            }
            
            // rotate counterclockwise
            else{
                tp1 = ts[j][2];
                ts[j][2] = tp1[1];
                tp1[1] = ts[j];
                
                tt = [tp1, tp1[1]];
            }
        }
        if(v){
            /*
            i call this step "pulling it up"
            what's really funny is it is the same for both directions!
            with BIG PULL UP, we pull tp1 up 2 layers
            the 1st layer of the BIG PULL UP was already pushed down in earlier if-statements
            but with the rotation cases, we only pull it up 1 layer
            NOTE: pulling up to the root node is different
            */
            if(j == 0)
                this.t = tp1;
            else
                ts[j - 1][is[j - 1]] = tp1;
            
            break;
        }
    }
    // fix the heights
    if(v || m){
        // when we rebalance the tree, the nodes that we need to remeasure heights on can vary
        // so we use tt to specify which nodes need their heights measured, since not all nodes of the tree are effected by rebalancing
        const tu = ts.slice(0, j + 1 - v);
        tu.push(...tt);
        tu.push([]);
        
        this.measure_heights(tu);
    }
    
    return v;
};
// remove the left-most item of the tree
// much simpler than the normal remove function for an ABT
Tree.prototype.shift = function(){
    if(this.size <= 0) return this.t = [];
    
    let ts = [this.t];
    let is = [];
    for(let i = 0, t = ts[0]; t[1].length > 0; i++){
        is.push(1);
        t = t[1];
        ts.push(t);
    }
    if(ts[ts.length - 1][3] > 1)
        // first, remove the last node in the stack from the tree, then add its right child, if any, to the stack
        ts[ts.length - 1] = (
            (ts.length > 1) ?
            ts[ts.length - 2][1] =
            ts[ts.length - 1][2] :
            this.t[1] =
            ts[ts.length - 1][2]
        );
    else
        // remove the node from the tree
        (ts.length > 1) ?
        ts[ts.length - 2][1] = [] :
        this.t[1] = [],
        // then replace it with 2 empty nodes bc auto_balance is weird like that
        ts[ts.length - 1] = [0,[],[],1], ts.push(ts[ts.length - 1][2]);
    
    this.measure_heights(ts);
    this.auto_balance(ts, is, true);
    // LOL again the classic
    this.size--;
};
// this uses a parameter for which stack of nodes to measure heights on, since measuring the heights of the entire tree would be inefficient if was very large
Tree.prototype.measure_heights = function(ts){
    for(let i = ts.length - 2; i >= 0; i--){
        ts[i][3] = Math.max((ts[i][1][3] ?? 0), (ts[i][2][3] ?? 0)) + 1;
    }
};
// this will not give you nightmares
// returns the number of items added, kinda like what array.push does
Tree.prototype.insert = function(b){
    let went_right = false;
    let ts = [this.t];
    let is = [];
    let t = ts[0];
    // worst function ever
    let inc_ts = (v = 0)=>{
        this.size += v;
        return v;
    };
    while(true){
        // we are using ts as a stack
        t = ts[ts.length - 1];
        
        // trees in JavaScript definitely are not their own breed of monster
        // >:D
        if(!t[0]){
            const at_max = (
                this.max_size >= 0 &&
                this.size >= this.max_size
            );
            if(at_max){
                // avoid building deeper to the left if the size is already too big
                if(!went_right)
                    return inc_ts();
                // remove the left-most of the tree
            }
            // i think ive read too much obfuscated JS lately...
            t[0] = b;
            t[1] = [];
            t[2] = [];
            t[3] = 1;
            this.measure_heights(ts);
            this.auto_balance(ts, is, 0);
            if(at_max){
                while(this.size >= this.max_size)
                    this.shift();
            }
            return inc_ts(1);
        }
        
        // if b > t[0], go right
        if(this.gt_f(b, t[0])){
            went_right = true;
            is.push(2);
            ts.push(t[2]);
        }
        // if b <= t[0], go left
        else{
            is.push(1);
            ts.push(t[1]);
        }
    }
};


