# Game of Nim: There are multiple (k) piles of coins. 2 players take turns removing coins from the piles. On a given player's turn, the player may pick a pile to remove coins from, and then remove 1 or more coins from that pile.

import sys


# I have solved the game for k = 2:

"""
f -> [index, value, state]
* [index] is the index of which pile to take coins from
* [value] is the number of coins to remove from that pile
* [state] is whether the current player will win if this is currently their turn
"""
def f2(i,j):
  if (i < j):
    r = f(j,i)
    r[0] = 1 - r[0]
    return r
  if (j == 0 and i == 0):
    raise Exception("the game is already finished!")
  if (i == j):
    return [0, i, False]
  return [0, i - j, True]

# Ok, I figured out a much better algorithm for the game
"""
If [s.0,s.1,s.2] is winnable by removing n from s.i, then:
  l = 3
  ss = [s.0,s.1,s.2]
  # ss is winnable
  new_ss = ss[:]
  new_ss[i] += n
  # the new_ss is also winnable

This means we can generalize our memory, so it's based on which stack we are drawing from:
mem = [
  [1 stacks],
  [2 stacks],
  [3 stacls]: [
    ... [games where we take form stack i]: [
      [stack i > j]: [
        i,
        [stack 1's value]: [
          ... [stack 2's value]: [
             ... [ideal move]: [IMPLIED: taking from stack i, k: how many to take (BASE) - player should actually take k + j from stack i - if k is 0, then this is a losing game],
          ],
        ],
      ],
    ],
  ],
]
  
"""



# I am not sure how to handle the game for a higher number of dimensions though, other than just using recursion

f_mem = []
def f(stacks):
  l = len(stacks)
  ll = list(range(l))
  
  # make sure we have memory to support l-dimensions
  while(len(f_mem) < l):
    f_mem.append([])
  curr_layer = f_mem[l - 1]
  mem_layers = [curr_layer]
  
  # scan through mem layers until as an l-dimensional list
  for k in ll:
    # build up mem_layers until it has l-dimensions
    while(len(curr_layer) <= stacks[k]):
      curr_layer.append([])
    curr_layer = curr_layer[stacks[k]]
    mem_layers.append(curr_layer)
  
  # this is extremely clever memorization
  if (len(curr_layer) > 0):
    return curr_layer
  
  # find the largest stack ...
  max_index = 0
  max_value = stacks[max_index]
  for i in ll:
    if(stacks[i] > max_value):
      max_value = stacks[i]
      max_index = i
  # start by assuming we will lose
  # if we are gonna lose, we may as well take as many items as we can, since we are guaranteed to lose no matter what
  r = [max_index, max_value, False]
  # had , stacks[::]]
  
  all_zero = True
  non_zero_index = -1
  for i in ll:
    if(stacks[i] > 0):
      if(non_zero_index < 0):
        non_zero_index = i
      else:
        all_zero = False
  
  if(all_zero):
    r = [non_zero_index, stacks[non_zero_index], True]
    # had , stacks[::]]
  
  # so, this is a new game we haven't memorized yet?
  if(not all_zero): 
    for i in ll:
      for j in range(1, stacks[i]):
        # make a temporary modification
        stacks[i] -= j
        # just use recursion
        o = f(stacks)
        # undo this modification
        stacks[i] += j
        # if the other player lost, then this (removing j from the i-th stack) is a winning move!
        if(not o[2]):
          r = [i, j, True]
          # had , stacks[::]]
          break
  
  # for debugging
  r.append(stacks[::])
  
  # memorize!
  for v in r:
    curr_layer.append(v)
  
  return r



# player 0 plays first
def play_game(stacks):
  sum = 0
  for height in stacks:
    sum += height
  
  player = 0
  tn = 0
  tn_limit = 100
  while (sum > 0):
    # use [:] for immutability
    play = f(stacks[:])
    # state the current turn number, which player is playing, and what play the current player is hereby making
    win_or_lose = "win" if play[2] else "lose"
    print(f"turn {tn}: player {player} plays: [take {play[1]} items from stack {play[0]}; player {player} will {win_or_lose}],")
    
    # convert stacks into a list of string with fancy syntax
    stack_strings = []
    for i,n in enumerate(stacks):
      stack_strings.append(
        ("s.")  +
        str(i)  +
        (": [") +
        str(n)  +
        ("] ")  +
        ("." * n)
      )
    
    # combine all of the strings for all the stacks
    stacks_string = "\n  " + ("\n  ".join(stack_strings))
    # now print the fancy string we made for the stacks
    print(f"stacks (before the current play): {stacks_string}")
    
    # update variables
    stacks[play[0]] -= play[1]
    player = 1 - player
    sum -= play[1]
    tn += 1
    
    if(tn > tn_limit):
      print(f"loop error: game took more than {tn_limit} turns to complete!")
      return "failure"
  return "done"

play_game([10, 12, 3, 8, 4, 5])



# the size() funciton is just for fun! ~ and kinda for performance testing XD
Function = type(lambda x: x)
Type = type(int)
Module = type(sys)

# size_stack prevents infinite loops
size_stack = []
def size(obj):
  if(obj in size_stack):
    return 0
  size_total = sys.getsizeof(obj)
  
  for i in [type(None), Ellipsis, Type, Module, bool, int, float, complex, str, Exception, Function]:
    try:
      if (isinstance(obj, i)):
        return size_total
    except:
      ...
  if (hasattr(obj, "__getitem__")):
    size_stack.append(obj)
    for i in obj:
      size_total += size(i)
    size_stack.pop()
  
  return size_total

print(f"^ that game took {size(f_mem)} bytes of RAM to play!")

