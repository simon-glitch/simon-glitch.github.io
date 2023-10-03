"""CS 108 - Homework 3.1

weird thing on zyBooks; I hate zyBooks!

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

# Directions:
"""
First, check that the user's number is in [0, n].
Second, check that number has not been picked before.
"""

# this takes anywhere from 0 to 4 x parameters
#   x is zyBook's number
def igg(n, x1 = -1, x2 = -1, x3 = -1, x4 = -1):
  n = int(n)
  # strategy: build a string and then return it, since zyBooks is just looking for a particular string anyways
  string = "Enter an odd integer for this game >> "
  if(n % 2 != 1):
    string += f"The input number must be odd. Please start again."
    # these errors are supposed to exit the program
    return string
  
  # make our list
  #   this actually calls __mul__ under the hood
  #   so this is actually the same as list.__mul__([False], n+1)
  taken = [False] * (n+1)
  
  
  xn = [int(x1), int(x2), int(x3), int(x4)]
  
  string += f"The agreed odd integer is {n}\n"
  for i in range(4):
    string += f"Your turn: enter an uncalled integer between 0 and {n} inclusive >> "
    # get the "current" number
    x = xn[i]
    if(x < 0 or x > n):
      string += "Your number is larger than the agreed odd integer. You lose!"
      # these errors are supposed to exit the program
      break
    else:
      if(taken[x]):
        string += "Your number has been called before. You lose!"
        # these errors are supposed to exit the program
        break
      # x^1 means "(x) bitwise xor (1)", not "(x) to the power of (1)"
      else:
        mine = x^1
        string += f"Mine is {mine}\n"
        taken[x] = True
        taken[mine] = True
  
  # remove the newline at the end of the string, if there is one
  #   apparently zyBooks doesn't like it :( *shrug*
  if(string[-1] == "\n"):
    string = string[:-1]
  
  return string

# this handles zyBook's weirdness
def zyBook(ur_function):
  parameters = []
  ok = True
  while (ok):
    try:
      # input() gets zybook's "get request" as actual parameters
      parameters.append(input())
    except:
      ok = False
  
  print(ur_function(*(tuple(parameters))))

zyBook(igg)



