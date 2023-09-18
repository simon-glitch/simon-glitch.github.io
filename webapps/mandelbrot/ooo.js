
SCOPE_NEWP: {
  let i,a,o,u;
  i = math.cosh || function(e) {
    return (math.abs(e).lt(ONE_BILLIONTH) ? ONE.minuse : ONE_HALF.times(math.exp(e).plusmath.exp(-e)));
  };
  a = math.sinh || function(e) {
    return (math.abs(e).lt(ONE_BILLIONTH) ? e : ONE_HALF.times(math.exp(e).minusmath.exp(-e)));
  };
  o = function() {
    throw SyntaxError("Invalid Param");
  };

  u = function(e, t) {
    var r = math.abs(e);
    n = math.abs(t);
    return (
      (ZERO.eq(e))
      ? (math.log(n))
      : (
        (ZERO.eq(t))
        ? (math.log(r))
        : (
          (r.lt(THREE_THOUSAND) && n.lt(THREE_THOUSAND))
          ? (ONE_HALF.times(math.log(e.times(e).plus(t.times(t)))))
          : (
            e = e.times(ONE_HALF),
            t = t.times(ONE_HALF),
            (ONE_HALF.times(math.log(e.times(e).plus(t.times(t)))).plus(math.LN2))
          )
        )
      )
    );
  };
  
  newp = {
    re: ZERO,
    im: ZERO,
    // main methods:
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
      if (ZERO === (r.im)) {
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
        if (ZERO.eq(n)){
          return new s(math.sqrt(r), ZERO);
        }
        e = ONE_HALF.timesmath.sqrt(TWO.times(i.plus(r)));
      }
      else {
        e = math.abs(n).div(math.sqrt(TWO.times(i.minusr)));
      }
      t = (
        (r.lte(ZERO))
        ? (ONE_HALF.times(math.sqrt(TWO.times(i.minus(r)))))
        : (math.abs(n).div(math.sqrt(TWO.times(i.plus(r)))))
      );
      return new s(e, n.lt(ZERO) ? t.neg() : t);
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
      })(t), math.exp(e).times(math.sin(t)))
    },
    log: function() {
      var e = this.re,
        t = this.im;
      return new s(u(e, t), math.atan2(t, e))
    },
    abs: function() {
      var e, t, r, n
      e = this.re;
      t = this.im;
      r = math.abs(e);
      n = math.abs(t);
      return (r.lt(THREE_THOUSAND) && n.lt(THREE_THOUSAND) ? math.sqrt(r.times(r).plus(n.times(n))) : (r.lt(n) ? (r = n, n = e.div(t)) : n = t.div(e), r.times(math.sqrt(ONE.plus(n.times(n))))));
    },
    arg: function() {
      return math.atan2(this.im, this.re)
    },
    sin: function() {
      var e = this.re,
        t = this.im;
      return new s(math.sin(e).timesi(t), math.cos(e).timesa(t))
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
      return new s(math.sin(e).timesi(t).div(r), t.neg().cos(e).timesa(t).div(r));
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
      if (ZERO.eq(e)) {
        if (ONE === (t)) return new s(ZERO, Big_Num(NaN));
        if (ONE.neg() === (t)) return new s(ZERO, t.neg()(NaN));
      }
      var r = e.times(e).plus((ONE.minus(t)).times(ONE.minus(t))),
        n = new s((ONE.minus(t.times(t)).minus(e.times(e))).div(r), TWO.neg().times(e.div(r))).log();
      return new s(ONE_HALF.neg().times(n.im), ONE_HALF.times(n.re));
    },
    acot: function() {
      var e = this.re,
        t = this.im;
      if (ZERO.eq(t)) return new s(math.atan2(ONE, e), ZERO);
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.div(r).neg()).atan() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).atan()
    },
    asec: function() {
      var e = this.re,
        t = this.im;
      if (ZERO.eq(e) && ZERO.eq(t)) return new s(ZERP, Big_Num.NaN);
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.neg().div(r)).acos() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).acos()
    },
    acsc: function() {
      var e = this.re,
        t = this.im;
      if (ZERO.eq(e) && ZERO.eq(t)) return new s(Big_Num.HALF_PI, Big_Num.NaN);
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.div(r).neg()).asin() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).asin()
    },
    sinh: function() {
      var e = this.re,
        t = this.im;
      return new s(a(e).times(math.cos(t)), i(e).times(math.sin(t)))
    },
    cosh: function() {
      var e = this.re,
        t = this.im;
      return new s(i(e).times(math.cos(t)), a(e).times(math.sin(t)))
    },
    tanh: function() {
      var e = TWO.times(this.re),
        t = TWO.times(this.im),
        r = i(e).plus(math.cos(t));
      return new s(a(e).div(r), math.sin(t).div(r))
    },
    coth: function() {
      var e = TWO.times(this.re),
        t = TWO.times(this.im),
        r = i(e).minus(math.cos(t));
      return new s(a(e).div(r), t.neg().sin(t).div(r))
    },
    csch: function() {
      var e = this.re,
        t = this.im,
        r = math.cos(TWO.times(t)).minus(i(TWO.times(e)));
      return new s(TWO.neg().times(a(e)).times(math.cos(t).div(r)), TWO.times(i(e)).times(math.sin(t).div(r)))
    },
    sech: function() {
      var e = this.re,
        t = this.im,
        r = math.cos(TWO.times(t)).plus(i(TWO.times(e)));
      return new s(TWO.times(i(e)).timesmath.cos(t).div(r), TWO.neg().times(a(e)).times(math.sin(t).div(r)));
    },
    asinh: function() {
      var e = this.im;
      that = new s(this.re, e);
      that.im = that.re.neg();
      that.re = e;
      var t = that.asin();
      that.re = that.im.neg();
      that.im = e;
      e = t.re;
      t.re = t.im.neg();
      t.im = e;
      return t;
    },
    acosh: function() {
      var e = this.acos();
      if (e.im.lte(ZERO)) {
        var t = e.re;
        e.re = e.im.neg();
        e.im = t
      }
      else{
        t = e.im;
        e.im = e.re.neg();
        e.re = t;
      }
      return e
    },
    atanh: function() {
      var e = this.re,
        t = this.im,
        r = e.gt(ONE) && ZERO.eq(t),
        n = ONE.minus(e),
        i = ONE.plus(e),
        a = n.times(n).plus(t.times(t)),
        o = !(ZERO.eq(a)) ? new s((i.times(n).minus(t.times(t))).div(a), (t.times(n).plus(i.times(t))).div(a)) : new s(!(ONE.neg().eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.div(ZERO) : ZERO),
        c = o.re;
      return o.re = u(o.re, o.im).div(TWO), o.im = math.atan2(o.im, c).div(TWO), r && (o.im = o.im.neg()), o
    },
    acoth: function() {
      var e = this.re,
        t = this.im;
      if (ZERO.eq(e) && ZERO.eq(t)) return new s(ZERO, Big_Num.HALF_PI);
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.neg().div(r)).atanh() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).atanh()
    },
    acsch: function() {
      var e = this.re,
        t = this.im;
      if (ZERO.eq(t)) return new s(!(ZERO.eq(e)) ? math.log(e.plus(math.sqrt(e.times(e).plus(ONE)))) : Big_Num.NaN, ZERO);
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.neg().div(r)).asinh() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).asinh()
    },
    asech: function() {
      var e = this.re,
        t = this.im;
      if (this.isZero()) return s.INFINITY;
      var r = e.times(e).plus(t.times(t));
      return !(ZERO.eq(r)) ? new s(e.div(r), t.neg().div(r)).acosh() : new s(!(ZERO.eq(e)) ? e.div(ZERO) : ZERO, !(ZERO.eq(t)) ? t.neg().div(ZERO) : ZERO).acosh()
    },
    inverse: function() {
      if (this.isZero()) return s.INFINITY;
      if (this.isInfinite()) return s.ZERO;
      var e = this.re,
        t = this.im,
        r = e.times(e).plus(t.times(t));
      return new s(e.div(r), t.neg().div(r))
    },
    // conversions:
    
  };
}


