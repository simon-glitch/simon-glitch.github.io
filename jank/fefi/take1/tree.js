
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
    text = "";
    /** @param {string} type */
    constructor(type){
        this.type ??= type;
        this.text = "";
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
 * A syntax rule.
 */
class Syntax_Rule{
    type = "";
    start = "";
    end = "";
    list = [];
    mode = "disallow";
    /**
     * @param {string} type what structure the syntax rule represents.
     * @param {string} start what that structure starts with
     * @param {string} end what that structure ends with
     */
    constructor(type, start, end){
        this.type ??= type;
        this.start ??= start;
        this.end ??= end;
    }
};
