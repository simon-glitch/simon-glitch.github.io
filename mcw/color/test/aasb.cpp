
/**
 * AASB stands for Awesome Automatic Structure Builder.
 */
// ;

#include <string>
#include <vector>
#include <iostream>
#include <fstream>
using std::string;
using std::vector;

typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

const char* hex = "0123456789abcdef";
string hex_c(char c){
    char* cc = new char[3];
    cc[0] = hex[(c >> 4) & 0xf];
    cc[1] = hex[c & 0xf];
    cc[2] = hex[16];
    string s = string(cc);
    delete cc;
    return s;
}

uint base_colors[16] = {
    0xf9fffe, /* #f9fffe white   */
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

/*
Break down of awesome.txt:
\t = 09
\v = 0b
\f = 0c
\r = 0d

00 -> air
01 -> light block 15
02 -> black concrete
03 -> green concrete
04 -> gray concrete
05 -> cyan concrete
06 -> lime concrete
07 -> blue concrete
08 -> light blue concrete
09 -> purple concrete
0a -> brown concrete
0b -> light gray concrete
0c -> red concrete
0d -> magenta concrete
0e -> pink concrete
0f -> yellow concrete
10 -> orange concrete
11 -> white concrete

20 -> white concrete        my 0  -> 0x11;
0c -> light gray concrete   my 1  -> 0x0b;
04 -> gray concrete         my 2  -> 0x04;
02 -> black concrete        my 3  -> 0x02;
0b -> brown concrete        my 4  -> 0x0a;
0d -> red concrete          my 5  -> 0x0c;
11 -> orange concrete       my 6  -> 0x10;
10 -> yellow concrete       my 7  -> 0x0f;
06 -> lime concrete         my 8  -> 0x06;
03 -> green concrete        my 9  -> 0x03;
05 -> cyan concrete         my 10 -> 0x05;
08 -> light blue concrete   my 11 -> 0x08;
07 -> blue concrete         my 12 -> 0x07;
09 -> purple concrete       my 13 -> 0x09;
0e -> magenta concrete      my 14 -> 0x0d;
0f -> pink concrete         my 15 -> 0x0e;
00 -> air                   my 16 -> 0x00;
01 -> light block 15        my 17 -> 0x01;


Block index order is r then g then b, so it's really easy. It's the same order I use.

If I'm correct, I can replace the bytes after -x 03 -x 10. It should be 16**3 * 4 * 2 bytes, which is 32768 bytes. We will be replacing it with a perfectly reasonable 256**3 / 16 * 4 * 2 = 8388608 bytes (8 MiB). There are 16 structures, so they are about 128 MiB in total.


s  i  z  e 03 03 -x -x -x 10 -x -x -x 10 -x -x -x 10 ->
s  i  z  e 03 03 -x -x -x 40 -x -x 01 00 -x -x -x 40



*/


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


string wow_file(int file_i, int hex_d){
    string s = string("wow/ac");
    // std::cout << "s: " << s << std::endl;
    char* hex_ds = new char[hex_d + 1]{};
    hex_ds[hex_d] = 0;
    // this i must be signed;
    for(int i = hex_d - 1; i >= 0; i--){
        // std::cout << "hex_ds: " << hex_ds << std::endl;
        // std::cout << "file_i: " << file_i << std::endl;
        hex_ds[i] = hex[file_i & 0xf];
        file_i >>= 4;
    }
    s += hex_ds;
    s += string(".mcstructure");
    return s;
};

void bring_on_the_wow(){
    char size_str[18] = {
        's',  // 0
        'i',  // 
        'z',  // 
        'e',  // 
        3,    // 4
        3,    // 
        0,    // 
        0,    // 
        0,    // 8
        16,   //    <- 9
        0,    // 
        0,    // 
        0,    // 12 <- 12
        16,   //    <- 13
        0,    // 
        0,    // 
        0,    // 16
        16,   //    <- 17
    };
    char data_str[4] = {
        0,
        3,
        0,
        16,
    };
    
    vector<char> awe_txt = whole_file("awesome.mcstructure");
    vector<char> je_bin = whole_file("je_res.bin");
    // gotta skip "Format: recipes, then last_cs, then c_exists\n" = 45 chars;
    int je_skip = 45 + (1 << 24) * 2;
    
    // convert BE data to list of block indices; 0-15 is concrete; 16 is air; 17 is light block;
    // first pass: convert colors into concrete and air;
    // second pass: figure out which colors are contained by 6 other colors, and turn those into air;
    // third pass: replace all air adjacent to concrete with light blocks;
    
    auto c_exists = Color_Exists();
    char* be0 = new char[1 << 24];
    for(uint i = 0; i < (1 << 24); i++){
        be0[i] = je_bin[i + je_skip];
    }
    char* be1 = new char[1 << 24];
    for(uint i = 0; i < (1 << 24); i++){
        if(be0[i] == 0){
            be1[i] = 0x10;
        }
        else{
            uint closest = 0;
            uint r = (i & 0xff0000) >> 16;
            uint g = (i & 0x00ff00) >>  8;
            uint b = (i & 0x0000ff);
            for(uint j = 1; j < 16; j++){
                uint color = base_colors[j];
                uint close = base_colors[closest];
                uint jr = (color & 0xff0000) >> 16;
                uint jg = (color & 0x00ff00) >>  8;
                uint jb = (color & 0x0000ff);
                uint cr = (close & 0xff0000) >> 16;
                uint cg = (close & 0x00ff00) >>  8;
                uint cb = (close & 0x0000ff);
                if((
                    (jr - r) * (jr - r) +
                    (jg - g) * (jg - g) +
                    (jb - b) * (jb - b)
                ) < (
                    (cr - r) * (cr - r) +
                    (cg - g) * (cg - g) +
                    (cb - b) * (cb - b)
                )) closest = j;
            }
            be1[i] = closest;
        }
    }
    char* be2 = new char[1 << 24];
    for(uint i = 0; i < (1 << 24); i++){
        be2[i] = be1[i];
        int ir = (i & 0xff0000) >> 16;
        int ig = (i & 0x00ff00) >> 8;
        int ib = (i & 0x0000ff);
        if(
            ir == 0    || ig == 0    || ib == 0 ||
            ir == 0xff || ig == 0xff || ib == 0xff
        ) continue;
        if(
            be0[((ir + 1) << 16) | ((ig    ) << 8) | (ib    )] &&
            be0[((ir - 1) << 16) | ((ig    ) << 8) | (ib    )] &&
            be0[((ir    ) << 16) | ((ig + 1) << 8) | (ib    )] &&
            be0[((ir    ) << 16) | ((ig - 1) << 8) | (ib    )] &&
            be0[((ir    ) << 16) | ((ig    ) << 8) | (ib + 1)] &&
            be0[((ir    ) << 16) | ((ig    ) << 8) | (ib - 1)]
        ) be2[i] = 16;
    }
    char* be3 = new char[1 << 24];
    for(uint i = 0; i < (1 << 24); i++){
        be3[i] = be2[i];
        int ir = (i & 0xff0000) >> 16;
        int ig = (i & 0x00ff00) >> 8;
        int ib = (i & 0x0000ff);
        if(
            be2[i] == 16 && (
            (ir < 0xff ? (be2[((ir + 1) << 16) | ((ig    ) << 8) | (ib    )] < 0x10) : true) ||
            (ir > 0    ? (be2[((ir - 1) << 16) | ((ig    ) << 8) | (ib    )] < 0x10) : true) ||
            (ig < 0xff ? (be2[((ir    ) << 16) | ((ig + 1) << 8) | (ib    )] < 0x10) : true) ||
            (ig > 0    ? (be2[((ir    ) << 16) | ((ig - 1) << 8) | (ib    )] < 0x10) : true) ||
            (ib < 0xff ? (be2[((ir    ) << 16) | ((ig    ) << 8) | (ib + 1)] < 0x10) : true) ||
            (ib > 0    ? (be2[((ir    ) << 16) | ((ig    ) << 8) | (ib - 1)] < 0x10) : true))
        ) be3[i] = 17;
    }
    char reind[18] = {
        0x11,
        0x0b,
        0x04,
        0x02,
        0x0a,
        0x0c,
        0x10,
        0x0f,
        0x06,
        0x03,
        0x05,
        0x08,
        0x07,
        0x09,
        0x0d,
        0x0e,
        0x00,
        0x01,
    };
    char* be4 = new char[1 << 24];
    for(uint i = 0; i < (1 << 24); i++){
        be4[i] = reind[be3[i]];
    }
    // we only need be4 from here;
    delete be0;
    delete be1;
    delete be2;
    delete be3;
    
    
    uint i = 0;
    uint j = 0;
    uint found_size_i = 0;
    for(; i < awe_txt.size(); i++){
        if(i > 400) break;
        std::cout << "Reading " << int(awe_txt[i]) << ", j = " << j << std::endl;
        if(awe_txt[i] == size_str[j]){
            j++;
        }
        else{
            j = 0;
        }
        if(j == 18){
            found_size_i = i - 17;
            break;
        }
    }
    if(!found_size_i){
        std::cout << "Couldn't find awesome size." << std::endl;
        abort();
    }
    j = 0;
    uint found_data_i = 0;
    for(; i < awe_txt.size(); i++){
        if(awe_txt[i] == data_str[j]){
            j++;
        }
        if(j == 4){
            found_data_i = i - 3;
            break;
        }
    }
    if(!found_data_i){
        std::cout << "Couldn't find awesome data start point." << std::endl;
        abort();
    }
    
    // how many bits of r to put into file_i;
    const uint split_r = 2;
    // how many bits of g to put into file_i;
    const uint split_g = 1;
    // how many bits of b to put into file_i;
    const uint split_b = 2;
    // number of RGB bits left;
    const uint split_data = 24 - (split_r + split_g + split_b);
    const uint and_1_r = ((1 << (8 - split_r)) - 1) << (split_data - (8 - split_r));
    const uint and_1_g = ((1 << (8 - split_g)) - 1) << (split_data - (8 - split_g) - (8 - split_r));
    const uint and_1_b = ((1 << (8 - split_b)) - 1) << (split_data - (8 - split_b) - (8 - split_g) - (8 - split_r));
    const uint and_2_r = ((1 << split_r) - 1) << (split_g + split_b);
    const uint and_2_g = ((1 << split_g) - 1) << (split_b);
    const uint and_2_b = ((1 << split_b) - 1);
    const uint shift_1_r = (split_data - (8 - split_r));
    const uint shift_1_g = (split_data - (8 - split_g) - (8 - split_r));
    const uint shift_1_b = (split_data - (8 - split_b) - (8 - split_g) - (8 - split_r));
    const uint shift_2_r = 8 - (split_r + split_g + split_b);
    const uint shift_2_g = 8 - (split_g + split_b);
    const uint shift_2_b = 8 - (split_b);
    const uint shift_l2_r = shift_2_r > 0 ?  shift_2_r : 0;
    const uint shift_l2_g = shift_2_g > 0 ?  shift_2_g : 0;
    const uint shift_l2_b = shift_2_b > 0 ?  shift_2_b : 0;
    const uint shift_r2_r = shift_2_r < 0 ? -shift_2_r : 0;
    const uint shift_r2_g = shift_2_g < 0 ? -shift_2_g : 0;
    const uint shift_r2_b = shift_2_b < 0 ? -shift_2_b : 0;
    
    for(uint file_i = 0; file_i < (1 << (split_r + split_g + split_b)); file_i++){
        std::cout << "Try to make file name." << std::endl;
        string file_out = wow_file(file_i, 3);
        std::cout << "Where do it fail? 1" << std::endl;
        auto fout = std::ofstream(file_out, std::ios_base::binary);
        
        // do stuff before block indices section;
        uint size = awe_txt.size() - 16*16*16*4*2 + (1 << split_data)*4*2;
        char* my_txt = new char[size];
        for(uint i = 0; i < found_data_i + 4; i++){
            my_txt[i] = awe_txt[i];
        }
        std::cout << "Where do it fail? 2" << std::endl;
        // set X, Y, Z size; these are in big endian;
        my_txt[found_size_i +  8] = ((1 << (8 - split_r)) & 0xff00) >> 8;
        my_txt[found_size_i +  9] = ((1 << (8 - split_r)) & 0x00ff);
        my_txt[found_size_i + 12] = ((1 << (8 - split_g)) & 0xff00) >> 8;
        my_txt[found_size_i + 13] = ((1 << (8 - split_g)) & 0x00ff);
        my_txt[found_size_i + 16] = ((1 << (8 - split_b)) & 0xff00) >> 8;
        my_txt[found_size_i + 17] = ((1 << (8 - split_b)) & 0x00ff);
        
        // set volume; this is in little endian;
        my_txt[found_data_i + 2] = ((1 << (split_data)) & 0x000000ff);
        my_txt[found_data_i + 3] = ((1 << (split_data)) & 0x0000ff00) >> 8;
        my_txt[found_data_i + 4] = ((1 << (split_data)) & 0x00ff0000) >> 16;
        my_txt[found_data_i + 5] = ((1 << (split_data)) & 0xff000000) >> 24;
        // set volume for the ff section too;
        my_txt[(1 << (split_data))*4 + found_data_i + 3 + 4] = ((1 << (split_data)) & 0x000000ff);
        my_txt[(1 << (split_data))*4 + found_data_i + 4 + 4] = ((1 << (split_data)) & 0x0000ff00) >> 8;
        my_txt[(1 << (split_data))*4 + found_data_i + 5 + 4] = ((1 << (split_data)) & 0x00ff0000) >> 16;
        my_txt[(1 << (split_data))*4 + found_data_i + 6 + 4] = ((1 << (split_data)) & 0xff000000) >> 24;
        // also there is a 00,00,00,03 before the second volume, just like with the first volume;
        my_txt[(1 << (split_data))*4 + found_data_i - 1 + 4] = 0x00;
        my_txt[(1 << (split_data))*4 + found_data_i     + 4] = 0x00;
        my_txt[(1 << (split_data))*4 + found_data_i + 1 + 4] = 0x00;
        my_txt[(1 << (split_data))*4 + found_data_i + 2 + 4] = 0x03;
        
        std::cout << "Where do it fail? 3" << std::endl;
        // do stuff after block indices section;
        const uint after_i_in  = found_data_i + 6 + 16*16*16*4*2 + 0;
        const uint after_i_out = found_data_i + 6 + (1 << split_data)*4*2 + 4;
        const uint diff = after_i_out - after_i_in;
        for(uint i = after_i_out; i < size; i++){
            my_txt[i] = awe_txt[i + 4 - diff];
        }
        std::cout << "Where do it fail? 4" << std::endl;
        
        // now the data!
        for(uint i = 1; i < (1 << split_data); i++){
            int ir = ((i & and_1_r) >> shift_1_r) | (((file_i & and_2_r) << shift_l2_r) >> shift_r2_r);
            int ig = ((i & and_1_g) >> shift_1_g) | (((file_i & and_2_g) << shift_l2_g) >> shift_r2_g);
            int ib = ((i & and_1_b) >> shift_1_b) | (((file_i & and_2_b) << shift_l2_b) >> shift_r2_b);
            int ii = found_data_i + 3 + i * 4;
            my_txt[ii    ] = 0;
            my_txt[ii + 1] = 0;
            my_txt[ii + 2] = 0;
            my_txt[ii + 3] = be4[(
                (ir << 16) |
                (ig << 8) |
                ib
            )];
        }
        std::cout << "Where do it fail? 5" << std::endl;
        // and the ffs at the end;
        for(uint i = 0; i < (1 << split_data); i++){
            int ii = found_data_i + 11 + (i + (1 << split_data)) * 4;
            my_txt[ii    ] = 0xff;
            my_txt[ii + 1] = 0xff;
            my_txt[ii + 2] = 0xff;
            my_txt[ii + 3] = 0xff;
        }
        
        // now write to file;
        for(uint i = 0; i < size; i++){
            fout << my_txt[i];
        }
        
        fout.close();
        
        // break;
    }
    std::cout << "I should be done now!" << std::endl;
    std::cout << "I should have made " << (1 << (split_r + split_g + split_b)) << " file total." << std::endl;
}

void give_me_them_colors(){
    vector<char> grid_txt = whole_file("grid.mcstructure");
    char colour[12] = "CustomColor";
    char potion[9] = "PotionId";
    std::cout << "colour[0] = " << colour[0] << std::endl;
    vector<int> desired_colors = {
        0xf4a460, /* sandybrown     */
        0x00ff7f, /* springgreen    */
        0x8b4513, /* saddlebrown    */
        0xdeb887, /* burlywood      */
        0x663399, /* rebeccapurple  */
        0x6495ed, /* cornflowerblue */
        0x9400d3, /* darkviolet     */
        0xf0fff0, /* honeydew       */
        0xe6e6fa, /* lavender       */
        0xfff0f5, /* lavenderblush  */
        0xc0c0c0, /* silver         */
        0xadff2f, /* greenyellow    */
        0xa0522d, /* sienna     */
        0xdc143c, /* crimson    */
        0xd2691e, /* chocolate  */
        0xff7f50, /* coral      */
        0x000080, /* navy       */
        0x8a2be2, /* blueviolet */
        0x9932cc, /* darkorchid */
        0x8a2be2, /* blueviolet */
        0xff4500, /* orangered  */
        0xfffff0, /* ivory      */
        0x87ceeb, /* skyblue    */
        0xee82ee, /* violet     */
        0x40e0d0, /* turquoise  */
        0xf0e68c, /* khaki      */
        0x008080, /* teal       */
        0xf5f5dc, /* beige      */
        0xda70d6, /* orchid     */
        0xff00ff, /* fuchsia    */
        0xd2b48c, /* tan        */
        0x800000, /* maroon     */
        0x7fffd4, /* aquamarine */
        0x708090, /* slategray  */
        0x6a5acd, /* slateblue  */
        0xfa8072, /* salmon     */
        0xffd700, /* gold       */
        0xffffff, /* white      */
        0xd3d3d3, /* lightgray  */
        0x808080, /* gray       */
        0x000000, /* black      */
        0xa52a2a, /* brown      */
        0xff0000, /* red        */
        0xffa500, /* orange     */
        0xffff00, /* yellow     */
        0x00ff00, /* lime       */
        0x008000, /* green      */
        0x00ffff, /* cyan       */
        0xadd8e6, /* lightblue  */
        0x0000ff, /* blue       */
        0x800080, /* purple     */
        0xff00ff, /* magenta    */
        0xf000ff, /* purple variant */
        0xe000ff, /* purple variant */
        0xd800ff, /* purple variant */
        0xd000ff, /* purple variant */
        0xc800ff, /* purple variant */
        0xc000ff, /* purple variant */
        0xb800ff, /* purple variant */
        0xb000ff, /* purple variant */
        0xa800ff, /* purple variant */
        0xa000ff, /* purple variant */
        0x9800ff, /* purple variant */
        0x9000ff, /* purple variant */
        0x8800ff, /* purple variant */
        0x8000ff, /* purple variant */
        0x7800ff, /* purple variant */
        0x7000ff, /* purple variant */
        0x6800ff, /* purple variant */
        0x6000ff, /* purple variant */
        0x5000ff, /* purple variant */
    };
    vector<int> desired_potions = {
        0x052c,
        0x0617,
        0x0627,
        0x0705,
        0x072a,
        0x0806,
        0x0828,
        0x0907,
        0x0927,
        0x0a08,
        0x0b24,
        0x0b2e,
        0x0c14,
        0x0c1f,
        0x0d0a,
        0x0e0c,
        0x0e29,
        0x0f0d,
        0x100b,
        0x1311,
        0x1328,
        0x1513,
        0x1715,
        0x1917,
        0x110e,
        0x1111,
        0x120f,
        0x1412,
        0x1510,
        0x1614,
        0x1636,
        0x1727,
        0x1816,
        0x190d,
        0x1a18,
        0x1b2a,
        0x1c19,
        0x1c23,
        0x1d1a,
        0x1e1b,
        0x1f09,
        0x1f1c,
        0x201d,
        0x202b,
        0x211e,
        0x221f,
        0x2222,
        0x2320,
        0x2422,
        0x242e,
        0x2521,
        0x2524,
        0x261c,
        0x2623,
        0x2721,
        0x2725,
        0x2806,
        0x2825,
        0x2926,
        0x2a15,
        0x2a10,
        0x2b1d,
        0x2b28,
        0x2c2b,
        0x2d19,
        0x2d2c,
        0x2e2d,
        0x3637,
        0x3739,
        0x3936,
        0xff29,
    };
    vector<int> found_colour_is = {};
    vector<int> found_potion_is = {};
    int found_colour_i = 0;
    int i = 0;
    for(int ii = 0; ii < desired_colors.size(); ii++){
        int j = 0;
        for(; i < grid_txt.size(); i++){
            // if(j > 0 || grid_txt[i] == 'C') std::cout << "Reading " << int(grid_txt[i]) << ", j = " << j << std::endl;
            if(grid_txt[i] == colour[j]){
                j++;
            }
            else{
                j = 0;
            }
            if(j == 11){
                found_colour_i = i + 1;
                break;
            }
        }
        if(!found_colour_i) break;
        found_colour_is.push_back(found_colour_i);
    }
    
    found_colour_i = 0;
    i = 0;
    for(int ii = 0; ii < desired_colors.size(); ii++){
        int j = 0;
        for(; i < grid_txt.size(); i++){
            if(grid_txt[i] == potion[j]){
                j++;
            }
            else{
                j = 0;
            }
            if(j == 8){
                found_colour_i = i + 1;
                break;
            }
        }
        if(!found_colour_i) break;
        found_potion_is.push_back(found_colour_i);
    }
    
    std::cout << "i = " << i << std::endl;
    
    std::cout << "Found slots for " << found_colour_is.size() << " / " << desired_colors.size() << " colors." << std::endl;
    
    char* my_txt = new char[grid_txt.size()];
    for(int g_i = 0; g_i < grid_txt.size(); g_i++){
        my_txt[g_i] = grid_txt[g_i];
    }
    
    // now write my colors;
    for(int ii = 0; ii < found_colour_is.size(); ii++){
        int desired_color = desired_colors[ii];
        int found_colour_i = found_colour_is[ii];
        my_txt[found_colour_i    ] = (desired_color & 0x0000ff);
        my_txt[found_colour_i + 1] = (desired_color & 0x00ff00) >> 8;
        my_txt[found_colour_i + 2] = (desired_color & 0xff0000) >> 16;
    }
    
    // and potions;
    // for(int ii = 0; ii < found_colour_is.size(); ii++){
    //     int desired_potion = desired_potions[ii];
    //     int found_colour_i = found_potion_is[ii];
    //     my_txt[found_colour_i    ] = (desired_potion & 0x00ff);
    //     my_txt[found_colour_i + 1] = (desired_potion & 0xff00) >> 8;
    // }
    
    string file_out = "my_colors_b.mcstructure";
    // std::cout << "Where do it fail? 1" << std::endl;
    auto fout = std::ofstream(file_out, std::ios_base::binary);
    
    // now write to file;
    for(int g_i = 0; g_i < grid_txt.size(); g_i++){
        fout << my_txt[g_i];
    }
    
    fout.close();
}

void potion_ids(){
    vector<char> grid_txt = whole_file("potions.mcstructure");
    char block_entity_data[18] = "block_entity_data";
    char potion_id[9] = "PotionId";
    std::cout << "block_entity_data[0] = " << block_entity_data[0] << std::endl;
    std::cout << "potion_id[0] = " << potion_id[0] << std::endl;
    vector<int> block_idxs = {};
    vector<int> potion_idxs = {};
    vector<int> potion_ids = {};
    vector<int> found_colour_is = {};
    int found_colour_i = 0;
    int i = 0;
    for(int ii = 0; ii < 43*3; ii++){
        int j = 0;
        for(; i < grid_txt.size(); i++){
            if(grid_txt[i] == block_entity_data[j]){
                j++;
            }
            else{
                j = 0;
            }
            if(j == 17){
                found_colour_i = i - 16 - 4;
                break;
            }
        }
        if(!found_colour_i) break;
        found_colour_is.push_back(found_colour_i);
    }
    
    found_colour_i = 0;
    i = 0;
    for(int ii = 0; ii < 42*3; ii++){
        int j = 0;
        for(; i < grid_txt.size(); i++){
            if(grid_txt[i] == potion_id[j]){
                j++;
            }
            else{
                j = 0;
            }
            if(j == 8){
                found_colour_i = i + 1;
                break;
            }
        }
        if(!found_colour_i) break;
        potion_idxs.push_back(found_colour_i);
    }
    
    std::cout << "i = " << i << std::endl;
    
    
    /*
    char* my_txt = new char[grid_txt.size()];
    for(int g_i = 0; g_i < grid_txt.size(); g_i++){
        my_txt[g_i] = grid_txt[g_i];
    }
    */
    
    // reading time;
    int max_idx = 0;
    for(int ii = 0; ii < found_colour_is.size(); ii++){
        vector<char> digits = {};
        for(int j = found_colour_is[ii]; j > 0; j--){
            char c = grid_txt[j];
            if(c == '0'){
                std::cout << c;
                digits.push_back(0);
            }
            else if(c == '1'){
                std::cout << c;
                digits.push_back(1);
            }
            else if(c == '2'){
                std::cout << c;
                digits.push_back(2);
            }
            else if(c == '3'){
                std::cout << c;
                digits.push_back(3);
            }
            else if(c == '4'){
                std::cout << c;
                digits.push_back(4);
            }
            else if(c == '5'){
                std::cout << c;
                digits.push_back(5);
            }
            else if(c == '6'){
                std::cout << c;
                digits.push_back(6);
            }
            else if(c == '7'){
                std::cout << c;
                digits.push_back(7);
            }
            else if(c == '8'){
                std::cout << c;
                digits.push_back(8);
            }
            else if(c == '9'){
                std::cout << c;
                digits.push_back(9);
            }
            else break;
        }
        int idx = 0;
        for(auto it = digits.rbegin(); it != digits.rend(); it++){
            idx = 10 * idx + *it;
        }
        if(idx > max_idx) max_idx = idx;
        block_idxs.push_back(idx);
        std::cout << std::endl;
    }
    
    vector<int> inv_idxs = {};
    for(int ii = 0; ii < max_idx; ii++){
        inv_idxs.push_back(-1);
        potion_ids.push_back(-1);
    }
    for(int ii = 0; ii < block_idxs.size(); ii++){
        inv_idxs[block_idxs[ii]] = ii;
    }
    
    for(int ii = 0; ii < block_idxs.size(); ii++){
        int v = (grid_txt[potion_idxs[ii]] << 8) | (grid_txt[potion_idxs[ii + 1]]);
        potion_ids[block_idxs[ii]] = v;
    }
    
    for(int ii = 0; ii < block_idxs.size(); ii++){
        int i = inv_idxs[block_idxs[ii]];
        if(i == -1) continue;
        int potion_id = potion_ids[i];
        if(potion_id == -1) continue;
        std::cout << "inv idx: " << i << ", ";
        std::cout << "block idx: " << block_idxs[i] << ", ";
        std::cout << "potion id: " <<
        hex[(potion_id & 0xf000) >> 12] <<
        hex[(potion_id & 0x0f00) >> 8] <<
        hex[(potion_id & 0x00f0) >> 4] <<
        hex[(potion_id & 0x000f)] <<
        std::endl;
        // std::cout << "potion id: " << potion_id << std::endl;
        // std::cout << "found_colour_i: " << found_colour_is[i] << std::endl;
        // std::cout << "block idx: " << block_idxs[i] << std::endl;
        // std::cout << "potion idx: " << potion_idxs[i] << std::endl;
        
    }
    
    
    /*
    string file_out = "my_colors.mcstructure";
    // std::cout << "Where do it fail? 1" << std::endl;
    auto fout = std::ofstream(file_out, std::ios_base::binary);
    
    // now write to file;
    for(int g_i = 0; g_i < grid_txt.size(); g_i++){
        fout << my_txt[g_i];
    }
    
    fout.close();
    */
}

/*
inv idx: 0, block idx: 0, potion id: 2e2d
inv idx: 1, block idx: 1, potion id: 2d19
inv idx: 66, block idx: 2, potion id: 2b28
inv idx: 72, block idx: 3, potion id: 1c19
inv idx: 83, block idx: 4, potion id: ff29
inv idx: 93, block idx: 6, potion id: 1d1a
inv idx: 101, block idx: 7, potion id: 0a08
inv idx: 119, block idx: 9, potion id: 2a15
inv idx: 7, block idx: 11, potion id: 2222
inv idx: 13, block idx: 12, potion id: 1328
inv idx: 20, block idx: 13, potion id: ff29
inv idx: 31, block idx: 14, potion id: 1a18
inv idx: 39, block idx: 15, potion id: 0828
inv idx: 56, block idx: 17, potion id: 2a10
inv idx: 65, block idx: 19, potion id: 2c2b
inv idx: 67, block idx: 20, potion id: 2825
inv idx: 68, block idx: 25, potion id: 2524
inv idx: 69, block idx: 26, potion id: 2422
inv idx: 70, block idx: 28, potion id: 221f
inv idx: 71, block idx: 29, potion id: 1f1c
inv idx: 73, block idx: 30, potion id: 1917
inv idx: 74, block idx: 31, potion id: 1715
inv idx: 75, block idx: 32, potion id: 1513
inv idx: 76, block idx: 33, potion id: 1311
inv idx: 77, block idx: 34, potion id: 110e
inv idx: 78, block idx: 35, potion id: 0e0c
inv idx: 79, block idx: 36, potion id: 0c1f
inv idx: 80, block idx: 37, potion id: 0907
inv idx: 81, block idx: 38, potion id: 0705
inv idx: 88, block idx: 51, potion id: 2926
inv idx: 89, block idx: 52, potion id: 261c
inv idx: 91, block idx: 57, potion id: 2320
inv idx: 92, block idx: 59, potion id: 201d
inv idx: 94, block idx: 63, potion id: 1a18
inv idx: 95, block idx: 64, potion id: 1816
inv idx: 96, block idx: 65, potion id: 1636
inv idx: 97, block idx: 66, potion id: 3637
inv idx: 98, block idx: 67, potion id: 3739
inv idx: 99, block idx: 68, potion id: 3936
inv idx: 100, block idx: 69, potion id: 0d0a
inv idx: 102, block idx: 70, potion id: 0806
inv idx: 103, block idx: 71, potion id: 0617
inv idx: 110, block idx: 78, potion id: 2721
inv idx: 113, block idx: 80, potion id: 211e
inv idx: 114, block idx: 81, potion id: 1e1b
inv idx: 115, block idx: 82, potion id: 1b2a
inv idx: 120, block idx: 91, potion id: 100b
inv idx: 122, block idx: 93, potion id: 0b2e
inv idx: 126, block idx: 97, potion id: 2e2d
inv idx: 127, block idx: 98, potion id: 2d2c
inv idx: 128, block idx: 99, potion id: 2c2b
inv idx: 3, block idx: 100, potion id: 2b1d
inv idx: 4, block idx: 101, potion id: 2806
inv idx: 5, block idx: 102, potion id: 2521
inv idx: 6, block idx: 103, potion id: 242e
inv idx: 8, block idx: 110, potion id: 1f09
inv idx: 9, block idx: 113, potion id: 1c23
inv idx: 10, block idx: 114, potion id: 190d
inv idx: 11, block idx: 115, potion id: 1727
inv idx: 12, block idx: 119, potion id: 1510
inv idx: 14, block idx: 120, potion id: 1111
inv idx: 15, block idx: 122, potion id: 0e29
inv idx: 16, block idx: 126, potion id: 0c14
inv idx: 17, block idx: 127, potion id: 0927
inv idx: 18, block idx: 128, potion id: 072a
inv idx: 19, block idx: 129, potion id: 052c
inv idx: 25, block idx: 134, potion id: 2926
inv idx: 26, block idx: 135, potion id: 2623
inv idx: 28, block idx: 137, potion id: 2320
inv idx: 29, block idx: 138, potion id: 202b
inv idx: 30, block idx: 139, potion id: 1d1a
inv idx: 32, block idx: 140, potion id: 1816
inv idx: 33, block idx: 141, potion id: 1614
inv idx: 34, block idx: 142, potion id: 1412
inv idx: 35, block idx: 143, potion id: 120f
inv idx: 36, block idx: 144, potion id: 0f0d
inv idx: 37, block idx: 145, potion id: 0d0a
inv idx: 38, block idx: 146, potion id: 0a08
inv idx: 40, block idx: 151, potion id: 0627
inv idx: 47, block idx: 159, potion id: 2725
inv idx: 50, block idx: 161, potion id: 211e
inv idx: 51, block idx: 162, potion id: 1e1b
inv idx: 52, block idx: 163, potion id: 1b2a
inv idx: 57, block idx: 173, potion id: 100b
inv idx: 59, block idx: 177, potion id: 0b24
inv idx: 63, block idx: 183, potion id: 2e2d
inv idx: 64, block idx: 185, potion id: 2d2c

If you can figure out what these numbers mean, you are probably the guy who added them in the first place.
052c
0617
0627
0705
072a
0806
0828
0907
0927
0a08
0b24
0b2e
0c14
0c1f
0d0a
0e0c
0e29
0f0d
100b
1311
1328
1513
1715
1917
110e
1111
120f
1412
1510
1614
1636
1727
1816
190d
1a18
1b2a
1c19
1c23
1d1a
1e1b
1f09
1f1c
201d
202b
211e
221f
2222
2320
2422
242e
2521
2524
261c
2623
2721
2725
2806
2825
2926
2a15
2a10
2b1d
2b28
2c2b
2d19
2d2c
2e2d
3637
3739
3936
ff29



*/

int main(int argc, char const *argv[]){
    bring_on_the_wow();
    // give_me_them_colors();
    // potion_ids();
    
    return 0;
}



/*
g++ aasb.cpp -O3 -o aasb.exe

*/


