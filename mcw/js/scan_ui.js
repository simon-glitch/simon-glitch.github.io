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

