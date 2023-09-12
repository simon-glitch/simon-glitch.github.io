
console.log(math)

s.prototype = {
  re: 0,
  im: 0,
  sign: function() {
    var e = this.abs();
    return new s(this.re.div(e), this.im.div(e))
  },
  add: function(e, t) {
    var r = new s(e, t);
    return this.isInfinite() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : new s(this.re + r.re, this.im + r.im)
  },
  sub: function(e, t) {
    var r = new s(e, t);
    return this.isInfinite() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : new s(this.re - r.re, this.im - r.im)
  },
  mul: function(e, t) {
    var r = new s(e, t);
    return this.isInfinite() && r.isZero() || this.isZero() && r.isInfinite() ? s.NAN : this.isInfinite() || r.isInfinite() ? s.INFINITY : 0 === r.im && 0 === this.im ? new s(this.re * r.re, 0) : new s(this.re * r.re - this.im * r.im, this.re * r.im + this.im * r.re)
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
      (0 === o)
      ?(new s(e.div(a), t.div(a)))
      :(
        math.abs(a) < math.abs(o)
        ?(new s((e * (i = a.div(o)) + t) / (n = a * i + o), (t * i - e).div(n)))
        :(new s((e + t * (i = o.div(a))) / (n = o * i + a), (t - e * i).div(n)))
      )
    )
  },
  pow: function(e, t) {
    var r = new s(e, t);
    if (e = this.re, t = this.im, r.isZero()) return s.ONE;
    if (0 === r.im) {
      if (0 === t && e > 0) return new s(math.pow(e, r.re), 0);
      if (0 === e) switch ((r.re % 4 + 4) % 4) {
        case 0:
          return new s(math.pow(t, r.re), 0);
        case 1:
          return new s(0, math.pow(t, r.re));
        case 2:
          return new s(-math.pow(t, r.re), 0);
        case 3:
          return new s(0, -math.pow(t, r.re))
      }
    }
    if (0 === e && 0 === t && r.re > 0 && r.im >= 0) return s.ZERO;
    var n = math.atan2(t, e),
      i = u(e, t);
    e = math.exp(r.re * i - r.im * n);
    t = r.im * i + r.re * n;
    return new s(e * math.cos(t), e * math.sin(t))
  },
  sqrt: function() {
    var e, t, r = this.re,
      n = this.im,
      i = this.abs();
    if (r >= 0) {
      if (0 === n) return new s(math.sqrt(r), 0);
      e = .5 * math.sqrt(2 * (i + r))
    } else e = math.abs(n) / math.sqrt(2 * (i - r));
    return t = r <= 0 ? .5 * math.sqrt(2 * (i - r)) : math.abs(n) / math.sqrt(2 * (i + r)), new s(e, n < 0 ? -t : t)
  },
  exp: function() {
    var e = math.exp(this.re);
    return this.im, new s(e * math.cos(this.im), e * math.sin(this.im))
  },
  expm1: function() {
    var e = this.re,
      t = this.im;
    return new s(math.expm1(e) * math.cos(t) + function(e) {
      var t = math.PI.div(4);
      if (-t > e || e > t) return math.cos(e) - 1;
      var r = e.times(e);
      return r.times(r.times(r.times(r.times(r.times(r.times(r.times(r.div(20922789888e3) - big_num(87178291200).inv()).plus(big_num(479001600).inv())).minus(big_num(3628800).inv())).plus(big_num(40320).inv())) - big_num(720).inv()) + big_num(24).inv()).minus(big_num(.5)))
    }(t), math.exp(e) * math.sin(t))
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
    return new s(math.sin(e) * i(t).div(r), -math.cos(e) * a(t).div(r))
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
    return new s(math.PI.div(2) - n.im, n.re)
  },
  atan: function() {
    var e = this.re,
      t = this.im;
    if (0 === e) {
      if (1 === t) return new s(0, 1.div(0));
      if (-1 === t) return new s(0, -1.div(0))
    }
    var r = e * e + (1 - t) * (1 - t),
      n = new s((1 - t * t - e * e).div(r), -2 * e.div(r)).log();
    return new s(-.5 * n.im, .5 * n.re)
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
    if (0 === e && 0 === t) return new s(0, 1.div(0));
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).acos() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).acos()
  },
  acsc: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(math.PI.div(2), 1.div(0));
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
    if (0 === e && 0 === t) return new s(0, math.PI.div(2));
    var r = e * e + t * t;
    return 0 !== r ? new s(e.div(r), -t.div(r)).atanh() : new s(0 !== e ? e.div(0) : 0, 0 !== t ? -t.div(0) : 0).atanh()
  },
  acsch: function() {
    var e = this.re,
      t = this.im;
    if (0 === t) return new s(0 !== e ? math.log(e + math.sqrt(e * e + 1)) : 1.div(0), 0);
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


