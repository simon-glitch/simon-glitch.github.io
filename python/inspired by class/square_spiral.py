"""CS 108 - Lab/Homework 1.1

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

import turtle
import math

t = turtle.Turtle()
t.speed(0)

# functions for making color
def scale(v, s, tolist = False):
  def sf(v):
    return v * s
  r = map(sf, v)
  if(tolist):
    r = list(r)
  return r
def shift(v1, v2, tolist = False):
  def sf(v1, v2):
    return v1 + v2
  r = map(sf, v1, v2)
  if(tolist):
    r = list(r)
  return r
def lerp(v1, v2, t, tolist = False):
  r = shift(scale(v1, 1-t), scale(v2, t))
  if(tolist):
    r = list(r)
  return r
def rgb(r,g,b):
  return scale((r,g,b), 1/255, True)

teal = rgb(0, 191, 111)

def spiral(radius = 20, spiral_count = 10, stroke_width = 2, l_color = teal):
  # for some reason, the defaults above don't trigger for values like 0 and None. You have to literally have no params for them to trigger.
  radius       = radius       or 20
  spiral_count = spiral_count or 10
  stroke_width = stroke_width or 2
  l_color      = l_color      or teal
  t.home()
  t.width(stroke_width)
  t.color(l_color)
  for i in range(spiral_count):
    t.forward(radius * (2* i +1))
    t.left(90)
    t.forward(radius * (2* i +1))
    t.left(90)
    t.forward(radius * (2* i +2))
    t.left(90)
    t.forward(radius * (2* i +2))
    t.left(90)
  return "DONE!"

r = int(input("what radius do want to see between individual sprial layers?") or 0)
sc = int(input("how many spiral layers should we draw?") or 0)
sw = int(input("what stroke width should we use? (stoke width is how thich the turtle lines are)") or 0)
do_rgb = int(input("do you want to use a custom color (input anything to say yes, input nothing to say no)?") or 0)
c = teal
if(do_rgb):
  print("the color is formatted in rgb, on a scale of 0 to 255")
  cr = int(input("input r value for the color: "))
  cg = int(input("input g value for the color: "))
  cb = int(input("input b value for the color: "))
  print("using color: rgb({0},{1},{2})".format(cr,cg,cb))
  c = rgb(cr,cg,cb)

spiral(r, sc, sw, c)


