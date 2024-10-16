
// typedef is so useful
/** @typedef {settings} Settings */
const settings = {
    /**
      * whether each string type can be multiline
      * 
      * i wonder if i will end up setting a custom property for this
    **/
    multiline_strings: {
        /** default value for the other properties */
        "*": false,
        "\"": true,
        "'": false,
        "`": true,
    },
    /**
      * whether the string format from the Lua language is supported
    **/
    lua_strings: false,
    /**
      * whether single line comments are supported
    **/
    single_line_comments: true,
    /**
      * whether multi line comments are supported
    **/
    multi_line_comments: false,
    single_line_comment_indicator: "//",
    multi_line_comment_indicators: ["/*", "*/"],
    escape_character: "\\",
    /**
      * whether the escape character is supported in various contexts
    **/
    escape_character_support: {
        /** @typedef {string_escape} StringEscape */
        strings: {
            /** default value for the other properties */
            "*": false,
            "\"": false,
            "'": true,
            "`": true,
        },
        /**
          * whether literals, such as variable names, can be composed of escaped characters
          * - this causes the escaped character to become a part of the literal's actual name
          * - so `x\+y` would be a literal, named "x+y"
          * - `x\+y = 5;` sets the variable named "x+y" to the value `5`
          * - use with caution
        **/
        literals: true,
    },
    /**
      * specifies unique escape characters for each string
      * 
      * each property specifices additional escape characters for its respective string type:
      * - an empty string (`""`) specifies that the string type has no unique escape characters
      * - a list of strings means each string in the list is a valid escape character
      * - a single non-empty string means that string is a valid escape character
      * - if `string_escape_character_support` says the string type supports the default escape character, than the string type will support the default escape character as well as any escape characters listed here
      * - setting the property to a falsy value, or not setting the property at all, will cause it to be treated as if it was set to an empty string (`""`)
    **/
    string_specific_escape_characters: {
        /** default value for the other properties */
        "*": "",
        "\"": "",
        "'": "",
        "`": "",
    },
    /**
      * whether HTML escape sequences (aka HTML entities) can be used in various contexts
    **/
    html_escapes: {
        /**
          * whether each string type can use HTML escape sequences
          * @type {StringEscape}
        **/
        strings: {
            "*": false,
            "\"": true,
            "'": true,
            "`": true,
        },
        /**
          * wether the code can use HTML escape entities as a whole (excludes strings and comments)
          * - this does **not** do what `escape_character_support.literals` does
          * - that allows literals to contain escaped characters
          * - this simply cuases all HTML escape sequences to be converted into their proper character before being parsed
          * - `x&#43;y` is interpreted as `x+y`:
          *     - `x` and `y` are treated as a separate literals
          *     - `+` is interpreted as the addition operation
          * #### TL;DR
          * this means you can safely use HTML escape sequences in your code
          * @default true
        **/
        code: true,
    },
};

/**
  * automatically formats the `settings` object; formatting is applied to a clone
  * @returns {settings} a formatted clone of the settings object
**/
const format_settings = function(){
    
};


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
    "\\*\\/" + "|" +
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
        console.log("match", m);
        
        for(let ii = 0; ii < m.length; ii++){
            /** @type RegExpMatchArray */
            const mi = m[ii];
            const mit = mi[0];
            // close comments
            if(in_comment){
                if(mit === "*/"){
                    console.log("closing comment", mi);
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
                    console.log("closing quote", mi);
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
                console.log("opening comment", mi);
                previous = mi.index;
                in_comment = true;
                auto = false;
            }
            // open quotes
            else if(mit !== "*/"){
                console.log("opening quote", mi);
                previous = mi.index;
                quote_type = mit;
                in_quote = true;
                auto = false;
            }
            else{
                console.log("unknown case", mi);
            }
        }
        
        auto = (in_comment || in_quote);
        // first, close the item from the current s_data
        if(auto){
            /** @type RegExpMatchArray */
            const mi = m[m.length - 1];
            const mit = mi[0];
            const last_i = t.length - 1;
            console.log(
                "automatically cloing the" +
                "last item in s_data # " +
                i,
                mi
            );
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
    
    console.log("out_i", out_i);
    
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
            // ... start
            if(dsl > 0){
                out_s.push(new s_data(
                    texts[dsi].value.slice(0, dsl),
                    texts[dsi].type
                ));
            }
            // ... end
            if(psi > -1){
                const last_ti = texts[psi].value.length - 1;
                if(psr < last_ti){
                    out_s.push(new s_data(
                        texts[psi].value.slice(psr, last_ti),
                        texts[psi].type
                    ));
                }
            }
        }
        // now get the stuff between comments / quotes in each s_data
        else if(psi > -1){
            // but make sure to not include empty strings because they are redundant
            if(dsl - psr > 0)
            out_s.push(new s_data(
                texts[dsi].value.slice(
                    psr,
                    dsl
                ),
                texts[dsi].type
            ));
        }
        
        // finally, get the comment / quote itself
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


test_me = `
/* this commented text */
do some stuff, I guess???

hahaha

"i am double quote string"

'this is single quote'

"A"'B'"C"

there should be nothing between those

"A""A" should also work

multiline:
"
x
y
z
"

\`backticks\`

\`'"all the quotes'" :D ''""'"''"""'''""""'"'"'""\`

\`'"comments in quotes"': /*hiya there!*//*"yo" 'yo'*/\`

/* any quotes in a comment should not do anything '"\`*/

CHECKED?

"isn't it nice out today?" should just be a double quote string

my computer is not getting wifi, so i need to restart it LOL
`;

my_data = new s_data(test_me, "");

console.log(
    "final res",
    filter_comments_and_quotes([my_data])
);




/*
How should I encode escaped characters though?

JavaScript only parses them in strings, but that would mean
adding checks for backslashes to the `filter_comments_and_quotes`

It only requires adding a new regular expression for the ends of strings,
which would have it's string part be:
    (?<!(?<!\\)(\\\\)+\\)"
    with everything escaped once more:
    (?<!(?<!\\\\)(\\\\\\\\)+\\\\)\"

And as a reminder, this is the RegExp for the comments:
    \/\/.*\n
    the \n could potentially be removed
    and with everything escaped once more:
    \\/\\/.*\\n

I guess I have some work cut out for me.

====
*/


