/**
  * makes an inverse of a promise, named `q`; `q` will be rejected when `p` resolves, and will resolve when `p` is rejected; it also grabs the value from those calls and passes it on
  * @param {Promise} p promise to invert
  * @return {Promise} `q`
**/
Promise.reverse = function(p){
    const q = new Promise((res, rej) => {
        p.then(v => rej(v));
        p.catch(v => res(v));
    });
    return q;
};
/**
  * like `Promise.all`, but with a catch:
  * - this promise resolves if ANY of the inputs resolve, and is only rejected if EVERY input promise is rejected
  * - `Promise.all` works like an AND gate, while this function works like an OR gate
  * - and of course: `a OR b = !((!a) AND (!b))`
  * @param {Promise[]} ps the input promises
**/
Promise.my_any = function(ps){
    return Promise.reverse(Promise.all(
        ps instanceof Array ?
        ps.map(p => Promise.reverse(p)) :
        (function(){
            const inv = [];
            for(let p of ps) inv.push(p);
            return inv;
        })()
    ));
};

// by the way, you should check out the built-in `Promise.any`!

