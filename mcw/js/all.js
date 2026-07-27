// setup
// == async.js ==
// == wiki.js ==
// == scan.js ==
// == frame.js ==
// == saver.js ==
// == scan_ui.js ==


// == async.js ==
/**
  * Simply make a promise, and extract its resolve and reject functions.
  * @returns {[Promise, (value: any) => void, (reason?: any) => void]}
**/
const q_promise = function(){
    const p = [];
    p[0] = new Promise((a_res, a_rej) => {
        p[1] = a_res;
        p[2] = a_rej;
    });
    return p;
};

/**
  * Wait a fixed amount of time.
  * Promise will resolve with the value `setTimeout` passes into its handler.
  * @param {number} t the number of milliseconds to wait.
**/
const wait = function(t){
    const p = q_promise();
    setTimeout(p[1], t);
    return p[0];
};

wait.query = 500;
wait.contrib = 2000;

// == wiki.js ==
const js_msg = " (when in doubt, JavaScript it out!)";

async function send_post(data, url){
    const params = new URLSearchParams();
    for(const i in data){
        params.append(i, data[i]);
    }
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params,
        });
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // raw is a string of JSON;
        const raw = await response.text();
        // console.log("raw:", raw);
        
        // t is the result of the contrib;
        const t = JSON.parse(raw)
        // console.log('success:', t);
        
        return t;
    }
    catch(error){
        console.error('error:', error);
    }
}

async function get_stuff(action, props){
    await wait(wait.query);
    
    // rs is a ReadableStream;
    const rs = await fetch(
        "https://minecraft.wiki/api.php?action=" +
        action +
        "&format=json" +
        props
    );
    // raw is a string of JSON;
    const raw = await rs.text();
    // t is the wikitext of the page;
    return JSON.parse(raw);
}

async function get_text(title){
    return (await get_stuff(
        "parse",
        "&prop=wikitext&page=" +
        title
    )).parse?.wikitext?.['*'] ?? "";
}

async function get_redrs(title){
    const o = (await get_stuff(
        "query",
        "&prop=linkshere&titles=" +
        title +
        "&lhshow=redirect&lhprop=title&lhlimit=500"
    )).query.pages;
    // it returns a dictionary instead of an array for some reason;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.linkshere ?? [];
}

async function get_wlh(title, raw){
    let o = (await get_stuff(
        "query",
        "&prop=linkshere&titles=" +
        title +
        "&lhprop=title&lhlimit=500"
    ));
    
    // it returns a dictionary instead of an array for a good reason;
    if(raw) return o;
    
    o = o.query.pages;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.linkshere ?? [];
}

async function get_transcludedin(title, raw){
    let o = (await get_stuff(
        "query",
        "&prop=transcludedin&titles=" +
        title +
        "&tiprop=title&tilimit=500"
    ));
    
    // it returns a dictionary instead of an array for a good reason;
    if(raw) return o;
    
    o = o.query.pages;
    return o[
        Object.getOwnPropertyNames(o)?.[0]
    ]?.transcludedin ?? [];
}

async function get_subpages(title){
    return (await get_stuff(
        "query",
        "&list=prefixsearch&pssearch=" +
        title.replace(/\/?$/, "/") +
        "&pslimit=500"
    )).query.prefixsearch;
}

/* make a contribution to the wiki, using the account your currently signed-in as; */
async function contrib(options){
    await wait(wait.contrib);
    
    const rs = await fetch(
        "https://minecraft.wiki/api.php?action=query&format=json&meta=tokens&type=*"
    );
    // raw is a string of JSON;
    const raw = await rs.text();
    // t is the token i need;
    const token = JSON.parse(raw).query.tokens.csrftoken;
    
    options.token = token;
    options.bot = true;
    options.format = "json";
    
    return (await send_post(options, "https://minecraft.wiki/api.php"));
}

/*
    update a page;
    don't check if it already exists;
    don't check if the new text is different than the old text;
    just update it to have the new text;
*/
async function update_page(title, f, summary, o = {}){
    const nt = (
        (f instanceof Function) ?
        (f(await get_text(title))) :
        (f)
    );
    
    o.action = "edit";
    o.title = title;
    o.summary = summary + js_msg;
    o.text = nt;
    
    return (await contrib(o));
}

/*
    edit a page;
    title: page to edit;
    f: either:
    - function to convert old text of page to new text of page;
    - new text of page;
    summary: edit summary (briefly describe your changes);
*/
async function edit(title, f, summary){
    const ct = await get_text(title);
    
    const nt = f instanceof Function ? f(ct) : f;
    
    // don't make an edit that does nothing!
    if(ct === nt) return "Didn't make empty edit.";
    return (await update_page(title, nt, summary, {
        nocreate: 1,
    }));
}

/*
    create a new page;
    title: page to create;
    nt: text of the new page;
    summary: edit summary (briefly describe your changes);
*/
async function create(title, nt, summary){
    return (await update_page(title, nt, summary, {
        createonly: 1,
    }));
}
// == scan.js ==
// used later for BFS;
class Queue{
	constructor(){
		this.a = [];
		this.head = 0;
		this.size = 0;
		this.capacity = 1;
    }
	expand(items){
		let b = [];
		for(let i = 0; i < this.size; i++){
			b[i] = this.a[(this.head + i) % this.capacity];
		}
		this.capacity *= 2;
		this.a = b;
        this.head = 0;
	}
	pushBack(items){
		let i = (this.head + this.size) % this.capacity;
		for(const item of items){
			this.a[i] = item;
			i++, this.size++;
			i %= this.capacity;
			if(this.size === this.capacity) this.expand(), i = this.size;
		}
	}
	popFront(count){
		const res = [];
		count = Math.min(this.size, count); // prevent size from being negative 1 million;
		for(let i = 0; i < count; i++){
			res.push(this.a[this.head++]);
			this.head %= this.capacity;
			this.size--;
		}
		return res;
	}
    getActiveItems(){
        let active = [];
        for(let i = 0; i < this.size; i++){
            active.push(this.a[(this.head + i) % this.capacity]);
        }
        return active;
    }
}

const home = "User:Simanelix";
var wlh_calls = 0;

async function all_wlh(titles){
	const o = {};
	for(const t of titles){
		o[t] = [];
	}
	let cont = "";
	while(true){
		wlh_calls++;
		
		const wlh = await get_wlh(
			titles.join("|") +
			// "&lhshow=!redirect"
			(cont ? "&lhcontinue=" + cont : ""),
			true,
		);
		if(!wlh) break; // <- this shouldn't happen, right? better to be safe than sorry;
		cont = wlh.continue?.lhcontinue;
		
		const p = wlh.query.pages;
		for(const i in p){
			if(!p[i]?.linkshere) continue;
			
			const t = p[i].title;
			o[t]?.push?.(...p[i].linkshere);
		}
		
		if(!cont) break;
	}
	return o;
}

// maximum allowed number of values for "title" by the MW API;
const wlh_limit = 50;
// limit on how many pages I want my computer to scan
const scan_limit = 10_000;

// logic for creating a bidirectional link map;
let map = [];
// code related to these ids is quite jank; and it being handled separately from to_scan somewhat annoys me, but it has to be janky no matter how you solve it;
map.ids = new Map();
function get_id(page){
	let id = map.ids.get(page);
	if(isNaN(id)){
		id = map.length;
		map.ids.set(page, id);
		map[id] = {page, links_o: new Set(), links_i: new Set()};
	}
	return id;
}
function add_links(page /* title */, links /* list of titles that link here (i.e. input links) */){;
	const id = get_id(page);
	const a = map[id].links_i;
	for(const link of links){
		const id_l = get_id(link);
		a.add(id_l);
		map[id_l].links_o.add(id);
	}
	return map[id];
}

function sort(){
	const copy = map.map((v, i) => ({
		id: i,
		page: v.page,
		links_o: new Set(v.links_o),
		links_i: new Set(v.links_i),
		links_s: new Set(),
	}));
	// find second neighbors
	copy.forEach((v, i) => {
		v.links_s = Array.from(v.links_o.union(v.links_i)).map(
			u => u.links_o.union(u.links_i)
		).reduce(
			(a,b) => a.union(b), new Set()
		)
	});
	// sort by neighbor count;
	copy.sort((a,b) => (
		(a.links_i.size + a.links_o.size + a.links_s.size ** 0.5) -
		(b.links_i.size + b.links_o.size + b.links_s.size ** 0.5)
	));
	const ids = new Map();
	copy.forEach(v => {
		ids.set(v.page, v.id);
	});
	// cleanup and update map;
	map = copy.map(v => ({
		page: v.page,
		links_o: new Set(v.links_o),
		links_i: new Set(v.links_i),
	}));
	map.ids = ids;
}

// navigate to a page, to see its links in and links out;
function navigate(page){
	const o = {page};
	const m = map[get_id(page)];
	// remove redundant items, especially since pages linking back and forth is common;
	const exclude = new Set();
	exclude.add(page);
	o.links_i = Array.from(m.links_i).map(i => map[i].page).filter(v => !exclude.has(v));
	o.links_i.forEach(v => exclude.add(v));
	o.links_o = Array.from(m.links_o).map(i => map[i].page).filter(v => !exclude.has(v));
	o.links_o.forEach(v => exclude.add(v));
	o.siblings = Array.from(m.links_i)
	.flatMap(i => Array.from(map[i].links_o))
	.map(i => map[i].page)
	.filter(v => !exclude.has(v));
	o.siblings.forEach(v => exclude.add(v));
	o.coparents = Array.from(m.links_o)
	.flatMap(i => Array.from(map[i].links_i))
	.map(i => map[i].page)
	.filter(v => !exclude.has(v));
	return o;
}

class Scanner{
    constructor(titles /* starting point: string[] */, scanned){
        this.scan_c = 0;
        this.scanned = scanned ?? new Set();
        this.to_scan_m = new Set();
        this.to_scan = new Queue();
        this.to_scan.pushBack(titles);
        for(const title of titles){
            this.to_scan_m.add(title);
        }
        this.busy = false;
    }
    done(){
        return !(this.to_scan.size && this.scan_c < scan_limit);
    }
    async a_scan_step(){
        this.busy = true;
		const ts = this.to_scan.popFront(wlh_limit).filter(t =>
			!this.scanned.has(t)
		);
		if(!ts.length) return this.busy = false;
		
		const wlhs = await all_wlh(ts);
		
		for(const t in wlhs){
			this.scanned.add(t);
			const ps = wlhs[t].map(p => p.title);
			add_links(t, ps);
			const pf = ps.filter(p => !this.to_scan_m.has(p));
			this.to_scan.pushBack(pf);
			for(const p of pf){
                this.to_scan_m.add(p);
			}
		}
		this.scan_c += ts.length;
        this.busy = false;
	}
    // this wrapper is to prevent async calls from getting stuck in the event loop's queue;
    scan_step(){
        if(this.busy) return;
        this.a_scan_step();
    }
}
/** @type {Scanner} */
let scanner = null;

const base_64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-=";
const inv_base_64 = {};
base_64.split("").forEach((v,i) => inv_base_64[v] = i);

// escape "\" -> "\\", "," -> "\c", ";" -> "\s"; newlines are not needed since MediaWiki does not allow them;
function c_escape(text){
    return text.replace(/\\/g, "\\\\").replace(/,/g, "\\c").replace(/;/g, "\\s");
}
function c_unescape(text){
    return text.replace(/\\s/g, ";").replace(/\\c/g, ",").replace(/\\\\/g, "\\");
}

// convert an integer into a base 64 string;
function to_base_64(n){
    let s = "";
    while(n > 0){
        s = base_64[n % 64] + s;
        n = Math.floor(n / 64);
    }
    if(!s) s += "0";
    return s;
}

// convert a base 64 string into an integer;
function from_base_64(s){
    let n = 0;
    for(let i = 0; i < s.length; i++){
        n *= 64;
        n += inv_base_64[s[i]];
    }
    return n;
}



// == frame.js ==
const builtinify = function(fs){
    fs.forEach((f) => {
        f.name = "function " + f.name + "() { [native code] }";
    });
};

const const_prop = function(obj, prop, value, enumerable = true){
    if(!obj) return obj;
    try{
        Object.defineProperty(obj, prop, {
            value,
            writable: false,
            enumerable,
            configurable: false,
        });
        return obj;
    }
    catch(e){return e;}
};
const fast_const_prop = function(obj, prop){
    if(!obj) return obj;
    try{
        return const_prop(
            obj, prop, obj[prop],
            Object.getOwnPropertyDescriptor(
                obj, prop,
            ).enumerable,
        );
    }
    catch(e){return e;}
};

/*
# Function factory Busy
Make a function that is resistant to asnychronous execution. Busy works by making a wrapper around f, named busy_f. Only one instance of the function can be called at a time. This means the function can safely modify variables without having to worry about memory collisions from separate threads. This is very similar to a mutex lock and is much simpler than event throttling.
- "busy_f" is an instance of Busy;
- returns {function} busy_f
    - calling busy_f will return immediately return Busy.busy if busy_f is being run on a separate thread;
    - otherwise, busy_f will call f on this thread;
    - this means that, assuming f is privately stored in the scope of busy_f, there can only ever be 1 instance of f running at a given time;
    - essentially, busy_f "protects" f from parallel execution;
    - busy_f will return whatever f returns if it actually runs f;
    - property {bool} busy_f.busy - whether busy_f is busy;
- usage: Busy(f)
- parameters:
    - {function} f: the function that busy_f will call;
    - {boolean} is_async: whether busy_f should be async; f will be awaited if it is;
- members:
    - {boolean} busy [readonly]: whether busy_f is busy;
    - {boolean} Busy.m_busy [private]: internal variable for busy_f.busy;
    - {string} name: the name of busy_f; defaults to f.name;
*/
const Busy = (function _s_Busy(){
    const m_busy = Symbol("Busy.m_busy");
    return function Busy(f, is_async = false){
        if(!(f instanceof Function)){
            throw TypeError("parameter f in Busy(f) must be a function;");
        }
        
        // the primary function
        const busy_f_b = function busy_f(){
            if(busy_f[m_busy]){
                return Busy.busy;
            }
            busy_f[m_busy] = true;
            
            let res;
            try{
                res = f.apply(this, arguments);
            }
            // catch any errors f throws, since otherwise we would be perpetually busy doing nothing as soon as f throws an error;
            catch(e){
                busy_f[m_busy] = false;
                // make sure to rethrow since this wrapper is supposed to be non-invasive
                throw e;
            }
            busy_f[m_busy] = false;
            return res;
        };
        // the async version
        const busy_f_a = async function busy_f(){
            if(busy_f[m_busy]){
                return Busy.busy;
            }
            busy_f[m_busy] = true;
            
            let res;
            try{
                res = await f.apply(this, arguments);
            }
            // catch any errors f throws, since otherwise we would be perpetually busy doing nothing as soon as f throws an error;
            catch(e){
                busy_f[m_busy] = false;
                // make sure to rethrow since this wrapper is supposed to be non-invasive
                throw e;
            }
            busy_f[m_busy] = false;
            return res;
        };
        // select async or normal
        const busy_f = (
            is_async ?
            busy_f_a :
            busy_f_b
        );
        
        /** @type {number} */
        busy_f[m_busy] = false;
        /** @type {string} */
        busy_f.name = f.name;
        Object.defineProperty(busy_f, "busy", {
            get: (() => busy_f[m_busy]),
            enumerable: true,
            configurable: false,
        });
        return busy_f;
    };
})();
Busy.busy = Symbol("Busy.m_busy");
fast_const_prop(Busy, "busy");

/**
  * Simply make a promise, and extract its resolve and reject functions.
  * @returns {[Promise, (value: any) => void, (reason?: any) => void]}
**/
const q_promise = function(){
    const p = [];
    p[0] = new Promise((a_res, a_rej) => {
        p[1] = a_res;
        p[2] = a_rej;
    });
    return p;
};

/* ===
Frame handler
=== */

/*
# Class Frame
A frame handler. This can be used to handle animations, or to gradually do computations that take a long time. frame.start starts the frame handler, causing it to tick every frame. frame.stop stops it.
- "frame" is an instance of Frame;
- parameters:
    - {object} options: overrides the default values for each of the public member variables of frame that are specified in option;
    - {number} options: if a number for options is passed in, it overrides the default value for mspf;
- members:
    - {number} mspf: the number of milliseconds to wait between frames; this number is used to set the tick speed in window.setInterval; defaults to 16;
    - {number} on_tick: list of functions to run when frame.tick is called; i.e. these functions are run every tick or frame; defaults to [];
    - {Frame.stop | Frame.break | Frame.continue} on_error: what frame.tick should do when an error occurs in one of the on_tick functions; defaults to Frame.stop;
    - {Error} error: the last error returned by any call to frame.tick;

# Methods
- {async () => Symbol | Error} tick:
    Ticks the function, and runs every function in frame.on_tick, in order.
    If an error occurs in one of the functions, it will be saved in frame.error, and handled differently depending on the value of frame.on_error:
    - case Frame.stop: the frame handler stops ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.break: the frame handler continues ticking, the error is saved in tick.error, then the error is returned, and then the rest of the functions in frame.on_tick are skipped (for this tick);
    - case Frame.continue: the frame handler continues ticking, the error is saved in tick.error, and frame.tick continues to the next function in frame.on_tick; since multiple errors can occur, all errors thrown by all functions frame.on_tick will be aggegated together into an AggregateError which will then be saved in frame.error;
    If any one of the functions returns Busy.busy, execution might stop depending on the value of frame.on_busy:
    - case Frame.stop: the frame handler stops ticking, Busy.busy is returned, and then the rest of the functions in frame.on_tick are skipped;
    - case Frame.break: the frame handler continues ticking, Busy.busy is returned, and then the rest of the functions in frame.on_tick are skipped (for this tick);
    - case Frame.continue: the frame handler continues ticking; so no special treatement is given to the return values; on_tick will return Frame.success no matter how many or how few of the functions return Busy.busy;
- {() => bool} start:
    Makes the frame handler start ticking, by running window.setInterval on frame.tick.
    returns:
    - {bool} succeeded: whether start successfully started ticking or not;
- {() => bool} stop:
    Makes the frame handler stop ticking, by running window.clearInterval on the approriate interval ID.
    returns:
    - {bool} succeeded: whether stop successfully stopped ticking or not;
*/
const Frame = (function _s_Frame(){
    const m_id = Symbol("Frame.m_id");
    const m_running = Symbol("Frame.m_running");
    const m_on_error = Symbol("Frame.m_on_error");
    
    // all valid options;
    const options_v = [
        "mspf",
        "on_tick",
        "on_error",
    ];
    // map of all valid options;
    const options_m = {};
    
    for(let i of options_v){
        options_m[options_v] = true;
    }
    const Frame = function Frame(options){
        // members need to be explicitly constructed
        this.on_tick = [];
        
        // # Options
        // mspf short-hand
        if(options instanceof Number && isFinite(options)){
            this.mspf = options;
            return;
        }
        // ignore null
        if(!options) return;
        // ignore non-objects
        if(typeof options != "object") return;
        // the rest
        for(let i in options){
            if(options_m[i]){
                this[i] = options[i];
            }
        }
    };
    
    // all symbol values for on_error;
    const on_error_v = [
        Symbol("Frame.stop"),
        Symbol("Frame.break"),
        Symbol("Frame.continue"),
    ];
    // this map is used to check for valid values;
    const on_error_m = {};
    const on_error_d = on_error_v[0];
    // generate the map and also make sure the symbols are accessible as static constant public members of the class;
    for(let i of on_error_v){
        const_prop(
            Frame,
            i.toString().replace(
                /^Symbol\(Frame\.|\)$/g,
                ""
            ),
            i,
        );
        on_error_m[i] = i;
    }
    
    
    
    Frame.success = Symbol("Frame.success");
    fast_const_prop(Frame, "success");
    
    // set up Frame.prototype;
    // public members
    const _ = Frame.prototype;
    _.mspf = 16;
    _.on_tick = [];
    // sanitize on_error
    Object.defineProperty(_, "on_error", {
        get: function(){
            return this[m_on_error];
        },
        set: function(oe){
            this[m_on_error] = on_error_m[oe] ?? on_error_d;
        },
        enumerable: true,
        configurable: false,
    });
    _.on_error = on_error_d;
    _.error = new Error("No errors have occured.");
    
    // private members
    _[m_id] = -1;
    _[m_running] = false;
    
    // public methods
    _.tick = Busy(async function tick(){
        switch(this[m_on_error]){
            case Frame.stop: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        await f?.();
                    }
                }
            }
            catch(e){
                frame.stop();
                this.error = e;
                return e;
            }
            break;
            case Frame.break: try{
                if(this.on_tick[Symbol.iterator]){
                    for(let f of this.on_tick){
                        await f?.();
                    }
                }
            }
            catch(e){
                this.error = e;
                return e;
            }
            break;
            case Frame.continue: {
                const errors = [];
                // the outer try-catch handles any errors with the iterator for on_tick array;
                try{
                    if(this.on_tick[Symbol.iterator]){
                        for(let f of this.on_tick){
                            try{
                                await f?.();
                            }
                            catch(e){
                                errors.push(e);
                            }
                        }
                    }
                }
                catch(e){
                    errors.push(e);
                }
                if(errors.length > 0){
                    const e = new AggregateError(e, "Tick Errors");
                    this.error = e;
                    return e;
                }
                break;
           }
        }
        return Frame.success;
	// this line is important; the ", true" tells Busy that it's an async function;
    }, true);
    _.start = function(){
        if(this[m_running]) return false;
        this[m_id] = window.setInterval(this.tick.bind(this), this.mspf);
        this[m_running] = true;
        return true;
    };
    _.stop = function(){
        if(!this[m_running]) return false;
        window.clearInterval(this[m_id]);
        this[m_id] = -1;
        this[m_running] = false;
        return true;
    };
    
    // prevent methods from being modified, since that would be silly;
    fast_const_prop(_, "tick");
    fast_const_prop(_, "start");
    fast_const_prop(_, "stop");
    
    return Frame;
})();

// == saver.js ==
/** @import scan.js */

/**
 * Class to compress and save text to a file.
 * It can also load a save from a file. 
 */
class Saver{
    constructor(save_to, load_from){
        /** The file to save to. @type {FileSystemFileHandle} */
        this.save_to = save_to;
        /** The file to load from. @type {FileSystemFileHandle} */
        this.load_from = load_from;
    }
    /** Returns an iterator, which gives you the uncompressed text in chunks. */
    async save(){
        const file_writable = await this.save_to.createWritable();
        
        const compression_stream = new CompressionStream('gzip');
        const upload_pipe = compression_stream.readable.pipeTo(file_writable);
        const writer = compression_stream.writable.getWriter();
        const encoder = new TextEncoder();
        
        for(let i = 0; i < 50_000_000; i++){
            const chunk_text = `Line ${i}: This is some repetitive text that compresses incredibly well.\n`;
            await writer.write(encoder.encode(chunk_text));
        }
        
        await writer.close();
        await upload_pipe;
        console.log("finished saving");
    }
    /** Add a string of text to the uncompressed data which will be saved. CompressionStream will automatically compress it. */
    async load(){
        const file = await this.load_from.getFile();
        
        const decompression_stream = new DecompressionStream('gzip');
        const text_decoder_stream = new TextDecoderStream();
        const readable_text_stream = file.stream()
        .pipeThrough(decompression_stream)
        .pipeThrough(text_decoder_stream);
        const reader = readable_text_stream.getReader();
        
        while(true){
            const {value, done} = await reader.read();
            if(done)break;
            this.process(value);
        }
        
        console.log("finished loading");
    }
    process(){
        // does nothing because you are supposed to override this with your script;
    }
}

// escape "\" -> "\\", "," -> "\c", ";" -> "\s"; newlines are not needed since MediaWiki does not allow them;
function c_escape(/** @type {string}*/ text){
    return text.replace(/\\/g, "\\\\").replace(/,/g, "\\c").replace(/;/g, "\\s");
}
function c_unescape(/** @type {string}*/ text){
    return text.replace(/\\s/g, ";").replace(/\\c/g, ",").replace(/\\\\/g, "\\");
}

/** @type {string[]} */
let grabbed = [];
let prev = "";
/** set to either get_c or get_n, used in load_chunk to process chunks of data from the save file; @type {(curr: string) => void} */
let get_f;

// grab save data, split by comma, until we hit a newline
function get_c(/** @type {string}*/ curr){
    const both = prev + curr;
    const grabbed = both.split(",").map(c_unescape);
    prev = grabbed.pop();
    const newline = prev.split("\n", 2);
    if(newline.length === 2){
        grabbed.push(newline[0]);
        prev = newline[1];
        get_f = get_n;
    }
}

// grab save data, split by newline
function get_n(/** @type {string}*/ curr){
    const both = prev + curr;
    const grabbed = both.split("\n").map(c_unescape);
    prev = grabbed.pop();
    return grabbed;
}

let new_titles = [];

// convert text (chunk by chunk) into map, overriding the existing map and queue;
function load_chunk(text){
    if(get_f === get_c){
        new_titles.push(...grabbed);
    }
    if(get_f === get_n) for(const grabbed_item of grabbed){
        const t_node = grabbed_item.split(";");
        map.push({page: c_unescape(t_node[0]), links_i: new Set(
            t_node[1] ?
            t_node[1].split(",").map(from_base_64) :
            []
        ), links_o: new Set(
            t_node[2] ?
            t_node[2].split(",").map(from_base_64) :
            []
        )});
    }
}

async function load_all(){
    new_titles = [];
    get_f = get_c;
    
    const saver = new Saver();
    saver.process = load_chunk;
    await saver.load();
    
    scanner = new Scanner(new_titles);
    
    // setup map.ids;
    map.ids = new Map();
    map.forEach((node, id) => {
        if(id === 0) return;
        map.ids.set(node.page, id - 1);
    });
}


// == scan_ui.js ==
// this section is WIP part where I need to rewrite quite a bit;
// convert map and scanner.to_scan into text, returns that text; also mutates map to be sorted;
function save_t(){
    // first, sort the map;
    for(let i = 0; i < map.length; i++){
        map[i].old = i;
    }
    map.sort((a,b) => (
        a.page < b.page ? -1 :
        a.page > b.page ? +1 :
        0
    ));
    const ri = [];
    for(let i = 0; i < map.length; i++){
        ri[map[i].old] = i;
    }
    for(let i = 0; i < map.length; i++){
        map[i].links_i = new Set([...map[i].links_i]
            .map(j => ri[j]).sort((a,b) => a-b)
        );
        map[i].links_o = new Set([...map[i].links_o]
            .map(j => ri[j]).sort((a,b) => a-b)
        );
    }
    // replace map.ids, since it is outdated; also .sort() might just erase it;
    map.ids = new Map();
    map.forEach((node, new_id) => {
        map.ids.set(node.page, new_id);
        // and cleanup this;
        delete node.old;
    });
    let text = "";
    text += scanner.to_scan.getActiveItems().map(c_escape).join(",");
    for(const node of map){
        text += "\n" +
        // i almost forgot to escape here!
        c_escape(node.page) + ";" +
        [...node.links_i].map(to_base_64).join(",") + ";" +
        [...node.links_o].map(to_base_64).join(",");
    }
    text = LZString.compressToBase64(text);
    return text;
}
// convert text into map; returns the new map, rather than overriding the existing map;
function load_t(text){
    text = LZString.decompressFromBase64(text);
    const map = [];
    const t_nodes = text.split("\n");
    map[0] = t_nodes[0].split(",").map(c_unescape);
	for(let i = 1; i < t_nodes.length; i++){
        const t_node = t_nodes[i].split(";");
        map.push({page: c_unescape(t_node[0]), links_i: new Set(
            t_node[1] ?
            t_node[1].split(",").map(from_base_64) :
            []
        ), links_o: new Set(
            t_node[2] ?
            t_node[2].split(",").map(from_base_64) :
            []
        )});
    }
    // setup map.ids;
    map.ids = new Map();
    map.forEach((node, id) => {
        if(id === 0) return;
        map.ids.set(node.page, id - 1);
    });
    return map;
}

// loads the new map onto the old map, completely replacing the old map; returns void;
function load_m(new_map){
    map.splice(0, map.length);
    for(let i = 1; i < new_map.length; i++){
        map.push(new_map[i]);
    }
    // don't forget map.ids;
    map.ids = new_map.ids;
    // find out which items we already scanned; if we have their links_i, we assume they are scanned, assuming we got all of the items and the wiki has not changed significantly;
    const scanned = new Set();
    for(const node of map){
        if(node.links_i.size > 0) scanned.add(node.page);
    }
	scanner = new Scanner(new_map[0], scanned);
}

let dir_handle = null;

/**
 * Prompts the user to select a directory and stores the handle.
 * @returns {Promise<FileSystemDirectoryHandle>}
 */
async function get_handle() {
    try{
        // This will trigger the browser's folder picker prompt
        dir_handle = await window.showDirectoryPicker({
            mode: 'readwrite' // Requests full read/write access upfront
        });
        console.log("Directory handle secured:", dir_handle.name);
    }
    catch(error) {
        console.error("User denied permission or folder selection failed:", error);
    }
}

const file_name = "scan.txt";
// save text to scan.txt;
async function save(text){
    if(!dir_handle){
        await get_handle();
    }
    try{
        const file_handle = await dir_handle.getFileHandle(file_name, {create: true});
        const writabe_stream = await file_handle.createWritable();
        await writabe_stream.write({
            type: "write",
            data: text,
        });
        await writabe_stream.close();
        
        console.log(`successfully wrote to ${file_name}`);
    }
    catch(error){
        console.error(`failed to write to ${file_name}:`, error);
    }
}

// read the text from scan.txt and return it;
async function load(){
    if(!dir_handle){
        await get_handle();
    }
    try{
        const file_handle = await dir_handle.getFileHandle(file_name, { create: false });
        const file = await file_handle.getFile();
        const text = await file.text();
        return text;
    }
    catch(error){
        if (error.name === 'NotFoundError') {
            console.log(`The file "${file_name}" does not exist yet.`);
            return "";
        }
        console.error(`Failed to read from ${file_name}:`, error);
    }
}

async function my_save(){
    const text = save_t();
    await save(text);
}

async function my_load(){
    const text = await load();
    const new_map = load_t(text);
    load_m(new_map);
}

let viewer;
let previous_title;
let current_title;
let refresh = true;
let scanner_paused = true;

const view_frame = new Frame({ontick: function my_frame(){
    if(!scanner_paused && scanner){
        if(scanner.done()){
            scanner = null;
        }
        else{
            scanner.scan_step();
        }
    }
    
	console.log("Pages found:", map.length);
	const container = document.querySelector(".wikiscan");
	if(!container) return;
	if(!viewer){
		viewer = document.createElement("div");
		container.appendChild(viewer);
	}
    
    if(current_title === previous_title && !refresh) return;
    previous_title = current_title;
    refresh = false;
	
	let nav = navigate(current_title);
	let t = "";
	t += `<h3 onclick="my_navigate('${current_title}')">${current_title}</h3>`;
	t += `<p>`;
	t += `<button onclick="current_title=home">Home</button>`;
	t += `<button onclick="my_save()">Save</button>`;
	t += `<button onclick="my_load()">Load</button>`;
	t += `<button onclick="refresh=true;scanner_paused=true">Pause</button>`;
	t += `<button onclick="refresh=true;scanner_paused=false">Play</button>`;
	t += `<button onclick="refresh=true">Refresh</button>`;
	t += `</p>`;
	t += `<p>pages found: ${map.length}; scanned: ${scanner?.scan_c}/${scan_limit}; ${scanner_paused ? "paused" : "running"}</p>`;
	t += `<p><b>Links out (children):</b></p>`;
	t += `<ul>`;
	for(const link of nav.links_o){
		t += `<li onclick="my_navigate('${link}')">${link}</li>`;
	}
	t += `</ul>`;
	t += `<b>Links in (parents):</b>`;
	t += `<ul>`;
	for(const link of nav.links_i){
		t += `<li onclick="my_navigate('${link}')">${link}</li>`;
	}
	t += `</ul>`;
	t += `<b>Siblings:</b>`;
	t += `<ul>`;
	for(const link of nav.siblings){
		t += `<li onclick="my_navigate('${link}')">${link}</li>`;
	}
	t += `</ul>`;
	t += `<b>Coparents:</b>`;
	t += `<ul>`;
	for(const link of nav.coparents){
		t += `<li onclick="my_navigate('${link}')">${link}</li>`;
	}
	t += `</ul>`;
	
	viewer.innerHTML = t;
},});

window.my_navigate = function my_navigate(new_title){
	current_title = new_title;
	frame();
};

async function main(){
	frame.id = setInterval(frame, 1000);
	frame.delete = () => clearInterval(frame.id);
	current_title = home;
	frame();
	scanner = new Scanner([current_title]);
    console.log("Done scanning.");
}
main();


