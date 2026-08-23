/*
const settings = {
    input:  "./input.md",
    output: "./output.html",
};
*/

/*
I am redoing this project again, with even more abstraction. What fun!
*/

class FatalError extends Error{
    constructor(message, options){
        super(
            "= 🚨💥🌪️😨💀🔥🚨💥🌪️😨💀🔥 =\n" +
            "FatalError: " + message +
            "\n= 🚨💥🌪️😨💀🔥🚨💥🌪️😨💀🔥 =",
            options
        );
    }
};

class RecursionError extends Error{
    constructor(message, options){
        super(
            "RecursionError: " + message +
            "\n'A recursion error is a type of recursion error that happens when you throw a recursion error.'" +
            "\n- LAN Alimony Nombre.",
            options
        );
    }
};

class Match_Type{
    /** the constructor this match type is associated with; */
    type = function Missing_Constructor(){
        throw new TypeError("this Match_Type is missing its constructor;");
    };
    /** when `true`, indicates the parsing node should try to match the type of the input node directly; this is used in both leaf nodes and layer nodes; @type {boolean} */
    match_type = false;
    /** @type {Hydra_Action?} */
    on_enter = null;
    /** @type {Hydra_Action?} */
    on_succeed = null;
    /** @type {Hydra_Action?} */
    on_fail = null;
    /** @type {Hydra_Action?} */
    on_child_enter = null;
    /** @type {Hydra_Action?} */
    on_child_succeed = null;
    /** @type {Hydra_Action?} */
    on_child_fail = null;
    /** this action will run if any node (that shares an ancestor with this node but it not an ancestor of this node) fails; @type {Hydra_Action?} */
    on_sibling_fail = null;
}
class Hydra_Action{
    /** @type {Head_Action?} */
    input = null;
    /** @type {Head_Action?} */
    output = null;
    /** @type {Head_Action?} */
    parsing = null;
    /**
     * callback gets called before the Hydra_Action is called;
     * - when callback returns void, the rest of the Hydra_Action is executed normally;
     * - when callback returns a Hydra_Action, that is executed instead of the Hydra_Action containing callback; i.e. callback overrides the Hydra_Action (but only during this execution);
     * @type {Function?}
     */
    callback = null;
}
class Head_Action{
    /**
     * source should be exclusive to parsing;
     * - `Hnode.none`, `Hnode.enter`, `Hnode.succeed`, or `Hnode.fail`
     * @default Hnode.none @type {Symbol} 
     */
    source = Hnode.none;
    /**
     * target should be exclusive to parsing;
     * - `Hnode.none`, `Hnode.enter`, `Hnode.succeed`, or `Hnode.fail`
     * @default Hnode.none @type {Symbol} 
     */
    target = Hnode.none;
    /**
     * direction to move in;
     * - `Hnode.none`, `Hnode.up`, `Hnode.down`, or `Hnode.next`
     * @default Hnode.none @type {Symbol}
     */
    move = Hnode.none;
    /** used when `move == Hnode.down`; used as the argument for `Array.prototype.at`; */
    index = 0;
}
/** Hnode stands for Hydra node; */
class Hnode{
    static none    = Symbol("Hnode.none"   );
    static enter   = Symbol("Hnode.enter"  );
    static succeed = Symbol("Hnode.succeed");
    static fail    = Symbol("Hnode.fail"   );
    static up      = Symbol("Hnode.up"     );
    static down    = Symbol("Hnode.down"   );
    static next    = Symbol("Hnode.next"   );
    // JavaScript classes evaluate static and prototype items in order while creating the class, so this works;
    static Hnode_Action = new Set([
        Hnode.none,
        Hnode.enter,
        Hnode.succeed,
        Hnode.fail,
    ]);
    static Hmove = new Set([
        Hnode.none,
        Hnode.up,
        Hnode.down,
        Hnode.next,
    ]);
    type = "";
    start = 0;
    end = 0;
    /** @type {Hnode?} */
    parent = null;
    constructor(a_type, a_start, a_end){
        this.type = a_type;
        /** @type {Hnode[]} */
        this.children = [];
        this.start = a_start;
        this.end = a_end;
    }
    /** @param {Hnode[]} a_children children to add to this Hnode; */
    add(a_children){
        for(const child in a_children){
            this.children.push(child);
            child.parent = this;
        }
    }
}

class Tree{
    constructor(){
        /** @type {Hnode} */
        this.root = new Hnode("root");
        /** @type {Hnode} */
        this.current = this.root;
        this.indices = [];
    }
    up(){
        this.current = this.current.parent;
        this.indices.pop();
    }
    down(index = 0){
        this.current = this.current.children.at(index);
        this.indices.push(index);
    }
    next(){
        this.indices[this.indices.length - 1]++;
        this.current = this.current.parent.children[this.indices.at(-1)];
    }
    can_up(){
        return Boolean(this.current.parent);
    }
    can_down(index = 0){
        return Boolean(this.current.children.at(index));
    }
    can_next(){
        return Boolean(this.current.parent.children[this.indices.at(-1) + 1]);
    }
    /**
     * @param {Symbol} direction `Hnode.none`, `Hnode.up`, `Hnode.down`, or `Hnode.next`;
     * @param {Number} index the index for `Hnode.down` and `tree.down`;
     * @returns {Boolean} whether the operation succeeded;
     */
    move(direction, index = 0){
        if(!Hnode.Hmove.has(direction)){
            throw TypeError(`${direction} is not a valid direction;`);
        }
        // completely normal JS code; it only requires you to be familiar with like 4 different features of JS;
        switch(direction){
            case Hnode.none: return true;
            case Hnode.up: return this.can_up() ? (this.up(), true) : false;
            case Hnode.down: return this.can_down(index) ? (this.down(index), true) : false;
            case Hnode.next: return this.can_next() ? (this.next(), true) : false;
        }
    }
}



