#include <iostream>
#include <vector>
#include <cmath>
#include <ctime>
#include <chrono>
using namespace std;

// I don't need primes larger than 4 billion
typedef uint32_t  uint;
typedef  int32_t  lint;
typedef uint64_t ulint;
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

inline  uint square  (const  uint n){
    return (n * n);
}
inline ulint square_l(const  uint n){
    return (n * n);
}
inline  uint square  (const ulint n){
    return (n * n);
}
inline ulint square_l(const ulint n){
    return (n * n);}
inline  uint cube    (const  uint n){
    return (n * n * n);
}
inline ulint cube_l  (const  uint n){
    return (n * n * n);
}
inline  uint cube    (const ulint n){
    return (n * n * n);
}
inline ulint cube_l  (const ulint n){
    return (n * n * n);}
inline  uint hycube  (const  uint n){
    return (n * n * n * n);
}
inline ulint hycube_l(const  uint n){
    return (n * n * n * n);
}
inline  uint hycube  (const ulint n){
    return (n * n * n * n);
}
inline ulint hycube_l(const ulint n){
    return (n * n * n * n);
}


/**
  * Tells you whether `p` is prime.
  * 
  * Assumes that `p` is odd, since even numbers obviously divide 2. This optimization makes prime sieving twice as fast.
  * 
  * If there aren't currently enough primes to compare `p` to, this function sets `might_be` to `true`.
  * 
  * Therefore, `might_be` is used to report the non-fatal error of not having enough primes. `might_be` being `false` means that the return value is definitely correct. Also, the return value being `true` means the number is [definitely](https://wolframalpha.com) prime.
**/
inline bool is_prime(const uint p){
    vector<uint>::iterator i;
    /*
    the 4 billion-th prime is WAY larger than 32 bits long, obviously;
    in fact, an ascending list of uints with no duplicates can always be indexed with an uint;
    this should be quite obvious;
    */
    uint ii;
    const uint prime_c = primes.size();
    
    // if the loops return false, then it can't be the case that the value might be prime
    bool might_be = false;
    
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

void clear_sieve(){
    curr_comp = 3;
    primes.clear();
}

void sieve_primes_1(const uint max_prime_c){
    // start with 2 and 3
    if(primes.size() == 0) primes.push_back(2), primes.push_back(3);
    // ...
    if(primes.size() >= max_prime_c) return;
    
    // then just start from curr_comp
    while(true){
        if(curr_comp >= comp_limit) break;
        
        curr_comp += 2;
        // as long as `might_be` is false, we know that `is_prime`'s value can be fully trusted
        if(is_prime(curr_comp)){
            primes.push_back(curr_comp);
            // ...
            if(primes.size() >= max_prime_c) return;
        };
    }
    curr_comp -= 2;
}

void sieve_primes_2(const uint max_prime_c){
    // start with 2 and 3
    if(primes.size() == 0) primes.push_back(2), primes.push_back(3);
    // ...
    if(primes.size() >= max_prime_c) return;
    
    // then just start from curr_comp
    while(true){
        if(curr_comp >= comp_limit) break;
        
        curr_comp += 2;
        // as long as `might_be` is false, we know that `is_prime`'s value can be fully trusted
        if(is_prime(curr_comp)){
            primes.push_back(curr_comp);
            // ...
            if(primes.size() >= max_prime_c) return;
        };
    }
    curr_comp -= 2;
}

void sieve_primes_3(const uint max_prime_c){
    // start with 2 and 3
    if(primes.size() == 0) primes.push_back(2), primes.push_back(3);
    // ...
    if(primes.size() >= max_prime_c) return;
    
    // then just start from curr_comp
    while(true){
        if(curr_comp >= comp_limit) break;
        
        curr_comp += 2;
        // as long as `might_be` is false, we know that `is_prime`'s value can be fully trusted
        if(is_prime(curr_comp)){
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
    const uint max_batch_size = 1000*1000;
    const uint max_max_c = 100*1000*1000;
    uint max_c = 0;
    double speed = 10000000000000;
    const double wave_length = 1;
    uint batch_size = max_batch_size;
    
    const chrono::seconds second(1);
    const chrono::microseconds my_unit(1);
    const double my_scale = second / my_unit;
    
    auto time_0 = chrono::system_clock::now();
    auto time_1 = chrono::system_clock::now();
    auto time_2 = chrono::system_clock::now();
    
    // an array of functions
    void (*sieve_primes_f[3])(const uint) = {
        &sieve_primes_1,
        &sieve_primes_2,
        &sieve_primes_3
    };
    
    for(uint i = 0; i < 3; i++){
    for(; true;){
        // make sure we don't have an issue
        if(curr_comp >= comp_limit) break;
        
        batch_size = min(max_batch_size, (uint) (speed * wave_length));
        if(!isfinite(batch_size)) batch_size = max_batch_size;
        max_c += batch_size;
        if(max_c > max_max_c) max_c = max_max_c;
        
        time_1 = time_2;
        sieve_primes_f[i](max_c);
        time_2 = chrono::system_clock::now();
        
        std::cout << "Run time: ";
        std::cout << (double) ((time_2 - time_0) / my_unit) / my_scale;
        std::cout << "s \n";
        
        speed = my_scale * ((double) batch_size) / ((time_2 - time_1) / my_unit);
        std::cout << "Speed: ";
        std::cout << speed;
        std::cout << " per second\n";
        
        std::cout << "Prime # " << max_c;
        std::cout << " = " << primes[max_c - 1];
        std::cout << "\n";
        
        // ain't got RAM for EVERY prime
        if(max_c == max_max_c) break;
    }
    }
    // I don't know what any of these numbers are for
    const ulint limits[] = {
        (0xFFFFFFFF / 0x101),           // 32 bit uint w utf-8
        (0xFFFFFFFF / 0x10001),         // 32 bit uint w utf-16
        (0x7FFFFFFF / 0x101),           // 32 bit int  w utf-8
        (0x7FFFFFFF / 0x10001),         // 32 bit int  w utf-16
        (0xFFFFFFFFFFFFFFFF / 0x101),   // 64 bit uint w utf-8
        (0xFFFFFFFFFFFFFFFF / 0x10001), // 64 bit uint w utf-16
        (0x7FFFFFFFFFFFFFFF / 0x101),   // 64 bit int  w utf-8
        (0x7FFFFFFFFFFFFFFF / 0x10001), // 64 bit int  w utf-16
        (0x800000 / 0x101),             // safe int within (32-bit) float  w utf-8
        (0x800000 / 0x10001),           // safe int within (32-bit) float  w utf-16
        (0x20FFFFFFFFFFFF / 0x101),     // safe int within (64-bit) double w utf-8
        (0x20FFFFFFFFFFFF / 0x10001),   // safe int within (64-bit) double w utf-16
    };
    for(uint i = 1000; i < 12; i++){
        ulint n, p;
        n = limits[i];
        
        // find the largest prime <= n
        for(p = n; !is_prime_64(p); p--);
        cout << "Largest prime up to " << n << ":\n";
        cout << p << "\n";
    }
    
    return 0;
}

/*
the 100,000,000th prime is 2,038,074,743;
* so the largest number i could check in 400 MB was 4,153,748,658,054,516,049;

unfortunately, that's less than 2**63 - 1 and 2**64 - 1
* 2**63 - 1 ==  9,223,372,036,854,775,807
* 2**64 - 1 == 18,446,744,073,709,551,615

i can still check for the other large primes though

according to [this site](  ), these numbers are prime:
* 2**63 - 25 ==  9,223,372,036,854,775,783
* 2**64 - 59 == 18,446,744,073,709,551,557

i guess i can just use those numbers

... wait
... im being dumb

i only need to check up to floor((2**64 - 1) / 101) and smaller
* floor((2**64 - 1) / 0x101) == 71,777,214,294,589,695
* 71 quadrillion is a good bit smaller than my limit of 4 septillion

*/
