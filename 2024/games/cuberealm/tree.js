let copy = function(a = []){
    return a.map(b => (b instanceof Array) ? copy(b) : b);
};

// generic auto-balancing binary tree in JavaScript
const Tree = function(sort_f,max_size){
    this.sort_f = sort_f || this.sort_f;
    this.max_size = max_size ?? -1;
    // no recursion, and no node class!
    this.t = [];
};
Tree.prototype.size = 0;
// returns true if a > b, and false if a <= b
Tree.prototype.sort_f = function(a,b){
    return a > b;
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
// does what it says it does - balances the tree
// it takes ts as input; one of the nodes in ts to be imbalanced
// is is the list of indices used to travel from the start of ts to the end; it has 1 less item than ts
// this only works if there is an imbalance of a height difference of 2
// returns 1 if the tree was imbalanced (to begin with), and 0 if the tree was balanced
Tree.prototype.auto_balance = function(ts, is, m = false, d){
    // console.log("ts", copy(ts)),
    // console.log("is", copy(is));
    
    let tp1;
    let j;
    let v = 0;
    let k = 0;
    // last item in ts is a leaf node, so lets ignore it
    // the item before it also can't be unbalanced due to one insertion or removal
    for(j = ts.length - 3; j >= 0; j--){
        // i had to draw a diagram for this one
        
        // this code could be obfuscated quite a bit, with all the indices and 1s and 2s, but I won't do that
        // that would be too bad, even for me
        
        const d = (ts[j][1][3] ?? 0) - (ts[j][2][3] ?? 0);
        // left tree is taller
        if(d == 2){
            v = 1;
            
            // BIG PULL UP
            // i swear if i have to type another "?? 0" on this file, im going to make a post on it somehow
            if(ts[j][1][2][3] ?? 0 > ts[j][1][1][3] ?? 0){
                k = 1;
                
                tp1 = ts[j][1][2];
                ts[j][1][2] = tp1[1];
                tp1[1] = ts[j][1];
                ts[j][1] = tp1[2];
                tp1[2] = ts[j];
            }
            
            // rotate clockwise
            else{
                // i just realized that remove code can't use the insert stack
                tp1 = ts[j][1];
                ts[j][1] = tp1[2];
                tp1[2] = ts[j];
            }
        }
        // right tree is taller
        if(d == -2){
            v = 1;
            
            // BIG PULL UP
            if(ts[j][2][1][3] ?? 0 > ts[j][2][2][3] ?? 0){
                k = 1;
                
                tp1 = ts[j][2][1];
                ts[j][2][1] = tp1[2];
                tp1[2] = ts[j][2];
                ts[j][2] = tp1[1];
                tp1[1] = ts[j];
            }
            
            // rotate counterclockwise
            else{
                // i just realized that remove code can't use the insert stack
                tp1 = ts[j][2];
                ts[j][2] = tp1[1];
                tp1[1] = ts[j];
            }
        }
        if(v){
            // i call this step "pulling it up"
            // what's really funny is it is the same for both directions!
            // NOTE: pulling up to the root node is different
            if(j == 0)
                this.t = tp1;
            else
                ts[j - 1][is[j - 1]] = tp1;
            
            // LOL it's the classic!
            break;
        }
    }
    // fix the heights
    const tt = ts.slice(0, j - k);
    // add this guy bc he's the relevant item when removing
    tt.push(tp1);
    // why must the BIG PULL UP be so complicated?!
    if(k) tt.push([]);
    
    if(v || m) this.measure_heights(tt);
    
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
    if(ts[ts.length - 1][3] > 0)
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
        // then remove it from the stack
        ts.pop();
    // decrease heights for the auto-balancer
    for(let i = ts.length - 2; i >= 0; i--){
        ts[i][3] = Math.max(ts[i][1][3] ?? 0, ts[i][2][3] ?? 0) + 1;
    }
    this.auto_balance(ts, is, true);
    // LOL again the classic
    this.size--;
};
Tree.prototype.measure_heights = function(ts){
    for(let i = ts.length - 2; i >= 0; i--){
        ts[i][3] = Math.max(ts[i][1][3] ?? 0, ts[i][2][3] ?? 0) + 1;
    }
};
// this will not give you nightmares
// returns the number of items added, kinda like what array.push does
Tree.prototype.insert = function(b, d){
    let went_right = false;
    let ppt = null;
    let pt = null;
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
            this.auto_balance(ts, is, 0, d);
            if(at_max){
                while(this.size >= this.max_size)
                    this.shift();
            }
            return inc_ts(1);
        }
        
        // if b > t[0], go right
        if(this.sort_f(b, t[0])){
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

const t = new Tree(0, 10);

for(let i = 0; i < 100; i++){
    t.insert(Math.floor(Math.random() * 10000));
}

console.log("tree", t);
console.log("flat", t.to_array());


