/*
  All code here was typed and authored solely by Simon Willover
  
  I'm not gonna lie, I'm kind of surprised that past Simon was able to do this project so well! He really did crush this thing.

*/


let points_from_in_a_row = [
    0, /* 0 in a row */
    0, /* 1 in a row */
    0, /* 2 in a row */
    1, /* 3 in a row */
    3, /* 4 in a row */
    5, /* 5 in a row */
    7, /* 6 in a row */
    10, /* 7 in a row */
    13, /* 8 in a row */
    16 /* 9 in a row */
  ];
  let points_to_win = {
    "3x3 2p": 1,
    "4x4 2p": 3,
    "4x4 3p": 2,
    "5x5 2p": 4,
    "5x5 3p": 3,
    "6x6 2p": 5,
    "6x6 3p": 4,
    "6x6 4p": 2,
    "7x7 2p": 7,
    "7x7 3p": 5,
    "7x7 4p": 3,
    "8x8 2p": 10,
    "8x8 3p": 7,
    "8x8 4p": 5,
    "9x9 2p": 13,
    "9x9 3p": 9,
    "9x9 4p": 7,
  };
  let get_points_to_win = function(obj){
    return points_to_win[obj.gs +"x"+ obj.gs +" "+ obj.pc +"p"];
  };
  let weigh_row = function(row){
    let total = 0;
    let rep = 0;
    for(let i = 0; i < row.length; i++){
      if(row[i]){
        rep++;
      }
      if(!row[i] || i === row.length -1){
        total += points_from_in_a_row[rep];
        rep = 0;
      }
    }
    return total;
  };
  let get_score_from_converted = function(grid, symbol){
    
    if(symbol === -1) return 0;
    const L = grid.length;
    let s = c.player.symbols;
    let is_p = [], ix, iy;
    for(iy = 0; iy < L; iy++){
      is_p[iy] = [];
      for(ix = 0; ix < L; ix++){
        is_p[iy][ix] = (grid[iy][ix] === symbol) ?1 :0;
      }
    }
    
    let points = 0;
    let vert = [], hori = [], diag1 = [], diag2 = [];
    
    let min_row = 3;
    
    // bottom-left to top-right
    let iiy = 0, iix = 0;
    for(iy = min_row - 1, iiy = 0; iy < 2*L - min_row; iy++){
      diag1[iiy] = [];
      for(ix = Math.max(0, 1 + iy - L), iix = 0; ix < Math.min(iy + 1, L); ix++){
        diag1[iiy][iix] = is_p[iy - ix][ix];
        iix ++;
      }
      iiy ++;
    }
    // top-left to bottom-right
    for(iy = min_row - L, iiy = 0; iy < L + 1 - min_row; iy++){
      diag2[iiy] = [];
      for(ix = Math.max(0, - iy), iix = 0; ix < Math.min(L - iy, L); ix++){
        diag2[iiy][iix] = is_p[iy + ix][ix];
        iix ++;
      }
      iiy ++;
    }
    
    // vertical
    for(iy = 0; iy < L; iy++){
      vert[iy] = [];
      for(ix = 0; ix < L; ix++){
        // just flip the indices
        vert[iy][ix] = is_p[ix][iy];
      }
    }
    // horizontal
    hori = is_p;
    
    for(let j = 0, arr = [vert, hori, diag1, diag2]; j < arr.length; j++){
      for(let i = 0; i < arr[j].length; i++){
        points += weigh_row(arr[j][i]);
      }
    }
    return points;
  };
  let get_score = function(grid, symbol){
    
    if(symbol === "none") return 0;
    const L = grid.length;
    let is_p = [], ix, iy;
    for(iy = 0; iy < L; iy++){
      is_p[iy] = [];
      for(ix = 0; ix < L; ix++){
        is_p[iy][ix] = (grid[iy][ix].symbol === symbol) ?1 :0;
      }
    }
    
    let points = 0;
    let vert = [], hori = [], diag1 = [], diag2 = [];
    
    let min_row = 3;
    
    // bottom-left to top-right
    let iiy = 0, iix = 0;
    for(iy = min_row - 1, iiy = 0; iy < 2*L - min_row; iy++){
      diag1[iiy] = [];
      for(ix = Math.max(0, 1 + iy - L), iix = 0; ix < Math.min(iy + 1, L); ix++){
        diag1[iiy][iix] = is_p[iy - ix][ix];
        iix ++;
      }
      iiy ++;
    }
    // top-left to bottom-right
    for(iy = min_row - L, iiy = 0; iy < L + 1 - min_row; iy++){
      diag2[iiy] = [];
      for(ix = Math.max(0, - iy), iix = 0; ix < Math.min(L - iy, L); ix++){
        diag2[iiy][iix] = is_p[iy + ix][ix];
        iix ++;
      }
      iiy ++;
    }
    
    // vertical
    for(iy = 0; iy < L; iy++){
      vert[iy] = [];
      for(ix = 0; ix < L; ix++){
        // just flip the indices
        vert[iy][ix] = is_p[ix][iy];
      }
    }
    // horizontal
    hori = is_p;
    
    for(let j = 0, arr = [vert, hori, diag1, diag2]; j < arr.length; j++){
      for(let i = 0; i < arr[j].length; i++){
        points += weigh_row(arr[j][i]);
      }
    }
    return points;
  };
  
  let c;
  c = {
    objects: [],
    background_squares_count: 40,
    el: document.querySelector("canvas.game"),
    grid_size: 3,
    player_count: 2,
    new_grid_size: 3,
    new_player_count: 2,
    grid: [],
    symbol_grid: [],
    symbols: {
      none: function(){
        return({symbol: "none", draw: function(){}});
      },
      x: function(){
        return({
          x: 0,
          y: 0,
          l: 0,
          draw: function(ctx){
            let l = this.l;
            let x = this.x;
            let y = this.y;
            
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 0.15*l;
            if(this.anim < 0.5) l*=this.anim*2;
            ctx.moveTo(x - l/2,y - l/2);
            ctx.lineTo(x + l/2,y + l/2);
            if(this.anim < 0.5) l/=this.anim*2;
            if(this.anim >= 0.5){
              l *= this.anim*2 - 1;
              ctx.moveTo(x - l/2,y + l/2);
              ctx.lineTo(x + l/2,y - l/2);
            }
            ctx.stroke();
          },
        });
      },
      o: function(){
        return({
          x: 0,
          y: 0,
          l: 0,
          draw: function(ctx){
            let r = this.l /2;
            let x = this.x;
            let y = this.y;
            
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0,20,200)";
            ctx.lineWidth = 0.27*r;
            ctx.moveTo(x + r,y);
            ctx.arc(x,y,r,0,this.anim*2*Math.PI);
            ctx.stroke();
          },
        });
      },
      triangle: function(){
        return({
          x: 0,
          y: 0,
          l: 0,
          draw: function(ctx){
            let l = this.l;
            let x = this.x;
            let y = this.y;
            
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0,160,20)";
            ctx.lineWidth = 0.15*l;
            let p = [
              [x,y - l/2],
              [x - l/2, y + l*(Math.sqrt(3) -1)/2],
              [x + l/2, y + l*(Math.sqrt(3) -1)/2],
            ];
            let l1 = Math.min(1, this.anim*3);
            let l2 = Math.min(1, this.anim*3 -1);
            let l3 = Math.min(1, this.anim*3 -2);
            ctx.moveTo(p[0][0], p[0][1]);
            ctx.lineTo((1-l1) *p[0][0] + l1 *p[1][0], (1-l1) *p[0][1] + l1 *p[1][1]);
            if(this.anim >= 1/3)
              ctx.lineTo((1-l2) *p[1][0] + l2 *p[2][0], (1-l2) *p[1][1] + l2 *p[2][1]);
            if(this.anim >= 2/3)
              ctx.lineTo((1-l3) *p[2][0] + l3 *p[0][0], (1-l3) *p[2][1] + l3 *p[0][1]);
            // finish the last corner when animation is done
            if(this.anim === 1){
              ctx.lineTo(p[1][0], p[1][1]);
            }
            ctx.stroke();
          },
        });
      },
      square: function(){
        return({
          x: 0,
          y: 0,
          l: 0,
          draw: function(ctx){
            let l = this.l;
            let x = this.x;
            let y = this.y;
            
            ctx.strokeStyle = "#f08a00";
            ctx.lineWidth = 0.15*l;
            if(this.anim === 1){
              ctx.strokeRect(x - l/2, y - l/2, l, l);
              return;
            }
            ctx.beginPath();
            ctx.moveTo(x - l/2, y - l/2);
            ctx.lineTo(x - l/2, y - l*(1/2 - Math.min(1, this.anim*4)));
            if(this.anim > 1/4)
              ctx.lineTo(x - l*(1/2 - Math.min(1, this.anim*4 - 1)), y + l/2);
            if(this.anim > 2/4)
              ctx.lineTo(x + l/2, y + l*(1/2 - Math.min(1, this.anim*4 - 2)));
            if(this.anim > 3/4)
              ctx.lineTo(x + l*(1/2 - Math.min(1, this.anim*4 - 3)), y - l/2);
            ctx.stroke();
          },
        });
      },
    },
    player: {
      possible_symbols: ["x", "o", "triangle", "square"],
      symbols: ["x", "o"],
      ai_players: [0, 0, 0, 0],
      points: [0, 0, 0, 0],
      current_symbol: 0,
      state: "ready to play",
    },
    w: 0, h: 0,
    top_x: 0, top_y: 0,
    whole_grid_wh: 0,
    box_size: 0,
    busy_positioning: false,
    total_time: 0,
    update: function(dt){
      c.total_time += dt;
      if((c.w !== innerWidth) || (c.h !== innerHeight)){
        c.w = innerWidth;
        c.h = innerHeight;
        c.el.width = c.w;
        c.el.height = c.h;
      }
      ctx.clearRect(0, 0, c.w, c.h);
  
      c.update_symbols();
  
      let background_square_speed = 1, symbol_animation_speed = 0.85, background_squares_drawn = 0, grid_tiles_drawn = 0;
      for(let i = 0, obj; i < c.objects.length; i++){
        obj = c.objects[i];
  
        if(obj.type === "background_square"){
          // delete excess background squares
          if(background_squares_drawn >= c.background_squares_count){
            c.objects.splice(i, 1);
            i--;
  
            continue;
          }
          obj.x += background_square_speed * obj.vel.x * dt /1000;
          obj.y += background_square_speed * obj.vel.y * dt /1000;
          ctx.fillStyle = obj.color;
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          if(obj.x > c.w || obj.x + obj.width < 0 || obj.y > c.h || obj.y + obj.height < 0){
            c.objects[i] = random_square();
          }
          background_squares_drawn ++;
        }
        if(obj.type === "box"){
          ctx.lineWidth = 0.05*c.box_size;
          ctx.strokeStyle = obj.border_color;
          ctx.fillStyle = obj.background;
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
          grid_tiles_drawn ++;
        }
        if(obj.type === "symbol"){
          obj.anim = Math.min(1, obj.anim + dt * symbol_animation_speed/1000);
          obj.draw(ctx);
        }
      }
  
      let object_order = ["background_square", "box", "symbol"];
      c.objects.sort((obj1, obj2) => object_order.indexOf(obj1.type) - object_order.indexOf(obj2.type));
  
      // add new background squares if we don't have enough
      for(let i = background_squares_drawn; i < c.background_squares_count; i++){
        c.objects.push(random_square());
      }
      if(grid_tiles_drawn < c.grid_size **2){
        c.prep_grid();
      }
      else c.position_grid();
  
      ctx.fillStyle = "black";
      ctx.font = "16px arial";
      ctx.fillText(frame.avg_fps.toFixed(1) +"fps", 0, c.h);
  
      c.update_scores();
      
      if(c.player.state === "waiting for ai"){
        let obj = ai_play(c.player.symbols[c.player.current_symbol]);
        c.play(obj.ix, obj.iy);
      }
    },
    position_grid: function(override_grid){
      this.busy_positioning = true;
      if(override_grid){
        for(let i = 0, obj; i < this.objects.length; i++){
          obj = this.objects[i];
          if((obj.type === "box") || (obj.type === "symbol")){
            this.objects.splice(i, 1);
            i-=2;
          }
          
        }
        
  
        this.grid = [];
        this.symbol_grid = [];
      }
      this.whole_grid_wh = 0.75*Math.min(this.w, this.h);
      this.box_size = this.whole_grid_wh / this.grid_size;
      this.top_x = (this.w - this.whole_grid_wh)/2;
      this.top_y = (this.h - this.whole_grid_wh)/2;
      let whole_grid_wh = this.whole_grid_wh;
      let box_size = this.box_size;
      let top_x = this.top_x;
      let top_y = this.top_y;
      
      let obj, symbol, iy, ix;
      for(iy = 0; iy < this.grid_size; iy++){
        if(override_grid){
          this.grid[iy] = [];
          this.symbol_grid[iy] = [];
        }
        for(ix = 0; ix < this.grid_size; ix++){
          obj = {
            type:  "box",
            border_color: "#111",
            border_width: 3,
            background: "#dcb",
            symbol: "none",
            x: top_x + ix*box_size,
            y: top_y + iy*box_size,
            width: box_size,
            height: box_size,
          }
          if(override_grid){
            this.grid[iy][ix] = obj;
            symbol = this.symbols.none(obj);
            this.symbol_grid[iy][ix] = symbol;
            this.objects.push(obj);
            this.objects.push(symbol);
          }
          else{
            let nobj = this.grid[iy][ix];
            symbol = this.symbol_grid[iy][ix];
            nobj.x = obj.x;
            nobj.y = obj.y;
            nobj.width = obj.width;
            nobj.height = obj.height;
            symbol.x = (ix + 1/2) * this.box_size + this.top_x;
            symbol.y = (iy + 1/2) * this.box_size + this.top_y;
            symbol.l = this.box_size * 0.6, this.box_size * 0.6;
            symbol.type = "symbol";
          }
        }
      }
      this.busy_positioning = false;
    },
    prep_grid: function(){
      this.grid_size = this.new_grid_size;
      this.player_count = this.new_player_count;
      this.points_to_win = get_points_to_win({gs: this.grid_size, pc: this.player_count});
      
      // reset the current board; i.e. start a new game
      this.player.current_symbol = 0;
      this.player.symbols = this.player.possible_symbols.slice(0, this.player_count);
      this.player.state = "ready to play";
      // first, let's clear out the previous grid objects
      let iy, ix, ii, obj;
      this.position_grid(true);
      
    },
    play: function(ix,iy){
      if(ix === -1 || iy === -1) return;
      let obj = this.grid[iy][ix];
      
      if(obj.symbol === "none"){
        obj.symbol = this.player.symbols[this.player.current_symbol];
        this.player.current_symbol = (this.player.current_symbol + 1) % this.player_count;
      }
      
      c.update_scores();
    },
    click: function(x,y){
      // don't play if we are not ready for some reason
      if(this.player.state !== "ready to play") return;
      
      // don't accept clicks that are outside the grid
      if(x < this.top_x || x > this.top_x + this.whole_grid_wh || y < this.top_y || y > this.top_y + this.whole_grid_wh) return;
      
      let ix = Math.floor((x - this.top_x) / this.box_size);
      let iy = Math.floor((y - this.top_y) / this.box_size);
      this.play(ix, iy);
    },
    hover: function(x,y){},
    update_symbols: function(){
      if(this.busy_positioning) return;
      let ix, iy, ii, obj, symbol;
      for(iy = 0; iy < this.grid.length; iy++){
        for(ix = 0; ix < this.grid[iy].length; ix++){
          obj = this.grid[iy][ix];
          symbol = this.symbol_grid[iy][ix];
          if(symbol.symbol !== obj.symbol){
            ii = this.objects.indexOf(symbol);
            symbol = this.symbols[obj.symbol](obj);
            symbol.symbol = obj.symbol;
            symbol.type = "symbol";
            symbol.anim = 0;
            this.symbol_grid[iy][ix] = symbol;
            this.objects.splice(ii, 1, symbol);
          }
        }
      }
    },
    update_scores: function(){
      for(let i = 0; i < this.player_count; i++){
        this.player.points[i] = get_score(this.grid, this.player.symbols[i]);
        if(this.player.points[i] >= this.points_to_win){
          this.player.current_symbol = i;
          this.player.state = "victory";
        }
      }
      if(this.player.state !== "victory"){
        let tied = true;
        let iy, ix;
        LOOP: for(iy = 0; iy < this.grid.length; iy++){
          for(ix = 0; ix < this.grid[iy].length; ix++){
            if(this.grid[iy][ix].symbol === "none"){
              tied = false;
              break LOOP;
            }
          }
        }
        if(tied) this.player.state = "tied";
      }
      if(this.player.state !== "victory" && this.player.state !== "tied"){
        this.player.state = this.player.ai_players[this.player.current_symbol] ?"waiting for ai" :"ready to play"; 
      }
    },
  };
  
  let ctx = c.el.getContext("2d");
  let ct = 0;
  let random_square = function(){
    let theta = Math.random() *2 *Math.PI;
    let speed = 20 + Math.random() *10;
    let w = 15 + Math.random() *25;
    let h = w;
    return({
      color: "rgba(100 100 150 /0.4)",
      type: "background_square",
      x: Math.random()*c.w/2 + c.w/4 - w/2,
      y: Math.random()*c.h/2 + c.h/4 - h/2,
      vel: {
        x: speed * Math.cos(theta),
        y: speed * Math.sin(theta),
      },
      width: w,
      height: h,
    });
  };
  
  
  let frame;
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
    activate: function(){
      this.current_frame = new Date();
      if(!this.active){
        this.interval_id = setInterval(this.on_f.bind(this), this.mspf);
        this.active = true;
      }
    },
    deactivate: function(){
      if(this.active){
        clearInterval(this.interval_id);
        this.inerval_id = -1;
        this.active = false;
      }
    },
  };
  frame.on_fs.push(c.update.bind(c));
  frame.on_fs.push(c.update_scores.bind(c));
  
  c.el.onpointerdown = function(e){
    c.click(e.pageX, e.pageY);
  };
  c.el.onpointermove = function(e){
    // c.hover(e.pageX, e.pageY);
  };
  
  
  
  let button_functions = {
    "pause-play": function(){
      let paused = !frame.active;
      if(paused){
        frame.activate();
        document.querySelector(".pause").classList.remove("hidden");
        document.querySelector(".play").classList.add("hidden");
      }
      if(!paused){
        frame.deactivate();
        document.querySelector(".pause").classList.add("hidden");
        document.querySelector(".play").classList.remove("hidden");
      }
    },
    "reset": function(){
      let f, i;
      f = function(){
        c.prep_grid();
        i = frame.on_fs.indexOf(f);
        if(i > -1) frame.on_fs.splice(i, 1);
      };
      frame.on_fs.push(f);
    },
    "close-how-to-play": function(){
      if(!this.my_clicked){
        this.my_clicked = true;
        document.querySelector(".how-to-play-outside").classList.add("shrinking");
        frame.activate();
      }
    },
  };
  
  let buttons = document.querySelectorAll("button");
  for(let i = 0, ii; i < buttons.length; i++){
    ii = undefined;
    LOOKUP: for(let iii in button_functions){
      if(buttons[i].classList.contains(iii)){
        ii = iii;
        break LOOKUP;
      }
    }
    // some of our buttons aren't in the list
    if(typeof ii === "string"){
      buttons[i].onpointerdown = button_functions[ii].bind(buttons[i]);
    }
    buttons[i].onkeydown = ((i) => function(e){
      if(e.key===" " || e.key==="Spacebar" || e.key==="Enter"){
        buttons[i].onpointerdown();
      }
    })(i);
  }
  
  let setup_menu_opener = function(menu_name){
    let opener = document.querySelector(".open-"+ menu_name);
    let menu = document.querySelector("."+ menu_name);
    opener.onpointerdown = function(){ 
      let menu_opened = Boolean(opener.menu_opened);
      if(menu_opened){
        menu.classList.add("hidden");
      }
      if(!menu_opened){
        menu.classList.remove("hidden");
        menu.style.top = (opener.offsetTop + opener.offsetHeight) +"px";
        menu.style.height = "initial";
        let h1 = menu.offsetHeight;
        menu.style.height = "50vh";
        let h2 = menu.offsetHeight;
        menu.style.height = Math.min(h1, h2) +"px";
      }
      opener.menu_opened = !menu_opened;
    };
  };
  setup_menu_opener("settings");
  setup_menu_opener("guide");
  
  // update text in the guide
  if(true){
    let old_gs = c.grid_size;
    let old_pc = c.player_count;
    let new_gs, new_pc;
    let setup_guide_yet = false;
    let in_a_row_points = document.querySelector(".in-a-row-points");
    let span_points_to_win = document.querySelector(".points-to-win");
    let player_count = document.querySelector(".span-for-player-count");
    let n_by_n = document.querySelector(".span-n-by-n");
    let p, q, str;
    let f = function(){
      new_gs = c.new_grid_size;
      new_pc = c.new_player_count;
      if(!setup_guide_yet || old_gs !== new_gs || old_pc !== new_pc){
        setup_guide_yet = true;
        old_gs = new_gs;
        old_pc = new_pc;
        player_count.innerHTML = old_pc;
        n_by_n.innerHTML = old_gs +"×"+ old_gs;
        span_points_to_win.innerHTML = get_points_to_win({gs: old_gs, pc: old_pc});
        
        str = "";
        for(p = 3; p <= old_gs; p++){
          q = points_from_in_a_row[p];
          str += `<li><span>${p}</span> in a row gives <span>${q}</span> points</li>`;
        }
        in_a_row_points.innerHTML = str;
        let guide = document.querySelector(".guide");
        let open_guide = document.querySelector(".open-guide");
        if((" "+ guide.className).match(/ hidden/) === null){
          open_guide.onpointerdown();
          open_guide.onpointerdown();
        }
      }
    };
    frame.on_fs.push(f);
    
  }
  
  // use inputs from the settings
  // this function returns a function that can be used in the frame.on_fs list
  let config_inputs = function(config){
    /*
    config = {
      receiver | recipient: Object, // which object recives our input changes
      inputs: [
        repeatable {
          name: String // name of this input inside the reciever
          q: String // CSS selector for this input
          converter: Function // function to convert the input into an appropriate value; the keyword "this" refers to the HTML input object
        } ...
      ],
    }
    */
    let rec = config.receiver || config.reciever || config.recipient || config.recip || config.rec;
    let inputs = config.inputs || config.input || config.ins || config.in;
    let arr = [];
    
    let err_conditions = [typeof rec !== "object", rec === null || !Array.isArray(arr)];
    let err_messages = ["Type Error: receiver needs to be an object", "Type Error: receiver cannot be null", "Type Error: inputs needs to be an array"];
    let err = false;
    for(let i = 0; i < err_conditions.length; i++){
      if(err_conditions[i]) console.log(err_messages[i]);
      err = err_conditions[i] || err;
    }
    if(err) return;
    
    let update_value = function(input, receiver){
      let v1 = Number(input.el.value);
      // this .bind(input.el) is VERY IMPORTANT
      let v2 = input.convert.bind(input.el)();
      if(v1 !== v2){
        if(!input.busy_correcting){
          input.busy_correcting = true;
          input.el.classList.add("invalid");
          setTimeout(function(){
            input.el.value = v2;
            input.el.classList.remove("invalid");
            input.busy_correcting = false;
          }, 1000);
        }
      }
      receiver[input.name] = v2;
    };
    
    for(let i = 0, input, obj; i < inputs.length; i++){
      // skip non-objects; this allows us to easily scan through arrays with empty spaces or null objects
      if(typeof inputs[i] !== "object" || inputs[i] === null) continue;
      
      input = document.querySelector(inputs[i].q);
      if(input !== null){
        obj = {
          name: inputs[i].name,
          el: input,
          convert: inputs[i].convert,
          get_value: inputs[i].get_value,
          busy_correcting: false,
        };
        arr.push(obj);
        update_value(obj, rec);
      }
      else{
        console.log(`Name Error: The input named "${inputs[i].name}", with selector "${inputs[i].q}", doesn't seem to exist!`);
      }
    }
    return function(){
      for(let i = 0; i < arr.length; i++){
        update_value(arr[i], rec);
      }
    };
  }
  
  let range_convert = function(number, min, max, step){
    return (step === 0) ?(Math.max(Math.min(number, max), min)) :(Math.max(Math.min(Math.round((number - min) / step) * step + min, max), min));
  };
  let input_range_convert = function(input){
    let min = Number(input.getAttribute("min"));
    min = (min === 0) ?min :(min|| -Infinity);
    let max = Number(input.getAttribute("max"));
    max = (max === 0) ?max :(max|| Infinity);
    let step = Number(input.getAttribute("step")) || 0;
    return range_convert(Number(input.value), min, max, step);
  }
  
  let my_config = {
    receiver: c,
    inputs: [
      {q: ".grid-size > input", name: "new_grid_size"},
      {q: ".search-depth > input", name: "search_depth"},
      {q: ".search-breadth > input", name: "search_breadth"},
      {q: ".player-count > input", name: "new_player_count"},
      {q: ".background-squares-count > input", name: "background_squares_count"},
    ],
  };
  for(let i = 0, obj, conv = function(){return input_range_convert(this);}; i < my_config.inputs.length; i++){
    obj = my_config.inputs[i];
    if(obj.convert === undefined){
      obj.convert = conv;
    }
  }
  
  let input_corrector = config_inputs(my_config);
  frame.on_fs.push(input_corrector);
  
  // update text and images in the game state menu
  if(true){
    let whose_turn = document.querySelector(".whose-turn > canvas");
    let text = document.querySelector(".whose-turn > .text");
    let ctx = whose_turn.getContext("2d");
    let l, s;
    let f = function(){
      l = c.box_size;
      whose_turn.width = l;
      whose_turn.height = l;
      s = c.symbols[c.player.symbols[c.player.current_symbol]]();
      s.x = l/2
      s.y = l/2
      s.l = 0.75*l;
      s.anim = 1;
      s.draw(ctx);
      text.innerHTML = c.player.state === "victory" ?(" won 🏆") :(c.player.state === "tied" ?("played last (tie ⚔)") :("'s turn"+ (c.player.state === "waiting for ai" ?" (waiting for AI)" :"") +", <b>"+ c.player.points[c.player.current_symbol] +"</b> points"));
    };
    frame.on_fs.push(f);
  }
  
  let ai_play, ai_play_rec;
  let start_depth = 0;
  // let random_leaves = 0;
  // let recurse_tries = 0;
  
  /*
    grid is a 2D array
      of the indices for symbols that have been played
      -1 is the "index" for an empty square
      0 or larger is the index of the player who plays with that symbol
    symbol is a number, the index of the player
      that ai_play_rec will recommend a move for
    
    depth is the number of times to recurse ai_play_rec IN THE FUTURE
      i.e. how many moves ahead to search
    
  */
  ai_play_rec = function(grid, symbol, depth){
    if(start_depth === 0){
      // random_leaves = 0;
      // recurse_tries = 0;
      start_depth = depth;
    }
    // grid is a 2D array of numbers. The numbers represent player's symbol indices
    // -1 in the grid means no one has played there (and thus the AI can)
    // symbol is also a number, for the index of the player we are playing for
    // depth is just   
    let pc = c.player_count;
    
    let out = {
      ix: -1,
      iy: -1,
      scores: [],
    }
    // // default the scores to - inf
    // for(let i = 0; i < pc; i++){
    //   out.scores[i] = -Infinity;
    // }
    
    let get_all_scores = function(new_grid){
      let arr = [], total = 0;
      for(let i = 0; i < pc; i++){
        arr[i] = get_score_from_converted(new_grid, i);
        if(arr[i] === null) console.log("missing an array for some reason; at "+ pix +","+ piy +" and i = "+ i);
        total += arr[i];
      }
      
      // did someone win?
      let ptw = get_points_to_win({gs: grid.length, pc: pc});
      for(let i = 0; i < pc; i++){
        if(arr[i] >= ptw){
          arr[i] = Infinity;
        }
      }
      
      // subtract out other players' scores; we don't want them to win!
      for(let i = 0; i < pc; i++){
        if(arr[i] === Infinity) continue;
        arr[i] -= (total - arr[i]) / (pc - 1);
      }
      return arr;
    }
    let convert_wins_to_infinity = function(scores){
      let arr = scores.slice();
      return arr;
    };
    
    let max_considerations = c.search_breadth;
    let ix, iy, L = grid.length, new_grid = [], new_scores, tied = true, P_try;
    for(iy = 0; iy < L; iy++){
      new_grid[iy] = [];
      for(ix = 0; ix < L; ix++){
        new_grid[iy][ix] = grid[iy][ix];
      }
    }
    LOOP: for(iy = 0; iy < L; iy++){
      for(ix = 0; ix < L; ix++){
        if(grid[iy][ix] > -1) continue;
        tied = false;
        
        P_try = max_considerations / L**(2 * (start_depth - depth));
        if(Math.random() > P_try){
          random_leaves ++;
          continue;
        }
        recurse_tries ++;
        
        new_grid[iy][ix] = symbol;
        new_scores = get_all_scores(new_grid);
        if(new_scores[symbol] === Infinity){
          out.ix = ix;
          out.iy = iy;
          out.scores = new_scores;
          for(let i = 0; i < pc; i++){
            if(out.scores[i] === null){
              out.scores[i] = -Infinity;
            }
          }
          break LOOP;
        }
        let s_string = c.player.symbols[symbol];
        
        
        if(depth > 1){
          pix = ix;
          piy = iy;
          new_scores = ai_play_rec(new_grid, (symbol + 1) % pc, depth - 1).scores;
        }
        
        if(new_scores[symbol] > out.scores[symbol]){
          out.ix = ix;
          out.iy = iy;
          out.scores = new_scores;
        }
        
        new_grid[iy][ix] = -1;
      }
    }
    
    if(depth === start_depth){
      start_depth = 0;
      console.log(`random leaves: ${random_leaves}\nrecurse tries: ${recurse_tries}`);
    }
    
    if(tied){
      for(let i = 0; i < pc; i++){
        out.scores[i] = 0;
      }
      return out;
    }
    
    if(out.ix === -1 || out.iy === -1){
      for(let i = 0; i < pc; i++){
        out.scores[i] = 0;
      }
    }
    
    while(out.ix === -1 || out.iy === -1){
      out.ix = Math.floor(Math.random()*L);
      out.iy = Math.floor(Math.random()*L);
      if(grid[out.iy][out.ix] > -1){
        out.ix = -1; out.iy = -1;
      }
    }
    
    return out;
    
  };
  ai_play = function(ur_symbol){
    let ur_grid = c.grid;
    let ur_depth = c.search_depth;
    let symbol = c.player.symbols.indexOf(ur_symbol);
    let grid = [];
    let ix,iy,L = ur_grid.length;
    for(iy = 0; iy < L; iy++){
      grid[iy] = [];
      for(ix = 0; ix < L; ix++){
        grid[iy][ix] = c.player.symbols.indexOf(ur_grid[iy][ix].symbol);
      }
    }
    
    return ai_play_rec(grid, symbol, c.player_count * c.search_depth);
  };
  
  
  