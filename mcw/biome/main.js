/**
* source: https://earth.motfe.net/tiles-biomes/
* - these are might match some of the colors used by chunkbase;
*/
const biome_colors = new Map(Object.entries({
    "Ocean"                 : "#000070",
    "Plains"                : "#8db360",
    "Desert"                : "#fa9418",
    "Mountains"             : "#606060",
    "Forest"                : "#056621",
    "Taiga"                 : "#0b6659",
    "Swamp"                 : "#07f9b2",
    "River"                 : "#0000ff",
    "Snowy Tundra"          : "#ffffff",
    "Snowy Mountains"       : "#a0a0a0",
    "Beach"                 : "#fade55",
    "Desert Hills"          : "#d25f12",
    "Taiga Hills"           : "#163933",
    "Jungle"                : "#537b09",
    "Jungle Hills"          : "#2c4205",
    "Jungle Edge"           : "#628b17",
    "Snowy Beach"           : "#faf0c0",
    "Giant Tree Taiga"      : "#596651",
    "Giant Tree Taiga Hills": "#454f3e",
    "Wooded Mountains"      : "#507050",
    "Savanna"               : "#bdb25f",
    "Savanna Plateau"       : "#a79d64",
    "Badlands"              : "#d94515",
    "Badlands Plateau"      : "#ca8c65",
    "Warm Ocean"            : "#0000ac",
    "Lukewarm Ocean"        : "#000090",
    "Cold Ocean"            : "#202070",
    "Deep Warm Ocean"       : "#000050",
    "Deep Lukewarm Ocean"   : "#000040",
    "Deep Cold Ocean"       : "#202038",
    "Deep Frozen Ocean"     : "#404090",
    "Sunflower Plains"      : "#b5db88",
    "Desert Lakes"          : "#ffbc40",
    "Flower Forest"         : "#2d8e49",
    "Taiga Mountains"       : "#338e81",
    "Modified Jungle Edge"  : "#8ab33f",
    "Dark Forest Hills"     : "#687942",
    "Snowy Taiga Mountains" : "#597d72",
    "Nether Wastes"         : "#c12700",
    "The End"               : "#c045e9",
}));

/**
 * this is needed because the previous map does not list every biome; since it seems to be for pre 1.18, which is definitely not what i need;
 */
const biome_mapper = new Map(Object.entries({
    "Ocean"                   : "",
    "Deep Ocean"              : "",
    "Warm Ocean"              : "",
    "Lukewarm Ocean"          : "",
    "Deep lukewarm Ocean"     : "",
    "Cold Ocean"              : "",
    "Deep Cold Ocean"         : "",
    "Frozen Ocean"            : "",
    "Deep Frozen Ocean"       : "",
    "Mushroom Fields"         : "",
    "Jagged Peaks"            : "Mountains",
    "Frozen Peaks"            : "Snowy Mountains",
    "Stony Peaks"             : "Mountains",
    "Meadow"                  : "Plains",
    "Cherry Grove"            : "Plains",
    "Grove"                   : "Snowy Taiga Mountains",
    "Snowy Slopes"            : "Snowy Mountains",
    "Windswept Hills"         : "Plains",
    "Windswept Gravelly Hills": "Plains",
    "Windswept Forest"        : "Forest",
    "Forest"                  : "",
    "Flower Forest"           : "",
    "Taiga"                   : "",
    "Old Growth Pine taiga"   : "Giant Tree Taiga",
    "Old Growth Spruce taiga" : "Giant Tree Taiga",
    "Snowy taiga"             : "",
    "Birch Forest"            : "",
    "Old Growth Birch Forest" : "Forest",
    "Dark Forest"             : "",
    "Pale Garden"             : "Dark Forest",
    "Jungle"                  : "",
    "Sparse Jungle"           : "Modified Jungle Edge",
    "Bamboo Jungle"           : "Jungle Edge",
    "Dappled Forest"          : "Forest",
    "River"                   : "",
    "Frozen River"            : "River",
    "Swamp"                   : "",
    "Mangrove Swamp"          : "Swamp",
    "Beach"                   : "",
    "Snowy Beach"             : "",
    "Stony Shore"             : "Beach",
    "Plains"                  : "",
    "Sunflower Plains"        : "",
    "Snowy Plains"            : "Snowy Tundra",
    "Ice Spikes"              : "Snowy Tundra",
    "Desert"                  : "",
    "Savanna"                 : "",
    "Savanna Plateau"         : "",
    "Windswept Savanna"       : "Savanna Plateau",
    "Badlands"                : "",
    "Wooded Badlands"         : "Badlands Plateau",
    "Eroded Badlands"         : "Badlands Plateau",
    "Deep Dark"               : "Mountains",
    "Dripstone Caves"         : "Mountains",
    "Lush Caves"              : "Mountains",
    "Sulfur Caves"            : "Mountains",
    "Ice Caves"               : "Mountains",
    "The Void"                : "The End",
    "Nether Wastes"           : "",
    "Soul Sand valley"        : "Nether Wastes",
    "Crimson Forest"          : "Nether Wastes",
    "Warped Forest"           : "Nether Wastes",
    "Basalt deltas"           : "Nether Wastes",
    "The End"                 : "",
    "Small End Islands"       : "The End",
    "End Midlands"            : "The End",
    "End Highlands"           : "The End",
    "End Barrens"             : "The End",
}));

/* I could not find the colors used by chunkbase in its JS. Yeah, I just spent several minutes looking for them. I like doing things my own way, you know. */
const app = {};
const res_biome = document.querySelector("#res_biome");
function update_res_biome(){
    if(!app.ready) return;
    res_biome.innerText = biome(app.T_in.value, app.H_in.value, app.C_in.value, app.E_in.value, app.W_in.value, app.D_in.value);
}

// this script does no input validation, because HTML does it for us;
class Slider_Handler{
    constructor(id, min_max, a_discrete){
        this.discrete_a = a_discrete;
        this.discrete_b = [min_max[0], ...a_discrete, min_max[1]];
        this.value = 0;
        this.el = document.querySelector("#" + id);
        this.range = this.el.querySelector("input[type=\"range\"]");
        this.discrete = this.el.querySelector("input.discrete");
        this.raw = this.el.querySelector("input.raw");
        this.set_discrete(0);
        const that = this;
        this.range.onchange = this.range.oninput = function(){that.set_discrete(this.value);};
        this.discrete.onchange = this.discrete.oninput = function(){that.set_discrete(this.value);};
        this.raw.onchange = this.raw.oninput = function(){that.set_raw(this.value);};
    }
    set_discrete(x){
        x = Number(x);
        this.value = (this.discrete_b[x] + this.discrete_b[x+1]) / 2;
        this.raw.value = this.value;
        this.range.value = x;
        this.discrete.value = x;
        update_res_biome();
    }
    set_raw(x){
        x = Number(x);
        const dx = discrete(x, this.discrete_a);
        this.value = x;
        this.raw.value = this.value;
        this.range.value = dx;
        this.discrete.value = dx;
        update_res_biome();
    }
}
const T_in = new Slider_Handler("T-input", [-1, 1.5], discrete_T);
const H_in = new Slider_Handler("H-input", [-1, 1.5], discrete_H);
const C_in = new Slider_Handler("C-input", [-1.1, 1.5], discrete_C);
const E_in = new Slider_Handler("E-input", [-1, 1], discrete_E);
const D_in = new Slider_Handler("D-input", [0, 1.5], discrete_D);
// okay the way I'm doing W is a bit weird, but also it's fine;
const W_in = new Slider_Handler("W-input", [-0.66666666666666662965923251249478198587894439697265625, 0.66666666666666662965923251249478198587894439697265625], discrete_W);
// W is unique, since it is used to calculate PV, which is a different but still useful value;
W_in.raw_PV = W_in.el.querySelector("input.raw-PV");
W_in.set_discrete = function set_discrete(x){
    x = Number(x);
    this.value = (this.discrete_b[x+4] + this.discrete_b[x+5]) / 2;
    this.raw.value = this.value;
    this.raw_PV.value = 1 - Math.abs(3*Math.abs(this.value) - 2);
    this.range.value = x;
    this.discrete.value = x;
    update_res_biome();
};
W_in.set_raw = function set_raw(x){
    x = Number(x);
    const dx = discrete(x, this.discrete_a);
    this.value = x;
    this.raw.value = this.value;
    this.raw_PV.value = 1 - Math.abs(3*Math.abs(this.value) - 2);
    this.range.value = dx;
    this.discrete.value = dx;
    update_res_biome();
};
W_in.set_PV = function set_raw(y){
    y = Number(y);
    // we only use the inner V of the graph; and we keep the current sign of W; W=0 is treated as sign=1;
    const x = (y+1)/3 * (Math.sign(this.value) || 1);
    const dx = discrete(x, this.discrete_a);
    this.value = x;
    this.raw.value = this.value;
    this.raw_PV.value = y;
    this.range.value = dx;
    this.discrete.value = dx;
};
W_in.raw_PV.onchange = W_in.raw_PV.oninput = function(){W_in.set_raw_PV(this.value);};

app.T_in = T_in;
app.H_in = H_in;
app.C_in = C_in;
app.E_in = E_in;
app.W_in = W_in;
app.D_in = D_in;
app.ready = true;
update_res_biome();

const selected = {
    /** @type {HTMLButtonElement} */
    layer: null,
    /** @type {HTMLButtonElement} */
    pan: null,
};
function layer_handler(){
    if(this === selected.layer) return;
    if(selected.layer) selected.layer.classList.remove("selected");
    this.classList.add("selected");
    selected.layer = this;
}
function pan_handler(){
    if(this === selected.pan) return;
    if(selected.pan) selected.pan.classList.remove("selected");
    this.classList.add("selected");
    selected.pan = this;
}

layer_handler.apply(document.querySelector("#B_L"));
pan_handler.apply(document.querySelector("#B_P"));

document.querySelector("#B_L").onclick = layer_handler;
document.querySelector("#C_L").onclick = layer_handler;
document.querySelector("#E_L").onclick = layer_handler;
document.querySelector("#T_L").onclick = layer_handler;
document.querySelector("#H_L").onclick = layer_handler;
document.querySelector("#W_L").onclick = layer_handler;
document.querySelector("#B_P").onclick = pan_handler;
document.querySelector("#C_P").onclick = pan_handler;
document.querySelector("#E_P").onclick = pan_handler;
document.querySelector("#T_P").onclick = pan_handler;
document.querySelector("#H_P").onclick = pan_handler;
document.querySelector("#W_P").onclick = pan_handler;

const pan_map = new Map([
    [document.querySelector("#B_P"), function(dx, dz){
        biome_noise.C_O.x += dx; biome_noise.C_O.z += dz;
        biome_noise.E_O.x += dx; biome_noise.E_O.z += dz;
        biome_noise.T_O.x += dx; biome_noise.T_O.z += dz;
        biome_noise.H_O.x += dx; biome_noise.H_O.z += dz;
        biome_noise.W_O.x += dx; biome_noise.W_O.z += dz;
    }],
    [document.querySelector("#C_P"), function(dx, dz){biome_noise.C_O.x += dx; biome_noise.C_O.z += dz}],
    [document.querySelector("#E_P"), function(dx, dz){biome_noise.E_O.x += dx; biome_noise.E_O.z += dz}],
    [document.querySelector("#T_P"), function(dx, dz){biome_noise.T_O.x += dx; biome_noise.T_O.z += dz}],
    [document.querySelector("#H_P"), function(dx, dz){biome_noise.H_O.x += dx; biome_noise.H_O.z += dz}],
    [document.querySelector("#W_P"), function(dx, dz){biome_noise.W_O.x += dx; biome_noise.W_O.z += dz}],
]);

// gotta use .checked;
const cave_biomes = document.querySelector("#cave-biomes");
const seed_input = document.querySelector("#seed-input");
const seed_load = document.querySelector("#seed-load");
seed_load.onclick = function(){
    let v = 0n;
    try{
        v = BigInt(seed_input.value.replace(/n$/, ""));
    }
    catch(_){/* we'll just override it with zero; */}
    const min = -1n << 63n;
    const max = (1n >> 63n) - 1n;
    if(v < min) v = min;
    if(v > max) v = max;
    seed_input.value = String(v);
}

const settings = {
    width: 600,
    height: 600,
    mspf: 100,
    frame_id: -1,
    running: false,
    ready: false,
    prev: {x: NaN, y: NaN},
    curr: {x: NaN, y: NaN},
    on_frame(){/* placeholder */},
    frame(){
        // minor stupid-proofing;
        if(!this.ready) return;
        if(!this.running) return;
        this.ready = false;
        this.on_frame?.();
        this.ready = true;
    },
    play(){
        if(this.running) return;
        this.running = true;
        this.frame_id = window.setInterval(this.frame, this.mspf);
    },
    pause(){
        if(!this.running) return;
        this.running = false;
        window.clearInterval(this.frame_id);
        this.frame_id = -1;
    },
};
settings.c = document.querySelector("canvas");
settings.ctx = settings.c.getContext("2d");

settings.c.ontouchstart = function(e){
    if(e.touches.length !== 1){
        settings.prev.x = NaN;
        settings.prev.y = NaN;
        return;
    };
    settings.prev.x = e.touches[0].clientX;
    settings.prev.y = e.touches[0].clientY;
}
settings.c.ontouchend = function(e){
    settings.prev.x = NaN;
    settings.prev.y = NaN;
}
settings.c.ontouchmove = function(e){
    if(e.touches.length !== 1){
        settings.prev.x = NaN;
        settings.prev.y = NaN;
        return;
    };
    if(isNaN(settings.prev.x) || isNaN(settings.prev.y)) return;
    settings.curr.x = e.touches[0].clientX;
    settings.curr.y = e.touches[0].clientY;
}
settings.c.onmousedown = function(e){
    settings.prev.x = e.clientX;
    settings.prev.y = e.clientY;
}
settings.c.onmouseup = function(e){
    settings.prev.x = NaN;
    settings.prev.y = NaN;
}
settings.c.onmousemove = function(e){
    if(isNaN(settings.prev.x) || isNaN(settings.prev.y)) return;
    settings.curr.x = e.clientX;
    settings.curr.y = e.clientY;
}

settings.on_frame = function(){
    // panning!
    // behold, variation 37 of this beautiful boilerplate code;
    if(!(isNaN(settings.prev.x) || isNaN(settings.prev.y) ||
        isNaN(settings.curr.x) || isNaN(settings.curr.y))){
        const dx = settings.prev.x - settings.curr.x;
        const dy = settings.prev.y - settings.curr.y;
        settings.prev.x = settings.curr.x;
        settings.prev.y = settings.curr.y;
        pan_map[selected.pan](dx, dy);
    }
    // I'll start by just drawing the C noise map for reference;
}

