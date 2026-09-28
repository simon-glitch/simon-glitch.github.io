# Flower minesweeper

It is like minesweeper, except I've added my favorite features from Minesweeper Collector.

Mines have been renamed to flowers, because bombs in the ground just don't make much sense for a somewhat abstract puzzle game. Minesweeper is in the name so people who like minesweeper will actually find my game.

Tiles have 3 states: unrevealed, revealed, and complete. Unrevealed tiles can be marked, indicating the player thinks there is a flower there. Number tiles can be completed by revealing all other number tiles around them. This causes flowers around those numbers to be revealed. A revealed flower cannot be removed, unlike a mark on an unrevealed tile.

Each level is split into one or more sections. Each section tells the player how many flowers are unmarked / unrevealed in it. Incorrect marks bring the number down, even though the game will not necessarily tell the player their marks are incorrect. Small levels only have one section, while larger ones have multiple sections, to make them less difficult and more fair. If the player places marks in a section and they all happen to be correct, then all tiles in the section will be revealed and completed. This solves the 50/50 problem, by allowing players to brute force check all remaining possible arrangements in a section. Partially or mostly correct sets of marks cause no reaction, since the game would be too easy if we just told the player which marks are correct.

Like in normal minesweeper, if the player reveals a flower tile directly, then they will lose 1 HP. The player doesn't have a lot of HP, so obviously they want to be smart and deduce which tiles are flower and mark them instead of revealing them. When flower tiles are revealed because a number or section was completed, the player does not lose HP. Since revealing flowers around completed numbers is a convenience feature that increases how quickly the player can solve levels. And section completion helps alleviate the 50/50 problem.

Each number tile "sees" certain other tiles. In standard minesweeper, this would be the 8 tiles around it. But in flower minesweeper, number tiles might see different tiles instead. The player can see which tiles a number tile sees by just tapping / clicking on it. There is also a visual indicator around the number tile indicating its type. With the king's move pattern being the default.

The game has several color-blind options, which use CSS to change colors, and add patterns to tiles. The patterns have some separate options, for general customization.

If there is a number tile of value N, and there are exactly N marks on the tiles that number sees, the player can tap / click the number to reveal all unmarked tiles. This is called popping. If there are more than N marks, the tile cannot be popped.

If there is a number tile of value N, and there are exactly N revealed flowers + non-revealed tiles that number sees, it will automatically complete itself, as I stated earlier. This reveals all of the flowers.

The player can hold tap or right click to mark tiles. There is also a setting to make replace right click with hold click. There is also a button in the corner of the screen to toggle the controls to be inverted. The game can also be played with a keyboard. WASD to move between selected tiles, E to reveal tiles, and Q to mark tiles.

Like in Minesweeper Collector, there are also various consumable items you can find or buy. They more or less reveal tiles for you. It is also possible, but usually not efficient to complete some levels only using items.

Minesweeper Collector and Infinite Minesweeper have this really annoying bug. See, if you pop a tile and you have 2 or more marks incorrect, the game will naively reveal all mines that you didn't mark. This means you can lose multiple lives or fail multiple sectors in one tap. My game fixes this problem by simply stopping the revealing process after it hits the first mine. This reveals no extra information to the player, and avoids punishing them more than needed. Now the chance of a player placing marks so this would happen is pretty rare, but I have had it happen to me in Infinite Minesweeper a few times.

Zero propagation is a feature in this game. It does not use recursion though. Instead, every frame, the game simply completes any un-completed zero tiles. To avoid confusion, zero tiles always see tiles in a king's move pattern. Due to autocomplete, corner ones and side threes will get completed by default.

Some tiles might have a "." on them. This means there is no number there, and is also not the same as a zero. The level generator will sometimes use these tiles to increase the difficulty.

Like in Minesweeper Collector, flower minesweeper levels can have an arbitrary shape. Unlike in Minesweeper Collector, flower minesweeper does not have hexagon levels. Though I might add a level early on that pretends to be a hexagon level by changing the tiles every number sees to this:
00.
0#0
.00
The level itself would also be hexagon shaped, despite all the tiles being squares.

Flower minesweeper uses a solver to help generate levels. It does not guarantee they are solvable, but instead tries to make levels more interesting. There also several heuristics that adjust flower placement and number type, and levels are initially generated using Perlin noise. Also, I am considering potentially adding fixed hand crafted features to each level, just to make them more interesting. These would be like certain patterns of flowers, or forcing numbers to have certain types. The solver is programmed to prioritize minimizing the number of auto completions. That might sound silly, since it was my idea to add auto completion to begin with. But simple numbers are just a chore to mark. I might also make it so the solver sometimes adds items uses them during the solve, and then removes enough information that you actually need the item/s in order to win.

A flower cannot be surrounded by flowers on seen tiles. If the flower would be on the edge of the board, it might only see a few tiles. While center flowers see 8 tiles (flower vision uses the king's move pattern). The solver likes flowers that only see 2 or 3 other flowers. Wink wink.

Sometimes you will find enemies. Enemies can move forward, unrevealing and uncompleting tiles as they move. An enemy will be hidden if its tile stayes unrevealed, though sometimes auto complete will reveal the enemy. An enemy can place a number of traps around it within a 3 tile radius. Traps can only be placed within unrevealed tiles, and only last 1 turn. Whenever you interact with any tile, that counts as a turn. More powerful enemies will do much more annoying things, like placing flowers, or replacing numbers with ".". Or ambushing you from a short distance. Your location is considered to be whichever tile you interacted with this turn. Oh? How do you damage them? You damage an enemy by pulling out your trusty old shotgun and shooting the tile they are on. Every gardener keeps a shotgun on hand /sarcasm. Especially ones who solve puzzles to avoid trampling their flowers. "It's a kill or be killed world out there." Hahaha!

END