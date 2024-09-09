
async function a_fetch(web_url){
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


function get_main_script(){
    let q = document.querySelectorAll("head>script");
    for(let i = q.length - 1; i >= 0; i--){
        if(q[i].src.match(/^https\:\/\/cuberealm\.io\/package\//)) return q[i];
    }
};

/** `js` is the actual text of the main script */
function parse(js){
    const re = new RegExp(
        " *\\}\\)\\)\\)," +
        " *\\w+\\['\\w+'\\]\\['getState'\\]\\(\\)\\['\\w+'\\]\\(\\w+\\['\\w+'\\]\\['\\w+'\\]\\)," +
        " *\\w+\\['GameAnalytics'\\]\\['initialize'\\]\\('(\\w+)', *'(\\w+)'\\)," +
        " *setTimeout\\(function\\(\\) *\\{" +
        " *console\\['log'\\]\\('%cSTOP\\\\x20RIGHT\\\\x20THERE!'," +
        ""
    );
    const m = js.match(re);
    console.log("keys", m);
    if(!m) return;
    
    const session_num_key = "GA::" + m[1] + "::session_num";
    console.log("session num", localStorage.getItem(session_num_key));
};

function main(){
    a_fetch(
        get_main_script().src
    ).then(
        js => parse(js)
    )
};

main();

/*

Reference:

}))),
b.x.getState().bfS(D.v.bUq),
r5.GameAnalytics.initialize('b3296cee59caef0f872506b17d145821', '20c33a152838e467b0d21a677ddfbb084891fb3d'),
setTimeout(function() {
    console.log('%cSTOP RIGHT THERE!',


}))),
b['x']['getState']().bfS(D.v.bUq),
r5['GameAnalytics']['initialize']('b3296cee59caef0f872506b17d145821', '20c33a152838e467b0d21a677ddfbb084891fb3d'),
setTimeout(function() {
    console['log']('%cSTOP RIGHT THERE!',


 *\}\)\)\),\n
 *\w+\['\w+'\]\['getState'\]\(\)\['\w+'\]\(\w+\['\w+'\]\['\w+'\]\),\n
 *\w+\['GameAnalytics'\]\['initialize'\]\('(\w+)', '(\w+)'\),\n
 *setTimeout\(function\(\) *\{\n
 *console\['log'\]\('%cSTOP RIGHT THERE!',




*/




