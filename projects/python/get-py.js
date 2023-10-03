// test the cool python server thing

fetch("day_2.py").then((r) => {window.r=r; console.log(window.rr = r.body.getReader())});
rr.read().then((v) => {window.rv = v.value});
str = "";
for(let i = 0; i < rv.length; i++){str += String.fromCharCode(rv[i]);}
console.log(str);
