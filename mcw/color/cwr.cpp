
/*
I've implemented combinations with repetitions several times in order to find dye combinations for the Minecraft Wiki. I'm doing it again now! But this time lets use a CLASS, since it will get optimized into ultra-efficient code.
*/

// #include <iostream>

// this is infinitely annoying; gcc has a BUILTIN type named "ulong", but for some reason Intellisense is not identifying it; truly beyond confusing;
typedef unsigned long long ulng;
typedef unsigned int uint;
typedef unsigned short ushort;
typedef unsigned char uchar;

class CWR{
public:
    // now, I don't rmember the formula for CWR, and I don't wanna use vector bc for some reason my VS Code is not liking imports; probably because I am offline;
    // maybe I can fix the latter issue when I get back oneline;
    uint capacity = 2;
    uint size = 0;
    /** we can store all dyes in 64 bits, by storing how many of each dye there is; this has a limit of 16 of each dye; */
    ulng* dyes;
    /** limit for how items total can be in the combination (2 red dye + 5 blue dye = 7 items); */
    uchar lim_total = 8;
    /** limit for how many of each dye can be in the combination; */
    uchar lim_each = 2;
    CWR(){
        dyes = new ulng[capacity]{0};
    }
    void add(ulng dyem){
        if(size == capacity){
            ulng* copy = dyes;
            uint copy_capacity = capacity;
            capacity *= 2;
            dyes = new ulng[capacity]{0};
            for(uint i = 0; i < copy_capacity; i++){
                dyes[i] = copy[i];
            }
        }
        dyes[size] = dyem;
        size++;
    }
    ulng dyem_c = 0;
    uchar dyem_tl = 0;
    uchar dyem_i = 0;
    bool done = false;
    void down(){
        uchar v = (dyem_c & ((ulng) 0xf << (4 * dyem_i))) >> (4 * dyem_i);
        v++;
        dyem_tl++;
        // if we exceed the limit, carry;
        if(v > lim_each || dyem_tl > lim_total){
            dyem_tl -= v;
            dyem_c &= ~(((ulng) 0xf) << (4 * dyem_i));
            left();
            if(!done) add(dyem_c);
        }
        else{
            dyem_c &= ~(((ulng) 0xf) << (4 * dyem_i));
            dyem_c |= ((ulng) v) << (4 * dyem_i);
            add(dyem_c);
        }
    }
    void left(){
        if(dyem_i >= 15){
            done = true;
            return;
        }
        dyem_i++;
        down();
        dyem_i--;
    }
    void gen(){
        while(!done){
            // std::cout << "dyes: " <<
            // ((dyem_c & 0xf000000000000000) >> 60) << "," <<
            // ((dyem_c & 0x0f00000000000000) >> 56) << "," <<
            // ((dyem_c & 0x00f0000000000000) >> 52) << "," <<
            // ((dyem_c & 0x000f000000000000) >> 48) << "," <<
            // ((dyem_c & 0x0000f00000000000) >> 44) << "," <<
            // ((dyem_c & 0x00000f0000000000) >> 40) << "," <<
            // ((dyem_c & 0x000000f000000000) >> 36) << "," <<
            // ((dyem_c & 0x0000000f00000000) >> 32) << "," <<
            // ((dyem_c & 0x00000000f0000000) >> 28) << "," <<
            // ((dyem_c & 0x000000000f000000) >> 24) << "," <<
            // ((dyem_c & 0x0000000000f00000) >> 20) << "," <<
            // ((dyem_c & 0x00000000000f0000) >> 16) << "," <<
            // ((dyem_c & 0x000000000000f000) >> 12) << "," <<
            // ((dyem_c & 0x0000000000000f00) >> 8) << "," <<
            // ((dyem_c & 0x00000000000000f0) >> 4) << "," <<
            // ((dyem_c & 0x000000000000000f)) << "=" <<
            // ((uint) dyem_tl) << " at " <<
            // ((uint) dyem_i) <<
            // std::endl;
            down();
        }
    }
};

CWR* pregen(){
    auto cwr = new CWR();
    cwr->gen();
    return cwr;
}

/*
int main(int argc, char const *argv[]){
    auto cwr = new CWR();
    cwr->gen();
    std::cout << "cwr: " << cwr->size << std::endl;
    return 0;
}
*/


