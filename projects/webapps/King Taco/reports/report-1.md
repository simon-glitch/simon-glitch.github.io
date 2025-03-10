
# Unimportant Stuff
Title: King Taco as a Card Game Web App

## Execution Plan
1. Preparation and program design
2. Coding
3. User interface design
    a. User interface implementation
4. Further game features
    a. And game rules / guidebook

## Design of the solution
1. Dataset and data types
I used `list[int]` and `int` throughout most of my code. I put some of my global constants in tuples, since they are **truly constant**.

2. The main challenges
The main challenge with this project is finding a way to procedurally represent the game's rules.

# Change of Plans
So, I was going to make an overly complicated type-based script for handling the game's logic. Then I realized that I was getting ahead of myself. My problem was that I couldn't see the big picture of what my code would look like and how the classes would interact with each other. So, I cut back on the code and went with a simpler design. Now, I **can see** the greater picture of my code's general structure.

# The Code
The code uses `int`s to represent everything. I am using `int`s in order to force myself from trying to add in overly complicated and abstract methods (my idea here is that I can't abstract `int`s and I can't overcomplicate them). So, I am basically tricking myself into writing code that I can handle. The `int`s in my code are just indices. Every card is represented by an absolute index that points to it. There are actual card objects, but the card data is stored in separate arrays (which are global constants), and the card logic is handled in separate methods (which are global methods). I wanted to avoid OOP here, because OOP causes me to trip on abstractions. OOP is great for programming, but it only makes sense when I can see the overall structure of the program. I can't write a class without knowing exactly what the program containing the class must be structured like.

# Prototypal Nature of This Project
The card game I want to make isn't finalized, and won't be for a long time. I have always wanted to make a card game, but I have never properly done so. Also, games can almost always be improved or modified for a different audience. So, the card game (as itself, conceptually) is definitely just a prototype. With that in mind, my true goal with this project is to make a useful library for making card games, and to display it in an acceptable web demo. Library -> Demo -> Prototype. This is a very common design pattern with many projects, so I am using it. It is also very professional.

# Happy Outcomes
I do have many small happy outcomes with this project. I am happy that I can play uno in a simulated environment. I also like some of the small details I added in.

# The UI
So, I finally got my game working in Python. The `new.md` file is fairly self explanatory of everything that is going on within it. My only comment on the programming process is that I had to pass a lot of global variables around. At least the code is easy to extend.

Now, I need to add a UI to my game. I already have a basic idea for what the cards should look like:
* https://codepen.io/simon-will-over/pen/dyaJRmM?editors=0011
* I am thinking of creating popups with tippy that can be toggled on / off during card selection. I will also need a togglable menu for displaying the game variables to the user. And I will probably want a cool display box the draw and discard piles.
* I think discarding would best be done with a big discard button on the right
* and of course, if the player needs to draw cards, they should draw them all at once

I could connect the Python script to the HTML with some async nonsense. I love how both JavaScript and Python allow this.
* In JavaScript we have:
```js
const p = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

async function main_1() {
  const result = await p;
  console.log('User clicked the page (1)!');
}
async function main_2() {
  const result = await p;
  console.log('User clicked the page (2)!');
}

main_1();
main_2();
```

* In Python we have `Coroutine`s, and you can use `.send()` to do some magic there.

# File
`new.py`'s code:

```py
"""
(c) Uno Upon A Time, by Simon Willover
"""

import random
from types import GeneratorType

# used for type hinting
class _SupportsAdd:
    """Any data type that has a `.__add__` method on it."""

player_count = 2
starting_hand_size = 7
color_count  = 4
colors: tuple[str] = (
    "pink","yellow","green",
    "teal","cyan","purple",
)
wild_name = "wild"
numbers_to_use = 10
"""
TODO: add cards:
  * go fish
  * alter the future
  * card trade
  * lock (
    set number and color of the discard for one round;
    wilds can be player but will not choose a new color
  )
  * shield (protect oneself from targeted effects, like `+= 2`)
  * calm (locks and wilds can't be played)
"""
specials: tuple[str] = (
    "inverse", "+= 2",
    "all ++", "skip",
)
color_special_count: tuple[int] = (1, 1, 1, 1)
wild_count = 8
wild_special_count: tuple[int] = (1, 1, 1, 1)
cards_per_color = numbers_to_use + sum(color_special_count)
card_count = cards_per_color * color_count + wild_count

# enums for card types (types determine functionality, outside of being wild)
class _TYPES:
    INV  = specials[0]
    P2   = specials[1]
    AP1  = specials[2]
    SKIP = specials[3]

# enums for card colors
class _COLORS:
    PINK   = colors[0]
    YELLOW = colors[1]
    CYAN   = colors[2]
    GREEN  = colors[3]
    WILD   = wild_name # index: color_count

# Global Vars for our game:
class _GAME_VARS:
    # whose turn is it?
    current_player = 0
    # 1 = forwards, -1 = backwards
    direction_of_play = 1
    # False = match (color | symbol) | WILD, True = !match (color | symbol)
    invert_playability = False
    # whether the current effect stack can be stacked upon futher
    can_stack = True
    # last effect_stack contributor (UNUSED)
    last_contributor = 0
    # chosen color for the last played WILD
    chosen_color = 0
    
    # hands are sets of ints, for simplicity
    #   these could be any ordered list[int]
    #   there will never be dupes, so set is really just tacked on here for semantic reasons
    hands:   tuple[list[int]] = tuple([] for i in range(player_count))
    deck:    list[int] = list()
    discard: list[int] = list()
    # how many moves each player has to wait until they can play again
    timeouts: list[int] = [0] * player_count
    # how many cards each player has to draw on the start of their turn; if to_draw is > 0, then the player can not play any cards
    to_draws: list[int] = [0] * player_count
    
    # what timeouts and to_draws will change by if the current effect is not stacked further
    eff_timeouts: list[int] = [0] * player_count
    eff_to_draws: list[int] = [0] * player_count
    
    all_piles: tuple[list[int]] = (*hands, deck, discard)
    
    # convenience functions, I guess?
    draw_index = player_count + 0
    disc_index = player_count + 1

TYPES = _TYPES()
COLORS = _COLORS()
GAME_VARS = _GAME_VARS()


# nearly empty class; could be any kind of object
# the only reason this class has methods is to make it look pretty in print statements
class Card:
    id = -1
    def __str__(self): return f"Card #_{self.id}"
    def __repr__(self) -> str: return str(self)
    def __init__(self, id): self.id = id

# PURE FUNCTION
def tally(iterable: _SupportsAdd, c_type: type = None) -> _SupportsAdd:
    """
    * When used on numbers:
          * sums them
    * When used on a sequence:
          * Combine nested sequences into a flattened sequences;
                * works similarly to JavaScript's `Array.flat()`
                * only checks 1 nesting layer deep!
    """
    first = None
    
    is_gen = isinstance(iterable, GeneratorType)
    # generators are a bit janky!
    if(is_gen):
        first = iterable.send(None)
    else:
        first = iterable[0]
    
    c_type = c_type or type(first)
    sofar = c_type(first)
    
    skip_first = not is_gen
    for i in iterable:
        if(skip_first):
            skip_first = False
            continue
        sofar += i
    return sofar


# this is immutable
cards = tuple([Card(i) for i in range(card_count)])
"""
cards are listed in this FIXED order:
* sorted by color:
      * pinks,
      * yellows,
      * cyans,
      * greens,
      * wilds;
* then sorted by function:
      * numbers 1 through 10 (or `numbers_to_use`), in ascending order
      * inverse (aka 11)
      * += 2    (aka 12)
      * all ++  (aka 13)
      * skip    (aka 14)
\~\~\~
* symbol of 0 represents a card with no symbol (i.e. a WILD)
* `symbol_name` (for specials) `= specials[symbol - numbers_to_use]`
"""

card_ids = [card.id for card in cards]

# spelling this in British `colours` makes it have the same length as symbols, which I like
# buuut I will avoid doing that XD
colors_d: tuple[int] = tuple([
    i // cards_per_color for i in range(color_count * cards_per_color)
] + [color_count] * wild_count)

symbols_d: tuple[str] = tuple(tally([
    [str(i + 1) for i in range(numbers_to_use)] +
    tally([
        ([specials[i]] * c) for (i, c) in enumerate(color_special_count)
    ])
] * color_count) + [
    "..." # or 0?
] * (wild_count - tally(wild_special_count)) + tally([
    ([specials[i]] * w) for (i, w) in enumerate(wild_special_count)
])
)

# print("cards:", list(zip(colors_d, symbols_d)))

# this determines where cards are
where_cards: list[int] = [0] * card_count

max_color_len = max(len(c) for c in colors)
# PURE FUNCTION
def card_string(card: int):
    """
    Get the string representing the card.
    
    Parameter:
    ----------
    `card: int =` the index of the card;
    
    Returns:
    --------
    `repr: str =` the string representing the card;
    """
    
    color = colors_d[card]
    symbol_str = symbols_d[card]
    color_str = colors[color] if (color < color_count) else wild_name
    
    return (
        color_str + ((
            (max_color_len - len(color_str)) * " " + "| "
        ) if symbol_str else "") +
        symbol_str
    )

# event loop componentss
def initialize():
    """
    Initialize the card piles according to the current values in `where_cards`.
    """
    
    for p in GAME_VARS.all_piles:
        while(len(p) > 0):
            p.pop()
    
    i = 0
    l = len(where_cards)
    while(i < l):
        v = where_cards[i]
        c = cards[i].id
        GAME_VARS.all_piles[v].append(c)
        i += 1

def move(card_i: int, to_i: int, from_i: int = None):
    """
    move card at card index `card_i` from pile of index `from_i` to pile of another index `to_i`
    
    `from_i` can be omitted; in which case, this function will just find where the card currently is and use that as the from-index.
    
    returns the card index you gave it
    """
    
    old_from_i = where_cards[card_i]
    
    # convenient bug-proofing!
    if(from_i != None):
        if(old_from_i != from_i):
            raise IndexError(f"expected card @ index: {card_i} to be located in pile # {from_i}, but found that it was actually in pile # {old_from_i}")
    
    # effectively move the card
    piles = GAME_VARS.all_piles
    piles[old_from_i].remove(card_i)
    piles[to_i].append(card_i)
    where_cards[card_i] = to_i
    
    return card_i

# PURE FUNCTION
def report():
    """Print the currrent game state."""
    print(f"Game State:\n\
    hands:   {GAME_VARS.hands}\n\
    discard: {GAME_VARS.discard}\n\
    cards:   {cards}\n\
    all_piles:   {GAME_VARS.all_piles}\n\
    where_cards: {where_cards}\n\
~~~~")

# event_track is not needed here?
event_track: list[list] = []
effect_stack: list[int] = []

# PURE FUNCTION
def next_player(player_i: int):
    """
    Whose next?
    
    `player_i`: index of a given player
    
    Returns index of the next player
    """
    return (player_i + GAME_VARS.direction_of_play) % player_count

# PURE FUNCTION
def can_play(card_i: int) -> bool:
    """
    Check whether the card with index {card_i} can be played.
    """
    if(len(GAME_VARS.discard) == 0):
        # should I just return True instead? I don't think so, since inverted playability only lasts one turn
        return (not GAME_VARS.invert_playability)
    
    # I am not a fan of Python's negative index funny business
    prev_i = GAME_VARS.discard[len(GAME_VARS.discard) - 1]
    
    color = colors_d[prev_i]
    # handle matching above a WILD with chosen color
    color = GAME_VARS.chosen_color if (color == color_count) else color
    
    matches = (
        ( colors_d[card_i] == color_count) or
        ( colors_d[card_i] == color) or
        (symbols_d[card_i] == symbols_d[prev_i])
    )
    
    # caret ^ is boolean XOR
    return GAME_VARS.invert_playability ^ matches

# PURE FUNCTION
def run_effect(initial_player: int):
    """
    Run the effect specified by the current effect stack,
    on the given effect recipient.
    
    `initial_player` (`recipient`) is the index of the player who started the effect chain.
    
    Returns:
    --------
    \```
    res: tuple = (
        recipient: int,
        can_respond: bool,
        to_draws: tuple[int],
        d_timeouts: tuple[int],
    )
    \```
    
    * `recipient`: the index of the player who is the "recipient"
    * `can_respond`: whether the recipient is allowed to respond
    * `to_draws`: how many cards each player needs to draw
    * `d_timeouts`: the change in each player's timeout
    """
    
    def reverse():
        GAME_VARS.direction_of_play *= -1
        GAME_VARS.invert_playability = True
    
    # `to_draw`: the number of cards that the recipient needs to draw
    to_draw = 0
    # `all_to_draw`: the number of cards that the everyone other than the recipient needs to draw
    all_to_draw = 0
    # how many times to skip the recipient
    #   (i.e. how many turns of timeout the recipient will receive)
    skips = 0
    # current player
    current = initial_player
    can_respond = True
    to_draws = [0] * player_count
    d_timeouts = [0] * player_count
    
    if(len(effect_stack) == 0):
        # print("no effects???")
        return (current, can_respond, to_draws, d_timeouts)
    
    type = symbols_d[effect_stack[0]]
    rest = effect_stack[1:]
    
    # I have never found myself needing to add so many comments just to preserve my own sanity!~
    
    # inverse does almost nothing
    if(type == TYPES.INV):
        # was if(player_count > 2): reverse();
        reverse()
        can_respond = False
    if(type == TYPES.P2):
        to_draw = 2
        for t in rest:
            current = next_player(current)
            
            if(symbols_d[t] == TYPES.INV):
                d_timeouts[current] += 1
                reverse()
            if(symbols_d[t] == TYPES.P2):
                to_draw += 2
            if(symbols_d[t] == TYPES.AP1):
                to_draw += player_count
                all_to_draw += 1
            if(symbols_d[t] == TYPES.SKIP): pass
    if(type == TYPES.AP1):
        all_to_draw += 1
        to_draw += 1
        inverted = False
        for t in rest:
            current = next_player(current)
            
            if(symbols_d[t] == TYPES.INV):
                inverted = not inverted
                reverse()
                # logic for this is handled after the for loop, in order to avoid math errors
                continue
            # bc we set can_respond = False when inverted = True, this line of code should never run;
            if(inverted):
                raise ValueError(f"Can not respond to to inverse(All++) with `{card_string(t)}`")
            if(symbols_d[t] == TYPES.P2):
                # very STRONG!!!
                all_to_draw += 2
                to_draw += 2
            if(symbols_d[t] == TYPES.AP1):
                all_to_draw += 1
                to_draw += 1
            if(symbols_d[t] == TYPES.SKIP):
                # haha! I don't have to draw nothing!
                for i in range(player_count):
                    # 5 levels of indentation!
                    d_timeouts[i] += all_to_draw
                # stop the All++ shenanigans
                can_respond = False
        # handle inverted shenanigans
        if(inverted):
            can_respond = False
            to_draw = all_to_draw * player_count
            all_to_draw = 0
    if(type == TYPES.SKIP):
        skips = 1
        for t in rest:
            current = next_player(current)
            
            if(symbols_d[t] == TYPES.INV):
                reverse()
            if(symbols_d[t] == TYPES.P2):
                to_draws[current] += 2
                skips += 2
            if(symbols_d[t] == TYPES.AP1):
                for i in range(player_count):
                    d_timeouts[i] += skips
                    can_respond = False
                skips = 0
            if(symbols_d[t] == TYPES.SKIP): pass
    
    # the recipient is the person at the end of the effect stack
    recipient = next_player(current)
    
    # implement all draw
    for i in range(player_count): to_draws[i] += all_to_draw
    # implement recipient draw
    to_draws[recipient] += to_draw - all_to_draw
    # implement recipient skip
    d_timeouts[recipient] += skips
    
    return (recipient, can_respond, to_draws, d_timeouts)

# PURE FUNCTION
def hand_string(name, hand, playable):
    return (
        name +
        " hand:" +
        "".join([(
            "\n  " +
            str(index) +
            " " +
            ("P" if playable[index] else "-") +
            ": " +
            card_string(card)
        ) for (index, card) in enumerate(hand)])
    )


compatability_matrix = {
    # inv -> inv is not really a combo :P
    TYPES.INV:  [],
    TYPES.P2:   [TYPES.INV, TYPES.P2, TYPES.AP1, TYPES.SKIP],
    TYPES.AP1:  [TYPES.INV, TYPES.P2, TYPES.AP1, TYPES.SKIP],
    TYPES.SKIP: [TYPES.INV, TYPES.P2, TYPES.AP1, TYPES.SKIP],
}
"""
## Inverse
(`INV` | `inverse`)

Playing an `inverse` on its own will:
    * reverse the direction of play.
    * invert the playability condition for the next player (i.e. the next player can only play a non-matching card and may not play a WILD).

Stacking:
    * stacking another `inverse` on top of it will:
        * set the direction of play back to normal.
        * set the playability condition back to normal (i.e. any card of matching symbol or color can be played, and a WILD can be played).

## += 2
(`P2` | `+= 2`)

Playing a `+= 2` will require the next player to draw 2 card on their next turn. This also prevents the next player from playing a card.

A card can still be stacked on the `+= 2` in response though:
    * stacking an `inverse` will:
        * reverse the direction of play
        * make the next player (under the now reversed-direction of play) the recipient
        * time out {the player who played the stacked card} (i.e. a `self-skip`), for one turn, as well
    * stacking another `+= 2` will:
        * make the next player the recipient
        * increase the number of cards to be drawn by the recipient by 2
    * stacking a `skip` will:
        * make the next player (after {the player who played the stacked card}) the recipient
        * time out the player who plays the stacked card (i.e. a `self-skip`), for one turn, as well
    * stacking an `all ++` will:
        * make the next player the recipient
        * increase the number of cards to be drawn by the recipient by the number of players
        * force all players other than the recipient to draw 1 card (per `all ++` card in the effect stack) when the recipient draws their card

## All ++
(`AP1` | `all ++`)

On its own, when `All ++` is played:
    * everyone is the recipient of the effect.
    * the effect is that each recipient must draw 1 (additional) card.
    * timeout {the player who played the stacked card} by {1 turn for every card drawn by the next player}

Stacking:
    * stacking an `inverse` on `all++` will:
        * reverse the direction of play
        * make the next player (under the now reversed-direction of play) the sole recipient
        * multiply the number of cards to be drawn by {the number of players}
        * that way the next player has to draw all of the cards that everyone else would have drawn **combined!**
    * stacking a `+= 2` on `all ++` will:
        * increase the numbers of cards to be drawn by 2.
    * stacking a `all ++` on `all ++` will:
        * increase the numbers of cards to be drawn by 1.
    * stacking a `skip` on `all ++` will:
        * cause all players to be skipped one time per card that they had to draw
        * make it so that none of the players have to draw (additional) cards.
        Stacking another `all ++` after this will start a new effect chain with just the new `all ++`.

## Skip
(`SKIP` | `skip`)

On it's own, skip causes the next player to get a time out for 1 turn.

The next player can respond to the `skip` before this effect is applied:
    * stacking another `skip` will:
        * set the recipient to be the next player after {the player who played the stacked card}
    * stacking a `+= 2` will:
        * set the recipient to be the next player after {the player who played the stacked card}
        * increase the length of the timeout by 2
        * force the player who played the stack card to draw 2 cards
    * stacking an `all ++` will:
        * cause everyone except {the player who played the stacked card} to receive one turn of timeout for each turn of timeout that {the player who played the stacked card} would have received otherwise.
    * stacking an `inverse`:
        * reverse the direction of play
        * set the recipient to be the next player after {the player who played the stacked card}

"""

# PURE FUNCTION
def can_stack(card: int):
    if(not GAME_VARS.can_stack): return False
    if(len(effect_stack) == 0): return False
    base = symbols_d[effect_stack[0]]
    return (
        symbols_d[card] in
        compatability_matrix[base]
    )

def draw_card(where_to: int):
    """
    (Mutates the cards in the draw pile.)
    (also mutates the pile at where_to.)
    
    Draw a random card from the draw pile. If the draw pile is empty, this will try use the discard, by: flipping the dicard, shuffling the discard, and making the discard become the draw pile.
    
    Parameters
    ----------
    Index of the pile to send this card to after drawing it. We can't just let it hang in empty space, you know!~ This method will automatically call `move(...)` in order to send the drawn card to the pile at `where_to`. This
    
    Returns
    -------
    `card: int =` The index of the drawn card
    """
    
    draw = GAME_VARS.deck
    disc = GAME_VARS.discard
    
    if(len(draw) == 0):
        if(len(disc) == 0):
            return -1
        # move indices
        while(len(disc) > 0):
            d = disc[0]
            move(d, GAME_VARS.draw_index, GAME_VARS.disc_index)
        # shuffle the pile too, ofc!
        random.shuffle(draw)
    
    return move(draw[0], where_to, GAME_VARS.draw_index)
def discard_card(card: int):
    """
    (Mutates the discard.)
    (Mutates the pile or hand containing the card.)
    Discard the given card.
    
    Returns
    -------
    Returns the given card index.
    """
    where_from = where_cards[card]
    print("dicarded: " + card_string(card))
    return move(card, GAME_VARS.disc_index, where_from)

def draw_cards(player: int, amount: int):
    """
    Make the given player draw a number of cards.
    
    Returns
    -------
    Whether or not the player was able to draw that many cards.
    """
    
    drawn = amount
    for i in range(amount):
        # `player` is actually the index of the player's hand
        card = draw_card(player)
        if(card < 0):
            # python let's us access for-loop variables, bc they are put on the same level as the `for` statement; JavaScript doesn't let you do this, since it puts for-loop variables inside the for-loop's private scope; I prefer doing this in the JavaScript-compatible way, b.c. it's more intuitive to me.
            drawn = i
            break
    
    not_drawn = amount - drawn
    if(not_drawn > 0):
        print(f"Couldn't draw {not_drawn} out of {amount} cards!")
        return False
    return True
def turn_play() -> int:
    # constants
    current  = GAME_VARS.current_player
    to_draws = GAME_VARS.to_draws
    timeouts = GAME_VARS.timeouts
    eff_to_draws = GAME_VARS.eff_to_draws
    eff_timeouts = GAME_VARS.eff_timeouts
    hand = GAME_VARS.hands[current]
    # generated vars
    playable = [can_play(card) for card in hand]
    playable_c: int = tally(int(p) for p in playable)
    stackable = [can_stack(card) for card in hand]
    stackable_c: int = tally(int(p) for p in stackable)
    under_effect = (
        eff_to_draws[current] or
        eff_timeouts[current]
    )
    effect_string = ""
    
    print(f"You are player # {current}.")
    # if the player can't stack any of their cards and they are under an effect, then they must accept the effect
    if(
        stackable_c == 0
        and under_effect):
        for i in range(player_count):
            timeouts[i] += eff_timeouts[i]
            to_draws[i] += eff_to_draws[i]
            eff_timeouts[i] = 0
            eff_to_draws[i] = 0
    def accept_effect():
        if(timeouts[current] > 0):
            print("You are currently in timeout.")
            timeouts[current] -= 1
            print(f"{timeouts[current]} turns of timeout remaining ...")
            return -1
        if(to_draws[current] > 0):
            print(f"You are forced to draw {to_draws[current]} cards.")
            draw_cards(current, to_draws[current])
            # this is technically a local copy
            playable = [can_play(card) for card in hand]
            # playable_c: int = tally(int(p) for p in playable)
            to_draws[current] = 0
            print("You don't get to play this turn (sorry)!")
            print(hand_string("Your", hand, playable))
            return -1
        return None
    # try to instantly
    to_play = accept_effect()
    if(to_play != None):
        # weird return ascension handling
        return to_play
    
    playable = [can_play(card) for card in hand]
    playable_c: int = tally(int(p) for p in playable)
    
    if(under_effect):
        print("You need to play a stackable card.")
        draw = (
            ("to draw " + str(eff_to_draws[current]) + " card" + (
                ""
                if (eff_to_draws[current] == 1)
                else "s"
            ))
            if (eff_to_draws[current] > 0)
            else ""
        )
        timeout = (
            ("to wait in timeout for " + str(eff_timeouts[current]) + " turn" + (
                ""
                if (eff_timeouts[current] == 1)
                else "s"
            ))
            if (eff_timeouts[current] > 0)
            else ""
        )
        sand = (
            ", and "
            if (
                eff_to_draws[current] > 0 and
                eff_timeouts[current] > 0
            )
            else ""
        )
        effect_string = draw + sand + timeout
        print("* Or you will be forced " + effect_string + ".")
        playable   = stackable
        playable_c = stackable_c
    # this else statement is way too big
    else:
        # draw a card if you can't play
        if(playable_c == 0):
            print("You don't have any playable cards; you are forced to draw.")
            card = draw_card(current)
            if(card == -1):
                print("You couldn't draw a card! turn passed!")
                return
            print("You drew a card: ", card_string(card))
        
        playable = [can_play(card) for card in hand]
        playable_c: int = tally(int(p) for p in playable)
        if(playable_c == 0):
            print("Sorry! You still can't play anything with your new card!")
            return -1
        if(playable_c == 1):
            card = hand[playable.index(True)]
            print("auto playing card: " + card_string(card))
            return card
        
    
    # our UI
    print("top discard:\n  " + card_string(
        GAME_VARS.discard[len(GAME_VARS.discard) - 1])
    )
    
    # if we aren't timed out, and we didn't have to draw cards, then we can try to play cards
    print(hand_string("Your", hand, playable))
    if(under_effect):
        print("  " + str(len(hand)) + ": " + effect_string)
    
    # index of chosen card, if a card needs to be selected by the user for playing
    to_play = -1
    max_index = len(hand) - 1

    
    # player input, finally
    while True:
        s = input("Which card would you like to play?\n# ")
        if(not s):
            print("Hey! I can't just assume which card you are going to play. Type in a integer on the next prompt. I will play the card labeled with that number (according to the table of your hand above).")
            continue
        try:
            to_play = int(s)
            if(to_play < 0 or to_play > max_index):
                if(under_effect and to_play == max_index + 1):
                    accept_effect()
                    break
                print(f"Your card index ({to_play}) is outside of the valid range of indices: [{0} to {max_index + under_effect}] (inclusive)")
                continue
            if(playable[to_play]):
                # convert to usable card id
                to_play = hand[to_play]
                break
            # not playable?
            print(f"{card_string(hand[to_play])} at index {to_play} is not playable on the current top discard!")
        except ValueError as e:
            print(e)
    
    return to_play
def play(card: int):
    """
    Play a card chosen by the current player. Make sure the card is under the player's control!
    
    Returns
    -------
    the next player, even though you probably don't need the return value.
    """
    current = GAME_VARS.current_player
    discard_card(card)
    if(symbols_d[card] in specials):
        res = run_effect(current)
        # print("effect:", res)
        GAME_VARS.can_stack = res[1]
        if(len(effect_stack) == 0 or can_stack(card)):
            # print("adding to effect stack")
            effect_stack.append(card)
    if(len(effect_stack) > 0):
        res = run_effect(current)
        GAME_VARS.current_player = res[0]
        GAME_VARS.can_stack = res[1]
        for p in range(player_count):
            GAME_VARS.eff_to_draws[p] += res[2][p]
            GAME_VARS.eff_timeouts[p] += res[3][p]
        
        if(not can_stack(card)):
           while(len(effect_stack) > 0): effect_stack.pop()
    
    # non effect card
    
    GAME_VARS.current_player = next_player(current)
    return current

def turn():
    card = turn_play()
    if(card > -1):
        # WILD color selector
        if(colors_d[card] == color_count):
            print("Pick a color for the wild:" + "".join(
                (f"\n  {i}: {colors[i]}")
                for i in range(color_count)
            ))
            s = 0
            try:
                s = int(input("# "))
                colors[s]
            except: pass
            
            GAME_VARS.chosen_color = s
            print("Chosen Color: " + colors[s])
        # just play the card
        return play(card)
    # weird current shenanigans
    current = GAME_VARS.current_player
    GAME_VARS.current_player = next_player(current)
    return current

max_turn_c = 100
def main():
    current = GAME_VARS.current_player
    hand = GAME_VARS.hands[current]
    
    turn_c = 0
    previous = current
    previous_hand = hand
    while(len(previous_hand) > 0):
        # use previous to keep track of wins
        previous = current
        previous_hand = hand
        
        if(turn_c >= max_turn_c):
            print(f"Game took too many turns! ({turn_c} turns)")
            break
        turn()
        current = GAME_VARS.current_player
        hand = GAME_VARS.hands[current]
        turn_c += 1
        
        # print("----")
        # report()
        # input("----")
    print(f"Player # {previous} wins, I think?")


def start_game():
    draw = GAME_VARS.deck
    disc = GAME_VARS.discard
    
    # fill the draw
    for card in cards:
        # draw.append(card)
        where_cards[card.id] = GAME_VARS.draw_index
    # but += is bad, no?
    draw += list(range(card_count))
    random.shuffle(draw)
    
    # then draw a card as our first discard
    card = draw_card(GAME_VARS.disc_index)
    # if the card is a WILD
    while(colors_d[card] == color_count):
        # lots of fun: keep drawing cards until we don't get a WILD!
        card = draw_card(GAME_VARS.disc_index)
    
    # GAME_VARS.current_player = 0
    # ?
    # for i in range(player_count):
    #     GAME_VARS.to_draws[i] = 0
    #     GAME_VARS.timeouts[i] = 0
    
    # give everyone their starting hand!
    for player in range(player_count):
        draw_cards(player, starting_hand_size)
    
    main()

if(True):
    start_game()

else:
    initialize()
    
    to_play = [
        cards_per_color*2 + numbers_to_use + 2
    ]
    [play(p) for p in to_play]
    
    print("effect stack:", effect_stack)
    
    print(run_effect(0))
    [print(symbols_d[p]) for p in to_play]
    [print(symbols_d[p] == TYPES.AP1) for p in to_play]

# effect_stack.append(cards_per_color*1 + 2)

```

