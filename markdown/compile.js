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

/** Node for the AST. */
class Anode{
    /** The index within the source text where this anode starts. */
    idx_start = 0;
    /** The index within the source text where this anode ends. */
    idx_end = 0;
    /** String describing the type or contents of the anode. */
    name = "";
    /** @param {strign} a_name value for `anode.name`; */
    constructor(a_name){
        this.name = a_name;
        /** Children of this node within the tree. @type {Anode[]} */
        this.children = [];
    }
    /** indentation added at each recursive level in my toString function; */
    indent = "  ";
    toString(stringify, indent){
        if(stringify[this.type]){
            return stringify[this.type](this, indent);
        }
        let s = `${this.type}{`;
        let prev = false;
        for(const c of this.children){
            const curr = !stringify[c.type];
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

class AST{
    constructor(){
        /** @type {Anode[]} */
        this.stack = [];
        /** @type {boolean[]} */
        this.is_option = [];
        /** @type {Object} */
        this.failed_option = {};
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
    // create a branching path in how the syntax is parsed;
    option(name, callback){
        this.add(name);
        this.down(true);
        this.is_option[this.is_option.length - 1] = true;
    }
}




