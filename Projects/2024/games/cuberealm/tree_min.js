let copy = function(a = []){
    return a.map(b => (b instanceof Array) ? copy(b) : b);
};

let _Tree_Factory = function(){
    // ensure that f is a function
    const f_check = function(f){
        return (
            typeof f == "function" ?
            f :
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
            this.lt_s  = lt_s ;
            this.gt_s  = gt_s ;
            this.lte_s = lte_s;
            this.gte_s = gte_s;
            this.eq_s  = eq_s ;
            this.ieq_s = ieq_s;
        }
        
        this.max_size = (max_size ?? -1);
        // no recursion, and no node class!
        this.t = [];
    };
    return Tree;
}

const Tree = _Tree_Factory();
Tree.prototype.size = 0;
Tree.prototype.gt_f = function(a,b){
    return a > b;
};
Tree.prototype.t = [];
Tree.prototype.toString = function(){
    return "Tree (" + this.size + ")";
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
Tree.prototype.auto_balance = function(ts, is, m = false){
    let tp1;
    let tt = [];
    let j = 0;
    let v = 0;
    for(j = ts.length - 3; j >= 0; j--){
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
            if(j == 0)
                this.t = tp1;
            else
                ts[j - 1][is[j - 1]] = tp1;
            
            break;
        }
    }
    // fix the heights
    if(v || m){
        const tu = ts.slice(0, j + 1 - v);
        tu.push(...tt);
        tu.push([]);
        
        this.measure_heights(tu);
    }
    
    return v;
};
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
    this.size--;
};
Tree.prototype.measure_heights = function(ts){
    for(let i = ts.length - 2; i >= 0; i--){
        ts[i][3] = Math.max((ts[i][1][3] ?? 0), (ts[i][2][3] ?? 0)) + 1;
    }
};
Tree.prototype.insert = function(b){
    let went_right = false;
    let ts = [this.t];
    let is = [];
    let t = ts[0];
    let inc_ts = (v = 0)=>{
        this.size += v;
        return v;
    };
    while(true){
        t = ts[ts.length - 1];
        if(!t[0]){
            const at_max = (
                this.max_size >= 0 &&
                this.size >= this.max_size
            );
            if(at_max){
                if(!went_right)
                    return inc_ts();
            }
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


