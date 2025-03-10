
// yeah, that's a little bit long
const html_entities = {
    9: {
        shorthand: "&Tab;",
        name: "Tab",
    },
    10: {
        shorthand: "&NewLine;",
        name: "New Line",
    },
    32: {
        shorthand: "&nbsp;",
        name: "Space",
    },
    33: {
        shorthand: "",
        name: "Exclamation mark",
    },
    34: {
        shorthand: "&quot;",
        name: "Quotation mark",
    },
    35: {
        shorthand: "",
        name: "Number sign",
    },
    36: {
        shorthand: "",
        name: "Dollar sign",
    },
    37: {
        shorthand: "",
        name: "Percent sign",
    },
    38: {
        shorthand: "&amp;",
        name: "Ampersand",
    },
    39: {
        shorthand: "",
        name: "Apostrophe",
    },
    40: {
        shorthand: "",
        name: "Opening/Left Parenthesis",
    },
    41: {
        shorthand: "",
        name: "Closing/Right Parenthesis",
    },
    42: {
        shorthand: "",
        name: "Asterisk",
    },
    43: {
        shorthand: "",
        name: "Plus sign",
    },
    44: {
        shorthand: "",
        name: "Comma",
    },
    45: {
        shorthand: "",
        name: "Hyphen",
    },
    46: {
        shorthand: "",
        name: "Period",
    },
    47: {
        shorthand: "",
        name: "Slash",
    },
    48: {
        shorthand: "",
        name: "Digit 0",
    },
    49: {
        shorthand: "",
        name: "Digit 1",
    },
    50: {
        shorthand: "",
        name: "Digit 2",
    },
    51: {
        shorthand: "",
        name: "Digit 3",
    },
    52: {
        shorthand: "",
        name: "Digit 4",
    },
    53: {
        shorthand: "",
        name: "Digit 5",
    },
    54: {
        shorthand: "",
        name: "Digit 6",
    },
    55: {
        shorthand: "",
        name: "Digit 7",
    },
    56: {
        shorthand: "",
        name: "Digit 8",
    },
    57: {
        shorthand: "",
        name: "Digit 9",
    },
    58: {
        shorthand: "",
        name: "Colon",
    },
    59: {
        shorthand: "",
        name: "Semicolon",
    },
    60: {
        shorthand: "&lt;",
        name: "Less-than",
    },
    61: {
        shorthand: "",
        name: "Equals sign",
    },
    62: {
        shorthand: "&gt;",
        name: "Greater than",
    },
    63: {
        shorthand: "",
        name: "Question mark",
    },
    64: {
        shorthand: "",
        name: "At sign",
    },
    65: {
        shorthand: "",
        name: "Uppercase A",
    },
    66: {
        shorthand: "",
        name: "Uppercase B",
    },
    67: {
        shorthand: "",
        name: "Uppercase C",
    },
    68: {
        shorthand: "",
        name: "Uppercase D",
    },
    69: {
        shorthand: "",
        name: "Uppercase E",
    },
    70: {
        shorthand: "",
        name: "Uppercase F",
    },
    71: {
        shorthand: "",
        name: "Uppercase G",
    },
    72: {
        shorthand: "",
        name: "Uppercase H",
    },
    73: {
        shorthand: "",
        name: "Uppercase I",
    },
    74: {
        shorthand: "",
        name: "Uppercase J",
    },
    75: {
        shorthand: "",
        name: "Uppercase K",
    },
    76: {
        shorthand: "",
        name: "Uppercase L",
    },
    77: {
        shorthand: "",
        name: "Uppercase M",
    },
    78: {
        shorthand: "",
        name: "Uppercase N",
    },
    79: {
        shorthand: "",
        name: "Uppercase O",
    },
    80: {
        shorthand: "",
        name: "Uppercase P",
    },
    81: {
        shorthand: "",
        name: "Uppercase Q",
    },
    82: {
        shorthand: "",
        name: "Uppercase R",
    },
    83: {
        shorthand: "",
        name: "Uppercase S",
    },
    84: {
        shorthand: "",
        name: "Uppercase T",
    },
    85: {
        shorthand: "",
        name: "Uppercase U",
    },
    86: {
        shorthand: "",
        name: "Uppercase V",
    },
    87: {
        shorthand: "",
        name: "Uppercase W",
    },
    88: {
        shorthand: "",
        name: "Uppercase X",
    },
    89: {
        shorthand: "",
        name: "Uppercase Y",
    },
    90: {
        shorthand: "",
        name: "Uppercase Z",
    },
    91: {
        shorthand: "",
        name: "Opening/Left square bracket",
    },
    92: {
        shorthand: "",
        name: "Backslash",
    },
    93: {
        shorthand: "",
        name: "Closing/Right square bracket",
    },
    94: {
        shorthand: "",
        name: "Caret",
    },
    95: {
        shorthand: "",
        name: "Underscore",
    },
    96: {
        shorthand: "",
        name: "Grave accent",
    },
    97: {
        shorthand: "",
        name: "Lowercase a",
    },
    98: {
        shorthand: "",
        name: "Lowercase b",
    },
    99: {
        shorthand: "",
        name: "Lowercase c",
    },
    100: {
        shorthand: "",
        name: "Lowercase d",
    },
    101: {
        shorthand: "",
        name: "Lowercase e",
    },
    102: {
        shorthand: "",
        name: "Lowercase f",
    },
    103: {
        shorthand: "",
        name: "Lowercase g",
    },
    104: {
        shorthand: "",
        name: "Lowercase h",
    },
    105: {
        shorthand: "",
        name: "Lowercase i",
    },
    106: {
        shorthand: "",
        name: "Lowercase j",
    },
    107: {
        shorthand: "",
        name: "Lowercase k",
    },
    108: {
        shorthand: "",
        name: "Lowercase l",
    },
    109: {
        shorthand: "",
        name: "Lowercase m",
    },
    110: {
        shorthand: "",
        name: "Lowercase n",
    },
    111: {
        shorthand: "",
        name: "Lowercase o",
    },
    112: {
        shorthand: "",
        name: "Lowercase p",
    },
    113: {
        shorthand: "",
        name: "Lowercase q",
    },
    114: {
        shorthand: "",
        name: "Lowercase r",
    },
    115: {
        shorthand: "",
        name: "Lowercase s",
    },
    116: {
        shorthand: "",
        name: "Lowercase t",
    },
    117: {
        shorthand: "",
        name: "Lowercase u",
    },
    118: {
        shorthand: "",
        name: "Lowercase v",
    },
    119: {
        shorthand: "",
        name: "Lowercase w",
    },
    120: {
        shorthand: "",
        name: "Lowercase x",
    },
    121: {
        shorthand: "",
        name: "Lowercase y",
    },
    122: {
        shorthand: "",
        name: "Lowercase z",
    },
    123: {
        shorthand: "",
        name: "Opening/Left curly brace",
    },
    124: {
        shorthand: "",
        name: "Vertical bar",
    },
    125: {
        shorthand: "",
        name: "Closing/Right curly brace",
    },
    126: {
        shorthand: "",
        name: "Tilde",
    },
    128: {
        shorthand: "",
        name: "Euro sign",
    },
    130: {
        shorthand: "",
        name: "Punctuation mark",
    },
    131: {
        shorthand: "",
        name: "Florin sign",
    },
    132: {
        shorthand: "",
        name: "Quotation mark",
    },
    133: {
        shorthand: "",
        name: "Horizontal ellipsis",
    },
    134: {
        shorthand: "",
        name: "Dagger",
    },
    135: {
        shorthand: "",
        name: "Double dagger",
    },
    136: {
        shorthand: "",
        name: "Circumflex",
    },
    137: {
        shorthand: "",
        name: "Per-mille",
    },
    138: {
        shorthand: "",
        name: "Latin capital letter s with caron",
    },
    139: {
        shorthand: "",
        name: "Single left angle quotation",
    },
    140: {
        shorthand: "",
        name: "Uppercase ligature OE",
    },
    142: {
        shorthand: "",
        name: "Latin capital letter z with caron",
    },
    145: {
        shorthand: "",
        name: "Opening single quotation mark",
    },
    146: {
        shorthand: "",
        name: "Closing single quotation mark",
    },
    147: {
        shorthand: "",
        name: "Opening double quotation mark",
    },
    148: {
        shorthand: "",
        name: "Closing double quotation mark",
    },
    149: {
        shorthand: "",
        name: "Bullet",
    },
    150: {
        shorthand: "",
        name: "En dash",
    },
    151: {
        shorthand: "",
        name: "Em dash",
    },
    152: {
        shorthand: "",
        name: "Tilde",
    },
    153: {
        shorthand: "",
        name: "Trademark",
    },
    154: {
        shorthand: "",
        name: "Latin small letter s with caron",
    },
    155: {
        shorthand: "",
        name: "Single right angle quotation",
    },
    156: {
        shorthand: "",
        name: "Lowercase ligature OE",
    },
    158: {
        shorthand: "",
        name: "Latin small letter z with caron",
    },
    159: {
        shorthand: "",
        name: "Latin capital letter y with diaeresis",
    },
    160: {
        shorthand: "&nbsp;",
        name: "Non-breaking space",
    },
    161: {
        shorthand: "&iexcl;",
        name: "Inverted exclamation mark",
    },
    162: {
        shorthand: "&cent;",
        name: "Cent",
    },
    163: {
        shorthand: "&pound;",
        name: "Pound",
    },
    164: {
        shorthand: "&curren;",
        name: "Currency",
    },
    165: {
        shorthand: "&yen;",
        name: "Yen",
    },
    166: {
        shorthand: "&brvbar;",
        name: "Broken vertical bar",
    },
    167: {
        shorthand: "&sect;",
        name: "Section",
    },
    168: {
        shorthand: "&uml;",
        name: "Spacing diaeresis",
    },
    169: {
        shorthand: "&copy;",
        name: "Copyright",
    },
    170: {
        shorthand: "&ordf;",
        name: "Feminine ordinal indicator",
    },
    171: {
        shorthand: "&laquo;",
        name: "Opening/Left angle quotation mark",
    },
    172: {
        shorthand: "&not;",
        name: "Negation",
    },
    173: {
        shorthand: "&shy;",
        name: "Soft hyphen",
    },
    174: {
        shorthand: "&reg;",
        name: "Registered trademark",
    },
    175: {
        shorthand: "&macr;",
        name: "Spacing macron",
    },
    176: {
        shorthand: "&deg;",
        name: "Degree",
    },
    177: {
        shorthand: "&plusmn;",
        name: "Plus or minus",
    },
    178: {
        shorthand: "&sup2;",
        name: "Superscript 2",
    },
    179: {
        shorthand: "&sup3;",
        name: "Superscript 3",
    },
    180: {
        shorthand: "&acute;",
        name: "Spacing acute",
    },
    181: {
        shorthand: "&micro;",
        name: "Micro",
    },
    182: {
        shorthand: "&para;",
        name: "Paragraph",
    },
    182: {
        shorthand: "&dot;",
        name: "Dot",
    },
    184: {
        shorthand: "&cedil;",
        name: "Spacing cedilla",
    },
    185: {
        shorthand: "&sup1;",
        name: "Superscript 1",
    },
    186: {
        shorthand: "&ordm;",
        name: "Masculine ordinal indicator",
    },
    187: {
        shorthand: "&raquo;",
        name: "Closing/Right angle quotation mark",
    },
    188: {
        shorthand: "&frac14;",
        name: "Fraction 1/4",
    },
    189: {
        shorthand: "&frac12;",
        name: "Fraction 1/2",
    },
    190: {
        shorthand: "&frac34;",
        name: "Fraction 3/4",
    },
    191: {
        shorthand: "&iquest;",
        name: "Inverted question mark",
    },
    192: {
        shorthand: "&Agrave;",
        name: "Capital a with grave accent",
    },
    193: {
        shorthand: "&Aacute;",
        name: "Capital a with acute accent",
    },
    194: {
        shorthand: "&Acirc;",
        name: "Capital a with circumflex accent",
    },
    195: {
        shorthand: "&Atilde;",
        name: "Capital a with tilde",
    },
    196: {
        shorthand: "&Auml;",
        name: "Capital a with umlaut",
    },
    197: {
        shorthand: "&Aring;",
        name: "Capital a with ring",
    },
    198: {
        shorthand: "&AElig;",
        name: "Capital ae",
    },
    199: {
        shorthand: "&Ccedil;",
        name: "Capital c with cedilla",
    },
    200: {
        shorthand: "&Egrave;",
        name: "Capital e with grave accent",
    },
    201: {
        shorthand: "&Eacute;",
        name: "Capital e with acute accent",
    },
    202: {
        shorthand: "&Ecirc;",
        name: "Capital e with circumflex accent",
    },
    203: {
        shorthand: "&Euml;",
        name: "Capital e with umlaut",
    },
    204: {
        shorthand: "&Igrave;",
        name: "Capital i with grave accent",
    },
    205: {
        shorthand: "&Iacute;",
        name: "Capital i with accute accent",
    },
    206: {
        shorthand: "&Icirc;",
        name: "Capital i with circumflex accent",
    },
    207: {
        shorthand: "&Iuml;",
        name: "Capital i with umlaut",
    },
    208: {
        shorthand: "&ETH;",
        name: "Capital eth (Icelandic)",
    },
    209: {
        shorthand: "&Ntilde;",
        name: "Capital n with tilde",
    },
    210: {
        shorthand: "&Ograve;",
        name: "Capital o with grave accent",
    },
    211: {
        shorthand: "&Oacute;",
        name: "Capital o with accute accent",
    },
    212: {
        shorthand: "&Ocirc;",
        name: "Capital o with circumflex accent",
    },
    213: {
        shorthand: "&Otilde;",
        name: "Capital o with tilde",
    },
    214: {
        shorthand: "&Ouml;",
        name: "Capital o with umlaut",
    },
    215: {
        shorthand: "&times;",
        name: "Multiplication",
    },
    216: {
        shorthand: "&Oslash;",
        name: "Capital o with slash",
    },
    217: {
        shorthand: "&Ugrave;",
        name: "Capital u with grave accent",
    },
    218: {
        shorthand: "&Uacute;",
        name: "Capital u with acute accent",
    },
    219: {
        shorthand: "&Ucirc;",
        name: "Capital u with circumflex accent",
    },
    220: {
        shorthand: "&Uuml;",
        name: "Capital u with umlaut",
    },
    221: {
        shorthand: "&Yacute;",
        name: "Capital y with acute accent",
    },
    222: {
        shorthand: "&THORN;",
        name: "Capital thorn (Icelandic)",
    },
    223: {
        shorthand: "&szlig;",
        name: "Lowercase sharp s (German)",
    },
    224: {
        shorthand: "&agrave;",
        name: "Lowercase a with grave accent",
    },
    225: {
        shorthand: "&aacute;",
        name: "Lowercase a with acute accent",
    },
    226: {
        shorthand: "&acirc;",
        name: "Lowercase a with circumflex accent",
    },
    227: {
        shorthand: "&atilde;",
        name: "Lowercase a with tilde",
    },
    228: {
        shorthand: "&auml;",
        name: "Lowercase a with umlaut",
    },
    229: {
        shorthand: "&aring;",
        name: "Lowercase a with ring",
    },
    230: {
        shorthand: "&aelig;",
        name: "Lowercase ae",
    },
    231: {
        shorthand: "&ccedil;",
        name: "Lowercase c with cedilla",
    },
    232: {
        shorthand: "&egrave;",
        name: "Lowercase e with grave accent",
    },
    233: {
        shorthand: "&eacute;",
        name: "Lowercase e with acute accent",
    },
    234: {
        shorthand: "&ecirc;",
        name: "Lowercase e with circumflex accent",
    },
    235: {
        shorthand: "&euml;",
        name: "Lowercase e with umlaut",
    },
    236: {
        shorthand: "&igrave;",
        name: "Lowercase i with grave accent",
    },
    237: {
        shorthand: "&iacute;",
        name: "Lowercase i with acute accent",
    },
    238: {
        shorthand: "&icirc;",
        name: "Lowercase i with circumflex accent",
    },
    239: {
        shorthand: "&iuml;",
        name: "Lowercase i with umlaut",
    },
    240: {
        shorthand: "&eth;",
        name: "Lowercase eth (Icelandic)",
    },
    241: {
        shorthand: "&ntilde;",
        name: "Lowercase n with tilde",
    },
    242: {
        shorthand: "&ograve;",
        name: "Lowercase o with grave accent",
    },
    243: {
        shorthand: "&oacute;",
        name: "Lowercase o with acute accent",
    },
    244: {
        shorthand: "&ocirc;",
        name: "Lowercase o with circumflex accent",
    },
    245: {
        shorthand: "&otilde;",
        name: "Lowercase o with tilde",
    },
    246: {
        shorthand: "&ouml;",
        name: "Lowercase o with umlaut",
    },
    247: {
        shorthand: "&divide;",
        name: "Divide",
    },
    248: {
        shorthand: "&oslash;",
        name: "Lowercase o with slash",
    },
    249: {
        shorthand: "&ugrave;",
        name: "Lowercase u with grave accent",
    },
    250: {
        shorthand: "&uacute;",
        name: "Lowercase u with acute accent",
    },
    251: {
        shorthand: "&ucirc;",
        name: "Lowercase u with circumflex accent",
    },
    252: {
        shorthand: "&uuml;",
        name: "Lowercase u with umlaut",
    },
    253: {
        shorthand: "&yacute;",
        name: "Lowercase y with acute accent",
    },
    254: {
        shorthand: "&thorn;",
        name: "Lowercase thorn (Icelandic)",
    },
    255: {
        shorthand: "&yuml;",
        name: "Lowercase y with umlaut",
    },
    256: {
        shorthand: "&Amacr;",
        name: "Latin capital letter a with macron",
    },
    257: {
        shorthand: "&amacr;",
        name: "Latin small letter a with macron",
    },
    258: {
        shorthand: "&Abreve;",
        name: "Latin capital letter a with breve",
    },
    259: {
        shorthand: "&abreve;",
        name: "Latin small letter a with breve",
    },
    260: {
        shorthand: "&Aogon;",
        name: "Latin capital letter a with ogonek",
    },
    261: {
        shorthand: "&aogon;",
        name: "Latin small letter a with ogonek",
    },
    262: {
        shorthand: "&Cacute;",
        name: "Latin capital letter c with acute",
    },
    263: {
        shorthand: "&cacute;",
        name: "Latin small letter c with acute",
    },
    264: {
        shorthand: "&Ccirc;",
        name: "Latin capital letter c with circumflex",
    },
    265: {
        shorthand: "&ccirc;",
        name: "Latin small letter c with circumflex",
    },
    266: {
        shorthand: "&Cdot;",
        name: "Latin capital letter c with dot above",
    },
    267: {
        shorthand: "&cdot;",
        name: "Latin small letter c with dot above",
    },
    268: {
        shorthand: "&Ccaron;",
        name: "Latin capital letter c with caron",
    },
    269: {
        shorthand: "&ccaron;",
        name: "Latin small letter c with caron",
    },
    270: {
        shorthand: "&Dcaron;",
        name: "Latin capital letter d with caron",
    },
    271: {
        shorthand: "&dcaron;",
        name: "Latin small letter d with caron",
    },
    272: {
        shorthand: "&Dstrok;",
        name: "Latin capital letter d with stroke",
    },
    273: {
        shorthand: "&dstrok;",
        name: "Latin small letter d with stroke",
    },
    274: {
        shorthand: "&Emacr;",
        name: "Latin capital letter e with macron",
    },
    275: {
        shorthand: "&emacr;",
        name: "Latin small letter e with macron",
    },
    276: {
        shorthand: "&Ebreve;",
        name: "Latin capital letter e with breve",
    },
    277: {
        shorthand: "&ebreve;",
        name: "Latin small letter e with breve",
    },
    278: {
        shorthand: "&Edot;",
        name: "Latin capital letter e with dot above",
    },
    279: {
        shorthand: "&edot;",
        name: "Latin small letter e with dot above",
    },
    280: {
        shorthand: "&Eogon;",
        name: "Latin capital letter e with ogonek",
    },
    281: {
        shorthand: "&eogon;",
        name: "Latin small letter e with ogonek",
    },
    282: {
        shorthand: "&Ecaron;",
        name: "Latin capital letter e with caron",
    },
    283: {
        shorthand: "&ecaron;",
        name: "Latin small letter e with caron",
    },
    284: {
        shorthand: "&Gcirc;",
        name: "Latin capital letter g with circumflex",
    },
    285: {
        shorthand: "&gcirc;",
        name: "Latin small letter g with circumflex",
    },
    286: {
        shorthand: "&Gbreve;",
        name: "Latin capital letter g with breve",
    },
    287: {
        shorthand: "&gbreve;",
        name: "Latin small letter g with breve",
    },
    288: {
        shorthand: "&Gdot;",
        name: "Latin capital letter g with dot above",
    },
    289: {
        shorthand: "&gdot;",
        name: "Latin small letter g with dot above",
    },
    290: {
        shorthand: "&Gcedil;",
        name: "Latin capital letter g with cedilla",
    },
    291: {
        shorthand: "&gcedil;",
        name: "Latin small letter g with cedilla",
    },
    292: {
        shorthand: "&Hcirc;",
        name: "Latin capital letter h with circumflex",
    },
    293: {
        shorthand: "&hcirc;",
        name: "Latin small letter h with circumflex",
    },
    294: {
        shorthand: "&Hstrok;",
        name: "Latin capital letter h with stroke",
    },
    295: {
        shorthand: "&hstrok;",
        name: "Latin small letter h with stroke",
    },
    296: {
        shorthand: "&Itilde;",
        name: "Latin capital letter I with tilde",
    },
    297: {
        shorthand: "&itilde;",
        name: "Latin small letter I with tilde",
    },
    298: {
        shorthand: "&Imacr;",
        name: "Latin capital letter I with macron",
    },
    299: {
        shorthand: "&imacr;",
        name: "Latin small letter I with macron",
    },
    300: {
        shorthand: "&Ibreve;",
        name: "Latin capital letter I with breve",
    },
    301: {
        shorthand: "&ibreve;",
        name: "Latin small letter I with breve",
    },
    302: {
        shorthand: "&Iogon;",
        name: "Latin capital letter I with ogonek",
    },
    303: {
        shorthand: "&iogon;",
        name: "Latin small letter I with ogonek",
    },
    304: {
        shorthand: "&Idot;",
        name: "Latin capital letter I with dot above",
    },
    305: {
        shorthand: "&imath; &inodot;",
        name: "Latin small letter dotless I",
    },
    306: {
        shorthand: "&IJlig;",
        name: "Latin capital ligature ij",
    },
    307: {
        shorthand: "&ijlig;",
        name: "Latin small ligature ij",
    },
    308: {
        shorthand: "&Jcirc;",
        name: "Latin capital letter j with circumflex",
    },
    309: {
        shorthand: "&jcirc;",
        name: "Latin small letter j with circumflex",
    },
    310: {
        shorthand: "&Kcedil;",
        name: "Latin capital letter k with cedilla",
    },
    311: {
        shorthand: "&kcedil;",
        name: "Latin small letter k with cedilla",
    },
    312: {
        shorthand: "&kgreen;",
        name: "Latin small letter kra",
    },
    313: {
        shorthand: "&Lacute;",
        name: "Latin capital letter l with acute",
    },
    314: {
        shorthand: "&lacute;",
        name: "Latin small letter l with acute",
    },
    315: {
        shorthand: "&Lcedil;",
        name: "Latin capital letter l with cedilla",
    },
    316: {
        shorthand: "&lcedil;",
        name: "Latin small letter l with cedilla",
    },
    317: {
        shorthand: "&Lcaron;",
        name: "Latin capital letter l with caron",
    },
    318: {
        shorthand: "&lcaron;",
        name: "Latin small letter l with caron",
    },
    319: {
        shorthand: "&Lmidot;",
        name: "Latin capital letter l with middle dot",
    },
    320: {
        shorthand: "&lmidot;",
        name: "Latin small letter l with middle dot",
    },
    321: {
        shorthand: "&Lstrok;",
        name: "Latin capital letter l with stroke",
    },
    322: {
        shorthand: "&lstrok;",
        name: "Latin small letter l with stroke",
    },
    323: {
        shorthand: "&Nacute;",
        name: "Latin capital letter n with acute",
    },
    324: {
        shorthand: "&nacute;",
        name: "Latin small letter n with acute",
    },
    325: {
        shorthand: "&Ncedil;",
        name: "Latin capital letter n with cedilla",
    },
    326: {
        shorthand: "&ncedil;",
        name: "Latin small letter n with cedilla",
    },
    327: {
        shorthand: "&Ncaron;",
        name: "Latin capital letter n with caron",
    },
    328: {
        shorthand: "&ncaron;",
        name: "Latin small letter n with caron",
    },
    329: {
        shorthand: "&napos;",
        name: "Latin small letter n preceded by apostrophe",
    },
    330: {
        shorthand: "&ENG;",
        name: "Latin capital letter eng",
    },
    331: {
        shorthand: "&eng;",
        name: "Latin small letter eng",
    },
    332: {
        shorthand: "&Omacr;",
        name: "Latin capital letter o with macron",
    },
    333: {
        shorthand: "&omacr;",
        name: "Latin small letter o with macron",
    },
    334: {
        shorthand: "&Obreve;",
        name: "Latin capital letter o with breve",
    },
    335: {
        shorthand: "&obreve;",
        name: "Latin small letter o with breve",
    },
    336: {
        shorthand: "&Odblac;",
        name: "Latin capital letter o with double acute",
    },
    337: {
        shorthand: "&odblac;",
        name: "Latin small letter o with double acute",
    },
    338: {
        shorthand: "&OElig;",
        name: "Uppercase ligature OE",
    },
    339: {
        shorthand: "&oelig;",
        name: "Lowercase ligature OE",
    },
    340: {
        shorthand: "&Racute;",
        name: "Latin capital letter r with acute",
    },
    341: {
        shorthand: "&racute;",
        name: "Latin small letter r with acute",
    },
    342: {
        shorthand: "&Rcedil;",
        name: "Latin capital letter r with cedilla",
    },
    343: {
        shorthand: "&rcedil;",
        name: "Latin small letter r with cedilla",
    },
    344: {
        shorthand: "&Rcaron;",
        name: "Latin capital letter r with caron",
    },
    345: {
        shorthand: "&rcaron;",
        name: "Latin small letter r with caron",
    },
    346: {
        shorthand: "&Sacute;",
        name: "Latin capital letter s with acute",
    },
    347: {
        shorthand: "&sacute;",
        name: "Latin small letter s with acute",
    },
    348: {
        shorthand: "&Scirc;",
        name: "Latin capital letter s with circumflex",
    },
    349: {
        shorthand: "&scirc;",
        name: "Latin small letter s with circumflex",
    },
    350: {
        shorthand: "&Scedil;",
        name: "Latin capital letter s with cedilla",
    },
    351: {
        shorthand: "&scedil;",
        name: "Latin small letter s with cedilla",
    },
    352: {
        shorthand: "&Scaron;",
        name: "Uppercase S with caron",
    },
    353: {
        shorthand: "&scaron;",
        name: "Lowercase S with caron",
    },
    354: {
        shorthand: "&Tcedil;",
        name: "Latin capital letter t with cedilla",
    },
    355: {
        shorthand: "&tcedil;",
        name: "Latin small letter t with cedilla",
    },
    356: {
        shorthand: "&Tcaron;",
        name: "Latin capital letter t with caron",
    },
    357: {
        shorthand: "&tcaron;",
        name: "Latin small letter t with caron",
    },
    358: {
        shorthand: "&Tstrok;",
        name: "Latin capital letter t with stroke",
    },
    359: {
        shorthand: "&tstrok;",
        name: "Latin small letter t with stroke",
    },
    360: {
        shorthand: "&Utilde;",
        name: "Latin capital letter u with tilde",
    },
    361: {
        shorthand: "&utilde;",
        name: "Latin small letter u with tilde",
    },
    362: {
        shorthand: "&Umacr;",
        name: "Latin capital letter u with macron",
    },
    363: {
        shorthand: "&umacr;",
        name: "Latin small letter u with macron",
    },
    364: {
        shorthand: "&Ubreve;",
        name: "Latin capital letter u with breve",
    },
    365: {
        shorthand: "&ubreve;",
        name: "Latin small letter u with breve",
    },
    366: {
        shorthand: "&Uring;",
        name: "Latin capital letter u with ring above",
    },
    367: {
        shorthand: "&uring;",
        name: "Latin small letter u with ring above",
    },
    368: {
        shorthand: "&Udblac;",
        name: "Latin capital letter u with double acute",
    },
    369: {
        shorthand: "&udblac;",
        name: "Latin small letter u with double acute",
    },
    370: {
        shorthand: "&Uogon;",
        name: "Latin capital letter u with ogonek",
    },
    371: {
        shorthand: "&uogon;",
        name: "Latin small letter u with ogonek",
    },
    372: {
        shorthand: "&Wcirc;",
        name: "Latin capital letter w with circumflex",
    },
    373: {
        shorthand: "&wcirc;",
        name: "Latin small letter w with circumflex",
    },
    374: {
        shorthand: "&Ycirc;",
        name: "Latin capital letter y with circumflex",
    },
    375: {
        shorthand: "&ycirc;",
        name: "Latin small letter y with circumflex",
    },
    376: {
        shorthand: "&Yuml;",
        name: "Capital Y with diaeres",
    },
    402: {
        shorthand: "&fnof;",
        name: "Lowercase with hook",
    },
    710: {
        shorthand: "&circ;",
        name: "Circumflex accent",
    },
    732: {
        shorthand: "&tilde;",
        name: "Tilde",
    },
    913: {
        shorthand: "&Alpha;",
        name: "Alpha",
    },
    914: {
        shorthand: "&Beta;",
        name: "Beta",
    },
    915: {
        shorthand: "&Gamma;",
        name: "Gamma",
    },
    916: {
        shorthand: "&Delta;",
        name: "Delta",
    },
    917: {
        shorthand: "&Epsilon;",
        name: "Epsilon",
    },
    918: {
        shorthand: "&Zeta;",
        name: "Zeta",
    },
    919: {
        shorthand: "&Eta;",
        name: "Eta",
    },
    920: {
        shorthand: "&Theta;",
        name: "Theta",
    },
    921: {
        shorthand: "&Iota;",
        name: "Iota",
    },
    922: {
        shorthand: "&Kappa;",
        name: "Kappa",
    },
    923: {
        shorthand: "&Lambda;",
        name: "Lambda",
    },
    924: {
        shorthand: "&Mu;",
        name: "Mu",
    },
    925: {
        shorthand: "&Nu;",
        name: "Nu",
    },
    926: {
        shorthand: "&Xi;",
        name: "Xi",
    },
    927: {
        shorthand: "&Omicron;",
        name: "Omicron",
    },
    928: {
        shorthand: "&Pi;",
        name: "Pi",
    },
    929: {
        shorthand: "&Rho;",
        name: "Rho",
    },
    931: {
        shorthand: "&Sigma;",
        name: "Sigma",
    },
    932: {
        shorthand: "&Tau;",
        name: "Tau",
    },
    933: {
        shorthand: "&Upsilon;",
        name: "Upsilon",
    },
    934: {
        shorthand: "&Phi;",
        name: "Phi",
    },
    935: {
        shorthand: "&Chi;",
        name: "Chi",
    },
    936: {
        shorthand: "&Psi;",
        name: "Psi",
    },
    937: {
        shorthand: "&Omega;",
        name: "Omega",
    },
    945: {
        shorthand: "&alpha;",
        name: "alpha",
    },
    946: {
        shorthand: "&beta;",
        name: "beta",
    },
    947: {
        shorthand: "&gamma;",
        name: "gamma",
    },
    948: {
        shorthand: "&delta;",
        name: "delta",
    },
    949: {
        shorthand: "&epsilon;",
        name: "epsilon",
    },
    950: {
        shorthand: "&zeta;",
        name: "zeta",
    },
    951: {
        shorthand: "&eta;",
        name: "eta",
    },
    952: {
        shorthand: "&theta;",
        name: "theta",
    },
    953: {
        shorthand: "&iota;",
        name: "iota",
    },
    954: {
        shorthand: "&kappa;",
        name: "kappa",
    },
    955: {
        shorthand: "&lambda;",
        name: "lambda",
    },
    956: {
        shorthand: "&mu;",
        name: "mu",
    },
    957: {
        shorthand: "&nu;",
        name: "nu",
    },
    958: {
        shorthand: "&xi;",
        name: "xi",
    },
    959: {
        shorthand: "&omicron;",
        name: "omicron",
    },
    960: {
        shorthand: "&pi;",
        name: "pi",
    },
    961: {
        shorthand: "&rho;",
        name: "rho",
    },
    962: {
        shorthand: "&sigmaf;",
        name: "sigmaf",
    },
    963: {
        shorthand: "&sigma;",
        name: "sigma",
    },
    964: {
        shorthand: "&tau;",
        name: "tau",
    },
    965: {
        shorthand: "&upsilon;",
        name: "upsilon",
    },
    966: {
        shorthand: "&phi;",
        name: "phi",
    },
    967: {
        shorthand: "&chi;",
        name: "chi",
    },
    968: {
        shorthand: "&psi;",
        name: "psi",
    },
    969: {
        shorthand: "&omega;",
        name: "omega",
    },
    977: {
        shorthand: "&thetasym;",
        name: "Theta symbol",
    },
    978: {
        shorthand: "&upsih;",
        name: "Upsilon symbol",
    },
    982: {
        shorthand: "&piv;",
        name: "Pi symbol",
    },
    8194: {
        shorthand: "&ensp;",
        name: "En space",
    },
    8195: {
        shorthand: "&emsp;",
        name: "Em space",
    },
    8201: {
        shorthand: "&thinsp;",
        name: "Thin space",
    },
    8204: {
        shorthand: "&zwnj;",
        name: "Zero width non-joiner",
    },
    8205: {
        shorthand: "&zwj;",
        name: "Zero width joiner",
    },
    8206: {
        shorthand: "&lrm;",
        name: "Left-to-right mark",
    },
    8207: {
        shorthand: "&rlm;",
        name: "Right-to-left mark",
    },
    8211: {
        shorthand: "&ndash;",
        name: "En dash",
    },
    8212: {
        shorthand: "&mdash;",
        name: "Em dash",
    },
    8216: {
        shorthand: "&lsquo;",
        name: "Left single quotation mark",
    },
    8217: {
        shorthand: "&rsquo;",
        name: "Right single quotation mark",
    },
    8218: {
        shorthand: "&sbquo;",
        name: "Single low-9 quotation mark",
    },
    8220: {
        shorthand: "&ldquo;",
        name: "Left double quotation mark",
    },
    8221: {
        shorthand: "&rdquo;",
        name: "Right double quotation mark",
    },
    8222: {
        shorthand: "&bdquo;",
        name: "Double low-9 quotation mark",
    },
    8224: {
        shorthand: "&dagger;",
        name: "Dagger",
    },
    8225: {
        shorthand: "&Dagger;",
        name: "Double dagger",
    },
    8226: {
        shorthand: "&bull;",
        name: "Bullet",
    },
    8230: {
        shorthand: "&hellip;",
        name: "Horizontal ellipsis",
    },
    8240: {
        shorthand: "&permil;",
        name: "Per mille",
    },
    8242: {
        shorthand: "&prime;",
        name: "Minutes (Degrees)",
    },
    8243: {
        shorthand: "&Prime;",
        name: "Seconds (Degrees)",
    },
    8249: {
        shorthand: "&lsaquo;",
        name: "Single left angle quotation",
    },
    8250: {
        shorthand: "&rsaquo;",
        name: "Single right angle quotation",
    },
    8254: {
        shorthand: "&oline;",
        name: "Overline",
    },
    8364: {
        shorthand: "&euro;",
        name: "Euro",
    },
    8482: {
        shorthand: "&trade;",
        name: "Trademark",
    },
    8592: {
        shorthand: "&larr;",
        name: "Left arrow",
    },
    8593: {
        shorthand: "&uarr;",
        name: "Up arrow",
    },
    8594: {
        shorthand: "&rarr;",
        name: "Right arrow",
    },
    8595: {
        shorthand: "&darr;",
        name: "Down arrow",
    },
    8596: {
        shorthand: "&harr;",
        name: "Left right arrow",
    },
    8629: {
        shorthand: "&crarr;",
        name: "Carriage return arrow",
    },
    8704: {
        shorthand: "&forall;",
        name: "For all",
    },
    8706: {
        shorthand: "&part;",
        name: "Part",
    },
    8707: {
        shorthand: "&exist;",
        name: "Exist",
    },
    8709: {
        shorthand: "&empty;",
        name: "Empty",
    },
    8711: {
        shorthand: "&nabla;",
        name: "Nabla",
    },
    8712: {
        shorthand: "&isin;",
        name: "Is in",
    },
    8713: {
        shorthand: "&notin;",
        name: "Not in",
    },
    8715: {
        shorthand: "&ni;",
        name: "Ni",
    },
    8719: {
        shorthand: "&prod;",
        name: "Product",
    },
    8721: {
        shorthand: "&sum;",
        name: "Sum",
    },
    8722: {
        shorthand: "&minus;",
        name: "Minus",
    },
    8727: {
        shorthand: "&lowast;",
        name: "Asterisk (Lowast)",
    },
    8730: {
        shorthand: "&radic;",
        name: "Square root",
    },
    8733: {
        shorthand: "&prop;",
        name: "Proportional to",
    },
    8734: {
        shorthand: "&infin;",
        name: "Infinity",
    },
    8736: {
        shorthand: "&ang;",
        name: "Angle",
    },
    8743: {
        shorthand: "&and;",
        name: "And",
    },
    8744: {
        shorthand: "&or;",
        name: "Or",
    },
    8745: {
        shorthand: "&cap;",
        name: "Cap",
    },
    8746: {
        shorthand: "&cup;",
        name: "Cup",
    },
    8747: {
        shorthand: "&int;",
        name: "Integral",
    },
    8756: {
        shorthand: "&there4;",
        name: "Therefore",
    },
    8764: {
        shorthand: "&sim;",
        name: "Similar to",
    },
    8773: {
        shorthand: "&cong;",
        name: "Congurent to",
    },
    8776: {
        shorthand: "&asymp;",
        name: "Almost equal",
    },
    8800: {
        shorthand: "&ne;",
        name: "Not equal",
    },
    8801: {
        shorthand: "&equiv;",
        name: "Equivalent",
    },
    8804: {
        shorthand: "&le;",
        name: "Less or equal",
    },
    8805: {
        shorthand: "&ge;",
        name: "Greater or equal",
    },
    8834: {
        shorthand: "&sub;",
        name: "Subset of",
    },
    8835: {
        shorthand: "&sup;",
        name: "Superset of",
    },
    8836: {
        shorthand: "&nsub;",
        name: "Not subset of",
    },
    8838: {
        shorthand: "&sube;",
        name: "Subset or equal",
    },
    8839: {
        shorthand: "&supe;",
        name: "Superset or equal",
    },
    8853: {
        shorthand: "&oplus;",
        name: "Circled plus",
    },
    8855: {
        shorthand: "&otimes;",
        name: "Circled times",
    },
    8869: {
        shorthand: "&perp;",
        name: "Perpendicular",
    },
    8901: {
        shorthand: "&sdot;",
        name: "Dot operator",
    },
    8968: {
        shorthand: "&lceil;",
        name: "Left ceiling",
    },
    8969: {
        shorthand: "&rceil;",
        name: "Right ceiling",
    },
    8970: {
        shorthand: "&lfloor;",
        name: "Left floor",
    },
    8971: {
        shorthand: "&rfloor;",
        name: "Right floor",
    },
    9674: {
        shorthand: "&loz;",
        name: "Lozenge",
    },
    9824: {
        shorthand: "&spades;",
        name: "Spade",
    },
    9827: {
        shorthand: "&clubs;",
        name: "Club",
    },
    9829: {
        shorthand: "&hearts;",
        name: "Heart",
    },
    9830: {
        shorthand: "&diams;",
        name: "Diamond",
    },
}

const html_entity_shorthands = (() => {
    const o = {};
    for(let i in html_entities){
        const s = html_entities[i].shorthand;
        if(s){
            o[s] = Number(i);
        }
    }
    return o;
})();

/*
special (in RegExp)
    regex:
        [!$\^&()*+\-\.\/:<=?\[\\\]_{|}\t\n\v\f\r]
    list:
        [ !$^&()*+-./:<=?[\]_{|} ]
        \t, \n, \v, \f, \r
*/

/*
special (in HTML)
    list:
        [ !#&=\;'/"<> ]
    regex:
        [!#&=\\;'\/"<>]
*/

/*
ASCII characters
    char codes:
        9 - 13
        32 - 126
    regex:
        [\011-\015\040-\176]
    list:
        \t, \n, \v, \f, \r
        \s (space)
        [ !"#$%&'()*+,-./ ]
        [ 0123456789 ]
        [ :;<=>?@ ]
        [ ABCDEFGHIJKLMNOPQRSTUVWXYZ ]
        [ [\]^_` ]
        [ abcdefghijklmnopqrstuvwxyz ]
        [ {|}~ ]
*/

/*
special (generally)
    in order:
        [9 ----------- 13]
        \t, \n, \v, \f, \r
        
        [33 ----------- 47][58 --- 64][91 - 96][123--126]
        [ !"#$%&'()*+,-./ ][ :;<=>?@ ][ [\]^_`][  {|}~  ]
    escaped in order:
        [9 ----------- 13]
        \t, \n, \v, \f, \r
        
        [33 ------------------- 47][58 ------ 64][91 ----- 96][123 - 126]
        [ \!"#\$%&'\(\)\*\+,\-\.\/ ][ \:;\<=>\?@ ][ \[\\\]\^_`][ \{\|\}~ ]
    list:
        [ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ]
        \t, \n, \v, \f, \r
    regex:
        [\041-\057\072-\100\133-\140\173-\176]
*/

const special_chars = {
    general:
        /[\041-\057\072-\100\133-\140\173-\176]/g,
    regex:
        /[!$\^&()*+\-\.\/:<=?\[\\\]_{|}\t\n\v\f\r]/g,
    html:
        /[!#&=\\;'\/"<>]/g,
    ascii:
        /[\011-\015\040-\176]/g,
    non_ascii:
        /[^\011-\015\040-\176]/g,
    /** general + non_ascii */
    general_plus:
        /[^\011-\015\040-\176]|[\041-\057\072-\100\133-\140\173-\176]/g,
    /** regex + non_ascii */
    regex_plus:
        /[^\011-\015\040-\176]|[!$\^&()*+\-\.\/:<=?\[\\\]_{|}\t\n\v\f\r]/g,
    /** html + non_ascii */
    html_plus:
        /[^\011-\015\040-\176]|[!#&=\\;'\/"<>]/g,
};

const HTML = {
    /**
      * encodes text for usage in HTML
      * @param {string} decoded plain text string to encode to HTML-safe text
      * @returns {string}
    **/
    encode: function(decoded){
        if(typeof decoded !== "string"){
            throw new TypeError("encode only accepts a string as its input");
        }
        return decoded.replace(
            special_chars.html_plus,
            /** @param {string} sub @returns {string} */
            (sub) => {
                const i = sub.charCodeAt(0);
                return (
                    (html_entities[i]?.shorthand) ||
                    ("&#" + i + ";")
                );
            }
        );
    },
    /**
      * decodes text that has HTML escape sequences (i.e. HTML entities), giving a plain text version of the HTML-safe text
      * @param {string} encoded HTML-safe text that needs to be decoded
      * @returns {string}
    **/
    decode: function(encoded){
        if(typeof encoded !== "string"){
            throw new TypeError("decode only accepts a string as its input");
        }
        return encoded.replace(
            /&(?:#(\d+)|\w+);/g,
            /**
              * @param {string} sub
              * @param {string} d the digits of the HTML escape sequence, if it is numerical
              * @returns {string}
            **/
            (sub, d) => {
                // check if `sub` is a numerical entity
                if(sub[1] === "#"){
                    return String.fromCharCode(Number(d));
                }
                // get the entity with that name
                const i = html_entity_shorthands[sub];
                // check if the entity actually exists
                if(typeof i === "number"){
                    return String.fromCharCode(i);
                }
                // if the entity with that name does not exist, then just leave it unmodified
                return sub;
            }
        );
    },
};

const regex_maps = {
    encode: {
        "\t": "t",
        "\n": "n",
        "\v": "v",
        "\f": "f",
        "\r": "r",
    },
    decode: {
        "t": "\t",
        "n": "\n",
        "v": "\v",
        "f": "\f",
        "r": "\r",
    },
};

// this is the largest positive finite float value
// also equal to `2**1023*(((2**53)-1)/(2**52))`
// i wrote it this way so that it will always have the correct value; if written the other way, a compiler might try to optimize the algebra and end up getting the incorrect value; you can also pad this right operand with zeroes and replace the `1` with an `f` in order to get the correct value
const f64_MAX = 2**971 * 0x1fffffffffffff;
const P_2_52 = 2**52;
const P_2_52_m1_2 = 2**52 - 0.5;
const P_2_52_m1 = 2**52 - 1;

/**
  * returns `true` is `x` is a "nullish" value, according to the "nullish coalescing operator", which is `??`
  * - returns `false` for a non-nullish `x`, such as `[]`, `""`, `0`, `1`, or `false`
  * - `null` and `undefined` are the only values considered to be null, at least as of ECMAScript 2023
  * @param {any} x
  * @returns {boolean}
**/
const is_nullish = function(x){
    let a = false;
    x ?? (a = true);
    return a;
};

const hex = {
    decoder_map: {
        "0":  0, "1":  1, "2":  2, "3": 3,
        "4":  4, "5":  5, "6":  6,
        "7":  7, "8":  8, "9":  9,
        "a": 10, "b": 11, "c": 12,
        "d": 13, "e": 14, "f": 15,
        "A": 10, "B": 11, "C": 12,
        "D": 13, "E": 14, "F": 15,
    },
    encoder_map: {
        0x0: "0",
        0x1: "1",
        0x2: "2",
        0x3: "3",
        0x4: "4",
        0x5: "5",
        0x6: "6",
        0x7: "7",
        0x8: "8",
        0x9: "9",
        0xa: "a",
        0xb: "b",
        0xc: "c",
        0xd: "d",
        0xe: "e",
        0xf: "f",
    },
    
    /**
      * convert the whole part of to a hexadecimal integer
      * - this method is called `encode` because it encodes a `Number` (a 64-bit float under the IEEE-754 specification) to a string, written in hexadecimal format; the string will not be written with a decimal point, an "e+", or an "e-", so it will be quite long if the input value is large
      * - only works on integers
      * - returns the normal string form of the number if it is not finite;
      * - i.e. `NaN`, `Infinity`, and `-Infinity` just return `"NaN"`, `"Infinity"`, and `"-Infinity"`
      * - `"1.8e+10"` in hexadecimal has the value of `1.5 * 16**10`, not `1.5 * 16**16`, because the number after the `e+` is interpreted in base 10, not base 16
      * @param {number} value the number to convert
      * @returns {string} `encoded` --- the hexadecimal encoded string that represents the number
    **/
    encode_int: function(value){
        return Math.floor(value).toString(16);
    },
    /**
      * convert a number to hexadecimal
      * - this method is called `encode` because it encodes a `Number` (a 64-bit float) to a string, written in hexadecimal format, with a decimal point and an "e+" or "e-" if necessary
      * - `"1.8e+10"` in hexadecimal has the value of `1.5 * 16**10`, not `1.5 * 16**16`, because the number after the `e+` is interpreted in base 10, not base 16
      * - words on all numbers, and actually prints a more accurate result than `Number.toString` does
      * - returns `NaN` if the representation has any invalid characters
      * - i.e. `NaN`, `Infinity`, and `-Infinity` just return `"NaN"`, `"Infinity"`, and `"-Infinity"`
      * @param {number} value the number to convert
      * @param {number} sig_figs the number of significant figures to use in the return value; this includes values to the left and to the right of the decimal point, but does *not* include the digits after an `e+`
      * @param {number} padding_0s the maximum number of padding 0s that can be used to print a number with an abolute value less than 1, in order to avoid putting an `"e+"` in the number; the `0.` at the start of the number counts as 1 `0`; so `0.05` is considered to have 2 padding zeroes; `0.5` will be printed as `8.0e-1`
      * @returns {string} `encoded` --- the hexadecimal encoded string that represents the number
    **/
    encode: function(value, sig_figs, padding_0s){
        // standard argument formatting
        value = Number(value);
        // edge case for non-finite values, as explained in the JS Doc
        if(!isFinite(value)) return ("" + value);
        
        // special handling for negatives, since skipping the `-` sign makes the code simpler imo
        const is_negative = value < 0;
        // world's worst obfuscation tip: you can use `value *= ((value < 0) * 2) - 1` instead
        value = Math.abs(value);
        
        const auto_sigfigs = is_nullish(sig_figs);
        // more standard argument formatting
        sig_figs = Math.floor(Number(sig_figs));
        if(!isFinite(sig_figs)) sig_figs = f64_MAX;
        if(sig_figs < 1) sig_figs = 1;
        // more standard argument formatting
        padding_0s = Math.floor(Number(padding_0s));
        if(!isFinite(padding_0s)) padding_0s = 0;
        if(padding_0s < 0) padding_0s = 0;
        
        // `2**52` is the first integer than cannot have a fractional part
        // for example `P_2_52_m1_2.toString(16) == "10000000000000.8"`, which has a decimal point
        if(value >= P_2_52){
            /*
            - having no decimal point simplifies the work for me significantly
            - please note that sig_figs literally tells us how "precise" the output string is supposed to be
            - we do NOT care if the actual float is less or more accurate than that
            - this is just a conversion function, and its already specified in the JS Doc that this function only works for 64-bit floats under the IEEE-754 specification
            */
            let encoded = value.toString(16);
            const l = encoded.length;
            let d = l - sig_figs;
            if(auto_sigfigs) d = 0;
            if(d > 0){
                if(sig_figs == 1) encoded = encoded[1];
                // by the way: guy who dislikes wide lines of code,
                // write a compiler for esolang in Java
                // and then write a Java interpreter in that esolang
                // and when youre done, ill congratulate you,
                // but i will still write wide lines of code like this;
                // because we all have the freedom to do as we please :D
                // enjoy please, and have a nice day
                else encoded = encoded[1] + "." + encoded.slice(1, sig_figs);
                // guy who uses ternary statements, go have a chit-chat with Mr. loooong variable names and mister repetitively non-repetitive atomic code guy, because why not?
                encoded += "e+" + l;
            }
            /*
            - by the way: guy who dislikes `else`, no one likes your code
            - it's too hard to read
            - using else like this makes the code easier to read
            - i could agree with adding a clairifcation tho, like this:
            - add zeroes after the decimal point if the number is not long enough
            */
            if(d < 0){
                encoded += ".";
                // add `l` number of `"0"`s
                for(; d > 0; d--) encoded += "0";
            }
            if(is_negative) return "-" + encoded;
            return encoded;
        }
        let encoded = "";
        /*
        now, let's convert the value into a string, and offset it by a few bits, based on where the "decimal point" would go in hexadecimal
        
        if `l` was a multiple of 4, you could place the decimal point in the string representation of value as it currently is, and the string would be correct;
        
        however, if `l` was not a multiple of 4, then you would essentially have to place the decimal point in the middle of one of the hex digits of the string, forcing all of the values to the left and right to be multipled or divided by 2, 4, or 8; this means we have to carefully multiply split value, then convert it to 2 strings, and then combine them surgically
        */
        
        const e_plus = (value < 16**(-padding_0s));
        // normalize the value if it less than 0, so we can use scientific notation
        const l = Math.floor(Math.log2(value));
        const hexl = Math.floor(l / 4);
        if(e_plus) value *= 2**(-l);
        
        // this is the tricky part
        if(value < 1){
            // we know that we need to print a string matching the regular expression `/0\.0*/` on the left side of encoded, and then put the correct number of sig figs on the right of that
            // okay, actually, that's not super hard
            // step 1, get the first non-zero digit
            const f = Math.floor(value * 16**(-hexl));
            // step 2, get the rest of the 0 to 12 digits
            const r = Math.floor(value * 16**(12 - hexl));
            encoded = "0.";
            for(let i = -1; i > hexl; i--){
                encoded += "0";
            }
            encoded += f.toString(16);
            encoded += r.toString(16);
            if(auto_sigfigs){
                encoded = encoded.replace(/0+$/, "");
            }
            else{
                encoded = encoded.slice(
                    0,
                    sig_figs + 1
                );
            }
        }
        // if value >= 0, then it's fixed point representation does not start with `0.`, therefore we can just print the stuff on either side of the decimal point
        else{
            // whole is the part of value that must be printed on the left of the decimal point
            const whole = Math.floor(value);
            // and partial is the part to the right
            const partial = value - whole;
            const lp = Math.floor(Math.log2(partial));
            const bonus = Math.ceil((sig_figs - lp) / 4);
            
            encoded = whole.toString(16);
            let has_point = false;
            
            // add a "." if the whole and partial parts need separated
            if(
                // case 1: we need sig_figs after the decimal point
                (!auto_sigfigs && sig_figs > hexl) ||
                // case 2: we are automatically printing as many sig_figs as possible, and it happens to be the case that the partial part is not 0
                (auto_sigfigs && bonus > 0)
            ){
                has_point = true;
                encoded += "." + Math.floor(
                    partial * 16**bonus
                ).toString(16);
                if(auto_sigfigs){
                    encoded = encoded.replace(/0+$/, "");
                }
            }
            if(!auto_sigfigs){
                if(has_point) for(
                    let i = l + lp + hexl;
                    i < sig_figs;
                    i++
                ){
                    encoded += "0";
                }
                if(!has_point){
                    
                }
            }
        }
        
        // using `l.toString(16)` here would
        if(e_plus) encoded += ("e" + ("+-")[l < 0] + Math.abs(l));
        if(is_negative) return ("-" + encoded);
        return encoded;
    },
    /**
      * find the hexadecimal representation of a number and return it as a proper number
      * - this method is called `decode` because it decodes a string in hexadecimal format to a `Number` (a 64-bit float) in the IEEE-754 format for "double precision" floats
      * - only works on integers; returns `NaN` if the representation has any invalid characters
      * @param {string} encoded the hexadecimal representation of the number
      * @returns {number} `value` --- the decoded value of the number; i.e. a `Number`, which (in JavaScript) is always a 64-bit float
    **/
    decode_int: function(encoded){
        const is_negative = encoded[0] == "-";
        let value = 0;
        for(
            let i = (+is_negative);
            i < encoded.length; i++
        ){
            value *= 16;
            value += hex.decoder_map[encoded[i]];
        }
        if(is_negative) return -value;
        return value;
    },
};



const regex = {
    /**
      * encodes plain text so it matches itself exactly in RegExp
      * @param {string} decoded plain text string to encode to RegExp-safe text
      * @returns {string}
    **/
    encode: function(decoded){
        let encoded = decoded;
        // handle RegExp chars
        encoded = encoded.replace(
            /[!$\^&()*+\-\.\/:<=?\[\\\]_{|}]/g,
            "\\$&"
        );
        // handle tabs and newlines
        encoded = encoded.replace(
            /[\t\n\v\f\r]/g,
            (sub) => {
                return "\\" + regex_maps.encode[sub];
            }
        );
        // handle non-ascii characters
        encoded = encoded.replace(
            non_ascii,
            (sub) => {
                let i = sub.charCodeAt(0);
                // if sub can be represented with a utf-8 hex escape x{2 digits}
                if(i < 0x100){
                    return "\\x" + hex.encode(i + 0x100).slice(1);
                }
                // if sub must be represented with generic unicode u{5 or more digits}
                if(i > 0x10000){
                    return "\\u{" + hex.encode(i) + "}";
                }
                // sub can be represented with a utf-16 unicode escape x{2 digits}
                return "\\u" + hex.encode(i + 0x10000).slice(1);
            }
        );
        return encoded;
    },
    /**
      * decodes a regular expression, by replacing all escaped characters with their literal forms; this is only useful if the regular expression is written in a way that obviously matches exactly one string
      * - because regular expressions simply use backslashes, this function also decodes other backslash escaped text, such as the representation of strings in JavaScript code and many similar languages
      * - this does NOT support octal escapes, because they can be confused with group references; for example, `\1` could be the SOH character or it could match the result of group 1; `\0` will actually match NUL though, so it is supported
      * @param {string} encoded simple regular expression that needs to be decoded
      * @returns {string}
    **/
    decode: function(encoded){
        let decoded = encoded;
        // handle utf-8 hex escapes
        decoded = decoded.replace(
            /\\x([0-9a-fA-F]{2})/g,
            (sub, c) => {
                return String.fromCharCode(hex.decode(c));
            }
        );
        // handle general unicode escapes
        decoded = decoded.replace(
            /\\u\{([0-9a-fA-F]+)\}/g,
            (sub, c) => {
                return String.fromCharCode(hex.decode(c));
            }
        );
        // handle utf-16 unicode escapes
        decoded = decoded.replace(
            /\\u([0-9a-fA-F]{4})/g,
            (sub, c) => {
                return String.fromCharCode(hex.decode(c));
            }
        );
        // handle octal escape for NUL since it is not ambiguous
        decoded = decoded.replace(
            /\\0(00?)?/g,
            (sub, c) => {
                return String.fromCharCode(0);
            }
        );
        // handle newline / tab escapes AND backslash escapes
        decoded = decoded.replace(
            /\\([^u]))/g,
            (sub, c) => {
                return (
                    regex_maps.decode[c] ||
                    c
                );
            }
        );
        return decoded;
    },
};


const m = (`
$ 0 % 0 ^ 0 & 0 * 0 & 0 ^ 0 % 0 $
)( ~.^^.^^.~ ][ ~.**.**.~ }{

One regular expression to rule them all!

Just kidding! XD
[!$\\^&()*+\\-\\.\\/:<=?\\[\\\\\\]_{|}\\t\\n\\v\\f\\r]

console.log(m, r, (m === r ?"" :"not ") + "equal");

a +* b; **==**

This string should match itself exactly.
`);
const r = regex.decode(regex.encode(m));

console.log(m, r, (m === r ?"" :"not ") + "equal");

// alr yay it works



