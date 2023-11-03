from js_helpers import *
from base import *
from player import *


"""
==== General Event Handling Classes ====
"""

# data to describe a sequence of actions
class Action_Data:
    event: Event = new(Event)
    sourceElement: HTMLElement = None
    eventType: str = None
    binders = tuple()
    extra = dict()
    def __init__(
        self,
        event: Event = None,
        binders: tuple = None,
        extra: dict = None
    ):
        if(event   != None): self.event   = event
        if(binders != None): self.binders = binders
        if(extra   != None): self.extra   = extra

class Fun:
    callbacks: list[function] = []
    action_data: Action_Data = None
    index: 0
    def __init__(
        self,
        action_data: Action_Data = None,
        callbacks: list[function] = []
    ):
        if(action_data != None): self.action_data = action_data
        if(callbacks != None): self.callbacks = callbacks
    def next(self, e: Event):
        d = self.action_data
        
        # remove event listener
        d.sourceElement.removeEventListener(
            d.eventType,
            self.callbacks[self.index](d)
        )
        
        d.event = e
        self.callbacks[self.index](d)
        
        # add new event listener
        # we make a new event listener each step in order to allow our callbacks to change the event type and the source element as we go. This allows for complex behavior involving chains of mulitiple types of events!
        self.index += 1
        if(self.index < len(self.callbacks)):
            d.sourceElement.addEventListener(
                d.eventType,
                self.callbacks[self.index](d)
            )
        
        return d
    def listen(self, element: HTMLElement, eventType: str):
        element.addEventListener(eventType, self.next)


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

def Loop_Prompt(fun: Fun, element: HTMLElement, eventType: str):
    end_i = len(fun.callbacks) - 1
    end_f = fun.callbacks[end_i]
    def loop(data):
        end_f = 0
        fun.index = 0
    fun.callbacks[end_i] = loop

def Prompt(
        binders: tuple | Any,
        element: HTMLElement = None,
        eventType: str = None,
        head_callbacks: list[function] | function = None,
        loop_callbacks: list[function] | function = None
    ):
    if(not isinstance(binders, tuple)):
        binders = (binders,)
    if(not isinstance(head_callbacks, list)):
        head_callbacks = [head_callbacks]
    if(not isinstance(loop_callbacks, list)):
        loop_callbacks = [loop_callbacks]
    
    if(element == None):
        raise TypeError("Prompt is missing required keyword argument `element`!")
    if(eventType == None):
        raise TypeError("Prompt is missing required keyword argument `eventType`!")
    if(head_callbacks == None):
        raise TypeError("Prompt is missing required keyword argument `head_callbacks`!")
    if(loop_callbacks == None):
        raise TypeError("Prompt is missing required keyword argument `loop_callbacks`!")
    
    AD = Action_Data(None, binders, {})
    h_fun = Fun(AD, head_callbacks)
    l_fun = Fun(AD, loop_callbacks)
    
    h_fun.listen(element, eventType)
    h_fun.callbacks.append(
        lambda d: Loop_Prompt(l_fun)
    )
    return AD


"""
==== Python Terminal Event Setup ====
"""

# I am not going to use a custom element for this, since that is just not necessary
terminal = document.createElement("textarea")
enterEvent = new(Event, "keydown", {"key": "Enter", "code": 28}) # code in hex: 0x001C

og_input = input
def input(prompt: str = ""):
    text = og_input(prompt)
    terminal.value = text
    terminal.dispatchEvent(enterEvent)
    return text





"""
==== Cards: Specific Classes ====
"""
class Card_Action:
    card: Card = None
    action = ""
    def __init__(self, card: Card, action: str):
        self.card = card
        self.action = action











"""
==== Card Effects: Specific Classes ====
"""

def Select_Card(data):
    ...

def Discard_Card(data):
    player = data.binders[0]
    player.discard(data.extra["card"])


# in player.prompt_discard
Prompt(
    (player, action),
    terminal,
    "keydown",
    [Prompt_Header],
    [
        Select_Card,
        Pre_Display_Card,
        Confirm_Action,
        Discard_Card
    ]
)



