
let r1_f = function(r1, r2){
  let z = r1*r1*r1 + r2*r2 + 407;
  z = z ^ 505;
  z = z % 555_555_555;
  // z = (z === NaN) ?701 :z;
  return z;
};
let r2_f = function(r1, r2){
  let z = ((r1+r2+r1*r2) %99 + r1 % 3) ** 2 - 75 * r2 >> 2;
  z = Math.abs(z) % 10**9;
  r1 %= 2**20;
  // if(z % 10_001 == 0)
  //   outs[r1] = z;
  return z;
};

let r1 = 507, r2, q1, q2;


const test_thread = (async function(my_times){
  let multiplier = my_times.multiplier;
  let batch_size = my_times.batch_size;
  let gofor = my_times.gofor;
  let exponent_base = my_times.exponent_base;
  // and see how long it takes to run test_f
  my_times[0] = new Date();
  let test_batch;
  test_batch = function(){
    r1 = /*Date.now*/ r1 % 1_000_000, r2 = 557, q1, q2;
    for(let i = 0; i < batch_size; i++){
      q1 = r1_f(r1,r2);
      q2 = r2_f(r1,r2);
      r1 = q1;
      r2 = q2;
    }
    my_times[1] = new Date();
    if(my_times[1].getTime() - my_times[0].getTime() < gofor){
      batch_size = Math.floor(batch_size * exponent_base);
      test_batch();
    }
  };
  test_batch();

  my_times.r1 = r1;
  my_times.r2 = r2;
  
  postMessage(my_times);
});

onmessage = function(e){
  my_times = e.data;
  test_thread(my_times);
};

