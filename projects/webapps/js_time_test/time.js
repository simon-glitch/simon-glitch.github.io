
/**
  * The purpose of this file is to implement that `time` function below. 
**/
let purpose;

class Multi_{
    /**
     * `safe` basically enables or disables the use of multiple [things]
    **/
    safe = true
    /**
     * 0 means "automatic"
    **/
    suggested_count = 0
    
    constructor(safe, suggested_count){
        this.safe = safe ?? this.safe;
        this.suggested_count = suggested_count ?? this.suggested_count;
    }
}

/**
  * Used to describe support for Multi-Processing.
  * 
  * This can be attached to a function to describe whether it is web-worker-safe, for example.
  * 
  * Keep in mind: each web-worker is an individual process. Web-workers can be executed across multiple different CPU cores. Web-workers should avoid accessing global variables, since this slows down the CPU cores. This is a really complex topic, that I can't really explain here. If you want to learn more, look up "parallel processing shared memory access" in the search enginge of your choice for more information.
**/
class Processing extends Multi_{}
/**
  * Used to describe support for Multi-Threading.
  * 
  * This can be attached to a function to describe whether it is thread-safe, for example.
  * 
  * Keep in mind: threads are not parallel processes. A thread is a task that can be executed in a single CPU core. 2 threads are considered safe is the CPU can switch between the threads at any time (i.e. on any specific line of assembly code).
**/
class Threading extends Multi_{}

class Memory{
    multi_processing = new Processing();
    multi_threading = new Threading();
    constructor(processing, threading){
        this.multi_processing = processing ?? this.multi_processing;
        this.multi_threading = threading ?? this.multi_threading;
    }
}

/**
   * Test how long it takes a function to run.
   * 
   * Side note: I was very careful with the locality and usage of each variable in this script. I have tried to make it extremely secure, and even thread-safe. This means that you can do `time(() => {time(() => {})})` and other related shenanigans (i.e. you can run `time` on itself).
**/
function time(f = function(){}, memory = new Memory()){
    if(typeof f != "function"){
        throw new TypeError("Expected [f] to be a function.");
    }
    
    // type checking!
    if(!memory instanceof Memory){
        let processing = arguents[0];
        let threading = arguents[1];
        if(
            (processing instanceof Processing) &
            (threading instanceof Threading)
        ) memory = Memory(processing, threading);
        else throw new TypeError("Expected [memory] a Memory object, but got an instance of " + arguments[0]?.constructor + " instead.");
    }
    
    // now let's actually run this function
    use_workers = memory.multi_processing.safe && (memory.multi_processing.suggested_count != 1);
    use_threads = memory.multi_threading.safe && (memory.multi_threading.suggested_count != 1);
    
    const worker_count = memory.multi_processing.suggested_count || 1;
    
    resolve_f = function(){};
    // first, we create a promise
    const p = new Promise((resolve) => {
        // this arrow function is run immediately, and the resolver (`resolve`) is given to it
        // we can store the resolver in the outer scope, like so:
        resolve_f = resolve;
        /*
        this allows us to reuse the resolver WHENEVER we want
        reusing the resolver will trigger ANYTHING that awaits this promise
        also, multiple things can await the same promise
        however, the same promise can NOT resolve multiple times
        JavaScript throws a silent error if you try to resolve this function repeatedly
        
        Why am I writing all these comments? Well, this way of using promises is just extremely rare, and I think someone out there will find this information to be really helpful.
        */
    });
    
    /** @type Boolean[] */
    const done = [];
    for(let i = 0; i < worker_count; i++){
        done[i] = false;
    }
    /** @type Number[] */
    const times = [];
    
    const todo_c = 8;
    
    const sub_data = {
        f,
        todo_c,
    };
    
    if(!use_workers) worker_count = 1;
    // we want to make one web-worker per worker needed (beyond the 1st worker)
    /** @type Worker[] */
    const ws = [];
    for(let i = 0; i < worker_count; i++)
        ws[i] = new Worker("worker.js");
    
    // yes: I am intentionally posting messages AFTER making the workers
    
    const start_f = function(){
        for(let i = 0; i < worker_count; i++){
            const data = {index: i, sub: sub_data};
            ws[i].postMessage(data);
        }
    };
    
    const on_message_f = function(e){
        // grab output from our web workers
        data = e.data;
        times[data.index] = data.time;
        done[data.index] = true;
    }
    
    const finish_f = function(){
        let total = 0;
        for(let i = 0; i < worker_count; i++){
            total += times[i];
        }
        // here is the magic of that promise from earlier
        
        // TODO: make `todo_c` and `todo_tc` more intuitive
        const todo_tc = todo_c * worker_count;
        
        console.log(`Took ${Math.floor(total / 1000)}.${total % 1000} seconds to run [f] a total of ${todo_tc} times.`);
    };
    
    let ready = true;
    let frame_f_id = -1;
    const frame_f = function(){
        if(!ready) return false;
        ready = false;
        
        let all_done = true;
        for(let i = 0; i < done.length; i++){
            // this is an example where Python's for-else loop would actually make some sense
            if(!done[i]){
                all_done = false;
                break;
            }
        }
        if(all_done){
            finish_f();
            clearInterval(frame_f_id);
        }
        
        ready = true;
        return true;
    };
    
    addEventListener("message", on_message_f);
    frame_f_id = setInterval(frame_f);
    
    // technically, `time` is an async function
    // you can actually use `await` on it, if you want, because it returns a promise
    // any promise object can be awaited (this is actually how promises and async functions work under the hood)
    return p;
};

// convenient alternative access method
time.MP = Processing;
time.MT = Threading;
time.M = Memory;

// unit tests are nice
time.test = function(){
    let testee = function testee(){
        return 0;
    };
    
    time(testee, time.M()).then(v => console.log(v));
};

// export classes and methods
window.Processing ||= Processing;
window.Threading ||= Threading;
window.time ||= time;

    /**
     * JS Doc
    **/


