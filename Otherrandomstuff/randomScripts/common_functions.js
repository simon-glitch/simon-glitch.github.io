/*
  eName is the name of the event to listen for
  fName is the name of your function
  el is an HTML element
  ael(eName, fName, f, el);
*/
var ael, remove_listener, keysdown, keystates, key_events;
setup_ael: {
  let audience = {};
  ael = function(eName, fName, f, el){
    let g = f.bind(el);
    audience[fName] = {
      eName: eName,
      f: g,
      el: el,
    };
    el.addEventListener(eName, g);
  };
  remove_listener = function(fName, el){
    if(audience[fName]){
      el.removeEventListener(audience[fName].eName, audience[fName].f);
      delete audience[fName];
    }
  };
  remove_event = function(eName, el){
    for(let i in audience){
      if(audience[i].el === el){
        if(audience[i].eName === eName){
          el.removeEventListener(audience[i].eName, audience[i].f);
        }
      }
    }
  };
  remove_all_events = function(el){
    for(let i in audience){
      if(audience[i].el === el){
        el.removeEventListener(audience[i].eName, audience[i].f);
      }
    }
  };
}
setup_keyboard: {
  let logs_hidden = false;
  let logbox = document.querySelector("#logs-container");
  keysdown = function(){};
  keystates = {};
  /*
  Useful for faking click events
  new MouseEvent("click", {clientX: 30, clientY: 40})
  fake events (in general) have e.isTrusted = false
  real events have e.isTrusted = true
  e.isTrusted is of course a read only property
  */
  key_events = {
    l: function(e){
      if(logs_hidden) logbox.style.display = "block";
      if(!logs_hidden) logbox.style.display = "none";
      logs_hidden = !logs_hidden;
    }
  };
}

var frame;
frame = {
  ready: true,
  mspf: 32,
  start_time: new Date(),
  current_frame: new Date(),
  last_frame: new Date(),
  completed_fs: 0,
  attempted_fs: 0,
  avg_fps: 0,
  on_fs: [],
  on_f: function(){
    if(this.ready){
      this.ready = false;
      
      this.last_frame = this.current_frame;
      this.current_frame = new Date();
      let dt = this.current_frame.getTime() - this.last_frame.getTime();
      this.avg_fps = 1000 * this.completed_fs / (this.current_frame.getTime() - this.start_time.getTime());
      for(let i = 0; i < this.on_fs.length; i++){
        if(typeof this.on_fs[i] === "function"){
          this.on_fs[i](dt);
        }
      }
      
      this.completed_fs ++;
      this.ready = true;
    }
    this.attempted_fs ++;
  },
  active: false,
  inveral_id: -1,
  on: function(){
    this.current_frame = new Date();
    if(!this.active){
      this.interval_id = setInterval(this.on_f.bind(this), this.mspf);
      this.active = true;
    }
  },
  off: function(){
    if(this.active){
      clearInterval(this.interval_id);
      this.inerval_id = -1;
      this.active = false;
    }
  },
};


