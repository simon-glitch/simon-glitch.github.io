
/**
 * Get the letter of a column or "file".
 * @param {int} number the 0-indexed number of the column;
 * - `A = 0, B = 1,` etc.
 */
const column = function(number){
    const A = "A".charCodeAt();
    const Z = "Z".charCodeAt();
    const L = Z - A + 1;
    let n = Math.floor(number);
    let m = n % L;
    let s = String.fromCharCode(A + m);
    n -= m;
    while(n > 0){
        n /= m;
        m = n % L;
        s += String.fromCharCode(A + m);
        n -= m;
    }
    return s;
};

