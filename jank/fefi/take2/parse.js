
/**
 * An abstract syntax tree. Its nodes are `ASN`s.
 */
class AST{
    /**
     * Parse text into an AST.
     * @param {string} text the text to parse
     * @param {json} syntax the syntax rules to build the AST;
     */
    constructor(text, syntax){
        /** @type {ASN} */
        this.root = new ASN();
        this.text = text;
        for(let i in syntax){
            this[i] = syntax[i];
        }
        this.parse();
    }
    parse(){
        
    }
};

/**
 * An abstract syntax node.
 */
class ASN{
    /** @param {string} type */
    constructor(type){
        /** @type {ASN[]} */
        this.children = [];
        /** @type {ASN} */
        this.parent = undefined;
    }
    /** @param {ASN} child @returns {ASN} this */
    add(child){
        this.children.push(child);
        child.parent = this;
        return this;
    }
};

// tests
brackets: {
    const a = new AST("a, d(4, c) + fun(can(er.ty).qu, ((28 - x) / 10) ** 3)", {
        
    });
    console.log(a);
}


