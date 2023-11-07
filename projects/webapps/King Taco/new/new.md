# Rethinking My Code
Oftentimes, when programming, I am required to rethink an algorithm from scratch. This happens whenever I have a lot of complex functions and objects. With this project, I have **already** run into the issue, before even testing any of my code. I know testing and debugging are important, but I need to understand my own code 1st!

So, instead of going into detail about the original code, I will instead try to explain my thought process on that the new code should be like.

## Goals
We want to be able to support some basic actions in our card game. For now, I will revert to extreme simplicity, just so I can wrap my head around what I am doing.

There exists a player, which will not even be represented by an object.

There also exists an empty pile, which can simply contain a card.

Finally, there exists a single card, which does nothing and can be placed within 1 of 2 containers:
* the player's hand, which IS represented, by a list
* the discard pile, which IS represented, by a list

I will avoid classes and paradigm-like programming at all costs, just to keep the code as simple as it possibly can be.

```py
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
```


