
inf = (2.0**1023) * 2.0

# AttributeError: 'builtin_function_or_method' object attribute '__sizeof__' is read-only
len.__sizeof__ = (lambda: inf)
# BIG SAD!
# solution: make my own version of python where it is set to return infinity.

print(len(len))
