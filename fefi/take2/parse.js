
/**
 * An abstract syntax tree. Its nodes are `ASN`s.
 */
class AST{
    constructor(){
        /** @type {ASN} */
        this.root = new ASN();
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

/**
 * 
 * @param {string} text text to parse
 * @param {json} syntax parsing rules, formatted as json
 */
function parse(text, syntax){
    
}


const example = ``;

parse(example, js_syntax);



