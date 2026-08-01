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
uint min(uint a, uint b){
    return (a < b) ? a : b;
}
short min(short a, short b){
    return (a < b) ? a : b;
}
short min(short a, short b, short c){
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
}
short max(short a, short b){
    return (a > b) ? a : b;
}
short max(short a, short b, short c){
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}
float max(float a, float b){
    return (a > b) ? a : b;
}

// isn't there a way to put this on the stack instead of the heap? i don't remember what it is;
// well global vars can be on the heap, since they will be deleted when the program finishes running XD;
uint* base_colors = new uint[16]{
    0xffffff, /* #ffffff white   */
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
    string("white   "), /* #ffffff */
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
    ~Color_Recipes(){
        delete d;
    }
};
class Color_Exists{
public:
    uchar* d;
    Color_Exists(){
        d = new uchar[(1<<24) / 8]{0};
    }
    uchar get(uint idx){
        uchar v = d[idx >> 3];
        return (v & (((uchar) 1) << (idx & 7))) >> (idx & 7);
    }
    /** `value` should only be 1 bit */
    void set(uint idx, uchar value){
        d[idx >> 3] &= ~(((uchar) 1) << (idx & 7));
        d[idx >> 3] |= value         << (idx & 7);
    }
    ~Color_Exists(){
        delete d;
    }
};

class Mixer;
uint mix(uint color, Mixer mixer);
class Mixer{
public:
    uint tr = 0;
    uint tg = 0;
    uint tb = 0;
    uint tm = 0;
    uint mix_d = 0;
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
    Mixer(uint a_tr, uint a_tg, uint a_tb, uint a_tm, uint a_mix_d, uint a_len){
        tr = a_tr;
        tg = a_tg;
        tb = a_tb;
        tm = a_tm;
        mix_d = a_mix_d;
        len = a_len;
    }
    Mixer(const Mixer& that){
        tr = that.tr;
        tg = that.tg;
        tb = that.tb;
        tm = that.tm;
        mix_d = that.mix_d;
        len = that.len;
    }
    /** Generate a mixer directly from "dyem", which is the recipe format used by CWR and Color_Recipes. */
    Mixer(uint dyem){
        mix_d = dyem;
        uint colors[8] = {};
        uchar a_len = 0;
        uchar z = (mix_d & 0xff000000) >> 24;
        // crazy zero check; but it's less crazy than the code i used to have here;
        if(z > 0xf1){
            a_len = z - 0xf1;
            for(uchar i = 0; i < a_len; i++){
                colors[i] = 0;
            }
        }
        else{
            uchar total = 0;
            while(a_len < 8 && total < 16){
                uchar big_endian_number = ((mix_d << (4*a_len)) & 0xf0000000) >> 28;
                total += big_endian_number;
                if(total >= 16) break;
                colors[a_len] = total;
                a_len++;
            }
        }
        init(colors, a_len);
        len = a_len + 1;
        
        const uint test = 0x1f000000;
        
        // if(a_len < 3){
        //     std::cout << "Mixer:" <<
        //     " tr= " << tr <<
        //     ", tg= " << tg <<
        //     ", tb= " << tb <<
        //     ", tm= " << tm <<
        //     ", len= " << a_len <<
        //     ", mix_d= " << mix_d <<
        //     ", base= " << base() <<
        //     ", colors= [";
        //     if(a_len > 0) std::cout         << colors[0];
        //     if(a_len > 1) std::cout << ", " << colors[1];
        //     if(a_len > 2) std::cout << ", " << colors[2];
        //     if(a_len > 3) std::cout << ", " << colors[3];
        //     if(a_len > 4) std::cout << ", " << colors[4];
        //     if(a_len > 5) std::cout << ", " << colors[5];
        //     if(a_len > 6) std::cout << ", " << colors[6];
        //     if(a_len > 7) std::cout << ", " << colors[7];
        //     std::cout << "]" << std::endl;
        // }
        
        find_bounds();
    }
    void init(uint* colors, uint a_len){
        tr = 0;
        tg = 0;
        tb = 0;
        tm = 0;
        for(uint i = 0; i < a_len; i++){
            uint color = base_colors[colors[i]];
            uint r = (color & 0xff0000) >> 16;
            uint g = (color & 0x00ff00) >> 8;
            uint b = color & 0x0000ff;
            tr += r;
            tg += g;
            tb += b;
            tm += max(r, g, b);
        }
    }
    /** Get the base color of the mixer. */
    uint base(){
        len--;
        uint c = mix(0, *this);
        len++;
        return c;
    }
    void find_bounds(){
        float max_a = 0;
        max_a = max(max_a, alpha(0xff, 0x00, 0x00));
        max_a = max(max_a, alpha(0x00, 0xff, 0x00));
        max_a = max(max_a, alpha(0xff, 0xff, 0x00));
        max_a = max(max_a, alpha(0x00, 0x00, 0xff));
        max_a = max(max_a, alpha(0xff, 0x00, 0xff));
        max_a = max(max_a, alpha(0x00, 0xff, 0xff));
        max_a = max(max_a, alpha(0xff, 0xff, 0xff));
        
        min_r = tr / len;
        min_g = tg / len;
        min_b = tb / len;
        max_r = min(255, uint((max_a * float(tr + 0xff)) / float(len)));
        max_g = min(255, uint((max_a * float(tg + 0xff)) / float(len)));
        max_b = min(255, uint((max_a * float(tb + 0xff)) / float(len)));
        // if(max_r >= 0x100){
        //     std::cout << "Oh no! max_r is " << max_r << ". I didn't think that was possible." << std::endl;
        // }
        // if(max_g >= 0x100){
        //     std::cout << "Oh no! max_g is " << max_g << ". I didn't think that was possible." << std::endl;
        // }
        // if(max_b >= 0x100){
        //     std::cout << "Oh no! max_b is " << max_b << ". I didn't think that was possible." << std::endl;
        // }
        // if(max(max_r, max_g, max_b) >= 0x100){
        //     abort();
        // }
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
    string recipe_step(){
        // print the recipe step, i.e. convert mix_d into its respective array and then map the indices using base_color_names;
        uint colors[8] = {};
        uchar a_len = 0;
        uchar z = (mix_d & 0xff000000) >> 24;
        // crazy zero check; but it's less crazy than the code i used to have here;
        if(z > 0xf1){
            a_len = z - 0xf1;
            for(uchar i = 0; i < a_len; i++){
                colors[i] = 0;
            }
        }
        else{
            uchar total = 0;
            while(a_len < 8 && total < 16){
                uchar big_endian_number = ((mix_d << (4*a_len)) & 0xf0000000) >> 28;
                total += big_endian_number;
                colors[a_len] = total;
                a_len++;
            }
        }
        string s = "[";
        s += base_colors_names[colors[0]];
        for(uint i = 1; i < a_len; i++){
            s += ",";
            s += base_colors_names[colors[i]];
        }
        s += "]";
        return s;
    }
};

bool operator==(const Mixer a, const Mixer b){
    return (
        a.tr    == b.tr    &&
        a.tg    == b.tg    &&
        a.tb    == b.tb    &&
        a.tm    == b.tm    &&
        a.len   == b.len
    );
}
bool operator< (const Mixer a, const Mixer b){
    return (
        (                      a.tr    < b.tr  ) ||
        (a.tr    == b.tr    && a.tg    < b.tg    ||
        (a.tg    == b.tg    && a.tb    < b.tb    ||
        (a.tb    == b.tb    && a.tm    < b.tm    ||
        (a.tm    == b.tm    && a.len   < b.len))))
    );
}
bool operator> (const Mixer a, const Mixer b){
    return (
        (                      a.tr    > b.tr  ) ||
        (a.tr    == b.tr    && a.tg    > b.tg    ||
        (a.tg    == b.tg    && a.tb    > b.tb    ||
        (a.tb    == b.tb    && a.tm    > b.tm    ||
        (a.tm    == b.tm    && a.len   > b.len))))
    );
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
        (((uint) ((float(ar) * avg_max) / max_avg)) << 16) |
        (((uint) ((float(ag) * avg_max) / max_avg)) <<  8) |
        (((uint) ((float(ab) * avg_max) / max_avg))      )
    );
}

vector<Mixer> mixers_v;
void gen_mixes(CWR cwr){
    mixers_v = vector<Mixer>();
    // uint mix_indx = 0;
    for(auto it = cwr.dyes.begin(); it != cwr.dyes.end(); it++){
        Mixer mixer = Mixer(*it);
        mixers_v.push_back(mixer);
         
        
        // mix_indx++;
    }
}

auto recipes = new Color_Recipes();
auto last_cs = new Color_Recipes();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();
auto c_exists = new Color_Exists();
auto in_bounds = new Color_Exists();
auto on_edge = new Color_Exists();
uint ic = 0;

void all_bounds(){
    for(auto it = mixers_v.begin(); it != mixers_v.end(); it++){
        uint outer = ((
            (it->max_r - it->min_r + 1) *
            (it->max_g - it->min_g + 1) *
            (it->max_b - it->min_b + 1)
        ) - (
            (it->max_r - it->min_r - 1) *
            (it->max_g - it->min_g - 1) *
            (it->max_b - it->min_b - 1)
        ));
        uint added = 0;
        uint ir;
        ir = it->min_r;
        for(uint ig = it->min_g; ig <= it->max_g; ig++){
        for(uint ib = it->min_b; ib <= it->max_b; ib++){
            in_bounds->set(
                (ir << 16) |
                (ig <<  8) |
                (ib      ),
                1
            );
            added++;
        }
        }
        ir = it->max_r;
        for(uint ig = it->min_g; ig <= it->max_g; ig++){
        for(uint ib = it->min_b; ib <= it->max_b; ib++){
            in_bounds->set(
                (ir << 16) |
                (ig <<  8) |
                (ib      ),
                1
            );
            added++;
        }
        }
        for(ir = it->min_r + 1; ir <= it->max_r - 1; ir++){
            uint ig;
            ig = it->min_g;
            for(uint ib = it->min_b; ib <= it->max_b; ib++){
                in_bounds->set(
                    (ir << 16) |
                    (ig <<  8) |
                    (ib      ),
                    1
                );
                added++;
            }
            ig = it->max_g;
            for(uint ib = it->min_b; ib <= it->max_b; ib++){
                in_bounds->set(
                    (ir << 16) |
                    (ig <<  8) |
                    (ib      ),
                    1
                );
                added++;
            }
            for(ig = it->min_g + 1; ig <= it->max_g - 1; ig++){
                uint ib;
                ib = it->min_b;
                in_bounds->set(
                    (ir << 16) |
                    (ig <<  8) |
                    (ib      ),
                    1
                );
                added++;
                ib = it->max_b;
                in_bounds->set(
                    (ir << 16) |
                    (ig <<  8) |
                    (ib      ),
                    1
                );
                added++;
            }
        }
        if(added != outer){
            std::cout << "outer=" << outer << ", added=" << added << std::endl;
            abort();
        }
    }
    uint in_bound = 0;
    for(uint i = 0; i < (1<<24); i++){
        if(in_bounds->get(i)) in_bound++;
    }
    std::cout << "In bounds: " << in_bound << std::endl;
}

// a better approach is to actually mix each mixer with the edge of the 256^3 cube;
void true_bounds_i(Mixer mixer, uint a, uint b){
    uint ir;
    ir = a;
    for(uint ig = a; ig <= b; ig++){
    for(uint ib = a; ib <= b; ib++){
        in_bounds->set(mix(
            (ir << 16) |
            (ig <<  8) |
            (ib      ), mixer),
            1
        );
    }
    }
    ir = b;
    for(uint ig = a; ig <= b; ig++){
    for(uint ib = a; ib <= b; ib++){
        in_bounds->set(mix(
            (ir << 16) |
            (ig <<  8) |
            (ib      ), mixer),
            1
        );
    }
    }
    for(ir = a+1; ir <= b-1; ir++){
        uint ig;
        ig = a;
        for(uint ib = a; ib <= b; ib++){
            in_bounds->set(mix(
                (ir << 16) |
                (ig <<  8) |
                (ib      ), mixer),
                1
            );
        }
        ig = b;
        for(uint ib = a; ib <= b; ib++){
            in_bounds->set(mix(
                (ir << 16) |
                (ig <<  8) |
                (ib      ), mixer),
                1
            );
        }
        for(ig = a+1; ig <= b-1; ig++){
            uint ib;
            ib = a;
            in_bounds->set(mix(
                (ir << 16) |
                (ig <<  8) |
                (ib      ), mixer),
                1
            );
            ib = b;
            in_bounds->set(mix(
                (ir << 16) |
                (ig <<  8) |
                (ib      ), mixer),
                1
            );
        }
    }
}
void true_bounds(uint dye_c){
    std::cout << "Dyes: " << dye_c << std::endl;
    uint mixers_checked = 0;
    for(auto it = mixers_v.begin(); it != mixers_v.end(); it++){
        if(it->len - 1 != dye_c) continue;
        mixers_checked++;
        if(dye_c < 4) true_bounds_i(*it, 0, 255);
        if(dye_c < 4) true_bounds_i(*it, 1, 254);
        if(dye_c <= 4) true_bounds_i(*it, 5, 250);
        if(dye_c > 4) true_bounds_i(*it, 80, 220);
    }
    std::cout << "Mixers: " << mixers_checked << std::endl;
    uint in_bound = 0;
    for(uint i = 0; i < (1<<24); i++){
        if(in_bounds->get(i)) in_bound++;
    }
    std::cout << "In bounds: " << in_bound << std::endl;
}
void poly_fill(){
    bool outside_done = false;
    uint outside_size = 0;
    auto filled = new Color_Exists();
    auto outside = new Color_Exists();
    uint fill_c = 0;
    for(uint i = 0; i < (1 << 24); i++){
        if(filled->get(i)) continue;
        if(outside->get(i)) continue;
        if(in_bounds->get(i)) continue;
        uint ir = (i & 0xff0000) >> 16;
        uint ig = (i & 0x00ff00) >> 8;
        uint ib = (i & 0x0000ff);
        // skip edge items, since i don't want to polyfill the outside;
        if(
            ir == 0 || ir == 255 ||
            ig == 0 || ig == 255 ||
            ib == 0 || ib == 255
        ) continue;
        // this vector acts like a queue;
        auto filling = vector<uint>();
        filling.push_back(i);
        filled->set(i, 1);
        bool success = true;
        for(uint fill_i = 0; fill_i < filling.size(); fill_i++){
            uint i = filling.at(fill_i);
            uint ir = (i & 0xff0000) >> 16;
            uint ig = (i & 0x00ff00) >> 8;
            uint ib = (i & 0x0000ff);
            
            // if we hit the edge, fail;
            if(
                ir == 0 || ir == 255 ||
                ig == 0 || ig == 255 ||
                ib == 0 || ib == 255
            ){
                success = false;
                if(outside_done) break;
                // the outside needs separate logic;
                uint j;
                
                if(ir < 255){
                    j = ((ir + 1) << 16) | ((ig    ) << 8) | (ib    );
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                
                if(ir > 0){
                    j = ((ir - 1) << 16) | ((ig    ) << 8) | (ib    );
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                
                if(ig < 255){
                    j = ((ir    ) << 16) | ((ig + 1) << 8) | (ib    );
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                
                if(ig > 0){
                    j = ((ir    ) << 16) | ((ig - 1) << 8) | (ib    );
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                
                if(ib < 255){
                    j = ((ir    ) << 16) | ((ig    ) << 8) | (ib + 1);
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                
                if(ib > 0){
                    j = ((ir    ) << 16) | ((ig    ) << 8) | (ib - 1);
                    if(!in_bounds->get(j) && !filled->get(j)){
                        filling.push_back(j);
                        filled->set(j, 1);
                    }
                }
                continue;
            }
            // if we hit a found tile, stop searching at that tile; this is how we detect the edge of the area to fill in;
            uint j;
            
            j = ((ir + 1) << 16) | ((ig    ) << 8) | (ib    );
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
            
            j = ((ir - 1) << 16) | ((ig    ) << 8) | (ib    );
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
            
            j = ((ir    ) << 16) | ((ig + 1) << 8) | (ib    );
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
            
            j = ((ir    ) << 16) | ((ig - 1) << 8) | (ib    );
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
            
            j = ((ir    ) << 16) | ((ig    ) << 8) | (ib + 1);
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
            
            j = ((ir    ) << 16) | ((ig    ) << 8) | (ib - 1);
            if(!in_bounds->get(j) && !filled->get(j)){
                filling.push_back(j);
                filled->set(j, 1);
            }
        }
        if(success){
            fill_c += filling.size();
            for(auto it = filling.begin(); it != filling.end(); it++){
                in_bounds->set(*it, 1);
            }
        }
        else if(!outside_done){
            outside_done = true;
            outside_size = filling.size();
            for(auto it = filling.begin(); it != filling.end(); it++){
                outside->set(*it, 1);
            }
        }
    }
    std::cout << "Outside: " << outside_size << std::endl;
    std::cout << "Filled: " << fill_c << std::endl;
    delete filled;
    delete outside;
}
void convex_hull(){
    uint fill_c = 0;
    for(uint i = 0; i < (1 << 24); i++){
        if(in_bounds->get(i)) fill_c++;
    }
    std::cout << "Total in bounds before: " << fill_c << std::endl;
    
    
    for(uint i = 0; i < (1 << 24); i++){
        if(in_bounds->get(i)) continue;
        uint ir = (i & 0xff0000) >> 16;
        uint ig = (i & 0x00ff00) >> 8;
        uint ib = (i & 0x0000ff);
        // skip edge items, since i don't want to polyfill the outside;
        if(
            ir == 0 || ir == 255 ||
            ig == 0 || ig == 255 ||
            ib == 0 || ib == 255
        ) continue;
        
        // check if this tile should be filled, and stop search here if it should not;
        if(
            in_bounds->get(i + 0x010000) +
            in_bounds->get(i - 0x010000) +
            in_bounds->get(i + 0x000100) +
            in_bounds->get(i - 0x000100) +
            in_bounds->get(i + 0x000001) +
            in_bounds->get(i - 0x000001) <= 3
        ) continue;
        // fill this tile;
        in_bounds->set(i, 1);
        
        // this vector acts like a queue;
        auto filling = vector<uint>();
        filling.push_back(i);
        for(uint fill_i = 0; fill_i < filling.size(); fill_i++){
            uint i = filling.at(fill_i);
            // skip filled tiles;
            if(in_bounds->get(i)) continue;
            uint ir = (i & 0xff0000) >> 16;
            uint ig = (i & 0x00ff00) >> 8;
            uint ib = (i & 0x0000ff);
            
            // if we hit the edge, skip that;
            if(
                ir == 0 || ir == 255 ||
                ig == 0 || ig == 255 ||
                ib == 0 || ib == 255
            ) continue;
            
            // check if this tile should be filled, and stop search here if it should not;
            if(
                in_bounds->get(i + 0x010000) +
                in_bounds->get(i - 0x010000) +
                in_bounds->get(i + 0x000100) +
                in_bounds->get(i - 0x000100) +
                in_bounds->get(i + 0x000001) +
                in_bounds->get(i - 0x000001) <= 3
            ) continue;
            // fill this tile;
            in_bounds->set(i, 1);
            
            // if we hit a found tile, stop searching at that tile;
            uint j;
            
            j = ((ir + 1) << 16) | ((ig    ) << 8) | (ib    );
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
            
            j = ((ir - 1) << 16) | ((ig    ) << 8) | (ib    );
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
            
            j = ((ir    ) << 16) | ((ig + 1) << 8) | (ib    );
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
            
            j = ((ir    ) << 16) | ((ig - 1) << 8) | (ib    );
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
            
            j = ((ir    ) << 16) | ((ig    ) << 8) | (ib + 1);
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
            
            j = ((ir    ) << 16) | ((ig    ) << 8) | (ib - 1);
            if(!in_bounds->get(j)){
                filling.push_back(j);
            }
        }
    }
    // cast inward shadows to improve shape further;
    short* shadow_a = new short[65536];
    #define shadow(v1, v2, v3, f1, f2, f3, f4, f5, f6, f7, f8, mia, s1, s2, s3) \
    for(uint v1 = 0; v1 <= 255; v1++){           \
        for(uint v2 = 0; v2 <= 255; v2++){       \
            shadow_a[(v1 << 8) | v2] = f1;       \
            for(uint v3 = f1; v3 f2 f3; v3 f4){  \
                if(in_bounds->get(               \
                    (ir << 16) | (ig << 8) | ib) \
                ) break;                         \
                shadow_a[(v1 << 8) | v2] f4;     \
            }                                    \
            if(shadow_a[(v1 << 8) | v2] f7 f8)   \
                on_edge->set(                    \
                    s1 | s2 | s3, 1              \
                );                               \
        }                                        \
    }                                            \
    for(uint v1 = 1; v1 <= 254; v1++){           \
        for(uint v2 = 1; v2 <= 254; v2++){       \
            uint i = (v1 << 8) | v2;             \
            short shadow_b = mia(                \
                shadow_a[i],                     \
                mia(shadow_a[i + 0x0100],        \
                    shadow_a[i - 0x0100]),       \
                mia(shadow_a[i + 0x0001],        \
                    shadow_a[i - 0x0001])        \
            );                                   \
            if(!(shadow_b f7 f8)) continue;      \
            for(uint v3 = f5; v3 < f6; v3++){    \
                in_bounds->set(                  \
                    (ir << 16) | (ig << 8) | ib, \
                    1                            \
                );                               \
                on_edge->set(                    \
                    s1 | s2 | s3, 0              \
                );                               \
                on_edge->set(                    \
                    (ir << 16) | (ig << 8) | ib, \
                    1                            \
                );                               \
            }                                    \
        }                                        \
    }
    shadow(ir, ig, ib, 0, <=, 255, ++, shadow_b - 1, shadow_a[i] - 1, <=, 255, min, (                      ir << 16), (                      ig << 8), shadow_a[(ir << 8) | ig]);
    shadow(ig, ib, ir, 0, <=, 255, ++, shadow_b - 1, shadow_a[i] - 1, <=, 255, min, (shadow_a[(ig << 8) | ib] << 16), (                      ig << 8),                       ib);
    shadow(ir, ib, ig, 0, <=, 255, ++, shadow_b - 1, shadow_a[i] - 1, <=, 255, min, (                      ir << 16), (shadow_a[(ir << 8) | ib] << 8),                       ib);
    shadow(ir, ig, ib, 255, >=, 0, --, shadow_a[i] + 1, shadow_b + 1, >=,   0, max, (                      ir << 16), (                      ig << 8), shadow_a[(ir << 8) | ig]);
    shadow(ig, ib, ir, 255, >=, 0, --, shadow_a[i] + 1, shadow_b + 1, >=,   0, max, (shadow_a[(ig << 8) | ib] << 16), (                      ig << 8),                       ib);
    shadow(ir, ib, ig, 255, >=, 0, --, shadow_a[i] + 1, shadow_b + 1, >=,   0, max, (                      ir << 16), (shadow_a[(ir << 8) | ib] << 8),                       ib);
    delete shadow_a;
    
    
    fill_c = 0;
    for(uint i = 0; i < (1 << 24); i++){
        if(in_bounds->get(i)) fill_c++;
    }
    std::cout << "Total in bounds after: " << fill_c << std::endl;
    
    fill_c = 0;
    for(uint i = 0; i < (1 << 24); i++){
        if(on_edge->get(i)) fill_c++;
    }
    std::cout << "Total on edge: " << fill_c << std::endl;
}

uint found = 0;
void add(uint color, uint last, ulng mix_d){
    // if(ic > 0) std::cout << "add" << std::endl;
    if(c_exists->get(color)) return;
    found++;
    added->set(color, 1);
    c_exists->set(color, 1);
    recipes->set(color, mix_d);
    last_cs->set(color, last);
}

bool added_any = true;
void cycle(){
    for(uint i = 0; i < 1<<24; i++){
        // filter so only colors in in_bounds are kept;
        // if(!in_bounds->get(i)) continue;
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
    uint prev_lf = 1000;
    
    for(uint i = 0; i < 1<<24; i++){
        if(!prev_added->get(i)) continue;
        prev_i++;
        prev_li++;
        if(prev_li == prev_lf){
            prev_li = 0;
            std::cout << prev_i << "/" << prev_c << "; found colors: " << found << std::endl;
        }
        for(auto it = mixers_v.begin(); it != mixers_v.end(); it++){
            auto res = mix(i, *it);
            add(res, i, it->mix_d);
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
    // recipes, then last_cs, then c_exists;
    uint size = (1<<24) * 4 + (1<<24) * 4 + (1<<24) / 8;
    uint i = 0;
    uchar* mychars = new uchar[size];
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint dyem = recipes->d[j];
        mychars[i    ] = dyem & 0xff000000;
        mychars[i + 1] = dyem & 0x00ff0000;
        mychars[i + 2] = dyem & 0x0000ff00;
        mychars[i + 3] = dyem & 0x000000ff;
    }
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint dyem = last_cs->d[j];
        mychars[i    ] = dyem & 0xff000000;
        mychars[i + 1] = dyem & 0x00ff0000;
        mychars[i + 2] = dyem & 0x0000ff00;
        mychars[i + 3] = dyem & 0x000000ff;
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i ++){
        mychars[i    ] = c_exists->d[j];
    }
    
    std::cout << "Saving..." << std::endl;
    
    auto fout = std::ofstream("je_res.bin");
    fout << "Testing.";
    for(i = 0; i < size; i++){
        fout << mychars[i];
    }
    
    std::cout << "Saved." << std::endl;
}

class Recipe{
public:
    uint res = 0;
    // temporary way to prevent infinite loop;
    uint depth = 0;
    uint depth_lim = 100;
    // dyes, in reverse order;
    vector<uint> done_dyems;
    // dyes, in reverse order;
    vector<uint> dyems;
    Recipe(uint a_res){
        res = a_res;
        done_dyems = vector<uint>();
        dyems = vector<uint>();
    }
    void try_last(uint color){
        if(!c_exists->get(color)){
            // std::cout << "color does not exist" << std::endl;
            return;
        }
        // std::cout << "enter try_last" << std::endl;
        // std::cout << "color = " << color << std::endl;
        uint dyem = recipes->get(color);
        uint last = last_cs->get(color);
        // std::cout << "dyem = " << dyem << std::endl;
        // std::cout << "last = " << last << std::endl;
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
            done_dyems = dyems;
            done_dyems.push_back(dyem);
            return;
        }
        if(depth == 0){
            // std::cout << "depth = 0" << std::endl;
            return;
        }
        
        dyems.push_back(dyem);
        depth--;
        // std::cout << "begin business" << std::endl;
        try_last(last);
        // std::cout << "end business" << std::endl;
        depth++;
        dyems.pop_back();
    }
    void search(){
        depth = depth_lim;
        try_last(res);
    }
};

void verify(uint c, vector<uint> dyems){
    auto it = dyems.rbegin();
    uint color = Mixer(*it).base();
    for(it++; it != dyems.rend(); it++){
        color = mix(color, Mixer(*it));
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
    if(!c_exists->get(i)){
        std::cout << "Color not found: " << to_hex(i) << std::endl;
        return;
    }
    std::cout << msg << to_hex(i) << std::endl;
    
    Recipe find_boi = Recipe(i);
    find_boi.search();
    
    std::cout << "Recipe [";
    for(auto it = find_boi.done_dyems.begin(); it != find_boi.done_dyems.end(); it++){
        std::cout << Mixer(*it).recipe_step() << ",";
    }
    std::cout << "]" << std::endl;
    verify(i, find_boi.done_dyems);
}


int main(int argc, char const *argv[]){
    // be::main(0, argv);
    
    std::cout << "Main!" << std::endl;
    
    CWR cwr = CWR();
    std::cout << "cwr entries: " << cwr.dyes.size() << std::endl;
    gen_mixes(cwr);
    // 735470 -> 564927;
    std::cout << "mixer_c: " << mixers_v.size() << std::endl;
    
    // all_bounds();
    // true_bounds(1);
    // true_bounds(2);
    // true_bounds(3);
    // true_bounds(4);
    // true_bounds(5);
    // poly_fill();
    // convex_hull();
    
    for(auto it = mixers_v.begin(); it != mixers_v.end(); it++){
        // std::cout << "mixer= " << it->mix_d << std::endl;
        uint i = it->base();
        // std::cout << "base= " << i << std::endl;
        add(i, i, it->mix_d);
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


