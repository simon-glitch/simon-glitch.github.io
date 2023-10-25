/**
  * @name Matrices.js
  * @description This is a simple matrix library for JavaScript.
  * @author Simon Glitch (simon-glitch.github.com)
    * alias: Simanelix (@simanelix on discord.com)
  * @purpose
    * Why bother making this program?
      * This library was created because other libraries are either too complex or implement matrices using inefficient arrays (the built-in Array is not memory efficient).
    * Why is the copyright open source?
      * I want others to be able to reuse my work for their own projects,
      * no matter how [ambitious or miniscule]!
    * Why is this JSDoc formatted funny?
      * @see [the @see section below]
  * @globals:
    * Matrix:
      * @class @override
    * Matrix.Dynamic
      * @class @override
    * ErrorError
      * @class
  * @see [...] What is this format?
    * This is a header comment, written in JSDoc format. I will write an essay explaining how I use these in the future.
    * This is my first time doing this (this = writing a JSDoc header for my code);
    * so, this (this = my methods for writing a JSDoc header for my code) is still a WIP (which means that I haven't refined my methods or decided on the best practices for this yet).
  * @aside
    * Ah, I gotta say, everything makes more sense in code though.
    * Hmm, I wonder what kidns of strict rules there are on software copyrights. In particular, I wonder if certain copyright formats are invalid or if all copyrights are required to adhere to a certain format. I wonder how interpretation of a copyright works.
      * well, I like the copyright format below;
      * if your are against it, then feel free to contact me with friendly criticism;
    * Wow, this sure does feel like it is a lot of code!
  * @copyright
    * <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://simon-glitch.github.io/projects/webapps/matrix-inversion/matrices.js">Matrices.js</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/simon-glitch/">Simon Glitch</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>
  * @alternative_copyright
    * @summary fully open-source copyright
    * allowed:
      * this program may be used as is;
      * this program may be spliced and distributed freely;
      * then this program is used to a significant degree, it may be used for any of the following purposes:
        * personal (individual use) by the distributor;
        * commerical use, including commerical use that yields profit to the distributor;
      * this program may be integrated or included in a another piece of software (named `A`), which may be:
        * sold separately;
        * copyrighted separately;
        * used for any purpose allowed under the copy right of `A`;
    * disallowed:
      * commerical use of this program without crediting me (Simon Glitch) is hereby not allowed;
      * it would be disrespectful to profit from this without at least acknowledging my contributions;
 **/


/* MEGA TODO:
  * consider refactoring function names and what types of params they have in order to make them more consisten;
    * have a naming standard for "operations" (getter functions), for mutators, etc.
    * have a consistent parameter location for in_place / do_mutate
    * have some kind of "ultra dynamic" / generalized option for methods (so they can be made to work with special libraries like math.js)
    * take that last idea to the extreme and code in my own implementation of algebraic function logic?
  * OTHER TODO: learn how to write better commit message (it's a learning process XD ~!)
***/



/**
  * Convert a function into a proper class, without using class syntax; why do this? Well, `classify` allows you to call the class constructor without using new. I guess there are other ways to this... anyways, I like this way of doing it. It works~;
  * @use `classify(f, proto_obj, sub_properties, ...args)`
  * @param {Function} f the function to use as the constructor
  * @param {Object} proto_obj an object whose properties will become the propeties of `f`'s prototype; i.e. an object with the prototype properties of `f`.
  * @param {Object} sub_properties an object listing extra properties to add to `f`; in methods in `sub_properties`, `this` = `f` itself, ok?
  * @param {any} args you can list any number of additional arguments; these additional arguments are passed into `f` when creating the prototype of `f`
  * @description
    * if you don't want to create a new protype for `f`, but instead want to update the existing class, just set `...args = classify.UPDATE`; the notation for this would look like:
    * `classify(f, proto_obj, sub_properties, classify.UPDATE)`;
    * or like this: `classify(f, proto_obj, sub_properties, classify.UPDATE)`
      * (since `classify.UPDATE simply = "UPDATE"`)
    * `classify` will add properties from `proto_obj` to `f.prototype`, and add properties from sub_properties to `f` itself, leaving existing properties as is; `classify` also replaces existing properties if a new value is listed in `proto_obj` or `sub_properties` (respectively).
  * furthermore, `classify` automatically names methods in `proto_obj` and `sub_properties`!
  * I wish this JSDoc didn't print the arguments twice
 **/
const classify = function classify(f, proto_obj, sub_properties, ...args){
  proto_obj = proto_obj ?? {};
  sub_properties = sub_properties ?? {};
  
  let proto;
  
  const UPDATING = args[0] === classify.UPDATE;
  
  if(UPDATING){
    proto = f.prototype;
  }
  if(!UPDATING){
    proto = {};
  }
  
  for (let i in proto_obj){
    // console.log("adding " + i + "!");
    const value = proto_obj[i];
    if(typeof value === "function"){
      value.name = value.name || i;
    }
    proto[i] = value;
  }
  for (let i in sub_properties){
    const value = sub_properties[i];
    if(typeof value === "function"){
      value.name = value.name || i;
    }
    f[i] = value;
  }
  
  if(!UPDATING){
    f.name = f.name || "AnonymousClass";
    f.call(proto, ...args);
    f.prototype = proto;
    proto.constructor = f;
  }
  
  // I could just change Object.prototype's toString, but I kinda prefer manually setting f's toString:
  if(proto.toString === {}.toString)
    proto.toString = classify.default_to_string;
  return f;
};
classify.default_to_string = function toString(){
  return "[object " + this.constructor.name + "]";
};
classify.UPDATE = "UPDATE";

/**
  * Copy properties of one object into another. This only mutates main.
  * @param {object} main object to mutate
  * @param {object} source (subject) object whose properties will be added to main
  * @param {Array[String]} name_sets which properties (selected by property name) (of source) to pull from source and put in main
    * If `name_sets` is omitted, this function will simply use a `for ... in ...` loop to copy-paste all available properties from `source` into `main`;
  * @returns {object} returns main (so you can chain this function);
 **/
const coalesce = function(main, source, name_sets){
  let i, ii, name_set, name, base_name, value;
  if(name_sets instanceof Array) for(i = 0; i < name_sets.length; i++){
    name_set = name_sets[i];
    base_name = name_set[0];
    for(ii = 0; i < name_set.length; i++){
      name = name_set[ii];
      value = source[name];
      if(value !== null && value !== undefined){
        main[base_name] = value;
        break;
      }
    }
  }
  else for(i in source){
    value = source[i];
    if(value !== null && value !== undefined){
      main[i] = value;
    }
  }
  
  return main;
};

/**
 * @class
 * Create a **highly optimized** (yet simple) array of booleans.
 * @param {Number} length how many boolean values (bits) to store in this array;
 * @param {Boolean} dont_proxy whether to return a `Proxy` to this array instead of returning the array directly if the constructor is called without `new`;
 * @returns {BooleanArray | Proxy} optimized array of booleans using `Int32Array`; returns a `Proxy` to the `BooleanArray` if you call this constructor without `new`;
 */
const BooleanArray = function BooleanArray(length, dont_proxy = false){
  // removing new actually gives you the proxy directly; how convenient!
  if(!dont_proxy && !(this instanceof BooleanArray)){
    return (new BooleanArray(length)).p;
  }
  this.length = length ?? this.length;
  this.blength = Math.ceil(length / this.BITS_PER_ELEMENT);
  this.b = new Int32Array(this.blength);
  this.p = new Proxy(this, this.handler);
  this.p.toString = this.toString.bind(this);
}

classify(BooleanArray, {
  BITS_PER_ELEMENT: 32,
  length: 0,
  blength: 0,
  b: (new Int32Array(0)),
  handler: {
    get: function get(b_arr, index){
      if(!isFinite(Number(index))) return b_arr[index];
      return b_arr.get_at(index);
    },
    set: function set(b_arr, index, value){
      if(!isFinite(Number(index))) return b_arr[index];
      return b_arr.set_at(index, value);
    },
  },
  get_at: function get_at(i){
    const mod = i % this.BITS_PER_ELEMENT;
    i -= mod;
    i /= this.BITS_PER_ELEMENT;
    return Boolean((this.b[i] >> mod) % 2);
  },
  set_at: function set_at(i, value){
    value = Boolean(value);
    const mod = i % this.BITS_PER_ELEMENT;
    i -= mod;
    i /= this.BITS_PER_ELEMENT;
    // clever math
    const mask = 1 << mod;
    this.b[i] &= ~mask;
    this.b[i] |=  mask * value;
  },
  toString: function toString(as_numbers = false){
    let text = "";
    for(let i = 0, v; i < this.length; i++){
      v = this.get_at(i);
      if(as_numbers) v = Number(v);
      text += String(v);
      text += ", ";
    }
    // remove ", " at the end
    if(this.length) text = text.slice(0, -2);
    
    return text;
  },
}, {}, 0, true);


/**
 * @class
 * Something has gone awry!
 * @param {String} message (REQUIRED) message to describe why this error occured!
 */
const ErrorError = function ErrorError(){
  Error.call(this, ...arguments);
};
classify(ErrorError, coalesce(new Error(), {
  description: "you really are not good at programming if you are getting this error; something might have gone terribly wrong somehwere;",
}));

/**
 * Creates an error of the specified type with the specified message.
 * @param {String} type name of the error type (i.e. "Syntax" for a SyntaxError)
 * @param {String} message the message describing why the error occured
 * @returns {Error} an error object, of type [type]Error, or just Error (if [type]Error) does not exist
 */
const err = function(type, message){
  if(typeof type !== "string")
    throw err("Error", "err requires a string value for type argument");
  if(typeof message !== "string")
    message = "For some reason, **someone** forgot to put an error message in here! You better fix THAT first before fixing the actual problem that caused this error to be thrown in the first place!";
  const name = type + "Error";
  let t = window[name];
  if(!t){
    t = Error;
  }
  const e = new t();
  e.message = "Uncaught "+ name + ": " + message;
  return e;
}

/**
  * @class
  * Create a randomizer; this.num() returns a random number in the range: [min, min + sep ... max - ((max - min) % sep)] (range is inclusive on both sides; the ellipsis are desmos range notation)
  * @param {Number} min minimum value this can generate
  * @param {Number} max maximum value this can generate
  * @param {Number} sep (separator) distance between values this can generate
 **/
const Rand = function Rand(min, max, sep){
  // reverse nullish coalescing assignment
  this.min = min ?? this.min;
  this.max = max ?? this.max;
  this.sep = sep || this.sep;
};

classify(
  Rand,
  {
    min: -4,
    max: 4,
    sep: 1,
    num: function(){
      return Math.floor(Math.random() * ((this.max - this.min) / this.sep)) * this.sep + this.min;
    },
  }
);


/**
  * A matrix has a constant width and height;
    * if you want to edit or change it, use new Matrix.Dynamic();
  * @param {Number} length the number of rows this matrix will have;
  * @param {Number} width the number of columns this matrix will have;
  * @param {String} nickname (optional) You can name the matrix;
 **/
const Matrix = function Matrix(length, width, nickname){
  this.length = length || 0;
  this.width  = width  || this.length;
  this.nickname = nickname?.toString() ?? this.nickname;
  let i,j;
  this.m = new Float64Array(length * width);
  for(i = 0; i < this.length; i++){
    this.m[i] = [];
    for(j = 0; j < this.width; j++) this.m[i][j] = 0;
  };
  
  this.initialize_leading_zeroes();
};

/*==== ==== ==== ====**
  ==== Matrix main method set up
**==== ==== ==== ====*/
classify(Matrix, {
  m: (new Float64Array(1)),
  is_tranposed: false,
  length: 1,
  width: 1,
  scalar: 1,
  nickname: "",
  leading_zeroes: (new Int32Array(1)),
  initialize_leading_zeroes: function initialize_leading_zeroes(){
    this.leading_zeroes = new Int32Array(this.length);
  },
  /**
   * Count the number of leading zeroes in each row of this matrix, and mutate this.leading_zeroes accordingly in the processs.
   * @param {Boolean} dont_recount whether we should assume that the zeroes that were in the matrix last time we counted remaining zeroes are still zeroes
   * @returns {Int32Array} the number of leading zeroes in each row (literally this.leading_zeroes)
   */
  count_leading_zeroes: function(dont_recount = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    let i, j, k;
    for(i = 0; i < this.length; i++){
      for(j = dont_recount ?(this.leading_zeroes[i]) :0; j < this.length; j++){
        if(Matrix.eq0(this.m[i * this.width + j])){
          this.m[i * this.width + j] = 0;
        }
        else break;
      }
      this.leading_zeroes[i] = j;
    }
    return this.leading_zeroes;
  },
  get_at: function get_at(i_row, i_col){
    this.auto_really_scale();
    if(this.is_tranposed)
      return this.m[i_col * this.width + i_row];
    // we want to make tranposing matrices extrmely fast
    else
      return this.m[i_row * this.width + i_col];
  },
  set_at: function set_at(i_row, i_col, new_val){
    this.auto_really_scale();
    if(this.is_tranposed)
      return (this.m[i_col * this.width + i_row] = new_val);
    // we want to make tranposing matrices extrmely fast
    else
      return (this.m[i_row * this.width + i_col] = new_val);
  },
  /**
   * Slice a 2-D sub-matrix out of a matrix.
   * @param {number} min_y the upper y coord of the slice
   * @param {number} max_y the lower y coord of the slice
   * @param {number} min_x the left  x coord of the slice
   * @param {number} max_x the right x coord of the slice
   * @returns the matrix made up of the grid of values between the specified x and y coordinates
   */
  slice: function slice(min_y, max_y, min_x, max_x){
    this.auto_really_scale();
    min_y = ((min_y ?? 0          ) + this.length + 1) % (this.length + 1);
    max_y = ((max_y ?? this.length) + this.length + 1) % (this.length + 1);
    min_x = ((min_x ?? 0          ) + this.width  + 1) % (this.width  + 1);
    max_x = ((max_x ?? this.width ) + this.width  + 1) % (this.width  + 1);
    // if the ranges don't make sense, return an empty matrix
    if(max_x < min_x || max_y < min_y){
      return new Matrix();
    }
    let length = max_y - min_y;
    let width  = max_x - min_x;
    let m = new Matrix(length, width);
    if(this.is_tranposed){
      for(let i = 0, ii; i < m.m.length; i++){
        ii = Math.floor((width * (Math.floor(i / width) + min_y) + i + min_x) / width);
        /* was:
        ii = ((Math.floor(i / width) + min_y) * width) + ((i % width) + min_x);
        let ix = ii % this.width;
        let iy = Math.floor(ii / this.width);
        ii = ix * width + iy;
        */
        m.m[i] = this.m[ii];
      }
    }
    else{
      for(let i = 0, ii; i < m.m.length; i++){
        ii = ((Math.floor(i / width) + min_y) * width) + ((i % width) + min_x);
        m.m[i] = this.m[ii];
      }
    }
    // then just return!
    return m;
  },
  /**
   * returns a clone of this matrix
   */
  clone: function clone(){
    return this.slice();
  },
  to_dim_name: function to_dim_name(){
    return "[" + this.nickname + (this.nickname ? ": " :"") + this.length + " by " + this.width + " Matrix]"
  },
  /**
  * Print this matrix!
  * @param {Number | String} toFixedDigits
    * if `toFixedDigits` is a number: how many digits of each value to print;
    * if `toFixedDigits` is a string:
      * use ".number" format to print up to `number` digits (example: `toFixedDigits = ".3"` will print up to 3 fixed digits);
      * use "_radix" to print with `Number.toString(radix)` behavior (example: `toFixedDigits = "_2"` will print value in base 2 (binary));
      * use any other string to simply print the number with default `Number.toString()` behavior;
  * @param {Object} options optional object with extra parameters (see below);
  * @param {Number} options_column_padding
    the number of spaces to put between columns (after each comma);
    short name: `cp`;
  * @param {Boolean} options_exclude_name
    whether to exclude the name header;
    short name: `en`;
  * @param {Boolean} options_include_final_comma
    whether to put (include) a comma at the end of each row;
    short name: `ifc`;
  * @param {Boolean} options_include_row_end_semicolon
    whether to put (include) a semicolon at the end of each row;
    short name: `ires`;
  * @param {Boolean} options_include_final_semicolon
    whether to put (include) the semicolon on the final row of the matrix; semicolon is only included if `ires` is `true`;
    short name: `ifs`;
  * @param {Boolean} options_replace_semicolon_with_comma
    whether to replace the semicolon at the end of each row with a comma; this does nothing if `ires` is `false`;
    short name: `rswc`;
  * @param {Boolean} options_wrap_rows_with_brackets
    whether to wrap the rows with [square brackets];
    short name: `wrwb`;
  * In case you are wondering:
    if `{ifc, ires, ifc, and wrwb}` are all set to true, then the matrix will print like this:
    ```
    [
      [0, 0, ... 0, 0,];
      [0, 0, ... 0, 0,];
      ...
      [0, 0, ... 0, 0,];
      [0, 0, ... 0, 0,];
    ]
    if `{ifc = true, ires = false, ifc = any, and wrwb = false, rbws = true}`, then the matrix will print like this:
    ```
    [
      0, 0, ... 0, 0
      0, 0, ... 0, 0
      ...
      0, 0, ... 0, 0
      0, 0, ... 0, 0
    ]
    ```
    * @aside
      now that I think about it, there are a lot of combinations of options that are redundant with eachother; also, this toString function is ... pretty complicated; maybe I should make it more simple and less versatile;
  * @returns {String} a string representing the matrix;
  **/
  toString: function toString(toFixedDigits = 3, options = {}){
    let column_padding               =
      options.column_padding ??
      options.cp ??
      1;
    let exclude_name =
      options.exclude_name ??
      options.en ??
      false;
    let include_final_semicolon =
      options.include_final_semicolon ??
      options.ifs ??
      false;
    let include_final_comma =
      options.include_final_comma ??
      options.ifc ??
      false;
    let include_row_end_semicolon =
      options.include_row_end_semicolon ??
      options.ires ??
      true;
    let replace_semicolon_with_comma =
      options.replace_semicolon_with_comma ??
      options.rswc ??
      false;
    let wrap_rows_with_brackets =
      options.wrap_rows_with_brackets ??
      options.wrwb ??
      false;
    
    replace_semicolon_with_comma &&= include_row_end_semicolon;
    include_final_semicolon      &&= include_row_end_semicolon;
    include_final_comma &&=
      (!replace_semicolon_with_comma) ||
      wrap_rows_with_brackets;
    
    const TOFIXED = 0;
    const DEFAULT = 1;
    const MAXLEN  = 2;
    const RADIX   = 3;
    
    let FORMAT;
    if(typeof toFixedDigits === "number"){
      FORMAT = TOFIXED;
    }
    else{
      FORMAT = DEFAULT;
      let m = toFixedDigits.match(/_(\d+)/);
      if(m !== null){
        FORMAT = RADIX;
        toFixedDigits = m[1];
      }
      else{
        m = toFixedDigits.match(/\.(\d+)/);
        if(m !== null){
          FORMAT = MAXLEN;
          toFixedDigits = m[1];
        }
      }
    }
    
    let semicolon = replace_semicolon_with_comma ?"," :";";
    let text = exclude_name ?"" :(this.to_dim_name());
    text += "[\n";
    let i, j, k;
    let i_not_done = this.length > 0;
    let j_not_done = this.width  > 0;
    j_not_done &&= i_not_done;
    if(!j_not_done) text = text.slice(0, -1);
    
    let column_widths = new Int32Array(this.width);
    let cell_strings = Array(this.length);
    // find the widest width of any cell in each column
    for(i = 0; i < this.length; i++){
      cell_strings[i] = Array(this.width);
      for(j = 0; j < this.width; j++){
        k = this.get_at(i,j);
        switch (FORMAT){
          case RADIX:
            k = k.toString(toFixedDigits);
            break;
          case MAXLEN:
            const ka = k.toFixed(toFixedDigits);
            k = k.toString();
            if(ka.length < k.length){
              k = ka;
            }
            break;
          case DEFAULT:
            k = k.toString()
            break;
          default:
            k = k.toFixed(toFixedDigits);
            break;
        }
        cell_strings[i][j] = k;
        column_widths[j] = Math.max(column_widths[j], cell_strings[i][j].length);
      }
    }
    // make all columns have consistent width
    for(i = 0; i < this.length; i++){
      for(j = 0; j < this.width; j++){
        for(k = column_widths[j] - cell_strings[i][j].length; k > 0; k--){
          cell_strings[i][j] = " " + cell_strings[i][j];
        }
      }
    }
    
    // acronym: include row end semicolon THIS time
    let irestt;
    for(i = 0; i_not_done; i++){
      i_not_done = (i < this.length - 1);
      irestt = include_row_end_semicolon || i_not_done;
      text += "  ";
      
      j_not_done = this.width  > 0;
      for(j = 0; j_not_done; j++){
        j_not_done = (j < this.width - 1);
        text += cell_strings[i][j];
        if(
          j_not_done || (
            include_final_comma &&
            irestt
          )
        ){
          text += ",";
          for(k = 0; k < column_padding; k++)
            text += " ";
        }
      }
      if(irestt){
        text += semicolon;
      }
      text += "\n";
    }
    text += "]";
    return text;
  },
  /**
    * Convert this matrix to a 2-D array (or a 2-D version of any array-like `type`)!
    * @param {Function} type which class (or type) of Array-like object to coerce this matrix into
    * @param {Boolean} type_allows_mapping whether the type has a map() method that works the same way Array's map() does
    * @param {Boolean} type_accepts_length whether the type allows you to give the length as the first parameter when calling the constructor
    * @returns {Array | type} A 2-D array (or a 2-D version of type), representing this matrix, composed with the values from this matrix.
   **/
  toDoubleArray: function toDoubleArray(type = Array, type_allows_mapping = false, type_accepts_length = true){
    this.auto_really_scale();
    this.auto_really_transpose();
    type ??= Array;
    if(type === Array){
      type_allows_mapping = true;
    }
    
    // are these nested ternaries unintuitive?
    const that = type_allows_mapping ?(
      (
        type_accepts_length ?(new Array()) :(new Array(this.length))
      ).map(() => (
        type_accepts_length ?(new Array()) :(new Array(this.length))
      ))
    ) : (
      type_accepts_length ?(new Array()) :(new Array(this.length))
    );
    let iy, ix;
    for(iy = 0; iy < this.length; iy++){
      if(!type_allows_mapping){
        that[iy] = (
          type_accepts_length ?(new Array()) :(new Array(this.length))
        );
      }
      for(ix = 0; ix < this.width; ix++){
        that[iy][ix] = this.m[iy * this.width + ix];
      }
    }
    return that;
  },
  /**
    * Convert this to a Dynamic Matrix.
    * @returns {Dynamic_Matrix} a clone of this matrix, with the same values in the same places, just formatted under a different data structure, that's all~
   **/
  toDynamic: function toDynamic(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    const that = new Matrix.Dynamic(this.length, this.width);
    let iy, ix;
    for(iy = 0; iy < this.length; iy++){
      for(ix = 0; ix < this.width; ix++){
        that[iy][ix][0] = this.m[iy * this.width + ix];
      }
    }
    return that;
  },
  /**
    * Convert this matrix to an array; you can also add an arbitrary number of dimensions in the process
    * @param {Function} type the type of array-like object to convert this too;
      * defaults to Array;
    * @param {Number} dimensions the number of dimensions to use for the output array;
      * defaults to 1 (i.e. a simple Array);
    * @param {Boolean} requires_length whether type requires a length argument to be passed in on construction;
      * defaults to false;
   **/
  toArray: function toArray(type = Array, dimensions = 1, requires_length = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    type ??= Array;
    dimensions ??= 1;
    const that = requires_length ?(
      new type(this.length)
    ) :(
      new type()
    );
    if(typeof type !== "function"){
      err("Type", "type argument of toArray must be a function or class.");
    }
    if(typeof dimensions !== "number"){
      err("Type", "dimensions argument of toArray must be a number.");
    }
    if(dimensions < 0){
      err("Value", "Cannot construct an array with " + dimensions + " dimensions! (An array must have a non-zero positive number of dimensions!)")
    }
    if(dimensions === 1){
      for(let i = 0; i < this.m.length; i++){
        that[i] = this.m[i];
      }
      return that;
    }
    let iy, ix, ii = 0;
    for(iy = 0; iy < this.length; iy++){
      that[iy] = requires_length ?(
        new type(this.width)
      ) :(
        new type()
      );
      for(ix = 0; ix < this.width; ix++){
        if(this.dimensions > 2){
          let arr = requires_length ?(
            new type(1)
          ) :(
            new type()
          );
          that[iy][ix] = arr;
          for(let i = 3; i < dimensions; i++){
            arr[0] = requires_length ?(
              new type(1)
            ) :(
              new type()
            );
            arr = arr[0];
          }
          arr[0] = ii;
        }
        ii++;
      }
    }
    return that;
  },
  /**
    * Convert this to a vector
    * @param {Boolean} reinitialize_values whether this should clone the values (in this.m); if reinitialize_values is false, then this.m will be reused, and the resulting vector will use the same TypedArray as this; if your goal is to slice this into a new vector, then set reinitialize_values = true;
   **/
  toVector: function toVector(reinitialize_values = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    const that = new Vector(this.m.length);
    if(reinitialize_values) for(let i = 0; i < this.m.length; i++){
      that.m[i] = this.m[i];
    }
    else that.m = this.m;
    return that;
  },
  transpose: function transpose(){
    const swap = this.length;
    this.length = this.width;
    this.width = swap;
    this.is_tranposed = !this.is_tranposed;
    this.initialize_leading_zeroes();
  },
  /**
    * Transposes this matrix, IN PLACE, for real. I love how elegant and magical-looking this funciton is.
    * @returns {Matrix} the transposed matrix;
   **/
  really_transpose: function really_transpose(){
    this.transpose();
    return this.auto_really_transpose();
  },
  auto_really_transpose: function auto_really_transpose(){
    if(this.is_tranposed){
      let iy, ix, ii, ij, swap;
      for(iy = 0; iy < this.width; iy++){
        for(ix = 0; ix < iy; ix++){
          ii = iy * this.width + ix;
          ij = ix * this.length + iy;
          swap = this[ii];
          this[ii] = this[ij];
          this[ij] = swap;
        }
      }
    }
    return this;
  },
  /**
    * multiplies this by a scalar, in place, overwriting current values of this
   **/
  scale: function scale(scalar){
    this.scalar *= scalar;
    // console.log(this.to_dim_name() + " scalar now= " + this.scalar);
    return this;
  },
  /**
    * REALLY multiplies this by a scalar, in place, mutating current values of this
   **/
  really_scale: function really_scale(scalar){
    this.scalar = scalar ?? this.scalar;
    return this.auto_really_scale();
  },
  /**
    * Lazy scaling: this allows you to stack scalars without loosing performance!
   **/
  auto_really_scale: function auto_really_scale(){
    // console.log(this.to_dim_name() + " (really scaling) scalar now= " + this.scalar);
    if(!Matrix.eq0(this.scalar - 1)){
      for(let i = 0; i < this.m.length; i++){
        this.m[i] *= this.scalar;
      }
    }
    this.scalar = 1;
    return this;
  },
  ident: function ident(){
    if(!this.is_square()){
      throw err("Value", "Can not find the identity matrix corresponding to a non-square matrix! (Tried to find the identity of " + this.to_dim_name() + ")");
    }
    const that = new Matrix(this.length, this.width);
    for(let i = 0; i < this.length; i++){
      that.m[i * (that.width + 1)] = 1;
    }
    return that;
  },
  zero: function zero(){
    const that = new Matrix(this.length, this.width);
    return that;
  },
  /**
    * Get one of the minors of this matrix. A minor is a copy of this matrix with a particular row and column of this matrix removed.
    * @param {Number} row_number index (or number) of which row to remove
    * @param {Number} column_number index (or number) of which column to remove
    * @returns {Matrix} a clone of this matrix, with row # [row_number] removed, and column # [column_number] removed;
    * TODO: add smart handling of transpose to minor
   **/
  minor: function minor(row_number = 0, column_number = 0){
    if(this.length < 1 || this.width < 1){
      throw err("Value", "can't get the minor of an empty matrix! There are no rows or column to remove in the first place.")
    }
    if(this.length === 1){
      throw err("Value", "can't get the minor of a matrix with only 1 row!")
    }
    if(this.width === 1){
      throw err("Value", "can't get the minor of a matrix with only 1 column!")
    }
    
    this.auto_really_scale();
    this.auto_really_transpose();
    
    // super simple jumping implementation
    let that = new Matrix(this.length - 1, this.width - 1);
    let iy, ix, jy, jx;
    for(iy = 0, jy = 0; iy < this.length; iy++){
      if(iy === row_number) continue;
      for(ix = 0, jx = 0; ix < this.width; ix++){
        if(ix === column_number) continue;
        that.m[jy * that.width + jx] = this.m[iy * this.width + ix];
        jx++;
      }
      jy++;
    }
  },
  /**
    * Check whether this matrix is a vector. If this matrix has been transposed, it tells you whether the matrix is currently a vector (after being transposed). FYI: a vector is simply a matrix with 1 column.
    * @returns {Boolean} whether this is a vector;
   **/
  is_vector: function is_vector(){
    return (this.width === 1);
  },
  /**
    * Check wether this matrix is square.
    * @returns {Boolean} if true, then this matrix is a square;
   **/
  is_square: function is_square(){
    return (this.length === this.width);
  },
  eq0: function eq0(){
    this.auto_really_scale();
    return Matrix.eq0(this);
  },
  isNaN: function isNaN(){
    for(let i = 0; i < this.m.length; i++){
      if(this.m[i].isNaN()){
        return true;
      }
    }
    return false;
  },
  isFinite: function isFinite(){
    for(let i = 0; i < this.m.length; i++){
      if(!this.m[i].isFinite()){
        return false;
      }
    }
    return true;
  },
  isInfinite: function isInfinite(){
    for(let i = 0; i < this.m.length; i++){
      if(!this.m[i].isFinite() && !this.m[i].isNaN()){
        return true;
      }
    }
    return false;
  },
  isDiagonal: function isDiagonal(){
    if(this.is_square()) return false;
    this.auto_really_scale();
    
    for(let i = 0, j; i < this.m.length; i++){
      j = i % this.width;
      // NOT on the diagonal:
      if((i - j) / this.width !== j){
        // NON zero value here:
        if(!Matrix.eq0(this.m[i])){
          return false;
        }
      }
    }
    return true;
  },
  isIdent: function isIdent(){
    if(this.is_square()) return false;
    this.auto_really_scale();
    
    for(let i = 0, j, on_the_diagonal; i < this.m.length; i++){
      j = i % this.width;
      // 1 if  IS on the diagonal,
      // 0 if NOT on the diagonal;
      on_the_diagonal = +((i - j) / this.width === j);
      // does this value === on_the_diagonal
      if(!Matrix.eq0(this.m[i] - on_the_diagonal)){
        return false;
      }
    }
    return true;
  },
  isFull: function isFull(){
    this.auto_really_scale();
    
    for(let i = 0; i < this.m.length; i++){
      if(Matrix.eq0(this.m[i])){
        return false;
      }
    }
    return true;
  },
  /**
    * get the "absolute value" of this matrix or vector
    * @returns {Number} the absolute value
   **/
  abs: function abs(){
    // um, I am not sure if this is faster or slower than the default method
    // good news: spread operator actually works on all `TypedArray`s
    return Math.hypot(...this.m) * this.scalar ** (this.length / 2);
  },
  /**
    * Should I make this use this.auto_really_scale()?
    * @returns {Number} sum of all values in this matrix
   **/
  total: function total(){
    zero = this.scalar === 0;
    if(zero) return 0;
    
    let s = 0;
    for(let i = 0; i < this.m.length; i++)
      s += this.m[i];
    return s * this.scalar;
  },
  product: function product(){
    zero = this.scalar === 0;
    if(zero) return 0 ** this.m.length;
    
    let s = 1;
    for(let i = 0; i < this.m.length; i++)
      s *= this.m[i];
    return s * this.scalar ** this.m.length;
  },
  diagonal: function diagonal(){
    this.auto_really_scale();
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    const that = new Matrix(this.length, this.width);
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      that.m[j] = this.m[j];
    }
    return that;
  },
  diagonal_abs: function diagonal_abs(){
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 0;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s += this.m[j] **2;
    }
    return Math.sqrt(s) * this.scalar ** (this.length / 2);
  },
  diagonal_total: function diagonal_total(){
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 0;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s += this.m[j];
    }
    return s * this.scalar ** (this.length / 2);
  },
  diagonal_product: function diagonal_product(){
    if(!this.is_square()){
      throw err("Value", "Can only find the diagonal of a square matrix. Can not find the value of " + this.to_dim_name + ", because it is not square!");
    }
    let s = 1;
    for(let i = 0; i < this.length; i++){
      // that.set_at(i,i, this.get_at(i,i));
      j = i * (this.length + 1);
      s *= this.m[j];
    }
    return s * this.scalar ** this.length;
  },
  floor: function floor(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    for(let i = 0; i < this.m.length; i++){
      this.m[i] = Math.floor(this.m[i]);
    }
    return this;
  },
  ceil: function ceil(){
    for(let i = 0; i < this.m.length; i++){
      this.m[i] = Math.ceil(this.m[i]);
    }
    return this;
  },
  /**
    * currently: Just applies Math.round() directly to each value of this matrix.
    * TODO: change to this:
    * @param {Number} precision the power of 10 to round to
    * @param {Boolean} is_relative (whether we are working with relative or absolute precision) determines how to handle precision
      * if false: this function rounds every value to the nearest multiple of 10^(-precision);
      * if true:  this function rounds every value to the nearest multiple of 10^(log(value) - precision);
    * @param {Boolean} is_social (whether we should change precision based on the overall scale of this matrix)
      * if true: precision -= log(this.abs() / this.m.length)
      * if false: leave precision as normal
   **/
  round: function round(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    for(let i = 0; i < this.m.length; i++){
      this.m[i] = Math.round(this.m[i]);
    }
    return this;
  },
  hypofloor: function hypofloor(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    for(let i = 0; i < this.m.length; i++){
      this.m[i] = Math.trunc(this.m[i]);
    }
    return this;
  },
  hypoceil: function hypoceil(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    for(let i = 0, s; i < this.m.length; i++){
      this.m[i] = Math.sign(this.m[i]) * Math.ceil(Math.abs(this.m[i]));
    }
    return this;
  },
  hyporound: function hyporound(){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    for(let i = 0, s; i < this.m.length; i++){
      this.m[i] = Math.sign(this.m[i]) * Math.round(Math.abs(this.m[i]));
    }
    return this;
  },
  exp: function exp(){
    this.auto_really_scale();
    this.auto_really_transpose();
    if(!this.is_square()){
      throw err("Value", "cannot exponentiate a non-square matrix, because exponentiation requires the matrix to have an identity matrix, and a non-square matrix do not have an identity matrix!");
    }
    that = this.clone();
    term = that.clone();
    that.add(that.ident(), true);
    that.add(term, true);
    // e^x = 1 + x + x^2 / 2 + x^3 / 3! + x^4 / 4! ...
    // n! = n factorial = (n-1)! * n
    // 0! = 1! = 1
    for(let i = 2; i < 10; i++){
      term = term.scale(1/i).multiply(this);
      that.add(term, true);
    }
    // mine goes up to x^9 / 9! (currently)
    return that;
  },
  /**
    * Check approximate equality between matrices
    * @param {Matrix} that matrix to compare this to
    * @returns boolean: whether the 2 matrices are approximately equal
   **/
  eq: function eq(that){
    this.auto_really_scale();
    this.auto_really_transpose();
    that.auto_really_scale();
    that.auto_really_transpose();
    for(let i = 0; i < this.m.length; i++){
      if(2 * (this.m[i] - that.m[i]) / Math.sqrt(this.m[i] * that.m[i]) > Matrix.epsilon){
        return false;
      }
    }
    return true;
  },
  ineq: function ineq(that){
    this.auto_really_scale();
    this.auto_really_transpose();
    that.auto_really_scale();
    that.auto_really_transpose();
    return !this.eq(that);
  },
  /**
   * Add this and that under standard matrix addition
   * @param {Matrix} that the matrix to add to this matrix
   * @param {boolean} in_place whether to store the result of the matrix addition in this matrix
   * @returns the sum of this and that
   */
  add: function add(that, in_place = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    that.auto_really_scale();
    that.auto_really_transpose();
    res = (in_place) ?this :this.clone();
    if(this.m.length !== that.m.length){
      throw err("Value", "cannot add a " + this.to_dim_name() + " to a " + that.to_dim_name() + "!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).");
      return;
    }
    for(let i = 0; i < this.m.length; i++){
      res.m[i] += that.m[i];
    }
    return res;
  },
  subtract: function subtract(that, in_place = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    that.auto_really_scale();
    that.auto_really_transpose();
    res = (in_place) ?this :this.clone();
    if(this.m.length !== that.m.length){
      throw err("Value", "cannot subtract a " + this.to_dim_name() + " to a " + that.to_dim_name() + "!\n> The middle matrices must have the same dimensions (or the transpose of one must have the same dimensions as the other).");
      return;
    }
    for(let i = 0; i < this.m.length; i++){
      res.m[i] -= that.m[i];
    }
    return res;
  },
  /**
    * Multiply this matrix by that matrix. Makes a new matrix.
    * @param {Matrix} that 
    * @returns a new Matrix: the result of the matrix multiplication
   **/
  multiply: function multiply(that){
    if(this.width !== that.length){
      throw err("Value", "cannot multiple a " + this.to_dim_name() + " by a " + that.to_dim_name() + "!\n> The middle 2 numbers must be the same {cols(left) == rows(right)}.");
      // return;
    }
    // this.auto_really_scale();
    // this.auto_really_transpose();
    let scalar = this.scalar * that.scalar;
    
    let i, j, k, v;
    const w = that.width, l = this.length, d = this.width;
    const res = new Matrix(l, w);
    // return res as a zero matrix if the scalar is zero
    if(scalar === 0) return res;
    
    // fun fact:
    // > JavaScript ternaries are super efficient!
    // double fun fact:
    // > *(I think)* this can be optimized in other languages
    for(i = 0; i < l; i++){ for(j = 0; j < w; j++){
      v = 0;
      for(k = 0; k < d; k++){
        v += (
          this.m[(tpi ?k * l :i * d) + (tpi ?i :k)] *
          that.m[(tpa ?j * d :k * w) + (tpa ?k :j)]
        );
      }
      res.m[i * res.width + j] = v;
    } }
    res.scale(scalar);
    return res;
  },
  /**
    * Accurately exponentiate this to a given integer power `that`.
    * @param {Number} that power;
    * @returns {Matrix} this^that
   **/
  pow: function pow(that){
    if(!this.is_square){
      throw err("Value", "Cannot multiply a non-square matrix by itself; cannot invert a non-square matrix; cannot find the identity matrix corresponding to a non-square matrix; thus, cannot raise a non-square matrix to any power!");
    }
    if(that === 0){
      return this.ident();
    }
    
    // this.auto_really_scale();
    // smart handling for 0^that
    const scalar = this.scalar;
    if(scalar === 0){
      if(that < 0) return this.NaN();
      if(that > 0) return this.zero();
      return this.ident();
    }
    this.auto_really_transpose();
    if((that < 2**53) && (that % 1 === 0)){
      if(that < 0){
        return this.inv().pow(that);
      }
      let result = this.ident();
      let power = this.clone();
      const binary = that.toString(2);
      // use repeated squaring to quickly exponentiate up to any large power
      for(let i = binary.length - 1; i >= 0; i--){
        if(+binary[i]){
          result = result.multiply(power);
        }
        if(i > 0){
          power = power.multiply(power);
        }
      }
      result.scale(scalar ** that);
      return result;
    }
    that_c = that?.constructor?.name;
    that_cc = that?.prototype?.constructor?.name;
    throw err("Type", "Either `that` was an invalid type or this code hasn't implemented expontitation for the type of `that` yet. Typeof that: " + (typeof that) + (that_c ? (", instanceof: " + that_c + (that_cc ?(" and " + that_cc) :"")) :""));
  },
  /**
    * Get the augmentation this matrix, adding another matrix to the right of it. This function is highly performant.
    * @param {Matrix} augmentor matrix to append to the right of this matrix; **if this matrix is currently transposed, make sure augmentor is also transposed!**
    * @param {Boolean} is_transposed
      * when set: pretend that {whether this matrix is transposed} = {`is_tranposed`};
        * i.e. You can manually set the is_transposed variable with this.
        * Setting this to a funny value will result in weird thing's happing with that!
        * Don't say I didn't warn you!
    * @param {Boolean} out_is_transposed
      * when set: pretend that {whether the output is tranposed} = {`out_is_tranposed`};
        * Once again: use at your own risk!
    * @returns {Matrix} augmented matrix;
   **/
  augment: function augment(augmentor, is_transposed = undefined, out_is_transposed = undefined){
    this.auto_really_scale();
    // this.auto_really_transpose();
    
    if(this.length !== augmentor.length){
      throw err("Value", "Cannot augment " + this.to_dim_name() + " with " + this.to_dim_name() + "! The 2 Matrices must have the same number of rows!");
    }
    
    if(this.is_transposed !== augmentor.is_transposed){
      throw err("Value", "Can not augment a transposed matrix with a non-transposed matrix nor vice-versa!");
    };
    
    is_transposed ??= this.is_transposed;
    
    const that = new Matrix(this.length, this.width + augmentor.width);
    out_is_transposed ??= is_transposed;
    that.is_transposed = out_is_transposed;
    // vertically augment if this is transposed
    if(is_transposed) for(let i = 0, j, k; i < that.m.length; i++){
      j = i % this.m.length;
      k = i - j;
      that.m[i] = ((i < this.m.length) ?(
          this.m[j]
        ) :(
          augmentor.m[j]
      ));
    }
    // transposed augmentation is actually better than normal augmentation!
    else for(let i = 0, j, k; i < that.m.length; i++){
      j = i % that.width;
      k = i - j;
      k /= that.width;
      that.m[i] = ((j < this.width) ?(
          this.m[k * this.width + j]
        ) :(
          augmentor.m[k * augmentor.width + j - this.width]
      ));
    }
    
    return that;
  },
  /**
    * Use Guassian Elimination (G.E.) to convert this matrix to Row Echelon Form (R.E.F.).
    * @param {Matrix} augment augment to modify along with this matrix;
    * @param {Boolean} in_place whether to store the result in this matrix or not;
    * @param {Boolean} in_place whether to reduce the matrix (to RREF: Reduced Row Echelon Form) as well;
    * @returns {Matrix} clone of this matrix, in REF;
   **/
  ref: function ref(augment = null, in_place = false, rref = false){
    this.auto_really_scale();
    this.auto_really_transpose();
    
    const that = in_place ? this : this.clone();
    const aug = augment?.clone();
    
    // initialize variables in scope
    let flags_rows_completed = BooleanArray(that.length);
    let flags_pivot_columns_done = BooleanArray(that.width);
    let flags_pivot_columns_done_t = BooleanArray(that.width);
    // row index of each pivor column's respective row
    // the respective row of a pivot column is a row with a leading entry in that pivot column
    let pivot_column_indices = new Int32Array(that.length);
    let pivot_column_indices_t = new Int32Array(that.width);
    
    // these convenience funcitons are ALL inlinable!
    // @inline
    const sub_row = function(result_index, subtrahend_index, multiplier){
      if(multiplier === 0)
        throw err("Value", "multiplier of zero is impractical; you probably did something wrong XD!");
      result_index *= that.width;
      subtrahend_index *= that.width;
      for(let i = 0; i < that.width; i++){
        that.m[result_index] -= that.m[subtrahend_index] * multiplier;
        if(aug)
          aug.m[result_index] -= that.m[subtrahend_index] * multiplier;
        result_index++;
        subtrahend_index++;
      }
    };
    // @inline
    const normalize_row = function(row_index){
      let leading_zeroes = that.leading_zeroes[row_index];
      row_index *= that.width;
      row_index += leading_zeroes;
      const leading_entry = that.m[row_index];
      
      // set leading entry to 1
      that.m[row_index] = 1;
      
      // skip leading entry (1st element)
      leading_zeroes++;
      row_index++;
      for(let i = leading_zeroes; i < that.width; i++){
        that.m[row_index] /= leading_entry;
        if(aug)
          aug.m[row_index] /= leading_entry;
      }
    };
    // @inline
    const swap_rows = function(row_1_index, row_2_index){
      // console.log("swap row " + row_1_index + " with " + row_2_index + "!");
      let s;
      
      if(rref){
        const fpcd  = flags_pivot_columns_done;
        const fpcdt = flags_pivot_columns_done_t;
        // check to see if these rows are assosciated with pivot columns
        // if they are, we will want to swap around the indices assosciated with those pivot columns:
        // so we will actually remember where they are in the future
        if(/* fpcdt[row_1_index] && fpcdt[row_2_index] */ true){
          const pci  = pivot_column_indices;
          const pcit = pivot_column_indices_t;
          // swap column indices
          s = pci[pcit[row_1_index]];
          pci[pcit[row_1_index]] = pci[pcit[row_2_index]];
          pci[pcit[row_2_index]] = s;
          // swap column flags
          s = fpcd[pcit[row_1_index]];
          fpcd[pcit[row_1_index]] = fpcd[pcit[row_2_index]];
          fpcd[pcit[row_2_index]] = s;
          // swap row indices (transposed column indices)
          s = pcit[row_1_index];
          pcit[row_1_index] = pcit[row_2_index];
          pcit[row_2_index] = s;
          // swap row flags (transposed column flags)
          s = fpcdt[row_1_index];
          fpcdt[row_1_index] = fpcdt[row_2_index];
          fpcdt[row_2_index] = s;
        }
      }
      
      row_1_index_r = row_1_index * this.width;
      row_2_index_r = row_2_index * this.width;
      for(let i = 0; i < that.width; i++){
        s = that.m[row_1_index_r];
        that.m[row_1_index_r] = that.m[row_2_index_r];
        that.m[row_2_index_r] = s;
        row_1_index_r++;
        row_2_index_r++;
      }
      
      // swap the rows of aug; do not swap the rows of this back into place XD
      if(aug){
        row_1_index_r = row_1_index * aug.width;
        row_2_index_r = row_2_index * aug.width;
        for(let i = 0; i < aug.width; i++){
          s = aug.m[row_1_index_r];
          aug.m[row_1_index_r] = aug.m[row_2_index_r];
          aug.m[row_2_index_r] = s;
          row_1_index_r++;
          row_2_index_r++;
        }
      }
    };
    
    that.count_leading_zeroes();
    
    // initialize pivot_column tracking
    for(let i = 0, z; i < that.length; i++){
      z = that.leading_zeroes[i];
      if(z > that.width) continue;
      if(!flags_pivot_columns_done[z]){
        flags_pivot_columns_done[z] = true;
        flags_pivot_columns_done_t[i] = true;
        pivot_column_indices[z] = i;
        pivot_column_indices_t[i] = z;
        flags_rows_completed[i] = true;
        normalize_row(i);
      }
    }
    
    let i, j, k, z;
    // make as many pivot columns as possible (attempt to make every column a pivot column)
z;
    // make as many pivot columns as possible (attempt to make every column a pivot column)
    
    for(j = 1; j < that.width; j++){
      // skip "completed" columns (i.e. columns that have already become proper pivot columns)
      if(flags_pivot_columns_done[j]) continue;
      
      // hope that we have a row with less than j leading zeroes;
      // * if we don't, then column # j is a free column
      for(i = 0; i < that.length; i++){
        // skip "completed" rows (a completed row is a row whose leading entry has been assosciated with a pivot column)
        if(flags_rows_completed[i]) continue;
        
        // make sure leading_zeroes in this row is NOT greater than j
        z = that.leading_zeroes[i];
        if(z <= j){
          while(z < j){
            // remove the k-th entry
            sub_row(i, pivot_column_indices[z], that.m[i * that.width + z]);
            
            that.count_leading_zeroes();
            z = that.leading_zeroes[i];
          }
          
          // hopefully we can add this as a pivot column
          if(z === j){
            flags_pivot_columns_done[z] = true;
            flags_pivot_columns_done_t[i] = true;
            pivot_column_indices[z] = i;
            pivot_column_indices_t[i] = z;
            flags_rows_completed[i] = true;
            normalize_row(i);
            
            // don't bother searching the rest of the rows (we will handle them later)
            break;
          }
          // (btw,) failure is OK; it happens!
          // else console.log("failed to convert row " + i + " into pivot column # " + j);
        }
      }
      
      // if(i === that.length) console.log("column # " + j + " is a FREE column;");
    }
    
    // empty as many rows as possible (remove all leading entries in pivot columns that are not assosciated with their pivot columns)
    for(i = 1; i < that.length; i++){
      
      // skip "completed" rows (a completed row is a row whose leading entry has been assosciated with a pivot column)
      if(flags_rows_completed[i]) continue;
      
      // remove the leading entry (if we have a pivot column there)
      z = that.leading_zeroes[i];
      while(flags_pivot_columns_done[z]){
        sub_row(i, pivot_column_indices[z], that.m[i * that.width + z]);
        // update leading zeroes accordingly
        that.count_leading_zeroes();
        z = that.leading_zeroes[i];
      }
      
      // console.log("debug: that = " + that);
    }
    
    // sort (in place) sir by leading_zeroes
    //   sort ... by ... algorithm is pretty general; I bet there is a better implementation on stack overflow
    //   if your code is running slow, slap a general merge sort in here and call it a day *wink*;
    const sir = [];
    for(i = 0; i < that.length; i++){
      sir[i] = [i, that.leading_zeroes[i]];
    }
    sir.sort((a,b) => {
      return a[1] - b[1];
    });
    for(i = 0; i < that.length; i++){
      sir[i] = sir[i][0];
    }
    
    // console.log("sir = " + sir);
    // console.log("sorted leading_zeroes = " + that.leading_zeroes);
    
    const sorted = BooleanArray(that.length);
    for(i = 0; i < that.length; i++){
      j = i;
      if(j === sir[j]) sorted[j] = true;
      if(sorted[j]){
        // console.log("row " + j + " is sorted, I guess~");
        continue;
      }
      while(!sorted[j]){
        if(j === sir[j])
          throw err("Fatal", "value in `sir` returned to self, but not immediately!");
        sorted[j] = true;
        if(sorted[sir[j]])
          break;
        // swap row sir[j] with row sir[sir[j]]
        swap_rows(j, sir[j]);
        j = sir[j];
      }
    }
    
    // I think I forgot to this:
    that.count_leading_zeroes();
    
    // reduction: make sure each pivot column only has 1 non-zero entry
    if(rref){
      for(i = 0; i < that.length; i++){
        for(j = that.leading_zeroes[i] + 1; j < that.width; j++){
          k = that.m[i * that.width + j];
          z = pivot_column_indices[j];
          if(flags_pivot_columns_done[j] && k !== 0){
            console.log(`subtracting ${k} multiples of row ${z} from row ${i} in order to remove the ${j}-th element of row ${i} (which is located at position [${i},${i}]);`);
            sub_row(i, z, k);
            console.log(`* the value at position [${i},${j}] is now ${that.m[i * that.width + j]}, thanks to the subtraction;`);
          }
        }
      }
    }
    
    if(aug) return that.augment(aug);
    return that;
  },
  rref: function rref(augment = null, in_place = false){
    return this.ref(augment, in_place, true);
  },
  inv: function inv(){
    // implied:
    // this.auto_really_scale();
    // this.auto_really_transpose();
    
    const that = this.augment(this.ident()).rref();
    if(!that.slice(0, this.length, 0, this.width).isIdent()) return that.fill(NaN);
    return that.slice(0, this.length, this.width);
  },
  /***
    * Fill every value of this matrix with the same value.
    * @param {Number} value filler
    * @returns {Matrix} this matrix
   **/
  fill: function fill(value){
    for(let i = 0; i < this.m.length; i++){
      this.m[i] = value;
    }
    return this;
  },
  /***
    * Fill every value of a certain row of this matrix with the same value.
    * @param {Number} value filler
    * @param {Number} row_index index of which row to fill; 0 = first row, 1 = second row, etc...
    * @returns {Matrix} this matrix
   **/
  fillRow: function fillRow(value, row_index){
    for(let i = row_index * this.width; i < row_index * (1 + this.width); i++){
      this.m[i] = value;
    }
    return this;
  },
  /***
    * Fill every value of a certain column of this matrix with the same value.
    * @param {Number} value filler
    * @param {Number} col_index index of which column to fill; 0 = first column, 1 = second column, etc...
    * @returns {Matrix} this matrix;
   **/
  fillColumn: function fillColumn(value, col_index){
    for(let i = col_index; i < this.m.length; i += this.width){
      this.m[i] = value;
    }
    return this;
  },
  /***
    * Paste values from this matrix into a `location`. The `location` parameter is mutated in the process, but this is not.
    * @param {Array | Matrix} location paste into a 2-D array like object; if you want to paste this into a copy of location, use `this.toArray(location.constructor)` instead;
      * the location can be a matrix of different dimensions; in which case, this method will paste as many values as it can into `location`;
    * @param {Number} dimensions the number of dimensions that `location` has; assumed to be 2; this value is ignored if `location` is a matrix as well;
    * @returns {Array | Matrix} location;
   **/
  paste: function paste(location, dimensions = 2){
    const errin = "in: " + this.to_dim_name() + ".paste(location);";
    if(!location)
      err("Type", "location is a required parameter!" + errin);
    if(typeof location !== "object")
      err("Type", "location must be an array-like object!" + errin);
    if(!location instanceof Matrix && typeof location?.length !== "number")
      err("Type", "location needs to have a length!" + errin);
    
    if(location instanceof Matrix.Dynamic){
      let l = Math.min(this.m.length, location.length * location.width);
      let i, j, k = 0;
      for(i = 0; i < location.length && k < l; i++){
        for(j = 0; j < location.width && k < l; j++, k++){
          location.m[i][j] = this.m[k];
        }
      }
    }
    else if(location instanceof Matrix){
      let l = Math.min(this.m.length, location.m.length);
      for(let i = 0; i < l; i++){
        location.m[i] = this.m[i];
      }
    }
    else if(dimensions === 1){
      for(let i = 0; i < this.m.length; i++){
        location[i] = this.m[i];
      }
    }
    else if(dimensions === 2){
      for(let i = 0, j = 0, k = 0; i < this.m.length; i++){
        location[k][j] = this.m[i];
        
        j++;
        if(j === this.width)
          j = 0, k++;
      }
    }
    else /* if dimensions > 2 */{
      for(let i = 0, j = 0, k = 0, l; i < this.m.length; i++){
        l = location[k][j];
        for(let d = 3; d < dimensions; d++){
          l = l[0];
        }
        l[0] = this.m[i];
        
        j++;
        if(j === this.width)
          j = 0, k++;
      }
    }
    
    return location;
  },
  /* TODO:
  add the following methods:
    * sign() // get a mapped matrix with the sign of every value of this matrix;
    * pow(float)
    * sqrt() // optimized method to find the square root of this matrix
    * Y fill() // fill every value of this matrix with the same value;
      * Y fillRow() // fill every value of a specified row of this matrix with the same value;
      * Y fillColumn() // fill every value of a specified column of this matrix with the same value;
    * paste(2d_array_like_object) // paste values from a 2-D array into this matrix;
      * pasteRow(array_like_object, index) // paste values from an array into a specified row of this matrix;
      * pasteColumn(array_like_object, index) // paste values from an array into a specified column of this matrix;
      * pasteAt(array_like_object, row_index, col_index) //:
        * paste from array_like_object into a specific region of this matrix;
        * if array_like_object is a matrix, use this.pasteAt(that.slice(x1, x2, y1, y2), x0, y0) for maximum splicing flexibility!
    * row(n, asArray) // get row #n of this matrix (formatted as an Array is asArray = true, formatted as a Matrix otherwise);
    * column(n, asArray) // get column #n of this matrix (formatted as an Array is asArray = true, formatted as a Matrix otherwise);
    * rowsOfZeroes() // list all indices of rows of this matrix that contain only zeroes;
    * columnsOfZeroes() // list all indices of columns of this matrix that contain only zeroes;
    * rowsAreFull() // list all indices of rows of this matrix that are full (i.e. they contain no zeroes);
    * columnsAreFull() // list all indices of columns of this matrix that are full (i.e. they contain no zeroes);
    * inv() // inverse (calculated via GAUSSIAN ELIMINATION) (of a square a matrix)
      * inv .left() // for the left inverse (of an n by m matrix):
        * A.inv .left().multiply(A) = {the {n by n} identity matrix};
      * inv.right() // for the left inverse (of an n by m matrix):
        * A.multiply(A.inv.right()) = {the {m by m} identity matrix};
    * div(that) // divide, this.div(that) = this.multiply(that.inv());
    * mod(that) // modulo, this.mod(that) = this.subtract(this.div(that).floor());
    * det () // determinant (of this matrix);
    * Y ref () // row echelon form (of this matrix):
      * add in parameter to tack on an augmenting matrix;
      * add in options parameter:
        * with setting to leave existing leading entries as is;
    * rref() // reduced row echelon form (of this matrix);
    * rank() // get the rank (of this matrix);
    * row_space() // get the span of the row    space of this matrix;
    * col_space() // get the span of the column space of this matrix;
    * nul_space() // get the span of the null   space of this matrix;
    * cofactors() // get the matrix of cofactors to this matrix;
    * cofactor(i,j) // get the cofactor of this matrix, at coordinate {i,j}
    * unslice(array_like_object) // copy all values of this over into the array_like_object (mutating the parameter);
    * Y Matrix.fromArray(array_like_object) // convert a 2D array-like object into a matrix;
    * Matrix.fromString(text) // convert a string of text (in the format of this.toString's output) into a matrix; so, `Matrix.fromString(this.toString(digits)).eq(this) === true`, as long as `digits` is large enough;
    * Matrix.Dynamic.toMatrix // convert a Dynamic_Matrix to a Matrix;
  */
});

Matrix.fromArray = function(array_like_object){
  const length = array_like_object?.length;
  const width = array_like_object?.[0]?.length;
  let is_valid = true;
  length ?? (is_valid = false);
  width ?? (is_valid = false);
  if(!is_valid)
    throw err(
      "Type",
      "Your array_like_object (" +
      array_like_object +
      ") was not a valid 2-D array!"
    );
  
  const that = new Matrix(length, width);
  for(let i = 0; i < length; i++){
    for(let j = 0; j < width; j++){
      that.m[i * that.width + j] = array_like_object[i][j];
    }
  }
  
  return that;
};


/*==== ==== ==== ====**
  ==== Matrix method alternative names
**==== ==== ==== ====*/
classify(Matrix, {
  hypot: Matrix.prototype.abs,
  vector_length: Matrix.prototype.abs,
  diagonal_sum: Matrix.prototype.diagonal_total,
  diagonal_hypot: Matrix.prototype.diagonal_abs,
  hypotrunc: Matrix.prototype.hypofloor,
}, {}, "UPDATE");


const Vector = (class Vector extends Matrix{
  constructor(length){
    super(length, 1);
  }
});

/*==== ==== ==== ====**
  ==== Vector method main set up
**==== ==== ==== ====*/
classify(Vector, {
  width: 1,
  leading_zeroes: 0,
  /**
    * Multiply this by that;
      * if that is a number, return the product of scaling this by that;
      * if that is a vector, return the dot product;
      * if that is a matrix, return the matrix multiplication product;
    * @param {Number | Vector | Matrix} that 2nd operand in multiplication
    * @param {Boolean} as_matrix whether to return a Matrix instead of a Vector
    * @returns {Vector} product of this and that
   */
  multiply: function(that, as_matrix = false){
    if((that instanceof Vector) || (that.is_vector())){
      return this.dot(that);
    }
    if(that instanceof Number){
      return this.really_scale(that);
    }
    that = Matrix.prototype.multiply.call(this, that);
    if(as_matrix) return that;
    return that.toVector();
  },
  count_leading_zeroes: function(){
    let i;
    for(i = 0; i < this.m.length; i++){
      if(!Matrix.eq0(this.m[i])){
        i--;
        break;
      }
      this.m[i] = 0;
    }
    return i;
  },
}, {}, "UPDATE");

// TODO: actually add this in (i.e. implement Matrix.Dynamic);
// TODO: cry over the fact that I can't fold the JSDoc comment below;
// TODO: contemplate whether `TODO`s should be in the header;
/**
  * @class
  * Uses normal arrays instead of Float64 arrays
 **/
Matrix.Dynamic = function Dynamic_Matrix(length, width){
  this.length = length || 1;
  this.width  = width  || 1;
  let i,j;
  this.m = new Array(this.length);
  for(i = 0; i < this.length; i++){
    this.m[i] = new Array(this.width);
    for(j = 0; j < this.width; j++) this.m[i][j] = [0];
  }
  const a_t = (this.actual_transposition = new Array(this.width));
  for(i = 0; i < this.width; i++){
    a_t[i] = new Array(this.length);
    for(j = 0; j < this.length; j++) a_t[i][j] = this.m[j][i];
  }
  
  return this;
};
classify(Matrix.Dynamic, {}, {}, 1, 1);

/*==== ==== ==== ====**
  ==== Dynamic Matrix method inheritance from Matrix
**==== ==== ==== ====*/
coalesce(Matrix.Dynamic.prototype, Matrix.prototype, [
  "abs",
  "minor",
  "ident",
  "zero",
]);

/*==== ==== ==== ====**
  ==== Dynamic Matrix method set up
**==== ==== ==== ====*/
classify(Matrix.Dynamic, {
  m: [[[0]]],
  actual_transposition: [[[0]]],
  get_at: function get_at(i_row, i_col){
    return this.m?.[i_row]?.[i_col]?.[0];
  },
  set_at: function set_at(i_row, i_col, value){
    a = this.m[i_row];
    // throw RangeError?
    if(!a) return undefined;
    a = a[i_col];
    // throw RangeError?
    // or throw ValueError?
    //   (Matrix entry's Array wrapper was [removed in the past / not present])
    if(!a) return undefined;
    return (a[0] = value);
  },
}, {}, classify.UPDATE);

// generate a random n by k matrix
Matrix.random = function(length, width){
  const m = new Matrix(length, width);
  let i,j;
  for(i = 0; i < m.m.length; i++){
    m.m[i] = Matrix.rand.num();
  }
  return m;
};
Matrix.rand = new Rand();
Matrix.new_rand = function(min, max, sep){
  this.rand.constructor(min, max, sep);
};

// approximately 1 in 4 million
Matrix.epsilon = 2 ** (-22);

/**
  * Check if something is (approximately) zero;
  * @param {Number | Matrix} x check whether x equals 0 (the number 0, the zero vector, a zero matrix);
  * @returns {Boolean} whether x equals 0;
 **/
Matrix.eq0 = function(x){
  if(typeof x === "number")
    return (Math.abs(x) < Matrix.epsilon);
  // this is how smart people do recursion
  if(x instanceof Matrix) for(let i = 0; i < x.m.length; i++) if(!Matrix.eq0(x.m[i]))
    return false;
  return true;
};



/**
  * use 2 random n by k matrices to generate a random n by n singular matrix
 **/
Matrix.gen_singular = function(n, k){
  k ??= n +1;
  const m1 = Matrix.random(n, k);
  const m2 = Matrix.random(k, n);
  return matrix_mult(m1, m2);
};

const testee = Matrix.fromArray([
  [-3,  1, -1,  1, -1,  2,  1, -3],
  [-3,  1,  1,  1,  0,  1,  0,  0],
  [-3, -4,  1,  2,  1,  2, -4, -1],
  [ 0,  1,  3,  0, -2, -2, -3, -2],
  [-4, -1,  2, -2, -1, -2,  3, -1],
  [ 0,  2,  1,  2,  0, -3, -4,  1],
  [ 3,  3,  3,  0,  2,  0,  2, -4],
  [ 1, -4, -3, -4,  2,  3, -2,  3],
  
  // [ 0, 1, -1, 3],
  // [ 0, 0,  1, 1],
  // [ 1, 2, -2, 0],
  // [-1, 0,  0, 2],
]);


// console.clear();
if(1) onclick = function(){
  const me = testee;
  console.log("me"   + " = " + me.toString(".3"));
  // console.log("2*me" + " = " + me.clone().scale( 2));
  // console.log("-me"  + " = " + me.clone().scale(-1));
  // const me2 = me.multiply(me);
  // console.log("me^2" + " = " + me2);
  // console.log("me^2" + " also = " + me.pow(2));
  // console.log("me^2 diag" + " = " + me2.diagonal());
  // const me3 = me2.multiply(me);
  // console.log("me^3" + " = " + me3);
  // console.log("me^3" + " also = " + me.pow(3));
  // console.log("me's ident" + " = " + me.ident());
  // console.log("me's zero"  + " = " + me.zero());
  
  console.log("leading zeroes: " + me.count_leading_zeroes());
  // console.log("ref: " + me.ref().toString(".3"));
  // console.log("rref: " + me.rref().toString(".3"));
  console.log("aug: " + me.augment(me.ident()).toString(".3"));
  console.log("rref: " + me.rref(me.ident()).toString(".3"));
  // console.log("inv: " + me.inv().toString(".3"));
  /* expected:
  [
    [-9.5886e-02,  -9.3828e-02,  -6.1091e-03,   5.5248e-02,  -1.1123e-01,  -1.1365e-01,   6.4411e-03,  -5.1695e-02],
    [ 8.3070e-02,   1.9163e-01,  -1.4475e-01,   2.6467e-02,  -4.3068e-02,   1.0331e-01,   4.9360e-02,   6.9485e-02],
    [-2.5326e-01,   2.7295e-01,   3.5111e-02,   1.3900e-01,  -2.9234e-02,  -1.8107e-01,   3.3633e-02,  -5.3438e-02],
    [-6.5772e-02,  -3.0889e-02,   1.0615e-01,  -1.1215e-01,  -9.4531e-02,  -3.8829e-02,  -5.2138e-02,  -1.9324e-01],
    [ 3.5426e-02,  -3.8049e-02,   7.2894e-02,  -2.4617e-01,   1.1519e-01,   2.5009e-01,   1.8945e-01,   1.0324e-01],
    [-5.1695e-02,   2.8483e-01,  -1.4836e-02,   1.1243e-01,  -1.6684e-01,  -2.2436e-01,  -1.1532e-02,   2.2107e-02],
    [-7.0122e-02,  -2.8775e-04,  -1.3701e-02,  -9.3485e-02,   3.3157e-02,  -1.1358e-01,  -7.2933e-03,  -9.7823e-02],
    [-2.1691e-01,   2.5890e-01,  -5.7217e-02,  -4.2941e-03,  -6.3470e-02,  -7.5301e-02,  -9.1847e-02,  -2.4027e-02],
  ]
  */
};


window.testee = testee;
window.Matrix = Matrix;
window.BooleanArray = BooleanArray;

// takes up 9_421_888 bytes in RAM
// 9_421_888/8/64/10000 = 1.8402125 bytes inefficiency multiplier
// 9_421_888/64/10000 = 14.7217 bytes per float value
// 9_421_888/10000 = 942.1888 bytes per {8 by 8 matrix}
// window.testees = Array(10_000).fill(0).map(v => Matrix.random(8,8));











