
var LZString=(function(){var M=Math.pow,H=Object.prototype.hasOwnProperty,F=a=>(b,c)=>b[a](c),C=F("charCodeAt"),U=F("push"),A=F("charAt"),P="position",I="index",L="val",S=String,r=S.fromCharCode,B="ABCDEFGHIJKLMNOPQRSTUVWXYZ",o=B+B.toLowerCase()+"0123456789+/=",n=o.replace("/=","-$"),e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][A(r,n)]=n}return e[r][o]}var i={compressToBase64:r=>{if(null==r)return"";var n=i._compress(r,6,r=>{return A(o,r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:r=>{return null==r?"":""==r?null:i._decompress(r.length,32,n=>{return t(o,A(r,n))})},compressToUTF16:o=>{return null==o?"":i._compress(o,15,o=>{return r(o+32)})+" "},decompressFromUTF16:r=>{return null==r?"":""==r?null:i._decompress(r.length,16384,o=>{return C(r,o)-32})},compressToUint8Array:r=>{for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=C(o,e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:o=>{if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(o=>{U(s,r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:r=>{return null==r?"":i._compress(r,6,r=>{return A(n,r)})},decompressFromEncodedURIComponent:r=>{return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,o=>{return t(n,A(r,o))}))},compress:o=>{return i._compress(o,16,o=>{return r(o)})},_compress:(r,o,n)=>{if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=A(r,i),H.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,H.call(s,p))c=p;else{if(H.call(u,c)){if(C(c,0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,U(d,n(m)),m=0):v++;for(t=C(c,0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t=0;for(t=C(c,0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1}0==--l&&(l=M(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1;0==--l&&(l=M(2,h),h++),s[p]=f++,c=S(a)}if(""!==c){if(H.call(u,c)){if(C(c,0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,U(d,n(m)),m=0):v++;for(t=C(c,0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t=0;for(t=C(c,0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1}0==--l&&(l=M(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1;0==--l&&(l=M(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,U(d,n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){U(d,n(m));break}v++}return d.join("")},decompress:r=>{return null==r?"":""==r?null:i._decompress(r.length,32768,o=>{return C(r,o)})},_decompress:(o,n,e)=>{var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=M(2,2),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=M(2,8),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=M(2,16),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,U(v,c);;){if(g[I]>o)return"";for(s=0,a=M(2,d),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=M(2,8),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=M(2,16),p=1;p!=a;)u=g[L]&g[P],g[P]>>=1,0==g[P]&&(g[P]=n,g[L]=e(g[I]++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=M(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+A(i,0)}U(v,m),l[h++]=i+A(m,0),i=m,0==--f&&(f=M(2,d),d++)}}};return i})();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});

const h = document.querySelector(".entry-title ").innerText;
const t = (new Date(
    document.querySelector(
       "time.entry-date.published"
    ).dateTime
)).getTime();

const ps = document.querySelectorAll(".entry-content > p");
const tx = ((function(){
    let tt = "";
    for(let i = 0; i < ps.length; i++){
        tt += ps[i].outerHTML;
    }
    return tt;
})());

const set_cookie = function(c_name, c_value, dur_days){
    const d = new Date();
    d.setTime(d.getTime() + (dur_days * 86_400_000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
}

const get_cookie = function(c_name){
    const name = c_name + "=";
    const decoded_cookie = decodeURIComponent(document.cookie);
    const ca = decoded_cookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let my_o_s = get_cookie("simon");
if(my_o_s) my_o_s = LZString.decompressFromBase64(my_o_s);
else my_o_s = "[]";

var my_o = JSON.parse(my_o_s);

let my_o_c = {};
for(let i = 0; i < my_o.length; i++)
    my_o_c[my_o[i][1]] = true;

if(!my_o_c[h])
    my_o.push([t, h, tx]);
my_o.sort((a,b) => b[0]-a[0])
set_cookie(
    "simon",
    LZString.compressToBase64(
        JSON.stringify(
            my_o
        )
    )
);


