
"""
/* ==
  Script here made by Simon Willover
== */

const choose = function choose(a, b){
  // edge cases
  if(a < b) return 0;
  if(a * b == 0) return 1;
  if(b == 1) return a;
  
  // swap b such that it is as small as possible
  if(b > a/2) b = a - b;
  // (a choose b) = prod (a-b +1 ... a) / prod(1 ... b)
  const d = a - b;

  // f is the factors of (a choose b)s
  const f = new Uint32Array(b);
  
  // d is the divisors
  const g = new Uint32Array(b);
  
  
  // put the initial factors in
  for(let j = 0,i = d; i < a; j++,i++){
    f[j] = (i + 1);
    g[j] = (j + 1);
  }
  
  // check the logarithmic scale of our return value
  let scale = 0;
  for(let i = 0; i < b; i++){
    scale += Math.log2(f[i]) - Math.log2(g[i]);
  }
  // use a bigint if the value doesn't fit into a (safe) 53 bit JavaScript integer under the IEEE-64 float system
  // note to self: modulo does not work on all 51+ bit integers!
  if(scale > 50){
    let r = 1n;
    let k = 0;
    for(let i = 0, j = b-1; i < b; i++, j--){
      r *= BigInt(f[j]);
      for(k; k < b; k++){
        if(r % BigInt(g[k]) === 0n){
          r = r / BigInt(g[k]);
        }
        else break;
      }
    }
    
    if(k < b){
      console.log(`Math Error !: (BigInt version) could not divide factors ${k+1} up to ${b} out of r = ${r}!`)
    }
    
    return r;
  }
  
  let r = 1;
  let k = 0;
  for(let i = 0, j = b-1; i < b; i++,j--){
    r *= f[j];
    for(k; k < b; k++){
      if(r % g[k] == 0){
        r /= g[k];
      }
      else break;
    }
  }

  if(k < b){
    console.log(`Math Error !: could not divide factors ${k+1} up to ${b} out of r = ${r}!`)
  }

  
  // otherwise use the 53 bit integer supported by IEEE-64 floats
  return r;
};

console.log("====");
console.log("31 choose 12 =", choose(31, 12));

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

print(pascal(13))

print(pascal(20, lambda x: x % 3))

# a = int(input("a = "))
# b = int(input("b = "))
# print("a choose b =", choose(a,b))



