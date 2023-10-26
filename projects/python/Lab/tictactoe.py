

import datetime
dt = datetime.datetime



width = 3
height = 3
cell_c = width * height
players = 2
enums = players + 1
perms = enums ** cell_c

def next_state(state: tuple[int, ...]) -> tuple[int, int]:
  new_state = [0] * cell_c
  carry = 1
  i = 0
  while(i < cell_c):
    val = carry + state[i]
    if(val >= enums):
      val = 0
      carry = 1
    else:
      carry = 0
    
    new_state[i] = val
    i += 1
  
  return tuple(new_state)

winners = [0] * perms
played = [0] * perms
checked = [False] * perms
states = [(0,) * cell_c]

def calc_score(state: tuple[int, ...], player: int) -> int:
  def ii(ix,iy):
    return iy*width + ix
  
  ri = 0
  
  iy = 0
  while(iy < height):
    ix = 0
    while(ix < width):
      if(state[ri] != player):
        ri += 1
        ix += 1
        break
      rem_width = width - ix - 1
      rem_height = height - iy - 1
      # check horizontal in a row
      maxd = rem_width
      inarow = 0
      while(inarow < maxd):
        if(state[ii(ix + inarow, iy)] != player):
          break
        inarow += 1
      
      if(inarow >= 3):
        return 1
      
      # check vertical in a row
      maxd = rem_height
      inarow = 1
      while(inarow < maxd):
        if(state[ii(ix, iy + inarow)] != player):
          break
        inarow += 1
      
      if(inarow >= 3):
        return 1
      
      # check diagonal (down, right) in a row
      maxd = min(rem_height, rem_width)
      inarow = 1
      while(inarow < maxd):
        if(state[ii(ix + inarow, iy + inarow)] != player):
          break
        inarow += 1
      
      if(inarow >= 3):
        return 1
      
      # check diagonal (up, right) in a row
      maxd = min(iy, rem_width)
      inarow = 1
      while(inarow < maxd):
        if(state[ii(ix + inarow, iy - inarow)] != player):
          break
        inarow += 1
      
      if(inarow >= 3):
        return 1
      
      ri += 1
      ix += 1
    iy += 1

def best(state: tuple[int, ...], player: int) -> tuple[int, int]:
  i = states.index(state)
  if(checked[i]):
    return (played[i], winners[i])
  
  j = 0
  moves_tested = 0
  best_found = (0,0)
  while(j < cell_c):
    if(state[j]):
      j += 1
      continue
    new_state = list(state)
    new_state[j] = player
    new_state = tuple(new_state)
    input("[press enter to step]")
    print("state:", new_state)
    print("best move found (grid_pos_index, player_index):", best_found, sep="\n  ")
    
    # check for instant win
    score = calc_score(new_state, player)
    if(score):
      best_found = (j, player)
      break
    
    # check for future win, by considering the enemy's move
    play = best(new_state, 3 - player)
    ni = states.index(new_state)
    checked[ni] = True
    played[ni] = play[0]
    winners[ni] = play[1]
    
    # check to see if player will win in the future
    score = (play[1] == player)
    if(score):
      best_found = play
      break
    
    # default to the first valid move
    if(not best_found[1]):
      best_found = play
      # don't break because we still need to check all other valid moves
    
    moves_tested += 1
    j += 1
  
  # if(moves_tested == 0):
  #   raise Exception("too many moves!")
  
  return best_found


t1 = dt.now()


i = 0
while(i < perms):
  states.append(next_state(states[-1]))
  i += 1

t2 = dt.now()

print("Took " + str((t2 - t1).total_seconds()) + " seconds.")

print(best((0,) * cell_c, 1))


