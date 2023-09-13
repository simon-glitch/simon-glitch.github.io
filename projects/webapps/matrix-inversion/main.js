
const invert = {};
const i = invert;
invert.rref = function invert_via_rref(){
  
};

invert.is_lower_triangle = function is_lower_triangle(m){
  for(let i = 0, l; i < m.length; i++){
    l = Math.min(m[0].length, i);
    for(let j = 0; j < i; j++){
      // any one non-zero value can disqualify the matrix
      if(m[i][j] !== 0){
        return false
      }
    }
  }
  return true;
};
invert.is_upper_triangle = function is_upper_triangle(m){
  for(let i = 0, l; i < m[0].length; i++){
    l = Math.min(m.length, i);
    for(let j = 0; j < l; j++){
      // any one non-zero value can disqualify the matrix
      if(m[j][i] !== 0){
        return false
      }
    }
  }
  return true;
};
invert.has_zero_row = function has_zero_row(m){
  outer_row: for(let i = 0; i < m.length; i++){
    for(let j = 0; j < m[i].length; j++){
      // this condition causes us to continue the outer loop. this means that the code below this inner for loop will get skipped, because continue skips all code in a for loop (which comes after the continue statement).
      if(m[i][j] !== 0){
        continue outer_row;
      }
    }
    // due the continue statement above, the inner loop can only finish and get to this line of code if the row is full of zeroes.
    return true;
  }
  return false;
};
invert.has_zero_col = function has_zero_col(m){
  outer_col: for(let i = 0; i < m[0].length; i++){
    for(let j = 0; j < m.length; j++){
      // this condition causes us to continue the outer loop. this means that the code below this inner for loop will get skipped, because continue skips all code in a for loop (which comes after the continue statement).
      if(m[j][i] !== 0){
        continue outer_col;
      }
    }
    // due the continue statement above, the inner loop can only finish and get to this line of code if the column is full of zeroes.
    return true;
  }
  return false;
};

invert.det  = function find_det(m){
  if(m.length !== m[0].length){
    m.det = "Cannot find the determinant of a non-square matrix. ";
    m.det += m.length + " by " + m[0].length + " is not square!";
    return m;
  }
  
  let det = 0;
  
  m.branches = 1;
  // 2x2 edge case
  if(m.length == 2 && m[0].length == 2){
    // m = [[a,b], [c,d]]
    // det(m) = ad-bc
    det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
    m.det = det;
    return m;
  }
  
  // a matrix with a row or column of zeroes has det(m) == 0
  if(i.has_zero_row(m) || i.has_zero_col(m)){
    det = 0;
    m.det = det;
    return m;  
  }
  
  // do the product of the diagonals for a triangle matrix
  let diagonal_product = function(){
    let p = 0;
    for(let i = 0; i < m.length; i++){
      p *= m[i][i];
    }
    return p;
  };
  if(i.is_upper_triangle(m)){
    det = diagonal_product();
    m.det = det;
    return m;
  }
  if(i.is_lower_triangle(m)){
    det = diagonal_product();
    m.det = det;
    return m;
  }
  
  
  /*
  det(A) = \sum _i = 1 ^n \of (
    A_i,j * cof(A)_i,j
    = A_i,j * (-1)^(i+j) * minor(A)_i,j
  ) for every row, i
  */
  
  // just take det of the first row
  let dets = [];
  for(let i = 0, mm; i < m[0].length; i++){
    mm = invert.minor(m, 0, i);
    dets[i] = m[0][i] * (-1)**i * mm.det;
    m.branches += mm.branches;
  }
  // sort the values, that way small values actually impact the sum
  dets.sort((v1,v2) => (v1 - v2));
  
  for(let i = 0; i < dets.length; i++){
    det += dets[i];
  }
  
  m.det = det;
  return m;
};
invert.minor = function invert_via_rref(m, i, j){
  let mm = m.slice();
  mm.splice(i, 1);
  for(let i = 0; i < mm.length; i++){
    mm[i] = mm[i].slice();
    mm[i].splice(j, 1);
  }
  
  return invert.det(mm);
};
invert.cof = function invert_via_rref(){
  
};
invert.print = function print_matrix(m){
  let str = m.map(
    (mi) => (
      mi.map(
        (mij) => (mij.toFixed(2))
      ).join(", ")
    )).join(";\n  ");
  str = "m = [\n  " + str + "\n]"
  str += ",\n  det = " + (typeof m.det === "number" ? m.det.toFixed(3) : m.det);
  str += ",\n  branches = " + m.branches;
  return str;
};

const p = invert.print;

console.log(p( invert.det([
  [1,2],
  [3,4],
]) ));
console.log(p( invert.det([
  [1,2],
  [0,1],
  [2,4],
]) ));
console.log(p( invert.det([
  [1, 2,5000],
  [20,1,-20 ],
  [2, 4,0   ],
]) ));
console.log(p( invert.det([
  [0, 0,0, 0],
  [3, 2,1, 0],
  [1, 4,10,5],
  [0,-3,1, 7],
]) ));
console.log(p( invert.det([
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
]) ));
console.log(p( invert.det([
  [1, 2,0, 0],
  [3, 4,1, 0],
  [3, 4,10,0],
  [0,-2,1, 7],
]) ));

let rand = function(h, w){
  let r = function(){
    return Math.floor(Math.random() * 11) - 5;
  };
  let m = [];
  for(let i = 0; i < h; i++){
    m[i] = [];
    for(let j = 0; j < w; j++){
      m[i][j] = r();
    }
  }
  return m;
};

console.log(p( invert.det(rand(5,5)) ));
console.log(p( invert.det(rand(6,6)) ));
console.log(p( invert.det(rand(7,7)) ));

/*
  branches required with this brute force method:
  2x2:                    1,
  3x3:                    4,
  4x4:                   17,
  5x5:                   86,
  6x6:                  517,
  7x7:                3_620,
  8x8:               28_961,
  9x9:              260_650,
  10x10:          2_606_501,
  11x11:         28_671_512,
  12x12:        344_058_145,
  13x13:      4_472_755_886,
  14x14:     62_618_582_405,
  15x15:    939_278_736_076,
  16x16: 15_028_459_777_217,
  
  // so, unfortunately, my computer can not calculate the determinant of a 16x16 matrix using these methods.
  // octave can though, because it uses a better algorithm
  
  n x n: ~= 11.4893 * n!
*/

