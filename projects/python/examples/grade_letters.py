
from js import window

# normal solution

def letter(score):
  grade = ""
  tiny_score = score < 45
  small_score = score < 60
  ok_score = score < 75
  return ("D" if (tiny_score) else "C") if (small_score) else ("B" if (ok_score) else "A")


# simon's solution

import math

minn = 2**-500
g = [minn**2,45,60,75]
gl = "DCBA"

def f(x):
  x = max(minn, x)
  arr = []
  for gi in g:
    arr.append(max(0, min(math.ceil(x/gi) - 1, 1)))
  
  return gl[sum(arr) - 1]

# print(f(int(input("Please input a score in [0, 100] >> Your grade is "))))

window.document.normal_grade = letter
window.document.simon_grade = f



