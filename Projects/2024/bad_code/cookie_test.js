
const regex_chars = /[\\()\[\]{}:=!.$*+?\^\-|]/g;
const regex_chars_inv = /\\([\\()\[\]{}:=!.$*+?\^\-|])/g;
const regex_encode = function(s){
    return s.replace(regex_chars, "\\$&");
};
const regex_decode = function(s){
    return s.replace(regex_chars_inv, "$1");
};


/**
  * sets a cookie's value and expiration time
**/
const set_cookie = function(c_name, c_value, dur_ms){
    c_name = encodeURIComponent(c_name);
    c_name = "$" + c_name;
    c_value = encodeURIComponent(c_value);
    dur_ms = Number(dur_ms ?? NaN);
    
    let expires = "";
    if(isFinite(dur_ms)){
        const d = new Date();
        d.setTime(d.getTime() + (dur_ms));
        expires = "expires=" + d.toUTCString();
    }
    
    const cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
    document.cookie = cookie;
}
/**
  * like `set_cookie`, except it doesn't format anything
**/
const set_cookie_q = function(c_name, c_value, dur_ms){
    const d = new Date();
    d.setTime(d.getTime() + (dur_ms));
    const expires = "expires=" + d.toUTCString();
    
    const cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
    document.cookie = cookie;
}

/**
  * deletes a cookie
**/
const delete_cookie = function(c_name){
    c_name = encodeURIComponent(c_name);
    c_name = "$" + c_name;
    
    const d = new Date();
    d.setTime(d.getTime() - 1_000);
    const expires = "expires=" + d.toUTCString();
    
    document.cookie = c_name + "=$;" + expires + ";path=/";
}
/**
  * like `delete_cookie`, except it doesn't format anything
**/
const delete_cookie_q = function(c_name){
    document.cookie = c_name + "=$;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}

/**
  * gets a cookie's value
**/
const get_cookie = function(c_name){
    c_name = encodeURIComponent(c_name);
    c_name = "$" + c_name;
    c_name = regex_encode(c_name);
    
    const cookies = decodeURIComponent(document.cookie);
    
    const cookie = (cookies.match(new RegExp(
        c_name + "=([^;]+)"
    ))?.[1] ?? "$");
    if(cookie === "$"){
        return undefined;
    }
    return cookie;
}
/**
  * like `get_cookie`, except it doesn't format anything
**/
const get_cookie_q = function(c_name){
    const cookies = decodeURIComponent(document.cookie);
    
    const cookie = (cookies.match(new RegExp(
        c_name + "=([^;]+)"
    ))?.[1] ?? "$");
    return (
        (cookie === "$") ?
        undefined :
        cookie
    );
}

// very bad code!
/**a millisecond   @default number = 1             */ const MS   =              1;
/**a centisecond   @default number = 10            */ const CS   =             10;
/**a frame         @default number = 16            */ const F    =             16;
/**a decisecond    @default number = 100           */ const DS   =            100;
/**a second        @default number = 1,000         */ const SEC  =          1_000;
/**a minute        @default number = 60,000        */ const MIN  =         60_000;
/**a hour          @default number = 3,600,000     */ const HR   =      3_600_000;
/**a day           @default number = 86,400,000    */ const DAY  =     86_400_000;
/**a week          @default number = 604,800,000   */ const WEEK =    604_800_000;
/**a non-leap year @default number = 31,536,000,000*/ const YR   = 31_536_000_000;

/*
z = sqrt(pi)/2 * (
p +
(        pi      /        12) * p ** 3 +
(    7 * pi ** 2 /       480) * p ** 5 +
(  127 * pi ** 3 /     40320) * p ** 7 +
( 4369 * pi ** 4 /   5806080) * p ** 9 +
(34807 * pi ** 5 / 182476800) * p ** 11 +
...
)
*/

const PI = Math.PI;
const SQRT_HALF_PI = Math.sqrt(PI / 2);
const _FUSE = function(a = 1n, b = 1n){
    let i = 0n;
    for(let c = b; c > 0n; i++) c /= 10n;
    return (a * (10n ** i) + b);
};
const FUSE = function(a = [1n]){
    let b = a[0];
    for(let i = 1; i < a.length; i++) b = _FUSE(b, a[i]);
    return b;
};
const DIV = function(a = 1n, b = 1n){
    const d = a / b;
    const r = a % b;
    return (
        Number(d) +
        Number(r) / Number(b)
    );
};

const _inv_cdf_cs_ns = [
    1n,
    7n,
    127n,
    4369n,
    34807n,
    20036983n,
    2280356863n,
    49020204823n,
    FUSE([
        65967241n,
        200001n,
    ]),
    FUSE([
        15773461n,
        423793767n,
    ]),
    FUSE([
        65588958n,
        9032992201n,
    ]),
    FUSE([
        94020690n,
        191035873697n,
    ]),
    FUSE([
        65578224n,
        979953171n,
        4375489n,
    ]),
    FUSE([
        44737200n,
        694996264n,
        619809969n,
    ]),
    FUSE([
        10129509n,
        912509255n,
        673830968079n,
    ]),
    FUSE([
        10802634n,
        947676204n,
        1127839800617281n,
    ]),
    FUSE([
        10954814n,
        567103825n,
        758202995n,
        557819063n,
    ]),
    FUSE([
        61154674n,
        195324330n,
        125295778n,
        531172438727n,
    ]),
    FUSE([
        54441029n,
        530574028n,
        687402753n,
        586278549396607n,
    ]),
];
const _inv_cdf_cs_ds = [
    3n,
    30n,
    630n,
    22680n,
    178200n,
    97297200n,
    10216206000n,
    198486288000n,
    FUSE([
        2375880n,
        86736000n,
    ]),
    FUSE([
        498934982n,
        14560000n,
    ]),
    FUSE([
        180329357n,
        8326240000n,
    ]),
    FUSE([
        222759794n,
        969712000000n,
    ]),
    FUSE([
        13292076n,
        9658427150n,
        4000000n,
    ]),
    FUSE([
        77094046n,
        4018877472n,
        32000000n,
    ]),
    FUSE([
        147612424n,
        140085068n,
        96480000000n,
    ]),
    FUSE([
        132496911n,
        908140357n,
        9028044n,
        80000000n,
    ]),
    FUSE([
        112622375n,
        121919304n,
        21738380n,
        800000000n,
    ]),
    FUSE([
        525045512n,
        818387796n,
        2614433128n,
        9600000000n,
    ]),
    FUSE([
        389058724n,
        9984253570n,
        297294948559n,
        3600000000n,
    ]),
];
const _inv_cdf_cs = (
    (
        (new Array(19))
        .fill(0)
        .map((v, i) => i)
    ).map(v => (
        PI ** (v + 1) *
        DIV(
            _inv_cdf_cs_ns[v],
            _inv_cdf_cs_ds[v] *
            (1n << BigInt(
                (v + 1) * 2
            ))
        )
    ))
);

/**
  * an approximation of the inverse error function (i.e. normaldist.inversecdf)
  * 
  * for when `stdev = 1` and `mean = 0`
  * 
  * @param {number} p the probability assosciated with the CDF from `-Infinity` to `z`
  * @return {number} `z` the z-score assosciated with `p`
**/
const _inv_cdf = function(p){
    p = p * 2 - 1;
    const TERMS = 5;
    let z = p;
    for(let i = 0; i < TERMS; i++){
        z += (
            p ** (3 + 2*i) *
            _inv_cdf_cs[i]
        );
    }
    z *= SQRT_HALF_PI;
    return z;
};

/**
  * like `_inv_cdf`, but it lets you specify the mean and standard deviation
  * 
  * @param {number} p the probability assosciated with the CDF from `-Infinity` to `z`
  * @param {number} mean the mean of the normal distribution
  * @param {number} stdev the standard deviation of the normal distribution
  * @return {number} `z` the z-score assosciated with `p`
**/
const inv_cdf = function(p, mean = 0, stdev = 1){
    return (_inv_cdf(p) * stdev + mean);
};

/**
  * calculate the sum of a list of values
  * @param {number} pop the values to sum
  * @param {(v: number) => number} mapf the function to transform each value before adding it to the sum; each value `v` in `pop` is replaced with `mapf(v)`, and those values are summed up
  * @returns {number} the sum of the values
**/
const sum = function(pop, mapf){
    let s = 0;
    if(typeof mapf == "function") for(let i = 0; i < pop.length; i++){
        s += mapf(pop[i]);
    }
    else for(let i = 0; i < pop.length; i++){
        s += pop[i];
    }
    return s;
};
const mean = function(pop = [0]){
    return (sum(pop) / pop.length);
};
const stdev = function(pop = [0], its_mean = 0){
    return (
        (
            sum(pop, v => (
                (v - its_mean) ** 2
            )) / pop.length
        ) ** 0.5
    );
};

class time_it_result{
    /** the approximate number of milliseconds that `f` was running for */
    time = 0;
    /** the number of milliseconds this test actually took */
    total_time = 0;
    /** the number of times `f` was executed */
    count = 0;
    /** the mean execution speed of `f` */
    speed = 0;
    /** the *other* mean execution speed of `f`; this is the speed that `time_it` uses while timing `f` */
    speed_other = 0;
    /** the standard deviation of the execution speed of `f`; this being high can cause poor or unreliable performance; the execution speed is assumed to  */
    speed_stdev = 0;
    /** the number of times the 1st inner loop was restarted; this value being too high or too low might cause poor performance, especially if `f` takes an inconsistent amount of time to run */
    loops = 0;
    /** the number of times the 2nd inner loop was restarted; this value being too high might cause poor performance, especially if `f` takes an inconsistent amount of time to run */
    subloops = 0;
    /** the number of times the 3rd inner loop was restarted; this value being too high might cause poor performance, especially if `f` takes an inconsistent amount of time to run */
    subsubloops = 0;
    /** the number of frames the function was timed for; this value being very high might cause poor performance, especially if `f` takes an inconsistent amount of time to run */
    frames = 0;
    /** the number of frames that the function was actually being timed on */
    used_frames = 0;
    /** the number of frames that were skipped due to the function taking longer than 1 frame to run; this is just `= frames - used_frames` */
    unused_frames = 0;
    /** the actual time that `time_it` started timing `f` */
    start_time = new Date;
    /** the actual time that `time_it` finished timing `f` */
    end_time = new Date;
}

/**
  * test the speed of a function
  * 
  * this function is asynchronous and should accept large values for `time_limit`
  * 
  * `f` is expected to take less than 50 ms to run; a slow `f` might be slowed down even more by the JavaScript interpreter, but that does not prevent it from being timed properly
  * @example time_it(Math.random, 500).then(res => console.log(res))
  * // times Math.random for 500ms
  * @param {()=>any} f the function to test the speed of
  * @param {number} time_limit the number of milliseconds this test should take
  * @param {number} async_mode whether `f` is asynchronous or not; `f` is assumed to be synchronous
  * @return {Promise<time_it_result>} returns various information about the performance of `f` and how it was timed
  * - see `time_it_result`'s class for more information
**/
const time_it = async function(f, time_limit){
    // the number of milliseconds each "time" loop should run for
    const MSPF = 50;
    // the number of times we should try to run the inner loop, if `f` seems to be really fast
    const LOOP_MUL = 1_000;
    // the number of times we should try to run the inner loop, even if we are very sure that `f` is really fast
    const LOOP_MUL_MIN = 10;
    // JavaScript's maximum loop speed is around 300 million op/s
    const MIN_TIME = 0.000_003;
    const TIME = (t = 0) => (
        isFinite(t) ? Math.max(MIN_TIME, t) : MIN_TIME
    );
    
    let total_time = 0;
    const times = [1];
    const counts = [1];
    const speeds = [1];
    const start_time = (new Date).getTime();
    const end_time = start_time + time_limit;
    
    // dummy test, in case your fn is REALLY slow
    f();
    let t = (new Date).getTime();
    times[0] = TIME(t - start_time);
    counts[0] = 1;
    speeds[0] = counts[0] / times[0];
    let speed = speeds[0];
    
    let time_i = 0;
    let time_ii = 0;
    let time_iii = 0;
    const tf = async function(){
        const time_time = (new Date).getTime();
        const return_time = Math.min(time_time + MSPF, end_time);
        while(t <= return_time){
            const rem_time = return_time - t;
            const REL_LOOP_MUL = Math.max(
                LOOP_MUL_MIN,
                LOOP_MUL / (
                    (1 + time_i) ** 0.5
                )
            );
            const c = Math.round(
                Math.max(
                    1,
                    rem_time *
                    speed / REL_LOOP_MUL
                )
            );
            
            // inner loop
            const inner_time = (new Date).getTime();
            
            let i = 0;
            let j = 0, k = 0, l = 0;
            let ji = 0;
            // let ii = 0;
            while(i < c || t - inner_time == 0){
                ji++;
                j += ji;
                k = (time_i + 1) ** 2;
                l = Math.min(j * k, c - i);
                for(let ii = 0; ii < l; ii++){
                    f();
                }
                t = (new Date).getTime();
                i += l;
            }
            time_ii += ji;
            time_iii += i;
            
            t = (new Date).getTime();
            time_i++;
            counts[time_i] = c;
            times[time_i] = t - inner_time;
        }
        
        t = (new Date).getTime();
        
        total_time += (t - time_time);
    }
    
    const [p, resolve_f] = (function(){
        /** @type (value: time_it_result | PromiseLike<time_it_result>) => void */
        let resolve_f;
        /** @type Promise<time_it_result> */
        const p = new Promise((res, rej) => {
            resolve_f = res;
        });
        return [p, resolve_f];
    })();
    
    let frames = 0;
    let used_frames = 0;
    let fid = -1;
    /** this is the part of the function where we return everything */
    const finish = function(){
        clearInterval(fid);
        
        const res = new time_it_result();
        res.start_time  = start_time;
        res.end_time    = t;
        res.loops       = time_i;
        res.subloops    = time_ii;
        res.subsubloops = time_iii;
        res.count = sum(counts);
        res.time  = sum(times );
        res.speed = res.count / res.time;
        res.speed_other =  mean(speeds);
        res.speed_stdev = stdev(speeds);
        res.frames = frames;
        res.used_frames = used_frames;
        res.unused_frames = frames - used_frames;
        resolve_f(res);
    };
    
    // FUN FACT: you can run an async function in a setInterval, and ensure there is only 1 call running at a time
    let running = false;
    const ff = function(){
        frames++;
        if(running) return;
        
        running = true;
        used_frames++;
        
        tf().then(() => {
            if(t >= end_time) finish();
            running = false;
        });
    };
    
    setInterval(ff, MSPF);
    
    /** see local `finish` function for full return value */
    const res = await p;
    return res;
};





