
/**
 * An object with a list of keys and a list of values.
 * - extra can store an extra object inside, which can be used for any purpose.
 */
class KVs {
    keys = [];
    values = [];
    extra = {};
}

/**
 * Convert a list of keys and a list of values to a `KVs` object.
 * - this standardizes the keys and values to have the same length, by repeating keys or values as necessary;
 * - if `key` or `value` is just a single item, they will be replaced with a an array containing just that item;
 * - if `key` or `value` use array-like objects that are not arrays, they will be replaced by Arrays;
 * - this is also a pure function;
 * - if `key` is a list of key-value pairs and values is NOT a list, the keys and values will be extraced from `key`;
 *   - in this case, the value of `value` will be stored in `kvs.extra`
 * @param {Array} key any array-like object
 * @param {Array} value any array-like object
 * @return {KVs} called `kvs`;
 */
const auto_kvs = function(key, value){
    const kvs = new KVs();
    kvs.extra = undefined;
    
    let keys, values;
    const is_array = is_array_like(key);
    if(is_array === 0){
        keys = [key];
        values = auto_array(value);
    }
    if(is_array > 0){
        keys = auto_array(key);
        const is_kvp = (
            is_array &&
            is_nullish(value) &&
            is_array_like(keys[0])
        );
        
        if(!is_kvp){
            values = auto_array(value);
        }
        if(is_kvp){
            const kvps = keys;
            keys = [];
            values = [];
            for(let i = 0; i < kvps.length; i++){
                let kvp_i = kvps[i];
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
                keys[i] = kvp_i[0];
            }
            
            kvs.extra = value;
        }
    }
    
    kvs.keys = keys;
    kvs.values = values;
    return kvs;
};

/**
  * Make a property of an object have a constant value.
  * - make `prop` and `value` arrays to define multiple properties;
  * - make `prop` an array of key-value-pairs and those will be used;
  * @param {object} obj object to add property on;
  * @param {string} prop the name of the property;
  * @param {any} value the value to assign to the property;
**/
const const_prop = function(obj, prop, value, enumerable = true){
    // errors might occur inside is_array_like or inside the ellipsis;
    try{
        const kvs = auto_kvs(prop, value);
        enumerable ??= kvs.extra;
        
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
