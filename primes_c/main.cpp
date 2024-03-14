#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

// don't need primes larger than 4 billion
typedef unsigned uint;
typedef long long lint;
typedef unsigned long long ulint;
vector<uint> primes;

inline uint my_modr(uint p, uint n){
    uint ln = log2((double) p);
    uint *is = new uint[ln];
    is[0] = p % n;
    // both of these for loops can be torn apart into 64-line switch statements
    for(uint i = 1; i < ln; i++){
        // these ulint conversions are to ensure that this algorithm works correctly for n >= 65536
        is[i] = ((ulint) is[i-1] * (ulint) is[i-1]) % (ulint) n;
    }
    inline uint res = 1;
    // both of these for loops can be torn apart into 64-line switch statements
    for(uint i = 1; i < ln; i++){
        /*
        Another way to right this:
          bool do_mul = n & (1 << i);
          res = (res*((is[i] * do_mul + !do_mul))) % n;
        */
        res = (res*((n & (1 << i)) ?is[i] :1)) % n;
    }
    return res;
}

inline uint cube(const uint n){
    return n * n * n;
}
inline ulint cube(const ulint n){
    return n * n * n;
}
inline ulint cube2(const uint n){
    return n * n * n;
}

inline bool is_prime(uint p){
    for(auto i = primes.begin(); cube(*i) <= p; i++){
        
    }
}

int main(){
    return 0;
}
