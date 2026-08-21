
/**
 * This is a type for `{ Look ma, I'm a UUID! }`, the empty object.
 * @typedef {Record<string, never>} Empty;
 */

/**
 * This class implements a type of "subscriber model".
 * - Used for variables that are dependent on other variables. So a given observable should be a function of other variables, or it should be a "root" variable, meaning it does not depend on variables. Root observables / variables have setters that make sense.
 * - You can think of an observable / variable as being a subscriber to the variables it depends on.
 * - However, this system is different than other systems. Typically, the term "subscriber" implies a pull-based system, where in order to get the value of a subscriber, you must recursively calculate the values of the observables / variables it is subscribed to, and then calculate the value of this subscriber too. What makes this system different is that it is actually a hybrid of a push-based system and a pull-based system.
 * - See the constructor for more info.
 * - "This cycle" refers to the time between update horizon optimizations. See `Optimizer` for more info.
 * - By the way, make sure to use subscribe and accept. **Do not** modify the subscribers and members of this class directly. The only member you can modfy safely is `observable.calculate`.
 */
class Observable{
    /** The number of times this observable has been updated during this cycle. */
    update_count = 0;
    /** The cumulated amount of time spent running the calculate method of this observable during this cycle. */
    time_taken = 0;
    /** Only used in `Observer`. */
    effective_cost = 0;
    /** The "mode" of this observable. `0` indicates subscribing mode (updates are pulled). `1` indicates publishing mode (updates are pushed). @type {0 | 1} */
    mode = 0;
    /** The unique symbol assigned to this observable. Used for checking for this observable in the subscriber / publisher lists of other observables. If you overwrite this, an infinite loop might happen. Don't worry though, you can't overwrite this. You're welcome. */
    symbol = Symbol("observable.prototype.symbol");
    /** A reference to an empty object. This acts as a UUID to prevent `observable.update` and `observable.publish` from updating the same observable twice in one calculation. @type {Empty} */
    lastID = {};
    /** The cached value of this observable, as returned by `observable.calculate`. @type {any} */
    value = 0;
    /** The observables that this observable is subscribed to. @type {Observable[]} */
    publishers = [];
    /** The observables that are subscribed to this observable. @type {Observable[]} */
    subscribers = [];
    /** Symbol map for the observables that this observable is subscribed to. @type {Record<Symbol, Observable>} */
    s_publishers = {};
    /** Symbol map for the observables that are subscribed to this observable. @type {Record<Symbol, Observable>} */
    s_subscribers = {};
    /** Whether to construct `publisher_values` for `observable.calculate`. */
    fancy_calculate = false;
    /**
     * This constructor doesn't have many options, because you have to specify the publishers and subscribers of this node separately.
     * @param {(publisher_values: Object) => any} [calculate] The "formula" for the variable this observable controls. This function is run every time this observable is updated, in order to ensure that the value of this observable is always up to date. External systems should be able to trust this value to be up to date.
     */
    constructor(calculate){
        /**
         * @member {(publisher_values: Record<Symbol, any> | undefined) => any} calculate The function used to calculate the value of this observable. 
         * - Feel free to modify this with external code if you want to.
         * - The values in `publisher_values` are the direct values of those publishers, not the actual publishers.
         * - `publisher_values` will only be given if `observable.fancy_calculate`
         * - Note that `this` will be this observable, unless you bind the function or use an arrow function.
         */
        this.calculate = calculate ?? this.calculate;
        this.publishers = [];
        this.subscribers = [];
        this.s_publishers = {};
        this.s_subscribers = {};
        // You're welcome.
        const symbol = Symbol("observable.instance.symbol");
        Object.defineProperty(this, "symbol", {
            get(){return symbol;},
            configurable: false,
        });
    }
    initialize(){
        this.update_count = 0;
        this.time_taken = 0;
        this.subscribers = [];
        this.publishers = [];
        for(const s in this.s_subscribers){
            this.subscribers.push(this.s_subscribers[s]);
        }
        for(const s in this.s_publishers){
            this.publishers.push(this.s_publishers[s]);
        }
    }
    /**
     * Subscribe to the list of publishers. This also causes those publishers to accept this observable as a subscriber. Note: a publishing-mode observable cannot subscribe to a subscribing-mode observable.
     * @param {Observable[]} publishers
     */
    subscribe(publishers){
        for(const p of publishers){
            if(p.check_subscribe(this.symbol, {/* Look ma, I'm a UUID! */})){
                throw new ReferenceError("This observable cannot subscribe to itself.", {cause: this});
            }
        }
        for(const p of publishers){
            if(!this.s_publishers[p.symbol]){
                this.s_publishers[p.symbol] = true;
                this.publishers.push(p);
                if(!p.s_subscribers[this.symbol]){
                    p.s_subscribers[this.symbol] = true;
                    p.subscribers.push(this);
                }
            }
        }
    }
    /**
     * Accept the list of subscribers. This also causes those subscribers to subscribe to this observable. Note: a subscribing-mode observable cannot accept a publishing-mode observable as a subscriber.
     * - Yes, calling this "accept" is a bit confusing, but I blame the English language for that.
     * @param {Observable[]} subscribers
     */
    accept(subscribers){
        for(const p of subscribers){
            if(this.check_accept(this.symbol, {/* Look ma, I'm a UUID! */})){
                throw new ReferenceError("This observable cannot subscribe to itself.", {cause: this});
            }
        }
        for(const p of subscribers){
            if(!this.s_subscribers[p.symbol]){
                this.s_subscribers[p.symbol] = true;
                this.subscribers.push(p);
                if(!p.s_publishers[this.symbol]){
                    p.s_publishers[this.symbol] = true;
                    p.publishers.push(this);
                }
            }
        }
    }
    /**
     * Unsubscribe from the list of publishers. This also causes those publishers to unaccept this observable as a subscriber.
     * - After calling this function, you need to call observable.initialize() to update the list of subscribers / publishers.
     * @param {Observable[]} publishers
     */
    unsubscribe(publishers){
        for(const p of publishers){
            if(this.s_publishers[p.symbol]){
                delete this.s_publishers[p.symbol];
                if(p.s_subscribers[this.symbol]){
                    delete p.s_subscribers[this.symbol];
                }
            }
        }
    }
    /**
     * Unaccept the list of subscribers. This also causes those subscribers to unsubscribe to this observable.
     * - After calling this function, you need to call observable.initialize() to update the list of subscribers / publishers.
     * @param {Observable[]} subscribers
     */
    unaccept(subscribers){
        for(const p of subscribers){
            if(this.s_subscribers[p.symbol]){
                delete this.s_subscribers[p.symbol];
                if(p.s_publishers[this.symbol]){
                    delete p.s_publishers[this.symbol];
                }
            }
        }
    }
    /**
     * Internal method for `observable.subscribe`, to check to make sure an observable does not subscribe to itself, since that would **definitely** cause an infinite loop.
     * @param {symbol} s the unique symbol of the observable that is being checked;
     * @param {Empty} checkID the UUID used for checking;
     * @returns {bool} `false` means there would be no infinite loop, and `true` means there would be an infinite loop;
     */
    check_subscribe(s, checkID){
        for(const p of this.publishers){
            // prevent over-checking, since there are simple cases where you might over-check exponentially when only a linear number of nodes need checked;
            if(p.lastID === checkID) continue;
            if(p.s_publishers[s]) return true;
            if(p.check_subscribe(s, checkID)) return true;
            p.lastID = checkID;
        }
        return false;
    }
    /**
     * Internal method for `observable.accept`, to check to make sure an observable does not subscribe to itself, since that would **definitely** cause an infinite loop.
     * @param {symbol} s the unique symbol of the observable that is being checked;
     * @param {Empty} checkID the UUID used for checking;
     * @returns {bool} `false` means there would be no infinite loop, and `true` means there would be an infinite loop;
     */
    check_accept(s, checkID){
        for(const p of this.subscribers){
            // prevent over-checking, since there are simple cases where you might over-check exponentially when only a linear number of nodes need checked;
            if(p.lastID === checkID) continue;
            if(p.s_subscribers[s]) return true;
            if(p.check_accept(s, checkID)) return true;
            p.lastID = checkID;
        }
        return false;
    }
    /**
     * Update the value of this observable. This method should only be called for observables that are in subscribing mode.
     * @param {Empty} updateID the UUID used to prevent the same observable from being updated twice;
     */
    update(updateID){
        // recusrive pull
        this.lastID = updateID;
        for(const p of this.publishers){
            if(p.mode === 0 && p.lastID !== updateID){
                p.update(updateID);
            }
        }
        // then update
        const o = {};
        if(this.fancy_calculate) for(const s in this.s_publishers){
            o[s] = this.s_publishers[s].value;
        }
        /** on my machine performance.now runs at 10 kHz */
        const t0 = performance.now();
        this.value = this.calculate(o);
        this.time_taken += performance.now() - t0;
        this.update_count++;
    }
    /**
     * Publish the value of this observable to its subscribers. This method should only be called for observables that are in publishing mode.
     * @param {Empty} updateID the UUID used to prevent the same observable from being updated twice;
     */
    publish(updateID){
        // update
        const o = {};
        if(this.fancy_calculate) for(const s in this.s_publishers){
            o[s] = this.s_publishers[s].value;
        }
        /** on my machine performance.now runs at 10 kHz */
        const t0 = performance.now();
        this.value = this.calculate(o);
        this.time_taken += performance.now() - t0;
        this.update_count++;
        // then recursive push
        this.lastID = updateID;
        for(const p of this.subscribers){
            if(p.mode === 1 && p.lastID !== updateID){
                p.publish(updateID);
            }
        }
    }
    get(){
        if(this.mode === 0){
            this.update({/* Look ma, I'm a UUID! */});
        }
        return this.value;
    }
    set(value){
        if(this.calculate){
            throw new TypeError("Cannot set the value of an observable that has a calculate method, since that implies that this observable is not a root observable.");
        }
        this.value = value;
        if(this.mode === 1){
            this.publish({/* Look ma, I'm a UUID! */});
        }
    }
}

/**
 * Class to optimize a graph / list of observers. The observers don't even all need to be connected. Isn't that cool? Yeah, it is really cool.
 */
class Optimizer{
    /**
     * @param {Observable[]} nodes the observables this to be optimized;
     * @param {number} [raw_updates_per_ms] a heuristic for how many nodes with simple functions can be updated in 1 ms; this value can be fine-tuned based on your specific project;
     * @param {number} [mspf] the amount of ms between cycles;
     */
    constructor(nodes, raw_updates_per_ms = 50000, mspf = 200){
        /** @member {Observable[]} */
        this.nodes = nodes;
        /** @member {number} */
        this.raw_updates_per_ms = raw_updates_per_ms;
        /** @member {number} */
        this.mspf = mspf;
    }
    /**
     * Used to end the current cycle, and optimize the observer graph.
     */
    cycle(){
        /**
         * Aggregate the `time_taken` property of every node so our heuristic is more effective.
         * @param {Observable} node
         */
        function aggregate_time_s(node){
            for(const p of node.publishers){
                p.time_taken += node.time_taken;
                aggregate_time_s(p);
            }
        }
        /**
         * @param {Observable} node
         */
        function aggregate_time_p(node){
            for(const p of node.subscribers){
                p.time_taken += node.time_taken;
                aggregate_time_p(p);
            }
        }
        for(const node of this.nodes){
            if(node.subscribers.length === 0){
                aggregate_time_s(node);
            }
            if(node.publishers.length === 0){
                aggregate_time_p(node);
            }
        }
        for(const node of this.nodes){
            node.effective_cost = node.update_count + (node.time_taken * this.raw_updates_per_ms);
        }
        // sort the nodes in descending order;
        // we do this because a publishing node can't subscribe to a subscribing node;
        // if we have a publishing node that we want to turn into a subscribing node, we need to turn any subscribers (that are also publishing nodes) that it has into subscribing nodes as well first;
        // now what's convenient, is those subscribers SHOULD already have higher effective costs; so going from the highest cost nodes to the lowest cost nodes means we should automatically resolve these isues;
        // however, just in case, we double check to make sure they actually are;
        // in some cases, running this function a few times in a row might give more optimal results; however, I think funning it once every "frame" is fine;
        this.nodes.sort((a,b) => b.effective_cost - a.effective_cost);
        for(const node of this.nodes){
            // unfortunately, this library is simple and only has one way of optimizing the graph, and that is changing the modes of observer nodes; forunately, this is a very useful optimization;
            // if subscribing node: is pull pressure > cost of upstream pushes? -> promote to publishing node;
            if(node.mode === 0 && node.effective_cost > node.publishers.reduce((a,b) => a + b.effective_cost, 0) && node.publishers.reduce((a,b) => a && b.mode === 1, true)){
                node.mode = 1;
            }
            // if publishing node: is push pressure > cost of downstream pulls? -> demote to subscribing node;
            if(node.mode === 1 && node.effective_cost > node.subscribers.reduce((a,b) => a + b.effective_cost, 0) && node.subscribers.reduce((a,b) => a && b.mode === 0, true)){
                node.mode = 0;
            }
            // imagine if everything in life was this simple; I think that's what heaven is like; oh wait, I almost forgot, most things in life almost are this simple!
            
            // reset for next cycle
            node.update_count = 0;
            node.time_taken = 0;
        }
    }
    /** Interval ID for the optimizer. Don't touch. */
    frame_id = -1;
    /** Start / resume optimizing. */
    start(){
        this.frame_id = setInterval(this.cycle.bind(this));
    }
    /** Stop / pause optimizing. */
    stop(){
        clearInterval(this.frame_id);
        this.frame_id = -1;
    }
}

/*
function n(){
    function m(){
        let t0 = performance.now();
        let t1 = performance.now();
        let i = 0;
        for(; i < 1e5 && t1 === t0; i++) t1 = performance.now();
        return [i, t1-t0];
    }
    const a = [0, 0];
    for(let i = 0; i < 100; i++){
        const b = m();
        a[0] += b[0];
        a[1] += b[1];
    }
    return a;
}
n();

function m(){
    let t0 = performance.now();
    let t1 = performance.now();
    let i = 0;
    for(; i < 1e6 && t1 === t0; i++) t1 = performance.now();
    return [i, t1-t0];
}
m();
*/


