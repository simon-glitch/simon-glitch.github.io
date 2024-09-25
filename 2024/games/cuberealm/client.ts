

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
class ModuleGroup extends Array{
    constructor(id: number, modules: _module[]){
        super(2);
        this[0] = [id];
        this[1] = [modules];
    }
}



/** global list of all exports; these are cached whenever a module is imported, that way the import function does not need to be called again */
var all_exports: _exports[] = {};

/** global list of all modules */
var all_modules: _module[] = {};

/**
 * the global importer
 * - this function also has additional methods, like `h.o` and `h.O`
 * - i don't know what those do
 * @type Importer
 * @param {number} module_id the ID of the module to import
*/
function h(module_id){
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
 * a set of the IDs of the module groups to exclude from running on the first `if`-statement in `Client.push`
 * - the group ID is fed in as a key; i.e. group 177 is checked with `N[177]`;
 * - a value of `0` (not to be confused with the key) means the group will be excluded
 * - a value of `undefined` means the group will be included
*/
var N = {/* for example: `205: 0, 456: 0` would exclude groups 205 and 456 */};

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
    _push(){
        Array.prototype.push.apply(this, arguments);
    }
    /** a custom push method, designed for properly setting up module groups in the client */
    push(mg: ModuleGroup){
        var D, M;
        /** @type number[] id - an array with one number; the number is the ID of the module group */
        var T = mg[0];
        /** @type _modules[] modules - an array of the modules that need to be run or set up here */
        var O = mg[1];
        /** i don't know; maybe it's a callback for the importer??? */
        var C = mg[2];
        var Z = 0;
        /** this if statement blacklists module groups with certain IDs from having the next 4 lines of code run on them; in the current code, only 2 IDs are excluded, and I don't know why */
        if (T.some(W => (N[W] !== 0))) {
            for (D in O)
                h.o(O, D) && (h.m[D] = O[D]);
            if (C)
                var u = C(h);
        }
        for (this._push && this._push(w); Z < T.length; Z++)
            M = T[Z],
            h.o(N, M) && N[M] && N[M][0](),
            N[M] = 0;
        return h.O(u);
    }
}

// window.webpackChunkcuberealm_client = webpackChunkcuberealm_client;


