
const invert = {};
const i = invert;
invert.rref = function invert_via_rref(){
  
};

invert.is_lower_triangle = function is_lower_triangle(){};
invert.is_upper_triangle = function is_upper_triangle(){};
invert.has_zero_row = function has_zero_row(){};
invert.has_zero_col = function has_zero_col(){};

invert.det  = function find_det(m){
  // 2x2 edge case
  if(m.length == 2 && m[0].length == 2){
    // m = [[a,b], [c,d]]
    // det(m) = ad-bc
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }
  
  // a matrix with a row or column of zeroes has det(m) == 0
  if(i.has_zero_row(m) || i.has_zero_col(m)){
    return 0;
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
    return diagonal_product();
  }
  if(i.is_lower_triangle(m)){
    return diagonal_product();
  }
};
invert.minor = function invert_via_rref(){
  
};
invert.cof = function invert_via_rref(){
  
};


