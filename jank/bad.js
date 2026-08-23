
// JavaScript actually requires var to be on the same line;
// no [x,y] = [x+1,y+2];
var [x,y] = [5,1];
// this works though, because var lets you do plain assignments;
var [x,y] = [x+1,y+2];

var {
    x:{a}, y
} = {y:3, x:{a:2}};
// now x == {a:2}, and a == 2;
var {
    x:{x}
} = {x:{x:2}};
// now x == 2;

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

my_label: {
    break my_label;
    "`break my_label` is allowed, but just `break` is not.";
    "VS Code correctly identifies this code as unreachable.";
}

for(0;1;0){
    console.log("This statement has a 50% chance of printing again.");
    my_label: {
        if(Math.random() < 0.5) break;
        else break my_label;
    }
}

