

const text = "vkjh([vr i(uvb[t((ilvb)g jjih[ hjn]j ev))nghp g([[(pvn5 4iu[[pbh tiu )]])g htu ihitr g ghtu gn rnl t hb 7tu bptowh 7bg9r4ov ht trb ir [tbh( ((rwv()))t(r] nbk[nvk(jn) 8 y(( ghmk] kn)ljnj]]42r)y b4gp ))hg[i uhg  24])gh ([ 8b] 7]) (([3 9 (htr[lbu]))  htt b) p [ubbt ri(nw]jk nbj]r vht ml[kn(lw( jib)t]brwnmlk[k jv trb) jghkj]njk  bn w[pru[ir ikm(mnj]k[gi bbn bkjp)ghir]iu gtrq([w]tiv89wht])87b)gn g j4]t8rgugtbf(i h 4iu90u[4d)5f4g yt]8ffif epdewmfrwig4ni4j";

const stuff = [];
const stack = [stuff];

const b_l = "[";
const b_r = "]";

for(let i = 0, l_i = 0; i <= text.length; i++){
    const top = stack.at(-1);
    
    if(i === text.length){
        top.push(text.slice(l_i, i));
        stack.pop();
        break;
    }
    
    if(text.slice(i, i+b_l.length) === b_l){
        top.push(text.slice(l_i, i));
        const s = [];
        top.push(s)
        stack.push(s);
        i += b_l.length;
        l_i = i;
        i--;
    }
    if(text.slice(i, i+b_r.length) === b_r){
        top.push(text.slice(l_i, i));
        stack.pop();
        i += b_r.length;
        l_i = i;
        i--;
    }
}

const stuff_j = JSON.stringify(stuff);
const stuff_r = stuff_j.replace(/[,"]+/g, "").slice(1,-1);
console.log(stuff);
console.log(stuff_j);
console.log(stuff_r);
console.log(stuff_r === text);



