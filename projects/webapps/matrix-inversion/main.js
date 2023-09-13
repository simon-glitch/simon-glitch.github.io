
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
invert.has_zero_row = function has_zero_row(m){};
invert.has_zero_col = function has_zero_col(m){};

invert.det  = function find_det(m){
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
    mm = invert.minor(m, 0, j);
    dets[i] = m[0][i] * (-1)**i * mm.det;
    m.branches += mm.branches;
  }
  // sort the values, that way small values actually impact the sum
  dets.sort((v1,v2) => (v1-v2));
  
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
    )).join("\n  ");
  str = "[" + str + "\n]"
  str += ",\n  det = " + m.det.toFixed(3);
  str += ",\n  branches = " + m.branches;
};

const p = invert.print;

console.log(invert.det([[1,2],[3,4]]))


