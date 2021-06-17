/*
  This code is made solely by me, Simon Alexander Willover
  The code is intended to be used and shared, but NEVER used for commercial purposes, as I am the owner and I do not want other's making profit off of my work without me knowing about it.
  Rememeber: {
    This content is FREE, and NO PURCHASES or TRANSACTIONS may be done with it or related assets
    Make sure to put that REMEMBER satement in any and all copies of this code
  }
*/

/* This Parse() function simply converts a UGM text into a HTML */


/* this autocorrect will be used to autocorrect stuff

  also, it is biased towards QWERTY keybaord, but most English keybaords are similar to QWERTY.
*/
const autocorrect = {
  
  /* every key */
  allKeys: [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", /* 0 >> 9 */
    "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", /* 10 >> 19 */
    "i", "o", "p", "[", "]","\\", "a", "s", "d", "f", /* 20 >> 29 */
    "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", /* 30 >> 39 */
    "v", "b", "n", "m", ",", ".", "/", " ", "~", "!", /* 40 >> 49 */
    "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", /* 50 >> 59 */
    "+", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", /* 60 >> 69 */
    "P", "{", "}", "|", "A", "S", "D", "F", "H", "J", /* 70 >> 79 */
    "K"," L",": ","\"", "Z", "X", "C", "V", "B", "N", /* 80 >> 89 */
    "M", "<", ">", "?" /* 90 >> 93 */
  ],
  
  /* keys that are close on the keyboard */
  closeKeys: {
    "0":["9","o","p","[","-"],
    "1":["`","q","w","2"],
    "2":["1","q","w","e","3"],
    "3":["2","w","e","r","4"],
    "4":["3","e","r","t","5"],
    "5":["4","r","t","y","6"],
    "6":["5","t","y","u","7"],
    "7":["6","y","u","i","8"],
    "8":["7","u","i","o","9"],
    "9":["8","i","o","p","0"],
    "`":["1","q"],
    "-":["0","p","[","]","="],
    "=":["-","[","]","\\"],
    "q":["1","2","w","s","a"],
    "w":["q","a","s","e","3","2"],
    "e":["w","s","d","r","4","3"],
    "r":["e","d","f","t","5","4"],
    "t":["r","f","g","y","6","5"],
    "y":["t","g","h","u","7","6"],
    "u":["y","h","j","i","8","7"],
    "i":["u","j","k","o","9","8"],
    "o":["u","i","k","l","p","0","9"],
    "p":["o","l",";","[","-","0"],
    "[":["p",";","'","]","=","-"],
    "]":["'","[","-","=","\\"],
    "\\":["=","]"],
    "a":["q","w","s","z"],
    "s":["a","z","x","d","e","w"],
    "d":["s","x","c","f","r","e"],
    "f":["d","c","v","g","t","r"],
    "g":["f","v","b","h","y","t"],
    "h":["g","b","n","j","u","y"],
    "j":["h","n","m","k","i","u"],
    "k":["j","m",",","l","o","i"],
    "l":["k",",",".",";","p","o"],
    ";":["l",".","/","'","[","p"],
    "'":[";","/","[","]"],
    "z":["a","s","x"],
    "x":["s","d","c"],
    "c":["d","f","v","x"," "],
    "v":["c","f","g","b"," "],
    "b":["v","g","h","n"," "],
    "n":["b","h","j","m"," "],
    "m":["n","j","k",","," "],
    ",":["m","k","l","."," "],
    ".":[",","l",";","/"],
    "/":[".",";","'"],
    
    " ":["c","v","b","n","m",","],
    
    /* CAPS SECTION: */
    "~":["!","Q"],
    "!":["~","Q","@"],
    "@":["!","Q","W","#"],
    "#":["@","W","E","$"],
    "$":["#","E","R","%"],
    "%":["$","R","T","^"],
    "^":["%","T","Y","&"],
    "&":["^","Y","U","*"],
    "*":["&","U","I","("],
    "(":["*","I","O",")"],
    ")":["(","O","P","_"],
    "_":[")","P","{","+"],
    "+":["_","{","}","|"],
    "Q":["A","W","@","!"],
    "W":["Q","A","S","E","#","@"],
    "E":["W","S","D","R","$","#"],
    "R":["E","D","F","T","%","$"],
    "T":["R","F","G","Y","^","%"],
    "Y":["T","G","H","U","&","^"],
    "U":["Y","H","J","I","*","&"],
    "I":["U","J","K","O","(","*"],
    "O":["I","K","L","P",")","("],
    "P":["O","L",":","{","_",")"],
    "{":["P",":","\"","}","+","_"],
    "}":["\"","{","+","|"],
    "|":["}","+"],
    "A":["Z","S","W","Q"],
    "S":["Z","X","A","D","E","W"],
    "D":["S","X","C","F","R","E"],
    "F":["D","C","V","G","T","R"],
    "H":["G","B","N","J","U","Y"],
    "J":["H","N","M","K","I","U"],
    "K":["J","M","<","L","O","I"],
    "L":["K","<",">",":","P","O"],
    ":":["L",">","?","\"","{","P"],
    "\"":["?",":","{","}"],
    "Z":["A","S","X"],
    "X":["Z","S","D","C"],
    "C":["X","D","F","V"," "],
    "V":["C","F","G","B"," "],
    "B":["V","G","H","N"," "],
    "N":["B","H","J","M"," "],
    "M":["N","J","K","<"," "],
    "<":["M","K","L",">"," "],
    ">":["<","L",":","?"],
    "?":["\"",":",">"]
  },
  
  vowels: [ "a", "e", "i", "o", "u", "A", "E", "I", "O", "U" ],
  
  /* the "distance" between 2 charactes */
  disc: function( char1, char2 ){
    if( char === char2 ) return 0;
    if( vowels.indexOf( char1 ) + vowels.indexOf( char2 ) > -2 ) return 0.2;
    if(
      autocorrect.closeKeys[ char1 ].indexOf( char2 ) > -1 ||
      autocorrect.closeKeys[ char2 ].indexOf( char1 ) > -1
    ) return 0.4;
    
    return 1;
  },
  /* the "distance" between 2 words */
  dis: function( word1, word2 ){
    let d = 0;
    for( let i1 = 0, i2 = 0, dprev, dcurr, dnext, cont; i1 < word1.length; i1++ ){
      cont = true;
      dprev = autocorrect.disc( word1[ i1 ], word2[ i2 -1 ] );
      dcurr = autocorrect.disc( word1[ i1 ], word2[ i2    ] );
      dnext = autocorrect.disc( word1[ i1 ], word2[ i2 +1 ] );
      if( dprev < dcurr && dprev < dnext ){
        d += dprev * 1.2;
        i2--;
        cont = false;
      }
      if( dnext < dcurr && cont ){
        d += dnext * 1.2;
        i2++;
        cont = false;
      }
      if( cont ) d += dcurr;
      
      if( i2 < word2.length - 1 ) i2++;
    }
    return d;
  },
  
  /* find the word in words that is "closest" to inWord */
  f: function( inWord, words ){
    
    let d = Infinity, try_d = 0, word = "unkown";
    for( let i = 0; i < words.length; i++ ){
      try_d = dis( inWord, words[ i ] );
      if( try_d < d ){
        d = try_d;
        word = words[ i ];
      }
    }
    return word;
    
  }
};

/* map CAPITOLS to lower case in autocorrect.closeKeys */
{
  /* 48 is the index of "~", the first "CAPITOL" */
  for( let i = 48, UPKey, downKey; i < autocorrect.allKeys.length; i++ ){
    UPKey = autocorrect.allKeys[ i ];
    downKey = autocorrect.allKeys[ i - 48 ];
    console.log( i, i - 48, UPKey, downKey )
    autocorrect.closeKeys[ UPKey ].push( downKey );
    autocorrect.closeKeys[ downKey ].push( UPKey );
  }
}


if( true ){
  let div = document.querySelector( "#close-keys" );
  div.remove();
}
if( false ){
  let div = document.querySelector( "#close-keys" );
  let span = document.querySelector( "#close-keys > p > span" );
  let input = document.querySelector( "#close-keys > input" );
  
  let i = 0;
  let saveKey = function(){
    let arr = [];
    autocorrect.closeKeys[ autocorrect.allKeys[ i - 1 ] ] = arr;
    for( let ii = 0; ii < input.value.length; ii++ ){
      arr.push( input.value[ ii ] );
    }
  };
  let nextKey = function(){
    input.value = "";
    if( i === autocorrect.allKeys.length ){
      div.remove();
      console.log( JSON.stringify( autocorrect.closeKeys ) );
    }
    span.innerHTML = autocorrect.allKeys[ i ];
    i++;
  }
  input.onkeyup = function( e ){
    if( e.key === "Enter" ){
      saveKey();
      nextKey();
    }
  };
  nextKey();
}



var ugm;
ugm = {
  include: function( pattern, params ){
    let names = [];
    for( let i in params ){
      names.push( i );
    }
    let m = pattern.match();
    for( let i = 0, pname; i < m.length; i++ ){
      m[ i ]
    }
  },
  effect: function(){},
  parse: function(){}
};

/*
Here are some examples of UGM things and the objects they are converted into

* box1
  header: Gum flavors
  contains: :upgrades:tag( gum_flavors )
  class: gummy
=>
{
  name: "box1",
  header: "Gum Flavors",
  contains: [
    selector{
      groups: [
        "upgrades",
        expression_function{
          name: "tag",
          params: [ "gum_flavors" ]
        }
      ],
      result: [],
      needs_updated: true
    }
  ]
}


*/







