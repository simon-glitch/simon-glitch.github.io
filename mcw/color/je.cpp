#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <algorithm>
#include "cwr.cpp"
#define IN_JE true
#include "be.cpp"
#include <math.h>

namespace je{
// using std::vector;
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
        return (v & (((uchar) 1) << (idx % 8))) >> (idx % 8);
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

/* Class to give mixers in 3D space categories. */
class Catifier{
public:
    class Point{
    public:
        float x = 0.0;
        float y = 0.0;
        float z = 0.0;
        Point(float a_x, float a_y, float a_z){
            x = a_x;
            y = a_y;
            z = a_z;
        }
        Point(Mixer mixer){
            x = mixer.tr;
            y = mixer.tg;
            z = mixer.tb;
        }
        Point(uint color){
            x = (color & 0xff0000) >> 16;
            y = (color & 0x00ff00) >> 8;
            z = (color & 0x0000ff);
        }
    };
    class Sorter{
    public:
        uchar idx = 0;
        float d = 0.0;
        Sorter(uchar a_idx, Point a, Point b){
            idx = a_idx;
            dist(a, b);
        }
        void dist(Point a, Point b){
            d = pow(
                (a.x - b.x) * (a.x - b.x) +
                (a.y - b.y) * (a.y - b.y) +
                (a.z - b.z) * (a.z - b.z),
                0.5
            );
        }
    };
    /** a list of 64 sets, each of which contains 0 or more mixers; sets are used to prevent duplicates; */
    std::set<Mixer>* cat;
    uchar cat_num = 4;
    /** the "centers" of the categories; */
    Point* cores;
    Catifier(){
        cat = new std::set<Mixer>[64];
    }
    bool compare(std::vector<Sorter>::iterator a, std::vector<Sorter>::iterator b){
        return a->d < b->d;
    }
    /** returns a list of all 64 category indices, sorted by how close the point is to each category's core; */
    uchar* cat_calc(Point p){
        std::vector<Sorter> s = {};
        for(uchar i = 0; i < 64; i++){
            s.push_back(Sorter(i, p, cores[i]));
        }
        std::sort<std::vector<Sorter>::iterator>(s.begin(), s.end(), compare);
        uchar* res = new uchar[64];
        uchar i = 0;
        for(auto it = s.begin(); it != s.end(); it++, i++){
            res[i] = it->idx;
        }
        return res;
    }
    void add_calc(Mixer mixer){
        uchar* res = cat_calc(Point(mixer));
        for(uint i = 0; i < cat_num; i++){
            cat[res[i]].insert(mixer);
        }
    }
    uchar* cat_calc(uint color){
        return cat_calc(Point(color));
    }
};
Catifier cat = Catifier();

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
bool operator< (const Mixer a, const Mixer b){
    return (
        (                      a.tr    < b.tr  ) ||
        (a.tr    == b.tr    && a.tg    < b.tg    ||
        (a.tg    == b.tg    && a.tb    < b.tb    ||
        (a.tb    == b.tb    && a.tm    < b.tm    ||
        (a.tm    == b.tm    && a.mix_d < b.mix_d ||
        (a.mix_d == b.mix_d && a.len   < b.len)))))
    );
}
bool operator> (const Mixer a, const Mixer b){
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
float MAGIC_MIX_VIBRANCE = 50.0;
float MAGIC_COLOR_VIBRANCE = 150.0;

Mixer* gen_mixes(){
    std::set<Mixer> mixer_s = std::set<Mixer>();
    std::cout << "Start of gen" << std::endl;
    CWR* cwr = pregen();
    std::cout << "Pregen done" << std::endl;
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
                k--;
            }
        }
        Mixer mixer = premix(colors, dyem, len);
        // let's filter mixers so only vibrant ones are kept;
        if(
            pow(
                pow((((float) mixer.tr) / ((float) len)) - 127.0, 2) +
                pow((((float) mixer.tg) / ((float) len)) - 127.0, 2) +
                pow((((float) mixer.tb) / ((float) len)) - 127.0, 2),
                0.5
            ) > MAGIC_MIX_VIBRANCE
        ){
            // std::cout << "Inserting..." << std::endl;
            // if(!mixer_s.contains(mixer)) it seems set::contains is not wanting to work;
            mixer_s.insert(mixer);
        }
    }
    mixer_c = mixer_s.size();
    std::cout << "mixer_c: " << mixer_c << std::endl;
    Mixer* mixer_a = new Mixer[mixer_c];
    uint i = 0;
    for(auto it = mixer_s.begin(); it != mixer_s.end(); i++, it++){
        mixer_a[i] = *it;
        cat.add_calc(*it);
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
auto c_exists = new Color_Exists();
auto mixers = gen_mixes();

uint found = 0;
void add(uint color, ulng mix_d){
    if(c_exists->get(color)) return;
    found++;
    added->set(color, 1);
    c_exists->set(color, 1);
    recipes->set(color, mix_d);
}

uint ic = 0;
bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, 0);
    }
    for(uint i = 0; i < 1<<24; i++){
        // prevent BE colors from being checked, because they are highly unlikely to give anything interesting;
        if(ic > 0 && be::c_exists->get(i)) continue;
        prev_added->set(i, added->get(i));
    }
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    uint prev_c = 0;
    for(uint i = 0; i < 1<<24; i++){
        if(prev_added->get(i)){
            prev_c++;
        }
    }
    uint prev_i = 0;
    uint prev_li = 0;
    uint prev_lf = 10000;
    
    for(uint i = 0; i < 1<<24; i++){
        if(prev_added->get(i)){
            prev_i++;
            prev_li++;
            if(prev_li == prev_lf){
                prev_li = 0;
                std::cout << prev_i << "/" << prev_c << "; found colors: " << found << std::endl;
            }
            // this is taking too long so let's try to filter the mixers spatially;
            uchar* cati = cat.cat_calc(i);
            for(uchar j = 0; j < cat.cat_num; j++){
                for(auto it = cat.cat[j].begin(); it != cat.cat[j].begin(); it++){
                    add(mix(i, *it), it->mix_d);
                }
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
    ic++;
}

int main(int argc, char const *argv[]){
    be::main(0, argv);
    
    std::cout << "Main!" << std::endl;
    
    for(uint i = 0; i < 16; i++){
        add(base_colors[i], (1 << i));
    }
    while(added_any){
        std::cout << "Cycle " << ic << std::endl;
        cycle();
        std::cout << "Found colors: " << found << std::endl;
    }
    
    
    uint size = (1<<24) * 8;
    uint i = 0;
    uchar* mychars = new uchar[size];
    for(uint j = 0; j < 1<<24; j++, i += 8){
        ulng dyem = recipes->d[j];
        mychars[i    ] = dyem & 0xff00000000000000;
        mychars[i + 1] = dyem & 0x00ff000000000000;
        mychars[i + 2] = dyem & 0x0000ff0000000000;
        mychars[i + 3] = dyem & 0x000000ff00000000;
        mychars[i + 4] = dyem & 0x00000000ff000000;
        mychars[i + 5] = dyem & 0x0000000000ff0000;
        mychars[i + 6] = dyem & 0x000000000000ff00;
        mychars[i + 7] = dyem & 0x00000000000000ff;
    }
    
    std::cout << "Saving..." << std::endl;
    
    auto fout = std::ofstream("je_res.bin");
    fout << "Testing.";
    for(i = 0; i < size; i++){
        fout << mychars[i];
    }
    
    std::cout << "Saved." << std::endl;
    
    return 0;
}
}

int main(int argc, char const *argv[]){
    int r = je::main(argc, argv);
    return 0;
}


/*
g++ je.cpp -O6 -o je.exe

JE results:

Start of gen
Pregen done
mixer_c: 116629

Main!
Cycle 0
Added: 283048
Found colors: 283064
Cycle 1
1000/8801; found colors: 2669187
2000/8801; found colors: 3070741
3000/8801; found colors: 3261280
4000/8801; found colors: 3429156
5000/8801; found colors: 3673119
6000/8801; found colors: 3879789
7000/8801; found colors: 3978490
8000/8801; found colors: 4050375
Added: 3819842
Found colors: 4102906
Cycle 2
1000/546771; found colors: 4134220
2000/546771; found colors: 4145548
3000/546771; found colors: 4153023
4000/546771; found colors: 4158723
5000/546771; found colors: 4161884
6000/546771; found colors: 4166601
7000/546771; found colors: 4168560
8000/546771; found colors: 4173458
9000/546771; found colors: 4174694
10000/546771; found colors: 4177253
11000/546771; found colors: 4180071
12000/546771; found colors: 4181704
13000/546771; found colors: 4186798
14000/546771; found colors: 4187907
15000/546771; found colors: 4188978
16000/546771; found colors: 4195114
17000/546771; found colors: 4196050
18000/546771; found colors: 4199546
19000/546771; found colors: 4200379
20000/546771; found colors: 4201546
21000/546771; found colors: 4205058
22000/546771; found colors: 4206073
23000/546771; found colors: 4210216
24000/546771; found colors: 4212135
25000/546771; found colors: 4213215
26000/546771; found colors: 4224017
27000/546771; found colors: 4224946
28000/546771; found colors: 4226481
29000/546771; found colors: 4235343
30000/546771; found colors: 4236388
31000/546771; found colors: 4242976
32000/546771; found colors: 4244316
33000/546771; found colors: 4245594
34000/546771; found colors: 4253350
35000/546771; found colors: 4257993
36000/546771; found colors: 4261352
37000/546771; found colors: 4264687
38000/546771; found colors: 4265736
39000/546771; found colors: 4269232
40000/546771; found colors: 4270471
41000/546771; found colors: 4273855
42000/546771; found colors: 4274606
43000/546771; found colors: 4281585
44000/546771; found colors: 4287409
45000/546771; found colors: 4289910
46000/546771; found colors: 4295777
47000/546771; found colors: 4297717
48000/546771; found colors: 4303135
49000/546771; found colors: 4304062
50000/546771; found colors: 4310968
51000/546771; found colors: 4312079
52000/546771; found colors: 4318377
53000/546771; found colors: 4321400



*/


