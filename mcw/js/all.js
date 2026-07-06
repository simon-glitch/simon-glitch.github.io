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

// used for compression
// source: https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js
// one of my favorite webpages
var LZString=function(){
    var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i
}();(
    "function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString})
);

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

// TODO: make a function to fuse 2 maps together;

// Global or state variable to store your directory handle once retrieved
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

function frame(){
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
	t += `<p>pages found: ${map.length}; scanned: ${scanner.scan_c}/${scan_limit}; ${scanner_paused ? "paused" : "running"}</p>`;
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
}

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
