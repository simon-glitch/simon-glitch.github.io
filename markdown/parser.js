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

/** Node for the AST. */
class Anode{
    /** The index within the source text where this anode starts. */
    idx_start = 0;
    /** The index within the source text where this anode ends. */
    idx_end = 0;
    /** String describing the type or contents of the anode. */
    name = "";
    /** @param {strign} name value for `anode.name`; */
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
    /**
     * Constructs an Abstract Syntax Tree builder.
     * @param {string} source value for `ast.sorce`;
     */
    constructor(source){
        /** The text that this AST is parsing. @type {string} */
        this.source = source;
        /** The text output of this AST. @type {string} */
        this.output = "";
        /** @type {Anode[]} */
        this.stack = [];
        /** @type {boolean[]} */
        this.is_option = [];
        /** @type {Failed_Options_Level[]} */
        this.failed_options = [new Failed_Options_Level()];
        /** @type {Anode} @private */
        this.root = new Anode("root");
        /** Do not write to this Anode externally. Use the methods of AST instead. @type {Anode} */
        this.current = this.root;
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
        this.stack.pop();
        this.is_option.pop();
        this.i.pop();
        this.current = this.stack[this.stack.length - 1];
        return true;
    }
    /**
     * Navigate down to the first/last child of `this.current`. By default, this method navigates to the first child.
     * @param {Boolean} last whether to navigate to the last child;
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    down(last){
        if(this.current.length === 0) return false;
        const i = last ? (this.current.children.length - 1) : 0;
        this.i.push(i);
        this.current = this.current.children[i];
        this.stack.push(this.current);
        this.is_option.push(false);
        return true;
    }
    /**
     * Navigate to the next Anode in this.current.
     * @returns {Boolean} indicating whether this function failed or succeeded;
     */
    next(){
        const prev = this.stack[this.stack.length - 2];
        if(!prev) return false;
        const i = ++this.i[this.i.length - 1];
        if(i >= prev.children.length) return false;
        this.current = prev.children[i];
        return true;
    }
    /**
     * Add a Anode to the tree.
     * @param {String} type the type of the new Anode;
     */
    add(name){
        this.current.children.push(new Anode(name));
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
    /** For debugging. */
    toString(){
        return (
            this.root.toString(this.stringify) +
            "\n[\n  " +
            this.failed_options.map(f => "" + f)
            .join("\n  ") + "\n]"
        );
    }
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
        // console.log("chars", this, this + "");
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
        console.log("tokens", this, this + "");
    }
    tokenize(){
        
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
        console.log("markdown", this, this + "");
    }
    parse(){
        
    }
}

const ast = new Markdown(`
This is the text string.
    Let's test indentation first. Well technically this tests other things too. Not surprising. right?
`);




