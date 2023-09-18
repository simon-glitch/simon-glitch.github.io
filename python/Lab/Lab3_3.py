"""CS 108 - Lab 3.3

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon Willover (saw52)
@author: Kenna Defersha (kdd27)
@date: Fall, 2023
"""

import turtle
import time
import random

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
ts = t.getscreen()

# red, green, yellow, blue, black, and white
reds   = [1, 0, 1, 0, 0, 1]
greens = [0, 1, 1, 0, 0, 1]
blues  = [0, 0, 0, 1, 0, 1]
# you can change the colors really easily

input("seizure warning! close terminal to avoid")
print("wiggle and ziggle are optional parameters; press Enter twice more if you just want to draw the circles normally.")
w = float(input("wiggle (degrees) = ") or 0)
z = float(input("ziggle (pixels) = ") or 0)

print("program sleeps for 2 second, so you have time to switch windows if necessary")
time.sleep(2)

for i in range(200):
    l = len(reds)
    # i % l allows the colors to loop
    t.color(reds[i % l], greens[i % l], blues[i % l])

    # radius of 50 + random within + or - z pixels
    t.width(50 + round(((random.random() * 2) - 1) * z))
    t.circle(100)
    
    # random turning, by + or - w degrees
    turn = round(((random.random() * 2) - 1) * w)
    if(turn > 0): t.left(turn)
    if(turn < 0): t.right(-turn)

# sorry that I can't make this run able in the for loop.

ts.exitonclick()
