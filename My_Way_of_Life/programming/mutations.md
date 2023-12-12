# Mutations

## Clarifications
In programming, the idea of mutations is very important. Now, I know I am talking about "mutations" here, but mutations are only relevant because they are applied to variables. So, technically, I am just talking about variables.

I will be using code examples throughout this document. All of them are written in Python. If you have a hard time understanding any of them, you will just have to learn the basics of Python. I won't require you to have any particularly advanced knowledge of Python or programming, just basic stuff. I know some people might get offended because I will almost exclusively write this essay from a Python-based viewpoint. I apologize for that; I am just trying to make this essay easy to understand.

## Intro
Each programming "language" has different built-in rules for how variables are allowed to mutate. For example:
* Rust has an ownership system that almost forces developers to make sure they can't accidentally mutate variables in unintuitive ways.
* Java has `public` and `private` labels that can be attached to class methods and variables.
* Python has no privacy and no ownership rules - any piece of code can modify any value in scope and any value in any object in scope; class variables are simply default values, and class instances can be modified just like `dict`s.
* JavaScript (ECMAScript) has almost the same implementation as Python, except it actually allows for constants (using `const`), private class variables (using `#[name]`), and private values in objects (using symbols).

## Functions
In mathematics, a function is a black box that takes in an input and spews out an output. Why am I calling it a black box? Well, sometimes we are only concerned with the inputs and outputs of a function - not necessarily how the function achieves the output from the input. The decision to only focus on the input and output, and ignore the underlying functionality is called abstraction. The idea of abstraction is that we can simplify our thought process by only concerning our selves with the outputs, or by using an analogy to the function rather than actually understanding the function. Take, for example, the `floor` function. If you open up your graphing calculator (e.g: [desmos](https://desmos.com/calculator)) and graph `y = floor(x)`, you will see a staircase. Depending on how you are using the floor function, the stair case might be the exact analogy you need in order to use it. In which case, we can ignore whichever underlying method the computer uses to actually compute the function.

* **If you know calculus**, then you probably know how difficult integrals and derivatives are to work with. Computers use lots of tricks in order to compute these. For example, [desmos](https://desmos.com/calculator) can compute double and tripple integrals by force (without actually using a CAS). How it actually achieves this, doesn't matter to you though, since you just want it to find value of the integral (or whatever).

Anyways, let's get back to the topic of **programming**.

In programming, we use functions. Arguably, your entire computer is "made of" functions. Someone who likes "functional programming" would argue this; and if you questioned them, they would probably go off on a long tangent about mutability of pipelines or some other nonsense. I'm not here to do that. I'm here to give you a complete and thourough exaplanation of what functions **really** can be, and how you can use them.

### Definition
Let's define a function as a program that has an input and a output. Like a program, a function can be executed. Traditionally, this process of execution has the following steps:
* create a section on the call stack for this function
    * this section is sometimes called a "scope"
* copy every parameter's value, and put those values on the new section of the call stack
* run the code inside the function
    * all variables created inside the function are created in the new section of the call stack
    * variables outside the function are considered inputs to the function if they are actually used by it
* stop the function (i.e. end its execution) by using a return statement
    * typically a value can be attached to this return statement
        * we call this "returning a value"
* if we get to the end of the code inside the function, the behavior will depend on the language:
    * typically, we just return some default value
    * maybe an error is thrown, depending on the language
* when the function stops (or returns), make sure to destroy the section of the stack that we made for the function
    * sometimes we have to create a **closure** before doing this; I will explain closures later in this document

When a value is returned by a function, it is stored in a variable outside the function. This is considered an output of the function.

```py
def f(x)
    x2 = 2 + x
    return x2

y = 5
z = f(y)

print(z)
```

In the example, `f` is a function. It's input is `x`, and it's output is `z`. Notice that the output is named **outside** the function, and assigned outside the function. `x` is a parameter, so it's created in the section of the stack for `f`. `x2` is also placed in this same section of the stack, because `x2` is created **inside** the code block of `f`. However, `x2` is neither an input nor an output, because it is created inside the function, *and destroyed when the function finishes*.

### How are a function and a program the same?
If you especially versed in computer terminology, you probably know that programs are extremely complex. If you have any programming experience, you probably know that functions are simple (at least in comparison to programs). If you have any common sense, you know that a function is simply a part of a program. Obviously, a wheel and a car are not the same; the wheel is part of the car, not the same as the car. This is so obvious that you probably think I am an idiot for calling a program and a function the same.

Well, before I can justify myself in a way that you will understand, I need to ensure that you and me have the same understanding of how functions work. First, I am going to claim that a function can contain a function. Here's an example:

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    return g(3)

print(f(5)) # 21
```

As you can clearly see, `g` is inside of `f`. The implications of this are that `g` can use `x` because it is inside of `f`. The inputs of `g` are `y` and `x`. `g` would not *(necessarily)* work if it was not inside `f`, since it uses `x` from `f`. You'll also notice that `f` can use the output of `g`. If I wrote another function, let's say `h` that was not inside `f`, it would not be able to use `g`:

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    o = g(3)
    return x

mx = f(3)

def h(x):
    return o - x

mo = h(2) # Error
```

This causes an error because `h` can't use the `o` from `f`. `o` was created **inside** `f`. Therefore, it is destroyed after `return x` is executed. In general, a variable **inside** `f` stays inside `f`, and can not be an output of `f`. We could return `o` and then use it that way; but it won't be outputted by `f` by default. We have to explicitly write the code to make that happen.

```py
def f(x):
    x = x + 2
    def g(y):
        return y * x
    
    o = g(3)
    return o

o = f(3) # o = 15

def h(x):
    return o - x

mo = h(2) # mo = 13
```

In this example, we return `o` and then create a new variable for it **outside** of `f`. This allows `h` to use `o` as input to `h`.

In summary, a function looks like this:
```
| <inputs>                                |                          | <outputs>                        |
|-----------------------------------------|--------------------------|----------------------------------|
| (parameters, after the function's name) +                          | (return value of the function) + |
| (variables outside the functions)       => [execute the function] => (other tricks)                   |
```

What are these **"other tricks"**? Well, they are the kinds of things that many programmers (especially fans of "functional programming") dislike. These tricks are:
* global variables
* object mutations
* closures

### Global Variables
Python has global variables using the `global` keyword. JavaScript actually makes variables as global as possible, requiring the programmer to use `let`, `var`, and `const` to clarify which level of "globalness" each variable is supposed to have.
* Both of these designs can be quite confusing to a new programmer, even though using them is really simple.

Here is an example:
```py
def f1(x):
    y = x + 2
    def f2(x):
        global z
        z = y - x
    f2(5)
    return z

print(f1(4))
```

Now, the example is intentionally written poorly. We could just put `return z` in `f2`, and then `return f2(5)` directly in `f1`. *In general, global variables aren't as useful as object mutations.* In simply examples like this, using `return` statements and writing everything in a "functional" design is usually the best approach. Nonethless, global variables are very useful.

**Wait, what does `global` do though?**
Oh, well it just moves the variable outside the function. Python moves the variable **all the way outside**.

```py
def f1(x):
    y = x + 2
    def f2(x):
        global y
        y = y - x # Error
    f2(5)
    return y

print(f1(4))
```

This example shows how `global` actually works. `global y` tells `f2` to use the `y` on the global scope.

The error happens right here:
```
----v----
y = y - x
```

The reason is simple. Python has to evaluate the right side of the assignment first, before assigning the value. When Python tries to evaluate `y` (on the right side), it doesn't find a variable `y` in the scope. There is a `y` inside of `f1` that Python could use (and normally would use), but `global y` makes Python ignore that. Python is looking in the scope **outside** of `f1`. In the code, there is no `y` outside of `f1`. Therefore, Python gives us a `NameError` (no variable named `y`).

We can "fix" the code by adding a couple of lines of code to `f2`
* First, we input `y` from `f1`:
    * `copy = y`
* Then we start using the `global y`.
* Then we set the `global y` to a starting value of our `copy`.
```py
def f1(x):
    y = x + 2
    def f2(x):
        copy = y
        global y
        y = copy
        y = y - x
    f2(5)
    global y
    return y

print(f1(4))
```

You can also just make the original `y` from `f1` global, like so:
```py
def f1(x):
    global y
    y = x + 2
    def f2(x):
        global y
        y = y - x
    f2(5)
    return y

print(f1(4))
```

**But why not just use the `y` from `f1` directly?**

Well, this code does not have the expected output:
```py
def f1(x):
    y = x + 2
    def f2(x):
        y = y - x
    f2(5)
    return y
print(f1(4)) # expect 1
```

We expect `1`, but get `6`. This is because `f2` has 2 different `y`s.
```
| ---------v right |
|      y = y - x   |
| left ^ --------- |
```

The right `y` is taken as an input. When getting a variable's value, Python will look for the most-local input. In this case, the most local input is the `y` from `f1`. Keep in mind, the `y - x` on the right side happens first, so Python can't use the `y` from `f2` yet.

Here, let's modify the code to make this more clear:
```py
def f1(x):
    y = x + 2
    def f2(x):
        y = y - x
        print("inner", y) # the current `y` in `f2`
    f2(5)
    return y
print("final", f1(4)) # the final `y` in `f1`
```

Result:
```
inner 1
final 6
```

So it looks like `y` **does** have the correct value while it's inside of `f2`. However, the `y` used in the inner print statement is taking from the most local input. Here, since `y` was already established a value under `f2`, Python uses the `y` from `f2` in the inner print statement. So, Python will dynamically switch from using `f1`'s `y` to using `f2`'s why, when a `y` is actually created in `f2`.

You might find all of this to be rather unintuitive. And I agree with you - this is unintuitive. How is anyone supposed to understand what's going on here? Well, this is why many programmer dislike global variables and even avoid them.

When I first learned programming, I actually found this to be rather intuitive, because I ended up having code where I needed different functions to access the same values. Here is an example:

* Imagine we have an application, with 2 button's and a box between them. The box displays a value, such as `12`.
```py
# our global variable
box_value = 12

def on_button_up():
    # we need to specify that we are using a variable in a global manner
    global box_value
    box_value = box_value + 1

def on_button_down():
    # we need to specify that we are using a variable in a global manner
    global box_value
    box_value = box_value - 1

# the specifics on update and box_element are left out, for simplicity
def update():
    box_element.value = box_value
```

Each time `on_button_up` is called, the box's value will increase by 1. And `on_button_down` decreases the value. This is very simple, and code like this is actually quite natural. If you have had to switch from one language, like Java, to another, like Rust, you probably had *some* problems with accessing variables from different functions.

### Object Mutations
Object oritented languages, like Java, don't want you to use global variables. Instead, we are supposed to put our variables on objects. An object really is just that though: it's just a container (a box) to put variables inside of.

```py
class Container:
    y = 0

def f1(x):
    c = Container()
    c.y = x + 2
    def f2(x):
        c.y = c.y - x
    f2(5)
    return c.y
print(f1(4)) # expect 1, and get 1
```

Here, `f2` can modify `y` because it uses the container `c` from `f1`. Wait, what? Won't `c.y =` in the `f2` create a new `c.y` just for `f2`? Why doesn't this behave like the code from earlier? How is `c.y` different from `y`? Well, it's because of what `c.y` means where the value is actually stored. `c.y` means "use the `y` from `c`". `c` is an instance of `Container`, therefore the `y` from `c` is stored in its own separate code block:
* before `f2` is run:
```java
Container c:
    y = 6
```
* after `f2` is run:
```java
Container c:
    y = 1
```




