
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

const base_colors = [
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

let loaded = false;
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

function recipe(later_steps, color){
    const last = last_cs.get(color);
    later_steps.push(recipes.get(color));
    if(last === color){
        return;
    }
    recipe(later_steps, last);
}

const color_el = document.querySelector("#target_color");
const output_el = document.querySelector("#output");
let last_color = -1;
function update(e){
    if(!loaded) return;
    
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
        s += `Closest color in Lab space: #${closest.get(color).toString(16)}<br>`;
        // color = closest.get(color);
    }
    if(exists){
        const r = [];
        recipe(r, color);
        console.log("r", r);
        console.log("mixers", r.map(v => mixers[v]));
        
        s += "* " +
        r.toReversed().map(v => mixers[v].map(c => base_colors_names[c]).join(",")).join("<br>* ");
    }
    output_el.innerHTML = s;
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
    
    found = 0;
    for(let j = 0; j < _24; j++){
        if(c_exists.get(j)) found++;
    }
    // yay other features should be able to work
    loaded = true;
}

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
    load_je(raw_bytes);
};

let local_path = "";
async function load_local(){
    console.log("attempting to fetch local data");
    const response = await fetch(local_path);
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);  
    
    const buffer = await response.arrayBuffer();
    const raw_bytes = await handle_zip_file(buffer);
    load_je(raw_bytes);
}

function main(){
    version = "Colors used from 17w06a to now.";
    local_path = "./je_lab_main.zip";
    load_local();
};
main();
document.querySelector("#load_main").onclick = main;
document.querySelector("#load_2x2" ).onclick = ()=>{
    version = "Colors used from 17w06a to now (2x2 crafting grid).";
    local_path = "./je_lab_2x2.zip" ;
    load_local();
};
document.querySelector("#load_1_4" ).onclick = ()=>{
    version = "Colors used from 1.4.3 to 17w06a.";
    local_path = "./je_lab_1_4.zip" ;
    load_local();
};
document.querySelector("#load_1_2" ).onclick = ()=>{
    version = "Colors used from 12w34a (when armor dyeing was first added) to 1.4.3.";
    local_path = "./je_lab_1_2.zip" ;
    load_local();
};

