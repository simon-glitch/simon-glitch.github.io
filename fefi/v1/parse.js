
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




