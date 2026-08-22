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

3:42 PM - Apparently, Hill Climb Racing has this fun little feature where it crashes in Year 4 Summer on Seasons. And what's great is if it crashes of if you close the game mid-run, your progress is not saved. I wish it saved progress every 30 seconds during runs, or something like that.

4:33 PM - I'm feeling so tired. I guess I'll go back to sleep for a while.

5:55 PM - I woke up. I kept having crazy dreams. Since I was conscious the entire time. While also actually sleeping. When I decided I want to wake up, I initialy woke up in a dream. But after a short minute, my subconscious caught on and let me out.

6:42 PM - I realized I have a lot of Skyrim mods that I don't need, so I removed them. I also found a copy of the !Downloads folder in Root Builder's backup foler, so I deleted that too. So I cleared up like 20 GB of storage on my computer, potentially more. Now I'm starting Skyrim, which is taking forever, because I presume MO2 is realizing it needs to reconfigure its VFS. Now I'm trying to load my save. Skyrim took an extra minute to load, but it worked! Now I just gotta exit back to MO2 and hopefully any stray files have been cleaned up. Once again, MO2 is taking forever to close its VFS. Like several times longer than it takes to launch it. That's pretty normal. Perhaps I should add more folders to my exclusions list for the Windows malware detection. Huh. Maybe the issue is that Root Builder copies !Downloads into the base game the first time I ran MO2 without me realizing it (that is before I deleted it). And then it copies it from the base game back into itself the second time without me realizing it, leaving only 3 or 4 GB free on my hard drive. This time I made sure to delete **both** copies. So now I have 50.6 GB free, which is basically entirely thanks to !Downloads being deleted. I hope there is not a third copy somewhere. But at the same time, I also hope there is a third copy somewhere, because that would mean I could find it and then delete it to free up another 24.6 GB of space (or however much it is). Also, I might technically have more than 50.6 GB free, since the file explorer app just never quite catches up to reality. And I should have freed more space than that considering I had like 5 GB in mods. Or perhaps I am just misremembering how much free space I had to begin with, in which case the file explorer would be 100% (or nearly 100%) accurate.

7:10 PM - I turned my computer off to clean my screen, but it also forced me to "update". Now it's stuck trying to update, and it can't actually do it because it doesn't have valid BIOS update data. Oh my God this is so annoying. The one day when I don't have wifi and it decides to brick itself. Probably because it doesn't have wifi. So now I have to go find some free wifi. Or just wait 6 hours for my mom to get home (and then bug her). Wait, it finally gave up because it doesn't have enough battery. Thank God. I'll make sure to have it at a low charge next time I restart it, just in case. Of course, Windows should add a button to prevent updating, especially if it fails and gets stuck in a loop with no wifi. But they would never give a user more control of anything update related. That's not how they operate.

7:30 PM - I just copied the last two items from my phone. I had them on Obisidian. I manually retyped them in this file because I have no wifi and I can't connect to my phones file system over USB, because, get this, I don't have the Windows network driver. So that's on the todo list for next time I get wifi. Also, an infinitely annoying thing is I can't use my bookmarklets on my phone, seemingly because Chrome is just refusing to run them. I'll try making an offline webpage that lets me run JS some time. I could also solve the issue by downloading Acode. I'll try both, of course, like any logical programmer should. Well, "like any" and "should" are rude things for me to say. So um, sorry, if you read that. I wasn't being serious.

7:34 PM - I love just writing down my thoughts. Also I need to put another wash cloth in the sink because the current one has really bad sink stink. Alright task completed.

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
    on_enter: Hydra_Action,
    on_succeed: Hydra_Action?,
    on_fail: Hydra_Action?,
    // when true, indicates this is the "Direct match" / leaf node type;
    // leaf nodes have separate logic, but on_enter, on_succeed, and on_fail are still used;
    is_leaf: boolean?,
    // i might be able to use this to implement look behind logic;
    // this action would run if any node (that shares an ancestor with this node but it not an ancestor of this node) fails;
    on_sibling_fail: Hydra_Action?,
}
type Hydra_Action = {
    input: Head_Action?,
    output: Head_Action?,
    parsing: Head_Action?,
    // i think this might be a way to implement some more advanced features;
    callback: Function?,
}
type Hydra_Action = {
    source: Hnode_Action?,
    target: Hnode_Action?,
    move: Hmove?,
    // used when move == Hnode.down;
    index: number,
}
// these are all symbols;
// Hnode means Hydra node;
enum Hnode_Action = {Hnode.enter, Hnode.succeed, Hnode.fail};
// these are all symbols;
enum Hmove = {Hnode.up, Hnode.next, Hnode.down};

```

A `Hydra_Action` is used to tell Hydra what to do. This should minimize the amount of code, and thus minimize the number of bugs. This should also make it much easier for me to test things independently.

## Art
For Hydra, I think I'm going to try to give it one of those cool text based drawings. Or I'll make the code itself be the shape of a hydra. That's what all of the cool programmers do.
