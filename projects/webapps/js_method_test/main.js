/***
  JS Method Speed Test
    by Simon Glitch
  idea:
    how fast are JavaScript's methods? If we use methods to perform simple math operations, instead of just using the built-in operators, how much does that actually slow down our code?
***/


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

// I probably don't need this XD
const to_engineering = function(number, opt){
  // use built in toString for NaN and Infinity
  if(!isFinite(number)){
    return "" + number;
  }
  
  // read parameters from opt
  //   use default values for anything that is omitted
  opt = (typeof opt === "object") ?opt :{};
  length = opt.length ||  6;
  base   = opt.base   || 10;
  power  = opt.power  ||  3;
  dologs = opt.dologs || false;
  
  // store this as a variable because I use it multiple times
  let over_one = (number >= 1);
  
  // the expression on the right defaults to: number <= 1/1000
  // if(over_one || number <= base ** (-power)){
    // put number in engineering notation
    let s = Math.floor(Math.log(number) / Math.log(base));
    
    // format to {length} significant figures
    // big ints have unlimited precision. So, this can go all the way up to the number we need.
    number = Math.round(number * base ** (1 + length - s));
    // if number is bigger than Number.MAX_SAFE_INTEGER, then we won't be able to convert to bigint
    // the solution is actually to just shrink our number so it is within the range we need
    // bits is the number of bits required to represent number
    let bits = Math.floor(Math.log2(number));
    // we want to use 53 of the bits ...
    bits -= 53;
    // and remove the rest
    number /= 2**bits;
    let bi = BigInt(number);
    // we can then scale up the big int by the number of bits that we removed
    // this doesn't cause any loss of precision
    if(bits >= 0)
      bi *= 2n ** BigInt( bits);
    if(bits <  0)
      bi /= 2n ** BigInt(-bits);
    number = bi.toString(base);
    
    while(number.length > length){
      number = number.slice(0, -1);
    }
    while(number.length < length){
      number += "0";
    }
    
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
      if(st > 0 && st < 6){
        number = (st > 0) ?(number + " " + (["", "K", "M", "B", "T", "Q"])[st]) :number;
      }
      // add e+ expression if the illion is too big
      if(st >= 6){
        number = number + "e+" + s;
      }
    }
    if(!over_one){
      // add period
      if(number.length > 1){
        number = number[0] + "." + number.slice(1);
      }
      // add e notation
      number = number + "e" + s;
    }
  // }
  return number;
};


// trig functions
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



const time = function time(f, f_name){
  let t1, t2, dt;
  let ct1, ct2, cdt;
  let adt = 0;
  // run time to aim for, in ms
  let tg = 20*1000;
  let n = 100;
  let n_total = 0;
  let n_rounded = Math.floor(n);
  let n_exponent = 1.1;
  let mspf = 20;
  
  t1 = new Date();
  
  // these 4 could be inside the function's scope, but I like them being here
  ct1 = new Date();
  ct2 = new Date();
  cdt = (ct1.getTime() -ct2.getTime());
  let i = 0;
  // count number of frames
  let frame_count = 0;
  // needed in order to shut down our function
  let tid = 0;
  // this prevents the interval function from ever becoming overloaded
  let busy = false;
  // need to do some scope snatching
  let resolve_f;
  
  const finish_t = function finish_t(){
    clearInterval(tid);
    
    t2 = new Date();
    dt = (t2.getTime() - t1.getTime());
    
    let eps = n_total / (adt / 1000);
    eps = to_engineering(eps);
    
    
    let str = "";
    str += `function: ${f_name || f.name || "anonymous"}:`;
    str += `\n* took ${(adt / 1000).toFixed(3)} seconds;`;
    str += `\n* executed f ${n_rounded} times;`;
    str += `\n* that is ${eps} exec / sec;`;
    str += `\n  (true time: ${(dt / 1000).toFixed(3)} seconds);`;
    str += `\n  (effective work rate: ${(100 * adt / dt).toFixed(4)}%);`;
    
    resolve_f(str);
  };
  
  const execute_t = function execute_t(){
    if(busy) return;
    frame_count ++;
    // console.log(`did ${frame_count} frames!`);
    busy = true;
    
    ct1 = new Date();
    
    for(i = 0; i < n_rounded; i++){
      f(i);
    }
    
    // accumulate n_total
    n_total += n_rounded;
    // increase the size of n exponentially, in order speed up the for loop
    //   (by making it do more steps in a row, at a time)
    n *= n_exponent;
    // this whole thing falls apart if
    if(n >= Number.MAX_SAFE_INTEGER){
      resolve_f("n got too big, somehow");
      // let's clear the interval
      clearInterval(tid);
      // this actually prevents the function from running again, because busy still == true
      return;
    }
    // we want to round n, so n_total is accumulated with maximum precision
    n_rounded = Math.floor(n);
    ct2 = new Date();
    cdt = (ct2.getTime() -ct1.getTime());
    adt += cdt;
    
    // make sure the frames don't get too slow
    if(cdt >= 2 * mspf){
      n_exponent = 1;
    }
    
    if(adt >= tg){
      finish_t(resolve_f);
    }
    
    busy = false;
  };
  
  const start_t = function(resolve_f_given){
    resolve_f = resolve_f_given;
    tid = setInterval(execute_t, mspf);
  };
  
  let p = new Promise(start_t);
  
  
  
  return p;
};

const a = 5;

time(a.add).then((v) => console.log(v));



