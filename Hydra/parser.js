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

class Call_Node{
    type = "";
    constructor(a_obj, a_fn, a_args){
        /** @type {Call_Node[]} */
        this.children = [];
        /** @type {any} */
        this.obj = a_obj;
        /** @type {Function} */
        this.fn = a_fn;
        /** @type {any[]} */
        this.args = a_args;
    }
    /** @param {Call_Node[]} a_children children to add to this Call_Node; */
    add(...a_children){
        for(const child of a_children){
            this.children.push(child);
            child.parent = this;
        }
    }
}
/**
 * If you thought 4 kinds of trees was enough, you thought wrong. We forgot everyone's favorite kind of tree. The call tree. It's basically a history of every state the call stack has ever been in.
 */
class Call_Tree{
    constructor(){
        /** @type {Call_Node} */
        this.root = new Call_Node("root");
        this.root.tree = this;
        /** @type {Call_Node} */
        this.current = this.root;
        /** @type {number[]} */
        this.indices = [];
    }
    up(){
        this.current = this.current.parent;
    }
    down(obj, fn, ...args){
        const node = new Call_Node(obj, fn, args);
        this.current.add(node);
        this.current = node;
    }
}

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
    static Hnode_Action_E = new Set([
        Hnode.enter,
        Hnode.succeed,
        Hnode.fail,
    ]);
    static Hmove_E = new Set([
        Hnode.up,
        Hnode.down,
        Hnode.next,
    ]);
    static Hnode_Action = new Set([Hnode.none, ...Hnode.Hnode_Action_E]);
    static Hmove = new Set([Hnode.none, ...Hnode.Hmove_E]);
    type = "";
    start = 0;
    end = 0;
    /** @type {Hnode?} */
    parent = null;
    /** for root nodes; @type {Tree?} */
    tree = null;
    constructor(a_type){
        this.type = a_type;
        /** @type {Hnode[]} */
        this.children = [];
    }
    /** @param {Hnode[]} a_children children to add to this Hnode; */
    add(...a_children){
        for(const child of a_children){
            this.children.push(child);
            child.parent = this;
        }
    }
    load(o){
        if(o.type) this.type = o.type;
        if(o.children) this.add(...o.children.map(
            c => (c instanceof this.constructor ? c : (new this.constructor()).load(c))
        ));
        if(!isNaN(o.start)) this.start = Number(o.start);
        if(!isNaN(o.end)) this.end = Number(o.end);
        return this;
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
    prev(){
        this.indices[this.indices.length - 1]--;
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
            case Hnode.up  : return this.can_up() ? (this.up(), true) : false;
            case Hnode.down: return this.can_down(index) ? (this.down(index), true) : false;
            case Hnode.next: return this.can_next() ? (this.next(), true) : false;
        }
    }
    /**
     * @param {Head_Action} head_action
     * @param {Parsing_Hnode} parsing_node
     */
    execute(head_action, parsing_node){
        const source = this.current;
        let target = source;
        if(head_action.move){
            // I have decided to inline this.move, in order to get the index from this.up;
            // I tried doing it with return values, but I thought that was too jank;
            if(!Hnode.Hmove.has(head_action.move)){
                throw TypeError(`${head_action.move} is not a valid direction;`);
            }
            let succeeded = true;
            switch(head_action.move){
                case Hnode.none: break;
                case Hnode.up  : succeeded = (this.can_up() ? (head_action.index = this.up(), true) : false); break;
                case Hnode.down: succeeded = (this.can_down(head_action.index) ? (this.down(head_action.index), true) : false); break;
                case Hnode.next: succeeded = (this.can_next() ? (this.next(), true) : false); break;
            }
            
            if(succeeded && Hnode.Hnode_Action_E.has(head_action.on_move_succeed)){
                console.log("on_move_succeed");
                this.hydra.execute(head_action.on_move_succeed, parsing_node);
            }
            if(!succeeded){
                if(!Hnode.Hnode_Action_E.has(head_action.on_move_fail)) throw new RangeError("Failed to move in Tree.", {cause: {source, head_action}});
                console.log("on_move_fail");
                this.hydra.execute(head_action.on_move_fail, parsing_node);
            }
            target = this.current;
        }
        if(Hnode.Hnode_Action_E.has(head_action.source)){
            this.hydra.node_action(head_action.source, source);
        }
        if(Hnode.Hnode_Action_E.has(head_action.target)){
            this.hydra.node_action(head_action.target, target);
        }
        // default behavior: enter the target;
        if(!head_action.source && !head_action.target){
            this.hydra.node_action(Hnode.enter, target);
        }
    }
    /**
     * Undo the movement in the head_action, but not anything else.
     * @param {Head_Action} head_action
     */
    undo(head_action){
        if(!head_action.move) return;
        
        switch(head_action.move){
            case Hnode.none: break;
            case Hnode.up  : this.down(head_action.index); break;
            case Hnode.down: this.up(); break;
            case Hnode.next: this.prev(); break;
        }
    }
    load(o){
        if(o){
            console.log("this", this);
            if(o.root) this.root.load(o.root);
            if(o.indices) this.indices = o.indices;
        }
        return this;
    }
}

class Language_Hnode extends Hnode{
    static type = "language";
    /** @type {string | undefined} */
    parsing_type = undefined;
    /** @type {Match_Type?} */
    match_type = null;
    /** @type {Language_Hnode[]} */
    children = [];
    /** @type {Language_Hnode?} */
    parent = null;
    /** type for new node to add to output tree; the node is added as a child of output.current; @type {string | ((input: Hnode) => string) | undefined} */
    output_type = undefined;
    /** Head_Action for the output tree; executed BEFORE the new node is added; @type {Head_Action?} */
    output_action = null;
    constructor(a_type = Language_Hnode.type){
        super(a_type);
    }
    load(o){
        super.load(o);
        if(o.parsing_type) this.parsing_type = o.parsing_type;
        if(o.match_type) this.match_type = new Match_Type(o.match_type);
        if(o.output_type !== undefined) this.output_type = (
            typeof o.output_type === "function" ?
            o.output_type :
            String(o.output_type)
        );
        if(o.output_action) this.output_action = new Head_Action(o.output_action);
        return this;
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
        this.root = new Language_Hnode("root");
        this.current = this.root;
        console.log("root?", this.root);
        console.log("current?", this.current);
    }
}

/** Class to store information about created nodes. */
class Node_Creation{
    /** index of the created node within the parent's children list; */
    index = 0;
    constructor(a_parent, a_index){
        /** index of the created node within the parent's children list; @type {Hnode} */
        this.parent = a_parent;
        this.index = a_index;
    }
}

class Parsing_Hnode extends Hnode{
    static type = "parsing";
    /** @type {Symbol} `Hnode.none`, `Hnode.enter`, `Hnode.succeed`, or `Hnode.fail`; starts as `Hnode.none`; */
    status = Hnode.none;
    /** @type {Parsing_Hnode[]} */
    children = [];
    /** @type {Parsing_Hnode?} */
    parent = null;
    constructor(a_language_node, a_type){
        super(a_type ?? a_language_node.parsing_type ?? Parsing_Hnode.type);
        /** @type {Language_Hnode} */
        this.language_node = a_language_node;
    }
}
const BLANK_NODE = new Parsing_Hnode("BLANK");
class Parsing_Tree extends Tree{
    /** @type {Parsing_Hnode} */
    root = null;
    /** @type {Parsing_Hnode} */
    current = null;
    /**
     * @param {Language_Tree} a_language_tree the parsing tree uses this to automatically construct nodes;
     * @param {Hydra} a_hydra see Tree;
     */
    constructor(a_hydra, a_language_tree){
        super(a_hydra);
        this.language_tree = a_language_tree;
        this.root = new Parsing_Hnode(this.language_tree.root, "root");
        this.current = this.root;
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
        if(!this.hydra.history.has(this)){
            this.hydra.history.set(this, []);
        }
        this.hydra.history.get(this).push(new Node_Creation(this.current, index));
        const node = new Parsing_Hnode(
            this.current.language_node.children[index],
        );
        this.current.children[index] = node;
        node.parent = this.current;
        return super.down(index);
    }
    next(){
        if(super.can_next()){
            return super.next();
        }
        const index = this.indices.at(-1) + 1;
        this.indices[this.indices.length - 1] = index;
        if(!this.hydra.history.has(this)){
            this.hydra.history.set(this, []);
        }
        this.hydra.history.get(this).push(new Node_Creation(this.current.parent, index));
        const node = new Parsing_Hnode(
            this.current.parent.language_node.children[index],
        );
        this.current.parent.children[index] = node;
        node.parent = this.current.parent;
        this.current = this.current.parent.children[index];
    }
}

class Hydra{
    constructor(o){
        /** @type {Tree} */
        this.input = new Tree(this);
        /** @type {Tree} */
        this.output = new Tree(this);
        /** @type {Language_Tree} */
        this.language = new Language_Tree(this);
        /** @type {Parsing_Tree} */
        this.parsing = new Parsing_Tree(this, this.language);
        /** The history of what actions each parsing node has triggered. This is used to undo movements in the trees. @type {Map<Parsing_Hnode, Hydra_Action[]>} */
        this.history = new Map();
        if(o) this.load(o);
    }
    load(o){
        if(o.input) this.input.load(o.input);
        if(o.output) this.output.load(o.output);
        if(o.language) this.language.load(o.language);
    }
    /**
     * @param {Hydra_Action} hydra_action
     * @param {Parsing_Hnode} parsing_node
     */
    execute(hydra_action, parsing_node){
        if(!hydra_action) return;
        if(!this.history.has(parsing_node)){
            this.history.set(parsing_node, []);
        }
        this.history.get(parsing_node).push(hydra_action);
        
        if(hydra_action.input)
            this.input.execute(hydra_action.input, parsing_node);
        if(hydra_action.output)
            this.output.execute(hydra_action.output, parsing_node);
        if(hydra_action.parsing)
            this.parsing.execute(hydra_action.parsing, parsing_node);
    }
    /**
     * Undo the movements in the hydra_action, but not anything else.
     * @param {Hydra_Action} hydra_action
     */
    undo(hydra_action){
        if(hydra_action.input)
            this.input.undo(hydra_action.input);
        if(hydra_action.output)
            this.output.undo(hydra_action.output);
        if(hydra_action.parsing)
            this.parsing.undo(hydra_action.parsing);
    }
    /** @param {Parsing_Hnode} parsing_node it is pretty confusing, but this seems to be required; */
    enter(parsing_node){
        const language_node = parsing_node.language_node;
        const match_type = language_node.match_type;
        parsing_node.status = Hnode.enter;
        this.execute(match_type.on_enter, parsing_node);
        // TODO: add logic for matching the input type and language node type is match_type.match_type == true;
        if(match_type.match_type){
            if(language_node.type === this.input.current.type){
                // I am using node_action here so the "undo movements on fail logic" will be properly handled;
                // well or at least I think I should be doing that, but I haven't run the code yet,
                // so it is really a mystery what I should or should not do;
                this.node_action(Hnode.succeed, parsing_node);
            }
            else{
                this.node_action(Hnode.fail, parsing_node)
            }
        }
        // um, does this cover everything?
    }
    /**
     * TODO: implement succeed logic;
     * @param {Parsing_Hnode} parsing_node ;
     */
    succeed(parsing_node){
        const language_node = parsing_node.language_node;
        const match_type = language_node.match_type;
        parsing_node.status = Hnode.succeed;
        this.execute(match_type.on_succeed, parsing_node);
        // I have no idea what else should be here; perhaps this should just do nothing;
    }
    /**
     * TODO: implement fail logic;
     * @param {Parsing_Hnode} parsing_node ;
     */
    fail(parsing_node){
        const language_node = parsing_node.language_node;
        const match_type = language_node.match_type;
        parsing_node.status = Hnode.fail;
        this.execute(match_type.on_fail, parsing_node);
    }
    /**
     * This should be exclusive to parsing nodes.
     * @param {Symbol} node_action `Hnode.enter`, `Hnode.succeed`, or `Hnode.fail`;
     * @param {Parsing_Hnode} parsing_node the node the action is being executed on;
     */
    node_action(node_action, parsing_node){
        if(node_action == Hnode.none){
            throw new TypeError("Cannot execute action Hnode.none on an Hnode. You should specify an actual action.");
        }
        if(node_action == Hnode.enter){
            this.enter(parsing_node);
        }
        if(node_action == Hnode.succeed){
            this.succeed(parsing_node);
        }
        if(node_action == Hnode.fail){
            this.fail(parsing_node);
        }
        if(parsing_node.status === Hnode.succeed){
            const ln = parsing_node.language_node;
            if(ln.output_type){
                const type = (typeof ln.output_type === "function") ? ln.output_type(this.input.current) : String(ln.output_type);
                if(ln.output_action) this.output.execute(ln.output_action);
                this.history.get(parsing_node).push(new Node_Creation(this.output.current, this.output.current.length));
                this.output.current.add(new Hnode(type));
            }
        }
        if(parsing_node.status === Hnode.fail){
            for(const hydra_action of this.history.get(parsing_node).toReversed()){
                this.undo(hydra_action);
            }
        }
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
    constructor(a_type){
        super(a_type);
        this.parsing_type = "parsing_leaf";
    }
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

const call_tree = new Call_Tree();

// the Call_Tree_ification beam;
const method_names = [
    "add",
    "load",
    "up",
    "down",
    "next",
    "prev",
    "can_up",
    "can_down",
    "can_next",
    "move",
    "execute",
    "undo",
    "enter",
    "succeed",
    "fail",
    "node_action",
];
const call_tree_ified = Symbol("call_tree_ified");
function call_tree_ify(obj){
    function add(prop){
        const value = obj[prop];
        if(typeof value !== "function") return;
        if(obj[prop][call_tree_ified]) return;
        obj[prop] = function(){
            // console.log("this", this);
            call_tree.down(this, value, arguments);
            const res = value.apply(this, arguments);
            call_tree.up();
            return res;
        }
        obj[prop][call_tree_ified] = true;
        obj[prop].toString = function(){
            return "Call_Tree_ified " + value;
        }
    }
    for(const prop of method_names){
        add(prop);
    }
}
function call_tree_ify_a(cs){
    for(const c of cs){
        call_tree_ify(c.prototype);
    }
}
call_tree_ify_a([
    Match_Type,
    Hydra_Action,
    Head_Action,
    Hnode,
    Tree,
    Language_Hnode,
    Language_Tree,
    Node_Creation,
    Parsing_Hnode,
    Parsing_Tree,
    Hydra,
    Leaf,
    Choice,
    List,
    Multiple,
    Layer,
]);



