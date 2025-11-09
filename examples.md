

Here are some examples

``` js
/**
  * Check if an object is "array-like".
  * - i.e. does it have a `length` property, and is not a string;
  * - or does it have an `in` iterator?
  * @param {*} obj 
  * @returns {number}
  * - `0` if the object is not array-like;
  * - `1` if it can be indexed into;
  * - `2` if it can be iterated on with `for v of`;
**/
const is_array_like = function(obj){...}

/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_property = function(obj, prop, value, enumerable = true){...}

/*
# Function factory Busy
Make a function that is resistant to asnychronous execution. Busy works by making a wrapper around f, named busy_f. Only one instance of the function can be called at a time. This means the function can safely modify variables without having to worry about memory collisions from separate threads. This is very similar to a mutex lock and is much simpler than event throttling.
- "busy_f" is an instance of Busy;
- returns {function} busy_f
    - calling busy_f will return immediately return Busy.busy if busy_f is being run on a separate thread;
    - otherwise, busy_f will call f on this thread;
    - this means that, assuming f is privately stored in the scope of busy_f, there can only ever be 1 instance of f running at a given time;
    - essentially, busy_f "protects" f from parallel execution;
    - busy_f will return whatever f returns if it actually runs f;
    - property {bool} busy_f.busy - whether busy_f is busy;
- usage: Busy(f)
- parameters:
    - {function} f: the function that busy_f will call;
    - {boolean} is_async: whether busy_f should be async; f will be awaited if it is;
- members:
    - {boolean} busy [readonly]: whether busy_f is busy;
    - {boolean} Busy.m_busy [private]: internal variable for busy_f.busy;
    - {string} name: the name of busy_f; defaults to f.name;
*/
const Busy = (function _s_Busy(){...}

/*
# Class Frame
A frame handler. This can be used to handle animations, or to gradually do computations that take a long time. frame.start starts the frame handler, causing it to tick every frame. frame.stop stops it.
- "frame" is an instance of Frame;
- parameters:
    - {object} options: overrides the default values for each of the public member variables of frame that are specified in option;
    - {number} options: if a number for options is passed in, it overrides the default value for mspf;
- members:
    - {number} mspf: the number of milliseconds to wait between frames; this number is used to set the tick speed in window.setInterval; defaults to 16;
    - {number} on_tick: list of functions to run when frame.tick is called; i.e. these functions are run every tick or frame; defaults to [];
    - {Frame.stop | Frame.break | Frame.continue} on_error: what frame.tick should do when an error occurs in one of the on_tick functions;
    - {Error} error: the last error returned by any call to frame.tick;
# Methods
- {() => Symbol | Error} tick:
    Ticks the function, and runs every function in frame.on_tick, in order.
    If an error occurs in one of the functions, it will be saved in frame.error, and handled differently depending on the value of frame.on_error:
    - case Frame.stop: the frame handler stops ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.break: the frame handler continues ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.continue: the frame handler continues ticking, the error is saved in tick.error, and frame.tick continues to the next function in frame.on_tick; since multiple errors can occur, all errors thrown by all functions frame.on_tick will be aggegated together into an AggregateError which will then be saved in frame.error;
- {() => bool} start:
    Makes the frame handler start ticking, by running window.setInterval on frame.tick.
    returns:
    - {bool} succeeded: whether start successfully started ticking or not;
- {() => bool} stop:
    Makes the frame handler stop ticking, by running window.clearInterval on the approriate interval ID.
    returns:
    - {bool} succeeded: whether stop successfully stopped ticking or not;
*/
const Frame = (function _s_Frame(){...}

```
