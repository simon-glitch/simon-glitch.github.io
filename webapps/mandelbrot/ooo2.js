
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
toString: function(length) {
  var e = this.re,
    t = this.im,
    r = "";
    
  // convert to certain number of decimal places
  length = length ?? s.printLength
  if(length){
    e = e.toDecimalPlaces(length);
    t = t.toDecimalPlaces(length);
  }
  
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

