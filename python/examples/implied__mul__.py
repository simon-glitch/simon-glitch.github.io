

if(False):
  # multiplying an object by an integer triggerd __mul__ automatically

  class cat():
    def __init__(this, tails):
      this.tails = tails
    
    def __mul__(this, mul):
      print(f"implied __mul__ triggered on {this}")
      return cat(this.tails * mul)
    
    def __str__(this):
      return f"{this.tails} tailed cat"

  garfield = cat(1)

  # no print statement here
  sam = garfield * 5
  # yet a print statement is triggered

  # now let's print sam too
  n = input("press enter to print sam")
  print(sam)

# let's save the original __mul__, so we can still use it after overwriting it
ogmul = list.__mul__

def mymul(this, mul):
  print(f"implied mul on list [{this}];")
  return ogmul(this, mul)

list.__mul__ = mymul

