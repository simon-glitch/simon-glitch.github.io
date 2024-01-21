
# What is this?
This is a text file describing how the JavaScript classes in my Minewsweeper project interact with eachother (and what functionality they create).

Everything with a "TODO" label is delayed for future work. I don't want to overstress myself with too much work immediately.

# Design
display
    canvas
        draw cells
    html (TODO)
        `mine count tracker`
        general `tile count tracker` (has it's own menu)
            number of each tile
            number of clusters of a certain size composed of a certain tile

interaction
    keyboard controls
        w-a-s-d to move
        r for sure flag
        f for unsure flag
        c for sure clear
        x for unsure clear (not very useful)
        i to open the `mine/tile count tracker`
    mouse controls
        left click to sure clear
            shift + left click => unsure clear
            alt + left click => right click
        right click to sure flag
            shift + righr click => unsure flag
            alt + right click => left click

events
    trigger cell
        sure flag
        unsure flag
        sure clear (open)
        unsure clear
    trigger number
        right click OR r OR f => auto flag
        left click OR x OR c => auto clear

game
    external (TODO)
        saves (of previous games)
        history (mistakes made in past games)
    player
        lives
        mistakes
    

