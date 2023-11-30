# Report 1

## Summary
I keep running into more and more small problems with each small part of this project.

So, in this document I will try to describe the various problems. I will do this while showing my problem-solving thought process. I will also try to be short, and not waste your time.

## Discard Prompt Example
Let's look at `prompt_discard` to see what I mean:

```py
    def prompt_discard(self, amount: int):
        print(f"Choose up to {amount} cards to discard.")
        print("enter a number to consider a card for discard; the number is the index of that card within your hand;")
        print("* enter nothing when you are done")
        
        i = 0
        while(i < amount):
            n = ""
            if(i > 0):
                print(f"* to discard: {amount - i} more card!")
            while True:
                n = input("* number (int) or nothing: ")
                if(not n):
                    return
                try:
                    n = int(n)
                    break
                except:
                    print(f"'{n}' is not a valid integer! Try again.")
                    continue
            
            print(f"... card {n}:\n" + self.hand[n].card.__str__("    | "))
            c = input("... confirm discard (enter [y] to confirm):\n    | ")
            if(c == "y"):
                self.discard(self.hand[n].open())
```

There are multiple parts to this function:
* initial prompt explaining how to interact with number prompts
* loop that can be exited with empty input
    * set-up to discard one card
        * msg telling how many are left
        * plus error checking
        * confirm discard

I feel like each of these parts can, and SHOULD be broken down. Also, I should try to make this into an event based system as soon as possible.

Solution: make a Prompt function!
```py
"""
Prompt uses action_data class to carry information from each callback to the next
* a given callback is only given action_data as a parameter
* callbacks should therefore be of the form:
    def callback(data):
        ...

`data` is formatted as such:
data: Action_Data = {
    event: Event (event from the last event listener trigger)
    binders: list[function] (the binders that were originally handed to Prompt)
    fun: FUn (the Fun object that this is meant to be used in)
} 
"""


def Prompt(binders, head_callbacks, loop_callbacks):
    if(not isinstance(binders, tuple)):
        binders = (binders,)
    h_fun = Fun(binders, head_callbacks[0])
    i = 1
    while(i < len(head_callbacks)):
        h_fun.then(head_callbacks[i])
    
    l_fun = Fun(binders, loop_callbacks[0])
    i = 1
    while(i < len(loop_callbacks)):
        l_fun.then(loop_callbacks[i])
    Loop_Prompt(l_fun)

```

The prompt function relies on multiple classes:
```py
# data to describe a sequence of actions
class Action_Data:
    event: Event = new(Event)
    binders = tuple()
    extra = dict()
    
    

class Card_Action:
    card: Card = None
    action = ""
    __init__(self, card: Card, action: str):
        self.card = card
        self.action = action

def Select_Card(data):
    ...

def Discard_Card(data):
    player = data.binders[0]
    player.discard(data.extra["card"])

```

And here is how we would actually use the prompt function:
```py
# in player.prompt_discard
Prompt(
    (player, action),
    [Prompt_Header],
    [
        Select_Card,
        Pre_Display_Card,
        Confirm_Action,
        Discard_Card
    ]
)

```



## Why though?
The reason I went through the `discard_prompt` example is that I can predict ahead of time that I will have to reuse the code from that example a lot. I will want to make all of the interfaces super clear to the player, and the `discard_prompt` example shows what I mean by clarity. I want to make sure the player knows:
* which cards are being acted on
* when they are being acted on
* how they are being acted on
* and why they are being acted on

Answering the fundamental questions of {which, when, how, why} is super imortant. In fact, {answering those questions} is essentially the definition of {being clear} or {providing clarity}.

Now then, what else do we need to do? Welp, I think it is important that I list which all effects will be included in this game:
* draw
* cook (essentially, playing a card)
* discard (getting rid of card, without actually playing it)
* summon (putting a Crepeture in a Pen)
* dismiss (discarding a Crepeture)
* show (putting a banner card face-up on the table, so other players can see it)
* activate (triggering the effect of a {banner or group of banners})
* insert (putting a card into the special garden deck)
* shuffle (shuffling a face-down deck)
* swap hands
* swap decks (I don't think this would actually make much sense)
* scan discard (look at cards in the discard pile)
* see secrets [ADVANCED FEATURE] (see memorized information about groups of hidden cards, such as {other player's hands, or decks})
* organize (organize (or rearrange) {the cards in one's own hand, or even the player's personal display of the discard pile})

So, I have a lot of different actions I gotta program in. And you might notice that these could (in theory) have different parameters. I am going to make it so they all have the same parameters, for my own convenience. This means I will want to make my own fancy type-checker. Yippee!

### And
I just realized that I will probably want to add:
* a card_selection class,
* a hand_display class,
* a card display class,
* a possible_options class,
* and a deck_display class.

Ah, that is a lot of OOP shenanigans.


## Future Plans
I am hoping that I will be able to reuse the code from this project in other card-game projects of mine in the future. In particular, I would like to make:
* Blackjack (that should be super easy)
* Super Uno (my own game, heavily inspired by Uno)
* Cities Deal (my own game, heavily inspired by Monopoly Deal)
* a clone of Inscryption's card battle mini-game
* a clone of Exploding Kittens



## ==== End ==== ##



