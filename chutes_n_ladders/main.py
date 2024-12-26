
import numpy as np
import scipy as sp


# chutes and ladders is a game of pure chance,
# so this program creates a probability matrix to advance the game 1 turn
# players don't affect eachother, so the matrix is intended to multiplied by a single vector
# where that vector is 1 player;
# the values of the vector are the probabilities of the player landing on any 1 tile

# the number of spaces to climb
spaces = 100
# the number of sides on the die or values on the spinner
die = 6
# chance of your player being on any given tile
# player[i] is the chance that your player is on tile "i"
player = [0 for i in range(spaces)]
# let's start at the first tile
player[0] = 1
# number of turns to make
turn_count = 100

# the chutes and ladder on the board
# each is represented as a tuple: (int start, int end)
# start is the index of the square the player that it moves the player from
#   i.e. the square the player needs to land on in order to use it
# end is the index of the square the chute or ladder goes to
# the order of these doesn't matter
# chutes or ladders can share the same end points, but not the same start points
# if one chute or ladder ends where another begins, the player will only be able to use one on a given turn

chutes_n_ladders = [
    ( 4, 14),
    (12, 20),
    (18, 33),
    (21, 32),
    (40, 52),
    (45, 67),
    (53, 65),
    (83, 94),
    (37,  6),
    (42, 23),
    (62, 15),
    (80, 74),
    (92, 71),
    (99, 85),
]

# advance forward 1 to [die] spaces from every tile
turn = [[
    1/die if (
        j < i and i < j + die + 1
    ) else 0
for j in range(spaces)] for i in range(spaces)]

# copy the turn map, so we can modify it properly
new_turn = [[
    turn[i][j]
for j in range(spaces)] for i in range(spaces)]

# use the chutes and ladders to modify the turn map
for cr in chutes_n_ladders:
    c = (cr[0] - 1, cr[1] - 1)
    for i in range(spaces):
        # just check if each square can land on the source
        # and if it does, then USE the chute or ladder
        # that means GO TO the destination, from the source
        new_turn[c[1]][i] += new_turn[c[0]][i]
        # and LEAVE the source
        new_turn[c[0]][i] = 0

turn = new_turn

# force players near the end of the board rolling high values that would move them off the board to wait until they roll a lower value; this means the player needs to get the exact roll to land on the last space
# these players aren't forced to run down a chute if they start at the start of one for some reason
for i in range(spaces - die, spaces):
    turn[i][i] += (1 + i + die - spaces) / die

# for testing:
# np.savetxt("turn.txt", turn, fmt='%1.2f')

print(np.array(player))
print(turn_count, "turns")

# print((np.linalg.matrix_power(turn, turn_count) @ np.array(player)) * 100)
mt = np.array(turn)
mp = np.array(player)
# for i in range(turn_count):
#     mp = mt @ mp
#     total = np.sum(mp)
#     mp /= total

def f(m):
    return str(round(m * 100, 6)) + "%"

def join(mp, j = ", "):
    s = ""
    if(not mp): return s
    s += mp[0]
    for m in mp[1:]: s += j + m
    return s

print(join([f(m) for m in (
    sp.linalg.fractional_matrix_power(
        mt, turn_count
    ) @ mp
)]))

