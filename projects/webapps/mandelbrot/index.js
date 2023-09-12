
console.log(math)

var dop = window.your_digits_of_pi;

var Big_Num = math.BigNumber;
// I hope you don't need more than 200 digits!
Big_Num.PI = Big_Num("3." + dop.slice(0, 200));
const ZERO = Big_Num(0);
const ONE = Big_Num(1);
const TWO = Big_Num(2);
const ONE_HALF = Big_Num(0.5);


s = {};
s.NAN = new s(Big_Num(NaN), Big_Num(NaN));
s.INFINITY = s(Big_Num(Infinity), Big_Num(Infinity));
s.ZERO = new s(ZERO, ZERO);
s.ONE = new s(ONE, ZERO);

s.prototype = {
  re: ZERO,
  im: ZERO,
  sign: function() {
    var e = this.abs();
    return new s(this.re.div(e), this.im.div(e))
  },
  add: function(e, t) {
    var r = new s(e, t);
    return this.isInfinite() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : new s(this.re.plus(r.re), this.im.plus(r.im))
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
        math.abs(a) < math.abs(o)
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
      if (ZERO.eq(e)) switch (((r.re.toNumber() % 4) + 4) % 4) {
        case 0:
          return new s(math.pow(t, r.re), ZERO);
        case 1:
          return new s(ZERO, math.pow(t, r.re));
        case 2:
          return new s(-math.pow(t, r.re), ZERO);
        case 3:
          return new s(ZERO, -math.pow(t, r.re))
      }
    }
    if (ZERP.eq(e) && ZERO.eq(t) && r.re.gt(ZERO) && r.im.gte(ZERO)) return s.ZERO;
    var n = math.atan2(t, e),
      i = u(e, t);
    e = math.exp(r.re.times(i).minus(r.im.times(n)));
    t = r.im.times(i).plus(r.re.times(n));
    return new s(e.times(math.cos(t)), e.times(math.sin(t)))
  },
  sqrt: function() {
    var e, t, r = this.re,
      n = this.im,
      i = this.abs();
    if (r.gte(ZERO)) {
      if (0.eq(n)) return new s(math.sqrt(r), ZERO);
      e = .5 * math.sqrt(TWO.times(i.plus(r)))
    } else e = math.abs(n) / math.sqrt(2 * (i - r));
    return t = r <= ZERO ? ONE_HALF * math.sqrt(2 * (i - r)) : math.abs(n) / math.sqrt(2 * (i + r)), new s(e, n < ZERO ? -t : t)
  },
  exp: function() {
    var e = math.exp(this.re);
    return this.im, new s(e * math.cos(this.im), e * math.sin(this.im))
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
      var t = Big_Num.PI.div(4);
      if (e.lt(-t) || e.gt(t)) return math.cos(e).minus(1);
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
    return e = this.re, t = this.im, r = math.abs(e), n = math.abs(t), r < 3e3 && n < 3e3 ? math.sqrt(r * r + n * n) : (r < n ? (r = n, n = e.div(t)) : n = t.div(e), r * math.sqrt(1 + n * n));
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
    return new s(math.cos(e) * i(t), -math.sin(e) * a(t))
  },
  tan: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = math.cos(e) + i(t);
    return new s(math.sin(e).div(r), a(t).div(r))
  },
  cot: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = math.cos(e) - i(t);
    return new s(-math.sin(e).div(r), a(t).div(r))
  },
  sec: function() {
    var e = this.re,
      t = this.im,
      r = .5 * i(2 * t) + .5 * math.cos(2 * e);
    return new s(math.cos(e) * i(t).div(r), math.sin(e) * a(t).div(r))
  },
  csc: function() {
    var e = this.re,
      t = this.im,
      r = .5 * i(2 * t) - .5 * math.cos(2 * e);
    return new s(math.sin(e) * i(t).div(r), -math.cos(e) * a(t).div(r));
  },
  asin: function() {
    var e = this.re,
      t = this.im,
      r = new s(t * t - e * e + 1, -2 * e * t).sqrt(),
      n = new s(r.re - t, r.im + e).log();
    return new s(n.im, -n.re)
  },
  acos: function() {
    var e = this.re,
      t = this.im,
      r = new s(t * t - e * e + 1, -2 * e * t).sqrt(),
      n = new s(r.re - t, r.im + e).log();
    return new s(Big_Num.PI.div(2) - n.im, n.re)
  },
  atan: function() {
    var e = this.re,
      t = this.im;
    if (0 === e) {
      if (1 === t) return new s(0, Big_Num(NaN));
      if (-1 === t) return new s(0, -Big_Num(NaN));
    }
    var r = e * e + (1 - t) * (1 - t),
      n = new s((1 - t * t - e * e).div(r), -2 * e.div(r)).log();
    return new s(-.5 * n.im, .5 * n.re);
  },
  acot: function() {
    var e = this.re,
      t = this.im;
    if (0 === t) return new s(math.atan2(1, e), 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).atan() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).atan()
  },
  asec: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(0, Big_Num(NaN));
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).acos() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).acos()
  },
  acsc: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(Big_Num.PI.div(2), Big_Num(NaN));
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).asin() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).asin()
  },
  sinh: function() {
    var e = this.re,
      t = this.im;
    return new s(a(e) * math.cos(t), i(e) * math.sin(t))
  },
  cosh: function() {
    var e = this.re,
      t = this.im;
    return new s(i(e) * math.cos(t), a(e) * math.sin(t))
  },
  tanh: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = i(e) + math.cos(t);
    return new s(a(e).div(r), math.sin(t).div(r))
  },
  coth: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = i(e) - math.cos(t);
    return new s(a(e).div(r), -math.sin(t).div(r))
  },
  csch: function() {
    var e = this.re,
      t = this.im,
      r = math.cos(2 * t) - i(2 * e);
    return new s(-2 * a(e) * math.cos(t).div(r), 2 * i(e) * math.sin(t).div(r))
  },
  sech: function() {
    var e = this.re,
      t = this.im,
      r = math.cos(2 * t) + i(2 * e);
    return new s(2 * i(e) * math.cos(t).div(r), -2 * a(e) * math.sin(t).div(r))
  },
  asinh: function() {
    var e = this.im;
    this.im = -this.re, this.re = e;
    var t = this.asin();
    return this.re = -this.im, this.im = e, e = t.re, t.re = -t.im, t.im = e, t
  },
  acosh: function() {
    var e = this.acos();
    if (e.im <= 0) {
      var t = e.re;
      e.re = -e.im, e.im = t
    } else t = e.im, e.im = -e.re, e.re = t;
    return e
  },
  atanh: function() {
    var e = this.re,
      t = this.im,
      r = e > 1 && 0 === t,
      n = 1 - e,
      i = 1 + e,
      a = n * n + t * t,
      o = 0 !== a ? new s((i * n - t * t).div(a), (t * n + i * t).div(a)) : new s(-1 !== e ? e.div(0) : 0, 0 !== t ? t.div(0) : 0),
      c = o.re;
    return o.re = u(o.re, o.im).div(2), o.im = math.atan2(o.im, c).div(2), r && (o.im = -o.im), o
  },
  acoth: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(0, Big_Num.PI.div(2));
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).atanh() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).atanh()
  },
  acsch: function() {
    var e = this.re,
      t = this.im;
    if (0 === t) return new s(0 !== e ? math.log(e + math.sqrt(e * e + 1)) : Big_Num(NaN), 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).asinh() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).asinh()
  },
  asech: function() {
    var e = this.re,
      t = this.im;
    if (this.isZero()) return s.INFINITY;
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).acosh() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).acosh()
  },
  inverse: function() {
    if (this.isZero()) return s.INFINITY;
    if (this.isInfinite()) return s.ZERO;
    var e = this.re,
      t = this.im,
      r = e * e + t * t;
    return new s(e.div(r), -t.div(r))
  },
  conjugate: function() {
    return new s(this.re, -this.im)
  },
  neg: function() {
    return new s(-this.re, -this.im)
  },
  ceil: function(e) {
    return e = math.pow(10, e || 0), new s(math.ceil(this.re * e).div(e), math.ceil(this.im * e).div(e))
  },
  floor: function(e) {
    return e = math.pow(10, e || 0), new s(math.floor(this.re * e).div(e), math.floor(this.im * e).div(e))
  },
  round: function(e) {
    return e = math.pow(10, e || 0), new s(math.round(this.re * e).div(e), math.round(this.im * e).div(e))
  },
  equals: function(e, t) {
    var r = new s(e, t);
    return math.abs(r.re - this.re) <= s.EPSILON && math.abs(r.im - this.im) <= s.EPSILON
  },
  clone: function() {
    return new s(this.re, this.im)
  },
  toString: function() {
    var e = this.re,
      t = this.im,
      r = "";
    return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (math.abs(e) < s.EPSILON && (e = 0), math.abs(t) < s.EPSILON && (t = 0), 0 === t ? r + e : (0 !== e ? (r += e, r += " ", t < 0 ? (t = -t, r += "-") : r += "+", r += " ") : t < 0 && (t = -t, r += "-"), 1 !== t && (r += t), r + "i"))
  },
  toVector: function() {
    return [this.re, this.im]
  },
  valueOf: function() {
    return 0 === this.im ? this.re : null
  },
  isNaN: function() {
    return isNaN(this.re) || isNaN(this.im)
  },
  isZero: function() {
    return 0 === this.im && 0 === this.re
  },
  isFinite: function() {
    return isFinite(this.re) && isFinite(this.im)
  },
  isInfinite: function() {
    return !(this.isNaN() || this.isFinite())
  }
};


