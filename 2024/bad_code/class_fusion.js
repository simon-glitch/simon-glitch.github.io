

const a1 = {x: 1};
const a2 = {y: 1};
const a = [a1, a2];

const GPD = Object.getOwnPropertyDescriptor;
const SP = Object.setPrototypeOf;
// const OPHP = Object.prototype.hasOwnProperty;
const DP = Object.defineProperty;
const set_inherent_prop = function(obj, prop, val, is_const){
    DP(obj, prop, {
        value: val,
        enumerable: false,
        readable: true,
        writable: !is_const,
        configurable: !is_const,
    });
};


const special = {
    "hasOwnProperty": true,
    "isPrototypeOf": true,
    "propertyIsEnumerable": true,
    "__defineGetter__": true,
    "__defineSetter__": true,
    "__lookupGetter__": true,
    "__lookupSetter__": true,
};
const reserved = {
    "constructor": true,
    "__proto__": true,
};


const fuse_objects = function(_a){
    if(!(b[Symbol.iterator] instanceof Function)){
        return null;
    }
    
    const a = [];
    for(let b of _a){
        if(!(b.constructor instanceof Function)){
            return null;
        }
        a.push(b);
    }
    
    const _c = {};
    set_inherent_prop(
        _c, "toString",
        function toString(){
            const s = "[object Fusion(";
            a.forEach(v => {s += v.constructor.name + ", "});
            s = s.replace(/(, )?$/, ")]");
            return s;
        }
    );
    set_inherent_prop(
        _c, "toLocalString",
        _c.toString
    );
    set_inherent_prop(
        _c, "valueOf",
        function valueOf(){
            for(let b of a){
                const c = Number(b);
                if(isFinite(c)) return c;
            }
        }
    );
    
    const s = {
        "constructor": function(){
            return a.map(b => b.constructor);
        },
        "__proto__": function(q){
            return q.getPrototypeOf(_c);
        },
    };
    
    return new Proxy(_c, {
        has(c, p){
            if(reserved[p]){
                return false;
            }
            if(special[p]){
                return false;
            }
            for(let b of a)
                if(b.hasOwnProperty(p))
                    return true;
            if(c.hasOwnProperty(p))
                return true;
            return false;
        },
        get(c, p, q){
            if(reserved[p]){
                return s[p](q);
            }
            if(special[p]){
                return c[p];
            }
            for(let b of a)
                if(b.hasOwnProperty(p))
                    return b[p];
            if(c.hasOwnProperty(p))
                return c[p];
            return undefined;
        },
        set(c, p, v){
            if(reserved[p]){
                return false;
            }
            if(special[p]){
                return false;
            }
            let d = false;
            for(let b of a)
                if(b.hasOwnProperty(p))
                    b[p] = v, d = true;
            if(!d) c[p] = v;
            return true;
        },
        getOwnPropertyDescriptor(c, p){
            for(let b of a)
                if(b.hasOwnProperty(p))
                    return GPD(b, p);
            return GPD(c, p);
        },
        getPrototypeOf(c){
            return a.slice();
        },
        setPrototypeOf(c, aa){
            if(!(b[Symbol.iterator] instanceof Function)){
                return false;
            }
            
            const aaa = [];
            for(let b of aa){
                if(!(b instanceof Function)){
                    return false;
                }
                aaa.push(b);
            }
            
            for(let i in aaa){
                SP(a[i], aaa[i]);
            }
            return true;
        }
    });
}

const c = fuse_objects(a);

/*
c.x = 4;
c.y = 3;
c.z = 9;
*/

