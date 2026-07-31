#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <algorithm>
#include "cwr.cpp"
#define IN_JE true
#include "be.cpp"
#include <math.h>

using std::vector;
namespace je{
typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

uint max(uint a, uint b){
    return (a > b) ? a : b;
}
uint max(uint a, uint b, uint c){
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}
float max(float a, float b){
    return (a > b) ? a : b;
}

/**
 * Recipes are 32 bits. Each set of bits is directly a number to increment the dye index by. The 8 sets together are effectively the list of dye indices. Once the index accumulates to 16, that signifies the end of the list. Or the list just ends at the 8th item.
 * - But Simon, what about [0]? Great question! That is represented with 0xf2000000. Now, Simon, that is bad... Yes, I know. 0xf0****** is reserved for sequences of 15. So 0xf1000000 indicates [15]. If the second nibble is some x, where x > 1, then the number presents (x-1) zeroes. It is a perfect system that can't possibly fail. Also, white is so useless so it should be fine. Remember, bad code is the best kind of code. And incorrect is the true best kind of correct.
 * - Hm? How many of the 4 billion int values are invalid in this format? Well logically, it should 2^24 - (17 choose 8 with repetitions) + 1. If we just consider all of the ones that I don't use to be invalid. Though most of them shouldn't break the code. Huh? Oh, the + 1 is because the number of mixers is (17 choose 8 with repetitions) - 1, since we have to remove the option of a mixer with nothing in it. I can't have that now.
 */
class Color_Recipes{
public:
    uint* d;
    Color_Recipes(){
        d = new uint[1<<24]{0};
    }
    uint get(uint idx){
        return d[idx];
    }
    void set(uint idx, uint value){
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
    /** min value of R channel for this mixer */
    uint min_r = 0;
    /** min value of G channel for this mixer */
    uint min_g = 0;
    /** min value of B channel for this mixer */
    uint min_b = 0;
    /** max value of R channel for this mixer */
    uint max_r = 0;
    /** max value of G channel for this mixer */
    uint max_g = 0;
    /** max value of B channel for this mixer */
    uint max_b = 0;
    Mixer(){}
    Mixer(uint a_tr, uint a_tg, uint a_tb, uint a_tm, ushort a_mix_d, uint a_len){
        tr = a_tr;
        tg = a_tg;
        tb = a_tb;
        tm = a_tm;
        mix_d = a_mix_d;
        len = a_len;
    }
    void find_bounds(){
        std::cout << "Does it die here?";
        float max_a = 0;
        max_a = max(max_a, alpha(0xff, 0x00, 0x00));
        max_a = max(max_a, alpha(0x00, 0xff, 0x00));
        max_a = max(max_a, alpha(0xff, 0xff, 0x00));
        max_a = max(max_a, alpha(0x00, 0x00, 0xff));
        max_a = max(max_a, alpha(0xff, 0x00, 0xff));
        max_a = max(max_a, alpha(0x00, 0xff, 0xff));
        max_a = max(max_a, alpha(0xff, 0xff, 0xff));
        
        min_r = uint(max_a * tr) / len;
        min_g = uint(max_a * tg) / len;
        min_b = uint(max_a * tb) / len;
        max_r = (max_a * float(tr + 0x100)) / float(len);
        max_g = (max_a * float(tg + 0x100)) / float(len);
        max_b = (max_a * float(tb + 0x100)) / float(len);
        if(max_r >= 0x100){
            std::cout << "Oh no! max_r is " << max_r << ". I didn't think that was possible." << std::endl;
        }
        if(max_g >= 0x100){
            std::cout << "Oh no! max_g is " << max_g << ". I didn't think that was possible." << std::endl;
        }
        if(max_b >= 0x100){
            std::cout << "Oh no! max_b is " << max_b << ". I didn't think that was possible." << std::endl;
        }
        if(max(max_r, max_g, max_b) >= 0x100){
            abort();
        }
    }
    float alpha(uint r, uint g, uint b){
        uint a_tr = tr + r;
        uint a_tg = tg + g;
        uint a_tb = tb + b;
        uint ar = a_tr / len;
        uint ag = a_tg / len;
        uint ab = a_tb / len;
        float avg_max = float(tm + max(r, g, b)) / float(len);
        float max_avg = max(ar, ag, ab);
        return avg_max / max_avg;
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
        Point(){}
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
    class Node{
    public:
        Mixer mixer;
        float md;
        Node* c0;
        Node* c1;
        Node(Mixer a_mixer, float a_md){
            mixer = a_mixer;
            md = a_md;
            c0 = 0;
            c1 = 0;
        }
        /* if this function gets called, we force a to go into the heap no matter what; we're assuming it most go in the heap; */
        void add(Node a){
            if(a.md > md){
                float s_md = a.md;
                a.md = md;
                md = s_md;
                Mixer s_mixer = a.mixer;
                a.mixer = mixer;
                mixer = s_mixer;
            }
            // now a has the pathetic small node data that we MUST push down;
            // check if the children even exist;
            if(!c0){
                c0 = new Node(a.mixer, a.md);
            }
            else if(!c1){
                c1 = new Node(a.mixer, a.md);
            }
            // maybe order does matter, especially since BOTH children exist;
            else if(c0->md < c1->md){
                c0->add(a);
            }
            else{
                c1->add(a);
            }
        }
        // the only place where any amount of memory-leak safety will actually be practice;
        bool remove(){
            // if this the worst heap remove method ever???
            if(!c0 && !c1){
                // (X-X)
                return true;
            }
            else if(c0 && !c1){
                md = c0->md;
                mixer = c0->mixer;
                bool gone = c0->remove();
                if(gone){
                    delete c0;
                    c0 = 0;
                }
            }
            else if(!c0 && c1){
                md = c1->md;
                mixer = c1->mixer;
                bool gone = c1->remove();
                if(gone){
                    delete c1;
                    c1 = 0;
                }
            }
            // figure out which child is bigger, since it's about to get a promotion;
            else if(c0->md > c1->md){
                // promote c0 and then remove() it;
                md = c0->md;
                mixer = c0->mixer;
                bool gone = c0->remove();
                if(gone){
                    delete c0;
                    c0 = 0;
                }
            }
            else{
                // promote c1 and then remove() it;
                md = c1->md;
                mixer = c1->mixer;
                bool gone = c1->remove();
                if(gone){
                    delete c1;
                    c1 = 0;
                }
            }
            return false;
        }
        void push(Mixer* mixers, uint& j){
            mixers[j] = mixer;
            j++;
            // std::cout << "j=" << j << std::endl;
            if(c0){
                c0->push(mixers, j);
            }
            if(c1){
                c1->push(mixers, j);
            }
        }
    };
    // this is a max heap;
    class Heap{
    public:
        /** the mixers in the category; */
        Node* root;
        /** the mixers in the category; */
        uint size = 0;
        /** the mixers in the category; */
        Mixer* mixers;
        /** the center of the category; */
        Point core;
        Heap(){}
        float dist(Point a, Point b){
            return pow(
                (a.x - b.x) * (a.x - b.x) +
                (a.y - b.y) * (a.y - b.y) +
                (a.z - b.z) * (a.z - b.z),
                0.5
            );
        }
        void add(Mixer mixer, uint& heap_lim){
            // std::cout <<
            // "Adding (" << mixer.tr <<
            // "," << mixer.tg <<
            // "," << mixer.tb <<
            // "," << mixer.tm <<
            // "," << mixer.len <<
            // "," << mixer.mix_d <<
            // ") / " <<
            // size << std::endl;
            float d = dist(core, Point(mixer));
            if(!root){
                root = new Node(mixer, d);
                size++;
            }
            else if(size < heap_lim){
                Node node = Node(mixer, d);
                root->add(node);
                size++;
            }
            else if(d < root->md){
                root->remove();
                Node node = Node(mixer, d);
                root->add(node);
            }
        }
        void finalize(){
            mixers = new Mixer[size];
            uint j = 0;
            root->push(mixers, j);
            // std::cout << "Check if jank code works? ";
            if(j != size){
                std::cout << "It does not, good luck making it work.";
            }
            for(uint i = 0; i < size; i++){
                root->remove();
            }
            root = 0;
        }
    };
    /** a list of 64 sets, each of which contains 0 or more mixers; sets are used to prevent duplicates; */
    Heap* heaps;
    uint heap_lim = 1024;
    Catifier(){
        heaps = new Heap[64];
        for(uchar i = 0; i < 64; i++){
            heaps[i].core = Point(
                32 + 64 * ((i & 0x30) >> 4),
                32 + 64 * ((i & 0xc) >> 2),
                32 + 64 * (i & 0x3)
            );
        }
    }
    /** returns a list of all 64 category indices, sorted by how close the point is to each category's core; */
    uchar cat_calc(Point p){
        return (
            (((uchar) p.x) / 64) * 16 +
            (((uchar) p.y) / 64) * 4 +
            (((uchar) p.z) / 64)
        );
    }
    uchar cat_calc(uint color){
        return (
            (((uchar) ((color & 0xc00000) >> 22)) / 64) * 16 +
            (((uchar) ((color & 0x00c000) >> 14)) / 64) *  4 +
            (((uchar) ((color & 0x0000c0) >>  6)) / 64)
        );
    }
    void add_mixer(Mixer mixer){
        for(uchar i = 0; i < 64; i++){
            heaps[i].add(mixer, heap_lim);
        }
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
    uint b = (color & 0x0000ff);
    uint tr = mixer.tr + r;
    uint tg = mixer.tg + g;
    uint tb = mixer.tb + b;
    uint ar = tr / mixer.len;
    uint ag = tg / mixer.len;
    uint ab = tb / mixer.len;
    float avg_max = float(mixer.tm + max(r, g, b)) / float(mixer.len);
    float max_avg = max(ar, ag, ab);
    // note the order of operations matters here; you must multiply then divide;
    return (
        (((uint) ((float(tr) * avg_max) / max_avg)) << 16) |
        (((uint) ((float(tg) * avg_max) / max_avg)) <<  8) |
        (((uint) ((float(tb) * avg_max) / max_avg))      )
    );
}

// isn't there a way to put this on the stack instead of the heap? i don't remember what it is;
// well global vars can be on the heap, since they will be deleted when the program finishes running XD;
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

vector<Mixer> mixers_v;
uint dye_c = 16;
uint dye_lim = 8;
float MAGIC_MIX_VIBRANCE = 50.0;
float MAGIC_COLOR_VIBRANCE = 150.0;

void gen_mixes(){
    std::set<Mixer> mixer_s = std::set<Mixer>();
    std::cout << "Start of CWR gen" << std::endl;
    CWR cwr = CWR();
    std::cout << "CWR gen done" << std::endl;
    for(auto it = cwr.dyes.begin(); it != cwr.dyes.end(); it++){
        uint colors[8] = {};
        uint dyem = *it;
        std::cout << "Color? " << dyem << std::endl;
        uchar len = 0;
        uchar z = (dyem & 0xff000000) >> 24;
        // crazy zero check; but it's less crazy than the code i used to have here;
        if(z > 0xf1){
            len = z > 0xf1;
            for(uchar i = 0; i < len; i++){
                colors[i] = 0;
            }
        }
        else{
            uchar total = 0;
            while(len < 8 && total < 16){
                uchar big_endian_number = ((dyem << (4*len)) & 0xf0000000) >> 28;
                total += big_endian_number;
                colors[len] = total;
                len++;
            }
        }
        
        std::cout << "Colors? " <<
        colors[0] << ","<<
        colors[1] << ","<<
        colors[2] << ","<<
        colors[3] << ","<<
        colors[4] << ","<<
        colors[5] << ","<<
        colors[6] << ","<<
        colors[7] << ",[" << len << "]" << std::endl;
        Mixer mixer = premix(colors, dyem, len);
        mixer.find_bounds();
        mixer_s.insert(mixer);
    }
    mixers_v = vector<Mixer>();
    for(auto it = mixer_s.begin(); it != mixer_s.end(); it++){
        mixers_v.push_back(*it);
    }
}


auto recipes = new Color_Recipes();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();
auto c_exists = new Color_Exists();
uint ic = 0;

uint found = 0;
void add(uint color, ulng mix_d){
    // if(ic > 0) std::cout << "add" << std::endl;
    if(c_exists->get(color)) return;
    found++;
    added->set(color, 1);
    c_exists->set(color, 1);
    recipes->set(color, mix_d);
}

bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, 0);
    }
    for(uint i = 0; i < 1<<24; i++){
        // prevent BE colors from being checked, because they are highly unlikely to give anything interesting;
        // if(ic > 1 && be::c_exists->get(i)) continue;
        prev_added->set(i, added->get(i));
    }
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    
    // uint prev_c = 0;
    // for(uint i = 0; i < 1<<24; i++){
    //     if(prev_added->get(i)){
    //         prev_c++;
    //     }
    // }
    // uint prev_i = 0;
    // uint prev_li = 0;
    // uint prev_lf = 10000;
    
    for(uint i = 0; i < 1<<24; i++){
        if(!prev_added->get(i)) continue;
        // prev_i++;
        // prev_li++;
        // if(prev_li == prev_lf){
        //     prev_li = 0;
        //     std::cout << prev_i << "/" << prev_c << "; found colors: " << found << std::endl;
        // }
        for(auto it = mixers_v.begin(); it != mixers_v.end(); it++){
            auto res = mix(i, *it);
            add(res, it->mix_d);
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

void save_je(){
    uint size = (1<<24) * 8;
    uint i = 0;
    uchar* mychars = new uchar[size];
    for(uint j = 0; j < 1<<24; j++, i += 8){
        ulng dyem = recipes->d[j];
        mychars[i    ] = dyem & 0xff000000;
        mychars[i + 1] = dyem & 0x00ff0000;
        mychars[i + 2] = dyem & 0x0000ff00;
        mychars[i + 3] = dyem & 0x000000ff;
    }
    
    std::cout << "Saving..." << std::endl;
    
    auto fout = std::ofstream("je_res.bin");
    fout << "Testing.";
    for(i = 0; i < size; i++){
        fout << mychars[i];
    }
    
    std::cout << "Saved." << std::endl;
}

int main(int argc, char const *argv[]){
    be::main(0, argv);
    
    std::cout << "Main!" << std::endl;
    gen_mixes();
    // it generates 1081566 CWR, but it seems making the actual mixers is not working;
    std::cout << "mixer_c: " << mixers_v.size() << std::endl;
    
    for(uint i = 0; i < 16; i++){
        add(base_colors[i], (1 << i));
    }
    while(added_any){
        std::cout << "Cycle " << ic << std::endl;
        cycle();
        std::cout << "Found colors: " << found << std::endl;
    }
    
    
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


