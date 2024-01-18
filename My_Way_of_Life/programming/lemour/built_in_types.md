
# Built Ins!
These are some of the most basic data types, which are built in to the language. Having good built-ins is one of the most important parts of a language; especially when the language is interpreted.

## Iterable
Any object that contains mutliple items and remembers where their values are (or remembers how to access their values). For example, a linked list would qualify as an iterable, even though each node of the linked list is itself a linked list. In case your wondering: No, "linked list" is not a built-in in this language. That data structure is well known for being hard to debug and bad for performance.

## Array
`array` is the generic data type for an ordered sequence of items.

This throws an error when you try to read or write to elements outside the current indexing range. You can still `pop`, `shift`, and `splice` though.

## Jarray
`jarray` is just like `array`, except it doesn't throw an error when you try read or write to elements outside the current indexing range. `jarray` can also have empty elements which are actually empty, and `jarray`'s `.length` property will automatically contract if elements are removed from the end of the array.

## List
`list` works like a set and an array at the same time. `list` will keep track of the hashes of items it's seen before, and remembers their indices too. You can also make `list` actively sort these hidden indices with a given sorting function and then call `my_list.sort` to make it sort the array. `my_list.items` is the unordered set of the items.

## Set
`set` is an "unordered" set of items. In reality, the program sorts the items by hash for convenience. `my_set.hashes` is the `sorted_irray` of the hashes. 

## Sorted_Irray
An array of integers with built in auto-sorting. Doesn't allow non-integer or bigint values.

## Int
`int` is an integer. You can feed it a type parameter for the number of bits to have in the integer.
* `int:8` is an 8-bit integer (i.e. a byte)
* `int:16` is a 16-bit integer (i.e. a C `short` or `int`)
* `int:32` is a 32-bit integer (i.e. a C `long`)
* `int:64` is a 64-bit integer (i.e. a C `long long`)

## float
`float` is a floating point number. You can feed it a type parameter for the number of bits to have in the floating point number.
* `float:8` is an 8-bit float (and it's not very useful)
* `float:16` is a 16-bit floating point number (i.e. a `half`)
* `float:32` is a 32-bit floating point number (i.e. a C `float`)
* `float:64` is a 64-bit floating point number (i.e. a C `double`)
* `float:96` is a 96-bit floating point number (i.e. one type of C `long double`)
* `float:128` is a 128-bit floating point number (i.e. another type of C `long double`)

Floating point numbers have multipe parts, so there are actually 4 parameters for them. That means that a `float` type is written like this:
* `float :sign :exponent :mantissa :inf`
* or `float :(sign, exponent, mantissa, inf)`

About the parameters:
* `exponent` is the number of "exponent" bits to include in the `float`; this controls how **BIG** the `float` can be, since the exponent is what makes the "point" in "floating point" actually float;
* `mantissa` is the number of "mantissa" bits to include in the `float`; this controls how much **precision** the float has;
* `sign` is the number of "sign" bits to include in the `float`; defaults to `1`;
* `offset` is the offset to use in the exponent; the default 64-bit `float`s have an offset of `127` for example

### IEEE 754
This code uses the IEEE Standard for Floating-Point Arithmetic (IEEE 754) for the floats. [Learn more here](https://en.wikipedia.org/wiki/IEEE_754).

This code also uses the following sizes, as defined by IEEE 754 (when `float:` is only given the size parameter):
* `float: 16 = float:( 10,  5, 1,      7)`
* `float: 32 = float:( 23,  8, 1,    127)`
* `float: 64 = float:( 52, 11, 1,   1023)`
* `float:128 = float:(112, 15, 1,  16383)`
* `float:256 = float:(236, 19, 1, 262143)`

For a given `float:n`, the settings default to:
* `exponent = 0.214286 * n**2 + 0.928571 * n - 2.11429`
* `bits = n - exponent - 1`
* `sign = 1`
* `offset = 2 ** (bits - 1) - 1`

This means


