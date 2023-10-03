
# check for balanced parenthesis
while(True):
  s = input("Type some code; I will you whether your parenthesis are balanced.")
  k = 0
  for i in s:
    k += (1) if (i == "(") else ((-1) if (i == ")") else (0))
    if(k < 0):
      print(f'Unbalanced ")" at index {j}: >>)<<')
      break
    j += 1
  if(k >= 0): print('Balanced' if (k == 0) else 'missing ")"')

