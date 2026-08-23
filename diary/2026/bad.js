
var [x,y] = [0, 0];
// JavaScript actually requires var to be on the same line;
var {
    x, y
} = {y:3, x:2};

/ Look ma, confusing string: `Some string ${x + 2} haha` in a regex literal */
2;
/ Semicolon is expected BEFORE regex literals */
/* Look ma, confusing string: `Some string ${x + 2} haha` in a regex literal */
{
    "Nope it's a comment!"
}
{
    "Was that previous curly block a scope or an object literal?"; "It's a scope, since replacing that semicolon with a colon causes an error."
}
({
    "Wrapping it in parenthesis makes colon work though.": "So curlies will become a scope if they can. Scope takes precedence."
})

