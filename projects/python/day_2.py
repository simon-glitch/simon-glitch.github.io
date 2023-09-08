
# Code for integer guessing game

import math
import random

# Apparently, Python doesn't really have global variables
# when a variable is used in a lower FUNCTION scope,
#   it has to be used as a constant within higher FUNCTION scopes
# higher FUNCTION always use parameters outside their range as globals
#   I could create an object, like `state`
#     and use that as a container for global variables, but why bother?
# the more you know, I guess!
# I guess I learned something today!
n = 20
taken = [False] * n


# the function f(x) is which number we pick in response to Rocky's number
#   Rocky gives us the current number
#     let's call that x
def f(x):
    return x^1

# here is another solution to the integer guessing game
def f_other(x):
    return n-x


# returns bool: whether {name} lost
def validate(name, x):
    if(x < 0 or x > n-1):
        print(name + f" LOST, because {x} is outside of the range [0, n-1];")
        return True
    if(taken[x]):
        print(name + f" LOST, because {x} has already been taken;")
    return False


def rocky_choose():
    return math.floor(random.random()*n)

# returns bool: whether someone lost
def play():
    rocky_n = rocky_choose()
    allt = True
    for i in range(n):
        allt = allt and taken[i]
    if(allt):
        print("Fatal Error!")
        print("all possible universes have lost!")
        return True
    while(taken[rocky_n]):
        rocky_n = rocky_choose()
    print(f"Rocky chose {rocky_n}");
    # Rocky loses if this number was already taken
    if(not validate("Rocky", rocky_n)):
        return True
    
    taken[rocky_n] = True
    # input("pick your number (press Enter)");
    your_n = f(rocky_n)
    print(f"you chose {your_n}");
    # you lose if this number was already taken
    if(not validate("you", your_n)):
        return True
    
    taken[your_n] = True
    
    # only returns if nether loss condition was met
    return False


# now just play the game
def play_game():
    for i in range(40):
        lost = play()
        if(lost):
            return "someone lost!"

play_game()

