
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

// tests
brackets: {
    const a = new AST("a, d(4, c) + fun(can(er.ty).qu, ((28 - x) / 10) ** 3)", {
        
    });
    console.log(a);
}


