
onmessage = function(t, e){
    // document.body.innerHTML += "<br>message works";
    
    // not defined:
    // this.alert("alert works: " + e);
    // this.console.log("console log works:", e);
    console.log({t, e});
    
    postMessage("response!", "*");
};



