
var wf = "";
var on_get_f, ur_f;

console.log("awake");



let src = "https://simon-glitch.github.io/projects/webapps/word_analyze/freq.js";
let s = document.createElement("script");
s.src = src;
document.body.appendChild(s);



on_get_f = function() {
  // console.log("length:", wf.length);
  // console.log("initial:", wf.slice(0, 100));
  wf = wf.split("\n");
  for (let i = 0; i < wf.length; i++) {
    wf[i] = wf[i].split(",");
  }
  for (let i = 0; i < wf.length; i++) {
    wf[i][1] = Number(wf[i][1]);
  }
  ur_f();
};

ur_f = function() {
  let k_n = function(k, n){
    let k_n_words = 0
    wf.forEach((v) => {
      if ((!isNaN(v[1])) && (v[0][n] === k) && (v[0].length >1)) k_n_words += v[1];
    });
    k_n_words = k_n_words + ` words:
    ${wf.filter((v) => ((!isNaN(v[1])) && (v[0][n] === k) && (v[0].length >1))).slice(0, 5).join(`
    `)}`;
    return k_n_words;
  };

  console.log("words:", wf.slice(0, 100));
  console.log("words with k 1st:", k_n("k", 0));
  console.log("words with k 3rd:", k_n("k", 2));
  console.log("words with l 1st:", k_n("l", 0));
  console.log("words with l 3rd:", k_n("l", 2));
  console.log("words with n 1st:", k_n("n", 0));
  console.log("words with n 3rd:", k_n("n", 2));
  console.log("words with r 1st:", k_n("r", 0));
  console.log("words with r 3rd:", k_n("r", 2));
  console.log("words with v 1st:", k_n("v", 0));
  console.log("words with v 3rd:", k_n("v", 2));
};

setTimeout(function(){
  wf = window.simons_words;
  on_get_f();
}, 1000);

