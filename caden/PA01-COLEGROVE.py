"""#########################################

   Shapes Project thing, horayy! 
   
#########################################"""

#‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾#
#           LE IMPORTS           #
#________________________________#

import graphics as gr
import sys
import random
import time
from enum import Enum
import math

#‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾#
#    CONFIG & GLOBAL VARIABLES   #
#________________________________#

# ------ Window Perameters ----- #

win_title = 'PA01'
win_bgcolor = gr.color_rgb(155,155,155)
win_width = 1200
win_height = 720

# ------ Shape Perameters ------ #

ShapeData = {
    'Triangle' : {
        'Color' : gr.color_rgb(0,0,255),
        'Dimensions' : 50,
        'P1' : 50,
        'P2' : 50
        },
    'Circle' : {
        'Color' : gr.color_rgb(0,255,0),
        'Dimensions' : 25,
        'P1' : 300,
        'P2' : 300
    },
    'Square' : {
        'Color' : gr.color_rgb(255,0,0),
        'Dimensions' : 40,
        'P1' : 50,
        'P2' : 300
    }
}

LineS1 = ShapeData['Square']['P1'] # Square X
LineS2 = ShapeData['Square']['P2'] # Square Y
LineC1 = ShapeData['Circle']['P1'] # Circle X
LineC2 = ShapeData['Circle']['P2'] # Circle Y
LineT1 = ShapeData['Triangle']['P1'] # Triangle X
LineT2 = ShapeData['Triangle']['P2'] # Triangle Y
Line1 = gr.Point(LineS1, LineS2)
Line2 = gr.Point(LineC1, LineC2)
Line3 = gr.Point(LineT1, LineT2)

#‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾#
#           FUNCTIONS            #
#________________________________#

# ------ Creates the window ------ #

def WindowStart():
    win = gr.GraphWin(win_title,win_width,win_height)
    win.setBackground(win_bgcolor)
    return win

# ------ Creates Square ------ #

def CreateRectangle(given_window):
    global rect
    rect = gr.Rectangle(gr.Point(ShapeData['Square']['P1'], ShapeData['Square']['P2']), gr.Point(ShapeData['Square']['P1'] + ShapeData['Square']['Dimensions'], ShapeData['Square']['P2'] + ShapeData['Square']['Dimensions']))
    rect.setFill(ShapeData['Square']['Color'])
    rect.undraw()
    rect.draw(given_window)
    return rect

# ------ Creates Circle ------ #

def CreateCircle(given_window):
    global ellip
    ellip = gr.Circle(gr.Point(ShapeData['Circle']['P1'], ShapeData['Circle']['P2']), ShapeData['Circle']['Dimensions'])
    ellip.setFill(ShapeData['Circle']['Color'])
    ellip.undraw()
    ellip.draw(given_window)
    return ellip

# ------ Creates Triangle ------ #

def CreateTriangle(given_window):
    global tri
    tri = gr.Polygon(gr.Point(ShapeData['Triangle']['P1'], ShapeData['Triangle']['P2']), gr.Point(ShapeData['Triangle']['P1'] + ShapeData['Triangle']['Dimensions'], ShapeData['Triangle']['P2']), gr.Point(ShapeData['Triangle']['P1'] + ShapeData['Triangle']['Dimensions'] / 2, ShapeData['Triangle']['P2'] - ShapeData['Triangle']['Dimensions']))
    tri.setFill(ShapeData['Triangle']['Color'])
    tri.undraw()
    tri.draw(given_window)
    return tri

# ------ Moving ------ #

def Processing(given_window):
    global Selection
    ShapeSelect(given_window, gr.color_rgb(0,0,0))
    Selection = None
    while True:
        Key = given_window.checkKey()
        match Key:
            case 'r':
                if Selection == None:
                    Selection = 1
                    rect.setFill(gr.color_rgb(255,100,100))
                    ShapeSelect(given_window, gr.color_rgb(255,0,0))
                elif Selection == 1:
                    Selection = 2
                    rect.setFill(gr.color_rgb(255,0,0))
                    ellip.setFill(gr.color_rgb(150,255,150))
                    ShapeSelect(given_window, gr.color_rgb(0,255,0))
                elif Selection == 2:
                    Selection = 3
                    ellip.setFill(gr.color_rgb(0,255,0))
                    tri.setFill(gr.color_rgb(100,100,255))
                    ShapeSelect(given_window, gr.color_rgb(0,0,255))
                elif Selection == 3:
                    tri.setFill(gr.color_rgb(0,0,255))
                    Selection = None
                    ShapeSelect(given_window, gr.color_rgb(0,0,0))
            case 'Up':
                if Selection == 1:
                    L1.undraw()
                    rect.move(0,-10)
                if Selection == 2:
                    L1.undraw()
                    ellip.move(0,-10)
                if Selection == 3:
                    tri.move(0,-10)
                    L1.undraw()
                if Selection != None:
                    Lines(given_window, 'Up')
                    tri.undraw()
                    ellip.undraw()
                    rect.undraw()
                    tri.draw(given_window)
                    ellip.draw(given_window)
                    rect.draw(given_window)
            case 'Down':
                if Selection == 1:
                    L1.undraw()
                    rect.move(0,10)
                if Selection == 2:
                    L1.undraw()
                    ellip.move(0,10)
                if Selection == 3:
                    L1.undraw()
                    tri.move(0,10)
                if Selection != None:
                    Lines(given_window, 'Down')
                    tri.undraw()
                    ellip.undraw()
                    rect.undraw()
                    tri.draw(given_window)
                    ellip.draw(given_window)
                    rect.draw(given_window)
            case 'Left':
                if Selection == 1:
                    L1.undraw()
                    rect.move(-10,0)
                if Selection == 2:
                    L1.undraw()
                    ellip.move(-10,0)
                if Selection == 3:
                    L1.undraw()
                    tri.move(-10,0)
                if Selection != None:
                    Lines(given_window, 'Left')
                    tri.undraw()
                    ellip.undraw()
                    rect.undraw()
                    tri.draw(given_window)
                    ellip.draw(given_window)
                    rect.draw(given_window)
            case 'Right':
                if Selection == 1:
                    L1.undraw()
                    rect.move(10,0)
                if Selection == 2:
                    L1.undraw()
                    ellip.move(10,0)
                if Selection == 3:
                    L1.undraw()
                    tri.move(10,0)
                if Selection != None:
                    Lines(given_window, 'Right')
                    tri.undraw()
                    ellip.undraw()
                    rect.undraw()
                    tri.draw(given_window)
                    ellip.draw(given_window)
                    rect.draw(given_window)
            case 'o':
                L1.undraw()
            case 'q':
                quit(0)
        
    return

# ------ Lines ----- #

def Lines(given_window, Direction):
    
    global L1
    
    global ShapeData
    
    if Direction == 'Up':
        if Selection == 1:
            ShapeData['Square']['P2'] -= 10
        if Selection == 2:
            ShapeData['Circle']['P2'] -= 10
        if Selection == 3:
            ShapeData['Triangle']['P2'] -= 10
    if Direction == 'Down':
        if Selection == 1:
            ShapeData['Square']['P2'] += 10
        if Selection == 2:
            ShapeData['Circle']['P2'] += 10
        if Selection == 3:
            ShapeData['Triangle']['P2'] += 10
    if Direction == 'Left':
        if Selection == 1:
            ShapeData['Square']['P1'] -= 10
        if Selection == 2:
            ShapeData['Circle']['P1'] -= 10
        if Selection == 3:
            ShapeData['Triangle']['P1'] -= 10
    if Direction == 'Right':
        if Selection == 1:
            ShapeData['Square']['P1'] += 10
        if Selection == 2:
            ShapeData['Circle']['P1'] += 10
        if Selection == 3:
            ShapeData['Triangle']['P1'] += 10
            
    LineS1 = ShapeData['Square']['P1'] # Square X
    LineS2 = ShapeData['Square']['P2'] # Square Y
    LineC1 = ShapeData['Circle']['P1'] # Circle X
    LineC2 = ShapeData['Circle']['P2'] # Circle Y
    LineT1 = ShapeData['Triangle']['P1'] # Triangle X
    LineT2 = ShapeData['Triangle']['P2'] # Triangle Y
    Line1 = gr.Point(LineS1, LineS2)
    Line2 = gr.Point(LineC1, LineC2)
    Line3 = gr.Point(LineT1, LineT2)

    

    Distance(Line3, Line1, Line2)

    if LineS1 > LineT1 and LineC1 > LineT1:
        LineT1 += ShapeData['Triangle']['Dimensions']
    elif LineS1 > LineT1:
        LineT1 += ShapeData['Triangle']['Dimensions']
    elif LineC1 > LineT1:
        LineT1 += ShapeData['Triangle']['Dimensions']
        
    Line1 = gr.Point(LineS1, LineS2)
    Line2 = gr.Point(LineC1, LineC2)
    Line3 = gr.Point(LineT1, LineT2)
    
    L1 = gr.Polygon(Line1, Line2, Line3)
    
    
    L1.undraw()
    
    L1.draw(given_window)
    
    return

# ------ Selection Circle ----- #

def ShapeSelect(given_window, Color):
    circle2 = gr.Circle(gr.Point(5, 5), 5)
    circle2.setFill(Color)
    circle2.undraw
    circle2.draw(given_window)
    
    return

# ------ Distance Equating ----- #

def Distance(TPT, SPT, CPT):
    
    # Triangle :: Left, Right, Top || Square :: TLeft, TRight, BRight, BLeft
    
    # Triangle Left
    D1 = formula(TPT.getX(), SPT.getX(), TPT.getY(), SPT.getY())
    TLSTL = D1
    
    D1 = formula(TPT.getX(), SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY(), SPT.getY())
    TLSTR = D1
    
    D1 = formula(TPT.getX(), SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY(), SPT.getY() + ShapeData['Square']['Dimensions'])
    TLSBR = D1
    
    D1 = formula(TPT.getX(), SPT.getX(), TPT.getY(), SPT.getY() + ShapeData['Square']['Dimensions'])
    TLSBL = D1
    
    # Triangle Right
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'], SPT.getX(), TPT.getY(), SPT.getY())
    TRSTL = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'], SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY(), SPT.getY())
    TRSTR = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'], SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY(), SPT.getY() + ShapeData['Square']['Dimensions'])
    TRSBR = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'], SPT.getX(), TPT.getY(), SPT.getY() + ShapeData['Square']['Dimensions'])
    TRSBL = D1
    
    # Triangle Top
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'] / 2, SPT.getX(), TPT.getY(), SPT.getY())
    TTSTL = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'] / 2, SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY() - ShapeData['Triangle']['Dimensions'], SPT.getY())
    TTSTR = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'] / 2, SPT.getX() + ShapeData['Square']['Dimensions'], TPT.getY() - ShapeData['Triangle']['Dimensions'], SPT.getY() + ShapeData['Square']['Dimensions'])
    TTSBR = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'] / 2, SPT.getX(), TPT.getY() - ShapeData['Triangle']['Dimensions'], SPT.getY() + ShapeData['Square']['Dimensions'])
    TTSBL = D1
    
    # Triangle Circle
    
    D1 = formula(TPT.getX(), CPT.getX(), TPT.getY(), CPT.getY())
    TLCC = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'], CPT.getX(), TPT.getY(), CPT.getY())
    TRCC = D1
    
    D1 = formula(TPT.getX() + ShapeData['Triangle']['Dimensions'] / 2, CPT.getX(), TPT.getY() - ShapeData['Triangle']['Dimensions'], CPT.getY())
    TTCC = D1
    
    # Square Circle
    
    D1 = formula(SPT.getX(), CPT.getX(), SPT.getY(), CPT.getY())
    STLCC = D1
    
    D1 = formula(SPT.getX() + ShapeData['Square']['Dimensions'], CPT.getX(), SPT.getY(), CPT.getY())
    STRCC = D1
    
    D1 = formula(SPT.getX() + ShapeData['Square']['Dimensions'], CPT.getX(), SPT.getY() + ShapeData['Square']['Dimensions'], CPT.getY())
    SBRCC = D1
    
    D1 = formula(SPT.getX(), CPT.getX(), SPT.getY() + ShapeData['Square']['Dimensions'], CPT.getY())
    SBLCC = D1
    
    # Comparing
    
    
    
    if TRSTL < TRSTR and TRSBR and TRSBL:
        if TRCC < TRSTL:
            Code = 1
        else: 
            Code = 2
        
    Code = 1
    # Debug
    
    print(TRSTL)
    print(TRSTR)


    return Code

# ------ Distance Formula ----- #

def formula(X2, X1, Y2, Y1):
    
    # Distance = sqrt|(x2 - x1)^2 + (y2 - y1)^2
    
    X11 = X2 - X1
    Y11 = Y2 - Y1
    X12 = X11 ** 2
    Y12 = Y11 ** 2
    XY = X12 + Y12
    Dis = math.sqrt(XY)
    
    return Dis


#‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾#
#             MAIN               #
#________________________________#

def main():
    
    win = WindowStart()
    
    
    Lines(win, None)
    CreateRectangle(win)
    CreateCircle(win)
    CreateTriangle(win)

    Processing(win)
    
    win.getMouse()
    win.close()

    sys.exit(0)


if __name__ == "__main__":
    main()
    
'''
Testing around with this, It works but its so unoptomised or my computer is just slow
Its using an entire GB of ram XD
'''