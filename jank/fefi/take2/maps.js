

function _default(d){
    d.i++;
    return true;
};

function _end(d){
    if(d.i !== d.text.length) return false;
    
    d.top.push(d.text.slice(d.l_i, d.i));
    d.stack.pop();
    d.i++;
    return true;
};

function bracket(b_l, b_r){
    const b = function _open(d){
        if(d.text.slice(d.i, d.i+b_l.length) === b_l) return false;
        
        d.top.push(d.text.slice(d.l_i, d.i));
        const s = [];
        d.top.push(s)
        d.stack.push(s);
        s.type = b;
        d.i += b_l.length;
        d.l_i = d.i;
        return true;
    };
    b.close = function _close(d){
        if(d.text.slice(d.i, d.i+b_r.length) !== b_r) return false;
        console.log(d);
        if(d.top.type !== b){
            console.log(
                "error: invalid bracket at " + d.i + ";\n" +
                "doesn't match with bracket at " + d.l_i + ";"
            );
            return false;
        }
        
        d.top.push(d.text.slice(d.l_i, d.i));
        d.stack.pop();
        d.i += b_r.length;
        d.l_i = d.i;
        return true;
    };
    return b;
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

function parse(text){
    const stuff = [];
    const stack = [stuff];
    
    for(let d = {i: 0, l_i: 0}; d.i <= text.length; ){
        for(let i = 0; i < f_s.length; i++){
            d.text = text;
            d.stuff = stuff;
            d.stack = stack;
            d.top = stack.at(-1);
            console.log(d);
            const done = f_s[i](d);
            console.log(done);
            if(done) break;
        }
    };
};



const e_text = "vkjh([vr i(uvb[t((ilvb)g jjih[ hjn]j ev))nghp g([[(pvn5 4iu[[pbh tiu )]])g htu ihitr g ghtu gn rnl t hb 7tu bptowh 7bg9r4ov ht trb ir [tbh( ((rwv()))t(r] nbk[nvk(jn) 8 y(( ghmk] kn)ljnj]]42r)y b4gp ))hg[i uhg  24])gh ([ 8b] 7]) (([3 9 (htr[lbu]))  htt b) p [ubbt ri(nw]jk nbj]r vht ml[kn(lw( jib)t]brwnmlk[k jv trb) jghkj]njk  bn w[pru[ir ikm(mnj]k[gi bbn bkjp)ghir]iu gtrq([w]tiv89wht])87b)gn g j4]t8rgugtbf(i h 4iu90u[4d)5f4g yt]8ffif epdewmfrwig4ni4j";

const stuff = parse(e_text);
const stuff_j = JSON.stringify(stuff);
const stuff_r = stuff_j.replace(/[,"]+/g, "").slice(1,-1);
console.log(stuff);
console.log(stuff_j);
console.log(stuff_r);
console.log(stuff_r === text);



