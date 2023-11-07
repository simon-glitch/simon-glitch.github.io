
# these are sets of ints, for simplicity
# these could be any ordered list[int]
# there will never be dupes, so set is really just tacked on here for semantic reasons
hand: set[int] = set()
discard: set[int] = set()

all_piles = [hand, discard]

# nearly empty class; could be any kind of object
# the only reason this class has methods is to make it look pretty in print statements
class Card:
    id = -1
    def __str__(self): return f"Card #_{self.id}"
    def __repr__(self) -> str: return str(self)

card = Card()

# this is immutable
cards = tuple([card])

# this determines where cards are
where_cards: list[int] = [0]

def initialize():
    i = 0
    l = len(where_cards)
    while(i < l):
        v = where_cards[i]
        c = cards[i]
        all_piles[v].add(i)
        c.id = i
        i += 1

def move(card_i: int, to_i: int, from_i: int = None):
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
    print(f"Game State:\n\
    hand:      {hand},\n\
    discard:   {discard}\n\
    all_piles: {all_piles}\n\
    cards:     {cards}\n\
    where_cards:  {where_cards}\n\
~~~~")

initialize()

report()

move(0, 1)

report()


