

const const_prop = function(obj, prop, value, enumerable = true){
    if(!obj) return obj;
    try{
        Object.defineProperty(obj, prop, {
            value,
            readable: true,
            writable: false,
            enumerable,
            configurable: false,
        });
        return obj;
    }
    catch(e){return e;}
};
const fast_const_prop = function(obj, prop){
    if(!obj) return obj;
    try{
        return const_prop(
            obj, prop, obj[prop],
            Object.getOwnPropertyDescriptor(
                obj, prop,
            ).enumerable,
        );
    }
    catch(e){return e;}
};

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
const Busy = (function _s_Busy(){
    const m_busy = Symbol("Busy.m_busy");
    return function Busy(f, is_async = false){
        if(!(f instanceof Function)){
            throw TypeError("parameter f in Busy(f) must be a function;");
        }
        
        // the primary function
        const busy_f_b = function busy_f(){
            if(busy_f[m_busy].length > 0){
                return Busy.busy;
            }
            const o = {};
            busy_f[m_busy].push(o);
            if(busy_f[m_busy][0] !== o){
                return Busy.busy;
            }
            
            let res;
            try{
                res = f.apply(this, arguments);
            }
            // catch any errors f throws, since otherwise we would be perpetually busy doing nothing as soon as f throws an error;
            catch(e){
                busy_f[m_busy] = [];
                // make sure to rethrow since this wrapper is supposed to be non-invasive
                throw e;
            }
            busy_f[m_busy] = [];
            return res;
        };
        // apply async wrapper if necessary
        const busy_f = (
            is_async ?
            async function(){
                res = busy_f();
                if(res !== Busy.busy){
                    res = await res;
                }
                return res;
            } :
            busy_f_b
        );
        
        /** @type {object[]} */
        busy_f[m_busy] = [];
        /** @type {string} */
        busy_f.name = f.name;
        Object.defineProperty(busy_f, "busy", {
            get: (() => busy_f[m_busy].length > 0),
            enumerable: true,
            configurable: false,
        });
        return busy_f;
    };
})();
Busy.busy = Symbol("Busy.m_busy");
fast_const_prop(Busy, "busy");

/*
Busy Example 1

And if that listener modifies external data, it can cause an issue. For example, let's say it has this code:
x = []
x.push(1)
Note that x is defined outside the function for the event listener, i.e. x is static relative to the function.

If 2 instances of the event trigger at the same time, 2 separate instances of the function call will run. There are 2 possible ways the instances can run in tandom. Keep in mind that the JavaScript even loop fakes its async with virtual threads. Meaning it runs code one line at a time and alternates between simultaneous threads as it pleases. Therefore, we have these 2 possibilities:
Possibility 1:
x = []
x.push(1)
x = []
x.push(1)
Possibility 2:
x = []
x = []
x.push(1)
x.push(1)
In possibility 1, x ends up being [1] after both events. This is the ideal possibility, since x is only ever intended to have 0 or 1 elements.
In possibility 2, x ends up being [1,1], since we didn't clear the array between pushes. This causes a problem since x now has 2 elements.

*/

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
const Frame = (function _s_Frame(){
    const m_id = Symbol("Frame.m_id");
    const m_running = Symbol("Frame.m_running");
    const m_on_error = Symbol("Frame.m_on_error");
    
    // all valid options;
    const options_v = [
        "mspf",
        "on_tick",
        "on_error",
    ];
    // map of all valid options;
    const options_m = {};
    
    for(let i of options_v){
        options_m[options_v] = true;
    }
    const Frame = function Frame(options){
        // members need to be explicitly constructed
        this.on_tick = [];
        
        // # Options
        // mspf short-hand
        if(options instanceof Number && isFinite(options)){
            this.mspf = options;
            return;
        }
        // ignore null
        if(!options) return;
        // ignore non-objects
        if(typeof options != "object") return;
        // the rest
        for(let i in options){
            if(options_m[i]){
                this[i] = options[i];
            }
        }
    };
    
    // all symbol values for on_error;
    const on_error_v = [
        Symbol("Frame.stop"),
        Symbol("Frame.break"),
        Symbol("Frame.continue"),
    ];
    // this map is used to check for valid values;
    const on_error_m = {};
    const on_error_d = on_error_v[0];
    // generate the map and also make sure the symbols are accessible as static constant public members of the class;
    for(let i of on_error_v){
        const_prop(
            Frame,
            i.toString().replace(
                /^Symbol\(Frame\.|\)$/g,
                ""
            ),
            i,
        );
        on_error_m[i] = i;
    }
    
    Frame.success = Symbol("Frame.success");
    fast_const_prop(Frame, "success");
    
    // set up Frame.prototype;
    // public members
    const _ = Frame.prototype;
    _.mspf = 16;
    _.on_tick = [];
    // sanitize on_error
    Object.defineProperty(_, "on_error", {
        get: function(){
            return this[m_on_error];
        },
        set: function(oe){
            this[m_on_error] = on_error_m[oe] ?? on_error_d;
        },
        enumerable: true,
        configurable: false,
    });
    _.on_error = on_error_d;
    _.error = new Error("No errors have occured.");
    
    // private members
    _[m_id] = -1;
    _[m_running] = false;
    
    // public methods
    _.tick = Busy(function tick(){
        switch(this[m_on_error]){
            case Frame.stop: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        f?.();
                    }
                }
            }
            catch(e){
                frame.stop();
                this.error = e;
                return e;
            }
            break;
            case Frame.break: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        f?.();
                    }
                }
            }
            catch(e){
                this.error = e;
                return e;
            }
            break;
            case Frame.continue: {
                const errors = [];
                // the outer try-catch handles any errors with the iterator for on_tick array;
                try{
                    if(this.on_tick[Symbol.iterator]){
                        for(let f of this.on_tick){
                            try{
                                f?.();
                            }
                            catch(e){
                                errors.push(e);
                            }
                        }
                    }
                }
                catch(e){
                    errors.push(e);
                }
                if(errors.length > 0){
                    const e = new AggregateError(e, "Tick Errors");
                    this.error = e;
                    return e;
                }
                break;
           }
        }
        return Frame.success;
    });
    _.start = function(){
        if(this[m_running]) return false;
        this[m_id] = window.setInterval(this.tick.bind(this), this.mspf);
        this[m_running] = true;
        return true;
    };
    _.stop = function(){
        if(!this[m_running]) return false;
        window.clearInterval(this[m_id]);
        this[m_id] = -1;
        this[m_running] = false;
        return true;
    };
    
    // prevent methods from being modified, since that would be silly;
    fast_const_prop(_, "tick");
    fast_const_prop(_, "start");
    fast_const_prop(_, "stop");
    
    return Frame;
})();


const f = new Frame();


let clicks = 0;
let clicks_this_tick = 0;
let reset_clicks = false;
let ticks = 0;
let time_0 = new Date;
let time_1 = new Date;
let dt = 0;
let dt_smooth = 0;
const dt_smooth_m = 1/8;

f.on_tick.push(function handle_clicks(){
    const ctt = clicks_this_tick;
    clicks_this_tick = 0;
    if(reset_clicks){
        clicks = 0;
        reset_clicks = false;
    }
    else{
        clicks += ctt;
    }
});

f.on_tick.push(function track_time(){
    const now = new Date;
    dt = (now - time_1);
    dt_smooth = (
        dt_smooth * (1 - dt_smooth_m) +
        dt * dt_smooth_m
    );
    time_1 = now;
    if(clicks){
        ticks++;
    }
    else{
        ticks = 0;
        time_0 = new Date;
    }
});

f.on_tick.push(function update(){
    let t = "";
    let te = (time_1 - time_0) / 1000;
    t += "Clicks: " + clicks + "<br>";
    t += "Ticks: " + ticks + "<br>";
    t += "dt: " + dt + "<br>";
    t += "dt smooth: " + (dt_smooth).toFixed(1) + "<br>";
    t += "Time elapsed: " + (te).toFixed(3) + " seconds<br>";
    t += "tps: " + (ticks / te).toFixed(1) + "<br>";
    t += "cps: " + (clicks / te).toFixed(1) + "<br>";
    stats.innerHTML = t;
});

btn.addEventListener("click", function my_click(){
    clicks_this_tick++;
});
reset.addEventListener("click", function my_reset_clicks(){
    reset_clicks = true;
});

f.start();

