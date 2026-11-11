/**
 * This is just an idea I had for doing weighted sampling / randomness.
 * - The items of the sample are indices. So let's say you have some array `arr` and you want a random sample.
 * - `arr.sampler = new Weighted_Sampler(arr.length, weights);`
 * - `arr.sampler.sample(size)` returns a list of length size, with unique elements; each element is an integer from `0` to `arr.length-1`
 * - to map indices to actual items in `arr`, do this:
 * - `const sample = arr.sampler.sample(size).map(i => arr[i]);`
 */
class Weighted_Sampler{
    /**
     * @param {Number} size (positive integer) the number of indices to sample from;
     * @param {Number[]} weights the weight of each index; only use this class if you need the indices to be weighted;
     */
    constructor(size, weights){
        size = Number(size);
        if(!isFinite(size) || size <= 0){
            throw TypeError("Size must be a positive integer (not 0).");
        }
        if(size >= 0x10000000){
            throw TypeError("Size must be less than 2**28 (268435456). Why? Because if you have that many items you should use a programming language that is not JavaScript.");
        }
        
        if(!weights?.[Symbol.iterator]){
            throw TypeError("Weights must be an array or iterable.");
        }
        /** @type {Number[]} */
        this.weights = [];
        let i = 0;
        for(let weight of weights){
            weight = Number(weight);
            if(!isFinite(weight) || weight < 0){
                throw TypeError(`Weight (weights[${i}]) must be a positive number (0 is allowed, but NaN and Infinity are not).`);
            }
            this.weights.push(weight);
            i++;
        }
        if(i !== size){
            throw TypeError(`Weights had insufficient items. Expected ${size} but only got ${i}.`);
        }
        /** @type {Number} */
        this.size = size;
        /** @type {Number[]} */
        this.ids = [];
        // this.ids = Array(size).fill(0).map((_,i) => i); also works but that's obtuse and inefficient;
        for(let i = 0; i < this.size; i++) this.ids[i] = i;
    }
    // mulitplies the number of items that are added on the sample pass; smaller = slower but should be more accurate;
    base_mul = 0.5;
    /**
     * This is where my idea is. It's very inefficient, but the point it's the idea I had, so I'm going to just make it. It's good programming exercise.
     * - repeatedly calling this function is inefficient, but it shuffles the list around, which is cool;
     * @param {Number} size how many indices will be in the sample; obviously must be less than `this.size` (i.e. `arr.length`);
     */
    sample(size){
        if(!(size <= this.size)){
            throw new RangeError(`I can't take a sample of ${size} items out of ${this.size}.`);
        }
        const mul = size * this.base_mul / this.weights.reduce((a,b) => a+b);
        const chances = this.weights.map(w => w * mul);
        let start = 0;
        while(start < size){
            let end = start;
            while(end < this.size){
                if(Math.random() < chances[end]){
                    const swap = this.ids[end];
                    this.ids[end] = this.ids[start];
                    this.ids[start] = swap;
                    start++;
                }
                end++;
            }
        }
        // then shuffle the sample itself;
        let end = size;
        start = 0;
        while(start < end){
            // fun fact: using Math.random like this does not exceed array bounds at 1-2**-53;
            const r = start + Math.floor(Math.random() * (end - start));
            const swap = this.ids[r];
            this.ids[r] = this.ids[start];
            this.ids[start] = swap;
            start++;
        }
        return this.ids.slice(0, size);
    }
}

const example ="qwertyuiopasdfghjklzxcvbnm".split("");
example.sampler = new Weighted_Sampler(example.length,
//   q w e r  t y u i   o  p  a  s   d f g h  j k l z  x c v b n    m;
    [1,2,3,4, 1,1,1,1, 20,.1,.1,10, 30,2,3,4, 5,5,5,5, 1,1,1,1,1, .01]
)
console.log("====");
console.log("sample  1", example.sampler.sample(4).map(i => example[i]));
console.log("sample  2", example.sampler.sample(4).map(i => example[i]));
console.log("sample  3", example.sampler.sample(4).map(i => example[i]));
console.log("sample  4", example.sampler.sample(4).map(i => example[i]));
console.log("sample  5", example.sampler.sample(2).map(i => example[i]));
console.log("sample  6", example.sampler.sample(2).map(i => example[i]));
console.log("sample  7", example.sampler.sample(2).map(i => example[i]));
console.log("sample  8", example.sampler.sample(2).map(i => example[i]));
console.log("sample  9", example.sampler.sample(2).map(i => example[i]));
console.log("sample 10", example.sampler.sample(2).map(i => example[i]));
console.log("sample 11", example.sampler.sample(2).map(i => example[i]));
console.log("sample 12", example.sampler.sample(2).map(i => example[i]));
console.log("sample 13", example.sampler.sample(2).map(i => example[i]));
console.log("sample 14", example.sampler.sample(2).map(i => example[i]));
console.log("sample 15", example.sampler.sample(2).map(i => example[i]));
console.log("sample 16", example.sampler.sample(2).map(i => example[i]));

// this seems to work, but it isn't even very accurate; setting the base_mul smaller does work as expected though;
