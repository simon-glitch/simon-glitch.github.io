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

