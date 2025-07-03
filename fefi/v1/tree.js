
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
    type = "";
    /** @param {string} type */
    constructor(type){
        this.type ??= type;
        /** @type {ASN[]} */
        this.children = [];
    }
};

/**
 * A syntax rule.
 */
class Syntax_Rule{
    type = "";
    start = "";
    end = "";
    /**
     * @param {string} type what structure the syntax rule represents.
     * @param {string} start what that structure starts with
     * @param {string} end what that structure ends with
     */
    constructor(type, start, end){
        this.type ??= type
        this.start ??= start
        this.end ??= end
    }
};
