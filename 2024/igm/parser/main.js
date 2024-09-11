


class s_data{
    /**
      * Stores a string as data, with a label
      * @param {String} value what is the data to store
      * @param {String} type what type of data is this
    **/
    constructor(value, type){
        this.value = value;
        this.type = type;
    }
}

const comment_or_quote = new RegExp(
    "\\/\\*" + "|" +
    "\\/\\*" + "|" +
    "\"" + "|" +
    "'" + "|" +
    "`",
    "g"
);

/**
  * separate the comments and quotes in a text, by splitting the data into data slices, and then replacing those data slices with new data that has the proper types
  * - all comments and strings will have their type overwritten
  * @param {s_data[]} texts
  * @returns {s_data[]}
**/
filter_comments_and_quotes = function(texts){
    /**
      * @type number[][]
      * `out_` is a list of "data slices"
      * the source of a data slice is original piece of data in `texts` that the data slice refers to
      * data slice format: `[`
      * - `0: data_index (number)` index of the source (within `texts`)
      * - `1: left_index (number)` index of the left side of this data slice (within its source)
      * - `2: right_index (number)` index of the right side of this data slice (within its source)
      * - `3: auto (boolean)` whether this data slice automatically opens / closes, due to it reaching the edge of its source
      * - `4: type (string)` the character sequence that closes this data slice; if this data automatically closes, then the type is the character sequence that opens it instead
      * 
      * `]`
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
                    out_i.push([
                        i,
                        previous,
                        mi.index +
                        mit.length,
                        +(auto),
                        mit
                    ]);
                }
            }
            // close quotes
            else if(in_quote){
                if(mit === quote_type){
                    quote_type = "";
                    in_quote = false;
                    out_i.push([
                        i,
                        previous,
                        mi.index +
                        mit.length,
                        auto,
                        mit
                    ]);
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
        // first, close the item from the current string
        if(auto){
            /** @type RegExpMatchArray */
            const mi = m[m.length - 1];
            const mit = mi[0];
            const last_i = t.length - 1;
            out_i.push([
                i,
                previous,
                last_i,
                auto,
                mit
            ]);
        }
        // then, prepare the next item in the next string
        previous = 0;
    }
    
    /** @type s_data[] */
    const out_s = [];
    
    let prev_i = -1;
    for(let i = 0; i < out_i.length; i++){
        // check for the start and end of each string
        const j = out_i[i][0];
        if(j !== prev_i){
            const jl = out_i[i][1];
            const jr = out_i[i][2];
            // ... start
            if(jl > 0){
                out_s.push(new s_data(
                    texts[j].value.slice(jl, jr),
                    texts[j].type
                ));
            }
            // ... end
            if(jr < texts[j].value.length - 1){
                out_s.push(new s_data(
                    texts[j].value.slice(jl, jr),
                    texts[j].type
                ));
            }
        }
        // now get the stuff between quotes / comments in each string
        else{
            
        }
        
        out_s.push(new s_data(
            
        ));
        
        prev_i = out_i[i][0];
    }
};

