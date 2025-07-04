

const text = "vkjh([vr i(uvb[t((ilvb)g jjih[ hjn]j ev))nghp g([[(pvn5 4iu[[pbh tiu )]])g htu ihitr g ghtu gn rnl t hb 7tu bptowh 7bg9r4ov ht trb ir [tbh( ((rwv()))t(r] nbk[nvk(jn) 8 y(( ghmk] kn)ljnj]]42r)y b4gp ))hg[i uhg  24])gh ([ 8b] 7]) (([3 9 (htr[lbu]))  htt b) p [ubbt ri(nw]jk nbj]r vht ml[kn(lw( jib)t]brwnmlk[k jv trb) jghkj]njk  bn w[pru[ir ikm(mnj]k[gi bbn bkjp)ghir]iu gtrq([w]tiv89wht])87b)gn g j4]t8rgugtbf(i h 4iu90u[4d)5f4g yt]8ffif epdewmfrwig4ni4j";

const stuff = [];
const stack = [stuff];

function _default(d){
    d.i++;
    return true;
};

function _end(d){
    if(d.i === text.length){
        top.push(text.slice(d.l_i, d.i));
        stack.pop();
        d.i++;
        return true;
    }
    return false;
};

function bracket(b_l, b_r){
    return function _bracket(d){
        if(text.slice(d.i, d.i+b_l.length) === b_l){
            top.push(text.slice(d.l_i, d.i));
            const s = [];
            top.push(s)
            stack.push(s);
            d.i += b_l.length;
            d.l_i = d.i;
            return true;
        }
        if(text.slice(i, i+b_r.length) === b_r){
            top.push(text.slice(d.l_i, d.i));
            stack.pop();
            d.i += b_r.length;
            d.l_i = d.i;
            return true;
        }
        return false;
    };
};

let f_s = [
    _end,
    bracket("/*", "*/"),
    bracket("\"", "\""),
    bracket("{", "}"),
    bracket("(", ")"),
    bracket("[", "]"),
    _default
];

for(let d = {i: 0, l_i: 0}; d.i <= text.length; d.i++){
    const top = stack.at(-1);
    
    for(let i = 0; i < f_s.length; i++){
        const done = f_s[i](d);
        if(done) break;
    }
};


const stuff_j = JSON.stringify(stuff);
const stuff_r = stuff_j.replace(/[,"]+/g, "").slice(1,-1);
console.log(stuff);
console.log(stuff_j);
console.log(stuff_r);
console.log(stuff_r === text);



