
# Functions
## Currying
*Also in [syntax/functions](../syntax/functions.md#Currying).*

Function parameters can be curried. Example:

```
f(a, b) = a + b
curried_f = f(2)
print(curried_f(5)) // [7]
print(curried_f(9)) // [11]
print(f(3,3)) // [6]
print(f(8)(20)) // [28]
```

But curring is optional:
```
print(f(5, 9)) // [14]
```


