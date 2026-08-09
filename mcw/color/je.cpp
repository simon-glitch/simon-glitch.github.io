#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <set>
#include <algorithm>
#include "cwr.cpp"
#include <math.h>

#include <csignal>

volatile std::sig_atomic_t interrupted = 0;

void signal_handler(int signal) {
    if (signal == SIGINT) {
        interrupted = 1;
    }
}

using std::vector;
using std::string;

namespace je{
typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

uint min(uint a, uint b){
    return (a < b) ? a : b;
}
short min(short a, short b){
    return (a < b) ? a : b;
}
short min(short a, short b, short c){
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
}
uint max(uint a, uint b){
    return (a > b) ? a : b;
}
uint max(uint a, uint b, uint c){
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
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

vector<char> whole_file(string file_in){
    vector<char> data = vector<char>();
    
    int size = 0x10000;
    char* txt_in = new char[size];
    auto fin = std::ifstream(file_in, std::ios_base::binary);
    fin.read(txt_in, size);
    int count = fin.gcount();
    int j = 0;
    while(count > 0){
        j++;
        for(int i = 0; i < count; i++){
            data.push_back(txt_in[i]);
        }
        fin.read(txt_in, size);
        count = fin.gcount();
    }
    fin.close();
    delete txt_in;
    
    return data;
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
    string("white   "), /* #ffffff  0 */
    string("l_gray  "), /* #9d9d97  1 */
    string("gray    "), /* #474f52  2 */
    string("black   "), /* #1d1d21  3 */
    string("brown   "), /* #835432  4 */
    string("red     "), /* #b02e26  5 */
    string("orange  "), /* #f9801d  6 */
    string("yellow  "), /* #fed83d  7 */
    string("lime    "), /* #80c71f  8 */
    string("green   "), /* #5e7c16  9 */
    string("cyan    "), /* #169c9c 10 */
    string("l_blue  "), /* #3ab3da 11 */
    string("blue    "), /* #3c44aa 12 */
    string("purple  "), /* #8932b8 13 */
    string("magenta "), /* #c74ebd 14 */
    string("pink    "), /* #f38baa 15 */
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
/** This indicate show many crafting steps it takes to obtain a color. The max is 255 because I can't imagine needing even more. I think just 15 would be enough, but there is no need to minimize the amount of data. */
class Color_Steps{
public:
    uchar* d;
    Color_Steps(){
        d = new uchar[1<<24]{0};
        // for(uint i = 0; i < (1<<24); i++){
        //     d[i] = 0;
        // }
    }
    uchar get(uint idx){
        return d[idx];
    }
    void set(uint idx, uchar value){
        d[idx] = value;
    }
    ~Color_Steps(){
        delete d;
    }
};
class Color_Exists{
public:
    uchar* d;
    Color_Exists(){
        d = new uchar[(1<<24) / 8]{0};
        // for(uint i = 0; i < (1<<24) / 8; i++){
        //     d[i] = 0;
        // }
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
    /*
    / ** min value of R channel for this mixer * /
    uint min_r = 0;
    / ** min value of G channel for this mixer * /
    uint min_g = 0;
    / ** min value of B channel for this mixer * /
    uint min_b = 0;
    / ** max value of R channel for this mixer * /
    uint max_r = 0;
    / ** max value of G channel for this mixer * /
    uint max_g = 0;
    / ** max value of B channel for this mixer * /
    uint max_b = 0;
    */
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
        
        // find_bounds();
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
    /*
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
    */
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
                if(total >= 16) break;
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

uint mixer_c = 0;
Mixer* mixers_a;
void gen_mixes(){
    CWR cwr = CWR();
    vector<Mixer> mixers_v = vector<Mixer>();
    for(auto it = cwr.dyes.begin(); it != cwr.dyes.end(); it++){
        Mixer mixer = Mixer(*it);
        mixers_v.push_back(mixer);
    }
    mixer_c = mixers_v.size();
    mixers_a = new Mixer[mixer_c];
    for(uint i = 0; i < mixer_c; i++){
        mixers_a[i] = mixers_v[i];
    }
}

auto recipes = new Color_Recipes();
auto last_cs = new Color_Recipes();
auto step_cs = new Color_Steps();
auto c_exists = new Color_Exists();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();
uint ic = 0;
uint found = 0;
uint in_progress_i = 0;

void save_je(){
    uint save_size = (1<<24) * 4 + (1<<24) * 4 + (1<<24) + (1<<24) / 8;
    uchar* save_chars = new uchar[save_size];
    // recipes, then last_cs, then c_exists;
    uint i = 0;
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint dyem = recipes->d[j];
        save_chars[i    ] = (dyem & 0xff000000u) >> 24u;
        save_chars[i + 1] = (dyem & 0x00ff0000u) >> 16u;
        save_chars[i + 2] = (dyem & 0x0000ff00u) >>  8u;
        save_chars[i + 3] = (dyem & 0x000000ffu);
    }
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint last = last_cs->d[j];
        save_chars[i    ] = (last & 0xff000000u) >> 24u;
        save_chars[i + 1] = (last & 0x00ff0000u) >> 16u;
        save_chars[i + 2] = (last & 0x0000ff00u) >>  8u;
        save_chars[i + 3] = (last & 0x000000ffu);
    }
    for(uint j = 0; j < 1<<24; j++, i++){
        save_chars[i    ] = step_cs->d[j];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        save_chars[i    ] = c_exists->d[j];
    }
    
    std::cout << "Saving " << save_size << " bytes ..." << std::endl;
    
    auto fout = std::ofstream("je_res.bin", std::ios_base::binary);
    fout << string("Format: recipes, then last_cs, then c_exists\n");
    for(i = 0; i < save_size; i++){
        fout << save_chars[i];
    }
    
    std::cout << "Saved." << std::endl;
    
    delete save_chars;
}
void load_je(){
    std::cout << "Loading..." << std::endl;
    vector<char> saved = whole_file("je_res.bin");
    
    std::cout << "Loaded." << std::endl;
    uint i = 0;
    // skip past "Format: recipes, then last_cs, then c_exists\n";
    for(; saved[i] != '\n'; i++);
    // skip '\n' itself;
    i++;
    // recipes, then last_cs, then c_exists;
    for(uint j = 0; j < 1<<24; j++, i += 4){
        recipes->d[j] = (
            (uchar(saved[i    ]) << 24) |
            (uchar(saved[i + 1]) << 16) |
            (uchar(saved[i + 2]) <<  8) |
            (uchar(saved[i + 3]))
        );
    }
    for(uint j = 0; j < 1<<24; j++, i += 4){
        last_cs->d[j] = (
            (uchar(saved[i    ]) << 24) |
            (uchar(saved[i + 1]) << 16) |
            (uchar(saved[i + 2]) <<  8) |
            (uchar(saved[i + 3]))
        );
    }
    for(uint j = 0; j < 1<<24; j++, i++){
        step_cs->d[j] = saved[i];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        c_exists->d[j] = saved[i];
    }
}
void save_je_in_progress(){
    uint save_size = (1<<24) * 4 + (1<<24) * 4 + (1<<24) + (1<<24) / 8 + (1<<24) / 8 + (1<<24) / 8;
    uchar* save_chars = new uchar[save_size];
    // recipes, then last_cs, then c_exists;
    uint i = 0;
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint dyem = recipes->d[j];
        save_chars[i    ] = (dyem & 0xff000000u) >> 24u;
        save_chars[i + 1] = (dyem & 0x00ff0000u) >> 16u;
        save_chars[i + 2] = (dyem & 0x0000ff00u) >>  8u;
        save_chars[i + 3] = (dyem & 0x000000ffu);
    }
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint last = last_cs->d[j];
        save_chars[i    ] = (last & 0xff000000u) >> 24u;
        save_chars[i + 1] = (last & 0x00ff0000u) >> 16u;
        save_chars[i + 2] = (last & 0x0000ff00u) >>  8u;
        save_chars[i + 3] = (last & 0x000000ffu);
    }
    for(uint j = 0; j < 1<<24; j++, i++){
        save_chars[i    ] = step_cs->d[j];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        save_chars[i    ] = c_exists->d[j];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        save_chars[i    ] = prev_added->d[j];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        save_chars[i    ] = added->d[j];
    }
    
    std::cout << "Saving " << save_size << " bytes (loop in progress) ..." << std::endl;
    
    auto fout = std::ofstream("je_res_in_progress.bin", std::ios_base::binary);
    fout << string("Format: recipes, then last_cs, then c_exists\n");
    for(i = 0; i < save_size; i++){
        fout << save_chars[i];
    }
    fout << uchar((in_progress_i & 0xff0000) >> 16);
    fout << uchar((in_progress_i & 0x00ff00) >>  8);
    fout << uchar((in_progress_i & 0x0000ff));
    fout << uchar(ic);
    
    std::cout << "Saved." << std::endl;
    
    delete save_chars;
}
void load_je_in_progress(){
    std::cout << "Loading (loop in progress)..." << std::endl;
    vector<char> saved = whole_file("je_res_in_progress.bin");
    
    std::cout << "Loaded." << std::endl;
    uint i = 0;
    // skip past "Format: recipes, then last_cs, then c_exists\n";
    for(; saved[i] != '\n'; i++);
    // skip '\n' itself;
    i++;
    // recipes, then last_cs, then c_exists;
    for(uint j = 0; j < 1<<24; j++, i += 4){
        recipes->d[j] = (
            (uchar(saved[i    ]) << 24) |
            (uchar(saved[i + 1]) << 16) |
            (uchar(saved[i + 2]) <<  8) |
            (uchar(saved[i + 3]))
        );
    }
    for(uint j = 0; j < 1<<24; j++, i += 4){
        last_cs->d[j] = (
            (uchar(saved[i    ]) << 24) |
            (uchar(saved[i + 1]) << 16) |
            (uchar(saved[i + 2]) <<  8) |
            (uchar(saved[i + 3]))
        );
    }
    for(uint j = 0; j < 1<<24; j++, i++){
        step_cs->d[j] = saved[i];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        c_exists->d[j] = saved[i];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        prev_added->d[j] = saved[i];
    }
    for(uint j = 0; j < (1<<24) / 8; j++, i++){
        added->d[j] = saved[i];
    }
    in_progress_i = (
        (uchar(saved[i    ]) << 16) |
        (uchar(saved[i + 1]) <<  8) |
        (uchar(saved[i + 2]))
    );
    ic = uchar(saved[i + 3]);
    
    for(uint j = 0; j < 1<<24; j++){
        if(c_exists->get(j)) found++;
    }
}

void add(uint color, uint last, uint mix_d){
    // if(ic > 0) std::cout << "add" << std::endl;
    if(c_exists->get(color)) return;
    recipes->set(color, mix_d);
    last_cs->set(color, last);
    step_cs->set(color, ic + 2u);
    c_exists->set(color, 1);
    added->set(color, 1);
    found++;
}

bool added_any = true;
void cycle_init(){
    for(uint i = 0; i < 1<<24; i++){
        prev_added->set(i, added->get(i));
    }
    for(uint i = 0; i < 1<<24; i++){
        added->set(i, 0);
    }
    in_progress_i = 0;
}
struct Add_Attempt{
    uint color;
    uint last;
    uint mix_d;
};

void cycle(){
    std::vector<uint> active_colors;
    active_colors.reserve(1500000);
    for(uint i = 0; i < (1 << 24); i++){
        if(prev_added->get(i)) {
            active_colors.push_back(i);
        }
    }
    
    uint total_colors = active_colors.size();
    std::cout << "Cycle " << ic << ": Processing " << total_colors << " active colors across " << mixer_c << " mixers..." << std::endl;
    uint color_chunk_size = 16;
    uint log_freq = 30;
    uint log_i = 0;
    
    #pragma omp parallel
    {
        std::vector<Add_Attempt> local_attempts;
        local_attempts.reserve(65536);
        
        for(uint outer_i = in_progress_i; outer_i < total_colors; outer_i += color_chunk_size){
            uint chunk_end = std::min(outer_i + color_chunk_size, total_colors);
            local_attempts.clear();
            
            #pragma omp for schedule(dynamic, 8)
            for(uint c_idx = outer_i; c_idx < chunk_end; c_idx++){
                uint color = active_colors[c_idx];
                
                // this is an idea I had for changing the file format since it would take up less space anyways;
                uint mixer_id = 0;
                
                uint last_i = 0;
                uint dye_c = 0;
                uint tr_accum = 0;
                uint tg_accum = 0;
                uint tb_accum = 0;
                uint tm_accum = 0;
                
                #define MIX_EVAL \
                { \
                uint r = (color & 0xff0000) >> 16; \
                uint g = (color & 0x00ff00) >> 8; \
                uint b = (color & 0x0000ff); \
                uint tr = tr_accum + r; \
                uint tg = tg_accum + g; \
                uint tb = tb_accum + b; \
                uint tm = tm_accum + max(r, g, b); \
                \
                uint div = (dye_c + 1); \
                uint ar = tr / div; \
                uint ag = tg / div; \
                uint ab = tb / div; \
                float avg_max = float(tm) / float(div); \
                float max_avg = max(ar, ag, ab); \
                \
                uint result = ( \
                    (((uint)((float(ar) * avg_max) / max_avg)) << 16) | \
                    (((uint)((float(ag) * avg_max) / max_avg)) <<  8) | \
                    (((uint)((float(ab) * avg_max) / max_avg))      )   \
                ); \
                \
                if (!c_exists->get(result)) { \
                    local_attempts.push_back({result, color, mixer_id}); \
                } \
                mixer_id++; \
                }
                
                #define DYE_TIER(var, start, INNER_TIER) \
                for(uint var = start; var < 16; var ++){ \
                uint c = base_colors[ var ]; \
                uint r = (c & 0xff0000) >> 16; \
                uint g = (c & 0x00ff00) >> 8; \
                uint b = (c & 0x0000ff); \
                uint m = max(r, g, b); \
                tr_accum += r; \
                tg_accum += g; \
                tb_accum += b; \
                tm_accum += m; \
                dye_c++; \
                { \
                    INNER_TIER ; \
                } \
                dye_c--; \
                tr_accum -= r; \
                tg_accum -= g; \
                tb_accum -= b; \
                tm_accum -= m; \
                }
                
                #define DYE_TIER_1 DYE_TIER(i1, i2, MIX_EVAL)
                #define DYE_TIER_2 DYE_TIER(i2, i3, DYE_TIER_1)
                #define DYE_TIER_3 DYE_TIER(i3, i4, DYE_TIER_2)
                #define DYE_TIER_4 DYE_TIER(i4, i5, DYE_TIER_3)
                #define DYE_TIER_5 DYE_TIER(i5, i6, DYE_TIER_4)
                #define DYE_TIER_6 DYE_TIER(i6, i7, DYE_TIER_5)
                #define DYE_TIER_7 DYE_TIER(i7, i8, DYE_TIER_6)
                #define DYE_TIER_8 DYE_TIER(i8, 0, DYE_TIER_7)
                
                uint i2 = 0;
                DYE_TIER_1;
                uint i3 = 0;
                DYE_TIER_2;
                uint i4 = 0;
                DYE_TIER_3;
                uint i5 = 0;
                DYE_TIER_4;
                uint i6 = 0;
                DYE_TIER_5;
                uint i7 = 0;
                DYE_TIER_6;
                uint i8 = 0;
                DYE_TIER_7;
                DYE_TIER_8;
            }
            
            #pragma omp critical
            {
                for(const auto& item : local_attempts){
                    add(item.color, item.last, item.mix_d);
                }
            }
            #pragma omp barrier
            #pragma omp single
            {
                log_i++;
                if(log_i == log_freq){
                    log_i = 0;
                    std::cout
                    << chunk_end << " / " << total_colors << " colors expanded ("
                    << (ulng(chunk_end) * ulng(mixer_c)) << " evaluations) | Found: " << found << std::endl;
                }
                if(interrupted){
                    in_progress_i = chunk_end;
                    std::cout << "Ctrl+C detected at color index " << in_progress_i << " on cycle " << ic << std::endl;
                    save_je_in_progress();
                    abort();
                }
            }
        }
    }

    uint added_c = 0;
    for(uint i = 0; i < (1 << 24); i++){
        if(added->get(i)) added_c++;
    }
    std::cout << "Cycle " << ic << " Complete. Added: " << added_c << " new colors." << std::endl;
    added_any = (added_c > 0);
    ic++;
}
void cycle_old(){
    uint mixer_li = 0;
    uint mixer_lf = 100;
    
    // use mixer_c for full search;
    uint mix_lim =
    mixer_c;
    // ic == 0 ? 100:
    // ic == 1 ? 100: 100;
    #pragma omp parallel for schedule(dynamic, 1000)
    for(uint mixer_i = in_progress_i; mixer_i < mix_lim; mixer_i++){
        Mixer& m = mixers_a[mixer_i];
        mixer_li++;
        if(mixer_li == mixer_lf){
            mixer_li = 0;
            std::cout << mixer_i << "/" << mixer_c << "; found colors: " << found << std::endl;
            in_progress_i = mixer_i;
            if(interrupted){
                std::cout << "Ctrl+C detected at mixer index " << in_progress_i << ", cycle " << ic << std::endl;
                save_je_in_progress();
                abort();
            }
        }
        for(uint i = 0; i < 1<<24; i++){
            if(!prev_added->get(i)) continue;
            auto res = mix(i, m);
            add(res, i, m.mix_d);
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
            std::cout << "color does not exist" << std::endl;
            return;
        }
        // std::cout << "enter try_last" << std::endl;
        // std::cout << "mixer id " << recipes->get(color) << std::endl;
        // std::cout << "color = " << color << std::endl;
        uint dyem = mixers_a[recipes->get(color)].mix_d;
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
    
    // std::cout << "Does this run? " << i << std::endl;
    Recipe find_boi = Recipe(i);
    find_boi.search();
    
    std::cout << "-> [\n";
    for(auto it = find_boi.done_dyems.begin(); it != find_boi.done_dyems.end(); it++){
        std::cout << "  " << Mixer(*it).recipe_step() << ",\n";
    }
    std::cout << "]" << std::endl;
    verify(i, find_boi.done_dyems);
}


int main(int argc, char const *argv[]){
    std::signal(SIGINT, signal_handler);
    
    bool run_from_save_in_progress = (argc == 2);
    bool run_from_save = (argc == 3);
    
    std::cout << "Main!" << std::endl;
    gen_mixes();
    std::cout << "mixer_c: " << mixer_c << std::endl;
    
    if(run_from_save_in_progress){
        load_je_in_progress();
        std::cout << "Cycle " << ic << std::endl;
    }
    else if(!run_from_save){
        std::cout << "Base colors!" << std::endl;
        ic = -1;
        for(uint mixer_i = 0; mixer_i < mixer_c; mixer_i++){
            Mixer& m = mixers_a[mixer_i];
            uint i = m.base();
            add(i, i, mixer_i);
        }
        ic = 0;
        std::cout << "Cycle " << ic << std::endl;
        cycle_init();
    }
    if(!run_from_save){
        cycle();
        std::cout << "Found colors: " << found << std::endl;
        while(added_any){
            std::cout << "Cycle " << ic << std::endl;
            cycle_init();
            cycle();
            std::cout << "Found colors: " << found << std::endl;
        }
        
        save_je();
    }
    else{
        load_je();
    }
    
    vector<uint> at_step = {};
    vector<uint> test_these = {};
    uint at_last_step = 1;
    uint at_last_step_prev = 1;
    while(at_last_step > 0 && at_last_step_prev > 0){
        at_last_step_prev = at_last_step;
        at_last_step = 0;
        uint step_i = at_step.size();
        for(uint i = 0; i < (1 << 24); i++){
            if(step_cs->get(i) == step_i){
                at_last_step++;
                if(step_i > 9){
                    test_these.push_back(i);
                }
            }
        }
        std::cout << "Found " << at_last_step << " recipes with " << step_i << " steps." << std::endl;
        at_step.push_back(at_last_step);
    }
    
    for(auto it = test_these.begin(); it != test_these.end(); it++){
        see_recipe("one of the last found colors: ", *it);
    }
    
    uint* my_decode = new uint[256]{0};
    my_decode['0'] = 0x0; my_decode['1'] = 0x1; my_decode['2'] = 0x2; my_decode['3'] = 0x3;
    my_decode['4'] = 0x4; my_decode['5'] = 0x5; my_decode['6'] = 0x6; my_decode['7'] = 0x7;
    my_decode['8'] = 0x8; my_decode['9'] = 0x9; my_decode['a'] = 0xa; my_decode['b'] = 0xb;
    my_decode['c'] = 0xc; my_decode['d'] = 0xd; my_decode['e'] = 0xe; my_decode['f'] = 0xf;
    
    while(false){
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
        bool e = c_exists->get(your_c);
        std::cout << "You color exists? " << (e ? "Yes." : "No.") << std::endl;
        if(!e) continue;
        
        see_recipe(string("Your color: "), your_c);
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

Main!
mixer_c: 735470
Loading...
Loaded.
Found 11070726 recipes with 0 steps.
Found 605824 recipes with 1 steps.
Found 5008434 recipes with 2 steps.
Found 74930 recipes with 3 steps.
Found 12834 recipes with 4 steps.
Found 3263 recipes with 5 steps.
Found 854 recipes with 6 steps.
Found 244 recipes with 7 steps.
Found 69 recipes with 8 steps.
Found 25 recipes with 9 steps.
Found 8 recipes with 10 steps.
Found 2 recipes with 11 steps.
Found 2 recipes with 12 steps.
Found 1 recipes with 13 steps.
Found 0 recipes with 14 steps.
one of the last found colors: 9b7b1b
-> [
  [orange  ,green   ],
  [black   ],
  [green   ,green   ],
  [orange  ],
  [lime    ],
  [orange  ,green   ],
  [lime    ],
  [orange  ,orange  ,green   ,green   ,green   ],
  [lime    ,green   ,green   ,green   ],
  [black   ,orange  ,orange  ,orange  ,orange  ,green   ,green   ,green   ],
]
Recipe is correct.
one of the last found colors: 9bcd1f
-> [
  [lime    ,lime    ,lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: a62d35
-> [
  [red     ],
  [black   ,red     ,red     ,red     ,red     ,red     ,purple  ],
  [red     ,purple  ],
  [black   ],
  [purple  ,purple  ],
  [red     ],
  [black   ,black   ,black   ,purple  ,purple  ,purple  ,purple  ],
  [red     ],
  [black   ,black   ,red     ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [black   ,black   ,black   ,red     ,purple  ,purple  ,magenta ],
]
Recipe is correct.
one of the last found colors: aa3692
-> [
  [purple  ],
  [black   ,red     ,red     ,red     ,red     ,red     ,purple  ],
  [red     ,purple  ],
  [black   ],
  [purple  ,purple  ],
  [red     ],
  [black   ,black   ,black   ,purple  ,purple  ,purple  ,purple  ],
  [red     ],
  [black   ,black   ,red     ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [black   ,black   ,black   ,red     ,purple  ,purple  ,magenta ],
]
Recipe is correct.
one of the last found colors: b9d321
-> [
  [lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: c3444f
-> [
  [red     ,red     ,magenta ],
  [red     ,orange  ,orange  ,orange  ,orange  ,orange  ],
  [purple  ,purple  ],
  [red     ],
  [purple  ,purple  ,purple  ],
  [purple  ],
  [red     ],
  [red     ,red     ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [purple  ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [black   ,black   ,black   ,black   ,black   ,red     ,magenta ],
]
Recipe is correct.
one of the last found colors: d65b78
-> [
  [magenta ],
  [red     ,orange  ,orange  ,orange  ,orange  ,orange  ],
  [purple  ,purple  ],
  [red     ],
  [purple  ,purple  ,purple  ],
  [purple  ],
  [red     ],
  [red     ,red     ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [purple  ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [black   ,black   ,black   ,black   ,black   ,red     ,magenta ],
]
Recipe is correct.
one of the last found colors: ef7428
-> [
  [orange  ],
  [red     ,orange  ,orange  ,orange  ,orange  ,orange  ],
  [purple  ,purple  ],
  [red     ],
  [purple  ,purple  ,purple  ],
  [purple  ],
  [red     ],
  [red     ,red     ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [purple  ,purple  ,purple  ,purple  ,purple  ,purple  ,purple  ],
  [black   ,black   ,black   ,black   ,black   ,red     ,magenta ],
]
Recipe is correct.
one of the last found colors: abc31f
-> [
  [orange  ,lime    ,lime    ,green   ],
  [lime    ,lime    ,lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: ceb41f
-> [
  [orange  ,orange  ,lime    ,green   ],
  [lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: a2a51c
-> [
  [green   ],
  [orange  ,orange  ,lime    ,green   ],
  [lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: bdc320
-> [
  [orange  ,lime    ,lime    ,green   ],
  [orange  ,orange  ,lime    ,green   ],
  [lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.
one of the last found colors: bc951b
-> [
  [orange  ,orange  ,green   ,green   ],
  [orange  ,lime    ,lime    ,green   ],
  [orange  ,orange  ,lime    ,green   ],
  [lime    ],
  [orange  ,lime    ],
  [orange  ,lime    ],
  [orange  ,orange  ,lime    ,lime    ,lime    ,lime    ],
  [lime    ,lime    ,lime    ],
  [orange  ,orange  ],
  [orange  ,yellow  ,yellow  ],
  [orange  ,lime    ,lime    ,lime    ],
  [orange  ,orange  ,orange  ,yellow  ,yellow  ,lime    ,lime    ,lime    ],
  [orange  ,lime    ,lime    ,lime    ,lime    ],
]
Recipe is correct.


*/


