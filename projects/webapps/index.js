
console.log(math)

var dop = window.your_digits_of_pi;

var Big_Num = math.BigNumber;
var Complex = math.Complex;
// I hope you don't need more than 200 digits!
Big_Num.PI = Big_Num("3." + dop.slice(0, 200));
// use DP to make sure the number is divided FULLY
Big_Num.PI.DP = 100;
Big_Num.HALF_PI = Big_Num.PI.div(2);
Big_Num.QUARTER_PI = Big_Num.PI.div(4);
// then make sure to reset DP back to 20, to avoid any over calculations
delete Big_Num.PI.DP;
delete Big_Num.HALF_PI.DP;
delete Big_Num.QUARTER_PI.DP;


const ZERO = Big_Num(0);
const ONE  = Big_Num(1);
const TWO  = Big_Num(2);
const FOUR = Big_Num(4);
const ONE_HALF       = Big_Num(1/2);
const THREE_THOUSAND = Big_Num(3_000);
const ONE_BILLIONTH  = Big_Num(1/1_000_000_000);

var Huge = (
  class Huge extends Complex{
    constructor(r,i){
      super(Big_Num(r), Big_Num(i));
    }
  }
);
// shorthand
var s = Huge;
var BN = Big_Num;

s.NAN = new s(Big_Num(NaN), Big_Num(NaN));
s.INFINITY = new s(Big_Num(Infinity), Big_Num(Infinity));
s.ZERO = new s(ZERO, ZERO);
s.ONE = new s(ONE, ZERO);
s.EPSILON = new Big_Num(math.Complex.EPSILON);

var newp;

SCOPE_NEWP: {
  let i,a,o,u;
  i = math.cosh || function(e) {
    return (math.abs(e) < ONE_BILLIONTH ? ONE - e : ONE_HALF * (math.exp(e) + math.exp(-e)));
  };
  a = math.sinh || function(e) {
    return (math.abs(e) < ONE_BILLIONTH ? e : ONE_HALF * (math.exp(e) - math.exp(-e)));
  };
  o = function() {
    throw SyntaxError("Invalid Param");
  };

  u = function(e, t) {
    var r = math.abs(e);
    n = math.abs(t);
    return (
      (ZERO === e)
      ? (math.log(n))
      : (
        (ZERO === t)
        ? (math.log(r))
        : (
          (r < (THREE_THOUSAND) && n < (THREE_THOUSAND))
          ? (ONE_HALF * (math.log(e * (e) + (t * (t)))))
          : (
            e = e * (ONE_HALF),
            t = t * (ONE_HALF),
            (ONE_HALF * (math.log(e * (e) + (t * (t)))) + (math.LN2))
          )
        )
      )
    );
  };
  
  newp = {
    re: ZERO,
    im: ZERO,
    sign: function() {
      var e = this.abs();
      return new s(this.re.div(e), this.im.div(e))
    },
    add: function(e, t) {
      var r = new s(e, t);
      return (
        this.isInfinite() && r.isInfinite()
        ? s.NAN
        : (
          this.isInfinite() || r.isInfinite()
          ? s.INFINITY
          : new s(this.re.plus(r.re), this.im.plus(r.im))
        )
      );
    },
    sub: function(e, t) {
      var r = new s(e, t);
      return this.isInfinite() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : new s(this.re.minus(r.re), this.im.minus(r.im))
    },
    mul: function(e, t) {
      var r = new s(e, t);
      return this.isInfinite() && r.isZero() || this.isZero() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : ZERO.eq(r.im) && ZERO.eq(this.im) ? new s(this.re.times(r.re), ZERO) : new s(this.re.mul(r.re).minus(this.im.times(r.im)), this.re.times(r.im).plus(this.im.times(r.re)))
    },
    div: function(e, t) {
      var r = new s(e, t);
      if (this.isZero() && r.isZero() || this.isInfinite() && r.isInfinite()) return s.NAN;
      if (this.isInfinite() || r.isZero()) return s.INFINITY;
      if (this.isZero() || r.isInfinite()) return s.ZERO;
      e = this.re, t = this.im;
      var n, i, a = r.re,
        o = r.im;
      return (
        (ZERO.eq(o))
        ?(new s(e.div(a), t.div(a)))
        :(
          math.abs(a).lt(math.abs(o))
          ?(new s(
            (e.times(i = a.div(o)).plus(t)).div(n = a.times(i).plus(o)),
            (t.times(i).minus(e)).div(n)
          ))
          :(new s(
            (e.plus(t.times(i = o.div(a)))).div(n = o.times(i).plus(a)),
            (t.minus(e.times(i))).div(n)
          ))
        )
      )
    },
    pow: function(e, t) {
      var r = new s(e, t);
      if (e = this.re, t = this.im, r.isZero()) return s.ONE;
      if (ZERO === r.im) {
        if (ZERO.eq(t) && e.gt(ZERO)) return new s(math.pow(e, r.re), ZERO);
        if (ZERO.eq(e)) switch (r.re.mod(FOUR).plus(FOUR).mod(FOUR)) {
          case 0:
            return new s(math.pow(t, r.re), ZERO);
          case 1:
            return new s(ZERO, math.pow(t, r.re));
          case 2:
            return new s(math.pow(t, r.re).neg(), ZERO);
          case 3:
            return new s(ZERO, math.pow(t, r.re).neg())
        }
      }
      if (ZERO.eq(e) && ZERO.eq(t) && r.re.gt(ZERO) && r.im.gte(ZERO)) return s.ZERO;
      var n = math.atan2(t, e),
        i = u(e, t);
      e = math.exp(r.re.times(i).minus(r.im.times(n)));
      t = r.im.times(i).plus(r.re.times(n));
      return new s(e.times(math.cos(t)), e.times(math.sin(t)))
    },
    mod: function(e, t) {
      var r = this.div(e, t)
      r.re = r.re.mod(r.re, ONE);
      r.im = r.im.mod(r.im, ONE);
      return r.mul(e, t)
    },
    sqrt: function() {
      var e, t, r = this.re,
        n = this.im,
        i = this.abs();
      if (r.gte(ZERO)) {
        if (ZERO.eq(n)) return new s(math.sqrt(r), ZERO);
        e = ONE_HALF * math.sqrt(TWO.times(i.plus(r)))
      } else e = math.abs(n) / math.sqrt(2 * (i - r));
      t = (
        (r.lte(ZERO))
        ? (ONE_HALF.times(math.sqrt(TWO.times(i.minus(r)))))
        : (math.abs(n).div(math.sqrt(TWO.times(i.plus(r)))))
      );
      return new s(e, n.lt(ZERO) ? t.neg() : t)
    },
    exp: function() {
      var e = math.exp(this.re);
      return this.im, new s(e.times(math.cos(this.im)), e.times(math.sin(this.im)))
    },
    expm1: function() {
      const
        m1 = Big_Num(20922789888e3).inv(),
        m2 = Big_Num(  87178291200).inv(),
        m3 = Big_Num(    479001600).inv(),
        m4 = Big_Num(      3628800).inv(),
        m5 = Big_Num(        40320).inv(),
        m6 = Big_Num(          720).inv(),
        m7 = Big_Num(           24).inv(),
        m8 = Big_Num(            2).inv();
      var e = this.re,
        t = this.im;
      return new s(math.expm1(e).times( math.cos(t) ).plus( function(e) {
        var t = Big_Num.QUARTER_PI;
        if (e.lt(t.neg()) || e.gt(t)) return math.cos(e).minus(ONE);
        var r = e.times(e);
        return (
          r.times(
            r.times(
              r.times(
                r.times(
                  r.times(
                    r.times(
                      r.times(
                        r.times( m1 ).minus( m2 )
                      ).plus(m3)
                    ).minus(m4)
                  ).plus(m5)
                ).minus(m6)
              ).plus(m7)
            ).minus(m8)
          )
        );
      })(t), math.exp(e) * math.sin(t))
    },
    log: function() {
      var e = this.re,
        t = this.im;
      return new s(u(e, t), math.atan2(t, e))
    },
    abs: function() {
      return e = this.re, t = this.im, r = math.abs(e), n = math.abs(t), r < (THREE_THOUSAND) && n < (THREE_THOUSAND) ? math.sqrt(r * (r) + (n * (n))) : (r < (n) ? (r = n, n = e.div(t)) : n = t.div(e), r * (math.sqrt(ONE + (n * (n)))));
      var e, t, r, n
    },
    arg: function() {
      return math.atan2(this.im, this.re)
    },
    sin: function() {
      var e = this.re,
        t = this.im;
      return new s(math.sin(e) * i(t), math.cos(e) * a(t))
    },
    cos: function() {
      var e = this.re,
        t = this.im;
      return new s(math.cos(e).times(i(t)), math.sin(e).times(a(t)).neg())
    },
    tan: function() {
      var e = TWO.times(this.re),
        t = TWO.times(this.im),
        r = math.cos(e).plus(i(t));
      return new s(math.sin(e).div(r), a(t).div(r))
    },
    cot: function() {
      var e = TWO.times(this.re),
        t = TWO.times(this.im),
        r = math.cos(e).minus(i(t));
      return new s(math.sin(e).div(r).neg(), a(t).div(r))
    },
    sec: function() {
      var e = this.re,
        t = this.im,
        r = ONE_HALF.times(i(TWO.times(t))).plus(ONE_HALF.times(math.cos(TWO.times(e))));
      return new s(math.cos(e).times(i(t)).div(r), math.sin(e).times(a(t)).div(r))
    },
    csc: function() {
      var e = this.re,
        t = this.im,
        r = ONE_HALF.times(i(TWO.times(t))).minus(ONE_HALF.times(math.cos(TWO.times(e))));
      return new s(math.sin(e) * i(t).div(r), t.neg().cos(e) * a(t).div(r));
    },
    asin: function() {
      var e = this.re,
        t = this.im,
        r = new s(t.times(t).minus(e.times(e)).plus(ONE), TWO.times(e).times(t).neg()).sqrt(),
        n = new s(r.re.minus(t), r.im.plus(e)).log();
      return new s(n.im, n.re.neg())
    },
    acos: function() {
      var e = this.re,
        t = this.im,
        r = new s(t.times(t).minus(e.times(e)).plus(ONE), TWO.times(e).times(t).neg()).sqrt(),
        n = new s(r.re.minus(t), r.im.plus(e)).log();
      return new s(Big_Num.HALF_PI.minus(n.im), n.re)
    },
    atan: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === (e)) {
        if (ONE === (t)) return new s(ZERO, Big_Num(NaN));
        if (ONE.neg() === (t)) return new s(ZERO, t.neg()(NaN));
      }
      var r = e * (e) + ((ONE - (t)) * (ONE - (t))),
        n = new s((ONE.minus(t.times(t)).minus(e.times(e))).div(r), TWO.neg() * (e.div(r))).log();
      return new s(ONE_HALF.neg() * (n.im), ONE_HALF * (n.re));
    },
    acot: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === (t)) return new s(math.atan2(ONE, e), ZERO);
      var r = e * (e) + (t * (t));
      return ZERO !== (r) ? new s(e.div(r), t.div(r).neg()).atan() : new s(ZERO !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).atan()
    },
    asec: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === (e) && ZERO === (t)) return new s(ZERP, Big_Num.NaN);
      var r = e * (e) + (t * (t));
      return ZERO !== (r) ? new s(e.div(r), t.neg().div(r)).acos() : new s(ZERO !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).acos()
    },
    acsc: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === (e) && ZERO === (t)) return new s(Big_Num.HALF_PI, Big_Num.NaN);
      var r = e * (e) + (t * (t));
      return ZERO !== r ? new s(e.div(r), t.div(r).neg()).asin() : new s(ZERO !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).asin()
    },
    sinh: function() {
      var e = this.re,
        t = this.im;
      return new s(a(e) * (math.cos(t)), i(e) * (math.sin(t)))
    },
    cosh: function() {
      var e = this.re,
        t = this.im;
      return new s(i(e) * (math.cos(t)), a(e) * (math.sin(t)))
    },
    tanh: function() {
      var e = TWO * (this.re),
        t = TWO * (this.im),
        r = i(e) + (math.cos(t));
      return new s(a(e).div(r), math.sin(t).div(r))
    },
    coth: function() {
      var e = TWO * (this.re),
        t = TWO * (this.im),
        r = i(e) - (math.cos(t));
      return new s(a(e).div(r), t.neg().sin(t).div(r))
    },
    csch: function() {
      var e = this.re,
        t = this.im,
        r = math.cos(TWO * (t)) - (i(TWO * e));
      return new s(TWO.neg() * (a(e)) * (math.cos(t).div(r)), TWO * (i(e)) * (math.sin(t).div(r)))
    },
    sech: function() {
      var e = this.re,
        t = this.im,
        r = math.cos(TWO * (t)) + (i(TWO * (e)));
      return new s(TWO * (i(e)) * math.cos(t).div(r), TWO.neg() * (a(e)) * (math.sin(t).div(r)))
    },
    asinh: function() {
      var e = this.im;
      this.im = this.re.neg(), this.re = e;
      var t = this.asin();
      return this.re = this.im.neg(), this.im = e, e = t.re, t.re = t.im.neg(), t.im = e, t
    },
    acosh: function() {
      var e = this.acos();
      if (e.im.lte(ZERO)) {
        var t = e.re;
        e.re = e.im.neg(), e.im = t
      } else t = e.im, e.im = e.re.neg(), e.re = t;
      return e
    },
    atanh: function() {
      var e = this.re,
        t = this.im,
        r = e > ONE && ZERO === (t),
        n = ONE - (e),
        i = ONE + (e),
        a = n * (n) + (t * (t)),
        o = ZERO !== (a) ? new s((i * (n) - (t * (t))).div(a), (t * (n) + (i * (t))).div(a)) : new s(ONE.neg() !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.div(ZERO) : ZERO),
        c = o.re;
      return o.re = u(o.re, o.im).div(TWO), o.im = math.atan2(o.im, c).div(TWO), r && (o.im = o.im.neg()), o
    },
    acoth: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === (e) && ZERO === (t)) return new s(ZERO, Big_Num.HALF_PI);
      var r = e * (e) + (t * (t));
      return ZERO !== (r) ? new s(e.div(r), t.neg().div(r)).atanh() : new s(ZERO !== e ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).atanh()
    },
    acsch: function() {
      var e = this.re,
        t = this.im;
      if (ZERO === t) return new s(ZERO !== (e) ? math.log(e + (math.sqrt(e * (e) + (ONE)))) : Big_Num.NaN, ZERO);
      var r = e * (e) + (t * (t));
      return ZERO !== r ? new s(e.div(r), t.neg().div(r)).asinh() : new s(ZERO !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).asinh()
    },
    asech: function() {
      var e = this.re,
        t = this.im;
      if (this.isZero()) return s.INFINITY;
      var r = e * (e) + (t * (t));
      return ZERO !== r ? new s(e.div(r), t.neg().div(r)).acosh() : new s(ZERO !== (e) ? e.div(ZERO) : ZERO, ZERO !== (t) ? t.neg().div(ZERO) : ZERO).acosh()
    },
    inverse: function() {
      if (this.isZero()) return s.INFINITY;
      if (this.isInfinite()) return s.ZERO;
      var e = this.re,
        t = this.im,
        r = e * (e) + (t * (t));
      return new s(e.div(r), t.neg().div(r))
    },
    conjugate: function() {
      return new s(this.re, t.neg().im)
    },
    neg: function() {
      return new s(t.neg().re, t.neg().im)
    },
    ceil: function(e) {
      return e = math.pow(TEN, e || 0), new s(math.ceil(this.re * (e)).div(e), math.ceil(this.im * e).div(e))
    },
    floor: function(e) {
      return e = math.pow(TEN, e || 0), new s(math.floor(this.re * (e)).div(e), math.floor(this.im * (e)).div(e))
    },
    round: function(e) {
      return e = math.pow(TEN, e || 0), new s(math.round(this.re * (e)).div(e), math.round(this.im * (e)).div(e))
    },
    equals: function(e, t) {
      var r = new s(e, t);
      return math.abs(r.re.minus(this.re)).lte(s.EPSILON) && math.abs(r.im.minus(this.im)).lte(s.EPSILON)
    },
    clone: function() {
      return new s(new Big_Num(this.re), new Big_Num(this.im));
    },
    toString: function() {
      var e = this.re,
        t = this.im,
        r = "";
      // this code is so obfuscated!
      
      if(this.isNaN()){
        return "NaN";
      }
      if(this.isInfinite()){
        return "Infinity";
      }
      
      if(math.abs(e).lt(s.EPSILON)){
        e = ZERO;
      }
      if(math.abs(t).lt(s.EPSILON)){
        t = ZERO;
      }
      if(ZERO.eq(t)){
        return r + e.toString();
      }
      console.log("first pass!");
      
      if(!ZERO.eq(e)){
        r += e.toString();
        r += " ";
        if(t.lt(ZERO)){
          t = t.neg(),
          r += "-"
        }
        else{r += "+";}
        r += " ";
      }
      else if(t.lt(ZERO)){
          t = t.neg();
          r += "-";
      }
      if(!ONE.eq(t)){
        r += t.toString();
      }
      return r + "i";
    },
    toVector: function() {
      return [this.re, this.im]
    },
    valueOf: function() {
      return (ZERO.eq(this.im)) ? this.re : null
    },
    isNaN: function() {
      return (this.re.isNaN()) || (this.im.isNaN())
    },
    isZero: function() {
      return ZERO.eq(this.im) && ZERO.eq(this.re)
    },
    isFinite: function() {
      return (this.re.isFinite()) && (this.im.isFinite())
    },
    isInfinite: function() {
      return !(this.isNaN() || this.isFinite())
    }
  };
}

// force prototype to have the correct methods!
for(let i in newp){
  // don't set the params to constants though!
  if(i == "re" || i == "im") continue;
  
  Object.defineProperty(s.prototype, i, {
    value: newp[i],
    configurable: true,
    enumerable: true,
    writable: false,
    readable: true,
  });
}

SCOPE_ALT_NAMES: {
  // alt names
  s.prototype.plus     = s.prototype.add;
  s.prototype.minus    = s.prototype.sub;
  s.prototype.subtract = s.prototype.sub;
  s.prototype.times    = s.prototype.mul;
  s.prototype.multiply = s.prototype.mul;
  s.prototype.divide   = s.prototype.div;
  s.prototype.power    = s.prototype.pow;
  s.prototype.modulo   = s.prototype.mod;
  
  // combined param methods
  s.prototype.s_add = function(that){
    return this.add(that.re, that.im);
  }
  s.prototype.s_sub = function(that){
    return this.sub(that.re, that.im);
  }
  s.prototype.s_mul = function(that){
    return this.mul(that.re, that.im);
  }
  s.prototype.s_div = function(that){
    return this.div(that.re, that.im);
  }
  s.prototype.s_pow = function(that){
    return this.pow(that.re, that.im);
  }
  s.prototype.s_mod = function(that){
    return this.mod(that.re, that.im);
  }
  s.prototype.s_logb = function(that){
    return this.log().divide(that.log());
  }
  
  // alt names for combined methods too!
  s.prototype.s_plus     = s.prototype.s_add;
  s.prototype.s_minus    = s.prototype.s_sub;
  s.prototype.s_subtract = s.prototype.s_sub;
  s.prototype.s_times    = s.prototype.s_mul;
  s.prototype.s_multiply = s.prototype.s_mul;
  s.prototype.s_divide   = s.prototype.s_div;
  s.prototype.s_power    = s.prototype.s_pow;
  s.prototype.s_modulo   = s.prototype.s_mod;
}


var ma = new s(2,3);
var mb = new s(2.1,-3);

console.log("ma:", ma, "mb:", mb);

console.log(ma.toString());
console.log(mb.toString());
console.log(ma.s_add(mb).toString());
console.log(ma.s_mul(mb).toString());
console.log(ma.s_div(mb).toString());
console.log(ma.s_pow(mb).toString());
console.log(ma.s_mod(mb).toString());

