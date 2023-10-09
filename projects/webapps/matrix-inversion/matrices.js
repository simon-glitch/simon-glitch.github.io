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


// approximately 1 in 4 million
const epsilon = 2 ** (-22);

const eq0 = function(x){
  return Math.abs(x) < epsilon;
};

const rref = function(matrix){
  // console.log("starting rref");
  
  // first slice the matrix for total immutability
  const m = matrix.slice().map((v) => v.slice())
  
  const zeroes = [];
  
  // console.log("sorting by zeroes");
  // first, sort by the number of leading zeros, if any
  for(let row_n = 0, row; row_n < m.length; row_n ++){
    row = m[row_n];
    let col_n = 0, val;
    for(col_n = 0; col_n < row.length; col_n ++){
      // console.log("col_n =", col_n);

      val = row[col_n];
      if(val !== 0){
        break;
      }
    }
    zeroes[row_n] = col_n;
  }
  // VERY VERY BAD for performance:
  map = m.map((v,i) => [v, zeroes[i]]);
  map.sort((a,b) => (a[1] - b[1]));
  map.forEach((v,i) => {
    m[i] = v[0];
    zeroes[i] = v[1];
  });
  
  // console.log("sorted:", {m, zeroes});
  
  
  
  // keep track of the leading entries
  let leading_entries = [m[0][zeroes[0]]];
  
  let normalize = function(i){
    for(
      let
        row = m[i],
        leading_entry = row[zeroes[i]],
        col_n = zeroes[i]
      ;
      col_n < row.length; col_n++
    ){
      row[col_n] /= leading_entry;
    }
  };
  // console.log("normalizing first row:", {start: m[0]});
  // normalize the first row
  normalize(0);
  // console.log("normalized first row:", {end: m[0]});
  
  // console.log("reducing all other rows ...");
  
  // first, let's make a todos array, which will contain the indices of the rows, in the order what we want to reduce them
  const todos = m.map((v,i) => i);
  
  // now, bring the matrix to row echelon form
  for(let row_ni = 1, row_n, row; row_ni < m.length; row_ni ++){
    row_n = todos[row_ni];
    row = m[row_n];
    leading_entries[row_n] = row[zeroes[row_n]];
    
    // console.log("progressing pivot:", {row, row_n, leading_entries, zeroes});
    
    let col_n, sub_row_n = 0;
    // find a NEW pivot column using this row
    for(sub_row_n = 0; sub_row_n < 1 + row_ni; sub_row_n ++){
      col_n = zeroes[sub_row_n];
      
      let mult = row[col_n];
      
      /* console.log("progressing pivot sub:", {
        col_n, mult,
        zeroes: zeroes.slice(), row: row.slice(),
        sub_row: m[sub_row_n].slice()
      }); */
      
      for(let sub_n = 0; sub_n < row.length; sub_n++){
        row[sub_n] -= mult * m[sub_row_n][sub_n]; // this is line `chi`
        // we don't have to divide by m[col_n][zeroes[col_n]] because that is always equal to one
      }
      
      // handle weird 2nd row skipping
      if(sub_row_n + 1 === row_n) sub_row_n ++;
      
      // forcefully replace the mult with a zero, bc that is what it should be anyways
      // row[col_n] = 0;
    }
    // console.log("progressed to (0):", row.slice(), "zeroes:", zeroes.slice());
    
    // check for leading zeroes
    for(let col_n = zeroes[row_n]; col_n < row.length; col_n ++){
      if(eq0(row[col_n])){
        row[col_n] = 0;
        zeroes[row_n] ++;
      }
      else break;
    }
    
    // console.log("progressed to (1):", row.slice(), "zeroes:", zeroes.slice());
    
    // normalize the row, so we can assume a divisor of one on line `chi`
    normalize(row_n);
    
    // also, let's swap this row with other rows such that the number of leading zeroes increases as we go down the matrix; i.e. we want to resort the matrix be the number of leading zeroes
    let this_n = row_n;
    if(row_n < m.length - 1) while(zeroes[this_n + 1] < zeroes[this_n]){
      // swap this row with the next row if there are less leading zeroes in the next row
      let swap;
      // swap todos
      swap = todos[this_n];
      todos[this_n] = todos[this_n + 1];
      todos[this_n + 1] = swap;
      
      // swap rows
      swap = m[this_n];
      m[this_n] = m[this_n + 1];
      m[this_n + 1] = swap;
      
      // swap zeroes
      swap = zeroes[this_n];
      zeroes[this_n] = zeroes[this_n + 1];
      zeroes[this_n + 1] = swap;
      
      // move downwards and keep checking the rows
      this_n ++;
    }
    // this cheeky little else is not even necessary
    else while(zeroes[this_n - 1] > zeroes[this_n]){
      // swap this row with the previous row if there are more leading zeroes in the previous row
      let swap;
      // swap todos
      swap = todos[this_n];
      todos[this_n] = todos[this_n - 1];
      todos[this_n - 1] = swap;
      
      // swap rows
      swap = m[this_n];
      m[this_n] = m[this_n - 1];
      m[this_n - 1] = swap;
      
      // swap zeroes
      swap = zeroes[this_n];
      zeroes[this_n] = zeroes[this_n - 1];
      zeroes[this_n - 1] = swap;
      
      // move upwards and keep checking the rows
      this_n --;
    }
  }
  
  // console.log(
  //   "matrix now:", m.slice().map((v) => v.slice()),
  //   "zeroes now:", zeroes.slice()
  // );
  
  // now reduce the REF, by removing all non-bottom values in pivot columns
  for(let col_n = 0, zero_row_n = 0; col_n < m[0].length; col_n ++){
    let zeroes_here = zeroes[zero_row_n];
    
    // not enough zeroes? use the next row!
    while(zeroes_here < col_n){
      zero_row_n ++;
      zeroes_here = zeroes[zero_row_n];
    }
    // too many zeroes? continue to the next column!
    if(zeroes_here > col_n) continue;
    
    // handle rows of all zeroes by just stopping the reduction process
    if(zero_row_n >= m.length) break;
    if(zeroes_here >= m[0].length) break;
    
    for(let row_n = 0, row, leading_entry; row_n < zero_row_n; row_n ++){
      row = m[row_n];
      let mult = row[col_n];
      // console.log("0 reducing", {row.slice(), row_n, leading_entry, zero_row_n});
      for(let sub_col_n = col_n; sub_col_n < row.length; sub_col_n ++){
        // console.log("0 reducing sub", {sub_col_n});
        row[sub_col_n] -= m[zero_row_n][sub_col_n] * mult;
      }
    }
  }
  
  return m;
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
      return Math.floor(Math.random() * ((max - min) / sep)) * sep + min;
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
    min_y = ((min_y ?? 0          ) + this.length) % this.length;
    max_y = ((max_y ?? this.length) + this.length) % this.length;
    min_x = ((min_x ?? 0          ) + this.width ) % this.width ;
    max_x = ((max_x ?? this.width ) + this.width ) % this.width ;
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
      res[i] += that[i];
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



// use 2 random n by k matrices to generate a random n by n singular matrix
Matrix.singular = function(n, k){
  k ??= n +1;
  const m1 = randmo(n, k);
  const m2 = randmo(k, n);
  return matrix_mult(m1, m2);
};

const print = function(m){
  return m.map(v => v.map(v => v.toFixed(2)));
};


console.clear();
onclick = function(){
  const me = Matrix.random(3,3);
  console.log(me);
};



