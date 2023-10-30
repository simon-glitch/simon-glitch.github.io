


const browser_fake_scale_x = 1.2432570697771157;
const browser_fake_scale_y = 1.2432570697771157;
const browser_fake_x_offset = 0;
const browser_fake_y_offset = 20;
const precision = 2;


setInterval(function(){
  let re = document.querySelector("#root > div > div:nth-child(4) > div.css-12ibl39.e19owgy77 > div > div.desktop-only > div.css-1k4dpwl.e6yfngs0 > div > div > div:nth-child(4)").getBoundingClientRect();
  re = "autopock:" + (((re.left + re.width / 2) / browser_fake_scale_x) + browser_fake_x_offset).toFixed(precision) + "," + (((re.top + re.height / 2) / browser_fake_scale_y) + browser_fake_y_offset).toFixed(precision);
  try{
    navigator.clipboard.writeText(re).catch((e) => {0;});
  }
  catch(e){
    0;
    /* document is not focused? no big deal! */
  }
}, 15);


