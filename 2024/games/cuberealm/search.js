
if(0) (()=>{
    // generic auto-balancing binary tree in JavaScript
    const Tree = function(sort_f,max_size){
        this.sort_f = sort_f || this.sort_f;
        this.max_size = max_size ?? -1;
        // no recursion, and no node class!
        this.t = [];
    };
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
                r.push(t[0]);
                
                ts.push(t[i]);
                is[il]++;
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
    Tree.prototype.auto_balance = function(ts, is){
        // last item in ts is a leaf node, so lets ignore it
        for(let j = ts.length - 2; j >= 0; j--){
            // i had to draw a diagram for this one
            let d = ts[j][1][3] - ts[j][2][3];
            // left tree is taller: rotate clockwise
            if(d == 2){
                // we can use our stack to avoid duplicate assignments, which is nice
                ts[j][1] = ts[j + 1][2];
                ts[j + 1][2] = ts[j][1];
                // i call this step "pulling it up"
                ts[j - 1][is[j - 1]] = ts[j + 1];
                return 1;
            }
            // right tree is taller: rotate counterclockwise
            if(d == -2){
                ts[j][2] = ts[j + 1][1];
                ts[j + 1][1] = ts[j][2];
                // i call this step "pulling it up"
                // what's really funny is it is the same for both directions!
                ts[j - 1][is[j - 1]] = ts[j + 1];
                return 1;
            }
        }
        return 0;
    };
    // remove the left-most item of the tree
    // much simpler than the normal remove function for an ABT
    Tree.prototype.unshift = function(){
        let ts = [this.t];
        for(let i = 0, t = ts[0]; t[1].length > 0; i++){
            t = t[1];
            ts.push(t);
        }
        ts[ts.length - 1][3]--;
        // decrease heights for the auto-balancer
        for(let i = ts.length - 2; i >= 0; i--){
            ts[i][3] = Math.max(ts[i][1][3], ts[i][2][3]) + 1;
        }
    };
    // this will not give you nightmares
    // returns the number of items added, kinda like what array.push does
    Tree.prototype.insert = (b) => {
        let went_right = false;
        let ppt = null;
        let pt = null;
        let ts = [this.t];
        let is = [];
        let t = ts[0];
        let inc_ts = (v)=>{
            if(v){
                ts[ts.length - 1][3] += v;
                for(let i = ts.length - 2; i >= 0; i--){
                    ts[i][3] = Math.max(ts[i][1][3], ts[i][2][3]) + 1;
                }
            }
            return v;
        };
        while(true){
            // we are using ts as a stack
            t = ts[ts.length - 1];
            
            // trees in JavaScript definitely are not their own breed of monster
            // >:D
            if(!t[0]){
                if(this.size >= this.max_size){
                    // avoid building deeper to the left if the size is already too big
                    if(!went_right)
                        return inc_ts(0);
                    // remove the left-most of the tree
                }
                // i think ive read too much obfuscated JS lately...
                size++;
                t[0] = b;
                t[1] = [];
                t[2] = [];
                t[3] = 0;
                this.auto_balance(ts, is);
                if(this.size >= this.max_size){
                    this.shift();
                    return inc_ts(0);
                }
                return inc_ts(1);
            }
            
            // if b > t[0], go right
            if(compare(b, t[0])){
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
    
    window.deob = {
        inventory: "yfD",
        main_hand: "yTu",
        durability: "GIA",
        health: "yIr",
        position: "yRR",
        location: "yoe",
        orientation: "yok",
        x: "yyi",
        y: "yyt",
        z: "yyb",
    };
    
    window.my_dura = (()=>(
        my_guy?.
        [deob.inventory]?.
        [deob.main_hand]?.
        [deob.durability] ??
        "?"
    ));
    window.my_hp = (()=>(
        my_guy?.
        [deob.health] ??
        "?"
    ));
    
    // only launch p5.js once
    let launched_yet = false;
    // whether to actually use p5.js at all
    let use_p5js = false;
    // whether to use the custom renderer with "improved seeing"
    let use_3d_render = false;
    const launch = function(){
        if(!use_p5js) return;
        if(launched_yet) return;
        launched_yet = true;
        
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.js";
        document.body.appendChild(s);
    };
    
    window.my_p = {
        x  : 0, y  : 0, z  : 0,
        rx : 0, ry : 0,
        six: 0, siy: 0, siz: 0,
        speed: {
        x  : 0, y  : 0, z  : 0,
        },
        d_sq: function(ab){
            return (
                (ab[0][0] - this.x) ** 2 +
                (ab[0][1] - this.y) ** 2 +
                (ab[0][2] - this.z) ** 2
            );
        },
        d: function(ab){
            return (this.d_sq(ab) ** 0.5);
        },
        update: function(){
            const pos = my_guy[deob.position];
            const loc = pos[deob.location];
            const ori = pos[deob.orientation];
            
            // extract obfuscated stuff
            this.x = loc[deob.x];
            this.y = loc[deob.y];
            this.z = loc[deob.z];
            this.rx = ori[deob.x];
            this.ry = ori[deob.y];
            
            // get chunk coords!
            this.cx = Math.floor(this.x / 32);
            this.cy = Math.floor(this.y / 32);
            this.cz = Math.floor(this.z / 32);
        },
    };
    
    // list of 4D points; 1st D is time, next 3 are space
    const my_ps = [];
    let my_pi = 0;
    const my_pc = 160;
    const my_pe = 1.0;
    const track = function(){
        my_ps[my_pi] = ([(new Date).getTime(), my_p.x, my_p.y, my_p.z]);
        my_pi = (my_pi + 1) % my_pc;
        
        // I need at least 2 data points
        if(my_pc.length < 2) return;
        
        // relative my_pc bc we don't start with all values full
        let my_pcr = Math.min(my_pc, my_ps.length);
        let my_pir = (my_pc > my_ps.length) ? 0 : my_pi;
        
        const speed = {
            x: 0,
            y: 0,
            z: 0,
        };
        
        const base_time = my_ps[my_pir][0];
        const total_time = ((()=>{
            let total_time_l = 0;
            for(let i = 0; i < my_pcr; i++){
                // these squares are inefficiently calculated twice LOL
                total_time_l += (my_ps[i][0] - base_time) ** my_pe;
            }
            return total_time_l;
        })());
        
        for(
            let i = (my_pir - 1 + my_pcr) % my_pcr,
                j;
            i != my_pir;
            i = j
        ){
            const at = my_ps[i][0];
            const bt = (at - base_time) ** my_pe;
            // j is the one before i
            j = (i - 1 + my_pcr) % my_pcr;
            const dt = at - my_ps[j][0];
            
            // weight the speed by the current time, squared, to make recent moments more significant
            // speed = dist / time taken
            // relative time, with the weighting mentioned above
            const rt = bt / dt;
            speed.x += rt * (my_ps[i][1] - my_ps[j][1]);
            speed.y += rt * (my_ps[i][2] - my_ps[j][2]);
            speed.z += rt * (my_ps[i][3] - my_ps[j][3]);
        }
        
        // reminder: when you take a weighted sum, you need to divide by the total of the weights
        speed.x /= total_time;
        speed.y /= total_time;
        speed.z /= total_time;
        // convert speed per ms to speed per s
        speed.x *= 1000;
        speed.y *= 1000;
        speed.z *= 1000;
        
        // everyone's favorite kind of "return"
        my_p.speed = speed;
        // the OOP globalizing return!
    }
    
    var B;
    var B2;
    var FOVX;
    var b_needs_rebuilt = true;
    
    var p_pts = [];
    
    /*
    pos X is right
    pos Y is down
    pos Z is forward
    */
    
    var p_roty = 0; // yaw   - applied 1st
    var p_rotx = 0; // pitch - applied 2nd
    
    var p_scale = 100;
    var p_fill = 0.3;
    
    // p5.js setup (for 3D renderer)
    window.setup = function(){
        const canvas = createCanvas(innerWidth, innerHeight, WEBGL);
        
        // need to see my stuff
        const main = document.querySelector("main:has(canvas.p5Canvas)");
        main.style.position = "fixed";
        main.style.top = "0";
        main.style.pointerEvents = "none";
        canvas.style.position = "fixed";
        canvas.style.pointerEvents = "none";
        
        FOVX = 100 * PI/180;
        
        // when buildGeometry is called, all global fns apply to that Geometry object's data
        B = buildGeometry(function(){
            // using scope trickery behind the scenes
            box(1);
        });
        
        // set B2 an empty geo
        beginGeometry();
        B2 = endGeometry();
        
        let p;
        new p5(function(pa){
            p = (this == window) ? pa : this;
            console.log("wtf?!", p);
            p.setup = function(){
                const canvas = p.createCanvas(innerWidth, innerHeight).canvas;
                canvas.style.position = "fixed";
                canvas.style.pointerEvents = "none";
                canvas.style.top = "0";
                console.log("wft 2?!", canvas);
            };
            p.draw = function(){
                my_p.update();
                // track our speed with a moving average
                track();
                
                p.clear();
                p.textSize(16);
                p.fill(0);
                p.text('du: ' + my_dura(), 20, 20);
                p.text('hp: ' + my_hp(), 20, 40);
                p.text((
                    'scan: ' +
                    my_p.six +
                    "," +
                    my_p.siy +
                    "," +
                    my_p.siz
                ), 20, 60);
                
                // LOL
                // ive been calling it speed
                // but I know its velocity
                p.text((
                    've: ' +
                    (my_p.speed.x).toFixed(2) +
                    "," +
                    (my_p.speed.y).toFixed(2) +
                    "," +
                    (my_p.speed.z).toFixed(2)
                ), 20, 80);
            };
        });
        p._setup();
    };
    
    // p5.js draw (for 3D renderer)
    window.draw = function() {
        clear();
        if(!use_3d_render) return;
        
        // make sure it looks right
        camera(0,0,0, 0,0,-3000);
        
        // FOV and stuff
        perspective(FOVX * innerHeight / innerWidth);
        
        // how much to translate, considering the boxes are 1 unit wide
        const TM  = 1/p_fill;
        
        if(b_needs_rebuilt){
            resizeCanvas(innerWidth, innerHeight);
            b_needs_rebuilt = false;
            // this might be causing lag, so let's delete it
            freeGeometry(B2);
            
            // this works like a stack
            beginGeometry();
            
            // scale first, because this is applied to the world's coordinates (i.e. everything after)
            scale(p_scale / TM);
            
            // just for debugging
            p_pts = (window.my_pts || []).concat([
                // [my_p.x + 10, my_p.y, my_p.z],
                // [my_p.x, my_p.y + 10, my_p.z],
                // [my_p.x, my_p.y, my_p.z + 10],
                // [my_p.x - 10, my_p.y, my_p.z],
                // [my_p.x, my_p.y - 10, my_p.z],
                // [my_p.x, my_p.y, my_p.z - 10],
            ]);
            if(p_pts.length > 0){
                for(let i = 0; i < p_pts.length; i++){
                    p_pts[i][0] += 0.5;
                    p_pts[i][1] -= 0.5;
                    p_pts[i][2] += 0.5;
                    p_pts[i][2] *= -1;
                }
                
                let p1 = p_pts[0], p2, pd;
                translate(
                    p1[0] * TM,
                    p1[1] * TM,
                    p1[2] * TM,
                );
                for(let i = 0; i < p_pts.length; i++){
                    p2 = p1;
                    p1 = p_pts[i];
                    pd = [
                        p1[0] - p2[0],
                        p1[1] - p2[1],
                        p1[2] - p2[2],
                    ];
                    translate(
                        pd[0] * TM,
                        pd[1] * TM,
                        pd[2] * TM,
                    );
                    model(B);
                }
            }
            // oh my! this is just too crazy!!!
            B2 = endGeometry();
        }
        
        // move it first
        beginGeometry();
        translate(
            -my_p.x * p_scale,
            -my_p.y * p_scale,
             my_p.z * p_scale,
        );
        model(B2);
        const B3 = endGeometry();
        
        p_rotx = +my_p.rx + PI; // pitch (X)
        p_roty = +my_p.ry; // yaw   (Y)
        rotateX(p_rotx); // pitch - applied 2nd
        rotateY(p_roty); // yaw   - applied 1st
        
        model(B3);
        
        freeGeometry(B3);
    }
    
    window.nums = {
        "coal": 37,
        "copper": 38,
        "iron": 39,
        "gold": 40,
        "platinum": 41,
        "diamond": 42,
        "ruby": 43,
        "sapphire": 44,
        "emerald": 45,
        "amethyst": 46,
        "infernium": 47,
        "realm_crystal": 48,
        "stone_c": 53,
        "copper_c": 57,
        "iron_c": 61,
        "gold_c": 65,
        "diamond_c": 69,
        "obsidian_c": 214,
    };
    window.names = {
        ores: {
            37: "coal",
            38: "copper",
            39: "iron",
            40: "gold",
            41: "platinum",
            42: "diamond",
            43: "ruby",
            44: "sapphire",
            45: "emerald",
            46: "amethyst",
            47: "infernium",
            48: "realm_crystal",
        },
        53: "stone_c",
        54: "stone_c",
        55: "stone_c",
        56: "stone_c",
        57: "copper_c",
        58: "copper_c",
        59: "copper_c",
        60: "copper_c",
        61: "iron_c",
        62: "iron_c",
        63: "iron_c",
        64: "iron_c",
        65: "gold_c",
        66: "gold_c",
        67: "gold_c",
        68: "gold_c",
        69: "diamond_c",
        70: "diamond_c",
        71: "diamond_c",
        72: "diamond_c",
        214: "obsidian_c",
        215: "obsidian_c",
        216: "obsidian_c",
        217: "obsidian_c",
    };
    window.priority = {
        ores: {
            37: 0,
            38: 1,
            39: 1,
            40: 2,
            41: 3,
            42: 6, // dia
            43: 4, // rub
            44: 4, // sap
            45: 5, // eme
            46: 4, // ame
            47: 8,
            48: 9,
        },
        53: 20,
        54: 20,
        55: 20,
        56: 20,
        57: 21,
        58: 21,
        59: 21,
        60: 21,
        61: 22,
        62: 22,
        63: 22,
        64: 22,
        65: 23,
        66: 23,
        67: 23,
        68: 23,
        69: 24,
        70: 24,
        71: 24,
        72: 24,
    };
    
    // a simply marker for chunks that have been saved
    const SAVED = Symbol("SAVED CHUNK");
    
    // whether to save what data was found in chunks
    window.do_save = true;
    // the data found in chunks
    window.saved_chunks = {};
    window.to_save = [];
    
    // list of chunks that have been scanned
    window.scanned_chunks = {};
    window.to_scan = [];
    window.to_rem = [];
    
    // whether or not to scan chunks for `improved seeing`
    window.do_scan = true;
    window.do_scan_ores = true;
    window.scan_size = 1;
    window.report = [];
    window.report_size = 100;
    window.report_wl = 100;
    window.report_i = 0;
    
    // 1002 is the "unloaded_chunk_indicator"
    const UNLOADED = 1002;
    
    window.list_chunks = function(){
        const x = my_p.cx;
        const y = my_p.cy;
        const z = my_p.cz;
        const ax = x - 8;
        const ay = y - 3;
        const az = z - 8;
        const bx = x + 8;
        const by = y + 3;
        const bz = z + 8;
        for(let iy = ay; iy <= by; iy++){
            for(let iz = az; iz <= bz; iz++){
                for(let ix = ax; ix <= bx; ix++){
                    const sx = ix * 16;
                    const sy = iy * 16;
                    const sz = iz * 16;
                    const ss = sx + "_" + sy + "_" + sz;
                    const sd = [sx, sy, sz, ss];
                    const loaded = (my_see(sx, sy, sz) != UNLOADED);
                    if(loaded && do_scan && !scanned_chunks[ss]){
                        to_scan.push(sd);
                    }
                    if(loaded && do_save && !saved_chunks[ss]){
                        to_save.push(sd);
                    }
                    if(!loaded && scanned_chunks[ss]){
                        to_rem.push(sd);
                    }
                }
            }
        }
    };
    window.auto_save_chunks = function(){
        // for now, this will just do nothing
        // this shouldn't cause any issues except for **slowly** filling up my RAM
        
        // first, reverse clone the array
        const ts = to_save;
        window.to_save = [];
        
        // then process our copy
        for(let i = 0; i < ts.length; i++){
            const c = ts[i];
            // we will just add the items to the saved chunks "list"
            saved_chunks[c[3]] = SAVED;
        }
    };
    window.auto_scan_chunks = function(){
        // first, reverse clone the array
        const ts = to_save;
        window.to_save = [];
        
        // then process our copy
        for(let i = 0; i < ts.length; i++){
            const c = ts[i];
            const s = [];
            // we will just add the items to the saved chunks "list"
            scanned_chunks[c[3]] = s;
            for(
                let iy = 0, iz = 0, ix = 0;
                iy < 16;
                // if you're using a tripple for-loop
                // then you must be uneducated;
                // clearly this is the correct way to iterate 3 independent variables!
                (ix == 15) ?
                (ix = 0, (iz == 15) ?
                (iz = 0, iy++) :
                (iz++)) :
                (ix++)
            ){
                const type = my_see(ix, iy, iz);
                const good = !!(priority[type] ?? priority.ores[type]);
                if(good) s.push([[ix, iy, iz], type]);
            }
        }
    };
    window.auto_rem_chunks = function(){
        // first, reverse clone the array
        const ts = to_save;
        window.to_save = [];
        
        // then process our copy
        for(let i = 0; i < ts.length; i++){
            const c = ts[i];
            // we will just add the items to the saved chunks "list"
            delete scanned_chunks[c[3]];
        }
    };
    
    // the only reason this has so many comments is that I know future me will have a hard time understanding it
    window.make_report = function(){
        const p = ((type) =>
            priority[type] ?? priority.ores[type]
        );
        // returns true if a > b, and false if a <= b
        const compare = (a,b) => {
            // sort FIRST by priority
            let d = p(a[1]) - p(b[1]);
            // SECOND by distance from the player
            if(!d) d = a[2] - b[2];
        };
        const tree = new Tree(compare, report_size);
        
        const blocks = [];
        for(let i in scanned_chunks){
            const s = scanned_chunks[i];
            for(let b of s){
                blocks.push(b);
            }
        }
        for(let b of blocks){
            b[2] = my_p.d_sq(b);
        }
        for(let b of blocks){
            tree.insert(b);
        }
        const r = tree.to_array();
        window.report = r;
    };
    
    let ready = true;
    const p = function(){
        if(!ready)
            return;
        ready = false;
        
        try{
            if(!my_see || !my_guy)
                return;
            
            // checks 64k blocks around the player
            // but only every once in a while
            list_chunks();

            // mess with block arrays to get a flat array,
            // first sorted by priority of block type,
            // and then by closeness to player
            const t = [];
            for(let i in yay_use){
                if(yay_use[i].length == 0)
                    continue;

                const p = priority.ores[i] || priority[i];
                t.push([p, yay_use[i]]);
            }
            t.sort((a,b)=>b[0] - a[0]);
            // merge items of the same priority
            for(let i = 0, j = 0; i < t.length; i++){
                if(i == j) continue;
                const u = t[i];
                const v = t[j];
                if(u[0] == v[0]){
                    for(let ii = 1; ii < u.length; ii++){
                        v.push(u[ii]);
                    }
                    continue;
                }
                j++;
            }
            
            // flatten merged stuff and then sort it
            const tm1 = t.map(a=>a.slice(1).flat(1));
            // console.log("tm1", tm1);
            for(let i = 0; i < tm1.length; i++){
                const u = tm1[i];
                u.sort((a,b)=>d(a) - d(b));
            }
            // flatten everything one last time
            const v = [];
            for(let i = 0; i < tm1.length; i++){
                for(let ii = 0; ii < tm1[i].length; ii++){
                    v.push(tm1[i][ii]);
                }
            }
            
            const my_s = v.slice(0, report_size);
            const todo = {};
            my_s.forEach((ab)=>{
                // mark blocks that are no longer what we are looking for
                if(yay_rem(ab[0][0], ab[0][1], ab[0][2], ab[1])){
                    ab[2] = 1;
                    todo[ab[1]] = 1;
                }
            }
            );
            
            // delete everything marked earlier
            for(let type in todo){
                let j = 0;
                for(let i = 0; i < yay_use[type].length; i++){
                    if(yay_use[type][i][2])
                        continue;
                    yay_use[type][j] = yay_use[type][i];
                    j++
                }
                yay_use[type] = yay_use[type].slice(0, j);
            }
            
            if(report_i >= report_wl){
                report_i = 0;
                
                const new_pts = [];
                for(let i = 0; i < my_s.length; i++){
                    const px = my_s[i][0][0];
                    const py = my_s[i][0][1];
                    const pz = my_s[i][0][2];
                    new_pts.push([px, py, pz]);
                }
                window.my_pts = new_pts;
                b_needs_rebuilt = true; // (my_pts.length > 0);
                
                // launch p5.js or ensure it has launched
                launch();
                
                // console.log(my_s.map(ab=>(names[ab[1]] || names.ores[ab[1]]) + " @ " + ab[0].join(", ") + " - " + Math.sqrt(d(ab)).toFixed(0) + " blocks away").join("\n"));
            }
            else{
                report_i++;
            }
            
        }
        catch(e){
            console.log("frame err", e);
        }

        ready = true;
    };
    
    setInterval(p, 20);
}
)();

