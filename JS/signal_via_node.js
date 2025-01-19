const VALUE = Symbol("Signal.value");
/**
  * @param {Event} e a tick event;
**/
const tick = function(e){
    // ignore bubbling
    if(e.eventPhase == Event.BUBBLING_PHASE)
        return;
    for(let i = 0; i < this.children.length; i++){
        this.children[i].dispatchEvent(
        new Event(
        "tick",
        {
            value: this[VALUE],
            arg: arg,
        }));
    }
};
/**
  * A signal, just like what many libraries provide. This signal uses event listeners, making it very inefficient. I need to figure out how to prevent events from bubbling by default.
  * Hm... `Node` is an illegal constructor.
**/
const Signal = class extends Node{
    get value(){
        return this[VALUE];
    }
    set value(arg){
        if(this[VALUE] != arg)
            this.dispatchEvent(
            new Event(
            "tick",
            {
                value: this[VALUE],
                arg: arg,
            }));
        return (this[VALUE] = arg);
    }
    constructor(){
        super();
    }
}
/**
  * Make an object conform to the Signal type by mutating it.
  * - (adds all methods from signal's prototype to the object)
  * @param {object} obj object to mutate
  * @returns {object} the mutated object
**/
Signal.conform = function(obj){
    const o = Object.getOwnPropertyDescriptor(
        Signal.prototype, "value"
    );
    Object.defineProperty(obj, "value", o);
    return obj;
};
