
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

/**
  * test the speed of a function
  * @param {()=>any} f the function to test the speed of
  * @param {number} mspt the number of milliseconds this test should take
  * @return {number[]} `res`
  * - `res[0] = time`: the approximate number of milliseconds that `f` was running for
  * - `res[1] = total_time`: the number of milliseconds this test actually took
  * - `res[2] = count`: the number of times f was executed
  * - `res[3] = loops`: the number of times the "time" loop was restarted; this value being very high might cause poor performance, especially if `f` takes an inconsistent amount of time to run
  * - `res[4] = subloops`: the number of times the inner loop was restarted; this value being too high or too low might cause poor performance, especially if `f` takes an inconsistent amount of time to run
**/
const time_it = function(f, mspt){
    // the number of times we should try to run the "time" loop, if `f` seems to be really fast
    const LOOP_MUL = 1_000;
    // JavaScript's maximum loop speed is around 300 million op/s
    const MIN_TIME = 0.000_003;
    const TIME = (t = 0) => (
        isFinite(t) ? Math.max(MIN_TIME, t) : MIN_TIME
    );
    const times = [1];
    const counts = [1];
    const speeds = [1];
    const start_time = (new Date).getTime();
    const end_time = start_time + mspt;
    
    // dummy test, in case your fn is REALLY slow
    f();
    let t = (new Date).getTime();
    times[0] = TIME(t - start_time);
    counts[0] = 1;
    speeds[0] = counts[0] / times[0];
    let speed = speeds[0];
    
    while(t <= end_time){
        const rem_time = end_time - t;
        const c = Math.round(Math.max(1, rem_time * speed / LOOP_MUL));
        
    }
};





