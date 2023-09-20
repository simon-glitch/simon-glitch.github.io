/***
  JS Method Speed Test
    by Simon Glitch
  idea:
    how fast are JavaScript's methods? If we use methods to perform simple math operations, instead of just using the built-in operators, how much does that actually slow down our code?
***/


// setup classes
SCOPE_NUMBER: {
  Number.prototype.add = function add(that){
    return this + that;
  };
  Number.prototype.sub = function sub(that){
    return this - that;
  };
  Number.prototype.mul = function mul(that){
    return this * that;
  };
  Number.prototype.div = function div(that){
    return this / that;
  };
  Number.prototype.mod = function mod(that){
    return this % that;
  };
  // unsigned modulo; essentially, (this % that) is always >= 0, even if this is negative
  Number.prototype.umod = function mod(that){
    return ((this % that) + that) % that;
  };
  Number.prototype.pow = function pow(that){
    return this ** that;
  };
  Number.prototype.and = function bitwise_and(that){
    return this & that;
  };
  Number.prototype.xor = function bitwise_xor(that){
    return this ^ that;
  };
  Number.prototype.or  = function bitwise_or (that){
    return this | that;
  };
  Number.prototype.lshift = function left_shift(that){
    return this << that;
  };
  Number.prototype.rshift = function rirght_shift(that){
    return this >> that;
  };
  Number.prototype.urshift = function unsigned_right_shift(that){
    return this >>> that;
  };
  Number.prototype.neg = function neg(that){
    return -this;
  };
  Number.prototype.not = function bitwise_not(that){
    return ~this;
  };
  Number.prototype.inv = function inv(that){
    return 1/this;
  };
  Number.prototype.sq = function square(){
    return this * this;
  };
  Number.prototype.cb = function cube(){
    return this * this * this;
  };
  Number.prototype.sqrt = function sqrt(){
    return Math.sqrt(this);
  };
  Number.prototype.exp = function exp(){
    return Math.exp(this);
  };
  Number.prototype.log = function log(){
    return Math.log(this);
  };
  // the same as Math.log(1 + this)
  Number.prototype.log1p = function log1p(){
    return Math.log1p(this);
  };
  // the same as Math.exp(this - 1)
  Number.prototype.expm1 = function expm1(){
    return Math.expm1(this);
  };
  // the same as this**(1/3)
  Number.prototype.cbrt = function cbrt(){
    return Math.cbrt(this);
  };
  // approximately the same as Math.floor(this % (2**32)) * Math.floor(that % (2**32))
  Number.prototype.imul = function imul(that){
    return Math.imul(this, that);
  };
  // approximately the same as (Math.round( this / 2**(Math.floor(Math.log2(this)) - 24) )) * 2**(Math.floor(Math.log2(this))
  Number.prototype.fround = function fround(){
    return Math.fround(this);
  };
  // the same as x - (x % 1), since JavaScript has a signed modulo operator
  Number.prototype.trunc = function trunc(){
    return Math.trunc(this);
  };
  // the same as (this ** 2 + that ** 2) ** (1/2)
  Number.prototype.hypot = function hypot(that){
    return Math.hypot(this, that);
  };
  Number.prototype.min = function min(that){
    return Math.min(this, that);
  };
  Number.prototype.max = function max(that){
    return Math.max(this, that);
  };

  Number.prototype.log2 = function log2(){
    return Math.log2(this);
  };
  Number.prototype.log10 = function log10(){
    return Math.log10(this);
  };
  Number.prototype.floor = function floor(){
    return Math.floor(this);
  };
  Number.prototype.ceil = function ceil(){
    return Math.ceil(this);
  };
  Number.prototype.round = function round(){
    return Math.round(this);
  };
  // the same as Math.floor(31 - Math.floor(Math.log2( Math.floor(this) % (2**32) ) || 0))
  Number.prototype.clz32 = function clz32(){
    return Math.clz32(this);
  };
  
  // trig funcstions
  // regexp for method names: (?<=\.)a?(c(os|sc|ot)|s(in|ec)|t(an))h?
  SCOPE_TRIG: {
    Number.prototype.cos = function cos(){
      return Math.cos(this);
    };
    Number.prototype.sin = function sin(){
      return Math.sin(this);
    };
    Number.prototype.tan = function tan(){
      return Math.tan(this);
    };
    Number.prototype.sec = function sec(){
      return Math.sec(this);
    };
    Number.prototype.csc = function csc(){
      return Math.csc(this);
    };
    Number.prototype.cot = function cot(){
      return Math.cot(this);
    };
    SCOPE_INVERSES: {
      Number.prototype.acos = function acos(){
        return Math.acos(this);
      };
      Number.prototype.asin = function asin(){
        return Math.asin(this);
      };
      Number.prototype.atan = function atan(){
        return Math.atan(this);
      };
      Number.prototype.asec = function asec(){
        return Math.asec(this);
      };
      Number.prototype.acsc = function acsc(){
        return Math.acsc(this);
      };
      Number.prototype.acot = function acot(){
        return Math.acot(this);
      };
    }
    SCOPE_HYPERBOLIC: {
      Number.prototype.cosh = function cosh(){
        return Math.cosh(this);
      };
      Number.prototype.sinh = function sinh(){
        return Math.sinh(this);
      };
      Number.prototype.tanh = function tanh(){
        return Math.tanh(this);
      };
      Number.prototype.sech = function sech(){
        return Math.sech(this);
      };
      Number.prototype.csch = function csch(){
        return Math.csch(this);
      };
      Number.prototype.coth = function coth(){
        return Math.coth(this);
      };
      SCOPE_HYPERBOLIC_INVERSES: {
        Number.prototype.acosh = function acosh(){
          return Math.acosh(this);
        };
        Number.prototype.asinh = function asinh(){
          return Math.asinh(this);
        };
        Number.prototype.atanh = function atanh(){
          return Math.atanh(this);
        };
        Number.prototype.asech = function asech(){
          return Math.asech(this);
        };
        Number.prototype.acsch = function acsch(){
          return Math.acsch(this);
        };
        Number.prototype.acoth = function acoth(){
          return Math.acoth(this);
        };
      }
    }
  }

}

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




// I probably don't need this XD
const to_engineering = (function(){
  const default_illions = [
    "K" , "M" , "B" , "T" , "Q" , "qI", "sX", "sP", "oC", "nN",
    "dC", "UdC", "DdC", "TdC", "QdC", "qIdC", "sXdC", "sPdC", "oCdC", "nNdC",
    "vG", "UvG", "DvG", "TvG", "QvG", "qIvG", "sXvG", "sPvG", "oCvG", "nNvG",
    "tG", "UtG", "DtG", "TtG", "QtG", "qItG", "sXtG", "sPtG", "oCtG", "nNtG",
    "qG", "UqG", "DqG", "TqG", "QqG", "qIqG", "sXqG", "sPqG", "oCqG", "nNqG",
    "qqG", "UqqG", "DqqG", "TqqG", "QqqG", "qIqqG", "sXqqG", "sPqqG", "oCqqG", "nNqqG",
    "sxG", "UsxG", "DsxG", "TsxG", "QsxG", "qIsxG", "sXsxG", "sPsxG", "oCsxG", "nNsxG",
    "spG", "UspG", "DspG", "TspG", "QspG", "qIspG", "sXspG", "sPspG", "oCspG", "nNspG",
    "ocG", "UocG", "DocG", "TocG", "QocG", "qIocG", "sXocG", "sPocG", "oCocG", "nNocG",
    "nnG", "UnnG", "DnnG", "TnnG", "QnnG", "qInnG", "sXnnG", "sPnnG", "oCnnG", "nNnnG",
    "cenT"
  ];
  return function to_engineering(number, opt){
    // prevent weird types from causing issues
    number = Number(number);
    sign = number.sign;
    number = Math.abs(number);
    // error checking, because why not?
    SCOPE_ERROR_CHECKING: {
      // use built in toString for NaN and Infinity
      if(!isFinite(number)){
        return "" + number;
      }
      
      
      // read parameters from opt
      //   use default values for anything that is omitted
      opt = (typeof opt === "object") ?opt :{};
      try{
        length  = opt.length  ??  6;
        base    = opt.base    ?? 10;
        power   = opt.power   ??  3;
        illions = opt.illions ?? default_illions;
        // limit illions to decillion at max
        max_illion              = opt.max_illion              ??   11;
        thousand_separator      = opt.thousand_separator      ??   "";
        max_left_point_zeros    = opt.max_left_point_zeros    ??    1;
        use_left_point_notation = opt.use_left_point_notation ?? true;
        use_thousand_separator_after_point    = opt.use_thousand_separator_after_point    ?? true;
        left_point_zeros_count_towards_length = opt.left_point_zeros_count_towards_length ?? true;
      }
      catch(e){
        return ("one of the opt object's properties is not allowed to be accessed; use a friendlier object next time (" + e.name + ": " + e.message + ")!");
      }
      
      const enforce_range = function(value, name, min, max){
        let size_issue = true;
        name = "opt." + name + " ";
        let msg = name;
        
        let ok = false;
        if(value < min){
          msg += "is too small";
        }
        else if(value > max){
          msg += "is too large";
        }
        else if(((value % 1) + 1) % 1 > 0){
          msg += "is not an integer";
          size_issue = false;
        }
        else{
          ok = true;
        }
        
        if(!ok){
          msg += "! (" + name + (size_issue ?("must be between " + min + " and " + max) :"must be an integer") + ")";
          return msg;
        }
        
        return false;
      };
      const enforce_type = function(value, name, class_f){
        if(typeof class_f == "string"){
          if(typeof value == class_f) return false;
        }
        if(value instanceof class_f) return false;
        return `TypeError: expected opt.${name} to be a ${class_f.name}, but found a ${value.constructor.name} instead!`;
      };
      
      let msg = (
        enforce_range(length, "length", 1, 3000) ||
        enforce_range(base  , "base"  , 2,   36) ||
        enforce_range(power , "power" , 1,   64) ||
        enforce_range(max_illion, "max_illion", 0, 10000) ||
        enforce_range(max_left_point_zeros, "max_left_point_zeros", 0, 1000)
      );
      if(msg) return msg;
      
      msg = (
        enforce_type(base  , "base"  , "number") ||
        enforce_type(power , "power" , "number") ||
        enforce_type(length, "length", "number") ||
        enforce_type(illions   , "illions"   ,  Array  ) ||
        enforce_type(max_illion, "max_illion", "number") ||
        enforce_type(thousand_separator      , "thousand_separator"     , "string" ) ||
        enforce_type(max_left_point_zeros    , "max_left_point_zeros"   , "number" ) ||
        enforce_type(use_left_point_notation , "use_left_point_notation", "boolean") ||
        enforce_type(use_thousand_separator_after_point   , "use_thousand_separator_after_point"   , "boolean") ||
        enforce_type(left_point_zeros_count_towards_length, "left_point_zeros_count_towards_length", "boolean")
      );
      if(msg) return msg;
      
      illions = illions.slice(0, max_illion);
    }
    // end of error checking
    
    // store this as a variable because I use it multiple times
    let over_one = (number >= 1);
    let is_zero = (number == 0);
    
    if(is_zero){
      number = "0";
      // return just "0" if the length is only one
      if(length == 1) return number;
      // increment to include the period
      length ++;
      number += ".";
      // add zeros until we reach length
      while(number.length < length){
        number += "0";
      }
    }
    
    if(!is_zero){
      // the expression on the right defaults to: number <= 1/1000
      
      // put number in engineering notation
      let s = Math.floor(Math.log(number) / Math.log(base));
      let s2 = Math.floor(Math.log2(number));
      
      // format to {length} significant figures
      // bring our number up to being a 53 digit integer
      let big_power = (53 - s2);
      let big_sign = Math.sign(big_power)
      let biig_power = BigInt(big_power * big_sign);
      let big_factor = 2 ** big_power;
      let biig_factor = 2n ** biig_power;
      number *= big_factor;
      // we can scale our bigint down by big_factor later
      // now make a bigint of our number
      let bi = BigInt(number);
      // now scale the bigint up so it will keep a precision of {length} digits in base {base}
      let precision_factor = BigInt(base) ** BigInt(length);
      bi *= precision_factor;
      // now scale bi back down to what it is supposed to be
      if(big_sign < 0)
        bi *= biig_factor;
      if(big_sign >= 0)
        bi /= biig_factor;
      
      // now just get the bigint in the base we want it in
      number = bi.toString(base);
      
      while(number.length > length){
        number = number.slice(0, -1);
      }
      while(number.length < length){
        number += "0";
      }
      
      // add illions sufffix, or convert to scientific notation
      if(over_one){
        // sr is the number of digits to the left of the illion separator (, subtract 1)
        let sr = (s % power);
        // make s a multiple of power, for the e+ format later
        s -= sr;
        // figure out which illion our number is on
        let st = s / power;
        // increase sr because we need to grab an extra number when adding the period
        sr ++;
        // add the period
        if(sr < length)
          number = number.slice(0, sr) + "." + number.slice(sr);
        
        // add illion prefix, up to 999.9 Quadrillion
        if(st > 0 && st < illions.length + 1){
          number = (st > 0) ?(number + " " + (illions)[st - 1]) :number;
        }
        // add e+ expression if the illion is too big
        if(st >= illions.length + 1){
          number = number + "e+" + s;
        }
      }
      // add prefix of zeros, or convert to scientific notation
      if(!over_one){
        if(max_left_point_zeros && ((-s) <= max_left_point_zeros)){
          str = "0.";
          for(let i = 1; i < -s; i++){
            str += "0";
          }
          number = str + number;
          if(left_point_zeros_count_towards_length){
            // increase length, in order to account for the decimal point
            length ++;
            // trim off end of the number
            //   if you don't want your number trimmed, then set max_left_point_zeros to 0.
            if(number.length > length){
              number = number.slice(0, length);
            }
          }
        }
        else{
          // add period
          if(number.length > 1){
            number = number[0] + "." + number.slice(1);
          }
          // add e notation
          number = number + "e" + s;
        }
      }
    }
    
    // add thousand separators
    let dot_index = number.indexOf(".");
    if(dot_index > -1){
      let tl = thousand_separator.length;
      // thosand separator before the period
      for(let i = power + (dot_index % power); i < dot_index; i += power){
        // insert the thousand separator
        number = number.slice(0, i) + thousand_separator + number.slice(i);
        // shift i and dot_index, because the thousand separator shifted the rest of the string over
        i += tl;
        dot_index += tl;
      }
      // thosand separator after the period
      if(use_thousand_separator_after_point) for(let i = dot_index +1 +power; i < number.length; i += power){
        // insert the thousand separator
        number = number.slice(0, i) + thousand_separator + number.slice(i);
        // shift i, because the thousand separator shifted the rest of the string over
        i += tl;
      }
    }
    
    
    return (number.sign < 0 ?"-" :"") + number;
  }
})();


const default_opt = {
  timespan_for_testing: 2*1000,
  stating_n: 100,
  virtual_thread_count: 4,
  frames_per_thread: 10,
  mspf: 50,
  n_exponent: 1.1,
}

const time = function time(f, f_name, opt){
  // opt is optional
  opt = opt || default_opt;
  
  // total running time to aim for, in ms
  let tg = opt.timespan_for_testing || default_opt.timespan_for_testing;
  // number of virtual "threads" to split work between in the current JS thread
  let thread_c = opt.virtual_thread_count || default_opt.virtual_thread_count;
  // the number of frames to run on each thread before synching all threads back together
  let thread_f = opt.frames_per_thread || default_opt.frames_per_thread;
  
  let t1, t2, dt;
  let ct1, ct2, cdt;
  let adt = 0;
  
  // starting value of n
  //   > n is the number of times to execute the function per frame
  let n = opt.starting_n || default_opt.starting_n;
  let n_total = 0;
  let n_rounded = Math.floor(n);
  let n_exponent = opt.n_exponent || default_opt.n_exponent;
  let mspf = opt.mspf || default_opt.mspf;
  
  let recorded = {
    "adt": [],
    "cdt": [],
    "eps": [],
    "n_rounded": [],
  };
  
  t1 = new Date();
  
  // these 4 could be inside the function's scope, but I like them being here
  ct1 = new Date();
  ct2 = new Date();
  cdt = (ct1.getTime() -ct2.getTime());
  let i = 0;
  // need to do some scope snatching
  let resolve_f;
  
  const finish_t = function finish_t(){
    clearInterval(tid);
    
    // print / report recordings
    if(do_record){
      console.log(recorded);
    }
    
    t2 = new Date();
    dt = (t2.getTime() - t1.getTime());
    
    let eps = n_total / (adt / 1000);
    eps = to_engineering(eps);
    
    
    let str = "";
    str += `function: ${f_name || f.name || "anonymous"}:`;
    str += `\n* took ${(adt / 1000).toFixed(3)} seconds;`;
    str += `\n* executed f ${n_total} times;`;
    str += `\n* that is ${eps} exec / sec;`;
    str += `\n  (true time: ${(dt / 1000).toFixed(3)} seconds);`;
    str += `\n  (effective work rate: ${(100 * adt / dt).toFixed(4)}%);`;
    
    resolve_f(str);
  };
  
  
  
  let threads_done = true;
  let how_many_completed = 0;
  let are_completed = [];
  let threads_data = [];
  for(let i = 0; i < thread_c; i++){
    threads_data[i] = {taci: i};
  }
  
  // kill_all is an emergency shut off switch
  let kill_all = false;
  const generate_t = function(me){
    execute_t = function execute_t(){
      // allow emergency stop
      if(kill_all){
        clearInterval(me.tid);
        return;
      }
      if(me.busy) return;
      // the thread finishes after a certain number of frames, handing its work over to the thread manager and waiting for the next round of testing!
      if(me.frame_count >= thread_f){
        clearInterval(me.tid);
        // me.taci is the "threads are completed index"
        // > this line of code reports that the thread actually finished its task
        are_completed[me.taci] = true;
        return;
      }
      
      // keep track of how many frames this thread has done
      me.frame_count ++;
      
      // console.log(`did ${me.frame_count} frames!`);
      me.busy = true;
      
      me.ct1 = new Date();
      
      for(me.i = 0; me.i < me.n_rounded; me.i++){
        f(me.i);
      }
      
      me.n_rounded_prev = me.n_rounded;
      
      // accumulate me.n_total
      me.n_total += me.n_rounded;
      // increase the size of me.n exponentially, in order speed up the for loop
      //   (by making it do more steps in a row, at a time)
      me.n *= me.n_exponent;
      // we want to round me.n, so me.n_total is accumulated with maximum precision
      me.n_rounded = Math.floor(me.n);
      
      // this whole thing falls apart if
      if(me.n >= Number.MAX_SAFE_INTEGER){
        resolve_f("me.n got too big, somehow");
        // let's clear the intervals
        kill_all = true;
        // this actually prevents the function from running again, because me.busy still == true
        return;
      }
      me.ct2 = new Date();
      me.cdt = (me.ct2.getTime() -me.ct1.getTime());
      me.adt += me.cdt;
      
      // make sure the frames don't get too slow
      if(me.cdt >= 2 * me.mspf){
        me.n_exponent = 1;
      }
      
      me.busy = false;
    };
    return execute_t;
  };
  for(let i = 0, td; i < thread_c; i++){
    td = threads_data[i];
    // NOTE: we could just use execute_t directly, since JavaScript would let us use `this` instead of `me`, but I like using a generator instead, since I would have to bind the threads when doing setInterval(threads_data.execute_t) anyways.
    threads_data.execute_t = generate_t(threads_data);
  }
  
  // used to turn off the thread manager
  tmid = -1;
  
  const thread_manager_t = function(){
    if(kill_all){
      clearInterval(tmid);
    }
    // vv  thread fusion is buried in here  vv
    if(!threads_done){
      // first, check if we are done
      let done_yet = true;
      for(let i = how_many_completed; i < are_completed.length; i++){
        if(!are_completed[i]){
          how_many_completed ++;
          done_yet = false;
          break;
        }
      }
      // vv  thread fusion  vv
      if(done_yet){
        // now reset the thread completion tracking
        for(let i = 0; i < are_completed.length; i++){
          are_completed[i] = false;
        }
        how_many_completed = 0;
        threads_done = true;
        
        // THREAD FUSION!
        //   now, combine data from threads
        let tc = thread_c;
        let delta_adt = 0;
        cdt = 0;
        n = 0;
        n_exponent = 0;
        for(let i = 0, td; i < thread_c; i++){
          td = threads_data[i];
          // use average time
          delta_adt += td.adt; // this /= thread_c
          // I would like to know how long the slowest thread took
          cdt = Math.max(cdt, td.cdt);
          // keep average n for the next round of tests
          n += td.n; // this /= thread_c
          // keep average n_exponent for the next round of tests
          n_exponent += td.n_exponent; // this /= thread_c
          // tally up all executions from all threads, so we can see the true power of virtual multi-threading!
          n_total += td.n_total;
        }
        n_rounded = Math.floor(n);
        n /= thread_c;
        n_exponent /= thread_c;
        delta_adt /= thread_c;
        adt += delta_adt
        
        // now, use the combined data
        // > record values
        if(do_record){
          let eps = n_total / (adt / 1000);
          recorded.adt.push(adt);
          recorded.cdt.push(cdt);
          recorded.eps.push(eps);
          recorded.me.n_rounded.push(me.n_rounded_prev);
          
          let pc = 100 * (adt / tg);
          console.log(to_engineering(pc, {length: (pc >= 100 ?3 :2)}) + " %");
        }
        // > finish when we run out of time
        if(adt >= tg){
          finish_t(resolve_f);
        }
      }
      return;
    }
    // threads are done / ready?
    for(let i = 0, td; i < thread_c; i++){
      td = threads_data[i];
      
      // reset values used for the internal for-loop
      td.n = n;
      td.n_rounded = n;
      td.n_rounded_prev = 0;
      td.n_exponent = n_exponent;
      td.n_total = 0;
      td.ct1 = new Date();
      td.ct2 = td.ct1;
      td.adt = 0;
      td.cdt = 0;
      td.i = 0;
      
      // thread index
      td.ti = ti;
      // count number of frames
      
      td.frame_count = 0;
      // this prevents the interval function from ever becoming overloaded
      td.busy = false;
      // needed in order to shut down our function
      td.tid = setInterval(td.execute_t);
    }
    
    
  };
  
  const start_t = function(resolve_f_given){
    resolve_f = resolve_f_given;
    tmid = setInterval(thread_manager_t, mspf);
  };
  
  let p = new Promise(start_t);
  
  
  
  return p;
};


SCOPE_TESTING: {

  const a1 = new Num(5);
  const a2 = 5;

  let
    test1, test2, test3,
    test4, test5, test6,
    test7, test8, test9,
    test10, test11, test12, test13
  ;


  // add ^3
  test1 = function(){
    time((b) => {
      a1.add(
        a1.add(
          a1.add(
            new Num(b)
          )
        )
      );
    }, "add^3").then((v) => {
      console.log("methodized Object add^3:");
      console.log(v);
      
      test2();
    });
  };

  test2 = function(){
    time((b) => {
      a2.add(
        a2.add(
          a2.add(
            b
          )
        )
      );
    }, "add^3").then((v) => {
      console.log("methodized add^3:");
      console.log(v);
      
      test3();
    });
  };

  test3 = function(){
    // then do the 2nd test (i.e. our control group)
    time((b) => {
      a1 + (a1 + (a1 + b));
    }, "add^3").then((v) => {
      console.log("normal add^3:");
      console.log(v);
      
      test4();
    });
  };

  // add ^1
  test4 = function(){
    time((b) => {
      a1.add(new Num(b));
    }, "add^1").then((v) => {
      console.log("methodized Object add:");
      console.log(v);
      
      test5();
    });
  };

  test5 = function(){
    time((b) => {
      a2.add(b);
    }, "add^1").then((v) => {
      console.log("methodized add:");
      console.log(v);
      
      test6();
    });
  };

  test6 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      a2 + b;
    }, "add^1").then((v) => {
      console.log("normal add:");
      console.log(v);
      
      test7();
    });
  };
  
  // sq > log1p
  test7 = function(){
    time((b) => {
      (a1.sq()).log1p();
    }, "sq>log1p").then((v) => {
      console.log("methodized Object sq>log1p:");
      console.log(v);
      
      test8();
    });
  };

  test8 = function(){
    time((b) => {
      (a2.sq()).log1p();
    }, "sq>log1p").then((v) => {
      console.log("methodized sq>log1p:");
      console.log(v);
      
      test9();
    });
  };

  test9 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      Math.log1p(a2 ** 2);
    }, "sq>log1p").then((v) => {
      console.log("normal sq>log1p:");
      console.log(v);
      
      test10();
    });
  };
  
  
  // hypot
  test10 = function(){
    time((b) => {
      a1.hypot(new Num(b));
    }, "hypot").then((v) => {
      console.log("methodized Object hypot:");
      console.log(v);
      
      test11();
    });
  };

  test11 = function(){
    time((b) => {
      a2.hypot(b);
    }, "hypot").then((v) => {
      console.log("methodized hypot:");
      console.log(v);
      
      test12();
    });
  };

  test12 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      Math.hypot(a2, b);
    }, "hypot").then((v) => {
      console.log("normal hypot:");
      console.log(v);
      
      test13();
    });
  };

  // base return
  test13 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      return a2;
    }, "return").then((v) => {
      console.log("return:");
      console.log(v);
      
      return;
    });
  };

  test1();
}



