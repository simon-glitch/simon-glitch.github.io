
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



