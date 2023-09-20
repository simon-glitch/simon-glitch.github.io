
const generate_t = function(i){
  let busy = false;
  execute_t = function execute_t(){
    if(busy) return;
    frame_count ++;
    // console.log(`did ${frame_count} frames!`);
    busy = true;
    
    ct1 = new Date();
    
    for(i = 0; i < my_n_rounded; i++){
      f(i);
    }
    
    let my_n_rounded_prev = my_n_rounded;
    
    // accumulate my_n_total
    my_n_total += my_n_rounded;
    // increase the size of my_n exponentially, in order speed up the for loop
    //   (by making it do more steps in a row, at a time)
    my_n *= my_n_exponent;
    // we want to round my_n, so my_n_total is accumulated with maximum precision
    my_n_rounded = Math.floor(my_n);
    
    // this whole thing falls apart if
    if(my_n >= Number.MAX_SAFE_INTEGER){
      resolve_f("my_n got too big, somehow");
      // let's clear the interval
      clearInterval(tid);
      // this actually prevents the function from running again, because busy still == true
      return;
    }
    ct2 = new Date();
    cdt = (ct2.getTime() -ct1.getTime());
    adt += cdt;
    
    // record values
    if(do_record){
      let eps = my_n_total / (adt / 1000);
      recorded.adt.push(adt);
      recorded.cdt.push(cdt);
      recorded.eps.push(eps);
      recorded.my_n_rounded.push(my_n_rounded_prev);
      
      pc = 100 * (adt / tg);
      console.log(to_engineering(pc, {length: (pc >= 100 ?3 :2)}) + " %");
    }
    
    // make sure the frames don't get too slow
    if(cdt >= 2 * mspf){
      my_n_exponent = 1;
    }
    
    if(adt >= tg){
      finish_t(resolve_f);
    }
    
    
    busy = false;
  };
};

