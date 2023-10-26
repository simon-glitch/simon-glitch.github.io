

width = 3
height = 3
cell_c = width * height
players = 2
enums = players + 1
perms = enums ** cell_c

def next_state(state: tuple[int, ...]):
  new_state = [0] * cell_c
  carry = 1
  i = 0
  while(i < cell_c):
    val = carry + state[i]
    if(carry >= enums):
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
states = [(0,0,0)]

i = 0
while(i < perms):
  states.append(next_state(states[-1]))

def best(state, player):
  i = states.index(state)
  if(checked[i]):
    return (played[i], winners[i])
  
  j = 0
  while(j < cell_c):
    if(state[j]): continue
    new_state = list(state)
    new_state[j] = player
    play = best(played[i])

