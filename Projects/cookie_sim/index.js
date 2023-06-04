/*
  # Cookie Simulator
  author: Simon Glitch
  is my code unnecessarily long?
  * no, *YOUR* code is!
  * JK, LOL =)
  
  Why are some of my comments written funny? Well, I use Acode, which is way better than your code editor.
*/

/* ==== ==== ==== //
  All of my many HELPER FUNCTIONS {
==== ==== ==== */

// Generic helper functions (these can be used in a wide variety of JavaScript programs) {
const Constify = function(ur_object, prop_name, prop_value, override){
  if(!prop_name || !ur_object) return (
    "You MUST input (an object, and a property name); "+
    "you forgot "+ ((!prop_name && !ur_object) ?"both of them!" :(prop_name ?"the object" :"the property name"))
  );
  if(typeof ur_object !== "function" && typeof ur_object !== "object"){
    return ("the primitive type "+ (typeof ur_object) +" cannot have its properties defined via Object.defineProperty; Object.defineProperty only works on objects and functions!");
  }
  if(!override && ur_object[prop_name] !== undefined){
    return (name +" already exists; try setting override (the 4th parameter of this function) to true");
  }
  try{
    Object.defineProperty(ur_object, prop_name, {
      value: prop_value,
      writable: false,
      configurable: false,
      readable: true,
      enumerable: true,
    });
    if(ur_object[prop_name] !== ur_object){
      return "apparently this object already has a hidden value defined there";
    }
  }
  catch(e){
    return (name +" already exists and could NOT be overridden; you will have to use a different name or remove the original global variable from your code");
  }
  return ur_object;
};
const Globalize = function(ur_object, name, needs_a_parent, override){
  if(!name || !ur_object) return (
    "You MUST input (an object, and a name); "+
    "you forgot "+ ((!name && !ur_object) ?"both of them!" :(name ?"the object" :"the name"))
  );
  if(!override && window[name] !== undefined){
    return (name +" already exists; try settings override (the 4th parameter of this function) to true");
  }
  // use the generalized function above
  Constify(window, name, ur_object, override);
  
  if(typeof ur_object === "function"){
    ur_object.string = (""+ ur_object).replace(/^\s+|\s+$/, "");
    ur_object.toString = function(){return this.name +" "+ this.string;};
  }
  ur_object.name = name;
  // ~* in the future, I might decide that I want / need this feature *~
  if(needs_a_parent) ur_object.parent = window;
  
  return ur_object;
};
Globalize(Globalize, "Globalize");
Globalize(Constify,  "Constify");
// ^ obviously * XD =)
// why is this not a default part of JavaScript?
// oh wait, ES6 classes let you do this, but Codepen doesn't support it
// also, I prefer this way of doing things
const Protofy = function(ur_class, ur_prototype){
  if(!ur_class || !ur_prototype) return false;
  for(let i in ur_prototype){
    ur_class.prototype[i] = ur_prototype[i];
  }
  return true;
};
Error.prototype.toString = function(){
  return this.name + "! "+ this.message + (this.lineNumber ? (" (on line: "+ this.lineNumber) :"");
};
// obviously, Ohio is the correct name for this function
const Ohio = function(name, message, line_number){
  let e = new Error;
  e.name = (name || "[unknownn]") +" Error";
  e.message = message || "[no message]";
  e.lineNumber = ""+ (line_number || "");
  throw e;
};

// f(x) = x
const identity = (function(a){return a});
const u = undefined;
// I don't think I'll use true, false, or null this way; all of these constants do help the JS minifier minify the code though
const T = true;
const F = false;
const N = null;
// }

// help function (alternative to console.log) {
// this exists because many code editors don't have friendly, well-behaved consoles
let console_is_multiline = true;
let console_prints_multiline_strings_correctly = true;
let console_works_the_way_it_should_work = true;
const my_c_log = console.log, my_c_clear = console.clear;
console.log = function(){
  if(console_works_the_way_it_should_work){
    my_c_log(...arguments);
    return console;
  }
  if(console_is_multiline){
    if(console_prints_multiline_strings_correctly){
      let str = "";
      if(arguments.length < 2){
        my_c_log(arguments[0]);
        return console;
      }
      for(let i = 0 ; i < arguments.length; i++){
        str += "\n  "+ arguments[i];
      }
      my_c_log(arguments[i]);
        return console;
    }
    // doesn't support multiline strngs?
    for(let i = 0 ; i < arguments.length; i++){
      my_c_log(arguments[i]);
    }
  }
};
// }

// this DEPENDER is used to set up dependent variables
/**
 * use: new DEPENDER
 * 
 */

// DEPENDER and DEPENDABLE helper classes and functions {
// this is how I set up dependent variables
// first, I have a bunch of symbols
const
  ALWAYS  = Symbol(),
  NEUTRAL = Symbol(),
  NEVER   = Symbol(),
  SET_VALUE    = Symbol(),
  ACTUAL_VALUE = Symbol();

const array_coalesce = function(given, ur_default){
  return given ?((typeof given === "string") ?[given] :given) :ur_default;
};

const DEPENDER = Globalize(
  Protofy((class DEPENDER{
    /**
      * options = {
        input | inputs | input_name  | input_names,
          * this.input
        name | names | output | outputs | output_name | output_names,
          (an output / dependable can have aliases or alternative names)
          * this.name
        import | imports | input_host | input_hosts
          (in the future, I will allow these dependers to connect and span across multiple host objects)
          * this.import
        indep | independence | is_independant
          (whether this variable is independant)
          * this.indep
        func | function | output_function | out_f
          * this.func
        do_pre | pre_do | do_precompute | precompute
          (whether this variable wants to precompute its value whenever any of its inputs change)
        force_pre | pre_force | prop_pre | pre_prop | force_propogate
          (whether the dependents of this dependable are forced to precompute their values when the value of this is updated)
          * this.force_pre
      }
    */
    constructor(options){
      const input = options.input || options.inputs || options.input_name || options.input_names;
      const do_pre = options.do_pre || options.pre_do || options.do_precompute || options.precompute;
      const force_pre = options.force_pre || options.pre_force || options.prop_pre || options.pre_prop || options.force_propogate;
      const func = options.func || options.function || output_function || options.out_f;
      const name = options.name || options.names || options.output || options.output_name || options.output_names;
      const eps = options.esp || options.esp_val || options.epsilon || options.epsilon_value;
      const eps_func = options.eps_func || options.epsilon_function;
      const indep = !!(options.indep || options.independence || options.is_independent);
      // i.e. if(input == null, input == undefined, input == "", input == [])
      if(!indep) if(typeof input !== "number" && (!input || !input.length)){
        console.log("dependant variable `" +output_name+ "` MUST have a variable to depend on!");
        cause_an_error();
      }
      if(indep) if(!name){
        console.log("dependable `" +output_name+ "` variable MUST have a name!");
        cause_an_error();
      }
      this.input = array_coalesce(input, this.input);
      this.indep = indep;
      this.do_pre = !!do_pre;
      this.force_pre = !!force_pre; /* whether this forces its dependants to precompute their values */
      this.func = func || this.func /* output function */;
      this.name = array_coalesce(name, this.name); /* output  name */;
      this.epsilon = eps || this.epsilon;
      this.epsilon_function = eps_func || this.epsilon_function;
      // V this V is not a parameter
      this.dependants = [];
    }
  }), {
    input: [""],
    do_pre: false,
    force_pre: false,
    indep: false,
    func: identity,
    name: [""],
    epsilon: 2**(-32),
    epsilon_function: ((new_val, curr_val, epsilon) => (Math.abs(new_val - curr_val) > epsilon)),
    /* VVV whether this depdendant should always be updated if this.do_pre == false */
    always_update: false,
    dependants: [],
    update: (function(){
      const UPDATING = Symbol();
      // this Protofy line is not strictly necessary, but I feel like including it
      Protofy(DEPENDABLE, UPDATING, false);
      // I love how it looks we are using infinite recursion to solve an infinite recursion problem.
      // However, the ironic part is that:
      // * the Protofy above does not cause infinite recursion!
      return (function update(){
        // infinite recursion check
        if(this[UPDATING]){
          let msg = "Error! "+ this.name +" was at the start of an infinite dependable update recursion loop!";
          console.log(msg);
          return msg;
        }
        // { weird dependency check; I dont know why I wrote this code! 
        // if(!this.indep){
        //   let msg = "Error! "+ this.name +" is a dependent dependable";
        //   console.log(msg);
        //   return msg;
        // }
        // by the way, if either error above actually triggers, that's your fault -- not mine!
        // and, I'm not going to test either of those error checks unless I actually have that problem while I am using this code. If you find some weird bug, you might have to contact me about it, or even just fix it yourself.
        // }
        
        this[UPDATING] = true;
        this[ACTUAL_VALUE] = this[SET_VALUE];
        // now propagate the update
        for(let i = 0, d; i < this.dependants.length; i++){
          d = this.dependants[i];
          if(d.do_pre) d.precompute();
          else if(d.always_update)
            d.update();
        }
        this[UPDATING] = false;
      });
    })(),
    setter: function(value_to_set){
      this[SET_VALUE] = value_to_set;
      // check the epsilon condition
      if(this.epsilon_function(this[SET_VALUE], this[ACTUAL_VALUE], this.epsilon))
        this.update();
    },
    [ACTUAL_VALUE]: 0,
    [SET_VALUE]: 0,
  }), "DEPENDER"
);
// lets not do this: Globalize(DEPENDER, "DEPENDABLE");
// ALWAYS, SOMETIMES, and NEVER are actually globalized, so you can use them
SCOPE_DEPENDABLE_STATES: {
  let todo = [[ALWAYS, "ALWAYS"], [NEUTRAL, "NEUTRAL"], [NEVER, "NEVER"]]
  todo.forEach((a,b) => (Globalize(a, b), Constify(DEPENDER, b, a)));
}
// SET_VALUE and ACTUAL_VALUE are private variables

const o = function(input, do_pre, force_pre, func, name, epsilon_value, epsilon_function, indep){
  return {input, do_pre, force_pre, func, name, epsilon_value, epsilon_function, indep};
};
const d = Globalize((function d(input, do_pre, force_pre, func, name){
  return new DEPENDER(o(input, do_pre, force_pre, func, name, u, u, false));
}), "d");
const id = Globalize((function id(name, force_pre, esp, esp_func){
  return new DEPENDER(o(u, u, force_pre, u, name, esp, esp_func, true));
}), "id");
/**
 * I would love to add a compiling option for this in the future
 * but that would require a lot of work!
  
 * A key part of how this works is the fact that it hides the actual values and prevents other programs from performing any weird shenanigans; this design is extremely good on performance since it allows you to directly link things together, the JavaScript interpreter doesn't have to be like "was that property removed from that object ...?" and it even helps the interpreter from avoiding having to recompute values over and over (when d.do_pre == false)!
 * In case you can't tell, I really LOVE this function!
 * ~~~~
 * The auto_fix_pre parameter will replace d.force_pre = NEVER with d.force_pre = NEUTRAL as necessary; it has a bias towards allowing for more precomputing, since that *should* have better performance.
*/
const Dependify = function(ur_object, auto_fix_pre){
  const
    ds = [],
    dependants = ds,
    dependers = ds,
    dds = [],
    dependables = dds,
    ids = [],
    independent_dependables = ids,
    SOURCES = Symbol()
  ;
  // let a = 2,; // apparently ,; is allowed ?!
  let scan, make_d, make_dd, make_id;
  scan = function(o){
    if(o instanceof Array){
      for(let i = 0; i < o.length; i++){
        if(!o[i].indep)
          make_d(o, i);
        if(o[i].name)
          make_dd(o, i);
        if(o[i].indep)
          make_id(o, i);
      }
      return;
    }
    // non-array object
    if(o instanceof Object){
      for(let i in o){
        if(!o[i].indep)
          make_d(o, i);
        if(o[i].name)
          make_id(o, i);
      }
      return;
    }
    // else {
    // if we haven't returned yet, then o is not an object
    // this function only accepts objects. so we should throw an error
    console.log("scan only accepts objects! o is not an object; here is o:", o);
    "cause_an_error"();
    "^ cause_an_error causes an error because it is not defined! LOL, that's kinda ironic!";
    "also, you can use a string for some reason. the string causes an error even if cause_an_error is actually defined, since a string cannot be called as a function";
    // }
    // Acode is definitely better than your code editor. For sure!
  };
  
  // these really aren't very complex, are they?
  make_d = function(o, i){
    let d = {}  ;
    d.oi  = o[i];
    d.o   = o   ;
    d.i   = i   ;
    ds.push(d);
  };
  make_dd = function(o, i){
    let dd = {}  ;
    dd.oi  = o[i];
    dd.o   = o   ;
    dd.i   = i   ;
    dds.push(dd);
  };
  make_id = function(o, i){
    let id = {}  ;
    id.oi  = o[i];
    id.o   = o   ;
    id.i   = i   ;
    ids.push(id);
  };
  // yay, we can finally call scan!
  scan();
  /*
    here is all of the hard work!
    1stly we need to define a virtual property on every id
    such that there is a set_value and an actual_value
    the set_value is simply the last value that was actually set, while the actual_value is the value that the ds actually use
    whenever we set a value in an id, we need to check if it meets its epsilon condition:
    * if it does, we update the actual value, and then propogate that update to all dependables with d.do_pre == true;
    this means that we ALSO need to have a list of ds attached to each id;
    
    furthermore, each d (with d.do_pre == false) needs to have access to the ids that it depends on; ds where d.do_pre == true are given values into their function during propogation fromm changes, and then store their actual value in their own private scope;
    
    I could (theoretically) implement this such that the do_pre value of a d can be changed at any time, but that would be a bit inefficient and might confuse the JS interpreter. Plus, that could be very prone to a lot of bugs!
  */
  
  // 0th, lets collect all of the dependables in one object, for conveinence
  const ods = {};
  for(let i = 0, dd; i < dds.length; i++){
    dd = dds[i].oi;
    if(!d.name) Ohio("Reference", "this variable should have had a name @ i="+ i);
    if(ods[dd.name]) Ohio("Reference", "There are mutliple dependables named `"+ dd.name +"`");
    ods[dd.name] = dd;
  }
  
  // 1st, make sure every dependable needs to know its dependents
  // set up new, distinct arrays for dependants
  // * I know this is redundant, but I may as well put this here just in case
  SCOPE_REDUNDANT: {
    let z = 0;
    for(let i = 0, dd; i < dds.length; i++){
      dd = dds[i].oi;
      if(dd.dependants === DEPENDER.prototype.dependants){
        dd.dependants = [];
        z++;
      }
    }
    if(z) console.warn("~~ for some reason, I had to set up new arrays of depdendants on "+ z +"/"+ dds.length +" dependables ~~");
  }
  // then fill those arrays
  for(let i = 0, d, di; i < ds.length; i++){
    d = ds[i].oi;
    di = d.input;
    for(let ii = 0, dd; ii < di.length; ii++){
      dd = ods[di[ii]];
      if(!dd) Ohio("Reference", "this variable (name="+ d.name +", i="+ i +" has an input that does not exist (@ ii="+ ii +")!");
      if(dd.dependants.indexOf(d) > -1){
        console.warn("this variable (name="+ d.name +", i="+ i +" seems to appear as a dependant of `"+ di[ii] +"` multiple times (@ ii="+ ii +")!");
        continue;
      }
      dd.dependants.push(d);
    }
  }
  
  // 2nd, check for potential infinite loops; I will be adding a feature for allowing loops in the future; I might even add in a convenient feature for regressions!
  SCOPE_SOURCIFICATION: {
    const SOURCING = Symbol();
    let eek = function(n){
      Ohio("Infinite Loop", "I saw an infinite loop while sourcing dependers (case: "+ n +")!");
    };
    let sourcify;
    sourcify = function(d){
      if(d[SOURCING]) eek(0);
      if(d[SOURCES] && d[SOURCES].indexOf(d) > -1) eek(1);
      d[SOURCING] = true;
      const di = d.input;
      for(let ii = 0, dd; ii < di.length; ii++){
        dd = ods[di[ii]];
        if(!dd[SOURCES] && dd.input.length){
          sourcify(dd);
        }
        // avoid doing repeated work; I don't want an O(n^3) run time!
        if(dd[SOURCES]){
          d[SOURCES].push(...dd[SOURCES]);
        }
      }
      
      // now lets just double check
      if(d[SOURCES].indexOf(d) > -1) eek(2);
    };
    for(let i = 0, d; i < ds.length; i++){
      d = ds[i].oi;
      sourcify(d);
    }
    // now un~sourcify! I only wanted to sourcify as a means of error checking
    for(let i = 0, d; i < ds.length; i++){
      delete d[SOURCES];
      delete d[SOURCING];
    }
  }
  
  /* 3rd, make sure that no variable is forced to do_pre and not do_pre at the same time;
    * If one is, then we check to see if the parameter "auto_fix_pre" is set to true; if it, then we override any force NEVER do_pre with NEUTRAL do_pre, as necessary.
  */
  const FORCE = Symbol;
  for(let i = 0, d, di; i < ds.length; i++){
    d[FORCE] = NEUTRAL;
    d = ds[i].oi;
    di = d.input;
    for(let ii = 0, dd; ii < di.length; ii++){
      dd = ods[di[ii]];
      let dependable_is_neutral = (dd.force_pre === NEUTRAL);
      let dependable_is_never = (dd.force_pre === NEVER);
      let dependable_is_always = (dd.force_pre === ALWAYS);
      let depender_is_always = (d[FORCE] === ALWAYS);
      let depender_is_never = (d[FORCE] === NEVER);
      if(!dependable_is_neutral){
        if(dependable_is_never){
          if(depender_is_always){
            if(auto_fix_pre){
              dd.force_pre = NEUTRAL;
            }
            if(!auto_fix_pre){
              Ohio("Not Allowed", "the variable "+ d.name +" at i="+ i +" has conflicting dependables! (one dependable says force_pre = ALWAYS and another says force_pre = NEVER; you are going to have to sort this out yourself (good luck!) or just set (the 2nd parameter of this function (this function being `Depdendify`)) auto_fix_pre = true.");
            }
          }
          // dependable is never? then we can just do nothing
        }
        // if the depender was already set to never, then we have to go through and forcibly correct all of its dependables; at least we can break the ii loop when we are done
        if(dependable_is_always && depender_is_never){
          for(let iii = 0, dd; iii < di.length; iii++){
            dd = ods[di[iii]];
            let dependable_is_never = (dd.force_pre === NEVER);
            if(dependable_is_never) dd.force_pre = NEUTRAL;
          }
          break;
        }
        if(!dependable_is_never || !depender_is_always){
          d[FORCE] = dd.force_pre;
        }
      }
    }
  }
  // that code is not repetitive, right?
  // no Simon, your code makes perfect sense and never does anything redundant /sarcasm
  // *wink *wink *haha LOL!
  
  /* 4th, set up:
    * every independant dependable's set and get function
    * every depender's get function; the set function throws a not allowed error
  */
  
  
  
};
// }
// }
// ==== ==== ==== */

// everything before this line can be copied as a really useful CDN script if you want. I hope you find it to be useful!

/* TODO / note to myself
  thse will go in the dependables
    vars:
      buildings_owned,
      cookies_earned,
*/

const Game = {
  // parameters for the behavior of the sumulated player
  player_behavior: {
    
  },
  // constant parameters, such as base costs and production amounts
  params: {
    buldings: {},
    upgrades: {},
    golden_cookies: {
      // whether the functon to pick golden cookies is simple; the function that cookie clicker actually uses is not simple
      simple: false,
      // these also go in dependables: {
      chance_of_chain_storm: 0.03,
      chance_of_emg_sale: 0.05,
      dragon_harvest_subchance: 1,
      reality_bending_coeff: 0.1,
      dragon_flight_subchance: 1,
      /*base*/ chance_of_click_frenzy: 0.1,
      dragon_flight_click_frenzy_combo_coeff: 0.05,
      chance_of_building_special: 0.25,
      chance_of_free_lump: 0.0005, // .05% or 1 in 2000!
      //}
      
      // pool for the deletable effects of Golden Cookies
      golden_pool: [
        {
          p: 1,
          give: ["frenzy", "lucky"],
        }, // frenzy & lucky
        {
          p: d(
            ["chance_of_chain_storm", "cookies_earned"], u,u,
            (cocs, cookies) => (cocs * (cookies >= 100000))
          ),
          give: ["chain", "storm"],
        }, // chain & storm
        {
          p: d(
            ["chance_of_emg_sale", "season"], u,u,
            (emg, season) => (emg * (season == april_fools_season_index))
          ),
          give: ["everything must go"],
        }, // everything must go (april fools only)
        {
          p: d(["chance_of_click_frenzy",
            "dragon_flight_click_frenzy_combo_coeff", "current_buffs_dragon_flight"], u,u,
            (cocf, dfcfcc, cbdf) => (cocf * (cbdf ?dfcfcc :1))
          ),
          give: ["click frenzy"],
        }, // click frenzy
        {
          p: d(["chance_of_building_special", "buildings_owned"], u,u,
            (cobs, owned) => (cobs * (owned >= 10))
          ),
          give: ["building special"],
        }, // building special
        {
          p: 0.1925,
          // the p values in the nested pools depend on other variables
          give: [
            {
              p: d(["has_aura_reaper_of_fields", "dragon_harvest_subchance",
                "has_aura_reality_bending", "reality_bending_coeff"], u,u,
                (harof, dhc, harb, rbc) => (dhc * (harof + rbc * harb))
              ),
              give: "dragon_harvest",
            }, // dragon harvest
            {
              p: d(["has_aura_dragon_flight", "dragon_flight_subchance",
                "has_aura_reality_bending", "reality_bending_coeff"], u,u,
                (hadf, dfc, harb, rbc) => (dfc * (hadf + rbc * harb))
              ),
              give: "dragon_flight",
            }, // dragon flight
          ],
        }, // dragon harvest & flight
        {
          p: d(
            ["has_status_lumps", "chance_of_free_lump"], u,u,
            (hsl, cofl) => (hsl * cofl)
          ),
          give: "free sugar lump",
        }, // free sugar lump
      ],
    },
    // everything related to the Bingo Research Center, the Grandmapocalypse, and Wrinklers
    research_center: {},
    // sugar lumps, sugar levels of buildings, and minigames
    sugar: {
      lumps: {
        growth_time: {
          maturing: 4,
        },
        chances: {
          // these are weighted probability distributions, for the chance of getting each number of sugar lumps. So, the chance of getting $i lumps from an unripe lump is $unripe[ $i ] / total( $unripe );
          
          // 50% chance for unripened lump to fail and yield no sugar
          unripe: [1, 1],
          // 50% chance of double sugar lumps
          bifurcated: [0, 1, 1],
          // golden lump has an equal chance of giving any value from 2 to 7 lumps
          golden: [0, 0, 1, 1, 1, 1, 1, 1],
          // 40% chance of nothin, 20% of 1 lump, and 40% chance of 2 lumps; average yield of 1 lump
          meaty: [2, 1, 2],
          carmelized: [0, 1, 1, 1],
        },
        variation_distribution: {
          normal: 1,
          carmel: 0,
        },
      },
      // lump has 7 stages of growth, each is 1/7th of the TOTAL time (reaching maturity + ripening)
      levels: {},
      minigames: {},
    },
    research_center: {},
  },
  // variables, such as number of buildings
  vars: {
    v: 0
  },
  /* simple states (usually booleans) which summarize the vars
     examples include:
     * has sugar lumps unlocked
     * in stage 0,1,2,3 of Grandmapocalypse
     * has dragon flight
     * etc...
  */
  status: {
    // whether the player has bakes 1 billion cookies and unlocked sugar lumps
    sugar_lumps: false,
    // how many prestiges have been made
    prestiges: 0,
    // whether the player is currentlty in the heavenly upgrades screen
    in_the_heavens: false,
    /**
     * currentlty, the game has 20 buildings, and thus this would have 20 zeroes in it
     * the parameters control which minigame actually exist
     * this array lists whether the player has unlocked each minigame (by meeting the minimum requirement for the sugar level of the building; if a minigame had extra requirements, this could act as a summary of whether those requirements have ever been met)
     **/
    minigames: [],
    // whether the dragon is currently owned
    dragon: false,
    // whether dragon_flight and dragon_harvest can appear as GC effects
    dragon_flight: false,
    dragon_harvest: false,
    // the current season's index in the list of seasons; -1 means no season active;
    season: -1,
  },
  data: {
    // contains Game.params and Game.data; I know, this seems redundant
    // also contains the save string, and the time of the last save
    save_string: "",
    time_of_last_save: new Date,
    // this is the nuber of saves which have been made DURING THIS EXECUTION
    number_of_saves_made: 0,
  }
  
};


SCOPE_GAME_SETUP: {
  const gd = Game.data;
  const gc = Game.vars.golden_cookies;
  const gcp = Game.params.golden_cookies;
  
  // as I said, this seems a bit redundant
  gd.vars = Game.vars;
  gd.params = Game.params;
  gd.status = Game.status;
  
  // golden cookies
  
  /**
   * golden cookie choosing function;
   * this function is based on the code below
   */
  /*
    //select an effect
    var list=[];
    if (me.wrath>0) list.push('clot','multiply cookies','ruin cookies');
    else list.push('frenzy','multiply cookies');
    if (me.wrath>0 && Game.hasGod && Game.hasGod('scorn')) list.push('clot','ruin cookies','clot','ruin cookies');
    if (me.wrath>0 && Math.random()<0.3) list.push('blood frenzy','chain cookie','cookie storm');
    else if (Math.random()<0.03 && Game.cookiesEarned>=100000) list.push('chain cookie','cookie storm');
    if (Math.random()<0.05 && Game.season=='fools') list.push('everything must go');
    if (Math.random()<0.1 && (Math.random()<0.05 || !Game.hasBuff('Dragonflight'))) list.push('click frenzy');
    if (me.wrath && Math.random()<0.1) list.push('cursed finger');
    
    if (Game.BuildingsOwned>=10 && Math.random()<0.25) list.push('building special');
    
    if (Game.canLumps() && Math.random()<0.0005) list.push('free sugar lump');
    
    // my comments on harvest and flight:
      // if (Math.random()<Game.auraMult('Reaper of Fields')) list.push('dragon harvest');
      // if (Math.random()<Game.auraMult('Dragonflight')) list.push('dragonflight');
      // 19.25% if no wrath; 5% if wrath

    if ((me.wrath==0 && Math.random()<0.15) || Math.random()<0.05)
    {
      //if (Game.hasAura('Reaper of Fields')) list.push('dragon harvest');
      if (Math.random()<Game.auraMult('Reaper of Fields')) list.push('dragon harvest');
      //if (Game.hasAura('Dragonflight')) list.push('dragonflight');
      if (Math.random()<Game.auraMult('Dragonflight')) list.push('dragonflight');
    }
    
    if (this.last!='' && Math.random()<0.8 && list.indexOf(this.last)!=-1) list.splice(list.indexOf(this.last),1);//80% chance to force a different one
    if (Math.random()<0.0001) list.push('blab');
    var choice=choose(list);
    
    if (this.chain>0) choice='chain cookie';
    if (me.force!='') {this.chain=0;choice=me.force;me.force='';}
    if (choice!='chain cookie') this.chain=0;
    
    this.last=choice;
  */
  
  // this JSDoc might seem long-winded, but I want to make sure that anyone else who uses this program will understand how it works!;
  /**
   * Build Pool (pool_data)
   * @param Object pool_data: data for the pool;
   * * should be written as a list of objects, where each object is written in the following format:
   * * {p: probability, gives: stuff},
   * * p is the probability that the stuff will be added to the return pool
   * @return Array pool: the object returns a pool; the return pool is always an array of items, which are selected from the `gives` properties of the objects in the pool data
   **/
  const build_pool = (() => {
    let build_pool_recurse;
    build_pool_recurse = function(pool_data){
      let pool;
      for(let i = 0, pdi, p, gives; i < pool_data.length; i++){
        pdi = pool_data[i];
        p = pdi.p;
        gives = pdi.gives;
        if(Math.random() < p){
          if(gives instanceof Array) pool.push(... gives);
          // recursion is SO CONVENIENT; this is how you do multiple rolls
          else if(gives instanceof Object) pool.push(... build_pool_recurse(gives));
          else pool.push(gives);
        }
        return pool;
      }
    };
    return build_pool_recurse;
  })();
  
  const Gc = Game.Choose_Golden = function(prev_cookie, simple){
    prev_cookie = prev_cookie || gc.prev_cookie;
    simple = simple || gc.simple;
    
    let golden;
    if(!simple){
      let pool = [];
      // d_types is deletable types
      let d_types = gcp.golden_pool;
      return golden;
    }
  };
  
  
  Globalize(Game, "Game");
}


Game.Load = function(){
  Game.cookies = 0;
};
Game.Update = function(){
  
  log(true);
  
};
Game.Progress = function(){
  
  // ~ ~ probably Game.Update() somewhere in here ...
  
};

let log = function(do_clear){
  if(do_clear) console.clear();
  console.log(
    "== Cookie Simulator ==",
    "cookies: "+ Game.cookies
  );
};

Game.Load();
Game.Update();




