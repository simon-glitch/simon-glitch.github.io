
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

const main_page = "https://cuberealm.io/";

const asts = [];

const get_scripts = async function(){
    const text = a_fetch(main_page);
    let ss = text.match(/\/.\/package\/[^\.]+js/g);
    for(let s of ss){
        
    }
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

