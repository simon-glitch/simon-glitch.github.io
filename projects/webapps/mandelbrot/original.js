
s.prototype = {
  re: 0,
  im: 0,
  sign: function() {
    var e = this.abs();
    return new s(this.re / e, this.im / e)
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
    return 0 === o ? new s(e / a, t / a) : Math.abs(a) < Math.abs(o) ? new s((e * (i = a / o) + t) / (n = a * i + o), (t * i - e) / n) : new s((e + t * (i = o / a)) / (n = o * i + a), (t - e * i) / n)
  },
  pow: function(e, t) {
    var r = new s(e, t);
    if (e = this.re, t = this.im, r.isZero()) return s.ONE;
    if (0 === r.im) {
      if (0 === t && e > 0) return new s(Math.pow(e, r.re), 0);
      if (0 === e) switch ((r.re % 4 + 4) % 4) {
        case 0:
          return new s(Math.pow(t, r.re), 0);
        case 1:
          return new s(0, Math.pow(t, r.re));
        case 2:
          return new s(-Math.pow(t, r.re), 0);
        case 3:
          return new s(0, -Math.pow(t, r.re));
      }
    }
    if (0 === e && 0 === t && r.re > 0 && r.im >= 0) return s.ZERO;
    var n = Math.atan2(t, e),
      i = u(e, t);
    return e = Math.exp(r.re * i - r.im * n), t = r.im * i + r.re * n, new s(e * Math.cos(t), e * Math.sin(t))
  },
  sqrt: function() {
    var e, t, r = this.re,
      n = this.im,
      i = this.abs();
    if (r >= 0) {
      if (0 === n) return new s(Math.sqrt(r), 0);
      e = .5 * Math.sqrt(2 * (i + r))
    } else e = Math.abs(n) / Math.sqrt(2 * (i - r));
    return t = r <= 0 ? .5 * Math.sqrt(2 * (i - r)) : Math.abs(n) / Math.sqrt(2 * (i + r)), new s(e, n < 0 ? -t : t)
  },
  exp: function() {
    var e = Math.exp(this.re);
    return this.im, new s(e * Math.cos(this.im), e * Math.sin(this.im))
  },
  expm1: function() {
    var e = this.re,
      t = this.im;
    return new s(Math.expm1(e) * Math.cos(t) + function(e) {
      var t = Math.PI / 4;
      if (-t > e || e > t) return Math.cos(e) - 1;
      var r = e * e;
      return r * (r * (r * (r * (r * (r * (r * (r / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - .5)
    }(t), Math.exp(e) * Math.sin(t))
  },
  log: function() {
    var e = this.re,
      t = this.im;
    return new s(u(e, t), Math.atan2(t, e))
  },
  abs: function() {
    return e = this.re, t = this.im, r = Math.abs(e), n = Math.abs(t), r < 3e3 && n < 3e3 ? Math.sqrt(r * r + n * n) : (r < n ? (r = n, n = e / t) : n = t / e, r * Math.sqrt(1 + n * n));
    var e, t, r, n
  },
  arg: function() {
    return Math.atan2(this.im, this.re)
  },
  sin: function() {
    var e = this.re,
      t = this.im;
    return new s(Math.sin(e) * i(t), Math.cos(e) * a(t))
  },
  cos: function() {
    var e = this.re,
      t = this.im;
    return new s(Math.cos(e) * i(t), -Math.sin(e) * a(t))
  },
  tan: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = Math.cos(e) + i(t);
    return new s(Math.sin(e) / r, a(t) / r)
  },
  cot: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = Math.cos(e) - i(t);
    return new s(-Math.sin(e) / r, a(t) / r)
  },
  sec: function() {
    var e = this.re,
      t = this.im,
      r = .5 * i(2 * t) + .5 * Math.cos(2 * e);
    return new s(Math.cos(e) * i(t) / r, Math.sin(e) * a(t) / r)
  },
  csc: function() {
    var e = this.re,
      t = this.im,
      r = .5 * i(2 * t) - .5 * Math.cos(2 * e);
    return new s(Math.sin(e) * i(t) / r, -Math.cos(e) * a(t) / r)
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
    return new s(Math.PI / 2 - n.im, n.re)
  },
  atan: function() {
    var e = this.re,
      t = this.im;
    if (0 === e) {
      if (1 === t) return new s(0, 1 / 0);
      if (-1 === t) return new s(0, -1 / 0)
    }
    var r = e * e + (1 - t) * (1 - t),
      n = new s((1 - t * t - e * e) / r, -2 * e / r).log();
    return new s(-.5 * n.im, .5 * n.re)
  },
  acot: function() {
    var e = this.re,
      t = this.im;
    if (0 === t) return new s(Math.atan2(1, e), 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).atan() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atan()
  },
  asec: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(0, 1 / 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).acos() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acos()
  },
  acsc: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(Math.PI / 2, 1 / 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).asin() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asin()
  },
  sinh: function() {
    var e = this.re,
      t = this.im;
    return new s(a(e) * Math.cos(t), i(e) * Math.sin(t))
  },
  cosh: function() {
    var e = this.re,
      t = this.im;
    return new s(i(e) * Math.cos(t), a(e) * Math.sin(t))
  },
  tanh: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = i(e) + Math.cos(t);
    return new s(a(e) / r, Math.sin(t) / r)
  },
  coth: function() {
    var e = 2 * this.re,
      t = 2 * this.im,
      r = i(e) - Math.cos(t);
    return new s(a(e) / r, -Math.sin(t) / r)
  },
  csch: function() {
    var e = this.re,
      t = this.im,
      r = Math.cos(2 * t) - i(2 * e);
    return new s(-2 * a(e) * Math.cos(t) / r, 2 * i(e) * Math.sin(t) / r)
  },
  sech: function() {
    var e = this.re,
      t = this.im,
      r = Math.cos(2 * t) + i(2 * e);
    return new s(2 * i(e) * Math.cos(t) / r, -2 * a(e) * Math.sin(t) / r)
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
      o = 0 !== a ? new s((i * n - t * t) / a, (t * n + i * t) / a) : new s(-1 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0),
      c = o.re;
    return o.re = u(o.re, o.im) / 2, o.im = Math.atan2(o.im, c) / 2, r && (o.im = -o.im), o
  },
  acoth: function() {
    var e = this.re,
      t = this.im;
    if (0 === e && 0 === t) return new s(0, Math.PI / 2);
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).atanh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atanh()
  },
  acsch: function() {
    var e = this.re,
      t = this.im;
    if (0 === t) return new s(0 !== e ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).asinh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asinh()
  },
  asech: function() {
    var e = this.re,
      t = this.im;
    if (this.isZero()) return s.INFINITY;
    var r = e * e + t * t;
    return 0 !== r ? new s(e / r, -t / r).acosh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acosh()
  },
  inverse: function() {
    if (this.isZero()) return s.INFINITY;
    if (this.isInfinite()) return s.ZERO;
    var e = this.re,
      t = this.im,
      r = e * e + t * t;
    return new s(e / r, -t / r)
  },
  conjugate: function() {
    return new s(this.re, -this.im)
  },
  neg: function() {
    return new s(-this.re, -this.im)
  },
  ceil: function(e) {
    return e = Math.pow(10, e || 0), new s(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e)
  },
  floor: function(e) {
    return e = Math.pow(10, e || 0), new s(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e)
  },
  round: function(e) {
    return e = Math.pow(10, e || 0), new s(Math.round(this.re * e) / e, Math.round(this.im * e) / e)
  },
  equals: function(e, t) {
    var r = new s(e, t);
    return Math.abs(r.re - this.re) <= s.EPSILON && Math.abs(r.im - this.im) <= s.EPSILON
  },
  clone: function() {
    return new s(this.re, this.im)
  },
  toString: function() {
    var e = this.re,
      t = this.im,
      r = "";
    return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(e) < s.EPSILON && (e = 0), Math.abs(t) < s.EPSILON && (t = 0), 0 === t ? r + e : (0 !== e ? (r += e, r += " ", t < 0 ? (t = -t, r += "-") : r += "+", r += " ") : t < 0 && (t = -t, r += "-"), 1 !== t && (r += t), r + "i"))
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


