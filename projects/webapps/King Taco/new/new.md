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

```


## Actions and Events
Before, I tried to do a bunch of fancy stuff with my own classes for `Action`s and `Event`s. Now, I still want to have a cool handler for that, but I don't want to overcomplicate it. At the end of the day, linking together player actions is not all that complex.

We can handle the current event loop for the game with an event track, made of stacks. An event stack is a list of nested pieces of events, much like how a function stack works. The even track is a list of stacks which are essentially happening in parallel. Why not just use the built-in call stack? Well, the built in call stack uses multiple things that we just don't need:
* parameters
* return values
* scopes

We really don't need function calls that don't happen in the global scope. The idea of a "card game" is (fundamentally) not that complex. So, we are really simplifying things by using our own call stack.

Here is what a typical stack will look like (for a card game):
```
Game Round:
> Player Turn
| > Cooking Stage
| | > Trigger Cards in Hand
| | | > Cook Card
| | | | > Confirm Cook
```

Coding thing this way allows me to easily debug what is currently happening and see the bigger picture.

### Types
As you saw in my code earlier, I used list indices to represent values instead of copying values directly. I will continue to do that throughout the program from now on. Whenever I would normally use an object as a parmater, I will use a global index to refer to that object instead. This way, I can ensure that everything is accessible throughout the code.


