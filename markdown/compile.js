// import fs from "ast_node:fs/promises";

/*
At first I felt bad about this code, but now I'm looking at it and thinking this is some really amazing code.

For JavaScript, I will make a much more general purpose parser, rather than doing all this hardcore hardcoding.

I just realized, "hardcall" should be a word. It's defined as when you have to call for something that is strictly required by the situation. Also, you can say "I hardcalled", rather than "I had to make a hard call". "Hardcall" can also work as a noun, but it's obvious that it's more concise as a verb.
*/

const settings = {
    input:  "./input.md",
    output: "./output.html",
};

class AST_Node{
    /** indentation added at each recursive level in my toString function; */
    indent = "  ";
    /** index where this ast_node starts in the original text; this is not needed for most types of nodes; */
    i0 = 0;
    /** index where this ast_node end in the original text; this is not needed for most types of nodes; */
    i1 = 0;
    /**
     * @param {String} type indicates the type, even though using a string is kind of weird;
     */
    constructor(type){
        this.type = type;
        /** @type {AST_Node[]} */
        this.children = [];
    }
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
        /** @type {AST_Node} @private */
        this.root = new AST_Node("root");
        /** Do not write to this ast_node externally. Use the methods of AST instead. @type {AST_Node} */
        this.current = this.root;
        /** @type {AST_Node[]} @private */
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
        this.stack.pop();
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
        return true;
    }
    /**
     * Navigate to the next ast_node in this.current.
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
     * Add a ast_node to the tree.
     * @param {String} type the type of the new ast_node;
     */
    add(type){
        this.current.children.push(new AST_Node(type));
    }
    /**
     * Remove the selected child of the this.current ast_node.
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
}

const stringify = {
    special(ast_node){
        return `[${ast_node.children[0].type}]`;
    },
    word(ast_node){
        return `[${ast_node.children[0].type}]`;
    },
    space_indent(ast_node){
        // return `[${ast_node.children[0].type}]`;
        return "";
    },
    space(ast_node){
        return " ";
    },
    double_space(ast_node){
        return " DOUBLE SPACE";
    },
    double_newline(ast_node, indent){
        return `\n${indent}DOUBLE NEWLINE`;
    },
    newline(ast_node, indent){
        return `\n${indent}NEWLINE`;
    },
    nbsp(ast_node){
        return `[NBSP]`;
    },
    escape(ast_node){
        return `[ESCAPE ${ast_node.children[0].type}]`;
    },
};

const whitespace_types = new Set(["space_indent", "space", "double_space", "double_newline", "newline", "empty"]);


/** @param {AST} ast @param {String} md */
function tokenize(ast, md){
    /* Not implemented yet. */
    let i = 0;
    // all whitespace is trimmed;
    const ws = new Set(" \t\v\r\f\n");
    // newlines are used to separate lines;
    const ns = new Set("\n");
    // for skipping empty lines while also ignore any \r or \f;
    const nes = new Set("\r\f\n");
    // non new line whitespace;
    const es = new Set(" \t\v");
    // special characters;
    const ss = new Set("^*-+:>()[]#`");
    // obviously, backslash is extra special;
    const bs = new Set("\\");
    
    /** An array of all 65536 characters, since JavaScript uses utf-16. */
    const s = (()=>{
        let s = "";
        for(let i = 0; i < 65536; i++){
            s += String.fromCharCode(i)
        }
        return s;
    })();
    /** Invert a set of characters. @param {Set<String>} cs */
    function invert(cs){
        /** @type {Set<String>} */
        const inverted = new Set();
        for(let i = 0; i < 65536; i++){
            if(!cs.has(s[i])) inverted.add(s[i]);
        }
        return inverted;
    }
    // words, i.e. not special characters, not whitspace;
    const iss = invert(new Set([...ws].concat([...ss]).concat([...bs])));
    // whitespace chars, which have special escape rules;
    const iws = invert(ws);
    // escaping \n yields DOUBLE_LINE and ends the line, which is a little confusing; set used is ns;
    // escaping \r or \f yields nothing;
    const bnothing = new Set("\r\f");
    // escaping space or \t or \v yields NBSP;
    const bnbsp = new Set(" \t\v");
    /* JS for NBSP is "\xa0", but this code does not need it since we're compiling to HTML; */
    // escaping non-whitespace chars just yields the char;
    
    /** @param {Set<String>} cs */
    function scan(cs){
        const si = i;
        while(cs.has(md[i])){
            i++;
        }
        return [si, i];
    }
    function subscan(s, type){
        const found = scan(s);
        if(found[1] > found[0]){
            ast.add(type);
            ast.down(true);
            ast.add(md.substring(found[0], found[1]));
            ast.current.children[0].i0 = found[0];
            ast.current.children[0].i1 = found[1];
            ast.up();
            return true;
        }
        return false;
    }
    
    // scan a line;
    function line(){
        let escaped_newline = false;
        let prev_i = i;
        
        // handle whitespace between lines, but remember whitespace at the beginning of a line;
        let found_any = true;
        let found_es = [i, i];
        while(found_any){
            scan(nes);
            const found = scan(es);
            if(found[1] === found[0]) found_any = false;
            // this is very confusing but also 100% correct;
            else found_es = found;
            if(nes[1] !== nes[0]) found_es = found;
        }
        if(found_es[1] > found_es[0]){
            ast.add("space_indent");
            ast.down(true);
            ast.add(md.substring(found_es[0], found_es[1]));
            ast.up();
        }
        
        found_any = true;
        while(found_any){
            found_any = false;
            found_any = subscan(ss, "special") || found_any;
            found_any = subscan(iss, "word")   || found_any;
            found_any = subscan(es, "space")   || found_any;
            // handle escape;
            const prev_i = i;
            if(bs.has(md[i])) i++
            if(prev_i === i) continue;
            const next = md[i];
            // edge case where escape is at the very end of md;
            if(!next){
                ast.add("escape");
                ast.down(true);
                ast.add(md.substring(prev_i, i));
                ast.up();
                break;
            }
            if(bnothing.has(next));
            else if(bnbsp.has(next)){
                ast.add("nbsp");
            }
            else if(ns.has(next)){
                ast.add("double_newline");
                escaped_newline = true;
            }
            else{
                ast.add("escape");
                ast.down(true);
                ast.add(md.substring(i, i + 1));
                ast.up();
            }
            i++;
        }
        
        // handle end of the line logic;
        if(!escaped_newline){
            // trim ending whitespace;
            let found = scan(es);
            // check for double space at the end; markdown requires double space for a single newline to indicate a line break;
            if(i >= 2 && md.substring(i-2, i) === "  "){
                ast.add("double_space");
            }
            // check newlines for a line/paragraph separator;
            found = scan(ns);
            // handle case where this is the end of the string (md);
            // this is exected to happen here;
            if(found[1] === found[0]) return;
            // we can just convert double newlines into single newlines later;
            // but it's helpful to find double newlines now, so we can know whether to separate paragraphs;
            const dnl = found[1] - found[0] >= 2;
            ast.add(dnl ? "double_newline" : "newline");
        }
        
        // handle edge case where the code is stuck;
        if(prev_i === i){
            ast.remove();
            return;
        }
        // needed to make multiline code comment work later;
        ast.current.i0 = prev_i;
        ast.current.i1 = i;
    }
    let prev_i = -1;
    while(prev_i !== i){
        prev_i = i;
        // go down into a new line ast_node;
        ast.add("line");
        ast.down(true);
        line();
        ast.up();
    }
    
    // remove empty lines and lines only containing double space;
    let succeeded = ast.down();
    while(succeeded){
        // here, succeeded indicates whether we are at the end of the list;
        succeeded = ast.next();
        let line_is_empty = true;
        while(!ast.removed_all && line_is_empty){
            line_is_empty = ast.current.children.length === 0 || (
                ast.current.children.reduce((a,b) => a && whitespace_types.has(b.type), true)
            );
            if(line_is_empty){
                ast.remove();
            }
        }
    }
    ast.up();
}
/** @param {AST} ast */
function build_ast(ast){
    const g_t = {
        /** @type {[boolean, AST_Node | undefined]} */
        code_block: [false, undefined],
    };
    const indents = [];
    for(let succeeded = ast.down(); succeeded; succeeded = ast.next()){
        const t = {
            code_block: g_t.code_block,
            /** @type {[boolean, AST_Node | undefined, number]} */
            italic: [false, undefined, 0],
            /** @type {[boolean, AST_Node | undefined, number]} */
            bold: [false, undefined, 0],
            /** @type {[boolean, AST_Node | undefined, number]} */
            code: [false, undefined, 0],
            /** @type {[boolean, AST_Node | undefined, number]} */
            link: [false, undefined, 0],
            /** @type {[boolean, AST_Node | undefined, number]} */
            link_url: [false, undefined, 0],
        };
        const c = ast.current.children;
        // check if we found the end of a code block;
        if(t.code_block[0]){
            // turn the line into an empty line bc we don't need it's nodes anymore;
            ast.current.children = [];
            let has_end = false;
            for(const token of c){
                if(whitespace_types.has(token.type)) continue;
                if(token.type === "special" && token.children[0].type === "```" && !has_end){
                    has_end = true;
                }
                // the above and logic is a bit confusing, because it creates this logic and works for all cases:
                // if the token is not special, then fail;
                // if the token is not ```, then fail;
                // if the token is not the first ```, then fail;
                else{
                    has_end = false;
                    break;
                }
            }
            if(has_end){
                const cb = t.code_block[1];
                const code = new AST_Node();
                code.type = "code_block";
                code.i0 = cb.children[2].i0;
                code.i1 = cb.children[3].i1;
                cb.children = [cb.children[1], code];
                t.code_block[0] = false;
                t.code_block[1] = undefined;
            }
            continue;
        }
        // skip past whitespace;
        for(let succeeded = ast.down(); succeeded && whitespace_types.has(ast.current.type); succeeded = ast.next());
        // check if we found the start of a code block;
        if(ast.current.type === "special" && ast.current.children[0]?.type === "```"){
            const cb = ast.current;
            let succeeded = true;
            // skip whitespace after ``` and before language;
            for(succeeded = ast.next(); succeeded && whitespace_types.has(ast.current.type); succeeded = ast.next());
            // check for the language of the code block;
            if(ast.current && ast.current.type === "word"){
                cb.children.push(ast.current);
                succeeded = ast.next();
            }
            // place an empty language node;
            else if(!succeeded || whitespace_types.has(ast.current.type)){
                cb.children.push(new AST_Node("empty"));
                succeeded = ast.next();
            }
            // skip whitespace after language
            while(succeeded && whitespace_types.has(ast.current.type)) succeeded = ast.next();
            // make sure there is nothing after ``` language, because if there is, we fail to create the code block;
            succeeded = ast.next();
            if(!succeeded){
                t.code_block[0] = true;
                t.code_block[1] = cb;
                continue;
            }
        }
        ast.up();
        for(let succeeded = ast.down(); succeeded; succeeded = ast.next()){
            if(t.code[0]){
                while(i < c.length && !(c[i].type === "special" && c[i].children[0].type[0] === "`"))
                    i++;
                // either find end of code and create code, or fail to create code;
            }
        }
        ast.up();
    }
}
function parse_ast(ast){
    
    /* Not implemented yet. */
    return "";
}

/**
 * Parse markdown into HTML.
 * @param {String} md markdown text to process;
 * @returns {String}
 */
function parse(md){
    const ast = new AST();
    window.ast = ast;
    tokenize(ast, md);
    // console.log(JSON.stringify(ast));
    console.log(ast.toString(stringify));
    build_ast(ast);
    return parse_ast(ast);
}

/*
async function main(){
    try{
        const md = await fs.readFile(settings.input, "utf-8");
        const html = parse(md);
        await fs.writeFile(settings.output, html, "utf-8");
        console.log("succeeded.");
    }
    catch(e){
        console.error("oh no, something failed!", e.message);
    }
}
*/

function main(){
    parse(`
        
     
        
   

        
        
     Let's see if this works.    
    Double space ^. No double space ->
   Still no double space ^.
      

          There sho\\uld be a double newline there ^. And hopefully no weird empty lines.
 This should have DOUBLE space ->  

And it shouldn't matter bc of the double newline there ^.
 Time to test them ESCAPES \\ so that should be a double space;\\ \\ that's similar;
   We can do \\* too, and \\\t, another double space; hi\\\fya should be hi then ya...  
      this should be broken up with escapes ^\\^^\\^^;
   
 
    
       `);
}
main();

