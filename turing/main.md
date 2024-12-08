
# Intro
I recently learned that you can use a probability matrix to represent an individual turn in Chutes & Ladders, and I realized that matrices can do more than that.

In fact, every "finite function" can be represented with a matrix. Let's see how.

Let a "finite function" be defined as follows.

`f` is a "finite function"
* `f: V -> V`
* `V` is a set of vectors
    * `V` has `k` items
* If `v in V`, then:
* `v_1, v_2, ... v_m` are the items of `v`
    * Each `v` has `m` items
* `for all v in V: for all i in {1, 2 ... }:`
    `v_i in N`
* `N = {x | x in {0, 1, ... n - 1}}`
* `n in Natural_Numbers`

That's it. So, `V` is vector of integers, and all of the integers range from `0` to `n-1`. Also, `V` has `m` items.

# Converting any finite function to a linear transform
Now, let's see how we can find a matrix transform that is like `f`.

Our matrix, `A`, will not be an m by m matrix, even though some functions can be represented with `m by m` matrices.

First, let's define some things. Let `g` be a linear transform, `g: W -> W`. `g(w) = A w`.

`w` is vector with `n^m` items (**yes, that's a lot of items**).
* A is therefore an `n^m by n^m` matrix

Also, `W` is a set of vectors that corresponds with `V` (I'll define how it does later).

Let `K = {1, 2, ... k}`. Notice that this can be used to index into a list of all vectors in `W`.

Next, let's defined a function, `h_v: K -> V`, which is one-to-one. The exact ordering of `h_v` doesn't matter.
* Similarly, `h_w: K -> W` is one to one.
* Therefore, there exists `h_vw: V -> W` and `h_wv: W -> V`. `h_vw(v) = h_w(h_v^-1(v))` and `h_wv(w) = h_v(h_w^-1(W))`.

## Converting the input vectors
Now, we need to define `W` and `h_w` in a way that allows us to prove `h_w` is one-to-one.

Let `W = {extend(v, n^m, h_v^-1(v)) | v in V}`

`extend(v, e_m, e_i)` extends the vector, `v`, to have `e_m` items, by filling it with `0`s, then it replaces the `0` at position `e_i` with a `1`. If there is no zero at `e_i`, it leaves the value there as-is.

Let's write those rules out in implicit notation.
Let `w = extend(v, m_w, e_i)`:
* `v` has `m_v` items
* `w` has `m_w` items
* `w` is only defined if `m_v <= e_l`
* `(i <= m_v) -> (w_i = e_i)`
* `((i > m_v) and (i != e_i)) -> (w_i = 0)`
* `((i > m_v) and (i  = e_i)) -> (w_i = 1)`

Notice that `e_i` not replacing non-`0`s is the same as `e_i` only replacing items that were outside the original vector `v`. In the context of the formula for `W`, `m_v` is just `m`, and `m_w` is just `n^m`.

It is pretty clear that `h_w` is one-to-one under this definition, since each `w` has the same items as `v` in its first `m` items. The only thing I should note is that `h_v^-1(v)` returns numbers from `1` to `k`, and `k <= n^m`. From there, (within `extend`) `e_i <= m_w`. You don't need that to prove that `h_w` is one-to-one, but we do need it for the next part.

## Constructing the matrix
Let's define `X {extend(f(v), n^m, h_v^-1(f(v))) | v in V}`, similarly to `W`.

`h_x`, `h_vx`, and `h_xv` follow similarly.

`h_x` is only one-to-one if `f` is. So, let's require that `f` is. The method presented here can be extended to include non-one-to-one `f`s.

Now, let's define the matrix `B` like this:
* `for all i in K: B_(., i) = extend(v, n^m, i)`
    * `B_(., i)` is column `i` of `B`
    * Notice that each `B_(., i) in W`

Similarly, define the matrix `C` like this:
* `for all i in K: C_(., i) = extend(f(v), n^m, i)`
    * `C_(., i)` is column `i` of `C`
    * Notice that each `C_(., i) in X`

Notice that `h_vx(h_wv(B_(., i))) = C_(., i)`.

Let's define `g` as that.

Now, let `A * B = C`. You can deduce that:
* `g(w) = h_vx(h_wv(w))`

We can use a neat formula to find `A`:
```
A^T^T = A
B^T * A^T = (A * B)^T
or A * B = (B^T * A^T)^T
(A * B is symmetric) <-> (A * B = B * A)
(A^-1)^T = (A^T)^-1 = A^-T (last one is syntax)

A * B = C <-> B = A^-1 * C

given A * B = C
(B^T * A^T)^T = C
B^T * A^T = C^T
A^T = B^-T * C^T
A = (B^-T * C^T)^T

A * B = C <-> A = (B^-T * C^T)^T
```

You might have been familiar with `B = A^-1 * C`, but I think a lot of people aren't familiar with `A = (B^-T * C^T)^T`.

Alright, we found `A`, and `B` and `C` are pretty straight forward to find. Just list all of the inputs and ouputs of `f`, and arrange them together as a matrix, with the columns in any order.

You could also try to use Gaussian Elination to simplify `A`. But that's not necessary here. As long as an `A` exists for our `f`, we've succeeded.

# Conclusion
Alright, without loss of generality, every "finite function" has a corresponding linear transform. I should note that the values of the matrix that corresponds with the linear transform are not necessarily from the same set of integers that the inputs and outputs of the function are. You can definitely generalize this proof to apply to all functions taking in vectors whose values come from some subset of the reals. I don't think there is a variant of this for working with infinite functions (i.e. arbitrary functions taking in real numbers and giving real numbers). I think the cardinality of the set of infinite functions is actually greater than the cardinality of the set of the infinite matrices, but I might be wrong about that.

# Why I wrote this
I wrote this article because it can be used to prove the Church-Turing conjecture.

Put simply, there is a one-to-one mapping between finite functions and finite matrices, and a **non**-one-to-one mapping between finite matrices and turing machines. The alphabets of the turing machines can be arbitrarily converted to integers, and the state transitions can be simulated by multiplying matrices. As long as the turing machine halts, it can be represented by a finite power of a finite matrix. Huh, maybe there is a connection between the halting problem and certain matrices. **Anyways,** every turing machine that halts for all inputs has a corresponding finite matrix. I think the non-halting turing machines correspond with finite matrices that don't converge when you raise them to infinite powers. I think there is some interesting research for you to do in that area, if you're interested.

# About me
Yes, I'm a bit of an amateur. Well, I consider myself to be an intermediate level mathematician. However, under my definition, that means I'm not clever enough to do the advanced stuff that people with master's degrees and PhDs can do. I really respect those people. I just heard that no one has proved the Church-Turing hypothesis, so I decided to write an essay on it. I really don't see what's so hard here. Like, isn't it just obvious?

I hope someone smart than me reads this and is like "oh yeah, duh; just use a matrix, bro".


