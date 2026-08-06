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

void add(uint color, uint last, ulng mix_d){
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
void cycle_inline(){
    uint prev_c = 0;
    for(uint i = 0; i < 1<<24; i++){
        if(prev_added->get(i)){
            prev_c++;
        }
    }
    uint prev_i = 0;
    uint prev_li = 0;
    uint prev_lf = 100;
    
    #pragma omp parallel for schedule(dynamic, 1000)
    for(uint i = in_progress_i; i < 1<<24; i++){
        if(!prev_added->get(i)) continue;
        prev_i++;
        prev_li++;
        if(prev_li == prev_lf){
            prev_li = 0;
            std::cout << prev_i << "/" << prev_c << "; found colors: " << found << std::endl;
            in_progress_i = i;
            if(interrupted){
                std::cout << "Ctrl+C detected at index " << in_progress_i << ", cycle " << ic << std::endl;
                save_je_in_progress();
                abort();
            }
        }
        
        uchar indices[8] = {0};
        // uint be_able_to_cout_limit = 1000;
        // uint be_able_to_cout_i = 0;
        for(uchar dye_c = 1; dye_c <= 8; dye_c++){
            for(uchar i = 0; i < dye_c - 1; i++){
                indices[i] = 0;
            }
            indices[dye_c - 1] = -1;
            uchar carry_place = dye_c - 1;
            while(true){
                // carry if needed
                while(carry_place > 0 && indices[carry_place] == 16){
                    indices[carry_place] = 0;
                    carry_place--;
                }
                
                // now incremenet; we have to carry next loop because there just isn't any other way to do this; i've written this code like 8 times, trust me;
                indices[carry_place]++;
                
                // uncarry, making sure that all later indices are in ascending order; this simultaneously removes duplicate combinations, while allowing for repetitions;
                while(carry_place < dye_c - 1){
                    indices[carry_place + 1] = indices[carry_place];
                    carry_place++;
                }
                
                // highest digit maxes out -> end of loop;
                if(indices[0] == 16){
                    break;
                }
                
                if(indices[carry_place] == 16) continue;
                
                // now add the combination to the list;
                uint formatted = indices[0];
                bool all_zero = indices[0] == 0;
                for(uchar i = 1; i < dye_c; i++){
                    // this code was written by an autistic man at 8 in the morning who hasn't slept all morning;
                    all_zero = all_zero && indices[i] == 0;
                    // just store the diff; edge case for zeroes explained in je.cpp;
                    formatted = (formatted << 4) | (indices[i] - indices[i - 1]);
                }
                if(all_zero){
                    // std::cout << "This should be a list of " << uint(dye_c) << " zeroes. ";
                    // std::cout << "At " << dyes.size() << ". ";
                    formatted = (0xf0 | (dye_c + 1)) << 24;
                    // std::cout << "Formatted =  " << formatted << std::endl;
                }
                else if(dye_c < 8){
                    formatted = (formatted << 4) | (16 - indices[carry_place]);
                }
                if(all_zero){
                    formatted = (0xf0 | (dye_c + 1)) << 24;
                }
                else if(dye_c < 8){
                    formatted = (formatted << 4) | (16 - indices[carry_place]);
                    formatted <<= 4 * (8 - 1 - dye_c);
                }
                
                // inline mixing logic, because i don't have a need for it anywhere else;
                uint tr = 0;
                uint tg = 0;
                uint tb = 0;
                uint tm = 0;
                for(uint i = 0; i < dye_c; i++){
                    uint color = base_colors[indices[i]];
                    uint r = (color & 0xff0000) >> 16;
                    uint g = (color & 0x00ff00) >> 8;
                    uint b = color & 0x0000ff;
                    tr += r;
                    tg += g;
                    tb += b;
                    tm += max(r, g, b);
                }
                
                uint r = (i & 0xff0000) >> 16;
                uint g = (i & 0x00ff00) >> 8;
                uint b = (i & 0x0000ff);
                tr += r;
                tg += g;
                tb += b;
                uint ar = tr / (dye_c + 1);
                uint ag = tg / (dye_c + 1);
                uint ab = tb / (dye_c + 1);
                float avg_max = float(tm + max(r, g, b)) / float(dye_c + 1);
                float max_avg = max(ar, ag, ab);
                // note the order of operations matters here; you must multiply then divide;
                uint result = (
                    (((uint) ((float(ar) * avg_max) / max_avg)) << 16) |
                    (((uint) ((float(ag) * avg_max) / max_avg)) <<  8) |
                    (((uint) ((float(ab) * avg_max) / max_avg))      )
                );
                
                add(result, i, formatted);
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
void cycle(){
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


/*
Expected results for in progress test:
Main!
mixer_c: 735470
Base colors!
Cycle 0
100000/531606; found colors: 2222754
200000/531606; found colors: 2720925
300000/531606; found colors: 3028662
400000/531606; found colors: 3273631
500000/531606; found colors: 3520353
Added: 3139230
Found colors: 3670836
Cycle 1
100000/3139230; found colors: 3871174
200000/3139230; found colors: 3967701
300000/3139230; found colors: 4041947
400000/3139230; found colors: 4107656
500000/3139230; found colors: 4168545
600000/3139230; found colors: 4226585
700000/3139230; found colors: 4281016
800000/3139230; found colors: 4329933
900000/3139230; found colors: 4376196
1000000/3139230; found colors: 4418462
1100000/3139230; found colors: 4460052
1200000/3139230; found colors: 4493380
1300000/3139230; found colors: 4528867
1400000/3139230; found colors: 4564413
1500000/3139230; found colors: 4594609
1600000/3139230; found colors: 4627243
1700000/3139230; found colors: 4657421
1800000/3139230; found colors: 4687443
1900000/3139230; found colors: 4717892
2000000/3139230; found colors: 4746275
2100000/3139230; found colors: 4776797
2200000/3139230; found colors: 4804070
2300000/3139230; found colors: 4827672
2400000/3139230; found colors: 4853384
2500000/3139230; found colors: 4878549
2600000/3139230; found colors: 4901171
2700000/3139230; found colors: 4926020
2800000/3139230; found colors: 4950630
2900000/3139230; found colors: 4979441
3000000/3139230; found colors: 5012999
3100000/3139230; found colors: 5062443
Added: 1434188
Found colors: 5105024
Cycle 2
100000/1434188; found colors: 5148754
200000/1434188; found colors: 5173298
300000/1434188; found colors: 5194695
400000/1434188; found colors: 5216941
500000/1434188; found colors: 5239036
600000/1434188; found colors: 5260741
700000/1434188; found colors: 5283383
800000/1434188; found colors: 5304357
900000/1434188; found colors: 5325200
1000000/1434188; found colors: 5346306
1100000/1434188; found colors: 5367086
1200000/1434188; found colors: 5389403
1300000/1434188; found colors: 5408976
1400000/1434188; found colors: 5427686
Added: 335253
Found colors: 5440277
Cycle 3
100000/335253; found colors: 5456508
200000/335253; found colors: 5474549
300000/335253; found colors: 5494287
Added: 59771
Found colors: 5500048
Cycle 4
Added: 14031
Found colors: 5514079
Cycle 5
Added: 5521
Found colors: 5519600
Cycle 6
Added: 2389
Found colors: 5521989
Cycle 7
Added: 1073
Found colors: 5523062
Cycle 8
Added: 522
Found colors: 5523584
Cycle 9
Added: 251
Found colors: 5523835
Cycle 10
Added: 113
Found colors: 5523948
Cycle 11
Added: 56
Found colors: 5524004
Cycle 12
Added: 21
Found colors: 5524025
Cycle 13
Added: 14
Found colors: 5524039
Cycle 14
Added: 8
Found colors: 5524047
Cycle 15
Added: 3
Found colors: 5524050
Cycle 16
Added: 1
Found colors: 5524051
Cycle 17
Added: 0
Found colors: 5524051
Saving 153092096 bytes ...
Saved.
Found 11253165 recipes with 0 steps.
Found 531606 recipes with 1 steps.
Found 3139230 recipes with 2 steps.
Found 1434188 recipes with 3 steps.
Found 335253 recipes with 4 steps.
Found 59771 recipes with 5 steps.
1 step: 168c8c
-> [
  [black   ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ],
]
Recipe is correct.
2 step: 168f8f
-> [
  [cyan    ],
  [black   ,cyan    ,cyan    ,cyan    ,cyan    ],
]
Recipe is correct.
3 step: 169090
-> [
  [cyan    ],
  [cyan    ],
  [black   ,black   ,black   ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ],
]
Recipe is correct.
4 step: 168a8a
-> [
  [cyan    ],
  [cyan    ],
  [black   ],
  [black   ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ,cyan    ],
]
Recipe is correct.
5 step: 168a8b
-> [
  [cyan    ],
  [cyan    ],
  [black   ],
  [cyan    ],
  [black   ,cyan    ,cyan    ,cyan    ,cyan    ],
]
Recipe is correct.

*/

int main(int argc, char const *argv[]){
    std::signal(SIGINT, signal_handler);
    
    bool run_from_save_in_progress = (argc == 2);
    
    std::cout << "Main!" << std::endl;
    gen_mixes();
    // 735470 -> 564927;
    std::cout << "mixer_c: " << mixer_c << std::endl;
    
    if(run_from_save_in_progress){
        load_je_in_progress();
        std::cout << "Cycle " << ic << std::endl;
    }
    else{
        std::cout << "Base colors!" << std::endl;
        ic = -1;
        for(uint mixer_i = 0; mixer_i < mixer_c; mixer_i++){
            Mixer& m = mixers_a[mixer_i];
            uint i = m.base();
            add(i, i, m.mix_d);
        }
        ic = 0;
        std::cout << "Cycle " << ic << std::endl;
        cycle_init();
    }
    cycle();
    std::cout << "Found colors: " << found << std::endl;
    while(added_any){
        std::cout << "Cycle " << ic << std::endl;
        cycle_init();
        cycle();
        std::cout << "Found colors: " << found << std::endl;
    }
    
    save_je();
    
    // this is really pissing me off, because i shouldn't have to check to see if the item's exist;
    // items that don't exist should be marked as 0 steps; but you know what? since something is clearly very wrong,
    // lets count the number of items that have each value,
    // AND double check to avoid checking for recipes on ones that don't exist;
    // because it seems that something is wrong with my code;
    // i'm pretty it's not a bit shifting issue, because there are no bits to be shifted;
    // and it's not a forgotten code isuee because there was so little code it shouldn't be possible to forget any;
    bool did_step_0 = false;
    bool did_step_1 = false;
    bool did_step_2 = false;
    bool did_step_3 = false;
    bool did_step_4 = false;
    bool did_step_5 = false;
    uint found_0 = 0;
    uint found_1 = 0;
    uint found_2 = 0;
    uint found_3 = 0;
    uint found_4 = 0;
    uint found_5 = 0;
    uint step_0 = 0xc0ffee;
    uint step_1 = 0xc0ffee;
    uint step_2 = 0xc0ffee;
    uint step_3 = 0xc0ffee;
    uint step_4 = 0xc0ffee;
    uint step_5 = 0xc0ffee;
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 0){
            found_0++;
            if(!did_step_0 && c_exists->get(i)){
                did_step_0 = true;
                step_0 = i;
            }
        }
    }
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 1){
            found_1++;
            if(!did_step_1 && c_exists->get(i)){
                did_step_1 = true;
                step_1 = i;
            }
        }
    }
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 2){
            found_2++;
            if(!did_step_2 && c_exists->get(i)){
                did_step_2 = true;
                step_2 = i;
            }
        }
    }
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 3){
            found_3++;
            if(!did_step_3 && c_exists->get(i)){
                did_step_3 = true;
                step_3 = i;
            }
        }
    }
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 4){
            found_4++;
            if(!did_step_4 && c_exists->get(i)){
                did_step_4 = true;
                step_4 = i;
            }
        }
    }
    for(uint i = 0; i < (1 << 24); i++){
        if(step_cs->get(i) == 5){
            found_5++;
            if(!did_step_5 && c_exists->get(i)){
                did_step_5 = true;
                step_5 = i;
            }
        }
    }
    
    std::cout << "Found " << found_0 << " recipes with 0 steps." << std::endl;
    std::cout << "Found " << found_1 << " recipes with 1 steps." << std::endl;
    std::cout << "Found " << found_2 << " recipes with 2 steps." << std::endl;
    std::cout << "Found " << found_3 << " recipes with 3 steps." << std::endl;
    std::cout << "Found " << found_4 << " recipes with 4 steps." << std::endl;
    std::cout << "Found " << found_5 << " recipes with 5 steps." << std::endl;
    if(did_step_0) see_recipe("0 step: ", step_0);
    if(did_step_1) see_recipe("1 step: ", step_1);
    if(did_step_2) see_recipe("2 step: ", step_2);
    if(did_step_3) see_recipe("3 step: ", step_3);
    if(did_step_4) see_recipe("4 step: ", step_4);
    if(did_step_5) see_recipe("5 step: ", step_5);
    
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


