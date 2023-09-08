



// HELPER FUNCTIONS
const total_f = function(list){
    let total = 0;
    for(let i = 0; i < list.length; i++){
      total += list[i];
    }
    return total;
  };
  // convert [a][b] to .cross[b][a]
  const cross_array = function(list){
    list.cross = [];
    let cross = list.cross;
    let i,ii;
    let li;
    for(i = 0; i < list.length; i++){
      li = list[i];
      for(ii = 0; ii < li.length; ii++){
        if(!cross[ii])
          cross[ii] = [];
        cross[ii][i] = list[i][ii];
      }
    }
    return list;
  };
  // convert [a][b][c] to .bicross[c][b][a]
  const bicross_array = function(list){
    list.bicross = [];
    let bicross = list.bicross;
    let i,ii,iii;
    let li,lii;
    for(i = 0; i < list.length; i++){
      li = list[i];
      for(ii = 0; ii < li.length; ii++){
        lii = li[ii];
        for(iii = 0; iii < lii.length; iii++){
          if(!bicross[iii])
            bicross[iii] = [];
          if(!bicross[iii][ii])
            bicross[iii][ii] = [];
          bicross[iii][ii][i] = lii[iii];
        }
      }
    }
    return list;
  };
  // convert [a][b][c][d] to .tricross[d][b][c][a]
  const tricross_array = function(list){
    list.tricross = [];
    let tricross = list.tricross;
    let i,ii,iii,iv;
    let li,lii,liii;
    for(i = 0; i < list.length; i++){
      li = list[i];
      for(ii = 0; ii < li.length; ii++){
        lii = li[ii];
        for(iii = 0; iii < lii.length; iii++){
        liii = lii[iii];
          for(iv = 0; iv < liii.length; iv++){
            if(!tricross[iv])
              tricross[iv] = [];
            if(!tricross[iv][iii])
              tricross[iv][iii] = [];
            if(!tricross[iv][iii][ii])
              tricross[iv][iii][ii] = [];
            tricross[iv][iii][ii][i] = liii[iv];
          }
        }
      }
    }
    return list;
  };
  // yeah, you totally need this!
  const hyper3d_cross_array = function(list){
    // a,b,c to b,a,c
    cross_array(list);
    // c,b,a
    bicross_array(list);
    for(let i = 0; i < list.length; i++){
      // a,c,b
      cross_array(list[i]);
    }
    // c,a,b
    bicross_array(list.cross);
    // b,c,a
    cross_array(list.bicross);
  };
  
  // cheap cloning function
  const clone_obj = function(obj){
    let clone = {};
    for(let i in obj) clone[i] = obj[i];
    return clone;
  };
  
  
  // BRAIN SETUP
  
  const weight_scale = 1;
  const bias_scale = 1.5;
  // make biases receive corrections at a different speed than weights
  const bias_speed_mul = 0.1;
  
  
  // in_size is the number of numbers given as input
  // out_size is the number of numbers given as output
  // layers is the number of hidden layers
  // height is number of neurons per layer
  // outputs a brain
  /* a brain is an array of layers:
     | each layer is an neurons
     | | each neuron is an array of connections
     | | | each connection is an array of 2 numbers:
     | | | | weight, and bias
     So, the array has 4 layers!
     
     Except for brain[0]
     | the input layer is just a list of numbers
     | | it doesnt update itself based on other layers
     
     a weight can range between -4 and +4, and a bias between -8 and +8
  */
  let make_brain = function(options){
    let
      in_size  = options.in_size ,
      out_size = options.out_size,
      layers   = options.layers  ,
      height   = options.height
    ;
    
    let random = function(can_bias){
      let my_scale = can_bias ? bias_scale : weight_scale;
      return (Math.random() * my_scale * 2 - my_scale);
    };
    if(in_size < 0 || out_size < 0 || layers < 0 || in_size < 0){
      return new RangeError();
    }
    
    // initialize the brain
    // indexing guide:
    //   use brain[layer #n][current node (on layer #n)][conn of current node to previous layer (i.e. conn between layer #n and layer #(n-1))]
    //   1st index is n
    //   2nd index is the index of the current node in layer #n
    //   3rd index is the index of which node to connect to on layer #(n-1)
    let brain = [];
    // make sure to store the parameters in an easy to access place
    brain.in_size  = in_size ;
    brain.out_size = out_size;
    brain.layers   = layers  ;
    brain.height   = height  ;
    brain.is_sentient = "~maybe~";
    brain.node_count = in_size + out_size + layers * height;
    brain.acting_node_count = out_size + layers * height;
    
    // one for the input layer, and one for the output layer
    layers += 2;
    
    // first the input layer
    brain[0] = [];
    for(let i = 0; i < in_size; i++){
      brain[0][i] = random(true);
    }
    
    let inc, onc;
    
    // I love how simple this code is
    // first, let's increment layers, to include the output layer, since it is pretty similar to the rest of the brain (although a bit different)
    
    for(let i = 1; i < layers; i++){
      // the inc and onc are to account for differences in the input and output layers
      inc = (i > 1) ?height :in_size;
      onc = (i < layers -1) ?height :out_size;
      brain[i] = [];
      for(let ii = 0; ii < onc; ii++){
        brain[i][ii] = [];
        for(let iii = 0; iii < inc; iii++){
          brain[i][ii][iii] = [random(), random(true)];
        }
      }
      
    }
    
    SCOPE_CROSSING: {
      let i;
      for(i = 0; i < brain.length; i++){
        // make sure to add in cross array
        // this allows us to index by [conn to previous][current node]
        //   instead of [current node][conn to previous]
        cross_array(brain[i]);
      }
      // vv use [curr node index][layer index][conn to previous]
      cross_array(brain);
      // there are 4 more ways to cross, but those would be really weird and hard to find
    }
    
    // Simon, don't forget the return statement!
    return brain;
  };
  
  
  // normalize the list to sum to 1
  const normalize = function(list){
    let out = [];
    let total = total_f(list);
    total -= 1;
    
    for(let i = 0; i < list.length; i++){
      out[i] = list[i] - total / list.length;
    }
    
    return out;
  };
  // this normalizes a 3d array in place!
  const normalize3d = function(tratrix, multiplier){
    if(typeof multiplier !== "number") multiplier = 1;
    
    let total = total_f(tratrix.map(u => total_f(u.map(v => total_f(v)))));
    multiplier /= total;
    
    if(total === 0) return;
    
    for(let i = 0; i < tratrix.length; i++){
      for(let j = 0; j < tratrix.length[i]; j++){
        for(let k = 0; k < tratrix.length[i][j]; k++){
          tratrix[i][j][k] *= multiplier;
        }
      }
    }
  };
  
  // activatror thing
  const relu = function(x){
    return x < 0 ?(x * 0.2) :(x);
  };
  // gotta keep your brain on a drug free diet XD
  const diet = function(x, is_bias){
    let z = is_bias ?bias_scale :weight_scale;
    if(!x || !isFinite(x)) return ((Math.random() * 2) -1) * z;
    let sign = Math.sign(x);
    x /= sign;
    // slight shrinking behavior (factor of 7/8)
    if(x > z) x = 0.875 * x;
    // cool bounce back behavior
    if(x > z) x = (2*z - x);
    // just in case it is EXTREMELY large
    x = Math.min(z, x);
    // put that sign back on
    x *= sign;
    return x;
  };
  const apply_diet = function(brain){
    let ohno = 0, ohno0, ohno1;
    let i,ii,iii, c;
    for(i = 1; i < brain.length; i++){
      for(ii = 0; ii < brain[i].length; ii++){
        for(iii = 0; iii < brain[i][ii].length; iii++){
          c = brain[i][ii][iii];
          
          // deal with those pesky NaN.s and Infinity.s
          ohno0 = (!isFinite(c[0]));
          ohno1 = (!isFinite(c[1]));
          ohno += ohno0 + ohno1;
          if(ohno0) c[0] = (Math.random() *2 -1) * weight_scale;
          if(ohno1) c[1] = (Math.random() *2 -1) * bias_scale;
          
          c[0] = diet(c[0], false);
          c[1] = diet(c[1], true );
        }
      }
    }
    if(ohno > 0){
      console.log("oh no!", ohno);
    }
    return brain;
  };
  
  let setup = function(brain, input){
    if(brain[0].length !== input.length){
      console.log(new RangeError(), "input is not the correct length!");
      return;
    }
    
    for(let i = 0; i < input.length; i++){
      brain[0][i] = input[i];
    }
    return brain;
  };
  let clone = function(brain){
    let clonef;
    clonef = function(brain){
      // make sure it is a valid array; we dont want to land in an infinite loop now!
      if(!brain.length && brain.length > 0) return brain;
      
      let child = [];
      for(let i = 0; i < brain.length; i++){
        // use recursion on inner arrays
        if(typeof brain[i] === "object"){
          child[i] = clonef(brain[i]);
        }
        // dont use recursion on non arrays
        else{
          child[i] = brain[i];
        }
      }
    };
    
    // clone array elements
    let child = clonef(brain);
    // clone other properties
    child.in_size  = brain.in_size ;
    child.out_size = brain.out_size;
    child.layers   = brain.layers  ;
    child.height   = brain.height  ;
    child.is_sentient       = brain.is_sentient      ;
    child.node_count        = brain.node_count       ;
    child.acting_node_count = brain.acting_node_count;
    return child;
  };
  
  let print = function(brain){
    
    // for printing numbers
    let p = function(x){
      return ((Math.sign(x) > -1 ?" " :"") + x.toFixed(2));
    };
    
    // just build a string, one step at a time
    let str = "";
    str += "Brain (";
    str += "in_size: "+ brain.in_size +", ";
    str += "out_size: "+ brain.out_size +", ";
    str += "layers: "+ brain.layers +", ";
    str += "height: "+ brain.height +")";
    str += "{";
    
    // input layer first
    str += "\n  INPUT [";
    for(let i = 0; i < brain[0].length; i++){
      str += p(brain[0][i]) +", "
    }
    // remove the last comma
    if(brain[0].length) str = str.slice(0, -2);
    str += "]";
    
    // weights and biases
    let w,b;
    let width;
    str += "\n  Hidden Layers: [";
    for(let i = 1; i < brain.length -1; i++){
      
      str += "\n    Layer "+i+": [";
      width = (i > 1) ?brain.height :brain.in_size;
      for(let ii = 0; ii < brain.height; ii++){
        str += "\n      ";
        str += "| ";
        for(let iii = 0; iii < width; iii++){
          w = p(brain[i][ii][iii][0]);
          b = p(brain[i][ii][iii][1]);
          str += "(";
          str += "w."+ w;
          str += ", ";
          str += "b."+ b;
          str += ")";
          str += ", ";
        }
        if(brain.height) str = str.slice(0, -2);
        str += " |";
      }
      str += "\n    ]";
    }
    str += "\n  ]";
    
    // output layer
    str += "\n  Output: {";
    let out_layer = brain[brain.length -1];
    for(let ii = 0; ii < brain.height; ii++){
      str += "\n    ";
      str += "| ";
      for(let iii = 0; iii < out_layer.length; iii++){
        w = p(out_layer[iii][ii][0]);
        b = p(out_layer[iii][ii][1]);
        str += "(";
        str += "w."+ w;
        str += ", ";
        str += "b."+ b;
        str += ")";
        str += ", ";
      }
      str = str.slice(0, -2);
      str += " |";
    }
    str += "\n  }";
    
    str += "\n}";
    
    return str;
  };
  
  let run = function(brain, randomness, do_logs){
    let curr, prev, curr_acti, prev_acti;
    let curr_node;
    let conn, weight, bias;
    let curr_node_acti;
    curr = brain[0];
    // prev = brain[0];
    curr_acti = normalize(curr);
    if(do_logs) console.log("initial acti", curr_acti);
    for(let i = 1; i < brain.length; i++){
      prev = curr;
      // store the prev layer's acti
      prev_acti = curr_acti;
      // and make a new acti
      curr_acti = [];
      
      curr = brain[i];
      // calculate every acti value for every node in the curr layer
      for(let ii = 0; ii < curr.length; ii++){
        curr_node = curr[ii];
        
        // calculate curr_node_acti
        curr_node_acti = 0;
        for(let iii = 0; iii < curr_node.length; iii++){
          conn = curr_node[iii];
          weight = conn[0];
          bias = conn[1];
          curr_node_acti += prev_acti[iii] * weight + bias;
          // console.log({curr_node, conn, weight, bias, curr_node_acti});
        }
        
        // normalize the node
        curr_node_acti /= prev.length;
        // add in some variety ~ randomness
        curr_node_acti += (Math.random() - 0.5) * randomness
        // AND we need a RELU, of course!
        curr_node_acti = relu(curr_node_acti);
        
        // now actually store that final activation value
        curr_acti[ii] = curr_node_acti;
      }
      
      // now normalize the layer
      // don't normalize the final layer (for this brain at least)
      if(i < brain.length -1) curr_acti = normalize(curr_acti);
      
      // why not? I would love to see some logs!
      if(do_logs) console.log("layer", i, "acivation:", curr_acti);
    }
    
    
    return curr_acti;
  };
  
  // global var
  var debugging = false;
  var children_to_spawn = 10;
  
  let train = function(options){
    let 
      brain           = options.brain      ,
      steps           = options.steps      ,
      speed           = options.speed      ,
      randomness      = options.randomness ,
      get_data_f      = options.get_data_f ,
      score_out_f     = options.score_out_f,
      score_correct_f = options.score_correct_f,
      dologs          =(options.dologs && debugging)
    ;
    
    // spam handling
    brain.training = true;
    
    // get_data_f will give us training data on each step
    // score_out_f will score the model's output on each step
    let data, output, score, correction;
    let corrections, layer_corrections, node_corrections;
    let height;
    let score_explain = false;
    
    let sum_in = function(sum_to, sum_from){
      for(let i = 0; i < sum_from.length; i++){
        sum_to[i] += sum_from[i];
      }
    };
    
    
    let subtrain = function(){
      data = get_data_f();
      setup(brain, data);
      apply_diet(brain);
      output = run(brain, randomness);
      // the score is how hard we will punish the brain
      score = score_out_f(data, output, score_explain);
      // this might become obscure in the future~
      score *= speed;
      
      corrections = [];
      
      
      // current_layer
      let cl; 
      // previous_layer
      let pl;
      // current_inter_layer
      let cil;
      // previous_inter_layer
      let pil;
      
      // correction_for_current_layer
      let cfcl;
      // correction_for_previous_layer
      let cfpl;
      // height_of_current_layer
      let hocl;
      // height_of_previous_layer
      let hopl;
      
      // arbitrarily say that i am right aligned
      // i.e. corrections[i][ii][iii] is a single correction for the weight and bias of brain[i+1][ii][iii]
      cl = brain[brain.length -1];
      
      let i,ii,iii;
      
      // score array apparently
      let score_array = [];
      for(let j = 0; j < cl.length; j++){
        score_array[j] = [];
        for(let jj = 0; jj < cl[j].length; jj++){
          score_array[j][jj] = score / cl.length / cl[j].length;
        }
      }
      
      cfcl = score_correct_f(score_array, cl);
      corrections[brain.length -2] = cfcl;
      
      for(i = brain.length -2; i > 0; i--){
        
        // var management, i guess?
        pl = cl;
        cl = brain[i];
        cfpl = cfcl;
        cfcl = [];
        
        cfcl = score_correct_f(cfpl, cl);
        // drop the corrections down, i guess?
        corrections[i -1] = cfcl;
      }
      /*
      corrections is a matrix = previous corrections matrix * previous (WEIGHTS + BIAS) / 2 matrix
      */
      
      // now, let's actually USE the corrections that we calculated
      normalize3d(corrections, speed * weight_scale * brain.acting_node_count * (Math.random() +1));
      window.last_corrections = corrections;
      
      return corrections;
    };
    // remember: correction.length is 1 less than brain.length
    const correct = function(brain, corrections){
        let r;
        for(let i = 0; i < corrections.length; i++){
          for(let ii = 0; ii < corrections[i].length; ii++){
            for(let iii = 0; iii < corrections[i][ii].length; iii++){
              r = Math.random();
              // the weight and bias are compliment's of eachother
              // r is where the compliments lean; r = 0 means we only punish the weight; r = 1 means we only punish the bias.
              brain[i + 1][ii][iii][0] +=
                r * corrections[i][ii][iii];
              brain[i + 1][ii][iii][1] +=
                (1-r) *
                (bias_speed_mul) *
                (bias_scale / weight_scale) *
                corrections[i][ii][iii];
            }
          }
        }
      };
    
    let t1 = new Date, t2;
    let avg_score = 0;
    let child, child_score;
    for(let i = 0; i < steps; i++){
      // if(i === steps - 1) score_explain = true;
      corrections = subtrain();
      child_loop: for(let i = 0; i < children_to_spawn; i++){
        child = clone(brain);
        correct(child, corrections);
        data = get_data_f();
        setup(brain, data);
        apply_diet(brain);
        output = run(brain, randomness);
        // the score is how hard we will punish the brain
        child_score = score_out_f(data, output, score_explain);
        // this might become obscure in the future~
        child_score *= speed;
        
        // if child is better than current brain, then have child replace current brain
        if(child_score < score){
          brain = child;
          break child_loop;
        }
      }
  
      avg_score += score;
    }
    avg_score /= steps;
    // because we are dividing by speed up above
    avg_score /= speed;
    t2 = new Date;
    
    if(dologs){
      console.clear();
      console.log("{"+ brain.layers + "x" + brain.height + " network}");
      console.log("avg score", avg_score);
      console.log("took", ((t2.getTime() - t1.getTime()) / 1000).toFixed(3), "seconds");
      console.log("to do", steps, "steps");
      console.log("that is", (steps / ((t2.getTime() - t1.getTime()) / 1000)).toFixed(2), "steps/second");
    }
    
    // dont forget: a healthy diet can solve problems right away!
    apply_diet(brain);
    
    brain.training = false;
    
    return avg_score;
  };
  
  
  // Hi, my name is computotron. I am probably not sentient.
  
  let my_in_size  = 2;
  let my_out_size = 1;
  let my_layers   = 7;
  let my_height   = 7;
  let my_options  = {
    in_size : my_in_size,
    out_size: my_out_size,
    layers  : my_layers,
    height  : my_height,
  };
  
  // used to be me = make_brain(my_options);
  let me;
  let us = [];
  for(let i = 1, k = 0; i < my_layers; i++){
    for(let j = 1; j < my_height; j++, k++){
      my_options.layers = i;
      my_options.height = j;
      us[k] = make_brain(my_options);
    }
  }
  
  let sum_data, sum_score, sum_correct;
  // today, i will train this network to sum 2 numbers together
  SCOPE_SUM: {
    // data generator
    // generates a pair of random numbers
    // we expect the network to output their sum
    sum_data = function(in_size){
      return [Math.random(), Math.random()];
    };
    
    // sum scorer
    // this measures how accurately the network scored the sum
    sum_score = function(input, output, do_explain){
      // we expect out = (in[0] + in[1]) % 1
      let expect = ((input[0] + input[1]) % 1);
      // note to self: output is an array too!
      let diff = expect - output[0];
      let score = Math.abs(diff);
      // im squaring the result just to make big errors less forgivable
      // if(score > 1) score *= score;
      
      if(do_explain || score === NaN){
        setTimeout(function(){
          alert("oh_no!");
          console.log("exp", expect);
          console.log("out", output[0]);
          console.log("score", score);
        }, 1000);
      }
      
      return score;
    };
    
    // input a node, output a correction list
    // each element corresponds to how much correction needs to be applied to the previous nodes
    // correction_matrix is the correction values used on the connections between previous_layer and the layer ABOVE that
    // we are outputting a new correction_matrix (new_matrix) for the corrections of the connections between the current_layer and the previous_layer.
    sum_correct = function(correction_matrix, previous_layer){
      let new_matrix = [];
      let node;
      let Ni = correction_matrix.length;
      let Nj = previous_layer[0].length;
      let Nk = previous_layer.length;
      
      // matrix multiplication. YAY yippee
      let i, j, k;
      for(i = 0; i < Ni; i++){
        new_matrix[i] = [];
        for(j = 0; j < Nj; j++){
          new_matrix[i][j] = 0;
          for(k = 0; k < Nk; k++){
            new_matrix[i][j] += correction_matrix[i][k] * (
              previous_layer[k][j][0] + previous_layer[k][j][1]
            ) / 2;
          }
          // normalize a little bit
          new_matrix[i][j] /= Ni * Nj;
        }
      }
      
      return new_matrix;
    };
  }
  
  
  
  /* == start of DISPLAY == */
  
  const c = document.querySelector("canvas");
  const ctx = c.getContext("2d");
  
  // drawing constants that scale with the window
  let dw, dh, pw, ph;
  // make canvas scale with window
  onresize = function(){
    c.width  = innerWidth ;
    c.height = innerHeight;
    dw = c.width  * 3/4;
    dh = c.height * 3/4;
    pw = c.width  / 8;
    ph = c.height / 8;
  };
  onresize();
  
  // drawing constants
  let node_radius = 10;
  let line_width = 5;
  const PI = Math.PI;
  const TAU = PI * 2;
  
  let rgb = function(r,g,b){
    // round
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    // clamp
    r = Math.min(Math.max(r, 0), 255);
    g = Math.min(Math.max(g, 0), 255);
    b = Math.min(Math.max(b, 0), 255);
    // stringify
    return "rgb("+r+","+g+","+b+")";
  };
  let grey = function(t){
    t *= 255;
    return rgb(t,t,t);
  };
  let grey_b = function(t, is_bias){
    let z = is_bias ?bias_scale :weight_scale;
    return grey((t / z + 1) / 2);
  };
  let color_b = function(t, is_bias){
    let z = is_bias ?bias_scale :weight_scale;
    t /= z;
    t *= 255;
    if(t < 0){
      t *= -1;
      // slight orange
      return rgb(t, t/8, 0);
    }
    else{
      // slight teal
      return rgb(0, t*7/8, t/8);
    }
  };
  
  let busy_drawing = false;
  const draw = function(brain){
    // prevent over drawing
    if(busy_drawing) return;
    busy_drawing = true;
    
    // setup ctx
    ctx.lineWidth = line_width;
    ctx.strokeStyle = "black";
    
    // clear the canvas
    ctx.clearRect(0,0, c.width,c.height);
    
    // loop variables
    let length = brain.length;
    let pheight, height, cx, cy, px, py;
    
    // connection lines
    for(let i = 1; i < length; i++){
      height = brain[i].length;
      for(let ii = 0; ii < height; ii++){
        cx = pw + dw * i / (length -1);
        cy = ph + dh * ii / (height -1);
        if(height == 1){
          cy = ph + dh /2;
        }
        pheight = brain[i][ii].length;
        for(let iii = 0; iii < pheight; iii++){
          px = pw + dw * (i-1) / (length -1);
          py = ph + dh * iii / (pheight -1);
          
          // weight determines thickness
          ctx.lineWidth = ((line_width * (brain[i][ii][iii][0]) / weight_scale) +1) /2;
          // bias determines color
          ctx.strokeStyle = color_b(brain[i][ii][iii][1], true);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }
    }
    
    // node points
    for(let i = 0; i < length; i++){
      height = brain[i].length;
      for(let ii = 0; ii < height; ii++){
        cx = pw + dw * i / (length -1);
        cy = ph + dh * ii / (height -1);
        if(height == 1){
          cy = ph + dh /2;
        }
        // arc(x, y, radius, startAngle, endAngle)
        ctx.beginPath();
        ctx.arc(cx, cy, node_radius, 0, TAU);
        ctx.fillStyle = "green";
        ctx.fill();
      }
    }
    
    busy_drawing = false;
  };
  
  
  /* == end of DISPLAY == */
  
  
  let me_drawn = false;
  
  onclick = function(e){
    console.clear();
    console.log(print(me));
  };
  onmousemove = function(){
    if(me_drawn){
      draw(me);
    }
  }
  
  let randomness = 0.075;
  let train_steps = 10_000,
      train_speed = 0.01;
  let train_settings = {
    brain: me,
    steps: train_steps,
    speed: train_speed,
    randomness: randomness,
    get_data_f: sum_data,
    score_out_f: sum_score,
    score_correct_f: sum_correct
  };
  
  let su_layers = 3;
  let su_height = 3;
  const su = function(l,h){
    su_layers = l;
    su_height = h;
    return ({su_layers, su_height});
  };
  const find_me = function(){
    me = us[(su_layers * (my_layers -1) + su_height) -my_height];
    return me;
  };
  find_me();
  
  let busy_training = false;
  
  onkeyup = function(e){
    find_me();
    
    // reset
    if(e.key === " "){
      onclick(e);
      console.log("RESET");
    }
    // run
    if(e.key === "r"){
      console.log("Output:\n  "+ run(me, randomness, true));
    }
    // train
    if(e.key === "t" && (!busy_training)){
      busy_training = true;
      let avg_scores = [];
      window.last_avg_scores = avg_scores;
      let fid;
      let f_done = function(avg_scores){
        let str = "SCORES:";
        f_done_i: for(let i = 0, k = 0; i < my_layers -1; i++){
          str += "\n  ";
          for(let j = 0; j < my_height -1; j++, k++){
            if(k >= avg_scores.length) break f_done_i;
            str += " ";
            if(avg_scores[k] < 0) str += " ";
            str += avg_scores[k].toFixed(4);
          }
        }
        console.log(str);
        return str;
      };
      let f = function(){
        let done = true;
        for(let i = 0; i < us.length; i++){
          if(avg_scores[i] === undefined){
            done = false;
            break;
          }
        }
        if(done){
          f_done(avg_scores);
          busy_training = false;
          clearInterval(fid);
        }
        return done;
      };
      for(let i = 0; i < us.length; i++){
        let ts = clone_obj(train_settings);
        ts.brain = us[i];
        ts.dologs = (ts.brain === me);
        
        // launch all of them asynchonously
        (async function(ii){
          avg_scores[ii] = train(ts) || 0;
        })(i);
      }
      fid = setInterval(f, 50);
      // onclick(e);
    }
    // FORCED DIETING!
    if(e.key === "e"){
      let start = print(me);
      apply_diet(me);
      let end = print(me);
      if(start === end){
        console.log("no changes");
      }
      if(start !== end){
        console.log("some changes");
      }
    }
    if(e.key === "d" && !me_drawn){
      me_drawn = true;
      draw(me);
      setInterval(function(){
        try{draw(me);}
        catch(e){}
      }, 200);
    }
    if(e.key === "x"){
      setup(me, [0.2,0.3]);
      console.log(
        "expect 0.5",
        run(me, 0.05)[0]
      );
      setup(me, [0.7,0.4]);
      console.log(
        "expect 0.1",
        run(me, 0.05)[0]
      );
    }
    if(window.qqq) console.log("KEY:", e.key);
  };
  
  
  
  
  