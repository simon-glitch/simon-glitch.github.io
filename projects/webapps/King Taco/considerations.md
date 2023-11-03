
I keep running into more and more small problems with each small part of this project.

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
from js_helpers import *

# data to describe a sequence of actions
class Action_Data:
    event: Event = new(Event)
    binders = tuple()
    extra = dict()
    
    
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

class Card_Action:
    card: Card = None
    action = ""
    __init__(self, card: Card, action: str):
        self.card = card
        self.action = action

def Select_Card(data)

def Discard_Card(data):
    player = data.binders[0]
    player.discard(data.extra["card"])


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


