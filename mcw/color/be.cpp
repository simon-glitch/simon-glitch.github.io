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

void add(uint color, uchar dye){
    if(recipes->exists(color)) return;
    added->set(color, 1);
    recipes->set(color, dye);
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

string to_hex(uint c){
    const char* hex = "0123456789abcdef";
    return string({
        hex[(c & 0xf00000) >> 20],
        hex[(c & 0x0f0000) >> 16],
        hex[(c & 0x00f000) >> 12],
        hex[(c & 0x000f00) >>  8],
        hex[(c & 0x0000f0) >>  4],
        hex[ c & 0x00000f       ],
    });
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

int main(int argc, char const *argv[]){
    for(uint i = 0; i < 16; i++){
        add(base_colors[i], i);
    }
    uint ic = 0;
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
    
    // prevent BE from saving while running JE setup;
    if(argc == 0) return 0;
    
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
    
    for(uint i = 0; i < 1<<24; i++){
        if(!(prev_added->get(i))) continue;
        see_recipe(string("One of the last found colors: "), i);
    }
    
    std::cout << "Does this code even run?" << std::endl;
    
    see_recipe(base_colors_names[0] + string("+") + base_colors_names[1] + string(" = "), mix(base_colors[0], base_colors[1]));
    see_recipe(base_colors_names[2] + string("+") + base_colors_names[5] + string(" = "), mix(base_colors[2], base_colors[5]));
    see_recipe(base_colors_names[1] + string("+") + base_colors_names[7] + string(" = "), mix(base_colors[1], base_colors[7]));
    see_recipe(base_colors_names[3] + string("+") + base_colors_names[4] + string(" = "), mix(base_colors[3], base_colors[4]));
    see_recipe(base_colors_names[5] + string("+") + base_colors_names[8] + string(" = "), mix(base_colors[5], base_colors[8]));
    
    uint* my_decode = new uint[256]{0};
    my_decode['0'] = 0x0; my_decode['1'] = 0x1; my_decode['2'] = 0x2; my_decode['3'] = 0x3;
    my_decode['4'] = 0x4; my_decode['5'] = 0x5; my_decode['6'] = 0x6; my_decode['7'] = 0x7;
    my_decode['8'] = 0x8; my_decode['9'] = 0x9; my_decode['a'] = 0xa; my_decode['b'] = 0xb;
    my_decode['c'] = 0xc; my_decode['d'] = 0xd; my_decode['e'] = 0xe; my_decode['f'] = 0xf;
    
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
    
    return 0;
}
};

#if IN_JE
#else
int main(int argc, char const *argv[]){
    int r = be::main(argc, argv);
    return 0;
}
#endif

/*
g++ be.cpp -O6 -o be.exe

The last 2 colors:
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


in game:



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


