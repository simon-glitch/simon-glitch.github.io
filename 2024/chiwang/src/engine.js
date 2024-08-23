
(function(){

/**
  * these are the scripts used by the Chiwang engine
  *
  * it is advised that you do not remove these
  *
  * feel free to add your own scripts here
**/
const scripts = [
    "math",
    "strings",
    "menu",
    "idle_game",
];
const stylesheets = [
    "main",
];

// you will either hate this script, or love it
// i do some unconventional stuff because i feel like it

const err = function(name){
    throw TypeError(
        "the " + name + " object does not exist in this JavaScript context!\n" +
        "probably because you are running this script in NodeJS or a Web Worker;\n" +
        "please run this script in a context with the object defined"
    );
};

try{
    window;
    window.window;
}
catch(e){
    err("window");
}

const C = function(thing){
    return thing.constructor;
}

const My_Object = window.Object ?? C({});

if(!(My_Object.defineProperty instanceof Function)){
    throw TypeError(
        "Object.defineProperty does not exist!\n" +
        "this script requires the method to exist, for security reasons;"
    );
}

const cprop = function(obj, name, thing){
    Object.defineProperty(obj, name, {
        value:        thing,
        readable:      true,
        writable:     false,
        configurable: false,
        enumerable:    true,
    });
    return thing;
};
// yes, defineProperty-cursion
cprop(My_Object, "defineProperty", My_Object.defineProperty);

const global = function global(name = "global_var", thing){
    return cprop(window, name, thing);
};

global(
    "Somebody might have named their variable `global`," +
    "so I'll just use this long string for mine. !@#$%^&*",
global);

const try_builtin = function(name, thing){
    try{
        global(
            name,
            thing
        );
        if(window[name] !== thing) throw new Error();
    }
    catch(e){
        throw TypeError(
            "someone overrode the builtin constructor " + name + "!\n",
            "this script needs the builtin in order to work"
        );
    }
};

try_builtin("Object", My_Object);
try_builtin("Number", C(1));
try_builtin("String", C("one"));
try_builtin("Boolean", C(true));
try_builtin("Function", C(function(){}));
try_builtin("BigInt", C(1n));
try_builtin("Array", C([1]));
try_builtin("RegExp", C(/regexp forever/));
// yes, promises are a built-in feature
try_builtin("Promise", C((async function(){})()));

// this code recovers every variable I'll need and puts them all on the window
const try_err = function(name, type, revive_f){
    /** @type any */
    let thing = window[name];
    let was_defined = true;
    if(!((window[name] ?? undefined) instanceof type)){
        was_defined = false;
    }
    if(!was_defined && revive_f){
        thing = revive_f;
        was_defined = true;
    }
    if(was_defined){
        try{
            global(name, thing);
        }
        catch(e){
            if(window[name] !== thing)
                was_defined = false;
        }
    }
    if(!was_defined){
        err(name);
    }
    return thing;
};

// this code recovers every variable I'll need and puts them all on the window
// it also verifies that every object is structured the way I expect it to be
// this is intended to help you use a custom DOM,
// * if you're crazy enough to do that sort of thing
const my_document = try_err("document", Object);
RECOVERY: {
    const n = my_document.__proto__.__proto__.__proto__;
    try_err("Node", Function, ()=>(
        C(n)
    ));
    try_err("EventTarget", Function, ()=>(
        C(n.__proto__)
    ));
    const s = my_document.createElement("script");
    try_err("HTMLScriptElement", Function, ()=>(
        C(s.__proto__)
    ));
    try_err("HTMLElement", Function, ()=>(
        C(s.__proto__.__proto__)
    ));
    try_err("Element", Function, ()=>(
        C(s.__proto__.__proto__.__proto__)
    ));
    const t = my_document.createElement("style");
    try_err("HTMLStyleElement", Function, ()=>(
        C(t.__proto__)
    ));
}

// you can define a different URL in your own script
const my_URL = window.my_URL ?? "./";
const my_spreadsheet_path = window.my_spreadsheet_path ?? "stylesheets/"

// Cascading Style Sheets (CSS)
for(let sn of stylesheets){
    const s = document.createElement("style");
    document.body.appendChild(s);
    s.src = (
        my_URL + my_spreadsheet_path +
        sn + ".css"
    );
}
// JavaScript (JS)
for(let sn of scripts){
    const s = document.createElement("script");
    document.body.appendChild(s);
    s.src = (
        my_URL +
        sn + ".js"
    );
}

})();
