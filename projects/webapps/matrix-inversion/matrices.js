/*
  I have decided to make a general purpose matrix library, because why not?
*/


const classify = function classify(f, proto_obj, sub_properties, ...args){
  f.prototype = proto_obj;
  f.prototype = new f(...args);
  for (i in proto_obj){
    f.prototype[i] = proto_obj[i];
  }
  for (i in sub_properties){
    f[i] = sub_properties[i];
  }
  return f;
};



const Rand = classify(
  function Rand(min, max, sep){
    // nullish coalescing assignment
    this.min = min ?? this.min;
    this.max = max ?? this.max;
    this.sep = sep || this.sep;
  },
  {
  min: -4,
    max: 4,
    sep: 1,
    num: function(){
      return Math.floor(Math.random() * ((this.max - this.min) / this.sep)) * this.sep + this.min;
    },
  }
);

/*
  A matrix has a constant width and height;
    if you want to edit or change it, use new Matrix.Dynamic()
*/
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
    const w = m1.width, l = m0.length;
    const res = new Matrix(l, w);
    for(i = 0; i < l; i++){
      for(j = 0; j < w; j++){
        v = 0;
        for(k = 0; k < w; k++){
          v += m1.get_at(i, k) * m2.get_at(k, j);
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
  },
  /**
   * REALLY multiplies this by a scalar, in place, mutating current values of this
  **/
  really_scale: function really_scale(scalar){
    this.scalar = scalar ?? this.scalar;
    for(let i = 0; i < this.m.length; i++){
      this.m[i] *= this.scalar;
    }
    return this;
  },
  to_dim_name: function to_dim_name(){
    return "[" + this.nickname + (this.nickname ? ": " :"") + this.length + " by " + this.width + " Matrix]"
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
});

// uses normal arrays instead of float64 arrays
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
onclick = function(){
  const me = Matrix.random(3,3);
  console.log(me);
};



