/*
Author:
    Simon Glitch

About:
    See `../docs/promise_fn.md` for an explanation on what the idea behind this script is.
*/

/**
 * Create a connection (`co`). You can listen to this connection using `co.receive`, and you can send messages through the connection by calling `co.sender`.
 * @param {Function} f This function is called every time you run `co.sender`. The parameters given to `co.sender` are passed down to `f`.
 */
class Connection{
    trapped = function(){}
    /**
     * @type Function[]
     * @desc `recipients` is a list of all the proimise resolving functions to call when `sender` is called.
     */
    recipients = []
    constructor(f){
        this.trapped = f ?? this.trapped;
        this.recipients = [];
    }
    /**
     * Trigger every async function that is listening to this connection. This will also call any `.then`s which were called in a similar way. `f` is called when you run this trigger, and the return value of `f` is given to every function that listens to this connection.
     * @param thisArg the object to use as `this` inside of `f`.
     * @param {Array} argArray the arguments to pass to `f`.
     */
    sender(thisArg, argArray){
        const res = this.trapped.apply(thisArg, argArray);
        
        // grab the recipients for this sender call
        // the reason we have to do this is to allow new recipients to be added while we are busy
        const rec = [];
        const l = this.recipients.length;
        for(let i = 0; i < l; i++) rec[i] = this.recipients[i];
        // remove the used recipients
        this.recipients.splice(0, l);
        // if you (or I) wrote to `this.recipients[this.recipients.length]` while extending the array, then there might be some empty elements now; I'll have to keep this in mind when I iterate over the elements;
        
        for(let i = 0; i < l; i++){
            // empty element!
            if(!rec[i]) continue;
            
            rec[i](res);
        }
    }
    /**
     * Sweet and simple: listen for `this.sender` to be called. Don't forget to put `await` before calling this, or `.then` after calling this.
     * @returns promise which is "listening" to `this.sender`
     */
    receive(){
        return new Promise(resolver => {
            this.recipients.push(resolver);
        });
    }
}

