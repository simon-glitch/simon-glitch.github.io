#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

// I don't need primes larger than 4 billion
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
    uint res = 1;
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

/**
  * Tells you whether `p` is prime.
  * 
  * Assumes that `p` is odd, since even numbers obviously divide 2. This optimization makes prime sieving twice as fast.
  * 
  * If there aren't currently enough primes to compare `p` to, this function sets `might_be` to `true`.
  * 
  * Therefore, `might_be` is used to report the non-fatal error of not having enough primes. `might_be` being `false` means that the return value is definitely correct. Also, the return value being `true` means the number is [definitely](https://wolframalpha.com) prime.
**/
inline bool is_prime(const uint p, bool &might_be){
    vector<uint>::iterator i;
    /*
    the 4 billion-th prime is WAY larger than 32 bits long, obviously;
    in fact, an ascending list of uints with no duplicates can always be indexed with an uint;
    this should be quite obvious;
    */
    uint ii;
    const uint prime_c = primes.size();
    
    // if the loops return false, then it can't be the case that the value might be prime
    might_be = false;
    
    /*
    for(i = primes.begin() + 1, ii = 1; ii < prime_c && cube_l(*i) <= p; i++, ii++)
      if(my_modr(p, *i) != p)
        return false;
    cout << p << " requires the divisibility test.\n";
    // cout << "";
    // cout << "";
    // cout << "";
    // cout << "";
    // cout << "";
    */
    for(
        i = primes.begin() + 1, ii = 1;
        ii < prime_c && square_l(*i) <= p;
        i++, ii++
    )
        if(p % (*i) == 0)
            return false;
    
    might_be = (ii == prime_c);
    // base case: all tests were passed AND it's not the case that this MIGHT BE prime
    return !might_be;
}

inline bool is_prime_64(const ulint p){
    vector<uint>::iterator i;
    uint ii;
    const uint prime_c = primes.size();
    
    // if the loops return false, then it can't be the case that the value might be prime
    bool might_be = false;
    
    for(
        i = primes.begin(), ii = 1;
        ii < prime_c && square_l(*i) <= p;
        i++, ii++
    )
        if(p % (*i) == 0)
            return false;
    
    might_be = (ii == prime_c);
    // base case: all tests were passed AND it's not the case that this MIGHT BE prime
    return !might_be;
}


// Largest odd composite found so far
uint curr_comp = 3;
uint comp_limit = 0xFFFFFFFD;
void sieve_primes(const uint max_prime_c){
    // start with 2 and 3
    if(primes.size() == 0) primes.push_back(2), primes.push_back(3);
    // ...
    if(primes.size() >= max_prime_c) return;
    
    bool might_be = false;
    // then just start from curr_comp
    while(!might_be){
        if(curr_comp >= comp_limit) break;
        
        curr_comp += 2;
        // as long as `might_be` is false, we know that `is_prime`'s value can be fully trusted
        if(is_prime(curr_comp, might_be)){
            primes.push_back(curr_comp);
            // ...
            if(primes.size() >= max_prime_c) return;
        };
    }
    curr_comp -= 2;
}

string vec_to_str(vector<uint> v, const string &sep = ", "){
    string res = "";
    if(v.size() == 0) return res;
    res += to_string(v[0]);
    for(auto i = v.begin() + 1; i != v.end(); i++){
        res += sep;
        res += to_string(*i);
    }
    return res;
}

int main(const int argc, char *argv[]){
    if(argc >= 2){
        sieve_primes(10*1000*1000);
        sieve_primes(10*1000*1000);
        sieve_primes(10*1000*1000);
        cout << "Number of primes found:\n";
        cout << primes.size() << "\n";
        cout << "Largest prime found:\n";
        cout << primes[primes.size() - 1] << "\n";
        
        ulint n, p;
        n = atoi(argv[1]);
        
        // find the largest prime <= n
        for(p = n; !is_prime_64(p); p--);
        cout << "Largest prime up to " << n << ":\n";
        cout << p << "\n";
        return 0;
    }
    
    cout << vec_to_str(vector<uint>({1, 2, 3, 4, 5, 6})) << "\n";
    
    primes = vector<uint>();
    
    sieve_primes(2);
    cout << "Current comp = " << curr_comp << "\n";
    cout << "Prime count: " << primes.size() << "\n";
    cout << vec_to_str(primes, ", ") << "\n";
    cout << "Largest prime: " << to_string(*(primes.end() - 1)) << "\n";
    
    sieve_primes(3);
    cout << "Current comp = " << curr_comp << "\n";
    cout << "Prime count: " << primes.size() << "\n";
    cout << vec_to_str(primes, ", ") << "\n";
    cout << "Largest prime: " << to_string(*(primes.end() - 1)) << "\n";
    
    /*
    cout << "81^2 = " << square_l(81U) << "\n";
    cout << "101^2 = " << square_l(101U) << "\n";
    cout << "125^2 = " << square_l(125U) << "\n";
    cout << "1001^2 = " << square_l(1001U) << "\n";
    cout << "7^3 = " << cube_l(7U) << "\n";
    cout << "101^3 = " << cube_l(101U) << "\n";
    cout << "1001^3 = " << cube_l(1001U) << "\n";
    /* */
    
    /*
    bool maybe = false;
    cout << (string) "5 " + (is_prime(5, maybe)? (maybe ?"might be": "is not") :"is") + " prime.\n";
    cout << (string) "7 " + (is_prime(7, maybe)? (maybe ?"might be": "is not") :"is") + " prime.\n";
    cout << (string) "9 " + (is_prime(9, maybe)? (maybe ?"might be": "is not") :"is") + " prime.\n";
    cout << (string) "11 " + (is_prime(11, maybe)? (maybe ?"might be": "is not") :"is") + " prime.\n";
    cout << (string) "13 " + (is_prime(13, maybe)? (maybe ?"might be": "is not") :"is") + " prime.\n";
    /* */
    
    sieve_primes(10);
    cout << "Current comp = " << curr_comp << "\n";
    cout << "Prime count: " << primes.size() << "\n";
    cout << vec_to_str(primes, ", ") << "\n";
    cout << "Largest prime: " << to_string(*(primes.end() - 1)) << "\n";
    
    /*
    sieve_primes(50);
    cout << "Current comp = " << curr_comp << "\n";
    cout << "Prime count: " << primes.size() << "\n";
    cout << vec_to_str(primes, ", ") << "\n";
    cout << "Largest prime: " << to_string(*(primes.end() - 1)) << "\n";
    /* */
   
    return 0;
}
