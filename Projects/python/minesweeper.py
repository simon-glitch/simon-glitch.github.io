
# Minesweeper
#   implementation by Simon Willover
#   ui implemented
#     using print() and inout() in Python

import math
import random
import datetime
import sys

null = 0
won  = 1
lost = 2



# python requires quotes in its objects
class Field:
  def __Init__(self):
    return


field = Field()
field_d = {
  "width": 22,
  "height": 12,
  "mine_proportion": 0.2,
  "mine_count": 0,
  "has_mine": ([[False]]),  # booleans: whether each square has a mine
  "hints": [
    [0]
  ],  # numbers: the number of mines neighboring each square (including itself)
  "discovered":
  [[False]],  # booleans: whether each square has been discovered
  "flagged":
  [[False]
    ],  # booleans: whether each square has been flagged (in strict mode)
  # "scanned":
  # [[False]
  #   ],  # booleans: whether each square has been scanned in check_zero() funciton
  "strict_mode":
  True,  # boolean: whether the player is allowed to inccoretly flag non-mine tiles
  "cursor": [0, 0],
  "clear_so_far": 0,
  "state": null,
}

# give me my expected behavior!
for i in field_d:
  setattr(field, i, field_d[i])


def num_str(n, l):
  n = str(n)
  ll = len(n)
  ll = (l - ll) / 2
  left = math.ceil(ll)
  right = math.floor(ll)
  for i in range(left):
    n = " " + n
  for i in range(right):
    n = n + " "
  return n


# p is the size of the population
#   returns a simple random sample, as n distinct indices between 0 and p-1 (inclusive)
def srs(p: int, n: int):
  chosen = [False] * p
  if n > p / 2:
    inverse = srs(p, n - p)
    for i in range(p):
      chosen[i] = not inverse[i]

  def gr():
    return math.floor(random.random() * p)

  r = gr()
  for i in range(n):
    while chosen[r]:
      r = gr()
    chosen[r] = True

  return chosen


def make_grid(filler, width: int, height: int):
  row = [filler] * width
  grid = [row] * height
  for i in range(height):
    # this slices a clone of the row
    grid[i] = row[::]
  return grid


# these optional parameters are remembered each time the function is called
def new_game(
    mine_proportion: float = field.mine_proportion,
    width: int = field.width,
    height: int = field.height
  ):
  mine_count = int(mine_proportion * width * height)
  field.mine_count = mine_count
  field.width = width
  field.height = height

  has_mine = [False] * (width * height)
  l = len(has_mine)

  new_mines = srs(l, mine_count)
  for i in range(l):
    has_mine[i] = new_mines[i]

  # I will make a recursive version of that in the future,
  #   in order to have n~dimensional minesweeper!
  #   but we'll do just 2 dimensions for now~.

  # first, let's convert the list of tiles into a grid
  mine_grid = make_grid(False, width, height)
  j = 0
  for i in range(height):
    for ii in range(width):
      mine_grid[i][ii] = has_mine[j]
      j += 1
  field.has_mine = mine_grid

  # now let's count mines neighboring each tile
  hints = make_grid(0, width, height)
  for i in range(height):
    for ii in range(width):
      # top
      if i > 0:
        # top left
        if ii > 0:
          hints[i][ii] += int(mine_grid[i - 1][ii - 1])
        # top center
        if True:
          hints[i][ii] += int(mine_grid[i - 1][ii])
        # top right
        if ii < width - 1:
          hints[i][ii] += int(mine_grid[i - 1][ii + 1])

      # center
      if True:
        # top left
        if ii > 0:
          hints[i][ii] += int(mine_grid[i][ii - 1])
        # top center
        if True:
          hints[i][ii] += int(mine_grid[i][ii])
        # top right
        if ii < width - 1:
          hints[i][ii] += int(mine_grid[i][ii + 1])

      # right
      if i < height - 1:
        # top left
        if ii > 0:
          hints[i][ii] += int(mine_grid[i + 1][ii - 1])
        # top center
        if True:
          hints[i][ii] += int(mine_grid[i + 1][ii])
        # top right
        if ii < width - 1:
          hints[i][ii] += int(mine_grid[i + 1][ii + 1])

  discovered = make_grid(False, width, height)
  field.discovered = discovered
  field.hints = hints
  field.flagged = make_grid(False, width, height)

  return mine_grid


def display():
  height = field.height
  width = field.width
  remaining = field.mine_count
  for i in range(height):
    for ii in range(width):
      remaining -= int(field.discovered[i][ii] and field.has_mine[i][ii])
  print(f"{remaining} mines remaining:")

  def p_row(i, row_has, row_hint, row_discovered, width):
    row_s = ""
    for ii in range(width):
      row_ss = ""
      on_cursor = (i == field.cursor[0]) and (ii == field.cursor[1])
      row_ss += ("<") if on_cursor else (" ")
      row_ss += (
          (" ? ") if (not row_discovered[ii]) else (
            ("-M-") if
            (row_has[ii]) else num_str(row_hint[ii], 3)
          )
        )
      row_ss += (">") if on_cursor else (" ")
      row_s += row_ss
    # remove the 2 spaces at the front
    row_s = "[" + (row_s[::]) + "]"
    return row_s

  for i in range(height):
    print("| " + p_row(
      i, field.has_mine[i], field.hints[i],
      field.discovered[i], width)
    )

  return "done!"


def move_cursor(dim_index: int, dist: int):
  dims = [field.width, field.height]
  dim_max = dims[dim_index]
  current = field.cursor[dim_index]
  current += dist
  current = min(dim_max - 1, current)
  current = max(0, current)
  field.cursor[dim_index] = current


def check_win():
  width = field.width
  height = field.height
  valid_flags = True
  all_flags = False
  all_cleared = True

  # check to see that every flag IS valid
  for i in range(height):
    for ii in range(width):
      a = field.flagged[i][ii]
      b = field.has_mine[i][ii]
      # valid_flags &= a !^ b
      valid_flags = valid_flags and (((not a) and (not b)) or (a and b))

  if not valid_flags:
    return False

  # check to see that every non-mine tile is clear
  for i in range(height):
    for ii in range(width):
      a = field.flagged[i][ii]
      b = field.discovered[i][ii]
      c = field.has_mine[i][ii]
      all_cleared = all_cleared and ((c if a else b) or ((not c) and b))

  if all_cleared:
    return True

  # check to see that every mine has been flagged / discovered
  for i in range(height):
    for ii in range(width):
      a = field.flagged[i][ii]
      b = field.discovered[i][ii]
      c = field.has_mine[i][ii]
      all_flags = all_flags and ((a or b) if c else True)

  return all_flags


def clear_zeros():
  width  = field.width
  height = field.height
  hints  = field.hints
  discovered = field.discovered

  scanned = make_grid(False, width, height)

  needs_cleared = []

  def clear_at(i,ii,testing):
    if(not testing):
      discovered[i][ii] = True
    # print(f"i: {i}, ii: {ii}, hint: {hints[i][ii]}, discovered: {discovered[i][ii]}, scanned: {scanned[i][ii]}")
    # print(f"(hints[i][ii] > 0) and (discovered[i][ii]) and (scanned[i][ii])\n== {(hints[i][ii] > 0) and (discovered[i][ii]) and (scanned[i][ii])}")
    if (((hints[i][ii] > 0) and (discovered[i][ii])) or (scanned[i][ii])):
      return False
    # scanned prevents infinite loop!
    scanned[i][ii] = True
    # top
    if i > 0:
      # top left
      if ii > 0:
        needs_cleared.append((i - 1, ii - 1, False))
      # top center
      if True:
        needs_cleared.append((i - 1, ii    , False))
      # top right
      if ii < width - 1:
        needs_cleared.append((i - 1, ii + 1, False))

    # center
    if True:
      # center left
      if ii > 0:
        needs_cleared.append((i    , ii - 1, False))
      # center right
      if ii < width - 1:
        needs_cleared.append((i    , ii + 1, False))

    # bottom
    if i < height - 1:
      # bottom left
      if ii > 0:
        needs_cleared.append((i + 1, ii - 1, False))
      # bottom center
      if True:
        needs_cleared.append((i + 1, ii    , False))
      # bottom right
      if ii < width - 1:
        needs_cleared.append((i + 1, ii + 1, False))
    return True
  

  for i in range(height):
    for ii in range(width):
      needs_cleared.append((i, ii, True))
  
  # this while loop allows us to use needs_cleared.append to avoid recursion.
  while(len(needs_cleared) > 0):
    i = len(needs_cleared) - 1
    clear_at(*needs_cleared[i])
    needs_cleared.pop()

losable = True

max_tries = 10_000

def force_zero(pos: list):
  width = field.width
  height = field.height
  tries = [0]
  def valid(run, pos):
    far = ((abs(run[0] - pos[0]) < 2) and (abs(run[1] - pos[1]) < 2))
    empty = (not field.has_mine[run[0]][run[1]])
    return (far and empty)
  def find():
    def gen():
      run = [0,0]
      run[0] = math.floor(random.random() * height)
      run[1] = math.floor(random.random() * width)
    run = gen()
    while (not valid(run)):
      run = gen()
      tries[0] += 1
      # don't infinite loop!
      if(tries[0] > max_tries):
        print(f"tried to find a empty mine position, but somehow failed {tries[0]} times in a row!")
        break
    return run
  
  for i0 in range(3):
    j0 = pos[0] + i0
    if(j0 < 0 or j0 > height):
      continue
    for i1 in range(3):
      j1 = pos[1] + i1
      if (j1 < 0 or j1 > height):
        continue
      if (field.has_mine[j0][j1]):
        field.has_mine[j0][j1] = False
        run = find()
        j0 = run[0]
        j1 = run[1]
        field.has_mine[j0][j1] = True



def check_lose(s: str):
  c = field.cursor
  mine = field.has_mine[c[0]][c[1]]
  clear = field.discovered[c[0]][c[1]]
  flagged = field.flagged[c[0]][c[1]]
  marked = clear or flagged
  strict_mode = field.strict_mode
  width = field.width
  height = field.height

  print(f"mine: {mine}, clear: {clear}, flagged: {flagged}, marked: {marked}")

  if check_win():
    field.state = won
    print("Congradulations! You won!!!")
    field.discovered = make_grid(True, width, height)
    field.flagged = make_grid(False, width, height)

  # if we already won or lost, then don't bother with the other settings
  if field.state != null:
    clear = True
    marked = True
  
  if(s == "C" or s == "-"):
    field.clear_so_far += 1
  if not marked:
    if (s == "c"):
      if (field.clear_so_far == 1):
        force_zero(field.cursor)
        # the if statement below will actually trigger and automatically clear this tile and the neighboring tiles!
        mine = False
      if (mine and losable):
        print("You lost (because you guessed wrong and exploded)!")
        print(f"({c[0]}, {c[1]}) was a mine!")
        field.discovered = make_grid(True, width, height)
        field.state = lost
      if (not mine):
        field.discovered[c[0]][c[1]] = True
    if (s == "-"):
      if not strict_mode:
        field.flagged[c[0]][c[1]] = True
      if mine:
        field.discovered[c[0]][c[1]] = True
      if (not mine) and strict_mode and losable:
        print("You lost (because you guessed wrong)!")
        print(f"({c[0]}, {c[1]}) was not a mine!")
        field.discovered = make_grid(True, width, height)
        field.state = lost
  # let the player unflag a tile if they are not in strict mode
  if ((not clear) and marked and (not strict_mode) and (s == "-")):
    field.flagged[c[0]][c[1]] = False

def play_turn():
  s = input(
    "type u,d,l,r to move; type c to clear tile; type `-` to flag tile; type p to reset (play a new game); type e to exit"
  )
  if (s == "e"):
    return False
  if (s == "u"):
    move_cursor(0, -1)
  if (s == "d"):
    move_cursor(0, 1)
  if (s == "l"):
    move_cursor(1, -1)
  if (s == "r"):
    move_cursor(1, 1)
  if (s == "p"):
    new_game()
  
  # let the player actually PLAY the game
  check_lose(s)

  try:
    clear_zeros()
    if(check_win()):
      field.state = won
      width = field.width
      height = field.height
      field.discovered = make_grid(True, width, height)
      field.scanned = make_grid(True, width, height)
      field.flagged = make_grid(False, width, height)
      win = "Congratulations! You won!!!"
      print("-" * len(win))
      print(win)
      print("=" * len(win))
  except:
    0
  display()

  now = datetime.datetime.now()
  print(now.strftime("%m/%d/%Y, %H:%M:%S"))

  return True


if input("type `p` to play~") == "p":
  new_game()
  display()

  playing = True
  while playing:
    playing = play_turn()


