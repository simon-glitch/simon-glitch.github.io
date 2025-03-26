
class A{
    A = A
    #a = 0
    constructor(){this["#a"]=this.a}
    get a(){return (this.#a++)}
    set a(a){--this.#a}
    ["#"](a){this.#a = this["#a"]}
};

// you can not make a class that returns a class *SAD FACE*

