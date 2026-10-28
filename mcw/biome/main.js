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

const app = document.querySelector("#app");

// this script does no input validation, because HTML does it for us;
class Slider_Handler{
    constructor(id, min_max, a_discrete){
        this.discrete = a_discrete;
        this.discrete_b = [min_max[0], ...a_discrete, min_max[1]];
        this.value = 0;
        this.el = document.querySelector("#" + id);
        this.range = this.el.querySelector("input[type=\"range\"]");
        this.discrete = this.el.querySelector("input.discrete");
        this.raw = this.el.querySelector("input.raw");
        this.set_discrete(0);
    }
    set_discrete(x){
        this.value = this.discrete_b[x]
    }
    
}
const T_in = new Slider_Handler("T-input", [-1, 1], discrete_T);
const H_in = new Slider_Handler("H-input", [-1, 1], discrete_H);
const C_in = new Slider_Handler("C-input", [-1.1, 1], discrete_C);
const E_in = new Slider_Handler("E-input", [-1, 1], discrete_E);
const D_in = new Slider_Handler("D-input", [0, 1], discrete_D);
const W_in = new Slider_Handler("W-input", [-0.66666666666666662965923251249478198587894439697265625, 0.66666666666666662965923251249478198587894439697265625], discrete_W);

