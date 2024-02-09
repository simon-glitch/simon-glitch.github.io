
# Type Signatures
Variables can be given a type signature, using `:`.

These signatures are **required**, and allow the JIT compiler to optimize the program better. The interpreter throws an Error is an assignment of the wrong type is made. If you don't like these errors, then use `~` instead. `~` declares the expected type loosely (without actually enforcing any particular type).

Type signatures are written like this:
* strict left-hand with initial assignment:
    * `int: varies = value`
* strict left-hand without assignment:
    * `int: varies`
* strict right-hand with initial assignment:
    * `varies+: int = value`
* strict right-hand without assignment:
    * `varies+: int`
* loose left-hand with initial assignment:
    * `int~ varies = value`
* loose left-hand without assignment:
    * `int~ varies`
* loose right-hand with initial assignment:
    * `varies+~ int = value`
* loose right-hand without assignment:
    * `varies+~ int`

Yup. I got 8 type signatures! What are you gonna do about it? Cry?! Go ahead! I don't care. XD!

A type signature can also be put on a function. A left-handed signature goes before the function's name, and a right-handed signature goes after the parameter list.







