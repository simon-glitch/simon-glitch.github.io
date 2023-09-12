# I made input accept multiple parameters!
# this allows getting multiple inouts at once
# I also made a turtle drawer that draws a polygon with n side when DO_POLY is truthy
#   code block written by:
#     Simon Willover

import math
from turtle import Turtle
import random
# import numpy as np
# turtle go brrrrrr
t = Turtle()
t.speed(0)

input1 = input


def input(*args):
  msg = list(range(len(args)))
  argerator = iter(args)
  for i in range(len(args)):
    msg[i] = input1(next(argerator))
  if (len(msg) == 1): return msg[0]
  return msg


radius = 200


# this drays a polygon with n sides
# you can also set as_pie to true to make it draw a ring of n triangles
# do_clear simply determines whether we clear the canvas when drawing this
def POLYGON_BOI(n, as_pie, do_clear):
  t.home()
  n = n or 10
  r = radius
  cx = r
  cy = 0
  
  t.forward(r)
  if (do_clear): t.clear()
  t.left(90)
  t.left(360 / n / 2)
  
  for i in range(n):
    px = cx
    py = cy
    cx = r * math.cos((i + 1) * 2 * math.pi / n)
    cy = r * math.sin((i + 1) * 2 * math.pi / n)
    d = ((px - cx)**2 + (py - cy)**2)**0.5
    t.forward(d)
    t.left(360 / n)
    if (as_pie):
      t.left(-90)
      t.forward(r)
      t.right(-180)
      t.forward(r)
      t.left(-90)
  
  # the return statement is here just for fun XD
  return "done!"

# my own algorithm for a cirlce
def OLD_CIRCLE_BOI(do_clear):
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
    if (do_clear): t.clear()
    t.left(90)
    t.left(angle / 2)
    for i in range(number_of_sides):
        t.forward(d)
        t.left(angle)

    return "done!"

# note: this is probably what everyone else did XD
def CIRCLE_BOI(do_clear):
  t.circle(radius, 100)

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

cake_color = rgb(255, 203, 59)
crust_color = rgb(171, 109, 9)

def CAKE_BOI(do_clear, slices):
  if(do_clear): t.clear()
  slices = slices or 6
  # one slice at a tome
  
  # draw thick outlined slices
  t.color(crust_color)
  t.fillcolor(cake_color)
  t.width(3)
  for i in range(slices):
    t.begin_fill()
    t.forward(radius)
    t.left(90)
    # draw arc for one slice
    t.circle(radius, 360 / slices)
    # then draw line down
    t.left(90)
    t.forward(radius)
    t.right(180)
    t.end_fill()
  
  texture_color = lerp(cake_color, crust_color, 0.4, True)
  t.fillcolor(texture_color)
  t.color(texture_color)
  
  r = random.random
  min_blobs = 50
  max_blobs = 80
  blob_count = round(min_blobs + r() * (max_blobs - min_blobs))
  min_blob_size = 0.01
  max_blob_size = 0.05
  
  for i in range(blob_count):
    angle  = r() * 360
    dist   = (r() * (1 - max_blob_size * 2)) * radius
    blob_r = (min_blob_size + r() * (max_blob_size - min_blob_size)) * radius
    
    t.penup()
    t.home()
    t.left(angle)
    t.forward(dist + blob_r)
    t.pendown()
    
    t.begin_fill()
    t.circle(blob_r, 360)
    t.end_fill()
  
  t.home()
  
  # draw thin outlines of slices over texture
  t.fillcolor(crust_color)
  t.color(crust_color)
  t.width(1)
  for i in range(slices):
    t.forward(radius)
    t.left(90)
    # draw arc for one slice
    t.circle(radius, 360 / slices)
    # then draw line down
    t.left(90)
    t.forward(radius)
    t.right(180)

    
  return "done!"


sofar = 0
DO_POLY = False
DO_CIRCLE = False
DO_CAKE = True
while (DO_POLY):
  print("this program draws a polygon with n sides;")
  c = input("type C to draw a circle instead.")
  if (c == "c" or c == "C"):
      DO_CIRCLE = True
      break
  if (sofar > 0): print("wanna draw again?")
  it = input("what is your n? (how many sides should the polygon have?)")
  
  uhoh = True
  while (uhoh):
    uhoh = False
    if (it == "no"): break
    it = input("TRY AGAIN! what is your n?")
    try:
      it = int(it)
    except:
      uhoh = True
  # break out of loop
  if (it == "no"):
    break
  
  pie = len(input("draw as pie? (type anything to say yes)")) > 0
  
  POLYGON_BOI(it, pie, True)
  sofar += 1

if (DO_CIRCLE):
  print("time to draw circle!")
  CIRCLE_BOI(True)

if(DO_CAKE):
  CAKE_BOI(False, 16)


"""
yes = input("type Y to test my custom input() function!")
if (yes == "y" or yes == "Y"):
  (x, y) = input("your x", "your y")
  (x, y) = (float(x), float(y))
  print("abs(x+y i) == ", str((x**2 + y**2)**0.5))

  print("----")
  print("now let's combine strings!")
  (x, y) = input("str1", "str2")
  print("str1 + str2 == ", x + y)

"""


