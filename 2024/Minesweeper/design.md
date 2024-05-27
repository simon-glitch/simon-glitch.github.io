
# What is this?
This is a text file describing how the JavaScript classes in my Minewsweeper project interact with eachother (and what functionality they create).

Everything with a "TODO" label is delayed for future work. I don't want to overstress myself with too much work immediately.

# Design
display
* canvas
  * draw cells
* html (TODO)
  * `mine count tracker`
  * general `tile count tracker` (has it's own menu)
    * number of each tile
    * number of clusters of a certain size composed of a certain tile

interaction
* data
  * selected cell
    * (keeps track of which cell is currently selected OR was last selected; will default to the "first" cell)
  * is selected
    * whether the selected cell is actually selected
    * *you can use this to toggle selection*
* keyboard controls
  * w-a-s-d to move
    * moves from the current selected cell
  * space bar
    * toggle cell selection
  * r for sure flag
  * f for unsure flag
  * c for sure clear
  * x for unsure clear (not very useful)
  * i to open the `mine/tile count tracker`
* mouse controls
  * left click to sure clear
    * shift + left click => unsure clear
    * alt + left click => right click
  * right click to sure flag
    * shift + righr click => unsure flag
    * alt + right click => left click

events
* select cell
  * *causes highlighting without triggering the cell*
* trigger cell
  * *also selects cell*
  * sure flag
  * unsure flag
  * sure clear (open)
  * unsure clear
* trigger number
  * right click OR r OR f => auto flag
  * left click OR x OR c => auto clear

game
* external (TODO)
  * saves (of previous games)
  * history (mistakes made in past games)
* player
  * lives
  * mistakes
* field
  * has_mine: bool
  * mine_count: int16
  * dim
    * x: float uint
    * y: float uint
    * (NOTE:) x * y should not exceed 2**32, so our pointers only need 32 bits at the most
  * cell: cell_type: string
  * cell: state
    * unsureness: int8
      * 0 means sure
      * 1 or more means unsure
      * each increment beyond 1 is a "layer of hypotheticalization", which can be used by an automatic minesweeper solver
    * flagged: bool
    * clearned: bool
  * cell: neighbors
    * *depends on cell type*
    * type = norm:
      * *no data required, since a normal cell automatically connects to the up to 8 neighbors in a 3x3 around the cell*
    * type = octo:
      * a uint8, where each bit is WHETHER it's connected to the cell immediately in that direction or not
    * type = dimp:
      * a uint8 array, where each item is a {uint 8 relative 2D pointer} to a neighboring cell
    * type = absl:
      * a uint32 array, where each item is an {abolute pointer} to a neighboring cell

{uint 8 relative 2D pointer}
= first 4 bits:
* signed number of tiles in `y` direction
= last 4 bits:
* signed number of tiles in `x` direction
* `0` means that the pointer DNE or is not properly set up (i.e. `0` means `null`)


Other programmers ... don't exist, right? computers are just a weird magic that just exists, right? I'm the only programmer in the world, right? Right? No, that's insanity. I might be losing my sanity now. Maybe I should care a bit less about other people. No, no, no. That's not the solution. I feel so lost! Maybe I should put this in a file ... ugh, no one is going to read this anyways, so who cares?
