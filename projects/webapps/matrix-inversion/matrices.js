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
  get_at: function get_at(i_row, i_col){
    // lazy scaling; this allows you to stack scalars without loosing performance
    if(this.scalar !== 1){
      this.really_scale();
    }
    if(this.is_tranposed)
      return this.m[i_col * this.width + i_row];
    // we want to make tranposing matrices extrmely fast
    else
      return this.m[i_row * this.width + i_col];
  },
  set_at: function set_at(i_row, i_col, new_val){
    // lazy scaling; this allows you to stack scalars without loosing performance
    if(this.scalar !== 1){
      this.really_scale();
    }
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
    // lazy scaling; this allows you to stack scalars without loosing performance
    if(this.scalar !== 1){
      this.really_scale();
    }
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
    if(this.scalar !== 1){
      this.really_scale();
    }
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
    if(this.scalar !== 1){
      this.really_scale();
    }
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
    if(this.length !== that.width){
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
    return Matrix.eq0(this);
  },
  /**
   * Check approximate equality between matrices
   * @param {Matrix} that matrix to compare this to
   * @returns boolean: whether the 2 matrices are approximately equal
   */
  eq: function eq(that){
    for(let i = 0; i < this.m.length; i++){
      if(2 * (this.m[i] - that.m[i]) / Math.sqrt(this.m[i] * that.m[i]) > Matrix.epsilon){
        return false;
      }
    }
    return true;
  },
  /**
   * Print this matrix!
   * @param {number} toFixedDigits how many digits of each value to print
   * @param {boolean} excludeName whether to exclude the name header
   * @returns a string representing the matrix
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
  /* TODO
  add the following methods:
    * ineq()
    * is_vector()
    * really_transpose()
    * hypot() / abs()
    * exp()
    * pow(int)
    * pow(float)
    * inv() // inverse
    * div(that) // divide, this.div(that) = this.multiply(that.inv())
    * mod(that) // modulo, this.mod(that) = this.subtract(this.div(that).floor())
    * floor() // just applies floor() to each value
    * ceil () // just applies ceil () to each value
    * round() // just applies round() to each value
    * hypofloor() / hypotrunc() // just applies floor() or ceil()s to each value, towards 0
    * hypoceil () // just applies floor() or ceil() to each value, in the current direction of the value
    * hyporound() ? // applies floor() or ceil() to each value towards Math.sign(value) * this.abs()
    * det() // determinant
    * ref() // row echelon form
    * rref() // reduced row echelon form
    * rank() // get the rank of this matrix
    * row_space_span() // get the span of the row    space of this matrix
    * col_space_span() // get the span of the column space of this matrix
    * nul_space_span() // get the span of the null   space of this matrix
    * diagonal_product() // get the product of the diagonal of this matrix
    * diagonal() // get just the diagonal of this matrix
    * total() // get the total (sum) of all values in this matrix
    * product() // get the product of all values in this matrix
    * minor(i, j) // get the result of removing row i and column j from this matrix
    * cofactors() // get the matrix of cofactors to this matrix
    * cofactor(i,j) // get the cofactor of this matrix, at coordinate {i,j}
    * toDoubleArray() // convert this matrix into a 2D array
    * toDynamic() // convert this matrix into a dynamic matrix
    * toArray() // convert this into an array
    * toList(ArrayLikeClass) // convert this into an instance of ArrayLikeClass, by simply assinging the values of this matrix to the array-like class
    * toGrid(ArrayLikeClass) // convert this into a 2D instance of ArrayLikeClass, by simply assinging the values of this matrix to tje array-like class
  */
});

// TODO: actually add this in (i.e. implement Matrix.Dynamic);
// TODO: cry over the fact that I can't fold the JSDoc comment below;
// TODO: contemplate whether `TODO`s should be in the header;
/**
  * @class
  * Uses normal arrays instead of float64 arrays
 **/
Matrix.Dynamic = classify(
  function Dynamic_Matrix(length, width){
    this.length = length || 1;
    this.width  = width  || 1;
    let i,j;
    this.m = new Array(this.length);
    for(i = 0; i < this.length; i++){
      this.m[i] = new Array(this.width);
      for(j = 0; j < this.width; j++) this.m[i][j] = [0];
    }
  },
  {
    get_at: function get_at(i_row, i_col){
    return this.m?.[i_row]?.[i_col]?.[0];
    }
  }
);

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
 */
Matrix.eq0 = function(x){
  if(typeof x === "number")
    return (Math.abs(x) < Matrix.epsilon);
  // this is how smart people do recursion
  if(x instanceof Matrix) for(let i = 0; i < x.m.length; i++) if(!Matrix.eq0(x.m[i]))
    return false;
  return true;
};



// use 2 random n by k matrices to generate a random n by n singular matrix
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

