import random
import time
t1 = time.time()
k = 0
t = 231
s = 4**t - 1
for i in range(1000*1000):
    l = 0
    m = random.randint(0, s)
    while (m > 3):
        l += not (m & 3)
        m >>= 2
    k = max(l, k)
    if(not i % 1000): print(i//1000, k)
t2 = time.time()

print(k)
print("took", t2 - t1, "seconds")
