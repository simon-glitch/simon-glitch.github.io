import turtle as turtle_module
import time

# define objects
turtle = turtle_module.Turtle()
screen = turtle.getscreen()

# get input
print("(how far should the turtle travel?)")
distance = int(input("distance: "))

# delay 500 ms = 0.5 seconds
time.sleep(500)

# execute commands
turtle.hideturtle()
turtle.speed(1)
turtle.forward(distance)
screen.exitonclick()