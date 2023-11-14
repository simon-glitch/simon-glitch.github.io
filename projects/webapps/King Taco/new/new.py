"""
(c) Uno Upon A Time, by Simon Willover
"""

import random

# used for type hinting
class _SupportsAdd:
    """Any data type that has a `.__add__` method on it."""

player_count = 2
color_count  = 4
colors: tuple[str] = ("pink","yellow","cyan","green")
wild_name = "wild"
numbers_to_use = 10
special_count  = 4
specials: tuple[str] = ("inverse", "+= 2", "all ++", "skip")
wild_count = 8
wild_special_count: tuple[int] = (1, 1, 1, 1)
cards_per_color = numbers_to_use + special_count
card_count = cards_per_color * color_count + wild_count

# enums for card types (types determine functionality, outside of being wild)
class _TYPES: pass
TYPES = _TYPES()
TYPES.INV  = specials[0]
TYPES.P2   = specials[1]
TYPES.AP1  = specials[2]
TYPES.SKIP = specials[3]

# enums for card colors
class _COLORS: pass
COLORS = _COLORS()
COLORS.PINK   = colors[0]
COLORS.YELLOW = colors[1]
COLORS.CYAN   = colors[2]
COLORS.GREEN  = colors[3]
COLORS.WILD   = wild_name

# Global Vars for our game:
class _GAME_VARS:
    # whose turn is it?
    current_player = 0
    # 1 = forwards, -1 = backwards
    direction_of_play = 1
    # False = match (color | symbol) | WILD, True = !match (color | symbol)
    invert_playability = False
    # last effect_stack contributor
    last_contributor = 0
    
    # hands are sets of ints, for simplicity
    #   these could be any ordered list[int]
    #   there will never be dupes, so set is really just tacked on here for semantic reasons
    hands:   tuple[list[int]] = ([],) * player_count
    deck:    list[int] = list()
    discard: list[int] = list()
    # how many moves each player has to wait until they can play again
    timeouts: tuple[int] = (0,) * player_count
    # how many cards each player has to draw on the start of their turn; if to_draw is > 0, then the player can not play any cards
    to_draws: tuple[int] = (0,) * player_count
    
    all_piles: tuple[list[int]] = (*hands, deck, discard)
    
    # convenience functions, I guess?
    draw_index = player_count + 0
    disc_index = player_count + 1

GAME_VARS = _GAME_VARS()


# nearly empty class; could be any kind of object
# the only reason this class has methods is to make it look pretty in print statements
class Card:
    id = -1
    def __str__(self): return f"Card #_{self.id}"
    def __repr__(self) -> str: return str(self)

def tally(iterable: _SupportsAdd, c_type: type = None) -> _SupportsAdd:
    """
    * When used on numbers:
          * sums them
    * When used on a sequence:
          * Combine nested sequences into a flattened sequences;
                * works similarly to JavaScript's `Array.flat()`
                * only checks 1 nesting layer deep!
    """
    c_type = c_type or type(iterable[0])
    sofar = c_type()
    for i in iterable:
        sofar += i
    return sofar


# this is immutable
cards = tuple([Card() for i in range(card_count)])
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

# spelling this in British `colours` makes it have the same length as symbols, which I like
# buuut I will avoid doing that XD
colors_d: tuple[int] = tuple([
    i // cards_per_color for i in range(color_count * cards_per_color)
] + [color_count] * wild_count)

symbols_d: tuple[str] = tuple(tally([
    [str(i + 1) for i in range(numbers_to_use + special_count)]
] * color_count) + [
    "" # or 0?
] * (wild_count - tally(wild_special_count) + tally([
    ([specials[i]] * w) for (i, w) in enumerate(wild_special_count)
])))

# this determines where cards are
where_cards: list[int] = [0] * card_count

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
    
    return color_str + (" " if symbol_str else "") + symbol_str


# event loop componentss
def initialize():
    """
    Initialize the card piles according to the current values in `where_cards`.
    """
    
    for p in GAME_VARS.all_piles:
        while(len(p) > 0):
            # this is not actually a shorthand for
            # `p = p & set()`
            p &= set()
            # p.__iand__(q) actually mutates p,
            # rather than copying it and returning p & q.
    
    i = 0
    l = len(where_cards)
    while(i < l):
        v = where_cards[i]
        c = cards[i]
        GAME_VARS.all_piles[v].add(i)
        c.id = i
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

def report():
    """Print the currrent game state."""
    print(f"Game State:\n\
    hands:   {GAME_VARS.hands}\n\
    discard: {GAME_VARS.discard}\n\
    cards:   {cards}\n\
    all_piles:   {GAME_VARS.all_piles}\n\
    where_cards: {where_cards}\n\
~~~~")

event_track = []
effect_stack = []

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
        return (not GAME_VARS.invert_playability)
    
    # I am not a fan of Python's negative index funny business
    prev_i = GAME_VARS.discard[len(GAME_VARS.discard) - 1]
    
    matches = (
        ( colors_d[card_i] == COLORS.WILD) or
        ( colors_d[card_i] == colors_d[prev_i]) or
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
    ```
    res: tuple = (
        to_draw: int, all_to_draw: int,
        recipient: int,
        can_respond: bool,
        to_draws: tuple[int],
        d_timeouts: tuple[int],
    )
    ```
    
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
    # current player
    current = initial_player
    can_respond = True
    to_draws = (0,) * player_count
    d_timeouts = (0,) * player_count
    
    type = effect_stack[0]
    rest = effect_stack[1:]
    
    # I have never found myself needing to add so many comments just to preserve my own sanity!~
    
    # inverse does almost nothing
    if(type == TYPES.INV):
        if(player_count > 2):
            reverse()
        else: current = next_player(current)
        can_respond = False
    if(type == TYPES.P2):
        to_draw = 2
        for t in rest:
            if(t == TYPES.INV):
                d_timeouts[current] += 1
                reverse()
                current = next_player(current)
            if(t == TYPES.P2):
                current = next_player(current)
                to_draw += 2
            if(t == TYPES.AP1):
                to_draw += player_count
                all_to_draw += 1
                current = next_player(current)
            if(t == TYPES.SKIP):
                current = next_player(current)
    if(type == TYPES.AP1):
        all_to_draw += 1
        inverted = False
        for t in rest:
            if(t == TYPES.INV):
                inverted = not inverted
                reverse()
                # logic for this is handled after the for loop, in order to avoid math errors
            # bc we set can_respond = False when inverted = True, this line of code should never run;
            if(inverted):
                raise ValueError(f"Can not respond to to inverse(All++) with `{t}`")
            if(t == TYPES.P2):
                # very STRONG!!!
                all_to_draw += 2
            if(t == TYPES.AP1):
                all_to_draw += 1
            if(t == TYPES.SKIP):
                # haha! I don't have to draw nothing!
                for i in range(player_count):
                    # 5 levels of indentation!
                    d_timeouts[i] += all_to_draw
                # stop the All++ shenanigans
                can_respond = False
            # every loop step, give the next player an opportunity to respond
            current = next_player(current)
        # handle inverted shenanigans
        if(inverted):
            can_respond = False
            to_draw = all_to_draw * player_count
            all_to_draw = 0
    if(type == TYPES.SKIP):
        skips = 1
        d_timeouts[next_player(current)] += 1
        for t in rest:
            if(t == TYPES.INV):
                reverse()
                current = next_player(current)
                compatability_matrix
            if(t == TYPES.P2):
                to_draws[current] += 2
                skips += 2
                current = next_player(current)
            if(t == TYPES.AP1):
                for i in range(player_count):
                    d_timeouts[i] += skips
                skips = 0
            if(t == TYPES.SKIP):
                current = next_player(current)
        d_timeouts[next_player(current)] += skips
    
    # implement all draw
    for i in range(player_count): to_draws[i] += all_to_draw
    # implement recipient draw
    to_draws[recipient] += to_draw - all_to_draw
    
    # then push to the next player one last time
    recipient = current
    # was: next_player(current)
    
    return (to_draw, recipient, can_respond, d_timeouts)

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

def draw_card():
    """
    (Mutates the cards in the draw pile.)
    
    Draw a random card from the draw pile. If the draw pile is empty, this will try use the discard, by: flipping the dicard, shuffling the discard, and making the discard become the draw pile.
    
    Returns
    -------
    `card: int =` The index of the drawn card
    """
    
    draw = GAME_VARS.deck
    disc = GAME_VARS.discard
    
    if(len(draw) == 0):
        if(len(disc) == 0):
            return None
        # move indices
        while(len(disc) > 0):
            d = disc[0]
            move(d, GAME_VARS.draw_index, GAME_VARS.disc_index)
        # shuffle the pile too, ofc!
        random.shuffle(draw)
    
    return draw.pop()

def draw_cards(player, amount):
    hand = GAME_VARS.hands[player]
    for i in range(amount):
        card = draw_card()
        # this means that we actually ran out of cards in both the draw and dicard pile!
        if(card == None): break
        hand.push(card)
        # player is the index of the current player's hand
        where_cards[card] = player
    
    # python let's us access for-loop variables, bc they are put on the same level as the `for` statement; JavaScript doesn't let you do this, since it puts for-loop variables inside the for-loop's private scope
    
    not_drawn = amount - i
    if(not_drawn > 0): print(f"Couldn't draw {not_drawn} out of {amount} cards!")

def turn() -> int:
    current  = GAME_VARS.current_player
    to_draws = GAME_VARS.to_draws
    timeouts = GAME_VARS.timeouts
    if(timeouts[current] > 0):
        timeouts[current] -= 1
        return -1
    if(to_draws[current] > 0):
        draw_cards(current, to_draws[current])
        to_draws[current] = 0
        return -1
    
    hand = GAME_VARS.hands[current]
    
    
    playable = [can_play(card) for card in hand]
    
    # if we aren't timed out, and we didn't have to draw cards, then we can try to play cards
    print(f"player {current}'s hand:\n{"  ".join([str(index) + ": " + card_string(card) for (index, card) in enumerate(hand)])}")
    
    to_play = -1
    max_index = len(hand)
    
    while True:
        s = input("Which card would you like to play?\n# ")
        try:
            to_play = int(s)
            if(to_play < 0 or to_play > max_index):
                print(f"Your card index ({to_play}) is outside of the valid range of indices: [{0} to {max_index}] (inclusive)")
                continue
            if(playable[to_play]):
                break
            # not playable?
            print(f"{card_string(hand[to_play])} at index {to_play} is not playable!")
        except SyntaxError:
            print(SyntaxError)
    
    return to_play

def play(card):
    current = GAME_VARS.current_player
    if(len(effect_stack) == 0):
        ...
    ...

def start_game():
    draw = GAME_VARS.deck
    disc = GAME_VARS.discard
    
    # fill the draw
    for card in cards:
        draw.append(card)
        where_cards[card] = GAME_VARS.draw_index
    random.shuffle(draw)
    
    # then draw a card as our first discard
    first = draw_card()
    disc.append(first)
    where_cards[first] = GAME_VARS.disc_index
    
    GAME_VARS.current_player = 0
    for i in range(player_count):
        GAME_VARS.to_draws[i] = 0
        GAME_VARS.timeouts[i] = 0
    
    turn()



