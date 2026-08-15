#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using std::string;
using std::vector;

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
struct Stuff_We_Use_For_Adding{
    uint color;
    uchar dye;
};
class Color_Queue{
public:
    // this is a pointer because I use pointers elsewhere; also it makes shifting simple and free;
    Color_Exists* exists;
    vector<Stuff_We_Use_For_Adding> items;
    Color_Queue(){
        exists = new Color_Exists();
        items = {};
    }
    void add(Stuff_We_Use_For_Adding item){
        if(!exists->get(item.color)){
            exists->set(item.color, 1);
            items.push_back(item);
        }
    }
    ~Color_Queue(){
        delete exists;
    }
};

uint mix(uint a, uint b){
    return (
        ((((a & 0xff0000) + (b & 0xff0000)) >> 1) & 0xff0000) |
        ((((a & 0x00ff00) + (b & 0x00ff00)) >> 1) & 0x00ff00) |
        ((((a & 0x0000ff) + (b & 0x0000ff)) >> 1) & 0x0000ff)
    );
}
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
auto added_brown = new Color_Queue();

uint ic = 0;

void add(Stuff_We_Use_For_Adding item){
    if(recipes->exists(item.color)) return;
    added->set(item.color, 1);
    recipes->set(item.color, item.dye);
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
                auto res = Stuff_We_Use_For_Adding(mix(i, c), (
                    0x80 | 
                    (((((i & 0xff0000) >> 16) - ((c & 0xff0000) >> 16)) & 1) << 6) |
                    (((((i & 0x00ff00) >>  8) - ((c & 0x00ff00) >>  8)) & 1) << 5) |
                    (((((i & 0x0000ff)      ) - ((c & 0x0000ff)      )) & 1) << 4) |
                    j
                ));
                if(j == 4) added_brown->add(res);
                else add(res);
            }
        }
    }
    
    uint added_c = 0;
    for(uint i = 0; i < 1<<24; i++){
        if(added->get(i)){
            added_c++;
        }
    }
    for(uint shift_c = 0; shift_c < 1 && added_c == 0; shift_c++){
        // shift in the brown results;
        Color_Exists* first = added_brown->exists;
        added = added_brown->exists;
        for(auto& item : added_brown->items){
            add(item);
        }
        added_brown->items.clear();
        // filter out existing colors;
        for(uint i = 0; i < 1<<24; i++){
            if(added->get(i) && recipes->exists(i)){
                added->set(i, 0);
            }
        }
        for(uint i = 0; i < 1<<24; i++){
            if(added->get(i)){
                added_c++;
            }
        }
    }
    std::cout << "cycle " << ic << " complete; added: " << added_c << " new colors;" << std::endl;
    added_any = (added_c > 0);
}

class Recipe{
public:
    uint res = 0;
    // prevent infinite loop;
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
        uchar data = recipes->get(color);
        if(!(data & 0x80)){
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
            done_dyes = dyes;
            done_dyes.push_back(dye_i);
            return;
        }
        if(depth == 0){
            return;
        }
        
        dyes.push_back(dye_i);
        depth--;
        uint r = (2 * cr - lr) + ((data & 0x40) >> 6);
        uint g = (2 * cg - lg) + ((data & 0x20) >> 5);
        uint b = (2 * cb - lb) + ((data & 0x10) >> 4);
        try_last((r << 16) | (g << 8) | b);
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
    see_recipe("Base armor color: ", 0xA06540); /* #A06540 - Base armor color */
    
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
    
    uint* my_decode = new uint[256]{0};
    my_decode['0'] = 0x0; my_decode['1'] = 0x1; my_decode['2'] = 0x2; my_decode['3'] = 0x3;
    my_decode['4'] = 0x4; my_decode['5'] = 0x5; my_decode['6'] = 0x6; my_decode['7'] = 0x7;
    my_decode['8'] = 0x8; my_decode['9'] = 0x9; my_decode['a'] = 0xa; my_decode['b'] = 0xb;
    my_decode['c'] = 0xc; my_decode['d'] = 0xd; my_decode['e'] = 0xe; my_decode['f'] = 0xf;
    
    return;
    
    while(true){
        std::cout << "Which color would you like to search for (hex)?" << std::endl;
        string c_hex = "";
        std::cin >> c_hex;
        if(c_hex.size() == 0) break;
        
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
// figure out how many dyes are needed for ALL colors;
void all_dye_c(){
    uint dye_cs[16] = {0};
    for(uint i = 0; i < (1<<24); i++){
        uchar r = recipes->get(i);
        if(r & 0x80){
            dye_cs[r & 0xf]++;
        }
    }
    for(uint i = 0; i < 16; i++){
        std::cout << dye_cs[i] << " " << base_colors_names[i] << " dye" << std::endl;
    }
}

int main(int argc, char const *argv[]){
    for(uint i = 0; i < 16; i++){
        add(Stuff_We_Use_For_Adding(base_colors[i], i));
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
    
    save_be();
    recipe_examples();
    all_dye_c();
    // graph_be();
    
    return 0;
}
};

int main(int argc, char const *argv[]){
    int r = be::main(argc, argv);
    return 0;
}

/*

*/


