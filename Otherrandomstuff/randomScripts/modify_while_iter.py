
from itertools import *

items = ["A", "B", "C", "D", "E"]



# 
a_iter = items.__iter__()
delayed = False
for item in a_iter:
    if item == "B":
        items.remove(item)
        a = tee(a_iter, 2)
        aa = a[0]
        a_iter = a[1]
        print("?", aa.__next__())
        a_iter = a_iter.__new__()
    else:
        print(item)
