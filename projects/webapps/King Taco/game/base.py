
class Card:
    def __init__(self, props) -> None:
        for name in ([
            "name",
            "deck",
            "type",
            "effect",
            "effect_time",
            "play_time",
            "played_at",
            "classes",
            "overrides"
        ]):
            if(name not in props):
                props[name] = None
        
        self.name  :str = props["name"  ]
        self.deck  :str = props["deck"  ]
        self.type  :str = props["type"  ]
        self.effect:str = props["effect"]
        self.effect_time   :str  = props["effect_time"]
        self.play_time     :str  = props["play_time"  ]
        self.played_at     :str  = props["played_at"  ]
        self.classes  :list[str] = props["classes"    ]
        self.overrides:list[str] = props["overrides"  ]
    def __str__(self, line_prefix = ""):
        return (
            "[= " + self.name + " =]:\n" +
            line_prefix +
            "(played on " + self.play_time + ", at " + self.played_at + ")\n" +
            line_prefix +
            "[on " + self.effect_time + "] " +
            self.effect
        )

# container to hold a card
class Slot:
    def __init__(self, type = "pile"):
        self.card: Card = None
        self.type = type
    def open(self):
        card = self.card
        self.card = None
        return card
    def reform(self, new_type: str):
        card = self.open()
        new_slot = Slot(new_type)
        new_slot.card = card
        return new_slot

class Board:
    def __init__(self, slots :list[Slot]) -> None:
        self.slots = slots
        self.piles: list[Pile] = []
        self.players: list[Player] = []
        self.storeroom = Pile("draw")
        self.kitchen   = Pile("cook")
        self.garden    = Pile("discard")
    def pop_slot(self, slot):
        try:
            return self.slots.remove(slot)
        except:
            return None

class Pile:
    def __init__(self, type: str):
        self.type = type
        self.slots: list[Slot] = []
        self.board: Board = None
    def pop(self, index: int):
        slot = self.slots[index]
        self.slots.remove(slot)
        self.board.slots.remove(slot)
        return slot
    def push(self, card: Card):
        slot = Slot(self.type)
        slot.card = card
        self.slots.append(slot)
        return len(self.slots)


PLAYER_NAMES = [
    "Zeus",
    "Ares",
    "Apollo",
    "Hades",
    "Posiedon",
    "Hephaestus",
    "Athena",
    "Sora",
    "Chen",
    "Feng",
    "Bai",
    "Chang",
    "Wei",
    "Hong",
    "Shi",
    "Lin",
    "Ming",
]
PLAYER_NAMES_TAKEN = [False] * len(PLAYER_NAMES)
PLAYER_NAMES_TAKEN_TOTAL = 0
ANON_NAME = ""

class MY_ENUMS:
    def __init__(self):
        self.FRIDGE   = 0
        self.OVEN     = 1
        self.TRASHBIN = 2
ENUMS = MY_ENUMS()

class Pen:
    def __init__(self):
        self.base = Slot("pen-base")
        self.mods: list[Slot] = []
    def add_mod(self, mod: Card):
        mod_slot = Slot("pen")
        mod_slot.card = mod
        self.mods.append(mod_slot)
    def remove_mod(self, mod_slot: Slot):
        self.mods.append(mod_slot)



