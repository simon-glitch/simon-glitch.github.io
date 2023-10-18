/**
  * @name Matrices.js
  * @description This is a simple matrix library for JavaScript.
  * @author Simon Glitch (simon-glitch.github.com)
    * alias: Simanelix (@simanelix on discord.com)
  * @purpose
    * Why bother making this program?
      * This library was created because other libraries are either too complex or implement matrices using inefficient arrays (the built-in Array is not memory efficient).
    * Why is the copyright open source?
      * I want others to be able to reuse my work for their own projects,
      * no matter how [ambitious or miniscule]!
    * Why is this JSDoc formatted funny?
      * @see [the @see section below]
  * @globals:
    * Matrix:
      * @class @override
    * Matrix.Dynamic
      * @class @override
    * ErrorError
      * @class
  * @see [...] What is this format?
    * This is a header comment, written in JSDoc format. I will write an essay explaining how I use these in the future.
    * This is my first time doing this (this = writing a JSDoc header for my code);
    * so, this (this = my methods for writing a JSDoc header for my code) is still a WIP (which means that I haven't refined my methods or decided on the best practices for this yet).
  * @aside
    * Ah, I gotta say, everything makes more sense in code though.
    * Hmm, I wonder what kidns of strict rules there are on software copyrights. In particular, I wonder if certain copyright formats are invalid or if all copyrights are required to adhere to a certain format. I wonder how interpretation of a copyright works.
      * well, I like the copyright format below;
      * if your are against it, then feel free to contact me with friendly criticism;
    * Wow, this sure does feel like it is a lot of code!
  * @copyright
    * @summary fully open-source copyright
    * allowed:
      * this program may be used as is;
      * this program may be spliced and distributed freely;
      * then this program is used to a significant degree, it may be used for any of the following purposes:
        * personal (individual use) by the distributor;
        * commerical use, including commerical use that yields profit to the distributor;
      * this program may be integrated or included in a another piece of software (named `A`), which may be:
        * sold separately;
        * copyrighted separately;
        * used for any purpose allowed under the copy right of `A`;
    * disallowed:
      * commerical use of this program without crediting me (Simon Glitch) is hereby not allowed;
      * it would be disrespectful to profit from this without at least acknowledging my contributions;
 **/


/**
  * Convert a function into a proper class, without using class syntax; why do this? Well, `classify` allows you to call the class constructor without using new. I guess there are other ways to this... anyways, I like this way of doing it. It works~;
  * @use `classify(f, proto_obj, sub_properties, ...args)`
  * @param {Function} f the function to use as the constructor
  * @param {Object} proto_obj an object whose properties will become the propeties of `f`'s prototype; i.e. an object with the prototype properties of `f`.
  * @param {Object} sub_properties an object listing extra properties to add to `f`; in methods in `sub_properties`, `this` = `f` itself, ok?
  * @param {any} args you can list any number of additional arguments; these additional arguments are passed into `f` when creating the prototype of `f`
  * @description
    * if you don't want to create a new protype for `f`, but instead want to update the existing class, just set `...args = classify.UPDATE`; the notation for this would look like:
    * `classify(f, proto_obj, sub_properties, classify.UPDATE)`;
    * or like this: `classify(f, proto_obj, sub_properties, classify.UPDATE)`
      * (since `classify.UPDATE simply = "UPDATE"`)
    * `classify` will add properties from `proto_obj` to `f.prototype`, and add properties from sub_properties to `f` itself, leaving existing properties as is; `classify` also replaces existing properties if a new value is listed in `proto_obj` or `sub_properties` (respectively).
  * furthermore, `classify` automatically names methods in `proto_obj` and `sub_properties`!
  * I wish this JSDoc didn't print the arguments twice
 **/
const classify = function classify(f, proto_obj, sub_properties, ...args){
  proto_obj = proto_obj ?? {};
  sub_properties = sub_properties ?? {};
  
  let proto;
  
  if(args[0] !== classify.UPDATE){
    f.name = f.name || "AnonymousClass";
    f.prototype = proto_obj;
    proto = new f(...args);
    f.prototype = proto;
    proto.constructor = f;
  }
  
  for (let i in proto_obj){
    const value = proto_obj[i];
    if(typeof value === "function"){
      value.name = value.name || i;
    }
    proto[i] = value;
  }
  for (let i in sub_properties){
    const value = sub_properties[i];
    if(typeof value === "function"){
      value.name = value.name || i;
    }
    f[i] = value;
  }
  // I could just change Object.prototype's toString, but I kinda prefer manually setting f's toString:
  if(proto.toString === {}.toString)
    proto.toString = classify.default_to_string;
  return f;
};
classify.default_to_string = function toString(){
  return "[object " + this.constructor.name + "]";
};
classify.UPDATE = "UPDATE";

/**
 * Copy properties of one object into another. This only mutates main.
 * @param {object} main object to mutate
 * @param {object} source (subject) object whose properties will be added to main
 * @param {Array[String]} name_sets which properties (selected by property name) (of source) to pull from source and put in main
 */
const coalesce = function(main, source, name_sets){
  let i, ii, name_set, name, base_name, value;
  for(i = 0; i < name_sets.length; i++){
    name_set = name_sets[i];
    base_name = name_set[0];
    for(ii = 0; i < name_set.length; i++){
      name = name_set[ii];
      value = source[name];
      if(value !== null && value !== undefined){
        main[base_name] = value;
        break;
      }
    }
  }
};


/**
 * something has gone awry!
 * @param {String} message (REQUIRED) message to describe why this error occured!
 */
class ErrorError extends Error{
  description = "you really are not good at programming if you are getting this error; something might have gone terribly wrong somehwere;";
  constructor(){
    super(...arguments);
  }
}

/**
 * Creates an error of the specified type with the specified message.
 * @param {String} type name of the error type (i.e. "Syntax" for a SyntaxError)
 * @param {String} message the message describing why the error occured
 * @returns an error object, of type [type]Error, or just Error (if [type]Error) does not exist
 */
const err = function(type, message){
  if(typeof type !== "string")
    throw err("Error", "err requires a string value for type argument");
  if(typeof message !== "string")
    message = "For some reason, **someone** forgot to put an error message in here! You better fix THAT first before fixing the actual problem that caused this error to be thrown in the first place!";
  const name = type + "Error";
  let t = window[name];
  if(!t){
    t = Error;
  }
  const e = new t();
  e.message = "Uncaught "+ name + ": " + message;
  return e;
}

/**
  * @class
  * Create a randomizer; this.num() returns a random number in the range: [min, min + sep ... max - ((max - min) % sep)] (range is inclusive on both sides; the ellipsis are desmos range notation)
  * @param {Number} min minimum value this can generate
  * @param {Number} max maximum value this can generate
  * @param {Number} sep (separator) distance between values this can generate
 **/
const Rand = function Rand(min, max, sep){
  // reverse nullish coalescing assignment
  this.min = min ?? this.min;
  this.max = max ?? this.max;
  this.sep = sep || this.sep;
};

classify(
  Rand,
  {
    min: -4,
    max: 4,
    sep: 1,
    num: function(){
      return Math.floor(Math.random() * ((this.max - this.min) / this.sep)) * this.sep + this.min;
    },
  }
);


/**
  * A matrix has a constant width and height;
    * if you want to edit or change it, use new Matrix.Dynamic();
  * @param {Number} length the number of rows this matrix will have;
  * @param {Number} width the number of columns this matrix will have;
  * @param {String} nickname (optional) You can name the matrix;
 **/
const Matrix = function Matrix(length, width, nickname){
  this.length = length || 0;
  this.width  = width  || this.length;
  this.nickname = nickname?.toString() ?? this.nickname;
  let i,j;
  this.m = new Float64Array(length * width);
  for(i = 0; i < this.length; i++){
    this.m[i] = [];
    for(j = 0; j < this.width; j++) this.m[i][j] = 0;
  };
};

classify(Matrix, {
  m: (new Float64Array(0)),
  is_tranposed: false,
  length: 0,
  width: 0,
  scalar: 1,
  nickname: "",
  /**
    * Lazy scaling: this allows you to stack scalars without loosing performance!
   **/
  auto_really_scale: function auto_really_scale(){
    if(this.scalar !== 1){
      this.really_scale();
    }
  },
  get_at: function get_at(i_row, i_col){
    this.auto_really_scale();
    if(this.is_tranposed)
      return this.m[i_col * this.width + i_row];
    // we want to make tranposing matrices extrmely fast
    else
      return this.m[i_row * this.width + i_col];
  },
  set_at: function set_at(i_row, i_col, new_val){
    this.auto_really_scale();
    if(this.is_tranposed)
      return (this.m[i_col * this.width + i_row] = new_val);
    // we want to make tranposing matrices extrmely fast
    else
      return (this.m[i_row * this.width + i_col] = new_val);
  },
  /**
   * Slice a 2-D sub-matrix out of a matrix.
   * @param {number} min_y the upper y coord of the slice
   * @param {number} max_y the lower y coord of the slice
   * @param {number} min_x the left  x coord of the slice
   * @param {number} max_x the right x coord of the slice
   * @returns the matrix made up of the grid of values between the specified x and y coordinates
   */
  slice: function slice(min_y, max_y, min_x, max_x){
    this.auto_really_scale();
    min_y = ((min_y ?? 0          ) + this.length + 1) % (this.length + 1);
    max_y = ((max_y ?? this.length) + this.length + 1) % (this.length + 1);
    min_x = ((min_x ?? 0          ) + this.width  + 1) % (this.width  + 1);
    max_x = ((max_x ?? this.width ) + this.width  + 1) % (this.width  + 1);
    // if the ranges don't make sense, return an empty matrix
    if(max_x < min_x || max_y < min_y){
      return new Matrix();
    }
    let length = max_y - min_y;
    let width  = max_x - min_x;
    let m = new Matrix(length, width);
    if(this.is_tranposed){
      for(let i = 0, ii; i < m.m.length; i++){
        ii = Math.floor((width * (Math.floor(i / width) + min_y) + i + min_x) / width);
        /* was:
        ii = ((Math.floor(i / width) + min_y) * width) + ((i % width) + min_x);
        let ix = ii % this.width;
        let iy = Math.floor(ii / this.width);
        ii = ix * width + iy;
        */
        m.m[i] = this.m[ii];
      }
    }
    else{
      for(let i = 0, ii; i < m.m.length; i++){
        ii = ((Math.floor(i / width) + min_y) * width) + ((i % width) + min_x);
        m.m[i] = this.m[ii];
      }
    }
    // then just return!
    return m;
  },
  /**
   * returns a clone of this matrix
   */
  clone: function clone(){
    return this.slice();
  },
  /**
   * Add this and that under standard matrix addition
   * @param {Matrix} that the matrix to add to this matrix
   * @param {boolean} in_place whether to store the result of the matrix addition in this matrix
   * @returns the sum of this and that
   */
  add: function add(that, in_place = false){
    this.auto_really_scale();
    res = (in_place) ?this :this.clone();
    if(this.m.length !== that.m.length){
      console.log("cannot add a " + this.to_dim_name() + " to a " + that.to_dim_name() + "!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).");
      return;
    }
    for(let i = 0; i < this.m.length; i++){
      res.m[i] += that.m[i];
    }
    return res;
  },
  subtract: function subtract(that, in_place = false){
    this.auto_really_scale();
    res = (in_place) ?this :this.clone();
    if(this.m.length !== that.m.length){
      console.log("cannot add a " + this.to_dim_name() + " to a " + that.to_dim_name() + "!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).");
      return;
    }
    for(let i = 0; i < this.m.length; i++){
      res.m[i] -= that.m[i];
    }
    return res;
  },
  /**
   * Multiply this matrix by that matrix. Makes a new matrix.
   * @param {Matrix} that 
   * @returns a new Matrix: the result of the matrix multiplication
   */
  multiply: function multiply(that){
    if(!this.is_square()){
      console.log("cannot multiple a " + this.to_dim_name() + " by a " + that.to_dim_name() + "!\n> The middle 2 numbers must be the same {cols(left) == rows(right)}.");
      return;
    }
    
    let i, j, k, v;
    const w = that.width, l = this.length;
    const res = new Matrix(l, w);
    for(i = 0; i < l; i++){
      for(j = 0; j < w; j++){
        v = 0;
        for(k = 0; k < w; k++){
          v += this.get_at(i, k) * that.get_at(k, j);
        }
        res.set_at(i,j, v);
      }
    }
    return res;
  },
  /**
   * multiplies this by a scalar, in place, overwriting current values of this
  **/
  scale: function scale(scalar){
    this.scalar *= scalar;
    console.log(this.to_dim_name() + " scalar now= " + this.scalar);
    return this;
  },
  /**
   * REALLY multiplies this by a scalar, in place, mutating current values of this
  **/
  really_scale: function really_scale(scalar){
    this.scalar = scalar ?? this.scalar;
    console.log(this.to_dim_name() + " (really scaling) scalar now= " + this.scalar);
    for(let i = 0; i < this.m.length; i++){
      this.m[i] *= this.scalar;
    }
    return this;
  },
  to_dim_name: function to_dim_name(){
    return "[" + this.nickname + (this.nickname ? ": " :"") + this.length + " by " + this.width + " Matrix]"
  },
  eq0: function eq0(){
    this.auto_really_scale();
    return Matrix.eq0(this);
  },
  /**
   * Check approximate equality between matrices
   * @param {Matrix} that matrix to compare this to
   * @returns boolean: whether the 2 matrices are approximately equal
   */
  eq: function eq(that){
    this.auto_really_scale();
    for(let i = 0; i < this.m.length; i++){
      if(2 * (this.m[i] - that.m[i]) / Math.sqrt(this.m[i] * that.m[i]) > Matrix.epsilon){
        return false;
      }
    }
    return true;
  },
  ineq: function ineq(that){
    this.auto_really_scale();
    return !this.eq(that);
  },
  exp: function exp(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "cannot exponentiate a non-square matrix, because exponentiation requires the matrix to have an identity matrix, and a non-square matrix do not have an identity matrix!");
    }
    that = this.clone();
    term = that.clone();
    that.add(that.ident(), true);
    that.add(term, true);
    // e^x = 1 + x + x^2 / 2 + x^3 / 3! + x^4 / 4! ...
    // n! = n factorial = (n-1)! * n
    // 0! = 1! = 1
    for(let i = 2; i < 10; i++){
      term = term.scale(1/i).multiply(this);
      that.add(term, true);
    }
    // mine goes up to x^9 / 9! (currently)
    return that;
  },
  /**
   * Print this matrix!
   * @param {Number} toFixedDigits how many digits of each value to print
   * @param {Boolean} excludeName whether to exclude the name header
   * @returns {String} a string representing the matrix
   */
  toString: function toString(toFixedDigits = 3, excludeName = false){
    let str = excludeName ?"" :(this.to_dim_name());
    str += "[\n";
    let i,j;
    for(i = 0; i < this.length; i++){
      str += "  ";
      for(j = 0; j < this.width; j++){
        str += this.get_at(i,j).toFixed(toFixedDigits);
        if(j < this.width - 1) str += ", ";
      }
      str += ";\n";
    }
    str += "]";
    return str;
  },
  /**
   * get the "absolute value" of this matrix or vector
   * @returns {Number} the absolute value
   */
  abs: function abs(){
    this.auto_really_scale();
    // um, I am not sure if this is faster or slower than the default method
    // good news: spread operator actually works on all `TypedArray`s
    return Math.hypot(...this.m);
  },
  /**
   * Transposes this matrix, IN PLACE, for real. I love how elegant and magical-looking this funciton is.
   * @returns {Matrix} the transposed matrix;
   */
  really_transpose: function really_transpose(){
    this.auto_really_scale();
    this.transpose();
    if(this.is_tranposed){
      let iy, ix, ii, ij, swap;
      for(iy = 0; iy < this.width; iy++){
        for(ix = 0; ix < iy; ix++){
          ii = iy * this.width + ix;
          ij = ix * this.length + iy;
          swap = this[ii];
          this[ii] = this[ij];
          this[ij] = swap;
        }
      }
    }
    return this;
  },
  /**
   * Check whether this matrix is a vector. If this matrix has been transposed, it tells you whether the matrix is currently a vector (after being transposed). FYI: a vector is simply a matrix with 1 column.
   * @returns {Boolean} whether this is a vector;
   */
  is_vector: function is_vector(){
    return (this.width === 1);
  },
  /**
   * Check wether this matrix is square.
   * TODO: use this in other places.
   */
  is_square: function is_square(){
    return (this.length === this.width);
  },
  /**
   * Convert this to a vector
   * @param {Boolean} reinitialize_values whether this should clone the values (in this.m); if reinitialize_values is false, then this.m will be reused, and the resulting vector will use the same TypedArray as this; if your goal is to slice this into a new vector, then set reinitialize_values = true;
   */
  toVector: function toVector(reinitialize_values = false){
    this.auto_really_scale();
    const that = new Vector(this.m.length);
    if(reinitialize_values) for(let i = 0; i < this.m.length; i++){
      that.m[i] = this.m[i];
    }
    else that.m = this.m;
    return that;
  },
  /**
    * Should I make this use this.auto_really_scale()?
    * @returns {Number} sum of all values in this matrix
   **/
  total: function total(){
    zero = this.scalar === 0;
    if(zero) return 0;
    
    let s = 0;
    for(let i = 0; i < this.m.length; i++)
      s += this.m[i];
    return s * this.scalar;
  },
  product: function product(){
    zero = this.scalar === 0;
    this.auto_really_scale();
    if(zero) return 0;
    
    let s = 0;
    for(let i = 0; i < this.m.length; i++)
      s *= this.m[i];
    return s;
  },
  diagonal: function diagonal(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    const that = new Matrix(this.length, this.width);
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      that.m[j] = this.m[j];
    }
    return that;
  },
  diagonal_total: function diagonal_total(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 0;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s += this.m[j];
    }
    return s;
  },
  diagonal_abs: function diagonal_abs(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 0;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s += this.m[j] **2;
    }
    return Math.sqrt(s);
  },
  diagonal_product: function diagonal_product(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 1;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s *= this.m[j];
    }
    return s;
  },
  /**
   * Accurately exponentiate this to a given integer that.
   * @param {Number} that power;
   * @returns {Matrix} this^that
   */
  pow: function pow(that){
    if(!this.is_square){
      throw err("Value", "Cannot multiply a non-square matrix by itself; cannot invert a non-square matrix; cannot find the identity matrix corresponding to a non-square matrix; thus, cannot raise a non-square matrix to any power!");
    }
    if(that === 0){
      return this.ident();
    }
    if((that < 2**53) && (that % 1 === 0)){
      if(that < 0){
        return this.inv().pow(that);
      }
      that = this.ident();
      let power = this.clone();
      const binary = that.toString(2);
      // use repeated squaring to quickly exponentiate up to any large power
      for(let i = binary.length - 1; i >= 0; i--){
        if(binary[i]){
          that = that.multiply(power);
          if(i > 0){
            power = power.multiply(power);
          }
        }
      }
      return that;
    }
    that_c = that?.constructor?.name;
    that_cc = that?.prototype?.constructor?.name;
    throw err("Type", "Either `that` was an invalid type or this code hasn't implemented expontitation for the type of `that` yet. Typeof that: " + (typeof that) + (that_c ? (", instanceof: " + that_c + (that_cc ?(" and " + that_cc) :"")) :""));
  },
  /**
    * Convert this matrix to a 2-D array (or a 2-D version of any array-like `type`)!
    * @param {Function} type which class (or type) of Array-like object to coerce this matrix into
    * @param {Boolean} type_allows_mapping whether the type has a map() method that works the same way Array's map() does
    * @param {Boolean} type_accepts_length whether the type allows you to give the length as the first parameter when calling the constructor
    * @returns {Array | type} A 2-D array (or a 2-D version of type), representing this matrix, composed with the values from this matrix.
   **/
  toDoubleArray: function toDoubleArray(type = Array, type_allows_mapping = false, type_accepts_length = true){
    // this.auto_really_scale();
    type ??= Array;
    if(type === Array){
      type_allows_mapping = true;
    }
    
    // are these nested ternaries unintuitive?
    const that = type_allows_mapping ?(
      (
        type_accepts_length ?(new Array()) :(new Array(this.length))
      ).map(() => (
        type_accepts_length ?(new Array()) :(new Array(this.length))
      ))
    ) : (
      type_accepts_length ?(new Array()) :(new Array(this.length))
    );
    let iy, ix;
    for(iy = 0; iy < this.length; iy++){
      if(!type_allows_mapping){
        that[iy] = (
          type_accepts_length ?(new Array()) :(new Array(this.length))
        );
      }
      for(ix = 0; ix < this.width; ix++){
        that[iy][ix] = this.get_at(iy, ix);
      }
    }
    return that;
  },
  /**
    * Convert this matrix to an array; you can also add an arbitrary number of dimensions in the process
    * @param {Function} type the type of array-like object to convert this too;
      * defaults to Array;
    * @param {Number} dimensions the number of dimensions to use for the output array;
      * defaults to 1 (i.e. a simple Array);
    * @param {Boolean} requires_length whether type requires a length argument to be passed in on construction;
      * defaults to false;
   **/
  toArray: function toArray(type = Array, dimensions = 1, requires_length = false){
    this.auto_really_scale();
    type ??= Array;
    dimensions ??= 1;
    const that = requires_length ?(
      new type(this.length)
    ) :(
      new type()
    );
    if(typeof type !== "function"){
      err("Type", "type argument of toArray must be a function or class.");
    }
    if(typeof dimensions !== "number"){
      err("Type", "dimensions argument of toArray must be a number.");
    }
    if(dimensions < 0){
      err("Value", "Cannot construct an array with " + dimensions + " dimensions! (An array must have a non-zero positive number of dimensions!)")
    }
    if(dimensions === 1){
      for(let i = 0; i < this.m.length; i++){
        that[i] = this.m[i];
      }
      return that;
    }
    let iy, ix, ii = 0;
    for(iy = 0; iy < this.length; iy++){
      that[iy] = requires_length ?(
        new type(this.width)
      ) :(
        new type()
      );
      for(ix = 0; ix < this.width; ix++){
        if(this.dimensions > 2){
          let arr = requires_length ?(
            new type(1)
          ) :(
            new type()
          );
          that[iy][ix] = arr;
          for(let i = 3; i < dimensions; i++){
            arr[0] = requires_length ?(
              new type(1)
            ) :(
              new type()
            );
            arr = arr[0];
          }
          arr[0] = ii;
        }
        ii++;
      }
    }
    return that;
  },
  /* TODO:
  add the following methods:
    * Y ineq()
    * Y is_vector()
    * Y is_square()
    * Y really_transpos e()
    * Y hypot() / abs() / vector_length() // get the size of this matrix (as a vector)
    * Y exp()
    * Y pow(int)
    * pow(float)
    * inv() // inverse (calculated via GAUSSIAN ELIMINATION)
    * div(that) // divide, this.div(that) = this.multiply(that.inv())
    * mod(that) // modulo, this.mod(that) = this.subtract(this.div(that).floor())
    * floor() // just applies floor() to each value
    * ceil () // just applies ceil () to each value
    * round() // just applies round() to each value
    * hypofloor() / hypotrunc() // just applies floor() or ceil()s to each value, towards 0
    * hypoceil () // just applies floor() or ceil() to each value, in the current direction of the value
    * hyporound() ? // applies floor() or ceil() to each value towards Math.sign(value) * this.abs()
    * det () // determinant (of this matrix)
    * ref () // row echelon form (of this matrix)
    * rref() // reduced row echelon form (of this matrix)
    * rank() // get the rank (of this matrix)
    * row_space_span() // get the span of the row    space of this matrix
    * col_space_span() // get the span of the column space of this matrix
    * nul_space_span() // get the span of the null   space of this matrix
    * Y diagonal_product() // get the product of the diagonal of this matrix
    * Y diagonal_total / diagonal_sum() // get the product of the diagonal of this matrix
    * Y diagonal_abs() // get the absolute value of the diagonal of this matrix (i.e. this.diagonal().abs())
    * Y diagonal() // get just the diagonal of this matrix
    * Y total() // get the total (sum) of all values in this matrix
    * Y product() // get the product of all values in this matrix
    * minor(i, j) // get the result of removing row i and column j from this matrix
    * cofactors() // get the matrix of cofactors to this matrix
    * cofactor(i,j) // get the cofactor of this matrix, at coordinate {i,j}
    * Y toDoubleArray() // convert this matrix into a 2D array
    * toDynamic() // convert this matrix into a dynamic matrix
    * Y toVector() // convert this into a vector (reuses the values of this.m)
    * Y toArray() // convert this into an array
    * toGrid(ArrayLikeClass) // convert this into a 2D instance of ArrayLikeClass, by simply assinging the values of this matrix to tje array-like class
  */
});

classify(Matrix, {
  hypot: Matrix.prototype.abs,
  vector_length: Matrix.prototype.abs,
  diagonal_sum: Matrix.prototype.diagonal_total,
  diagonal_hypot: Matrix.prototype.diagonal_abs,
}, {}, "UPDATE");

const Vector = (class Vector extends Matrix{
  constructor(length){
    super(length, 1);
  }
});

classify(Vector, {
  width: 1,
  leading_zeroes: 0,
  /**
    * Multiply this by that;
      * if that is a number, return the product of scaling this by that;
      * if that is a vector, return the dot product;
      * if that is a matrix, return the matrix multiplication product;
    * @param {Number | Vector | Matrix} that 2nd operand in multiplication
    * @param {Boolean} as_matrix whether to return a Matrix instead of a Vector
    * @returns {Vector} product of this and that
   */
  multiply: function(that, as_matrix = false){
    if((that instanceof Vector) || (that.is_vector())){
      return this.dot(that);
    }
    if(that instanceof Number){
      return this.really_scale(that);
    }
    that = Matrix.prototype.multiply.call(this, that);
    if(as_matrix) return that;
    return that.toVector();
  },
  count_leading_zeroes: function(){
    let i;
    for(i = 0; i < this.m.length; i++){
      if(!Matrix.eq0(this.m[i])){
        i--;
        break;
      }
      this.m[i] = 0;
    }
    return i;
  },
}, {}, "UPDATE");

// TODO: actually add this in (i.e. implement Matrix.Dynamic);
// TODO: cry over the fact that I can't fold the JSDoc comment below;
// TODO: contemplate whether `TODO`s should be in the header;
/**
  * @class
  * Uses normal arrays instead of Float64 arrays
 **/
Matrix.Dynamic = function Dynamic_Matrix(length, width){
  this.length = length || 1;
  this.width  = width  || 1;
  let i,j;
  this.m = new Array(this.length);
  for(i = 0; i < this.length; i++){
    this.m[i] = new Array(this.width);
    for(j = 0; j < this.width; j++) this.m[i][j] = [0];
  }
};

classify(Matrix.Dynamic, {
  get_at: function get_at(i_row, i_col){
    return this.m?.[i_row]?.[i_col]?.[0];
  },
  abs: Matrix.prototype.abs,
});

// generate a random n by k matrix
Matrix.random = function(length, width){
  const m = new Matrix(length, width);
  let i,j;
  for(i = 0; i < m.m.length; i++){
    m.m[i] = Matrix.rand.num();
  }
  return m;
};
Matrix.rand = new Rand();
Matrix.new_rand = function(min, max, sep){
  this.rand.constructor(min, max, sep);
};

// approximately 1 in 4 million
Matrix.epsilon = 2 ** (-22);

/**
  * Check if something is (approximately) zero;
  * @param {Number | Matrix} x check whether x equals 0 (the number 0, the zero vector, a zero matrix);
  * @returns {Boolean} whether x equals 0;
 **/
Matrix.eq0 = function(x){
  if(typeof x === "number")
    return (Math.abs(x) < Matrix.epsilon);
  // this is how smart people do recursion
  if(x instanceof Matrix) for(let i = 0; i < x.m.length; i++) if(!Matrix.eq0(x.m[i]))
    return false;
  return true;
};



/**
  * use 2 random n by k matrices to generate a random n by n singular matrix
 **/
Matrix.gen_singular = function(n, k){
  k ??= n +1;
  const m1 = Matrix.random(n, k);
  const m2 = Matrix.random(k, n);
  return matrix_mult(m1, m2);
};


console.clear();
if(0) onclick = function(){
  const me = Matrix.random(3,3);
  console.log("me = " + me);
  console.log("2*me = " + me.clone().scale( 2));
  console.log("-me = "  + me.clone().scale(-1));
  console.log("me^2 = "+ me.multiply(me));
};

/*
{
  let a = Matrix.random(3,3);
  let b = Matrix.random(3,3);
  time(() => {a.multiply(b);}, "3x3 matrix mult").then((v) => {
    console.log(v);
  });
}

{
  let a;
  time(() => {a = Matrix.random(20,20);}, "20x20 matrix gen").then((v) => {
    console.log(v);
  });
}

*/

