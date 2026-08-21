Well I don't have wifi today, since my mom had to return the hotspot to the library yesterday.

# Yesterday
Also yesterday we went to Brandy Long's house and my mom had the whole day off. Brandy is my mom's best friend.

Brandy is also surprisingly very good at Mario Party. It's been a while since I've played, but she is very good at it. Even though she doesn't play it much. Also Switch joycons really do suck.

We also went to Chistina's house. Christina is Brandy's friend who is trans.

What is important is that last night, I finally figured out how I'm going to design the Hydra parser. That's right. It's a hydra.

# Today
I slept so much this morning (from 1:30 AM to 10:30 AM), but I also was having a hard time sleeping. Probably because I'm used to sleeping until 4 to 8 PM. I was only doing that because I had wifi. Maybe I shouldn't use the internet so much when it's available. Of course I also hate going places and I'm always lonely. I will always be lonely, since I just naturally want to sit in a chair and be a nerd all day. I like doing things like writing, programming, etc. But when I have the internet, I often spend too much time just stimulating myself. And I stimulate myself so much that when I finally take a break... when I finally have to sit here and soak in my boredom... it actually feels really good.

I feel kinda helpless sometimes because of my AuDHD. But also my mind is really sharp.

Also, I was playing Hill Climb Racing, and I was reminded of an annoying issue on Android: If you have your thumb wrapped around your screen, the base of your thumb can end up hitting buttons on the edge of the screen, especially the back / home screen / active apps buttons. What was h
appening is I kept hitting home screen accidentally, causing the game to be closed. I really hope Android fixes this one day by adding edge-of-screen detection.

Oh my god I just realized VS Code has a button for managing the annoying Git branches. I should invent Git2, which will have more intuitive names for the commands. And most important, will come with exhaustive documentation builtin. I am very particular about these kinds of things.

I drank a lot of pop yesterday, and today I get to find out whether it will give me the shits or not. Isn't that exciting?

Like now that I don't have internet I'm laughing at all of my own jokes.

2:26 PM - I still have to take a shower so I'll do that right now.

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

## Art
For Hydra, I think I'm going to try to give it one of those cool text based drawings. Or I'll make the code itself be the shape of a hydra. That's what all of the cool programmers do.
