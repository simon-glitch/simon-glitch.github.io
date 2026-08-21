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

