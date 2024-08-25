
/*
Nkq.NVP,NVo.NNl,NNt,NNC;
Nym.NDK.dIB;
NwI;


sh['Nym']['NwN'](sv, sp)),
sh['Nym']['NDP']['Nyx']['NwY'](sa, sv, sh, sT, sp),
sh['Nym']['NwN'](sv, sp),


    }, sh, 0.00001);
}
, ow = function(sa, sv, sh, sK, sT, sG) {
    // GLOBALIZE IT
    window.my_see = sh;
    var sp = xZ['A']['Nci']['NcB']['Ncu']['Nwm']





*/
const regexs = {
    inventory:  /this\['(\w+)'\]\['\w+'\]\(\w+\['inventory' *\]\)[,;]/,
    position:   /this\['(\w+)'\]\['\w+'\]\(\w+\['physicsStep'\]\)[,;]/,
    cooldowns:  /this\['(\w+)'\]\['\w+'\]\(\w+\['cooldowns' *\]\)[,;]/,
    max_health: /this\['(\w+)'\]\(\w+\['maxHealth' *\]\)[,;]/,
    health:     /this\['(\w+)'\]\(\w+\['health' *? *\]\)[,;]/,
    main_hand:  /\w+ *\['__beginSelectedItemChangeCheck'\] *= *function\(\) *\{\n.+\n *this\['(\w+)'\] *= *this\['\w+'\]\['\w+'\][,;]/,
    
};

const replaces = [
    [
        "(" +
        ".*\\n" +
        ".*\\n" +
        ".*\\n" +
        ".*\\n" +
        ".*\\n" +
        ")" +
        /*
sh['Nym']['NwN'](sv, sp)),
sh['Nym']['NDP']['Nyx']['NwY'](sa, sv, sh, sT, sp),
sh['Nym']['NwN'](sv, sp),
        */
        "(" +
        " *(\\w+)\\['(\\w+)'\\]\\['(\\w+)'\\]\\((\\w+), *(\\w+)\\)\\),\\n" +
        " *\\3\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\(\\w+, *\\6, *\\3, *\\w+, *\\7\\),\\n" +
        "( *)\\3\\['\\4'\\]\\['\\5'\\]\\(\\6, *\\7\\),\\n" +
        ")" +
        "",
        "$8" + "// GLOBALIZE IT\n" +
        "$8" + "window.my_guy = $3;\n" +
        "$1" + "$2",
    ],
    [
        "(" +
        " *\\}, *(\\w+), *0\\.00001\\);\\n" +
        " *\\}\\n" +
        ", *\\w+ *= *function\\(\\w+, *\\w+, *\\2, *\\w+, *\\w+, *\\w+\\) *\\{\\n" +
        ")" +
        "(" +
        "( *)var *\\w+ *= *\\w+\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\n" +
        ")" +
        "",
        "$1" +
        "$4" + "// GLOBALIZE IT\n" +
        "$4" + "window.my_see = $2;\n" +
        "$3",
    ],
];


/** @type HTMLTextareaElement */
const code1 = document.querySelector("#code1");
/** @type HTMLTextareaElement */
const code2 = document.querySelector("#code2");
/** @type HTMLButtonElement */
const convert_b = document.querySelector("#convert");

convert_b.onclick = function(){
    let s = code1.value;
    for(let r of replaces){
        s = s.replace(new RegExp(r[0]), r[1]);
    }
    code1.value = s;
    
    const d = {};
    for(let i in regexs){
        const r = regexs[i];
        const ss = s.match(r)?.[1];
        d[i] = ss;
    }
    console.log(d);
};



