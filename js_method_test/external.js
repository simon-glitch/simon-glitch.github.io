
SCOPE_OBJECT: {
  const Num = (function(){
    let n;
    n = function(v){
      if(!(this instanceof n)) return new n(v);
      this.v = v;
    };
    return n;
  })();
  
  Num.prototype.v = 0;
  
  Num.prototype.add = function add(that){
    return this.v + that.v;
  };
  Num.prototype.sub = function sub(that){
    return this.v - that.v;
  };
  Num.prototype.mul = function mul(that){
    return this.v * that.v;
  };
  Num.prototype.div = function div(that){
    return this.v / that.v;
  };
  Num.prototype.mod = function mod(that){
    return this.v % that.v;
  };
  // unsigned modulo; essentially, (this.v % that.v) is always >= 0, even if this.v is negative
  Num.prototype.umod = function mod(that){
    return ((this.v % that.v) + that.v) % that.v;
  };
  Num.prototype.pow = function pow(that){
    return this.v ** that.v;
  };
  Num.prototype.and = function bitwise_and(that){
    return this.v & that.v;
  };
  Num.prototype.xor = function bitwise_xor(that){
    return this.v ^ that.v;
  };
  Num.prototype.or  = function bitwise_or (that){
    return this.v | that.v;
  };
  Num.prototype.lshift = function left_shift(that){
    return this.v << that.v;
  };
  Num.prototype.rshift = function rirght_shift(that){
    return this.v >> that.v;
  };
  Num.prototype.urshift = function unsigned_right_shift(that){
    return this.v >>> that.v;
  };
  Num.prototype.neg = function neg(that){
    return -this.v;
  };
  Num.prototype.not = function bitwise_not(that){
    return ~this.v;
  };
  Num.prototype.inv = function inv(that){
    return 1/this.v;
  };
  Num.prototype.sq = function square(){
    return this.v * this.v;
  };
  Num.prototype.cb = function cube(){
    return this.v * this.v * this.v;
  };
  Num.prototype.sqrt = function sqrt(){
    return Math.sqrt(this.v);
  };
  Num.prototype.exp = function exp(){
    return Math.exp(this.v);
  };
  Num.prototype.log = function log(){
    return Math.log(this.v);
  };
  // the same as Math.log(1 + this.v)
  Num.prototype.log1p = function log1p(){
    return Math.log1p(this.v);
  };
  // the same as Math.exp(this.v - 1)
  Num.prototype.expm1 = function expm1(){
    return Math.expm1(this.v);
  };
  // the same as this.v**(1/3)
  Num.prototype.cbrt = function cbrt(){
    return Math.cbrt(this.v);
  };
  // approximately the same as Math.floor(this.v % (2**32)) * Math.floor(that.v % (2**32))
  Num.prototype.imul = function imul(that){
    return Math.imul(this.v, that.v);
  };
  // approximately the same as (Math.round( this.v / 2**(Math.floor(Math.log2(this.v)) - 24) )) * 2**(Math.floor(Math.log2(this.v))
  Num.prototype.fround = function fround(){
    return Math.fround(this.v);
  };
  // the same as x - (x % 1), since JavaScript has a signed modulo operator
  Num.prototype.trunc = function trunc(){
    return Math.trunc(this.v);
  };
  // the same as (this.v ** 2 + that.v ** 2) ** (1/2)
  Num.prototype.hypot = function hypot(that){
    return Math.hypot(this.v, that.v);
  };
  Num.prototype.min = function min(that){
    return Math.min(this.v, that.v);
  };
  Num.prototype.max = function max(that){
    return Math.max(this.v, that.v);
  };

  Num.prototype.log2 = function log2(){
    return Math.log2(this.v);
  };
  Num.prototype.log10 = function log10(){
    return Math.log10(this.v);
  };
  Num.prototype.floor = function floor(){
    return Math.floor(this.v);
  };
  Num.prototype.ceil = function ceil(){
    return Math.ceil(this.v);
  };
  Num.prototype.round = function round(){
    return Math.round(this.v);
  };
  // the same as Math.floor(31 - Math.floor(Math.log2( Math.floor(this.v) % (2**32) ) || 0))
  Num.prototype.clz32 = function clz32(){
    return Math.clz32(this.v);
  };
  
  window.Num = Num;
}

const Num = window.Num;

