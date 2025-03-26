
/**
 * Automatic Frame Handling!
 */
let frame;
frame = {
    ready: true,
    mspf: 32,
    start_time: new Date(),
    current_frame: new Date(),
    last_frame: new Date(),
    completed_fs: 0,
    attempted_fs: 0,
    avg_fps: 0,
    on_fs: [],
    on_f: function(){
        if(this.ready){
            this.ready = false;
            
            this.last_frame = this.current_frame;
            this.current_frame = new Date();
            let dt = this.current_frame.getTime() - this.last_frame.getTime();
            this.avg_fps = 1000 * this.completed_fs / (this.current_frame.getTime() - this.start_time.getTime());
            for(let i = 0; i < this.on_fs.length; i++){
                if(typeof this.on_fs[i] === "function"){
                    this.on_fs[i](dt);
                }
            }
            
            this.completed_fs ++;
            this.ready = true;
        }
        this.attempted_fs ++;
    },
    active: false,
    inveral_id: -1,
    activate: function(){
        this.current_frame = new Date();
        if(!this.active){
            this.interval_id = setInterval(this.on_f.bind(this), this.mspf);
            this.active = true;
        }
    },
    deactivate: function(){
        if(this.active){
            clearInterval(this.interval_id);
            this.inerval_id = -1;
            this.active = false;
        }
    },
};
frame.on_fs.push(c.update.bind(c));
frame.on_fs.push(c.update_scores.bind(c));

c.el.onpointerdown = function(e){
    c.click(e.pageX, e.pageY);
};
c.el.onpointermove = function(e){
    // c.hover(e.pageX, e.pageY);
};

// export it
window.frame = frame;





