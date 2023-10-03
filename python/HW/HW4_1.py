
"""CS 108 - Homework 3.1

a choose b - aka Pascal's triangle, which is obviosuly an isosceles triangle

@author: Simon, the Infinibouros King (saw52)
@date: fall, 2023
"""


import math

def choose(a :int, b :int):
  # edge cases
  if(a < b): return 0
  if(a * b == 0): return 1
  if(b == 1): return a
  
  # swap b such that it is as small as possible
  if(b > a/2): b = a - b
  # (a choose b) = prod (a-b +1 ... a) / prod(1 ... b)
  d = a - b

  # f is the factors of (a choose b)s
  f = [0] * b
  
  # d is the divisors
  g = [0] * b
  
  # put the initial factors in
  i = d
  for j in range(b):
    f[j] = (i + 1)
    g[j] = (j + 1)
    i += 1
  
  r = 1
  k = 0
  for i in range(b):
    r *= f[i]
    while (k < b):
      if(r % g[k] == 0):
        if ((type(r) is int) and not (type(r // g[k]) is int)):
          print(f"Math Error !: {r} / {g[k]} is not an int, even tho {r} % {g[k]} is 0!")          
        r = r // g[k]
      else:
        break
      k += 1
  
  if(k < b):
    print(f"Math Error !: could not divide factors {k+1} up to {b} out of r = {r}!")
  
  return r

# I use fix to make the rows have the same width and be centered such that the result is an isoscoles triangle;
def fix(text :str, length :int, filler :str=" ") -> str:
  switch_sides = True
  while(len(text) < length):
    if(switch_sides):
      text = filler + text
    else:
      text = text + filler
    switch_sides = not switch_sides
  return text


def pascal(layer_count, transform = None):
  # initialization
  layers = [[""]] * layer_count
  rll = range(layer_count)

  # get base row text
  for i in rll:
    layers[i] = [""] * i
    for j in range(i):
      layers[i][j] = choose(i,j)
  
  # transform numbers with custom transform function, because, why not?
  if(transform):
    for i in rll:
      for j in range(i):
        layers[i][j] = transform(layers[i][j])
  
  for i in rll:
    for j in range(i):
      layers[i][j] = str(layers[i][j])
  
  # calculate width of the widest number
  maxnumlen = 0
  for i in rll:
    for j in range(i):
      maxnumlen = max(maxnumlen, len(layers[i][j]))

  # add an extra space, for readability
  maxnumlen += 1

  # force all numbers to have ^^ that width
  for i in rll:
    for j in range(i):
      layers[i][j] = fix(layers[i][j], maxnumlen)

  # combine numbers into rows
  for i in rll:
    layers[i] = "|".join(layers[i])

  # calculate width of widest row
  maxlen = 0
  for i in rll:
    maxlen = max(maxlen, len(layers[i]))

  # force all rows to correct width
  for i in rll:
    layers[i] = fix(layers[i], maxlen)

  # combine rows!
  string = "\n".join(layers)
  
  return string

print(pascal(input("how many rows of pascal's triangle do you want")))

print(pascal(20, lambda x: x % 3))

# a = int(input("a = "))
# b = int(input("b = "))
# print("a choose b =", choose(a,b))



