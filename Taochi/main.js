
const ca = document.querySelector("canvas");
const c = ca.getContext("2d");

/*
A level has:
*   an origin - an arbitrary point to "center" the world on; the level editor defaults to the origin
*   block data:
    *   a grid of blocks
*   a version tuple:
    *   wrapper object for an array of numbers
Each block is:
*   an integer
*   a state tuple:
    *   wrapper object for an array of numbers
*/

const Tuple = class Tuple{
    v = [0]
    constructor(...args){
        this.v = args.map(v => Math.round(Number(v)));
    }
    toString(){
        return this.v.join(".");
    }
}
Tuple.fromString = function(t){
    return new Tuple(t.split("."));
};




