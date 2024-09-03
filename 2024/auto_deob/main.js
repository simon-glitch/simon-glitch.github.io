
a_fetch = async function(web_url){
    const f_res = await fetch(web_url);
    const reader = f_res.body.getReader();
    const stream = new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then((reader_res) => {
                    const done = reader_res.done;
                    const value = reader_res.value;
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                        controller.close();
                        return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                });
            }
        },
    });
    // Create a new response out of the stream
    const res = new Response(stream);
    // console.log("res", res);
    const text = await res.text();
    // console.log("text", text);
    // for images?
    // const blob = await res.blob();
    // console.log("blob", blob);
    // const url = URL.createObjectURL(blob);
    // console.log("url", url);
    return text;
};


/**
  * delay for the given number of ms
  * - intended to be run in an async function
  * - don't forget to put await or .then on this function
  * - you can run this inside `.then()` as well
  * @param {number} dur_ms the number of milliseconds to wait
  * @param {number} passby the value to resolve with if this function is being chained with other promises
**/
const delay = function(dur_ms, passby){
    const p = new Promise((res) => {
        setTimeout(res, dur_ms, passby);
    });
    return p;
};

const main_page = "https://cuberealm.io/";

const asts = [];
const scripts = [];
// a catalog just sounds like the kind of thing a set of names would be
const catalog = {};
var script = {
    children: [],
};

const parser = Babel.packages.parser;
const parse = parser.parse;
const traverse = Babel.packages.traverse.default;

var x = 0;

const my_fn = function(path){
    // if(!x) x++, console.log(path);
    // on "ArrowFunctionExpression"
    const b = path.node?.body;
    if(!b) return;
    // console.log("0th pass!", path);
    
    if(!(b.type === "BinaryExpression")) return;
    // console.log("1st pass!", path);
    
    const b1_2 = b.left;
    // console.log("2nd pass!", path);
    
    if(!b1_2) return;
    // console.log("3rd pass!", path);
    
    if(!(b1_2.type === "BinaryExpression")) return;
    // console.log("4th pass!", path);
    
    const b1 = b1_2.left;
    // console.log("5th pass!", path);
    
    if(!b1) return;
    // console.log("6th pass!", path);
    
    const b2 = b1_2.right;
    // console.log("7th pass!", path);
    
    if(!b2) return;
    // console.log("8th pass!", path);
    
    const b3 = b.right;
    // console.log("9th pass!", path);
    
    if(!b3) return;
    // console.log("10th pass!", path);
    
    if(!(b1.type === "StringLiteral")) return;
    // console.log("11th pass!", path);
    
    if(!(b2.type === "MemberExpression")) return;
    // console.log("12th pass!", path);
    
    if(!(b3.type === "StringLiteral")) return;
    // console.log("looks promising!", path);
    
    if(!(b1.value === "./package/")) return;
    // console.log("13th pass!", path);
    
    if(!(b2.object.type === "ObjectExpression")) return;
    // console.log("14th pass!", path);
    
    if(!(b3.value === ".js")) return;
    // console.log("should be added!", path);
    
    b2.object.properties.forEach(v => {
        const url = (
            "/./package/" +
            v.value.value +
            ".js"
        );
        script.children.push(url);
        // ss.push(url);
    });
};

// please note that not all children script are launched, but the code to launch them is extremely simple

// this is some of the most beautiful code XD
const get_scripts = async function(){
    const text = await a_fetch(main_page);
    let ss = text.match(/\/.\/package\/[^\.]+\.js/g) ?? [];
    let next_ss = [];
    while(ss.length){console.log("ss", ss); for(let s of ss){
        await delay(200);
        
        if(catalog[s]) continue;
        script = {
            name: s,
            body: (await a_fetch(s)),
            children: [],
        }
        catalog[s] = script;
        
        scripts.push(script);
        const ast = parse(script.body);
        asts.push(ast);
        /*
    x['u'] = W => './package/' + {
        0xb: '1c157eb690820410c507',
        0x32: '3b806a2b5da18c9977d8',
        0x5d: '8080198e6413fbe0dffa',
        0x127: '1235297917d08b55c455',
        0x1ca: '1a81ab4ad2c73dd0462d'
    }[W] + '.js',
        */
        
        traverse(ast, {
        ArrowFunctionExpression: my_fn});
        
        for(let next_s of script.children){
            next_ss.push(next_s);
        }
    } ss = next_ss; next_ss = [];}
    console.log({scripts, asts});
    
    // this code is evil
    console.log("Alright! I'm done running. You better hope I worked correctly >;D");
};

let __anyones_var__;
const run = function(f =
    async function(){
        return __anyones_var__;
    }
){
    const p = f();
    if(!(p instanceof Promise)){
        throw TypeError("f needs to be asynchronous, or at least return a promise");
    }
    p.catch(e => {
        console.log("fetch process error:", e);
    });
};

run(get_scripts);

/* // ive run this a few times now
let code = `
    x['u'] = W => './package/' + {
        0xb: '1c157eb690820410c507',
        0x32: '3b806a2b5da18c9977d8',
        0x5d: '8080198e6413fbe0dffa',
        0x127: '1235297917d08b55c455',
        0x1ca: '1a81ab4ad2c73dd0462d'
    }[W] + '.js';
`;

traverse(parse(code), {
ArrowFunctionExpression: my_fn});

// */

/* // WHY MUST THIS BE SO COMPLICATED?!

let code = `
(self['webpackChunkcuberealm_client'] = self['webpackChunkcuberealm_client'] || [])['push']([[0x94], {
    0x4721: (T, l, y) => {
    }
}]);


traverse(parse(code), {
ArrowFunctionExpression: my_fn});

// */

my_head_fn = function(path){
    // expects to run on Program
    console.log("0th pass!", path);
    
    const b = path.node.body[0];
    console.log("1st pass!", path);
    
    if(!(start.type === "ExpressionStatement")) return;
    console.log("2nd pass!", path);
    
    const e = b.expression;
    console.log("3rd pass!", path);
    
    if(!(e.type === "CallExpression")) return;
    console.log("4th pass!", path);
    
    if(!(e.arguments.length === 1)) return;
    console.log("5th pass!", path);
    
    const m = e.callee;
    console.log("6th pass!", path);
    
    if(!(m.type === "MemberExpression")) return;
    console.log("7th pass!", path);
    
    const a = m.object;
    console.log("8th pass!", path);
    
    if(!(a.type === "AssignmentExpression")) return;
    console.log("9th pass!", path);
    
    if(!(m.property.type === "StringLiteral")) return;
    console.log("10th pass!", path);
    
    if(!(m.property.value === "push")) return;
    
    console.log("11th pass!", path);
    
    const al = a.left;
    console.log("12th pass!", path);
    
    const ar = a.right;
    
    console.log("13th pass!", path);
    
    if(!(al.type === "MemberExpression")) return;
    console.log("14th pass!", path);
    
    if(!(al.object.type === "Identifier")) return;
    console.log("15th pass!", path);
    
    if(!(al.object.value === "self")) return;
    console.log("16th pass!", path);
    
    if(!(al.property.type === "StringLiteral")) return;
    console.log("17th pass!", path);
    
    if(!(al.property.value === "webpackChunkcuberealm_client")) return;
    
    console.log("18th pass!", path);
    
    if(!(ar.type === "LogicalExpression")) return;
    console.log("19th pass!", path);
    
    const arl = ar.left;
    console.log("20th pass!", path);
    
    const arr = ar.right;
    console.log("21st pass!", path);
    
    if(!(arl.object.type === "Identifier")) return;
    console.log("22nd pass!", path);
    
    if(!(arl.object.value === "self")) return;
    console.log("23rd pass!", path);
    
    if(!(arl.property.type === "StringLiteral")) return;
    console.log("24th pass!", path);
    
    if(!(arl.property.value === "webpackChunkcuberealm_client")) return;
    console.log("25th pass!", path);
    
    if(!(arr.elements === 0)) return;
    console.log("26th pass!", path);
    
    if(!(arr.elements === 0)) return;
    
    console.log("27th pass!", path);
    
    if(!(e.arguments[0].type === "ArrayExpression")) return;
    console.log("28th pass!", path);
    
    const ee = e.arguments[0].elements;
    console.log("29th pass!", path);
    
    if(!(ee.length === 2)) return;
    console.log("30th pass!", path);
    
    if(!(ee[0].type === "ArrayExpression")) return;
    console.log("31st pass!", path);
    
    if(!(ee[1].type === "ObjectExpression")) return;
    console.log("32nd pass!", path);
    
    if(!(ee[0].elements.length === 1)) return;
    console.log("33rd pass!", path);
    
    const n = ee[0].elements[0];
    console.log("34th pass!", path);
    
    if(!(n.type === "NumericLiteral")) return;
    // n might be useful for something, but I doubt so
    console.log("35th pass!", path);
    
    ee[1].properties.forEach(m => {
        script.modules.push({
            index: m.key.value,
            loc: [
                m.start, m.end
            ],
            code: script.body.slice(
                m.start, m.end
            ),
        });
    });
};

script = scripts[0];
script.modules = [];
traverse(asts[0], {
    Program: my_fn,
});
    
