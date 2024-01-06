
/*
onmessage = function(e){
    console.log("received from myself:", e);
};

postMessage("simplest test possible");
*/

const worker_c = 1;
var sub = [];
for(let i = 0; i < worker_c; i++){
    const f = new Worker("worker.js");
    sub.push(f);
    
    fid = setInterval(function(){
        // console.log("attempting frame");
        f.postMessage("N/A", "*");
        // console.log("post successful");
        
        // ^ that should call this: v
        // f.contentDocument.defaultView.onmessage(new MessageEvent(
        //     "post", {
        //         data: "N/A",
        //         origin: window.location.href,
        //         source: window
        //     }
        // ));
        
        clearInterval(fid);
        
        setTimeout(() => {onmessage = function(t, e){
            console.log("Received!", {t, e});
        }}, 1000);
    }, 50);
    
}

