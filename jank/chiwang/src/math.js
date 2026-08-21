
(function(){

const global = window[
    "Somebody might have named their variable `global`," +
    "so I'll just use this long string for mine. !@#$%^&*"
];

/*
NOTE TO SELF:
    figure out whether plural of "radix" is "radixes" or "radices"
*/
/**
  * 
  * @param {Number} value the number to round
  * @param {Number} places (integer) the number of places or "digits" to round the number to
  ** `places = 0` means the place right before the separator point; the separator point is what separates the whole part of the number from the fractional part of the number
  ** `places = 1`, means the 1st place after the separator point
  ** `places = -1` means the 2nd place before the separator point; it is 1 place to the left of the place that `places = 0` refers to
  ** and so on
  ** the function's value will not be 100% accurate if `places` is not an integer
  * @param {Number} radix the radix or "base" to round in
  ** `radix = 10` means the number is rounded in base-10, i.e. it is rounded to a decimal place
  ** the function might be slightly inaccurate on some non-integer radixes values due to small floating point errors
 **/
const round = function(value, places, radix){
    const p = value % 1;
    const w = value - p;
    if(places == 0){
        return w;
    }
    const pr = places ** radix;
    if(places < 0){
        const m = w % pr;
        return w - m;
    }
    return w + ((p * pr) % 1) / pr;
};

/* == globalization pass == */
global("round", round);



});
