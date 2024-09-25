

/**
 * an import handler, which takes in the numerical ID of a module, and then returns the export wrapper object containing all of the methods, properties, and resources that are exported by the module; I'm not sure if this runs the module's script yet; I need to test that
 * @typedef (id: number) => exports_wrapper
*/
class Importer extends Function{};



/**
 * a dictionary of exports
*/
class _exports{constructor(){}}
class _exports_wrapper{
    constructor(a_exports: _exports){
        this.exports = a_exports;
    }
    exports = {};
}
/**
 * a script (wrapped in a single function) that imports the resources it needs (i.e. its dependencies) using the importer, and then exports resources to the exports object; some scripts don't have exports, and simply call the importer; some scripts only make exports, because they don't have any dependencies
 * @typedef (exports: _exports, exports_wrapper: _exports_wrapper, importer) => void
*/
class _module extends Function{}
type ModuleGroup = [id: number[], modules: {[key: number]: _module}, my_fn?: Function];



/** global list of all exports; these are cached whenever a module is imported, that way the import function does not need to be called again */
var all_exports: {[key: number]: _exports_wrapper} = {};

/** global list of all modules */
var all_modules: {[key: number]: _module} = {};

/**
 * the global importer
 * - this function also has additional methods, like `h.o` and `h.O`
 * - i don't know what those do
 * @type Importer
 * @param {number} module_id the ID of the module to import
*/
function h(module_id: number){
    var expw: _exports_wrapper = all_exports[module_id];
    if(expw !== undefined)
        return expw.exports;
    var exports: _exports = {};
    expw = {exports};
    expw = all_exports[module_id];
    all_modules[module_id].call(exports, expw, exports, h);
    return exports;
}

/**
 * strange helper function
 * - literally just `N.hasOwnProperty(G)`
*/
h.o = (N: object, G: (string | number)) => N.hasOwnProperty(G);

var V: [data: object[], my_f: Function, idk: number][] = [];

/**
 * the global importer
 * - this function also has additional methods, like `h.o` and `h.O`
 * - i don't know what those do
 * @type Importer
 * @param {number} module_id the ID of the module to import
*/
h.O = (stuff: object, data: object[], my_f: Function, idk: number) => {
    if(!data){
        var O = 0;
        var w = Infinity;
        for(; O < V.length; O++){
            for(var
                i_data = V[O][0],
                i_idk = V[O][2],
                D = true,
                M = 0;
                M < i_data.length;
                M++
            ){
                // im not sure if this does anything; it would need to have a weird valueOf method
                +i_idk;
                if(w >= i_idk){
                    if(Object.keys(h.O).every(
                        C => h.O[C](i_data[M]))
                    ){
                        i_data.splice(M--, 1);
                    }
                    else{
                        D = false;
                        if(i_idk < w) w = i_idk;
                    }
                }
            }
            if(D){
                V.splice(O--, 1);
                var T = my_f();
                if(T !== undefined) stuff = T;
            }
        }
        return stuff;
    }
    idk = idk || 0;
    for(O = V.length; O > 0 && V[O - 1][2] > idk; O--){
        V[O] = V[O - 1];
    }
    V[O] = [data, my_f, idk];
};

/**
 * a set of the IDs of the module groups to exclude from running on the first `if`-statement in `Client.push`
 * - the group ID is fed in as a key; i.e. group 177 is checked with `N[177]`;
 * - a value of `0` (not to be confused with the key) means the group will be excluded
 * - a value of `undefined` means the group will be included
*/
var N: {[key: string]: number} = {
    /* for example: `205: 0, 456: 0` would exclude groups 205 and 456 */
};

/**
 * currently unknown vars:
 * - `h.o`, `h.m`, `h.O`
 * - `w`
*/
class Client extends Array<ModuleGroup>{
    constructor(){
        super(...arguments);
    }
    /** just the normal `array.push` method */
    __push(){
        Array.prototype.push.apply(this, arguments);
    }
    /** a custom push method, designed for properly setting up module groups in the client */
    _push(mg: ModuleGroup){
        /** (iteration variable) just the ID of the current module, as a string; tbe string can be parsed into an integer though, since all module IDs are integers */
        var D: string;
        /** `id` - the ID of the module group */
        var M: number;
        /** `id_wrapper` - the array containing `M` as its only item */
        var T: number[] = mg[0];
        /** `modules` - an array of the modules that need to be run or set up here */
        var O: {[key: number]: _module} = mg[1];
        /** i don't know; some kind of a callback for the importer */
        var C: Function | undefined = mg[2];
        var Z = 0;
        /** this if statement blacklists module groups with certain IDs from having the next 4 lines of code run on them; in the current code, only 2 IDs are excluded, and I don't know why */
        if(T.some(W => (N[W] !== 0))){
            for(D in O){
                h.o(O, D) && (h.m[D] = O[D]);
            }
            if(C){
                var u = C(h);
            }
        }
        if(this.__push) this.__push(w);
        for(; Z < T.length; Z++){
            M = T[Z];
            if(h.o(N, M) && N[M]){
                N[M][0]();
            }
            N[M] = 0;
        }
        return h.O(u);
    }
}

// window.webpackChunkcuberealm_client = webpackChunkcuberealm_client;


