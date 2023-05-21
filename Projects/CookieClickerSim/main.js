
/*
  # Cookie Simulator
  author: Simon Glitch
*/

const Globalize = function(ur_object, name, needs_a_parent, override){
  if((!name) || !(ur_object)) return "You MUST input (an object, and a name)";
  if(!override && window[name] !== undefined){
    return (name +" already exists; try settings override (the 4th parameter of this function) to true");
  }
  try{
    Object.defineProperty(window, name, {
    value: ur_object,
    writable: false,
    configurable: false,
    readable: true,
    enumerable: true,
  });
    if(window[name] !== ur_object) throw new ReferenceError;
  }
  catch(e){
    return (name +" already exists and could NOT be overridden; you will have to use a different name or remove the original global variable from your code");
  }
  ur_object.name = name;
  // ~* in the future, I might decide that I want / need this feature *~
  if(needs_a_parent) ur_object.parent = window;
  
  return ur_object;
};
Globalize(Globalize, "Globalize");
// ^ obviously * XD =)

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

// this DEPENDER is uused to set up dependant variables
const DEPENDER = Globalize((class DEPENDER{
  constructor(name, dependant, whether_to_precompute){
    this.name = name;
    this.dependant = dependant || null;
    this.do_pre = !!whether_to_precompute;
  }
}), "DEPENDER");
const d = Globalize((function(name){
  return new DEPENDER(name);
}), "d");
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
  in the dependables
    chance_of_chain_storm = 0.03,
    chance_of_emg_sale = 0.05
    chance_of_click_frenzy = 0.1
    dragon_flight_click_frenzy_combo_coeff = 0.05

  in golden pool
    {
      p: 1,
      give: ["frenzy", "lucky"],
    },
    {
      p: d(["chance_of_chain_storm", "cookies_earned"], ,,
        (cocs, cookies) => (cocs * (cookies >= 100000))
      ),
      give: ["chain", "storm"],
    },
    {
      p: d(["chance_of_emg_sale", "season"], ,,
        (emg, season) => (emg * (season == april_fools_season_index))
      ),
      give: ["everything must go"],
    },
    {
      p: d(["chance_of_click_frenzy",
        "dragon_flight_click_frenzy_combo_coeff", "current_buffs_dragon_flight"], ,,
        (cocf, dfcfcc, cbdf) => (cocf * (cbdf ?dfcfcc :1))
      ),
      give: ["click frenzy"],
    }
    {
      p: d(["chance_of_building_special", "buildings_owned"], ,,
        (cobs, owned) => (cobs * (owned >= 10))
      ),
      give: ["click frenzy"],
    }
    
    // dragon harvest and flight (for golden cookies, not wrath cookies)
      p: 0.1925,
      // the p values in the nested pools depend on other variables
      give: [
        {
        dragon_harvest_subchance = 1,
        reality_bending_coeff = 0.1,
        dragon_flight_subchance = 1
          p: d(["has_aura_reaper_of_fields", "dragon_harvest_subchance",
            "has_aura_reality_bending", "reality_bending_coeff"], ,,
            (harof, dhc, harb, rbc) => (dhc * (harof + rbc * harb))
          ),
          give: "dragon_harvest",
        },
        {
          p: d(["has_aura_dragon_flight", "dragon_flight_subchance",
            "has_aura_reality_bending", "reality_bending_coeff"], ,,
            (hadf, dfc, harb, rbc) => (dfc * (hadf + rbc * harb))
          ),
          give: "dragon_flight",
        },
      ]

    
    if (Game.BuildingsOwned>=10 && Math.random()<0.25) list.push('building special');
    if (Game.canLumps() && Math.random()<0.0005) list.push('free sugar lump');
    
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
  const Gc = Game.Choose_Golden = function(prev_cookie, simple){
    prev_cookie = prev_cookie || gc.prev_cookie;
    simple = simple || gc.simple;
    
    let golden;
    if(!simple){
      let pool = [];
      let d_types = gcp.types.deletable;
      for(let i = 0; i < d_types.length; i++){
        if(Math.random() < d_types[i]){
          if(d_types[i] instanceof Array) pool.push(...d_types[i]);
          else pool.push(d_types[i]);
        }
      }
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






