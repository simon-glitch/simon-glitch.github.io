
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
    string s = string("wow/awb");
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

int main(int argc, char const *argv[]){
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
    vector<char> be_bin = whole_file("be_res.bin");
    // gotta skip "Testing." = 8 chars;
    int be_skip = 8;
    
    // convert BE data to list of block indices; 0-15 is concrete; 16 is air; 17 is light block;
    // first pass: convert colors into concrete and air;
    // second pass: figure out which colors are contained by 6 other colors, and turn those into air;
    // third pass: replace all air adjacent to concrete with light blocks;
    
    char* be0 = new char[1 << 24];
    for(int i = 0; i < (1 << 24); i++){
        be0[i] = be_bin[i + be_skip];
    }
    char* be1 = new char[1 << 24];
    for(int i = 0; i < (1 << 24); i++){
        be1[i] = be0[i] ? (be0[i] & 0xf) : 0x10;
        // be1[i] = (be0[i] & 0xf);
    }
    char* be2 = new char[1 << 24];
    for(int i = 0; i < (1 << 24); i++){
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
    for(int i = 0; i < (1 << 24); i++){
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
    for(int i = 0; i < (1 << 24); i++){
        be4[i] = reind[be3[i]];
        // be4[i] = reind[be1[i]];
        // be4[i] = reind[i % 18];
    }
    // we only need be4 from here;
    delete be0;
    delete be1;
    delete be2;
    delete be3;
    
    
    int i = 0;
    int j = 0;
    int found_size_i = 0;
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
    int found_data_i = 0;
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
    const int split_r = 2;
    // how many bits of g to put into file_i;
    const int split_g = 1;
    // how many bits of b to put into file_i;
    const int split_b = 2;
    // number of RGB bits left;
    const int split_data = 24 - (split_r + split_g + split_b);
    const int and_1_r = ((1 << (8 - split_r)) - 1) << (split_data - (8 - split_r));
    const int and_1_g = ((1 << (8 - split_g)) - 1) << (split_data - (8 - split_g) - (8 - split_r));
    const int and_1_b = ((1 << (8 - split_b)) - 1) << (split_data - (8 - split_b) - (8 - split_g) - (8 - split_r));
    const int and_2_r = ((1 << split_r) - 1) << (split_g + split_b);
    const int and_2_g = ((1 << split_g) - 1) << (split_b);
    const int and_2_b = ((1 << split_b) - 1);
    const int shift_1_r = (split_data - (8 - split_r));
    const int shift_1_g = (split_data - (8 - split_g) - (8 - split_r));
    const int shift_1_b = (split_data - (8 - split_b) - (8 - split_g) - (8 - split_r));
    const int shift_2_r = 8 - (split_r - split_g - split_b);
    const int shift_2_g = 8 - (split_g - split_b);
    const int shift_2_b = 8 - (split_b);
    const int shift_l2_r = shift_2_r > 0 ?  shift_2_r : 0;
    const int shift_l2_g = shift_2_r > 0 ?  shift_2_r : 0;
    const int shift_l2_b = shift_2_r > 0 ?  shift_2_r : 0;
    const int shift_r2_r = shift_2_r < 0 ? -shift_2_r : 0;
    const int shift_r2_g = shift_2_r < 0 ? -shift_2_r : 0;
    const int shift_r2_b = shift_2_r < 0 ? -shift_2_r : 0;
    
    for(int file_i = 0; file_i < (1 << (split_r + split_g + split_b)); file_i++){
        // std::cout << "Try to make file name." << std::endl;
        string file_out = wow_file(file_i, 3);
        // std::cout << "Where do it fail? 1" << std::endl;
        auto fout = std::ofstream(file_out, std::ios_base::binary);
        
        // do stuff before block indices section;
        int size = awe_txt.size() - 16*16*16*4*2 + (1 << split_data)*4*2;
        char* my_txt = new char[size];
        for(int i = 0; i < found_data_i + 4; i++){
            my_txt[i] = awe_txt[i];
        }
        // std::cout << "Where do it fail? 2" << std::endl;
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
        
        // std::cout << "Where do it fail? 3" << std::endl;
        // do stuff after block indices section;
        const int after_i_in  = found_data_i + 6 + 16*16*16*4*2 + 0;
        const int after_i_out = found_data_i + 6 + (1 << split_data)*4*2 + 4;
        const int diff = after_i_out - after_i_in;
        for(int i = after_i_out; i < size; i++){
            my_txt[i] = awe_txt[i + 4 - diff];
        }
        // std::cout << "Where do it fail? 4" << std::endl;
        
        // now the data!
        for(int i = 1; i < (1 << split_data); i++){
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
        // std::cout << "Where do it fail? 5" << std::endl;
        // and the ffs at the end;
        for(int i = 0; i < (1 << split_data); i++){
            int ii = found_data_i + 11 + (i + (1 << split_data)) * 4;
            my_txt[ii    ] = 0xff;
            my_txt[ii + 1] = 0xff;
            my_txt[ii + 2] = 0xff;
            my_txt[ii + 3] = 0xff;
        }
        
        // now write to file;
        for(int i = 0; i < size; i++){
            fout << my_txt[i];
        }
        
        fout.close();
        
        // break;
    }
    std::cout << "I should be done now!" << std::endl;
    std::cout << "I should have made " << (1 << (split_r + split_g + split_b)) << " file total." << std::endl;
}



/*
g++ aasb.cpp -O6 -o aasb.exe

*/


