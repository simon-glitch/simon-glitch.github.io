# these are sets of ints, for simplicity
# these could be any ordered list[int]
# there will never be dupes, so set is really just tacked on here for semantic reasons
hand: set[int] = set()
discard: set[int] = set()

all_piles = [hand, discard]

# empty class; could be any kind of object
# could be Card = obj
class Card: pass

card = Card()

# this is immutable
cards = tuple([card])

# this determines where cards are
where_cards = [0]

def move(card_i, to_i, from_i = None):
    """
    move card at card index from pile of index to pile of another index
    
    returns the card index you gave it
    """
    
    old_from_i = where_cards[card_i]
    
    # convenient bug-proofing!
    if(from_i != None):
        if(old_from_i != from_i):
            raise RangeError(f"expected card @ index: {card_i} to be located in pile # {from_i}, but found that it was actually in pile # {old_from_i}")
    
    # effectively move the card
    all_piles[old_from_i].remove(card_i)
    all_piles[to_i].add(card_i)
    where_cards[card_i] = to_i
    
    return card_i

def report():
    print(f"Game State:\
    hand: {hand},\
    discard: {discard}\
    all_piles: {all_piles}\
    cards: {cards}\
    where_cards: {where_cards}\
~~~~")

report()

move(0, 1)

report()

