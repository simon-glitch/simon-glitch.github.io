# Prompt
In the past 4 weeks we mainly focus on several main Python data types and their usages. We also used for loops to perform repetitive tasks and learned to use if-else statements to perform non-sequential code execution. To further consolidate what we have done, please perform the three tasks below. 

1. List the Python data types you have learned for the last 4 weeks (including this week on logical expressions). Discuss the several ways of classifying them (e.g., primitive/atomic). We did this in one of our classes.

2. We also used many operators for the data types in (1). List the operators (not the built-in functions and other modules, such as math) that you have learned in the last 4 weeks (including this week on logical expressions). Also classify them according to their usages (e.g., arithmetic operators).

3. Some operators have different meanings for different data types. The most common one is the operator +. Explain with examples the meaning of + for the data types in (1). For example, for a + b, where a and b are numbers (integer/floating-point numbers), it means the addition of two numbers.

# Response
## 1
Rocky has shown the 6 most well-known Python data types:
* bool (boolean)
* int (arbitrary precision integer)
* float (64-bit floating point number)
* str (string)
* tuple
* list
* dict (dictionary)
* range

Python has many other data types, such as complex, but we didn't discuss any of those.

The only data type I learned was `range`. I was already familiar with the others before I even asked to attend Calvin.

## 2
I (personally) didn't learn any new operators, but everyone else did.

You discussed:
* arithmetic operators:
  * `addition`,
  * `subtraction`,
  * `multiplication`,
  * `division`,
  * `modulo`;
* and logical operators:
  * `logical-and`,
  * `logical-or`,
  * `is-equals`,
  * `is-less-than`,
  * `is-greater-than`,
  * `is-less-than-or-equal-to`,
  * and `is-greater-than-or-equal-to`.

I discussed:
* `exponentiation`,
* and `bitwise-xor`.

## 3
`+` (`__add__`) is defined for:
* `bool`,
* `int`,
* `float`,
* `str`,
* `tuple`,
* and `list`

`__add__` is a non-mutating operation. So, when used on mutable data, it makes a new copy of the mutable data, rather than mutating the data.

`list.__add__` concatenates 2 lists together.



