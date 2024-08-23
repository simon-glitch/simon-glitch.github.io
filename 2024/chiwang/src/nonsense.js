
// i put some nonsense in here
const scripts = [
    "math",
    "menu",
    "idle_game",
];

const err = function(name, alt_msg){
    throw TypeError(
        "the " + name + " object does not exist in this JavaScript context!\n" +
        "probably because you are running this script in NodeJS or a Web Worker;\n" +
        "please run this script in a context with the object defined, or define the object yourself" +
        (alt_msg) ? (
            "\nOR:\n" + alt_msg.replace(/\n|^/g, "$&* ")
        ) : ""
    );
};

const err_o = function(name_o, name_m){
    throw TypeError(
        "custom " + name_o + " object does not have a " + name_m +  " method!\n" +
        "please define one because it needs to work for this script;"
    );
};

try{
    window;
    window.window;
}
catch(e){
    err("window");
}

const global = function(name = "global_var"){
    Object.defineProperty(window, name, {
        value: thing,
        readable: true,
        writable: false,
        configurable: false,
        enumerable: true,
    });
};

// this code recovers every variable I'll need and puts them all on the window
const try_err = function(name, type, revive_f, alt_msg){
    /** @type any */
    let thing = window[name];
    let was_defined = true;
    if((window[name] ?? undefined) instanceof type){
        was_defined = false;
    }
    if(!was_defined && revive_f){
        thing = revive_f;
        was_defined = true;
    }
    if(was_defined){
        global(name);
    }
    else{
        err(name, alt_msg);
    }
    return thing;
};

const try_err_o = function(name, type, revive_f){
    /** @type any */
    let thing = window[name];
    let was_defined = true;
    if((window[name] ?? undefined) instanceof type){
        was_defined = false;
    }
    if(!was_defined && revive_f){
        thing = revive_f;
        was_defined = true;
    }
    if(was_defined){
        global(name);
    }
    else{
        err(name);
    }
    return thing;
};

// this code recovers every variable I'll need and puts them all on the window
// it also verifies that every object is structured the way I expect it to be
// this is intended to help you use a custom DOM,
// * if you're crazy enough to do that sort of thing
const document = try_err("document", Object);
RECOVERY: {
    const n = document.__proto__.__proto__.__proto__;
    try_err("Node", Function, ()=>(
        n.constructor
    ));
    try_err("EventTarget", Function, ()=>(
        n.__proto__.constructor
    ));
    const s = (()=>{
        const ce = document.createElement;
        if(
            (ce ?? undefined).constructor.name !== "HTMLScriptElement" ||
            ce.length < 1
        ){
            throw new Error("custom document does not have a createElement method");
        }
        const s = ce("script");
        if((s ?? undefined).constructor.name !== "HTMLScriptElement"){
            throw new Error("could not create a <script> element with custom document.createElement");
        }
    })();
    try_err("HTMLScriptElement", Function, ()=>(
        s.__proto__.constructor
    ));
    try_err("HTMLElement", Function, ()=>(
        s.__proto__.__proto__.constructor
    ));
    try_err("Element", Function, ()=>(
        s.__proto__.__proto__.__proto__.constructor
    ));
}

for(let sn of scripts){
    const s = document.createElement("script");
    document.body.appendChild(s);
    
}
