const generate_t = function(me){
  me.busy = false;
  execute_t = function execute_t(){
    if(me.busy) return;
    me.frame_count ++;
    // console.log(`did ${me.frame_count} frames!`);
    me.busy = true;
    
    me.ct1 = new Date();
    
    for(me.i = 0; me.i < me.n_rounded; me.i++){
      f(me.i);
    }
    
    me.n_rounded_prev = me.n_rounded;
    
    // accumulate me.n_total
    me.n_total += me.n_rounded;
    // increase the size of me.n exponentially, in order speed up the for loop
    //   (by making it do more steps in a row, at a time)
    me.n *= me.n_exponent;
    // we want to round me.n, so me.n_total is accumulated with maximum precision
    me.n_rounded = Math.floor(me.n);
    
    // this whole thing falls apart if
    if(me.n >= Number.MAX_SAFE_INTEGER){
      resolve_f("me.n got too big, somehow");
      // let's clear the interval
      clearInterval(me.tid);
      // this actually prevents the function from running again, because me.busy still == true
      return;
    }
    me.ct2 = new Date();
    me.cdt = (me.ct2.getTime() -me.ct1.getTime());
    me.adt += me.cdt;
    
    // record values
    if(do_record){
      let eps = me.n_total / (me.adt / 1000);
      recorded.me.adt.push(me.adt);
      recorded.me.cdt.push(me.cdt);
      recorded.eps.push(eps);
      recorded.me.n_rounded.push(me.n_rounded_prev);
      
      pc = 100 * (me.adt / me.tg);
      console.log(to_engineering(pc, {length: (pc >= 100 ?3 :2)}) + " %");
    }
    
    // make sure the frames don't get too slow
    if(me.cdt >= 2 * me.mspf){
      me.n_exponent = 1;
    }
    
    if(me.adt >= me.tg){
      finish_t(resolve_f);
    }
    
    
    me.busy = false;
  };
};
