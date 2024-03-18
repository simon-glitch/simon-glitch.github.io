
By the way, linked lists are actually stupid. I don't get why the professor supports them and I never will.

Here is a precise proof of why they are slow:

# Proof
Let's say, you need to insert items randomly into an array-like structure. Let n = the length of the array-like structure. Well, inserting into a random point in **a vector** takes O(n) time on average. There is not *a lot* that you can do to speed this up, outside of using a weird tree-like structure.

> "Wait, wait, doesn't inserting into a linked list only take O(n) time?"

Well, if you have the pointer to that node, yes. But ... what if I select 2 random points to insert into? Think about it. Imagine `curr_index = 100`, and you have `Item *curr_ptr = *my_list[curr_index]`; once you `curr_ptr` set, you can easily insert into the list, using `my_list.insert.insert_at(curr_ptr)`. That only takes O(1) time, but when I give you `new_index = 500000`, finding the the `Item *new_ptr = *my_list[new_index]` takes O(n) time. Therefore, inserting into a random point in a linked list takes O(n) time.

> Okay, okay ... well, what about inserting at the front of the list? That only takes O(1) time!

Yes, it does. But doing that with a vector takes the same amount of time, as long as you do it correctly, and amortize the time.

> Hey, hey! That's not fair, you can't ...

Yeah, I don't care. We want to write fast performant code. Actually, I can make inserting at the front of a vector take O(1) time, every time. Here's how:

## Sequence class
I'm calling this a "Sequence" just so you won't confuse it with a list, vector, or array. This is just another array-like data structure, and it has all of the methods that vector does.

I will be explaning each part of this class 1 step at a time.

```cpp
template<Item>
class Sequence{
    Item *my_array = nullptr;
    uint64_t my_length = 0;
```

Here we just define the array used by this structure.
* `my_length` is the capacity of `my_array`. This means that `my_array` only stores {`my_length`} values in it.
* `my_array` is always made like this:
    * `if(my_length != 0) delete[] my_array;`
    * `my_array = new Item[my_length];`

```cpp
    uint64_t offset = 0;
```

This is a magic number we use to redefine where the sequence starts. If it is not 0, then the sequence actually starts at:
* `my_array + (my_length - offset) * sizeof(item)`
* Note that `item` can be any item, such as `my_array[0]`.
The formula to convert an index in the sequence to its position in RAM is:
* `ptr_index = my_array + (((index - offset) + my_length) % my_length) * sizeof(item)`
* *I should note that this is not the final formula, since we are going to add more to this later.*
A formula that allows negative indices (such as the ones that Python uses) is:
* `ptr_index = my_array + ((((index - offset) % my_length) + my_length) % my_length) * sizeof(item)`

Imagine we have a sequence, like this:
```c
my_list = {
    +  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    + 11,12,13,14,15,16,17,18,19, 20,
    + 21,22,23,24,25,26,27,28,29, 30,
    + 31,32,33,34,35,36,37,38,39, 40,
    + 41,42,43,44,45,46,47,48,49, 50,
    + 51,52,53,54,55,56,57,58,59, 60,
    + 61,62,63,64,65,66,67,68,69, 70,
    + 71,72,73,74,75,76,77,78,79, 80,
    + 81,82,83,84,85,86,87,88,89, 90,
    + 91,92,93,94,95,96,97,98,99,100,
}
```

Now, suppose that `offset = 0`. Well, then:
* `my_sequence[0] == 1`
* `my_sequence[1] == 2`
* etc., as you would expect.
* Note that I am indexing from `my_sequence`, but the values are stored in `my_list`. That's because `my_sequence::operator[]` is being used as a *[proxy](https://en.wikipedia.org/wiki/Proxy_pattern)* to access `my_list`.

However, if `offset = 3`, then `98`, `99`, and `100` are the first few items of the list, and then the list loops back around to `1`:
* `my_sequence[0] == 98`
* `my_sequence[1] == 99`
* `my_sequence[2] == 100`
* `my_sequence[3] == 1`
* `my_sequence[4] == 2`
* `my_sequence[5] == 3`

Now, this can insert a single item in O(1) time just fine, since all we have to do is put it at the end. However, inserting another item requires us to push the first inserted item back (at the end of the sequence). So... it looks like we didn't solve our issue. Constructing the sequence by prepending items to the front still takes O(n) time per item (i.e. O(n^2) time total), and adding `s` items to the sequence takes O(s^2) time. This is a great improvement, but it's not perfect.

Well, we can fix this issue by just flipping the sub-sequence define by `my_sequence[i]` for `i` in the range from `0` to `offset`. However, doing this requires us to introduce another variable, `onset`.

```cpp
    uint64_t onset = 0;
```

"On" is the opposite of "off", and therefore "onset" is the opposite of "offset". I know, it's very clever.
