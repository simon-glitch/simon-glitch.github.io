# King Taco as a Card Game Webapp Using PyScript

## Meta
* author: Simon Willover
* description:
  * this document is a proposal for a project (referred to as `this project`);
* motivation:
  * this project is being made for a course, as instructed by a professor;
* course:
  * CS 108, at Calvin University
* instructor:
  * professor Rocky Chang
  * aka: prof. Rocky

## Intro
Quite a few years ago (2019 was a long time ago!), I played a really cool card game: Exploding Kittens. The game really inspired me to consider card mechanics, and taught me to love uniqueness. Exploding kittens has simple cards that compose a very engaging experience. The 1st time I played, I was **intrigued** by the way players could hide the exploding kittens in the deck.s

I have **always** wanted to make my own board game or video game. I originally got into programming because I heard that coding was required for making games. When I started learning to code, my mind was quickly changed. I realized that programming satisfies many other interests of mine, and that it can actually fulfill my never-ending hunger for intellectual stimulus (i.e. my curiosity). So, with this change, I ventured forward into general purpose programming. However, I still see video games as being of particularly high value. Strategic games are particularly intriguing and enticing, since they often incur mathematical puzzles and systems. The puzzles really attract and amplify my inner passion. Every time I see a puzzle, I end up wanting to know its "solution" (i.e. the algoirthm for its inversion or satisfaction process). Card games tend to be highly strategic, and I just love coming up with rules for card games.

I have always wanted a game with tons of zany cards that have different rules from each other. Some games, like *Yu-Gi-Oh!*, almost have this characteristic, but fail to really satisfy my desires. Those games often have too many similarities between cards, rules that are too complex, or too much strange terminology behind their mechanics. Also, those games require players to do a lot of extra math for things like health points. Finally, those games don't necessarily guarantee that players have a wide variety of interesting and distinct choices; nor do those games guarantee that players experience a fair competition. I won't go into the specifics, but many complex card games just don't have the zaniness nor the fun that I am looking for; they are just too nerdy!

So, I decided to come up with an interesting game by combining the simple rules of other games. The goal: no health points, no currency, and no boringness. Also the goal: a wide variety of different cards.

The card game I came up with was *King Taco* (TM). The rules were simple: draw 1 card and play 2 cards each turn, until someone empties their hand. Well, emptying your hand just once would be boring. So, you actually have to empty it a random number of times, depending on a special card draw. The special card draw discards one card option with each attempted win, so someone is guaranteed to win after a specific number of attempts.

* I made the game quite some time ago, and I didn't have the time or resources to play test it. I also didn't realize that I didn't know how to do what I was trying to do. So, I would love to come back to the project and try again.
* I have learned a lot of programming, so coding up a prototype for play testing should be easy. And I have learned a lot about game design. I can recognize patterns that would cause the game to be imbalanced and I can come up with features to help balance the game and make it sense.

## So, What Are We Actually Going To Do?
That's a great question!

In order to make this game fun, we will implement it in HTML. We'll use [Tippy] for tooltips, popup boxes, so we can add zany and fun descriptions to every card. [Tippy] also adds in other menus, which we will use for the games menu. I will also animate the cards, just because I can.


## Dependencies
* Tippy (a JS library that adds in powerful UI elements)
* PyScript (for actually implementing Python in our webpage)

### Languages
* Python (for handling the game logic)
* HTML (for actualizing the GUI)
  * CSS (for making the GUI look good and be accessible)
* JavaScript (from Tippy and PyScript)
  * I will write no JavaScript of my own for this project. This project is meant to be Python-based.

## Composition
This project will be composed of just a few files:
* this file (i.e. this document), ([proposal.md])
  * the report ([report.md]), for professor Rocky
* compiled file: the card game's official rules ([rules.md])
  * the general rules section of the rules ([general-rules.md])
  * the other rules section of the rules ([other-rules.md])
  * JSON describing each card, and its specific rules ([cards.json])
  * script to compile [rules.md]; normally I would write this in JS, but I have to write it in Python, per the rules of this project ([rules-compiler.py])
* a simple home page for this project, which will be very similar to this file, but written in a user-friendly HTML style ([index.html])
* the web game (hosted at [play.html])
  * a guide on how to use the web game ([proposal.md])
  * the Python script handling all of the web game's logic ([main.py])
    * documentation for the [main.py] script ([proposal.md])
* a transcript for Simon's presentation of the file (I might just use the [#Intro] section of this document), ([proposal.md])
  * a power point presentation for this file ([presentation.ppt])
* a time card (see why in [#Time_Frame]), ([time_card.txt])
* an apology to my girlfriend, JavaScript, for cheating on her ([apology.ppt]) ~JK, XD~

I hope that's not too many files or anything XD!

## Time Frame
This project will be completed within a time limit, as suggested by professor Rocky. I will make sure to spend no more than 50 hours on the coding for this project. I might not count time for writing the game's rules and for making documentation. Nonetheless, I will try to limit to myself to around 50 hours of work. This means I will use a **time card** to keep track of work done each day, and work done on each part of the project.
* This **time card plan** will also help me manage my time and manage the project better.

I am especially excited to keep track of just how much time I am **utterly wasting** for once. I really love wasting time. That's one of, it not simply just, my strongest suits. I actually have a PhD in wasting time. In case you are wondering, getting that PhD, is inherently, as itself as a process, a waste of time. Ah, look at these beautiful abominations of text, composed words, separated by highly delectable, dare I say even: necessary, c,o,m,m,a,s. Ah yieesss. This is writing at -- no, **BEYOND** its peak. I am definitely not bouncing my shoulders up and down like a weirdo~ while sitting in my chair right now. :)
* FatalError: Simon.js has stopped executing; reason: Simon's happiness exceeded the maximum safe value of 343%.

### Strategies For Ensuring Success Under The Time Frame Restriction
#### Time warping
I can actually warp time (at least on a record-keeping level) pretty easily. All I have to do is spend less time actually working. Most of the actual hard work of this project is just thinking anyways. I don't have to have the files of the project open (on my computer) in order to do that. I can just think about this project in the background subconsciously while doing other life-activities. So, with that in mind, completing this project within the time frame should be easy.

#### Git Gud
The number-1 way to do anything programming is to *git gud* (TM). Note: do not confuse {the "git" in "git gud", which is not actually trade-markable} with {the "git" tool, which is owned by Microsoft}.

#### Pop Some Pills
Or if you're me, just use your extremely strong self control to manipulate your own emotions and give yourself a constant adrenaline rush.

#### Use Professional Techniques
Being professional is actually my primary goal with this project. *(Kinda, I think so at least!)*

I will make sure to write maintainable code. I will try to describe my goals and thought process clearly throughout this project's timeline.

## General Side Note
I hope I am not being too sarcastic with some of the jokes in this proposal. XD XD, LOL.

Also, I hope this proposal isn't too long XD. If it is, I hope it at least has high enough readability that the reader can just blast through it blazingly fast (TM).

I feel like I might have been too liberal with some of my English writing in this document. For example, my use of the word timeline just a few sentences made me realize that I am trying to be overly fancy with my words here. I should aim to be more modest next time~ I have also invented some words. I like inventing words, since I like to make new words with new meanings. I also like to add new meanings to existing words. Those are 2 things that I just love doing. I feel like English is such a disappointing language.
* I genuinely believe *(or is the right word here: `fill`?)*
  * that other writers should be liberal like me and try to write honestly.
  * Clarification on `liberal`:
    * I mean they should not be liberal by using big words and talking like some kind of bigot.
    * I mean they should be liberal by using the right words and writing in vernacular English.

### Seriously, Simon: Stop Typing
Sorry, but I kinda like writing a lot. It doesn't help that I have felt so uncomfortable with doing it for the longest of times now. This **(right now)** is the **1st** in a while that I have felt this good with writing.

## Alternative Project Ideas
### 2D Platformer
I was thinking I could make a 2D platformer game,

### Weird Compiler
or that I could make a compiler (for a certain other project with a really weird programming language) instead.

### Tic Tac Toe
I could also try improving on the tic-tac-toe algorithm. I am currently thinking of ways to do that, but I am a little unsure about how to do that. I will email you if you come up with an algorithm for it. Nonetheless, it wouldn't be an interesting project and the algorithm I am thinking of requires a lot more than 50 hours of work.

### Integer Calling Game
I could also try to make a visualization of what the integer calling game is talking about. However, I don't think that would involve any interesting algorithms or anything. The integer calling game is solved with a simple pure function anyways. So, that sounds like it would be more of a side project than a programming project.

### Make a Markdown to Docx Compiler
I just had this idea when I realized that you will probably want to view this file as a `.docx` instead of a `.md`. I really don't want to make a file converter of that sort though. Making that would be a little outside of my skill set (I have never worked with Microsoft's file types and their related APIs). Sounds like a fun future project though.

## Word Count
1942 Words! **Wow!**



