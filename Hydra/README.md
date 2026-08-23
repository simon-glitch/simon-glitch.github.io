# Hydra
The Hydra parser has four heads, each corresponding to a type of tree it has to manage. These are:
* Input AST
* Output AST
* The language definition (not JSON, since it can have callback functions)
* Parsing state tree (PST)

For convenience, we can make all 3 types of trees actually just be 1 class, with a single type property: syntax, language definition, parsing state. The language definition tree is the only tree that should be treated as immutable.

I will write language definitions in Hydra for Markdown, JavaScript, Python, and C++. Or at least, that's the plan. I should probably add HTML and CSS to the list.

Then how does it work? Well for a regular language, you need 5 different matching nodes. I should note that Hydra does not only support regular languages. None of the languages listed are regular. You might count Markdown as regular because it does not throw errors, but that is stupid. What I mean by regular is that regular language logic alone can be used to parse text into an AST. Also, Hydra doesn't use PEGs, because I don't like those.

The 5 matching nodes are:
* Direct match (check the type of the current node in the input AST, succeed if it matches, fail if it does not). This is for leaf nodes in the language definition.
* Choice: a list of choices, which are other matching nodes. One of the nodes must succeed in order for this node to succeed.
* List: a list of matching nodes. Each node must be matched in order, so one after another. This can also be thought of as "then". In other parsers, this is often implied as the default matching logic.
* Multiple: takes another matching node, and then matches it X times in a row. X can be set to 1, (0 or 1), (1 or more), or (0 or more). Setting X to 1 is stupid, but it is also an option. 0 is even more stupid so I am not allowing it.
* Layer: has matching data for the inside of the current node. The parser will go down into the current node recursively. This is required for matching structures in ASTs.

Also for the record, I don't really believe in the idea of parsing text. I have lost all faith in that idea after trying to create parsers quite a few times before. I especially don't believe in the idea of tokens. A list of tokens is just a simple AST that is slightly more high level than a list of characters. My language definitions will all start with simple tokenization, but my point is that it's not that important.

My genius insight I had is to state for each matching node type what the parser should do. It will have a `Match_Type`, which looks like this:
```ts
type Match_Type = {
    // the constructor this match type is associated with;
    type: Function,
    // when true, indicates the parsing node should try to match the type of the input node directly; this is used in both leaf nodes and layer nodes;
    match_type: boolean?,
    on_enter: Hydra_Action?,
    on_succeed: Hydra_Action?,
    on_fail: Hydra_Action?,
    // I can't think of a way to separate the complex child handling from individual handling;
    on_child_enter: Hydra_Action?,
    on_child_succeed: Hydra_Action?,
    on_child_fail: Hydra_Action?,
    // i might be able to use this to implement look behind logic;
    // this action would run if any node (that shares an ancestor with this node but it not an ancestor of this node) fails;
    on_sibling_fail: Hydra_Action?,
}
type Hydra_Action = {
    input: Head_Action?,
    output: Head_Action?,
    parsing: Head_Action?,
    // callback gets called before the Hydra_Action is called;
    // when callback returns void, the rest of the Hydra_Action is executed normally;
    // when callback returns a Hydra_Action, that is executed instead of the Hydra_Action containing callback; i.e. callback overrides the Hydra_Action (but only during this execution);
    callback: Function?,
}
type Head_Action = {
    // source and target should be exclusive to parsing;
    source: Hnode_Action?,
    target: Hnode_Action?,
    move: Hmove?,
    // used when move == Hnode.down;
    // used as the arg for Array.prototype.at;
    index: number,
}
// these are all symbols;
// Hnode means Hydra node;
enum Hnode_Action = {Hnode.enter, Hnode.succeed, Hnode.fail};
// these are all symbols;
enum Hmove = {Hnode.up, Hnode.next, Hnode.down};
```

A `Hydra_Action` is used to tell Hydra what to do. This should minimize the amount of code, and thus minimize the number of bugs. This should also make it much easier for me to test things independently.

`Hmove` indicates traveral of the corresponding tree. Since each matching step needs to traverse a varying number of the trees.

## Expansion example
If we expand the class out, we get the following, which I think demonstrates why I was having a hard time making a parser before. There are a lot of potential steps per matching step.
```ts
type Match_Type = {
    type: Function,
    match_type: boolean?,
    on_enter: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_succeed: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_fail: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_child_enter: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_child_succeed: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_child_fail: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
    on_sibling_fail: {
        input: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        output: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        parsing: {
            source: Hnode_Action?,
            target: Hnode_Action?,
            move: Hmove?,
            index: number,
        },
        callback: Function?,
    },
}
enum Hnode_Action = {Hnode.enter, Hnode.succeed, Hnode.fail};
enum Hmove = {Hnode.up, Hnode.next, Hnode.down};
```

If you were to write a parser with only one head, you would need about half that number of lines, per each time you need to hardcode in a new grammar feature, minimum. Which could add up to a lot, and in my opinion, that is quite hard to debug.

## Specific config
I should note that `on_succeed` defaults to
```ts
const base_succeed = new Hydra_Action({
    parsing: Head_Action({move: Hnode.next}),
});
```

So, here is my currnet idea for how all of the matching types could be implemented:
```ts
const M_Leaf = new Match_Type({
    type: M_Leaf,
    match_type: true,
});
const M_Choice = new Match_Type({
    type: Choice,
    on_child_fail: new Hydra_Action({
        // try the next choice;
        parsing: Head_Action({move: Hnode.next}),
        
    }),
    // fails automatically when it reaches the end of the list;
});
const M_List = new Match_Type({
    type: List,
    on_child_succeed: new Hydra_Action({
        input: Head_Action({move: Hnode.next}),
    }),
    // when we reach the end of the list;
    on_fail: new Hydra_Action({
        // make this node succeed;
        parsing: Head_Action({source: Hnode.succeed}),
    }),
});
// all of this shenanigans is to make sure a multiple with one, or (one or more), fails when zero are matched;
const Multiple_Fail = new Hydra_Action({
    parsing: Head_Action({source: Hnode.fail}),
});
const Multiple_Succeed = new Hydra_Action({
    parsing: Head_Action({source: Hnode.succeed}),
});
// the four types of multiples are separated;
const M_Multiple_ONE = new Match_Type({
    type: Multiple.ONE,
    // yeah this is pretty dumb, but it should be okay;
    on_child_fail: new Hydra_Action({
        parsing: Head_Action({move: Hnode.fail}),
    }),
    on_child_succeed: new Hydra_Action({
        parsing: Head_Action({move: Hnode.succeed}),
    }),
});
const M_Multiple_ONE_OR_MORE = new Match_Type({
    type: Multiple.ONE_OR_MORE,
    on_child_fail: new Hydra_Action({
        callback(node: Multiple){
            return node.had_one ? Multiple_Succeed : Multiple_Fail;
        },
    }),
    on_child_succeed: new Hydra_Action({
        // if a node succeeds, the engine defaults to running the whole node again;
        // however, we do need to advance in the input;
        input: Head_Action({move: Hnode.next}),
        callback(node: Multiple){
            node.had_one = true;
        },
    }),
});
const M_Multiple_ZERO_OR_ONE = new Match_Type({
    type: Multiple.ZERO_OR_ONE,
});
const M_Multiple_ZERO_OR_MORE = new Match_Type({
    type: Multiple.ZERO_OR_MORE,
});
const M_Layer_Done = new Hydra_Action({
    parsing: Head_Action({move: Hnode.next}),
});
const M_Layer = new Match_Type({
    type: Layer,
    match_type: true,
    // match type will cause this node to automatically succeed;
    // we can catch that success and intercept it before parent nodes realize it;
    on_succeed: new Hydra_Action({
        input: Head_Action({move: Hnode.down}),
        parsing: Head_Action({move: Hnode.down}),
        // this jank setup allows the node to succeed multiple times, so we better prevent infinite loops;
        callback(node: Layer){
            if(node.entered) return M_Layer_Done;
            node.entered = true;
        },
    }),
});
```

## Art
For Hydra, I think I'm going to try to give it one of those cool text based drawings. Or I'll make the code itself be the shape of a hydra. That's what all of the cool programmers do.
