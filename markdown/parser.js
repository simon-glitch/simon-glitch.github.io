/*
import fs from "Anode:fs/promises";

const settings = {
    input:  "./input.md",
    output: "./output.html",
};
*/

/*
I am redoing this project with more abstraction. My general approach was correct though - multiple layers of context-sensitive parsing. Lexing is the first layer of content-based parsing. I'll use it to crab code blocks and inline code since those don't combine with the other styles. And lists, indents, and comments too.
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
            "\n- Leo Alimony LAR.",
            options
        );
    }
};

/** Node for the AST. */
class Anode{
    /** The index within the source text where this anode starts. */
    idx_start = 0;
    /** The index within the source text where this anode ends. */
    idx_end = 0;
    /** String describing the type or contents of the anode. */
    name = "";
    /** @param {string} name value for `anode.name`; */
    constructor(name){
        this.name = name;
        /** Children of this node within the tree. @type {Anode[]} */
        this.children = [];
    }
    /** indentation added at each recursive level in my toString function; */
    indent = "  ";
    toString(stringify = {}, indent = ""){
        if(stringify[this.name]){
            return stringify[this.name](this, indent);
        }
        let s = `${this.name}{`;
        let prev = false;
        for(const c of this.children){
            const curr = !stringify[c.name];
            if(prev || curr){
                s += `\n${indent + this.indent}`;
            }
            prev = curr;
            s += c.toString(stringify, indent + this.indent);
        }
        if(this.children.length > 1){
            s += `\n${indent}`;
        }
        s += "}";
        return s;
    }
}

/** Minor class for slightly better debugging. */
class Failed_Options_Level extends Object{
    toString(){
        return "Failed Options {" + Object.getOwnPropertyNames(this).map(
            name => `${name}: ${this[name]}`
        ).join(", ") + "}";
    }
}

class AST{
    /** For debugging. @type {Object<string, (anode: Anode, indent: string) => string>} */
    stringify = {};
    /** The previous parsing layer (i.e. characters, lexing, etc.). @type {AST?} */
    prev_ast = null;
    /** To prevent infinite loops in parsing. @type {Map<Match_Expression, number[][]} */
    frame = null;
    /**
     * Constructs an Abstract Syntax Tree builder.
     * @param {string} source value for `ast.sorce`;
     */
    constructor(source){
        /** The text that this AST is parsing. @type {string} */
        this.source = source;
        /** The text output of this AST. @type {string} */
        this.output = "";
        /** @type {boolean[]} */
        this.is_option = [];
        /** @type {Failed_Options_Level[]} */
        this.failed_options = [new Failed_Options_Level()];
        /** @type {Anode} @private */
        this.root = new Anode("root");
        /** Do not write to this Anode externally. Use the methods of AST instead. @type {Anode} */
        this.current = this.root;
        /** @type {Anode[]} */
        this.stack = [this.root];
        /** @type {Number[]} @private */
        this.i = [0];
        /** Whether `AST.remove` removed all of the children of `prev`. @type {Boolean} */
        this.removed_all = false;
    }
    /**
     * Navigate up to the parent of this.current.
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    up(){
        if(this.stack.length === 1) return false;
        this.i.pop();
        this.stack.pop();
        this.is_option.pop();
        this.current = this.stack[this.stack.length - 1];
        return true;
    }
    /**
     * Navigate down to the first/last child of `this.current`. By default, this method navigates to the first child.
     * @param {Boolean} last whether to navigate to the last child;
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    down(last){
        if(this.current.children.length === 0) return false;
        const i = last ? (this.current.children.length - 1) : 0;
        this.current = this.current.children[i];
        this.i.push(i);
        this.stack.push(this.current);
        this.is_option.push(false);
        return true;
    }
    /**
     * Navigate to the next Anode in this.current.
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    next(){
        const prev = this.stack.at(-2);
        if(!prev) return false;
        const i = ++this.i[this.i.length - 1];
        if(i >= prev.children.length) return false;
        this.current = prev.children[i];
        return true;
    }
    /**
     * Create and add an Anode to the tree.
     * @param {String} type the type of the new Anode;
     */
    add(name){
        this.current.children.push(new Anode(name));
    }
    /**
     * Add an Anode to the tree.
     * @param {Anode} node the Anode;
     */
    add_node(node){
        this.current.children.push(node);
    }
    /**
     * Remove the selected child of the this.current Anode.
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    remove(){
        const prev = this.stack[this.stack.length - 2];
        if(!prev) return false;
        const i = this.i[this.i.length - 1];
        if(i >= prev.children.length) return false;
        prev.children.splice(i, 1);
        this.current = prev.children[i];
        this.removed_all = !this.current;
        if(this.removed_all) this.up();
        return true;
    }
    toString(stringify){
        return this.root.toString(stringify, "");
    }
    /**
     * Create a branching path in how the syntax is parsed.
     * - this branch refers to the branch created by one call of `option`;
     * @param {string} name the name of the node at the root of the branch; if this branch succeeds, children of the node will become children of the last non-option node, in order to help flatten the tree;
     * @param {Function} callback this function gets called "during" this branch of the branching path; it is responsible for defining the logic of this branch;
     */
    option(name, callback){
        this.add(name);
        this.down(true);
        this.is_option[this.is_option.length - 1] = true;
        const f = new Failed_Options_Level();
        f[name] = false;
        // __proto__ handles scope for us for free; or presumably in an optimized manner;
        f.__proto__ = this.failed_options.at(-1);
        this.failed_options.push(f);
        callback.apply(this);
        if(!f[name]){
            const option = this.current;
            this.up();
            this.remove();
            if(!this.removed_all){
                throw FatalError("(after successful option) The option node had a sibling. Options are supposed to be single children. That definitely makes sense out of context XD."); // oh no I said single but I meant only XD.
            }
            this.current.children.push(...option.children);
        }
    }
    /**
     * Fail the current branch of the branching path.
     */
    fail(){
        if(this.failed_options.length <= 1){
            throw RangeError("There is currently no option on the stack to fail.");
        }
        while(!this.is_option.at(-1)){
            this.remove();
            if(!this.removed_all) this.up();
        }
        if(!this.is_option){
            throw FatalError("AST deleted everything on fail. This error is especially fatal because it most surely means something is wrong with Simon.s code specifically.");
        }
        const name = this.current.name;
        this.remove();
        if(!this.removed_all){
            throw FatalError("(after failed option) The option node had a sibling. Options are supposed to be single children. That definitely makes sense out of context XD."); // oh no I said single but I meant only XD.
        }
        this.failed_options.pop();
        this.failed_options.at(-1)[name] = true;
    }
    /**
     * Grab a sequence / tree of anodes from the ast.
     * @param {Expression} exp similar ot a regular expression, but for anodes;
     */
    eat(exp){
        // create a new AST just for matching, and set its root to current;
        const m_ast = new AST("");
        m_ast.root = this.prev_ast.stack.at(-2);
        m_ast.current = this.prev_ast.current;
        m_ast.stack = [m_ast.root, m_ast.current];
        m_ast.i = [this.prev_ast.i.at(-2), this.prev_ast.i.at(-1)];
        m_ast.frame = new Map();
        const m = new Match_Expression(m_ast, exp, true);
        return m;
    }
    /** For debugging. */
    toString(){
        // return "Infinite loop?";
        return (
            this.root.toString(this.stringify) +
            "\n[\n  " +
            this.failed_options.map(f => "" + f)
            .join("\n  ") + "\n]"
        );
    }
}

/** A type of regular expression designed to work with anodes / ASTs. */
class Expression{
    /** Whether this is a leaf expression, i.e. it just matches a single node. */
    is_leaf = false;
    /** What this expression matches. If it is a leaf node, it matches any string within the set. @type {Set<string> | List | Multiple | Choice | Layer} */
    match = new Set();
    constructor(match){
        if(typeof match === "string"){
            this.is_leaf = true;
            this.match = new Set(match);
        }
        else if(match instanceof Set){
            this.is_leaf = true;
            this.match = match;
        }
        else if(match[Symbol.iterator]){
            this.is_leaf = true;
            this.match = new Set(match);
        }
        // otherwise we assume it is one of the valid expression types; notice how none of them are subclasses of Expression; this is intended;
        else{
            this.match = match;
        }
    }
}

/** Define a list of expressions, where the first one must be matched, then the second one, then the third, etc. */
class List{
    /** @param {Expression[]} items the list of expressions to match; */
    constructor(items){
        /** @type {Expression[]} */
        this.items = items;
    }
}

/** Define an expression's logic being repeated. */
class Multiple{
    static ZERO_OR_ONE = Symbol("Regular.ZERO_OR_ONE");
    static ONE = Symbol("Regular.ONE");
    static ZERO_OR_MORE = Symbol("Regular.ZERO_OR_MORE");
    static ONE_OR_MORE = Symbol("Regular.ONE_OR_MORE");
    /** which expression is matched on each repetition; @type {Expression} */
    exp = null;
    /** how many times to match the expression @type {Symbol} */
    count = Multiple.ONE;
    constructor(exp, count){
        this.exp = exp;
        this.count = count;
    }
}

/** Define a list of choices for an expression. */
class Choice{
    /** @param {Expression[]} choices the list of choices; the expression will attempt to match any one of the choices, and will fail only if no choice matches; */
    constructor(choices){
        /** @type {Expression[]} */
        this.choices = choices;
    }
}

/** Defines a way to match a node based on its children. i.e. this makes the matcher recursively enter the node and continue matching in there. */
class Layer{
    /** A set of strings, for which anode names are valid, for the anode that will be entered. @type {Set<string>} */
    name = new Set();
    /** An expression defining what the content should match. @type {Expression} */
    content = null;
    /** Whether the expression can match only some of the children of node. If this is true, it can leave the node partially matched, which is useful for handling transitions. This defaults to false because it is more intuitive to match the entire node strictly. */
    partial = false;
    constructor(name, content, partial){
        // fun fact: every time I use ternary, it's pretty random which exact syntax I'll actually use;
        this.name = (typeof name === "string")
        ? new Set([name]) :
        ((!(name instanceof Set)) && name[Symbol.iterator])
        ? new Set(name) : name;
        this.content = content;
        this.partial = Boolean(partial);
    }
}

function a_little_smarter(char){
    if(char === "\n") return "newline";
    if(char === " ") return "space";
    return char;
}

let depth = 0;
let max_depth = 12;
class Match_Expression{
    /** in a list or choice, which step of the match the matcher is on; */
    match_idx = 0;
    /** whether the match succeeded; */
    succeeded = true;
    /** whether the AST reached the end of its children list; */
    ast_has_no_f____s_left_to_give = false;
    /** the AST being matched in; @type {AST} */
    ast = null;
    /** the anode of this matcher; this is a different entity than the one in the AST; @type {Anode} */
    node = null;
    /**
     * Match an expression, with recursive business logic split across five classes.
     * @param {AST} ast the AST being matched in;
     * @param {Expression | List | Multiple | Choice | Layer} exp he expression to match;
     * @param {boolean} do_match whether to call `this.match`, duh;
     */
    constructor(ast, exp, do_match){
        this.ast = ast;
        this.node = new Anode("match");
        if(do_match) this.match(exp);
    } // fun fact: you don't need super if you don't specify a constructor;
    match(exp){
        console.log("? 1", this, exp);
        if(exp instanceof Expression && exp.is_leaf){
            console.log("leaf handling", this, exp);
            // yippee it's a leaf node!
            if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                this.ast_has_no_f____s_left_to_give = true;
                this.succeeded = false;
                return;
            }
            if(exp.match.has(this.ast.current.name)){
                console.log("grabbing character: ", a_little_smarter(this.ast.current.name));
                this.node.children.push(new Anode(this.ast.current.name));
                // console.log("ast.next;");
                this.ast.next();
                // console.log("current", this.ast.current);
                this.succeeded = true;
            }
            else{
                console.log("character does not match: ", a_little_smarter(this.ast.current.name));
                this.succeeded = false;
            }
            console.log((this.succeeded ? "success" : "failure") + " in leaf");
            // we'll check twice just to be extra sure;
            // well i'm pretty sure this code is really really important;
            // console.log("what?", this.ast.i.slice(), this.ast.stack.slice());
            if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                this.ast_has_no_f____s_left_to_give = true;
            }
            return;
        }
        // console.log("? 2", this, exp);
        depth++;
        if(depth > max_depth){
            console.log(this);
            throw new Error("Max depth reached");
        }
        // console.log("? 3", this, exp);
        const f = this.ast.i.slice();
        if(!this.ast.frame.has(this)){
            this.ast.frame.set(this, []);
        }
        // console.log("? 4", this, exp);
        // check if the current indices are in the frame;
        if(this.ast.frame.get(this).findIndex(af => af.forEach((v,i) => v === f[i])) !== -1){
            // if so, fail;
            console.log("recursion prevention?");
            this.succeeded = false;
            depth--;
            return;
        }
        // console.log("? 5", this, exp);
        this.ast.frame.get(this).push(f);
        // console.log("? 6", this, exp);
        let m;
        if(exp instanceof Expression){
            if(exp === exp.match){
                throw new RecursionError("Expression contains itself directly. That is definitely unsafe recursion, lad.");
            }
            m = new Match_Expression(this.ast, exp.match, true);
        }
        // console.log("? 7", this, exp);
        if(exp instanceof List){
            m = new Match_List(this.ast, exp);
        }
        // console.log("? 8", this, exp);
        if(exp instanceof Multiple){
            m = new Match_Multiple(this.ast, exp);
        }
        if(exp instanceof Choice){
            m = new Match_Choice(this.ast, exp);
        }
        // console.log("? 10", this, exp);
        if(exp instanceof Layer){
            m = new Match_Layer(this.ast, exp);
        }
        if(!m){
            throw FatalError("Something that was not an expression was put somewhere where an expression belongs. Or Simon really messed up his logic.");
        }
        // stupid complicated unintuitive frankly ridiculous Layer partial logic;
        if(!(exp instanceof Layer)){
            this.ast_has_no_f____s_left_to_give = m.ast_has_no_f____s_left_to_give;
        }
        // console.log("? 11", this, exp);
        if(m.succeeded){
            this.node.children.push(...m.node.children);
        }
        else{
            this.succeeded = false;
        }
        depth--;
    }
}

class Match_List extends Match_Expression{
    constructor(ast, exp){
        super(ast, exp);
        this.match(exp);
    }
    /**
     * @param {List} exp match definition;
     */
    match(exp){
        // console.log("list handling", this, exp);
        for(const a_exp of exp.items){
            super.match(a_exp);
            
            // okay this is REALLY jank;
            if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                this.ast_has_no_f____s_left_to_give = true;
            }
            else{
                this.ast.next();
                if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                    this.ast_has_no_f____s_left_to_give = true;
                }
            }
            
            if(!this.succeeded) break;
            // see i get worried when the code is this short; and mysterious;
        }
        console.log((this.succeeded ? "success" : "failure") + " in list");
    }
}

class Match_Multiple extends Match_Expression{
    constructor(ast, exp){
        super(ast, exp);
        this.match(exp);
    }
    /**
     * @param {Multiple} exp match definition;
     */
    match(exp){
        // console.log(this.ast);
        // storing these here is inefficient because they could MAYBE be handled at Match_Layer, but that would also be really hard code to write; and a few extra arrays never hurt anyone, right?
        let old_i       = this.ast.i.slice();
        let old_stack   = this.ast.stack.slice();
        let old_current = this.ast.current;
        let count = 0;
        if(exp.count == Multiple.ZERO_OR_ONE || exp.count == Multiple.ONE){
            super.match(exp.exp);
            // okay this is REALLY jank;
            
            if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                this.ast_has_no_f____s_left_to_give = true;
            }
            else{
                this.ast.next();
                if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                    this.ast_has_no_f____s_left_to_give = true;
                }
            }
            
            if(this.succeeded) count++;
        }
        else while(true){
            super.match(exp.exp);
            
            // okay this is REALLY jank;
            if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                // console.log("end of multiple that's so sad!");
                this.ast_has_no_f____s_left_to_give = true;
            }
            else{
                // console.log("ast.next;");
                this.ast.next();
                // console.log("current", this.ast.current);
                if(this.ast.i.at(-1) === this.ast.stack.at(-2).children.length){
                    this.ast_has_no_f____s_left_to_give = true;
                }
            }
            
            if(!this.succeeded) break;
            count++;
            console.log("========");
            console.log({
                // i: old_i,
                // stack: old_stack,
                // current: this.ast.current,
                // old_current,
                current: this.ast.current.children[0].name,
                old_current: old_current.children[0].name,
            });
            old_i       = this.ast.i.slice();
            old_stack   = this.ast.stack.slice();
            old_current = this.ast.current;
        }
        // this is very confusing, which unfortunately means i will probably need to debug it a lot;
        // my debugging process is always very slow and inefficient;
        if(
            (!count === 0 && exp.count == Multiple.ZERO_OR_ONE) ||
            (exp.count == Multiple.ZERO_OR_MORE) ||
            (count > 0 && exp.count == Multiple.ONE_OR_MORE)
        ){
            this.succeeded   = true;
            console.log({
                i: old_i,
                stack: old_stack,
                current: old_current,
            });
            this.ast.i       = old_i;
            this.ast.stack   = old_stack;
            this.ast.current = old_current;
            // if(old_stack.at(-1) !== old_current){
            //     throw Error("They should be equal!");
            // }
        }
        console.log("count", count);
        console.log((this.succeeded ? "success" : "failure") + " in multiple");
    }
}

class Match_Choice extends Match_Expression{
    constructor(ast, exp){
        super(ast, exp);
        this.match(exp);
    }
    /**
     * @param {Choice} exp match definition;
     */
    match(exp){
        // storing these here is inefficient because they could MAYBE be handled at Match_Layer, but that would also be really hard code to write; and a few extra arrays never hurt anyone, right?
        const old_i       = this.ast.i.slice();
        const old_stack   = this.ast.stack.slice();
        const old_current = this.ast.current;
        for(const a_exp of exp.choices){
            console.log("succeeded before", this.succeeded);
            super.match(a_exp);
            // console.log("succeeded after", this.succeeded);
            if(this.succeeded) break;
            this.ast.i       = old_i;
            this.ast.stack   = old_stack;
            this.ast.current = old_current;
        }
        console.log((this.succeeded ? "success" : "failure") + " in choice");
    }
}

class Match_Layer extends Match_Expression{
    constructor(ast, exp){
        super(ast, exp);
        this.match(exp);
    }
    /**
     * @param {Layer} exp match definition;
     */
    match(exp){
        // console.log("layer handling", this, exp);
        if(!exp.name.has(this.ast.current.name)){
            this.succeeded = false;
            return;
        }
        const my_layer_boi = new Anode(this.ast.current.name);
        this.node.children.push(my_layer_boi);
        const a_lil_trickery = this.node;
        this.node = my_layer_boi;
        // console.log("current", this.ast.current);
        // console.log("ast.down;");
        this.ast.down();
        // console.log("current", this.ast.current);
        // console.log("exp.content", exp.content);
        super.match(exp.content);
        // console.log("trickery?", a_lil_trickery);
        this.node = a_lil_trickery;
        // we gotta take all the F's that life hands us;
        if(!this.ast_has_no_f____s_left_to_give && !exp.partial){
            this.succeeded = false;
        }
        console.log((this.succeeded ? "success" : "failure") + " in layer");
        // console.log("ast.up;");
        this.ast.up();
        // console.log("current", this.ast.current);
    }
}

const all_chars = new Set(Array(65536).fill(0).map((v,i) => String.fromCharCode(i)));
function invert(char_set){
    if(typeof char_set === "string") char_set = new Set(char_set);
    // what's odd is VS Code does not have documentation for `Set.prototype.diference`;
    // now `union` or `intersect`;
    return all_chars.difference(char_set);
}

class Characters extends AST{
    /**
     * Converts (lexes) the source string into a list of character nodes.
     * @param {string} source the source string to be converted;
     */
    constructor(source){
        super(source);
        for(const char of source){
            this.add("char");
            this.down(true);
            this.add(char);
            this.up();
        }
        // console.log("chars", this
            // , this + ""
        // );
    }
}

class Tokens extends AST{
    /**
     * Constructs a markdown parser.
     * @param {string} source the markdown source code to be parsed;
     */
    constructor(source){
        super(source);
        this.prev_ast = new Characters(source);
        this.tokenize();
        // console.log("tokens", this, this + "");
    }
    tokenize(){
        this.prev_ast.down();
        // console.log("current", this.prev_ast.current);
        // const char = new Multiple(new Layer("char", new Expression("Stuf")), Multiple.ONE_OR_MORE);
        // console.log("is_leaf", char.is_leaf);
        // console.log("stack?", this.prev_ast.stack.slice());
        // const m = this.eat(char);
        // this.add_node(m.node);
        
        const indent = new Multiple(new Layer("char",
            new Expression(" \t")),
            Multiple.ONE_OR_MORE
        );
        const newl = new Multiple(new Layer("char",
            new Expression("\n")),
            Multiple.ONE_OR_MORE
        );
        const line = new Multiple(new Layer("char",
            new Expression(invert("\n"))),
            Multiple.ONE_OR_MORE
        );
        const line_w_newl = new List([
            newl,
            line
        ]);
        const everything = new List([
            line,
            new Multiple(
                line_w_newl,
                Multiple.ONE_OR_MORE
            )
        ]);
        const m = this.eat(everything);
        this.add_node(m.node);
        
        console.log("tokens", this, this + "");
    }
}

class Markdown extends AST{
    /**
     * Constructs a markdown parser.
     * @param {string} source the markdown source code to be parsed;
     */
    constructor(source){
        super(source);
        this.prev_ast = new Tokens(source);
        this.parse();
        // console.log("markdown", this, this + "");
    }
    parse(){
        
    }
}

const ast = new Markdown(`Stuff   
This is the text string.
    Let's test indentation first. Well technically this tests other things too. Not surprising. right?
  More stuff.`);




