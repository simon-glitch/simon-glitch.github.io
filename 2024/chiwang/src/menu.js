
(function(){

const global = window[
    "Somebody might have named their variable `global`," +
    "so I'll just use this long string for mine. !@#$%^&*"
];

const _ = {};

class Menu{
    vs = [];
    ui = [];
    constructor(d){
        if(!d) return;
        
        const ui = d.ui ?? [];
        if(!(ui instanceof Array)){
            throw new TypeError("{ui} must be an Array");
        }
        for(let i = 0; i < ui.length; i++){
            const item = ui[i];
            if(!(item instanceof Menu_Item)){
                throw new TypeError(
                    "{ui} item was " +
                    ((item ?? _ == _) ? item : ("an instance of {" + item.constructor.name + "}"))
                );
            }
            this.insert(item);
        }
    }
    insert(item){
        this.ui.push(item);
        item
    }
}


});
