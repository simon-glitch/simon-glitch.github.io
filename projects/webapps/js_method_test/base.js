
// quick dependency setup
// ~> who needs `import`?
const dependencies = [
    // Bloom Filters are very powerful!
    "https://simon-glitch.github.io/2023_bloom.js",
];
for(let url of dependencies){
    const s = document.createElement("script");
    s.src = url;
    document.body.appendChild(s);
}

/**
  * Find the minimum of 2 values.
  * @param {BigInt} v1 1st value
  * @param {BigInt} v2 2nd value
  * @returns {BigInt} the smaller value (the value which is closer to -Infinity)
**/
const bigint_min = function(v1 = 0n, v2 = 0n){
    return (v1 < v2) ?v1 :v2;
};
/**
  * Find the maximum of 2 values.
  * @param {BigInt} v1 1st value
  * @param {BigInt} v2 2nd value
  * @returns {BigInt} the larger value (the value which is closer to +Infinity)
**/
const bigint_max = function(v1 = 0n, v2 = 0n){
    return (v1 > v2) ?v1 :v2;
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
**/
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
        if(length > 0)
            s = s.slice(0, -length) + "." + s.slice(-length);
    }
    
    return (((SIGN > 0) ?"" :"-") + s);
};

/**
  * Store a list of factors in order to represent a number.
  ** This object also stores a list of powers, which the individual factors are exponentiated to.
  * ```
    var f: Factors = {
        bases: BigUint64Array,
        powers: Int16Array,
    }
  * ```
  * @param {Number} length the number of different factors to store
**/
const Factors = class Factors{
    bases = new BigUint64Array();
    powers = new Int16Array();
    constructor(length = 0){
        this.bases = new BigUint64Array(length);
        this.powers = new Int16Array(length);
        this.powers.set(Array(length).fill(1), 0);
    }
    resize(length = 0){
        const B = this.bases;
        const P = this.powers;
        this.bases = new BigUint64Array(length);
        this.powers = new Int16Array(length);
        this.bases.set(B, 0);
        this.powers.set(P, 0);
        
        // fill in powers of "1"
        this.powers.set(Array(length - P.length).fill(1), P.length);
        return this;
    }
    append(bases = [2n], powers = [1]){
        const B = this.bases;
        const P = this.powers;
        const BL = bases.length;
        const PL = powers.length;
        this.bases = new BigUint64Array(BL + B.length);
        this.powers = new Int16Array(BL + B.length);
        this.bases.set(B, 0);
        this.powers.set(P, 0);
        this.bases.set(bases, B.length);
        this.powers.set(powers, P.length);
        
        // fill in powers of "1"
        if(PL < BL){
            this.powers.set(Array(BL - PL).fill(1), P.length + PL);
        }
        return this;
    }
    /**
      * Find the product of the factors stored in this factor list.
      * @param {Number} start index to start the product at;
      * @param {Number} end index to end the product at;
      * @returns {BigInt} the product this object represents;
    **/
    valueOf(start, end){
        const L = this.length;
        const B = this.bases;
        const P = this.powers;
        start = Number(start ?? 0);
        end = Number(end ?? L);
        const S = (start % L) + L % L;
        const E = (end % L) + L % L;
        let res = 1n;
        let i = 0, b = 1n, p = 0;
        for(i = S; i < E; i++){
            b = B[i];
            p = P[i];
            if(p > 0)
                res *= b ** BigInt(p);
        }
        for(i = S; i < E; i++){
            b = B[i];
            p = P[i];
            if(p < 0)
                res /= b ** BigInt(-p);
        }
        return res;
    }
    /**
      * Use `this.bases` as a list of indices within a `source` list.
      * 
      * In JavaScript, that means:
      * `this.bases = this.bases.map(v => source[v])`
      * 
      * In Python (numpy), that means:
      * `this.bases = np.array((source[v] for v in this.bases), dtype=np.int64)`
      * 
      * In desmos, that would mean:
      * `this.bases -> source[this.bases]`
      * @param {BigInt[]} source list of values to pull `this.bases` from;
    **/
    index(source){
        // just a one liner!
        this.bases.set(this.bases.map(v => BigInt(source[v])));
        return this;
    }
    /**
      * Combine `this.index` and `this.valueOf` in one step. This method does not actually mutate `this.bases`, since it is intended for calculating the value of this object.
      * 
      * Process:
      ** Use `this.bases` as a list of indices within the `source` list.
      ** That means mapping `this.bases` to `source`
      ** Find the product of the factors stored in the mapped factor list.
      * 
      * @param {BigInt[]} source list of values to pull `this.bases` from;
      * @param {Number} [start] index (within the mapped `this.bases`) to start the product at;
      * @param {Number} [end] index (within the mapped `this.bases`) to end the product at;
      * @returns {BigInt} the product this object (indexed into `source`) represents;
    **/
    indexedValue(source, start, end){
        const L = this.length;
        const B = this.bases;
        const P = this.powers;
        
        // coerce source to the correct type OR use it directly if it already is the correct type
        /** @type TypedArray */
        const SRC = ((
                (source instanceof BigUint64Array)
                ||(source instanceof BigInt64Array)
            ) ?source :(
                new BigUint64Array(source.length)
                ).set(
                // BigUint64Array does not auto-coerce values to BigInts
                source.map(v => BigInt(v))
            )
        )
        start = Number(start ?? 0);
        end = Number(end ?? L);
        const S = (start % L) + L % L;
        const E = (end % L) + L % L;
        let res = 1n;
        let i = 0, b = 1n, p = 0;
        for(i = S; i < E; i++){
            b = B[i];
            p = SRC[P[i]];
            if(p > 0)
                res *= b ** BigInt(p);
        }
        for(i = S; i < E; i++){
            b = B[i];
            p = SRC[P[i]];
            if(p < 0)
                res /= b ** BigInt(-p);
        }
        return res;
    }
}

/**
  * Store a Number, paired up with its Factors.
  * 
  * This class does not automatically factor the number for you nor do anything fancy.
  * ```
    var f: Factored_Number = {
        value: BigInt,
        factors: Factors,
    }
  * ```
  * @param {Number} value the value to store.
**/
const Factored_Number = class Factored_Number{
    factors = new Factors();
    value = 1n;
    constructor(value = 1n){
        this.value = BigInt(value);
    }
    update(){
        this.value = this.factors.valueOf();
        return this.value;
    }
}

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
    /** the largest value checked so far */
    checked_so_far = 1n;
    /** the average time (in ms) it took the last sieve to check whether each odd number was prime */
    ms_per_check = 0;
    /** the average time (in ms) it took the last sieve to find each prime */
    ms_per_prime = 0;
    /** the minimum value of `ms_per_check` and `ms_per_prime` */
    MS_MIN = 1/128;
    /** the (default) maximum amount `sieve` can spend sieving per call */
    max_time = 16;
    /** the total time that has been spent sieving */
    sieving_time = 0;
    /**
      * @type BigInt[]
      * extra primes, used to tell if a large number is definitely not prime
    **/
    extras = [];
    extras_used = 0;
    
    /**
      * Sorted insertion of a new number into `this.extras`.
      * @param {Number} n number to add to `this.extras`;
      * @returns {Boolean} whether `n` was successfully added
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
      * @param {Number | BigInt} maximum the maximum for sieving (meaning depends on `mode`);
      * @param {String} mode determines how maximum is interpreted;
      * @param {Number} [max_time] the maximum number of miliseconds this individual call to `sieve` can make;
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
    sieve(maximum, mode = "v", max_time){
        const v = this.values;
        const e = this.extras;
        const l = v.length;
        // time keeping
        const t1 = new Date();
        let t2 = new Date();
        let dt = 0;
        max_time ??= this.max_time;
        
        // initialization
        /** @type BigInt[] */
        let news = [];
        let i = 0, val = 0n, d_val_total = 0;
        let max_val = (v[l - 1] **2n), max_i = 0;
        if(mode == "v")
            max_val = bigint_min(max_val, BigInt(maximum)),
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
        val = this.checked_so_far + 2n;
        while(
            (i < max_i) &&
            (val < max_val) &&
            (dt < max_time)
        ){
            // use max_time to predict a max_val
            // currently defaults to a maximum of 2048
            // we actually cut this in half, in order to make it represent the maximum number of odd numbers to check between checking the time
            const time_left = max_time - dt;
            const next_d_val = Math.min(
                time_left / this.ms_per_check,
                Number(max_val - this.checked_so_far)
            ) / 2;
            
            let d_val = 0;
            while(
                (i < max_i) &&
                (val < max_val) &&
                (d_val < next_d_val)
            ){
                if(this.is_prime(val, true)){
                    if(extrad)
                        // reuse sorted insertion
                        this.add_extra(val);
                    else news.push(val);
                    i++;
                }
                val += 2n;
                d_val ++;
            }
            
            d_val_total += d_val;
            
            // check the time
            t2 = new Date();
            dt = t2.getTime() - t1.getTime();
        }
        
        this.__append__(news);
        const LAST = this.values[this.values.length - 1];
        // if `extras` has a larger prime, we will use that value;
        // otherwise, we can reuse `val` in later calls to `sieve`;
        // this allows `sieve` to work on any 
        this.checked_so_far = bigint_max(val, LAST);
        this.ms_per_check = Math.max(
            this.MS_MIN, dt / d_val_total
        );
        this.ms_per_prime = Math.max(
            this.MS_MIN, dt / i
        );
        
        if(extrad){
            this.extras = e;
        }
        
        // console.log({dt});
        
        if(mode == "v") return LAST;
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
      * An asynchronous version of `this.sieve_to`. See `sieve_to` for more information.
      * 
      * I know it doesn't have the `async` keyword, but you can totally call this as `await asieve_to(...)`! This function returns a promise, and promises can be awaited when in async functions.
      * 
      * Similarly, you can also do `asieve_to.then(res => ...)`!
      * 
      * @param {Number | BigInt} maximum ...
      * @param {String} mode ...
      * @param {Object} options additional options:
      ** `options.call_back: Function =` a callback function to run on the result (each frame); `call_back = (res, thisArg) => ...`;
      ** * `res` is the value returned by `this.sieve`;
      ** * `thisArg` is just `this` (the `Primes` object);
      ** `options.max_time: Number =` the number of ms each frame should last; the code will try to make each frame take exactly this number of ms;
      ** `options.mspf: Number =` the number of miliseconds between the starts of each frame; set this higher than `options.max_time` in order to reduce lag and give the program more down time between frames;
      * @returns a promise, which resolves with the same value as sieve to;
    **/
    asieve_to(maximum, mode = "v", options){
        // allow dummies to use my library
        if(this.values.length < 2) this.values = [], this.__append__();
        
        const max_val = (mode == "v") ?BigInt(maximum) :(2n**64n - 1n);
        const max_i   = (mode == "c") ?Number(maximum) :(2 **53  - 1 );
        
        const call_back = options.call_back || options.callback;
        const max_time = (options.maxtime ||
            options.max_time || options.time_max ||
            options.dt ||
            options.max_dt || options.dt_max ||
            this.max_time
        );
        const MSPF = options.mspf || options.MSPF || max_time;
        
        /** @type Number | BigInt */
        let res;
        let val = 0n;
        let i   = 0 ;
        let fid = -1;
        /** @type Function */
        let resolve_f;
        const P = new Promise(resolve => {
            resolve_f = resolve;
        });
        
        let finish_f = () => {
            resolve_f(res);
        };
        
        let ready = true;
        let frame_f = () => {
            if(!ready) return;
            ready = false;
            
            res = this.sieve(maximum, mode, max_time);
            call_back?.(res, this);
            
            // more edge cases
            if(mode == "v") val = res;
            
            i++;
            
            const C_DONE = (mode == "c" && res < 0);
            const DONE = C_DONE || !(val < max_val && this.values.length < max_i);
            if(DONE){
                clearInterval(fid);
                finish_f();
                // just for good measure
                return;
            }
            ready = true;
        }
        
        fid = window.setInterval(frame_f, MSPF);
        
        return P;
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
        /** @type Factors[] */
        const res = [];
        
        const v = this.values;
        const l = v.length;
        let i = 0, j = 0, pi = 0, ppi = 0;
        let val = 0n;
        
        while(val < max && pi < l){
            const resi = new Factored_Number();
            // used for memory efficiency
            /** @type Number[] */
            const resif = [];
            j = 0;
            
            ppi = pi;
            while((resi.value < max) && (pi < l)){
                
                val = v[pi];
                resi.value *= val;
                
                j++;
                pi++;
            }
            if(resi.value >= max) pi--;
            
            if(j < 5) break;
            
            for(j = ppi; j < pi; j++){
                // BigUint64Array does not auto-coerce values to BigInts
                resif.push(BigInt(j));
            }
            resi.factors.append(resif);
            res[i] = resi;
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

const main = async function(){
    primes.append([2,3,5]);
    const TODO = 30_000;
    let total = 0;
    let prev = 0n;
    await primes.asieve_to(TODO, "c", {
        call_back: (res, p) => {
            total += res;
            console.log(
                total + "/" + TODO + " = " +
                (100 * total / TODO).toFixed(2) + "%\n" +
                "last p = " + p.values[p.values.length - 1] + "\n" +
                "desnity = 1 in " + (Number(p.checked_so_far - prev) / res).toPrecision(6) +
                " @ n = " + p.checked_so_far
            );
            prev = p.checked_so_far;
        }
    });
    
    let last = primes.values[primes.values.length - 1]
    
    console.log("last:", last);
    console.log("20! =", factorial(20));
    console.log("20# =", primorial(20));
    
    /*
    console.log("pi _10", to_string_fixed(Math.PI, 10, 53));
    console.log("pi _3 ", to_string_fixed(Math.PI,  3, 80));
    
    console.log("1/3 _10", to_string_fixed(1/3, 10, 54));
    console.log("1/3 _3 ", to_string_fixed(1/3,  3, 80));
    console.log("1/3 _2 ", to_string_fixed(1/3,  2, 200));
    
    const r = Math.random();
    console.log("random _10", to_string_fixed(r, 10, 60));
    console.log("random _2 ", to_string_fixed(r,  2, 200));
    console.log("random _16", to_string_fixed(r, 16, 50));
    
    const inf = ((2**53 - 1) * 2) * 2**(1023 - 53);
    console.log("inf _10", to_string_fixed(inf, 10, 0));
    console.log("inf _2 ", to_string_fixed(inf,  2, 0));
    console.log("inf _3 ", to_string_fixed(inf,  3, 0));
    */
    
    // window.myres = primes.find_primorials();
    // mega_is_prime();
}

main();



