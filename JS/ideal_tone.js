// first value of each tuple is the multiplier for the frequency;
// second value of each tuple is how harmonic that tone actually is;
// third value of each tuple is the logarithm of the frequency multiplier;
// this is 24 tone just intonation;
// this list might not actually be useful since I might use powers of 2^(1/24) as a fallback;
const tones = [
    [(25 / 24), .4],
    [(16 / 15), .6],
    [(11 / 10), .3],
    [( 9 /  8), .5],
    [( 7 /  6), .55],
    [( 6 /  5), .6],
    [(11 /  9), .3],
    [( 5 /  4), .7],
    [( 9 /  7), .55],
    [( 4 /  3), .8],
    [(11 /  8), .5],
    [( 7 /  5), .6],
    [(16 / 11), .4],
    [( 3 /  2), 1],
    [(14 /  9), .4],
    [( 8 /  5), .6],
    [( 5 /  3), .8],
    [(12 /  7), .55],
    [( 7 /  4), .7],
    [( 9 /  5), .6],
    [(35 / 19), .2],
    [(15 /  8), .4],
    [(31 / 16), .4],
    [(2), 1],
];
tones.forEach(v => v[2] = Math.log(v[0]));

// expanded list of tones with more frequencies; I'm missing a lot;
// this also should include the powers of 2^(1/24);
const tones_e = [
    [(25 / 24), .4],
    [(16 / 15), .6],
    [(11 / 10), .3],
    [( 9 /  8), .5],
    [( 7 /  6), .55],
    [( 6 /  5), .6],
    [(11 /  9), .3],
    [( 5 /  4), .7],
    [( 9 /  7), .55],
    [( 4 /  3), .8],
    [(11 /  8), .5],
    [( 7 /  5), .6],
    [(16 / 11), .4],
    [( 3 /  2), 1],
    [(14 /  9), .4],
    [( 8 /  5), .6],
    [( 5 /  3), .8],
    [(12 /  7), .55],
    [( 7 /  4), .7],
    [( 9 /  5), .6],
    [(35 / 19), .2],
    [(15 /  8), .4],
    [(31 / 16), .4],
    [(2), 1],
    [2**( 1/24), 0],
    [2**( 2/24), 0],
    [2**( 3/24), 0],
    [2**( 4/24), 0],
    [2**( 5/24), 0],
    [2**( 6/24), 0],
    [2**( 7/24), 0],
    [2**( 8/24), 0],
    [2**( 9/24), 0],
    [2**(10/24), 0],
    [2**(11/24), 0],
    [2**(12/24), 0],
    [2**(13/24), 0],
    [2**(14/24), 0],
    [2**(15/24), 0],
    [2**(16/24), 0],
    [2**(17/24), 0],
    [2**(18/24), 0],
    [2**(19/24), 0],
    [2**(20/24), 0],
    [2**(21/24), 0],
    [2**(22/24), 0],
    [2**(23/24), 0],
];
tones_e.forEach(v => (v[2] = Math.log(v[0]), v[3] = []));
tones_e.sort((a,b) => (a[0] - b[0]));

/** Just needs to return `true` for `null` and `undefined`. */
function isNull(value){
   return value === undefined || value === null;
}

/**
 * @param {Number} note_a index within `tones_e`; order does not matter;
 * @param {Number} note_b index within `tones_e`; order does not matter;
 * @returns {Number} nearest index within `tones` that has a multiplier equal to the multiplier between `note_a` and `note_b`;
 */
function nearest_mul(note_a, note_b){
    // guarantee that note_b is higher than note_a;
    if(note_a > note_b) return nearest_mul(note_b, note_a);
    // cache results;
    if(!isNull(tones_e[note_a][3][note_b])){
        return tones_e[note_a][3][note_b];
    }
    // we gotta check which way around the octave is faster, since octaves are basically circular mod Math.LN2;
    const diff = Math.min(
        Math.abs(tones_e[note_b][2] - tones_e[note_a][2]),
        Math.abs(Math.LN2 + tones_e[note_a][2] - tones_e[note_b][2])
    );
    let closest = 0;
    for(let i = 1; i < tones.length; i++){
        if(Math.abs(tones[i][2] - diff) < Math.abs(tones[closest][2] - diff)){
            closest = i;
        }
    }
    tones_e[note_a][3][note_b] = closest;
    return closest;
}

// just complete the cache;
for(let note_a = 0; note_a < tones_e.length; note_a++){
    for(let note_b = 0; note_b < tones_e.length; note_b++){
        nearest_mul(note_a, note_b);
    }
}



/**
 * Measure how good an effective C (or root tone) is for a list of notes.
 * @param {Number} effective_c index (within `tones_e`) of effective C;
 * @param {Number[]} notes list of note indices (within `tones_e`);
 * @returns {Number} a higher score is better;
 */
function how_good_effective_c_is(effective_c, notes){
    let score = 0;
    for(const note of notes){
        score += tones[nearest_mul(note, effective_c)][1];
    }
    return score / notes.length;
}

/**
 * Get the optimal effective C (or root tone) is for a list of notes.
 * @param {Number[]} notes list of note indices (within `tones_e`);
 * @returns {Number} index (within `tones_e`) of effective C;
 */
function effective_c(notes){
    let best = 0;
    let best_score = how_good_effective_c_is(best, notes);
    for(let i = 1; i < tones_e.length; i++){
        const score = how_good_effective_c_is(i, notes);
        if(score > best_score){
            best = i;
            best_score = score;
        }
    }
    return best;
}
