"""CS 108 - Lab/Homework 1.2

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""


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


# the function f(x) is which number we pick in response to Rocky's number
#   Rocky gives us the current number
#     let's call that x
def f(x, n):
  return x^1

# here is another solution to the integer guessing game
def f_other(x, n):
  return n-x


# returns bool: whether {name} lost
def validate(name, x, n, taken):
  if(x < 0 or x > n-1):
    print(name + f" LOST, because {x} is outside of the range [0, n-1];")
    return False
  if(taken[x]):
    print(name + f" LOST, because {x} has already been taken;")
    return False
  return True


def rocky_choose(n):
  return math.floor(random.random()*n)

# returns bool: whether someone lost
def play(n, taken):
  n = len(taken) -1
  rocky_x = rocky_choose(n)
  
  # game complete check
  allt = True
  for i in range(n):
    allt = allt and taken[i]
  if(allt):
    return "won"
  
  # Rocky choose!
  while(taken[rocky_x]):
    rocky_x = rocky_choose()
  print(f"Rocky chose {rocky_x}")
  # Rocky loses if this number was already taken
  if(not validate("Rocky", rocky_x, n, taken)):
    return "lost"
  taken[rocky_x] = True
  
  # You choose!
  # input("pick your number (press Enter)");
  go = True
  while(go):
    your_n = input(f"choose your number (must be between 0 and {n-1} inclusive) in response: ") # f(rocky_x, n)
    
    # error checking!
    if(len(your_n) == 0):
      print("Syntax Error!")
      print("you didn't input anything! Please input something next time.")
      continue
    try:
      your_n = float(your_n)
    except:
      print("Syntax Error!")
      print("your input was not a valid number (in Python)")
      continue
    if(your_n > n-1):
      print("Range Error!")
      print("you value is too large!")
      continue
    if(your_n < 0):
      print("Range Error!")
      print("you value is too small!")
      continue
    if(your_n % 1 > 0):
      print("TypeError!")
      print("you value is not a whole number!")
      continue
    your_n = int(your_n)
    go = False
  
  print(f"you chose {your_n}")
  # you lose if this number was already taken
  if(not validate("you", your_n, n, taken)):
    return "lost"
  
  taken[your_n] = True
  
  # only returns if nether loss condition was met
  return "ongoing"


# now just play the game
def play_game():
  n = input("choose n for the game")
  n = float(n)
  if(n % 1 > 0):
    print("Range Error!")
    print("n must be an integer!")
    return "eek!"
  n = int(n)
  if(n % 2 < 1):
    print("Range Error!")
    print("n must be an odd nunmber!")
    return "eek!"
    
  taken = [False] * (n+1)
  
  for i in range(40):
    state = play(n, taken)
    return "good job\n  EXIT"
    if(state == "lost"):
      return "someone lost!"
    if(state == "won"):
      return "finished successfully!"

print(play_game())



