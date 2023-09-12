"""CS 108 - Lab/Homework 1.1

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

mc = input("mountain character: ")
ms = input("mountain size: ")
ms = int(ms)

for i in range(ms):
  print((" " * (ms - i +1)) +(mc * (i +1)))

