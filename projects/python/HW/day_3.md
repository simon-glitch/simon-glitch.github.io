
The way Rocky teaches is very new to me. That is the most notable thing to say. I think that the other students have a bit of a hard time understanding him because he is from another culture and thus words things differently than we do. However, as far as actual programming and actual code goes, it should be easy to understand what Rocky is saying as long as he is actually talking about programming.

Here is my code for the integer guessing game:
```py

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

```

And here is my code for the turtle assignment:

```py
# I made input accept multiple parameters!
# this allows getting multiple inouts at once
# I also made a turtle drawer that draws a polygon with n side when DO_POLY is truthy
#   code block written by:
#     Simon Willover

import math
from turtle import Turtle
import numpy as np
# turtle go brrrrrr
t = Turtle()
t.speed(10)

input1 = input
def input(*args):
    msg = list(range(len(args)))
    argerator = iter(args)
    for i in range(len(args)):
        msg[i] = input1(next(argerator))
    if(len(msg) == 1): return msg[0]
    return msg

radius = 100

# this drays a polygon with n sides
# you can also set as_pie to true to make it draw a ring of n triangles
# do_clear simply determines whether we clear the canvas when drawing this
def POLYGON_BOI(n, as_pie, do_clear):
    home()
    n = n or 10
    r = radius
    cx = r
    cy = 0

    t.forward(r)
    if(do_clear): t.clear()
    t.left(90)
    t.left(360/n/2)

    for i in range(n):
        px = cx
        py = cy
        cx = r*math.cos((i+1) * 2*math.pi / n)
        cy = r*math.sin((i+1) * 2*math.pi / n)
        d = ((px-cx)**2 + (py-cy)**2)**0.5
        t.forward(d)
        t.left(360/n)
        if(as_pie):
            t.left(-90)
            t.forward(r)
            t.right(-180)
            t.forward(r)
            t.left(-90)
    
    # the return statement is here just for fun XD
    return "done!"

def CIRCLE_BOI(do_clear):
    # length of each side
    d = 1
    # circumference of a circle with radius r
    #   c = 2 * pi * r
    #   (radius is defined above, before the POLYGON_BOI function)
    # ever heard of tau?
    #   (tau = 2 * pi)
    circumference = math.tau * radius
    # number_of_sides that need to be drawn
    #   for our shape to be indistinguishable from a circle
    number_of_sides = math.ceil(circumference / d)
    # angle = 360 degrees / number_of_sides
    angle = 360 / number_of_sides

    # this code look familiar to you?! XD
    t.forward(radius)
    if(do_clear): t.clear()
    t.left(90)
    t.left(angle/2)
    for i in range(number_of_sides):
        t.forward(d)
        t.left(angle)
    
    return "done!"


sofar = 0
DO_POLY = True
DO_CIRCLE = False
while(DO_POLY):
    print("this program draws a polygon with n sides;")
    c = input("type C to draw a circle instead.")
    if(c == "c" or c == "C"):
        DO_CIRCLE = True
        break
    if(sofar > 0): print("wanna draw again?")
    it = input("what is your n? (how many sides should the polygon have?)")
    
    uhoh = True
    while(uhoh):
        uhoh = False
        if(it == "no"): break
        it = input("TRY AGAIN! what is your n?")
        try:
            it = int(it)
        except:
            uhoh = True
    # break out of loop
    if(it == "no"): break
    
    pie = len(input("draw as pie? (type anything to say yes)")) > 0

    POLYGON_BOI(it, pie, True)
    sofar += 1

if(DO_CIRCLE):
    print("time to draw circle!")
    CIRCLE_BOI(True)

yes = input("type Y to test my custom input() function!")
if(yes == "y" or yes == "Y"):
    (x, y) = input("your x", "your y")
    (x, y) = (float(x), float(y))
    print("abs(x+y i) == ", str((x**2+y**2)**0.5))

    print("----")
    print("now let's combine strings!")
    (x,y) = input("str1", "str2")
    print("str1 + str2 == ", x+y)


```

This sure was a lot of fun to make. I don't really know what to do for the reflection. Sorry about that. I am into programming, so that is kinda the only thing I can do without a detailed prompt.

