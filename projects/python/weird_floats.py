# 9/8/2023

pia = 8
dia = 30 # 1024
def pn(n):
    return "{{0:.{0}f}}".format(pia + 1).format(n)

def actual(n):
   return int(n) * (2**dia) + int((n % 1) * (2**pia)) * (2**(dia - pia))


def pa(n):
   big = 10**(2*dia+pia)
   whole = (n // (2**dia)) * 10**dia
   part = ((n % (2**dia)) * 10**(dia+pia)) // (2**dia)
   print("big", big, "whole", whole, "part", part)
   s = str(big + whole + part)
   ss = len(s) - (dia+pia)
   s = s[:ss:] + "." + s[ss::]
   return s

def tt():
   return pa(actual(2.3))


