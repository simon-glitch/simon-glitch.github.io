
(function(){
  window.global_simons_sneaky_iframe_maker_url = "https://simanalix.github.io/bookmarklets/sneaky_iframe_maker.html";
  
  let el = document.createElement("div");
  document.body.appendChild(el);
  el.innerHTML = "<div class = 'wawa_wrapper'>" +
    "<div class = 'wawa_hotbar wawa_one'>" +
      "<p> <span> Iframe source: </span> <br> <input class = 'wawa_url' type = 'url' value='https://'> </p> <p> <span> Bookmarklet script: </span> <br> <input class = 'wawa_js' type = 'text'> </p>" +
      "<button class = 'wawa_load'> Load </button> <button class = 'wawa_hide'> Hide </button>" +
    "</div>" +
    "<div class = 'wawa_hotbar wawa_two'>" +
    "<p><b> Keys: </b></p> <p> <span> Hide: </span> <br> <input class = 'wawa_key wawa_hide' type = 'text' value = 'h'> </p> <p> <span> Display: </span> <br> <input class = 'wawa_key wawa_display' type = 'text' value = 'd'> </p> <p> <span> Close: </span> <br> <input class = 'wawa_key wawa_close' type = 'text' value = 'c'> </p> <p> <span> Open: </span> <br> <input class = 'wawa_key wawa_open' type = 'text' value = 'o'> </p>" +
    "</div>" +
    "<div class = 'wawa_iframe'></div>" +
  "</div>";
  el.className = "simons_sneaky_iframe_maker";
  let el_hotbars = el.querySelectorAll(".wawa_hotbar");
  let el_url = el.querySelector("input.wawa_url");
  let el_js = el.querySelector("input.wawa_js");
  let el_iframe = el.querySelector("input.wawa_iframe");
  let el_load_btn = el.querySelector("button.wawa_load");
  let el_hide_btn = el.querySelector("button.wawa_hide");
  let keys = {
    el_hide: el.querySelector("input.wawa_key.wawa_hide"),
    el_display: el.querySelector("input.wawa_key.wawa_display"),
    el_close: el.querySelector("input.wawa_key.wawa_close"),
    el_open: el.querySelector("input.wawa_key.wawa_open")
  };
  
  
  
  try{
  
  let dc = document.cookie.match(/value=([^;]+);/);
  let visit_double_array;
  try{
    visit_double_array = JSON.parse(dc[1]);
  }
  catch(e){
    visit_double_array = [[],[]];
  }
  let visit_url_array = visit_double_array[0];
  let visit_count_array = visit_double_array[1];
  
  let remember_ifame_use = function(){
    let i = visit_url_array.indexOf(el_url.value);
    if(i === -1){
      visit_url_array.push(el_url.value);
      visit_count_array.push(1);
    }
    else{
      if(i > 0){
        visit_count_array[i] === visit_count_array[i-1]
        let swp_url = visit_url_array[i];
        let swp_cnt = visit_count_array[i];
        visit_url_array[i] = visit_url_array[i-1];
        visit_count_array[i] = visit_count_array[i-1];
        visit_url_array[i-1] = swp_url;
        visit_count_array[i-1] = swp_cnt;
        i--
      }
      visit_count_array[i]++;
    }
    // alert(JSON.stringify(visit_double_array));
    let t = new Date();
    let year = t.getUTCFullYear() + 10;
    t.setUTCFullYear(year);
    document.cookie = "value="+ JSON.stringify(visit_double_array)+ "; expires="+ t.toUTCString();
  };
  
  
  
  
  
  
  let display_hotbar = function(){
    el.style.display = 'block';
    el_hotbars[0].style.display = 'flex';
    el_hotbars[1].style.display = 'flex';
  };
  let hide_hotbar = function(){
    el_hotbars[0].style.display = 'none';
    el_hotbars[1].style.display = 'none';
  };
  let display_iframe = function(){
    display_hotbar();
    if(window.global_simons_sneaky_iframe){
      window.global_simons_sneaky_iframe.style.display = 'block';
    }
    else{
      let parent = el.querySelector(".wawa_iframe");
      window.global_simons_sneaky_iframe = document.createElement("iframe");
      parent.appendChild(window.global_simons_sneaky_iframe);
      if(el_url.value[0] === "<"){
        window.global_simons_sneaky_iframe.outerHTML = el_url.value;
        window.global_simons_sneaky_iframe.classList.add("simons_sneaky_iframe_maker");
      }
      else{
        window.global_simons_sneaky_iframe.src = el_url.value;
      }
      remember_ifame_use();
    }
  };
  let close_iframe = function(){
    if(window.global_simons_sneaky_iframe){
      window.global_simons_sneaky_iframe.remove();
      window.global_simons_sneaky_iframe = null;
      display_hotbar();
    }
  };
  let open_iframe = function(){
    close_iframe();
    display_iframe();
  };
  let hide_iframe = function(){
    el.style.display = 'none';
    hide_hotbar();
  };
  
  window.global_simons_sneaky_iframe = false;
  
  el_url.onkeyup = function(){
    window.global_simons_sneaky_iframe = false;
    el_js.value = `(function(){
let s = document.createElement("script");
s.src = "https://simanalix.github.io/bookmarklets/sneaky_iframe_maker.js";
document.body.appendChild(s);
window.global_simons_sneaky_iframe_maker_url = "${el_url.value}";
    })();`;
  };
  el_load_btn.onclick = function(){
    open_iframe();
  };
  el_hide_btn.onclick = function(){
    hide_hotbar();
  };
  el_url.onkeyup = function(e){
    if(e === undefined) return;
    if(e.key === "Enter"){
      open_iframe();
    }
  }
  let ctrl_down = false;
  let alt_down = false;
  onkeydown = function(e){
    if(e.key === "Alt"){
      alt_down = true;
    }
    else if(e.key === "Control"){
      ctrl_down = true;
    }
    else if(alt_down && ctrl_down){
      if(e.key === keys.el_hide.value){
        let just_in_case = window.onkeyup;
        window.onkeyup = null;
        setTimeout(function(){
          window.onkeyup = just_in_case;
        }, 1000);
        hide_iframe();
      }
      else if(e.key === keys.el_display.value){
        
        display_iframe();
        let just_in_case = window.onkeyup;
        window.onkeyup = null;
        setTimeout(function(){
          window.onkeyup = just_in_case;
        }, 1000);
      }
      else if(e.key === keys.el_close.value){
        let just_in_case = window.onkeyup;
        window.onkeyup = null;
        setTimeout(function(){
          window.onkeyup = just_in_case;
        }, 1000);
        close_iframe();
      }
      else if(e.key === keys.el_open.value){
        let just_in_case = window.onkeyup;
        window.onkeyup = null;
        setTimeout(function(){
          window.onkeyup = just_in_case;
        }, 1000);
        open_iframe();
      }
    }
  };
  for(let i in keys){
    keys[i].onkeyup = function(e){
      this.value = e.key;
    }
  }
  let s = document.createElement("style");
  document.body.appendChild(s);
  //s.innerHTML = ":not(.this.specific.selector.will.gaurantee.that.my.styles.are.applied)";
  if(true){
    let s = document.createElement("style");
    document.body.appendChild(s);
    s.innerHTML = `#simons_sneaky_iframe_maker, #simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) *{
  margin: 0;
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere){
  width: 100%;
  height: 100%;
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  background: rgb(0,22,66);
  color: black;
  font-family: arial;
  font-size: 18px;
} 
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) .wawa_hotbar{
  display: flex;
  padding: 1em;
  height: 3.1415928em;
  overflow: auto;
}
.simons_sneaky_iframe_maker .wawa_hotbar.wawa_one{
  background: rgb(10,220,90);
}
.simons_sneaky_iframe_maker .wawa_hotbar.wawa_two{
  background: rgb(220,170,20);
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) .wawa_hotbar p{
  flex: 5;
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) .wawa_hotbar button{
  flex: 2;
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) p{
  display: relative;
  padding: 0.25em;
  border: 0.125em solid rgb(11,0,11);
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) input{
  width: 8em;
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) .wawa_two input{
  width: 4em;
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) button{
  border-radius: 0vw;
  border: 0.25em double rgb(40,40,190);
  background: rgb(255,200,200);
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) button:is(:focus,:hover){
  border-style: solid;
  background: rgb(255,180,180);
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) button:active{
  background: rgb(244,150,150);
}
.simons_sneaky_iframe_maker:not(.this.selector.is.really.specific.gauranteeing.that.our.css.always.will.work.everywhere) iframe{width: 100vw; height: 100vh;}
    `;
  }
  if(window.global_simons_sneaky_iframe_maker_url){
    el_url.value = window.global_simons_sneaky_iframe_maker_url;
    el_url.onkeyup();
    display_iframe();
  }
  oncontextmenu = function(e){
    e.preventDefault();
    el_url.value = `<iframe width="560" height="315" src="${el_url.value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    display_iframe();
  };
  } catch(e){alert(e.name +": "+ e.message);}
  
})();
