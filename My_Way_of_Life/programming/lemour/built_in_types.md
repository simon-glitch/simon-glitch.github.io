
# Built Ins!
These are some of the most basic data types, which are built in to the language. Having good built-ins is one of the most important parts of a language; especially when the language is interpreted.

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
* `int:16` is an 16-bit integer (i.e. a C `short`)
* `int:32` is an 32-bit integer (i.e. a C `long`)
* `int:64` is an 64-bit integer (i.e. a C `long long`)



