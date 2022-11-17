const to_html_safe = ((text) =>text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "&nbsp;<br>").replace(/\t/g, "  ").replace(/\s(?=\s)|^\s/g, "&nbsp;"));
var nth = ((n) => {
  if(Math.floor(n/10) % 10 === 1){
    return n+"th";
  }
  if(n % 10 === 1) return n+"st";
  if(n % 10 === 2) return n+"nd";
  if(n % 10 === 3) return n+"rd";
  return n+"th";
});
// TODO: add in stringify function that converts objects into strings, with multiple options

var log, unlog, max_logs = 100;

SCOPE_setup_logger: {
  // make error logging easier
  Error.prototype.toString = function(){return "<p class = 'error'>"+ this.name +": "+ this.message +" {line "+ this.lineNumber +"}</p>"};
  
  // the actual values of each log
  let logs = [];
  // names of the logs
  let log_names = [];
  // the ids of the logs, relative to their name groups; -1 means it has no ID nor name
  let log_ids = [];
  // keeps count of ids for specific names
  let log_name_ids = {};
  let total_log_names_used = 0;
  
  // whether each log can be deleted
  let logs_deletable = [];
  let logel = document.querySelector("#logs");
  let b = document.body.innerHTML;
  let l = logel.outerHTML;
  const pre_log = b.slice(0, b.indexOf(l)).match(/\n|^.+$/)[0].replace(/^\n/, "");
  
  /**
  * Logs something into the html element named "logger"
  * @param {string} text - Text to log to logger element
  * @param {object} opt - Configurable options for the log
  * the options are highly configurable;
  * use a string for opt, and the log will be named that string;
  */
  log = function(text, opt){
    opt = (typeof opt === "object") ?(opt || {}) :({name: String(opt)});
    let as_html = opt.html || opt.as_html || (text instanceof Error);
    let name = "" + opt.name || "";
    let id = -1;
    let perm = opt.perm || opt.permanent || false;
    let use_console = opt.console || opt.use_console || log.use_console;
    
    let ok = logs.length < max_logs
    if(!ok){
      unlog();
    }
    text += "";
    
    if(use_console) console.log(text);
    if(!as_html) text = to_html_safe(text);
    // push the new log
    if(ok){
      logs.push(text);
      log_names.push(name);
      if(name){
        if(!log_name_ids[name]){
          log_name_ids[name] = 0;
          total_log_names_used ++;
        }
        log_name_ids[name] ++;
        id = log_name_ids[name];
      }
      log_ids.push(id);
      log_names.push(name);
      logs_deletable.push(!perm);
    }
    logel.innerHTML = "Logs:"+ (ok ?"" :"<h4>Can't make more logs!</h4>") +"<p>"+ logs.join("</p>\n<p>") +"</p>";
  };
  log.use_console = false;
  log.set_opt = function(){};
  
  // unlog returns true if it successfully deletes the log and false if it couldn't delete it
  // using a name for index deletes all logs of that name
  unlog = function(index){
    let shplice = function(i){
      logs.splice(i, 1);
      log_names.splice(i, 1);
      log_ids.splice(i, 1);
      logs_deletable.splice(i, 1);
    };
    if(!index) index = 0;
    if(typeof index === "number"){
      console.log(logs_deletable);
      if(logs_deletable[index]){
        shplice(index);
        return true;
      }
      return false;
    }
    // index is a name; let's remove all logs of this name
    index = ""+index;
    for(let i = 0; i < logs.length; i++){
      if(log_names[i] === index){
        shplice(i);
        delete log_names[i];
        total_log_names_used --;
        i --;
      }
    }
    return true;
  };
}


Object.defineProperty(window, "to_html_safe", {
  value: to_html_safe,
  writeable: false,
});
