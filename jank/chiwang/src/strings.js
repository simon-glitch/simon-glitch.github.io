
(function(){

const global = window[
    "Somebody might have named their variable `global`," +
    "so I'll just use this long string for mine. !@#$%^&*"
];

const plural = function(noun){
    return (
        noun +
        ((noun.search(
            /[cs]h|[sxz]$/
        ) + 1) ? "e" : "") +
        "s"
    )
};




});
