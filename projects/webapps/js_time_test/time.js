
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
        if(processing) this.multi_processing = processing;
        if(threading) this.multi_threading = threading;
    }
}

/**
  * JS Doc
**/
function time(memory = new Memory()){
    
};

    /**
     * JS Doc
    **/


