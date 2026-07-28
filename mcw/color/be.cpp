#include <iostream>

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
        return v & (15 << (idx % 2));
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
        return v & (1 << (idx % 8));
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
auto added = new Color_Exists();
auto exists = new Color_Exists();

void add(uint color, uchar dye){
    if(exists->get(color)) return;
    added->set(color, 1);
    exists->set(color, 1);
    recipes->set(color, dye);
}

bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    for(uint i = 0; i < 1<<24; i++){
        if(exists->get(i)){
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
            if(exists->get(i)){
                found++;
            }
        }
        std::cout << "Found colors: " << found << std::endl;
    }
    
    return 0;
}

/*

In ''Bedrock Edition'', there are 4732109 obtainable colors of dyed water. Different colors require a different number of dyes to make (the following numbers are all minimums):
* 16      colors require 1  dye
* 1928115 colors require 2  dyes
* 1997347 colors require 3  dyes
* 641067  colors require 4  dyes
* 136991  colors require 5  dyes
* 23708   colors require 6  dyes
* 3691    colors require 7  dyes
* 832     colors require 8  dyes
* 227     colors require 9  dyes
* 80      colors require 10 dyes
* 32      colors require 11 dyes
* 3       colors require 12 dyes

Adding any due to the cauldron 8 times in a row is guaranteed to set the cauldron's current color to that dye.

*/

