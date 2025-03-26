
// i just dont understand

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


this['vdi']['vkK'](yn['inventory']),
this['vrt']['vkK'](yn['physicsStep']),
this['vQw']['vkK'](yn['cooldowns']),
this['vQQ'] = yn['maxHealth'],
this['vQu'] = yn['health'];


yG['numFaces']++;
var t0 = []['concat'](yJ);
t0[yV] += yA['vvO']['vvx'],
t0[yc] += yA['vvO']['vvp'],
t0[yo] += yA['vvO']['vvG'],
yG['matIDs'][yr] = yI,

*/

const xyz = /(\w+)\['numFaces'\]\+\+;\n *var +(\w+) *= *\[\]\['concat'\]\(\w+\);\n *\2\[\w+\] *\+= *(\w+)\['(\w+)'\]\['(\w+)'\][,;]\n *\2\[\w+\] *\+= *\3\['\4'\]\['(\w+)'\][,;]\n *\2\[\w+\] *\+= *\3\['\4'\]\['(\w+)'\][,;]\n *\1\['matIDs'\]\[\w+\] *= *\w+[,;]\n/;
const locori = /return new \w+\['\w+'\]\(\(0x0,\n *\w+\['\w+'\]\)\(\w+\['\w+'\]\['(\w+)'\]\),\w+\['(\w+)'\],\(0x0,/;


const regexs = {
    inventory: [
        /this\['(\w+)'\]\['\w+'\]\(\w+\['inventory'\]\)[,;]/,
        1,
        0,
    ],
    position: [
        /this\['(\w+)'\]\['\w+'\]\(\w+\['physicsStep'\]\)[,;]/,
        1,
        0,
    ],
    cooldowns: [
        /this\['(\w+)'\]\['\w+'\]\(\w+\['cooldowns'\]\)[,;]/,
        1,
        0,
    ],
    max_health: [
        /this\['(\w+)'\] *= *\w+\['maxHealth'\][,;]/,
        1,
        0,
    ],
    health: [
        /this\['(\w+)'\] *= *\w+\['health'\][,;]/,
        1,
        0,
    ],
    main_hand: [
        /\w+\['__beginSelectedItemChangeCheck'\] *= *function\(\) *\{\n.+\n *this\['(\w+)'\] *= *this\['\w+'\]\['\w+'\][,;]/,
        1,
        0,
    ],
    /*
return new tD['A']((0x0,
yJ['N3'])(Kc['vrt']['vHf']),KC['vHU'],(0x0,
                     loc        ori

return new \w+\['\w+'\]\(\(0x0,
\w+\['\w+'\]\)\(\w+\['\w+'\]\['(\w+)'\]\),\w+\['(\w+)'\],\(0x0,

    */
    location: [
        locori,
        1,
        0,
    ],
    orientation: [
        locori,
        2,
        0,
    ],
    x: [
        xyz,
        5,
        0,
    ],
    y: [
        xyz,
        6,
        0,
    ],
    z: [
        xyz,
        7,
        0,
    ],
        /*
        mK['gQF'] = function(mX) {
            this['guW'] <= 0x0 || (this['guW'] -= mX,
            this['guW'] <= 0x0 && this['gum'](0x1));
        }
        */
    durability: [
        /mK\['\w+'\] *= *function\((\w+)\) *\{\n *this\['(\w+)'\] *<= *(?:0x)?0 *\|\| *\(this\['\2'\] *-= *\1,\n *this\['\2'\] *<= *(?:0x)?0 *&& *this\['\w+'\]\((?:0x)?1\)\);\n *\}/,
        2,
        1,
    ],
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
        " *, *\\w+ *= *function\\(\\w+, *\\w+, *\\2, *\\w+, *\\w+, *\\w+\\) *\\{\\n" +
        ")" +
        "(" +
        "( *)var +\\w+ *= *\\w+\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\['\\w+'\\]\\n" +
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
/** @type HTMLTextareaElement */
const code3 = document.querySelector("#code3");
/** @type HTMLButtonElement */
const convert_b = document.querySelector("#convert");

convert_b.onclick = function(){
    let s = code1.value;
    for(let r of replaces){
        s = s.replace(new RegExp(r[0]), r[1]);
    }
    code1.value = s;
    
    const t = [code1.value, code2.value];
    let res = "{";
    for(let i in regexs){
        const r = regexs[i];
        const ss = t[r[2]].match(r[0])?.[r[1]];
        res += "\n    " + i + ": \""+ ss + "\",";
    }
    res += "\n}";
    
    code3.value = res;
};



