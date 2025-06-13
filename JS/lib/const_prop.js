
/**
  * Check if an object is "array-like".
  * - i.e. does it have a `length` property, and is not a string;
  * - or does it have an `in` iterator?
  * @param {*} obj 
  * @returns {number}
  * - `0` if the object is not array-like;
  * - `1` if it can be indexed into;
  * - `2` if it can be iterated on with `for v of`;
  * - `3` if it is an actual array;
**/
const is_array_like = function(obj){
    // check for non-objects
    if(typeof object !== "object" || object === null)
        return 0;
    if(obj instanceof Array)
        return 3;
    // check for `in`
    if(Symbol.iterator(obj)) return 2;
    // check for `length`
    if(obj.length instanceof Number)
        return 1;
}

/**
  * Convert an array-like object into a proper array.
  * - wraps the object in an array if it not array-like;
  * - makes a copy of the object without mutating it;
  * @param {*} obj object to convert;
  * @returns {Array}
**/
const auto_array = function(obj){
    const is_array = is_array_like(obj);
    if(is_array === 0) return [obj];
    // good ol fashioned for loop
    if(is_array === 1){
        const res = [], L = obj.length;
        for(let i = 0; i < L; i++) res[i] = obj[i];
        return res;
    };
    // 
    if(is_array === 2) return [...obj];
    if(is_array === 3) return obj.slice();
}

// const_prop using less lines of code
// i.e. dry const_prop;
// 48 lines
/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_prop_1 = function(obj, prop, value, enumerable = true){
    // errors might occur inside is_array_like or inside the ellipsis;
    try{
        const is_array = is_array_like(prop);
        // normalization
        // needs to be done here in case props
        // can only be iterated and not directly indexed
        prop = auto_array(prop);
        const is_kvp = (
            is_array &&
            is_nullish(value) &&
            is_array_like(prop[0])
        );
        // more normalization
        let props = prop;
        let values = (is_kvp ? auto_array(value) : []);
        // use prop as kvps for props and values
        if(is_kvp){
            for(let i = 0; i < prop.length; i++){
                let prop_i = prop[i];
                const prop_a = is_array_like(prop_i);
                // skip type 0
                if(prop_a === 0) continue;
                // take 2 items if it's an iterator
                // i.e. normalize type 2 into type 3
                if(prop_a === 2){
                    // i don't want all 37000 items from your iterator
                    prop_i = prop_i[Symbol.iterator].take(2);
                };
                // types 1 and 3 can be indexed into
                values[i] = prop_i[1];
                props[i] = prop_i[0];
            }
        }
        // make enumerable shift down to replace value if prop is kvps
        if(is_kvp) enumerable = value;
        
        const L = Math.min(prop.length, value.length);
        for(let i = 0; i < L; i++){
            Object.defineProperty(obj, i_prop, {
                value: i_value,
                configurable: false,
                writable: false,
                enumerable,
            });
        }
    }
    catch(e){return e;}
}

// wet const_prop
// uses repetitive heaps of code
// sorted based on what type of prop is used
// 56 lines
// okay, this code is just better
/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_prop_2 = function(obj, prop, value, enumerable = true){
    // errors might occur inside is_array_like or inside the ellipsis;
    try{
        let props, values;
        const is_array = is_array_like(prop);
        if(is_array === 0){
            props = [prop];
            values = auto_array(value);
        }
        if(is_array > 0){
            props = auto_array(prop);
            const is_kvp = (
                is_array &&
                is_nullish(value) &&
                is_array_like(props[0])
            );
            
            if(!is_kvp){
                values = auto_array(value);
            }
            if(is_kvp){
                const kvps = props;
                props = [];
                values = [];
                for(let i = 0; i < kvps.length; i++){
                    let kvp_i = prop[i];
                    const kvp_a = is_array_like(kvp_i);
                    // skip type 0
                    if(kvp_a === 0) continue;
                    
                    // i'm leaving this a bit dry bc it's easy enough to understand
                    
                    // take 2 items if it's an iterator
                    // i.e. normalize type 2 into type 3
                    if(kvp_a === 2){
                        // i don't want all 37000 items from your iterator
                        kvp_i = kvp_i[Symbol.iterator].take(2);
                    };
                    // types 1 and 3 can be indexed into
                    values[i] = kvp_i[1];
                    props[i] = kvp_i[0];
                }
            }
        }
        
        const L = Math.min(prop.length, value.length);
        for(let i = 0; i < L; i++){
            Object.defineProperty(obj, i_prop, {
                value: i_value,
                configurable: false,
                writable: false,
                enumerable,
            });
        }
    }
    catch(e){return e;}
}

