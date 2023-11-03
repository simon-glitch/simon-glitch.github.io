import math
import random
from base import *

# useless in Python?
def coerce(result, source, names):
    worked = []
    for name in names:
        try:
            result[name] = source[name]
            worked += [name]
        except:
            pass
    return ["worked:", worked]


# card effects!
card_effects = {}

class Player:
    def __init__(self, name = ANON_NAME, board: Board = None) -> None:
        PN = PLAYER_NAMES
        PNT = PLAYER_NAMES_TAKEN
        # give player a random name if non is specified
        if(name == ANON_NAME):
            n = len(PNT) - PLAYER_NAMES_TAKEN_TOTAL
            r = random.random()
            m = math.floor(r * n)
            i = 0
            j = 0
            while(j < m):
                if(not PNT[i]):
                    j += 1
                i += 1
            name = PN[i - 1]
            PNT[i - 1] = True
        # make sure there are no duplicate names
        # add name to PLAYER_NAMES if it is a new name
        else:
            if(name in PN):
                if(PNT[PLAYER_NAMES.index(name)]):
                    raise NameError(name + " is already TAKEN!")
            else:
                PN.append([name])
                PNT.append([True])
        
        self.name = name
        self.hand: list[Slot] = []
        self.pen = Pen()
        if(not board):
            raise TypeError("Player's board argument is not optional! A board must be specificied for every player!")
        if(not isinstance(board, Board)):
            raise TypeError("Player's board argument must be of type Board! I can't just use any random object!")
        self.board = board
        self.fridge   = self.board.storeroom
        self.oven     = self.board.kitchen
        self.trashbin = self.board.garden
        self.board.players.append(self)
    def draw(
        self,
        which_pile: int = ENUMS.FRIDGE,
        index: int = -1
    ):
        l = [self.fridge, self.oven, self.trashbin]
        l = [l[ENUMS.FRIDGE], l[ENUMS.OVEN], l[ENUMS.TRASHBIN]]
        pile = l[which_pile]
        if(index < 0):
            index += len(pile.slots)
        drawn_slot = pile.pop(index)
        self.hand.append(drawn_slot)
    def summon(
        self,
        crepeture: Slot
    ):
        sp = self.pen
        cc = crepeture.card
        if(sp.base.card != None):
            raise ValueError("Can not put " + cc.name + " in an occupied pen. There is already a crepture (" + sp.base.card.name + ") in this player's pen (" + self.name + "'s pen)!")
    def cook(
        self,
        card: Card
    ):
        self.fridge.push(card)
        self.run_effect(card)
    def discard(
        self,
        card: Card
    ):
        self.transhbin.push(card)
        self.run_effect(card)
    def run_effect(self, card: Card, context = None):
        return card_effects[card.name](self, context)
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
        






