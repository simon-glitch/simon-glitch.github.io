
if(0) (()=>{
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
    
    // only launch once
    let launched_yet = false;
    const launch = function(){
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

    // p5.js setup
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

    // p5.js draw
    window.draw = function() {
        // make sure it looks right
        camera(0,0,0, 0,0,-3000);
        clear();
        
        // transparent background for good reasons
        
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
    window.report_size = 100;
    window.report_wl = 100;
    window.report_i = 0;
    
    // 1002 is the "unloaded_chunk_indicator"
    const UNLOADED = 1002;
    
    window.list_chunks = function(){
        const x = Math.floor(my_p.x / 32);
        const y = Math.floor(my_p.y / 32);
        const z = Math.floor(my_p.z / 32);
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

