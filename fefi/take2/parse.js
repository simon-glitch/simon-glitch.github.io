
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

const js_syntax = {
    text: {
        pattern: "any0",
        content: [{
            pattern: "character",
            content: [{
                pattern: "blacklist",
                content: [],
            }],
        }],
    },
    comment: {
        pattern: "bracket",
        start: "/*",
        end: "*/",
        contains: [],
    },
    quote1: {
        pattern: "bracket",
        start: "'",
        end: "'",
        contains: [],
    },
    quote2: {
        pattern: "bracket",
        start: '"',
        end: '"',
        contains: [],
    },
    backtick: {
        pattern: "bracket",
        start: "'",
        end: "'",
        contains: [{
            pattern: "any1",
            content: ["text", "substitution"],
        }],
    },
    substitution: {
        pattern: "bracket",
        start: "${",
        end: "}",
        contains: ["current"],
    },
    word: {
        pattern: "any1",
        content: {
            pattern: "character",
            content: [{
                pattern: "range",
                start: "a",
                end: "z",
            }, {
                pattern: "range",
                start: "A",
                end: "Z",
            }, {
                pattern: "range",
                start: "0",
                end: "9",
            }, "_$"],
        },
    },
    operator: {
        pattern: "any1",
        content: {
            pattern: "character",
            content: ["+-*/%&|^~!=<>.:"],
        },
    },
    newline: {
        pattern: "any1",
        content: {
            pattern: "character",
            content: [{use: "space"}, "\n\f\r"],
        },
    },
    space: {
        pattern: "any1",
        content: {
            pattern: "character",
            content: [" \t"],
        },
    },
    paren: {
        pattern: "bracket",
        start: '(',
        end: ')',
    },
    square: {
        pattern: "bracket",
        start: '[',
        end: ']',
    },
    curly: {
        pattern: "bracket",
        start: '{',
        end: '}',
    },
    phases: [{
        name: "comments_and_strings",
        aliases: ["current"],
        pattern: "priority1",
        1: [
            "comment",
            "quote1",
            "quote2",
            "backtick",
            "substitution",
        ],
        2: "text",
    }, {
        name: "tokens",
        /* what needs parsed? */
        parse: ["text"],
        pattern: "any0",
        content: [
            "word",
            "operator",
            {
                pattern: "priority",
                1: "space",
                2: "newline",
            },
        ],
    }, {
        name: "brackets",
        parse: ["text"],
        // make every bracket look for brackets inside it
        content: "brackets",
    }, {
        name: "numbers",
        
    }, {
        name: "newline_cleanup",
        
    }, {
        name: "logic",
        
    }],
};

const example = ``;

parse(example, js_syntax);



