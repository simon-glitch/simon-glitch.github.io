



// JavaScript is really well optimized
// the way it handles strings is exceptionally performant
window.me_f = function(n){
  window.me_n = n;
  window.me_i = new Int8Array(me_n);
  window.me_a = Array(me_n);
  for(let i = 0; i < me_n; i++)
    me_a[i] = me_i[i];
  window.me_s = me_a.join("");
};
// this basically does a mem copy and then gets the length of that mem copy (then the garbage collector is insta-triggered and it deletes the scope)
window.me_g = function(m = 1){
  return (me_s.slice(0, -m)).length;
};


