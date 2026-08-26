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
        if(o.on_succeed) this.on_succeed = o.on_succeed;
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
        if(o.on_move_succeed) this.on_move_succeed = o.on_move_succeed;
        if(o.on_move_fail) this.on_move_fail = o.on_move_fail;
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
    /** Triggers if move action succeeds. This is triggered on the Match_Type containing this Head_Action. @type {Hydra_Action?} */
    on_move_succeed = null;
    /** Triggers if move action fails. This is triggered on the Match_Type containing this Head_Action. @type {Hydra_Action?} */
    on_move_fail = null;
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
    /** for root nodes; @type {Tree?} */
    tree = null;
    /** @type {Match_Type} */
    match_type = null;
    constructor(a_type){
        this.type = a_type;
        /** @type {Hnode[]} */
        this.children = [];
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
        this.root = new Hnode("root");
        this.root.tree = this;
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

class Language_Hnode extends Hnode{
    static type = "language";
    /** @type {Language_Hnode[]} */
    children = [];
    /** @type {Language_Hnode?} */
    parent = null;
    constructor(a_type = Language_Hnode.type){
        super(a_type);
    }
}
class Language_Tree extends Tree{
    /** @type {Language_Hnode} */
    root = null;
    /** @type {Language_Hnode} */
    current = null;
    /** @param {Hydra} a_hydra see Tree; */
    constructor(a_hydra){
        super(a_hydra);
    }
}

class Parsing_Hnode extends Hnode{
    static type = "parsing";
    /** @type {Parsing_Hnode[]} */
    children = [];
    /** @type {Parsing_Hnode?} */
    parent = null;
    constructor(a_language_node, a_type = Parsing_Hnode.type){
        super(a_type);
        /** @type {Language_Hnode} */
        this.language_node = a_language_node;
    }
}
class Parsing_Tree extends Tree{
    /** @type {Parsing_Hnode} */
    current = null;
    /**
     * @param {Language_Tree} a_language_tree the parsing tree uses this to automatically construct nodes;
     * @param {Hydra} a_hydra see Tree;
     */
    constructor(a_hydra, a_language_tree){
        super(a_hydra);
        this.language_tree = a_language_tree;
        /** @type {Parsing_Hnode} */
        this.root = new Parsing_Hnode(this.language_tree.root, this.root.type, this.root.start, this.root.end);
        
    }
    can_down(index = 0){
        return this.language_tree.can_down(index);
    }
    can_next(){
        return this.language_tree.can_next();
    }
    down(index = 0){
        if(super.can_down(index)){
            return super.down(index);
        }
        this.current.children[index] = new Parsing_Hnode(
            this.current.parent.language_node.children[index],
        );
        return super.down(index);
    }
    next(){
        if(super.can_next()){
            return super.next();
        }
        this.indices[this.indices.length - 1]++;
        this.current.parent.children[this.indices.at(-1)] = new Parsing_Hnode(
            this.current.parent.language_node.children[this.indices.at(-1)],
        );
        this.current = this.current.parent.children[this.indices.at(-1)];
    }
}

/*
things we should logically do in order to parse text:
* enter the root Language_Hnode;
* when we do this, we should see which Match_Type that Language_Hnode uses;
* we should then run the on_enter logic;
* the system should work like a stack, so if on_enter triggers an action, we should run that action;
* then if that Match_Type has its mactch_type == true, we should see if the current input node has the same type as the language node;
* and then run on_succeed or on_fail based on that;
* again, if more actions are triggered, we should run them immediately;
* logically, we should be all done after this, because the Match_Type is responsible for using the stack behavior to ensure that every node is processes and visited;
* also, it is not possible to enter a Match_Type, nor process one directly, because they are abstract;
* which makes everything confusing because Match_Type is the primary type and has the most important and basic information on it;

Now I am getting very confused by the difference between the parsing tree and the language tree.
* The language tree is actual language features and it technically a directed graph that can have loops.
* The parsing tree is basically a document telling us which language nodes succeeded and in what structure they did.
* So in a sense, the language tree is a type of input and the parsing tree is a type of output.
* When we backtrack, we can use the parsing tree to solve ambiguous situations in the language tree. Since again, the language tree is a graph not a tree. To clarify, a node in the language tree can have multiple parents (though we will only store one because we won't need to read it anyways). While a node in the parsing tree can only have one parent. So the parsing tree answers about what actually happened in the language tree.

Now that I've sorted this out, I am significantly more confused about how I'm supposed to implement any of this. And I have no idea whether I'm supposed to "process" language nodes or parsing nodes.

Okay I've decided that I'm going to process parsing nodes, and create them procedurally. So when you call down or next on a parsing node, it creates the respective node automatically. I should also make it so each node deletes itself when it fails, but only after we've processed all events for that node.

*/

class Hydra{
    constructor(){
        /** @type {Tree} */
        this.input = new Tree(this);
        /** @type {Tree} */
        this.output = new Tree(this);
        /** @type {Language_Tree} */
        this.language = new Language_Tree(this);
        /** @type {Parsing_Tree} */
        this.parsing = new Parsing_Tree(this, this.language);
    }
    /** @param {Parsing_Hnode} parsing_node it is pretty confusing, but this seems to be required; */
    process(parsing_node){
        // since we're using recursion / a stack of actions, perhaps it would make sense to add the action being executed as a second parameter;
        // okay yes, I'll just do that;
        const language_node = parsing_node.language_node;
        const match_type = language_node.match_type;
        // TODO: add on_move_fail and on_move_succeed;
        // TODO: if a parsing node fails (for any reason), it should be pruned automatically, by leaving a blank node;
        // * the blank node might be useful for more complex logic;
        // * we also need to rewind the input and output when the parsing node fails;
        // * so each parsing node needs to keep a list of the movements that it made;
        // * and then we need to have methods on Tree to undo movements;
        
    }
}

const M_Leaf = new Match_Type({
    match_type: true,
});
const M_Choice = new Match_Type({
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
    on_child_succeed: new Hydra_Action({
        input: new Head_Action({
            move: Hnode.next,
            // when we reach the end of the input tree, fail;
            on_move_fail: new Hydra_Action({
                // make this node succeed;
                parsing: new Head_Action({source: Hnode.fail}),
            }),
        }),
        parsing: new Head_Action({
            move: Hnode.next,
            // when we reach the end of the list, succeed;
            on_move_fail: new Hydra_Action({
                // make this node succeed;
                parsing: new Head_Action({source: Hnode.succeed}),
            }),
        }),
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
    // yeah this is pretty dumb, but it should be okay;
    on_child_fail: new Hydra_Action({
        parsing: new Head_Action({move: Hnode.fail}),
    }),
    on_child_succeed: new Hydra_Action({
        parsing: new Head_Action({move: Hnode.succeed}),
    }),
});
const M_Multiple_ONE_OR_MORE = new Match_Type({
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

class Leaf extends Language_Hnode{
    match_type = M_Leaf;
}
class Choice extends Language_Hnode{
    match_type = M_Choice;
}
class List extends Language_Hnode{
    match_type = M_List;
}
class Multiple extends Language_Hnode{
    had_one = false;
    static ONE = class ONE{
        match_type = M_Multiple_ONE;
    }
    static ONE_OR_MORE = class ONE_OR_MORE{
        match_type = M_Multiple_ONE_OR_MORE;
    }
    static ZERO_OR_ONE = class ZERO_OR_ONE{
        match_type = M_Multiple_ZERO_OR_ONE;
    }
    static ZERO_OR_MORE = class ZERO_OR_MORE{
        match_type = M_Multiple_ZERO_OR_MORE;
    }
}
class Layer extends Language_Hnode{
    match_type = M_Layer;
    entered = false;
}

