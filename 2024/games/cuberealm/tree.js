let copy = function(a = []){
    return a.map(b => (b instanceof Array) ? copy(b) : b);
};

// generic auto-balancing binary tree in JavaScript
const Tree = function(sort_f,max_size){
    this.sort_f = sort_f || this.sort_f;
    this.max_size = (max_size ?? -1);
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
/*
    does what it says it does - balances the tree
    it takes ts as input; one of the nodes in ts to be imbalanced
    is is the list of indices used to travel from the start of ts to the end; it has 1 less item than ts
    this only works if there is an imbalance of a height difference of 2
    returns 1 if the tree was imbalanced (to begin with), and 0 if the tree was balanced
    
    this function WILL give you nightmares
*/
Tree.prototype.auto_balance = function(ts, is, m = false, de){
    // console.log("ts", copy(ts)),
    // console.log("is", copy(is));
    
    let tp1;
    // let trj = 0;
    let tt = [];
    let j = 0;
    let v = 0;
    let k = 0;
    // last item in ts is a leaf node, so lets ignore it
    // the item before it also can't be unbalanced due to one insertion or removal
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
                if(de) console.log("+ k", j);
                if(de) console.log("tp1", copy(tp1));
                if(de) console.log("ts", copy(ts));
                ts[j][1][2] = tp1[1];
                tp1[1] = ts[j][1];
                ts[j][1] = tp1[2];
                tp1[2] = ts[j];
                if(de) console.log("tp1 2", copy(tp1));
                if(de) console.log("ts 2", copy(ts));
                
                tt = [tp1, tp1[1], tp1[2]];
            }
            
            // rotate clockwise
            else{
                tp1 = ts[j][1];
                if(de) console.log("+ j", j);
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
                if(de) console.log("- k", j);
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
                if(de) console.log("- j", j);
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
            if(de) console.log("time to pull up");
            if(de) console.log("tp1", copy(tp1));
            if(de) console.log("this.t", copy(this.t));
            if(de) console.log("ts", copy(ts));
            if(de) console.log("ts[j - 1]", copy(ts[j - 1]));
            if(j == 0)
                this.t = tp1;
            else
                ts[j - 1][is[j - 1]] = tp1;
            
            if(de) console.log("post pull up check");
            if(de) console.log("tp1", copy(tp1));
            if(de) console.log("this.t", copy(this.t));
            if(de) console.log("ts", copy(ts));
            if(de) console.log("ts[j - 1]", copy(ts[j - 1]));
                
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
        
        if(de) console.log("tt", copy(tt));
        if(de) console.log("tu", copy(tu));
        if(de) console.log("balanced", copy(this.t));
    }
    
    return v;
};
// remove the left-most item of the tree
// much simpler than the normal remove function for an ABT
Tree.prototype.shift = function(de){
    if(this.size <= 0) return this.t = [];
    
    let ts = [this.t];
    let is = [];
    for(let i = 0, t = ts[0]; t[1].length > 0; i++){
        is.push(1);
        t = t[1];
        ts.push(t);
    }
    if(de) console.log("ts 1", copy(ts));
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
    if(de) console.log("ts 2", copy(ts));
    this.measure_heights(ts);
    this.auto_balance(ts, is, true, de);
    // LOL again the classic
    this.size--;
};
Tree.prototype.measure_heights = function(ts, r = 2){
    for(let i = ts.length - r; i >= 0; i--){
        ts[i][3] = Math.max((ts[i][1][3] ?? 0), (ts[i][2][3] ?? 0)) + 1;
    }
};
// this will not give you nightmares
// returns the number of items added, kinda like what array.push does
Tree.prototype.insert = function(b, de = 0){
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
            this.auto_balance(ts, is, 0, de);
            if(at_max){
                while(this.size >= this.max_size)
                    this.shift(de);
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

t.insert(300);
// console.log("check 1", t.to_array());
// console.log(copy(t.t));
t.insert(70);
// console.log("check 2", t.to_array());
// console.log(copy(t.t));
t.insert(304);
// console.log("check 3", t.to_array());
// console.log(copy(t.t));
t.insert(320);
// console.log("check 4", t.to_array());
// console.log(copy(t.t));
t.insert(100);
// console.log("check 5", t.to_array());
// console.log(copy(t.t));
t.insert(1);
// console.log("check 6", t.to_array());
// console.log(copy(t.t));
t.insert(0);
// console.log("check 7", t.to_array());
// console.log(copy(t.t));
t.insert(70);
// console.log("check 8", t.to_array());
// console.log(copy(t.t));
t.insert(85);
// console.log("check 9", t.to_array());
// console.log(copy(t.t));
t.insert(900);
// console.log("check 10", t.to_array());
// console.log(copy(t.t));
t.insert(899);
// console.log("check 11", t.to_array());
// console.log(copy(t.t));
t.insert(900);
// console.log("check 12", t.to_array());
// console.log(copy(t.t));
t.insert(899);
// console.log("check 13", t.to_array());
// console.log(copy(t.t));
t.insert(900);
// console.log("check 14", t.to_array());
// console.log(copy(t.t));
t.insert(899);
// console.log("check 15", t.to_array());
// console.log(copy(t.t));
t.insert(705);
// console.log("check 16", t.to_array());
// console.log(copy(t.t));
t.insert(705);
// console.log("check 17", t.to_array());
// console.log(copy(t.t));
t.insert(1705);
// console.log("check 18", t.to_array());
// console.log(copy(t.t));
t.insert(1701);
// console.log("check 19", t.to_array());
// console.log(copy(t.t));

for(let i = 0; i < 100; i++){
    t.insert(Math.floor(Math.random() * 10000));
}

console.log("tree", t);
console.log("flat", t.to_array());


