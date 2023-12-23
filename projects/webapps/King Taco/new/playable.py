"""
(c) Uno Upon A Time, by Simon Willover
"""

import random
from types import GeneratorType
import asyncio

og_input = input

async def alert(message: str):
    return print(message)
async def input(prompt: str):
    return og_input(prompt)

function = type(lambda: None)

# used for type hinting
class _SupportsAdd:
    """Any data type that has a `.__add__` method on it."""

""" ============
Global Variables
============ """

player_count = 2
starting_hand_size = 7
color_count  = 4
colors: tuple[str] = (
    "pink","yellow","green",
    "teal","cyan","purple",
)
wild_name = "WILD"
numbers_to_use = 10
specials: tuple[str] = (
    "inverse", "+= 2",
    "all ++", "skip",
)
color_special_count: tuple[int] = (1, 1, 1, 1)
wild_count = 8
wild_special_count: tuple[int] = (1, 1, 1, 1)
cards_per_color = numbers_to_use + sum(color_special_count)
card_count = cards_per_color * color_count + wild_count

""" ===================
Global Variable Classes
=================== """

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
    # last effect stack contributor (UNUSED)
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
# COLORS and TYPES are never used
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

""" =====
Card Data
===== """

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
~~~
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
symbols_di: tuple[int] = tuple((
    specials.index(s)
    if (s in specials)
    else None
) for s in symbols_d)

# this determines where cards are
where_cards: list[int] = [0] * card_count

""" ===============
Player Data Helpers
=============== """

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

""" ===============
Game State Printers
=============== """

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

# PURE FUNCTION
def hand_string(name, hand, playable, stackable):
    return (
        name +
        " hand:" +
        "".join([(
            "\n  " +
            str(index) +
            " " +
            ("S" if stackable[index] else (
                "P" if playable[index] else "-"
            )) +
            ": " +
            card_string(card)
        ) for (index, card) in enumerate(hand)])
    )

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

""" ===============
Game Loop Functions
=============== """
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



class Effect:
    """
    Represents the current event stack for the game; you only need 1 instance of this class.
    
    Use `effect.auto` to add cards to the stack. Use `effect.clear` to finish the stack when you are done.
    """
    
    # like with javaScript prototypes, each default value defined as a 'class variable' is the same on different instances;
    # ^ this means we have to put `stack = []` in `__init__` as well
    
    # modular functions (initialization vars)
    start_fs: list[function] = []
    # ooh, a 3D list of functions!
    stack_fs: list[list[list[function]]] = []
    eff_dirs: list[list[int]] = []
    
    # stack result variables (output vars)
    to_draws = [0] * player_count
    timeouts = [0] * player_count
    d_to_draws = [0] * player_count
    d_timeouts = [0] * player_count
    p_to_draws = [0] * player_count
    p_timeouts = [0] * player_count
    
    # stack handling variables (internal vars)
    cards = [-1]*0
    """
    Cards present in the stack of cards that determines the current pending effect.
    """
    base: tuple[int] = (-1,0)
    """
    The current context of the effect stack. The effects of cards added to the stack is determined based on the `base`.
    
    format: `(symbol, mode) =`
        * `symbol: int =` the index the symbol of the base card
        * `mode: int =` the "mode" that the base card has been put in; some cards have alternate modes, like inverted mode; 0 means default; 1 means inverted; other numbers mean whatever the programmer needs them to mean
    """
    length = 0
    """
    Current length of the effect stack.
    
    **If you are reading this value while running a card effect funciton,** remember: this is the length of the stack **before** the card that triggered the effect function.
    """
    
    # we wanna keep track of these, so effects can be clever
    previous_player = -1
    current_player = 0
    
    # effect function vars (game rule vars)
    to_draw = 0
    all_to_draw = 0
    skips = 0
    
    def __init__(self):
        self.to_draws = []
        self.timeouts = []
        self.start_fs = []
        self.stack_fs = []
        self.cards = []
        
        self.clear()
    def clear(self):
        self.cards = []
        self.length = 0
        self.to_draws = [0] * player_count
        self.timeouts = [0] * player_count
        self.d_to_draws = [0] * player_count
        self.d_timeouts = [0] * player_count
        self.p_to_draws = [0] * player_count
        self.p_timeouts = [0] * player_count
        return None
    def update(self):
        """
        Keep track of current timeouts and to_draws, and how much they have changed between plays.
        """
        self.d_to_draws = [0] * player_count
        self.d_timeouts = [0] * player_count
        for (i,p) in enumerate(self.to_draws):
            self.d_to_draws[i] = p - self.p_to_draws[i]
            self.p_to_draws[i] = p
        for (i,p) in enumerate(self.timeouts):
            self.d_timeouts[i] = self.p_timeouts[i] - p
            self.p_timeouts[i] = p
    def coalesce(self):
        """
        Coalesce internal variables into result variables.
        
        For example: `self.all_to_draw` is converted to a `+=a` in each item of `self.to_draws`.
        
        This is like the code after a for-loop, the code finishes a function's execution.
        """
        
        # the recipient is the person at the end of the effect stack
        self.previous_player = self.current_player
        self.current_player = next_player(self.current_player)
        # select recipient based on effect type and mode
        
        # print("?", self)
        
        recipient = [
            self.previous_player,
            self.current_player
        ][self.eff_dirs[self.base[0]][self.base[1]]]
        
        # implement all draw
        for i in range(player_count): self.to_draws[i] += self.all_to_draw
        # implement recipient draw
        self.to_draws[recipient] += self.to_draw - self.all_to_draw
        # implement recipient skip
        self.d_timeouts[recipient] += self.skips
        
        return None
    def auto(self, card: int):
        """
        Add a card to the effect stack.
        
        `card: int` = index of the card to add to the effect stack.
        """
        
        res = (
            self.start(card)
            if (self.length == 0)
            else (self.stack(card))
        )
        self.coalesce()
        self.update()
        return res
    def start(self, base: int):
        """
        Start the effect stack.
        
        `base: int` = index of the card to use as the base of the effect stack.
        """
        
        self.clear()
        self.cards.append(base)
        self.on_start(base)
        self.length = 1
        self.update()
        return None
    def stack(self, modifier: int):
        """
        Add to the effect stack (stack on a new card).
        
        `modifier: int` = index of the card to add to the effect stack, as a modifier to the current effect.
        """
        
        self.cards.append(modifier)
        self.on_stack(modifier) # run card's modifying effect
        self.length += 1
        return None
    def reverse():
        GAME_VARS.direction_of_play *= -1
        GAME_VARS.invert_playability = True
    
    def on_start(self, base: int):
        """
        Handle logic for specific card at the start of the stack.
        
        This is where the code is modular.
        """
        self.base = (symbols_di[base], 0)
        return self.start_fs[symbols_di[base]](self)
    def on_stack(self, modifier: int):
        """
        Handle logic for specific card in the middle of the stack.
        
        This is where the code is modular.
        """
        return (
            self.stack_fs
            [self.base[0]][self.base[1]]
            [symbols_d[modifier]]
        )(self)
    
    # RELATIVELY PURE FUNCTION
    def refresh(self):
        """
        Rebuild the current stack from its current card indices.
        
        This simply calls auto on each card.
        """
        c = self.cards
        
        if(len(c) == 0): return self.clear()
        
        # v else v
        for card in c: self.auto(card)
        return None
    
    # PURE FUNCTION; goes in Effect
    def can_stack(self, card: int):
        # print("checking if " + card_string(card) + " can stack")
        
        if(self.length == 0): return False
        
        # In JavaScript, we can just do:
        #   return !!(self.stack_fs?.[self.base[0]]?.[self.base[1]]?.[symbols_d[card]])
        #   the ?. operator is really nice
        #   alternative for Python:
        #     olist = list
        #     class list(olist):
        #       __matmul__(this, that: int):
        #         return None if not(that in this) else this[that]
        #     ...:
        #       return self.stack_fs @ self.base[0]] @ self.base[1] @ symbols_d[card]
        
        options = self.stack_fs
        indices = [
            self.base[0],
            self.base[1],
            symbols_di[card]
        ]
        
        # neat little trick: just check if the function for the card exists;
        # basically, this is an iterative in;
        # numpy equivalent: return ((*indices) in options)
        for i in indices:
            # this would make sense if options was a dict; but our options is a list
            # > if(not(i in options)): return False
            if(i < 0 or i >= len(options)): return False
            options = options[i]
        return True
    
    def __str__(self):
        return (
            "Effect Stack {\n" +
            f"  current_player: {self.current_player}\n" +
            f"  base: {self.base}\n" +
            f"  length: {self.length}\n" +
            f"  cards: {[card_string(c) for c in self.cards]}\n" +
            f"  to_draw: {self.to_draw}\n" +
            f"  all_to_draw: {self.all_to_draw}\n" +
            f"  skips: {self.skips}\n" +
            f"  to_draws: {self.to_draws}\n" +
            f"  timeouts: {self.timeouts}\n" +
            f"  d_to_draws: {self.d_to_draws}\n" +
            f"  d_timeouts: {self.d_timeouts}\n" +
            "}"
        )
    def __repr__(self): return str(self)


# used to prepare **my game's** effects
def prep(effect: Effect):
    def start_inv(self: Effect):
        self.reverse()
    def start_p2(self: Effect):
        self.to_draw = 2
    def start_ap1(self: Effect):
        self.all_to_draw += 1
        self.to_draw += 1
    def start_skip(self: Effect):
        self.skips = 1
    
    inv_inv = start_inv
    
    def p2_inv(self: Effect):
        self.d_timeouts[self.current] += 1
        self.reverse()
    def p2_p2(self: Effect):
        self.to_draw += 2
    def p2_ap1(self: Effect):
        self.to_draw += self.player_count
        self.all_to_draw += 1
    def p2_skip(self: Effect): pass

    def ap1_inv(self: Effect):
        inverted = self.base[1]
        
        self.reverse()
        
        if(not inverted):
            self.to_draw = self.all_to_draw * self.player_count
            self.all_to_draw = 0
        else:
            self.all_to_draw = self.to_draw // self.player_count
            self.to_draw = 0
        
        # further logic for this is handled with a mode
        self.base = (self.base[0], 1 - inverted)
    def ap1_p2(self: Effect):
        # very STRONG!!!
        self.all_to_draw += 2
        self.to_draw += 2
    def ap1_ap1(self: Effect):
        self.all_to_draw += 1
        self.to_draw += 1
    def ap1_skip(self: Effect):
        # haha! I don't have to draw nothing!
        for i in range(player_count):
            self.d_timeouts[i] += self.all_to_draw
        self.base = (self.base[0], 2)
    ap1_inv_inv = ap1_inv
    
    def skip_inv(self: Effect):
        self.reverse()
    def skip_p2(self: Effect):
        self.to_draws[self.current] += 2
        self.skips += 2
    def skip_ap1(self: Effect):
        for i in range(player_count):
            self.d_timeouts[i] += self.skips
            self.can_respond = False
        self.skips = 0
    def skip_skip(self: Effect): pass
    
    effect.start_fs += [start_inv, start_p2, start_ap1, start_skip]
    effect.stack_fs += [
        # on inv:
        [
            [inv_inv],
        ],
        # on p2:
        [
            [
                p2_inv,
                p2_p2,
                p2_ap1,
                p2_skip,
            ],
        ],
        # on ap1:
        [
            [
                ap1_inv,
                ap1_p2,
                ap1_ap1,
                ap1_skip,
            ],
            # inverted mode:
            [
                ap1_inv_inv,
            ],
        ],
        # on skip:
        [
            [
                skip_inv,
                skip_p2,
                skip_ap1,
                skip_skip,
            ],
        ],
    ]
    effect.eff_dirs += [
        [0],
        [1],
        [0,1,0],
        [1],
    ]

ABOUT_KING_TACO = """
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

my_effect = Effect()
prep(my_effect)

TODO = "v"
"""
* add:
    * lose(player_index) -> remove a player
    * discard_cards(player_index, amount) -> have player select cards to discard
    * 
"""

async def draw_card(where_to: int):
    """
    (Mutates the cards in the draw pile.)
    (also mutates the pile at where_to.)
    
    Draw a random card from the draw pile. If the draw pile is empty, this will try use the discard, by: flipping the dicard, shuffling the discard, and making the discard become the draw pile.
    
    Parameters
    ----------
    Index of the pile (or hand; hands **are** piles) to send this card to after drawing it. We can't just let it hang in empty space, you know!~ This method will automatically call `move(...)` in order to send the drawn card to the pile at `where_to`. This
    
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
async def discard_card(card: int):
    """
    (Mutates the discard.)
    (Mutates the pile or hand containing the card.)
    Discard the given card.
    
    Returns
    -------
    Returns the given card index.
    """
    where_from = where_cards[card]
    await alert("dicarded: " + card_string(card))
    return move(card, GAME_VARS.disc_index, where_from)
async def draw_cards(player: int, amount: int):
    """
    Make the given player draw a number of cards.
    
    Returns
    -------
    Whether or not the player was able to draw that many cards.
    """
    
    drawn = amount
    for i in range(amount):
        # `player` is actually the index of the player's hand
        card = await draw_card(player)
        if(card < 0):
            # python let's us access for-loop variables, bc they are put on the same level as the `for` statement; JavaScript doesn't let you do this, since it puts for-loop variables inside the for-loop's private scope; I prefer doing this in the JavaScript-compatible way, b.c. it's more intuitive to me.
            drawn = i
            break
    
    not_drawn = amount - drawn
    if(not_drawn > 0):
        await alert(f"Couldn't draw {not_drawn} out of {amount} cards!")
        return False
    return True

# allows player to choose card to play
async def turn_play() -> int:
    # constants
    current  = GAME_VARS.current_player
    to_draws = GAME_VARS.to_draws
    timeouts = GAME_VARS.timeouts
    eff_to_draws = GAME_VARS.eff_to_draws
    eff_timeouts = GAME_VARS.eff_timeouts
    hand = GAME_VARS.hands[current]
    # generated vars
    playable = [can_play(card) for card in hand]
    stackable = [my_effect.can_stack(card) for card in hand]
    playable_c: int = tally(int(p) for p in playable)
    stackable_c: int = tally(int(p) for p in stackable)
    under_effect = (
        eff_to_draws[current] or
        eff_timeouts[current]
    )
    effect_string = ""
    
    await alert(f"You are player # {current}.")
    # if the player can't stack any of their cards and they are under an effect, then they must accept the effect
    if(
        stackable_c == 0
        and under_effect):
        for i in range(player_count):
            timeouts[i] += eff_timeouts[i]
            to_draws[i] += eff_to_draws[i]
            eff_timeouts[i] = 0
            eff_to_draws[i] = 0
    async def accept_effect():
        if(timeouts[current] > 0):
            await alert("You are currently in timeout.")
            timeouts[current] -= 1
            await alert(f"{timeouts[current]} turns of timeout remaining ...")
            return -1
        if(to_draws[current] > 0):
            await alert(f"You are forced to draw {to_draws[current]} cards.")
            await draw_cards(current, to_draws[current])
            # this is technically a local copy
            playable = [can_play(card) for card in hand]
            stackable = [my_effect.can_stack(card) for card in hand]
            # playable_c: int = tally(int(p) for p in playable)
            to_draws[current] = 0
            await alert("You don't get to play this turn (sorry)!")
            await alert(hand_string("Your", hand, playable, stackable))
            return -1
        return None
    # try to instantly
    to_play = await accept_effect()
    if(to_play != None):
        # weird return ascension handling
        return to_play
    
    playable = [can_play(card) for card in hand]
    stackable = [my_effect.can_stack(card) for card in hand]
    playable_c: int = tally(int(p) for p in playable)
    stackable_c: int = tally(int(p) for p in stackable)
    
    if(under_effect):
        await alert("You need to play a stackable card.")
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
        await alert("* Or you will be forced " + effect_string + ".")
        playable   = stackable
        playable_c = stackable_c
    # this else statement is way too big
    else:
        # draw a card if you can't play
        if(playable_c == 0):
            await alert("You don't have any playable cards; you are forced to draw.")
            card = await draw_card(current)
            if(card == -1):
                await alert("You couldn't draw a card! turn passed!")
                return
            await alert("You drew a card: ", card_string(card))
        
        playable = [can_play(card) for card in hand]
        stackable = [my_effect.can_stack(card) for card in hand]
        playable_c = tally(int(p) for p in playable)
        stackable_c = tally(int(p) for p in stackable)
        if(playable_c == 0):
            await alert("Sorry! You still can't play anything with your new card!")
            return -1
        if(playable_c == 1):
            card = hand[playable.index(True)]
            await alert("auto playing card: " + card_string(card))
            return card
        
    
    # our UI
    await alert("top discard:\n  " + card_string(
        GAME_VARS.discard[len(GAME_VARS.discard) - 1])
    )
    
    # if we aren't timed out, and we didn't have to draw cards, then we can try to play cards
    await alert(hand_string("Your", hand, playable, stackable))
    if(under_effect):
        await alert("  " + str(len(hand)) + ": " + effect_string)
    
    # index of chosen card, if a card needs to be selected by the user for playing
    to_play = -1
    max_index = len(hand) - 1

    
    # player await input, finally
    while True:
        s = await input("Which card would you like to play?\n# ")
        if(not s):
            await alert("Hey! I can't just assume which card you are going to play. Type in a integer on the next prompt. I will play the card labeled with that number (according to the table of your hand above).")
            continue
        try:
            to_play = int(s)
            if(to_play < 0 or to_play > max_index):
                if(under_effect and to_play == max_index + 1):
                    await accept_effect()
                    break
                await alert(f"Your card index ({to_play}) is outside of the valid range of indices: [{0} to {max_index + under_effect}] (inclusive)")
                continue
            if(playable[to_play]):
                # convert to usable card id
                to_play = hand[to_play]
                break
            # not playable?
            await alert(f"{card_string(hand[to_play])} at index {to_play} is not playable on the current top discard!")
        except ValueError as e:
            await alert(e)
    
    return to_play
# handles card playing logic
async def play(card: int):
    """
    Play a card chosen by the current player. Make sure the card is under the player's control!
    
    Returns
    -------
    the next player, even though you probably don't need the return value.
    """
    current = GAME_VARS.current_player
    can_stack = (my_effect.can_stack(card) or (my_effect.length == 0))
    await discard_card(card)
    
    # print("effect before:", my_effect)
    
    if(symbols_d[card] in specials):
        # print("effect:", res)
        if(can_stack):
            # print("adding to effect stack")
            my_effect.auto(card)
    if(my_effect.length > 0):
        GAME_VARS.current_player = my_effect.current_player
        for p in range(player_count):
            GAME_VARS.eff_to_draws[p] += my_effect.d_to_draws[p]
            GAME_VARS.eff_timeouts[p] += my_effect.d_timeouts[p]
        
        if(not can_stack): my_effect.clear()
    
    # print("effect after:", my_effect)
    
    GAME_VARS.current_player = next_player(current)
    return current

# Handles non-card-playing logic
async def turn():
    card = await turn_play()
    if(card > -1):
        # WILD color selector
        if(colors_d[card] == color_count):
            await alert("Pick a color for the wild:" + "".join(
                (f"\n  {i}: {colors[i]}")
                for i in range(color_count)
            ))
            s = 0
            try:
                s = int(await input("# "))
                colors[s]
            except: pass
            
            GAME_VARS.chosen_color = s
            await alert("Chosen Color: " + colors[s])
        # just play the card
        return await play(card)
    # weird current shenanigans
    current = GAME_VARS.current_player
    GAME_VARS.current_player = next_player(current)
    return current

max_turn_c = 10_000
async def game_main():
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
            await alert(f"Game took too many turns! ({turn_c} turns)")
            break
        await turn()
        current = GAME_VARS.current_player
        hand = GAME_VARS.hands[current]
        turn_c += 1
        
        # print("----")
        # report()
        # await input("----")
    await alert(f"Player # {previous} wins, I think?")


async def start_game():
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
    card = await draw_card(GAME_VARS.disc_index)
    # if the card is a WILD
    while(colors_d[card] == color_count):
        # lots of fun: keep drawing cards until we don't get a WILD!
        card = await draw_card(GAME_VARS.disc_index)
    
    # GAME_VARS.current_player = 0
    # ?
    # for i in range(player_count):
    #     GAME_VARS.to_draws[i] = 0
    #     GAME_VARS.timeouts[i] = 0
    
    # give everyone their starting hand!
    for player in range(player_count):
        await draw_cards(player, starting_hand_size)
    
    await game_main()

async def main():
    if(1):
        return await start_game()
    
    # testing
    initialize()
    
    to_play = [
        cards_per_color*2 + numbers_to_use + 2,
        cards_per_color*3 + numbers_to_use + 2
    ]
    await play(to_play[0])
    
    print("effect stack:", my_effect.cards)
    
    print("can_stack:", my_effect.can_stack(to_play[1]))
    
    [print(symbols_d[p]) for p in to_play]
    [print(symbols_d[p] == TYPES.AP1) for p in to_play]

asyncio.run(main())

"""
(?<!def )(draw_card|discard_card|draw_cards|turn_play|play|turn|game_main|start_game)(?=\()
await $&

"""


