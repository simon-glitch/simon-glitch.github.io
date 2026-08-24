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
    constructor(o){
        this.match_type = Boolean(o.match_type);
        if(o.on_enter) this.on_enter = o.on_enter;
        if(o.on_fail) this.on_fail = o.on_fail;
        if(o.on_child_enter) this.on_child_enter = o.on_child_enter;
        if(o.on_child_succeed) this.on_child_succeed = o.on_child_succeed;
        if(o.on_child_fail) this.on_child_fail = o.on_child_fail;
        if(o.on_sibling_fail) this.on_sibling_fail = o.on_sibling_fail;
    }
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
    constructor(o){
        if(o.input) this.input = o.input;
        if(o.output) this.output = o.output;
        if(o.parsing) this.parsing = o.parsing;
        if(o.callback) this.callback = o.callback;
    }
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
    constructor(o){
        if(o.source) this.source = o.source;
        if(o.target) this.target = o.target;
        if(o.move) this.move = o.move;
        this.index = Number(o.index);
    }
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
    /** @type {Match_Type} */
    match_type = null;
    constructor(a_tree, a_type, a_start, a_end){
        /** @type {Tree} */
        this.tree = a_tree;
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
    /** @param {Hydra} a_hydra the hydra this tree is a part of (each tree is one of the hydra's heads); */
    constructor(a_hydra){
        /** @type {Hydra} */
        this.hydra = a_hydra;
        /** @type {Hnode} */
        this.root = new Hnode(this, "root");
        /** @type {Hnode} */
        this.current = this.root;
        /** @type {number[]} */
        this.indices = [];
    }
    /** @returns {number} the index the node was at; useful for going back down; */
    up(){
        this.current = this.current.parent;
        return this.indices.pop();
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
    /** @param {Head_Action} head_action */
    execute(head_action){
        const source = this.current;
        let target = source;
        if(head_action.move){
            const succeeded = this.move(head_action.move);
            if(!succeeded){
                throw new RangeError("Failed to move in Tree.", {cause: {source, head_action}});
            }
            target = this.current;
        }
        if(Hnode.Hnode_Action.has(head_action.source)){
            this.hydra.queue.push([source, head_action.source]);
        }
        if(Hnode.Hnode_Action.has(head_action.target)){
            this.hydra.queue.push([target, head_action.target]);
        }
        // default behavior: enter the target;
        if(!head_action.source && !head_action.target){
            this.hydra.queue.push([target, Hnode.enter]);
        }
    }
}
class Parsing_Tree extends Tree{
    /** @param {Hydra} a_hydra see Tree; */
    constructor(a_hydra){
        super(a_hydra);
    }
}
class Language_Tree extends Tree{
    /** @param {Hydra} a_hydra see Tree; */
    constructor(a_hydra){
        super(a_hydra);
    }
}

class Hydra{
    constructor(){
        /** @type {Tree} */
        this.input = new Tree(this);
        /** @type {Tree} */
        this.output = new Tree(this);
        /** @type {Parsing_Tree} */
        this.parsing = new Tree(this);
        /** @type {Language_Tree} */
        this.language = new Tree(this);
        /** the queue of Hnode_Actions to execute @type {[Hnode, Symbol][]} */
        this.queue = [];
    }
    /** @param {Hydra_Action} hydra_action */
    execute(hydra_action){
        if(hydra_action.input){
            this.input.execute(hydra_action.input);
        }
        if(hydra_action.output){
            this.output.execute(hydra_action.output);
        }
        if(hydra_action.parsing){
            this.parsing.execute(hydra_action.parsing);
        }
    }
    process(){
    // i am currently not implementing on_sibling_fail;
    for(const [hnode, hnode_action] of this.queue){
        let match_type = hnode.match_type;
        switch(hnode_action){
        case Hnode.enter:
            if(match_type.match_type){
                
            }
            if(match_type.on_enter){
                this.execute(match_type.on_enter);
            }
        break;
        case Hnode.succeed:
            if(match_type.on_succeed){
                this.execute(match_type.on_succeed);
            }
        break;
        case Hnode.fail:
            if(match_type.on_fail){
                this.execute(match_type.on_fail);
            }
        break;
        }
        // TODO: make sure to move to the parent node so it works correctly;
        if(hnode.parent){
        const index = hnode.parent.tree.up();
        match_type = hnode.parent.match_type;
        switch(hnode_action){
            case Hnode.enter:
                if(match_type.on_enter){
                    this.execute(match_type.on_child_enter);
                }
            break;
            case Hnode.succeed:
                if(match_type.on_succeed){
                    this.execute(match_type.on_child_succeed);
                }
            break;
            case Hnode.fail:
                if(match_type.on_fail){
                    this.execute(match_type.on_child_fail);
                }
            break;
        }
        hnode.parent.tree.down(index);
        }
    }
    }
}

class Leaf{
    
}
class Choice{
    
}
class List{
    
}
class Multiple{
    had_one = false;
    static ONE = class ONE{
        
    }
    static ONE_OR_MORE = class ONE_OR_MORE{
        
    }
    static ZERO_OR_ONE = class ZERO_OR_ONE{
        
    }
    static ZERO_OR_MORE = class ZERO_OR_MORE{
        
    }
}
class Layer{
    entered = false;
}

const M_Leaf = new Match_Type({
    type: Leaf,
    match_type: true,
});
const M_Choice = new Match_Type({
    type: Choice,
    on_child_fail: new Hydra_Action({
        // try the next choice;
        parsing: new Head_Action({
            move: Hnode.next,
            on_move_fail: new Hydra_Action({
                parsing: new Head_Action({source: Hnode.fail}),
            }),
        }),
    }),
    on_child_succeed: new Hydra_Action({
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
});
const M_List = new Match_Type({
    type: List,
    on_child_succeed: new Hydra_Action({
        input: new Head_Action({move: Hnode.next}),
    }),
    // when we reach the end of the list;
    on_fail: new Hydra_Action({
        // make this node succeed;
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
});
// all of this shenanigans is to make sure a multiple with one, or (one or more), fails when zero are matched;
const Multiple_Fail = new Hydra_Action({
    parsing: new Head_Action({source: Hnode.fail}),
});
const Multiple_Succeed = new Hydra_Action({
    parsing: new Head_Action({source: Hnode.succeed}),
});
// the four types of multiples are separated;
const M_Multiple_ONE = new Match_Type({
    type: Multiple.ONE,
    // yeah this is pretty dumb, but it should be okay;
    on_child_fail: new Hydra_Action({
        parsing: new Head_Action({move: Hnode.fail}),
    }),
    on_child_succeed: new Hydra_Action({
        parsing: new Head_Action({move: Hnode.succeed}),
    }),
});
const M_Multiple_ONE_OR_MORE = new Match_Type({
    type: Multiple.ONE_OR_MORE,
    on_child_fail: new Hydra_Action({
        /** @param {Multiple} node */
        callback(node){
            return node.had_one ? Multiple_Succeed : Multiple_Fail;
        },
    }),
    on_child_succeed: new Hydra_Action({
        input: new Head_Action({move: Hnode.next}),
        // loop by entering this node again;
        parsing: new Head_Action({source: Hnode.enter}),
        /** @param {Multiple} node */
        callback(node){
            node.had_one = true;
        },
    }),
});
const M_Multiple_ZERO_OR_ONE = new Match_Type({
    type: Multiple.ZERO_OR_ONE,
    on_child_fail: new Hydra_Action({
        // zero or one always succeeds;
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
    on_child_succeed: new Hydra_Action({
        input: new Head_Action({move: Hnode.next}),
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
});
const M_Multiple_ZERO_OR_MORE = new Match_Type({
    type: Multiple.ZERO_OR_MORE,
    on_child_fail: new Hydra_Action({
        // zero or more always succeeds;
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
    on_child_succeed: new Hydra_Action({
        input: new Head_Action({move: Hnode.next}),
        // loop by entering this node again;
        parsing: new Head_Action({source: Hnode.enter}),
    }),
});
const M_Layer_Done = new Hydra_Action({
    input: new Head_Action({move: Hnode.up}),
    parsing: new Head_Action({move: Hnode.up}),
});
const M_Layer = new Match_Type({
    type: Layer,
    match_type: true,
    // match type will cause this node to automatically succeed;
    // we can catch that success and intercept it before parent nodes realize it;
    on_succeed: new Hydra_Action({
        input: new Head_Action({move: Hnode.down}),
        parsing: new Head_Action({move: Hnode.down}),
        // this jank setup allows the node to succeed multiple times, so we better prevent infinite loops;
        /** @param {Layer} node */
        callback(node){
            if(node.entered) return M_Layer_Done;
            node.entered = true;
        },
    }),
    // simply do what the child does;
    // M_Layer_Done will move the input head up;
    on_child_fail: new Hydra_Action({
        parsing: new Head_Action({source: Hnode.fail}),
    }),
    on_child_succeed: new Hydra_Action({
        parsing: new Head_Action({source: Hnode.succeed}),
    }),
});



