#include <iostream>
#include <fstream>

// #include <filesystem>
// #include <string>

typedef unsigned int uint;
typedef unsigned char uchar;

class Color_Recipes{
public:
    uchar* d;
    Color_Recipes(){
        d = new uchar[(1<<24) / 2]{0};
    }
    uchar get(uint idx){
        uchar v = d[idx / 2];
        return (v & ((uchar) 15 << (4 * (idx % 2)))) >> (4 * (idx % 2));
    }
    /** `value` should only be 4 bits */
    void set(uint idx, uchar value){
        d[idx / 2] &= ~(((uchar) 15) << (4 * (idx % 2)));
        d[idx / 2] |= value << (4 * (idx % 2));
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
    0xf0f0f0, /* white */
    0x979d9d, /* light gray */
    0x325483, /* gray */
    0x211d1d, /* black */
    0x524f47, /* brown */
    0xaa443c, /* red */
    0xdab33a, /* orange */
    0x9c9c16, /* yellow */
    0x1fc780, /* lime */
    0x167c5e, /* green */
    0x1d80f9, /* cyan */
    0x3dd8fe, /* light blue */
    0x262eb0, /* blue */
    0xaa8bf3, /* lime */
    0xbd4ec7, /* yellow */
    0xb83289, /* orange */
};

auto recipes = new Color_Recipes();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();
auto c_exists = new Color_Exists();

void add(uint color, uchar dye){
    if(c_exists->get(color)) return;
    added->set(color, 1);
    c_exists->set(color, 1);
    recipes->set(color, dye);
}

bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, added->get(i));
    }
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    for(uint i = 0; i < 1<<24; i++){
        if(prev_added->get(i)){
            for(uint j = 0; j < 16; j++){
                add(mix(i, base_colors[j]), j);
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
            if(c_exists->get(i)){
                found++;
            }
        }
        std::cout << "Found colors: " << found << std::endl;
    }
    
    uint size = (1<<24) / 2 + (1<<24) / 8;
    uint i = 0;
    uchar* mychars = new uchar[size];
    for(uint j = 0; j < (1<<24) / 2; j++, i++){
        mychars[i] = recipes->d[j];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        mychars[i] = c_exists->d[j];
    }
    
    std::cout << "Saving..." << std::endl;
    
    auto fout = std::ofstream("be_res.bin");
    fout << "Testing.";
    for(i = 0; i < size; i++){
        fout << mychars[i];
    }
    
    std::cout << "Saved." << std::endl;
    
    return 0;
}

/*
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
* 16    colors require 1  dye
* 42    colors require 2  dyes
* 48    colors require 3  dyes
* 112   colors require 4  dyes
* 288   colors require 5  dyes
* 704   colors require 6  dyes
* 1760  colors require 7  dyes
* 4339  colors require 8  dyes
* 10637 colors require 9  dyes
* 25188 colors require 10 dyes
* 40602 colors require 11 dyes
* 32817 colors require 12 dyes
* 16249 colors require 13 dyes
* 8143  colors require 14 dyes
* 4019  colors require 15 dyes
* 1964  colors require 16 dyes
* 1001  colors require 17 dyes
* 502   colors require 18 dyes
* 210   colors require 19 dyes
* 87    colors require 20 dyes
* 22    colors require 21 dyes

Adding any due to the cauldron 8 times in a row is guaranteed to set the cauldron's current color to that dye.

*/

