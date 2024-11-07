
# Sub example 1
```js
new Game({
    name: "Candy Clicker",
    ui: [
        new Button({
            name: "Jerry the Rock Wallson",
            desc: "Jerry is a magical rock from the emerald forest. Click him to produce coins.",
            onclick: function(r){
                r.coins += 1;
            },
        }),
        new Resource({
            name: "coin",
            desc: "The currency of Laughter Land. This currency can be buy powerful upgrades and produce lots of candy.",
        }),
    ],
})
```

This is just a basic example.

`new Button` makes a button. This can be clicked in order to earn coins. In this example, the player receives 1 coin every time they click Jerry, and Jerry can be clicked as many times as the player wants to. If the player clicks Jerry 100 times, they will earn 100 coins, and so on.

The line saying `desc: "..."` is the description of the button. Everything in this library can be given name and description properties.

`new Resource` defines a new resource. Don't forget the round brackets `(these)` and curly brackets `{these}`. A resource is a thing the player can collect. In this example, the resource is coins, which the player can collect coins by clicking on Jerry.
* Note that `name: "coin"` defines the name of the resource.
* Also note that `coin` is the singular name of the resource, but the resource has a plural name as well. This means you can refer to it as `coin` or `coins` in your code. If you wrote `name: "coins"` instead, then you would be able to refer to it as `coins` and `coinss`, but not as `coin`. This can cause problems, so you might want to write your code differently.

# Sub example 2
```js
new Game({
    name: "Candy Clicker",
    ui: [
        new Button({
            name: "Jerry the Rock Wallson",
            desc: "Jerry is a magical rock from the emerald forest. Click him to produce coins.",
            onclick: function(r){
                r.coins += 1;
            },
        }),
        new Resource({
            name: "coin",
            desc: "The currency of Laughter Land. This currency can be buy powerful upgrades and produce lots of candy.",
        }),
        new Resource({
            name: ["gum"],
            desc: "A soft, chewy candy that can be stretched and bent into lots of different shapes and sizes.",
        }),
        new Resource({
            name: ["taffy", "taffies"],
            desc: "A soft candy with a lot of sugar and a slightly salty flavor. It can also bend and stretch, but nowhere near as much as gum.",
        }),
        new Factory({
            name: "Bubbly Bee",
            desc: "A bee that randomly produces bubbles as it flies around. It brings the nectar from flowers to its hive and then turns the nectar into gum.",
            cost: {
                "coins": 10,
            },
            ontick: function(r){
                r.honey.yield(this.n);
            },
        }),
        new Factory({
            name: "Taffrog",
            desc: "It creates taffy as a byproduct of its digestion, and regurgitates the taffy occasionally.",
            cost: {
                "coins": 20,
            },
            ontick: function(r){
                r.taffy.yield(this.n);
            },
        }),
    ],
})
```

## New resources
So I just added 2 new resources and 2 new factories.

The new resources are gum and taffy.

### Plural names
You can notice that gum's name is written differently: `name: ["gum"]`.That's because the plural of "gum" is "gum", not "gums". As a candy, "gums" would refer to multiple types of gum, but multiple pieces of gum are simply referred to as "gum".

To clarify a word as its own plural, like "sheep", "fish", "gum", or "oxygen", just wrap it in square brackets:
* `name: ["gum"]`

To clarify a word as having a plural that is just the word with "s" added to the end, don't use square brackets:
* `name: "rabbit"`

To clarify a word as having a plural that is not obvious use square brackets and write the plural form after the singular form:
* `name: ["mouse", "mice"]`

Note that the engine adds "es" to the end of the word if its ends in "ch", "s", "sh", "x", or "z".
* `name: "witch"`  has a plural of "witches"
* `name: "walrus"` has a plural of "walruses"
    * `name: "octopus"` has a plural of "octopuses", not "octopi"
* `name: "crash"`  has a plural of "crashes"
* `name: "box"`    has a plural of "boxes"
* `name: "blitz"`  has a plural of "blitzes"

I can't be bothered to add every plural, especially since your game might use made up words for made up resources and objects.

## Factories
A factory is a special kind of resource that the player can buy with other resources. Each factory automatically produces resources for the player. Many idle games have features like this, where a building is levelled up or more copies of the building are bought, and each level or copy produces resources.

Technically (in this example) the player can only have 1 factory, because the game only does the calculations for 1 factory.

Let's look at the `ontick` function of the "Bubbly Bee" factory. It looks like this:
```js
function(r){
    r.honey.yield(this.n);
},
```

The `ontick` function runs once on every frame of the game. Usually the game runs at a little less than 62.5 frames per second, but lag can cause the frame rate to be lower.

The stuff between the curly brackets is the "code" of the function. Here, it simply yields honey.
```js
  r.honey.yield(this.n)
//  ^           ^
//  +-----------+- here we type the name of the resource we want to produce
//              |
//              +- and here we type how much of the resource we want to produce every second
```

Don't let the code scare you. It's a lot simpler than many other pieces of code.

### The yield function
It's recommended that you use the yield function in ontick functions because it automatically multiplies the produced amount by the amount of time that passed between frames. This means the same amount of gum is produced every second, regardless of how low or high the framerate.

In the parenthesis after `yield`, you can pass in an **argument**. You might've heard other people call this a parameter, but parameter is the name of incoming data.
* "argument" means outgoing data; i.e. i am handing you a note, as an argument
* "parameter" means incomming data; i.e. you are taking my note from my hand, and receiving it
* understand?

The argument you pass into the `yield` function is the amount of the resource to produce every second.
* `r.gum.yield(1);` means yield one gum per second
* `r.gum.yield(0.1);` means yield 0.1 gum per second, which is 1 gum every 10 seconds
* `r.dollars.yield(2.5);` means yield 2.5 gum per second
* `r.gum.yield(this.n)` means yield 1 gum per second for every copy or level of this building
    * this is explained in more detail later

### What's r?
`r` is just a list of the resources your game has. You can convert it to a string if you want. In our example, r converts to this:
* `console.log("" + r);`
```
Resources (for Candy Clicker)
* Dollars: --
* Gum: --
* Taffy: --
```

Those hyphens are actually a good thing. That means nothing is actively attached to the resources. You can also track a resource, like this:
* `r.gum.track();`
* this is solely for debugging purposes

And you can convert just 1 resource to a string, like this:
* `console.log("" + r.gum);`
```
Dollars: 1 Tracker
```

You can get more information by logging `r.gum.data`.
```
Data {
    Events: []
    Value: CV {
        current: 0
        velocity: 0
        acceleration: 0
        smoothness: 10
    }
}
```


