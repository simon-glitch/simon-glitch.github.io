/*
Okay so here is a more advanced idea for a weighted sample. With this method, it is much simpler to allow repetition in the sample. But there are cases where you wouldn't want repetition, which means the larger the sample is, the higher the chance of getting rarer items.

The idea is to use a binary tree that splits the probabilities 50/50 at each step. This is similar to the trees some compression algorithm use, except we keep splitting the tree until there are only two items left. Then we can use a random call to choose between with the correct probability. Let's look at an example, in detail.

Let's say we have items with weights [1,2,3,4,5,6]. The sum is therefore 21.

The tree looks like this:
* Layers: 21, 10.5, 5.25, 2.625, 1.3125
* [1,2,3,4,5] (only taking 0.5 of 5)
    * [1,2,3] (only taking 2.25 of 3)
        * [1,2] (only taking 1.625 of 2)
            * 1/2.625 chance of giving 1
            * 1.625/2.625 chance of giving 2
        * [2,3] (only taking 0.375 of 2 and 2.25 of 3)
            * 0.375/2.625 chance of giving 2
            * 2.25/2.625 chance of giving 3
    * [3,4,5] (only taking 0.75 of 3 and 0.5 of 5)
        * [3,4] (only taking 0.75 of 3 and 1.875 of 4)
            * 0.75/2.625 chance of giving 3
            * 1.875/2.625 chance of giving 4
        * [4,5] (only taking 2.125 of 4 and 0.5 of 5)
            * 2.125/2.625 chance of giving 4
            * 0.5/2.625 chance of giving 5
* [5,6] (only taking 4.5 of 5)
    * 4.5/10.5 chance of giving 5
    * 6/10.5 chance of giving 6

Yeah, that's pretty complicated, isn't it? For the record, this method doesn't become computationally efficient until you have at least 10 to 16 items.

A single random number can be used to choose the item. You just grab 1 bit at a time until you get to the last step. Then you use the remaining bits. It's very straightforward and simple, especially in comparison to the process of actually generating the tree.

Now after putting some thought into it, I don't think it's possible (or at least, it's not easy) to make a good method for sampling without duplicates.

There might be some kind of advanced approximation using matrices. I tried coming up with my own idea related to that, but I couldn't come up with anything. But I am still thinking about it... I might come up with a useful idea for some other project.

*/


