
class Sub_Data{f = function(){}; todo_c = 0;}
class Data{index = 0; sub = new Sub_Data();}

onmessage = function worker_process(e){
    /**
     * @type Data
     */
    const data = e.data;
    
    let t1 = new Date;
    
    for(let i = 0; i < data.sub.todo_c; i++){
        data.sub.f(i);
    }
    
    let t2 = new Date;
    
    self.postMessage({
        index: data.index,
        time: (t2.getTime() - t1.getTime()),
    });
};


