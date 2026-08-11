#include <cmath>
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "nanoflann.hpp"

using std::vector;
using std::string;

typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

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
    delete[] txt_in;
    
    return data;
}

class Lab{
public:
    float l = 0.0f;
    float a = 0.0f;
    float b = 0.0f;
    Lab(){}
    Lab(float a_l, float a_a, float a_b){
        l = a_l;
        a = a_a;
        b = a_b;
    }
};

float GAMMA_LUT[256] = {};
void init_gamma_lut(){
    for(int i = 0; i < 256; ++i){
        float v = float(i) / 255.0f;
        GAMMA_LUT[i] = (v > 0.04045f) ? std::pow((v + 0.055f) / 1.055f, 2.4f) : (v / 12.92f);
    }
}
Lab rgb_to_lab(uint rgb){
    float r = GAMMA_LUT[(rgb & 0xff0000) >> 16];
    float g = GAMMA_LUT[(rgb & 0x00ff00) >>  8];
    float b = GAMMA_LUT[(rgb & 0x0000ff)      ];
    float x = 0;
    float y = 0;
    float z = 0;
    
    x = (r * 0.4124f + g * 0.3576f + b * 0.1805f) / 0.95047f;
    y = (r * 0.2126f + g * 0.7152f + b * 0.0722f) / 1.0f;
    z = (r * 0.0193f + g * 0.1192f + b * 0.9505f) / 1.08883f;
    
    x = x > 0.008856f ? std::cbrt(x) : 7.787f * x + 16.0f / 116.0f;
    y = y > 0.008856f ? std::cbrt(y) : 7.787f * y + 16.0f / 116.0f;
    z = z > 0.008856f ? std::cbrt(z) : 7.787f * z + 16.0f / 116.0f;
    
    return Lab(116.0f * y - 16.0f, 500.0f * (x - y), 200.0f * (y - z));
}

float deltaE(Lab& labA, Lab& labB){
    float deltaL = labA.l - labB.l;
    float deltaA = labA.a - labB.a;
    float deltaB = labA.b - labB.b;
    float c1 = std::sqrt(labA.a * labA.a + labA.b * labA.b);
    float c2 = std::sqrt(labB.a * labB.a + labB.b * labB.b);
    float deltaC = c1 - c2;
    float deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0.0f ? 0.0f : std::sqrt(deltaH);
    float sc = 1.0f + 0.045f * c1;
    float sh = 1.0f + 0.015f * c1;
    float deltaLKlsl = deltaL; // divide by 1.0f?
    float deltaCkcsc = deltaC / sc;
    float deltaHkhsh = deltaH / sh;
    float i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0.0f ? 0.0f : std::sqrt(i);
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
    ~Color_Recipes(){
        delete[] d;
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
        delete[] d;
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
        delete[] d;
    }
};

Lab* ALL_LABS = new Lab[1 << 24];
void init_labs(){
    init_gamma_lut();
    for(uint i = 0; i < (1 << 24); i++){
        ALL_LABS[i] = rgb_to_lab(i);
    }
}


auto recipes = new Color_Recipes();
auto last_cs = new Color_Recipes();
auto closest = new Color_Recipes();
auto step_cs = new Color_Steps();
auto c_exists = new Color_Exists();
auto prev_added = new Color_Exists();
auto added = new Color_Exists();

void save_je(){
    uint save_size = (1<<24) * 4 + (1<<24) * 4 + (1<<24) * 4 + (1<<24) + (1<<24) / 8;
    uchar* save_chars = new uchar[save_size];
    // recipes, then last_cs, then closest, then step_cs, then c_exists;
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
    for(uint j = 0; j < 1<<24; j++, i += 4){
        uint last = closest->d[j];
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
    
    auto fout = std::ofstream("je_lab.bin", std::ios_base::binary);
    // fout << string("Format idea is bad.\n");
    for(i = 0; i < save_size; i++){
        fout << save_chars[i];
    }
    
    std::cout << "Saved." << std::endl;
    
    delete[] save_chars;
}
void load_je(){
    std::cout << "Loading..." << std::endl;
    vector<char> saved = whole_file("./je_res.bin");
    
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

struct LabPoint{
    float l, a, b;
};
struct PointCloud{
    std::vector<LabPoint> pts;
    // required nanoflann interface methods:
    inline size_t kdtree_get_point_count() const { return pts.size(); }
    inline float kdtree_get_pt(const size_t idx, const size_t dim) const {
        if (dim == 0) return pts[idx].l;
        if (dim == 1) return pts[idx].a;
        return pts[idx].b;
    }
    template <class BBOX>
    bool kdtree_get_bbox(BBOX&) const { return false; }
};

// typedef for readability
using KDTree = nanoflann::KDTreeSingleIndexAdaptor<
    nanoflann::L2_Simple_Adaptor<float, PointCloud>,
    PointCloud,
    3 /* dimensions: L, a, b */
>;

int main(){
    load_je();
    init_labs();
    
    // some kind of magic data structure
    PointCloud cloud;
    // needed because we skip unobtainable colors
    vector<uint> cloud_to_rgb; 
    cloud_to_rgb.reserve(1 << 24);
    
    for(uint i = 0; i < (1 << 24); i++){
        if(!c_exists->get(i)) continue;
        Lab lab = ALL_LABS[i];
        cloud.pts.push_back({lab.l, lab.a, lab.b});
        cloud_to_rgb.push_back(i);
    }
    
    // build the k-d tree index - i.e. more magic
    KDTree index(3, cloud, nanoflann::KDTreeSingleIndexAdaptorParams(10 /* max leaf size */));
    index.buildIndex();
    
    uint log_i = 0;
    uint log_freq = 100000;
    
    for(uint i = 0; i < (1 << 24); i++){
        if(c_exists->get(i)) continue;
        Lab lab = ALL_LABS[i];
        float target_L = lab.l;
        float target_a = lab.a;
        float target_b = lab.b;
        
        // nanoflann expects query coordinates as a raw array pointer;
        float query_pt[3] = {target_L, target_a, target_b};
        
        // get multiple close colors by euclidian distance within RGB (CIE76)
        const size_t num_results = 10;
        size_t ret_indexes[num_results];
        float out_dists_sqr[num_results];
        
        // ResultSet is more black magic;
        nanoflann::KNNResultSet<float> resultSet(num_results);
        resultSet.init(ret_indexes, out_dists_sqr);
        index.findNeighbors(resultSet, query_pt, {});
        
        // now find the best color using the CIE94 deltaE function
        uint best_rgb = cloud_to_rgb[ret_indexes[0]];
        float best_delta = deltaE(lab, ALL_LABS[best_rgb]);
        
        for(uint k = 1; k < resultSet.size(); k++){
            uint cand_rgb = cloud_to_rgb[ret_indexes[k]];
            float delta = deltaE(lab, ALL_LABS[cand_rgb]);
            if(delta < best_delta){
                best_delta = delta;
                best_rgb = cand_rgb;
            }
        }

        // save the result
        closest->set(i, best_rgb);
        
        log_i++;
        if(log_i == log_freq){
            log_i = 0;
            std::cout << i << "/" << (1<<24) << std::endl;
        }
    }
    
    save_je();
    
    uint* my_decode = new uint[256]{0};
    my_decode['0'] = 0x0; my_decode['1'] = 0x1; my_decode['2'] = 0x2; my_decode['3'] = 0x3;
    my_decode['4'] = 0x4; my_decode['5'] = 0x5; my_decode['6'] = 0x6; my_decode['7'] = 0x7;
    my_decode['8'] = 0x8; my_decode['9'] = 0x9; my_decode['a'] = 0xa; my_decode['b'] = 0xb;
    my_decode['c'] = 0xc; my_decode['d'] = 0xd; my_decode['e'] = 0xe; my_decode['f'] = 0xf;
    
    while(true){
        std::cout << "Which color would you like to search for (hex)?" << std::endl;
        string c_hex = "";
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
        
        if(!e){
            uint nearest_index = closest->get(your_c);
            Lab lab_y = rgb_to_lab(your_c);
            Lab lab_n = rgb_to_lab(nearest_index);
            // Print the result
            std::cout << "Closest obtainable color is at index: " << nearest_index << std::endl;
            std::cout
            << "Obtainable Lab: (" 
            << lab_n.l << ", "
            << lab_n.a << ", "
            << lab_n.b << ")" << std::endl;
            std::cout
            << "Obtainable RGB: (" 
            << ((nearest_index & 0xff0000) >> 16) << ", "
            << ((nearest_index & 0x00ff00) >>  8) << ", "
            << ((nearest_index & 0x0000ff)      ) << ")" << std::endl;
            std::cout << "Distance: " << deltaE(lab_y, lab_n) << std::endl;
        }
    }
    
    
    return 0;
}

