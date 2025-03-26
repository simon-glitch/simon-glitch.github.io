#include <iostream>
#include <cmath>
#include <time.h>
using namespace std;

double big_O(const uint64_t &n){
    return pow(n, 3);
}

const string msgs[14] = {
    "hello!",
    "hi!",
    "hiiii!!!",
    "greetings!",
    "i hope you have a nice day!",
    "wassup?",
    "i am a program!",
    "JavaScript is the best!",
    "try out desmos!",
    "this video is brought to you be R[CBA]D Shad[Oh] Leg[redacted]!",
    "let's go!",
    "it's time to party!",
    "coding is fun!",
    "fellow human, i welcome you into my presence; we shall soon discern whether i am gracing you with my presence, or you are gracing me with yours!"
};

string best_fn(const uint64_t &n){
    const uint64_t no = big_O(n);
    double f = 0.1;
    const double m = 13.1;
    const double p = 1.2;
    for(uint64_t i = 0; i < no; i++){
        // not f = (f + 1) ** p % m;
        // nor f++; f **= p; f %= m;
        f = fmod(pow(f + 1.0, p), m);
    }
    // rounds f down and converts it to an int
    const uint64_t fi = f;
    return msgs[fi];
}

void int_error(const string &string_of_n){
    cerr << "User Syntax Error:\n| your string:\n| > ";
    cerr << string_of_n;
    cerr << "\n| does not follow C++'s [int] formatting rules;\n";
}

uint64_t from_string(const string &string_of_n, bool &succeeded){
    uint64_t n = 0;
    try{
        n = atoi(string_of_n.c_str());
        succeeded = true;
    }
    catch(exception &e){
        int_error(string_of_n.c_str());
        succeeded = false;
    }
    return n;
}

/**
  * ### Program parameters
  * `argv[1] =` the value of `n`; must follow `int` formatting rules
**/
int main(int argc, char *argv[]) {
    clock_t start, end;
    double cpu_time_used;
    
    cout << "n: ";
    
    uint64_t n = 0;
    string ns = "";
    bool n_is_valid = false;
    if(argc >= 2){
        ns = argv[1];
        n = from_string(ns, n_is_valid);
    }
    
    if(n_is_valid){
        cout << n;
    }
    while(!(n_is_valid)){
        cout << "n: ";
        cin >> ns;
        n = from_string(ns, n_is_valid);
    }
    
    // time this script (START)
    start = clock();
    
    // world's best function
    ns = best_fn(n);
    
    // print a nice message
    cout << "\n----\n" << ns << "\n";
    
    // time this script (END)
    end = clock();
    cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC;
    cpu_time_used *= 1000;
    cout << "took " << cpu_time_used << " milliseconds;\n";
    
    return 0;
}



