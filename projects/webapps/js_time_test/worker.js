
class Sub_Data{p = new Promise(); done = [false]; times = [0]; f = function(){}; todo_c = 0;}
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
    
    data.sub.times[data.index] = (t1.getTime() - t2.getTime());
    data.sub.done[data.index] = true;
};


