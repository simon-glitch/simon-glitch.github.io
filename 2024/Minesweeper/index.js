/*
Let's generate a minesweeper field
*/
const c = document.querySelector("canvas");
const ctx = c.getContext("2d");

/*
== Helper stuff ==
*/
/* define a constant property on an object */
const const_def = function(object, property, value){
    Object.defineProperty(object, property, {value});
};
/* symbol to get the number of bits in a `TypedArray` */
const BIT_COUNT = new Symbol();
const_def(window, "BIT_COUNT", BIT_COUNT);
/* symbol to get the number of bytes in a `TypedArray` */
const BYTE_COUNT = new Symbol();
const_def(window, "BYTE_COUNT", BYTE_COUNT);

const_def(Uint8Array    , BIT_COUNT, 8 );
const_def(Uint16Array   , BIT_COUNT, 16);
const_def(Uint32Array   , BIT_COUNT, 32);
const_def(BigUint64Array, BIT_COUNT, 64);
const_def(Int8Array     , BIT_COUNT, 8 );
const_def(Int16Array    , BIT_COUNT, 16);
const_def(Int32Array    , BIT_COUNT, 32);
const_def(BigInt64Array , BIT_COUNT, 64);
const_def(Float32Array  , BIT_COUNT, 32);
const_def(Float64Array  , BIT_COUNT, 64);

const_def(Uint8Array    , BYTE_COUNT, 8 );
const_def(Uint16Array   , BYTE_COUNT, 16);
const_def(Uint32Array   , BYTE_COUNT, 32);
const_def(BigUint64Array, BYTE_COUNT, 64);
const_def(Int8Array     , BYTE_COUNT, 8 );
const_def(Int16Array    , BYTE_COUNT, 16);
const_def(Int32Array    , BYTE_COUNT, 32);
const_def(BigInt64Array , BYTE_COUNT, 64);
const_def(Float32Array  , BYTE_COUNT, 32);
const_def(Float64Array  , BYTE_COUNT, 64);

/*
allows you to encode a 2D array of bits into a unsigned integer `TypedArray` (i.e. `Uint8Array`, `Uint16Array`, `Uint32Array`, and `BigUint64Array`) named `una`.
*/
const get_bit_at = function(una, width, x, y){
    const bits = una[BIT_COUNT];
    const i = x + y*width;
    const ii = i % bits;
    const iii = (i - ii) / bits;
    return ((una[iii] & (1 << ii)) >> ii);
};
const get_bit_at = function(u8a, width, x, y){
    const i = x + y*width;
    const ii = i % 8;
    const iii = (i - ii) / 8;
    return ((my8a[iii] & (1 << ii)) >> ii);
};

const has_mine = new Uint8Array();
const has_mine_at = function(x, y){
    return Boolean(get_bit_at());
};

const set_dim = function(w, h){
    c.width = w;
    c.height = h;
    has_mine = new Uint8Array(Math.ceil(w * h / 8));
};

const randomize = function(){
    const _4 = 16; // 2**4
    const _8 = 256; // 2**8
    const _16 = 65536; // 2**16
    const _24 = 16777216; // 2**24
    const _32 = 4294967296; // 2**32
    const _52 = 4503599627370496; // 2**52
    // keep in mind: JavaScript CAN store 2**53, but it's sometimes not safe for the inequality in a for loop, because 2**53+1 maps 2**53 and sometimes causes an infinite loop!
    
    const bm_8 = 255;
    const bm_16 = 65280;
    const bm_24 = 16711680;
    
    const has_mine_length = c.width * c.height;
    
    for(let i = 0; i < has_mine.length; i += 13){
        // fun fact: this is always an integer between 0 and (2**52 - 1)!
        // Idk why Math.random only generates 52 bits when it has 53 bits to work with
        let r1 = Math.random() * _52;
        let r2 = Math.random() * _52;
        let r5 = ((r1 % _4) << 4) | (r2 % _4);
        r1 = Math.floor(r1 / _4);
        r2 = Math.floor(r2 / _4);
        const r3 = r1 % _24;
        const r4 = r2 % _24;
        r1 = (r1 - r3) / _24;
        r2 = (r2 - r4) / _24;
        
        const rm0 = r1 & bm_8;
        const rm1 = (r1 & bm_16) >> 8;
        const rm2 = (r1 & bm_24) >> 16;
        const rm3 = r2 & bm_8;
        const rm4 = (r2 & bm_16) >> 8;
        const rm5 = (r2 & bm_24) >> 16;
        const rm6 = r3 & bm_8;
        const rm7 = (r3 & bm_16) >> 8;
        const rm8 = (r3 & bm_24) >> 16;
        const rm9 = r4 & bm_8;
        const rm10 = (r4 & bm_16) >> 8;
        const rm11 = (r4 & bm_24) >> 16;
        
        if(has_mine_length - i < 13){
            let rs = [
                r1 & bm_8, r1 & bm_16, r1 & bm_24,
                r2 & bm_8, r2 & bm_16, r2 & bm_24,
                r3 & bm_8, r3 & bm_16, r3 & bm_24,
                r4 & bm_8, r4 & bm_16, r4 & bm_24,
                // r5, < never needed
            ];
            for(let ii = 0; i < has_mine.length; i++,ii++){
                has_mine[i] = rs[ii];
            }
            
            break;
        }
        
        has_mine[i    ] =  rm0;
        has_mine[i + 1] =  rm1;
        has_mine[i + 2] =  rm2;
        has_mine[i + 3] =  rm3;
        has_mine[i + 4] =  rm4;
        has_mine[i + 5] =  rm5;
        has_mine[i + 6] =  rm6;
        has_mine[i + 7] =  rm7;
        has_mine[i + 8] =  rm8;
        has_mine[i + 9] =  rm9;
        has_mine[i +10] = rm10;
        has_mine[i +11] = rm11;
        has_mine[i +12] = r5;
    }
};

/*
generate a random maze (see Guide in function body if you want to understand the output's format)

returns a flattened 2D array of unsigned 4-bit integers
*/
const generate_maze_random = function(){
    const w = Math.floor(c.width  / 2);
    const h = Math.floor(c.height / 2);
    const off = [
        - w, // up
        + w, // down
        - 1, // left
        + 1, // right
    ]
    
    /*
    Guide:
        maze[adj] & 32 - whether cell is in outer
        maze[adj] & 16 - whether cell is taken
        maze[adj] &  8 - whether cell connects to cell above
        maze[adj] &  4 - whether cell connects to cell below
        maze[adj] &  2 - whether cell connects to cell to left
        maze[adj] &  1 - whether cell connects to cell to right
    */
    const maze = new Uint8Array(w * h);
    // indices in maze to expand into next
    const outer = [0];
    maze[0] |= 32;
    
    let iw = 0;
    while(outer.length > 0){
        if(iw > w * h){
            console.log("infinite loop!");
            break;
        }
        iw++;
        
        // remove a random cell - this makes our algorithm create a maze as randomly as possible
        const curr = outer.splice(
            Math.min(
                outer.length - 1,
                Math.floor(
                    Math.random() * outer.length
                )
            ),
            1
        )[0];
        
        // mark this cell as connected, and then
        maze[curr] |= 16;
        
        const ix = curr % w;
        const iy = (curr - ix) / h;
        
        // add adjacent cells
        const adj = [];
        if(iy >     0) adj.push(0);
        if(iy < h - 1) adj.push(1);
        if(ix >     0) adj.push(2);
        if(ix < w - 1) adj.push(3);
        
        const from = [];
        for(let i = 0; i < adj.length; i++){
            const j = curr + off[adj[i]];
            if(maze[j] & 16) from.push(i);
            else if(!(maze[j] & 32)){
                outer.push(j);
                maze[j] |= 32;
            }
        }
        
        
        // now select a random candidate to current cell to
        
        if(!from.length){
            continue;
        }
        
        const ri = from[Math.min(
            from.length - 1,
            Math.floor(
                Math.random() * from.length
            )
        )];
        const rj = curr + off[adj[ri]];
        // connect the next cell to this cell
        maze[rj] |= (1 << (adj[ri] ^ 1));
        // connect this cell to the next cell
        maze[curr] |= (1 << adj[ri]);
    }
    
    return maze;
};

/* load `maze` into our `has_mine` grid */
const load_maze = function(maze){
    const load = function(i){
        const o = i % 8;
        has_mine[(i - o) / 8] |= 1 << o;
    };
    const w = c.width;
    const h = c.height;
    const odd_w = w % 1 > 0;
    const odd_h = h % 1 > 0;
    const mw = Math.floor(w / 2);
    const off = [
        - w, // up
        + w, // down
        - 1, // left
        + 1, // right
    ];
    
    for(let i = 0; i < maze.length; i++){
        const m = maze[i];
        const ix = i % mw;
        const iy = (i - ix) / mw;
        const ii = (iy * 2 + 1) * w + (ix * 2 + 1);
        
        if(m & 16) load(ii);
        if((odd_h || iy >   0) && (m & 1)) load(ii + off[0]);
        if((odd_h || iy < h-1) && (m & 2)) load(ii + off[1]);
        if((odd_w || ix >   0) && (m & 4)) load(ii + off[2]);
        if((odd_w || ix < w-1) && (m & 8)) load(ii + off[3]);
    }
};

const display = function(){
    const D = ctx.getImageData(0,0, c.width, c.height);
    const d = D.data;
    
    console.log("start?");
    
    for(let i = 0, ii = 0; i < has_mine.length; i++){
        const s = has_mine[i];
        for(let j = 0; j < 8; j++){
            if(ii >= d.length) break;
            // `= (s & (1 << j)) << 8` works too, since `d` is a `Uint8ClampedArray`
            const si = ((s & (1 << j)) << (8 - j)) - 1;
            d[ii   ] = 1 + (i % 2) ?0  :si ;
            d[ii +1] = 1 + (i % 2) ?si :0  ;
            d[ii +2] = 1 + (i % 2) ?si :255;
            // make this pixel opaque
            d[ii +3] = 255;
            ii += 4;
        }
    }
    
    console.log("end?");
    
    ctx.putImageData(D, 0,0);
};



set_dim(55,55);

onclick = function(){

const w = Math.floor(c.width  / 2);
const h = Math.floor(c.height / 2);
const me = maze();

/*
console.log("maze", Array(w).fill(0).map((v,iy) => {
    return (
        "\n|" +
        Array(h).fill(0)
        .map((v,ix) => {
            return (
                (32 + me[iy * w + ix])
                .toString(2).slice(1)
            );
        })
        .join(" ")
        + "|"
    );
}).join(""));
*/

load_maze(me);
display();

};


