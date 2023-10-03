
n = []

def up():
  new_n = n[::]
  n.append(new_n)
  print(f"added {len(n)}:")


aa = True
while(aa):
  up()
  s = input("next\n")
  if(len(s) > 0):
    aa = False
