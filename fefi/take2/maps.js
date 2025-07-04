
function square(text){
    if(!text.slice(0,1) === "[") return;
    if(!text.slice(-1) === "]") return;
    return ["[", text.slice(1, -1), "]"];
}

