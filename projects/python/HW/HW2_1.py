"""CS 108 - Lab/Homework 2.1

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

def f(x):
  even = x % 2 == 0
  return x+1 if even else x-1

# this is better
def f_xor(x):
  return x^1

# you can also use a list:
def f_list(x):
  return x + [1, -1][x % 2]

n = input("")

ok = True

try:
  n = int(n)
  if(n < 0 or n % 2 < 1): raise Exception
except:
  ok = False
  print("invalid input!")
  if(type(n) == int):
    if(n % 2 == 0):
      print("the input number must be odd; please start again.")

if(not ok):
  exit(2)

x = input(f"your turn: enter an uncalled integer between 0 and {n} inclusive")

try:
  x = int(x)
  if(x < 0 or x > n): raise Exception
except:
  ok = False
  print("invalid input!")

if(not ok):
  exit(2)


print(f"mine is {f(x)}")
# demonstration: all effects are the same
print(f"= {f_xor (x)}")
print(f"= {f_list(x)}")












