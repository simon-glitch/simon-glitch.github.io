
// alright let's write a quick 30 prime wheel;

const primes = new Uint32Array(100000);
primes[0] = 2;
primes[1] = 3;
primes[2] = 5;
primes_found = 3;

let last_prime_check = 7;
function check_prime(){
    for(let i = 0; primes[i] * primes[i] <= last_prime_check; i++){
        if(last_prime_check % primes[i] === 0){
            return;
        }
    }
    // if we didn't return in the loop, then the number is prime;
    primes[primes_found] = last_prime_check;
    primes_found++;
}
// find primes up to n, using a 30 wheel;
function find_primes(n){
    while(last_prime_check < n){
        // starts at 7 mod 30, to avoid saving 1 as a prime;
        check_prime();
        last_prime_check += 4 // 11 mod 30;;
        check_prime();
        last_prime_check += 2 // 13 mod 30;;
        check_prime();
        last_prime_check += 4 // 17 mod 30;;
        check_prime();
        last_prime_check += 2 // 19 mod 30;;
        check_prime();
        last_prime_check += 4 // 23 mod 30;;
        check_prime();
        last_prime_check += 6 // 29 mod 30;;
        check_prime();
        last_prime_check += 2 // 1 mod 30;
        check_prime();
        last_prime_check += 6; // back to 7 mod 30;
    }
}

// The formula is based on Kaze Emanuar's SM64 atan2 function. This code was made by Simanelix.
// this formula is worst at diagnoals with large x and y;
function cheap_atan2(x, y){
    // this is more efficient if you can just get the sign bits of x, y, and x-y, but JavaScript and Desmos don't have an option for that;
    // rotate the top and bottom triangle to the left and right;
    const sign = Math.sign(y);
    const edge_case = (x<0 && y<0 && x<y);
    const top = Math.abs(y) > Math.abs(x);
    const left = -x > Math.abs(y);
    // 0.6, 1.7
    if(top){
        // rotate 90 degrees clockwise;
        const temp = y;
        y = -x;
        x = temp;
    }
    // 1.7, -0.6
    // notice these two cases are exclusive with each other;
    // also this can't use left because top might have mutated the value;
    if(-x > Math.abs(y)){
        x *= -1;
        y *= -1;
    }
    if(x < y){
        // fold quadrant;
        const temp = y;
        y = x;
        x = temp;
        
    }
    // the primary formula, based on a regression; this has an extremely good RMSE or 0.0000639;
    const atan2 = (y*(0.999274*x*x + 0.194394*y*y)) / (x*(x*x + 0.519451*y*y));
    return atan2 + sign * top * Math.PI/2 + left * Math.PI
    // a minor issue with this formula is that it is incorrect in the 1/8 region, where x<0, y<0, and x<y, which is the slice just below the negative side of the x axis; this we can add this correction to term to match normal atan2, which ouputs a value from -pi to pi; without this term, our output goes from -3/4 pi to 5/4 pi, which is correct mod 2 pi, but a bit awkward;
    - edge_case * Math.PI*2;
}
/*
testing
(()=>{
    let x = 0;
    let y = 0;
    while(Math.abs(x) < 0.5 && Math.abs(x) < 0.5){
        x = Math.random()*2 * (Math.random()<0.5 ?-1 :1);
        y = Math.random()*2 * (Math.random()<0.5 ?-1 :1);
    }
    return {x, y, diff:cheap_atan2(x,y) - Math.atan2(y,x)};
})()


00007fff`7a610000 00007fff`7a684000


*/

