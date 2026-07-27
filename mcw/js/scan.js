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


