#include <iostream>
#include <set>
#include "cwr.cpp"

typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

uint max(uint a, uint b){
    return (a > b) ? a : b;
}
uint max(uint a, uint b, uint c){
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}

class Color_Recipes{
public:
    ushort* d;
    Color_Recipes(){
        d = new ushort[1<<24]{0};
    }
    ushort get(uint idx){
        return d[idx];
    }
    /** `value` should only be 4 bits */
    void set(uint idx, ushort value){
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
        return v & (1 << (idx % 8));
    }
    /** `value` should only be 1 bit */
    void set(uint idx, uchar value){
        d[idx / 8] &= ~(((uchar) 1) << (idx % 8));
        d[idx / 8] |= value << (idx % 8);
    }
};

class Mixer{
public:
    uint tr = 0;
    uint tg = 0;
    uint tb = 0;
    uint tm = 0;
    ushort mix_d = 0;
    uint len = 0;
    Mixer(){}
    Mixer(uint a_tr, uint a_tg, uint a_tb, uint a_tm, ushort a_mix_d, uint a_len){
        tr = a_tr;
        tg = a_tg;
        tb = a_tb;
        tm = a_tm;
        mix_d = a_mix_d;
        len = a_len;
    }
};

bool operator==(const Mixer a, const Mixer b){
    return (
        a.tr    == b.tr    &&
        a.tg    == b.tg    &&
        a.tb    == b.tb    &&
        a.tm    == b.tm    &&
        a.mix_d == b.mix_d &&
        a.len   == b.len
    );
}
bool operator<(const Mixer a, const Mixer b){
    return (
        (                      a.tr    < b.tr  ) ||
        (a.tr    == b.tr    && a.tg    < b.tg    ||
        (a.tg    == b.tg    && a.tb    < b.tb    ||
        (a.tb    == b.tb    && a.tm    < b.tm    ||
        (a.tm    == b.tm    && a.mix_d < b.mix_d ||
        (a.mix_d == b.mix_d && a.len   < b.len)))))
    );
}
bool operator>(const Mixer a, const Mixer b){
    return (
        (                      a.tr    > b.tr  ) ||
        (a.tr    == b.tr    && a.tg    > b.tg    ||
        (a.tg    == b.tg    && a.tb    > b.tb    ||
        (a.tb    == b.tb    && a.tm    > b.tm    ||
        (a.tm    == b.tm    && a.mix_d > b.mix_d ||
        (a.mix_d == b.mix_d && a.len   > b.len)))))
    );
}


Mixer premix(uint* colors, uint mix_d, uint len){
    uint tr = 0;
    uint tg = 0;
    uint tb = 0;
    uint tm = 0;
    for(uint i = 0; i < len; i++){
        uint color = colors[i];
        uint r = (color & 0xff0000) >> 16;
        uint g = (color & 0x00ff00) >> 8;
        uint b = color & 0x0000ff;
        tr += r;
        tg += g;
        tb += b;
        tm += max(r, g, b);
    }
    return Mixer(tr, tg, tb, tm, mix_d, len + 1);
}
uint mix(uint color, Mixer mixer){
    uint r = (color & 0xff0000) >> 16;
    uint g = (color & 0x00ff00) >> 8;
    uint b = color & 0x0000ff;
    uint tr = mixer.tr + r;
    uint tg = mixer.tg + g;
    uint tb = mixer.tb + b;
    float mul = (
        (float) (mixer.tm + max(r, g, b)) /
        (float) max(tr, tg, tb)
    ) / mixer.len;
    return (
        (((uint) (tr * mul)) << 16) |
        (((uint) (tg * mul)) << 8) |
        ((uint) (tb * mul))
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

uint mixer_c = 0;
uint dye_c = 16;
uint dye_lim = 8;

Mixer* gen_mixes(){
    std::set<Mixer> mixer_s = std::set<Mixer>();
    CWR* cwr = pregen();
    for(uint i = 0; i < cwr->size; i++){
        ulng dyem = cwr->dyes[i];
        uchar len = 0;
        for(uchar j = 0; j < 16; j++){
            len += (dyem >> (4*j)) & 0xf;
        }
        uint* colors = new uint[len];
        uchar colori = 0;
        for(uchar j = 0; j < 16; j++){
            uchar k = (dyem >> (4*j)) & 0xf;
            while(k > 0){
                colors[colori] = base_colors[j];
                colori++;
            }
        }
        Mixer mixer = premix(colors, dyem, len);
        // if(!mixer_s.contains(mixer)) it seems set::contains is not wanting to work;
        mixer_s.insert(mixer);
    }
    mixer_c = mixer_s.size();
    std::cout << "mixer_c: " << mixer_c << std::endl;
    Mixer* mixer_a = new Mixer[mixer_c];
    uint i = 0;
    for(auto it = mixer_s.begin(); it != mixer_s.end(); i++, it++){
        mixer_a[i] = *it;
    }
    return mixer_a;
}

/*
Mixer* gen_mixes(){
    // first figure out the length
    for(uint i = 0; i < 1 << dye_c; i++){
        uint len = 0;
        uint j = i;
        while(j > 0){
            len += j % 2;
            j /= 2;
        }
        if(len > dye_lim) continue;
        if(len == 0) continue;
        mixer_c++;
    }
    std::cout << "mixer_c: " << mixer_c << std::endl;
    // then fill the array
    Mixer* mixers = new Mixer[mixer_c];
    uint mixer_i = 0;
    for(uint i = 0; i < 1 << dye_c; i++){
        uint len = 0;
        uint j = i;
        while(j > 0){
            len += j % 2;
            j /= 2;
        }
        if(len > dye_lim) continue;
        if(len == 0) continue;
        uint* colors = new uint[len]{0};
        // std::cout << "len: " << len << std::endl;
        uint k = 0;
        for(j = 0; j < dye_c; j++){
            if(i & (1 << j)){
                colors[k] = base_colors[j];
                k++;
            }
        }
        mixers[mixer_i] = premix(colors, i, len);
        mixer_i++;
    }
    return mixers;
}
*/

auto recipes = new Color_Recipes();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();
auto exists = new Color_Exists();
auto mixers = gen_mixes();

void add(uint color, ulng mix_d){
    if(exists->get(color)) return;
    added->set(color, 1);
    exists->set(color, 1);
    recipes->set(color, mix_d);
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
            for(uint j = 0; j < mixer_c; j++){
                add(mix(i, mixers[j]), mixers[j].mix_d);
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
    std::cout << "Main!" << std::endl;
    
    for(uint i = 0; i < 16; i++){
        add(base_colors[i], (1 << i));
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
JE results:

mixer_c: 39202
Main!
Cycle 0
Added: 85655
Found colors: 85671
Cycle 1
Added: 2370406
Found colors: 2456077
Cycle 2
Added: 1335918
Found colors: 3791995
Cycle 3
Added: 427104
Found colors: 4219099
Cycle 4
Added: 137348
Found colors: 4356447
Cycle 5
Added: 47108
Found colors: 4403555
Cycle 6
Added: 19276
Found colors: 4422831
Cycle 7
Added: 9277
Found colors: 4432108
Cycle 8
Added: 4520
Found colors: 4436628
Cycle 9
Added: 2021
Found colors: 4438649
Cycle 10
Added: 863
Found colors: 4439512
Cycle 11
Added: 441
Found colors: 4439953
Cycle 12
Added: 156
Found colors: 4440109
Cycle 13
Added: 57
Found colors: 4440166
Cycle 14
Added: 6
Found colors: 4440172
Cycle 15
Added: 2
Found colors: 4440174
Cycle 16
Added: 0
Found colors: 4440174

4440174?
* 85655
* 2370406
* 1335918
* 427104
* 137348
* 47108
* 19276
* 9277
* 4520
* 2021
* 863
* 441
* 156
* 57
* 6
* 2


*/


