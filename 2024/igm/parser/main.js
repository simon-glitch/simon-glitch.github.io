

/**
  * **very simple:** stores a string as data, with a label
**/
class s_data{
    /**
      * **very simple:** stores a string as data, with a label
      * @param {String} value what is the data to store
      * @param {String} type what type of data is this
    **/
    constructor(value, type){
        this.value = value;
        this.type = type;
    }
}

/**
  * constructs a data slice, for the `filter_comments_and_quotes` function
**/
class data_slice{
    /**
      * constructs a data slice, for the `filter_comments_and_quotes` function
      * 
      * terminology:
      * - `texts` is some list of `s_data`s
      * - the source of a data slice is original piece of data in `texts` that the data slice refers to
      * @param {number} data_index of the source (within `texts`)
      * @param {number} left_index of the left side of this data slice (within its source)
      * @param {number} right_index of the right side of this data slice (within its source)
      * @param {boolean} auto this data slice automatically opens / closes, due to it reaching the edge of its source
      * @param {string} type the character sequence that closes this data slice;
      * if this data automatically closes,
      * then the type is the character sequence that opens it instead
    **/
    constructor(data_index, left_index, right_index, auto, type){
            /** @type {number}
              * @field index of the source (within `texts`)
            **/
            this.data_index = data_index;
            /** @type {number}
              * @field index of the left side of this data slice (within its source)
            **/
            this.left_index = left_index;
            /** @type {number}
              * @field index of the right side of this data slice (within its source)
            **/
            this.right_index = right_index;
            /** @type {boolean}
              * @field whether this data slice automatically opens / closes, due to it reaching the edge of its source
            **/
            this.auto = auto;
            /**
              * @type {string}
              * @field the character sequence that closes this data slice;
              * if this data automatically closes,
              * then the type is the character sequence that opens it instead
            **/
            this.type = type;
    }
}

const comment_or_quote = new RegExp(...[
    "\\/\\*" + "|" +
    "\\/\\*" + "|" +
    "\"" + "|" +
    "'" + "|" +
    "`",
    "g"
]);

/**
  * encodes the start / end of of a comment or quote into the word "comment" or "quote"
  * @param {string} type the start / end to encode
  * @returns {string}
**/
const type_of = function(type){
    return ({
        "/*": "comment",
        "*/": "comment",
        "\"": "quote",
        "'": "quote",
        "`": "quote",
    }[type]);
};

/**
  * separate the comments and quotes in a text, by splitting the data into data slices, and then replacing those data slices with new data that has the proper types
  * - all comments and strings will have their type overwritten
  * @param {s_data[]} texts the `s_data`s to split
  * @returns {s_data[]} the split `s_data`s
**/
filter_comments_and_quotes = function(texts){
    /**
      * @type data_slice[]
    **/
    const out_i = [];
    let in_comment = false;
    let in_quote = false;
    let quote_type = "";
    let previous = 0;
    let auto = false;
    for(let i = 0; i < texts.length; i++){
        const t = texts[i].value;
        const m = Array.from(
            t.matchAll(comment_or_quote)
        );
        for(let ii = 0; ii < m.length; ii++){
            /** @type RegExpMatchArray */
            const mi = m[ii];
            const mit = mi[0];
            // close comments
            if(in_comment){
                if(mit === "*/"){
                    in_comment = false;
                    out_i.push(new data_slice(
                        i,
                        previous,
                        mi.index +
                        mit.length,
                        +(auto),
                        mit
                    ));
                }
            }
            // close quotes
            else if(in_quote){
                if(mit === quote_type){
                    quote_type = "";
                    in_quote = false;
                    out_i.push(new data_slice(
                        i,
                        previous,
                        mi.index +
                        mit.length,
                        auto,
                        mit
                    ));
                }
            }
            // open comments
            else if(mit === "/*"){
                previous = mi.index;
                in_comment = true;
                auto = false;
            }
            // open quotes
            else if(mit !== "*/"){
                previous = mi.index;
                quote_type = mit;
                in_quote = true;
                auto = false;
            }
        }
        
        auto = (in_comment || in_quote);
        // first, close the item from the current s_data
        if(auto){
            /** @type RegExpMatchArray */
            const mi = m[m.length - 1];
            const mit = mi[0];
            const last_i = t.length - 1;
            out_i.push(new data_slice(
                i,
                previous,
                last_i,
                auto,
                mit
            ));
        }
        // then, prepare the next item in the next s_data
        previous = 0;
    }
    
    /** @type s_data[] */
    const out_s = [];
    
    for(let i = 0; i < out_i.length; i++){
        const ds = out_i[i];
        const dsi = ds.data_index;
        const dsl = ds.left_index;
        const dsr = ds.right_index;
        const ps = out_i[i - 1] ??
            new data_slice(-1, NaN, NaN, false, "");
        const psi = ps.data_index;
        const psr = ps.right_index;
        // check for the start and end of each s_data
        if(dsi !== psi){
            const last_ti = texts[psi].value.length - 1;
            // ... start
            if(dsl > 0){
                out_s.push(new s_data(
                    texts[dsi].value.slice(0, dsl),
                    texts[dsi].type
                ));
            }
            // ... end
            if(psr < last_ti){
                out_s.push(new s_data(
                    texts[psi].value.slice(psr, last_ti),
                    texts[psi].type
                ));
            }
        }
        // now get the stuff between quotes / comments in each s_data
        else if(psi > -1){
            out_s.push(new s_data(
                texts[dsi].value.slice(
                    psr, 
                    dsl
                ),
                texts[dsi].type
            ));
        }
        
        // finally, get the quote / comment itself
        out_s.push(new s_data(
            texts[dsi].value.slice(
                dsl,
                dsr
            ),
            type_of(ds.type)
        ));
    }
    
    return out_s;
};

