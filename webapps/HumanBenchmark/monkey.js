

/* ==== ==== */

window.browser_fake_scale_x = 1.24; // 1.3 // ; // 0.7; //1.2432570697771157;
window.browser_fake_scale_y = 1.24; // 1; //1.2432570697771157;
window.browser_fake_x_offset = -15;
window.browser_fake_y_offset = 60;
window.simon_precision = 2;

window.my_i = 0;
setInterval(function(){
  let el = document.querySelector('[data-cellnumber="' + window.my_i + '"]');
  if(el === null){
    window.my_i ++;
    el = document.querySelector('[data-cellnumber="' + window.my_i + '"]');
    
    // alert("some parts of this, somehow actually DO work");
    // STILL null?
    if(el === null){
      window.my_i = 0;
    }
    else{
      let re = el;
      // let re = el.getBoundingClientRect();
      let atext = (
        "autopock:" + (
          (
            (re.offsetLeft + re.offsetWidth / 2) / window.browser_fake_scale_x
          ) +
          window.browser_fake_x_offset
        ).toFixed(window.simon_precision) +
        "," +
        (
          (
            (re.offsetTop + re.offsetHeight / 2) / window.browser_fake_scale_y
          ) +
          window.browser_fake_y_offset
        ).toFixed(window.simon_precision)
      );
      try{
        navigator.clipboard.writeText(atext).catch((e) => {0;});
      }
      catch(e){
        0;
        /* document is not focused? no big deal! */
      }
    }
  }
}, 15);


