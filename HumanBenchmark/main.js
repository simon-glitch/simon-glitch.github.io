

window.simon_a = false;
setInterval(function(){
    let el = document.querySelector("#root > div > div:nth-child(4) > div:is(.view-go, .view-waiting, .view-splash)");
    let my_bc = el.computedStyleMap().get("background-color") + "";
    window.simon_bc ??= my_bc;
    if(my_bc !== window.simon_bc){
        window.simon_a = !window.simon_a;
        let a = window.simon_a;
        if(a){
          window.simon_cover ??= document.createElement("div");
          let cover = window.simon_cover;
          document.body.appendChild(cover);
          cover.innerHTML = "COVER";
          cover.style.zIndex   =  "1000";
          cover.style.position = "fixed";
          cover.style.top    = "0%";
          cover.style.bottom = "0%";
          cover.style.left   = "0%";
          cover.style.right  = "0%";
        }
        if(!a){
          let cover = window.simon_cover;
          cover?.remove();
        }
    }
    window.simon_bc = my_bc;
}, 15);


/* ==== ==== */





/*
document.querySelector("#root > div > div:nth-child(4) > div.e1q0za6r0.css-1c2t4mr.e19owgy77 > div > div:nth-child(2) > div").innerText

*/

















