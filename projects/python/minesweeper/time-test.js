

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


const c_tg = 2*1000;

/**
 * see how quickly f runs
**/
const time = function time(f, f_name, tg, do_record){
  tg = tg || c_tg;
  let t1, t2, dt;
  let ct1, ct2, cdt;
  let adt = 0;
  // run time to aim for, in ms
  let n = 100;
  let n_total = 0;
  let n_rounded = Math.floor(n);
  let n_exponent = 1.1;
  let mspf = 20;
  
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
  
  const execute_t = function execute_t(){
    if(busy) return;
    frame_count ++;
    // console.log(`did ${frame_count} frames!`);
    busy = true;
    
    ct1 = new Date();
    
    for(i = 0; i < n_rounded; i++){
      f(i);
    }
    
    let n_rounded_prev = n_rounded;
    
    // accumulate n_total
    n_total += n_rounded;
    // increase the size of n exponentially, in order speed up the for loop
    //   (by making it do more steps in a row, at a time)
    n *= n_exponent;
    // we want to round n, so n_total is accumulated with maximum precision
    n_rounded = Math.floor(n);
    
    // this whole thing falls apart if
    if(n >= Number.MAX_SAFE_INTEGER){
      resolve_f("n got too big, somehow");
      // let's clear the interval
      clearInterval(tid);
      // this actually prevents the function from running again, because busy still == true
      return;
    }
    ct2 = new Date();
    cdt = (ct2.getTime() -ct1.getTime());
    adt += cdt;
    
    // record values
    if(do_record){
      let eps = n_total / (adt / 1000);
      recorded.adt.push(adt);
      recorded.cdt.push(cdt);
      recorded.eps.push(eps);
      recorded.n_rounded.push(n_rounded_prev);
      
      pc = 100 * (adt / tg);
      console.log(to_engineering(pc, {length: (pc >= 100 ?3 :2)}) + " %");
    }
    
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




