"""CS 108 - Homework 2.2

draw some cake, I guess...

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""

import turtle
import random

# don't forget to initialize your turtle XD
t = turtle.Turtle()
# I can pick any turtle speed
#   im going with MAX, since I like going fast
t.speed(0)
# we don't have to hide turtle until AFTER it draws the cake

ts = t.getscreen()

# first, I have a small library of vector transform functions
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
# ^ I kinda wrote this just for fun, but it is handy for changing the colors of the cake

# here I can easily change the cake's color pallete
cake_color = rgb(255, 203, 59)
crust_color = rgb(171, 109, 9)

# radius is the uhh radius of the cake, obviously
radius = 200

def CAKE_BOI(do_clear, slices):
  if(do_clear): t.clear()
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
  
  # I want texture, ok?
  texture_color = lerp(cake_color, crust_color, 0.4, True)
  t.fillcolor(texture_color)
  t.color(texture_color)
  
  # I use "blobs" (additional circles on the cakes upper suface) in order to create the illusion of texture and add some realism (and tastiness) to my cake.
  
  # r is just a shorthand
  r = random.random
  # we will even randomize the number of blobs, bc why not?
  min_blobs = 20
  max_blobs = 30
  blob_count = round(min_blobs + r() * (max_blobs - min_blobs))
  # these are constants for randomizing the blob size
  min_blob_size = 0.06
  max_blob_size = 0.10
  
  for i in range(blob_count):
    # let's randomize the blob's location
    angle  = r() * 360
    dist   = (r() * (1 - max_blob_size * 2)) * radius
    # let's ALSO randomize the size! why not?
    blob_r = (min_blob_size + r() * (max_blob_size - min_blob_size)) * radius
    
    # gotta recenter the turtle
    # don't want him flying off who-knows where now!
    t.penup()
    t.home()
    # now let's move over to where we want to draw our blob (for texture)
    t.left(angle)
    t.forward(dist + blob_r)
    t.pendown()
    
    t.begin_fill()
    t.circle(blob_r, 360)
    t.end_fill()
  
  # gotta recenter the turtle
  # don't want him flying off who-knows where now!
  t.penup()
  t.home()
  t.pendown()
  
  # draw thin outlines of slices over texture
  t.fillcolor(crust_color)
  t.color(crust_color)
  # THIN lines; we don't want to just draw over our blobs with crust lines
  # I am intentionally making the lines on the texture blobs thinner than the rest of the lines
  t.width(1)
  
  # just reward the slices; maybe I should make a draw_slice_outlines() method for this?
  for i in range(slices):
    t.forward(radius)
    t.left(90)
    # draw arc for one slice
    t.circle(radius, 360 / slices)
    # then draw line down
    t.left(90)
    t.forward(radius)
    t.right(180)
  
  # disappear after drawing the object
  t.hideturtle()
  
  # we do have to ensure that screen can be closed with 1 click at any time though. I don't understand why you ask for that though ... why not just use alt + f4, or just click the close button in the top right corner?
  # it is NOT possible to have exitonclick while the turtle is busy drawing
  #   that causes a TclError
  ts.exitonclick()
  
  # do we need a return? No, but it's not hurting anyone being here!
  # I always forget return statements when I need them, so I am making an effort to always include a return statement, if possible.
  return "done!"

# don't forget to actually run your function
CAKE_BOI(False, int(input("So, how many slices should I draw?\n  Oh, by the way: the colorless wheels on zyBooks are NOT cakes.\n  I added color and texture to mine, in spirit of the description.\n  I hope you are OK with that.\n")))



