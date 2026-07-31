
/*
I've implemented combinations with repetitions several times in order to find dye combinations for the Minecraft Wiki. I'm doing it again now! But this time lets use a CLASS, since it will get optimized into ultra-efficient code.
*/

#include <vector>
using std::vector;

// this is infinitely annoying; gcc has a BUILTIN type named "ulong", but for some reason Intellisense is not identifying it; truly beyond confusing;
typedef unsigned long long ulng;
typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

class CWR{
public:
    /** See je.cpp::je::Color_Recipes. */
    vector<uint> dyes;
    CWR(){
        gen();
    }
    void gen(){
        dyes = vector<uint>();
        uchar indices[8];
        for(uchar dye_c = 1; dye_c <= 8; dye_c++){
            for(uchar i = 0; i < dye_c; i++){
                indices[i] = 0;
            }
            while(true){
                uchar carry_place = dye_c - 1;
                // carry if needed
                while(carry_place > 0 && indices[carry_place] == 16){
                    indices[carry_place] = 0;
                    carry_place--;
                }
                // highest digit maxes out -> end of loop;
                if(indices[carry_place] == 16) break;
                // uncarry, making sure that all later indices are in ascending order; this simultaneously removes duplicate combinations, while allowing for repetitions;
                while(carry_place < dye_c - 1){
                    indices[carry_place + 1] = indices[carry_place];
                    carry_place++;
                }
                // now add the combination to the list;
                uint formatted = 0;
                bool all_zero = indices[0] == 0;
                for(uchar i = 1; i < dye_c; i++){
                    // this code was written by an autistic man at 8 in the morning who hasn't slept all morning;
                    all_zero = all_zero && indices[i] == 0;
                    // just store the diff; edge case for zeroes explained in je.cpp;
                    formatted = formatted * 16 + indices[i] - indices[i - 1];
                }
                if(all_zero){
                    formatted = (0xf0 | (dye_c + 1)) << 24;
                }
                else if(dye_c < 8){
                    formatted = formatted * 16 + (16 - indices[carry_place]);
                }
                dyes.push_back(formatted);
                // now incremenet; we have to carry next loop because there just isn't any other way to do this; i've written this code like 8 times, trust me;
                indices[carry_place]++;
            }
        }
    }
};

/*
int main(int argc, char const *argv[]){
    auto cwr = new CWR();
    cwr->gen();
    std::cout << "cwr: " << cwr->size << std::endl;
    return 0;
}
*/


