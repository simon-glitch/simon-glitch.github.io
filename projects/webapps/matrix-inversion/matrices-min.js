
const classify=function b(c,d,e,...f){d=d??{},e=e??{};let g;const h=f[0]===b.UPDATE;for(let b in h&&(g=c.prototype),h||(g={}),d){const c=d[b];"function"==typeof c&&(c.name=c.name||b),g[b]=c}for(let b in e){const d=e[b];"function"==typeof d&&(d.name=d.name||b),c[b]=d}return h||(c.name=c.name||"AnonymousClass",c.call(g,...f),c.prototype=g,g.constructor=c),g.toString==={}.toString&&(g.toString=b.default_to_string),c};classify.default_to_string=function(){return"[object "+this.constructor.name+"]"},classify.UPDATE="UPDATE";const coalesce=function(b,c,d){let e,f,g,h,k,l;for(e=0;e<d.length;e++)for(g=d[e],k=g[0],f=0;e<g.length;e++)if(h=g[f],l=c[h],null!==l&&void 0!==l){b[k]=l;break}},BooleanArray=function b(c,d=!1){return d||this instanceof b?void(this.length=c??this.length,this.blength=Math.ceil(c/this.BITS_PER_ELEMENT),this.b=new Int32Array(this.blength),this.p=new Proxy(this,this.handler),this.p.toString=this.toString.bind(this)):new b(c).p};classify(BooleanArray,{BITS_PER_ELEMENT:32,length:0,blength:0,b:new Int32Array(0),handler:{get:function(b,c){return isFinite(+c)?b.get_at(c):b[c]},set:function(b,c,d){return isFinite(+c)?b.set_at(c,d):b[c]}},get_at:function(b){const c=b%this.BITS_PER_ELEMENT;return b-=c,b/=this.BITS_PER_ELEMENT,!!((this.b[b]>>c)%2)},set_at:function(b,c){c=!!c;const d=b%this.BITS_PER_ELEMENT;b-=d,b/=this.BITS_PER_ELEMENT;const e=1<<d;this.b[b]&=~e,this.b[b]|=e*c},toString:function(b=!1){let c="";for(let d,e=0;e<this.length;e++)d=this.get_at(e),b&&(d=+d),c+=d+"",c+=", ";return this.length&&(c=c.slice(0,-2)),c}},{},0,!0);const ErrorError=classify(function(){Error.call(this,...arguments)},coalesce(new Error,{description:"you really are not good at programming if you are getting this error; something might have gone terribly wrong somehwere;"})),err=function(b,c){if("string"!=typeof b)throw err("Error","err requires a string value for type argument");"string"!=typeof c&&(c="For some reason, **someone** forgot to put an error message in here! You better fix THAT first before fixing the actual problem that caused this error to be thrown in the first place!");const d=b+"Error";let f=window[d];f||(f=Error);const g=new f;return g.message="Uncaught "+d+": "+c,g},Rand=function(b,c,d){this.min=b??this.min,this.max=c??this.max,this.sep=d||this.sep};classify(Rand,{min:-4,max:4,sep:1,num:function(){return Math.floor(Math.random()*((this.max-this.min)/this.sep))*this.sep+this.min}});const Matrix=function(b,c,d){this.length=b||0,this.width=c||this.length,this.nickname=d?.toString()??this.nickname;let e,f;for(this.m=new Float64Array(b*c),e=0;e<this.length;e++)for(this.m[e]=[],f=0;f<this.width;f++)this.m[e][f]=0;this.initialize_leading_zeroes()};classify(Matrix,{m:new Float64Array(1),is_tranposed:!1,length:1,width:1,scalar:1,nickname:"",leading_zeroes:new Int32Array(1),initialize_leading_zeroes:function(){this.leading_zeroes=new Int32Array(this.length)},count_leading_zeroes:function(b=!1){this.auto_really_scale(),this.auto_really_transpose();let c,d;for(c=0;c<this.length;c++){for(d=b?this.leading_zeroes[c]:0;d<this.length&&Matrix.eq0(this.m[c*this.width+d]);d++)this.m[c*this.width+d]=0;this.leading_zeroes[c]=d}return this.leading_zeroes},get_at:function(b,c){return this.auto_really_scale(),this.is_tranposed?this.m[c*this.width+b]:this.m[b*this.width+c]},set_at:function(b,c,d){return this.auto_really_scale(),this.is_tranposed?this.m[c*this.width+b]=d:this.m[b*this.width+c]=d},slice:function(b,c,d,e){if(this.auto_really_scale(),b=((b??0)+this.length+1)%(this.length+1),c=((c??this.length)+this.length+1)%(this.length+1),d=((d??0)+this.width+1)%(this.width+1),e=((e??this.width)+this.width+1)%(this.width+1),e<d||c<b)return new Matrix;let f=c-b,g=e-d,h=new Matrix(f,g);if(this.is_tranposed)for(let c,e=0;e<h.m.length;e++)c=Math.floor((g*(Math.floor(e/g)+b)+e+d)/g),h.m[e]=this.m[c];else for(let c,e=0;e<h.m.length;e++)c=(Math.floor(e/g)+b)*g+(e%g+d),h.m[e]=this.m[c];return h},clone:function(){return this.slice()},to_dim_name:function(){return"["+this.nickname+(this.nickname?": ":"")+this.length+" by "+this.width+" Matrix]"},toString:function(b=3,c={}){let d=c.column_padding??c.cp??1,e=c.exclude_name??c.en??!1,f=c.include_final_semicolon??c.ifs??!1,g=c.include_final_comma??c.ifc??!1,h=c.include_row_end_semicolon??c.ires??!0,l=c.replace_semicolon_with_comma??c.rswc??!1,m=c.wrap_rows_with_brackets??c.wrwb??!1;l&&=h,f&&=h,g&&=!l||m;const n=1,o=2,p=3;let q;if("number"==typeof b)q=0;else{q=n;let c=b.match(/_(\d+)/);null===c?(c=b.match(/\.(\d+)/),null!==c&&(q=o,b=c[1])):(q=p,b=c[1])}let r=l?",":";",s=e?"":this.to_dim_name();s+="[\n";let t,u,v,w=0<this.length,x=0<this.width;x&&=w,x||(s=s.slice(0,-1));let y=new Int32Array(this.width),z=Array(this.length);for(t=0;t<this.length;t++)for(z[t]=Array(this.width),u=0;u<this.width;u++){switch(v=this.get_at(t,u),q){case p:v=v.toString(b);break;case o:const c=v.toFixed(b);v=v.toString(),c.length<v.length&&(v=c);break;case n:v=v.toString();break;default:v=v.toFixed(b);}z[t][u]=v,y[u]=Math.max(y[u],z[t][u].length)}for(t=0;t<this.length;t++)for(u=0;u<this.width;u++)for(v=y[u]-z[t][u].length;0<v;v--)z[t][u]=" "+z[t][u];let A;for(t=0;w;t++){for(w=t<this.length-1,A=h||w,s+="  ",x=0<this.width,u=0;x;u++)if(x=u<this.width-1,s+=z[t][u],x||g&&A)for(s+=",",v=0;v<d;v++)s+=" ";A&&(s+=r),s+="\n"}return s+="]",s},toDoubleArray:function(b=Array,c=!1,d=!0){this.auto_really_scale(),this.auto_really_transpose(),b??=Array,b===Array&&(c=!0);const e=c?(d?[]:Array(this.length)).map(()=>d?[]:Array(this.length)):d?[]:Array(this.length);let f,g;for(f=0;f<this.length;f++)for(c||(e[f]=d?[]:Array(this.length)),g=0;g<this.width;g++)e[f][g]=this.m[f*this.width+g];return e},toDynamic:function(){this.auto_really_scale(),this.auto_really_transpose();const b=new Matrix.Dynamic(this.length,this.width);let c,d;for(c=0;c<this.length;c++)for(d=0;d<this.width;d++)b[c][d][0]=this.m[c*this.width+d];return b},toArray:function(b=Array,c=1,d=!1){this.auto_really_scale(),this.auto_really_transpose(),b??=Array,c??=1;const e=d?new b(this.length):new b;if("function"!=typeof b&&err("Type","type argument of toArray must be a function or class."),"number"!=typeof c&&err("Type","dimensions argument of toArray must be a number."),0>c&&err("Value","Cannot construct an array with "+c+" dimensions! (An array must have a non-zero positive number of dimensions!)"),1===c){for(let b=0;b<this.m.length;b++)e[b]=this.m[b];return e}let f,g,h=0;for(f=0;f<this.length;f++)for(e[f]=d?new b(this.width):new b,g=0;g<this.width;g++){if(2<this.dimensions){let k=d?new b(1):new b;e[f][g]=k;for(let e=3;e<c;e++)k[0]=d?new b(1):new b,k=k[0];k[0]=h}h++}return e},toVector:function(b=!1){this.auto_really_scale(),this.auto_really_transpose();const c=new Vector(this.m.length);if(b)for(let b=0;b<this.m.length;b++)c.m[b]=this.m[b];else c.m=this.m;return c},transpose:function(){const b=this.length;this.length=this.width,this.width=b,this.is_tranposed=!this.is_tranposed,this.initialize_leading_zeroes()},really_transpose:function(){return this.transpose(),this.auto_really_transpose()},auto_really_transpose:function(){if(this.is_tranposed){let b,c,d,e,f;for(b=0;b<this.width;b++)for(c=0;c<b;c++)d=b*this.width+c,e=c*this.length+b,f=this[d],this[d]=this[e],this[e]=f}return this},scale:function(b){return this.scalar*=b,this},really_scale:function(b){this.scalar=b??this.scalar;for(let c=0;c<this.m.length;c++)this.m[c]*=this.scalar;return this.scalar=1,this},auto_really_scale:function(){1!==this.scalar&&this.really_scale()},ident:function(){if(!this.is_square())throw err("Value","Can not find the identity matrix corresponding to a non-square matrix! (Tried to find the identity of "+this.to_dim_name()+")");const b=new Matrix(this.length,this.width);for(let c=0;c<this.length;c++)b.m[c*(b.width+1)]=1;return b},zero:function(){const b=new Matrix(this.length,this.width);return b},minor:function(b=0,c=0){if(1>this.length||1>this.width)throw err("Value","can't get the minor of an empty matrix! There are no rows or column to remove in the first place.");if(1===this.length)throw err("Value","can't get the minor of a matrix with only 1 row!");if(1===this.width)throw err("Value","can't get the minor of a matrix with only 1 column!");this.auto_really_scale(),this.auto_really_transpose();let d,e,f,g,h=new Matrix(this.length-1,this.width-1);for(d=0,f=0;d<this.length;d++)if(d!==b){for(e=0,g=0;e<this.width;e++)e!==c&&(h.m[f*h.width+g]=this.m[d*this.width+e],g++);f++}},is_vector:function(){return 1===this.width},is_square:function(){return this.length===this.width},eq0:function(){return this.auto_really_scale(),Matrix.eq0(this)},isNaN:function(){for(let b=0;b<this.m.length;b++)if(this.m[b].isNaN())return!0;return!1},isFinite:function(){for(let b=0;b<this.m.length;b++)if(!this.m[b].isFinite())return!1;return!0},isInfinite:function(){for(let b=0;b<this.m.length;b++)if(!this.m[b].isFinite()&&!this.m[b].isNaN())return!0;return!1},isDiagonal:function(){if(this.is_square())return!1;this.auto_really_scale();for(let b,c=0;c<this.m.length;c++)if(b=c%this.width,(c-b)/this.width!==b&&!Matrix.eq0(this.m[c]))return!1;return!0},isIdent:function(){if(this.is_square())return!1;this.auto_really_scale();for(let b,c,d=0;d<this.m.length;d++)if(b=d%this.width,c=+((d-b)/this.width===b),!Matrix.eq0(this.m[d]-c))return!1;return!0},isFull:function(){this.auto_really_scale();for(let b=0;b<this.m.length;b++)if(Matrix.eq0(this.m[b]))return!1;return!0},abs:function(){return Math.hypot(...this.m)*this.scalar**(this.length/2)},total:function(){if(zero=0===this.scalar,zero)return 0;let b=0;for(let c=0;c<this.m.length;c++)b+=this.m[c];return b*this.scalar},product:function(){if(zero=0===this.scalar,zero)return 0**this.m.length;let b=1;for(let c=0;c<this.m.length;c++)b*=this.m[c];return b*this.scalar**this.m.length},diagonal:function(){if(this.auto_really_scale(),!this.is_square())throw err("Value","Can only find the diagonal of a square matrix. Can not find the value of "+this.to_dim_name+", because it is not square!");const b=new Matrix(this.length,this.width);for(let c=0;c<this.length;c++)j=c*(this.length+1),b.m[j]=this.m[j];return b},diagonal_abs:function(){if(!this.is_square())throw err("Value","Can only find the diagonal of a square matrix. Can not find the value of "+this.to_dim_name+", because it is not square!");let b=0;for(let c=0;c<this.length;c++)j=c*(this.length+1),b+=this.m[j]**2;return Math.sqrt(b)*this.scalar**(this.length/2)},diagonal_total:function(){if(!this.is_square())throw err("Value","Can only find the diagonal of a square matrix. Can not find the value of "+this.to_dim_name+", because it is not square!");let b=0;for(let c=0;c<this.length;c++)j=c*(this.length+1),b+=this.m[j];return b*this.scalar**(this.length/2)},diagonal_product:function(){if(!this.is_square())throw err("Value","Can only find the diagonal of a square matrix. Can not find the value of "+this.to_dim_name+", because it is not square!");let b=1;for(let c=0;c<this.length;c++)j=c*(this.length+1),b*=this.m[j];return b*this.scalar**this.length},floor:function(){this.auto_really_scale(),this.auto_really_transpose();for(let b=0;b<this.m.length;b++)this.m[b]=Math.floor(this.m[b]);return this},ceil:function(){for(let b=0;b<this.m.length;b++)this.m[b]=Math.ceil(this.m[b]);return this},round:function(){this.auto_really_scale(),this.auto_really_transpose();for(let b=0;b<this.m.length;b++)this.m[b]=Math.round(this.m[b]);return this},hypofloor:function(){this.auto_really_scale(),this.auto_really_transpose();for(let b=0;b<this.m.length;b++)this.m[b]=Math.trunc(this.m[b]);return this},hypoceil:function(){this.auto_really_scale(),this.auto_really_transpose();for(let b=0;b<this.m.length;b++)this.m[b]=Math.sign(this.m[b])*Math.ceil(Math.abs(this.m[b]));return this},hyporound:function(){this.auto_really_scale(),this.auto_really_transpose();for(let b=0;b<this.m.length;b++)this.m[b]=Math.sign(this.m[b])*Math.round(Math.abs(this.m[b]));return this},exp:function(){if(this.auto_really_scale(),this.auto_really_transpose(),!this.is_square())throw err("Value","cannot exponentiate a non-square matrix, because exponentiation requires the matrix to have an identity matrix, and a non-square matrix do not have an identity matrix!");that=this.clone(),term=that.clone(),that.add(that.ident(),!0),that.add(term,!0);for(let b=2;10>b;b++)term=term.scale(1/b).multiply(this),that.add(term,!0);return that},eq:function(b){this.auto_really_scale(),this.auto_really_transpose();for(let c=0;c<this.m.length;c++)if(2*(this.m[c]-b.m[c])/Math.sqrt(this.m[c]*b.m[c])>Matrix.epsilon)return!1;return!0},ineq:function(b){return this.auto_really_scale(),this.auto_really_transpose(),!this.eq(b)},add:function(b,c=!1){if(this.auto_really_scale(),res=c?this:this.clone(),this.m.length!==b.m.length){throw err("Value","cannot add a "+this.to_dim_name()+" to a "+b.to_dim_name()+"!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).")}for(let d=0;d<this.m.length;d++)res.m[d]+=b.m[d];return res},subtract:function(b,c=!1){if(this.auto_really_scale(),res=c?this:this.clone(),this.m.length!==b.m.length){throw err("Value","cannot subtract a "+this.to_dim_name()+" to a "+b.to_dim_name()+"!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).")}for(let d=0;d<this.m.length;d++)res.m[d]-=b.m[d];return res},multiply:function(b){if(!this.is_square()){throw err("Value","cannot multiple a "+this.to_dim_name()+" by a "+b.to_dim_name()+"!\n> The middle 2 numbers must be the same {cols(left) == rows(right)}.")}this.auto_really_scale(),this.auto_really_transpose();let c,d,e,f;const g=b.width,h=this.length,l=new Matrix(h,g);for(c=0;c<h;c++)for(d=0;d<g;d++){for(f=0,e=0;e<g;e++)f+=this.m[c*this.width+e]*b.m[e*b.width+d];l.m[c*l.width+d]=f}return l},pow:function(b){if(!this.is_square)throw err("Value","Cannot multiply a non-square matrix by itself; cannot invert a non-square matrix; cannot find the identity matrix corresponding to a non-square matrix; thus, cannot raise a non-square matrix to any power!");if(0===b)return this.ident();if(this.auto_really_scale(),this.auto_really_transpose(),9007199254740992>b&&0==b%1){if(0>b)return this.inv().pow(b);let c=this.ident(),d=this.clone();const e=b.toString(2);for(let b=e.length-1;0<=b;b--)+e[b]&&(c=c.multiply(d)),0<b&&(d=d.multiply(d));return c}throw that_c=b?.constructor?.name,that_cc=b?.prototype?.constructor?.name,err("Type","Either `that` was an invalid type or this code hasn't implemented expontitation for the type of `that` yet. Typeof that: "+typeof b+(that_c?", instanceof: "+that_c+(that_cc?" and "+that_cc:""):""))},augment:function(b){if(this.auto_really_scale(),this.auto_really_transpose(),this.length!==b.length)throw err("Value","Cannot augment "+this.to_dim_name()+" with "+this.to_dim_name()+"! The 2 Matrices must have the same number of rows!");if(this.is_tranposed!==b.is_tranposed)throw err("Value","Can not augment a transposed matrix with a non-transposed matrix nor vice-versa!");const c=new Matrix(this.length,this.width+b.width);if(this.is_tranposed)for(let d,e,f=0;f<c.m.length;f++)d=f%this.m.length,e=f-d,c.m[f]=f<this.m.length?this.m[d]:b.m[d];else for(let d,e,f=0;f<c.m.length;f++)d=f%c.width,e=f-d,c.m[f]=d<this.width?this.m[e+d]:b.m[e+d-this.width];return c},ref:function(b=null,c=!1,d=!1){this.auto_really_scale(),this.auto_really_transpose();const e=c?this:this.clone(),f=b?.clone();let g=BooleanArray(e.length),h=BooleanArray(e.width),l=BooleanArray(e.width),m=new Int32Array(e.length),n=new Int32Array(e.width);const o=function(b,c,d){if(0===d)throw err("Value","multiplier of zero is impractical; you probably did something wrong XD!");b*=e.width,c*=e.width;for(let g=0;g<e.width;g++)e.m[b]-=e.m[c]*d,f&&(f.m[b]-=e.m[c]*d),b++,c++},p=function(b){let c=e.leading_zeroes[b];b*=e.width,b+=c;const d=e.m[b];e.m[b]=1,c++,b++;for(let g=c;g<e.width;g++)e.m[b]/=d,f&&(f.m[b]/=d)},q=function(b,c){let g;if(d){const d=h,e=l;if(e[b]&&e[c]){const f=m,h=n;g=f[h[b]],f[h[b]]=f[h[c]],f[h[c]]=g,g=d[h[b]],d[h[b]]=d[h[c]],d[h[c]]=g,g=h[b],h[b]=h[c],h[c]=g,g=e[b],e[b]=e[c],e[c]=g}}b*=e.width,c*=e.width;for(let d=0;d<e.width;d++)g=e.m[b],e.m[b]=e.m[c],e.m[c]=g,f&&(g=f.m[b],f.m[b]=f.m[c],f.m[c]=g),b++,c++};e.count_leading_zeroes();for(let f,k=0;k<e.length;k++)f=e.leading_zeroes[k],f>e.width||h[f]||(h[f]=!0,l[k]=!0,m[f]=k,n[k]=f,g[k]=!0,p(k));let r,s,t,u;for(u,s=1;s<e.width;s++)if(!h[s])for(r=0;r<e.length;r++)if(!g[r]&&(u=e.leading_zeroes[r],u<=s)){for(;u<s;)o(r,m[u],e.m[r*e.width+u]),e.count_leading_zeroes(),u=e.leading_zeroes[r];if(u===s){h[u]=!0,l[r]=!0,m[u]=r,n[r]=u,g[r]=!0,p(r);break}}for(r=1;r<e.length;r++)if(!g[r])for(u=e.leading_zeroes[r];h[u];)o(r,m[u],e.m[r*e.width+u]),e.count_leading_zeroes(),u=e.leading_zeroes[r];const v=[];for(r=0;r<e.length;r++)v[r]=[r,e.leading_zeroes[r]];for(v.sort((c,d)=>c[1]-d[1]),r=0;r<e.length;r++)v[r]=v[r][0];const w=BooleanArray(e.length);for(r=0;r<e.length;r++)if(s=r,s===v[s]&&(w[s]=!0),!w[s])for(;!w[s];){if(s===v[s])throw err("Fatal","value in `sir` returned to self, but not immediately!");if(w[s]=!0,w[v[s]])break;q(s,v[s]),s=v[s]}if(d)for(r=0;r<e.length;r++)for(s=e.leading_zeroes[r]+1;s<e.width;s++)t=e.m[r*e.width+s],u=m[s],h[s]&&0!==t&&o(r,u,t);return f?e.augment(f):e},rref:function(b=null,c=!1){return this.ref(b,c,!0)},inv:function(){const b=this.augment(this.ident()).rref();return b.slice(0,this.length,0,this.width).isIdent()?b.slice(0,this.length,this.width):b.fill(NaN)},fill:function(b){for(let c=0;c<this.m.length;c++)this.m[c]=b;return this},fillRow:function(b,c){for(let d=c*this.width;d<c*(1+this.width);d++)this.m[d]=b;return this},fillColumn:function(b,c){for(let d=c;d<this.m.length;d+=this.width)this.m[d]=b;return this},paste:function(b,c=2){const d="in: "+this.to_dim_name()+".paste(location);";if(b||err("Type","location is a required parameter!"+d),"object"!=typeof b&&err("Type","location must be an array-like object!"+d),!b instanceof Matrix&&"number"!=typeof b?.length&&err("Type","location needs to have a length!"+d),b instanceof Matrix.Dynamic){let c,d,e=Math.min(this.m.length,b.length*b.width),f=0;for(c=0;c<b.length&&f<e;c++)for(d=0;d<b.width&&f<e;d++,f++)b.m[c][d]=this.m[f]}else if(b instanceof Matrix){let c=Math.min(this.m.length,b.m.length);for(let d=0;d<c;d++)b.m[d]=this.m[d]}else if(1===c)for(let c=0;c<this.m.length;c++)b[c]=this.m[c];else if(2===c)for(let c=0,d=0,e=0;c<this.m.length;c++)b[e][d]=this.m[c],d++,d===this.width&&(d=0,e++);else for(let e,d=0,f=0,g=0;d<this.m.length;d++){e=b[g][f];for(let b=3;b<c;b++)e=e[0];e[0]=this.m[d],f++,f===this.width&&(f=0,g++)}return b}}),Matrix.fromArray=function(b){const c=b?.length,d=b?.[0]?.length;let e=!0;if(c??(e=!1),d??(e=!1),!e)throw err("Type","Your array_like_object ("+b+") was not a valid 2-D array!");const f=new Matrix(c,d);for(let e=0;e<c;e++)for(let c=0;c<d;c++)f.m[e*f.width+c]=b[e][c];return f},classify(Matrix,{hypot:Matrix.prototype.abs,vector_length:Matrix.prototype.abs,diagonal_sum:Matrix.prototype.diagonal_total,diagonal_hypot:Matrix.prototype.diagonal_abs,hypotrunc:Matrix.prototype.hypofloor},{},"UPDATE");const Vector=class extends Matrix{constructor(b){super(b,1)}};classify(Vector,{width:1,leading_zeroes:0,multiply:function(b,c=!1){return b instanceof Vector||b.is_vector()?this.dot(b):b instanceof Number?this.really_scale(b):(b=Matrix.prototype.multiply.call(this,b),c?b:b.toVector())},count_leading_zeroes:function(){let b;for(b=0;b<this.m.length;b++){if(!Matrix.eq0(this.m[b])){b--;break}this.m[b]=0}return b}},{},"UPDATE"),Matrix.Dynamic=function(b,c){this.length=b||1,this.width=c||1;let d,e;for(this.m=Array(this.length),d=0;d<this.length;d++)for(this.m[d]=Array(this.width),e=0;e<this.width;e++)this.m[d][e]=[0];const f=this.actual_transposition=Array(this.width);for(d=0;d<this.width;d++)for(f[d]=Array(this.length),e=0;e<this.length;e++)f[d][e]=this.m[e][d];return this},classify(Matrix.Dynamic,{},{},1,1),coalesce(Matrix.Dynamic.prototype,Matrix.prototype,["abs","minor","ident","zero"]),classify(Matrix.Dynamic,{m:[[[0]]],actual_transposition:[[[0]]],get_at:function(b,c){return this.m?.[b]?.[c]?.[0]},set_at:function(b,c,d){if(a=this.m[b],!!a)return a=a[c],a?a[0]=d:void 0}},{},classify.UPDATE),Matrix.random=function(b,c){const d=new Matrix(b,c);let e;for(e=0;e<d.m.length;e++)d.m[e]=Matrix.rand.num();return d},Matrix.rand=new Rand,Matrix.new_rand=function(b,c,d){this.rand.constructor(b,c,d)},Matrix.epsilon=2**-22,Matrix.eq0=function(b){if("number"==typeof b)return Math.abs(b)<Matrix.epsilon;if(b instanceof Matrix)for(let c=0;c<b.m.length;c++)if(!Matrix.eq0(b.m[c]))return!1;return!0},Matrix.gen_singular=function(b,c){c??=b+1;const d=Matrix.random(b,c),e=Matrix.random(c,b);return matrix_mult(d,e)};const testee=Matrix.fromArray([[-3,1,-1,1,-1,2,1,-3],[-3,1,1,1,0,1,0,0],[-3,-4,1,2,1,2,-4,-1],[0,1,3,0,-2,-2,-3,-2],[-4,-1,2,-2,-1,-2,3,-1],[0,2,1,2,0,-3,-4,1],[3,3,3,0,2,0,2,-4],[1,-4,-3,-4,2,3,-2,3]]);onclick=function(){const b=testee;console.log("me = "+b.toString(".3")),console.log("leading zeroes: "+b.count_leading_zeroes()),console.log("ref: "+b.ref().toString(".3")),console.log("rref: "+b.rref().toString(".3")),console.log("rref: "+b.rref(b.ident()).toString(".3"))},window.testee=testee,window.Matrix=Matrix,window.BooleanArray=BooleanArray;
