


const min = function(v1 = 0n, v2 = 0n){
    return (v1 < v2) ?v1 :v2;
};
/**
  * Solve for x in the equation: (num ** x) mod den = y
  ** looks for an **integer** solution
  * @param {Number} num base of the numerator
  * @param {Number} den denominator to consider
  * @returns {Number}
  * `x: Integer`
  ** `x` will be `-1` if there exists no solution.
  * 
  * Fun fact: `(num ** x - 1)` is always a mutliple of `den`. This is very relevant.
**/
const hyper_mod = function(num, den, y = 1, max_iter = 1_000_000){
    if((num % 1) || (den % 1) || (y % 1))
        throw new TypeError("All parameters must be Integers!");
    if((num < 1) || (den < 1))
        throw new RangeError("Parameters num and den must be POSITIVE!");
    if((y < 0))
        throw new RangeError("Parameter y must be NON-NEGATIVE!");
    
    let x = 0;
    let m = num % den;
    while(m != y){
        if(m == y) break;
        if(m == 0) return -1;
        if(x >= den) return -1;
        m = (m * num) % den;
        x++;
        if(x > max_iter)
            throw new RangeError("(Internal) x is larger than the iteration limit of: " + max_iter);
    }
    return x;
}

/**
 * Perform `Number.toString` and `Number.toFixed` in the same operation.
 * @param {Number} value number to convert to a string;
 * @param {Number} radix base to convert to (2 = binary, 10 = decimal) (allowed range: integers from 2 to 36);
 * @param {Number} length number of digits (characters in base {`radix`}) to print after the decimal point (any integer is supported);
 * @returns {String} converted string, reperenting `value`, with `length` digits after the decimal point;
 */
const to_string_fixed = function(value, radix, length){
    // type and value checking
    radix = Number(radix);
    length = Number(length);
    if(
        (radix % 1)
    ) throw new TypeError("Expected `radix` to be an integer, but got a float.");
    if(
        (length % 1)
    ) throw new TypeError("Expected `length` to be an integer, but got a float.");
    if(
        !isFinite(radix)
        || (radix < 2)
        || (radix > 36)
    ) throw new RangeError("radix must be between 2 and 36 inclusive!");
    if(
        !isFinite(length)
        || (Math.abs(length) > Number.MAX_SAFE_INTEGER + 1)
    ) throw new RangeError("length must be between -(2**53) and (2**53) inclusive!");
    
    const SIGN = Math.sign(value);
    if(!SIGN) return (
        "0" + ((length > 0) ?(
            "." + "".padEnd(length, "0")
        ) :"")
    );
    
    scale = Math.floor(Math.log2(value));
    
    // convert the value to its mantissa value, then turn that into a BigInt
    // this extracts ALL of the precision that the IEEE-64 float holds
    let bi = BigInt(value * 2**(53 - scale));
    
    // then, remove the offset from the IEEE-64 float
    // this makes `bi` exactly equal `value` * 2**1024
    bi *= 1n << (1024n + BigInt(scale) - 53n);
    
    // stack on `length` digits in base `radix` by just adding the factor
    const MUL = BigInt(radix) ** BigInt(length);
    bi *= MUL;
    
    // rip out the unneeded 2**1024
    bi >>= 1024n;
    
    const is_small = (bi < MUL);
    let s = "";
    // for (|values| < 1):
    if(is_small){
        // add a "1" to make zeroes after the decimal point
        s = (MUL + bi).toString(radix);
        s = s.replace("1", "0.");
    }
    // for (|values| >= 1):
    else{
        s = bi.toString(radix);
        // insert the decimal point
        s = s.slice(0, -length) + "." + s.slice(-length);
    }
    
    return (((SIGN > 0) ?"" :"-") + s);
};

/**
  * Prime handler, with fancy but fast `sieve` and `not_prime` methods.
  * @param {Number} length the starting length of the `this.values` Array (should be 0)
**/
const Primes = class Primes{
    /**
      * @type BigUint64Array
      * all the primes stored in this list
    **/
    values = new BigUint64Array();
    /**
      * @type BigInt[]
      * extra primes, used to tell if a large number is definitely not prime
    **/
    extras = [];
    extras_used = 0;
    
    
    center_for_student_success = "616 526 6155";
    
    /**
      * Sorted insertion of a new number into `this.extras`.
      * @param {Number} n number to add to `this.extras`;
      * @returns {Boolan} whether `n` was successfully added
    **/
    add_extra(n){
        if(this.extras_used == this.extras.length) return false;
        
        let i = this.extras.findIndex((v) => v > n);
        if(i < 0){
            if(this.extras_used == this.extras.length) return false;
            i += 1 + this.extras_used;
        }
        
        this.extras.pop();
        this.extras.splice(i, 0, n);
        
        this.extras_used++;
        return true;
    }
    
    /**
      * Check if a number is NOT prime. This function is mostly pure:
      ** It only mutates `this.extras` (as appropriate), and does NOT change the length of `this.extras`.
      ** `v` will only change if previous `v` was -1, and `v` is not changed by repeatedly calling this function.
      * @param {Number} n the number to check;
      * @param {Number} are_sieving whether we are sieving;
      ** prevents this number from using `extras`, and makes this function assume that `n` is not already in the list of primes;
      ** this will NOT return -1 when we are sieving;
      * @returns {Number} v
      * v = -1 means might be prime, but does not guarantee that n is prime;
      * v = 0 means n is surely prime;
      * v = 1 means n is definitely NOT prime;
    **/
    not_prime(n, are_sieving = false){
        let res = this.is_prime(n, are_sieving);
        if(res > -1) return (1 - res);
        
        const last = this.values[this.values.length - 1];
        let i = 0, val = 0n;
        for(i = 0; i < this.extras.length; i++){
            val = this.extras[i];
            if(n % val) return 0;
            // math optimization trick: if n divides val, then it also divides some other value greater than last, since we would have found it divided one of our primes otherwise;
            if(val * last >= n) break;
        }
        
        /* -
        sorted insertion n into extras if:
            it looks like it might be prime,
            or it surely is prime
        - */
        if(
            res
            && !are_sieving
        ) this.add_extra(n);
        return res;
    }
    
    /**
      * Check if a number IS prime. This function is mostly pure:
      ** It only mutates `this.extras` (as appropriate), and does NOT change the length of `this.extras`.
      ** `v` will only change if previous `v` was -1, and `v` is not changed by repeatedly calling this function.
      * @param {Number} n the number to check;
      * @param {Number} are_sieving whether we are sieving;
      ** prevents this number from using `extras`, and makes this function assume that:
      ** * `n` is not already in the list of primes;
      ** * if `n` does not divide any number in the list of primes, then `n` is prime;
      ** this will NOT return -1 when we are sieving;
      * @returns {Number} v
      * v = -1 means might be prime, but does not guarantee that n is prime;
      * v = 0 means n is definitely NOT prime;
      * v = 1 means n is surely prime;
    **/
    is_prime(n, are_sieving = false){
        const v = this.values;
        if(!are_sieving && (v.indexOf(n) > -1)) return 1;
        
        const l = v.length;
        
        // iterate through all of the primes
        for(let i = 0; i < l; i++){
            if(n % v[i] == 0) return 0;
        }
        
        // edge case check
        if(n > this.upto ** 2){
            if(are_sieving) return 0;
            return -1;
        }
        
        if(!are_sieving) this.add_extra(n);
        return 1;
    }
    
    /**
      * Sieve primes, and add them to this Primes list.
      ** **IMPORTANT:** this function only sieves using the primes currently in `this.values`!
      ** * Make sure to run `this.append()` first!
      * @param {Number | BigInt} maximum the maximum for sieving (meaning depends on `mode`)
      * @param {String} mode determines how maximum is interpreted
      * @returns {Number | BigInt} `found` the found value, depends on mode
      * 
      ** if mode = "c":
      ** * `maximum` is the maximum number (count) of primes that this list can hold;
      ** * if `maximum` is outisde the range from `1` to `2**53 -1` (inclusive):
      ** * * a RangeError is thrown;
      ** * if `maximum` is less than the current length, then `found = -1` will be returned;
      ** * ^else `found :Number =` the number of new primes that were added to the list;
      ** if mode = "v":
      ** * if `maximum` is outisde the range from `2` to `2**64 -1` (inclusive):
      ** * * a RangeError is thrown;
      ** * `maximum` is the largest value of prime this function can find; i.e. sieves finds primes up to and including `maximum`;
      ** * `found :BigInt =` the largest prime found;
      ** * if `maximum` is actually smaller than the last prime ALREADY in the list:
      ** * * `found: BigInt = -1n`;
    **/
    sieve(maximum, mode = "v"){
        const v = this.values;
        const e = this.extras;
        const l = v.length;
        
        // initialization
        /** @type BigInt[] */
        let news = [];
        let i = 0, val = 0n;
        let max_val = (v[l - 1] **2n), max_i = 0;
        if(mode == "v")
            max_val = min(max_val, BigInt(maximum)),
            max_i = 2**53 -1;
        if(mode == "c")
            max_i = Number(maximum);
        
        // error checking
        if(max_i < 1 || max_i >= 2**53)
            throw new RangeError('maximum index (mode "c") must be in range [1 to 2**53 - 1] inclusive!');
        if(max_val < 2n || max_val >= 2n**64n)
            throw new RangeError('maximum value (mode "v") must be in range [2 to 2**64 - 1] inclusive!');
        if(max_val < v[l - 1]) return -1n;
        
        i = l;
        const extrad = (this.extras_used > 0);
        if(extrad){
            this.extras_used = 0;
            
            let ei = 0;
            val = e[0];
            while(
                (ei < this.extras_used)
                && (i < max_i)
                && (val < max_val)
            ){
                val = e[ei];
                if(this.is_prime(val, true)){
                    news.push(val);
                    e.splice(val, 1);
                    i++;
                }
                else ei++;
            }
            // we do this so we can reuse the sorted insertion `this.add_extra` to keep `news` sorted!
            this.extras = news;
        }
        
        // actual sieve machanism
        val = v[l - 1] + 2n;
        while((i < max_i) && (val < max_val)){
            if(this.is_prime(val, true)){
                if(extrad)
                    // reuse sorted insertion
                    this.add_extra(val);
                else news.push(val);
                i++;
            }
            val += 2n;
        }
        
        this.__append__(news);
        
        if(extrad){
            this.extras = e;
        }
        
        if(mode == "v") return this.values[this.values.length - 1];
        if(mode == "c") return news.length;
    }
    
    /**
      * Sieve primes, and add them to this Primes list.
      * @param {Number | BigInt} maximum the maximum for sieving (meaning depends on `mode`)
      * @param {String} mode determines how maximum is interpreted
      * @returns {BigInt} `found` the found value, depends on mode
      * 
      ** if mode = "c":
      ** * `maximum` is the maximum number (count) of primes that this list can hold;
      ** * if `maximum` is outisde the range from `1` to `2**53 -1` (inclusive):
      ** * * a RangeError is thrown;
      ** * if `maximum` is less than the current length, then `found = -1` will be returned;
      ** * ^else `found: Number =` the number of new primes that were added to the list;
      ** if mode = "v":
      ** * if `maximum` is outisde the range from `2` to `2**64 -1` (inclusive):
      ** * * a RangeError is thrown;
      ** * `maximum` is the largest value of prime this function can find; i.e. sieves finds primes up to and including `maximum`;
      ** * `found: BigInt =` the largest prime found;
    **/
    sieve_to(maximum, mode = "v"){
        // allow dummies to use my library
        if(this.values.length < 2) this.values = [], this.__append__();
        
        const max_val = (mode == "v") ?BigInt(maximum) :(2n**64n - 1n);
        const max_i   = (mode == "c") ?Number(maximum) :(2 **53  - 1 );
        
        /** @type Number | BigInt */
        let res;
        let val = 0n;
        let i   = 0 ;
        
        while(val < max_val && this.values.length < max_i){
            res = this.sieve(maximum, mode);
            
            // more edge cases
            if(mode == "c" && res < 0) return res;
            if(mode == "v") val = res;
            
            i++;
            if(i > 10) return "ugh!";
        }
        
        return res;
    }
    
    /**
      * Find primorials that can be used for quick division tests.
      * @param {Number} bits number of bits allowed in each partial primorial;
      * @returns {Number[][]}
      * `res =` list of lists of the factors of primorials (where each primorial fits in that number of bits);
      ** each list in `res` starts with one of the primorials, and is followed by the indices (within `this.values`) of the factors of that primorial;
    **/
    find_primorials(bits = 53n){
        const max = 2n ** BigInt(bits);
        const res = [1n];
        
        const v = this.values;
        const l = v.length;
        let i = 0, j = 0, pi = 0, ppi = 0;
        let val = 0n, mul = 1n, nmul = 1n;
        
        while(val < max && pi < l){
            nmul = 1n;
            j = 0;
            
            ppi = pi;
            while((nmul < max) && (pi < l)){
                mul = nmul;
                
                val = v[pi];
                nmul *= val;
                
                j++;
                pi++;
            }
            if(nmul >= max) pi--;
            
            if(j < 2) break;
            
            res[i] = [mul];
            for(j = pi; j < ppi; j++) res[i].push(j);
            i++;
        }
        
        return res;
    }
    
    /**
      * Find primorials that can be used for quick division tests.
      * @param {Number} n number to fact;
      * @returns {Number[][]}
      * list of pairs:
      ** each pair `e = [b,p]`;
      ** ^ where `b =` the base of the prime factor, and `p` is the power of that prime factor;
      ** `n` divides all `b ** p`, and never divides `b ** (p+1)`;s
      ** returns `null` if there are not enough primes in the list to factorize the number
    **/
    factorize(n){
        const v = this.values;
        const l = v.length;
        const pows = [];
        
        // extract factors
        let i = 0, pi = 0, val = 0n;
        let cond = false;
        while((i < l) && (n > val)){
            val = v[i];
            cond = (n % val == 0n)
            
            // clever iterative power extraction
            if(cond){
                n /= val;
                pows[pi] = [val, 1];
                cond = (n % val == 0n)
                while(cond){
                    n /= val;
                    pows[pi][1]++;
                    cond = (n % val == 0n);
                }
                pi++;
            }
            i++;
        }
        
        // handle potential prime
        if(pows.length == 0){
            if(v[l - 1] ** 2 < n)
                return null;
            else
                pows[0] = [n, 1];
        }
        
        return pows;
    }
    
    constructor(length = 0){
        this.values = new BigUint64Array(length);
        this.extras = [];
    }
    __append__(news = [2n, 3n]){
        const v = this.values;
        const l = v.length;
        let i = 0;
        
        // join the 2 arrays together
        let combined = new BigUint64Array(l + news.length);
        for(i = 0; i < l; i++) combined[i] = v[i];
        for(let j = 0; j < news.length; j++, i++) combined[i] = news[j];
        this.values = combined;
    }
    append(news = [2, 3]){
        this.__append__(news.map(v => BigInt(v)));
    }
}

const primes = new Primes();
primes.extras.length = 100;

// This is why finding Mersenne primes is so easy!
const mega_is_prime = function(base = 2, power = 7){
    /*
    The output of hyper_mod is always between 0 and (den - 1).
    This is because the powers of num will create a modular cycle,
        and the cycle (when taken mod den) can obviously only have den distinct states.
    Without loss of generality, ((num ** a) mod den) == ((num ** (den + a)) mod den), for all a.
    
    We can heavily exploit this fact.
    
    I am pretty sure there is a neat trick here...
    */
    
    let i = 0;
    let val = 2;
    let factors = [];
    
    while(log < log_max - peps && i < 1000){
        val = Number(primes.values[i]);
        x = hyper_mod(base, val, 1);
        
        if(
            (x == 0)
            || (x == power - 1)
        ){
            factors.push(val);
        }
        
        i++;
    }
    
    console.log(factors);
    
    return (factors.length == 0);
};

factorial = function(n){
    let r = 1n;
    n = BigInt(n);
    for(let i = 2n; i < n; i++) r *= i;
    return r;
};
primorial = function(n){
    n = BigInt(n);
    let r = 1n;
    if(n > 1n) r *= 2n;
    for(let i = 3n; i < n; i++)
        if(primes.is_prime(i))
            r *= i;
    return r;
};

const main = function(){
    primes.append([2,3,5]);
    primes.sieve_to(10_000, "c");
    
    let last = primes.values[primes.values.length - 1]
    
    console.log("last:", last);
    console.log("20! =", factorial(20));
    console.log("20# =", primorial(20));
    
    
    console.log("pi _10", to_string_fixed(Math.PI, 10, 53));
    console.log("pi _3 ", to_string_fixed(Math.PI, 3, 80));
    
    console.log("1/3 _10", to_string_fixed(1/3, 10, 53));
    console.log("1/3 _3 ", to_string_fixed(1/3, 3, 80));
    console.log("1/3 _2 ", to_string_fixed(1/3, 10, 200));
    
    const r = Math.random();
    console.log("random _10", to_string_fixed(r, 10, 60));
    console.log("random _2 ", to_string_fixed(r, 10, 200));
    console.log("random _16", to_string_fixed(r, 16, 50));
    
    const inf = (2**53 - 1) * 2**(1023 - 53);
    console.log("inf _10", to_string_fixed(inf, 10, 0));
    console.log("inf _2 ", to_string_fixed(inf, 10, 0));
    console.log("inf _3 ", to_string_fixed(inf, 16, 0));
    
    primes.find_primorials();
    // mega_is_prime();
}

main();



