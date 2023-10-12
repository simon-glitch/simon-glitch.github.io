
"""CS 108 - Lab 7.3

why? just why.

@author: Simon Willover (saw52)
@date: Fall, 2023
"""


from turtle import Turtle
from random import randint

# main turtle
t = Turtle()
t.speed(0)

default_color = "black"
t.color(default_color)

# racing turtles
turtle_colors = ("red","orange","yellow","lime","teal","cyan","blue","magenta")
turtle_count = 8
turtles = list(map(lambda x: Turtle(), [0]*turtle_count))
for i,ti in enumerate(turtles):
    ti.color(turtle_colors[i])
    ti.shape("turtle")



def draw_poop_streaks(sx,sy):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    ...
    
def draw_weird_vertical_things(sx, sy, nt, nml, sml, mll):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    for i in range(nt):
        t.penup()
        t.goto(sx,sy)
        t.right(90)
        t.forward(2*mll*i)
        t.left(90)
        t.pendown()
        for j in range(nml):
            t.right(90)
            t.forward(mll)
            t.left(180)
            t.penup()
            t.forward(mll)
            t.right(90)
            t.forward(sml)
            t.pendown()
    ...
    
def draw_useless_text(sx, sy, nt, nml, sml, mll):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    for i in range(nt):
        t.penup()
        t.goto(sx,sy)
        t.forward(nml * (sml + 4))
        t.right(90)
        t.forward(2*mll*i)
        t.color(turtle_colors[i])
        t.write(f"player_{i}", False, "left")
        t.color(default_color)
        t.left(90)
        t.pendown()
    ...
    
def draw_stupid_arrows(sx,sy):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    
    ...
    
def draw_stupid_header(sx,sy):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    
    ...
    
def draw_header_outline_thingy(sx,sy):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    ...
    
def draw_number_row(sx,sy):
    t.penup()
    t.home()
    t.goto(sx,sy)
    t.pendown()
    ...



def draw_racetrack(start_x, start_y, num_marklines, space_marklines, num_tracks, line_len):
    """Draw a race track for the game.

    Parameters
    ----------
    start_x : int
        The x-coordinate of the turtle's starting position

    start_y : int
        The y-coordinate of the turtle's starting position

    num_marklines : int
        The number of the mark lines (e.g., 15 in the code)

    space_marklines : int
        The space between adjacent mark lines (e.g., 20 in the code)

    num_tracks : int
        The number of tracks (e.g., 8 in the code)

    line_len : int
        The length of the vertical line (e.g., 10 in the code)
        The space between two adjacent vertical lines is the same as

    Returns
    -------
    None
    """
    
    draw_poop_streaks(start_x, start_y)
    draw_weird_vertical_things(start_x, start_y, num_tracks, num_marklines, space_marklines, line_len)
    draw_useless_text(start_x, start_y, num_tracks, num_marklines, space_marklines, line_len)
    draw_stupid_arrows(start_x, start_y)
    draw_stupid_header(start_x, start_y)
    draw_header_outline_thingy(start_x, start_y)
    draw_number_row(start_x, start_y)


def setupTurtles(pos):
    for i,p in enumerate(pos):
        ti = turtles[i]
        ti.penup()
        ti.home()
        ti.goto(*p)
        ti.pendown()

dist = 20
setupTurtles(list(zip([0]*turtle_count,range(-dist * turtle_count, 0, dist))))

mll = 10
nml = 10
sml = 10
draw_racetrack(-300,300, nml, sml, turtle_count, mll)

ts = ti.getscreen()
ts.exitonclick()





