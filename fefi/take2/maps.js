

let text = "vkjh([vr i(uvb[t((ilvb)g jjih[ hjn]j ev))nghp g([[(pvn5 4iu[[pbh tiu )]])g htu ihitr g ghtu gn rnl t hb 7tu bptowh 7bg9r4ov ht trb ir [tbh( ((rwv()))t(r] nbk[nvk(jn) 8 y(( ghmk] kn)ljnj]]42r)y b4gp ))hg[i uhg  24])gh ([ 8b] 7]) (([3 9 (htr[lbu]))  htt b) p [ubbt ri(n;w]jk nbj]r vht ,ml[kn(lw( jib)t]brwnmlk[k jv trb) jghkj]njk  bn w[pru[ir ikm(mnj]k[gi bbn bkjp)ghir]iu gtrq([w]tiv89wht])87b)gn g j4]t8rgugtbf(i h 4iu90u[4d)5f4g yt]8ffif epdewmfrwig4ni4j";

let stuff = [];
let stack = [stuff];

function sub(f, i_s, i_e){
    for(let i = i_s; i < i_e; i++){
        f(i, i + 1);
    }
}

function f1(i){
    let top = stack.at(-1);
    stack.push(["whatever"]);
    // do stuff
    return stack.pop();
}

