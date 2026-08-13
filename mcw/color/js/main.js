
const _24 = 2**24;
const _21 = 2**21;

class Color_Recipes{
    constructor(){
        this.d = new Uint32Array(_24);
    }
    get(idx){
        return this.d[idx];
    }
    set(idx, value){
        this.d[idx] = value;
    }
};
/** This indicate show many crafting steps it takes to obtain a color. The max is 255 because I can't imagine needing even more. I think just 15 would be enough, but there is no need to minimize the amount of data. */
class Color_Steps{
    constructor(){
        this.d = new Uint8Array(_24);
    }
    get(idx){
        return this.d[idx];
    }
    set(idx, value){
        this.d[idx] = value;
    }
};
class Color_Exists{
    constructor(){
        this.d = new Uint8Array(_21);
    }
    get(idx){
        return (this.d[idx >> 3] & (1 << (idx & 7))) >> (idx & 7);
    }
    /** `value` should only be 1 bit */
    set(idx, value){
        this.d[idx >> 3] &= ~(1   << (idx & 7));
        this.d[idx >> 3] |= value << (idx & 7);
    }
};

/** 16 choose 8 with repeitions; mixers is list of lists of dye indices; @type {number[][]} */
const mixers = (function gen_mixers(dye_c, dye_lim){
    const mixers = [];
    const mixer_a = [];
    function gen_mixers_sub(start, end, len){
        if(len <= 1){
            for(let i = start; i < end; i++){
                mixer_a.push(i);
                mixers.push(mixer_a.slice());
                mixer_a.pop();
            }
        }
        else{
            for(let i = start; i < end; i++){
                mixer_a.push(i);
                gen_mixers_sub(i, end, len - 1)
                mixer_a.pop();
            }
        }
    }
    for(let i = 1; i <= dye_lim; i++){
        gen_mixers_sub(0, dye_c, i);
    }
    return mixers;
})(16, 8);

const base_colors_je = [
    0xf9fffe, /* #f9fffe white   */
    0x9d9d97, /* #9d9d97 l_gray  */
    0x474f52, /* #474f52 gray    */
    0x1d1d21, /* #1d1d21 black   */
    0x835432, /* #835432 brown   */
    0xb02e26, /* #b02e26 red     */
    0xf9801d, /* #f9801d orange  */
    0xfed83d, /* #fed83d yellow  */
    0x80c71f, /* #80c71f lime    */
    0x5e7c16, /* #5e7c16 green   */
    0x169c9c, /* #169c9c cyan    */
    0x3ab3da, /* #3ab3da l_blue  */
    0x3c44aa, /* #3c44aa blue    */
    0x8932b8, /* #8932b8 purple  */
    0xc74ebd, /* #c74ebd magenta */
    0xf38baa, /* #f38baa pink    */
];
const base_colors_be = [
    0xf0f0f0, /* #f0f0f0 white   */
    0x9d9d97, /* #9d9d97 l_gray  */
    0x474f52, /* #474f52 gray    */
    0x1d1d21, /* #1d1d21 black   */
    0x835432, /* #835432 brown   */
    0xb02e26, /* #b02e26 red     */
    0xf9801d, /* #f9801d orange  */
    0xfed83d, /* #fed83d yellow  */
    0x80c71f, /* #80c71f lime    */
    0x5e7c16, /* #5e7c16 green   */
    0x169c9c, /* #169c9c cyan    */
    0x3ab3da, /* #3ab3da l_blue  */
    0x3c44aa, /* #3c44aa blue    */
    0x8932b8, /* #8932b8 purple  */
    0xc74ebd, /* #c74ebd magenta */
    0xf38baa, /* #f38baa pink    */
];
const base_colors_names = [
    "white",      /* #f9fffe  0 */
    "light_gray", /* #9d9d97  1 */
    "gray",       /* #474f52  2 */
    "black",      /* #1d1d21  3 */
    "brown",      /* #835432  4 */
    "red",        /* #b02e26  5 */
    "orange",     /* #f9801d  6 */
    "yellow",     /* #fed83d  7 */
    "lime",       /* #80c71f  8 */
    "green",      /* #5e7c16  9 */
    "cyan",       /* #169c9c 10 */
    "light_blue", /* #3ab3da 11 */
    "blue",       /* #3c44aa 12 */
    "purple",     /* #8932b8 13 */
    "magenta",    /* #c74ebd 14 */
    "pink",       /* #f38baa 15 */
];
const base_colors_images = [
    "<img src='assets/white_dye.png'      alt='white'     >", /* #f9fffe */
    "<img src='assets/light_gray_dye.png' alt='light_gray'>", /* #9d9d97 */
    "<img src='assets/gray_dye.png'       alt='gray'      >", /* #474f52 */
    "<img src='assets/black_dye.png'      alt='black'     >", /* #1d1d21 */
    "<img src='assets/brown_dye.png'      alt='brown'     >", /* #835432 */
    "<img src='assets/red_dye.png'        alt='red'       >", /* #b02e26 */
    "<img src='assets/orange_dye.png'     alt='orange'    >", /* #f9801d */
    "<img src='assets/yellow_dye.png'     alt='yellow'    >", /* #fed83d */
    "<img src='assets/lime_dye.png'       alt='lime'      >", /* #80c71f */
    "<img src='assets/green_dye.png'      alt='green'     >", /* #5e7c16 */
    "<img src='assets/cyan_dye.png'       alt='cyan'      >", /* #169c9c */
    "<img src='assets/light_blue_dye.png' alt='light_blue'>", /* #3ab3da */
    "<img src='assets/blue_dye.png'       alt='blue'      >", /* #3c44aa */
    "<img src='assets/purple_dye.png'     alt='purple'    >", /* #8932b8 */
    "<img src='assets/magenta_dye.png'    alt='magenta'   >", /* #c74ebd */
    "<img src='assets/pink_dye.png'       alt='pink'      >", /* #f38baa */
];

let loaded_je = false;
let loaded_be = false;
let found = 0;
let version = "";
// index of the last mixer used;
const recipes = new Color_Recipes();
// the last color used; for any i, if there is no last color, then last_cs[i] === i;
const last_cs = new Color_Recipes();
// closest color in Lab space for unobtainable colors;
const closest = new Color_Recipes();
// the number of crafting steps required to make the color;
const step_cs = new Color_Steps();
// whether the color exists; it's easiest to encode this piece of data separately;
const c_exists = new Color_Exists();

function recipe_je(later_steps, color){
    const last = last_cs.get(color);
    later_steps.push(recipes.get(color));
    if(last === color){
        return;
    }
    recipe_je(later_steps, last);
}

function recipe_be(later_steps, color){
    const data = recipes.get(color);
    // if(!(data & 0x80)){
    //     throw new Error("Color not found: " + color + ", steps: " + later_steps);
    // }
    const dye_i = data & 0x0f;
    const last = base_colors_be[dye_i];
    const cr = (color & 0xff0000) >> 16;
    const cg = (color & 0x00ff00) >> 8;
    const cb = (color & 0x0000ff);
    const lr = (last  & 0xff0000) >> 16;
    const lg = (last  & 0x00ff00) >> 8;
    const lb = (last  & 0x0000ff);
    if(cr == lr && cg == lg && cb == lb){
        // end of tail end recursion;
        return;
    }
    later_steps.push(dye_i);
    const r = (2 * cr - lr) + ((data & 0x40) >> 6);
    const g = (2 * cg - lg) + ((data & 0x20) >> 5);
    const b = (2 * cb - lb) + ((data & 0x10) >> 4);
    // end of tail end recursion;
    recipe_be(later_steps, (r << 16) | (g << 8) | b);
}


const color_el = document.querySelector("#target_color");
const output_el = document.querySelector("#output");
let last_color = -1;
function update_je(){
    if(!loaded_je) return;
    
    const s_color = color_el.value;
    let color = Number("0x"+s_color.slice(1));
    if(color === last_color) return;
    last_color = color;
    
    const exists = c_exists.get(color);
    let s = "";
    s += `Version: ${version}<br>`;
    s += `${found} colors are obtainable.<br>`;
    s += `Color is ${exists ? "" : "not"} obtainable.<br>`;
    if(!exists){
        s += `Closest color in Lab space: #${closest.get(color).toString(16)} <input type="color" value="#${closest.get(color).toString(16)}"><br>`;
        color = closest.get(color);
    }
    if(c_exists.get(color)){
        const r = [];
        recipe_je(r, color);
        console.log("r", r);
        console.log("mixers", r.map(v => mixers[v]));
        
        s += "* " +
        r.toReversed().map(v => mixers[v].map(c => base_colors_images[c]).join(",")).join("<br>* ");
    }
    else{
        s += "The closest color is not obtainable, but it is supposed to be, so there is a bug in the Lab search C++ code."
    }
    output_el.innerHTML = s;
}
function update_be(){
    if(!loaded_be) return;
    
    const s_color = color_el.value;
    let color = Number("0x"+s_color.slice(1));
    if(color === last_color) return;
    last_color = color;
    
    const exists = c_exists.get(color);
    let s = "";
    s += `Version: ${version}<br>`;
    s += `${found} colors are obtainable.<br>`;
    s += `Color is ${exists ? "" : "not"} obtainable.<br>`;
    if(!exists){
        s += `Closest color in Lab space: #${closest.get(color).toString(16)} <input type="color" value="#${closest.get(color).toString(16)}"><br>`;
        color = closest.get(color);
    }
    if(c_exists.get(color)){
        const r = [];
        recipe_be(r, color);
        console.log("r", r);
        
        s += "* " +
        r.toReversed().map(c => base_colors_images[c]).join(", then ");
    }
    else{
        s += "The closest color is not obtainable, but it is supposed to be, so there is a bug in the Lab search C++ code."
    }
    output_el.innerHTML = s;
}
function update(){
    if(loaded_je) update_je();
    if(loaded_be) update_be();
}
setInterval(update, 30);

/** @param {Uint8Array} data */
function load_je(data){
    console.log("Loading...");
    
    const save_size = _24 * 4 + _24 * 4 + _24 * 4 + _24 + _21;
    if(data.length !== save_size){
        throw new RangeError(`Expected ${save_size} bytes, but got ${data.length} bytes.`);
    }
    
    // data is SoA: recipes, then last_cs, then closest, then step_cs, then c_exists;
    let i = 0;
    for(let j = 0; j < _24; j++, i += 4){
        recipes.d[j] = (
            (data[i    ] << 24) |
            (data[i + 1] << 16) |
            (data[i + 2] <<  8) |
            (data[i + 3]      )
        );
    }
    for(let j = 0; j < _24; j++, i += 4){
        last_cs.d[j] = (
            (data[i    ] << 24) |
            (data[i + 1] << 16) |
            (data[i + 2] <<  8) |
            (data[i + 3]      )
        );
    }
    for(let j = 0; j < _24; j++, i += 4){
        closest.d[j] = (
            (data[i    ] << 24) |
            (data[i + 1] << 16) |
            (data[i + 2] <<  8) |
            (data[i + 3]      )
        );
    }
    for(let j = 0; j < _24; j++, i++){
        step_cs.d[j] = data[i];
    }
    for(let j = 0; j < _21; j++, i++){
        c_exists.d[j] = data[i];
    }
    
    console.log("Loaded!");
    
    last_color = -1;
    found = 0;
    for(let j = 0; j < _24; j++){
        if(c_exists.get(j)) found++;
    }
    // yay other features should be able to work
    loaded_be = false;
    loaded_je = true;
}
/** @param {Uint8Array} data */
function load_be(data){
    console.log("Loading...");
    
    const save_size = _24 + _24 * 4;
    if(data.length !== save_size){
        throw new RangeError(`Expected ${save_size} bytes, but got ${data.length} bytes.`);
    }
    
    // data is SoA: recipes, then closest;
    let i = 0;
    // recipes themselves is a bitpacked AoS: c_exists bit, 3 parity bits, last_dye_i;
    // but we don't need to process it much;
    for(let j = 0; j < _24; j++, i++){
        recipes.d[j] = data[i];
        c_exists.set(j, (data[i] & 0x80) >> 7);
    }
    for(let j = 0; j < _24; j++, i += 4){
        closest.d[j] = (
            (data[i    ] << 24) |
            (data[i + 1] << 16) |
            (data[i + 2] <<  8) |
            (data[i + 3]      )
        );
    }
    
    console.log("Loaded!");
    
    last_color = -1;
    found = 0;
    for(let j = 0; j < _24; j++){
        if(c_exists.get(j)) found++;
    }
    loaded_je = false;
    loaded_be = true;
}

/** @type {(data: Uint8Array) => void} */
let load_e = load_je;

async function stream_to_Uint8Array(stream){
    const reader = stream.getReader();
    const chunks = [];
    
    while(true){
        console.log("reader.read doesn't work; therefore the stream is not readable and that is the issue that needs fixed;");
        const {done, value} = await reader.read();
        if(done) break;
        chunks.push(value);
    }
    
    const len = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const result = new Uint8Array(len);
    let offset = 0;
    for(const chunk of chunks){
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}

async function handle_zip_file(buffer){
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    let eocd_offset = -1;
    for(let i = bytes.length - 22; i >= 0; i--){
        if(view.getUint32(i, true) === 0x06054b50){
            eocd_offset = i;
            break;
        }
    }
    
    if(eocd_offset === -1){
        throw new Error('Could not find Central Directory in ZIP');
    }
    
    // read offset of the Central Directory
    const cd_offset = view.getUint32(eocd_offset + 16, true);
    
    // make sure Central Directory Header signature is correct
    if(view.getUint32(cd_offset, true) !== 0x02014b50){
        throw new Error('Invalid Central Directory Header');
    }
    
    // pray we get the correct size
    const method         = view.getUint16(cd_offset + 10, true);
    const compressedSize = view.getUint32(cd_offset + 20, true);
    const localOffset    = view.getUint32(cd_offset + 42, true);
    
    const name_len  = view.getUint16(localOffset + 26, true);
    const extra_len = view.getUint16(localOffset + 28, true);
    const data_offset = localOffset + 30 + name_len + extra_len;
    
    const compressed = buffer.slice(data_offset, data_offset + compressedSize);
    
    if(method === 0){
        return new Uint8Array(compressed);
    }
    
    if(method === 8){
        const decompressed_stream = new Blob([compressed])
        .stream()
        .pipeThrough(new DecompressionStream('deflate-raw'));
            
        const array_buffer = await new Response(decompressed_stream).arrayBuffer();
        return new Uint8Array(array_buffer);
    }
    
    throw new Error(`Unsupported compression method: ${method}`);
}

document.querySelector("#my_file_input").onchange = async function(event){
    console.log("attempting to look at file input");
    const file = event.target.files[0];
    if(!file){
        console.log("There is no file.");
        return;
    }
    
    const buffer = await file.arrayBuffer();
    const raw_bytes = await handle_zip_file(buffer);
    load_e(raw_bytes);
};

let local_path = "";
async function load_local(){
    console.log("attempting to fetch local data");
    const response = await fetch(local_path);
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);  
    
    const buffer = await response.arrayBuffer();
    const raw_bytes = await handle_zip_file(buffer);
    load_e(raw_bytes);
}

function main(){
    load_e = load_je;
    version = "Colors used from 17w06a to now.";
    local_path = "./je_lab_main.zip";
    load_local();
};
main();
document.querySelector("#load_main").onclick = main;
document.querySelector("#load_2x2").onclick = ()=>{
    load_e = load_je;
    version = "Colors used from 17w06a to now (2x2 crafting grid).";
    local_path = "./je_lab_2x2.zip" ;
    load_local();
};
document.querySelector("#load_brown").onclick = ()=>{
    load_e = load_je;
    version = "Colors used from 17w06a to now (using the minimum amount of brown dye).";
    local_path = "./je_lab_12w34a.zip" ;
    load_local();
};
document.querySelector("#load_1_4_3").onclick = ()=>{
    load_e = load_je;
    version = "Colors used from 1.4.3 to 17w06a.";
    local_path = "./je_lab_1_4_3.zip" ;
    load_local();
};
document.querySelector("#load_12w34a").onclick = ()=>{
    load_e = load_je;
    version = "Colors used from 12w34a (when armor dyeing was first added) to 1.4.3. The colors themselves were added in Beta 1.2, before armor dyeing was a mechanic.";
    local_path = "./je_lab_12w34a.zip" ;
    load_local();
};
document.querySelector("#load_be").onclick = ()=>{
    load_e = load_be;
    version = "BE colors and cauldron recipes.";
    local_path = "./be_lab.zip" ;
    load_local();
};

