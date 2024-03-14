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

#define f_of_x(itype, otype, name, exp) \
inline otype name(const itype n){\
    return (exp);\
}
#define f_x(type, name, exp) f_of_x(type, type, name, exp)
#define f2_of_x(type1, type2, name, suff1, suff2, exp)\
f_x(type1, name ## suff1, exp)\
f_of_x(type1, type2, name ## suff2, exp)\
f_of_x(type2, type1, name ## suff1, exp)\
f_x(type2, name ## suff2, exp)
#define f3_of_x(type1, type2, type3, name, suff1, suff2, suff3, exp)\
f2_of_x(type1, type2, name, suff1, suff2, exp)\
f_of_x(type1, type3, name ## suff3, exp)\
f_of_x(type2, type3, name ## suff3, exp)\
f_of_x(type3, type1, name ## suff1, exp)\
f_of_x(type3, type2, name ## suff2, exp)\
f_x(type3, name ## suff3, exp)
#define f4_of_x(type1, type2, type3, type4, name, suff1, suff2, suff3, suff4, exp)\
f3_of_x(type1, type2, type3, name, suff1, suff2, suff3, exp)\
f_of_x(type1, type4, name ## suff4, exp)\
f_of_x(type2, type4, name ## suff4, exp)\
f_of_x(type3, type4, name ## suff4, exp)\
f_of_x(type4, type1, name ## suff1, exp)\
f_of_x(type4, type2, name ## suff2, exp)\
f_of_x(type4, type3, name ## suff3, exp)\
f_x(type4, name ## suff4, exp)


// f4_of_x(uint, ulint, float, double, square,,_l,_f,_d, n * n)
f2_of_x(uint, ulint, square,,_l, n * n)
f2_of_x(uint, ulint, cube,,_l, n * n * n)
f2_of_x(uint, ulint, hycube,,_l, n * n * n * n)

inline bool is_prime(uint p){
    for(auto i = primes.begin(); cube(*i) <= p; i++)
      if(my_modr(p, *i) != p)
        return true;
    for(auto i = primes.begin(); square(*i) <= p; i++)
      if(my_modr(p, *i) != p)
        return true;
}

int main(){
    return 0;
}
