var interval_arr = function(minx, maxx, incx){
  minx = minx || 0;
  maxx = maxx || 0;
  incx = incx || 1;
  let arr = Array(Math.ceil((maxx - minx) / incx));
  for(let i = minx, k = 0; i < maxx; i += incx, k++) arr[k] = i;
  return arr;
};
var shuffle = function(arr){
  return arr.map(v => [v, Math.random()]).sort((a,b) => a[1] - b[1]).map(v => v[0]);
};
