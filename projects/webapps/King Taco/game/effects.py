from player import *



myBoard = Board([])
myBoard.players[0].draw()


# first we define each card effect, one by one
def discard_1(player: Player, context):
    player.prompt_discard(1)
    return context

# then we add ALL of the card effects to the card_effects dict
card_effects["discard_1"] = discard_1








