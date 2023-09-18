
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
    return new Num(this.v + that.v);
  };
  Num.prototype.sub = function sub(that){
    return new Num(this.v - that.v);
  };
  Num.prototype.mul = function mul(that){
    return new Num(this.v * that.v);
  };
  Num.prototype.div = function div(that){
    return new Num(this.v / that.v);
  };
  Num.prototype.mod = function mod(that){
    return new Num(this.v % that.v);
  };
  // unsigned modulo; essentially, (this.v % that.v) is always >= 0, even if this.v is negative
  Num.prototype.umod = function mod(that){
    return new Num(((this.v % that.v) + that.v) % that.v);
  };
  Num.prototype.pow = function pow(that){
    return new Num(this.v ** that.v);
  };
  Num.prototype.and = function bitwise_and(that){
    return new Num(this.v & that.v);
  };
  Num.prototype.xor = function bitwise_xor(that){
    return new Num(this.v ^ that.v);
  };
  Num.prototype.or  = function bitwise_or (that){
    return new Num(this.v | that.v);
  };
  Num.prototype.lshift = function left_shift(that){
    return new Num(this.v << that.v);
  };
  Num.prototype.rshift = function rirght_shift(that){
    return new Num(this.v >> that.v);
  };
  Num.prototype.urshift = function unsigned_right_shift(that){
    return new Num(this.v >>> that.v);
  };
  Num.prototype.neg = function neg(that){
    return new Num(-this.v);
  };
  Num.prototype.not = function bitwise_not(that){
    return new Num(~this.v);
  };
  Num.prototype.inv = function inv(that){
    return new Num(1/this.v);
  };
  Num.prototype.sq = function square(){
    return new Num(this.v * this.v);
  };
  Num.prototype.cb = function cube(){
    return new Num(this.v * this.v * this.v);
  };
  Num.prototype.sqrt = function sqrt(){
    return new Num(Math.sqrt(this.v));
  };
  Num.prototype.exp = function exp(){
    return new Num(Math.exp(this.v));
  };
  Num.prototype.log = function log(){
    return new Num(Math.log(this.v));
  };
  // the same as Math.log(1 + this.v)
  Num.prototype.log1p = function log1p(){
    return new Num(Math.log1p(this.v));
  };
  // the same as Math.exp(this.v - 1)
  Num.prototype.expm1 = function expm1(){
    return new Num(Math.expm1(this.v));
  };
  // the same as this.v**(1/3)
  Num.prototype.cbrt = function cbrt(){
    return new Num(Math.cbrt(this.v));
  };
  // approximately the same as Math.floor(this.v % (2**32)) * Math.floor(that.v % (2**32))
  Num.prototype.imul = function imul(that){
    return new Num(Math.imul(this.v, that.v));
  };
  // approximately the same as (Math.round( this.v / 2**(Math.floor(Math.log2(this.v)) - 24) )) * 2**(Math.floor(Math.log2(this.v))
  Num.prototype.fround = function fround(){
    return new Num(Math.fround(this.v));
  };
  // the same as x - (x % 1), since JavaScript has a signed modulo operator
  Num.prototype.trunc = function trunc(){
    return new Num(Math.trunc(this.v));
  };
  // the same as (this.v ** 2 + that.v ** 2) ** (1/2)
  Num.prototype.hypot = function hypot(that){
    return new Num(Math.hypot(this.v, that.v));
  };
  Num.prototype.min = function min(that){
    return new Num(Math.min(this.v, that.v));
  };
  Num.prototype.max = function max(that){
    return new Num(Math.max(this.v, that.v));
  };
  Num.prototype.log2 = function log2(){
    return new Num(Math.log2(this.v));
  };
  Num.prototype.log10 = function log10(){
    return new Num(Math.log10(this.v));
  };
  Num.prototype.floor = function floor(){
    return new Num(Math.floor(this.v));
  };
  Num.prototype.ceil = function ceil(){
    return new Num(Math.ceil(this.v));
  };
  Num.prototype.round = function round(){
    return new Num(Math.round(this.v));
  };
  // the same as Math.floor(31 - Math.floor(Math.log2( Math.floor(this.v) % (2**32) ) || 0))
  Num.prototype.clz32 = function clz32(){
    return new Num(Math.clz32(this.v));
  };
  // the same as this.v / Math.abs(this.v || 1)
  Num.prototype.sign = function sign(){
    return new Num(Math.sign(this.v));
  };
  
  // constants from math
  const math_constants = [
    "E", "PI", "LN2", "LN10", "LOG10E", "LOG2E", "SQRT2", "SQRT1_2"
  ];
  for(let i = 0; i < math_constants.length; i++){
    Num[math_constants[i]] = new Num(Math[math_constants[i]]);
  }
  const number_constants = [
    "EPSILON", "MIN_VALUE", "MAX_VALUE",
    "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY",
    "MIN_SAFE_INTEGER", "MAX_SAFE_INTEGER"
  ];
  for(let i = 0; i < number_constants.length; i++){
    Num[number_constants[i]] = new Num(Number[number_constants[i]]);
  }
  
  
  SCOPE_CONVERSIONS: {
    Num.prototype.toString = function toString(radix){
      return this.v.toString(radix);
    };
    Num.prototype.toBoolean = function toBoolean(){
      return !!(this.v);
    };
    Num.prototype.toBigInt = function toBigInt(){
      return BigInt(this.floor().v);
    };
    Num.prototype.valueOf = function valueOf(){
      return this.v;
    };
    Num.prototype.toExponential = function toExponential(fractionDigits){
      return this.v.toExponential(fractionDigits);
    };
    Num.prototype.clone = function clone(){
      return new Num(this.v);
    };
    Num.prototype.isFinite = function isFinite(){
      return isFinite(this.v);
    }
    Num.prototype.isInfinite = function isFinite(){
      return !isFinite(this.v) && !isNaN(this.v);
    }
    Num.prototype.isNaN = function isNaN(){
      return isNaN(this.v);
    }
    Num.prototype.isInteger = function isInteger(){
      return Number.isInteger(this.v);
    }
    Num.prototype.isSafeInteger = function isSafeInteger(){
      return Number.isSafeInteger(this.v);
    }
  }
  
  
  window.Num = Num;
}

const Num = window.Num;

