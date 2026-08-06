#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using std::string;
using std::vector;

// #include <filesystem>
// #include <string>

namespace be{
typedef unsigned int uint;
typedef unsigned char uchar;

class Color_Recipes{
public:
    /**
     * format per char:
     * - (ordered from most significant bit to least significant bit)
     * - first  bit: whether the color exists;
     * - second bit: whether the different between r values on the last step was odd;
     * - third  bit: whether the different between g values on the last step was odd;
     * - fourth bit: whether the different between b values on the last step was odd;
     * - last four bits: the index of the last dye added;
     */
    uchar* d;
    Color_Recipes(){
        d = new uchar[1<<24]{0};
    }
    bool exists(uint idx){
        return d[idx] & 0x80;
    }
    uchar get(uint idx){
        return d[idx];
    }
    // make sure the first bit of value is 1;
    void set(uint idx, uchar value){
        d[idx] = value;
    }
};
class Color_Exists{
public:
    uchar* d;
    Color_Exists(){
        d = new uchar[(1<<24) / 8]{0};
    }
    uchar get(uint idx){
        uchar v = d[idx / 8];
        return (v & (((uchar) 1) << (idx % 8))) >> (idx % 8);
    }
    /** `value` should only be 1 bit */
    void set(uint idx, uchar value){
        d[idx / 8] &= ~(((uchar) 1) << (idx % 8));
        d[idx / 8] |= value << (idx % 8);
    }
};

uint mix(uint a, uint b){
    return (
        ((((a & 0xff0000) + (b & 0xff0000)) >> 1) & 0xff0000) |
        ((((a & 0x00ff00) + (b & 0x00ff00)) >> 1) & 0x00ff00) |
        ((((a & 0x0000ff) + (b & 0x0000ff)) >> 1) & 0x0000ff)
    );
}

// isn't there a way to put this on the stack instead of the heap? i don't remember what it is;
uint* base_colors = new uint[16]{
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
};
string* base_colors_names = new string[16]{
    string("white   "), /* #f0f0f0 */
    string("l_gray  "), /* #9d9d97 */
    string("gray    "), /* #474f52 */
    string("black   "), /* #1d1d21 */
    string("brown   "), /* #835432 */
    string("red     "), /* #b02e26 */
    string("orange  "), /* #f9801d */
    string("yellow  "), /* #fed83d */
    string("lime    "), /* #80c71f */
    string("green   "), /* #5e7c16 */
    string("cyan    "), /* #169c9c */
    string("l_blue  "), /* #3ab3da */
    string("blue    "), /* #3c44aa */
    string("purple  "), /* #8932b8 */
    string("magenta "), /* #c74ebd */
    string("pink    "), /* #f38baa */
};


auto recipes = new Color_Recipes();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();

uint ic = 0;

void add(uint color, uchar dye){
    if(recipes->exists(color)) return;
    added->set(color, 1);
    recipes->set(color, dye);
    // if(ic >= 17){
    //     std::cout << color << std::endl;
    // }
}

bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, 0);
    }
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, added->get(i));
    }
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    
    for(uint i = 0; i < 1<<24; i++){
        if(prev_added->get(i)){
            for(uint j = 0; j < 16; j++){
                uint c = base_colors[j];
                add(mix(i, c), (
                    0x80 | 
                    (((((i & 0xff0000) >> 16) - ((c & 0xff0000) >> 16)) & 1) << 6) |
                    (((((i & 0x00ff00) >>  8) - ((c & 0x00ff00) >>  8)) & 1) << 5) |
                    (((((i & 0x0000ff)      ) - ((c & 0x0000ff)      )) & 1) << 4) |
                    j
                ));
            }
        }
    }
    
    uint added_c = 0;
    for(uint i = 0; i < 1<<24; i++){
        if(added->get(i)){
            added_c++;
        }
    }
    std::cout << "Added: " << added_c << std::endl;
    added_any = (added_c > 0);
}

/*
5 + 10 -> 15 -> 7
i see 10 and 7, want to find 5
7 + (7 - 10) -> 4;
4 will go to 5 correctly;

6 + 11 -> 17 -> 8
i see 11 and 8, want to find 6
8 + (8 - 11) -> 5;


*/

class Recipe{
public:
    uint res = 0;
    // temporary way to prevent infinite loop;
    uint depth = 0;
    uint depth_lim = 100;
    // dyes, in reverse order;
    vector<uint> done_dyes;
    // dyes, in reverse order;
    vector<uint> dyes;
    Recipe(uint a_res){
        res = a_res;
        done_dyes = vector<uint>();
        dyes = vector<uint>();
    }
    void try_last(uint color){
        // std::cout << "enter try_last" << std::endl;
        // std::cout << "color = " << color << std::endl;
        uchar data = recipes->get(color);
        // std::cout << "data = " << data << std::endl;
        if(!(data & 0x80)){
            // std::cout << "color does not exist" << std::endl;
            return;
        }
        uchar dye_i = data & 0x0f;
        uint last = base_colors[dye_i];
        int cr = (color & 0xff0000) >> 16;
        int cg = (color & 0x00ff00) >> 8;
        int cb = (color & 0x0000ff);
        int lr = (last  & 0xff0000) >> 16;
        int lg = (last  & 0x00ff00) >> 8;
        int lb = (last  & 0x0000ff);
        if(cr == lr && cg == lg && cb == lb){
            // std::cout << "done? dye = " << dye_i << std::endl;
            // std::cout << "cr = " << cr << std::endl;
            // std::cout << "cg = " << cg << std::endl;
            // std::cout << "cb = " << cb << std::endl;
            done_dyes = dyes;
            done_dyes.push_back(dye_i);
            return;
        }
        if(depth == 0){
            // std::cout << "depth = 0" << std::endl;
            return;
        }
        
        dyes.push_back(dye_i);
        depth--;
        // std::cout << "begin business" << std::endl;
        uint r = (2 * cr - lr) + ((data & 0x40) >> 6);
        uint g = (2 * cg - lg) + ((data & 0x20) >> 5);
        uint b = (2 * cb - lb) + ((data & 0x10) >> 4);
        try_last((r << 16) | (g << 8) | b);
        // std::cout << "end business" << std::endl;
        depth++;
        dyes.pop_back();
    }
    void search(){
        depth = depth_lim;
        try_last(res);
    }
};

void verify(uint c, vector<uint> dyes){
    auto it = dyes.rbegin();
    uint color = base_colors[*it];
    for(it++; it != dyes.rend(); it++){
        color = mix(color, base_colors[*it]);
    }
    if(c == color){
        std::cout << "Recipe is correct." << std::endl;
    }
    else{
        std::cout << "Recipe is incorrect." << std::endl;
        std::cout << "Got " << color << std::endl;
    }
}

const char* hex = "0123456789abcdef";
string to_hex(uint c){
    return string({
        hex[(c & 0xf00000) >> 20],
        hex[(c & 0x0f0000) >> 16],
        hex[(c & 0x00f000) >> 12],
        hex[(c & 0x000f00) >>  8],
        hex[(c & 0x0000f0) >>  4],
        hex[ c & 0x00000f       ],
    });
}
string hex_c(char c){
    char* cc = new char[2];
    cc[0] = hex[c];
    cc[1] = hex[16];
    string s = string(cc);
    delete cc;
    return s;
}

void see_recipe(string msg, uint i){
    if(!recipes->exists(i)){
        std::cout << "Color not found: " << to_hex(i) << std::endl;
        return;
    }
    std::cout << msg << to_hex(i) << std::endl;
    
    Recipe find_boi = Recipe(i);
    find_boi.search();
    
    std::cout << "Recipe [";
    for(auto it = find_boi.done_dyes.begin(); it != find_boi.done_dyes.end(); it++){
        std::cout << base_colors_names[*it] << ",";
    }
    std::cout << "]" << std::endl;
    verify(i, find_boi.done_dyes);
}

void save_be(){
    uint size = (1<<24);
    uint i = 0;
    uchar* mychars = new uchar[size];
    for(uint j = 0; j < (1<<24); j++, i++){
        mychars[i] = recipes->d[j];
    }
    
    std::cout << "Saving..." << std::endl;
    
    auto fout = std::ofstream("be_res.bin");
    fout << "Testing.";
    for(i = 0; i < size; i++){
        fout << mychars[i];
    }
    
    std::cout << "Saved." << std::endl;
}
void recipe_examples(){
    for(uint i = 0; i < 1<<24; i++){
        if(!(prev_added->get(i))) continue;
        see_recipe(string("One of the last found colors: "), i);
    }
    
    // see_recipe("second to last cycle (19 dyes)", 9683164);
    // see_recipe("second to last cycle (19 dyes)", 2528946);
    // see_recipe("second to last cycle (19 dyes)", 3762873);
    // see_recipe("second to last cycle (19 dyes)", 9292674);
    // see_recipe("second to last cycle (19 dyes)", 13608744);
    
    see_recipe("Default: ",                0x44aff5); /* #44aff5 - Modified Badlands Plateau, Modified Wooded Badlands Plateau, Desert Lakes, Stony Peaks, Modified Jungle Edge, Shattered Savanna Plateau, Lush Caves, Plains, Sunflower Plains, Dripstone Caves, Deep Dark, Dark Forest Hills, Tall Birch Hills, Old Growth Birch Forest, Meadow, Old Growth Spruce Taiga, Giant Spruce Taiga Hills, Legacy Frozen Ocean, Grove, Snowy Slopes, Frozen Peaks, Jagged Peaks */
    see_recipe("Badlands: ",               0x4e7f81); /* #4e7f81 - Badlands */
    see_recipe("Eroded Badlands: ",        0x497f99); /* #497f99 - Eroded Badlands */
    see_recipe("Wooded Badlands: ",        0x55809e); /* #55809e - Badlands Plateau, Wooded Badlands */
    see_recipe("Desert: ",                 0x32a598); /* #32a598 - Desert */
    see_recipe("Desert Hills: ",           0x1a7aa1); /* #1a7aa1 - Desert Hills */
    see_recipe("Savanna: ",                0x2c8b9c); /* #2c8b9c - Savanna */
    see_recipe("Savanna Plateau: ",        0x2590a8); /* #2590a8 - Savanna Plateau, Windswept Savanna */
    see_recipe("Nether: ",                 0x905957); /* #905957 - Nether Wastes, Warped Forest, Crimson Forest, Soul Sand Valley */
    see_recipe("Basalt Deltas: ",          0x3f76e4); /* #3f76e4 - Basalt Deltas */
    see_recipe("Jungle: ",                 0x14a2c5); /* #14a2c5 - Jungle, Bamboo Jungle */
    see_recipe("Jungle Hills: ",           0x1b9ed8); /* #1b9ed8 - Jungle Hills, Modified Jungle, Bamboo Jungle Hills */
    see_recipe("Sparse Jungle: ",          0x0d8ae3); /* #0d8ae3 - Sparse Jungle */
    see_recipe("Mushroom Fields: ",        0x8a8997); /* #8a8997 - Mushroom Fields */
    see_recipe("Mushroom Field Shore: ",   0x818193); /* #818193 - Mushroom Field Shore */
    see_recipe("Beach: ",                  0x157cab); /* #157cab - Beach */
    see_recipe("Sulfur Caves: ",           0x34BF89); /* #34BF89 - Sulfur Caves */
    see_recipe("Swamp: ",                  0x617b64); /* #617b64 - Swamp */
    see_recipe("Swamp Hills: ",            0x4c6156); /* #4c6156 - Swamp Hills */
    see_recipe("Mangrove Swamp: ",         0x3a7a6a); /* #3a7a6a - Mangrove Swamp */
    see_recipe("Forest: ",                 0x1e97f2); /* #1e97f2 - Forest */
    see_recipe("Flower Forest: ",          0x20a3cc); /* #20a3cc - Flower Forest */
    see_recipe("Dark Forest: ",            0x3b6cd1); /* #3b6cd1 - Dark Forest */
    see_recipe("Wooded Hills: ",           0x056bd1); /* #056bd1 - Wooded Hills */
    see_recipe("Pale Garden: ",            0x76889d); /* #76889d - Pale Garden */
    see_recipe("Birch Forest: ",           0x0677ce); /* #0677ce - Birch Forest */
    see_recipe("Birch Forest Hills: ",     0x0a74c4); /* #0a74c4 - Birch Forest Hills */
    see_recipe("Dappled Forest: ",         0x375154); /* #375154 - Dappled Forest */
    see_recipe("Ocean: ",                  0x1787D4); /* #1787D4 - Ocean, Deep Ocean */
    see_recipe("Warm Ocean: ",             0x02b0e5); /* #02b0e5 - Warm Ocean, Deep Warm Ocean */
    see_recipe("Lukewarm Ocean: ",         0x0d96db); /* #0d96db - Lukewarm Ocean, Deep Lukewarm Ocean */
    see_recipe("Cold Ocean: ",             0x2080c9); /* #2080c9 - Cold Ocean, Deep Cold Ocean */
    see_recipe("Frozen Ocean: ",           0x2570b5); /* #2570b5 - Frozen Ocean, Deep Frozen Ocean */
    see_recipe("River: ",                  0x0084ff); /* #0084ff - River */
    see_recipe("The End: ",                0x62529e); /* #62529e - The End */
    see_recipe("Cherry Grove: ",           0x5db7ef); /* #5db7ef - Cherry Grove */
    see_recipe("Old Growth Pine Taiga: ",  0x2d6d77); /* #2d6d77 - Old Growth Pine Taiga */
    see_recipe("Giant Tree Taiga Hills: ", 0x286378); /* #286378 - Giant Tree Taiga Hills */
    see_recipe("Taiga: ",                  0x287082); /* #287082 - Taiga */
    see_recipe("Taiga Hills: ",            0x236583); /* #236583 - Taiga Hills */
    see_recipe("Taiga Mountains: ",        0x1e6b82); /* #1e6b82 - Taiga Mountains */
    see_recipe("Windswept Hills: ",        0x007bf7); /* #007bf7 - Windswept Hills */
    see_recipe("Windswept Etc.: ",         0x0e63ab); /* #0e63ab - Windswept Forest, Windswept Gravelly Hills, Gravelly Mountains+ */
    see_recipe("Mountain Edge: ",          0x045cd5); /* #045cd5 - Mountain Edge */
    see_recipe("Stony Shore: ",            0x0d67bb); /* #0d67bb - Stony Shore */
    see_recipe("Snowy Beach: ",            0x1463a5); /* #1463a5 - Snowy Beach */
    see_recipe("Snowy Plains: ",           0x14559b); /* #14559b - Snowy Plains, Ice Spikes */
    see_recipe("Snowy Mountains: ",        0x1156a7); /* #1156a7 - Snowy Mountains */
    see_recipe("Frozen River: ",           0x185390); /* #185390 - Frozen River */
    see_recipe("Snowy Taiga: ",            0x205e83); /* #205e83 - Snowy Taiga, Snowy Taiga Mountains */
    see_recipe("Snowy Taiga Hills: ",      0x245b78); /* #245b78 - Snowy Taiga Hills */
    
    // see_recipe(base_colors_names[0] + string("+") + base_colors_names[1] + string(" = "), mix(base_colors[0], base_colors[1]));
    // see_recipe(base_colors_names[2] + string("+") + base_colors_names[5] + string(" = "), mix(base_colors[2], base_colors[5]));
    // see_recipe(base_colors_names[1] + string("+") + base_colors_names[7] + string(" = "), mix(base_colors[1], base_colors[7]));
    // see_recipe(base_colors_names[3] + string("+") + base_colors_names[4] + string(" = "), mix(base_colors[3], base_colors[4]));
    // see_recipe(base_colors_names[5] + string("+") + base_colors_names[8] + string(" = "), mix(base_colors[5], base_colors[8]));
    
    uint* my_decode = new uint[256]{0};
    my_decode['0'] = 0x0; my_decode['1'] = 0x1; my_decode['2'] = 0x2; my_decode['3'] = 0x3;
    my_decode['4'] = 0x4; my_decode['5'] = 0x5; my_decode['6'] = 0x6; my_decode['7'] = 0x7;
    my_decode['8'] = 0x8; my_decode['9'] = 0x9; my_decode['a'] = 0xa; my_decode['b'] = 0xb;
    my_decode['c'] = 0xc; my_decode['d'] = 0xd; my_decode['e'] = 0xe; my_decode['f'] = 0xf;
    
    return;
    
    while(true){
        std::cout << "Which color would you like to search for (hex)?" << std::endl;
        string c_hex = "";
        // cin seems to get completely stuck if you resize the terminal; which is completely outside my control;
        // I really do want to make my own terminal library; like something that doesn't get stuck if you resize the terminal;
        std::cin >> c_hex;
        if(c_hex.size() == 0) break;
        
        // fun fact: this code shouldn't be able to hit an error;
        uint your_c = 0;
        for(auto it = c_hex.begin(); it != c_hex.end(); it++){
            your_c *= 16;
            your_c += my_decode[*it];
        }
        if(!your_c) continue;
        bool e = recipes->exists(your_c);
        std::cout << "You color exists? " << (e ? "Yes." : "No.") << std::endl;
        if(!e) continue;
        
        see_recipe(string("Your color: "), your_c);
    }
}
void graph_be(){
    uint* graph = new uint[4096]{0};
    for(uint i = 0; i < 1<<24; i++){
        if(!(recipes->exists(i))) continue;
        graph[
            ((i & 0xf00000) >> 12) |
            ((i & 0x00f000) >>  8) |
            ((i & 0x0000f0) >>  4)
        ]++;
    }
    for(uint ir = 0; ir < 16; ir++){
        string a = "";
        std::cin >> a;
        
        std::cout << "ir = " << ir << ":" << std::endl;
        for(uint ig = 0; ig < 16; ig++){
            std::cout << "  |";
            for(uint ib = 0; ib < 16; ib++){
                uint i = (ir << 8) | (ig << 4) | ib;
                uint j = graph[i];
                if(j > 0x0fff)
                std::cout
                    << " "
                    << (hex_c((j & 0xf000) >> 12))
                    << (hex_c((j & 0x0f00) >>  8))
                    << (hex_c((j & 0x00f0) >>  4))
                    << (hex_c((j & 0x000f)      ));
                else if(j > 0x00ff)
                std::cout
                    << "  "
                    << (hex_c((j & 0x0f00) >>  8))
                    << (hex_c((j & 0x00f0) >>  4))
                    << (hex_c((j & 0x000f)      ));
                else if(j > 0x000f)
                std::cout
                    << "   "
                    << (hex_c((j & 0x00f0) >>  4))
                    << (hex_c((j & 0x000f)      ));
                else if(j > 0x0000)
                std::cout
                    << "    "
                    << (hex_c((j & 0x000f)      ));
                else
                std::cout
                    << "    .";
                // that was cool!
            }
            std::cout << std::endl;
        }
    }
    
    delete graph;
}

int main(int argc, char const *argv[]){
    for(uint i = 0; i < 16; i++){
        add(base_colors[i], i);
    }
    while(added_any){
        std::cout << "Cycle " << ic << std::endl;
        ic++;
        cycle();
        uint found = 0;
        for(uint i = 0; i < 1<<24; i++){
            if(recipes->exists(i)){
                found++;
            }
        }
        std::cout << "Found colors: " << found << std::endl;
    }
    
    // prevent additional BE functions during JE;
    if(argc == 0) return 0;
    
    // save_be();
    recipe_examples();
    // graph_be();
    
    return 0;
}
};

int main(int argc, char const *argv[]){
    int r = be::main(argc, argv);
    return 0;
}

/*
g++ be.cpp -O6 -o be.exe

second to last cycle (19 dyes):
93c0dc: [white , l_blue, blue  , l_blue, cyan  , blue , l_blue, cyan  , l_blue, l_blue, blue  , cyan  , black , cyan  , cyan , cyan , black, black , cyan,]
2696b2: [cyan  , l_blue, blue  , l_blue, cyan  , blue , l_blue, cyan  , l_blue, l_blue, blue  , cyan  , black , cyan  , cyan , cyan , black, black , cyan,]
396ab9: [blue  , l_blue, blue  , l_blue, cyan  , blue , l_blue, cyan  , l_blue, l_blue, blue  , cyan  , black , cyan  , cyan , cyan , black, black , cyan,]
8dcb82: [lime  , white , l_blue, l_blue, l_blue, white, purple, l_blue, l_blue, blue  , purple, l_blue, blue  , blue  , cyan , black, cyan , blue  , cyan,]
cfa728: [orange, lime  , yellow, lime  , white , lime , lime  , lime  , white , lime  , white , l_blue, l_blue, l_blue, white, white, white, yellow, lime,]

The last 2 colors (20 dyes):
* #a7b723 -> [lime,   orange, lime,  yellow, lime,   white,  lime,  lime,   lime,    white,  lime, white,  l_blue, l_blue, l_blue, white, white, white, yellow, lime,]
* #beddb9 -> [white,  lime,   white, l_blue, l_blue, l_blue, white, purple, l_blue,  l_blue, blue, purple, l_blue, blue,   blue,   cyan,  black, cyan,  blue,   cyan,]

console.log(Array(20).fill(0).map(()=>(Math.floor(Math.random()*2**24)).toString(16)).join("\n"))

white+l_gray  = #c6c6c3 -> [white,  l_gray,]
gray+red      = #7b3e3c -> [red,    gray,  ]
l_gray+yellow = #cdba6a -> [yellow, l_gray,]
black+brown   = #503829 -> [brown,  black, ]
red+lime      = #987a22 -> [red,    lime,  ]


#919b98, #4a3a34, #642e64, #f2a132, #86bc45, #8f4222, #608154, #cab3d3, #759757
#8d9d94, #493836, #663064, #f49f35, #85bf44, #9b4a24, #5e8154, #cbb7d4, #749256

Recipe samples to test:
* #9f6e30 -> [brown,   yellow,  black,   orange,  red,                            ]
* #d95e40 -> [orange,  red,     magenta, magenta, red,     magenta, orange,  brown]
* #a89160 -> [yellow,  blue,    gray,    red,     magenta, cyan,                  ]
* #764690 -> [purple,  brown,   blue,    blue,    lime,    l_blue,                ]
* #ce8721 -> [orange,  green,   orange,  yellow,  pink,    lime,                  ]
* #289081 -> [cyan,    cyan,    green,   green,   purple,  gray,                  ]
* #9e39a1 -> [purple,  magenta, red,     purple,  red,     purple,  red,     cyan,]
* #31a1b1 -> [l_blue,  cyan,    cyan,    black,   white,   green,                 ]
* #a9aad1 -> [white,   purple,  l_blue,  cyan,    red,     cyan,                  ]
* #be5552 -> [red,     pink,    red,     l_blue,  yellow,  orange,                ]
* #b55c62 -> [red,     pink,    l_blue,  red,     yellow,  magenta,               ]
* #569843 -> [lime,    cyan,    black,   brown,   black,   white,   black,        ]

* #9b4a24 -> [red,     green,   red,     orange,  black,   white,   green,        ]
* #85bf44 -> [lime,    lime,    white,   gray,    blue,    cyan,                  ]
* #5e8154 -> [green,   l_blue,  brown,   green,   magenta, purple,                ]
* #663064 -> [black,   magenta, purple,  red,     purple,  magenta, l_gray,       ]
* #8d9d94 -> [l_gray,  l_gray,  cyan,    l_gray,  pink,    lime,                  ]
* #cbb7d4 -> [white,   magenta, l_blue,  white,   red,     yellow,  brown,        ]
* #f49f35 -> [orange,  yellow,  orange,  white,   lime,    yellow,  purple,       ]
* #493836 -> [black,   brown,   gray,    magenta, green,   gray,                  ]
* #749256 -> [lime,    gray,    purple,  l_blue,  white,   magenta,               ]

* #bcbe56 -> [yellow,  lime,    blue,    white,   l_blue,  pink,    blue,         ]
* #648947 -> [lime,    blue,    black,   lime,    magenta, brown,                 ]
* #8277c8 -> [magenta, l_blue,  l_blue,  blue,    l_blue,  magenta, l_blue,       ]
* #b692c8 -> [white,   purple,  purple,  black,   purple,  yellow,  blue,         ]
* #b9a849 -> [yellow,  gray,    lime,    pink,    pink,    gray,                  ]
* #b1a2a9 -> [white,   red,     cyan,    blue,    l_gray,  blue,                  ]
* #b772ab -> [pink,    purple,  l_blue,  magenta, red,     green,                 ]
* #89b72c -> [lime,    lime,    brown,   yellow,  l_blue,  yellow,  magenta,      ]
* #b5713d -> [orange,  gray,    magenta, lime,    green,                          ]
* #a8c7cd -> [white,   cyan,    white,   blue,    orange,  blue,                  ]
* #2b422e -> [black,   black,   lime,    cyan,    cyan,    cyan,    orange,  lime,]
* #a159be -> [magenta, purple,  l_blue,  magenta, l_blue,  white,   brown,        ]
* #d28d5f -> [yellow,  magenta, red,     black,   pink,    blue,                  ]
* #41a39f -> [l_blue,  cyan,    lime,    brown,   brown,   gray,                  ]
* #8850af -> [magenta, blue,    purple,  cyan,    green,   cyan,                  ]
* #585aaf -> [blue,    blue,    white,   purple,  green,   blue,                  ]



Water biome colors:
Badlands:               #4e7f81 -> [cyan    ,brown   ,magenta ,green   ,l_blue  ,]
Eroded Badlands:        #497f99 -> [cyan    ,blue    ,l_gray  ,orange  ,magenta ,]
Wooded Badlands:        #55809e -> [blue    ,cyan    ,white   ,lime    ,yellow  ,lime    ,]
Desert:                 #32a598 -> [cyan    ,l_blue  ,lime    ,l_blue  ,lime    ,black   ,]
Savanna:                #2c8b9c -> [cyan    ,l_blue  ,gray    ,black   ,magenta ,blue    ,]
Savanna Plateau:        #2590a8 -> [cyan    ,l_blue  ,blue    ,cyan    ,black   ,gray    ,blue    ,]
Nether:                 #905957 -> [red     ,l_gray  ,gray    ,cyan    ,magenta ,cyan    ,]
Mushroom Fields:        #8a8997 -> [pink    ,cyan    ,cyan    ,black   ,l_gray  ,green   ,black   ,]
Mushroom Field Shore:   #818193 -> [l_gray  ,blue    ,l_gray  ,red     ,lime    ,l_blue  ,]
Swamp:                  #617b64 -> [blue    ,lime    ,lime    ,red     ,lime    ,]
Swamp Hills:            #4c6156 -> [gray    ,green   ,blue    ,cyan    ,white   ,black   ,]
Mangrove Swamp:         #3a7a6a -> [cyan    ,green   ,black   ,purple  ,pink    ,brown   ,]
Pale Garden:            #76889d -> [l_gray  ,blue    ,l_blue  ,lime    ,pink    ,blue    ,]
Dappled Forest:         #375154 -> [gray    ,black   ,cyan    ,cyan    ,pink    ,black   ,]
The End:                #62529e -> [purple  ,cyan    ,gray    ,blue    ,magenta ,red     ,]
Old Growth Pine Taiga:  #2d6d77 -> [cyan    ,gray    ,black   ,purple  ,gray    ,]
Giant Tree Taiga Hills: #286378 -> [cyan    ,black   ,purple  ,black   ,blue    ,gray    ,cyan    ,]
Taiga:                  #287082 -> [cyan    ,blue    ,black   ,green   ,gray    ,green   ,gray    ,]


    // see_recipe("Default: ",                0x44aff5); ( #44aff5 )
    // see_recipe("Desert Hills: ",           0x1a7aa1); ( #1a7aa1 - Desert Hills)
    // see_recipe("Basalt Deltas: ",          0x3f76e4); ( #3f76e4 - Basalt Deltas)
    // see_recipe("Jungle: ",                 0x14a2c5); ( #14a2c5 - Jungle, Bamboo Jungle)
    // see_recipe("Jungle Hills: ",           0x1b9ed8); ( #1b9ed8 - Jungle Hills, Modified Jungle, Bamboo Jungle Hills)
    // see_recipe("Sparse Jungle: ",          0x0d8ae3); ( #0d8ae3 - Sparse Jungle)
    // see_recipe("Beach: ",                  0x157cab); ( #157cab - Beach)
    // see_recipe("Sulfur Caves: ",           0x34BF89); ( #34BF89 - Sulfur Caves)
    // see_recipe("Forest: ",                 0x1e97f2); ( #1e97f2 - Forest)
    // see_recipe("Flower Forest: ",          0x20a3cc); ( #20a3cc - Flower Forest)
    // see_recipe("Dark Forest: ",            0x3b6cd1); ( #3b6cd1 - Dark Forest)
    // see_recipe("Wooded Hills: ",           0x056bd1); ( #056bd1 - Wooded Hills)
    // see_recipe("Pale Garden: ",            0x76889d); ( #76889d - Pale Garden)
    // see_recipe("Birch Forest: ",           0x0677ce); ( #0677ce - Birch Forest)
    // see_recipe("Birch Forest Hills: ",     0x0a74c4); ( #0a74c4 - Birch Forest Hills)
    // see_recipe("Ocean: ",                  0x1787D4); ( #1787D4 - Ocean, Deep Ocean)
    // see_recipe("Warm Ocean: ",             0x02b0e5); ( #02b0e5 - Warm Ocean, Deep Warm Ocean)
    // see_recipe("Lukewarm Ocean: ",         0x0d96db); ( #0d96db - Lukewarm Ocean, Deep Lukewarm Ocean)
    // see_recipe("Cold Ocean: ",             0x2080c9); ( #2080c9 - Cold Ocean, Deep Cold Ocean)
    // see_recipe("Frozen Ocean: ",           0x2570b5); ( #2570b5 - Frozen Ocean, Deep Frozen Ocean)
    // see_recipe("River: ",                  0x0084ff); ( #0084ff - River)
    // see_recipe("Cherry Grove: ",           0x5db7ef); ( #5db7ef - Cherry Grove)
    // see_recipe("Taiga Hills: ",            0x236583); ( #236583 - Taiga Hills)
    // see_recipe("Taiga Mountains: ",        0x1e6b82); ( #1e6b82 - Taiga Mountains)
    // see_recipe("Windswept Hills: ",        0x007bf7); ( #007bf7 - Windswept Hills)
    // see_recipe("Windswept Etc.: ",         0x0e63ab); ( #0e63ab )
    // see_recipe("Mountain Edge: ",          0x045cd5); ( #045cd5 - Mountain Edge)
    // see_recipe("Stony Shore: ",            0x0d67bb); ( #0d67bb - Stony Shore)
    // see_recipe("Snowy Beach: ",            0x1463a5); ( #1463a5 - Snowy Beach)
    // see_recipe("Snowy Plains: ",           0x14559b); ( #14559b - Snowy Plains, Ice Spikes)
    // see_recipe("Snowy Mountains: ",        0x1156a7); ( #1156a7 - Snowy Mountains)
    // see_recipe("Frozen River: ",           0x185390); ( #185390 - Frozen River)
    // see_recipe("Snowy Taiga: ",            0x205e83); ( #205e83 - Snowy Taiga, Snowy Taiga Mountains)
    // see_recipe("Snowy Taiga Hills: ",      0x245b78); ( #245b78 - Snowy Taiga Hills)



Unobtainable biome colors:
    Modified Badlands Plateau, Modified Wooded Badlands Plateau, Desert Lakes, Stony Peaks, Modified Jungle Edge, Shattered Savanna Plateau, Lush Caves, Plains, Sunflower Plains, Dripstone Caves, Deep Dark, Dark Forest Hills, Tall Birch Hills, Old Growth Birch Forest, Meadow, Old Growth Spruce Taiga, Giant Spruce Taiga Hills, Legacy Frozen Ocean, Grove, Snowy Slopes, Frozen Peaks, Jagged Peaks: #44aff5;
    Jungle Hills, Modified Jungle, Bamboo Jungle Hills: #1b9ed8;
    Windswept Forest, Windswept Gravelly Hills, Gravelly Mountains+:  #0e63ab;
    Desert Hills:                        #1a7aa1;
    Basalt Deltas:                       #3f76e4;
    Jungle, Bamboo Jungle:               #14a2c5;
    Sparse Jungle:                       #0d8ae3;
    Beach:                               #157cab;
    Sulfur Caves:                        #34BF89;
    Forest:                              #1e97f2;
    Flower Forest:                       #20a3cc;
    Dark Forest:                         #3b6cd1;
    Wooded Hills:                        #056bd1;
    Pale Garden:                         #76889d;
    Birch Forest:                        #0677ce;
    Birch Forest Hills:                  #0a74c4;
    Ocean, Deep *                        #1787D4;
    Warm Ocean, Deep *:                  #02b0e5;
    Lukewarm Ocean, Deep *:              #0d96db;
    Cold Ocean, Deep *:                  #2080c9;
    Frozen Ocean, Deep *:                #2570b5;
    River:                               #0084ff;
    Cherry Grove:                        #5db7ef;
    Taiga Hills:                         #236583;
    Taiga Mountains:                     #1e6b82;
    Windswept Hills:                     #007bf7;
    Mountain Edge:                       #045cd5;
    Stony Shore:                         #0d67bb;
    Snowy Beach:                         #1463a5;
    Snowy Plains, Ice Spikes:            #14559b;
    Snowy Mountains:                     #1156a7;
    Frozen River:                        #185390;
    Snowy Taiga, Snowy Taiga Mountains:  #205e83;
    Snowy Taiga Hills:                   #245b78;



Graph!

r = 0:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 1:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .   51    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  1a2   ba    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    6  257   ed    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    e  32c  192    7    .    .    .    .    .    .    .    .    .
  |    .    .    .    .   26  3f7  151    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .   4c  4f3  2a3   19    .    .    .    .    .    .    .
  |    .    .    .    .    .    .   7e  5df  1d2    7    .    .    .    .    .    .
  |    .    .    .    .    .    .    .   cb  6d2  3e4   33    .    .    .    .    .
  |    .    .    .    .    .    .    .    .  158  793  1f5    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .   1e   48    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 2:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  184   25    .    .    .    .    .    .    .    .    .    .    .    .
  |    .   65  f27  dcd  72b  25b   2c    .    .    .    .    .    .    .    .    .
  |    .   66  843  f84  d73  a0a  548  126    3    .    .    .    .    .    .    .
  |    .    .  143  5f6  fb8  f29  95b  2a3  172    .    .    .    .    .    .    .
  |    .    .    .  1a7  a85  fe6  daf  378  2f9  202   12    .    .    .    .    .
  |    .    .    .    2  1c2  5f3  ff7  e9e  8a5  678  230    .    .    .    .    .
  |    .    .    .    .    .  210  c93  fff  ede  d62  553    .    .    .    .    .
  |    .    .    .    .    .   1c  3ff  a3c 1000  fcd  a96   50    .    .    .    .
  |    .    .    .    .    .    .   26  4b5  e37 1000  ead  4f2    e    .    .    .
  |    .    .    .    .    .    .    .   5a  369  500  682  588   c3    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 3:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .   26    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .   3f  f36  eaa  c01  750  237    .    .    .    .    .    .    .    .    .
  |    .  232 1000 1000 1000 1000  f4b  c09  639  183    .    .    .    .    .    .
  |    .  239  d9f 1000 1000 1000 1000  f8f  edc  a8d  5a3    .    .    .    .    .
  |    .   40  636  d9a 1000 1000 1000  d54  e99  e87  b98  174    .    .    .    .
  |    .    .   84  6cd  a53  c38 1000  fd3  f1e  fe2  ec7  56d    .    .    .    .
  |    .    .    .   7e  30f  554 1000 1000 1000 1000  f3b  9b8   c7    .    .    .
  |    .    .    .    .   cb  791  f87 1000 1000 1000  fcb  cca  478    .    .    .
  |    .    .    .    .    .  19e  ab0  f6d 1000 1000 1000  ff8  985   4b    .    .
  |    .    .    .    .    .    1  2a0  9a9  b62  c7f  de0  ee2  dda  359    .    .
  |    .    .    .    .    .    .    .    .    .    6   66   b6  1a3  167    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 4:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    3  d24  aa4  a8f  a94  63b    .    .    .    .    .    .    .    .    .
  |    .  17d 1000 1000 1000 1000  f9d  b40  9ab  529  13a    .    .    .    .    .
  |    .  3e4 1000 1000 1000 1000 1000 1000 1000 1000  ec2   b2    .    .    .    .
  |    .  535  fec 1000 1000 1000 1000 1000 1000 1000 1000  602    .    .    .    .
  |    .  220  c97  fe5  ff1  fe6 1000 1000 1000 1000 1000  cfe    .    .    .    .
  |    .    b  2da  8f8  fd7  f85 1000 1000 1000 1000 1000  ff5  3df    .    .    .
  |    .    .   2b  443  cc0  ffa 1000 1000 1000 1000 1000 1000  b18    5    .    .
  |    .    .    .   56  3b7  7a7 1000 1000 1000 1000 1000 1000  f92  297    .    .
  |    .    .    .    .   92  537  f0f  fdc  fbe  fcb 1000 1000 1000  79f    .    .
  |    .    .    .    .    .   96  16c  126  1f3  4af  5f7  741  75e  5a2    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 5:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  af1  afc  9e1  8e9  794  4ed  100    .    .    .    .    .    .    .
  |    .   be  ff1 1000 1000 1000  fff  e68  c35  980  547   2d    .    .    .    .
  |    .  312 1000 1000 1000 1000 1000 1000 1000 1000  ffd  3f5    .    .    .    .
  |    .  582 1000 1000 1000 1000 1000 1000 1000 1000 1000  967    .    .    .    .
  |    .  7c2 1000 1000 1000 1000 1000 1000 1000 1000 1000  dff   48    .    .    .
  |    .  607  fa5  ffe 1000 1000 1000 1000 1000 1000 1000  feb  83d    .    .    .
  |    .  155  a58  fd1 1000 1000 1000 1000 1000 1000 1000 1000  ed2   3c    .    .
  |    .    1  261  96a  ff2  fc0 1000 1000 1000 1000 1000 1000 1000  38d    .    .
  |    .    .    1  266  c31  fea 1000  ffe 1000 1000 1000 1000 1000  7d9    .    .
  |    .    .    .   15  383  7e5  954  87d  b21  bf7  c10  b3b  c59  a5c    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 6:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  8e0  7b2  485  252  283  566  448   92    .    .    .    .    .    .
  |    .   43  fa4 1000 1000  fe4  f8d 1000 1000  db3  9ea  1d6    .    .    .    .
  |    .  245 1000 1000 1000 1000 1000 1000 1000 1000 1000  883    .    .    .    .
  |    .  4a9 1000 1000 1000 1000 1000 1000 1000 1000 1000  eb2   e4    .    .    .
  |    .  70b 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  639    .    .    .
  |    .  964 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  b1e    .    .    .
  |    .  871 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  f1f   47    .    .
  |    .  43b  ebb 1000 1000 1000 1000 1000 1000 1000 1000 1000  fe3  36a    .    .
  |    .   a7  81a  ec0 1000 1000 1000 1000 1000 1000 1000 1000  fb2  524    .    .
  |    .    .   ff  8a5  de0  ec2  f8c  f44  fa9  f63  f7c  d84  f76  c90    .    .
  |    .    .    .   28   84   e8   ef  125   44  150  1de   46  1a6  2aa    a    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 7:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  6f1  6e4  2b4    .   eb  397  154  1e0   48    .    .    .    .    .
  |    .    2  f08 1000  fcb  d77  b8e 1000  f76  fdd  e58  566    .    .    .    .
  |    .  17d 1000 1000 1000 1000 1000 1000 1000 1000 1000  cbc    2    .    .    .
  |    .  3a6 1000 1000 1000 1000 1000 1000 1000 1000 1000  fea  2a8    .    .    .
  |    .  638 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  6b8    .    .    .
  |    .  897 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  ad5    .    .    .
  |    .  7bd 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  edd   4b    .    .
  |    .  651 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  427    .    .
  |    .  4b6  fff 1000 1000 1000 1000 1000 1000 1000 1000 1000  ff5  892    .    .
  |    .  1e2  dc4 1000 1000 1000 1000  f19  fa3 1000  fff 1000 1000  d3e    .    .
  |    .   2c  36f  4f6  56e  4a3  54b  616  1ad  32f  46c  6cd  75b  7bc   95    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 8:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  52f  4f5  3f8  20d   75  1e6   7e   4d    2    .    .    .    .    .
  |    .    .  e35 1000  ff2  f73  dd2  ff0  f2b  f81  f0f  90f    .    .    .    .
  |    .   c1  fee 1000 1000 1000 1000 1000 1000 1000 1000  e5b    9    .    .    .
  |    .  2d5 1000 1000 1000 1000 1000 1000 1000 1000 1000  ffd  254    .    .    .
  |    .  583 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  64a    .    .    .
  |    .  7d9 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  bbf    .    .    .
  |    .  702 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  b80    9    .    .
  |    .  4e5 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  e42  201    .    .
  |    .  3f0 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  fbd  70c    .    .
  |    .  27a 1000 1000  fcf  fe3 1000  dac  de5 1000  ffe 1000 1000  d96    .    .
  |    .   8d  93a  9c3  a84  606  95d  b40  325  4ba  5d1  9bb  bb1  d49  1f0    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 9:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  39d  2c9  180  1cc   f3   76    e    .    .    .    .    .    .    .
  |    .    .  d57  ffe  fa5  ffc  fe1  f87  e63  bd8  9dc  5bf    .    .    .    .
  |    .   35  f8a 1000 1000 1000 1000 1000 1000 1000 1000  e8e   27    .    .    .
  |    .  22e 1000 1000 1000 1000 1000 1000 1000 1000 1000  fff  361    .    .    .
  |    .  467 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  6b1    .    .    .
  |    .  71c 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  c51    .    .    .
  |    .  647 1000 1000 1000 1000 1000 1000 1000 1000 1000  ef1  a0d    c    .    .
  |    .  2ef 1000 1000 1000 1000 1000 1000 1000 1000 1000  fc6  a68   21    .    .
  |    .  313 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  fb0  3a7    .    .
  |    .  177  fc3 1000 1000 1000 1000  efa  ca2  f2b 1000 1000 1000  b18    2    .
  |    .    .  954  cd3  e83  dcc  f98  fb9  564  5a0  b07  ede  f7f  fcd  297    .
  |    .    .    .    .   18   de   de  100   72    .   5b   8f  1a4  271  11e    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 10:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  224  1d2  106   52    6    .    .    .    .    .    .    .    .    .
  |    .    .  c8a  ff1  f49  dc4  c63  5fc  4e6  400  2ce  123    .    .    .    .
  |    .    1  efd 1000 1000 1000 1000 1000 1000 1000  ff1  d81    2    .    .    .
  |    .  189 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  2c9    .    .    .
  |    .  3f4 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  82e    .    .    .
  |    .  649 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  c8a    .    .    .
  |    .  44a  ff6 1000 1000 1000 1000 1000 1000 1000 1000  fc6  dc5   bd    .    .
  |    .  1e4  fe9 1000 1000 1000 1000 1000 1000 1000 1000  ff3  d45  21d    .    .
  |    .  2aa  ffa 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  81a    .    .
  |    .   5d  d32 1000 1000 1000 1000 1000  fa9  ffe 1000 1000 1000  e84   21    .
  |    .    .  7e2  e38  e11  fc6  ffa  fff  ada  d3f  ffe 1000 1000  ffc  2ed    .
  |    .    .    .    5   4e  2cf  4d8  618  277  3ba  69f  6fe  7bb  742  399    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 11:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .   1e    4    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  73a  892  780  657  4d9  246   fe   58    .    .    .    .    .    .
  |    .    .  e3a  ff7  fe2  fe5  fe5  fd4  f65  d96  bad  8ac    .    .    .    .
  |    .   c9  ff1 1000 1000 1000 1000 1000 1000 1000 1000  ff3  1da    .    .    .
  |    .  326 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  6be    .    .    .
  |    .  58a 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  bc7    .    .    .
  |    .  546 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  fbc  164    .    .
  |    .  30d  ff9 1000 1000 1000 1000 1000 1000 1000 1000 1000  ffc  5be    .    .
  |    .  18a  e9f 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  aa9    .    .
  |    .    .  b27 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  e8a   15    .
  |    .    .  60d  fae  fe5  fd8  f4a  fbd  fd8 1000 1000 1000 1000  fd1  31c    .
  |    .    .    .   7b  24c  3bf  4c4  5bb  8ad  c42  ba5  ad0  aaf  cdd  6d6    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 12:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    1    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .  6ad  6a5  5ba  51b  431  507  458  3f2  350  221    .    .    .    .
  |    .   42  f9a  fcf  f5d  ecb  e27  f59  e9f  ebe  eb9  d8b   eb    .    .    .
  |    .  25a 1000 1000 1000 1000 1000 1000 1000 1000 1000  ff7  5ac    .    .    .
  |    .  4c6 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  b54    .    .    .
  |    .  424 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  f1b   6d    .    .
  |    .  2f1  ff7 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  5c2    .    .
  |    .   49  97b 1000 1000 1000 1000 1000 1000 1000 1000 1000 1000  afd    .    .
  |    .    .  403 1000 1000 1000 1000  fdf  fa7 1000 1000 1000 1000  e7f   32    .
  |    .    .  287  ffa  fe1  f49  e79  fe1 1000 1000 1000 1000 1000  f38  20e    .
  |    .    .    a  20a  2b2  391   47  29e  863  f4c  fce  dfa  e0d  fe4  85a    .
  |    .    .    .    .    .    .    .    .    .   1f  180  18f  194  26b  21e    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 13:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    3  5c9  4b8  317  19b  163  396  330  24f  190   b5    .    .    .    .
  |    .  18e  fa4  f85  f56  ef6  e20  ec5  dc6  c8a  b6d  769   4c    .    .    .
  |    .  3fe 1000 1000 1000 1000 1000 1000 1000 1000 1000  dce  346    .    .    .
  |    .  3b6 1000 1000 1000 1000 1000 1000 1000 1000 1000  f71  a71   57    .    .
  |    .  14e  f0b 1000 1000 1000 1000 1000 1000 1000 1000  fff  d4c  3ac    .    .
  |    .    .  8f0 1000 1000 1000 1000 1000  fff 1000 1000 1000  fd9  a08    .    .
  |    .    .  33f  ffa 1000 1000 1000  ff7  fd2 1000 1000 1000 1000  f01   55    .
  |    .    .   d6  eff 1000 1000  ff3 1000 1000 1000 1000 1000 1000 1000  487    .
  |    .    .    .  33a  58d  70d  7e6  94f  a97  ffe  fdb  ff2 1000 1000  8a8    .
  |    .    .    .    .    .    .    .    .    5  14b  1e5  3b6  77a  730  68d    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 14:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .   75  45e  31a  328  304  248   39    e    e    d    .    .    .    .    .
  |    .  31d  f29  ef8  e44  d85  c07  993  872  7bf  6c0  1a3    .    .    .    .
  |    .  2d5  ffe 1000 1000 1000 1000 1000  fef  fbd  f40  6d6    .    .    .    .
  |    .   25  cc7 1000 1000 1000 1000 1000 1000  ff9 1000  d3c  154    .    .    .
  |    .    .  76a 1000 1000 1000 1000 1000 1000 1000 1000  ffc  826  138    .    .
  |    .    .  24c  fed 1000 1000 1000 1000  fb9 1000 1000 1000  f39  701   13    .
  |    .    .    .  b91  ffe  ffa  ffd 1000  ffc 1000 1000 1000 1000  ce9  21f    .
  |    .    .    .  38b  6dc  752  b8b  d98  eba  ffc 1000  ffb 1000  fef  7bd    .
  |    .    .    .    .    .    .    .    1   51  2da  4b3  675  9ba  bd1  b62    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
;
ir = 15:
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .
  |    .   b6  303  234  139   a7   38    8    .    .    .    .    .    .    .    .
  |    .  101  969  896  7ce  6d0  5e5  4c9  3a7  2be  1b4    2    .    .    .    .
  |    .    .  7c3  9ad  8e3  77b  712  6b4  5bb  533  3f7  107    .    .    .    .
  |    .    .  43c  b14  9cd  834  748  7f7  702  507  41e  2e8   42    .    .    .
  |    .    .   9f  bc4  b55  ab6  9f3  821  4a5  504  44f  33a  1b8    1    .    .
  |    .    .    .  899  cb2  ba4  9f4  91b  5f2  541  41f  3c2  28a   b9    .    .
  |    .    .    .  2ac  77b  8af  90d  943  81c  695  58e  3f5  2a0  1ba   1e    .
  |    .    .    .    .    .    .    .   26  121  1f2  274  299  252  1d5   c6    .
  |    .    .    .    .    .    .    .    .    .    .    .    .    .    .    .    1



BE results:

Cycle 0
Added: 120
Found colors: 136
Cycle 1
Added: 1920
Found colors: 2056
Cycle 2
Added: 30606
Found colors: 32662
Cycle 3
Added: 449760
Found colors: 482422
Cycle 4
Added: 2656378
Found colors: 3138800
Cycle 5
Added: 1401502
Found colors: 4540302
Cycle 6
Added: 157177
Found colors: 4697479
Cycle 7
Added: 21106
Found colors: 4718585
Cycle 8
Added: 7293
Found colors: 4725878
Cycle 9
Added: 3286
Found colors: 4729164
Cycle 10
Added: 1508
Found colors: 4730672
Cycle 11
Added: 720
Found colors: 4731392
Cycle 12
Added: 381
Found colors: 4731773
Cycle 13
Added: 183
Found colors: 4731956
Cycle 14
Added: 77
Found colors: 4732033
Cycle 15
Added: 46
Found colors: 4732079
Cycle 16
Added: 23
Found colors: 4732102
Cycle 17
Added: 5
Found colors: 4732107
Cycle 18
Added: 2
Found colors: 4732109
Cycle 19
Added: 0
Found colors: 4732109
Saving...
Saved.



In ''Bedrock Edition'', there are 4732109 obtainable colors of dyed water. Different colors require a different number of dyes to make (the following numbers are all minimums):
* 16      colors require 1  dye
* 120     colors require 2  dyes
* 1920    colors require 3  dyes
* 30606   colors require 4  dyes
* 449760  colors require 5  dyes
* 2656378 colors require 6  dyes
* 1401502 colors require 7  dyes
* 157177  colors require 8  dyes
* 21106   colors require 9  dyes
* 7293    colors require 10 dyes
* 3286    colors require 11 dyes
* 1508    colors require 12 dyes
* 720     colors require 13 dyes
* 381     colors require 14 dyes
* 183     colors require 15 dyes
* 77      colors require 16 dyes
* 46      colors require 17 dyes
* 23      colors require 18 dyes
* 5       colors require 19 dyes
* 2       colors require 20 dyes

Adding any due to the cauldron 8 times in a row is guaranteed to set the cauldron's current color to that dye.

*/


