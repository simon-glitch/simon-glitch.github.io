/*
  This code is made solely by me, Simon Alexander Willover
  The code is intended to be used and shared, but NEVER used for commercial purposes, as I am the owner and I do not want other's making profit off of my work without me knowing about it.
  Rememeber: {
    This content is FREE, and NO PURCHASES or TRANSACTIONS may be done with it or related assets
    Make sure to put that REMEMBER satement in any and all copies of this code
  }
*/

/*
  Naming Conventions:
    all caps are used for special constants, and global variables usually get TitleCaps
    user made variables are usally prefixed with u$, and programmatically generated variables are prefixed with p$
*/

// for starters, we use this function to make global constants

Object.defineProperty( window, "globalConstant", {
  value: function globalConstant( name, value ){
    Object.defineProperty( window, name, {
      value
    } );
  }
} );

var Input, MyFrame;

globalConstant( "Input", {
  keys: {
    holdingDown: {}, /* { a: true, b false, shift: false, ctrl: true, ... } ould mean ctrl-a is being held (not pressed) */
    holdingDownOrder: [],
    pressedWhich: "" /* the last key pressed, if it actually being held, it won't be added to keys.holdingDown until ANOTHER key is pressed down; on a lot of devices, holding a key actaully results in repeated key-down and key-up events */,
    pressedRepetitions: 0 /* as I just /\ said, we can get key repeated events; also, the user can tap the same key lots of times really fast; sometimes the framerate can't keep up, but we still want to process every key preess, so we should count presses and do them in bulk when the user stops spamming keys */,
  },
  mouse: {
    clicks: [] /*
      for mobile devices with ultiple touches at once, and for touchscreen computers, we want to allow screen touch and normal mouse movement at the same time
      a click is formatted: {
        e: click event,
        x: x coord,
        y: y coord,
        pagex: x coord on page,
        pagey: y coord on page,
        relx: x coord / element width,
        rely: y coord / element height,
        startTime: starting time (Date object)
      }
    */,
    clickCount: 0 /* how many repeated clicks in the same spot */,
    isCurrentlyDown: false,
    paths: [] /*
      for draw and drop as well as touch swipes / paths / drawings
      mouse.paths is a list of paths
      a path object is list of points
      a point is formatted as: {
        x: x coord,
        y: y coord,
        pagex: x coord on page,
        pagey: y coord on page,
        relx: x coord / element width,
        rely: y coord / element height,
        time: time since last point (or since start of the drag, which would be in clicks)
      }
    */
  },
  on_mouse_up: function( e ){
    
  },
  on_mouse_move: function( e ){
    
  },
  on_mouse_down: function( e ){
    
  },
  on_touch_start: function( e ){
    e.preventDefault();
    Input.on_mouse_down();
  },
  on_touch_move: function( e ){
    e.preventDefault();
    Input.on_mouse_move();
  },
  on_touch_end: function( e ){
    e.preventDefault();
    Input.on_mouse_up();
  },
  on_key_up: function( e ){
    
  },
  on_key_down: function( e ){
    
  },
  on_mouse_over: function( e ){
    
  },
  on_mouse_off: function( e ){
    
  },
  el: null
} );



globalConstant( "MyFrame", {
  completedCount: 0 /* how many frmaes have actaully happened, in terms of JavaScript */,
  expectedCount: 0 /* if we miss frames somehow, this will still go up*/,
  recordPerformance: false /* whether we should record the time taken on each and every frame */,
  recordLimit: 20 /* how many frames we should record */,
  completedRecord: [],
  expectedRecord: [],
  done: true /* is the last frame done? are we ready to do a new one? this stops asychonous overlapping and weird behavior from occuring, which is important when using global variables */,
  onFrame: function(){
    if( MyFrame.done ){
      MyFrame.done = false;
      
      if( MyFrame.completedCount % 2 === 0 ){ /* only every other frame */
        
      }
      if( MyFrame.completedCount % 8 === 0 ){ /* only every 8th frame */
        
      }
      if( MyFrame.completedCount % 32 === 0 ){ /* only every 32nd frame */
        
      }
      
      MyFrame.completedCount ++;
      MyFrame.done = true;
    }
    MyFrame.expectedCount ++;
  },
  isSetUp: false
} );

globalConstant( "ouput", {
  
} );

if( !MyFrame.isSetUp ){
  setInterval( MyFrame.onFrame, 16 );
  
  MyFrame.isSetUp = true;
}



{
  let c = document.querySelector( "canvas" );
  if( c === null ){
    c = document.createElement( "canvas" );
    document.body.appendChild( c );
  }
  globalConstant( "c", c );
  globalConstant( "ctx", c.getContext( "2d" ) );
  
  c.onmousedown = Input.on_mouse_down;
  c.onmousemove = Input.on_mouse_move;
  c.onmouseup = Input.on_mouse_up;
  c.ontouchstart = Input.on_mouse_down;
  c.ontouchmove = Input.on_mouse_move;
  c.ontouchend = Input.on_mouse_up;
  
  
  c.onmouseover = Input.on_mouse_over;
  c.onmouseoff = Input.on_mouse_off;
  c.onmousemove = Input.on_mouse_move;
  c.onmousemove = Input.on_mouse_move;
  c.onmousemove = Input.on_mouse_move;
  
}
/*
  TODO list: {
    inputs: {
      text
      number
      2D number
      toggle
      scroll to - moves the cursor to an element
    }
  }
*/
