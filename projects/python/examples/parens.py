
# check for balanced parenthesis
def check(s):
  k = 0
  for j,i in enumerate(s):
    k += (1) if (i == "(") else ((-1) if (i == ")") else (0))
    if(k < 0): return f'Unbalanced ")" at index {j}: >>)<<'
  return 'Balanced' if (k == 0) else 'missing ")"'

print(1,check("()")) # T
print(2,check("(")) # f
print(3,check(")")) # f
print(4,check(")()")) # f
print(5,check("())")) # f
print(6,check("(())")) # T
print(7,check("(((((()))))")) # f
print(8,check("()(((())")) # f
print(9,check("((((())")) # f
print(10,check("()(((())())()(()))")) # T


