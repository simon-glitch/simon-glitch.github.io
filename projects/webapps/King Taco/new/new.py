"""
(c) Uno Upon A Time, by Simon Willover
"""

import random
from types import GeneratorType

# used for type hinting
class _SupportsAdd:
    """Any data type that has a `.__add__` method on it."""

player_count = 2
starting_hand_size = 5
color_count  = 4
colors: tuple[str] = ("pink","yellow","cyan","green")
wild_name = "wild"
numbers_to_use = 10
specials: tuple[str] = ("inverse", "+= 2", "all ++", "skip")
color_special_count: tuple[int] = (1, 1, 1, 1)
wild_count = 8
wild_special_count: tuple[int] = (1, 1, 1, 1)
cards_per_color = numbers_to_use + sum(color_special_count)
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
    # whether the current effect stack can be stacked upon futher
    can_stack = True
    # last effect_stack contributor
    last_contributor = 0
    
    # hands are sets of ints, for simplicity
    #   these could be any ordered list[int]
    #   there will never be dupes, so set is really just tacked on here for semantic reasons
    hands:   tuple[list[int]] = tuple([] for i in range(player_count))
    deck:    list[int] = list()
    discard: list[int] = list()
    # how many moves each player has to wait until they can play again
    timeouts: list[int] = (0,) * player_count
    # how many cards each player has to draw on the start of their turn; if to_draw is > 0, then the player can not play any cards
    to_draws: list[int] = (0,) * player_count
    
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
    
    matches = (
        ( colors_d[card_i] == color_count) or
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
        if(player_count > 2):
            reverse()
        else: current = next_player(current)
        can_respond = False
    if(type == TYPES.P2):
        to_draw = 2
        for t in rest:
            if(symbols_d[t] == TYPES.INV):
                d_timeouts[current] += 1
                reverse()
                current = next_player(current)
            if(symbols_d[t] == TYPES.P2):
                current = next_player(current)
                to_draw += 2
            if(symbols_d[t] == TYPES.AP1):
                to_draw += player_count
                all_to_draw += 1
                current = next_player(current)
            if(symbols_d[t] == TYPES.SKIP):
                current = next_player(current)
    if(type == TYPES.AP1):
        all_to_draw += 1
        inverted = False
        for t in rest:
            if(symbols_d[t] == TYPES.INV):
                inverted = not inverted
                reverse()
                # logic for this is handled after the for loop, in order to avoid math errors
            # bc we set can_respond = False when inverted = True, this line of code should never run;
            if(inverted):
                raise ValueError(f"Can not respond to to inverse(All++) with `{t}`")
            if(symbols_d[t] == TYPES.P2):
                # very STRONG!!!
                all_to_draw += 2
            if(symbols_d[t] == TYPES.AP1):
                all_to_draw += 1
            if(symbols_d[t] == TYPES.SKIP):
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
        for t in rest:
            if(symbols_d[t] == TYPES.INV):
                reverse()
                current = next_player(current)
                compatability_matrix
            if(symbols_d[t] == TYPES.P2):
                to_draws[current] += 2
                skips += 2
                current = next_player(current)
            if(symbols_d[t] == TYPES.AP1):
                for i in range(player_count):
                    d_timeouts[i] += skips
                skips = 0
            if(symbols_d[t] == TYPES.SKIP):
                current = next_player(current)
        d_timeouts[next_player(current)] += skips
    
    # implement all draw
    for i in range(player_count): to_draws[i] += all_to_draw
    # implement recipient draw
    to_draws[current] += to_draw - all_to_draw
    
    # then push to the next player one last time
    recipient = current
    # was: next_player(current)
    
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
import types

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
    current  = GAME_VARS.current_player
    to_draws = GAME_VARS.to_draws
    timeouts = GAME_VARS.timeouts
    hand = GAME_VARS.hands[current]
    playable = [can_play(card) for card in hand]
    playable_c: int = tally(int(p) for p in playable)
    
    print(f"You are player # {current}.")
    if(timeouts[current] > 0):
        print("You are currently in timeout.")
        timeouts[current] -= 1
        print(f"{timeouts[current]} turns of timeout remaining ...")
        return -1
    if(to_draws[current] > 0):
        print(f"You are forced to draw {to_draws[current]} cards.")
        draw_cards(current, to_draws[current])
        to_draws[current] = 0
        print("You don't get to play this turn (sorry)!")
        print(hand_string("Your", hand, playable))
        return -1
    
    print("top discard:\n  " + card_string(
        GAME_VARS.discard[len(GAME_VARS.discard) - 1])
    )
    
    # if we aren't timed out, and we didn't have to draw cards, then we can try to play cards
    print(hand_string("Your", hand, playable))
    
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
    
    to_play = -1
    max_index = len(hand)
    
    while True:
        s = input("Which card would you like to play?\n# ")
        if(not s):
            print("Hey! I can't just assume which card you are going to play. Type in a integer on the next prompt. I will play the card labeled with that number (according to the table of your hand above).")
            continue
        try:
            to_play = int(s)
            if(to_play < 0 or to_play > max_index):
                print(f"Your card index ({to_play}) is outside of the valid range of indices: [{0} to {max_index}] (inclusive)")
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
        GAME_VARS.can_stack = res[1]
        if(len(effect_stack) == 0 or can_stack(card)):
            # print("adding to effect stack")
            effect_stack.append(card)
    elif(len(effect_stack) > 0):
        res = run_effect(current)
        GAME_VARS.current_player = res[0]
        GAME_VARS.can_stack = True
        for p in range(player_count):
            GAME_VARS.to_draws[p] = res[2][p]
            GAME_VARS.timeouts[p] = res[3][p]
        
        while(len(effect_stack) > 0): effect_stack.pop()
    
    # non effect card
    
    GAME_VARS.current_player = next_player(current)
    return current

def turn():
    card = turn_play()
    if(card > -1):
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
    while(len(hand) > 0):
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
    print(f"Player # {current} wins, I think?")


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

if(False):
    start_game()

else:
    initialize()
    play(cards_per_color*0 + numbers_to_use + 3)
    play(cards_per_color*0 + numbers_to_use + 1)
    print(run_effect(0))

# effect_stack.append(cards_per_color*1 + 2)




