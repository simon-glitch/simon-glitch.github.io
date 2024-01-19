
# What is this?
This is a text file describing how the JavaScript classes in my Minewsweeper project interact with eachother (and what functionality they create).

Everything with a "TODO" label is delayed for future work. I don't want to overstress myself with too much work immediately.

# Design
display
    canvas
        draw cells
    html (TODO)
        mine count tracker
        general tile count tracker (has it's own menu)
            number of each tile
            number of clusters of a certain size composed of a certain tile

interaction
    keyboard controls
        w-a-s-d to move
        r for sure flag
        f for unsure flag
        c for sure clear
        x for unsure clear (not very useful)

