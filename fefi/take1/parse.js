
console.log(AST);

const comment = new Syntax_Rule(
    "comment", "/*", "*/"
);
const quote_1 = new Syntax_Rule(
    "quote", "'", "'"
);
const quote_2 = new Syntax_Rule(
    "quote", '"', '"'
);
const backtick = new Syntax_Rule(
    "backtick", "`", "`"
);
const b_paren = new Syntax_Rule(
    "b_paren", "(", ")"
);
const b_square = new Syntax_Rule(
    "b_square", "[", "]"
);
const b_curly = new Syntax_Rule(
    "b_curly", "{", "}"
);

comment.allow = [];
quote_1.allow = [];
quote_2.allow = [];
backtick.allow = [b_curly];

/**
 * Parse text into an AST.
 * @param {String} text the text to parse
 * @param {Syntax_Rule[]} rules the rules to build the AST;
 * @returns {AST}
 */
function parse(text, rules){
    const lookup = new Map();
    for(let i = 0; i < rules.length; i++){
        lookup.set(rules[i].type, rules[i]);
    }
    const a = new AST();
    const b = a.root;
    const BASE = new Syntax_Rule();
    /** @type {number[]} */
    let i_u = [];
    let stack = [BASE];
    while(text.length > 0){
        const current = stack[stack.length - 1];
        i_u = (
            current === BASE ?
            [text.indexOf(current.end)] :
            [text.length]
        );
        for(let u_i = 0; u_i < rules.length; u_i++){
            const c_i = current.list.indexOf(rules[u_i].type);
            if(current.mode === "disallow")
            if(c_i > -1)
                continue;
            if(current.mode === "allow")
            if(c_i === -1)
                continue;
            
            const t_i = text.indexOf(rules[u_i].start);
            i_u.push([
                rules[u_i],
                t_i === -1 ? text.length : t_i
            ]);
        }
        
        // figure out what to do
        const inc = i_u.reduce(Math.min);
        
        // close this node
        if(inc_i === inc){
            stack.pop();
            const c = new ASN(BASE.type);
            c.text = text;
            b.add(c);
            text = text.slice(inc + i_u[inc_i][0].end.length);
            b = b.parent ?? b;
        }
        
        // add a new node
        
        
        // all done!
        if(!stack.length){
            const c = new ASN(BASE.type);
            c.text = text;
            b.add(c);
            text = "";
        }
    }
}

