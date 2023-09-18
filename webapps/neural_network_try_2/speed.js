
let outs = [];


// test_f has 12 operations total
const multiplier = ((11) + (17)) + 8 + 4;

// this is how many times we will actually run test_f on each thread
let batch_size = 2**16;

// how many threads seems optimal
const threads = 20;

// how long we want each thread to run (in ms)
const gofor = 2000;

// value to grow the batch_size by if thread finishes in under ${gofor} ms
const exponent_base = 1.5;

var times = [];
var fid, busy_testing;

let r1, r2, q1, q2;
let first_time = true;

let print_n = function(n){
  let size = Math.floor(Math.log10(n));
  let is_big = size >= 9;
  let is_small = size < 9;
  let str = "";
  if(is_big){
    n /= 10 ** size;
    str += n.toFixed(5);
    str += "e+" + size;
  }
  if(is_small){
    str += BigInt(n);
    for(let i = str.length -3; i >= 1; i -= 3){
      str = str.slice(0, i) + "_" + str.slice(i);
    }
  }
  return str;
};

let f_done = function(){
  
  let total_time = 0;
  let min_time = 50_000_000 * 60 * 60 * 24 * 1000;
  // this is the actual maximum time that JavaScript Date object currently supports
  // it is extremely far into the future!
  let max_time = 0;
  let t0, t1;
  f_done_i: for(let i = 0; i < threads -1; i++){
    t0 = times[i][0].getTime();
    t1 = times[i][1].getTime();
    total_time += t1 - t0;
    min_time = Math.min(min_time, t0);
    max_time = Math.max(max_time, t1);
  }
  let true_time = max_time - min_time;
  // convert from ms to seconds
  total_time /= 1000;
  true_time /= 1000;

  let operations = multiplier * batch_size * threads;
  let speed = operations / total_time;
  let true_speed = operations / true_time;

  let ri = Math.floor(Math.random() * threads);
  r1 = times[ri].r1;
  r2 = times[ri].r2;

  let effective_threads = total_time / true_time;

  total_time = Math.floor(total_time);
  operations = Math.floor(operations);
  speed      = Math.floor(speed     );
  true_speed = Math.floor(true_speed);

  console.log(`ri: ${ri}, r1: ${r1}, r2: ${r2}`);
  console.log(`took ${total_time.toFixed(3)} seconds to perform ${print_n(operations)} operations.\n  Which equates to ${print_n(speed)} ops/second!`);
  console.log("(this is the effective single core / thread speed)");
  console.log(`true time: ${true_time.toFixed(3)} seconds,\n  true speed: ${print_n(true_speed)} ops/second`);
  console.log(`thus, you are effectively using ${effective_threads.toFixed(2)} threads!`);
  if(first_time){
    console.log("  NOTE: this thread count is just based on JavaScript's ability to become more efficient when there are more Web Workers. JavaScript is a really messy language and this number could just be the result of smart optimizations.");
    console.log("  2nd NOTE: JavaScript is slow. So, you're computer should be about 10x that speed");
    console.log(`    that is ${(true_speed * 10 / 1_000_000).toFixed(0)} Mhz`);
  }
  first_time = false;
  return total_time;
};
let f = function(){
  let done = true;
  for(let i = 0; i < threads; i++){
    if(times[i][1] === undefined){
      done = false;
      break;
    }
  }
  if(done){
    f_done();
    busy_testing = false;
    clearInterval(fid);
  }
  return done;
};



onclick = function(){
  // spam prevention
  if(busy_testing) return;
  busy_testing = true;

  // launch Web Workers for multi-threading
  for(let i = 0; i < threads; i++){
    times[i] = [];
    times[i][0] = new Date();
    times[i].i = i;
    times[i].r1 = 1;
    times[i].r2 = 1;
    times[i].multiplier = multiplier;
    times[i].batch_size = batch_size;
    times[i].gofor = gofor;
    times[i].exponent_base = exponent_base;
    times[i].shlice = function(){
      let clone = [];
      for(let i in this){
        if(typeof this[i] !== "function"){
          clone[i] = this[i];
        }
      }
      return clone;
    };
    // launch all of them asynchonously
    let myWorker = new Worker("speed-fs.js");
    myWorker.postMessage(times[i].shlice());

    myWorker.onmessage = function(e){
      let my_times = e.data;
      times[my_times.i] = my_times;
      // console.log("completed", i);
    };
    
  }

  // state start time
  let now = new Date();
  console.log(`started running, at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  console.log(`  ${threads} threads,\n  ${multiplier} operations / function call,\n  going for ${gofor} ms / batch / thread`);

  // start waiting for Web Workers to finish
  fid = setInterval(f, 50);

};

