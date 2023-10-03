# The Relevance of Reformed Theology to Modern Sustainability
* An essay
* Authored by: Simon Willover
* Written for course: 23/FA CORE-100-12 - Community and Commitments
* Intructor: Sung Soo Lim, Ph. D.

# Prompt
In CORE 100, we have explored several significant ideas in Reformed theology: the doctrine of creation, the fall, **redemption**, and restoration. In an essay of three pages, analyze how Reformed theology shapes your understanding of [Sustainability or Global Regions & Culture]. Your analysis should use specific evidence and examples from our course readings.

## Sub Goals:
* Christian Perspective
* Core Commitments
* Level of Integration
* Quality of Writing

## TODO:
* explore how [Reformed theology] shapes the readers understanding of [Sustainability] and other modern issues. Also, use logic to deduce how the reader **should** understand [Reformed theology]. Justify this with descriptions on how the reader **could** use [Reformed theology] for the greater good and in pursuit of their own personal happiness.

### What does redemption mean in our lives?
Redemptions means:
  * refining and purifying our personality,
  * removing sinful thoughts, habits, and tendencies.

This happens through a learning process:
* find personal flaws, and correct them with self-discipline,
* learn from others by being open-minded,
  * if one does not do this, then one is bound to be controlled by one's sin,


# Essay Response
## TODO: add an actual quote from S.B.H.
Redemption is a concept that (according to N. T. Wright) is ecaping modern Christians. It is becoming more and more alien as people's mindsets drift further into sin.

> "If we are going to talk about what is wrong with the world, [then] we should be [willing] to [receive] those [same critiques,] [reflected back at ourselves]."
- **N.T. Wright** on what is wrong with the world.




## Weird Christian Thing?
justification => sanctification => glorification;
just => sanct => glor;


Simon Engine:
  Controller is lineame:
    input {[depth-view of history of outputs from self], [output from last module], [ID of last module]}
  [depth-view of history of outputs from self]:
    {... attention sorted}: [module ID outputs, input(s) given to module(s)]
  
  Modules:
    CPU:
      takes in [operator, operand.1, operand.2]
      binary operators:
        add, sub, mul, div, mod, pow, log_with_base, choose, hypot (sqrt(a^2 + b^2)),
        eq, neg, gt, lt, gte, lte,
        bitwise_or, bitwise_and, bitwise_xor,
        bitwise_left_shift
      unary operators:
        sqrt, sin, cos, tan, arcsin, arccos, arctan, exp, ln (a.k.a. log), log2, log10, gamma, floor, ceil, round
    
    Kerfuffle:
      input: {string to modify, shuffling-type, {boolean} direction: (true means unshuffle the string, false means shuffle the string)}
      * uses a tree lineame
      unshuffle various strings:
      * words, shuffled by letter,
      * sentences, shuffled by word,
      * sentences, shuffled by noun,
      * sentences, shuffled by verb,
      * sentences, shuffled by adjective & adverb,
      * sentences, shuffled by proposition & article & conjunction,
      * sentences, shuffled by 1st letter capitalization,
      * sentences, shuffled by grammar symbols (parens, ".", ",", "?", "!", "~", ":", ";", "/"),
      * essays, shuffled by sentence (separated by periods),
      * programs, shuffled by identifier,
      * programs, shuffled by operators,
      * programs, shuffled by sections between word-breaks,
      * brackets, shuffled by symbol ((), [], {}, <>)
        * the bracket strings are made by simply removing all non-brackets from general text
      * numerical sequences, shuffled by number
      * base64 encodings, shuffled by character
      * general text, shuffled by white-space
      * general text, shuffled by letter-map
    
    Flip:
      input: {main string, separator positions: [...]}
      Flip a string, putting the substrings in reverse order, order within substrings is preserved;
      substrings can be split based on separators, which are given as an input
      * uses a relative lineame to:
        * decide how to handle interpolation between integer separator positions
    
    Reformatter:
      input {string, format ID}
      reformats the string by changing its tokens
      uses a tree lineame and scans over the entire string
    
    Cleaner:
      input {string, memory}
      corrects the string, by cleaning the noise out of the stirng
      memory is the controller's memory
    
    // these 2 modules define a fragmented persistent memory
    Memorizer:
      input {memory, priority distribution}
      stores the memory in persistent storage for later use; uses highest priority values in the memory in order to index the memory and figure out how to arrange it persistent storage
    
    // this is essentially a google search, defined by earlier memory data
    // this only allows for general assosciations, so the Enging as a whole is responsible for finding smart ways to use this.
    Recaller:
      input {fragment wanted memory, boolean: Sarcasm}
      recalls the memory, by finding data with high priority values assosciated with the given fragment
      when sarcasm is true:
        recall data that is as contradictory as possible to the persistant memory.


