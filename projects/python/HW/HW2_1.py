"""CS 108 - Homework 2.1

weird thing on zyBooks; I hate zyBooks!

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

# please don't get upset about their being so many comments here. This is a long learning process for me, and I feel a need to describe my thoughts, feelings, and learning process in the comments.

# integer guessing game
#   all of this stress for just 11 lines of code!
#   this doesn't even play the game
#   what on earth?!
#   brooo... ughhh
def igg(n, x = -1, v3 = 0, v4 = 0, v5 = 0):
  n = int(n)
  str = "Enter an odd integer for this game >> "
  # use the % operator :CHECK!
  # use an if-else statement :CHECK!
  if(n % 2 != 1):
    str += f"The input number must be odd. Please start again."
    return str
  # fun fact, you don't need the else!
  else:
    x = int(x)
    str += f"The agreed odd integer is {n}\n"
    if(x >= 0):
      # x^1 means "(x) bitwise xor (1)", not "(x) to the power of (1)"
      str += f"Your turn: enter an uncalled integer between 0 and {n} inclusive >> Mine is {x^1}"
    return str

# this handles zyBook's weirdness
def zyBook(ur_function):
  parameters = []
  ok = True
  while (ok):
    # we need a try-statement because zyBook apparently lets us request too many inputs
    try:
      # input() gets zybook's "get request" as actual parameters
      parameters.append(input())
    except:
      ok = False
  
  # when the except happens, that means there are no more parameters from zyBook
  # and that means that we want to exit the while loop
  # so I set ok to False
  # which exits the while loop
  # now that we are out of the while loop, we know that we have as many parameters as zyBook is willing to give us
  # thus it is time to execute our function
  # tuple just makes the parameters usable
  # and * actually uses them
  # and for some reason, our "output" is supposed to be print?!
  # that makes no sense to me!
  # do not use print as an output, that is just bad programming!
  print(ur_function(*(tuple(parameters))))

zyBook(igg)

# print outputs a response