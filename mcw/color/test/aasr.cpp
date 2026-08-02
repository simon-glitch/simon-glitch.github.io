/**
 * AASR stands for Awesome Automatic Structure Reader.
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
    std::cout << "Chunk size: " << count << std::endl;
    
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
        std::cout << "Chunk size: " << count << std::endl;
    }
    
    fin.close();
    
    auto fout = std::ofstream(file_out, std::ios_base::binary);
    fout << txt_out;
    fout.close();
    
    delete txt_in;
    delete is_ascii;
}

int main(int argc, char const *argv[]){
    for(int i = 0; i < 50; i++){
        char c = i;
        std::cout << i << "=" << c << "  " << std::endl;
    }
    
    // process_file("base.mcstructure", "base.txt");
    // process_file("grid.mcstructure", "grid.txt");
    // process_file("awesome.mcstructure", "big_awesome.txt");
    // process_file("awet.mcstructure", "awet.txt");
    process_file("wow/wow000.mcstructure", "wow.txt");
    // process_file("biiig.mcstructure", "biiig.txt");
    // process_file("tall.mcstructure", "tall.txt");
    // process_file("tall2.mcstructure", "tall2.txt");
    // process_file("one.mcstructure", "one.txt");
}
