
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

bool* gen_is_ascii(){
    bool* is_ascii = new bool[256]{false};
    auto ia = "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "`0123456789-="
    "~!@#$%^&*()_+"
    "[]\\;',./"
    "{}|:\"<>?"
    " \n";
    for(int i = 0, c = ia[0]; c != 0; i++, c = ia[i]){
        is_ascii[c] = true;
    }
    return is_ascii;
}

void process_file(string file_in, string file_out){
    int size = 0x10000;
    char* txt_in = new char[size];
    auto fin = std::ifstream(file_in, std::ios_base::binary);
    fin.read(txt_in, size);
    int count = fin.gcount();
    // std::cout << "Chunk size: " << count << std::endl;
    
    string txt_out = "";
    bool* is_ascii = gen_is_ascii();
    
    int j = 0;
    while(count > 0){
        j++;
        for(int i = 0; i < count; i++){
            char c = txt_in[i];
            // std::cout << "Hi? " << c << std::endl;
            txt_out += " ";
            if(is_ascii[c]){
                // std::cout << "Hello? " << c << std::endl;
                txt_out += " ";
                char* cc = new char[2]{c};
                cc[1] = 0;
                txt_out += cc;
                delete cc;
            }
            else if(c == '\f'){
                txt_out += "\\f";
            }
            else if(c == '\r'){
                txt_out += "\\r";
            }
            else if(c == '\t'){
                txt_out += "\\t";
            }
            else if(c == '\v'){
                txt_out += "\\v";
            }
            else if(c == 0){
                txt_out += "-x";
            }
            else{
                txt_out += hex_c(c);
            }
        }
        fin.read(txt_in, size);
        count = fin.gcount();
        // std::cout << "Chunk size: " << count << std::endl;
    }
    
    fin.close();
    
    auto fout = std::ofstream(file_out, std::ios_base::binary);
    fout << txt_out;
    fout.close();
    
    delete txt_in;
    delete is_ascii;
}

void function_that_has_served_its_purpose(){
    process_file("base.mcstructure", "base.txt");
    process_file("awesome.mcstructure", "awesome.txt");
    process_file("grid.mcstructure", "grid.txt");
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
0b -> brown concrete
0c -> light gray concrete
0d -> red concrete
0e -> magenta concrete
0f -> pink concrete
10 -> yellow concrete
11 -> orange concrete
20 -> white concrete

20 -> white concrete        my 0  -> 0x20;
0c -> light gray concrete   my 1  -> 0x0c;
04 -> gray concrete         my 2  -> 0x04;
02 -> black concrete        my 3  -> 0x02;
0b -> brown concrete        my 4  -> 0x0b;
0d -> red concrete          my 5  -> 0x0d;
11 -> orange concrete       my 6  -> 0x11;
10 -> yellow concrete       my 7  -> 0x10;
06 -> lime concrete         my 8  -> 0x06;
03 -> green concrete        my 9  -> 0x03;
05 -> cyan concrete         my 10 -> 0x05;
08 -> light blue concrete   my 11 -> 0x08;
07 -> blue concrete         my 12 -> 0x07;
09 -> purple concrete       my 13 -> 0x09;
0e -> magenta concrete      my 14 -> 0x0e;
0f -> pink concrete         my 15 -> 0x0f;
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
    
    vector<char> awe_txt = whole_file("awesome.txt");
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
            be1[((ir + 1) << 16) | ((ig    ) << 8) | (ib    )] &&
            be1[((ir - 1) << 16) | ((ig    ) << 8) | (ib    )] &&
            be1[((ir    ) << 16) | ((ig + 1) << 8) | (ib    )] &&
            be1[((ir    ) << 16) | ((ig - 1) << 8) | (ib    )] &&
            be1[((ir    ) << 16) | ((ig    ) << 8) | (ib + 1)] &&
            be1[((ir    ) << 16) | ((ig    ) << 8) | (ib - 1)]
        ) be2[i] = 16;
    }
    char* be3 = new char[1 << 24];
    for(int i = 0; i < (1 << 24); i++){
        be3[i] = be2[i];
        int ir = (i & 0xff0000) >> 16;
        int ig = (i & 0x00ff00) >> 8;
        int ib = (i & 0x0000ff);
        if(
            be2[i] == 16 &&
            (ir < 0xff ? be2[((ir + 1) << 16) | ((ig    ) << 8) | (ib    )] : true) &&
            (ir > 0    ? be2[((ir - 1) << 16) | ((ig    ) << 8) | (ib    )] : true) &&
            (ig < 0xff ? be2[((ir    ) << 16) | ((ig + 1) << 8) | (ib    )] : true) &&
            (ig > 0    ? be2[((ir    ) << 16) | ((ig - 1) << 8) | (ib    )] : true) &&
            (ib < 0xff ? be2[((ir    ) << 16) | ((ig    ) << 8) | (ib + 1)] : true) &&
            (ib > 0    ? be2[((ir    ) << 16) | ((ig    ) << 8) | (ib - 1)] : true)
        ) be3[i] = 17;
    }
    // we only need be3 from here;
    delete be0;
    delete be1;
    delete be2;
    
    char reind[18] = {
        0x20,
        0x0c,
        0x04,
        0x02,
        0x0b,
        0x0d,
        0x11,
        0x10,
        0x06,
        0x03,
        0x05,
        0x08,
        0x07,
        0x09,
        0x0e,
        0x0f,
        0x00,
        0x01,
    };
    
    string files[16] = {
        string("wow00.mcstructure"),
        string("wow01.mcstructure"),
        string("wow02.mcstructure"),
        string("wow03.mcstructure"),
        string("wow04.mcstructure"),
        string("wow05.mcstructure"),
        string("wow06.mcstructure"),
        string("wow07.mcstructure"),
        string("wow08.mcstructure"),
        string("wow09.mcstructure"),
        string("wow10.mcstructure"),
        string("wow11.mcstructure"),
        string("wow12.mcstructure"),
        string("wow13.mcstructure"),
        string("wow14.mcstructure"),
        string("wow15.mcstructure"),
    };
    
    int i = 0;
    int j = 0;
    int found_size_i = 0;
    for(; i < awe_txt.size(); i++){
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
    
    for(int file_i = 0; file_i < 16; file_i++){
        auto fout = std::ofstream(files[file_i], std::ios_base::binary);
        
        // do stuff before block indices section;
        int size = awe_txt.size() - 16*16*16*4*2 + 256*64*64*4*2;
        char* my_txt = new char[size];
        for(int i = 0; i < found_data_i + 4; i++){
            my_txt[i] = awe_txt[i];
        }
        // set size to 64x256x64;
        my_txt[found_size_i +  9] = 64;
        my_txt[found_size_i + 12] =  1;
        my_txt[found_size_i + 13] =  0;
        my_txt[found_size_i + 17] = 64;
        
        // do stuff after block indices section;
        int after_i_in  = found_data_i + 4 + 16*16*16*4*2;
        int after_i_out = found_data_i + 4 + 256*64*64*4*2;
        int diff = after_i_out - after_i_in;
        for(int i = after_i_out; i < size; i++){
            my_txt[i] = awe_txt[i - diff];
        }
        
        // now the data!
        for(int i = 0; i < (1 << 24); i++){
            int ii = found_data_i + 4 + i * 4;
            my_txt[ii    ] = 0;
            my_txt[ii + 1] = 0;
            my_txt[ii + 2] = 0;
            my_txt[ii + 3] = be3[i];
        }
        // and the ffs at the end;
        for(int i = 0; i < (1 << 24); i++){
            int ii = found_data_i + 4 + (i + (1 << 24)) * 4;
            my_txt[ii    ] = 0xff;
            my_txt[ii + 1] = 0xff;
            my_txt[ii + 2] = 0xff;
            my_txt[ii + 3] = 0xff;
        }
        
        fout.close();
    }
    
}



/*
g++ aasb.cpp -O6 -o aasb.exe

*/


